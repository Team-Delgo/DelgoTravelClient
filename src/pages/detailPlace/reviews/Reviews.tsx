import React from 'react'
import { ReactComponent as ReviewStar } from '../../../icons/review-star.svg'
import './Reviews.scss';

function Reviews({ review }: any) {
  function reviewStarComponents() {
    const reviewStarArray = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < review.starRating; i++) {
      reviewStarArray.push(<ReviewStar />);
    }
    return reviewStarArray;
  }

  return (
    <div className="review">
      <header className="review-header">
        <img src={review.profileImage} alt="profile-img" width={60} height={60} />
        <div className="review-header-info">
          <div className="review-header-info-nick-name">{review.nickName}</div>
          <div>
            <span className="review-header-info-star-rating">{reviewStarComponents()}</span>
            <span className="review-header-info-registration-data">{review.registrationDate}</span>
          </div>
          <div className="review-header-info-room-used">{review.roomUsed}</div>
        </div>
      </header>
      <body className="review-content">
        <div className="review-content-description">{review.reviewContent}</div>
        <div className="review-content-image-container">
          {review.reviewImages.map((image: any) => (
            <img src={image} alt="profile-img" />
          ))}
        </div>
      </body>
    </div>
  );
}

export default Reviews;