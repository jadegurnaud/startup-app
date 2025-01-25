import { Container } from "../atoms";
import { Button } from "../atoms";
import { ReactComponent as Plus } from "../../assets/Plus.svg";
import { useNavigate } from "react-router-dom";


export default function NavLinkContainer() {
    const navigate = useNavigate();
    return (
        <Container.RowContainer
            gap="10px"
            position="absolute"
            right="40px"
        >
            <Button.MainButton
                onClick={() => navigate("/create-guide")}
                backgroundColor="#3E5544"
                color="white">
                <Plus /> Crée un guide
            </Button.MainButton>
            <Button.MainButton
                onClick={() => navigate("/login")}
                backgroundColor="#F0EFEB"
                color="#3E5544">
                Se connecter</Button.MainButton>
        </Container.RowContainer >
    );
}