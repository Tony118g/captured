import { Route, Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import './api/axiosDefaults';
import styles from './App.module.css';
import NavBar from './components/NavBar';
import SignUpForm from './pages/auth/SignUpForm';
import LogInForm from './pages/auth/LogInForm';
import PhotoCreateForm from './pages/photos/PhotoCreateForm';
import PhotoPage from './pages/photos/PhotoPage';
import PhotosPage from './pages/photos/PhotosPage';
import { useCurrentUser } from './contexts/CurrentUserContext';
import PhotoEditForm from './pages/photos/PhotoEditForm';
import ProfilePage from './pages/profiles/ProfilePage';
import ProfileEditForm from './pages/profiles/ProfileEditForm';
import UsernameEditForm from './pages/profiles/UsernameEditForm';
import PasswordEditForm from './pages/profiles/PasswordEditForm';
import TourCreateForm from './pages/tours/TourCreateForm';
import ToursPage from './pages/tours/ToursPage';
import TourEditForm from './pages/tours/TourEditForm';
import About from './pages/about/About';

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || '';

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
            path="/feed"
            render={() => (
              <PhotosPage
                message="No results found. Adjust the search keyword or follow a user."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
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
          <Route exact path="/about" render={() => <About />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/login" render={() => <LogInForm />} />
          <Route
            exact
            path="/photos/create"
            render={() => <PhotoCreateForm />}
          />
          <Route exact path="/photos/:id" render={() => <PhotoPage />} />
          <Route
            exact
            path="/photos/:id/edit"
            render={() => <PhotoEditForm />}
          />
          <Route exact path="/tours/create" render={() => <TourCreateForm />} />
          <Route
            exact
            path="/tours"
            render={() => (
              <ToursPage message="No results found for your search : /" />
            )}
          />
          <Route exact path="/tours/:id/edit" render={() => <TourEditForm />} />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route
            exact
            path="/profiles/:id/edit/password"
            render={() => <PasswordEditForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit/username"
            render={() => <UsernameEditForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm />}
          />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
