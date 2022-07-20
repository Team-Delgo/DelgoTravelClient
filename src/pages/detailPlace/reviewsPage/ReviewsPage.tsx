/* eslint-disable array-callback-return */

import React,{useEffect,useState,useCallback,useRef} from 'react';
import { useLocation,Link,useParams,useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Transition  } from 'react-transition-group';
import Reviews from '../reviews/Reviews';
import { ReactComponent as LeftArrow } from '../../../icons/left-arrow.svg';
import { ReactComponent as ReviewStar } from '../../../icons/review-star.svg';
import './ReviewsPage.scss';

interface RivewType {
  placeName: string;
  profileUrl: string;
  review: {
    bookingId: string
    placeId: number
    rating: number
    registDt: string
    reviewId: number
    reviewPhotoList:Array<string>
    roomId: number
    text: string
    updateDt: null
    userId: number
  };
  roomName: string;
  userName: string;
}


function ReviewsPage() {
  const [reviews, setReviews] = useState<Array<any>>([]);
  const [reviewsCount,setReviewsCount] = useState(0)
  const [checked, setChecked] = useState(false);
  const [imageReviewsCount,setImageReviewsCount] = useState(0)
  const location: any = useLocation();
  const { placeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    setReviews(location.state.reviews);
    setReviewsCount(location.state.reviews.length)

    const reviewImages = location.state.reviews.filter(function(review:any) {
      if(review.review.reviewPhotoList.length >0)  {
        return true;
      }
    })
    setImageReviewsCount(reviewImages.length)
  }, []);


  const showImageReviews = useCallback(() => {
    if (checked === true) {
      setChecked(!checked);
      setReviews(location.state.reviews);
    } else {
      setChecked(!checked);
      const imageReviews: React.SetStateAction<string[]> = [];
      console.log(reviews)
      reviews.map((review: any) => {
        console.log(review)
        if (review.review.reviewPhotoList.length > 0) {
          imageReviews.push(review);
        }
      });
      setReviews(imageReviews);
    }
  }, [checked, reviews]);


  // const moveToPreviousPage = useCallback(() => {
  //   navigate(-1);
  // }, []);

  return (
    <>
      {/* <Transition in timeout={100} appear>
        {(status) => (
          <div className={`pageSlider pageSlider-${status}`}> */}
            <header className="detail-place-review-page-header">
              <Link to={`/detail-place/${placeId}`} state={{ prevPath: location.pathname }} key={placeId}>
                <LeftArrow className="detail-place-review-page-header-previous-page" />
              </Link>
              <div className="detail-place-review-page-header-number">리뷰 {reviewsCount}개</div>
              <div className="detail-place-review-page-header-rating-count">
                <ReviewStar className="detail-place-review-page-header-review-star" />
                &nbsp;&nbsp;4.5점
              </div>
              <input type="checkbox"  checked={checked}  name="xxx" value="yyy" onClick={showImageReviews}/>
              <span className="detail-place-review-page-header-image-review"> 사진 리뷰만 보기({imageReviewsCount}개)</span>
            </header>
            <body className="detail-place-review-page-body">
            {reviews.map((review) => (
              <Reviews key={review.id} review={review} />
            ))}
            </body>
          {/* </div>
        )}
      </Transition> */}
    </>
  );
}

export default ReviewsPage;