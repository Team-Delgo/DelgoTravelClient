import React from 'react'
import './Reviews.scss';

function Reviews({ review }: any) {
  return (
    <>
      <header className="review-header">
        <img src={review.profileImage} alt="profile-img" width={60} height={60}/>
        <div>
            <div>{review.nickName}</div>
            <div><span>★★★★★</span>&nbsp;&nbsp;<span>{review.registrationDate}</span></div>
            <div>{review.roomUsed}</div>
        </div>
      </header>
      <body className="review-content">
          <div>{review.reviewContent}</div>
          {
              review.reviewImages.map((image:any)=>(
              <img src={image} alt="profile-img" /> 
              ))
          }
      </body>
    </>
  );
}

export default Reviews;