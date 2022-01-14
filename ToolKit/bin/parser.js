// ---- Imports ---- //

const fs = require('fs');
const ffmpeg = require('ffmpeg');
const imageToAscii = require('image-to-ascii');


// ---- Utils ---- //

function imageToAsciiPromise(path, options) {  // Transform the callback in promise.
  return new Promise((resolve, reject) => {
      imageToAscii(path, options, (err, converted) => {
        if (err) return reject(err);

        resolve(converted);
      });
  });
}


// ---- Main ---- //

async function parse(inputFileName, outputFileName) {
  const importedVideo = await new ffmpeg(`../media/${inputFileName}`);

  const imagesPath = await importedVideo.fnExtractFrameToJPG('../temp');  // Extract all frames of video

  const imagesPathSorted = imagesPath.sort((a, b) => {            // Sort the frames because the function
    const imageNumberA = a.split("_")[1].replace('.jpg', '');     // "fnExtractFrameToJPG" is asynchronous
    const imageNumberB = b.split("_")[1].replace('.jpg', '');     // and return the frames scrambled.

    return imageNumberA - imageNumberB;
  });

  const sprites = [];  // Store the ascii converted images

  for (const [index, imagePath] of imagesPathSorted.entries()) {
    sprites.push(
      await imageToAsciiPromise(  // Convert the frame in ascii and push into sprites array
        imagePath,
        { colored: false }
      )
    );

    console.log(`${Math.round(index / imagesPathSorted.length * 100)}%`);
  }


  // Write the sprites and remove temp files

  fs.writeFileSync(
    `../converted/${outputFileName}`,
    JSON.stringify(sprites),
    (err) => {
      err && console.log(err);
    }
  );

  fs.rmSync(
    '../temp',
    { recursive: true },
    (err) => {
      err && console.log(err);
    }
  );
}


// ---- Arguments / Startup ---- //

const args = process.argv.slice(2);

if (!args[0] || !args[1]) {
  console.error('You need to write the inputFileName and the outputFileName.')
  console.log('parser <inputFileName> <outputFileName>');
  console.log('Drop the inputFile in ../media folder.')
}

parse(args[0], args[1]);  // inputFileName, outputFileName
