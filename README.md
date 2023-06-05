# Clocking System

## Overview

This project is a time-tracking application designed to manage and monitor shift schedules. It is built with a Vue.js frontend and a Node.js backend with Express.js and JWT for authentication. The application provides a seamless user experience with a login interface, a dashboard for viewing shift data, and functionality for clocking into shifts.

## Features

**Login Page:** Secure user authentication implemented using JWT. Only authenticated users can access the dashboard.

**Shift Clock-in Page:** This page allows employees to clock in at the start of their shifts.

**Dashboard:** The dashboard is a comprehensive overview of shift data displayed in a table format. It is accessible only after successful login. The data shown is depend on employee role, when admin can see all shifts, the employee can view only its on shifts.

## Tech Stack

Frontend: Vue.js

Backend: Node.js, Express.js, MySql

## Project Setup

### Backend Setup

Navigate into directory:  `cd client` and run the npm install `npm install`.
Create .env file and copy next content into it

`
    MYSQL_HOST=<your host>
    MYSQL_PORT=<your port>
    MYSQL_USER=<mysql user>
    MYSQL_PASSWORD=<mysql password>
    MYSQL_DATABASE=<database name>
    SUPER_SOCIAL_NUMBER=<super user>
    SUPER_USER=<super user>
    SUPER_PASSWORD=<super user password>
    JWT_SECRET=<jwt secret>
`

Change the values to desired.
Start the server using npm run start.


### Frontend Setup

Navigate into directory:  `cd client` and run the npm install `npm install`.
Start the application using `npm run dev`.

