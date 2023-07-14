import { useRef, useState, useCallback, useEffect, memo } from "react";
import Leap, { Frame } from "leapjs";
// import { Frame} from 'leapjs';
import { useAppSelector, useAppDispatch } from "@/store";

import { setVolume } from "@/store/slices/volume_slice";

import { setLow } from "@/store/slices/lowfilter_slice";
import { setMid } from "@/store/slices/midfilter_slice";
import { setHigh } from "@/store/slices/highfilter_slice";
import { setDelay } from "@/store/slices/delay_slice";

// import { setLow } from "@/store/slices/low_slice";
// import { setMid } from "@/store/slices/lowfilter_slice";
// import {setHigh}  from "@/store/slices/lowfilter_slice";

const Audioplayer: React.FC = () => {
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
      gradient.addColorStop(0.2, "#2392f5");
      gradient.addColorStop(0.5, "#fe0095");
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

  return (
    <div className="grid gap-1  h-fit  p-5 shadow-inner-2xl">
      <h2 className="text-[#FFA500] text-2xl	 font-semibold	">Track 1</h2>
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
        className="block appearance-none w-3/6	 p-1  text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
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
      <h2>Low Control </h2>
      {filterNode && <LowControl lowFilter={lowFilter} />}
      <h2>Mid Control </h2>
      {filterNode && <MidControl midFilter={midFilter} />}
      <h2>High Filter </h2>
      {filterNode && <HighControl highFilter={highFilter} />}
      <h2>Delay </h2>
      {filterNode && <DelayControl delayNode={delayNode} />}

      <canvas ref={canvasRef} width={500} height={200} id="canvasVisualizer" />

      {/*<button id="audioFilterControl" onClick={handleFilterButtonPressed}>Apply Filter</button>*/}
    </div>
  );
};

export default memo(Audioplayer);

function LowControl({ lowFilter }: { lowFilter: BiquadFilterNode }) {
  const lowShelfLeap = useAppSelector((state) => state.lowFilterReducer.value);
  const dispatch = useAppDispatch();
  useEffect(() => {
    lowFilter.gain.value = lowShelfLeap;
  }, [lowShelfLeap]);
  const analyzer = useRef<AnalyserNode>();

  const onLowShelfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Low Shelf is now " + event.target.value);
    lowFilter.gain.value = parseFloat(event.target.value);
    dispatch(setLow(parseFloat(event.target.value)));
  };

  return (
    <div className="flex justify-around">
      <input
        id="lowFilterControl"
        onChange={onLowShelfChange}
        className="w-11/12 accent-purple-700 focus:accent-[#2392f5]"
        type="range"
        min="-50"
        max="20"
        step="0.1"
        value={lowShelfLeap}
      ></input>
      <span className="font-semibold"> {lowShelfLeap}</span>
    </div>
  );
}
function MidControl({ midFilter }: { midFilter: BiquadFilterNode }) {
  const midLeap = useAppSelector((state) => state.midFilterReducer.value);
  const dispatch = useAppDispatch();
  useEffect(() => {
    midFilter.gain.value = midLeap;
  }, [midLeap]);
  const analyzer = useRef<AnalyserNode>();
  const onMidChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Low  is now " + event.target.value);
    midFilter.gain.value = parseFloat(event.target.value);

    dispatch(setMid(parseFloat(event.target.value)));
  };

  return (
    <div className="flex justify-around">
      <input
        id="MidControl"
        onChange={onMidChange}
        className="w-11/12 accent-purple-700 focus:accent-[#2392f5]"
        type="range"
        min="-20"
        max="20"
        step="0.1"
        value={midLeap}
      ></input>
      <span className="font-semibold"> {midLeap}</span>
    </div>
  );
}
// High

function HighControl({ highFilter }: { highFilter: BiquadFilterNode }) {
  const highLeap = useAppSelector((state) => state.highFilterReducer.value);
  const dispatch = useAppDispatch();
  useEffect(() => {
    highFilter.gain.value = highLeap;
  }, [highLeap]);
  const analyzer = useRef<AnalyserNode>();
  const onHighChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("high  is now " + event.target.value);
    highFilter.gain.value = parseFloat(event.target.value);

    dispatch(setHigh(parseFloat(event.target.value)));
  };

  return (
    <div className="flex justify-around">
      <input
        id="highControl"
        onChange={onHighChange}
        className="w-11/12 accent-purple-700 focus:accent-[#2392f5]"
        type="range"
        min="-20"
        max="20"
        step="0.1"
        value={highLeap}
      ></input>
      <span className="font-semibold"> {highLeap}</span>
    </div>
  );
}

function DelayControl({ delayNode }: { delayNode: DelayNode }) {
  const delayLeap = useAppSelector((state) => state.delayReducer.value);
  const dispatch = useAppDispatch();
  useEffect(() => {
    delayNode.delayTime.value = delayLeap;
  }, [delayLeap]);
  const analyzer = useRef<AnalyserNode>();

  const onDelayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Delay is now " + event.target.value);
    delayNode.delayTime.value = parseFloat(event.target.value);
    dispatch(setDelay(parseFloat(event.target.value)));
  };

  return (
    <div className="flex justify-around">
      <input
        id="delayControl"
        onChange={onDelayChange}
        className="w-11/12 accent-purple-700 focus:accent-[#2392f5]"
        type="range"
        min="-0"
        max="1"
        step="0.1"
        value={delayLeap}
      ></input>

      <span className="font-semibold"> {delayLeap}</span>
    </div>
  );
}

// low
/*
function LowControl({ gainNode,source,lowFilter,midFilter,audioContext}: {audioContext:AudioContext,  lowFilter:BiquadFilterNode,  midFilter:BiquadFilterNode, gainNode:GainNode,source :MediaElementAudioSourceNode |undefined}) {
  const lowLeap = useAppSelector(state => state.lowFilterReducer.value);
  useEffect(() => {
    lowFilter.gain.value = (lowLeap);

    
    // source!.disconnect();
     const analyzer = useRef<AnalyserNode>();
       analyzer.current = audioContext.createAnalyser()
       source!.connect(analyzer.current);
       analyzer.current!.connect(lowFilter);
       lowFilter.connect(gainNode);
       gainNode.connect(audioContext.destination);
       
 
     dispatch(setLow(lowLeap));
    
  },[lowLeap,lowFilter.gain.value])

  
  const dispatch = useAppDispatch();

  console.log(" Hallo im source, can u see me ?"+source)
  
  
  //const analyzer = useRef<AnalyserNode>();

  const onLowChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   
    lowFilter.gain.value = parseFloat(event.target.value);
   // source!.disconnect();
    const analyzer = useRef<AnalyserNode>();
      analyzer.current = audioContext.createAnalyser()
      source!.connect(analyzer.current);
      analyzer.current!.connect(lowFilter);
      lowFilter.connect(gainNode);
      gainNode.connect(audioContext.destination);
      

    dispatch(setLow(parseFloat(event.target.value)));
  };
  
  return <input
  id="lowControl"
  onChange={onLowChange}
  className=" accent-purple-700"
  type="range"
  min="-20"
  max="20"
  step="5"
  value={lowLeap}
></input>
}
*/

// Mid

/*
function MidControl({ gainNode,source,lowFilter, midFilter,highFilter,audioContext}: {audioContext:AudioContext,  midFilter:BiquadFilterNode, lowFilter:BiquadFilterNode,  highFilter:BiquadFilterNode,  gainNode:GainNode,source :MediaElementAudioSourceNode|undefined }) {
  const midLeap = useAppSelector(state => state.midReducer.value);
  const dispatch = useAppDispatch();
  useEffect(() => {
    midFilter.gain.value = (midLeap);
  },[midLeap,gainNode])
  const analyzer = useRef<AnalyserNode>();
  const onMidChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Low  is now " + event.target.value);
    midFilter.gain.value = parseFloat(event.target.value);
    source!.disconnect();
      
      source!.connect(lowFilter);
      lowFilter.connect(midFilter)
      midFilter.connect(highFilter);
      highFilter.connect(gainNode)
      gainNode.connect(analyzer)
      analyzer.connect(audioContext.destination)

    dispatch(setHigh(parseFloat(event.target.value)));
  };
  
  return <input
  id="MidControl"
  onChange={onMidChange}
  className=" accent-purple-700"
  type="range"
  min="-20"
  max="20"
  step="0.1"
  value={midLeap}
></input>
}


// High 

function HighControl({ gainNode,source,lowFilter, midFilter,highFilter,audioContext}: {audioContext:AudioContext,  midFilter:BiquadFilterNode, lowFilter:BiquadFilterNode,  highFilter:BiquadFilterNode,  gainNode:GainNode,source :MediaElementAudioSourceNode|undefined }) {
  const highLeap = useAppSelector(state => state.highReducer.value);
  const dispatch = useAppDispatch();
  useEffect(() => {
    highFilter.gain.value = (highLeap);
  },[highLeap,gainNode])
  const analyzer = useRef<AnalyserNode>();
  const onHighChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("high  is now " + event.target.value);
    highFilter.gain.value = parseFloat(event.target.value);
    source!.disconnect();
      
      source!.connect(lowFilter);
      lowFilter.connect(midFilter)
      midFilter.connect(highFilter);
      highFilter.connect(gainNode)
      gainNode.connect(analyzer)
      analyzer.connect(audioContext.destination)

    dispatch(setHigh(parseFloat(event.target.value)));
  };
  
  return <input
  id="highControl"
  onChange={onHighChange}
  className=" accent-purple-700"
  type="range"
  min="-20"
  max="20"
  step="0.1"
  value={highLeap}
></input>
}
*/

function VolumnControl({ gainNode }: { gainNode: GainNode }) {
  const volumeleap = useAppSelector((state) => state.volumeReducer.value);
  const dispatch = useAppDispatch();
  useEffect(() => {
    gainNode.gain.value = volumeleap;
  }, [volumeleap, gainNode]);

  const onVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("my gain is" + gainNode.gain.value);

    dispatch(setVolume(parseFloat(event.target.value)));

    gainNode.gain.value = parseFloat(event.target.value);
  };
  return (
    <div className="flex justify-around">
      <input
        id="audioPlayerGainControl2"
        className="w-11/12 accent-purple-700 focus:accent-[#2392f5]"
        onChange={onVolumeChange}
        type="range"
        min={0}
        max={1}
        step={0.1}
        value={volumeleap}
      />

      <span className="font-semibold"> {volumeleap}</span>
    </div>
  );
}
