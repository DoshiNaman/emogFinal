const Emotion = ({emotionArray, Wheel}) => {
    console.log(emotionArray, Wheel);
    return ( 
        <div className="h-100">
            <div className="text-center container px-10 h-100" >
                <div className="h-100 grid grid-col-1 grid-flow-col place-items-center ">
                    <div className="h-3/5 w-96 rounded-xl p-3 heading">
                        <div className="font-bold mb-3 mt-2 align-center text-center text-xl">Set Emotions
                        </div>

                        <div className="grid grid-cols-2 text-xl grid-flow-row h-4/5 scl auto-rows-max gap-2 overflow-y-auto">
                            {emotionArray.map((emotion, index) => <div className="py-2 text-left px-3 w-40 h-18 font-bold text-md inputs burlywoodBorder rounded-lg grid relative" key={index} >Round{` 0${index + 1}`}
                                <span className="text-base font-normal">{emotion}</span>
                                <span className="absolute top-0 right-0 cursor-pointer" onClick={() => setEdit(index)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </span>
                            </div>)}
                        </div>
                    </div>
                    <div className=" ">
                        <div className="">
                            {Wheel}
                        </div>
                    </div>
                </div>
            </div >
        </div>
     );
}
 
export default Emotion;