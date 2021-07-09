# Healthcare Information System Website COMPFEST 13

Healthcare Information System Website for Software Engineering Academy COMPFEST 13.

## Screenshots
### Dashboard Desktop

<img alt="Dashboard" src="screenshots/Dashboard.png" height="300"/>

## Features

### As admin
- Create a new doctor appointment
- Update doctor appointments
- Delete doctor appointments
- See a list of patients that are registered in each appointment

### As patient
- See a list of appointments
- Apply for an appointment
- Cancel appointment

## Demo

```
https://his-compfest.vercel.app
```

Admin:

- username: admin
- password: admin123

## Prerequisites

1. [yarn](https://yarnpkg.com/) or npm

## Running Locally

Clone the project

```bash
  git clone https://github.com/abdmmar/his-compfest.git
```

Go to the project directory

```bash
  cd his-compfest
```

Install dependencies

```bash
  yarn
  #or
  npm install
```

Start the server

```bash
  yarn start
  #or
  npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start develop the page by modifying file inside `src` folder. The page auto-updates as you edit the file.

## Environment Variables

To run this project, you will need to change file name from `.env.example` to `.env` and then change the following environment variables in your `.env` file

- `REACT_APP_URL_API_DEV` to make request to your local API server in development mode
- `REACT_APP_URL_API` to make request when application run in production build

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fabdmmar%2Fhis-compfest)

## Project Structure

- `public/` - Contains icon and `index.html`
- `src/components` - Contains frequently used components on the page
- `src/context` - Contains React context to use accross component
- `src/pages` - Contains all page
- `src/styles` - Contains global styling and variables
- `src/test` - Contains test configurations, although there is no test yet
- `src/utils` - Helper functions

## Built using

### Dependencies

- [SASS](https://sass-lang.com/) as CSS preprocessor
- [React Router](https://reactrouter.com/) for routing.
- [Reach UI/Dialog](https://reach.tech/dialog) is a React component for create an accessible dialog or "modal" window.
- [react-query](https://react-query.tanstack.com/) for fetching data.
- [react-error-boundary](https://www.npmjs.com/package/react-error-boundary) for handling breaking error in spesific component/page

### Development Dependencies

- Eslint + Prettier for Static analysis to avoid typo/syntax error
- Husky is a git hooks, for example we run `git commit` it's run pre-commit
  hooks to lint and format document before commit to repository
- lint-staged to run linter and prettier

## Roadmap

- Add unit test and integration test

## Author

**Abdullah Ammar** - Initial work - [Github](https://github.com/abdmmar)

## License

MIT
