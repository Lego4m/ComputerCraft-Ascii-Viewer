// ---- Imports ---- //

const webSocket = require('ws');


// ---- Startup / Main ---- //

const args = process.argv.slice(2);

if (!args[0]) {
  console.error('You need to write the IP of your computer (transmitter).');
  console.log('viewer <IP>');
  console.log('The IP need a prefix and suffix: ws://<IP>:3333');

  process.exit();
}

const ws = new webSocket(args[0]);

ws.on('message', (msg) => {  // Write the broadcast in console
  console.clear();

  const sprite = JSON.parse(msg);

  sprite.forEach((line) => {
    console.log(line);
  });
});
