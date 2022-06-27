import { PasswordMeter } from "password-meter";

const passMeter = new PasswordMeter(
  {
    minLength: { value: 8, message: { code: 1, message: "حداقل ۸ کاراکتر" } },
    maxLength: {
      value: 100,
      message: { code: 2, message: "حداکثر ۱۰۰ کاراکتر" },
    },
    uppercaseLettersMinLength: {
      value: 1,
      message: { code: 3, message: "حداقل یک حرف بزرگ انگلیسی" },
    },
    lowercaseLettersMinLength: {
      value: 1,
      message: { code: 4, message: "حداقل یک حرف کوچک انگلیسی" },
    },
    numbersMinLength: {
      value: 1,
      message: { code: 5, message: "حداقل یک عدد" },
    },
    symbolsMinLength: {
      value: 1,
      message: { code: 6, message: "حداقل یک کاراکتر ویژه (*&^%$#@!)" },
    },
  },
  {
    40: "veryWeak",
    80: "weak",
    120: "medium",
    180: "strong",
    200: "veryStrong",
    _: "perfect",
  }
);

export default passMeter;
