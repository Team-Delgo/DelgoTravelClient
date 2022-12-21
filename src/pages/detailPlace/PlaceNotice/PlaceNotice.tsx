import React from 'react';
import './PlaceNotice.scss';
import { PlaceNoticeType } from '../../../common/types/notice';

interface PlaceNoticeProps {
  placeNotice: PlaceNoticeType;
}

function Notice({ placeNotice }: PlaceNoticeProps) {
  return (
    <div className="detail-place-notice">
      <div className="detail-place-notice-title">{placeNotice.title}</div>
      <div className="detail-place-notice-content">
        {placeNotice.contents.map((content: string) => (
          <div key={content}>* {content}</div>
        ))}
      </div>
    </div>
  );
}

export default Notice;
