/* eslint-disable array-callback-return */
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { AxiosResponse } from 'axios';
import imageCompression from 'browser-image-compression';
import AlertConfirmOne from '../../common/dialog/AlertConfirmOne'
import { MY_STORAGE_PATH, } from '../../common/constants/path.const';
import { RootState } from '../../redux/store'
import { writeReivew, reviewImageUpload } from '../../common/api/reivew'
import { ReactComponent as BigRivewStarActive } from '../../common/icons/big-review-star-active.svg';
import { ReactComponent as BigRivewStar } from '../../common/icons/big-review-star.svg';
import { ReactComponent as LeftArrow } from '../../common/icons/left-arrow2.svg';
import { ReactComponent as Camera } from '../../common/icons/camera.svg';
import { ReactComponent as X } from '../../common/icons/x.svg';
import './ReviewWritingPage.scss';

interface TraveledHisotryPlaceType {
  bookingId: string,
  roomName: string,
  roomId:number,
  startDt: string,
  endDt: string,
  reviewExisting: boolean,
  place: {
    address: string
    checkin: string
    checkout: string
    isBooking: 0
    lowestPrice: null
    mainPhotoUrl: string
    name: string
    placeId: number
    wishId: number
  },
}

const reviewImgExtension = ["image/jpeg","image/gif","image/png","image/jpg"]

const options = {
  maxSizeMB: 0.2,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
};

function RiviewWritingPage() {
  const [images, setImages] = useState<Array<string>>([]);
  const [sendingImage, setSendingImage] = useState<Array<any>>([]);
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const [activeStar1, setActiveStar1] = useState(true);
  const [activeStar2, setActiveStar2] = useState(true);
  const [activeStar3, setActiveStar3] = useState(true);
  const [activeStar4, setActiveStar4] = useState(true);
  const [activeStar5, setActiveStar5] = useState(true);
  const [rivewText, setReviewText] = useState('');
  const [reviewCompleteAlert,setReviewCompleteAlert]=useState(false)
  const [reviewTextLengthLimitAlert,setReviewTextLengthLimitAlert]=useState(false)
  const [reviewImgExtensionAlert,setReviewImgExtensionAlert]=useState(false)
  const starRaiting = useRef(5);
  const userId = useSelector((state: RootState) => state.persist.user.user.id);
  const petName = useSelector((state: RootState) => state.persist.user.pet.name);
  const state = useLocation().state as TraveledHisotryPlaceType;
  const navigate = useNavigate();
  const formData = new FormData();
  const location: any = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
      window.scrollTo(0, 0);
  }, []);
  

  const moveToPreviousPage = useCallback(() => {
    navigate(MY_STORAGE_PATH, {
      state: {
        prevPath: location.pathname,
      },
    });
  }, []);

  const handleOpenFileUpload = useCallback(() => {
    if (fileUploadRef.current) {
      fileUploadRef.current.click();
    }
  }, []);


  const handleUploadFile = async (event: { target: HTMLInputElement }) => {
    if (!reviewImgExtension.includes((event.target.files as FileList)[0].type)) {
      setReviewImgExtensionAlert(true)
      return
    }
    if (images.length === 4) {
      return;
    }
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

      const reader = new FileReader();
      reader.readAsDataURL(event.target.files![0]);
      setSendingImage([...sendingImage , event.target.files![0]]);
    }
  };

  const handleDeleteImage = (clickedImage: string) => (event: React.MouseEvent) => {
    const newImages = images.filter((image) => image !== clickedImage);
    setImages(newImages);
  };

  const submitRivew = () => {
    if(rivewText.length>9){
      writeReivew(
        {
          userId,
          placeId: state.place.placeId,
          roomId: state.roomId,
          rating: starRaiting.current,
          text: rivewText,
          bookingId: state.bookingId,
        },
        dispatch,
        (response: AxiosResponse) => {
          const { code, codeMsg } = response.data;
          if (code === 200) {
            if (sendingImage.length > 0) {
              const { reviewId } = response.data.data;
  
              for (let i = 0; i < sendingImage.length; i += 1) {
                formData.append('photos', sendingImage[i]);
              }
  
              reviewImageUpload(
                formData,
                reviewId,
                dispatch,
                (response: AxiosResponse) => {
                  console.log(response);
                  const { code, codeMsg } = response.data;
                  if (code === 200) {
                    console.log('성공')
                  } else {
                    console.log(codeMsg);
                  }
                },
              );
            }
            setReviewCompleteAlert(true)
          } else {
            console.log(codeMsg);
          }
        },
      );
    }
    else{
      setReviewTextLengthLimitAlert(true)
    }
  };

  const handleStarRating1 = useCallback(() => {
    starRaiting.current = 1;
    setActiveStar1(true);
    setActiveStar2(false);
    setActiveStar3(false);
    setActiveStar4(false);
    setActiveStar5(false);
  }, [activeStar1, activeStar2, activeStar3, activeStar4, activeStar5]);
  const handleStarRating2 = useCallback(() => {
    if (activeStar2 === false) {
      starRaiting.current = 2;
      setActiveStar1(true);
      setActiveStar2(true);
      setActiveStar3(false);
      setActiveStar4(false);
      setActiveStar5(false);
    } else {
      starRaiting.current = 1;
      setActiveStar1(true);
      setActiveStar2(false);
      setActiveStar3(false);
      setActiveStar4(false);
      setActiveStar5(false);
    }
  }, [activeStar1, activeStar2, activeStar3, activeStar4, activeStar5]);
  const handleStarRating3 = useCallback(() => {
    if (activeStar3 === false) {
      starRaiting.current = 3;
      setActiveStar1(true);
      setActiveStar2(true);
      setActiveStar3(true);
      setActiveStar4(false);
      setActiveStar5(false);
    } else {
      starRaiting.current = 2;
      setActiveStar1(true);
      setActiveStar2(true);
      setActiveStar3(false);
      setActiveStar4(false);
      setActiveStar5(false);
    }
  }, [activeStar1, activeStar2, activeStar3, activeStar4, activeStar5]);
  const handleStarRating4 = useCallback(() => {
    if (activeStar4 === false) {
      starRaiting.current = 4;
      setActiveStar1(true);
      setActiveStar2(true);
      setActiveStar3(true);
      setActiveStar4(true);
      setActiveStar5(false);
    } else {
      starRaiting.current = 3;
      setActiveStar1(true);
      setActiveStar2(true);
      setActiveStar3(true);
      setActiveStar4(false);
      setActiveStar5(false);
    }
  }, [activeStar1, activeStar2, activeStar3, activeStar4, activeStar5]);
  const handleStarRating5 = useCallback(() => {
    if (activeStar5 === false) {
      starRaiting.current = 5;
      setActiveStar1(true);
      setActiveStar2(true);
      setActiveStar3(true);
      setActiveStar4(true);
      setActiveStar5(true);
    } else {
      starRaiting.current = 4;
      setActiveStar1(true);
      setActiveStar2(true);
      setActiveStar3(true);
      setActiveStar4(true);
      setActiveStar5(false);
    }
  }, [activeStar1, activeStar2, activeStar3, activeStar4, activeStar5]);

  const handleReviewWrite = useCallback((e) => {
    setReviewText(e.target.value);
  }, []);

  const confirmReviewCompletedClose = useCallback(() => {
    setReviewCompleteAlert(false)
    moveToPreviousPage()
  },[])

  const alertReviewLengthLimitClose = useCallback(() => {
    setReviewTextLengthLimitAlert(false)
  },[])

  const alertReviewImgExtensionClose = useCallback(() => {
    setReviewImgExtensionAlert(false)
  },[])

  return (
    <div className="review-writing">
      <header className="review-writing-header">
        <img className="review-writing-header-main-image" src={state.place.mainPhotoUrl} alt="place-img" />
        <div className="review-writing-header-place-name">{state.place.name}</div>
        <div className="review-writing-header-room-name">{state.roomName}</div>
        <div className="review-writing-header-date">
          {state.startDt.substring(5, 7)}.{state.startDt.substring(8, 10)} - {state.endDt.substring(5, 7)}.
          {state.endDt.substring(8, 10)}
        </div>
        <LeftArrow className="review-writing-header-previous-page" onClick={moveToPreviousPage} />
      </header>
      <body className="review-writing-body">
        <h4>{petName}와의 이용이 어땠나요?</h4>
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
        <div className="review-writing-body-textarea-container">
          <textarea
            className="review-writing-body-textarea"
            placeholder="다른 멍멍이들을 위해&#13;&#10;솔직한 리뷰를 부탁드려요!"
            onChange={handleReviewWrite}
            maxLength={150}
          />
          <div className="review-writing-body-textarea-length">{rivewText.replace(/ /g,"").length}/150</div>
        </div>
        <div className="review-writing-body-file">
          <div className="review-writing-body-file-uploader" aria-hidden="true" onClick={handleOpenFileUpload}>
            <Camera />
            <input type="file" accept="image/jpeg,image/gif,image/png,image/jpg;capture=filesystem" multiple ref={fileUploadRef} onChange={handleUploadFile} style={{ display: 'none' }} />
          </div>
          {images.map((image) => (
            <div className="review-writing-body-file-image-container">
              <img className="review-writing-body-file-image" src={image} alt="img" key={image} />
              <div
                className="review-writing-body-file-image-delete"
                aria-hidden="true"
                onClick={handleDeleteImage(image)}
              >
                <div className="review-writing-body-file-image-delete-button" />
                <X className="review-writing-body-file-image-delete-x" />
              </div>
            </div>
          ))}
        </div>
      </body>
      <div className="review-submit-button" aria-hidden="true" onClick={submitRivew}>
        작성완료
      </div>
      {reviewCompleteAlert && <AlertConfirmOne text="리뷰 작성이 완료 되었습니다" buttonHandler={confirmReviewCompletedClose} />}
      {reviewTextLengthLimitAlert && <AlertConfirmOne text="리뷰를 최소 10글자이상 작성하세요" buttonHandler={alertReviewLengthLimitClose} />}
      {reviewImgExtensionAlert && <AlertConfirmOne text="이미지 확장자 파일만 올려주세요" buttonHandler={alertReviewImgExtensionClose} />}
    </div>
  );
}

export default RiviewWritingPage;
