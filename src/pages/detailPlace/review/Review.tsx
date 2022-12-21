import React, { useMemo, useState, memo } from 'react';
import { ReactComponent as ReviewStar } from '../../../common/icons/review-star.svg';
import { ReactComponent as ReviewVoidStar } from '../../../common/icons/review-void-star.svg';
import { ReviewType, ReviewPhotoType } from '../../../common/types/review';
import './Review.scss';

interface ReviewTypeProps {
  review: ReviewType;
}

function Review({ review }: ReviewTypeProps) {
  const reviewStarCount = useMemo(() => reviewStarComponents(), []);
  const [moreDescription, setMoreDescription] = useState(false);

  function reviewStarComponents() {
    const reviewStarArray = [];
    for (let i = 0; i < review.review.rating; i += 1) {
      reviewStarArray.push(<ReviewStar />);
    }
    for (let i = 0; i < 5 - review.review.rating; i += 1) {
      reviewStarArray.push(<ReviewVoidStar />);
    }
    return reviewStarArray;
  }

  const handleMoreDescription = () => {
    setMoreDescription(!moreDescription);
  };

  return (
    <div className="review">
      <header className="review-header">
        <img src={review.profileUrl} alt="profile-img" width={60} height={60} />
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
        <div className="review-content-image-container">
          {review.review.reviewPhotoList.map((image: ReviewPhotoType) => (
            <img src={image.url} alt="profile-img" />
          ))}
        </div>
      </body>
    </div>
  );
}

export default memo(Review);
