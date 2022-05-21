import React from 'react'
import Heart from "react-animated-heart"


function HeartComponent({ wishList, handleWishList }) {
  return (
      <Heart className="heart" isClick={wishList} onClick={handleWishList} />
  );
}

export default HeartComponent