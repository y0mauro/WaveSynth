"use client";
import React, { useEffect, useState } from "react";
import Leap from "leapjs";
import Audioplayer from "./AudioplayerLeft";
import { useAppDispatch, useAppSelector } from "@/store";
import { setVolume } from "@/store/slices/volume_slice";
import { setLow } from "@/store/slices/lowfilter_slice";
import { setHigh } from "@/store/slices/highfilter_slice";
import { setMid } from "@/store/slices/midfilter_slice";
import { setDelay } from "@/store/slices/delay_slice";
import { setVolumeRight } from "@/store/slices/right/volume_slice";
import { setLowRight } from "@/store/slices/right/lowfilter_slice";
import { setMidRight } from "@/store/slices/right/midfilter_slice";
import { setHighRight } from "@/store/slices/right/highfilter_slice";
import { setDelayRight } from "@/store/slices/right/delay_slice";
import AudioplayerRight from "./AudioplayerRight";
import SoundWaveIcon from "../components/SoundWaveIcon";
import InstructionsModal from "../components/InstructionsModal";
const LeapMotion = () => {
  const volume = useAppSelector((state) => state.volumeReducer.value);
  const lowfilter = useAppSelector((state) => state.lowFilterReducer.value);
  const delay = useAppSelector((state) => state.delayReducer.value);
  const dispatch = useAppDispatch();
  const [handVisible, setHandVisible] = useState(false);
  const [frish, setFrish] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    // Callback khi có dữ liệu từ Leap Motion

    const escapeListener = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", escapeListener);

    // Cleanup function to remove the listener when the component unmounts

    console.log("Leap Motion Run ");
    const handleFrame = (frame) => {
      if (frame.hands.length > 0) {
        const leftHand = frame.hands.find((hand) => hand.type === "left");
        const rightHand = frame.hands.find((hand) => hand.type === "right");
        if (leftHand) {
          const leftHandPosition = leftHand.palmPosition;
          const leftY = leftHandPosition[1];
          const leftX = leftHandPosition[0];
          const leftZ = leftHandPosition[2];
          const frishLeft = leftHand.grabStrength;
          if (frishLeft === 1) {
            console.log("left hand thay volume");
            const newVolume = mapRange(leftY, 50, 400, 0, 1);
            setVolume(newVolume);
            dispatch(setVolume(newVolume));
            if (leftZ) {
              const newDelay = mapRange(leftZ, 50, 400, 0, 1);
              setDelay(newDelay);
              dispatch(setDelay(newDelay));
            }
          }
          const newFilterValue = mapRange(leftX, -150, 150, -50, 20);
          if (leftY > 50 && leftY < 100 && frishLeft > 0.3 && frishLeft < 0.8) {
            dispatch(setLow(newFilterValue));
          } else if (
            leftY > 200 &&
            leftY < 300 &&
            frishLeft > 0.3 &&
            frishLeft < 0.8
          ) {
            dispatch(setMid(newFilterValue));
          } else if (leftY > 350 && frishLeft > 0.3 && frishLeft < 0.8) {
            dispatch(setHigh(newFilterValue));
          }
        } else if (rightHand) {
          const rightHandPosition = rightHand.palmPosition;
          const rightY = rightHandPosition[1];
          const rightX = rightHandPosition[0];
          const rightZ = rightHandPosition[2];
          const frishRight = rightHand.grabStrength;
          if (frishRight === 1) {
            console.log("right hand thay volume is ");
            const newVolume = mapRange(rightY, 50, 400, 0, 1);
            setVolumeRight(newVolume);
            dispatch(setVolumeRight(newVolume));
            if (rightZ) {
              const newDelay = mapRange(rightZ, 50, 400, 0, 1);
              setDelayRight(newDelay);
              dispatch(setDelayRight(newDelay));
            }
          }
          const newFilterValue = mapRange(rightX, -150, 150, -50, 20);
          if (
            rightY > 50 &&
            rightY < 100 &&
            frishRight > 0.3 &&
            frishRight < 0.8
          ) {
            dispatch(setLowRight(newFilterValue));
          } else if (
            rightY > 200 &&
            rightY < 300 &&
            frishRight > 0.3 &&
            frishRight < 0.8
          ) {
            dispatch(setMidRight(newFilterValue));
          } else if (rightY > 350 && frishRight > 0.3 && frishRight < 0.8) {
            dispatch(setHighRight(newFilterValue));
          }
        }
      }
    };

    // Kết nối Leap Motion
    const controller = new Leap.Controller();
    controller.connect();

    controller.on("deviceConnected", () => {
      console.log("Leap device has been connected.");
      setIsConnected(true);
    });

    controller.on("deviceDisconnected", () => {
      console.log("Leap device has been disconnected.");
      setIsConnected(false);
    });

    // Đăng ký callback cho sự kiện frame
    controller.on("frame", handleFrame);

    // Hủy đăng ký callback khi component unmount
    return () => {
      controller.disconnect();
    };
  }, []);

  // Hàm chuyển đổi giá trị trong khoảng
  const mapRange = (value, inMin, inMax, outMin, outMax) => {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  };

  // Info-Popup
  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-4xl p-5 font-bold mb-6">
          {" "}
          Studio <SoundWaveIcon color="orange" />
        </h2>
        <div className="info-container">
          <div className="grid gap-1">
            <button
              className="text-gray-900
             bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4
              focus:ring-gray-200 font-medium rounded-lg text-sm px-2.5 py-1 mr-2 mb-2 dark:bg-gray-800
               dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600
                dark:focus:ring-gray-700"
              onClick={openModal}
            >
              <span> How do I use WaveSynth? </span>
              <SoundWaveIcon color="orange" className="pr-1"></SoundWaveIcon>
            </button>

            <div
              className={`py-2 px-4 rounded-full border-2 focus:outline-none text-white ${
                isConnected
                  ? "border-green-700 text-green-700 "
                  : "border-red-700 text-red-700"
              }`}
            >
              {isConnected
                ? "Leap Motion Connected"
                : "Leap Motion Disconnected"}
            </div>
          </div>
        </div>
      </div>
      {/* <div>
        {handVisible && <div>Volume: {volume}</div>}
        {!handVisible && <div>Volume error: {volume}</div>}
        <div>lowFilter: {lowfilter}</div>
        <div>Delay: {delay}</div>
        <div>Grabstrength: {frish}</div>
      </div> */}
      {isOpen && <InstructionsModal isOpen={isOpen} onClose={closeModal} />}

      <div className="grid grid-cols-2 gap-10">
        <Audioplayer />
        <AudioplayerRight />
      </div>
    </div>
  );
};

const Hand = () => {
  return <div>Co tay</div>;
};

export default LeapMotion;
