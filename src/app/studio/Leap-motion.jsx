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
const LeapMotion = () => {
  const volume = useAppSelector((state) => state.volumeReducer.value);
  const lowfilter = useAppSelector((state) => state.lowFilterReducer.value);
  const delay = useAppSelector((state) => state.delayReducer.value);
  const dispatch = useAppDispatch();
  const [handVisible, setHandVisible] = useState(false);
  const [frish, setFrish] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Callback khi có dữ liệu từ Leap Motion
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
          <button className="info-button" onClick={openModal}>
            How do I use the virtual DJ?
          </button>
        </div>
      </div>
      {/* <div>
        {handVisible && <div>Volume: {volume}</div>}
        {!handVisible && <div>Volume error: {volume}</div>}
        <div>lowFilter: {lowfilter}</div>
        <div>Delay: {delay}</div>
        <div>Grabstrength: {frish}</div>
      </div> */}
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsOpen(false)}>
              &times;
            </span>
            <h1 style={{ fontSize: "1.5em", fontWeight: "bold" }}>General information:</h1>
            <p style={{ marginTop: "0.5em", marginBottom: "0.5em" }}></p>
            <p>Please keep in mind that the range is limited</p>
            <p>To have the best experience you should stay in the detection range of the controller</p>
            <p style={{ marginTop: "1em", marginBottom: "1em" }}></p>
            <h1 style={{ fontSize: "1.5em", fontWeight: "bold" }}>Volume controls:</h1>
            <p style={{ marginTop: "0.5em", marginBottom: "0.5em" }}></p>
            <p>Decide with which hand you want to use the virtual DJ </p>
            <p>If you want to use your left hand, then form a fist and extend your thumb</p>
            <p>Your thumb should point to the right and your palm downward</p>
            <p>Moving your hand upwards increases the volume</p>
            <p>Moving your hand downwards decreases the volume</p>
            <p style={{ marginTop: "1em", marginBottom: "1em" }}></p>
            <h1 style={{ fontSize: "1.5em", fontWeight: "bold" }}>Filter controls:</h1>
            <p style={{ marginTop: "0.5em", marginBottom: "0.5em" }}></p>
            <p>Hold your hand above the controller and hold an imaginary bottle horizontally in your hand</p>
            <p>Moving your hand to the right increases the value of the filter</p>
            <p>Moving your hand to the left decreases the value of the filter</p>
            <p style={{ marginTop: "1em", marginBottom: "1em" }}></p>
            <h1 style={{ fontSize: "1.5em", fontWeight: "bold" }}>Changing filters:</h1>
            <p style={{ marginTop: "0.5em", marginBottom: "0.5em" }}></p>
            <p>To change the filter you should hold your fully opened hand above the controller</p>
            <p>Your palm should now face the controller</p>
            <p>Moving the hand upwards or downwards can change them</p>
            <p>The levels of filter control are based on the structure of the Studio page</p>
          </div>
        </div>
      )}

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