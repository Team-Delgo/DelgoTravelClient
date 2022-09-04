import React from 'react'
import './RoomTypeNotice.scss'

interface RoomNoticeProps {
    roomNotice: RoomNoticeType
  }

interface RoomNoticeType {
    contents:Array<string>,
    roomId: number,
    roomNoticeId: number,
    title: string
  }

function RoomTypeNotice({roomNotice}:RoomNoticeProps) {
  return (
    <div className="detail-place-room-type-notice">
      <div className="detail-place-room-type-notice-title">{roomNotice.title}</div>
      <div className="detail-place-room-type-notice-content">
        {roomNotice.contents.map((content: string) => (
          <div key={content}>* {content}</div>
        ))}
      </div>
    </div>
  );
}

export default RoomTypeNotice;
