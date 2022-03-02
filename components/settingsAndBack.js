import { useState } from "react";
import ExitGame from "./exitGame"
import Link from 'next/link'

const SettingsAndBack = ({link, player}) => {

    const [settingsPressed, setSettingsPressed] = useState(false)

    return ( 
        <div>
            {!player?<Link href = {link}>
            <div className="absolute top-8 left-8 cursor-pointer beigeBg rounded-full burlywoodText">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                </svg>
            </div>
            </Link>:<></>}
        </div>
     );
}
 
export default SettingsAndBack;
