import React,{useState} from 'react';
import initializeAuthentication from '../firebase/firebase.init';

const useFirebase = () => {
    initializeAuthentication()
    const [playersNO, setPlayersNO] = useState(0)
    const [totalUsers, setTotalUsers] = useState([])




    return {playersNO, setPlayersNO,totalUsers, setTotalUsers};
};

export default useFirebase;