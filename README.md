## Requirements

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm`.

# Initial Setup

Clone the repo:

`git clone https://github.com/jonathan-rose/deathclocks.git`

From within the deathclocks directory, install the dependencies:

`npm install`

To run:

``npm start``

This will start a local live server and open a browser window to localhost:8080 with the game running.

## Node Version Issues

You may get the following error when you do ``npm start``:

`Error message "error:0308010C:digital envelope routines::unsupported"`

This is due to trying to use SLL in Node.js v17 or later. See this thread on SO:

[Error message "error:0308010C:digital envelope routines::unsupported"](https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported)

To fix it downgrade to Node 16.20. Node version manager makes this easy.

Install nvm (Mac and Linux) or nvm-windows (Windows):

[NVM](https://github.com/nvm-sh/nvm)

[NVM-windows](https://github.com/coreybutler/nvm-windows)

Then from a terminal:

``nvm install 16.20``

``nvm use 16.20``

This is an issue with Phaser that even affects the official template, reported last December:

[Unable to build project on Node version 18 and above](https://github.com/photonstorm/phaser3-project-template/issues/100)

## Build

``` bash
npm run build && cp -r assets/ dist/ && zip -r deathclocks dist/*
```
