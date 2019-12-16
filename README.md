# PlayStation coding challenge

The following is my submission for the PlayStation software engineer coding challenge. This is a web application which allows a user to manage a PlayStation game library. Users are able to view games and add games to the list.

[GitHub link](https://github.com/thomasbunyan/playstation)

## Table of Contents

[Deployment](https://github.com/thomasbunyan/playstation#deployment)

[Built With](https://github.com/thomasbunyan/playstation#getting-started)

[Design](https://github.com/thomasbunyan/playstation#design)

[Operation](https://github.com/thomasbunyan/playstation#operation)

## Deployment

### Requires

- [Node](https://nodejs.org/en/)

### Running the app

1. Navigate to application folder in terminal
2. Run `npm install`
3. Once installed run `npm run dev`
4. Application should run on [localhost:3000](http://localhost:3000)

## Built With

- Node – Application Framework
- Express.js - Web application framework for Node.js for building web applications and APIs.
- MongoDB - Cross-platform, noSQL database program.
- React (TypeScript) - React is a JavaScript library for building user interfaces.

## Design

### Backend

The backend of the application was written using Node.js and Express.js. This allowed me to build an API which could be queried to POST and GET data. This was coupled with a MongoDB database (hosted at [mongoDB](https://cloud.mongodb.com/)) which would be able to store the data for the app. The API was made by assigning route endpoints, each of which would serve a given purpose. For example to retrieve the list of games, the API must be queried at `api/games`, which would return the list of all games.

### Frontend

The frontend was made in React using TypeScript. I opted against using redux for state management and instead handled it manually. Axios was used to make the API queries. The app was designed as a single page application, keeping all activity on the same page. The app was designed to be mobile friendly and as such has a unique view for narrow device displays.

## Operation

When you first visit the app you're faced with the dashboard page. From here the user can search through the list of games, add a new game or interact with a game.

![Alt text](https://imgur.com/p3YzFL1.png "Guide Image 1")

Adding a game opens a modal popout window. From here the user can input the necessary information to create and add a new game. When the user clicks the add game button the game is added to the list.

![Alt text](https://imgur.com/RvbkEhX.png "Guide Image 2")

Hovering over a game presents an overlay for the game, allowing the user to click the button to view the game.

![Alt text](https://imgur.com/LpryBbY.png "Guide Image 3")

Viewing a game will open a modal popout window, displaying the games information.

![Alt text](https://imgur.com/9jwKyPy.png "Guide Image 4")

When in mobile mode the sidebar is not present and a navigational bar appears at the top of the page. The user can toggle the nav bar by clicking on the menu icon.

<img src="https://imgur.com/hKH2IJ2.png" alt="Guide Image 5" width="300"/>
<img src="https://imgur.com/zWC6ttj.png" alt="Guide Image 6" width="300"/>

Other screens are suited to accommodate the mobile view.

<img src="https://imgur.com/FHrCaWb.png" alt="Guide Image 7" width="300"/>
<img src="https://imgur.com/IAFniCZ.png" alt="Guide Image 8" width="300"/>

## Author

### Thomas Bunyan - 16-Dec-19
