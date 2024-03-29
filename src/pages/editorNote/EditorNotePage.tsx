import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import { ReactComponent as LeftArrow } from '../../common/icons/left-arrow2.svg';
import BottomButton from '../../common/components/BottomButton';
import { getEditorNotePlace } from '../../common/api/places';
import { useErrorHandlers } from '../../common/api/useErrorHandlers';
import { ROOT_PATH } from '../../common/constants/path.const';
import { GET_EDITOR_NOTE_PLACE, CACHE_TIME, STALE_TIME } from '../../common/constants/queryKey.const';
import { prevPathActions } from '../../redux/slice/prevPathSlice';
import { scrollActions } from '../../redux/slice/scrollSlice';
import { EditorImgType } from '../../common/types/editor';
import './EditorNotePage.scss';


function EditorNotePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location: any = useLocation();
  const { placeId } = location.state;

  const { isLoading: getEditorNotePlaceIsLoading, data: editorNotePlace } = useQuery(
    GET_EDITOR_NOTE_PLACE,
    () => getEditorNotePlace(placeId),
    {
      cacheTime: CACHE_TIME,
      staleTime: STALE_TIME,
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
  };

  const moveToDetailPage = () => {
    dispatch(prevPathActions.prevPath({ prevPath: location.pathname }));
    navigate(`/detail-place/${placeId}`);
  };

  if (getEditorNotePlaceIsLoading) {
    return <div className="editor-background">&nbsp;</div>;
  }

  return (
    <div className="editor-background">
      {editorNotePlace.data.map((place: EditorImgType) => (
        <img className="editor-img" src={place.url} alt="editor-place-img" />
      ))}
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
