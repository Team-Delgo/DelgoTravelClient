export interface PlaceType {
  address: string;
  checkin: string;
  checkout: string;
  isBooking: number;
  lowestPrice: string;
  mainPhotoUrl: string;
  name: string;
  placeId: number;
  wishId: number;
}

export interface WishedPlaceType {
  address: string;
  lowestPrice: string;
  mainPhotoUrl: string;
  name: string;
  placeId: number;
  registDt: string;
  wishId: number;
}

export interface TraveledHisotryPlaceType {
  bookingId: string;
  roomName: string;
  roomId: number;
  startDt: string;
  endDt: string;
  reviewExisting: boolean;
  place: {
    address: string;
    checkin: string;
    checkout: string;
    isBooking: 0;
    lowestPrice: null;
    mainPhotoUrl: string;
    name: string;
    placeId: number;
    wishId: number;
  };
}
