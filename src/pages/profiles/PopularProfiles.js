import React from "react";
import appStyles from "../../App.module.css";
import { Container } from "react-bootstrap";
import Asset from "../../components/Asset";
import PopularProfileLink from "./PopularProfileLink";
import { useProfileData } from "../../contexts/ProfileDataContext";

const PopularProfiles = ({ mobile }) => {
    const { popularProfiles } = useProfileData();

    return (
        <Container
            className={`${appStyles.Content} ${
                mobile && "d-md-none text-center mb-3"
            }`}
        >
            {popularProfiles.results.length ? (
                <>
                    <h5>Popular profiles</h5>
                    {mobile ? (
                        <div className="d-flex justify-content-around">
                            {popularProfiles.results.slice(0,4).map((profile) => (
                        <PopularProfileLink key={profile.id} profile={profile} mobile/>
                    ))}
                        </div>
                    ) : (
                        popularProfiles.results.slice(0,10).map((profile) => (
                            <PopularProfileLink key={profile.id} profile={profile}/>
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
