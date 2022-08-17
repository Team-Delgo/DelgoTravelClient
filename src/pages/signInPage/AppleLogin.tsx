import React from "react";
import AppleLogin from "react-apple-login";

function AppleLoginButton(){
  return (
    <AppleLogin
      clientId='pet.delgo'
      redirectURI='https://delgo.pet/oauth/redirect/apple'
      responseType='code'
      responseMode='query'
      usePopup={false}
      designProp={{
        height: 30,
        width: 140,
        color: 'black',
        border: false,
        type: 'sign-in',
        border_radius: 15,
        scale: 1,
        locale: 'en_US',
      }}
    />
  );
};

export default AppleLoginButton;