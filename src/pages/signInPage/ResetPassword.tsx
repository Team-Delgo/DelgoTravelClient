import React, { ChangeEvent, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { ReactComponent as Arrow } from '../../icons/left-arrow.svg';
import { SIGN_IN_PATH } from '../../constants/path.const';
import { changePassword } from '../../common/api/login';
import { checkPasswordConfirm } from "../signUpPage/userInfo/ValidCheck";
import "./ResetPassword.scss";

interface Input {
  password: string;
  passwordConfirm: string;
}

function ResetPassword() {
  const [enteredInput, setEnteredInput] = useState<Input>({ password: '', passwordConfirm: '' });
  const [confirmValid, setConfirmValid] = useState(false);
  const [feedback, setFeedback] = useState('');
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const email = useLocation().state as string;
  const isValid = enteredInput.password.length >= 8 && confirmValid;

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setEnteredInput((prev: Input) => {
      return { ...prev, [id]: value };
    });

    if (id === 'passwordConfirm') {
      const result = checkPasswordConfirm(enteredInput.password, value);
      const { isValid, message } = result;
      setConfirmValid(isValid);
      setFeedback(message);
    }
  };

  const submitHandler = () => {
    // axios
    if (isValid) {
      changePassword(email, enteredInput.password, (response: AxiosResponse) => {
        const { code } = response.data;
        if (code === 200) {
          navigation(SIGN_IN_PATH.MAIN);
        }
      }, dispatch);
    }
  };

  return (
    <div className="login">
      <div aria-hidden="true" className="login-back" onClick={() => navigation(-1)}>
        <Arrow />
      </div>
      <header className="login-header">새 비밀번호 설정</header>
      <div className="login-description">
        인증이 완료되었습니다.
        <br />
        새로운 비밀번호를 입력해주세요.
      </div>
      <div className="login-input-box">
        <input
          className="login-input reset"
          placeholder="새 비밀번호 (최소8자 이상)"
          id="password"
          type="password"
          autoComplete="off"
          value={enteredInput.password}
          onChange={inputChangeHandler}
        />
      </div>
      <div className="login-input-box">
        <input
          className="login-input reset-confirm"
          placeholder="새 비밀번호 확인"
          id="passwordConfirm"
          type="password"
          autoComplete="off"
          value={enteredInput.passwordConfirm}
          onChange={inputChangeHandler}
        />
        <p className='input-feedback'>{feedback}</p>
      </div>
      <button type="button" disabled={!isValid} className={classNames('login-button', { active: isValid })} onClick={submitHandler}>
        확인
      </button>
    </div>
  );
}

export default ResetPassword;
