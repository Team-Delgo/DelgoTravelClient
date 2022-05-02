export const ROOT_PATH = '/';

// TODO:: 개선하기 https://www.albertgao.xyz/2019/09/07/reuse-react-router-routes-constants-with-hooks-when-navigating/
export const EDITOR_NOTE_PATH = '/editor-note/:id';
export const MY_ACCOUNT_PATH = '/user/myaccount';
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
};

export const WISH_LIST_PATH = '/wish-list';

export const WHERE_TO_GO = '/where-to-go';
