import React from 'react'
import'./Notice.scss';

interface NoticeProps {
    notice: NoticeType
  }
  
  interface NoticeType {
    contents:Array<string>
    placeId: number
    placeNoticeId: number
    title:string
  }

function Notice({notice}:NoticeProps) {
  return (
    <div className="detail-place-notice">
      <div className="detail-place-notice-title">{notice.title}</div>
      <div className="detail-place-notice-content">
        {notice.contents.map((content: string, index: number) => (
          <div>* {content}</div>
        ))}
      </div>
    </div>
  );
}

export default Notice
