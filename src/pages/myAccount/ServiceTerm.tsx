import { useNavigate } from 'react-router-dom';
import React, { DOMAttributes, UIEventHandler } from 'react';
import '../signUpPage/terms/DetailTerm.scss';
import { ReactComponent as Arrow } from '../../icons/left-arrow.svg';
import term from '../signUpPage/terms/TermContents';
import './ServiceTerm.scss';

function DetailTerm(props: { id: number }) {
  const navigate = useNavigate();
  const { id } = props;
  const keyTyped = id as keyof typeof term;

  return (
    <div className="serviceterm-height">
      
      <div className="wrapper serviceterm">
        <div aria-hidden="true" className="login-back" onClick={() => navigate(-1)}>
          <Arrow />
        </div>

        <p className="title">{term[keyTyped].main}</p>
        <p className="description">{term[keyTyped].description}</p>
      </div>
    </div>
  );
}

export default DetailTerm;
