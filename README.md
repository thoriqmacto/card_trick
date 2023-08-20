# Background Story

`about:` Codebase for following a tutorial hosted by FreeCodecamp titled "Code a magic card trick using JavaScript & Node.js".

Link: [Youtube Video](https://www.youtube.com/watch?v=h21pa3yeW08)

This codebase was not fully similar with the tutorial. Some of modifications has been added for author's learning purpose.

## Initialization Step

1. Initialize dependencies library by: `npm init -y` to make prompt answer to "yes".
2. Installing npm packages require for this tutorial (`express`, `body-parser` and `mongodb`) by type: `npm install express body-parser mongodb`.
3. You can start to code as per tutorial.
4. To run the code just simply typing `node server.js`

## Installing & Run MongoDB Server Locally (Windows)

1. Visit the official MongoDB website [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community) and download the latest version of MongoDB Community Edition for Windows.
2. Choose the MSI package for Windows and follow the installation instructions.
3. Run the downloaded MSI installer. Choose "Complete" as the setup type to install all necessary components. Follow the installation wizard, and make sure to select the option to install MongoDB as a service. This will ensure that the MongoDB server starts automatically when your PC boots up.
4. MongoDB will be installed in the `C:\Program Files\MongoDB\Server<version>` directory by default. You may need to add this directory to your system's PATH environment variable to run MongoDB commands from any command prompt.
5. Some notes to be added when running MongoDB for windows.
6. Author using MongoDB server version v6.0.8 which different with the version that use by tutorial. Different way to interact using barebone NodeJS mongodb driver is to wrap all query using async/await Promises.
7. Do not use WSL to run `node server.js` using windows Command Prompt or Powershell. It will end up with Topology error.

## Deployment on Heroku

This deployment would be conducted after creation of Heroku accounts.
Additional guide would be added here.

### **[Version 1.0]** Snapshot of `secret.html` form submission

![Form Submission secret.html](https://github.com/thoriqmacto/card_trick/blob/main/public/secret_html_page.png?raw=true)

### Snapshot of entering data through form using `fulan` name.

![Submit with fulan](https://github.com/thoriqmacto/card_trick/blob/main/public/secret_html_page_fulan.png?raw=true)

### Snapshot of retrieving data when typing in browser `http://localhost:3000/fulan`

![Fulan data retrieved](https://github.com/thoriqmacto/card_trick/blob/main/public/secret_html_page_fulan_retrieve.png?raw=true)

## LICENSE

MIT License
Copyright (c) 2023 Muhammad Thariq Hadad
