# Captured
Captured is a content sharing platform for photographers. Users can showcase their own photographs along with details concerning them and interact with other users via likes, comments and follows. The site is also used as an advertising platform for the site admin to share photographic tour opportunities that users can choose to attend.

This repository is for the frontend section of the project and is associated with the [captured DRF-API](https://github.com/Tony118g/captured-drf-api).

## Contents

* [Project Goals](#project-goals)
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
