import { useState } from "react";

export const useImageUpload = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
      const newPreview = URL.createObjectURL(file);
      setImage(file);
      setPreview(newPreview);
    }
  };
  const resetImage = () => {
    if (preview) URL.revokeObjectURL(preview);
    setImage(null);
    setPreview(null);
  };

  return { image, preview, handleImageChange , setImage, setPreview, resetImage};
};
