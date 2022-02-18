const TimeRound = ({  typingTime, guessingTime, MAX_ROUND }) => {
    console.log(guessingTime);
    return ( 
        <div className="flex flex-row justify-center h-screen items-center">
            {console.log( typingTime.slice(0, typingTime.length-3), guessingTime, MAX_ROUND)}
            <div className="flex flex-column justify-evenly">
                <div className="heading w-80 px-8 py-8 rounded-2xl">
                    <div className="pr-4 font-bold text-xl">Set Timer</div>
                    <br/>
                    <div className="container-fluid my-2 text-lg">
                        <div className="row">
                            <div className="col-6 p-0">Guessing time</div>
                            <div className="col-6 p-0">
                                <input type="number"
                                min="1"
                                max="10"
                                disabled={true}
                                value = {guessingTime.slice(0, typingTime.length-3)}
                                className={`ml-1 text-center w-14 counterInput`}
                                name = "guess"
                                />
                                <input type = "number"
                                min="1"
                                max="60"
                                className={`ml-1 text-center w-14 counterInput`}
                                disabled={true}
                                value = {guessingTime.slice(typingTime.length-2, typingTime.length)}
                                name = "guessInSeconds"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="my-2 text-lg container-fluid">
                        <div className="row">
                            <div className="col-6 p-0">Typing time</div>
                            <div className="col-6 p-0">
                                <input 
                                type="number" 
                                min='1' 
                                max='10'
                                value={typingTime.slice(0, typingTime.length-3)}
                                className={`ml-1 text-center w-14 counterInput`}
                                name = 'type'
                                disabled={true}
                                />
                                <input 
                                type="number" 
                                min='1' 
                                max='60'
                                value={typingTime.slice(typingTime.length-2, typingTime.length)}
                                className={`ml-1 text-center w-14 counterInput`}
                                name = 'type'
                                disabled={true}
                                />
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className="font-bold text-xl">Rounds</div>
                    <br />
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-6 text-lg p-0">
                                No. of rounds
                            </div>
                            <div className="col-6 p-0">
                                <input 
                                value={MAX_ROUND} 
                                disabled={true}
                                type="number" min="6" 
                                placeholder = 'Set Number of Rounds' 
                                className={'ml-1 text-center h-7 w-14 counterInput'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     )
}
 
export default TimeRound;