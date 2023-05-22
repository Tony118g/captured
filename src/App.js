import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import LogInForm from "./pages/auth/LogInForm";
import PhotoCreateForm from "./pages/photos/PhotoCreateForm";
import PhotoPage from "./pages/photos/PhotoPage";
import PhotosPage from "./pages/photos/PhotosPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import PhotoEditForm from "./pages/photos/PhotoEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";

function App() {
    const currentUser = useCurrentUser();
    const profile_id = currentUser?.profile_id || "";

    return (
        <div className={styles.App}>
            <NavBar />
            <Container className={styles.Main}>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <PhotosPage message="No results found for your search : /" />
                        )}
                    />
                    <Route
                        exact
                        path="/liked"
                        render={() => (
                            <PhotosPage
                                message="No results found. Adjust your search or like a post."
                                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/about"
                        render={() => <h1>About page</h1>}
                    />
                    <Route exact path="/signup" render={() => <SignUpForm />} />
                    <Route exact path="/login" render={() => <LogInForm />} />
                    <Route
                        exact
                        path="/photos/create"
                        render={() => <PhotoCreateForm />}
                    />
                    <Route
                        exact
                        path="/photos/:id"
                        render={() => <PhotoPage />}
                    />
                    <Route
                        exact
                        path="/photos/:id/edit"
                        render={() => <PhotoEditForm />}
                    />
                    <Route
                        exact
                        path="/profiles/:id"
                        render={() => <ProfilePage />}
                    />
                    <Route render={() => <p>Page not found!</p>} />
                </Switch>
            </Container>
        </div>
    );
}

export default App;
