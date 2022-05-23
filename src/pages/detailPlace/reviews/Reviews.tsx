
import React,{useMemo, useState,useCallback} from 'react'
import { ReactComponent as ReviewStar } from '../../../icons/review-star.svg'
import './Reviews.scss';



function Reviews({ review }: any) {
  const reviewStarCount = useMemo(()=>reviewStarComponents(),[])
  const [moreDescription,setMoreDescription] = useState(false)

  function reviewStarComponents() {
    const reviewStarArray = [];
    for (let i = 0; i < review.starRating; i += 1) {
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
        <img src={review.profileImage} alt="profile-img" width={60} height={60} />
        <div className="review-header-info">
          <div className="review-header-info-nick-name">{review.nickName}</div>
          <div>
            <span className="review-header-info-star-rating">{reviewStarCount}</span>
            <span className="review-header-info-registration-data">{review.registrationDate}</span>
          </div>
          <div className="review-header-info-room-used">{review.roomUsed}</div>
        </div>
      </header>
      <body className="review-content">
        {review.reviewContent.length > 95 ? (
          <div>
            {moreDescription ? (
              <div className="review-content-description">{review.reviewContent}</div>
            ) : (
              <>
                <div className="review-content-description">{review.reviewContent.substring(0, 94)} ...</div>
                <span className="review-content-description-more" aria-hidden="true" onClick={handleMoreDescription}>
                  더보기
                </span>
              </>
            )}
          </div>
        ) : (
          <div className="review-content-description">{review.reviewContent}</div>
        )}
        <div className="review-content-image-container">
          {review.reviewImages.map((image: string) => (
            <img src={image} alt="profile-img" />
          ))}
        </div>
      </body>
    </div>
  );
}

export default Reviews;