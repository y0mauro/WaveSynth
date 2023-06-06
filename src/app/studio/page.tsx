"use client"; // This is a client component 👈🏽

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { WaveSurfer } from 'wavesurfer-react';
import AudioPlayer from "./Audioplayer.tsx"

const SoundWaveUploader = () => {


  return(
      <div className='flex'>
      <AudioPlayer></AudioPlayer>
        <AudioPlayer></AudioPlayer>
      </div>
  )


};

export default SoundWaveUploader;
