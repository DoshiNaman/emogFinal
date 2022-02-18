import { useEffect, useState } from "react";
import tippy from 'tippy.js';
import {roundArrow} from 'tippy.js';
import 'tippy.js/dist/svg-arrow.css';

const sendCodeToInvitePlayers = (props) => {


    useEffect(() => {
        tippy('#copy', {
            content: 'Copied!',
            trigger: 'click',
            duration: 100,
            inertia: true, 
            placement: 'bottom-end',
            arrow: roundArrow,
            theme:"tomato",
            onShow(instance) {
                setTimeout(() => {
                  instance.hide();
                }, 3000);
            }
          });
    }, [])

    return ( 
        <div>
            <div className="text-center font-bold text-xl heading rounded-xl py-2">{props.text?props.text:"Send code to invite players"}</div>
            <br />
            <div className="flex flex-row justify-evenly">
                <div id="copy" className="heading cursor-pointer rounded-md flex justify-between" onClick={() => {
                    navigator.clipboard.writeText(props.gameCode);
                    }}>
                    <span className="py-2 px-4 font-bold text-lg">{props.gameCode}</span>
                    <span className="bg-brown p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#fff">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    </span>
                </div>
                <div className="heading py-2 px-4 rounded-md font-bold text-lg">
                    {props.numberOfPlayers} Joined
                </div>
            </div>
        </div>
     );
}
 
export default sendCodeToInvitePlayers;
