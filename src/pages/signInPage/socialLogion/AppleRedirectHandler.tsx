import React, { useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import qs from 'qs';
import { appleSendToken } from '../../../common/api/social';

function AppleRedirectHandler() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const url = window.location.href;
  console.log(url);
  const i = url.indexOf('id_token');
  const token = url.substring(i+9);
  console.log(token);

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    await appleSendToken(
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
