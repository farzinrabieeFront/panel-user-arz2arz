import * as yup from "yup";

export const changePass = yup.object().shape({
  currentPassword: yup.string().required(`این فیلد الزامی است.`),
  newPassword: yup
    .string()
    .required(`این فیلد الزامی است.`)
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
  newPassword2: yup
    .string()
    .required(`این فیلد الزامی است.`)
    .oneOf([yup.ref("newPassword"), null], "رمز عبور مطابقت ندارد"),
});

export const otpForm = yup.object().shape({
  otpText: yup.string().required().min(6),
});

export const antiPhishingPass = yup.object().shape({
  password: yup.string().required(`این فیلد الزامی است.`),
});

export const antiPhishingCode = yup.object().shape({
  code: yup.string().required(`این فیلد الزامی است.`).matches(/^\d{4}$/, "کد ورودی باید 4 رقم باشد"),
});
