import { useNavigate } from "react-router-dom";
import { ReactComponent as List } from "../../assets/List.svg";
import { Container } from "../atoms";
import { ReactComponent as PreviewLogoVvoycoVert } from "../../assets/LogoVertical/LogoVvoycoVert.svg";


export default function NavLogoContainer() {
    const navigate = useNavigate();

    return (
        <Container.RowContainer id="navLogoContainerMain" >
            <Container.RowContainer
                //changement de page :
                onClick={() => navigate("/accueil")}
                //style :
                id="navLogoContainer"
                cursor="pointer"
                position="absolute"
                left="40px"
                width="116px"
                height="38px" >
                    <PreviewLogoVvoycoVert/>

            </Container.RowContainer>
            <Container.RowContainer id="menuBurgerContainer" display="none">
                <List />
            </Container.RowContainer>
        </Container.RowContainer>
    );
}
