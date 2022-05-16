import React from 'react'
import './RoomType.scss'

function RoomType(props: { navigate: () => void, room: any }) {
  const { navigate, room } = props;
  return (
    <div className="room" aria-hidden="true" onClick={navigate}>
      <img src={room.crawlingUrl} alt="room-img" />
      <div className="room-info">
        <div className="room-info-first-line">
          최대 {room.personMaxNum}인/최대 {room.petMaxNum}마리
        </div>
        <div className="room-info-second-line">
          <span>{room.name}</span>
          <span>{room.price}</span>
        </div>
      </div>
    </div>
  );
}

export default RoomType