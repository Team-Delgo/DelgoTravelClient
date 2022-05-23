import React ,{useCallback}from 'react'
import { useNavigate } from 'react-router-dom';
import { ReactComponent as LeftArrow } from '../../icons/left-arrow2.svg'
import BottomButton from '../../common/components/BottomButton';
import "./EditorNote.scss";

function EditorNote() {
  const navigate = useNavigate();
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

  const moveToPreviousPage = useCallback(() => {
    navigate(-1)
  }, []);

  return (
    <div className="editor-background">
      <LeftArrow className="editor-previous-page" onClick={moveToPreviousPage} />
      <div className="editor-sub-text">바다가 보이는 여름숙소</div>
      <div className="editor-header-text">속초 코코네집</div>
      {posts.map((post) => (
        <div className="editor-place">
          <img src={post.image} alt="editor-place-img" />
          <div className="editor-place-description">{post.description}</div>
        </div>
      ))}
      <BottomButton text="자세히 보러가기" />
    </div>
  );
}

export default EditorNote;