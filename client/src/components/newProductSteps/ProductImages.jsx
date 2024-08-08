import { useState } from "react";
import CloudinaryUploadWidget from "../cloudinaryUploadWidget";
import { set } from "mongoose";

const ProductImages = ({ rows, setRows  }) => {
  const [images, setImages] = useState([]);
  const [saveMessage, setSaveMessage] = useState('');

  const pushImages = (images, rows) => {
    // State change logic for image urls
    const imagesArray = images.map((images) => images.url);
    const uniqueImages = [...new Set([...rows.image_urls, ...imagesArray])];
    rows.image_urls = uniqueImages;
    setRows({ ...rows });
    console.log(rows)
    // console.log(imagesArray);

    setSaveMessage('Images saved!');
    setTimeout(() => {
      setSaveMessage('');
    }, 3000);
  }

  const pullImage = (e) => {
    const { src } = e.target.dataset;
  console.log(e.target)
  console.log(src)

  const updatedImages = images.filter((image) => image.url !== src);
  setImages(updatedImages);

// State change logic for image urls
  const updatedRows = rows.image_urls.filter((image) => image !== src);
  rows.image_urls = updatedRows;
  setRows({ ...rows });
  console.log(rows)

  }

  return (
    <div className="mt-6">
      <div className="mt-6 text-2xl font-bold">Images</div>
      <div className="flex flex-col md:flex-row mt-4 md:space-x-4 w-full">
        <div className="md:w-1/4 order-2 md:order-1">
          <div className="text-xl font-bold">How to Upload</div>
          <p className="mt-2 text-sm text-gray-700">
            Please follow these steps to upload images:
          </p>
          <ol className="list-decimal ml-4 mt-2">
            <li>Click the "Upload" button to the right, you may need to click twice</li>
            <li>Select an image from any location supported by the widget</li>
            <li>Crop your image, if you'd like</li>
            <li>Don't forget to click the SAVE IMAGES button below</li>
          </ol>
        </div>
        <div className="md:w-3/4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 order-1 md:order-2">
          <div className="border bg-gray-200 rounded-md flex h-32 w-full md:w-32">
            <CloudinaryUploadWidget setImages={setImages} />
          </div>
          {images.map((image, index) => (
            <div key={index} className="relative border border-gray-300 rounded-md h-32 w-full md:w-32">
              <a href="#" onClick={pullImage} data-src={image.url} className="absolute top-1 right-1 text-white bg-gray-800 bg-opacity-50 p-1 hover:bg-opacity-75">x</a>
              <img src={image.url} alt={`Uploaded ${index}`} className="h-full w-full object-cover rounded-md" />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 text-green-600">{saveMessage}</div>
      <button
        onClick={() => {
          if (images.length > 0) {
            pushImages(images, rows);
          }
        }}
        className="mt-4 gap-2 py-2 px-4 bg-black text-white rounded-md hover:bg-gray-300"
      >
        Save Images
      </button>
    </div>
  );
};

export default ProductImages;
