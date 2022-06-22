import React, { useState, useEffect, ChangeEvent } from 'react';
import classNames from 'classnames';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { errorActions } from '../../../redux/reducers/errorSlice';
import ToastMessage from '../../../common/dialog/ToastMessage';
import './VerifyPhone.scss';
import Timer from './Timer';
import { SIGN_UP_PATH } from '../../../constants/path.const';
import { ReactComponent as Check } from '../../../icons/check.svg';
import { ReactComponent as Arrow } from '../../../icons/left-arrow.svg';
import { phoneSendMessage, phoneCheckNumber } from '../../../common/api/signup';

function VerifyPhone() {
  const navigation = useNavigate();
  const [buttonIsClicked, setButtonIsClicked] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [authNumber, setAuthNumber] = useState('');
  const [isSended, setIsSended] = useState(false);
  const [timeIsValid, setTimeIsValid] = useState(true);
  const [isReSended, setIsReSended] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [SMSid, setSMSid] = useState(0);
  const [phoneIsExist, setPhoneIsExist] = useState(false);
  const authIsValid = timeIsValid && authNumber.length === 4;
  const isValid = phoneNumber.length === 11;
  const isEntered = phoneNumber.length > 0;

  const buttonClickHandler = () => {
    //  인증번호 전송 요청
    phoneSendMessage(
      phoneNumber,
      (response: AxiosResponse) => {
        const { code, data } = response.data;

        if (code === 200) {
          setSMSid(data);
          setButtonIsClicked(true);
          setIsSended(true);
          setPhoneIsExist(false);
        } else{
          setPhoneIsExist(true);
        }
      },
      errorHandler,
    );
  };

  const dispatch = useDispatch();
  const errorHandler = () => {
    dispatch(errorActions.setError());
  };

  useEffect(() => {
    if (buttonIsClicked) {
      setTimeout(() => {
        setButtonIsClicked(false);
      }, 2500);
    }
  }, [buttonIsClicked]);

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (isSended) return;
    const { value } = event.target;
    const onlyNumber = value.replace(/[^-0-9]/g, '');
    if (phoneNumber.length === 11 && value.length > 11) return;
    setPhoneNumber(onlyNumber);
    setPhoneIsExist(false);
  };

  const clearButtonHandler = () => {
    if (isSended) return;
    setPhoneNumber('');
    setPhoneIsExist(false);
  };

  const authChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (authNumber.length === 4 && event.target.value.length > 4) return;
    setAuthNumber(event.target.value);
    setFeedback('');
  };

  const authNumberResend = () => {
    phoneSendMessage(
      phoneNumber,
      (response: AxiosResponse) => {
        const { code } = response.data;

        if (code === 200) {
          setIsReSended(true);
          setButtonIsClicked(true);
          setTimeIsValid(true);
          setPhoneIsExist(false);
        }
      },
      errorHandler,
    );
    //  인증번호 전송 요청
  };

  const resetIsResend = () => {
    setIsReSended(false);
  };

  const submitAuthNumber = () => {
    phoneCheckNumber(
      { number: authNumber, smsId: SMSid },
      (response: AxiosResponse) => {
        const { code } = response.data;
        console.log(response);
        if (code === 200) {
          navigation(SIGN_UP_PATH.USER_INFO, { state: { phone: phoneNumber } });
        } else {
          setFeedback('인증번호를 확인해주세요');
        }
      },
      errorHandler,
    );
  };

  const buttonContext = !isSended ? (
    <button type="button" className={classNames('login-button', { active: isValid })} onClick={buttonClickHandler}>
      인증번호 발송
    </button>
  ) : (
    <button
      type="button"
      disabled={!authIsValid}
      className={classNames('login-button', { active: authIsValid })}
      onClick={submitAuthNumber}
    >
      다음
    </button>
  );

  return (
    <div className="login">
      <div aria-hidden="true" className="login-back" onClick={() => navigation(-1)}>
        <Arrow />
      </div>
      <header className="login-header">휴대폰 인증</header>
      <span className="login-description phone">원활한 서비스 제공을 위해 휴대폰 번호를 입력해주세요</span>
      <div className="login-inputbox">
        <input
          value={phoneNumber}
          onChange={inputChangeHandler}
          className="login-input phonenumber"
          placeholder="휴대폰 번호"
        />
        <p className={classNames('input-feedback')}>
          {phoneIsExist && '이미 가입된 전화번호입니다.'}
        </p>
        {isEntered && (
          <span
            aria-hidden="true"
            className={classNames('login-input-clear', { checked: isSended })}
            onClick={clearButtonHandler}
          >
            {isSended ? <Check /> : <div style={{ fontWeight: 700 }}>X</div>}
          </span>
        )}
      </div>
      {isSended && (
        <div className="login-authnumber">
          <input
            value={authNumber}
            onChange={authChangeHandler}
            className="login-input authnumber"
            placeholder="인증번호 4자리"
          />
          <span className="login-timer">
            <Timer isResend={isReSended} resendfunc={resetIsResend} setInValid={() => setTimeIsValid(false)} />
          </span>
          <p aria-hidden="true" className="login-authnumber-resend" onClick={authNumberResend}>
            인증번호 재전송
          </p>
          <p className="input-feedback">{feedback}</p>
        </div>
      )}
      {buttonContext}
      {buttonIsClicked && <ToastMessage message="인증번호가 전송 되었습니다" />}
      {}
    </div>
  );
}
export default VerifyPhone;