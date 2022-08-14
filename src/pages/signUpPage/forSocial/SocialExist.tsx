import React from 'react';
import { useLocation } from 'react-router-dom';
import { ReactComponent as Exit } from '../../../icons/exit.svg';
import './SocialMiddle.scss';
import KAKAO from '../../../icons/kakao.svg';
import NAVER from '../../../icons/naver.svg';

interface LocationState {
  social: string;
  email: string;
}

function SocialExist() {
  const state = useLocation().state as LocationState;
  const { social, email } = state;

  const setIcon = () => {
    if (social === 'K')
      return (
        <div className="social-middle-box-icon-kakao">
          <img src={KAKAO} alt="icon" />
        </div>
      );
    return (
      <div className="social-middle-box-icon-naver">
        <img src={NAVER} alt="icon" />
      </div>
    );
  };

  const icon = setIcon();

  return (
    <div className="social-middle">
      <div className="social-exit">
        <Exit />
      </div>
      <span className="social-middle-main">이미 아이디가 있었어요</span>
      <span className="social-middle-sub1">같은 휴대폰 번호를 쓰는 계정이 있습니다.</span>
      <span className="social-middle-sub2">기존 계정으로 로그인해보세요.</span>
      <span className="social-middle-box">
        {icon}
        <span>{email}</span>
      </span>
      <button type="button" className="social-middle-button">
        로그인
      </button>
    </div>
  );
}

export default SocialExist;
