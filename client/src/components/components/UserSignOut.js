//stateless functional component

import React from 'react';
import { Redirect } from 'react-router-dom';


//signs out user/removes cookie and redirects to home page
const UserSignOut = ({ context }) => {
    context.actions.signOut();

    return(
        <Redirect to="/" />
    );
}

export default UserSignOut;