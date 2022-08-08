import React, { useState, ChangeEvent, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { userActions } from '../../redux/slice/userSlice';
import { tokenActions } from '../../redux/slice/tokenSlice';
import { ReactComponent as Arrow } from '../../icons/left-arrow.svg';
import ToastMessage from '../../common/dialog/ToastMessage';
import { login } from '../../common/api/login';
import './Login.scss';
import { checkEmail, checkPasswordLogin } from '../signUpPage/userInfo/ValidCheck';
import Loading from '../../common/utils/Loading';
import { ROOT_PATH } from '../../constants/path.const';

interface Input {
  email: string;
  password: string;
}

interface State {
  email: string;
}

function Login() {
  const [enteredInput, setEnteredInput] = useState<Input>({ email: '', password: '' });
  const [loginFailed, setLoginFailed] = useState(false);
  const [feedback, setFeedback] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const state = useLocation().state as State;
  const { email } = state;

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    if (id === 'email') {
      const response = checkEmail(value);
      setFeedback((prev: Input) => {
        return { ...prev, email: response.message };
      });
    } else if (id === 'password') {
      const response = checkPasswordLogin(value);
      setFeedback((prev: Input) => {
        return { ...prev, password: response.message };
      });
    }
    setEnteredInput((prev: Input) => {
      return { ...prev, [id]: value };
    });
  };

  const loginFetch = () => {
    login(
      { email, password: enteredInput.password },
      (response: AxiosResponse) => {
        const { code, data } = response.data;
        console.log(data);
        console.log(response);
        if (code === 200) {
          setIsLoading(true);
          dispatch(
            userActions.signin({
              isSignIn: true,
              couponList: data.couponList,
              user: {
                id: data.user.userId,
                nickname: data.user.name,
                email: data.user.email,
                phone: data.user.phoneNo,
                isSocial: false,
              },
              pet: {
                petId: data.pet.petId,
                birthday: data.pet.birthday,
                size: data.pet.size,
                name: data.pet.name,
                image: data.user.profile,
              },
            }),
          );

          const accessToken = response.headers.authorization_access;
          const refreshToken = response.headers.authorization_refresh;
          dispatch(tokenActions.setToken(accessToken));
          localStorage.setItem('refreshToken', refreshToken);
          navigation(ROOT_PATH, { replace: true });
        } else if (code === 304) {
          setIsLoading(false);
          setFeedback((prev) => {
            return { ...prev, password: '비밀번호를 확인하세요' };
          });
          setLoginFailed(true);
        }
      },
      dispatch,
    );
  };

  const loginButtonHandler = () => {
    loginFetch();
  };

  useEffect(() => {
    if (loginFailed) {
      setTimeout(() => {
        setLoginFailed(false);
      }, 2500);
    }
  }, [loginFailed]);

  const findPassword = () => {
    navigation('/user/signin/findpassword');
  };

  return (
    <div className="login-signin">
      {isLoading && <Loading />}
      <div aria-hidden="true" className="login-back" onClick={() => navigation(-1)}>
        <Arrow />
      </div>
      <div className="login-title-wrapper">
        <div className="login-title1">우리집 강아지도</div>
        <div className="login-title2">델고가요</div>
        <div className="login-subtitle">동반 장소를 발견하고 저장하세요</div>
      </div>
      <div className="login-input-flex">
        <div className="login-input-box">
          <input
            className={classNames('login-input', { invalid: feedback.password.length })}
            placeholder="비밀번호"
            id="password"
            type="password"
            autoComplete="off"
            value={enteredInput.password}
            onChange={inputChangeHandler}
          />
          <p className="login-feedback">{feedback.password}</p>
        </div>

        <button type="button" className="login-button active loginpage" onClick={loginButtonHandler}>
          로그인
        </button>
        <div className="login-find_password" aria-hidden="true" onClick={findPassword}>
          비밀번호찾기
        </div>
      </div>
    </div>
  );
}

export default Login;
