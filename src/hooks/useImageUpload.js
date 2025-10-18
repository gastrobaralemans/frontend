import { useState } from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD;
const UPLOAD_PRESET = "gastrobar_post";

export default function useImageUpload() {
  const [loading, setLoading] = useState(false);

  const subir = (file) =>
    new Promise((resolve, reject) => {
      setLoading(true);
      Resizer.imageFileResizer(
        file,
        1280, 720, "JPEG", 85, 0,
        (uri) => {
          const fd = new FormData();
          fd.append("file", uri);
          fd.append("upload_preset", UPLOAD_PRESET);
          axios
            .post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, fd)
            .then(res => {
              setLoading(false);
              resolve(res.data.secure_url);
            })
            .catch(err => {
              setLoading(false);
              reject(err);
            });
        },
        "blob"
      );
    });

  return { subir, loading };
}