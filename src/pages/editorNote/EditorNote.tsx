import React ,{useCallback ,useEffect}from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate ,useLocation ,useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { ReactComponent as LeftArrow } from '../../icons/left-arrow2.svg'
import BottomButton from '../../common/components/BottomButton';
import { getEditorNotePlace } from '../../common/api/getPlaces';
import { useErrorHandlers } from '../../common/api/useErrorHandlers';
import {prevPathActions} from "../../redux/slice/prevPathSlice"
import "./EditorNote.scss";

function EditorNote() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location: any = useLocation();
  const { placeId } = location.state;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const moveToMainPage = useCallback(() => {
    navigate("/");
  }, []);

  const moveToDetailPage = () => {
    dispatch(prevPathActions.prevPath({ prevPath: location.pathname }));
    navigate(`/detail-place/${placeId}`);
  };

  if (getEditorNotePlaceIsLoading) {
    return <div className="editor-background">&nbsp;</div>;
  }

  return (
    <div className="editor-background">
      <img className="editor-img" src={editorNotePlace.data.mainUrl} alt="editor-place-img" />
      <div className="editor-previous-page">
        <LeftArrow onClick={moveToMainPage} />
      </div>
      <div aria-hidden="true" onClick={moveToDetailPage}>
        <BottomButton text="자세히 보러가기" />
      </div>
    </div>
  );
}

export default EditorNote;