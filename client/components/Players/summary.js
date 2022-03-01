const Summary = ({correctAnswer, yourAnswer, pointsEarnerd, nextPlayer, setSummary , setClose}) => {
    return ( 
        <div className="absolute top-0 left-0 h-screen w-screen flex justify-center items-center" style={{backgroundColor:"rgba(235, 162, 130, 0.5)"}}>
            <div className="heading rounded-lg px-8 py-6 relative">
                <div className="text-right cursor-pointer absolute top-1 right-2 px-2" onClick={() => setClose(1)}>&times;</div>
                <div className="my-1 flex justify-between">
                    <div>Correct Answer: </div>
                    <div>{correctAnswer}</div>
                </div>
                <div className="my-1 flex justify-between">
                    <div>Your Answer: </div>
                    <div className="pl-2">{yourAnswer}</div>
                    {/*yourAnswer?.map(answer => <div className="pl-2">{answer}</div>) */}
                </div>
                <div className="my-1 flex justify-between">
                    <div>Points Earned: </div>
                    <div>{pointsEarnerd}</div>
                </div>
                <div className="my-1 flex justify-between">
                    <div>Next Player: </div>
                    <div>{nextPlayer}</div>
                </div>
            </div>
        </div>
     );
}
 
export default Summary;