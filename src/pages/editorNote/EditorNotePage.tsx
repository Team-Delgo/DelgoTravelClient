import React, { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import { ReactComponent as LeftArrow } from '../../icons/left-arrow2.svg'
import BottomButton from '../../common/components/BottomButton';
import { getEditorNotePlace } from '../../common/api/places';
import { useErrorHandlers } from '../../common/api/useErrorHandlers';
import { ROOT_PATH } from '../../common/constants/path.const';
import { prevPathActions } from "../../redux/slice/prevPathSlice"
import { scrollActions } from '../../redux/slice/scrollSlice';
import "./EditorNotePage.scss";

interface EditorImgType {
  editorNoteId: number
  order: number
  placeId: number
  thumbnailUrl: string
  url: string
}

function EditorNotePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location: any = useLocation();
  const { placeId } = location.state;

  const { isLoading: getEditorNotePlaceIsLoading, data: editorNotePlace } = useQuery(
    'getEditorNotePlace',
    () => getEditorNotePlace(placeId),
    {
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 3,
      refetchInterval: false,
      onError: (error: any) => {
        useErrorHandlers(dispatch, error);
      },
    },
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(scrollActions.scrollInit());
  }, []);

  const moveToMainPage = () => {
    navigate(ROOT_PATH);
  }

  const moveToDetailPage = () => {
    dispatch(prevPathActions.prevPath({ prevPath: location.pathname }));
    navigate(`/detail-place/${placeId}`);
  };

  if (getEditorNotePlaceIsLoading) {
    return <div className="editor-background">&nbsp;</div>;
  }

  return (
    <div className="editor-background">
      {
        editorNotePlace.data.map((place: EditorImgType) => <img className="editor-img" src={place.url} alt="editor-place-img" />)
      }
      <div className="editor-previous-page">
        <LeftArrow onClick={moveToMainPage} />
      </div>
      <div aria-hidden="true" onClick={moveToDetailPage}>
        <BottomButton text="자세히 보러가기" />
      </div>
    </div>
  );
}

export default EditorNotePage;