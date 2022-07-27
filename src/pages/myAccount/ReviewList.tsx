import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { AxiosResponse } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useQuery } from 'react-query';
import { getMyReviewList } from "../../common/api/reivew";
import { useErrorHandlers } from '../../common/api/useErrorHandlers';
import {RootState} from '../../redux/store'
import LeftArrow from '../../icons/left-arrow.svg';
import RightArrow from '../../icons/right-arrow-thin.svg';
import Star from "../../icons/big-review-star-active.svg";
import GrayStar from "../../icons/big-review-star.svg";
import './ReviewList.scss';

interface ReviewType {
  placeName: string
  profileUrl: string
  review: {
    bookingId: string
    placeId: number
    rating: number
    registDt: string
    reviewId: number
    reviewPhotoList:Array<ReviewPhotoListType>
    roomId: number
    text: string
    updateDt: null
    userId: number
  }
  roomName: string
  userName: string
}

interface ReviewPhotoListType {
  registDt: string
  reviewPhotoId: number
  url: string
}

function ReviewList() {
  const userId = useSelector((state:RootState)=>state.persist.user.user.id);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const { isLoading, data: reviewList } = useQuery(
    'getMyReviewList',
    () => getMyReviewList(userId),
    {
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 3,
      refetchInterval: false,
      onError: (error: any) => {
        useErrorHandlers(dispatch, error)
      }
    },
  );

  if (isLoading) {
    return <div className="reviewlist">&nbsp;</div>
  }


  const reivews = reviewList?.data.map((review: ReviewType) => {
    const temp = review.review.registDt;
    const date = `${temp.slice(2, 4)}.${temp.slice(5, 7)}.${temp.slice(8, 10)}`
    const photos = review.review.reviewPhotoList;
    const photoNum = photos.length;
    let photo;

    if (photoNum === 1) {
      photo = <div className="review-photo1">
        <img src={photos[0].url} alt="image1" className="review-photo1-image1" />
      </div>
    } else if (photoNum === 2) {
      photo = <div className="review-photo2">
        <div className="review-photo2-image">
          <img src={photos[0].url} alt="image1" />
        </div>
        <div className="review-photo2-image">
          <img src={photos[1].url} alt="image1" />
        </div>
      </div>
    } else if (photoNum === 3) {
      photo = <div className="review-photo3">
        <div className="review-photo3-image1">
          <img src={photos[0].url} alt="image1" />
        </div>
        <div className="review-photo3-image2">
          <img src={photos[1].url} alt="image2" />
        </div>
        <div className="review-photo3-image3">
          <img src={photos[2].url} alt="image3" />
        </div>
      </div>
    } else if (photoNum === 4) {
      photo = <div className="review-photo4">
        <img src={photos[0].url} alt="image1" className="review-photo4-image1" />
        <img src={photos[1].url} alt="image2" className="review-photo4-image2" />
        <img src={photos[2].url} alt="image3" className="review-photo4-image3" />
        <img src={photos[3].url} alt="image4" className="review-photo4-image4" />
      </div>
    }

    const tempArray = [0, 0, 0, 0, 0];
    const rate = review.review.rating;

    const star = tempArray.map((item, i) => {
      console.log(rate)
      if (i + 1 <= rate) {
        return <img src={Star} alt="star" className="review-star" />
      }
      return <img src={GrayStar} alt="gray-star" className="review-star" />
    });



    return <div className="reviewlist-review" key={review.review.reviewId}>
      <div className="review-place">
        <div className="review-place-name">{review.placeName}</div>
        <img src={RightArrow} alt="place-detail" className="reivew-place-arrow" />
      </div>
      <div className="review-edit">
        <div className="review-edit-fix">수정</div>
        <div className="review-edit-delete">삭제</div>
      </div>
      <div className="review-rate">
        <div className="review-rate-stars">{star}</div>
        <div className="review-rate-date">{date}</div>
      </div>
      <div className="review-room">{review.roomName} 객실 이용</div>
      <p className="review-content">{review.review.text}</p>
      <div className={classNames("review-photowrapper", { none: photoNum === 0 })}>
        {photo}
      </div>
    </div>
  });

  return <div className="reviewlist">
    <img aria-hidden="true" className="reviewlist-back" src={LeftArrow} alt="back" onClick={() => { navigate(-1); }} />
    <div className="reviewlist-header">내가 쓴 리뷰 {reviewList?.data.length}개</div>
    {reivews}
  </div>;
};

export default ReviewList;