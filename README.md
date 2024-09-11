<h1 style='display: flex; align-items: center; gap: 8px'> <img width=30 height=30 style="margin-top: 0px;" src='public/graphql-rest-logo.svg' alt="GraphQL REST logo" /> REST/GraphiQL Client </h1>

The app supports the features you would expect from a good REST client, and also has a built-in GraphQL editor. In addition, it includes an authorization and authentication mechanism, as well as a history section for quick access to previously completed requests. This is a complete solution for developers who need a powerful and convenient tool to work with the API.

[Full list of the technical requrements](https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/final.md)

## Technologies used

[![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)](#)
[![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB)](#)
[![Redux](https://img.shields.io/badge/Redux-764ABC?logo=redux&logoColor=fff)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](#)
[![Ant-Design](https://img.shields.io/badge/-AntDesign-%230170FE?logo=ant-design&logoColor=white)](#)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff)](#)
[![Vitest](https://img.shields.io/badge/Vitest-646CFF?logo=vite&logoColor=fff)](#)
![Testing-Library](https://img.shields.io/badge/-TestingLibrary-%23E33332?logo=testing-library&logoColor=white)
[![Firebase](https://img.shields.io/badge/Firebase-039BE5?logo=Firebase&logoColor=white)](#)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?logo=github-actions&logoColor=white)](#)
[![ESLint](https://img.shields.io/badge/ESLint-4B3263?logo=eslint&logoColor=white)](#)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](#)


## Getting Started
### Install dependencies:

```bash
npm install
#or
yarn install 
```

### Create the .env file with your own firebase keys in the root

Or contact us to access our firestore database

```bash
DB_API_KEY='THE-SECRET-KEY'
DB_AUTH_DOMAIN='THE-SECRET-KEY'
DB_PROJECT_ID='THE-SECRET-KEY'
DB_STORAGE_BUCKET='THE-SECRET-KEY'
DB_MESSAGING_SENDER_ID='THE-SECRET-KEY'
DB_APP_ID='THE-SECRET-KEY'
```

### Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
