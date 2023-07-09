# The Freaky Link MEAN E-Commerce Website

[![Most Used Language](https://img.shields.io/github/languages/top/athenacats/todo-list?style=for-the-badge)](https://github.com/athenacats/freakylinkweb)
[![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)]
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)]
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)]
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)]
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)]
[![JSON](https://img.shields.io/badge/json-5E5C5C?style=for-the-badge&logo=json&logoColor=white)]
[![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white)]

[![Code Size](https://img.shields.io/github/languages/code-size/athenacats/freakylinkweb?color=9cf&style=for-the-badge)]
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/esther-lonyangapuo/)
[![Email](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:chenalonya@gmail.com)

## Table of Contents

- [Introduction](#introduction)
- [Technologies](#technologies)
- [Setup](#setup)
- [Project Status](#project-status)
- [Challenges Faced](#challenges-faced)
- [Future Implementation](#future-implementation)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)

## Introduction

This is a [full stack MEAN ecommerce website](https://thefreakylink.onrender.com/) that I created for my existing lingerie & adult toy business. As of the time of writing this, I am yet to make it open to customers to place orders, but it already has some products uploaded and users can register and place orders using a Paypal Sandbox account. All functionalities have been implemented so once ready, I shall transfer it to my existing domain [thefreakylink](https://thefreakylink.com/) and pay for higher database storage.

To see the website in action, [click here](https://thefreakylink.onrender.com/).

## Technologies

The application runs on:
- Angular 16.1.4
- Bootstrap 5.3.0
- Leaflet 1.9.4
- Mongoose 7.3.2
- Express 4.18.2
- Nodemon 3.0.0

As well as other dependencies and dev dependencies as detailed in the package.json. THe site is hosted on the free plan of Render.com

## Setup

To run this project:
- Clone the repository
- Install dependencies and dev dependencies found in package.json

```
$ npm run prebuild
$ npm run build
$ npm start
```

## Project Status

The project is complete.

## Challenges Faced

Everything was new to me in the backend and it took me a while to understand how to run requests and link the frontend to the backend. I experienced difficulties in sending requests to read user's orders from the database, which I later on found how to solve. CORS implementation for the deployed website was also problemantic, but I found the bug that caused the issue.

Since the website currency is in KES, it proved impossible to find a free API that would allow users to place orders and pay in KES, which forced me to hardcode an exchange rate. This is easily fixable if I decide to pay for a currency exchange subscription, or if I pay for the Kenyan payment provider IPay api.

## Future Implementation

- Allow user to change their details from the profile page
- Include email service notifying admin and users of orders/new registrations
- Add additional products to the rest of the categories (i.e. For Him, For Her, Accessories)
- Predictive search box
- Mpesa API either from Safaricom or IPay for Kenyan Users (once site is launched)
- Subscribe to currency exchange API so that KES can be used as base currency

## Acknowledgements

A huge source of reference was FreeCOdeCamp and Code With Nassir on Youtube.

## Contact

Reach me on
[LinkedIn](https://www.linkedin.com/in/esther-lonyangapuo/)
[Email](mailto:chenalonya@gmail.com)
