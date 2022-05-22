import React, { ChangeEvent, useState } from 'react';
import classNames from 'classnames';
import { AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { checkPetName } from '../userInfo/ValidCheck';
import { ReactComponent as Arrow } from '../../../../icons/left-arrow.svg';
import { ReactComponent as Camera } from '../../../../icons/camera.svg';
import './PetInfo.scss';
import { tokenActions } from '../../../../redux/reducers/tokenSlice';
import DogType from './DogType';
import BirthSelector from './BirthSelector';
import { signup, petImageUpload } from '../../../../common/api/signup';
import Check from "../../../../icons/check.svg"

interface LocationState {
  phone: string;
  email: string;
  nickname: string;
  password: string;
}

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
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const state = useLocation().state as LocationState;
  const { email, password, nickname, phone } = state;
  const [image, setImage] = useState<any>();
  const [sendingImage, setSendingImage] = useState<any>();
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
  const formData = new FormData();

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = function () {
      setImage(reader.result);
    };
    const { files } = event.target;
    // let {petImage} = files;
    reader.readAsDataURL(event.target.files![0]);
    setSendingImage(event.target.files![0]);

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
    setIsValid((prev: IsValid) => {
      return { ...prev, birth: true };
    })
  };

  const submitHandler = () => {
    let userId = 0;
    const petInfo = {
      name: enteredInput.name,
      birthday: enteredInput.birth,
      size: enteredInput.type,
      weight: enteredInput.weight
    };
    const userInfo = {
      nickname,
      email,
      password,
      phone,
      pet: petInfo,
    };
    console.log(userInfo);
    signup(userInfo, (response: AxiosResponse) => {

      const { code, codeMsg } = response.data;
      if (code === 200) {
        // const accessToken = response.headers.authorization_access;
        // const refreshToken = response.headers.authorization_refresh;
        // dispatch(tokenActions.setToken(accessToken));
        // localStorage.setItem('refreshToken', refreshToken);
        userId = response.data.data.userId;
        console.log(response);
        console.log(userId);
        formData.append('file', sendingImage);
        formData.append('userId', userId.toString());
        petImageUpload(formData, (response: AxiosResponse) => {
          console.log(response);
        });
        navigation('/user/signin/login');
      } else {
        console.log(codeMsg);
      }

    })

    // 비동기 처리
    // signup({ email, password, nickname, phone, pet: {petName:enteredInput.name,petBirth:enteredInput.birth,petImage:} }, () => {});
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
          <DogType mount={isOpenDogType} />
        </div>
        <label htmlFor="S">
          <input type="radio" id="S" name="dogtype" className="dogtype-input" onChange={typeChangeHandler} />
          <span className="dogtype-button">
            <img className='checkbox-icon' src={Check} alt="check" />
          </span>
          소형견
        </label>
        <label htmlFor="M">
          <input type="radio" id="M" name="dogtype" className="dogtype-input" onChange={typeChangeHandler} />
          <span className="dogtype-button">
            <img className='checkbox-icon' src={Check} alt="check" />
          </span>
          중형견
        </label>
        <label htmlFor="L">
          <input type="radio" id="L" name="dogtype" className="dogtype-input" onChange={typeChangeHandler} />
          <span className="dogtype-button">
            <img className='checkbox-icon' src={Check} alt="check" />
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
export default PetInfo;
