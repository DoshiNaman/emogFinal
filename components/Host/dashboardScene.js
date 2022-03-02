const DashboardScene = ({scene}) => {
    console.log(scene);
    return ( 
        <div className="flex justify-center items-center flex-1 h-screen">
            <div className="flex flex-col justify-center items-center mt-10 w-4/5" style={{height:"75vh"}}>
                <div className = 'beigeBg rounded-t-xl burlywoodText z-10 flex flex-col w-full justify-end items-end'>
                    <div className="inline-block">
                                <button
                                    disabled={true}
                                    className="text-dark invisible text-2xl mr-4 hover:text-dark"
                                >
                                    &times;
                                </button>
                    </div>    
                </div>
                <div className="heading rounded-b-xl flex flex-row pb-2 h-full w-full">
                    <div className="flex-1 pl-16">
                        <div className="font-bold mb-5 align-center text-left text-2xl">
                            Scene
                        </div>
                        <div className="flex flex-col px-auto text-left h-3/4 font-bold text-xl">
                            <textarea cols="60" placeholder="Angry father is very angry" required className="text-2xl border-2 text-left rounded burlywoodText ebaBorder px-1 h-2/5 w-3/4 py-1" value = {scene.scene} disabled={true}>
                            </textarea>
                            <div className="text-left my-4">Roles</div>
                            <div className="flex font-normal">
                                <div>Role 01</div>
                                <input className="ml-8 rounded burlywoodText ebaBorder" value={scene.roleOne} disabled={true}/>
                            </div>
                            <div className="flex font-normal mt-4">
                                <div>Role 02</div>
                                <input className="ml-8 rounded burlywoodText ebaBorder" value={scene.roleTwo} disabled={true}/>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="flex flex-row w-3/4 justify-between font-bold text-xl mb-5">
                            <div>
                                Nudge
                            </div>
                            <div>
                                <div className="ml-8 mr-4 inline-block">Round No </div>
                                <input className="w-8 pl-2 float-right font-bold rounded burlywoodText ebaBorder" value={scene.nudgeRoundNo} disabled={true} list="rounds" name="Rounds">
                                </input>
                            </div>
                        </div>
                        <div className="text-xl font-bold text-left flex flex-column justify-between h-3/4">
                            <textarea className="w-3/4 h-2/5 p-2 rounded burlywoodText ebaBorder" placeholder="Angry father is very angry" value={scene.nudge} disabled={true}/>
                            <div>Initial Statement</div>
                            <textarea placeholder="Initial statement 1" value = {scene.statementOne} className="w-3/4 p-2 rounded burlywoodText ebaBorder" disabled={true} />
                            <textarea placeholder="Initial statement 2" value = {scene.statementTwo} className="w-3/4 p-2 rounded burlywoodText ebaBorder" disabled={true} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default DashboardScene;