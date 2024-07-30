import { createContext, useEffect, useState } from "react";
import { MdUpload } from "react-icons/md";

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext();
const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

// console.log(cloudName, uploadPreset);



function CloudinaryUploadWidget({ uwConfig, setImages }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Check if the script is already loaded
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        // If not loaded, create and load the script
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        // If already loaded, update the state
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = () => {
    if (loaded)  {
      var myWidget = window.cloudinary.createUploadWidget(
        {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        cropping: true,
        maxFiles: 10,
        thumbnails: ".thumbnails",
      },
        (error, result) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image url: ", result.info.secure_url);
            setImages((prevImages) => [...prevImages,{ url: result.info.secure_url}]);
          }

        }
      );

      document.getElementById("upload_widget").addEventListener(
        "click",
        function () {
          myWidget.open();
        },
        false
      );
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <button
        id="upload_widget"
        className="border 200 rounded-md flex h-32 w-32 cloudinary-button"
        onClick={initializeCloudinaryWidget}
      >
        Upload <MdUpload className="mx-auto mt-2" />
      </button>
    </CloudinaryScriptContext.Provider>
  );
}

export default CloudinaryUploadWidget;
export { CloudinaryScriptContext };
