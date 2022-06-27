/** Auth urls */
export const Register = '/auth/register/';
export const Login = '/auth/login/';
export const ForgotPass = '/auth/forgetPassword/';

export const LoginGenerateOtp = '/auth/login/otp/internal/generate/';
export const RegisterGenerateOtp = '/auth/register/otp/internal/generate/';
export const ForgetPasswordGenerateOtp = '/auth/forgetPassword/otp/internal/generate/';

export const LoginResendOtp = '/auth/login/otp/internal/generate/';
export const RegisterResendOtp = '/auth/register/otp/internal/generate/';
export const ForgetPasswordResendOtp = '/auth/forgetPassword/otp/internal/generate/';

export const LoginConfirmOtp = '/auth/login/otp/internal/confirm/';
export const RegisterConfirmOtp = '/auth/register/otp/internal/confirm/';
export const ForgetPasswordConfirmOtp = '/auth/forgetPassword/otp/internal/confirm/';

export const LoginConfirmGoogle = '/auth/login/otp/googleAuth/confirm/';
export const ForgetPasswordConfirmGoogle = '/auth/forgetPassword/otp/googleAuth/confirm/';

export const UpdatePassword = '/auth/forgetPassword/update-password/';

export const Logout = '/auth/logout/';

export const RefreshToken = '/auth/renewAccessToken/';

{/** BankAccount api list */ }
export const BankAccounts = '/profile/bankAccount/';
export const BankAccount = '/profile/bankAccount/_id/';
export const VerifyRequestBankAccount = '/profile/bankAccount/verifyRequest/_id/';
export const ChangeStatusBankAccount = '/profile/bankAccount/changeStatus/_id/';

{/** Wallet api list */ }
export const Wallet = '/spot/currency/';
export const TotalAmount = '/spot/currency/total-amount/';
export const PercentageSpots = '/spot/currency/cake/';


{/** Deposit api list */ }
export const FiatDeposit = '/fiat/deposit/gateway/';
export const RetryFiatDeposit = '/fiat/deposit/gateway/retry/';
export const VerifyFiatDeposit = '/fiat/deposit/gateway/verify/';

export const SpotDeposit = '/spot/deposit/';
export const CreateSpotDepositAddress = '/spot/deposit/new-address/';

{/** Withdraw api list */ }
export const FiatWithdraw = '/fiat/withdraw/';
export const CancelFiatWithdraw = '/fiat/withdraw/cancel/';
export const VerifyFiatWithdraw = '/fiat/withdraw/verify/';
export const ResendOtpFiatWithdraw = '/fiat/withdraw/resendOTP/';

export const SpotWithdraw = '/spot/withdraw/';
export const InternalSpotWithdraw = '/spot/withdraw/transfer/';
export const VerifySpotWithdraw = '/spot/withdraw/verify/';
export const VerifyInternalSpotWithdraw = '/spot/withdraw/transfer/verify/';
export const ResendOtpSpotWithdraw = '/spot/withdraw/resendOTP/';
export const ResendOtpInternalSpotWithdraw = '/spot/withdraw/transfer/resendOTP/';
export const SpotAddressChecker = '/spot/withdraw/addressChecker/';
export const FavoriteAddresses = '/spot/withdraw/favoriteAddresses/';
export const FavoriteAddress = '/spot/withdraw/favoriteAddresses/_id/';

{/** Order api list */ }
export const FiatOrders = '/fiat/trade/';
export const SpotOrders = '/spot/trade/';
export const MarketOrder = '/spot/market/';
export const LimitOrder = '/spot/limit/';
export const SpotOrder = '/spot/trade/_id/';
export const CloseLimitOrder = '/spot/cancel/';
export const FavoriteMarkets = '/spot/favorites/';
export const ExchangeOrders = '/exchange/trades/';


{/** Security api list */ }
export const Sessions = '/session/';
export const RevokeSession = '/session/_id/';
export const LoginActivities = '/profile/account/security/loginActivity/';
export const SecurityActivities = '/profile/account/security/securityActivity/';
export const AntiPhishingVerufyPassword = '/profile/antiPhishing/';
export const AntiPhishingChangeCode = '/profile/antiPhishing/confirm/';
export const Activation2FA = '/profile/2fa/_type/enable/';
export const DeActivation2FA = '/profile/2fa/_type/disable/';
export const ChangePasswordGenerateOtp = '/auth/changePassword/otp/internal/generate/';
export const ChangePasswordConfirmInternalOtp = '/auth/changePassword/otp/internal/confirm/';
export const ChangePasswordConfirmGoogleOtp = '/auth/changePassword/otp/googleAuth/confirm/';
export const SecurityChangePassword = '/auth/changePassword/update-password/';


{/** Authentication api list */ }
export const Identity = '/profile/identity/';
export const DownloadDocument = '/profile/identity/static/serve/_id/_name';
export const UploadNationalCardImageIdentity = '/profile/identity/static/upload/national-card';
export const UploadVideoIdentity = '/profile/identity/static/upload/video';
export const Auth_BankAccount = '/profile/identity/bankAccount/';
export const AuthChangeStatusBankAccount = '/profile/identity/bankAccount/_id/';
export const Auth_VerifyIdentityRequest = '/profile/identity/verifyRequest/';
export const Auth_GenerateOTP = '/profile/identity/otp/_type/generate/';
export const Auth_ConfirmOTP = '/profile/identity/otp/_type/confirm/';

{/** Ticket api list */ }
export const Tickets = '/ticket/';
export const Ticket = '/ticket/_id/';
export const TicketImage = '/ticket/image/_id/_name/';
export const TicketCateogries = '/ticket/category/';
export const TicketReply = '/ticket/message/';
export const CloseTicket = '/ticket/closeTicket/_id/';
export const CommonQuestions = '/faqManagement/question/search/';

{/** base api list */ }
export const Config = '/exchange/config/';
export const Markets = '/exchange/config/markets/';


export const Notifications = '/notifications/';
export const Notification = '/notifications/_id/';
export const ReadNotification = '/notifications/read/';
export const ReadAllNotifications = '/notifications/all/';


// public API list
export const PublicApis = [
    Register,
    Login,
    ForgotPass,
    LoginGenerateOtp,
    RegisterGenerateOtp,
    ForgetPasswordGenerateOtp,
    LoginResendOtp,
    RegisterResendOtp,
    ForgetPasswordResendOtp,
    LoginConfirmOtp,
    RegisterConfirmOtp,
    ForgetPasswordConfirmOtp,
    LoginConfirmGoogle,
    ForgetPasswordConfirmGoogle,
    UpdatePassword
]