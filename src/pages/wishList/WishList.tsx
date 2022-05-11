/* eslint-disable react/jsx-no-comment-textnodes */
import React,{useState,useCallback} from 'react'
import Footer from '../../common/layouts/Footer';
import Folder from './wishListInfo/Folder';
import History from './historyInfo/History';
import './WishList.scss';


function WishList() {
  const [currentTab, setCurrentTab] = useState(0);

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