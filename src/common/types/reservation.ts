export interface reservationDataType {
  bookingId: string;
  bookingState: string;
  canCancelDate: string;
  commission: string;
  couponId: number;
  couponPrice: string;
  endDt: string;
  finalPrice: string;
  originalPrice: string;
  point: number;
  refund: string;
  registDt: string;
  roomName: string;
  startDt: string;
  reservedName: string;
  userPhoneNo: string;
  place: {
    address: string;
    checkin: string;
    checkout: string;
    isBooking: number;
    lowestPrice: null;
    mainPhotoUrl: string;
    name: string;
    placeId: number;
    phoneNo: string;
    policy: string;
    wishId: number;
  };
}
