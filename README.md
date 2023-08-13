# Background Story

`about:` Codebase for following a tutorial hosted by FreeCodecamp titled "Code a magic card trick using JavaScript & Node.js".

Link: [Youtube Video](https://www.youtube.com/watch?v=h21pa3yeW08)

This codebase was not fully similar with the tutorial. Some of modifications has been added for author's learning purpose.

## Initialization Step

1. Initialize dependencies library by: `npm init -y` to make prompt answer to "yes".
2. Installing npm packages require for this tutorial (`express`, `body-parser` and `mongodb`) by type: `npm install express body-parser mongodb`.
3. You can start to code.

## Running The Code
1. 

## Installing & Run MongoDB Server Locally (Windows)

1. Visit the official MongoDB website [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community) and download the latest version of MongoDB Community Edition for Windows.
2. Choose the MSI package for Windows and follow the installation instructions.
3. Run the downloaded MSI installer. Choose "Complete" as the setup type to install all necessary components. Follow the installation wizard, and make sure to select the option to install MongoDB as a service. This will ensure that the MongoDB server starts automatically when your PC boots up.
4. MongoDB will be installed in the `C:\Program Files\MongoDB\Server<version>` directory by default. You may need to add this directory to your system's PATH environment variable to run MongoDB commands from any command prompt.
5. Create a directory for your MongoDB data. By default, MongoDB stores data in the "C:\data\db" directory. You can create this directory manually or use the following command in Command Prompt:

```
mkdir C:\data\db
```

6. Open Command Prompt as an administrator. Navigate to the directory where MongoDB is installed. For example:

```
cd C:\Program Files\MongoDB\Server\<version>\bin
```

7. Start the MongoDB server by running:

```
./mongod.exe
```

8. The server should now be running, and you should see log messages indicating its status.
9. To stop the MongoDB server, go back to the Command Prompt where it's running and press Ctrl + C.

## Snapshot of `secret.html`

**Version 1.0**

![Pirple Course Completion Certificate](https://github.com/thoriqmacto/app_pirple/blob/main/public/course_cert.jpg?raw=true)


## LICENSE

MIT License
Copyright (c) 2023 Muhammad Thariq Hadad
