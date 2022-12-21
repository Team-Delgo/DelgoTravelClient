import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import "./ReviewPhotoList.scss";
import ReviewSlider from './ReviewSlider';
import Exit from "../../../common/icons/exit-white.svg";

import { getReviewData } from '../../../common/api/reivew';
import { useErrorHandlers } from '../../../common/api/useErrorHandlers';
import { CACHE_TIME, GET_REVIEW_DATA, STALE_TIME } from '../../../common/constants/queryKey.const';

interface LocationState{
  reviewId : number;
}

function ReviewPhotoList() {
  const state = useLocation().state as LocationState;
  const { reviewId } = state;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getReviewDataRefetch();
  }, []);

  const {
    isLoading: getReviewDataIsLoading,
    data: detailPlace,
    refetch: getReviewDataRefetch,
  } = useQuery(GET_REVIEW_DATA, () => getReviewData(reviewId), {
    cacheTime: CACHE_TIME,
    staleTime: STALE_TIME,
    refetchInterval: false,
    onError: (error: any) => {
      useErrorHandlers(dispatch, error);
    },
  });

  const moveToMyReviewPage = () => {
    navigate(-1);
  };

  return (
    <div className="photoviewer">
      <div className="photoviewer-exit">
        <img src={Exit} alt="exit" aria-hidden="true" onClick={moveToMyReviewPage} />
      </div>
      <ReviewSlider images={detailPlace?.data.data} />
    </div>
  );
}

export default ReviewPhotoList;
