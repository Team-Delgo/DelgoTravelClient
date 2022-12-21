export interface RoomDataType {
  isBooking: number;
  mainPhotoUrl: string;
  name: string;
  personMaxNum: number;
  personStandardNum: number;
  petMaxNum: number;
  petSizeLimit: string;
  petStandardNum: number;
  placeId: number;
  price: string;
  roomId: number;
}

export interface RoomImgType {
  detailPhotoId: number;
  isMain: number;
  url: string;
}
