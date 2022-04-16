# Express Typescript Boilerplate
:rocket: ExpressJS API boilerplate written in Typescript.
A minimalistic boilerplate to start building RESTful APIs quickly.
---

## Environment Variables
Create a `.env` file in the root of the project.
```dotenv
# Specify environment [development | staging | production]
NODE_ENV=

# Server Port
PORT=
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
