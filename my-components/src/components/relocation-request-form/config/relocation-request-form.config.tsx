import React from 'react';
import { Field } from 'formik';

import {
  PLACEHOLDER,
  LABEL_TITLES,
  READY_RELOCATE,
  MOVE_WITH,
  RELOCATION_FORM_KEY,
} from '../constants/relocation-request-form.constants';
import { IRelocationFormType } from '../interface/interface-for-relocation-form';
import { VALIDATE_TEXT } from '../../../constants/content.const';

import FormikFormField from "../../formik/formik-form-field/formik-form-field";
import SelectField from "../../select-field/select-field";
import FormikLocationRadioButton from "../../formik/formik-location-radio-button/formik-location-radio-button";
import FormikRadioButton from "../../formik/formik-radio-button/formik-radio-button";
import {validateValue} from "../../../utils/validators";
import FormikInput, {InputType} from "../../formik/formik-input/formik-input";

import css from '../relocation-request-form.module.css';

export const RELOCATION_FORM_REQUEST_CONFIG: IRelocationFormType[] = [
  {
    renderChildren: ({ values, key, desiredDestination }): JSX.Element => (
      <FormikFormField
        key={key}
        label={LABEL_TITLES.LOCATION}
        required
        showErrorForField={
          values.desiredDestinationId === MOVE_WITH.OTHER
            ? RELOCATION_FORM_KEY.OTHER_DESIRED_DESTINATION
            : RELOCATION_FORM_KEY.DESIRED_DESTINATION_ID
        }
        className={css.stylesForBlock}
      >
        <div className={css.wrapperLocationButtons}>
          {desiredDestination.map(
            ({ name, id }, key): JSX.Element => (
              <Field
                key={key}
                value={name}
                title={name}
                name={RELOCATION_FORM_KEY.DESIRED_DESTINATION_ID}
                id={id}
                validate={validateValue(VALIDATE_TEXT.ANSWER_QUESTION)}
                type='radio'
                component={FormikLocationRadioButton}
              />
            ),
          )}
          {values.desiredDestinationId === MOVE_WITH.OTHER && (
            <Field
              validate={validateValue(VALIDATE_TEXT.ENTER_LOCATION)}
              name={RELOCATION_FORM_KEY.OTHER_DESIRED_DESTINATION}
              placeholder={PLACEHOLDER.OTHER_INFO}
              component={FormikInput}
              type={InputType.input}
              maxLength={20}
              className={css.otherInput}
            />
          )}
        </div>
      </FormikFormField>
    ),
  },
  {
    renderChildren: ({
      values,
      key,
      prepareRelocationInterest,
    }): JSX.Element => (
      <div className={css.wrapperReadyToRelocate} key={key}>
        <FormikFormField
          label={LABEL_TITLES.READY_RELOCATE}
          required
          showErrorForField={RELOCATION_FORM_KEY.INTEREST_DATE}
          className={css.stylesForBlock}
        >
          <Field
            value={READY_RELOCATE.DESIRED_DATES_VALUE}
            id={READY_RELOCATE.DESIRED_DATES_VALUE}
            name={RELOCATION_FORM_KEY.INTEREST_DATE}
            type='radio'
            component={FormikRadioButton}
            title={READY_RELOCATE.DESIRED_DATES_TITLE}
            className={css.radio}
          />
          <Field
            value={READY_RELOCATE.GATHERING_INFO_VALUE}
            id={READY_RELOCATE.GATHERING_INFO_VALUE}
            validate={validateValue(VALIDATE_TEXT.ANSWER_QUESTION)}
            name={RELOCATION_FORM_KEY.INTEREST_DATE}
            type='radio'
            component={FormikRadioButton}
            title={READY_RELOCATE.GATHERING_INFO_TITLE}
            className={css.radio}
          />
        </FormikFormField>
        {values.interestDate === READY_RELOCATE.DESIRED_DATES_VALUE && (
          <FormikFormField
            label={LABEL_TITLES.PLANNED_DEPARTURE}
            required
            className={css.planedDepartureFields}
            showErrorForField={RELOCATION_FORM_KEY.PLANNED_DEPARTURE_DATE}
          >
            <label className={css.label}>
              {LABEL_TITLES.APPROXIMATE_MONTH}
            </label>
            <Field
              component={SelectField}
              isClearable
              value={values.relocationInterestId}
              validate={validateValue(VALIDATE_TEXT.CHOOSE_OPTION)}
              name={RELOCATION_FORM_KEY.RELOCATION_INTEREST_ID}
              placeholder={PLACEHOLDER.ESTIMATED_TIME}
              options={prepareRelocationInterest}
            />
          </FormikFormField>
        )}
        {values.interestDate === READY_RELOCATE.GATHERING_INFO_VALUE && (
          <FormikFormField
            label={LABEL_TITLES.HOW_QUICKLY}
            required
            className={css.dateFields}
            showErrorForField={RELOCATION_FORM_KEY.RELOCATION_INTEREST_ID}
          >
            <Field
              component={SelectField}
              isClearable
              value={values.relocationInterestId}
              validate={validateValue(VALIDATE_TEXT.CHOOSE_OPTION)}
              name={RELOCATION_FORM_KEY.RELOCATION_INTEREST_ID}
              placeholder={PLACEHOLDER.ESTIMATED_TIME}
              options={prepareRelocationInterest}
            />
          </FormikFormField>
        )}
      </div>
    ),
  },
  {
    renderChildren: ({ values, key, familyOptions }): JSX.Element => (
      <div key={key} className={css.wrapperMoveWith}>
        <FormikFormField
          label={LABEL_TITLES.MOVE_WITH}
          required
          showErrorForField={RELOCATION_FORM_KEY.FAMILY_OPTION_ID}
          className={css.stylesForBlock}
        >
          <div className={css.wrapperFamilyOption}>
            {familyOptions.map(({ id, name }, key) => (
              <Field
                key={key}
                id={id}
                value={name}
                validate={validateValue(VALIDATE_TEXT.ANSWER_QUESTION)}
                name={RELOCATION_FORM_KEY.FAMILY_OPTION_ID}
                type='radio'
                component={FormikRadioButton}
                title={name}
                className={css.radio}
              />
            ))}
          </div>
        </FormikFormField>

        {values.familyOptionId === MOVE_WITH.OTHER && (
          <FormikFormField
            showErrorForField={RELOCATION_FORM_KEY.OTHER_FAMILY_OPTIONS}
            className={css.otherFamilyInput}
          >
            <Field
              validate={validateValue(VALIDATE_TEXT.ENTER_INFO)}
              name={RELOCATION_FORM_KEY.OTHER_FAMILY_OPTIONS}
              placeholder={PLACEHOLDER.OTHER_INFO}
              component={FormikInput}
              className={css.otherInput}
              maxLength={50}
            />
          </FormikFormField>
        )}
      </div>
    ),
  },
  {
    renderChildren: ({ key }): JSX.Element => (
      <FormikFormField
        label={LABEL_TITLES.OTHER_COMMENTS}
        key={key}
        className={css.otherCommentsBlock}
      >
        <Field
          component={FormikInput}
          type={InputType.textarea}
          name={RELOCATION_FORM_KEY.COMMENT}
          placeholder={PLACEHOLDER.ANSWER_HERE}
          maxLength={150}
        />
      </FormikFormField>
    ),
  },
];
