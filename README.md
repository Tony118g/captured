# Captured
Captured is a content sharing platform for photographers. Users can showcase their own photographs along with details concerning them and interact with other users via likes, comments and follows. The site is also used as an advertising platform for the site admin to share photographic tour opportunities that users can choose to attend.

This repository is for the frontend section of the project and is associated with the [captured DRF-API](https://github.com/Tony118g/captured-drf-api).

## Contents

* [Project Goals](#project-goals)
* [User Experience](#user-experience)
    * [Epics](#epics)
    * [User Stories](#user-stories)
    * [Site Structure](#site-structure)
* [Technologies Used](#technologies-used)
* [Deployment and Development](#deployment-and-development)
    * [Deploying the Site](#deployment)
    * [Forking the Repository](#forking-the-repository)
    * [Cloning the Repository](#cloning-the-repository)
    * [Connecting the API](#connecting-the-api)

## Project Goals
Captured is designed and intended to be a social, educational and promotive platform for photography enthusiasts to share and interact with content related to photography. The primary goals to achieve this are as follows:

* General aspects:
    * Deliver a simple and intuitive user experience.
    * Provide minimal yet impactful features chosen specifically to deliver a useful application within the given development timeframe, while laying out the possibility for additional features in the future.

* Social aspect:
    * Provide the ability for users to share content related to photography.
    * Provide the ability for users to interact with each other via likes, comments and followers.

* Educational aspect:
    * Add the ability for users to share informational details about their photographs.
    * Provide a way for users to view the informational content pertaining to photographs.
    * Provide functionality for users to be able to add detailed views or ask questions pertaining to photographs via comments.

* Promotive aspect:
    * Deliver a way for the site admin to advertise photographic tours.
    * Provide the ability for users to view available tours on the site.
    * Provide functionality for users to be able to specify whether they intend to attend an advertised tour.

## User Experience

### Epics
During the planning process, I created 9 epics which were then broken down further into a total of 39 user stories. These can be found in the [project kanban board](https://github.com/users/Tony118g/projects/10) or they can be viewed individually via the links below.

1. [Authentication](https://github.com/Tony118g/captured/issues/1)
2. [Navigation](https://github.com/Tony118g/captured/issues/2)
3. [Profile Management](https://github.com/Tony118g/captured/issues/3)
4. [Profile Interaction](https://github.com/Tony118g/captured/issues/4)
5. [Photo Post Management](https://github.com/Tony118g/captured/issues/5)
6. [Photo Post Interaction](https://github.com/Tony118g/captured/issues/6)
7. [Tour Post Management](https://github.com/Tony118g/captured/issues/7)
8. [Tour Post Interaction](https://github.com/Tony118g/captured/issues/8)
9. [General Site Interaction](https://github.com/Tony118g/captured/issues/9)

### User Stories
The project epics were further broken down into user stories. These stories were created using MoSCoW (must have, should have, could have, and won't have) prioritization with each story being assigned a label in accordance with its level of priority.

Story points were also assigned to each story using labels. These points were assigned using my best estimation of the time and difficulty of completing each user story based on my experience and ability.

Each user story has it's own acceptance criteria and tasks associated with it. This helped ensure all requirements for each story were known as they were developed and helped keep track of development progress.

All user stories for this project can be found in the [project kanban board](https://github.com/users/Tony118g/projects/10)

Below is a summary of the user stories for this version of the project's release listed by epic.

* Epic - authentication
    * As a user I can register an account so that I can access all features of the site.
    * As a user I can login and logout of my account so that I can use the site and keep my account secure.
    * As a user I can easily find out my logged in/out status so that I can decide what to do next.
    * As a site owner I want to refresh access tokens so that users do not have to repeatedly login during a single session.

* Epic - navigation
    * As a user I can access the navigation bar on all pages so that I can easily navigate through the site.
    * As a user I can infinitely scroll through site content so that I do not have to refresh the page or navigate to a new page to view more content.

* Epic - profile management
    * As a user I can edit my profile details so that I can keep my profile information up to date.
    * As a user I can change my password so that I can keep my account secure.
    * As a user I can add an avatar to my profile so that my profile can be more personalized.
    * As a user I can delete my profile so that I can control whether or not I am a member of the site.

* Epic - profile interaction
    * As a user I can view user profiles so that I can find out more information about the relevant user.
    * As a user I can view statistical information about profiles so that I can easily find out more information about their site presence.
    * As a user I can view a list of the most popular profiles so that I can see which profiles have the most intriguing content.
    * As a user I can follow and unfollow other users so that I can control which user's posted photos I see in my feed.
    * As a user I can see all photos posted by a certain profile in one place so that I can easily view all photos relevant to them.
    * As a user I can search for specific profiles so that I can easily find a profile I am looking for.
    * As a user I can view all of a certain user's followers so that I find out who follows them.
    * As a user I can view all profiles that a certain user follows so that I can find out who they follow.

* Epic - photo post management
    * As a user I can post a photo with details so that I can share my photographs on the site.
    * As a user I can edit a photo that I have posted so that I can ensure the content is correct and up to date.
    * As a user I can delete a photo that I have posted so that I can remove content that I no longer want to share on the site.

* Epic - photo post interaction
    * As a user I can view all photos that have been posted on the site so that I can browse through various, non-specific content.
    * As a user I can view photos posted by users that I follow so that I can view content specific to my taste and follow their activity.
    * As a user I can like and unlike other user's posted photos so that I can easily show/remove appreciative feedback.
    * As a user I can search for specific photos that have been posted so that I can easily find content I am looking for.
    * As a user I can comment on a posted photo so that I can provide my feedback.
    * As a user I can edit my own comments so that I can ensure the correct content is being shared.
    * As a user I can delete my own comment so that I can remove it from the site if I no longer want to share it.
    * As a user I can view all comments with their details so that I can see details of who has commented and what they have said.

* Epic - tour post management
    * As a site admin I can create and post a tour with details so that I can advertise photographic tours on the site.
    * As a site admin I can edit a tour so that I can ensure the content is correct and up to date.
    * As a site admin I can delete a tour so that I can remove content that I no longer want to share on the site.

* Epic - tour post interaction
    * As a user I can view all tours that have been posted on the site so that I can browse through tours that might interest me.
    * As a user I can search for specific tours that have been posted so that I can easily find tours that I am looking for.
    * As a user I can indicate that I am going to attend a tour so that I can let others know that I am attending.
    * As a user I can view all users that are attending a tour so that I can find out who is going on the tour.

* Epic - general site interaction
    * As a site owner I want to restrict certain features to registered users so that it encourages people to register to the site and ensures correct functionality.
    * As a site owner I want to restrict certain features to the site admin so that I can ensure unauthorized users cannot tamper with features that are not relevant to them.
    * As a user I can see various feedback messages so that I know the status of the action I am trying to perform.

### Site Structure
I created basic wireframes of how I wanted the structure and layout of the site to look using [Balsamiq](https://balsamiq.com/). The majority of the pages on the site adopt the same layout for simplicity and uniformity. I did not create wireframes for every single feature such as the profile edit form and the deletion confirmation modal as their layouts were adopted from wireframes for other similar features and I deemed it unnecessary to create almost duplicate wireframes.

This helped majorly when developing the site as it enabled me to create each page faster and with purpose since I had created these wireframes as a guide.

A few differences can be seen between the final result and the wireframes but overall most of the conceptual layout and design is the same. Any changes were a result of decisions made to improve user experience. The most noticeable change is the presence of the navigation bar at the bottom of mobile screens. This was done in order to improve accessibility to all site features by having navigation options readily available at the bottom of the screen.

#### Wireframes

##### Sign Up Wireframes
![sign up wireframes](documentation/readme-images/sign-up-wireframe.png)

##### Log In Wireframes
![login in wireframes](documentation/readme-images/log-in-wireframe.png)

##### About Us Wireframes
![login in wireframes](documentation/readme-images/about-us-wireframe.png)

##### Photos Page Wireframes
![logged out photos page wireframes](documentation/readme-images/logged-out-photos-wireframe.png)

More nav options are present for logged in users.
![logged in photos page wireframes](documentation/readme-images/logged-in-photos-wireframe.png)

##### Tours Page Wireframes
![tours page wireframes](documentation/readme-images/tours-page-wireframe.png)

##### Profile Page Wireframes
![profile page wireframes](documentation/readme-images/profile-page-wireframe.png)

##### Photo Creation Form Wireframes
![photo creation form wireframes](documentation/readme-images/photo-creation-form-wireframe.png)

##### Tour Creation Form Wireframes
![tour creation form wireframes](documentation/readme-images/tour-creation-form-wireframe.png)

## Technologies Used

### Languages
* [HTML5](https://html.spec.whatwg.org/)
    * Used to create structure and content for the site.
* [CSS](https://www.w3.org/Style/CSS/Overview.en.html)
    * Used to add custom styles to the HTML.
* [JavaScript](https://www.javascript.com/)
    * Used to enhance functionality and interactivity.

### Frameworks, Libraries and Dependencies
* [Axios](https://axios-http.com/docs/intro)
    * Used to make HTTP requests to the REST API.
* [JWT](https://jwt.io/)
    * Used to decode JSON Web tokens.
* [Popper](https://popper.js.org/)
    * used to ensure the edit/delete dropdown menus position remains fixed on all browsers.
* [React JS](https://legacy.reactjs.org/docs/getting-started.html)
    * Used for building the user interface.
* [React Bootstrap 4.6](https://react-bootstrap-v4.netlify.app/)
    * Used to add styling and interactive functionality to components.
* [React Infinite Scroll](https://www.npmjs.com/package/react-infinite-scroll-component)
    * used to load content automatically as the user scrolls without having to navigate to another page.
* [React-router-dom](https://www.npmjs.com/package/react-router-dom)
    * Used for 'client side routing' to be implemented in the site.

### Tools and Programmes

* [Gitpod](https://www.gitpod.io/#get-started)
    * Used to create code/content and file structure for the respository.
* [GitHub](https://github.com/)
    * Used to store the repository.
* [Balsamiq](https://balsamiq.com/wireframes/)
    * Used to create the wireframes during the planning stage of the project.
* [Cloudinary](https://cloudinary.com/)
    * Used to store the project's static files and media.
* [Coolers](https://coolors.co/?home )
    * Used to create the color scheme. 
* [Favicon Generator](https://www.favicongenerator.com/)
    * Used to create the favicon for the site.
* [Font Awesome](https://fontawesome.com/)
    * Used to add icons to the site.
* [Google Fonts](https://fonts.google.com/)
    * Used to add custom fonts to the site. 

## Deployment and Development
* The project was developed using [Gitpod](https://www.gitpod.io/#get-started) to create the code and overall file structure.
* The repository for this section of the project is hosted on [GitHub](https://github.com/).

### Deployment
The project was deployed using [Heroku](https://id.heroku.com/login).

NB - to ensure a successful deployment of the project in Heroku, you need to ensure that you create a Procfile and a requirements.txt file.

Once you are certain that everything is ready to deploy the repo, you can do so through the following steps.

1. Log in to Heroku or create an account if necessary.
2. Click on the button labeled "New" from the dashboard in the top right corner and select the "Create new app" option in the drop-down menu.
3. Enter a unique name for the application and select the region you are in.
    * For this project, the unique name is "captured" and the region selected is Europe.
4. Click on "create app".
5. Navigate to the settings tab and click "Reveal config vars".
6. Add the config vars necessary for the project.
7. Navigate to the "Deploy" section by clicking the "Deploy" tab in the navbar.
8. Select "GitHub" as the deployment method and click "Connect to GitHub".
9. Search for the GitHub repository that you wish to deploy.
10. Click on "connect" to link the repository to Heroku.
11. Scroll down and click on "Deploy Branch" to manually deploy.
12. Once the app has deployed successfully, Heroku will notify you and provide a button to view the app.

NB - If you wish to rebuild the deployed app automatically every time you push to GitHub, you may click on "Enable Automatic Deploys" in Heroku.

### Forking the Repository
To create a copy of the repository for viewing and editing without affecting the original repository you can fork the repository through the following steps:

1. In the "captured" repository, click on the "fork" tab in the top right corner.
2. Click on "create fork" to fork the repository in your own GitHub account.

### Cloning The Repository
To clone the repository through GitHub, follow these steps:

1. In the repository, select the "code" tab located just above the list of files and next to the gitpod button.
2. Select "HTTPS" in the dropdown menu.
3. Copy the URL under HTTPS.
4. Open Git Bash in your IDE of choice.
5. Change the working directory to the location where you want the cloned directory to be created.
6. Type "git clone" and paste the URL that was copied from the repository.
7. Press the "enter" key to create the clone.

### Connecting the API
In order for the project to function as intended, it needs to be connected to the API. To view the repository for the API, click [here](https://github.com/Tony118g/captured-drf-api). To connect to the API, follow these steps:

1. Login in to Heroku and navigate to the relevant app for the project DRF-API.
2. Navigate to settings within the app and click on "reveal config vars".
3. Add the following config vars:
    * Key: CLIENT_ORIGIN | Value: (your deployed frontend url)
    * Key: CLIENT_ORIGIN_DEV | Value: (the gitpod url)
    NB - Make sure there is no trailing slash at the end of the urls.
4. In your coding environment, install axios and create an axiosDefaults.js file.
5. In the axiosDefaults.js file add the relevant code as shown in the Code Institute [Moments Walkthrough](https://github.com/Code-Institute-Solutions/moments/blob/cf955d2f2e6f70f61c92d1f9de85558d8e49f3a8/src/api/axiosDefaults.js) but make sure to use the correct url for your project.
