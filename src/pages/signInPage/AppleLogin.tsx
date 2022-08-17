import React from 'react';
import AppleLogin from 'react-apple-login';
import "./AppleLoginButton.scss";

function AppleLoginButton() {
  return (
    <div className='apple-login-button'>
      <AppleLogin
        clientId="pet.delgo"
        redirectURI="https://delgo.pet/oauth/redirect/apple"
        responseType="code"
        responseMode="query"
        usePopup={false}
        designProp={{
          height: 60,
          width: 280,
          color: 'black',
          border: false,
          type: 'sign-in',
          border_radius: 15,
          scale: 1,
          locale: 'en_US',
        }}
      />
    </div>
  );
}

export default AppleLoginButton;
