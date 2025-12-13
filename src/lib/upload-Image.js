import cloudinary from "./cloudinary";

export const UploadImage = async (file, folder) => {
  const buffer = await file.arrayBuffer();
  const bytes = Buffer.from(buffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
          folder,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      )
      .end(bytes);
  });
};