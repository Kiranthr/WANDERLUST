import { createRequire } from "module";
const require = createRequire(import.meta.url);

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "AIRBNB_DEV",
    allowed_formats: ["jpg", "jpeg", "png", "webp"]
  }
});
// console.log("CLOUD NAME:", process.env.CLOUD_NAME);
// console.log("API KEY:", process.env.CLOUD_API_KEY ? "LOADED ✅" : "NOT LOADED ❌");


export { cloudinary, storage };
