/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable array-callback-return */
import React,{useCallback, Dispatch, SetStateAction } from 'react'
import './Region.scss'

interface RegionType{
  id:number
  name:string 
}
interface PropsType{
  areaTerm:string
  setAreaTerm:Dispatch<SetStateAction<string>>
}

const regions = [
  { id: 0, name: '제주' },
  { id: 1, name: '강원' },
  { id: 2, name: '부산' },
  { id: 3, name: '경기' },
  { id: 4, name: '인천' },
  { id: 5, name: '전라' },
  { id: 6, name: '경상' },
  { id: 7, name: '충청' },
  { id: 8, name: '광주' },
  { id: 9, name: '대전' },
  { id: 10, name: '대구' },
  { id: 11, name: '울산' },
]; 

function Region({ areaTerm,setAreaTerm }: PropsType) {

  const handleSelectAllRegions = useCallback(() => {
    setAreaTerm('');
  }, []);

  const handleSelectRegion = useCallback((regionName: string) => (event: React.MouseEvent) => {
    if (areaTerm === regionName) {
      setAreaTerm('');
    } else {
      setAreaTerm(regionName);
    }
  },[areaTerm]);
  
  return (
    <div className="region-modal" >
      {areaTerm === '' ? (
        <header className="region-modal-header-selected">국내 전체</header>
      ) : (
        <header className="region-modal-header" onClick={handleSelectAllRegions}>
          국내 전체
        </header>
      )}
      <section className="region-modal-section">
        {regions.map((region: RegionType) =>
          region.name === areaTerm ? (
            <span
              className="region-modal-section-region-name-selected"
              key={region.id}
              onClick={handleSelectRegion(region.name)}
            >
              {region.name}
            </span>
          ) : (
            <span
              className="region-modal-section-region-name"
              key={region.id}
              onClick={handleSelectRegion(region.name)}
            >
              {region.name}
            </span>
          ),
        )}
      </section>
    </div>
  );
}

export default Region;