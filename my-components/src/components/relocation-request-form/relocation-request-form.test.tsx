import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import selectEvent from 'react-select-event';

import RelocationRequestForm from './relocation-request-form';
import { MemoryRouter } from 'react-router-dom';
import { api } from 'utils/api.util';
import {
  ACTION_DATA,
  LABEL_TITLES,
  MOVE_WITH,
  PLACEHOLDER,
  READY_RELOCATE,
  RELOCATION_FORM_KEY,
} from './constants/relocation-request-form.constants';
import { MockedAppProvider } from 'mock/mock-app-provider';
import {
  mockCurrentPerson,
  mockLocations,
  mockRelocationInterest,
} from 'mock/index';
import { getValidationMessage } from 'utils/validators';
import { LOADING_TITLE, VALIDATE_TEXT } from '../../constants/content.const';
import * as datePicker from 'components/calendar/dropdown-calendar';
import * as dropdown from 'components/select-field/select-field';
import * as ConfirmModal from 'components/confirm-modal/confirm-modal';

describe('Relocation Request Form', () => {
  const requestFormComponent = (
    <MockedAppProvider>
      <MemoryRouter>
        <RelocationRequestForm />
      </MemoryRouter>
    </MockedAppProvider>
  );

  it('should display spinner if required data is not ready', () => {
    render(
      <MemoryRouter>
        <RelocationRequestForm />
      </MemoryRouter>,
    );

    expect(screen.getByText(LOADING_TITLE.LOADING)).toBeInTheDocument();
  });

  it('should render title with user name in relocation request form header', () => {
    render(requestFormComponent);

    const currentPersonFullNameEn = `${ACTION_DATA.CREATE_REQUEST} (${mockCurrentPerson.enName.firstName} ${mockCurrentPerson.enName.lastName})`;

    expect(screen.getByText(currentPersonFullNameEn)).toBeInTheDocument();
  });

  it('should render buttons cancel and submit', () => {
    render(requestFormComponent);

    const buttons = screen.getAllByRole('button');

    expect(buttons[0]).toHaveTextContent(ACTION_DATA.CANCEL);
    expect(buttons[1]).toHaveTextContent(ACTION_DATA.CREATE_REQUEST);
  });

  it('should render option titles', () => {
    render(requestFormComponent);

    expect(screen.getByText(LABEL_TITLES.LOCATION)).toBeInTheDocument();
    expect(screen.getByText(LABEL_TITLES.READY_RELOCATE)).toBeInTheDocument();
    expect(screen.getByText(LABEL_TITLES.MOVE_WITH)).toBeInTheDocument();
    expect(screen.getByText(LABEL_TITLES.OTHER_COMMENTS)).toBeInTheDocument();
  });

  it('should render locations radio-buttons', () => {
    render(requestFormComponent);

    expect(screen.getByText(mockLocations[1].name)).toBeInTheDocument();
  });

  it('should pass parameters to datePicker correctly', async () => {
    const datePickerMock = jest.spyOn(datePicker, 'default');

    render(requestFormComponent);

    const radioButton = screen.getByLabelText(
      READY_RELOCATE.DESIRED_DATES_TITLE,
    );

    expect(radioButton).toHaveAttribute(
      'value',
      READY_RELOCATE.DESIRED_DATES_VALUE,
    );

    fireEvent.click(radioButton);

    await waitFor(() => {
      expect(datePickerMock).toHaveBeenCalled();
      expect(datePickerMock).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          field: expect.objectContaining({
            name: RELOCATION_FORM_KEY.PLANNED_DEPARTURE_DATE,
            value: '',
          }),
        }),
        {},
      );
    });
    datePickerMock.mockRestore();
  });

  it('should pass parameters to dropdown correctly', async () => {
    const dropdownMock = jest.spyOn(dropdown, 'default');

    render(requestFormComponent);

    const radioButton = screen.getByLabelText(
      READY_RELOCATE.GATHERING_INFO_TITLE,
    );

    expect(radioButton).toHaveAttribute(
      'value',
      READY_RELOCATE.GATHERING_INFO_VALUE,
    );

    fireEvent.click(radioButton);
    const expectedDropdownOptions = mockRelocationInterest.map((item) => {
      return { label: item.name, value: item.id };
    });

    await waitFor(() => {
      expect(dropdownMock).toHaveBeenCalled();
      expect(dropdownMock).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          field: expect.objectContaining({
            name: RELOCATION_FORM_KEY.RELOCATION_INTEREST_ID,
            value: '',
          }),
          options: expectedDropdownOptions,
        }),
        {},
      );
    });
    dropdownMock.mockRestore();
  });

  it('should check that the field "Any other questions or comments" contain text', async () => {
    render(requestFormComponent);

    const textBoxes = screen.getAllByRole('textbox');

    fireEvent.change(textBoxes[0], { target: { value: 'test' } });

    await waitFor(() => {
      expect(textBoxes[0]).toHaveValue('test');
    });
  });

  it('should render field by click on options "Other"', async () => {
    render(requestFormComponent);

    const radioButton = screen.getAllByLabelText(MOVE_WITH.OTHER);

    fireEvent.click(radioButton[0]);
    fireEvent.click(radioButton[1]);

    await waitFor(() => {
      expect(screen.getAllByPlaceholderText(MOVE_WITH.OTHER)).toHaveLength(2);
    });
  });

  it('should check that the fields "Other" contain text', async () => {
    render(requestFormComponent);

    const radioButton = screen.getAllByLabelText(MOVE_WITH.OTHER);
    const button = screen.getAllByRole('button');

    fireEvent.click(radioButton[0]);
    fireEvent.click(radioButton[1]);

    const textBoxes = screen.getAllByRole('textbox');

    fireEvent.change(textBoxes[0], { target: { value: 'test1' } });
    fireEvent.change(textBoxes[1], { target: { value: 'test2' } });

    fireEvent.click(button[0]);

    await waitFor(() => {
      expect(textBoxes[0]).toHaveValue('test1');
      expect(textBoxes[1]).toHaveValue('test2');
    });
  });

  it(' should render popup with warning when user will select the options in the form and click the exit button', async () => {
    render(requestFormComponent);

    const radioButton = screen.getAllByLabelText(MOVE_WITH.OTHER);
    const confirmModalMock = jest.spyOn(ConfirmModal, 'default');
    confirmModalMock.mockImplementation(() => <div>ConfirmModalMock</div>);

    fireEvent.click(radioButton[0]);
    fireEvent.click(radioButton[1]);

    const textBoxes = screen.getAllByRole('textbox');

    fireEvent.change(textBoxes[0], { target: { value: 'test1' } });
    fireEvent.change(textBoxes[1], { target: { value: 'test2' } });

    const button = screen.getAllByRole('button');

    fireEvent.click(button[0]);

    await waitFor(() => {
      expect(screen.getByText('ConfirmModalMock')).toBeInTheDocument();
      confirmModalMock.mockRestore();
    });
  });

  it('should call api.post on click and create request', async () => {
    render(requestFormComponent);

    const mockPost = jest.fn();
    const postSpy = jest.spyOn(api, 'post');
    const radioButton = screen.getByLabelText(
      READY_RELOCATE.GATHERING_INFO_TITLE,
    );

    postSpy.mockImplementation(mockPost);

    expect(radioButton).toHaveAttribute(
      'value',
      READY_RELOCATE.GATHERING_INFO_VALUE,
    );

    fireEvent.click(radioButton);

    const destinationField = screen.getByText(PLACEHOLDER.ESTIMATED_TIME);
    const destinationValue = mockRelocationInterest[0].name;

    fireEvent.click(destinationField);

    await selectEvent.select(destinationField, destinationValue);

    const radioButtons = screen.getAllByLabelText(MOVE_WITH.OTHER);

    fireEvent.click(radioButtons[0]);
    fireEvent.click(radioButtons[1]);

    const textBoxes = screen.getAllByRole('textbox');

    fireEvent.change(textBoxes[0], { target: { value: 'test1' } });
    fireEvent.change(textBoxes[2], { target: { value: 'test2' } });
    fireEvent(
      screen.getByText(ACTION_DATA.CREATE_REQUEST),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    await waitFor(() => expect(mockPost).toHaveBeenCalledTimes(1));
  });

  describe('validation', () => {
    it('should render validation messages on click button "create request" if fields are empty', async () => {
      render(requestFormComponent);

      fireEvent(
        screen.getByText(ACTION_DATA.CREATE_REQUEST),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );

      await waitFor(() => {
        expect(
          screen.getAllByText(
            getValidationMessage(VALIDATE_TEXT.ANSWER_QUESTION),
          ),
        ).toHaveLength(3);
      });
    });

    it('should render validation messages on click button "create request" if fields "Other" are empty', async () => {
      render(requestFormComponent);

      const radioButton = screen.getAllByLabelText(MOVE_WITH.OTHER);

      fireEvent.click(radioButton[0]);
      fireEvent.click(radioButton[1]);
      fireEvent(
        screen.getByText(ACTION_DATA.CREATE_REQUEST),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );

      await waitFor(() => {
        expect(
          screen.getByText(getValidationMessage(VALIDATE_TEXT.ENTER_LOCATION)),
        ).toBeInTheDocument();
        expect(
          screen.getByText(getValidationMessage(VALIDATE_TEXT.ENTER_INFO)),
        ).toBeInTheDocument();
      });
    });
  });
});
