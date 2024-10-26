const moment = require('moment');
const uuid = require('uuid');
const db = require('../models')();
const num = require('../lib/num');
const { getStartEndPoints } = require('../services/tracking/helper');
const { attachColorToContentsSpecificities, attachCargoGroupsToContents } = require('../lib/contents');
const { mergeSlotShipmentContents } = require('../services/slots/resolvers');
const { transposeArrayToObjectByUniqueKey } = require('./object');

const {
    Slot,
} = db;

const {
    DEPARTURE,
} = Slot.Directions;

const buildOrderProductFromSlot = input => {
    const {
        orderProductId,
        product_type_id: productTypeId,
        dangerous_good_description_id: dangerousGoodDescriptionId,
        order_id: orderId,
        cargo_type_id: cargoTypeId,
        quantity,
        length,
        width,
        height,
        weight,
    } = input;

    return {
        id: orderProductId,
        product_type_id: productTypeId,
        dangerous_good_description_id: dangerousGoodDescriptionId || null,
        name: orderId,
        contentQuantity: num.parseInt(quantity),
        content: {
            type_id: cargoTypeId,
            quantity,
            // TODO: should come from api input
            length: length || 0,
            width: width || 0,
            height: height || 0,
            weight: weight || 0,
        },
    };
};

const buildShipmentDataFromSlot = (input, slot) => {
    const isOutbound = (input.type || '').toLowerCase() === 'outbound';
    const isInbound = (input.type || '').toLowerCase() === 'inbound';

    const dateFrom = slot.min_date;
    const timeFrom = input.min_time;

    const dateTo = dateFrom;
    const timeTo = timeFrom;

    const orderProduct = buildOrderProductFromSlot(input);

    const data = {
        skip_slots_creation: true,
        name: slot.name || slot.internal_ref,
        shipment_mode_ids: [3],
        pre_awarded: true,
        for_carriers: '{"3":{"440":{"on":true,"followerIds":[]}}}',
        newAddressName: input.partner_name,
        supplierEmails: [],
        supplierNames: [input.partner_name],
        orders: [
            {
                id: input.orderRecognizedId,
                ref: slot.name || slot.internal_ref,
                supplier: input.partner_name,
                email: '',
            },
        ],
        order_products: [orderProduct],
        isRecognizedOrders: !!orderProduct.id,
        locationId: slot.address_id,
        reply_before: moment(dateTo).add(1, 'd'),
        locationShipperId: input.location_shipper_id,
        creationMethod: input.creationMethod,
        // pre_shipment_contents: input.packing_list_details,
        attachments: [],
        metadata: [],

        // user_id: 353, // config slotify
        // shipper_id: 37, // config slotify
        // carrier_id: 440, // ???
        // newCarrier: null,
        // email: "tetmyemail@test.com", // TODO, may be empty?
        // total_volume: null,
        // total_weight: null,
        // is_total_volume: false,
        // is_total_weight: false,
        // dest_customer_id: null,

        comment: input.comment,
    };

    const address = {
        address_id: input.location_id,
        date_from: dateFrom,
        date_to: dateTo,
        time_from: timeFrom,
        time_to: timeTo,
    };

    if (isOutbound) {
        Object.assign(
            data,
            {
                shipping_date_from: dateFrom,
                shipping_date_to: dateTo,
                shipping_time_from: timeFrom,
                shipping_time_to: timeTo,
                from_addresses: [address],
                from_zone_id: slot.zone_id,
                from_dock_door_id: slot.dock_door_id,
                from_customer_id: input.location_customer_id || null,
            }
        );
    } else if (isInbound) {
        Object.assign(
            data,
            {
                arrival_date_from: dateFrom,
                arrival_date_to: dateTo,
                arrival_time_from: timeFrom,
                arrival_time_to: timeTo,
                dest_addresses: [address],
                dest_zone_id: slot.zone_id,
                dest_dock_door_id: slot.dock_door_id,
                dest_customer_id: input.location_customer_id || null,
            },
        );
    }

    return Object.assign({}, input, data);
};

const buildSlotData = params => {
    const {
        slotContents,
        cargoGroups,
        accountSpecs,
        slot,
        contentsByShId,
        pointsByShId,
    } = params;

    const slotData = {
        dockDoor: null,
        zone: null,
        point: null,
        contents: null,
    };

    const shIds = slot.shipments.map(shipment => shipment.id);
    const shipment = slot.shipments[0] || {};
    const { direction } = slot;

    const slotPoints = pointsByShId[shipment.id] || [];
    const { minPoint, maxPoint } = getStartEndPoints(slotPoints);

    let slotContentsFormat = attachColorToContentsSpecificities(slotContents, accountSpecs);
    slotContentsFormat = attachCargoGroupsToContents(slotContentsFormat, cargoGroups);

    let shipmentContentsFormat = attachColorToContentsSpecificities(shIds.flatMap(id =>
        attachColorToContentsSpecificities(contentsByShId[`${id}`], accountSpecs)), accountSpecs);
    shipmentContentsFormat = attachCargoGroupsToContents(shipmentContentsFormat, cargoGroups);

    const shipmentsById = transposeArrayToObjectByUniqueKey(slot.shipments, 'id');
    shipmentContentsFormat = shipmentContentsFormat.map(el => {
        el.shipper_id = (shipmentsById[el.shipment_id] || {}).shipper_id;

        return el;
    });

    slotData.zone = slot.location_zone;
    slotData.dockDoor = slot.dock_door;
    delete slot.dock_door;
    delete slot.location_zone;
    slotData.point = direction === DEPARTURE ? minPoint : maxPoint;
    slotData.contents = mergeSlotShipmentContents(slotContentsFormat, shipmentContentsFormat);

    return slotData;
};

const buildSlotDataForRecurringSlot = params => {
    const {
        slot,
        contentsByShId,
        cargoGroups,
        accountSpecs,
        slotsContents,
    } = params;

    const slotData = {
        dockDoor: null,
        zone: null,
        point: null,
        contents: null,
    };

    const shIds = slot.shipments.map(shipment => shipment.id);

    const shipmentContentsWithColors = shIds.flatMap(id =>
        attachColorToContentsSpecificities(contentsByShId[`${id}`], accountSpecs));
    const formattedShipmentContents = attachCargoGroupsToContents(shipmentContentsWithColors, cargoGroups);

    const slotContentsWithColors = attachColorToContentsSpecificities(slotsContents, accountSpecs);
    const formattedSlotContents = attachCargoGroupsToContents(slotContentsWithColors, cargoGroups);

    slotData.contents = mergeSlotShipmentContents(formattedSlotContents, formattedShipmentContents);

    return slotData;
};

const generateKey = () => {
    return uuid.v4();
    // return Math.floor(Math.random() * Date.now()).toString(16);
};

module.exports = {
    buildShipmentDataFromSlot,
    buildOrderProductFromSlot,
    buildSlotData,
    buildSlotDataForRecurringSlot,
    generateKey,
};
