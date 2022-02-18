import React from 'react'
import tippy from 'tippy.js';
import {roundArrow} from 'tippy.js';
import 'tippy.js/dist/svg-arrow.css';
import { useEffect } from 'react';

const Wheel = ({ emotionFunction, currentRoundEmotion, deletedRow, callRobot }) => {

  console.log(callRobot);

  if(!callRobot || callRobot[0]===''){
    callRobot=undefined
  }

  if (!deletedRow || deletedRow.length===0){
    deletedRow=["", "", ""]
  }

    useEffect(() => {
            tippy('#ecstacy', {
                content: 'Xtacy definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#admiration_x0D_', {
                content: 'admiration_x0D_ definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#sadness', {
                content: 'sadness definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#pensiveness', {
                content: 'pensiveness definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#joy_x0D_', {
                content: 'joy_x0D_ definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#serenity', {
                content: 'serenity definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#acceptance', {
                content: 'acceptance definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#trust', {
                content: 'trust definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#anticipation', {
                content: 'anticipation definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#anger', {
                content: 'anger definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#disgust', {
                content: 'disgust definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#surprise', {
                content: 'surprise definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#distraction', {
                content: 'distraction definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#boredom', {
                content: 'boredom definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#fear', {
                content: 'fear definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#apprehension', {
                content: 'apprehension definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#annoyance', {
                content: 'annoyance definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#interest', {
                content: 'interest definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#terror_x0D_', {
                content: 'terror_x0D_ definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#amazement_x0D_', {
                content: 'amazement_x0D_ definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#grief_x0D_', {
                content: 'grief_x0D_ definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#loathing_x0D_', {
                content: 'loathing_x0D_ definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#rage_x0D_', {
                content: 'rage_x0D_ definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#vigilance', {
                content: 'vigilance definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#love', {
                content: 'love definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#submission', {
                content: 'submission definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#awe', {
                content: 'awe definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#disapproval', {
                content: 'disapproval definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#remorse', {
                content: 'remorse definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#contempt_x0D_', {
                content: 'contempt_x0D_ definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#aggressiveness', {
                content: 'aggressiveness definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
              tippy('#optimism', {
                content: 'optimism definition',
                inertia: true, 
                placement: 'bottom-end',
                arrow: roundArrow,
                theme:"tomato"
              });
    }, [])

    return (
    <div style={{width:"500px"}}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 548 548">
        <g id="Layer_2" data-name="Layer 2">
          <path className={currentRoundEmotion && currentRoundEmotion!=="ACCEPTANCE"?"disabled":"cls-1"} d="M438.1,182.57a190.72,190.72,0,0,0-72.64-73.64l19.76-47.72a21.28,21.28,0,0,0,1.2-3.83,246.8,246.8,0,0,1,104,103.89,21.71,21.71,0,0,0-3.8,1.19Z"/>
          <path className="cls-2" d="M387.09,58.86A244.06,244.06,0,0,1,489,160.61a24,24,0,0,0-2.71.92l-47.73,19.78a191.66,191.66,0,0,0-71.82-72.81l19.43-46.9a23.92,23.92,0,0,0,.94-2.74m-1.42-3a20.38,20.38,0,0,1-1.37,5l-20.1,48.53a190.15,190.15,0,0,1,73.45,74.48L487,163.38A20.58,20.58,0,0,1,492,162,246.12,246.12,0,0,0,385.67,55.87Z"/>
          <path className={currentRoundEmotion && currentRoundEmotion!=="TRUST"?"disabled":"cls-3"} d="M437.65,183.84l-38.38,15.9a20.49,20.49,0,0,0-11.09,26.78l.21.48-2,.84a121.78,121.78,0,0,0-65.55-65.94l.83-2A20.49,20.49,0,0,0,348,148.6l16.25-39.24A190.15,190.15,0,0,1,437.65,183.84Z"/>
          <path className={currentRoundEmotion && currentRoundEmotion!=="ADMIRATION"?"disabled":"cls-4"} d="M386.37,227.84l-112.1,46.43L320.82,161.9A121.78,121.78,0,0,1,386.37,227.84Z"/>
          <path className={currentRoundEmotion && currentRoundEmotion!=="SERENITY"?"disabled":"cls-5"} d="M325.92,92a191.31,191.31,0,0,0-104.7-1.21l-19-45.93a21.17,21.17,0,0,0-1.88-3.56,245.4,245.4,0,0,1,147.06-.11,20.93,20.93,0,0,0-1.86,3.54Z"/>
          <path className="cls-2" d="M274,31a243,243,0,0,1,71.84,10.79,22,22,0,0,0-1.27,2.58L325.34,90.82A192.24,192.24,0,0,0,221.8,89.63L203.11,44.5a23.29,23.29,0,0,0-1.29-2.6A243,243,0,0,1,274,31m0-2a244.69,244.69,0,0,0-75.3,11.79,20.52,20.52,0,0,1,2.56,4.48L220.63,92A190.27,190.27,0,0,1,326.5,93.25l19.92-48.11A20.31,20.31,0,0,1,349,40.68,244.67,244.67,0,0,0,274,29Z"/>
          <path className={currentRoundEmotion && currentRoundEmotion!=="JOY"?"disabled":"cls-6"} d="M321.16,159.69l.49.19-.83,2a121.75,121.75,0,0,0-93.17-.19l-.84-2A20.49,20.49,0,0,0,237.62,133l-17-41A190.27,190.27,0,0,1,326.5,93.25l-16.43,39.66A20.49,20.49,0,0,0,321.16,159.69Z"/>
          <path className={currentRoundEmotion && currentRoundEmotion!=="ECSTACY"?"disabled":"cls-7"} d="M320.82,161.9,274.27,274.27,227.65,161.71a121.75,121.75,0,0,1,93.17.19Z"/>
          <path className={currentRoundEmotion && currentRoundEmotion!=="INTEREST"?"disabled":"cls-8"} d="M61.21,162.78a21.53,21.53,0,0,0-3.83-1.2,246.8,246.8,0,0,1,103.89-104,21.71,21.71,0,0,0,1.19,3.8l18.83,45.47a190.29,190.29,0,0,0-75.68,74.36Z"/>
          <path className="cls-2" d="M160.61,59a24,24,0,0,0,.92,2.71L180,106.36a191.35,191.35,0,0,0-74.84,73.54L61.6,161.85a23.92,23.92,0,0,0-2.74-.94A244.06,244.06,0,0,1,160.61,59M162,56A246.12,246.12,0,0,0,55.87,162.33a20.38,20.38,0,0,1,5,1.37l45.22,18.73a190,190,0,0,1,76.51-75.17L163.38,61A20.58,20.58,0,0,1,162,56Z"/>
          <path className={currentRoundEmotion && currentRoundEmotion!=="ANTICIPATION"?"disabled":"cls-9"} d="M227.65,161.71a121.7,121.7,0,0,0-65.94,65.94l-2-.84a20.5,20.5,0,0,0-11.1-26.76l-42.55-17.62a190,190,0,0,1,76.51-75.17l17.18,41.47a20.49,20.49,0,0,0,26.78,11.09l.29-.13Z"/>
          <path className={currentRoundEmotion && currentRoundEmotion!=="VIGILANCE"?"disabled":"cls-10"} d="M274.27,274.27,161.71,227.65a121.7,121.7,0,0,1,65.94-65.94Z"/>
          <path className={currentRoundEmotion && currentRoundEmotion!=="APPREHENSION"?"disabled":"cls-11"} d="M506.78,347.36a20.56,20.56,0,0,0-3.54-1.86l-48.58-20.12a191.23,191.23,0,0,0-.22-103l48.67-20.17a21.17,21.17,0,0,0,3.56-1.88,245.4,245.4,0,0,1,.11,147.06Z"/>
          <path className="cls-2" d="M506.1,201.82a244.49,244.49,0,0,1,.11,144,22,22,0,0,0-2.58-1.27l-47.77-19.78a192.19,192.19,0,0,0-.22-101.85l47.86-19.83a23.29,23.29,0,0,0,2.6-1.29m1.11-3.12a20.52,20.52,0,0,1-4.48,2.56l-49.5,20.51A190.17,190.17,0,0,1,453.46,326l49.4,20.46a20.31,20.31,0,0,1,4.46,2.54,246.37,246.37,0,0,0-.11-150.26Z"/>
          <path className={currentRoundEmotion && currentRoundEmotion!=="TERROR"?"disabled":"cls-12"} d="M395.46,274a120.92,120.92,0,0,1-9.28,46.62L274.27,274.27l112.1-46.43A121,121,0,0,1,395.46,274Z"/>
          <path className={currentRoundEmotion && currentRoundEmotion!=="FEAR"?"disabled":"cls-13"} d="M460.62,274.27A188.8,188.8,0,0,1,453.46,326l-38.37-15.89a20.49,20.49,0,0,0-26.78,11.09c0,.1-.08.2-.11.3l-2-.84a121.75,121.75,0,0,0,.19-92.78l2-.84A20.5,20.5,0,0,0,415,237.62l38.27-15.85A189.08,189.08,0,0,1,460.62,274.27Z"/>
          <path className={currentRoundEmotion && currentRoundEmotion!=="DISTRACTION"?"disabled":"cls-14"} d="M386.73,490.46a21.71,21.71,0,0,0-1.19-3.8l-19.6-47.33a190.68,190.68,0,0,0,72.56-74.1l48.29,20a21.53,21.53,0,0,0,3.83,1.2A246.8,246.8,0,0,1,386.73,490.46Z"/>
          <path className="cls-2" d="M438.94,366.5l47.46,19.65a23.92,23.92,0,0,0,2.74.94A244.06,244.06,0,0,1,387.39,489a24,24,0,0,0-.92-2.71L367.2,439.76a191.57,191.57,0,0,0,71.74-73.26m-.89-2.54a190.13,190.13,0,0,1-73.37,74.94L384.62,487A20.58,20.58,0,0,1,386,492a246.12,246.12,0,0,0,106.15-106.3,20.38,20.38,0,0,1-5-1.37L438.05,364Z"/>
          <path className={currentRoundEmotion && currentRoundEmotion!=="AMAZEMENT"?"disabled":"cls-15"} d="M386.18,320.62a121.77,121.77,0,0,1-65.56,65.56L274.27,274.27Z"/>
          <path className={currentRoundEmotion && currentRoundEmotion!=="SURPRISE"?"disabled":"cls-16"} d="M438.05,364a190.13,190.13,0,0,1-73.37,74.94l-16.42-39.63a20.49,20.49,0,0,0-26.78-11.09h0l-.84-2a121.77,121.77,0,0,0,65.56-65.56l2,.84A20.48,20.48,0,0,0,399.4,348Z"/>
          <path className={currentRoundEmotion && currentRoundEmotion!=="PENSIVENESS"?"disabled":"cls-17"} d="M274,518a243.7,243.7,0,0,1-73.36-11.22,20.56,20.56,0,0,0,1.86-3.54l18.85-45.49a191.31,191.31,0,0,0,105.09-1.39l19.38,46.75a21.17,21.17,0,0,0,1.88,3.56A243.7,243.7,0,0,1,274,518Z"/>
          <path className="cls-2" d="M325.87,457.58l19,45.92a23.29,23.29,0,0,0,1.29,2.6,244.49,244.49,0,0,1-144,.11,22,22,0,0,0,1.27-2.58l18.5-44.69a192.37,192.37,0,0,0,103.94-1.36m1.15-2.44a190.29,190.29,0,0,1-106.26,1.41l-19.18,46.31a20.31,20.31,0,0,1-2.54,4.46,246.37,246.37,0,0,0,150.26-.11,20.52,20.52,0,0,1-2.56-4.48L327,455.14Z"/>
          <path className={currentRoundEmotion && currentRoundEmotion!=="GRIEF"?"disabled":"cls-18"} d="M320.62,386.18a121.75,121.75,0,0,1-92.78.19l46.43-112.1Z"/>
          <path className={currentRoundEmotion && currentRoundEmotion!=="SADNESS"?"disabled":"cls-19"} d="M327,455.14a190.29,190.29,0,0,1-106.26,1.41l17.17-41.46A20.49,20.49,0,0,0,227,388.38l.84-2a121.75,121.75,0,0,0,92.78-.19l.84,2A20.49,20.49,0,0,0,310.38,415Z"/>
          <path className={currentRoundEmotion && currentRoundEmotion!=="BOREDOM"?"disabled":"cls-20"} d="M161.58,490.62a246.8,246.8,0,0,1-104-103.89,21.71,21.71,0,0,0,3.8-1.19l44.19-18.31a190.25,190.25,0,0,0,75.88,74.56l-18.63,45A21.53,21.53,0,0,0,161.58,490.62Z"/>
          <path className="cls-2" d="M105.1,368.5a191.17,191.17,0,0,0,75,73.74L161.85,486.4a23.92,23.92,0,0,0-.94,2.74A244.06,244.06,0,0,1,59,387.39a24,24,0,0,0,2.71-.92l43.37-18M106,366,61,384.62A20.58,20.58,0,0,1,56,386a246.12,246.12,0,0,0,106.3,106.15,20.38,20.38,0,0,1,1.37-5l19-45.83A190,190,0,0,1,106,366Z"/>
          <path className={currentRoundEmotion && currentRoundEmotion!=="LOATHING"?"disabled":"cls-21"} d="M274.27,274.27l-46.43,112.1a121.78,121.78,0,0,1-65.94-65.55Z"/>
          <path className={currentRoundEmotion && currentRoundEmotion!=="DISGUST"?"disabled":"cls-22"} d="M227.84,386.37l-.84,2-.16-.07a20.5,20.5,0,0,0-26.79,11.09l-17.37,41.94A190,190,0,0,1,106,366l42.76-17.71a20.49,20.49,0,0,0,11.16-26.61l2-.83A121.78,121.78,0,0,0,227.84,386.37Z"/>
          <path className={currentRoundEmotion && currentRoundEmotion!=="ANNOYANCE"?"disabled":"cls-23"} d="M41.33,347.7a245.4,245.4,0,0,1-.11-147.06,20.56,20.56,0,0,0,3.54,1.86l44.17,18.3a191.13,191.13,0,0,0,0,106.79l-44,18.23A21.17,21.17,0,0,0,41.33,347.7Z"/>
          <path className="cls-2" d="M41.79,202.16a22,22,0,0,0,2.58,1.27l43.35,17.95a192.17,192.17,0,0,0,0,105.63L44.5,344.89a23.29,23.29,0,0,0-2.6,1.29,244.49,244.49,0,0,1-.11-144M40.68,199a246.37,246.37,0,0,0,.11,150.26,20.52,20.52,0,0,1,4.48-2.56L90.1,328.17a190.18,190.18,0,0,1,0-108l-45-18.64A20.31,20.31,0,0,1,40.68,199Z"/>
          <path className={currentRoundEmotion && currentRoundEmotion!=="RAGE"?"disabled":"cls-24"} d="M274.27,274.27,161.9,320.82a121.75,121.75,0,0,1-.19-93.17Z"/>
          <path className={currentRoundEmotion && currentRoundEmotion!=="ANGER"?"disabled":"cls-25"} d="M161.9,320.82l-2,.83c0-.06,0-.11-.07-.17A20.5,20.5,0,0,0,133,310.38L90.1,328.17a190.18,190.18,0,0,1,0-108l42.77,17.71a20.49,20.49,0,0,0,26.78-11.09v0l2,.84a121.75,121.75,0,0,0,.19,93.17Z"/>
          <path className={currentRoundEmotion && currentRoundEmotion!=="OPTIMISM"?"disabled":"cls-26"} d="M226.81,159.69l-.29.13a20.49,20.49,0,0,1-26.78-11.09l-17.18-41.47L163.38,61a20.46,20.46,0,0,1,11.1-26.78,20.5,20.5,0,0,1,26.78,11.09L220.63,92l17,41A20.49,20.49,0,0,1,226.81,159.69Z"/>
          <path className={currentRoundEmotion && currentRoundEmotion!=="AGGRESSIVENESS"?"disabled":"cls-27"} d="M159.7,226.81v0a20.49,20.49,0,0,1-26.78,11.09L90.14,220.22l-45-18.64A20.51,20.51,0,0,1,53,162.13a21.45,21.45,0,0,1,2.88.2,20.38,20.38,0,0,1,5,1.37l45.22,18.73,42.55,17.62A20.5,20.5,0,0,1,159.7,226.81Z"/>
          <path className={currentRoundEmotion && currentRoundEmotion!=="CONTEMPT"?"disabled":"cls-28"} d="M148.73,348.26,106,366,61,384.62a20.46,20.46,0,0,1-26.78-11.1,20.5,20.5,0,0,1,11.09-26.78L90.1,328.17,133,310.38a20.5,20.5,0,0,1,26.78,11.1c0,.06.05.11.07.17A20.49,20.49,0,0,1,148.73,348.26Z"/>
          <path className={currentRoundEmotion && currentRoundEmotion!=="REMORSE"?"disabled":"cls-29"} d="M237.93,415.09l-17.17,41.46-19.18,46.31A20.51,20.51,0,0,1,162.13,495a21.45,21.45,0,0,1,.2-2.88,20.38,20.38,0,0,1,1.37-5l19-45.83,17.37-41.94a20.5,20.5,0,0,1,26.79-11.09l.16.07A20.49,20.49,0,0,1,237.93,415.09Z"/>
          <path className={currentRoundEmotion && currentRoundEmotion!=="DISAPPROVAL"?"disabled":"cls-30"} d="M373.52,513.82a20.5,20.5,0,0,1-26.78-11.09L327,455.14,310.38,415a20.49,20.49,0,0,1,11.08-26.77h0a20.49,20.49,0,0,1,26.78,11.09l16.42,39.63L384.62,487a20.46,20.46,0,0,1-11.1,26.78Z"/>
          <path className={currentRoundEmotion && currentRoundEmotion!=="AWE"?"disabled":"cls-31"} d="M514,373.21A20.51,20.51,0,0,1,495,385.87a21.45,21.45,0,0,1-2.88-.2,20.38,20.38,0,0,1-5-1.37L438.05,364,399.4,348a20.48,20.48,0,0,1-11.2-26.49c0-.1.07-.2.11-.3a20.49,20.49,0,0,1,26.78-11.09L453.46,326l49.4,20.46A20.49,20.49,0,0,1,514,373.21Z"/>
          <path className={currentRoundEmotion && currentRoundEmotion!=="SUBMISSION"?"disabled":"cls-32"} d="M515.39,182.32a20.52,20.52,0,0,1-12.66,18.94l-49.5,20.51L415,237.62A20.5,20.5,0,0,1,388.39,227l-.21-.48a20.49,20.49,0,0,1,11.09-26.78l38.38-15.9L487,163.38a20.46,20.46,0,0,1,26.78,11.1A20.35,20.35,0,0,1,515.39,182.32Z"/>
          <path className={currentRoundEmotion && currentRoundEmotion!=="LOVE"?"disabled":"cls-33"} d="M385.87,53a21.45,21.45,0,0,1-.2,2.88,20.38,20.38,0,0,1-1.37,5l-20.1,48.53L348,148.6a20.49,20.49,0,0,1-26.3,11.28l-.49-.19a20.49,20.49,0,0,1-11.09-26.78L326.5,93.25l19.92-48.11A20.51,20.51,0,0,1,385.87,53Z"/>
        </g>
        <g id="Layer_3" data-name="Layer 3">
          <text onClick={() => emotionFunction("ecstacy")} id="ecstacy" className="cls-34 st10" transform="translate(278.4 239.42) rotate(-90)">
            {deletedRow[0].emotion==="ECSTACY" || deletedRow[1].emotion==="ECSTACY" || deletedRow[2].emotion==="ECSTACY"?"":(callRobot && (callRobot[0]!=="ECSTACY" && callRobot[1]!=="ECSTACY" && callRobot[2]!=="ECSTACY")?"":"ECSTACY")}
          </text>
          <text onClick={() => emotionFunction("admiration")} id="admiration_x0D_" className="cls-34 st10" transform="translate(295.06 257.67) rotate(-45)">
          {deletedRow[0].emotion==="ADMIRATION" || deletedRow[1].emotion==="ADMIRATION" || deletedRow[2].emotion==="ADMIRATION"?"":(callRobot && (callRobot[0]!=="ADMIRATION" && callRobot[1]!=="ADMIRATION" && callRobot[2]!=="ADMIRATION")?"":"ADMIRATION")}
          </text>
          <text onClick={() => emotionFunction("terror")} id="terror_x0D_" className="cls-34 st10" transform="translate(313.55 281.31)">
          {deletedRow[0].emotion==="TERROR" || deletedRow[1].emotion==="TERROR" || deletedRow[2].emotion==="TERROR"?"":(callRobot && (callRobot[0]!=="TERROR" && callRobot[1]!=="TERROR" && callRobot[2]!=="TERROR")?"":"TERROR")}
          </text>
          <text onClick={() => emotionFunction("optimism")} id="optimism" className="cls-34 st10" transform="translate(179.48 53.79) rotate(68.04)">
          {deletedRow[0].emotion==="OPTIMISM" || deletedRow[1].emotion==="OPTIMISM" || deletedRow[2].emotion==="OPTIMISM"?"":(callRobot && (callRobot[0]!=="OPTIMISM" && callRobot[1]!=="OPTIMISM" && callRobot[2]!=="OPTIMISM")?"":"OPTIMISM")}
          </text>
          <text onClick={() => emotionFunction("love")} id="love" className="cls-34 st10" transform="matrix(0.42, -0.91, 0.91, 0.42, 346.83, 109.7)">
          {deletedRow[0].emotion==="LOVE" || deletedRow[1].emotion==="LOVE" || deletedRow[2].emotion==="LOVE"?"":(callRobot && (callRobot[0]!=="LOVE" && callRobot[1]!=="LOVE" && callRobot[2]!=="LOVE")?"":"LOVE")}
          </text>
          <text onClick={() => emotionFunction("submission")} id="submission" className="cls-34 st10" transform="matrix(0.94, -0.34, 0.34, 0.94, 410.05, 219.79)">
          {deletedRow[0].emotion==="SUBMISSION" || deletedRow[1].emotion==="SUBMISSION" || deletedRow[2].emotion==="SUBMISSION"?"":(callRobot && (callRobot[0]!=="SUBMISSION" && callRobot[1]!=="SUBMISSION" && callRobot[2]!=="SUBMISSION")?"":"SUBMISSION")}
          </text>
          <text onClick={() => emotionFunction("awe")} id="awe" className="cls-34" transform="translate(425 340.55) rotate(22.5)">
          {deletedRow[0].emotion==="AWE" || deletedRow[1].emotion==="AWE " || deletedRow[2].emotion==="AWE"?"":(callRobot && (callRobot[0]!=="AWE" && callRobot[1]!=="AWE" && callRobot[2]!=="AWE")?"":"AWE")}
          </text>
          <text onClick={() => emotionFunction("disapproval")} id="disapproval" className="cls-34" transform="matrix(0.34, 0.94, -0.94, 0.34, 323.83, 405.28)">
          {deletedRow[0].emotion==="DISAPPROVAL" || deletedRow[1].emotion==="DISAPPROVAL" || deletedRow[2].emotion==="DISAPPROVAL"?"":(callRobot && (callRobot[0]!=="DISAPPROVAL" && callRobot[1]!=="DISAPPROVAL" && callRobot[2]!=="DISAPPROVAL")?"":"DISAPPROVAL")}
          </text>
          <text onClick={() => emotionFunction("remorse")} id="remorse" className="cls-34" transform="translate(195.2 480.88) rotate(-70)">
          {deletedRow[0].emotion==="REMORSE" || deletedRow[1].emotion==="REMORSE" || deletedRow[2].emotion==="REMORSE"?"":(callRobot && (callRobot[0]!=="REMORSE" && callRobot[1]!=="REMORSE" && callRobot[2]!=="REMORSE")?"":"REMORSE")}
          </text>
          <text onClick={() => emotionFunction("contempt")} id="contempt_x0D_" className="cls-34" transform="translate(63.48 365.1) rotate(-20)">
          {deletedRow[0].emotion==="CONTEMPT" || deletedRow[1].emotion==="CONTEMPT" || deletedRow[2].emotion==="CONTEMPT"?"":(callRobot && (callRobot[0]!=="CONTEMPT" && callRobot[1]!=="CONTEMPT" && callRobot[2]!=="CONTEMPT")?"":"CONTEMPT")}
          </text>
          <text onClick={() => emotionFunction("aggressiveness")} id="aggressiveness" className="cls-34" transform="translate(45.62 181.95) rotate(25)">
          {deletedRow[0].emotion==="AGGRESSIVENESS" || deletedRow[1].emotion==="AGGRESSIVENESS" || deletedRow[2].emotion==="AGGRESSIVENESS"?"":(callRobot && (callRobot[0]!=="AGGRESSIVENESS" && callRobot[1]!=="AGGRESSIVENESS" && callRobot[2]!=="AGGRESSIVENESS")?"":"AGGRESSIVENESS")}
          </text>
          <text onClick={() => emotionFunction("grief")} id="grief_x0D_" className="cls-34" transform="translate(269.54 320.17) rotate(90)">
          {deletedRow[0].emotion==="GRIEF" || deletedRow[1].emotion==="GRIEF" || deletedRow[2].emotion==="GRIEF"?"":(callRobot && (callRobot[0]!=="GRIEF" && callRobot[1]!=="GRIEF" && callRobot[2]!=="GRIEF")?"":"GRIEF")}
          </text>
          <text onClick={() => emotionFunction("loathing")} id="loathing_x0D_" className="cls-34" transform="translate(211.76 349.29) rotate(-45)">
          {deletedRow[0].emotion==="LOATHING" || deletedRow[1].emotion==="LOATHING" || deletedRow[2].emotion==="LOATHING"?"":(callRobot && (callRobot[0]!=="LOATHING" && callRobot[1]!=="LOATHING" && callRobot[2]!=="LOATHING")?"":"LOATHING")}
          </text>
          <text onClick={() => emotionFunction("rage")} id="rage_x0D_" className="cls-34" transform="translate(197.89 281.31)">
          {deletedRow[0].emotion==="RAGE" || deletedRow[1].emotion==="RAGE" || deletedRow[2].emotion==="RAGE"?"":(callRobot && (callRobot[0]!=="RAGE" && callRobot[1]!=="RAGE" && callRobot[2]!=="RAGE")?"":"RAGE")}
          </text>
          <text onClick={() => emotionFunction("vigilance")} id="vigilance" className="cls-34" transform="translate(197.73 204.03) rotate(45)">
          {deletedRow[0].emotion==="VIGILANCE" || deletedRow[1].emotion==="VIGILANCE" || deletedRow[2].emotion==="VIGILANCE"?"":(callRobot && (callRobot[0]!=="VIGILANCE" && callRobot[1]!=="VIGILANCE" && callRobot[2]!=="VIGILANCE")?"":"VIGILANCE")}
          </text>
          <text onClick={() => emotionFunction("amazement")} id="amazement_x0D_" className="cls-34" transform="translate(288.29 292.3) rotate(45)">
          {deletedRow[0].emotion==="AMAZEMENT" || deletedRow[1].emotion==="AMAZEMENT" || deletedRow[2].emotion==="AMAZEMENT"?"":(callRobot && (callRobot[0]!=="AMAZEMENT" && callRobot[1]!=="AMAZEMENT" && callRobot[2]!=="AMAZEMENT")?"":"AMAZEMENT")}
          </text>
          <text onClick={() => emotionFunction("trust")} id="trust" className="cls-34" transform="translate(363.03 148.92) rotate(45)">
          {deletedRow[0].emotion==="TRUST" || deletedRow[1].emotion==="TRUST" || deletedRow[2].emotion==="TRUST"?"":(callRobot && (callRobot[0]!=="TRUST" && callRobot[1]!=="TRUST" && callRobot[2]!=="TRUST")?"":"TRUST")}
          </text>
          <text onClick={() => emotionFunction("acceptance")} id="acceptance" className="cls-34 st10" transform="translate(392.53 90.42) rotate(45)">
          {deletedRow[0].emotion==="ACCEPTANCE" || deletedRow[1].emotion==="ACCEPTANCE" || deletedRow[2].emotion==="ACCEPTANCE"?"":(callRobot && (callRobot[0]!=="ACCEPTANCE" && callRobot[1]!=="ACCEPTANCE" && callRobot[2]!=="ACCEPTANCE")?"":"ACCEPTANCE")}
          </text>
          <text onClick={() => emotionFunction("joy")} id="joy_x0D_" className="cls-34" transform="translate(261.36 121.92)">
          {deletedRow[0].emotion==="JOY" || deletedRow[1].emotion==="JOY" || deletedRow[2].emotion==="JOY"?"":(callRobot && (callRobot[0]!=="JOY" && callRobot[1]!=="JOY" && callRobot[2]!=="JOY")?"":"JOY")}
          </text>
          <text onClick={() => emotionFunction("serenity")} id="serenity" className="cls-34" transform="translate(245.36 60.92)">
          {deletedRow[0].emotion==="SERENITY" || deletedRow[1].emotion==="SERENITY" || deletedRow[2].emotion==="SERENITY"?"":(callRobot && (callRobot[0]!=="SERENITY" && callRobot[1]!=="SERENITY" && callRobot[2]!=="SERENITY")?"":"SERENITY")}
          </text>
          <text onClick={() => emotionFunction("fear")} id="fear" className="cls-34" transform="translate(421.69 257.61) rotate(90)">
          {deletedRow[0].emotion==="FEAR" || deletedRow[1].emotion==="FEAR" || deletedRow[2].emotion==="FEAR"?"":(callRobot && (callRobot[0]!=="FEAR" && callRobot[1]!=="FEAR" && callRobot[2]!=="FEAR")?"":"FEAR")}
          </text>
          <text onClick={() => emotionFunction("apprehension")} id="apprehension" className="cls-34" transform="translate(489.69 225.61) rotate(90)">
          {deletedRow[0].emotion==="APPREHENSION" || deletedRow[1].emotion==="APPREHENSION" || deletedRow[2].emotion==="APPREHENSION"?"":(callRobot && (callRobot[0]!=="APPREHENSION" && callRobot[1]!=="APPREHENSION" && callRobot[2]!=="APPREHENSION")?"":"APPREHENSION")}
          </text>
          <text onClick={() => emotionFunction("surprise")} id="surprise" className="cls-34" transform="translate(370.41 413.87) rotate(-45)">
          {deletedRow[0].emotion==="SURPRISE" || deletedRow[1].emotion==="SURPRISE" || deletedRow[2].emotion==="SURPRISE"?"":(callRobot && (callRobot[0]!=="SURPRISE" && callRobot[1]!=="SURPRISE" && callRobot[2]!=="SURPRISE")?"":"SURPRISE")}
          </text>
          <text onClick={() => emotionFunction("distraction")} id="distraction" className="cls-34" transform="translate(400.41 460.87) rotate(-45)">
          {deletedRow[0].emotion==="DISTRACTION" || deletedRow[1].emotion==="DISTRACTION" || deletedRow[2].emotion==="DISTRACTION"?"":(callRobot && (callRobot[0]!=="DISTRACTION" && callRobot[1]!=="DISTRACTION" && callRobot[2]!=="DISTRACTION")?"":"DISTRACTION")}
          </text>
          <text onClick={() => emotionFunction("sadness")} id="sadness" className="cls-34" transform="translate(241.36 438.92)">
          {deletedRow[0].emotion==="SADNESS" || deletedRow[1].emotion==="SADNESS" || deletedRow[2].emotion==="SADNESS"?"":(callRobot && (callRobot[0]!=="SADNESS" && callRobot[1]!=="SADNESS" && callRobot[2]!=="SADNESS")?"":"SADNESS")}
          </text>
          <text onClick={() => emotionFunction("pensiveness")} id="pensiveness" className="cls-34" transform="translate(229.36 497.92)">
          {deletedRow[0].emotion==="PENSIVENESS" || deletedRow[1].emotion==="PENSIVENESS" || deletedRow[2].emotion==="PENSIVENESS"?"":(callRobot && (callRobot[0]!=="PENSIVENESS" && callRobot[1]!=="PENSIVENESS" && callRobot[2]!=="PENSIVENESS")?"":"PENSIVENESS")}
          </text>
          <text onClick={() => emotionFunction("disgust")} id="disgust" className="cls-34" transform="translate(139.24 373.17) rotate(45)">
          {deletedRow[0].emotion==="DISGUST" || deletedRow[1].emotion==="DISGUST" || deletedRow[2].emotion==="DISGUST"?"":(callRobot && (callRobot[0]!=="DISGUST" && callRobot[1]!=="DISGUST" && callRobot[2]!=="DISGUST")?"":"DISGUST")}
          </text>
          <text onClick={() => emotionFunction("boredom")} id="boredom" className="cls-34" transform="translate(91.24 403.17) rotate(45)">
          {deletedRow[0].emotion==="BOREDOM" || deletedRow[1].emotion==="BOREDOM" || deletedRow[2].emotion==="BOREDOM"?"":(callRobot && (callRobot[0]!=="BOREDOM" && callRobot[1]!=="BOREDOM" && callRobot[2]!=="BOREDOM")?"":"BOREDOM")}
          </text>
          <text onClick={() => emotionFunction("anger")} id="anger" className="cls-34" transform="translate(128.67 301.25) rotate(-90)">
          {deletedRow[0].emotion==="ANGER" || deletedRow[1].emotion==="ANGER" || deletedRow[2].emotion==="ANGER"?"":(callRobot && (callRobot[0]!=="ANGER" && callRobot[1]!=="ANGER" && callRobot[2]!=="ANGER")?"":"ANGER")}
          </text>
          <text onClick={() => emotionFunction("annoyance")} id="annoyance" className="cls-34" transform="translate(62.67 315.25) rotate(-90)">
          {deletedRow[0].emotion==="ANNOYANCE" || deletedRow[1].emotion==="ANNOYANCE" || deletedRow[2].emotion==="ANNOYANCE"?"":(callRobot && (callRobot[0]!=="ANNOYANCE" && callRobot[1]!=="ANNOYANCE" && callRobot[2]!=="ANNOYANCE")?"":"ANNOYANCE")}
          </text>
          <text onClick={() => emotionFunction("interest")} id="interest" className="cls-34" transform="matrix(0.71, -0.71, 0.71, 0.71, 103.47, 141.57)">
          {deletedRow[0].emotion==="INTEREST" || deletedRow[1].emotion==="INTEREST" || deletedRow[2].emotion==="INTEREST"?"":(callRobot && (callRobot[0]!=="INTEREST" && callRobot[1]!=="INTEREST" && callRobot[2]!=="INTEREST")?"":"INTEREST")}
          </text>
          <text onClick={() => emotionFunction("anticipation")} id="anticipation" className="cls-51" transform="matrix(0.71, -0.71, 0.71, 0.71, 134.82, 190.92)">
          {deletedRow[0].emotion==="ANTICIPATION" || deletedRow[1].emotion==="ANTICIPATION" || deletedRow[2].emotion==="ANTICIPATION"?"":(callRobot && (callRobot[0]!=="ANTICIPATION" && callRobot[1]!=="ANTICIPATION" && callRobot[2]!=="ANTICIPATION")?"":"ANTICIPATION")}
          </text>
        </g>
      </svg>
    </div>)
}

export default Wheel