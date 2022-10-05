import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as Exit } from '../../../common/icons/exit.svg';
import './SocialMiddle.scss';
import { SIGN_UP_PATH } from '../../../common/constants/path.const';

interface LocationState {
  social: string;
}

function SocialMiddle() {
  const navigate = useNavigate();
  const state = useLocation().state as LocationState;
  const { social } = state;

  return (
    <div className="social-middle">
      <div
        aria-hidden="true"
        className="social-exit"
        onClick={() => {
          navigate('/user/signin');
        }}
      >
        <Exit />
      </div>
      <span className="social-middle-main">{social}에 등록된 휴대폰 번호가 없어요</span>
      <span className="social-middle-sub1">델고를 이용하기 위해서는</span>
      <span className="social-middle-sub1">고객님의 연락처가 필요해요.</span>
      <span className="social-middle-sub2">델고 회원가입에서 휴대폰 인증을 해주세요.</span>
      <button
        type="button"
        className="social-middle-button"
        onClick={() => {
          navigate(SIGN_UP_PATH.TERMS, { state: { isSocial: false } });
        }}
      >
        Delgo로 회원가입
      </button>
    </div>
  );
}

export default SocialMiddle;
