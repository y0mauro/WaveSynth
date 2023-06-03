"use client"; // This is a client component 👈🏽

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { WaveSurfer } from 'wavesurfer-react';

const SoundWaveUploader = () => {
  const [uploadedTrack, setUploadedTrack] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const uploadedFile = acceptedFiles[0];
      setUploadedTrack(URL.createObjectURL(uploadedFile));
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="max-w-md mx-auto p-4">
      <div
        {...getRootProps()}
        className="bg-gray-200 border-2 border-dashed p-8 rounded-lg text-center cursor-pointer"
      >
        <input {...getInputProps()} />
        <p className="text-gray-600">
          Drag and drop a music track here, or click to select a file.
        </p>
      </div>
      {uploadedTrack && (
        <div className="mt-4">
          <WaveSurfer   />
        </div>
      )}
    </div>
  );
};

export default SoundWaveUploader;
