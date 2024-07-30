// import { useState } from "react";
// import { MdUpload } from "react-icons/md";
// import CloudinaryUploadWidget from "../cloudinaryUploadWidget";


//   function selectImages () {
//     document.querySelector('[name = "img"]').click()
//   }
   
//   function uploadImages (event) {
// console.log(event.currentTarget, event.currentTarget.files)
//    }
//    const [images, setImages] = useState([]);

//    const ProductImages = () => (
//      <div className="mt-6">
//        <div className="mt-6 text-2xl font-bold">Images</div>
//        <div className="mt-4 w-full flex space-x-4">
//          <div className="w-1/4">
//            <div className="text-xl font-bold">How to Upload</div>
//            <p className="mt-2 text-sm text-gray-700">
//              Please follow these steps to upload images:
//            </p>
//            <ol className="list-decimal ml-4 mt-2">
//            <li>Click the "Upload" button to the right, you may need to click twice</li>
//            <br/>
//            <li>Select an image from any location supported by the widget</li>
//            <br/>
//            <li>Crop your image, if you'd like</li>
//              </ol>
//          </div>
//          <div className="w-3/4 grid grid-cols-6">
//            <div className="border bg-gray-200 rounded-md flex h-32 w-32">
//              <CloudinaryUploadWidget setImages={setImages}/>
//            </div>
//            {images.map((image, index) => (
//              <div key={index} className="border border-gray-300 rounded-md h-32 w-32 thumbnails">
//                <img src={image.url} alt={`Uploaded ${index}`} />
//              </div>
//            ))}
//          </div>
//        </div>
 
//        {/* Next/Previous Button */}
//        <div className="flex space-x-4 mt-6">
//          <button
//            onClick={() => setCurrentStep(currentStep - 1)}
//            className="py-2 px-4 bg-gray-300 text-black rounded-md hover:bg-gray-400"
//          >
//            Previous
//          </button>
//          <button
//            onClick={() => setCurrentStep(currentStep + 1)}
//            className="py-2 px-4 bg-black text-white rounded-md hover:bg-gray-300"
//          >
//            Next
//          </button>
//        </div>
//      </div>
//    );
 

//   export { ProductImages };