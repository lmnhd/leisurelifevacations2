export function readImageAsBytes(url) {
  return fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const arrayBuffer = reader.result;
          const bytes = new Uint8Array(arrayBuffer);
          resolve(bytes);
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(blob);
      });
    });
}
export function convertToSquarePNG(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = function () {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      const size = Math.min(image.width, image.height);
      canvas.width = size;
      canvas.height = size;

      context.drawImage(image, 0, 0, size, size);

      canvas.toBlob(function (blob) {
        resolve(blob);
      }, "image/png");
    };

    image.onerror = function () {
      reject(new Error("Failed to load the image."));
    };

    image.src = url;
  });
}

export async function resizeImageToSquare(url, size, callback) {
  const reader = new FileReader();

  reader.onload = function (event) {
    const image = new Image();
    image.onload = function () {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      const width = image.width;
      const height = image.height;

      // Calculate the dimensions for the square image
      const newSize = Math.min(width, height, size);
      const x = (width - newSize) / 2;
      const y = (height - newSize) / 2;

      // Resize the image to the square size
      canvas.width = newSize;
      canvas.height = newSize;
      context.drawImage(image, x, y, newSize, newSize, 0, 0, newSize, newSize);

      // Convert the canvas content to a new Blob
      canvas.toBlob(function (blob) {
        callback(blob);
      }, "image/png");
    };

    image.src = event.target.result;
    //console.log(event.target.result)
    //console.log(image)
    return image;
  };
  const file = await readImageAsBytes(url);
  const blob = new Blob([file], { type: "image" });
  //console.log(blob)
  reader.readAsDataURL(blob);
}

// Example usage:
//   const imageUrl = "https://example.com/image.jpg";
//   readImageAsBytes(imageUrl)
//     .then(bytes => {
//       console.log("Image bytes:", bytes);
//       // Do something with the image bytes
//     })
//     .catch(error => {
//       console.error("Error reading image:", error);
//     });
