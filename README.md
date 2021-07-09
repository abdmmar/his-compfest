# Healthcare Information System Website COMPFEST 13

Healthcare Information System Website for Software Engineering Academy
COMPFEST 13.

Login as Admin:

- username: admin
- password: admin123

## Prerequisites

1. [yarn](https://yarnpkg.com/)

## Running Locally

```bash
$ git clone https://github.com/abdmmar/his-compfest.git
$ cd his-compfest
$ yarn
$ yarn start
```

Don't forget to change `.env.example` to `.env` and configure the variable to
match your API server url.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

You can start develop the page by modifying file inside `src` folder. The page
auto-updates as you edit the file.

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

- [SASS](https://sass-lang.com/) and
  [CSS Modules](https://github.com/css-modules/css-modules) for styling ->
  style.module.scss. It's basically same as CSS
- [React Router](https://reactrouter.com/) for routing.
- [Reach UI/Dialog](https://reach.tech/dialog) is a React component for create
  an accessible dialog or "modal" window.
- [react-query](https://react-query.tanstack.com/) for fetching data.
- [react-error-boundary](https://www.npmjs.com/package/react-error-boundary) for
  Handling breaking error in spesific component/page

### Development Dependencies

- Eslint + Prettier for Static analysis to avoid typo/syntax error
- Husky is a git hooks, for example we run `git commit` it's run pre-commit
  hooks to lint and format document before commit to repository
- lint-staged to run linter and prettier

## Contributors

**Abdullah Ammar** - Initial work - [Github](https://github.com/abdmmar)

## License

MIT
