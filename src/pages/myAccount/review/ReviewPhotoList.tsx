import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import { AxiosResponse } from 'axios';
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
  const {reviewId} = state;
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();

  console.log(reviewId);

  useEffect(()=>{
    getReviewDataRefetch();
  },[])

  const {
    isLoading: getReviewDataIsLoading,
    data: detailPlace,
    refetch:getReviewDataRefetch,
  } = useQuery(GET_REVIEW_DATA, () => getReviewData(reviewId), {
    cacheTime: CACHE_TIME,
    staleTime: STALE_TIME,
    refetchInterval: false,
    onError: (error: any) => {
      useErrorHandlers(dispatch, error);
    },
  });

  console.log(detailPlace);

  return (
    <div className="photoviewer">
      <div className='photoviewer-exit'>
        <img src={Exit} alt="exit"/>
      </div>
      <ReviewSlider
        images={detailPlace?.data.data}
      />
    </div>
  );
}

export default ReviewPhotoList;
