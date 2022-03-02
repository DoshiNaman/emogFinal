import { useRouter } from "next/router"

const CallHostPopup = ({setCallHostPopup, activeTeam}) => {

    const router = useRouter()

    const clickHandler = () => {
        sessionStorage.setItem('team-name', activeTeam.teamName)   
        router.push(`/player/game/${activeTeam.teamName}`)
    }

    return ( 
        <div className="absolute top-0 left-0 h-screen w-screen flex justify-center bg-opacity-60 items-center" style={{backgroundColor:"rgba(235, 162, 130, 0.5)"}}>
            <div className="heading px-12 py-8 rounded">
                <div className="burlywoodText text-2xl">Team {activeTeam.teamName>9?"":"0"}{activeTeam.teamName} needs help</div>
                <div className="flex justify-evenly mt-4">
                    <div className="ebaText cursor-pointer ebaBorder rounded px-2 py-1" onClick={clickHandler}>Join</div>
                    <div className="ebaText cursor-pointer ebaBorder rounded px-2 py-1" onClick={() => setCallHostPopup(false)}>Reject</div>
                </div>
            </div>
        </div>
     );
}
 
export default CallHostPopup;