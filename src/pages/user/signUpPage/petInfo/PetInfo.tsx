import React, { ChangeEvent, useState } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { checkPetName } from '../userInfo/ValidCheck';
import { ReactComponent as Arrow } from '../../../../icons/left-arrow.svg';
import './PetInfo.scss';

interface Input {
  name: string;
  birth: string;
  weight: string;
  type: string;
}
interface IsValid {
  name: boolean;
  birth: boolean;
  weight: boolean;
  type: boolean;
}

function PetInfo() {
  const navigation = useNavigate();
  const [image, setImage] = useState<any>();
  const [enteredInput, setEnteredInput] = useState<Input>({ name: '', birth: '', weight: '', type: '' });
  const [nameFeedback, setNameFeedback] = useState('');
  const [isValid, setIsValid] = useState<IsValid>({
    name: false,
    birth: false,
    weight: false,
    type: false,
  });
  const pageIsValid = isValid.name && isValid.birth && isValid.type && isValid.weight;
  console.log(isValid);
  console.log(enteredInput);
  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = function () {
      setImage(reader.result);
    };
    reader.readAsDataURL(event.target.files![0]);
  };

  const requireInputCheck = (key: string, value:string) => {

    if (value.length) {
      setIsValid((prev: IsValid) => {
        return { ...prev, [key]: true };
      });
    }
  };

  const nameInputCheck = (name: string) => {
    const response = checkPetName(name);
    if (!response.isValid) {
      setIsValid((prev: IsValid) => {
        return { ...prev, name: false };
      });
    } else {
      setIsValid((prev: IsValid) => {
        return { ...prev, name: true };
      });
    }
    setNameFeedback(response.message);
  };

  const typeChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {id,value} = event.target;
    setEnteredInput((prev:Input)=>{
      return {...prev, type: id};
    });
    requireInputCheck('type',id);
  };

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setEnteredInput((prev: Input) => {
      return { ...prev, [id]: value };
    });
    if (id === 'name') {
      nameInputCheck(value);
    } else {
      requireInputCheck(id,value);
    }
  };

  const submitHandler = () => {
    console.log('저장완료');
    // 비동기 처리
  };

  return (
    <div className="login">
      <div aria-hidden="true" className="login-back" onClick={() => navigation(-1)}>
        <Arrow />
      </div>
      <header className="login-header">강아지 정보 입력</header>
      <div className="petinfo-image">
        <label htmlFor="pet" className="petinfo-image-label">
          <input
            className="petinfo-image-input"
            type="file"
            accept="image/*"
            name="image"
            id="pet"
            onChange={handleImage}
          />
        </label>
        <div className="petinfo-image-preview" style={{ backgroundImage: `url(${image})` }} />
      </div>
      <input
        className="login-input"
        placeholder="강아지 이름"
        value={enteredInput.name}
        id="name"
        onChange={inputChangeHandler}
      />
      <div className="login-input-wrapper">
        <input
          type="date"
          className="login-input birth"
          placeholder="생일"
          value={enteredInput.birth}
          id="birth"
          onChange={inputChangeHandler}
        />
        <input
          className="login-input weight"
          type="number"
          placeholder="몸무게"
          value={enteredInput.weight}
          id="weight"
          onChange={inputChangeHandler}
        />
      </div>
      <div className="dogtype">
        <div>?</div>
        <label htmlFor="small">
          <input type="radio" id="small" name="dogtype" className="dogtype-input" onChange={typeChangeHandler} />
          <span className="dogtype-button" />
          소형견
        </label>
        <label htmlFor="medium">
          <input type="radio" id="medium" name="dogtype" className="dogtype-input" onChange={typeChangeHandler} />
          <span className="dogtype-button" />
          중형견
        </label>
        <label htmlFor="large">
          <input type="radio" id="large" name="dogtype" className="dogtype-input" onChange={typeChangeHandler} />
          <span className="dogtype-button" />
          대형견
        </label>
      </div>
      <button
        type="button"
        disabled={!pageIsValid}
        className={classNames('login-button', { active: pageIsValid })}
        onClick={submitHandler}
      >
        저장하기
      </button>
    </div>
  );
}
export default PetInfo;
