import React, { memo } from 'react';
import './RoomType.scss';
import { RoomDataType } from '../../../common/types/room';

// interface RoomListType {
//   isBooking: number
//   mainPhotoUrl: string
//   name: string
//   personMaxNum: number
//   personStandardNum: number
//   petMaxNum: number
//   petSizeLimit: string
//   petStandardNum: number
//   placeId: number
//   price: string
//   roomId: number
// }

function RoomType(props: { navigate: () => void; room: RoomDataType }) {
  const { navigate, room } = props;
  return (
    <div className="room" aria-hidden="true" onClick={room.isBooking === 0 ? navigate : undefined}>
      <img src={`${room.mainPhotoUrl}`} alt="room-img" />
      <div className="room-info">
        <div className="room-info-first-line">
          <div className="room-info-first-line-name">{room.name}</div>
        </div>
        <div className="room-info-second-line">
          <div className="check-in-check-out-time">
            기준 {room.personStandardNum}인/최대 {room.personMaxNum}인
          </div>
          <div className="room-price">{room.isBooking === 1 ? <span>예약마감</span> : <span>{room.price}</span>}</div>
        </div>
      </div>
    </div>
  );
}

export default memo(RoomType);
