import React, { useEffect, useState } from "react";
import appStyles from "../../App.module.css";
import { Container } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Asset from "../../components/Asset";
import ProfileLink from "./ProfileLink";

const PopularProfiles = ({ mobile }) => {
    const [profileData, setProfileData] = useState({
        // use pageprofile later
        pageProfile: { results: [] },
        popularProfiles: { results: [] },
    });

    const { popularProfiles } = profileData;
    const currentUser = useCurrentUser();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(
                    "/profiles/?ordering=-followers_count"
                );
                setProfileData((prevState) => ({
                    ...prevState,
                    popularProfiles: data,
                }));
            } catch (err) {
                console.log(err);
            }
        };

        handleMount();
    }, [currentUser]);

    return (
        <Container
            className={`${appStyles.Content} ${
                mobile && "d-md-none text-center mb-3"
            }`}
        >
            {popularProfiles.results.length ? (
                <>
                    <p>Popular profiles</p>
                    {mobile ? (
                        <div className="d-flex justify-content-around">
                            {popularProfiles.results.slice(0,4).map((profile) => (
                        <ProfileLink key={profile.id} profile={profile} mobile/>
                    ))}
                        </div>
                    ) : (
                        popularProfiles.results.slice(0,10).map((profile) => (
                            <ProfileLink key={profile.id} profile={profile}/>
                        ))
                    )}
                    
                </>
            ) : (
                <Asset spinner />
            )}
        </Container>
    );
};

export default PopularProfiles;
