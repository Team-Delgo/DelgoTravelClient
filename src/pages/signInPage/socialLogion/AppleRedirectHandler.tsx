import React, { useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import qs from 'qs';
import { appleSendToken } from '../../../common/api/social';

function AppleRedirectHandler() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = new URL(window.location.href).searchParams.get('id_token');
  console.log(token);

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    appleSendToken(
      token,
      (response: AxiosResponse) => {
        console.log(response);
      },
      dispatch,
    );
  };

  return <div />;
}

export default AppleRedirectHandler;
