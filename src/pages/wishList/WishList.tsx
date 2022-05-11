import React,{useState,useCallback,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';
import { tokenActions } from '../../redux/reducers/tokenSlice';
import { tokenRefresh } from '../../common/api/login';
import Footer from '../../common/layouts/Footer';
import Folder from './wishListInfo/Folder';
import History from './historyInfo/History';
import './WishList.scss';


function WishList() {
  const [currentTab, setCurrentTab] = useState(0);
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const refreshToken = localStorage.getItem('refreshToken') || '';

  useEffect(() => {
    tokenRefresh({ refreshToken }, (response: AxiosResponse) => {
      const { code } = response.data;

      if (code === 200) {
        const accessToken = response.headers.authorization_access;
        const refreshToken = response.headers.authorization_refresh;

        dispatch(tokenActions.setToken(accessToken),);
        localStorage.setItem('refreshToken', refreshToken);
      }
      else {
        navigation('/user/signin');
      }
    });
  }, [refreshToken]);

  const changeCurrentTab = useCallback((tabNumber: number)=> (event: React.MouseEvent)  => {
    setCurrentTab(tabNumber);
  },[])

  
  return (
    <div className="wish-list-background">
        {currentTab === 0 ? (
          <>
          <div className="wish-list-tab">
            <div
              className="wish-list-tab-folder-active"
              role="button"
              tabIndex={0}
              onClick={changeCurrentTab(0)}
              aria-hidden="true"
            >
              Wishlist
            </div>
            <div
              className="wish-list-tab-history"
              role="button"
              tabIndex={-1}
              onClick={changeCurrentTab(1)}
              aria-hidden="true"
            >
              History
            </div>
          </div>
          <Folder/>
          </>
        ) : (
          <>
          <div className="wish-list-tab">
            <div
              className="wish-list-tab-folder"
              role="button"
              tabIndex={0}
              onClick={changeCurrentTab(0)}
              aria-hidden="true"
            >
              Wishlist
            </div>
            <div
              className="wish-list-tab-history-active"
              role="button"
              tabIndex={-1}
              onClick={changeCurrentTab(1)}
              aria-hidden="true"
            >
              History
            </div>
          </div>
          <History/>
          </>
        )}
        <Footer />
    </div>
  );
}

export default WishList;