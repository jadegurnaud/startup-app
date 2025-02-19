import React, { useState } from "react";
import { DOM } from "../nanites";
import { Text, Button, Container, Input } from "../atoms";
import { GuideCoverImageUpload, TagMultiSelect } from "../molecules";
import { useDispatch } from "react-redux";
import { setGuideData } from "../../store/slices/newGuideSlice";

const NewGuidePageCouverture = ({categories, guide}) => {
    const dispatch = useDispatch();
      const [coverImage, setCoverImage] = useState(guide?.coverImage || "");
      const [formData, setFormData] = useState({
        price: guide?.price || "",
        description: guide?.description || "",
        practicalInfo: guide?.practicalInfo || "",
        categories: guide?.categories || [],
    });
    
 
    const handleCoverImageChange = (newImage) => {
        setCoverImage(newImage);
        dispatch(setGuideData({ coverImage: newImage }));

      };

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        let updatedValue = value;

        // Pour le prix, on s'assure que c'est un nombre
        if (name === 'price') {
            updatedValue = value.replace(/[^0-9]/g, '');
            if (updatedValue) {
                updatedValue = parseFloat(updatedValue);
            } else {
                updatedValue = null;
            }
        }

        setFormData(prev => ({
            ...prev,
            [name]: updatedValue
        }));

        // Mise à jour du store Redux
        dispatch(setGuideData({ [name]: updatedValue }));
    };


    const handleCategoriesChange = (selectedCategories) => {
        const categoryIds = selectedCategories.map(category => category.id);
        setFormData(prev => ({
            ...prev,
            categories: categoryIds
        }));
        
        dispatch(setGuideData({ categories: categoryIds }));
    };

    return (
        <DOM.StyledContainer width= "calc(100% - 270px)">
            <GuideCoverImageUpload onImageChange={handleCoverImageChange} initialImage={coverImage} guideTitle={guide?.title} />
           
            
            <Container.ColumnContainer padding="40px" gap="40px">
                <Container.RowContainer justifyContent="space-between" alignItems="start" gap="8px">
                    <TagMultiSelect  categories={categories}
                    initialTags={formData.categories}
                    onChange={handleCategoriesChange}/>
                    <Container.ColumnContainer gap="8px">
                        <Text.Span>Afficher le budget total du voyage</Text.Span>
                        <Container.RowContainer gap="8px">
                            <Input.InputForm type="text" name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                placeholder="€"/>
                        </Container.RowContainer>
                    </Container.ColumnContainer>
                </Container.RowContainer>

                <Container.ColumnContainer gap="20px">
                <Text.Paragraph>Description</Text.Paragraph>
                <Input.TextArea name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Ecrivez ici..."  />
            </Container.ColumnContainer>
            <Container.ColumnContainer gap="20px">
                <Text.Paragraph>Informations pratiques :</Text.Paragraph>
                <Input.TextArea name="practicalInfo"
                        value={formData.practicalInfo}
                        onChange={handleInputChange}
                        placeholder="Ecrivez ici..."/>
            </Container.ColumnContainer>

            </Container.ColumnContainer>
           
           
        </DOM.StyledContainer>
    );
};

export default NewGuidePageCouverture;