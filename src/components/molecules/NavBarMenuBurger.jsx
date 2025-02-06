import { Container } from "../atoms";
import { ReactComponent as List } from "../../assets/List.svg";


export default function NavMenuBurgerContainer() {
    return (
        <Container.RowContainer id="menuBurgerContainer" display="none">
            <List />
        </Container.RowContainer>
    );
}