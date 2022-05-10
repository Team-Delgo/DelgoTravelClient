import React,{useEffect,useState,useCallback} from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import Reviews from '../reviews/Reviews';
import { ReactComponent as LeftArrow } from '../../../icons/left-arrow.svg'
import './ReviewsPage.scss'

function ReviewsPage() {
  const [reviews, setReviews] = useState<Array<any>>([]);
  const location: any = useLocation();
  const navigate  = useNavigate()

  useEffect(() => {
    setReviews(location.state.reviews);
  }, []);

  const moveToPreviousPage = useCallback(() => {
    navigate(-1)
  },[]);


  return (
    <>
      <header className="detail-place-review-page-header">
        <LeftArrow className="detail-place-review-page-header-previous-page" onClick={moveToPreviousPage}/>
        <div className="detail-place-review-page-header-number">리뷰 {reviews.length}개</div>
        <div className="detail-place-review-page-header-rating-count">★&nbsp;&nbsp;4.5점</div>
        <input type="checkbox" name="xxx" value="yyy" />
        <span className="detail-place-review-page-header-image-review">사진 리뷰만 보기(4개)</span>
      </header>
      {reviews.map((review) => (
        <Reviews key={review.id} review={review} />
      ))}
    </>
  );
}

export default ReviewsPage