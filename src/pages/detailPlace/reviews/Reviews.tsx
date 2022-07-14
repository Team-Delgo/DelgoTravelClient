
import React,{useMemo, useState,useCallback ,memo} from 'react'
import { ReactComponent as ReviewStar } from '../../../icons/review-star.svg'
import './Reviews.scss';


interface RivewTypeProps {
  review:RivewType
}

interface RivewType {
  photoUrl: string;
  review: {
    placeId: number;
    rating: number;
    registDt: string;
    reviewId: number;
    reviewPhoto1: null;
    reviewPhoto2: null;
    reviewPhoto3: null;
    reviewPhoto4: null;
    reviewPhoto5: null;
    roomId: number;
    text: string;
    updateDt: null;
    userId: number;
  };
  roomName: 'A3/스위트';
  userName: '뽀삐맘';
}

function Reviews({ review }: RivewTypeProps) {
  const reviewStarCount = useMemo(()=>reviewStarComponents(),[])
  const [moreDescription,setMoreDescription] = useState(false)

  function reviewStarComponents() {
    const reviewStarArray = [];
    for (let i = 0; i < review.review.rating; i += 1) {
      reviewStarArray.push(<ReviewStar />);
    }
    return reviewStarArray;
  }

  const handleMoreDescription = useCallback(() => {
    setMoreDescription(!moreDescription);
  }, [moreDescription]);

  return (
    <div className="review">
      <header className="review-header">
        <img src={review.photoUrl} alt="profile-img" width={60} height={60} />
        <div className="review-header-info">
          <div className="review-header-info-nick-name">{review.userName}</div>
          <div className="review-header-info-second-line">
            <span className="review-header-info-star-rating">{reviewStarCount}</span>
            <div className="review-header-info-registration-date">
              {review.review.registDt.substring(2, 4)}.{review.review.registDt.substring(5, 7)}.
              {review.review.registDt.substring(8, 10)}
            </div>
          </div>
          <div className="review-header-info-room-used">{review.roomName} 객실 이용</div>
        </div>
      </header>
      <body className="review-content">
        {review.review.text.length > 115 ? (
          <div>
            {moreDescription ? (
              <div className="review-content-description">{review.review.text}</div>
            ) : (
              <div className="review-content-description">
                {review.review.text.substring(0, 116)} ...
                <span className="review-content-description-more" aria-hidden="true" onClick={handleMoreDescription}>
                  더보기
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="review-content-description">{review.review.text}</div>
        )}
        {/* <div className="review-content-image-container">
          {review.review.text.map((image: string) => (
            <img src={image} alt="profile-img" />
          ))}
        </div> */}
      </body>
    </div>
  );
}

export default memo(Reviews);