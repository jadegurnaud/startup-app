import { Text, Container } from "../atoms";
import { DOM } from "../nanites";
import { MyFav } from "../templates"

const OffresSpeciales = () => {
    return (
        <Container.Page>
            <Text.Title style={{ margin:"40px" }}>Offres Speciales</Text.Title>
            <DOM.StyledContainer margin="40px">
                <Text.Paragraph>Prochainement...</Text.Paragraph>
            </DOM.StyledContainer>
        </Container.Page>

    );
};

export default OffresSpeciales;