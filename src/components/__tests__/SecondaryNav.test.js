import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CurrentUserProvider } from '../../contexts/CurrentUserContext';
import SecondaryNav from '../SecondaryNav';

test('renders secondary navbar', () => {
  render(
    <Router>
      <SecondaryNav />
    </Router>
  );

  const logInLink = screen.getByRole('link', { name: 'Tours' });
  expect(logInLink).toBeInTheDocument();
});

test('renders links to liked photos, feed and photo creation pages for a logged in user', async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <SecondaryNav />
      </CurrentUserProvider>
    </Router>
  );

  const PostPhotoLink = await screen.findByRole('link', {
    name: 'Post photo',
  });
  const LikedPhotosLink = await screen.findByRole('link', {
    name: 'Liked photos',
  });
  const FeedLink = await screen.findByRole('link', { name: 'Feed' });
  expect(PostPhotoLink).toBeInTheDocument();
  expect(LikedPhotosLink).toBeInTheDocument();
  expect(FeedLink).toBeInTheDocument();
});

test('renders links to tour creation page for a logged in admin user', async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <SecondaryNav />
      </CurrentUserProvider>
    </Router>
  );

  const AddTourLink = await screen.findByRole('link', { name: 'Add tour' });
  expect(AddTourLink).toBeInTheDocument();
});

test('renders links to home page for a logged in user on small screens', async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <SecondaryNav mobile />
      </CurrentUserProvider>
    </Router>
  );

  const HomeLink = await screen.findByRole('link', { name: 'Home' });
  expect(HomeLink).toBeInTheDocument();
});
