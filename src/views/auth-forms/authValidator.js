import * as yup from "yup";

export const registerSchema = yup.object().shape({
    email: yup
        .string()
        .required(`این فیلد الزامی است.`)
        .email("فرمت ایمیل وارد شده اشتباه است."),
    password: yup
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
    confirmPassword: yup
        .string()
        .required(`این فیلد الزامی است.`)
        .oneOf([yup.ref("password"), null], "رمز عبور مطابقت ندارد"),
})

export const loginSchema = yup.object().shape({
    email: yup
        .string()
        .required(`این فیلد الزامی است.`)
        .email("فرمت ایمیل وارد شده اشتباه است."),
    password: yup.string()
        .required(`این فیلد الزامی است.`),
})

export const otp = yup.object().shape({
    // otpText: yup.string().required(`این فیلد الزامی است.`),
})

export const forgetPass = yup.object().shape({
    // email: yup
    //     .string()
    //     .required(`این فیلد الزامی است.`)
    //     .email("فرمت ایمیل وارد شده اشتباه است."),
})

export const resetPass = yup.object().shape({
    // password: filedSchemas.password,
    // confirmPassword: yup
    //     .string()
    //     .required(`این فیلد الزامی است.`)
    //     .oneOf([yup.ref("password"), null], "رمز عبور مطابقت ندارد"),
    // otpText: yup.string().required(`این فیلد الزامی است.`),
})