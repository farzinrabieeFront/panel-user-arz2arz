import * as yup from "yup";

export const personalInfoSchema = yup.object().shape({
  firstName: yup.string().matches(/^[\u0600-\u06FF\s]+$/, {
    message: "لطفا فارسی وارد کنید.",
    excludeEmptyString: false,
  }),
  lastName: yup.string().matches(/^[\u0600-\u06FF\s]+$/, {
    message: "لطفا فارسی وارد کنید.",
    excludeEmptyString: false,
  }),
  nationalCode: yup.string(),
  birthDate: yup.string(),
  gender: yup.string(),
  city: yup.string().matches(/^[\u0600-\u06FF\s]+$/, {
    message: "لطفا فارسی وارد کنید.",
    excludeEmptyString: false,
  }),
});

export const phone = yup.object().shape({
  phone: yup
    .string()
    .matches(/^\d+$/, {
      message: "لطفا فقط عدد وارد کنید.",
      excludeEmptyString: false,
    })
    .matches(/^0\d{10}$/, {
      message: "شماره تلفن را درست وارد کنید",
      excludeEmptyString: false,
    }),
});

export const mobile = yup.object().shape({
  mobile: yup
    .string()
    .matches(/^\d+$/, {
      message: "لطفا فقط عدد وارد کنید.",
      excludeEmptyString: false,
    })
    .matches(/^0\d{10}$/, {
      message: "شماره تلفن را درست وارد کنید",
      excludeEmptyString: false,
    }),
});

export const bankInfo = yup.object().shape({
  bank: yup.string(),
  card: yup.string().matches(/^(?=.{16}$)[0-9]*$/, {
    message: "فرمت اشتباه است",
    excludeEmptyString: false,
  }),
  sheba: yup.string().matches(/^(?=.{24}$)[0-9]*$/, {
    message: "فرمت اشتباه است",
    excludeEmptyString: false,
  }),
});
