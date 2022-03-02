import SendCodeToInvitePlayers from "../../components/sendCodeToInvitePlayers";
import SettingsAndBack from "../../components/settingsAndBack";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import TeamComponent from "../../components/TeamComponent";
import Button from "../../components/Button";
import TeamPlayers from "../../components/TeamPlayers";
import useAuth from "../../hooks/useAuth";
import { getDatabase, ref, child, get, set, on, update, onValue } from 'firebase/database';
// import styles from "../css/hostScreen.module.css"

const choice = () => {
    const { playersNO } = useAuth();

    const router = useRouter()

    const [numberOfPlayers, setNumberOfPlayers] = useState(0)
    const [gameCode, setGameCode] = useState("")
    const [playerMax, setPlayerMax] = useState()
    const [teams, setTeams] = useState([])
    const [activeTeam, setActiveTeam] = useState('team1')
    const [mode, setMode] = useState('')
    const [role, setRole] = useState("")
    const [playerName, setPlayerName] = useState("")
    const [avatar, setAvatar] = useState("")
    const [myTeam, setMyTeam] = useState("")
    const db = getDatabase()
    // numberOfPlayers -> done
    // gameCode --> done
    // playerMax --> done
    // teams --> done
    // activeTeam
    // mode -> done
    // playerName -> done


    // setting gamecode and player name 
    useEffect(() => {
        const gameCode = window.sessionStorage.getItem('game-code')
        setGameCode(gameCode)
        const playerName = window.sessionStorage.getItem('player-name')
        setPlayerName(playerName)
        setPlayerMax(playersNO)
        const clientRole = window.sessionStorage.getItem('role')
        setRole(clientRole)
    }, [])



    useEffect(() => {
        if (playerName) {
            const userRef = ref(db, `${gameCode}/userDetails/${playerName}`);
            get(userRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const userObj = snapshot.val()
                    setAvatar(userObj.avatar)
                } else {
                    console.log("no user");
                }
            }).catch((error) => {
                console.error(error);
            });
        }
    }, [playerName])

    useEffect(() => {
        if (gameCode) {
            const db = getDatabase();
            const gModeRef = ref(db, `${gameCode}/gameMode`);
            onValue(gModeRef, (snapshot) => {
                if (snapshot.exists()) {
                    setMode(snapshot.val())
                }
                else {
                    //alert("doesn't exists")
                }
            })
        }
    }, [gameCode]);

    useEffect(() => {
        if (!gameCode) {
            return
        }
        const db = getDatabase();
        const totalNumber = ref(db, `${gameCode}/userDetails/noOfPlayer`);
        onValue(totalNumber, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                setNumberOfPlayers(data)
            }
        });
    }, [gameCode]);

    //teamComponent
    useEffect(() => {
        if (!gameCode || gameCode === 0) {
            return
        }
        // const db = getDatabase()

        const teamsRef = ref(db, `${gameCode}/teamDetails`);
        onValue(teamsRef, (snapshot) => {
            if (!snapshot.exists())
                return
            const teamsObj = snapshot.val();
            let teamsNames = Object.keys(teamsObj);
            let teamsArr = []
            var inTeam = false
            for (let i = 0; i < teamsNames.length; i++) {
                let teamMembers = []
                let teamName = teamsNames[i]
                let teamObj = teamsObj[teamName]
                let teamMembersNames = Object.keys(teamObj);

                for (let j = 0; j < teamMembersNames.length; j++) {
                    if (teamMembersNames[j] === playerName) {
                        setMyTeam(teamName)
                        // alert("ENANG")
                        inTeam = true
                        console.log(teamName, "mine");
                    }
                    if (teamMembersNames[j] == "score" || teamMembersNames[j] == "currentRound") {
                        continue;
                    }
                    else {
                        let obj = {
                            name: teamMembersNames[j],
                            avatar: teamObj[teamMembersNames[j]]
                        }
                        teamMembers.push(obj)
                    }
                }
                teamsArr.push({ teamName, teamMembers })
            }
            if (inTeam === false)
                setMyTeam("")
            // console.log(teamsArr);
            setTeams(teamsArr)
        });

    }, [gameCode]);

    //cometoscene
    useEffect(() => {
        if (gameCode) {
            const db = getDatabase();
            const gModeRef = ref(db, `${gameCode}/isActive`);
            onValue(gModeRef, (snapshot) => {
                if (snapshot.exists()) {
                    const a = snapshot.val();
                    if (a == 1) {
                        if (myTeam != "") {
                            sessionStorage.setItem('team-name', myTeam);
                            router.push('/scene')
                        }
                        else {
                            //alert("Not Fetch myTeam Value")
                        }
                    }
                }
            })
        }
    }, [gameCode, myTeam]);

    const activeButton = (active) => {
        setActiveTeam(active)
    }

    return (
        <div className="flex flex-col justify-center items-center bgNormal h-screen">
            <div className="grid grid-cols-1 justify-center self-center w-full align-center">
                <div className="w-screen flex justify-center">
                    <div className="w-80"><SendCodeToInvitePlayers gameCode={gameCode} numberOfPlayers={numberOfPlayers} /></div>
                </div>
                <h1 style={{ textAlign: "center", color: "blue" }}>{playerName}</h1>
            </div>
            <div className='flex flex-row w-full justify-evenly'>
                <div className='lg:w-6/12 md:w-6/12'>
                    {teams ? (<TeamComponent role={role} teams={teams} activeTeam={activeTeam} activeIcon={activeButton} playerName={playerName} myTeam={myTeam} />) : (null)}
                </div>
                <div className='w-3/12'>
                    {teams ? <TeamPlayers role={role} mode={mode} teams={teams} team={teams.find(t => t.teamName == activeTeam)} activeTeam={activeTeam} allTeams={teams} status={true} gameCode={gameCode} playerName={playerName} avatar={avatar} /> : null}
                </div>
            </div>
        </div>
    );
}

export default choice;