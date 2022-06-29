import React, { ChangeEvent, useEffect, useState } from 'react';
import classNames from 'classnames';
import { AxiosResponse } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { checkPetName } from '../signUpPage/userInfo/ValidCheck';
import { ReactComponent as Arrow } from '../../icons/left-arrow.svg';
import { ReactComponent as Camera } from '../../icons/camera.svg';
import '../signUpPage/petInfo/PetInfo.scss';
import DogType from '../signUpPage/petInfo/DogType';
import BirthSelector from '../signUpPage/petInfo/BirthSelector';
import { petImageUpload } from '../../common/api/signup';
import Check from '../../icons/check.svg';
import { MY_ACCOUNT_PATH } from '../../constants/path.const';

interface Input {
  name: string;
  birth: string | undefined;
  type: string;
}

interface IsValid {
  name: boolean;
  birth: boolean;
  type: boolean;
}

enum Id {
  NAME = 'name',
  BIRTH = 'birth',
  TYPE = 'type',
}

function ChangePetInfo() {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const state = useSelector((state: any) => state.persist.user.pet);
  const userId = useSelector((state:any)=>state.persist.user.user.id);
  const { petId, birthdat, name, size, image: petImage } = state;
  const birth = `${birthdat.slice(0,4)}.${birthdat.slice(4,6)}.${birthdat.slice(6,8)}`;
  
  const [image, setImage] = useState<any>(petImage);
  const [sendingImage, setSendingImage] = useState<any>();
  const [enteredInput, setEnteredInput] = useState<Input>({ name, birth, type: size });
  const [nameFeedback, setNameFeedback] = useState('');
  const [modalActive, setModalActive] = useState(false);
  const [isOpenDogType, setIsOpenDogType] = useState(false);
  const [imageisChanged, setImageIsChanged] = useState(false);
  const [isValid, setIsValid] = useState<IsValid>({
    name: true,
    birth: true,
    type: true,
  });
  const pageIsValid = isValid.name && isValid.birth && isValid.type;
  const formData = new FormData();

  const isChecked = {s:false,m:false,l:false};
  if(enteredInput.type==='S'){
    isChecked.s = true;
  } else if(enteredInput.type==='M'){
    isChecked.m = true;
  } else{
    isChecked.l = true;
  }

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = function () {
      setImage(reader.result);
    };
    const { files } = event.target;
    // let {petImage} = files;
    reader.readAsDataURL(event.target.files![0]);
    setSendingImage(event.target.files![0]);
    setImageIsChanged(true);
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
    const birthday = `${year}.${`0${month}`.slice(-2)}.${`0${day}`.slice(-2)}`;
    setEnteredInput((prev: Input) => {
      return { ...prev, birth: birthday };
    });
    setIsValid((prev: IsValid) => {
      return { ...prev, birth: true };
    });
  };

  const submitHandler = () => {
    const petInfo = {
      name: enteredInput.name,
      birthday: enteredInput.birth,
      size: enteredInput.type,
    };
    console.log(imageisChanged);
    if (imageisChanged) {
      formData.append('userId', userId.toString());
      formData.append('photo', sendingImage);
      petImageUpload(
        formData,
        (response: AxiosResponse) => {
          console.log(response);
        },
        dispatch,
      );
    }
    console.log(userId);
    // navigation(MY_ACCOUNT_PATH.MAIN);

    // 비동기 처리
    // signup({ email, password, nickname, phone, pet: {petName:enteredInput.name,petBirth:enteredInput.birth,petImage:} }, () => {});
  };

  return (
    <div className="login">
      <div aria-hidden="true" className="login-back" onClick={() => navigation(-1)}>
        <Arrow />
      </div>
      <header className="login-header">대표 강아지 정보수정</header>
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
          className={classNames('login-input petname', { invalid: nameFeedback.length })}
          placeholder="강아지 이름"
          value={enteredInput.name}
          id={Id.NAME}
          onChange={inputChangeHandler}
        />
        <p className="input-feedback">{nameFeedback}</p>
      </div>
      <div className="login-input-wrapper">
        <input
          className={classNames('login-input input-birth')}
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
          <DogType mount={isOpenDogType} />
        </div>
        <label htmlFor="S">
          <input type="radio" checked={isChecked.s} id="S" name="dogtype" className="dogtype-input" onChange={typeChangeHandler} />
          <span className="dogtype-button">
            <img className="checkbox-icon" src={Check} alt="check" />
          </span>
          소형견
        </label>
        <label htmlFor="M">
          <input type="radio" checked={isChecked.m} id="M" name="dogtype" className="dogtype-input" onChange={typeChangeHandler} />
          <span className="dogtype-button">
            <img className="checkbox-icon" src={Check} alt="check" />
          </span>
          중형견
        </label>
        <label htmlFor="L">
          <input type="radio" checked={isChecked.l} id="L" name="dogtype" className="dogtype-input" onChange={typeChangeHandler} />
          <span className="dogtype-button">
            <img className="checkbox-icon" src={Check} alt="check" />
          </span>
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
export default ChangePetInfo;