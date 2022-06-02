import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

interface ImagesProps  {
  images:Array<any>
}
interface imageType {
  detailPhotoId: number;
  isMain: number;
  url: string;
}

function ImageSlider({images}:ImagesProps) {
  return (
      <Carousel showThumbs={false} showArrows={false} showStatus={false}>
        {images.map((image:imageType) => (
          <img src={image.url} alt="img" key={image.url}/>
        ))}
      </Carousel>
  );
}

export default ImageSlider;