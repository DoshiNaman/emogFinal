import React, { useState, useEffect } from 'react'
import { useRouter } from "next/router"
import Button from '../Button'
import { getDatabase, set, ref } from 'firebase/database';

const Host = () => {
    const router = useRouter()
    const [gameData, setGameData] = useState([]);
    const db = getDatabase();

    const genRanHex = (size) => {
        return [...Array(size)].map(() => {
            return Math.floor(Math.random() * 16).toString(16)
        }).join('').toUpperCase();
    }

    // sending the basic game info from client side to database
    const hostLoginHandle = () => {
        // const roomId = Math.floor(Math.random()*1000000);
        const roomId = genRanHex(6)
        localStorage.setItem('game-code', roomId);
        localStorage.setItem('role', "host");
        set(ref(db, `/${roomId}`), {
            "isActive": 0,
            "isChoice": 0,
            "userDetails": {
                "noOfPlayer": 0
            },
            "hostDetails": {
                "guessingTime": 180,
                "typingTime": 90,
                "noOfRounds": 10,
                "otherEmotion": {
                    "correctGuess": 2,
                    "adjacentCell": 1,
                    "incorrectGuess": 0
                },
                "compoundEmotion": {
                    "correctGuess": 2,
                    "incorrectGuess": 0
                },
            },
            "teamDetails": [],
            "scenes": [
                {
                    "id": 0
                },
                {
                    "id": 1,
                    "scene": "Everyone was busy, so I went to the movie alone.",
                    "nudge": "It's been a sad day!",
                    "roleOne": "Myself",
                    "roleTwo": "Everyone",
                    "statementOne": "I don't like being alone",
                    "statementTwo": "I miss my friends",
                    "nudgeRoundNo": 4
                },
                {
                    "id": 2,
                    "scene": "When money was tight, he'd get his  lunch money from the local wishing well.",
                    "nudge": "Sob-Sob - I wanna be rich",
                    "roleOne": "He",
                    "roleTwo": "OnLookers",
                    "statementOne": "Money can buy happiness",
                    "statementTwo": "I am starving mate",
                    "nudgeRoundNo": 4
                },
                {
                    "id": 3,
                    "scene": "We have young kids who often walk into our room at night for various reasons         including clowns in the closet.",
                    "nudge": "They are so annoying",
                    "roleOne": "Children",
                    "roleTwo": "Parents",
                    "statementOne": "I wish we never had kids",
                    "statementTwo": "Omg they're so adorable",
                    "nudgeRoundNo": 4
                },
                {
                    "id": 4,
                    "scene": "Today we gathered moss for my uncle's wedding.",
                    "nudge": "He is the oldest person to get married in our family",
                    "roleOne": "Uncle",
                    "roleTwo": "Us",
                    "statementOne": "I hate weddings",
                    "statementTwo": "It feels so uncomfortable everyone asking me to get married",
                    "nudgeRoundNo": 4
                },
                {
                    "id": 5,
                    "scene": "This book is sure to liquefy your brain.",
                    "nudge": "I don't read, but this one is definitely worth a shot",
                    "roleOne": "Book",
                    "roleTwo": "Me",
                    "statementOne": "Books provide us with general knowledge",
                    "statementTwo": "I feel so stupid because I don't read",
                    "nudgeRoundNo": 4
                },
                {
                    "id": 6,
                    "scene": "Joe discovered that traffic cones make excellent megaphones.",
                    "nudge": "Joe sounds very creative to me",
                    "roleOne": "Traffic cone",
                    "roleTwo": "Joe",
                    "statementOne": "Joe failed his math class",
                    "statementTwo": "Joe was always looked down on by his parents",
                    "nudgeRoundNo": 4
                },
                {
                    "id": 7,
                    "scene": "The trick to getting kids to eat anything is to put ketchup on it.",
                    "nudge": "Our kids eat brocoli this way",
                    "roleOne": "Parents",
                    "roleTwo": "Children",
                    "statementOne": "Stupid kids don't eat their vegetables",
                    "statementTwo": "One of our children is obese and diabetic",
                    "nudgeRoundNo": 4
                },
                {
                    "id": 8,
                    "scene": "He wondered why at 18 he was old enough to go to war, but not old enough to buy              cigarettes.",
                    "nudge": "He fell into a very bad friend circle at a very young age",
                    "roleOne": "Boy",
                    "roleTwo": "Ciggarate",
                    "statementOne": "He later found out he had lung cancer",
                    "statementTwo": "He used up all his money in buying more cigars after that discovery",
                    "nudgeRoundNo": 4
                },
                {
                    "id": 9,
                    "scene": "She was the type of girl that always burnt sugar to show she cared.",
                    "nudge": "Brown sugar tastes the best",
                    "roleOne": "Girl",
                    "roleTwo": "Sugar",
                    "statementOne": "This girl was very kind",
                    "statementTwo": "This girl cared deeply for her friends",
                    "nudgeRoundNo": 4
                },
                {
                    "id": 10,
                    "scene": "Garlic ice-cream was her favorite.",
                    "nudge": "She was a weird girl",
                    "roleOne": "Girl",
                    "roleTwo": "Ice Cream",
                    "statementOne": "Her mouth smelled all the time",
                    "statementTwo": "None of her friends liked her",
                    "nudgeRoundNo": 4
                }
            ]
        }
        )
        /* set(ref(db,`/${roomId}`),{
            "isActive" : 0,
            "userDetails":{
                "noOfPlayer":0
            },
            "hostDetails" : {
                "guessingTime" : 180,
                "typingTime" : 90,
                "noOfRounds" : 10,
                "otherEmotion" : {
                    "correctGuess" : 2,
                    "adjacentCell" : 1,
                    "incorrectGuess" : 0
                },
                "compoundEmotion" : {
                    "correctGuess" : 2,
                    "incorrectGuess" : 0
                }
            }
        }) */
        router.push('/host/settings')
    }

    return (
        <div className='h-full flex flex-col'>
            <br />
            <input className='inputs rounded-md p-2 text-black text-center' placeholder='User ID' />
            <input className='inputs rounded-md p-2 mt-3 text-black text-center' placeholder='Password' />
            <div className="absolute xs-mobile:bottom-36 tall-devices:bottom-72 left-0 flex justify-center w-100"><Button text={'LOGIN'} clickHandler={hostLoginHandle} /></div>
        </div>
    )
}

export default Host
