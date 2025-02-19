import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Cropper from "react-easy-crop";
import { DOM } from "../nanites";
import { Button } from "../atoms";
import { ReactComponent as IconImage } from "../../assets/Image.svg";


const ImageUpload = ({ onImageChange, initialImage }) => {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [finalImage, setFinalImage] = useState(null);
  const [isCropping, setIsCropping] = useState(false);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
      setFinalImage(null);
      setIsCropping(true);
    }
  };

  const { getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp']
    },
    onDrop,
  });

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const generateCroppedImage = async () => {
    const canvas = document.createElement("canvas");
    const imageElement = new Image();
    imageElement.src = image;

    await new Promise((resolve) => (imageElement.onload = resolve));
    const ctx = canvas.getContext("2d");

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    ctx.drawImage(
      imageElement,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    const croppedImage = canvas.toDataURL("image/jpeg");
    setFinalImage(croppedImage);
    onImageChange(croppedImage);
    setIsCropping(false);
  };

  const imageToDisplay = finalImage || initialImage;

  return (
    <div>
     
      <input {...getInputProps()} id="file-input" style={{ display: "none" }} />

      {/* Afficher l'image si elle existe */}
      {imageToDisplay && !isCropping && (
        <DOM.StyledContainer width="100%"
        height="300px"
        padding="20px 40px"
        gap="20px" position="relative" style={{
          background:  imageToDisplay ? `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), url(${imageToDisplay}) lightgray 50% / cover no-repeat` : 'none',
          backgroundColor:"#E7E7E7",
  
        }}>
          <Button.Base
          padding="10px"
          color="#fff"
          gap="10px"
          style={{
            
            cursor: "pointer",
            position: "absolute",
            bottom: "20px",
            right: "20px",
            zIndex: 1,
          }}
          onClick={() => document.getElementById("file-input").click()}
        >
           Changer la photo de couverture
           <IconImage />
        </Button.Base>
         
               
        </DOM.StyledContainer>
      )}

      {/* Afficher le recadrage si nécessaire */}
      {image && isCropping && (
          
          <div style={{ position: "relative", width: "100%", height: "300px" }}>
          <button
            onClick={generateCroppedImage}
            style={{
              padding: "12px",
              backgroundColor: "#28A745",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              position: "absolute",
              bottom: "20px",
              right: "20px",
              zIndex: 1,
            }}
          >
            Valider
          </button>
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={3 / 1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
      )}
    </div>
  );
};


export default ImageUpload;
