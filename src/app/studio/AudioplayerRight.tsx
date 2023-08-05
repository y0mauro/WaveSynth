import { useRef, useState, useCallback, useEffect, memo } from "react";
import Leap, { Frame } from "leapjs";
// import { Frame} from 'leapjs';
import { useAppSelector, useAppDispatch } from "@/store";

import { setVolumeRight } from "@/store/slices/right/volume_slice";

import { setLowRight } from "@/store/slices/right/lowfilter_slice";
import { setMidRight } from "@/store/slices/right/midfilter_slice";
import { setHighRight } from "@/store/slices/right/highfilter_slice";
import { setDelayRight } from "@/store/slices/right/delay_slice";

// import { setLow } from "@/store/slices/low_slice";
// import { setMid } from "@/store/slices/lowfilter_slice";
// import {setHigh}  from "@/store/slices/lowfilter_slice";

const AudioplayerRight: React.FC = () => {
  let isFiltering = false;

  let animationController: number;
  const [file, setFile] = useState<File | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const source = useRef<MediaElementAudioSourceNode>();
  const analyzer = useRef<AnalyserNode>();
  const audioContext = new AudioContext();
  const gainNode = audioContext.createGain();
  const filterNode = audioContext.createBiquadFilter();
  const delayNode = audioContext.createDelay();

  //filterNode.type = "lowpass";
  // creating the EQFilters

  const lowFilter = new BiquadFilterNode(audioContext, {
    type: "lowshelf",
    frequency: 200,
  });
  const midFilter = new BiquadFilterNode(audioContext, {
    type: "peaking",
    frequency: 500,
  });
  const highFilter = new BiquadFilterNode(audioContext, {
    type: "highshelf",
    frequency: 8000,
  });

  const buffer = new AudioBufferSourceNode(audioContext);

  // here is every node connected

  const handleAudioPlay = () => {
    if (!source.current) {
      source.current = audioContext.createMediaElementSource(audioRef.current!);
      analyzer.current = audioContext.createAnalyser();
      source.current.connect(lowFilter);
      lowFilter.connect(midFilter);
      // here comes the mid
      // then the high
      midFilter.connect(highFilter);
      highFilter.connect(delayNode);
      delayNode.connect(gainNode);

      gainNode.connect(analyzer.current);

      analyzer.current.connect(audioContext.destination);
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
      gradient.addColorStop(0.2, "#ffd23f");
      gradient.addColorStop(0.5, "#ee4266");
      gradient.addColorStop(1.0, "purple");

      ctx.fillStyle = gradient;
      ctx.fillRect(start, canvasRef.current!.height, bar_width, -songData[i]);
    }
  };

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
  const handleMicrophone = () => {
    console.log("Microphone");
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream: MediaStream) => {
        const audioContext = new AudioContext();
        const microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(audioContext.destination);
        
      })
      .catch((err: Error) => {
        alert(err);
      });
  };

  return (
    <div className="grid gap-1  h-fit p-5   shadow-inner">
      <h2 className="text-[#FFA500] text-2xl	 font-semibold	">Track 2</h2>
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor="userInput1"
      >
        Upload file
      </label>

      <input
        type="file"
        accept=".mp3,audio/*"
        onChange={({ target: { files } }) => files![0] && setFile(files![0])}
        id="userInput"
        className="block appearance-none	 p-1 w-3/6 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
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

      <h2>Volume </h2>
      {gainNode && <VolumnControl gainNode={gainNode} />}
      
      <h2>High Control </h2>
      {filterNode && <HighControl highFilter={highFilter} />}
      <h2>Mid Control </h2>
      {filterNode && <MidControl midFilter={midFilter} />}
      <h2>Low Control </h2>
      {filterNode && <LowControl lowFilter={lowFilter} />}
      
      <button onClick={handleMicrophone}>Microfon</button>

      <canvas ref={canvasRef} width={500} height={200} id="canvasVisualizer" />

      {/*<button id="audioFilterControl" onClick={handleFilterButtonPressed}>Apply Filter</button>*/}
    </div>
  );
};

export default memo(AudioplayerRight);

function LowControl({ lowFilter }: { lowFilter: BiquadFilterNode }) {
  const lowShelfLeap = useAppSelector(
    (state) => state.lowFilterReducerRight.value
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    lowFilter.gain.value = lowShelfLeap;
  }, [lowShelfLeap]);
  const analyzer = useRef<AnalyserNode>();

  const onLowShelfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Low Shelf is now " + event.target.value);
    lowFilter.gain.value = parseFloat(event.target.value);
    dispatch(setLowRight(parseFloat(event.target.value)));
  };

  return (
    <div className="flex justify-around	 ">
      <input
        id="lowFilterControl"
        onChange={onLowShelfChange}
        className="w-11/12 accent-purple-700 focus:accent-[#ffd23f]"
        type="range"
        min="-20"
        max="20"
        step="0.1"
        value={lowShelfLeap}
      ></input>
      <span className="font-semibold"> {lowShelfLeap.toFixed(2)}</span>
    </div>
  );
}
function MidControl({ midFilter }: { midFilter: BiquadFilterNode }) {
  const midLeap = useAppSelector((state) => state.midFilterReducerRight.value);
  const dispatch = useAppDispatch();
  useEffect(() => {
    midFilter.gain.value = midLeap;
  }, [midLeap]);
  const analyzer = useRef<AnalyserNode>();
  const onMidChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Low  is now " + event.target.value);
    midFilter.gain.value = parseFloat(event.target.value);

    dispatch(setMidRight(parseFloat(event.target.value)));
  };

  return (
    <div className="flex justify-around	 ">
      <input
        id="MidControl"
        onChange={onMidChange}
        className="w-11/12 accent-purple-700 focus:accent-[#ffd23f]"
        type="range"
        min="-20"
        max="20"
        step="0.1"
        value={midLeap}
      ></input>
      <span className="font-semibold"> {midLeap.toFixed(2)}</span>
    </div>
  );
}
// High

function HighControl({ highFilter }: { highFilter: BiquadFilterNode }) {
  const highLeap = useAppSelector(
    (state) => state.highFilterReducerRight.value
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    highFilter.gain.value = highLeap;
  }, [highLeap]);
  const analyzer = useRef<AnalyserNode>();
  const onHighChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("high  is now " + event.target.value);
    highFilter.gain.value = parseFloat(event.target.value);

    dispatch(setHighRight(parseFloat(event.target.value)));
  };

  return (
    <div className="flex justify-around	 ">
      <input
        id="highControl"
        onChange={onHighChange}
        className="w-11/12 accent-purple-700 focus:accent-[#ffd23f]"
        type="range"
        min="-20"
        max="20"
        step="0.1"
        value={highLeap}
      ></input>
      <span className="font-semibold"> {highLeap.toFixed(2)}</span>
    </div>
  );
}

function DelayControl({ delayNode }: { delayNode: DelayNode }) {
  const delayLeap = useAppSelector((state) => state.delayReducerRight.value);
  const dispatch = useAppDispatch();
  useEffect(() => {
    delayNode.delayTime.value = delayLeap;
  }, [delayLeap]);
  const analyzer = useRef<AnalyserNode>();

  const onDelayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Delay is now " + event.target.value);
    delayNode.delayTime.value = parseFloat(event.target.value);
    dispatch(setDelayRight(parseFloat(event.target.value)));
  };

  return (
    <div className="flex justify-around	 ">
      <input
        id="delayControl"
        onChange={onDelayChange}
        className="w-11/12 accent-purple-700 focus:accent-[#ffd23f]"
        type="range"
        min="-0"
        max="1"
        step="0.1"
        value={delayLeap}
      ></input>
      <span className="font-semibold"> {delayLeap.toFixed(2)}</span>
    </div>
  );
}

function VolumnControl({ gainNode }: { gainNode: GainNode }) {
  const volumeleap = useAppSelector((state) => state.volumeReducerRight.value);
  const dispatch = useAppDispatch();
  useEffect(() => {
    gainNode.gain.value = volumeleap;
  }, [volumeleap, gainNode]);

  const onVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("my gain is" + gainNode.gain.value);

    dispatch(setVolumeRight(parseFloat(event.target.value)));

    gainNode.gain.value = parseFloat(event.target.value);
  };
  return (
    <div className="flex justify-around	 ">
      <input
        id="audioPlayerGainControl2"
        className="w-11/12 accent-purple-700 focus:accent-[#ffd23f]"
        onChange={onVolumeChange}
        type="range"
        min={0}
        max={1}
        step={0.1}
        value={volumeleap}
      />

      <span className="font-semibold"> {volumeleap.toFixed(2)}</span>
    </div>
  );
}
