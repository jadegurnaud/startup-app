import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Cropper from "react-easy-crop";
import { DOM } from "../nanites";
import { Button, Container, Text } from "../atoms";
import { ReactComponent as IconImage } from "../../assets/Image.svg";
import { ReactComponent as IconImageGray } from "../../assets/ImageGray.svg";


const GuideCoverImageUpload = ({ onImageChange, initialImage, guideTitle }) => {
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
    <>
      {/* Afficher le recadrage si nécessaire */}
      {image && isCropping ? (
          
        <DOM.StyledContainer position="relative"
        width="100%"
        height="200px"
        >
          <Button.MainButton
           backgroundColor="#3E5544"
           hoverBackgroundColor="#56735D"
           color="white"
            onClick={generateCroppedImage}
            style={{
              position: "absolute",
              bottom: "20px",
              right: "20px",
              zIndex: 1,
            }}
          >
            Valider
          </Button.MainButton>
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={3 / 1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </DOM.StyledContainer>
      ) : (
        <Container.ColumnContainer position="relative"
        width="100%"
        height="200px"
        padding="20px 40px"
        gap="20px"
        justifyContent="flex-end"
        alignItems="flex-start"
        style={{
            background:  imageToDisplay ? `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), url(${imageToDisplay}) lightgray 50% / cover no-repeat` : 'none',
            backgroundColor:"#E7E7E7",
    
          }}>
         
          <input {...getInputProps()} id="file-input" style={{ display: "none" }} />
    
            <Text.SubTitle color= {imageToDisplay ? "#fff" : "#B0B0B0"}>
                {guideTitle}
            </Text.SubTitle>
    
          {/* Afficher l'image si elle existe */}
          {imageToDisplay && !isCropping ? (
             <Button.Base
              padding="10px"
                color="#fff"
                gap="10px"
              onClick={() => document.getElementById("file-input").click()}
            > <IconImage />
               Changer l'image de couverture
            </Button.Base>
             
              
          ) : (
            
              <Button.Base
              padding="10px"
              color="#B0B0B0"
              gap="10px"
                onClick={() => document.getElementById("file-input").click()}
              > <IconImageGray />
                Ajouter une image de couverture
              </Button.Base>
          )}
    
    </Container.ColumnContainer>
      )}
      </>
  );
};


export default GuideCoverImageUpload;
