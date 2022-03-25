import React,{useState} from 'react'
import Footer from '../../common/layouts/Footer';
import SavedPlace from './SavedPlace';
import './WishList.scss';

type SavedPlaceType = {
    id: number
    image:string
    name: string
    location: string
  }
function wishList() {
  const [currentTab, setCurrentTab] = useState(0);
  const [savedPlace, setSavedPlace] = useState<Array<SavedPlaceType>>([
    {
      id: 1,
      image: `${process.env.PUBLIC_URL}/assets/images/recommendedPlaceImage.png`,
      name: '멍멍이네 하우스',
      location: '강원도 속초시 조앙동',
    },
    {
      id: 2,
      image: `${process.env.PUBLIC_URL}/assets/images/recommendedPlaceImage.png`,
      name: '멍멍이네 하우스',
      location: '강원도 속초시 조앙동',
    },
    {
      id: 3,
      image: `${process.env.PUBLIC_URL}/assets/images/recommendedPlaceImage.png`,
      name: '멍멍이네 하우스',
      location: '강원도 속초시 조앙동',
    },
  ]);

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
      <div className="wish-list-tab">
        {currentTab === 0 ? (
          <>
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
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
      <div className="wish-list-container">
        <div className="wish-list-container-header-text">저장 된 4개의 숙소</div>
        {savedPlace.map((place) => (
          <SavedPlace place={place} key={place.id} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default wishList;