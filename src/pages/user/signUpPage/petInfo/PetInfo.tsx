import React, { ChangeEvent, useState } from 'react';

function PetInfo() {
  const [image,setImage] = useState('');
  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);
  };
  return (
    <>
      <input type="file" accept="image/*" name="file" onChange={handleImage} />
      <img src={image} alt="pet"/>
    </>
  );
}
export default PetInfo;
