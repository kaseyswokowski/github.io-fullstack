//stateless functional component
import React, { Fragment } from 'react';

const NotFound = () => (
    <Fragment>
        <div className="bounds">
            <h1>Not Found</h1>
            <p>Sorry! We couldn't find the page you're looking for.</p>
        </div>
    </Fragment>
);

export default NotFound;