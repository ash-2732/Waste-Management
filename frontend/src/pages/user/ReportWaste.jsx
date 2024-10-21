import Layout from "../../components/Layout/Layout";
import { Upload } from "lucide-react";
import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import { message } from "antd";
import axios from "axios";


function ReportWaste() {
  const [files, setFiles] = useState([]);

  const [formData, setFormData] = useState({
    imageUrls: [],
    description: "",
    location: "",
  });

  console.log(formData);

  const handleImageSubmit = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior

    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      try {
        const urls = await Promise.all(
          Array.from(files).map((file) => storeImage(file))
        );
        setFormData((prevData) => ({
          ...prevData,
          imageUrls: [...prevData.imageUrls, ...urls],
        }));
        message.success("All IMAGES UPLOADED SUCCESSFULLY");
      } catch (error) {
        console.error("Image upload failed:", error);
        message.error("IMAGE UPLOAD FAILED");
      }
    } else {
      message.error("PLEASE UPLOAD AT LEAST 1 AND AT MOST 6 IMAGES");
    }
  };

  const storeImage = (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = `${new Date().getTime()}_${file.name}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  };

  //remove image
  const handleRemoveImage = (index) => () => {
    setFormData((prevData) => ({
      ...prevData,
      imageUrls: prevData.imageUrls.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.imageUrls.length < 1) {
      message.error("PLEASE UPLOAD AT LEAST 1 IMAGE");
      return;
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_API}/api/v1/reportWaste/create`,
        formData
      );
      if (data?.error) {
        message.error(data.error);
      } else {
        message.success("WASTE REPORTED SUCCESSFULLY");
        setFormData({
          imageUrls: [],
          description: "",
          location: "",
        });
      }
    } catch (error) {
      console.error("Waste report failed:", error);
      message.error("WASTE REPORT FAILED");
    }
  };

  return (
    <Layout title={"ReportWastePage-Waste Management"}>
      <div className="p-3 max-w-5xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-lg mb-12"
        >
          <div className="mb-8">
            <label
              htmlFor="waste-image"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Upload Waste Image
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-green-500 transition-colors duration-300">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="waste-images"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="waste-images"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      multiple
                      onChange={(e) => setFiles(e.target.files)}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
          <button
            type="submit"
            onClick={handleImageSubmit}
            className="w-full mb-8 bg-slate-600 hover:bg-slate-700 text-white py-3 text-lg rounded-xl transition-colors duration-300"
          >
            UPLOAD IMAGES
          </button>

          {
            // Display the uploaded images
            formData.imageUrls.length > 0 && (
              <div className="">
                {formData.imageUrls.map((url, index) => (
                  <div
                    key={index}
                    className="flex justify-between p-3 border items-center"
                  >
                    <img
                      src={url}
                      alt="waste"
                      className="w-40 h-20 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage(index)}
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                    >
                      DELETE
                    </button>
                  </div>
                ))}
              </div>
            )
          }
          <div className="flex flex-col gap-2 mt-3">
            <input
              type="text"
              id="description"
              name="description"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
              placeholder="Enter Description"
              onChange={handleChange}
              value={formData.description}
              required
            />
            <input
              type="text"
              id="location"
              name="location"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
              placeholder="Enter Location"
              onChange={handleChange}
              value={formData.location}
              required
            />
            <button
              type="submit"
              className="w-full mb-8 bg-green-600 hover:bg-green-700 text-white py-3 text-lg rounded-xl transition-colors duration-300"
            >
              REPORT WASTE
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default ReportWaste;
