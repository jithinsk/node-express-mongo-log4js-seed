# Seed for Node-Express-Mongo

This project is a seed for Node-Express-Mongo. This depends on multiple libraries for convenience.
- https://expressjs.com/
- https://hapi.dev/family/joi/ - For user input verification
- https://github.com/Automattic/mongoose - ODM
- https://github.com/log4js-node/log4js-node - Logging
- https://github.com/auth0/node-jsonwebtoken - Authentication
- https://gulpjs.com/ - Automated building

## Getting Started
- Replace the MONGODB_URI in ```config/config.js``` with your own URI.
- Run ```npm run dev``` to start the DEV server.

## Note:
- An endpoint has been implemented in ```controllers/authController.js``` as a starter. This is purely to show the format to write endpoints and may not be in working state.

