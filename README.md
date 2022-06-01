# Express Mongoose Typescript Boilerplate
:rocket: Minimalistic ExpressJS and Mongo API boilerplate written in Typescript to start building RESTful APIs quickly.

---

## Environment Variables
Create a `.env` file in the root of the project.
```dotenv
# Specify environment [development | staging | production]
NODE_ENV=
PORT=

# MongoDB
MONGO_URI=

# JWT
TOKEN_SECRET=
```
## Project Structure
```
src\
 |--config\             # Environment variables and configuration related things
 |--utils\              # Utility classes and functions
 |--middlewares\        # Custom express middlewares
 |--API\v1\{endpoint}
   |--controller\       # Route controllers (controller layer)
   |--routes\           # Routes
   |--service\          # Business logic (service layer)
   |--validator\        # Request data validation schemas
 |--app.js              # Express app
 |--index.js            # App entry point
```
## Features
- MongoDB: A Super fast NoSQL database.
    -  [Mongoose](https://mongoosejs.com)
- Validation: Validates input using provided schema.
    - [express-validator](https://express-validator.github.io/docs)
- CORS: Cross-Origin Resource-Sharing enabled.
    - [cors](https://www.npmjs.com/package/cors)
- Linting: Auto lints code.
    - [ESLint](https://eslint.org)
    - [Prettier](https://prettier.io)
