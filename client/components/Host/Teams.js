import { useState } from "react";
import CallHostPopup from "./callHostPopup";
import DashboardTeamPlayers from "./DashboardTeamPlayers";

const Teams = ({teams, rounds}) => {
    // console.log(teams);
    const [activeTeam, setActiveTeam] = useState(1)

    const [callHostPopup, setCallHostPopup] = useState(false)

    // console.log(rounds);
    return ( 
        <div className="flex justify-center items-center h-screen">
            <div className=" h-2/3 w-4/5 flex">
                <div className="px-4 py-2" style={{flex:6}}>
                    <div className="my-2 px-4 py-2 font-bold text-xl heading rounded-lg flex justify-between items-center">
                        <div className=''>Team</div>
                        <div className=" px-2">Players</div>
                        <div className=" px-2">Round</div>
                        <div className=" px-2">Points</div>
                        <div></div>
                    </div>
                    {teams?teams.map((team, index) => 
                    (<div className={activeTeam===team.teamName?"my-2 pr-4 py-2 rounded-lg text-lg ebaBg whiteText flex justify-between items-center cursor-pointer":"my-2 pr-4 py-2 rounded-lg text-lg heading flex justify-between items-center cursor-pointer"}
                    key = {index}
                    onClick = {() => setActiveTeam(team.teamName)}
                    >
                        <div className='pl-5'>Team {team.teamName}</div>
                        <div className="-ml-5">{team.teamMembers.length} Players</div>
                        <div className="-ml-3">{team.roundNo}/{rounds}</div>
                        <div className="ml-5">{team.score < 10? `0${team.score}` : `${team.score}`}</div>
                        {team.callTheHost?<div className="rounded-full bg-red-700 h-4 w-4" onClick={() => setCallHostPopup(true)}></div>:<div className="rounded-full h-4 w-4"></div>}
                    </div>
                    )):<></>}
                </div>
                <DashboardTeamPlayers activeTeam = {teams.find(t => t.teamName === activeTeam)} />
            </div>
            {callHostPopup?
                <CallHostPopup setCallHostPopup={setCallHostPopup} activeTeam={teams.find(t => t.teamName === activeTeam)}/>:
                <></>
            }
        </div>
     );
}
 
export default Teams;