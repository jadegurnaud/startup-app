import { Container, Text } from "../atoms";
import { ReactComponent as Gift } from "../../assets/Gift.svg";
import { ReactComponent as Heart } from "../../assets/Heart.svg";
import { ReactComponent as Path } from "../../assets/Path.svg";
import { ReactComponent as BookOpenText } from "../../assets/BookOpenText.svg";
import { useNavigate } from "react-router-dom";


export default function NavLinkContainer() {
    const navigate = useNavigate();
    return (
        <Container.RowContainer id="mainNavLinkContainer" >
            <Container.NavLinkContainer hoverBackgroundColor="#F3F6F4" onClick={() => navigate("/accueil")}>
                <Text.NavSpanLink >Offres spéciales</Text.NavSpanLink>
                <Gift />
            </Container.NavLinkContainer>
            <Container.NavLinkContainer hoverBackgroundColor="#F3F6F4" onClick={() => navigate("/accueil")}>
                <Text.NavSpanLink >Planifier mon voyage</Text.NavSpanLink>
                <Path />
            </Container.NavLinkContainer>
            <Container.NavLinkContainer hoverBackgroundColor="#F3F6F4" onClick={() => navigate("/accueil")}>
                <Text.NavSpanLink >Mes guides</Text.NavSpanLink>
                <BookOpenText />
            </Container.NavLinkContainer>
            <Container.NavLinkContainer hoverBackgroundColor="#F3F6F4" id="heartSVGText" display="flex" onClick={() => navigate("/favorites")} >
                <Text.NavSpanLink id="mesFavText" >Mes favoris</Text.NavSpanLink>
                <Heart />
            </Container.NavLinkContainer>
        </Container.RowContainer>
    );
}