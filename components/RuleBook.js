import { useState } from "react";

const RuleBook = () => {
    const [ruleBook, ruleBookClicked] = useState(false)

    return ( 
        <>
        <div className="px-4 py-2 buttonNew absolute top-8 right-8 rounded-lg text-lg font-bold cursor-pointer" onClick={() => ruleBookClicked(true)}>
            Rule Book
        </div>  
        {ruleBook?
            <div className="flex justify-center h-screen w-screen burlywoodOverlay bg-opacity-50 overflow-hidden items-center absolute top-0 left-0 z-50">
                <div className="heading rounded-xl h-4/5 w-4/5 relative overflow-y-auto scl px-16">
                    <div className="text-3xl cursor-pointer absolute top-6 right-8" onClick={() => ruleBookClicked(false)}>&times;</div>
                    <div className="text-center font-bold text-2xl my-8">RULE BOOK</div>
                    <div className="ebaText">
                        <div className="font-bold text-xl burlywoodText">Game Play:</div>
                        <br />
                        <ul className="list-decimal">
                            <li>The player are divided into multiple teams</li>
                            <li>All the teams are given a scene with two roles</li>
                            <li>One player is randomly selected from the team and is given a role and an emotion</li>
                            <li>The player has to type a statement emoting the emotion in that role</li>
                            <li>The statement has to be a reply to previous statement</li>
                            <li>Other players of the same team have to guess the emotion</li>
                            <li>Each round is of one statement</li>
                        </ul>                        
                        <div className="font-bold text-xl burlywoodText">Lifelines:</div>
                        <br />
                        <ul className="list-disc">
                            <li>Each team has 3 lifelines to use throughout the game.</li>
                            <li>Only one lifeline can be used in a round.</li>
                        </ul>
                            
                        <div>This or That: Players get a chance to choose 2 options</div>
                        <div>Drop a Row: System will drop a row with wrong answer</div>
                        <div>Call the bot: The system will shortlist 3 answers for you with one correct answer </div>

                        <div className="font-bold text-xl burlywoodText mt-4">Scoring:</div>
                        <br />
                        <ul className="list-disc">
                            <li>2 points: Correct Emotion</li>
                            <li>1 point: Adjacent 2</li>
                            <li>3 points: Compound emotion</li>
                            <li>0 point: Incorrect guess</li>
                        </ul>  
                    </div>     
                </div>
            </div>:<></>}
        </>
);
}
 
export default RuleBook;