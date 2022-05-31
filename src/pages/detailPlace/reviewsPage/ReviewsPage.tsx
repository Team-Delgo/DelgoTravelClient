import React,{useEffect,useState} from 'react';
import { useLocation,Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Transition  } from 'react-transition-group';
import Reviews from '../reviews/Reviews';
import { ReactComponent as LeftArrow } from '../../../icons/left-arrow2.svg';
import { ReactComponent as ReviewStar } from '../../../icons/review-star.svg';
import './ReviewsPage.scss';

function ReviewsPage() {
  const [reviews, setReviews] = useState<Array<any>>([]);
  const location: any = useLocation();
  const { place } = useSelector((state: any) => state.persist.reservation);

  useEffect(() => {
    setReviews(location.state.reviews);
  }, []);

  return (
    <div>
      <Transition in timeout={200} appear>
        {(status) => (
          <div className={`pageSlider pageSlider-${status}`}>
            <header className="detail-place-review-page-header">
              <Link to={`/detail-place/${place.placeId}`} state={{ prevPath: location.pathname }} key={place.placeId}>
                <LeftArrow className="detail-place-review-page-header-previous-page" />
              </Link>
              <div className="detail-place-review-page-header-number">리뷰 {reviews.length}개</div>
              <div className="detail-place-review-page-header-rating-count">
                <ReviewStar className="detail-place-review-page-header-review-star" />
                &nbsp;&nbsp;4.5점
              </div>
              <input type="checkbox" name="xxx" value="yyy" />
              <span className="detail-place-review-page-header-image-review">사진 리뷰만 보기(4개)</span>
            </header>
            {reviews.map((review) => (
              <Reviews key={review.id} review={review} />
            ))}
          </div>
        )}
      </Transition>
    </div>
  );
}

export default ReviewsPage;