{
    "name": "<%= botname %>",
    "version": "1.0.0",
    "description": "<%= botDescription %>",
    "author": "Generated using Microsoft Bot Builder Yeoman generator v<%= version %>",
    "license": "MIT",
    "main": "<%= npmMain %>",
    "scripts": {
        "build": "tsc --build",
        "lint": "tslint -c tslint.json 'src/**/*.ts'",
        "postinstall": "npm run build && node ./deploymentScripts/webConfigPrep.js",
        "start": "tsc --build && node ./lib/index.js",
        "test": "echo \"Error: no test specified\" && exit 1",
        "watch": "nodemon --watch ./src -e ts --exec \"npm run start\""
    },
    "repository": {
        "type": "git",
        "url": "https://github.com"
    },
    "dependencies": {
        "botbuilder": "~4.7.0",
        "dotenv": "^8.2.0",
        "replace": "~1.1.1",
        "restify": "~8.4.0"
    },
    "devDependencies": {
        "@types/dotenv": "6.1.1",
        "@types/restify": "8.4.1",
        "nodemon": "~1.19.4",
        "tslint": "~5.20.0",
        "typescript": "~3.6.4"
    }
}
