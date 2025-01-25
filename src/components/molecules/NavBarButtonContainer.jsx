import { Button, Container, Image } from "../atoms";
import { DOM } from "../nanites";
import { ReactComponent as Plus } from "../../assets/Plus.svg";
import { ReactComponent as Notif } from "../../assets/notif.svg";
import { useNavigate } from "react-router-dom";


export default function NavLinkContainer({ isLogin, user }) {
    const navigate = useNavigate();
    return (

        <Container.RowContainer
            gap={isLogin ? "10px" : "18px"}
            position="absolute"
            right="40px"
        >
            <Button.MainButton
                onClick={() => navigate("/newGuideHome")}
                backgroundColor="#3E5544"
                color="white">
                <Plus /> Crée un guide
            </Button.MainButton>
            {isLogin ?
                <Container.RowContainer
                    gap="18px">
                    <DOM.StyledContainer cursor="pointer" >
                        <Notif />
                    </DOM.StyledContainer>
                    <DOM.StyledContainer overflow="hidden" borderRadius="50%" width="40px" height="40px" backgroundColor="blue" cursor="pointer" onClick={() => navigate("/profil")} >
                        <Image.Base width="100%"
                            src={
                                user?.profileImage
                                    ? user.image
                                    : "/profil.png"
                            }
                            alt="Photo de profil"
                        />
                    </DOM.StyledContainer>
                </Container.RowContainer>
                :
                <Button.MainButton
                    onClick={() => navigate("/login")}
                    backgroundColor="#F0EFEB"
                    color="#3E5544">
                    Se connecter</Button.MainButton>
            }
        </Container.RowContainer >
    );
}
