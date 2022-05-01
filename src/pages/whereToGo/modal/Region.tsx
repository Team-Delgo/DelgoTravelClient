/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable array-callback-return */
import React,{useState,useCallback} from 'react'
import './Region.scss'

// interface RegionsProps{
//   regions:Array<RegionType>
// }
interface RegionType{
  id:number
  name:string 
  selected:boolean
}

function Region() {
  const [regions, setRegions] = useState<Array<RegionType>>([
    { id: 0, name: '제주', selected: false },
    { id: 1, name: '강원', selected: false },
    { id: 2, name: '부산', selected: false },
    { id: 3, name: '경기', selected: false },
    { id: 4, name: '인천', selected: false },
    { id: 5, name: '전라', selected: false },
    { id: 6, name: '경상', selected: false },
    { id: 7, name: '충청', selected: false },
    { id: 8, name: '광주', selected: false },
    { id: 9, name: '대전', selected: false },
    { id: 10, name: '대구', selected: false },
    { id: 11, name: '울산', selected: false },
  ]);

  const handleSelectRegion = useCallback(
    (regionId: number) => (event: React.MouseEvent) => {
      const updateRegions = regions.map((region) =>
        region.id === regionId ? { ...region, selected: !region.selected } : region,
      );
      setRegions(updateRegions);
    },
    [regions],
  );


  return (
    <section className="region-selection-modal">
      {regions.map((region: RegionType) => {
        if (region.selected === true) {
          return (
            <span className="region-selection-modal-region-name-selected" key={region.id} onClick={handleSelectRegion(region.id)}>
              {region.name}
            </span>
          );
        }
        return (
          <span className="region-selection-modal-region-name"  key={region.id} onClick={handleSelectRegion(region.id)}>
            {region.name}
          </span>
        );
      })}
    </section>
  );
}

export default Region;