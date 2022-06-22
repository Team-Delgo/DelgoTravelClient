import React, { useState, ChangeEvent, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userActions } from '../../redux/reducers/userSlice';
import { tokenActions } from '../../redux/reducers/tokenSlice';
import { ReactComponent as Arrow } from '../../icons/left-arrow.svg';
import ToastMessage from '../../common/dialog/ToastMessage';
import { login } from '../../common/api/login';
import "./Login.scss";

interface Input {
  email: string;
  password: string;
}

function Login() {
  const [enteredInput, setEnteredInput] = useState<Input>({ email: '', password: '' });
  const [loginFailed, setLoginFailed] = useState(false);
  const navigation = useNavigate();
  const dispatch = useDispatch();



  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setEnteredInput((prev: Input) => {
      return { ...prev, [id]: value };
    });
  };

  const loginFetch = () => {
    login(enteredInput, (response: AxiosResponse) => {
      const { code, data } = response.data;
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
        dispatch(
          tokenActions.setToken(accessToken),
        );
        localStorage.setItem('refreshToken', refreshToken);
        navigation('/');
      } else if (code === 303) {
        setLoginFailed(true);
      }
    }, dispatch);
  }

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
          className="login-input"
          placeholder="이메일"
          id="email"
          value={enteredInput.email}
          onChange={inputChangeHandler}
        />
      </div>
      <span className="login-span">비밀번호</span>
      <div className="login-input-box">
        <input
          className="login-input"
          placeholder="비밀번호"
          id="password"
          type="password"
          value={enteredInput.password}
          onChange={inputChangeHandler}
        />
      </div>
      <button type="button" className="login-button active" onClick={loginButtonHandler}>
        다음
      </button>
      <div className='login-find_password' aria-hidden="true" onClick={findPassword}>비밀번호찾기</div>
      {loginFailed && <ToastMessage message="아이디 비밀번호를 확인해 주세요" />}
    </div>
  );
}

export default Login;