import React from "react";
import "./DogType.scss";
import classNames from "classnames";

function DogType(props:{mount:boolean}) {
  const {mount} = props;
  return <div className={classNames("typehelp",{mount})}>
    <div className="typehelp-title">견종 정보</div>
    <div className="typehelp-description">소형견:10kg 미만</div>
    <div className="typehelp-description">중형견:10kg 이상 25kg 미만</div>
    <div className="typehelp-description">대형견:25kg 이상</div>
  </div>
}
export default DogType;