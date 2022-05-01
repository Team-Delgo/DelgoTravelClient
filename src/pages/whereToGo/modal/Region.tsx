/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable array-callback-return */
import React,{useState,useCallback, Dispatch, SetStateAction } from 'react'
import './Region.scss'

interface RegionType{
  id:number
  name:string 
}
interface PropsType{
  setAreaTerm:Dispatch<SetStateAction<string>>
}

function Region({ setAreaTerm }: PropsType) {
  const [selectedRegionId, setSelectedRegionId] = useState(-1);
  const [regions, setRegions] = useState<Array<RegionType>>([
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
  ]);

  const handleSelectAllRegions = useCallback(() => {
    setSelectedRegionId(-1);
    setAreaTerm('');
  }, []);

  const handleSelectRegion = (regionId: number) => (event: React.MouseEvent) => {
    if (selectedRegionId === regionId) {
      setSelectedRegionId(-1);
      setAreaTerm('');
    } else {
      setSelectedRegionId(regionId);
      setAreaTerm(regions[regionId].name);
    }
  };

  return (
    <div className="region-modal">
      {selectedRegionId === -1 ? (
        <header className="region-modal-header-selected">국내 전체</header>
      ) : (
        <header className="region-modal-header" onClick={handleSelectAllRegions}>국내 전체</header>
      )}
      <section className="region-modal-section">
        {regions.map((region: RegionType) =>
          region.id === selectedRegionId ? (
            <span
              className="region-modal-section-region-name-selected"
              key={region.id}
              onClick={handleSelectRegion(region.id)}
            >
              {region.name}
            </span>
          ) : (
            <span className="region-modal-section-region-name" key={region.id} onClick={handleSelectRegion(region.id)}>
              {region.name}
            </span>
          ),
        )}
      </section>
    </div>
  );
}

export default Region;