import * as yup from "yup";
import regexes from "./constants/validatorRegexes";

// yup.setLocale({
//   mixed: {
//     required: "REQUIRED",
//   },
// });

const requiredMessage = `این فیلد الزامی است.`;

const filedSchemas = {
  password: yup
    .string()
    .required(requiredMessage)
    .matches(/(?=.*[0-9])/, {
      message: "باید حداقل شامل یک عدد باشد",
      excludeEmptyString: false,
    })
    .matches(/(?=.*[A-Z])/, {
      message: "باید حداقل شامل یک حرف بزرگ باشد",
      excludeEmptyString: false,
    })
    .matches(/(?=.*[a-z])/, {
      message: "باید حداقل شامل یک حرف کوچک باشد",
      excludeEmptyString: false,
    })
    .matches(/(?=.*[\.!@#$%^&*])/, {
      message: "باید شامل حداقل یک سیمبل(.!@#$%^&*) باشد",
      excludeEmptyString: false,
    })
    .min(8, "باید حداقل ۸ کاراکتر باشد"),
};

const authsSchema = {
  register: yup.object().shape({
    mobile: yup.string().required(requiredMessage).matches(regexes.mobile, {
      message: "شماره وارد شده اشتباه است",
      excludeEmptyString: false,
    }),
    email: yup
      .string()
      .required(requiredMessage)
      .email("فرمت ایمیل وارد شده اشتباه است."),
    password: filedSchemas.password,
    confirmPassword: yup
      .string()
      .required(requiredMessage)
      .oneOf([yup.ref("password"), null], "رمز عبور مطابقت ندارد"),
  }),

  login: yup.object().shape({
    email: yup
      .string()
      .required(requiredMessage)
      .email("فرمت ایمیل وارد شده اشتباه است."),
    password: filedSchemas.password,
    type: yup.number().moreThan(0, `* انتخاب نوع عبور الزامی است`),
  }),

  otp: yup.object().shape({
    otpText: yup.string().required(requiredMessage),
  }),

  forgetPass: yup.object().shape({
    email: yup
      .string()
      .required(requiredMessage)
      .email("فرمت ایمیل وارد شده اشتباه است."),
  }),

  resetPass: yup.object().shape({
    password: filedSchemas.password,
    confirmPassword: yup
      .string()
      .required(requiredMessage)
      .oneOf([yup.ref("password"), null], "رمز عبور مطابقت ندارد"),
    otpText: yup.string().required(requiredMessage),
  }),
};

const verificationSteps = {
  personalInfoFormSchema: yup.object().shape({
    personalInfo: {
      firstName: yup
        .string()
        .required(requiredMessage)
        .matches(regexes.persianLetters, "لطفا به فارسی وارد کنید"),
      lastName: yup
        .string()
        .required(requiredMessage)
        .matches(regexes.persianLetters, "لطفا به فارسی وارد کنید"),
      fatherName: yup
        .string()
        .required(requiredMessage)
        .matches(regexes.persianLetters, "لطفا به فارسی وارد کنید"),
      // birthDate: "",
      year: yup.string().required(requiredMessage),
      month: yup.string().required(requiredMessage),
      day: yup.string().required(requiredMessage),
      nationalCode: yup
        .string()
        .required(requiredMessage)
        .matches(regexes.nationalCode, "کدملی فقط شامل اعداد است")
        .length(10, "کدملی 10 رقم است."),
      birthCertificateNumber: "",
      postalCode: yup
        .string()
        .required(requiredMessage)
        .matches(regexes.postalCode, "کد پستی فقط شامل اعداد است")
        .length(10, "کد پستی 10 رقم است."),
      city: yup
        .string()
        .required(requiredMessage)
        .matches(regexes.city, "صفر ابتدای کد الزامی است."),
      phone: yup
        .string()
        .required(requiredMessage)
        .matches(regexes.phone, "شماره نادرست است."),
      mobile: yup.string().required(requiredMessage).matches(regexes.mobile, {
        message: "شماره وارد شده اشتباه است",
        excludeEmptyString: false,
      }),
      otp: yup
        .string()
        .required(requiredMessage)
        .matches(regexes.number, "کدتایید فقط شامل اعداد است.")
        .length(6, "کد تایید 6 رقم است."),
      // gender: "",
      // country: "",
      // province: "",
      // address: "",
    },
  }),
};

const transactionsSchema = {
  rialDeposit: yup.object().shape({
    amount: yup
      .string()
      .required(requiredMessage)
      // .min(6, "حداقل مبلغ واریزی ۱۰۰,۰۰۰ ریال است.")
      .matches(/(\d{1,3})[,.]*/g, "فقط عدد وارد کنید"),
    // // .matches(/^\d*\.?\d*$/g, "لطفا مقدار را درست وارد نمایید"),
    bankAccount: yup.string().required(requiredMessage),
  }),

  assetDeposit: yup.object().shape({
    first_name: yup.string().required(),
  }),

  rialWithdraw: yup.object().shape({
    amount: yup
      .string()
      .required(requiredMessage)
      // .min(6, "حداقل مبلغ واریزی ۱۰۰,۰۰۰ ریال است.")
      .matches(/(\d{1,3})[,.]*/g, "فقط عدد وارد کنید"),
    // .matches(/^\d*\.?\d*$/g, "لطفا مقدار را درست وارد نمایید"),
    bankAccount: yup.string().required(requiredMessage),
  }),

  spotWithdraw: yup.object().shape({
    amount: yup
      .string()
      .required(requiredMessage)
      // .min(6, "حداقل مبلغ واریزی ۱۰۰,۰۰۰ ریال است.")
      .matches(/(\d{1,3})[,.]*/g, "فقط عدد وارد کنید"),
    // .matches(/^\d*\.?\d*$/g, "لطفا مقدار را درست وارد نمایید"),
    card: yup.string().required(requiredMessage),
  }),

  withdraw: {
    asset: yup.object().shape({
      amount: yup.string().matches(/[0-9.]/g, "لطفا مقدار را درست وارد نمایید"),
      receiver: yup.string().required(requiredMessage),
    }),

    verification: yup.object().shape({
      email_code: yup.string().required(requiredMessage),
      ga_code: yup.string().required(requiredMessage),
    }),
  },
};

const ticketSchema = {
  createTicket: yup.object().shape({
    title: yup.string().required(requiredMessage),
    description: yup.string().required(requiredMessage),
  }),

  sell: yup.object().shape({
    baseAmount: yup.string().required(requiredMessage).matches(/\d/, {
      message: "فقط عدد وارد کنید.",
      excludeEmptyString: false,
    }),
    // spotAsset: yup.string().required(requiredMessage),
  }),
};

const cardSchema = yup.object().shape({
  card: yup.string(),
  sheba: yup.string(),
  bank: yup.string(),
});

const validators = {
  authsSchema,
  verificationSteps,
  transactionsSchema,
  ticketSchema,
  cardSchema,
};

export default validators;
