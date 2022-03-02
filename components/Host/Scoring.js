const Scoring = ({compoundCorrect, compoundIncorrect, otherCorrect, otherIncorrect, otherAdjacent}) => {
    return ( 
        <div className="flex justify-center items-center h-screen">
            <div className="heading rounded-xl flex justify-around items-center h-1/2" style={{width:"50vw"}}>
                <div>
                    <div className="text-2xl mb-8 font-bold">Other Emotion</div>
                    <div className="text-2xl flex justify-between">
                        <div>Correct Guess:</div>
                        <input type="number" value={otherCorrect} disabled={true} className="ml-4 w-16 rounded-lg pl-2 burlywoodText inputs burlywoodBorder"/>
                    </div>
                    <br/>
                    <div className="text-2xl flex justify-between">
                        <div>Adjacent Cell:</div>
                        <input type="number" value={otherAdjacent} disabled={true} className="ml-4 w-16 rounded-lg pl-2 burlywoodText inputs burlywoodBorder"/>
                    </div>
                    <br/>
                    <div className="text-2xl flex justify-between">
                        <div>Incorrect Guess:</div>
                        <input type="number" value={otherIncorrect} disabled={true} className="ml-4 w-16 rounded-lg pl-2 burlywoodText inputs burlywoodBorder"/>
                    </div>
                </div>
                <div>
                    <div className="text-2xl mb-8 font-bold">Compound Emotion</div>
                    <div className="text-2xl flex justify-between">
                        <div>Correct Guess:</div>
                        <input type="number" value={compoundCorrect} disabled={true} className="ml-4 w-16 rounded-lg pl-2 burlywoodText inputs burlywoodBorder"/>
                    </div>
                    <br/>
                    <div className="text-2xl flex justify-between">
                        <div>Incorrect Guess:</div>
                        <input type="number" value={compoundIncorrect} disabled={true} className="ml-4 w-16 rounded-lg pl-2 burlywoodText inputs burlywoodBorder"/>
                    </div>
                </div>
            </div>        
        </div>
     );
}
 
export default Scoring;