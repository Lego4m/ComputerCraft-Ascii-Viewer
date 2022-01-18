# ComputerCraft-Ascii-Viewer

[![ComputerCraft-Ascii-Viewer](https://i.imgur.com/rdY6Ndi.png)](#)

This project is a toolkit for parsing movies/videos to ascii and visualize them in ComputerCraft, terminal or in countless places.

## Requirements

Basically, this project needs a lot of requirements to run, i have split them into some topics.

### ToolKit - The brain of project

The ToolKit consists of 3 tools, in which they use the same dependencies.

#### FFmpeg

FFmpeg is a codec for video manipulation and it's necessary to split the video into several images, to later be transformed into ascii.

It's a severely codec-heavy, so it must be self-installed on your operating system: [Linux](https://linuxize.com/post/how-to-install-ffmpeg-on-debian-9/), [Mac](https://macappstore.org/ffmpeg/) & [Windows](http://blog.gregzaal.com/how-to-install-ffmpeg-on-windows/).

#### Graphics Magick

I put this thread up because i had certain problems using [image-to-ascii](https://www.npmjs.com/package/image-to-ascii).

Check this [link](https://github.com/IonicaBizau/image-to-ascii/blob/master/INSTALLATION.md) to install Graphics Magick based on image-to-ascii's own recommendations.

### Minecraft - The reason of project

First you need to have minecraft ~~obviously~~ and install a ModLoader, such as [forge](https://files.minecraftforge.net/net/minecraftforge/forge/) or [fabric](https://fabricmc.net/use/installer/).

---

**Note for Fabric users**

You need to download the [Fabric API](https://www.curseforge.com/minecraft/mc-mods/fabric-api) and paste into "mods" folder (in .minecraft).

---

#### ComputerCraft | CC Tweaked

It's important to note that CC Tweaked and ComputerCraft **are different**. ComputerCraft was discontinued in 1.8.9 while CC Tweaked received some updates in this code and supports the newest versions of minecraft.

You can download the CC Tweaked to [forge](https://www.curseforge.com/minecraft/mc-mods/cc-tweaked) or [fabric](https://www.curseforge.com/minecraft/mc-mods/cc-restitched).

* After downloading, paste the mod into "mods" folder (in .minecraft).


## How to use

This topic is separated into ToolKit and Minecraft for making things more simpler.

### ToolKit

Open a terminal, navigate to `ToolKit`, run `yarn .` or `npm install .` to install the packages and navigate to `ToolKit/bin`.

#### parser.js - The creator

This tool creates a file (in json) with all the ascii images inside it. 

The algorithm is simple, it extracts frame by frame using [FFmpeg](https://www.npmjs.com/package/ffmpeg) and transforms it to ascii using [image-to-ascii](https://www.npmjs.com/package/image-to-ascii).

To use write `node parser <inputFileName> <outputFileName>`

* **_inputFileName_** it's a .mp4 file. Drop your video in `ToolKit/media` and use the same name in parser.

* **_outputFileName_** it's your output file. It will be created in the `ToolKit/converted`.

#### transmitter.js - The broadcaster

This tool broadcasts the ascii-video created by the parser.

To use write `node transmitter <fileToBroadcast>`

* **_fileToBroadcast_** it's a file with the ascii-video. The algorithm will search this file in `ToolKit/converted`.

This is an interactive tool, and after you initialise then you can use two commands: `start` & `stop`.

* **_start_**: start your broadcast.
* **_stop_**: stop your broadcast.

#### viewer.js - The viewer

This tool is useful to not need minecraft to see ascii-video.

To use write `node viewer <IP>`

* **_IP_** is the IP of the machine that is running the transmitter. It's important to note that you need to add a prefix and suffix for the websocket to recognize it: `ws://<IP>:3333`.

### Minecraft

#### CC Tweaked

It's important to note that ComputerCraft blocks access to the local ip range by default, so we must unlock this.

* Go to `.minecraft/saves/your world/serverconfig`
* Open the **computercraft-server.toml** file in a text editor (like vscode)
* Change the line 47 from "deny" to "allow".

After that you mustn't have any problems with the connection.

***

To put the Lua script into minecraft you need to:

* Put a computer in the minecraft world and initialize it
* Go to `Minecraft/` and copy the `json` & `viewer.lua` into `.minecraft/saves/your world/computercraft/computer/id of your computer/`.

To use this tool, go to your computer and write `viewer <IP> <textScale>`

* **_IP_** is the IP of the machine that is running the transmitter. It's important to note that you need to add a prefix and suffix for the websocket to recognize it: `ws://<IP>:3333`.
* **_textScale_** is the scale of text displayed on monitor. It's an optional property that can range between 0.5 and 5.

## Example

Let's define that:

* **inputFileName** = `dancin.mp4`
* **outputFileName** = `dancin.json`
* **IP** = `ws://localhost:3333`
* **textScale** = `0.5`

To broadcast your ascii-video do:

* Drop your video in `ToolKit/media`
* Open a terminal and go to `ToolKit/bin`
* Run `node parser dancin.mp4 dancin.json` and await the process ends
* Run `node transmitter dancin.json`
* When your connect the clients (either the terminal or minecraft viewer) type `start` or `stop`.

To view inside minecraft do:

* Do all the steps of "How to Use" in minecraft thread
* Place one or more monitors next to your computer
* Run `viewer ws://localhost:3333 0.5` in your computer.
