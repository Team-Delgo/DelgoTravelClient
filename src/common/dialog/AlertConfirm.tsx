import React, { useEffect } from 'react'
import { createPortal } from 'react-dom';
import "./AlertConfirm.scss";

function AlertConfirm(props: { text: string, yesButtonHandler: () => void, noButtonHandler: () => void }) {
  const { text, yesButtonHandler, noButtonHandler } = props;
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed;
      top: -${window.scrollY}px;
      overflow-y:scroll;
      width:100%
    `;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    }
  }, []);

  const el = document.getElementById('modal') as Element;

  return createPortal(<div className='alertConfirm-bg'>
    <div className='alertConfirm-box'>
      <div className='alertConfirm-text'>{text}</div>
      <div className='alertConfirm-wrapper'>
        <button type='button' className='alertConfirm-button' onClick={yesButtonHandler}>네</button>
        <button type='button' className='alertConfirm-button' onClick={noButtonHandler}>아니오</button>
      </div>
    </div>
  </div>, el);
};

export default AlertConfirm;