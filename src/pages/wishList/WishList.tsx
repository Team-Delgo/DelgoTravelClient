/* eslint-disable react/jsx-no-comment-textnodes */
import React,{useState,useEffect} from 'react'
import { useSelector } from "react-redux";
import { AxiosResponse } from 'axios';
import Footer from '../../common/layouts/Footer';
import Folder from './wishListInfo/Folder';
import History from './historyInfo/History';
import getAllPlaces from '../../common/api/getAllPlaces';
import './WishList.scss';

interface PlaceType  {
  address: string
  lowestPrice: string
  mainPhotoUrl: string
  name: string
  placeId: number
  registDt: string
  wishId: number
}


function WishList() {
  const [places, setPlaces] = useState<Array<PlaceType>>([]);
  const [currentTab, setCurrentTab] = useState(0);
  const userId = useSelector((state: any) => state.persist.user.user.id)


  useEffect(() => {
    getAllPlaces(userId,(response: AxiosResponse) => {
      setPlaces(response.data.data); 
    })
  }, []);

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

export default WishList;