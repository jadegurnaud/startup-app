import { useNavigate } from "react-router-dom";
import { Container } from "../atoms";

export default function NavLinkContainer() {
    const navigate = useNavigate();

    return (
        <Container.RowContainer
            //changement de page :
            onClick={() => navigate("/accueil")}
            //style :
            cursor="pointer"
            position="absolute"
            left="40px"
            backgroundColor="red"
            width="116px"
            height="38px" />
    );
}