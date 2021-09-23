import React, { FC, useState } from 'react';
import { Form, Formik } from 'formik';
import { useHistory } from 'react-router-dom';

import ControlHeader from 'components/control-header/control-header';
import ConfirmModal from 'components/confirm-modal/confirm-modal';
import { useAppContext } from '../../constants/context.const';
import { parseDataToRelocationRequest } from './helpers/helpers';
import PageContent from 'components/page-content/page-content';
import LoadingContainer from 'components/loading-container/loading-container';
import { RELOCATION_FORM_REQUEST_CONFIG } from './config/relocation-request-form.config';
import { api } from 'utils/api.util';
import { NAVIGATION_URLS, ROOT_URL } from '../../constants/urls.const';
import { INamedObjectWithId, INamedObjectWithNumberId } from 'model/common';
import {
  ACTION_DATA,
  initialValues,
} from './constants/relocation-request-form.constants';
import {
  IConfigProps,
  IInitialValues,
  IRelocationFormType,
} from './interface/interface-for-relocation-form';
import ControlButtons from 'components/control-buttons/control-buttons';

import css from './relocation-request-form.module.css';
import {
  OTHER_ID,
  OTHER_VALUE_LABEL,
} from 'pages/edit-request/components/request-details/request-details.const';

const RelocationRequestForm: FC = (): JSX.Element => {
  const [isDisplayModal, setIsDisplayModal] = useState<boolean>(false);
  const history = useHistory();

  const {
    currentPerson,
    locations,
    relocationInterests,
    familyOptions,
    loading,
    setContextValue,
  } = useAppContext();

  const { enName } = currentPerson;
  const prepareUserNameForHeader = `(${enName?.firstName} ${enName?.lastName})`;
  const filteredLocations = locations.filter(
    (items) => items.name !== currentPerson.locations,
  );

  const desiredDestination: INamedObjectWithNumberId[] = [
    ...filteredLocations,
    { id: OTHER_ID, name: OTHER_VALUE_LABEL },
  ];

  const prepareRelocationInterest = relocationInterests.map(
    (item: INamedObjectWithId) => ({
      value: item.id,
      label: item.name,
    }),
  );

  //TODO : updating the table will be done in the ticket User Story 13601: Add Unit tests for next files
  const onClose = () => {
    history.push(ROOT_URL);
  };

  const onLeaveForm = (dirty: boolean) => {
    if (dirty) {
      setIsDisplayModal(true);
    } else {
      onClose();
    }
  };

  const onCloseModal = () => setIsDisplayModal(false);

  const onSubmit = (values: IInitialValues) => {
    const data = parseDataToRelocationRequest(
      values,
      desiredDestination,
      familyOptions,
    );
    api
      .post(NAVIGATION_URLS.request, JSON.stringify(data))
      .then(() => api.get(NAVIGATION_URLS.relocators))
      .then((value) => {
        setContextValue && setContextValue('relocators', value);
      });
    onClose();
  };

  return (
    <LoadingContainer isLoading={loading}>
      <div className={css.page}>
        <ControlHeader
          title={`${ACTION_DATA.CREATE_REQUEST} ${prepareUserNameForHeader}`}
        />
        <PageContent className={css.contentWrapper}>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ values, dirty }: IConfigProps) => (
              <Form>
                {RELOCATION_FORM_REQUEST_CONFIG.map(
                  (
                    { renderChildren }: IRelocationFormType,
                    key: number,
                  ): JSX.Element =>
                    renderChildren({
                      values,
                      key,
                      desiredDestination,
                      familyOptions,
                      prepareRelocationInterest,
                    }),
                )}
                <ConfirmModal
                  onCloseModal={onCloseModal}
                  isDisplay={isDisplayModal}
                />
                <ControlButtons
                  onClick={() => onLeaveForm(dirty)}
                  titleButtonCancel={ACTION_DATA.CANCEL}
                  titleButtonSubmit={ACTION_DATA.CREATE_REQUEST}
                />
              </Form>
            )}
          </Formik>
        </PageContent>
      </div>
    </LoadingContainer>
  );
};

export default RelocationRequestForm;
