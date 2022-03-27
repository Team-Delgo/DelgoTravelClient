import React,{useState} from 'react'
import Footer from '../../common/layouts/Footer';
import Folder from './wishListInfo/Folder';
import History from './historyInfo/History';
import './WishList.scss';

function wishList() {
  const [currentTab, setCurrentTab] = useState(0);


  const changeCurrentTab = (tabNumber: number) => {
    setCurrentTab(tabNumber);
  };
  const handleKeyDown = () => {
    // if (ev.keyCode == 13) {
    //   this.focus()
    //  }
  };

  return (
    <div className="wish-list-background">
        {currentTab === 0 ? (
          <>
          <div className="wish-list-tab">
            <div
              className="wish-list-tab-folder-active"
              role="button"
              tabIndex={0}
              onClick={() => {
                changeCurrentTab(0);
              }}
              onKeyDown={handleKeyDown}
            >
              Wishlist
            </div>
            <div
              className="wish-list-tab-history"
              role="button"
              tabIndex={-1}
              onClick={() => {
                changeCurrentTab(1);
              }}
              onKeyDown={handleKeyDown}
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
              onClick={() => {
                changeCurrentTab(0);
              }}
              onKeyDown={handleKeyDown}
            >
              Wishlist
            </div>
            <div
              className="wish-list-tab-history-active"
              role="button"
              tabIndex={-1}
              onClick={() => {
                changeCurrentTab(1);
              }}
              onKeyDown={handleKeyDown}
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

export default wishList;