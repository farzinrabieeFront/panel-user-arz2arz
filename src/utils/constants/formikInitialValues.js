const initialValues = {
  auth: {
    register: {
      mobile: "",
      email: "",
      password: "",
    },
    login: {
      email: "sajihosseini95516@gmail.com",
      password: "S#ji123456",
    },

    forgetPass: {
      email: "",
      confirmSource: "sms" /**sms - email */,
    },
    // forgetPass: {
    //   email: "sajihosseini95516@gmail.com",
    //   confirmSource: "sms" /**sms - email */,
    // },
    resetPass: {
      password: "",
      confirmPassword: "",
      otpText: "",
    },
    // resetPass: {
    //   password: "S#ji123456",
    //   confirmPassword: "S#ji123456",
    //   otpText: "",
    // },
  },

  verification: {
    personalInfo: {
      firstName: "",
      lastName: "",
      fatherName: "",
      birthDate: "",
      nationalCode: "",
      // birthCertificateNumber: "",
      postalCode: "",
      phone: "",
      // mobile: "",
      city: "",
      // otp: "",
      // gender: "",
      // country: "",
      // province: "",
      // address: "",
    },
    identity: {
      // image: "",
      // verificationSelfie: "",
    },
  },

  ticket: {
    createTicket: {
      title: "",
      description: "",
    },
  },

  resetPass: {
    password: "",
    newPassword: "",
    confirmNewPassword: "",
    otpText: "",
    confirmSource: "sms",
    nonce: "",
  },
};

export default initialValues;
