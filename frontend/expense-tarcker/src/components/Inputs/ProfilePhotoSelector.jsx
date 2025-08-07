import { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(image || null);

  const handleImageChange = (e) => {
    const file = e.target.files[0]; 
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (inputRef.current) {
      inputRef.current.value = ""; 
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!previewUrl ? (
        <div className="w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative">
          <LuUser className="text-4xl text-primary" />
          <button
            type="button"
            onClick={onChooseFile}
            className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1"
          >
            <LuUpload className="cursor-pointer" />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewUrl}
            alt="profile preview"
            className="w-20 h-20 object-cover rounded-full"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="w-8 h-8 flex items-center justify-center cursor-pointer bg-red-500 text-white rounded-full absolute -bottom-1 -right-1"
          >
            <LuTrash className="text-sm" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;