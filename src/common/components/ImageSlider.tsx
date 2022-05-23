import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

interface ImagesProps  {
  images:Array<string>
}

function ImageSlider({images}:ImagesProps) {
  return (
      <Carousel showThumbs={false} showArrows={false} showStatus={false}>
        {images.map((url) => (
          <img src={url} alt="img" key={url} />
        ))}
      </Carousel>
  );
}

export default ImageSlider;