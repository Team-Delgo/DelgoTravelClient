
import React,{ChangeEvent,useEffect,useState,useCallback,useRef} from 'react'
import {useNavigate, useLocation } from 'react-router-dom'; 
import BottomButton from '../../common/layouts/BottomButton';
import { ReactComponent as BigRivewStarActive } from '../../icons/big-review-star-active.svg';
import { ReactComponent as BigRivewStar} from '../../icons/big-review-star.svg';
import { ReactComponent as LeftArrow } from '../../icons/left-arrow2.svg'
import { ReactComponent as Camera } from '../../icons/camera.svg';
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
    if(event.target.files){
      const imageLists = event.target.files;
      let imageUrlLists = [...images];
  
      for (let i = 0; i < imageLists.length; i+=1) {
        const currentImageUrl = URL.createObjectURL(imageLists[i]);
        imageUrlLists.push(currentImageUrl);
      }
  
      if (imageUrlLists.length > 10) {
        imageUrlLists = imageUrlLists.slice(0, 10);
      }
  
      setImages(imageUrlLists);
    }
    console.log(images)
  };

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
        <BigRivewStar />
        <BigRivewStar />
        <BigRivewStar />
        <BigRivewStar />
        <BigRivewStar />
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
              <img className="review-writing-body-file-image" src={image} alt="img" key={image}/>
          ))}
        </div>
      </body>
      <div className="review-writing-division-line"/>
      <footer className="review-writing-footer">
        <h4>칭찬하고 싶은 부분이 있나요?</h4>
        <div>청결</div>
        <div>시설</div>
        <div>위치</div>
        <div>기타</div>
        <input type="text" />
      </footer>
      <BottomButton text="작성완료" />
    </div>
  );
}

export default RiviewWriting;