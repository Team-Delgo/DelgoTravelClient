/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable array-callback-return */
import React,{useCallback, Dispatch, SetStateAction,memo } from 'react'
import './Region.scss'

interface RegionType{
  id:number
  name:string 
}
interface PropsType{
  areaTerm:string
  setAreaTerm:Dispatch<SetStateAction<string>>
  closeRegionSelectionModal:()=>void
}

const regions = [
  { id: 0, name: '강원' },
  { id: 1, name: '경기' },
  { id: 2, name: '충청' },
  { id: 3, name: '제주' },
  { id: 4, name: '전라' },
  { id: 5, name: '경상' },
]; 

function Region({ areaTerm,setAreaTerm ,closeRegionSelectionModal}: PropsType) {

  const handleSelectAllRegions = useCallback(() => {
    setAreaTerm('');
    setTimeout(()=>{
      closeRegionSelectionModal()
    },200)
  }, []);

  const handleSelectRegion = (regionName: string) => (event: React.MouseEvent) => {
    if (areaTerm === regionName) {
      setAreaTerm('');
    } else {
      setAreaTerm(regionName);
    }
    closeRegionSelectionModal()
  };
  
  return (
    <div className="region-modal" >
      <div className="region-modal-region-name" onClick={handleSelectAllRegions}>국내전체</div>
      {
        regions.map((region: RegionType) =>
          <div
            key={region.id}
            className="region-modal-region-name"
            onClick={handleSelectRegion(region.name)}
          >
            {region.name}
          </div>)
      }
    </div>
  );
}

export default memo(Region);