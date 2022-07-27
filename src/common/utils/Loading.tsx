import React from 'react';
import { Grid,Oval } from 'react-loader-spinner';
import "./Loading.scss";

function Loading() {
  return (
    <div className="loader">
      <Oval strokeWidth={3} secondaryColor='#b0a69d' color="#FF9162" height={80} width={80} />
    </div>
  );
}

export default Loading;