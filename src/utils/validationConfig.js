import {ValidationValueMessage} from 'react-hook-form';

export const validationSchema = {
  //   amount: {
  //     minLength: 1,
  //     maxLength: 4,
  //   },
  // medicalCouncil: {
  //   minLength: 8,
  //   maxLength: 15,
  // },
  // bic: {
  //   minLength: 8,
  //   maxLength: 15,
  // },
  // iban: {
  //   minLength: 15,
  //   maxLength: 80,
  // },
  // postCode: {
  //   minLength: 3,
  //   maxLength: 15,
  // },
  // passportOrIdCard: {
  //   minLength: 3,
  //   maxLength: 26,
  // },
  // name: {
  //   minLength: 2,
  //   maxLength: 26,
  // },

  // lastName: {
  //   minLength: 1,
  //   maxLength: 26,
  // },

  // email: {
  //   minLength: 3,
  //   maxLength: 64,
  // },
  // address: {
  //   minLength: 3,
  //   maxLength: 400,
  // },
  // phoneNumber: {
  //   minLength: 7,
  //   maxLength: 15,
  // },
  // message: {
  //   minLength: 3,
  //   maxLength: 191,
  // },
  // subject: {
  //   minLength: 3,
  //   maxLength: 60,
  // },
};

// export const whiteSpaceValidation = (v: string): boolean | string => {
//   const whiteSpaceRegx = /^\s+|\s+$/g;
//   return !whiteSpaceRegx.test(v) || 'white space not allowed.';
// };

export const numberValidation = (v) => {
  const numberRegx = /^[0-9]*$/g;
  return numberRegx.test(v) || 'numbers only allowed.';
};

// export const alphabetsValidation = (v: string): boolean | string => {
//   const alphabetsRegx = /^[a-zA-Z\s]*$/;
//   return alphabetsRegx.test(v) || 'alpabets only allowed.';
// };

// export const emailValidation = (v: string): boolean | string => {
//   const emailRegx = /^[a-z-0-9_+.-]+\@([a-z0-9-]+\.)+[a-z0-9]{2,7}$/i;
//   return emailRegx.test(v) || 'invalid email address.';
// };

// export const alphaNumericValidation = (v: string): boolean | string => {
//   const alphabetsRegx = /^[A-Za-z0-9]*$/;
//   return alphabetsRegx.test(v) || 'invalid format.';
// };

// export const alphaNumericValidationWithSpace = (
//   v: string,
// ): boolean | string => {
//   const alphabetsRegx = /^[A-Za-z0-9\s]*$/;
//   return alphabetsRegx.test(v) || 'invalid format.';
// };

export const getMinLengthMessage = (length) => {
  return `minimum ${length} characters required.`;
};
// export const getMaxLengthMessage = (length: number): string => {
//   return `maximum ${length} characters required.`;
// };

export const getRquiredMessage = (feild) => {
  return `${feild} is required.`;
};

export const minLengthValidation = (
  length,
)=> {
  return {value: length, message: getMinLengthMessage(length)};
};
export const maxLengthValidation = (
  length,
) => {
  return {value: length, message: getMaxLengthMessage(length)};
};

export const requiredValidation = (
  label,
)=> {
  return {value: true, message: getRquiredMessage(label)};
};

// export const floatNumberValidation = (v: string): boolean | string => {
//   const numberRegx_ = /^[-+]?([0-9]+(\.[0-9]+)?|\.[0-9]+)*$/g;
//   return v == '+' || v == '-'
//     ? 'invalid number.'
//     : numberRegx_.test(v) || 'invalid number.';
// };
