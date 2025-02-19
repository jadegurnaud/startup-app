import { Text, Container } from "../atoms";
import { MyFav } from "../templates"

const Favorites = () => {
    return (
        <Container.Page>
            <Text.Title style={{ margin: "40px" }}>Favoris</Text.Title>
            <MyFav />
        </Container.Page>

    );
};

export default Favorites;