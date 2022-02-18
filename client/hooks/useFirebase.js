import React from 'react';
import initializeAuthentication from '../firebase/firebase.init';

const useFirebase = () => {
    initializeAuthentication()
    const name = 'enan from emo-g';

    return {name};
};

export default useFirebase;