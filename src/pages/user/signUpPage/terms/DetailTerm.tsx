import React from 'react';
import './DetailTerm.scss';

const term = {
  1: {
    main: '델고는 만 14세 미만 아동의 서비스 이용을 제한하고 있습니다.',
    description:
      '정보통신망 이용촉진 및 정보보호 등에 관한 법률에서는 만 14세 미만 아동의 개인정보 수집 시 법정대리인 동의를 받도록 규정하고 있으며, 만 14세 미만 아동이 법정 대리인 동의없이 회원가입을 하는 경우 회원탈퇴 또는 서비스 이용이 제한될 수 있음을 알려드립니다.',
  },
  2: {
    main: 'term2델고는 만 14세 미만 아동의 서비스 이용을 제한하고 있습니다.',
    description:
      'term2정보통신망 이용촉진 및 정보보호 등에 관한 법률에서는 만 14세 미만 아동의 개인정보 수집 시 법정대리인 동의를 받도록 규정하고 있으며, 만 14세 미만 아동이 법정 대리인 동의없이 회원가입을 하는 경우 회원탈퇴 또는 서비스 이용이 제한될 수 있음을 알려드립니다.',
  },
  3: {
    main: 'term3델고는 만 14세 미만 아동의 서비스 이용을 제한하고 있습니다.',
    description:
      'term3정보통신망 이용촉진 및 정보보호 등에 관한 법률에서는 만 14세 미만 아동의 개인정보 수집 시 법정대리인 동의를 받도록 규정하고 있으며, 만 14세 미만 아동이 법정 대리인 동의없이 회원가입을 하는 경우 회원탈퇴 또는 서비스 이용이 제한될 수 있음을 알려드립니다.',
  },
};
function DetailTerm(props: { id: number }) {
  const { id } = props;
  const keyTyped = id as keyof typeof term;
  return (
    <div className="wrapper">
      <p className="title">{term[keyTyped].main}</p>
      <p className="description">{term[keyTyped].description}</p>
    </div>
  );
}

export default DetailTerm;
