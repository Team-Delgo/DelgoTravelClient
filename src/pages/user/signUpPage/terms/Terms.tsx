import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as Arrow } from '../../../../icons/left-arrow.svg';
import DetailTerm from './DetailTerm';
import './Terms.scss';

function Terms() {
  const navigation = useNavigate();
  const [eachTermChecked, setEachTermChecked] = useState<any>({ term1: false, term2: false, term3: false });
  const [selectedId, setSelctedId] = useState(0);
  const [allChecked, setAllChecked] = useState(false);
  const { term1, term2, term3 } = eachTermChecked;
  useEffect(() => {
    if (eachTermChecked.term1 && eachTermChecked.term2 && eachTermChecked.term3) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
  }, [eachTermChecked]);

  const onCheckHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const tmp = JSON.parse(JSON.stringify(eachTermChecked));
    const { checked, id } = e.target;
    tmp[id] = checked;
    setEachTermChecked(tmp);
    if (selectedId) {
      setSelctedId(0);
    }
  };
  const onAllCheckHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setAllChecked(checked);
    if (!checked) {
      setEachTermChecked({ term1: false, term2: false, term3: false });
    }
  };
  useEffect(() => {
    if (allChecked) {
      setEachTermChecked({ term1: true, term2: true, term3: true });
    }
  }, [allChecked]);
  const nextClickHandler = () => {
    navigation('/next');
  };
  const viewOpenHandler = (event: any) => {
    let { id } = event.target;
    id = parseInt(id, 10);
    setSelctedId(id);
  };
  const viewCloesHandler = () => {
    setSelctedId(0);
  };
  return (
    <div className="login">
      <div
        className="login-back"
        aria-hidden="true"
        onClick={
          !selectedId
            ? () => {
                navigation(-1);
              }
            : viewCloesHandler
        }
      >
        <Arrow />
      </div>
      <header className="login-header">{!selectedId ? '약관동의' : '이용약관'}</header>
      {!selectedId && (
        <>
          <span className="login-description">{`원활한 서비스를 위해 이용약관\n동의 내용에 동의해주세요`}</span>
          <div className="login-terms">
            <div className="login-terms-item">
              <label className="login-terms-item-label" htmlFor="term1">
                <input type="checkbox" id="term1" checked={term1} onChange={onCheckHandler} />
                [필수]이용약관 동의
              </label>
              <span aria-hidden="true" className="login-terms-item-button" id="1" onClick={viewOpenHandler}>
                보기
              </span>
            </div>
            <div className="login-terms-item">
              <label htmlFor="term2" className="login-terms-item-label">
                <input type="checkbox" id="term2" checked={term2} onChange={onCheckHandler} />
                [필수]만 14세 이상 확인
              </label>
              <span aria-hidden="true" className="login-terms-item-button" id="2" onClick={viewOpenHandler}>
                보기
              </span>
            </div>
            <div className="login-terms-item">
              <label className="login-terms-item-label" htmlFor="term3">
                <input type="checkbox" id="term3" checked={term3} onChange={onCheckHandler} />
                [필수]개인정보 수집 이용 동의
              </label>
              <span aria-hidden="true" className="login-terms-item-button" id="3" onClick={viewOpenHandler}>
                보기
              </span>
            </div>
          </div>
          <div className="login-terms-all">
            <div className="login-terms-all-wrapper">
              <label htmlFor="all">
                <input type="checkbox" id="all" checked={allChecked} onChange={onAllCheckHandler} />
                모두 확인 및 동의합니다.
              </label>
            </div>
          </div>
          <button
            type="button"
            disabled={!allChecked}
            className={allChecked ? 'login-button active term' : 'login-button term'}
            onClick={nextClickHandler}
          >
            동의합니다
          </button>
        </>
      )}
      {!!selectedId && (
        <>
          <div className="login-terms">
            <DetailTerm id={selectedId} />
          </div>
          <div className="login-detail">
            <label className="login-detail-label" htmlFor={`term${selectedId}`}>
              <input
                type="checkbox"
                id={`term${selectedId}`}
                checked={eachTermChecked[`term${selectedId}`]}
                onChange={onCheckHandler}
              />
              확인 및 동의합니다
            </label>
          </div>
        </>
      )}
    </div>
  );
}

export default Terms;
