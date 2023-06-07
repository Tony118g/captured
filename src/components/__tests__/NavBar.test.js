import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";
import NavBar from "../NavBar";

test("renders NavBar", () => {
    render(
        <Router>
            <NavBar />
        </Router>
    );

    const logInLink = screen.getByRole("link", { name: "Login" });
    expect(logInLink).toBeInTheDocument();
});

test("renders link to the user profile for a logged in user", async () => {
    render(
        <Router>
            <CurrentUserProvider>
                <NavBar />
            </CurrentUserProvider>
        </Router>
    );

    const profileAvatar = await screen.findByText("admin");
    expect(profileAvatar).toBeInTheDocument();
    const logoutLink = screen.getByRole("link", { name: "Log out" });
    expect(logoutLink).toBeInTheDocument();
});

test('renders Sign in and Sign up buttons again on log out', async () => {
    render(
      <Router>
        <CurrentUserProvider>
          <NavBar />
        </CurrentUserProvider>
      </Router>,
    );

    const logoutLink = await screen.findByRole('link', { name: 'Log out' });
    fireEvent.click(logoutLink);
  
    const loginLink = await screen.findByRole('link', { name: 'Login' });
    const signUpLink = await screen.findByRole('link', { name: 'Signup' });
  
    expect(loginLink).toBeInTheDocument();
    expect(signUpLink).toBeInTheDocument();
  });
