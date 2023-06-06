import {useRef, useState} from "react";
import { analyze } from 'web-audio-beat-detector';

const Audioplayer = () => {
    let isFiltering = false ;

    let animationController;
    const [file, setFile] = useState(null);
    const canvasRef = useRef();
    const audioRef = useRef();
    const source = useRef();
    const analyzer = useRef();
    const audioContext = new AudioContext();
    const gainNode = audioContext.createGain();
    const filterNode =  audioContext.createBiquadFilter();
    filterNode.type = "lowpass";

    const buffer = new AudioBufferSourceNode(audioContext);


    const handleAudioPlay = () => {
        if (!source.current) {
            source.current = audioContext.createMediaElementSource(audioRef.current);
            analyzer.current = audioContext.createAnalyser();
            source.current.connect(analyzer.current);
            analyzer.current.connect(gainNode);
            gainNode.connect(audioContext.destination)

        }
        visualizeData();
    };

    // analyze(this.buffer)
    //     .then((tempo) => {
    //         console.log( "the tempo is: " +tempo)
    //     })
    //     .catch((err) => {
    //         // something went wrong
    //     });



    const visualizeData = () => {
        animationController = window.requestAnimationFrame(visualizeData);
        if (audioRef.current.paused) {
            return cancelAnimationFrame(animationController);
        }
        const songData = new Uint8Array(140);
        analyzer.current.getByteFrequencyData(songData);
        const bar_width = 3;
        let start = 0;
        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        for (let i = 0; i < songData.length; i++) {
            // compute x coordinate where we would draw
            start = i * 4;
            //create a gradient for the  whole canvas
            let gradient = ctx.createLinearGradient(
                0,
                0,
                canvasRef.current.width,
                canvasRef.current.height
            );
            gradient.addColorStop(0.2, "#2392f5");
            gradient.addColorStop(0.5, "#fe0095");
            gradient.addColorStop(1.0, "purple");

            ctx.fillStyle = gradient;
            ctx.fillRect(start, canvasRef.current.height, bar_width, -songData[i]);
        }
    };

    function onVolumeChange(event) {
        console.log("Volume is now "+event.target.value);
        gainNode.gain.value = event.target.value;
        event.target.setValue(event.target.value)
    }
    function handleFilterButtonPressed(){
        isFiltering = !isFiltering;
        if (isFiltering){
            source.current.disconnect()   // first of all disconnect the source
            source.current.connect (filterNode)
            filterNode.connect(gainNode)
            gainNode.connect(audioContext.destination)

        }
        else {
            source.current.connect(gainNode);
            gainNode.connect(audioContext.destination);

        }
    }

    function onFilterChange(event) {
        source.current.disconnect()   // first of all disconnect the source
        filterNode.frequency.value = event.target.value ;
        source.current.connect(filterNode);
        filterNode.connect(gainNode)
        gainNode.connect(audioContext.destination)
    }

    return (
        <div className="App">
            <input
                type="file"
                onChange={({ target: { files } }) => files[0] && setFile(files[0])}
                id="userInput"
            />
            {file && (
                <audio
                    ref={audioRef}
                    onPlay={handleAudioPlay}
                    src={window.URL.createObjectURL(file)}
                    controls
                />
            )}

            <input id="audioPlayerGainControl" onChange={onVolumeChange} type="range" min="0" max="1" step="0.01" value="1.0"></input>
            <canvas ref={canvasRef} width={500} height={200} id="canvasVisualizer" />
            <input id="audioFilterControl" onChange={onFilterChange} type="range" min="0" max="3000" step="5" value="2000"></input>
            {/*<button id="audioFilterControl" onClick={handleFilterButtonPressed}>Apply Filter</button>*/}
        </div>
    );
};
export default Audioplayer;
