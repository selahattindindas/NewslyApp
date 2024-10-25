
# NewslyApp

Welcome to NewslyApp - a modern news platform built using Angular 18 and fake JSON. This project aims to provide a user-friendly interface with dynamic features and easy-to-use management capabilities.


## Features

- 🌦️ Location-Based Weather Information: Displays real-time weather information based on the user's current location by making requests to a third-party API.
- 🌙 Theme Mode: Offers dark and light theme options for a personalized user experience.
- 📊 Dynamic Slider: Highlights key news articles using an interactive slider.
- 🔒 Admin Panel: Allows administrators to easily add, delete, and update news articles.
## Technologies & Libraries Used
- Angular 18: Frontend framework for building the application's user interface.
- fake JSON: Simulates backend data to support news management operations.
- keen-slider: For implementing dynamic and responsive sliders.
- ngx-quill: A rich text editor for creating and editing news articles.
- angular-jwt: For handling JSON Web Tokens in authentication and authorization processes.
- crypto-ts: Provides encryption and decryption features to secure sensitive data.
- Third-Party Weather API: Utilized to fetch weather information. For example, OpenWeatherMap API can be used.

## Installation

### To get a local copy up and running, follow these steps:

#### Clone the repository:

```bash 
git clone https://github.com/selahattindindas/NewslyApp.git
```
    
#### Navigate to the project directory:

```bash 
cd NewslyApp
```

#### Install the dependencies:

```bash 
npm install
```

#### Start the development server:

```bash 
ng serve
```


#### Open a new terminal and, while still in the NewslyApp directory, run:

```bash 
json-server --watch db.json --port 3000
```


**Note: If the port is running differently, you will need to change the port number in the "src/environments/environment.development.ts" file as well.**
