import React, { useEffect } from "react";
import { Text, Container, Image } from "../atoms";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { Guide } from "../../store/reducers";
import { useDispatch } from "react-redux";
import { GuidesContainer } from "../organisms";

const Profile = () => {
  const { user } = useSelector((state) => {
    return state?.user;
  });
  const { guides } = useSelector((state) => {
    return state?.userGuides;
  });
  const login = useSelector((state) => state.user.login);
  const dispatch = useDispatch();

  useEffect(() => {
    if (login) {    
      dispatch(Guide.getUserGuides(user?.id));
    }

  }, [login, user, dispatch]);

  const formattedDate = user?.dateOfBirth ? format(new Date(user.dateOfBirth), "dd/MM/yyyy") :  '';

  return (
    <Container.Page className="Profil">
        <Text.Title>Profil</Text.Title>
        <Image.Base $borderRadius="50%" $width="6rem"
          src={
            user?.image?.url
            ? user.image.url
            : "https://www.gravatar.com/avatar/?d=identicon"
          }
          alt="Avatar"
        />
        <Text.Paragraph>{user?.pseudo}</Text.Paragraph>
        <Text.Paragraph>{user?.firstName} {user?.lastName}</Text.Paragraph>
        <Text.Paragraph>{user?.email}</Text.Paragraph>
        <Text.Paragraph>{formattedDate}</Text.Paragraph>
        <Text.Title>Mes guides</Text.Title>
        {guides.length > 0 ? (
          <GuidesContainer
            guides={guides}
            favorites={{}}
            handleToggleFavorite={() => {}}
            isProfilePage={true}
          />
        ) : (
          <Text.Paragraph>Vous n'avez pas encore crée de guides.</Text.Paragraph>
        )}
    </Container.Page>
  );
};

export default Profile;