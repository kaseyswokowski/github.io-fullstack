//stateless functional component
import React, { Fragment } from 'react';

const UnhandledError = () => (
    <Fragment>
        <div className="bounds">
            <h1>Error</h1>
            <p>Sorry! We just encountered an unexpected error.</p>
        </div>
    </Fragment>
);

export default UnhandledError;