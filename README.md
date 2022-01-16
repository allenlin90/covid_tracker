- [1. COVID TRACKER](#1-covid-tracker)
  - [1.1. Requirements](#11-requirements)
  - [1.2. Design](#12-design)
- [2. App Feature](#2-app-feature)
- [3. Steps of working](#3-steps-of-working)
- [4. Challenge](#4-challenge)
- [5. Further Improvements](#5-further-improvements)
  - [5.1. Offline/slow internet user experience](#51-offlineslow-internet-user-experience)
  - [5.2. Security](#52-security)
  - [5.3. UI and design](#53-ui-and-design)
  - [5.4. Data flow](#54-data-flow)
  - [5.5. In App structure and design](#55-in-app-structure-and-design)
- [6. Getting Started with Create React App](#6-getting-started-with-create-react-app)
  - [6.1. Available Scripts](#61-available-scripts)
    - [6.1.1. `npm start`](#611-npm-start)
    - [6.1.2. `npm test`](#612-npm-test)
    - [6.1.3. `npm run build`](#613-npm-run-build)
    - [6.1.4. `npm run eject`](#614-npm-run-eject)

---

# 1. COVID TRACKER
## 1.1. Requirements
1. User can click on (+) to add new patient up to 8 patients.
2. User can add each patient information using form on top, the patient contains these data
   1. Gender: string
   2. Age: integer
   3. Occupation: string
3. User can add timeline entry using form on the right, a timeline entry contains these data
   1. Time From: datetime
   2. Time To: datetime
   3. Detail: string
   4. Location Type: string
   5. Location: string
   6. Location type can be only these following value
   7. INDOOR
   8. OUTDOOR
   9. HOME
   10. TRAVELLING
4.  When location type is **INDOOR** and **OUTDOOR** user need to specify the location name.
5.  On the left side use patient data and timeline entry data to display data as show in the design
6.  Timeline activities must be sorted by Time.
7.  Each timeline entry must not collapsed with other entry.
8.  Timeline activities must be grouped by date.
9.  Visited locations must be sorted by name.
10. User can remove timeline entry when click on (x) button.
11. User can remove patient and timeline entries by click on Remove Patient button on the top right.
12. Make it responsive and look nice on all screen sizes.
13. BONUS
    1.  BONUS POINT I: Cover the use case with test.
    2.  BONUS POINT II: Feel free to make it better than the given design 😉
    3.  BONUS POINT III: Use GraphQL as API

## 1.2. Design
1. Font: [Roboto Slab](https://fonts.google.com/specimen/Roboto+Slab)
2. Colors
   1. <span style="background-color:#012d5e; color:#fff; padding: 2px">Theme</span>
   2. <span style="background-color:#5882E3; color:#fff; padding: 2px">Blue</span>
   3. <span style="background-color:#254870; color:#fff; padding: 2px">Light Blue</span>
   4. <span style="background-color:#ffc107; color:#000; padding: 2px">Yellow</span>
   5. <span style="background-color:#dc3545; color:#fff; padding: 2px">Red</span>
   6. <span style="background-color:#fff; color:#000; padding: 2px">White</span>
    ```scss
    --background: #012d5e;
    --font-color: #ffffff;
    --blue: #5882E3;
    --light-blue: #254870;
    --yellow: #ffc107;
    --red: #dc3545;
    --white: #fff;
    ```
3. Design
<img src="https://user-images.githubusercontent.com/1606989/138546503-b4035c95-c730-4104-ad86-68134614e937.png">

# 2. App Feature
1. `Bootstrap 5.1` and `Roboto Slab` from CDN are imported in `index.html` for global scope.
2. Global style is imported and applied in `App` component. 
3. App breakpoints (media query) follows suggestions from Bootstrap frontend library.

# 3. Steps of working
1. Prepare and deploy RESTful API backend to support using "Patient" and "Event" entities.
2. Study and review Typescript, React and its ecosytem. 
3. Layout React App structure and config required libraries/packages for the project
4. Set up `index.tsx` and `App.tsx` and break down required components from the requirements
5. Set up `store`, `actions`, and `reducers` with `Redux`, `redux-thunk` and `axios`.
6. Build up components and wire up Redux action and reducers with store management.

# 4. Challenge
1. Review and understand `this` lexical scope, as React is using regular Javascript syntax with it's original behavior, while `Vue` has abstracted the concept and simplified the way of using `this`.
2. Logical and syntax in React is very different from `Vue`. Besides, single "**watcher**" and expression with "**computed**" are used with `useEffect` hook. Other features such as props, lifecycle hooks and state management are in much similar concepts. 
3. Styling and importing css as modules with "**Typescript**" is tricky, as webpack doesn't handle this directly as using regular Javascript. 3rd party package is required to handle this task. 
4. Apply Typescript in projects can be confusing as the error prompt could somehow not so straight forward, but does help identifying existing or potential errors.
5. Research and identify a feasible React component library and customize the components to the desirable themes.
6. Building `Timeline` component to show patient events in a timeline view.
7. Lacking fluency in both React and Typescript are critical to the lead time on proceeding this project.

# 5. Further Improvements
## 5.1. Offline/slow internet user experience
1. PWA, `localStorage`, and `IndexedDB` could be used for local cache and improve offline and slow internet environemnt.

## 5.2. Security
1. Add user authentication for security.
2. The App could be SSR (server-side rendering) to prevent showing JSON dataset during request directly. It can make parsing and extracting harder. Besides, though Google Crawler has similar behavior to `Puppeteer.js` that can mock human behevior and read data from JS code, SSR Apps still have better SEO performance in general.

## 5.3. UI and design 
1. Improve transition and animation for components and during userflow.
2. `React router` could be used when more features are brought in.
3. Though the UIs are responsive, the design is more desktop-oriented which can be improved for mobile users.

## 5.4. Data flow 
1. All App data is fetched and loaded in the initated stage when the user visit the App. The data flow can be optimized for larger data set.
2. WebSocket (such as Socket.io) can be used to provide real-time data update and enhance user experience (for multi-user and multi-device access).

## 5.5. In App structure and design
1. Code in componenets can be more organized and abstracted for general purpose.

# 6. Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 6.1. Available Scripts

In the project directory, you can run:

### 6.1.1. `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### 6.1.2. `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### 6.1.3. `npm run build`

### 6.1.4. `npm run eject`
