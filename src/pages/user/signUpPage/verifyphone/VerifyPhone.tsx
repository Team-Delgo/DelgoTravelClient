import React,{ useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import ToastMessage from './ToastMessage';
import './VerifyPhone.scss';
import Timer from './Timer';
import { ReactComponent as Check } from '../../../../icons/check.svg';
import { ReactComponent as Arrow } from '../../../../icons/left-arrow.svg';

function VerifyPhone() {
  const navigation = useNavigate();
  const [buttonIsClicked, setButtonIsClicked] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [authNumber, setAuthNumber] = useState('');
  const [isSended, setIsSended] = useState(false);
  const [timeIsValid, setTimeIsValid] = useState(true);
  const [isReSended, setIsReSended] = useState(false);
  const authIsValid = timeIsValid && authNumber.length === 6;
  const isValid = phoneNumber.length === 13;
  const isEntered = phoneNumber.length > 0;
  const buttonClickHandler = () => {

    //  인증번호 전송 요청

    setButtonIsClicked(true);
    setIsSended(true);
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
    console.log(onlyNumber);
    let adjustNumber: string = onlyNumber;
    if (phoneNumber.length === 13 && value.length > 13) return;
    if ((phoneNumber.length === 2 && value.length === 3) || (phoneNumber.length === 7 && value.length === 8)) {
      adjustNumber = `${value}-`;
    }
    setPhoneNumber(adjustNumber);
  };
  const clearButtonHandler = () => {
    if (isSended) return;
    setPhoneNumber('');
  };
  const authChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (authNumber.length === 6 && event.target.value.length > 6) return;
    setAuthNumber(event.target.value);
  };
  const authNumberResend = () => {
    //  인증번호 전송 요청
    setIsReSended(true);
    setButtonIsClicked(true);
    setTimeIsValid(true);
  };
  const resetIsResend = () => {
    setIsReSended(false);
  };
  const nextClickHandler = () => {
    navigation('/next');
  };
  const buttonContext = !isSended ? (
    <button type='button' className={isValid ? 'login-button active' : 'login-button'} onClick={buttonClickHandler}>
      인증번호 발송
    </button>
  ) : (
    <button type='button' disabled={!authIsValid} className={authIsValid ? 'login-button active' : 'login-button'} onClick={nextClickHandler}>
      다음
    </button>
  );
  return (
    <div className="login">
      <div aria-hidden="true" className="login-back" onClick={() => navigation(-1)}>
        <Arrow />
      </div>
      <header className="login-header">휴대폰 인증</header>
      <span className="login-description">원활한 서비스 제공을 위해 휴대폰 번호를 입력해주세요</span>
      <div className="login-inputbox">
        <input
          value={phoneNumber}
          onChange={inputChangeHandler}
          className="login-input"
          placeholder="휴대폰 번호"
        />
        {isEntered && (
          <span aria-hidden="true" className={isSended ? 'login-input-clear checked' : 'login-input-clear'} onClick={clearButtonHandler}>
            {isSended ? <Check /> : 'X'}
          </span>
        )}
      </div>
      {isSended && (
        <div className="login-authnumber">
          <input
            value={authNumber}
            onChange={authChangeHandler}
            className="login-input"
            placeholder="인증번호 6자리"
          />
          <span className="login-timer">
            <Timer isResend={isReSended} resendfunc={resetIsResend} setInValid={() => setTimeIsValid(false)} />
          </span>
          <p aria-hidden="true" className="login-authnumber-resend" onClick={authNumberResend}>
            인증번호 재전송
          </p>
        </div>
      )}
      {buttonContext}
      {buttonIsClicked && <ToastMessage />}
    </div>
  );
}
export default VerifyPhone;
