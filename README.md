# noa-crm-project

Mini CRM project aimed at managing customers, products and orders.

### Tech Stack

- Node.js
- Express.js
- mongodb
- nodemon

## Prepare The Environment

1. Create a new mongodb database.
2. Clone project in vscode: `https://github.com/Noashohat/noa-crm-project.git`
3. Install dependencies in vscode terminal: `npm install`
4. Install nodemon globally: `npm i -g nodemon` and update `package.json` accordingly.
5. In project, add configuration file: `config/dev.js` containing the database connection details.
6. Install dependencies for Angular client:  
   `cd client-angular`  
   `npm install`

## Run The App

1. Run the server:
   - Windows: `set DEBUG=royal-crm:*; & npm start / nodemon start`
   - MacOS/Linux: `DEBUG=royal-crm:* npm start`
