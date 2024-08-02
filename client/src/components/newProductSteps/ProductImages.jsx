import { useState } from "react";
import { MdUpload } from "react-icons/md";
import CloudinaryUploadWidget from "../cloudinaryUploadWidget";
import { set } from "mongoose";

const ProductImages = ({ rows, setRows  }) => {
  const [images, setImages] = useState([]);

  const pushImages = (images, rows) => {
    // State change logic for image urls
    const imagesArray = images.map((images) => images.url);
    const uniqueImages = [...new Set([...rows.image_urls, ...imagesArray])];
    rows.image_urls = uniqueImages;
    setRows({ ...rows });
    console.log(rows)
    // console.log(imagesArray);
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
    <div className="mt-4 w-full flex space-x-4">
      <div className="w-1/4">
        <div className="text-xl font-bold">How to Upload</div>
        <p className="mt-2 text-sm text-gray-700">
          Please follow these steps to upload images:
        </p>
        <ol className="list-decimal ml-4 mt-2">
        <li>Click the "Upload" button to the right, you may need to click twice</li>
        <br/>
        <li>Select an image from any location supported by the widget</li>
        <br/>
        <li>Crop your image, if you'd like</li>
        <br/>
        <li>Don't forget to click the SAVE IMAGES button below</li>
          </ol>
      </div>
      <div className="w-3/4 grid grid-cols-6">
        <div className="border bg-gray-200 rounded-md flex h-32 w-32">
          <CloudinaryUploadWidget setImages={setImages}/>
        </div>
        {images.map((image, index) => (
          <div key={index} className="border border-gray-300 rounded-md h-32 w-32">
             <a href="#" onClick={pullImage} data-src={image.url} className="cloudinary-delete">x</a>
            <img src={image.url} alt={`Uploaded ${index}`} />
          </div>
        ))}
      </div>
    </div>
      <button
          onClick={() => {
            if (images.length > 0) {
              pushImages(images, rows);
            }
          }}
          className="py-2 px-4 bg-black text-white rounded-md hover:bg-gray-300"
        >
          Save Images
        </button> 

    </div>
  );
};

export default ProductImages;