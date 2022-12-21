import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './ImageSlider.scss';
import { RoomImgType } from '../types/room';

interface ImagesProps {
  images: Array<RoomImgType>;
}

function ImageSlider({ images }: ImagesProps) {
  return (
    <Carousel showThumbs={false} showStatus={false} emulateTouch={false} infiniteLoop showArrows={false}>
      {images &&
        images.map((image: RoomImgType) => <img className="image-slider" src={image.url} alt="img" key={image.url} />)}
    </Carousel>
  );
}

export default ImageSlider;
