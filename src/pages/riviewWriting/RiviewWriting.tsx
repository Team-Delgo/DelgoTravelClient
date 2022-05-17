
import React,{ChangeEvent,useEffect,useState,useCallback,useRef} from 'react'
import {useNavigate, useLocation } from 'react-router-dom'; 
import BottomButton from '../../common/layouts/BottomButton';
import { ReactComponent as BigRivewStarActive } from '../../icons/big-review-star-active.svg';
import { ReactComponent as BigRivewStar} from '../../icons/big-review-star.svg';
import { ReactComponent as LeftArrow } from '../../icons/left-arrow2.svg'
import { ReactComponent as Camera } from '../../icons/camera.svg';
import { ReactComponent as ThumbUp } from '../../icons/thumb-up.svg';
import { ReactComponent as ThumbUpActive } from '../../icons/thumb-up-active.svg';
import './RiviewWriting.scss';

interface ReservationPlaceType {
    id: number,
    period: string,
    image: string,
    name: string,
    address: string
    package: string
  }

function RiviewWriting() {
  const [images, setImages] = useState<Array<any>>([]);
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const [activeStar1,setActiveStar1] = useState(false)
  const [activeStar2,setActiveStar2] = useState(false)
  const [activeStar3,setActiveStar3] = useState(false)
  const [activeStar4,setActiveStar4] = useState(false)
  const [activeStar5,setActiveStar5] = useState(false)

  const state = useLocation().state as ReservationPlaceType;
  const navigate = useNavigate();

  const moveToPreviousPage = useCallback(() => {
    navigate(-1);
  }, []);

  const handleOpenFileUpload = useCallback(() => {
    if (fileUploadRef.current) {
      fileUploadRef.current.click();
    }
  }, []);

  const handleUploadFile = async (event: { target: HTMLInputElement }) => {
    if (event.target.files) {
      const imageLists = event.target.files;
      let imageUrlLists = [...images];

      for (let i = 0; i < imageLists.length; i += 1) {
        const currentImageUrl = URL.createObjectURL(imageLists[i]);
        imageUrlLists.push(currentImageUrl);
      }

      if (imageUrlLists.length > 10) {
        imageUrlLists = imageUrlLists.slice(0, 10);
      }
      setImages(imageUrlLists);
    }
  };

  const handleStarRating1 = useCallback(() => {
    if (activeStar1 === true) {
      if (activeStar2 === false) {
        setActiveStar1(!activeStar1);
      }
    } else {
      setActiveStar1(!activeStar1);
    }
  },[activeStar1,activeStar2])
  const handleStarRating2 = useCallback(() => {
    if (activeStar2 === false) {
      if (activeStar1 === true) {
        setActiveStar2(!activeStar2);
      }
    } else if (activeStar3 === false) {
      setActiveStar2(!activeStar2);
    }
  },[activeStar1,activeStar2,activeStar3])
  const handleStarRating3 = useCallback(() => {
    if (activeStar3 === false) {
      if (activeStar2 === true) {
        setActiveStar3(!activeStar3);
      }
    } else if (activeStar4 === false) {
      setActiveStar3(!activeStar3);
    }
  },[activeStar2,activeStar3,activeStar4])
  const handleStarRating4 = useCallback(() => {
    if (activeStar4 === false) {
      if (activeStar3 === true) {
        setActiveStar4(!activeStar4);
      }
    } else if (activeStar5 === false) {
      setActiveStar4(!activeStar4);
    }
  },[activeStar3,activeStar4,activeStar5])
  const handleStarRating5 = useCallback(() => {
    if (activeStar5 === false) {
      if (activeStar4 === true) {
        setActiveStar5(!activeStar5);
      }
    } else {
      setActiveStar5(!activeStar5);
    }
  },[activeStar4,activeStar5])

  return (
    <div className="review-writing">
      <header className="review-writing-header">
        <img className="review-writing-header-main-image" src={state.image} alt="place-img" />
        <div className="review-writing-header-place-name">{state.name}</div>
        <div className="review-writing-header-date">{state.period}</div>
        <LeftArrow className="review-writing-header-previous-page" onClick={moveToPreviousPage} />
      </header>
      <body className="review-writing-body">
        <h4>쪼꼬와의 이용이 어땠나요?</h4>
        <div className="review-writing-body-star">
          {activeStar1 ? (
            <BigRivewStarActive onClick={handleStarRating1} />
          ) : (
            <BigRivewStar onClick={handleStarRating1} />
          )}
          {activeStar2 ? (
            <BigRivewStarActive onClick={handleStarRating2} />
          ) : (
            <BigRivewStar onClick={handleStarRating2} />
          )}
          {activeStar3 ? (
            <BigRivewStarActive onClick={handleStarRating3} />
          ) : (
            <BigRivewStar onClick={handleStarRating3} />
          )}
          {activeStar4 ? (
            <BigRivewStarActive onClick={handleStarRating4} />
          ) : (
            <BigRivewStar onClick={handleStarRating4} />
          )}
          {activeStar5 ? (
            <BigRivewStarActive onClick={handleStarRating5} />
          ) : (
            <BigRivewStar onClick={handleStarRating5} />
          )}
        </div>
        <textarea
          className="review-writing-body-textarea"
          placeholder="다른 멍멍이들을 위해&#13;&#10;솔직한 리뷰를 부탁드려요!"
        />
        <div className="review-writing-body-file">
          <div className="review-writing-body-file-uploader" aria-hidden="true" onClick={handleOpenFileUpload}>
            <Camera />
            <input type="file" multiple ref={fileUploadRef} onChange={handleUploadFile} style={{ display: 'none' }} />
          </div>
          {images.map((image) => (
            <img className="review-writing-body-file-image" src={image} alt="img" key={image} />
          ))}
        </div>
      </body>
      <div className="review-writing-division-line" />
      <footer className="review-writing-footer">
        <h4>칭찬하고 싶은 부분이 있나요?</h4>
        <div className="review-writing-footer-cleanliness">
          청결
          <div className="review-writing-footer-cleanliness-thum-up">
            <ThumbUp />
            좋아요
          </div>
        </div>
        <div className="review-writing-footer-facilities">
          시설
          <div className="review-writing-footer-facilities-thum-up">
            <ThumbUp />
            좋아요
          </div>
        </div>
        <div className="review-writing-footer-location">
          위치
          <div className="review-writing-footer-location-thum-up">
            <ThumbUp />
            좋아요
          </div>
        </div>
        <div className="review-writing-footer-etc">기타</div>
        <input type="text" className="review-writing-footer-input" placeholder="(선택) 한 줄 칭찬을 남겨주세요." />
      </footer>
      <BottomButton text="작성완료" />
    </div>
  );
}

export default RiviewWriting;