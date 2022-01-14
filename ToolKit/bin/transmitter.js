// ---- Imports ---- //

const webSocket = require('ws');
const readline = require('readline');

const { delay } = require('./utils/delay');


// ---- Functions ---- //

const options = {
  isBroadcasting: false,
}

function broadcast(msg) {
  ws.clients.forEach((client) => {
    client.send(msg);
  })
}

async function startBroadcast(sprites) {
  options.isBroadcasting = true;  // Tell to for of loop it's broadcasting

  for (sprite of sprites) {
    if (!options.isBroadcasting) {  // Stop the broadcast prematurely
      break;
    }

    const lines = sprite.split('\n');  // Separates a single sprite line into multiple arrays, for minecraft read.

    broadcast(JSON.stringify(lines));

    await delay(30);
  }
}

function stopBroadcast() {
  options.isBroadcasting = false;
}


// ---- Listeners / WebSocket ---- //

const ws = new webSocket.Server({ port: 3333 });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

ws.on('connection', (client) => {
  console.log('Client connected.');
});


// ---- Main ---- //

function main(fileToBroadcast) {
  const importedFile = require(`../converted/${fileToBroadcast}`);

  rl.on('line', (command) => {
    switch (command) {
      case 'start':
        startBroadcast(importedFile);
        break;

      case 'stop':
        stopBroadcast();
        break;

      default:
        console.warn('Unrecognized command.')
    }
  });

  rl.prompt(); // Initialize the prompt interface
}


// ---- Startup ---- //

const args = process.argv.slice(2);

if (!args[0]) {
  console.error('You need to specify a file for broadcast to minecraft.');
  console.log('transmitter <fileToBroadcast>');
  console.log('To get this file, run the parser.js and write in <fileToBroadcast> the same name of <outputFileName>.');

  process.exit();
}

console.log('Commands: start & stop');

main(args[0]) // fileToBroadcast
