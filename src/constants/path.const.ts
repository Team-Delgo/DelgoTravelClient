export const ROOT_PATH = '/';

// TODO:: 개선하기 https://www.albertgao.xyz/2019/09/07/reuse-react-router-routes-constants-with-hooks-when-navigating/
export const EDITOR_NOTE_PATH = '/editor-note/:id';

export const SIGN_IN_PATH = '/user/sign-in';

export const SIGN_UP_PATH = {
  VERIFY: '/user/sign-up/verify-phone',
  TERMS: '/user/signup/',
  USER_INFO: '/user/signup/user-info',
  USER_PET_INFO: '/user/sign-up/pet-info'
};
