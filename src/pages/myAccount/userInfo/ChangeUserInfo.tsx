
import React, { ChangeEvent, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosResponse } from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
import classNames from 'classnames';
import RightArrow from '../../../icons/right-arrow.svg';
import LeftArrow from '../../../icons/left-arrow.svg';
import './ChangeUserInfo.scss';
import { MY_ACCOUNT_PATH } from '../../../constants/path.const';
import { RootState } from '../../../redux/store';
import { nicknameCheck } from '../../../common/api/signup';
import { checkNickname } from '../../signUpPage/userInfo/ValidCheck';

function ChangeUserInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialNickName = useSelector((state: RootState) => state.persist.user.user.nickname);
  const [enteredInput, setEnteredInput] = useState(initialNickName);
  const [validInput, setValidInput] = useState('');
  const [nicknameDuplicated, setNicknameDuplicated] = useState(true);
  const [nicknameDupCheckFail, setNicknameDupCheckFail] = useState(false);
  const [feedback, setFeedback] = useState('');
  const user = useSelector((state: RootState) => state.persist.user.user);
  const { email, phone } = user;
  const nicknameRef = useRef<any>();
  const phoneNumber = `${phone.slice(0, 3)}-****-${phone.slice(7, 11)}`;
  const userEmail = `${email.slice(0, 4)}****${email.slice(8)}`;
  const location: any = useLocation();


  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEnteredInput(e.target.value);
    nicknameValidCheck(e.target.value);
    setNicknameDuplicated(true);
    setNicknameDupCheckFail(false);
  };

  const nicknameDupCheck = () => {
    nicknameCheck(
      enteredInput,
      (response: AxiosResponse) => {
        const { code } = response.data;
        if (code === 200) {
          setNicknameDuplicated(false);
          setNicknameDupCheckFail(false);
        } else {
          setNicknameDuplicated(true);
          setNicknameDupCheckFail(true);
          nicknameRef.current.focus();
        }
      },
      dispatch,
    );
  };

  const nicknameValidCheck = (value: string) => {
    const response = checkNickname(value);

    if (!response.isValid) {
      setValidInput('');
    } else {
      setValidInput(value);
    }

    setFeedback(response.message);
  };

  const moveToMyAccountMainPage = () => {
    navigate(MY_ACCOUNT_PATH.MAIN,{
      state: {
        prevPath: location.pathname,
      },
    })
  };

  return (
    <div className="userinfo">
      <div className="userinfo-header">
        <img
          src={LeftArrow}
          alt="back"
          aria-hidden="true"
          className="userinfo-header-back"
          onClick={moveToMyAccountMainPage}
        />
        <div className="userinfo-header-title">내 정보 관리</div>
      </div>
      <div className="userinfo-nickname-label">닉네임</div>
      <div className="userinfo-nickname">
        {/* <span className="userinfo-phone-value">{nickName}</span> */}
        {/* 아직 닉네임 변경 api가 없어서 막아놈 */}
        <input onChange={inputChangeHandler} className="login-input change-nickname" value={enteredInput} ref={nicknameRef} />
        <p className={classNames('input-feedback', { fine: !nicknameDuplicated && validInput })}>
          {nicknameDupCheckFail ? '이미 사용중인 닉네임입니다.' : feedback}
        </p>
        <span aria-hidden="true" className="input-email-check" onClick={nicknameDupCheck}>
          중복확인
        </span>
      </div>
      <div className="userinfo-phone">
        <div className="userinfo-phone-label">휴대전화</div>
        <span className="userinfo-phone-value">{phoneNumber}</span>
      </div>
      {email.length > 0 && (
        <div className="userinfo-email">
          <div className="userinfo-email-label">이메일</div>
          <span className="userinfo-email-value">{userEmail}</span>
        </div>
      )}
      <div className="userinfo-devide" />
      {email.length > 0 && (
        <div
          className="userinfo-password"
          aria-hidden="true"
          onClick={() => {
            navigate(MY_ACCOUNT_PATH.PASSWORDCHECK);
          }}
        >
          <div className="userinfo-password-label">비밀번호 변경</div>
          <img className="userinfo-password-button" alt="button" src={RightArrow} />
        </div>
      )}
    </div>
  );
}

export default ChangeUserInfo;
