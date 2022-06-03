import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

interface ImagesProps  {
  images:Array<ImageType>
}
interface ImageType{
  detailPhotoId: number
  isMain: number
  url: string
}


function ImageSlider({images}:ImagesProps) {
  return (
      <Carousel showThumbs={false}  showStatus={false} swipeable={false}>
        {images.map((image:ImageType) => (
          <img src={image.url} alt="img" key={image.url}/>
        ))}
      </Carousel>
  );
}

export default ImageSlider;