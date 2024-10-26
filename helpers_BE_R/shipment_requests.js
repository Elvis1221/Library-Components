const formatForCarriers = (oldCarrierId, newCarrierId, forCarriers, associationServices) => {
  // for old data
  if (Array.isArray(forCarriers)) {
    return forCarriers;
  }
  const formattedForCarriers = Object
    .keys(forCarriers)
    .reduce((acc, modeId) => {
      const dataByMode = forCarriers[modeId];
      const oldCarrierData = { ...(dataByMode[oldCarrierId] || {}) };
      const { serviceIds } = oldCarrierData;

      delete dataByMode[oldCarrierId];

      dataByMode[newCarrierId] = { ...oldCarrierData, followerIds: [] };

      if ((serviceIds || []).length) {
        dataByMode[newCarrierId].serviceIds = serviceIds.reduce((allServiceIds, currId) => {
          const newServiceId = associationServices[currId];

          if (!associationServices) return allServiceIds;

          allServiceIds.push(newServiceId);
          return allServiceIds;
        }, []);
      }

      acc[modeId] = dataByMode;

      return acc;
    }, {});

  return formattedForCarriers;
};

export {
  formatForCarriers,
};
