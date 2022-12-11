import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './ReviewSlider.scss';

interface ImageType {
  registDt: string;
  reviewPhotoId: number;
  url: string;
}

function ReviewSlider(props: { images: ImageType[] }) {
  const { images } = props;
  return (
    <Carousel showThumbs={false} showStatus={false} emulateTouch={false} showArrows={false}>
      {images &&
        images.map((image) => (
          <div className="image-slider-wrapper">
            <img className="image-slider" src={image.url} alt="img" key={image.reviewPhotoId} />
          </div>
        ))}
    </Carousel>
  );
}

export default ReviewSlider;
