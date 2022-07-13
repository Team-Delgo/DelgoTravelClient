import { AxiosResponse } from 'axios';
import classNames from 'classnames';
import React, { ChangeEvent, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registCoupon } from '../../common/api/myaccount';
import "./CouponModal.scss";


function CouponModal(props: { closeModal: () => void }) {
  const [enteredInput, setEnteredInput] = useState('');
  const [feedback, setFeedback] = useState('공백 없이 쿠폰코드를 입력해주세요.');
  const [invalid, setInvalid] = useState(false);
  const dispatch = useDispatch();
  const inputRef = useRef<any>();
  const { id } = useSelector((state: any) => state.persist.user.user);
  const { closeModal } = props;

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEnteredInput(value);
    setInvalid(false);
  };


  const couponRegist = () => {
    const data = {
      userId: id,
      couponCode: enteredInput
    };
    registCoupon(data, (response: AxiosResponse) => {
      const { code } = response.data;
      console.log(response);
      if (code === 200) {
        closeModal();
      } else {
        setInvalid(true);
        setFeedback('유효하지 않은 쿠폰 코드 입니다.');
        inputRef.current.focus();
      }
    }, dispatch);
  };

  return <div className='couponmodal'>
    <div className='couponmodal-wrapper'>
      <div className='couponmodal-title'>쿠폰등록</div>
      <div className='couponmodal-flex'>
        <input ref={inputRef} autoComplete="off" value={enteredInput} className={classNames('couponmodal-input', { invalid })} onChange={inputChangeHandler} />
      </div>
      <span className={classNames('couponmodal-feedback', { invalid })}>{feedback}</span>
    </div>
    <div aria-hidden="true" className={classNames('coupon-regist formodal', { invalid: !enteredInput.length })} onClick={couponRegist}>쿠폰등록하기</div>
  </div>;
}

export default CouponModal;
