import { Text, Container } from "../atoms";
import { MyFav } from "../templates"

const Favorites = () => {
    return (
        <Container.Page>
            <Text.Title style={{ marginBottom: "60px" }}>Favoris</Text.Title>
            <MyFav />
        </Container.Page>

    );
};

export default Favorites;