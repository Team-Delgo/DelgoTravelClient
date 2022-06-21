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

function RoomType(props: { navigate: () => void; room: RoomListType }) {
  const { navigate, room } = props;
  return (
    <div className="room" aria-hidden="true" onClick={navigate}>
      <img src={`${room.mainPhotoUrl}`} alt="room-img" />
      <div className="room-info">
        <div className="room-info-first-line">
          <p className="room-info-first-line-name">{room.name}</p>
          <p className="room-info-first-line-max">
            기준 {room.personStandardNum}인/최대 {room.personMaxNum}인
          </p>
        </div>
        <div className="room-info-second-line">
          <span>{room.price}</span>
        </div>
      </div>
    </div>
  );
}

export default memo(RoomType);