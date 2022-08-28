export const ROOT_PATH = '/';
export const EDITOR_NOTE_PATH = '/editor-note/:id';
export const MY_ACCOUNT_PATH = {
  MAIN: '/user/myaccount',
  COUPON: '/user/myaccount/coupon',
  SETTINGS: '/user/myaccount/settings',
  PETINFO: '/user/myaccount/petinfo',
  REVIEWS: '/user/myaccount/reviews',
  USERINFO: '/user/myaccount/userinfo',
  PASSWORDCHECK: '/user/myaccount/userinfo/check',
  PASSWORDCHANGE: '/user/myaccount/userinfo/change',
  TERM1: '/user/myaccount/term1',
  TERM2: '/user/myaccount/term2',
};
export const SIGN_IN_PATH = {
  MAIN: '/user/signin',
  SIGNIN: '/user/signin/login',
  FINDPASSWORD: '/user/signin/findpassword',
  PHONEAUTH: '/user/signin/phoneauth',
  RESETPASSWORD: '/user/signin/resetpassword',
};
export const SIGN_UP_PATH = {
  VERIFY: '/user/signup/verify-phone',
  TERMS: '/user/signup/terms',
  USER_INFO: '/user/signup/user-info',
  USER_PET_INFO: '/user/signup/pet-info',
  COMPLETE: '/user/signup/complete',
  SOCIAL: {
    NICKNAME: '/user/signup/social/nickname',
    USER_PET_INFO: '/user/signup/social/pet-info',
    NO_PHONE: '/user/signup/social/no-phone',
    OTHER: '/user/signup/social/other',
  },
};
export const MY_STORAGE_PATH = '/my-storage';
export const WHERE_TO_GO_PATH = '/where-to-go';
export const DETAIL_PLACE_PATH = {
  MAIN: '/detail-place/:placeId',
  REVIEWS: '/detail-place/:placeId/reviews',
  ROOMTYPES: '/detail-place/:placeId/:roomTypeId',
};
export const REVIEW_WRITING_PATH = '/review-writing/:reservationId';
export const KAKAO_REDIRECT_HANDLE_PATH = '/oauth/callback/kakao';
export const NAVER_REDIRECT_HANDLE_PATH = '/oauth/callback/naver';
export const APPLE_REDIRECT_HANDLE_PATH = '/oauth/callback/apple';
export const RESERVATION_PATH = {
  RESERVATION: '/reservation/:placeId/:roomTypeId/:startDate/:endDate',
  RESERVATION_WAITING: '/reservation-waiting/:placeId/:roomTypeId/:startDate/:endDate',
  RESERVATION_CONFIRM: '/reservation-confirm/:bookingId',
  RESERVATION_CANCLE: '/reservation-cancle/:bookingId',
  RESERVATION_HISTORY: '/reservation-history/:bookingId',
};
