import { ReactComponent as Attention } from '../images/attention.svg';
import { VALIDATE_TEXT } from '../constants/content.const';

export interface IErrorMessage {
  please: (m: string) => JSX.Element;
}

export interface IValueRequired {
  (m: boolean): JSX.Element | boolean;
}

export const getValidationMessage = (text: string): string =>
  `${VALIDATE_TEXT.PLEASE}${text}`;

export const errorMessages: IErrorMessage = {
  please: (message: string) => (
    <>
      <Attention /> <span>{getValidationMessage(message)}</span>
    </>
  ),
};

export const isRequired =
  (message: JSX.Element) =>
  (value: boolean): boolean | JSX.Element =>
    !value && message;

export const validateValue = (message: string): IValueRequired =>
  isRequired(errorMessages.please(message));
