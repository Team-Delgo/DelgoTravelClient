import React from 'react'
import "./EditorNote.scss";

function EditorNote() {
  return (
    <div className="editor-background">
      <div className="editor-sub-text">바다가 보이는 여름숙소</div>
      <div className="editor-header-text">속초 코코네집</div>
      <div className="editor-place">
        <img src={`${process.env.PUBLIC_URL}/assets/images/editorImage.png`} alt="" />
        <div className="editor-place-description">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim
          velit mollit. Exercitation veniam consequat sunt nostrud amet.
        </div>
      </div>
      <div className="editor-place">
        <img src={`${process.env.PUBLIC_URL}/assets/images/editorImage.png`} alt="" />
        <div className="editor-place-description">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim
          velit mollit. Exercitation veniam consequat sunt nostrud amet.
        </div>
      </div>
      <div className="editor-place">
        <img src={`${process.env.PUBLIC_URL}/assets/images/editorImage.png`} alt="" />
        <div className="editor-place-description">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim
          velit mollit. Exercitation veniam consequat sunt nostrud amet.
        </div>
      </div>
      <div className="editor-footer">
          <div className="laern-more">자세히 보러가기</div>
      </div>
    </div>
  );
}

export default EditorNote