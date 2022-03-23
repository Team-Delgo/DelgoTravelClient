import React from 'react'
import "./EditorNote.scss";

function EditorNote() {
  const posts = [
    {
      image: `${process.env.PUBLIC_URL}/assets/images/editorImage.png`,
      description:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enimvelit mollit. Exercitation veniam consequat sunt nostrud amet.',
    },
    {
      image: `${process.env.PUBLIC_URL}/assets/images/editorImage.png`,
      description:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enimvelit mollit. Exercitation veniam consequat sunt nostrud amet.',
    },
    {
      image: `${process.env.PUBLIC_URL}/assets/images/editorImage.png`,
      description:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enimvelit mollit. Exercitation veniam consequat sunt nostrud amet.',
    },
  ];

  return (
    <div className="editor-background">
      <div className="editor-sub-text">바다가 보이는 여름숙소</div>
      <div className="editor-header-text">속초 코코네집</div>
      {posts.map((post) => (
        <div className="editor-place">
          <img src={post.image} alt="editor-place-img" />
          <div className="editor-place-description">{post.description}</div>
        </div>
      ))}
      <div className="editor-footer">
        <div className="laern-more">자세히 보러가기</div>
      </div>
    </div>
  );
}

export default EditorNote;