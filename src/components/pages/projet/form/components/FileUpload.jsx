"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import { FiUpload, FiX, FiFile, FiImage, FiVideo } from "react-icons/fi";

export default function FileUpload({ onFilesChange, isSubmitting }) {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    addFiles(selectedFiles);
  };

  const addFiles = (selectedFiles) => {
    // Filtrer les fichiers pour n'accepter que les images et vidéos
    const validFiles = selectedFiles.filter((file) => {
      return file.type.startsWith("image/") || file.type.startsWith("video/");
    });

    // Limiter à 5 fichiers maximum
    const newFiles = [...files, ...validFiles].slice(0, 5);

    setFiles(newFiles);
    onFilesChange(newFiles);
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    onFilesChange(newFiles);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files.length > 0) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  const getFileIcon = (file) => {
    if (file.type.startsWith("image/")) {
      return <FiImage className="text-accent" />;
    } else if (file.type.startsWith("video/")) {
      return <FiVideo className="text-accent" />;
    }
    return <FiFile className="text-accent" />;
  };

  const getFilePreview = (file) => {
    if (file.type.startsWith("image/")) {
      return URL.createObjectURL(file);
    }
    return null;
  };

  return (
    <div className="space-y-4">
      <label className="block text-whiteGray  font-medium mb-2">
        <h3 className="text-xl font-semibold text-whiteAmber"> Ajouter des images ou vidéos</h3>
      </label>

      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragging ? "border-accent bg-accent/10" : "border-gray-600 hover:border-accent/50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          accept="image/*,video/*"
          className="hidden"
          disabled={isSubmitting}
        />

        <FiUpload className="mx-auto h-12 w-12 text-accent" />
        <p className="mt-2  text-whiteGray ">
          Glissez-déposez des fichiers ici ou cliquez pour parcourir
        </p>
        <p className="text-xs text-whiteStone mt-1">
          Formats acceptés : images (JPG, PNG, GIF) et vidéos (MP4, MOV)
        </p>
        <p className="text-xs text-whiteStone mt-1">Maximum 5 fichiers, 10 Mo par fichier</p>
      </div>

      {files.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-whiteGray mb-2">Fichiers sélectionnés ({files.length}/5):</p>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-primary-dark/50 p-3 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  {getFilePreview(file) ? (
                    <Image
                      src={getFilePreview(file)}
                      alt={file.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 object-cover rounded"
                    />
                  ) : (
                    <div className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded">
                      {getFileIcon(file)}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-whiteGray truncate">{file.name}</p>
                    <p className="text-xs text-gray-400">
                      {(file.size / (1024 * 1024)).toFixed(2)} Mo
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="text-gray-400 hover:text-accent transition-colors"
                  disabled={isSubmitting}
                >
                  <FiX className="h-5 w-5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
