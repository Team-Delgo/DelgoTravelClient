import React from 'react'
import './RoomType.scss'

function RoomType({room}:any) {
  return (
    <div className="room">
    {/* <Link to={`/detail-place/${place.placeId}`} key={place.placeId}> */}
      <img src={room.image} alt="room-img" />
    {/* </Link> */}
    <div className="room-info">
      <div className="room-info-first-line">
      <span>최대 {room.max_person}인/최대 {room.max_dog}마리</span>
      </div>
      <div className="room-info-second-line">
      <span>{room.name}</span>
        <span>{room.lowestPrice}원</span>
      </div>
    </div>
  </div>
  )
}

export default RoomType