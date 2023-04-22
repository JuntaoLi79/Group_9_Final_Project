# Travel Tracker App using React and Flask 🧭

## Introduction 😊

The Travel Tracker App called **Waestem** is a web application that empowers users to keep track of their travels and share with others. We aim to provide a robust platform for travelers to document their trips with multimedia like photos, text, and location data. Users can view their posts, comment, like, and share them with friends and family. The app will be built using Flask and React.

## ** __Set Up & Notes__ ** 🛎️

### V 2.0 🎑
Watch this [delieverable 2](https://www.youtube.com/watch?v=VvlTre4nJ5o&t=3s) here to walk over this project with Shane. The following are some general notes.
1. The backend now is deployed to public IP address at http://82.180.160.49/. So you don't need to run the backend locally. The react app is also deployed at http://waestem.com/ as a preliminary version. But you still need to run the frontend locally to experience the authentication feature because the public application needs to be verified by Google.
2. Please refer to the setup steps in the V 1.0 section below to run the frontend locally. It's not recommended to access the remote server because it takes some time to set up. But you can still replace all the backend request to a local request for `http://82.180.160.49/` to `htttp://localhost:5000/` if you want to run the backend locally.
3. API keys are hidden. If you want to test the API code locally, you need to access those API keys in our waestem [documentation](https://docs.google.com/document/d/1LyGUcAj2abiSfcHy9AaZcRdckJCR2NslV7uBqDWKFAs/edit?usp=sharing). Please don't upload the key to github, otherwise it will be automatically disabled. Once you have the key, just replace all the `process.env.REACT_APP_XXX` with the key in the code.


### V 1.0 🥦

Watch this [demo](https://www.youtube.com/watch?v=xtMTNSQyIXE&t=1s) here to walk over this project with Shane. Here are some steps you can do to make sure you can run the project (do all the following commands under the root directory of the project inside the terminal):
1. `cd` to `Group_9_Final_Project\frontend_waestem\waestem`, and run `rm node_modules`, then `npm install`. To start the react app, do `npm run start`. If it prompts you that `npm` is not recognized as an internal or external command, do `npm install npm@latest -g`. Also make sure that you have installed LTS version of node.js through this website: https://nodejs.org/en/download/.
2. `cd` to `Group_9_Final_Project\backend_waestem\flask-server`, and run `pip install -r requirements.txt`, this will install all the dependencies. To start the flask server, do `python server.py`. If it prompts you that `xxx modules not found`, do `py -3 -m pip install <module_name>`.
3. All the MySQL queries are in `backend_waestem/sql_scripts` folder. But you shouldn't need to run the scripts at all because our database is remote. The credentials are also provided on the top of the `server.py`. Those data are already in the database. 
4. All the packages we use are in the `requirements.txt` file for backend and `package.json` for frontend. Here is a google doc as a [documentation](https://docs.google.com/document/d/1LyGUcAj2abiSfcHy9AaZcRdckJCR2NslV7uBqDWKFAs/edit?usp=sharing) for additional information.


The above steps should be enough to run the project. If you have any questions, please feel free to reach out to Shane  <jli79@uncc.edu>.

## Problem Statement 🚩
Many travelers have a hard time keeping track of their trips and remembering the details of their experiences. Furthermore, it can be challenging to share those experiences with others in a meaningful way. The Travel Tracker App solves these problems by providing an easy-to-use platform for travelers to document their trips, including photos, text, and location data. This app allows users to preserve their memories and share them with others.
## Target Audience 🦗
The target audience for the Travel Tracker App is anyone who loves to travel and wants to document and share their experiences. This includes people of all ages and backgrounds, from solo travelers to families and groups. The app is particularly useful for frequent travelers who want to keep track of their travel history and share it with others.
## Requirements  ⚓
### Functional Requirements 📝
* User registration and login (authentication)
* Create, edit, and delete travel entries
* Ability to add photos, text, and location data to travel entries
* View travel history and statistics
* Search for travel entries by location or keyword
* Share travel entries with others via social media
* Non-functional Requirements:
* Responsive UI that works well on different devices and screen sizes
* Secure authentication and data storage
* Fast loading times and smooth performance
### Key Features 🔑
* Easy way for adding and managing travel entries
![Home page](./images/homepage.png)
* Interactive map displaying travel history and locations
![post](./images/post.png)
* Dynamic search functionality for finding travel entries. 
![Search](./images/Search.png)
* Share travel entries with others via social media

## Software Architecture 🏗️

![Software Architecture](./images/architecture.png)

The Travel Tracker App will be built using a 3-tier architecture, consisting of the presentation layer, application layer, and data layer. The presentation layer will handle user interactions with the app and display all the data in the post and user information on the post to the user. The application layer will handle data processing and fetching. The data layer will be responsible for data storage and retrieval. For example, when a user wants to search for something, the presentation layer would request a query with filters to get the corresponding posts. The application will be built using Flask, a Python-based web framework for the application layer. The front end will be developed using React, a popular Javascript framework. The backend will be built using MySQL or SQLite.

## Technology Stack 📚
Front-end Technologies: HTML, CSS, React, JavaScript  

Back-end Technologies: Python, Flask  

Front-end: React, TailwindCSS  

Library/Package: MasonryLayout, react-router-dom, GoogleLogin, etc.

Database: MySQL/SQLite

Hosting: Hostinger

## Team Members 👥

Lane Brantley (Search Algorithm)🛣️

Joseph Petrongelli (Media Manager)🕵️‍♂️

Shane Li (Backend Tech Lead) 🏮

Sabin Shrestha (Frontend Tech Lead)🏔️

Youness Badr (Recommendation Algorithm)🌊

