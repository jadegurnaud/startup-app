import React, { useState } from "react";
import { Text, Container, Input, Button, Image } from "../atoms";
import { DOM } from "../nanites";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Guide } from "../../store/reducers";


const NewGuide = () => {
    
    const [title, setTitle] = useState("");
    const [description, setDescritption] = useState("");
    const [images, setImages] = useState([]);
    const [coverImage, setCoverImage] = useState(null);
    const { error } = useSelector((state) => state.guide);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUploadImages = (e) => {
        if (e.target.files) {
            setImages((prevImages) => [...prevImages, ...Array.from(e.target.files)]);
        }
    };

    const handleUploadImage = (e) => {
        if (e.target.files) {
            setCoverImage(e.target.files[0]);
        }
    };

    const handleCreateGuide = () => {

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("coverImage", coverImage);
        images.forEach((image) => {
            formData.append("images", image);
        });
        formData.append("user", user.id);
        
        dispatch(Guide.createGuide(formData)).then((result) => {
            if (Guide.createGuide.fulfilled.match(result)) {
                navigate("/accueil");
            }
        });
    }

    return (
        <Container.Page className="Profil">
            <Text.Title>Créer un guide</Text.Title>
            <Button.Base onClick={() => handleCreateGuide()} style={{ position: "absolute", top: 10, right: 10 }}><Text.Paragraph>Publier</Text.Paragraph></Button.Base>
            <DOM.StyledContainer style={{ display:"flex", flexDirection:"column"}}>
            <Text.Paragraph>Choisissez une image de couverture pour votre guide</Text.Paragraph>
            <Input.Base border= "none" type="file" onChange={handleUploadImage} />
                {coverImage && (
                    <Image.Base
                        width= '100px'
                        height= '100px' objectFit= 'cover'
                        src={URL.createObjectURL(coverImage)}
                        alt="Cover"
                    />
                )}
                <Input.Base fontSize="2rem" border="none" type="text" placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} />
                {Array.isArray(error) && error.filter(err => err.startsWith('title')).map((err, index) => (
                    <Text.Error key={index}>{err.split(': ')[1]}</Text.Error>
                ))}
                <Input.Base border="none" type="text" placeholder="Description" value={description} onChange={(e) => setDescritption(e.target.value)} />
               {Array.isArray(error) && error.filter(err => err.startsWith('description')).map((err, index) => (
                    <Text.Error key={index}>{err.split(': ')[1]}</Text.Error>
                ))}
                
                <Input.Base border="none" type="file" multiple onChange={handleUploadImages} />
                {images.length > 0 && (
                    <DOM.StyledContainer style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                        {images.map((image, index) => (
                            <Image.Base 
                                width= '100px'
                                height= '100px' objectFit= 'cover'
                                key={index} 
                                src={URL.createObjectURL(image)} 
                                alt={`Preview ${index}`}  
                            />
                        ))}
                    </DOM.StyledContainer>
                )}
            </DOM.StyledContainer>
        </Container.Page>
    )
}

export default NewGuide;