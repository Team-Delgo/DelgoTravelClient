/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable array-callback-return */
import React,{useState,useCallback} from 'react'
import './Region.scss'

interface RegionProps{
  region:string
}

function Region({region}:RegionProps) {
  const [regionSelected, setRegionSelected] = useState(false);

  const handleSelectRegion =useCallback(() => {
    setRegionSelected(!regionSelected);
  },[regionSelected]);

  return (
    <div onClick={handleSelectRegion}>
    {
      regionSelected ? <span className="region-selection-modal-region-name-selected">{region}</span>
      : <span className="region-selection-modal-region-name">{region}</span>
    }
    </div>
  )
}

export default Region