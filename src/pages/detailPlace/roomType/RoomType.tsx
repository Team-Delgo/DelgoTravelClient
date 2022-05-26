import React from 'react'
import './RoomType.scss'

function RoomType(props: { navigate: () => void; room: any }) {
  const { navigate, room } = props;
  return (
    <div className="room" aria-hidden="true" onClick={navigate}>
      <img src={`${process.env.PUBLIC_URL}/assets/images/detailPlaceImage.jpg`} alt="room-img" />
      <div className="room-info">
        <div className="room-info-first-line">
          <p className="room-info-first-line-name">{room.name}</p>
          <p className="room-info-first-line-max">
            최대 {room.personMaxNum}인/최대 {room.petMaxNum}마리
          </p>
        </div>
        <div className="room-info-second-line">
          <span>{room.price}</span>
        </div>
      </div>
    </div>
  );
}

export default RoomType;