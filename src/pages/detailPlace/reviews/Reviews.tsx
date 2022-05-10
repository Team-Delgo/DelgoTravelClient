import React from 'react'
import './Reviews.scss';

function Reviews({ review }: any) {
  return (
    <div className="review">
      <header className="review-header">
        <img src={review.profileImage} alt="profile-img" width={60} height={60} />
        <div className="review-header-info">
          <div className="review-header-info-nick-name">{review.nickName}</div>
          <div>
            <span className="review-header-info-star-rating">★★★★★</span>&nbsp;&nbsp;
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