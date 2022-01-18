-- Imports

os.loadAPI("json");


-- Variables

local args = {...};
local monitor = peripheral.find("monitor");


-- Functions

function drawSprite(sprite)
  for i=1,#sprite do
    monitor.setCursorPos(1, i);
    monitor.write(sprite[i]);
  end
end


-- Startup

if not (args[1]) then
  print("You need to write the IP of your computer (transmitter).");
  print("viewer <IP> <textScale (optional | 0.5 - 5)>");
  print("The IP need a prefix and suffix: ws://<IP>:3333");

  error();
end

if (args[2]) then
  monitor.setTextScale(tonumber(args[2]));
end

monitor.clear();


-- Main

local ws, err = http.websocket(args[1]);

if (ws) then
  print("Connected.");

  while (true) do
    local msg = ws.receive();
    local sprite = json.decode(msg);
    drawSprite(sprite);
  end
elseif (err) then
  print(err);
end
