import { Button, Container, Image } from "../atoms";
import { DOM } from "../nanites";
import { ReactComponent as Plus } from "../../assets/Plus.svg";
import { ReactComponent as Notif } from "../../assets/notif.svg";
import { useNavigate } from "react-router-dom";


export default function NavBarButtonContainer({ isLogin, user }) {
    const navigate = useNavigate();
    return (

        <Container.RowContainer
            id="NavBarButtonContainer"
            gap={isLogin ? "28px" : "10px"}
            position="absolute"
            right="40px"
        >
            <Button.MainButton
                onClick={() => navigate("/myGuides")}
                backgroundColor="#3E5544"
                hoverBackgroundColor="#56735D"
                color="white">
                <Plus /> Créer un guide
            </Button.MainButton>
            {isLogin ?
                <Container.RowContainer
                    gap="28px">
                    <DOM.StyledContainer cursor="pointer" >
                        <Notif />
                    </DOM.StyledContainer>
                    <DOM.StyledContainer overflow="hidden" borderRadius="50%" width="40px" height="40px" cursor="pointer" onClick={() => navigate("/profil")} >
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
                    hoverBackgroundColor="#DAD7CE"
                    color="#3E5544">
                    Se connecter</Button.MainButton>
            }
        </Container.RowContainer >
    );
}
