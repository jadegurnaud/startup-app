import { useEffect } from "react";
import { Container } from "../atoms";
import { HeaderMyGuides, MesBrouillonsMyGuides, MesGuidesPubliesMyGuides } from "../molecules";
import { useSelector, useDispatch } from "react-redux";
import { Guide } from "../../store/reducers";

const MyGuides = () => {
    const { guidesPublies, guidesBrouillons } = useSelector((state) => state?.myGuides);
    const { user } = useSelector((state) => state?.user);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(Guide.getGuidesPublies(user?.id));
        dispatch(Guide.getMyGuidesBrouillons(user?.id));
    }, [dispatch]);

    return (
        <Container.Page>
            <HeaderMyGuides />
            {guidesBrouillons.length > 0 && 
                <MesBrouillonsMyGuides guides={guidesBrouillons}/>
            }
            {guidesPublies.length > 0 &&
                <MesGuidesPubliesMyGuides guides={guidesPublies}/>
            }
        </Container.Page>

    );
};

export default MyGuides;