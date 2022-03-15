import React from 'react'
import './Footer.scss';

function Footer() {
  return (
    <div className='footer'>
        <img className='homeIcon' src={`${process.env.PUBLIC_URL}/assets/images/home.png`}  alt="" />
        <img className='glassesIcon' src={`${process.env.PUBLIC_URL}/assets/images/glasses.png`}  alt="" />
        <img className='bagIcon' src={`${process.env.PUBLIC_URL}/assets/images/bag.png`}  alt="" />
        <img className='personIcon' src={`${process.env.PUBLIC_URL}/assets/images/person.png`}  alt="" />
    </div>
  )
}

export default Footer