import { useNavigate } from "react-router-dom";
import { ReactComponent as List } from "../../assets/List.svg";
import { Button, Container, Text, Image } from "../atoms";
import { ReactComponent as PreviewLogoVvoycoVert } from "../../assets/LogoVertical/LogoVvoycoVert.svg";
import { ReactComponent as IconVvoycoVert } from "../../assets/Icône voyco/Icône voyco - vert.svg";
import { ReactComponent as Gift } from "../../assets/Gift.svg";
import { ReactComponent as Path } from "../../assets/Path.svg";
import { ReactComponent as BookOpenText } from "../../assets/BookOpenText.svg";
import { ReactComponent as Heart } from "../../assets/Heart.svg";
import { ReactComponent as CaretRight } from "../../assets/CaretRight.svg";
import { ReactComponent as Line } from "../../assets/Line 1.svg";
import { useState, useEffect } from "react";
import { DOM } from "../nanites";

export default function NavLogoContainer({ isLogin, user }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleProfileClick = (e) => {
        e.stopPropagation();
        if (user.id !== user.id) {
            handleNavigation(`/users/${user.id}`);
        } else {
            handleNavigation("/profil");
        }
    };

    useEffect(() => {
        const closeMenu = (e) => {
            if (!e.target.closest('#menu-burger-open') && !e.target.closest('#menuBurgerContainer')) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('click', closeMenu);
        }

        return () => {
            document.removeEventListener('click', closeMenu);
        };
    }, [isMenuOpen]);

    const handleOpen = (e) => {
        e.stopPropagation();
        setIsMenuOpen(!isMenuOpen);
    };

    // Nouvelle fonction qui combine navigation et fermeture du menu
    const handleNavigation = (path) => {
        navigate(path);
        setIsMenuOpen(false);
    };

    return (
        <Container.RowContainer id="navLogoContainerMain">
            <Container.RowContainer
                onClick={() => navigate("/accueil")}
                id="navLogoContainer"
                cursor="pointer"
                position="absolute"
                left="40px"
                width="116px"
                height="38px"
            >
                <PreviewLogoVvoycoVert display="flex" id="FullLogo" />
                <IconVvoycoVert display="none" id="IconLogo" />
            </Container.RowContainer>

            <Container.RowContainer
                id="menuBurgerContainer"
                display="none"
                onClick={handleOpen}
            >
                <List />
            </Container.RowContainer>
            <Container.ColumnContainer
                id="menu-burger-open"
                display={isMenuOpen ? "flex" : "none"}
                backDropFilter="blur(10px)"
            >
                <Container.ColumnContainer id="burger-mobile" display="none" gap="16px" >
                    {isLogin ?
                        <Container.RowContainer display="flex" justifyContent="space-between" gap="auto" padding="6px" borderRadius="6px" backgroundColor="#F6F6F6" width="100%" >
                            <DOM.StyledContainer overflow="hidden" borderRadius="50%" width="40px" height="40px" backgroundColor="blue" cursor="pointer" onClick={handleProfileClick} >
                                <Image.Base width="100%"
                                    src={
                                        user?.profileImage
                                            ? user.image
                                            : "/profil.png"
                                    }
                                    alt="Photo de profil"
                                />
                            </DOM.StyledContainer>
                            <Text.Span
                                fontSize="0.75rem"
                                fontWeight="500"
                                cursor="pointer"
                                onClick={handleProfileClick}
                            >
                                {user?.firstName} {user?.lastName}

                            </Text.Span>
                            <CaretRight />
                        </Container.RowContainer>
                        :
                        <Button.MainButton
                            onClick={() => handleNavigation("/login")}
                            backgroundColor="#F0EFEB"
                            hoverBackgroundColor="#DAD7CE"
                            color="#3E5544"
                            width="100%"
                        >
                            Se connecter</Button.MainButton>
                    }
                    <Line />
                </Container.ColumnContainer>

                <Container.NavLinkContainer
                    hoverBackgroundColor="#F3F6F4"
                    gap="10px"
                    onClick={() => handleNavigation("/offresSpeciales")}
                >
                    <Gift />
                    <Text.NavSpanLink>Offres spéciales</Text.NavSpanLink>
                </Container.NavLinkContainer>
                <Container.NavLinkContainer
                    hoverBackgroundColor="#F3F6F4"
                    gap="10px"
                    onClick={() => handleNavigation("/planMyTravel")}
                >
                    <Path />
                    <Text.NavSpanLink>Planifier mon voyage</Text.NavSpanLink>
                </Container.NavLinkContainer>
                <Container.NavLinkContainer
                    hoverBackgroundColor="#F3F6F4"
                    gap="10px"
                    onClick={() => handleNavigation("/myGuides")}
                >
                    <BookOpenText />
                    <Text.NavSpanLink>Mes guides</Text.NavSpanLink>
                </Container.NavLinkContainer>
                <Container.NavLinkContainer id="burger-full" hoverBackgroundColor="#F3F6F4" gap="10px" onClick={() => handleNavigation("/favorites")} >
                    <Heart />
                    <Text.NavSpanLink >Mes favoris</Text.NavSpanLink>
                </Container.NavLinkContainer>
            </Container.ColumnContainer>
        </Container.RowContainer>
    );
}