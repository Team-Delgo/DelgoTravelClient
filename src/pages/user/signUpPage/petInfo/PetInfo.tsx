import React, { ChangeEvent, useState } from 'react';

function PetInfo() {
  const [image,setImage] = useState<any>();
  const [file, setFile] = useState<any>();
  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = function () {
      setFile(event.target.files![0]);
      setImage(reader.result);
    }
    reader.readAsDataURL(event.target.files![0]);
    
  };
  return (
    <div>
      <input type="file" accept="image/*" name="image" id="image"  onChange={handleImage} />
      <img src={image} alt='preview'/>
    </div>
  );
}
export default PetInfo;
