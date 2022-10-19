import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './ReviewSlider.scss';

interface ImagesProps {
  images: string[];
}
interface ImageType {
  detailPhotoId: number;
  isMain: number;
  url: string;
}

function ReviewSlider(props: { images: string[] }) {
  const { images } = props;
  return (
    <Carousel showThumbs={false} showStatus={false} emulateTouch={false} showArrows={false}>
      {images &&
        images.map((image) => (
          <div className="image-slider-wrapper">
            <img className="image-slider" src={image} alt="img" key={image} />
          </div>
        ))}
    </Carousel>
  );
}

export default ReviewSlider;
