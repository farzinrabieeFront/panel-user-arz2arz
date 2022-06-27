import * as Yup from "yup";

const requiredMessage = (name) => `وارد کردن ${name} الزامی است`;

const antiPhishingValidators = {
  password: Yup.object().shape({
    password: Yup.string().required(requiredMessage("رمز عبور")),
  }),
  code: Yup.object().shape({
    code: Yup.string()
      .required(requiredMessage("کد 4 رقمی Anti-Phishing"))
      ,
  }),
};
export default antiPhishingValidators;
