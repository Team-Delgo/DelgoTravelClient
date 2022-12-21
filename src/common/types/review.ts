export interface ReviewType {
  placeName: string;
  profileUrl: string;
  review: {
    bookingId: string;
    placeId: number;
    rating: number;
    registDt: string;
    reviewId: number;
    roomId: number;
    text: string;
    updateDt: null;
    userId: number;
    reviewPhotoList: Array<ReviewPhotoType>;
  };
  roomName: string;
  userName: string;
}

export interface ReviewPhotoType {
  registDt: string;
  reviewPhotoId: number;
  url: string;
}

