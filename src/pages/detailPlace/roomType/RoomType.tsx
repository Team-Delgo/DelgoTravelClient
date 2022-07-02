import React ,{memo}from 'react'
import './RoomType.scss'

interface RoomListType {
  isBooking: number
  mainPhotoUrl: string
  name: string
  personMaxNum: number
  personStandardNum: number
  petMaxNum: number
  petSizeLimit: string
  petStandardNum: number
  placeId: number
  price: string
  roomId: number
}

function RoomType(props: { navigate: () => void; room: RoomListType; checkIn: string; checkOut: string }) {
  const { navigate, room, checkIn, checkOut } = props;
  return (
    <div className="room" aria-hidden="true" onClick={room.isBooking === 0 ? navigate : undefined}>
      <img src={`${room.mainPhotoUrl}`} alt="room-img" />
      <div className="room-info">
        <div className="room-info-first-line">
          <p className="room-info-first-line-name">{room.name}</p>
          <p className="room-info-first-line-max">
            기준 {room.personStandardNum}인/최대 {room.personMaxNum}인
          </p>
        </div>
        <div className="room-info-second-line">
          <div className="check-in-check-out-time">
            입실 {checkIn.substring(0, 5)} / 퇴실 {checkOut.substring(0, 5)}
          </div>
          <div className="room-price">
            {room.isBooking === 1 ? <span>예약마감</span> : <span>{room.price}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(RoomType);