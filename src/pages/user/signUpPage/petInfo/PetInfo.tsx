import React, { ChangeEvent, useState } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { checkPetName } from '../userInfo/ValidCheck';
import { ReactComponent as Arrow } from '../../../../icons/left-arrow.svg';
import { ReactComponent as Camera } from '../../../../icons/camera.svg';
import './PetInfo.scss';
import DogType from './DogType';
import BirthSelector from './BirthSelector';

interface Input {
  name: string;
  birth: string | undefined;
  weight: string;
  type: string;
}

interface IsValid {
  name: boolean;
  birth: boolean;
  weight: boolean;
  type: boolean;
}

enum Id {
  NAME = 'name',
  BIRTH = 'birth',
  WEIGHT = 'weight',
  TYPE = 'type',
}

function PetInfo() {
  const navigation = useNavigate();
  const [image, setImage] = useState<any>();
  const [enteredInput, setEnteredInput] = useState<Input>({ name: '', birth: undefined, weight: '', type: '' });
  const [nameFeedback, setNameFeedback] = useState('');
  const [modalActive, setModalActive] = useState(false);
  const [isOpenDogType, setIsOpenDogType] = useState(false);
  const [isValid, setIsValid] = useState<IsValid>({
    name: false,
    birth: false,
    weight: false,
    type: false,
  });
  const pageIsValid = isValid.name && isValid.birth && isValid.type && isValid.weight;

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = function () {
      setImage(reader.result);
    };
    reader.readAsDataURL(event.target.files![0]);
  };

  const requireInputCheck = (key: string, value: string) => {
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
    const { id } = event.target;
    setEnteredInput((prev: Input) => {
      return { ...prev, type: id };
    });
    requireInputCheck(Id.TYPE, id);
  };

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setEnteredInput((prev: Input) => {
      return { ...prev, [id]: value };
    });
    if (id === Id.NAME) {
      nameInputCheck(value);
    } else {
      requireInputCheck(id, value);
    }
  };

  const chagneBirthHandler = (year: number, month: number, day: number) => {
    const birthday = `${year}-${month}-${day}`;
    setEnteredInput((prev: Input) => {
      return { ...prev, birth: birthday };
    });
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
      <header className="login-header">대표 강아지 정보</header>
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
          <Camera className="petinfo-image-icon" />
        </label>
        <div className="petinfo-image-preview" style={{ backgroundImage: `url(${image})` }} />
      </div>
      {modalActive && (
        <div>
          <div
            aria-hidden="true"
            className="backdrop"
            onClick={() => {
              setModalActive(false);
            }}
          />
          <div className="modal">
            <BirthSelector changeBirth={chagneBirthHandler} />
          </div>
        </div>
      )}
      <div className="login-input-box">
        <input
          className="login-input petname"
          placeholder="강아지 이름"
          value={enteredInput.name}
          id={Id.NAME}
          onChange={inputChangeHandler}
        />
        <p className="input-feedback">{nameFeedback}</p>
      </div>
      <div className="login-input-wrapper">
        <input
          className="login-input input-birth"
          placeholder="생일"
          value={enteredInput.birth}
          id={Id.BIRTH}
          onClick={() => {
            setModalActive(true);
          }}
          onFocus={() => {
            setModalActive(true);
          }}
          required
          onChange={inputChangeHandler}
        />
        <input
          className="login-input input-weight"
          type="number"
          placeholder="몸무게(kg)"
          value={enteredInput.weight}
          id={Id.WEIGHT}
          onChange={inputChangeHandler}
        />
      </div>
      <div className="dogtype">
        <div
          className="dogtype-help"
          aria-hidden="true"
          onClick={() => {
            setIsOpenDogType(!isOpenDogType);
          }}
        >
          ?
        </div>
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
        <DogType mount={isOpenDogType}/>
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
