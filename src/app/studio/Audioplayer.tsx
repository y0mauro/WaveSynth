import React, { useRef, useState } from "react";



const Audioplayer: React.FC = () => {
  let isFiltering = false;

  let animationController: number;
  const [file, setFile] = useState<File | null>(null);
  const [volume, setVolume] = useState<number>(1.0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const source = useRef<MediaElementAudioSourceNode>();
  const analyzer = useRef<AnalyserNode>();
  const audioContext = new AudioContext();
  const gainNode = audioContext.createGain();
  const filterNode = audioContext.createBiquadFilter();
  filterNode.type = "lowpass";

  // creating the EQFilters

  const lowFilter = new BiquadFilterNode(audioContext, {type: "lowshelf", frequency:200, })
  const midFilter = new BiquadFilterNode(audioContext, {type: "peaking", frequency:500})
  const highFilter = new BiquadFilterNode(audioContext, {type:"highshelf", frequency:8000})

  const buffer = new AudioBufferSourceNode(audioContext);

  const handleAudioPlay = () => {
    if (!source.current) {
      source.current = audioContext.createMediaElementSource(audioRef.current!);
      analyzer.current = audioContext.createAnalyser();
      source.current.connect(analyzer.current);
      analyzer.current.connect(gainNode);
      gainNode.connect(audioContext.destination);
    }
    visualizeData();
  };

  const visualizeData = () => {
    animationController = window.requestAnimationFrame(visualizeData);
    if (audioRef.current!.paused) {
      return cancelAnimationFrame(animationController);
    }
    const songData = new Uint8Array(140);
    analyzer.current!.getByteFrequencyData(songData);
    const bar_width = 3;
    let start = 0;
    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    for (let i = 0; i < songData.length; i++) {
      start = i * 4;
      let gradient = ctx.createLinearGradient(
        0,
        0,
        canvasRef.current!.width,
        canvasRef.current!.height
      );
      gradient.addColorStop(0.2, "#2392f5");
      gradient.addColorStop(0.5, "#fe0095");
      gradient.addColorStop(1.0, "purple");

      ctx.fillStyle = gradient;
      ctx.fillRect(start, canvasRef.current!.height, bar_width, -songData[i]);
    }
  };

  const onVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Volume is now " + event.target.value);
    //setVolume(parseFloat(event.target.value));

    gainNode.gain.value = parseFloat(event.target.value);
  };
    function onHighShelfChange(event: React.ChangeEvent<HTMLInputElement>) {

      highFilter.gain.value = parseFloat(event.target.value);
      connectEQ();

  }

  function onMidShelfChange(event: React.ChangeEvent<HTMLInputElement>) {
    midFilter.gain.value = parseFloat(event.target.value);
    connectEQ();
  }

  function onLowShelfChange(event: React.ChangeEvent<HTMLInputElement>) {
    lowFilter.gain.value = parseFloat(event.target.value);
    connectEQ();
  }

  function connectEQ(){
      source.current!.disconnect();
      analyzer.current = audioContext.createAnalyser()
      source.current.connect(analyzer.current);
      analyzer.current!.connect(lowFilter)
      lowFilter.connect(midFilter);
      midFilter.connect(highFilter);
      highFilter.connect(gainNode);
      gainNode.connect(audioContext.destination);
      visualizeData();
  }

  const handleFilterButtonPressed = () => {
    isFiltering = !isFiltering;
    if (isFiltering) {
      source.current!.disconnect();
      source.current!.connect(filterNode);
      filterNode.connect(gainNode);
      gainNode.connect(audioContext.destination);
    } else {
      source.current!.connect(gainNode);
      gainNode.connect(audioContext.destination);
    }
  };

  const onFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    source.current!.disconnect();
      filterNode.frequency.value = parseFloat(event.target.value);
      analyzer.current = audioContext.createAnalyser()
      source.current.connect(analyzer.current);
      analyzer.current!.connect(filterNode);
      filterNode.connect(gainNode);
      gainNode.connect(audioContext.destination);
    visualizeData();
  };

  return (
    <div className="grid gap-1 m-5 h-fit p-6 shadow-2xl">
      <input
        type="file"
        onChange={({ target: { files } }) => files![0] && setFile(files![0])}
        id="userInput"
        className="w-full py-2 px-4  border-purple-800	 border-1  rounded-md font-medium  text-white placeholder-white focus:outline-none focus:ring-2"
      />

      {file && (
        <audio
          ref={audioRef}
          onPlay={handleAudioPlay}
          src={window.URL.createObjectURL(file)}
          controls
          className="w-full  rounded-md shadow"
        />
      )}

      Volume
<input
  id="audioPlayerGainControl"
  className=" accent-purple-700"
  onChange={onVolumeChange}
  type="range"
  min="0"
  max="1"
  step="0.01"
  value="1"
/>
      Low
      <input
          id="lowShelfControl"
          className=" accent-purple-700"
          onChange={onLowShelfChange}
          type="range"
          min="-50"
          max="20"
          step="0.1"
          value="1"

      />

      Mid
      <input
          id="midShelfControl"
          className=" accent-purple-700"
          onChange={onMidShelfChange}
          type="range"
          min="-50"
          max="20"
          step="0.1"
          value="1"
      />

      High
      <input
          id="highShelfControl"
          className=" accent-purple-700"
          onChange={onHighShelfChange}
          type="range"
          min="-50"
          max="50"
          step="0.1"
          value="1"
      />
      LowpassFilter
      <input
          id="audioFilterControl"
          onChange={onFilterChange}
          className=" accent-purple-700"
          type="range"
          min="0"
          max="3000"
          step="5"
          value="2000"
      ></input>



      <canvas ref={canvasRef} width={500} height={200} id="canvasVisualizer" />

      {/*<button id="audioFilterControl" onClick={handleFilterButtonPressed}>Apply Filter</button>*/}
    </div>
  );
};

export default Audioplayer;
