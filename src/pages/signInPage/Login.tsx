import React, { useState, ChangeEvent, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { userActions } from '../../redux/slice/userSlice';
import { tokenActions } from '../../redux/slice/tokenSlice';
import { ReactComponent as Arrow } from '../../icons/left-arrow.svg';
import ToastMessage from '../../common/dialog/ToastMessage';
import { login } from '../../common/api/login';
import './Login.scss';
import { checkEmail, checkPasswordLogin } from '../signUpPage/userInfo/ValidCheck';

interface Input {
  email: string;
  password: string;
}

function Login() {
  const [enteredInput, setEnteredInput] = useState<Input>({ email: '', password: '' });
  const [loginFailed, setLoginFailed] = useState(false);
  const [feedback, setFeedback] = useState({ email: '', password: '' });
  const navigation = useNavigate();
  const dispatch = useDispatch();

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
      enteredInput,
      (response: AxiosResponse) => {
        const { code, data } = response.data;
        console.log(data);
        console.log(response);
        if (code === 200) {
          dispatch(
            userActions.signin({
              user: {
                id: data.user.userId,
                nickname: data.user.name,
                email: data.user.email,
                phone: data.user.phoneNo,
              },
              pet: {
                petId: data.pet.petId,
                birthdat: data.pet.birthday,
                size: data.pet.size,
                weight: data.pet.weight,
                name: data.pet.name,
                image: data.user.profile,
              },
            }),
          );

          const accessToken = response.headers.authorization_access;
          const refreshToken = response.headers.authorization_refresh;
          dispatch(tokenActions.setToken(accessToken));
          localStorage.setItem('refreshToken', refreshToken);
          navigation('/');
        } else if (code === 304) {
          setFeedback((prev) => {
            return { ...prev, password: '아이디 또는 비밀번호를 확인하세요' };
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
    <div className="login">
      <div aria-hidden="true" className="login-back" onClick={() => navigation(-1)}>
        <Arrow />
      </div>
      <header className="login-header">로그인</header>
      <span className="login-span">이메일</span>
      <div className="login-input-box">
        <input
          className={classNames('login-input', { invalid: feedback.email.length })}
          placeholder="이메일"
          id="email"
          autoComplete="false"
          value={enteredInput.email}
          onChange={inputChangeHandler}
        />
        <p className="login-feedback">{feedback.email}</p>
      </div>
      <span className="login-span">비밀번호</span>
      <div className="login-input-box">
        <input
          className={classNames('login-input', { invalid: feedback.password.length })}
          placeholder="영문+숫자 포함 8자리 이상"
          id="password"
          type="password"
          autoComplete="false"
          value={enteredInput.password}
          onChange={inputChangeHandler}
        />
        <p className="login-feedback">{feedback.password}</p>
      </div>
      <div className="login-find_password" aria-hidden="true" onClick={findPassword}>
        비밀번호찾기
      </div>
      <button type="button" className="login-button active loginpage" onClick={loginButtonHandler}>
        로그인
      </button>

    </div>
  );
}

export default Login;
