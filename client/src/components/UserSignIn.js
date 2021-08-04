//stateful class component
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

class UserSignIn extends Component {
    //setting up state
    constructor(props) {
        super(props);
        this.state = {
            emailAddress: '',
            password: '',
            errors: []
        }
    }

    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name]: value
            };
        });
    }

    //on submit redirect to / or page came from
    submit = () => {
        const { context } = this.props;
        //getting the page user came from
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { emailAddress, password } = this.state;

        context.actions.signIn(emailAddress, password)
        .then(user => {
            console.log('User: ', user);
            if (user === null) {
                this.setState(() => {
                    return { errors: ['Sign in was unsuccessful.'] };
                });
            } else {
                //send to main page if auth goes through
                console.log(`Success! ${emailAddress} is now signed in.`);
                //sends the user back to the page they came from
                this.props.history.push(from.pathname);
            }
        })
        .catch(err => {
            console.log(err);
            this.props.history.push('/error');
        });
    }

    cancel = () => {
        this.props.history.push('/');
    }

    render() {
        //setting up state to capture values
        const {
            emailAddress,
            password,
            errors
        } = this.state;

        return (
            <Fragment>
                <div className="bounds">
                    <div className="grid-33 centered signin">
                        <h1>Sign In</h1>
                        <Form 
                            cancel={this.cancel}
                            errors={errors}
                            submit={this.submit}
                            submitButtonText="Sign In"
                            elements={() => (
                                <Fragment>
                                    <input 
                                        id="emailAddress"
                                        name="emailAddress"
                                        type="text"
                                        value={emailAddress}
                                        onChange={this.change}
                                        placeholder="Email Address" />
                                    <input 
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={password}
                                        onChange={this.change}
                                        placeholder="Password" />
                                </Fragment>
                            )} />
                        <p>&nbsp;</p>
                        <p>
                        Don't have a user account? <Link to="/signup">Click here</Link> to sign
                        up!
                        </p>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default UserSignIn;