import { Container, Text } from "../atoms";

export default function HomeCategorieFilter({categories, onCategorySelect}) {
    return (
        <Container.RowContainer display="flex" padding="12px 20px" width="100%" gap="20px" >
            { categories && categories.map((categorie) => 
                <Text.HomeCategorieTexte key={categorie.id} onClick={() => onCategorySelect(categorie.id)}>{categorie.name}</Text.HomeCategorieTexte>)
            }

       
        </Container.RowContainer>
    );
}