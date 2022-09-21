import React from 'react'
import'./PlaceNotice.scss';

interface PlaceNoticeProps {
  placeNotice: PlaceNoticeType
  }
  
  interface PlaceNoticeType {
    contents:Array<string>
    placeId: number
    placeNoticeId: number
    title:string
  }

function Notice({placeNotice}:PlaceNoticeProps) {
  return (
    <div className="detail-place-notice">
      <div className="detail-place-notice-title">{placeNotice.title}</div>
      <div className="detail-place-notice-content">
        {placeNotice.contents.map((content: string, index: number) => (
          <div key={content}>* {content}</div>
        ))}
      </div>
    </div>
  );
}

export default Notice
