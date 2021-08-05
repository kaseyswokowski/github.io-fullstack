//stateful class component
import React, { Component, Fragment } from 'react';
import Form from './Form';

class CreateCourse extends Component {
    //setting up state
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            estimatedTime: '',
            materialsNeeded: '',
            userId: null,
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

    //on submit create new course
    submit = () => {
        const { context } = this.props;
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded
        } = this.state;

        //new course payload
        const newCourse = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId: context.authenticatedUser.id
        }

        //grabbing needed creds
        const emailAddress = context.authenticatedUser.emailAddress;
        const password = context.authenticatedUser.password;

        //create the new course using context.createCourse
        context.data.createCourse(newCourse, emailAddress, password)
        .then(errors => {
            if (errors.length) {
                this.setState({ errors });
            } else {
                console.log(`User ${context.authenticatedUser.emailAddress} succesfully created this course: ${newCourse}`);
                //after course created send to /
                this.props.history.push('/');
            }
        })
        .catch(err => {
            console.log('Something went wrong: ', err);
            //redirect to err page
            this.props.history.push('/error');
        });
    }

    cancel = () => {
        //redirecting back to the main public page /
        this.props.history.push('/');
    }


    render() {
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            errors
        } = this.state;
        //grabbing currently authenticated user to populate the By line
        const { context } = this.props;
        const userName = `${context.authenticatedUser.firstName} ${context.authenticatedUser.lastName}`;

        return (
            <Fragment>
                <div className="bounds course--detail">
                    <h1>Create Course</h1>
                        <Form 
                            cancel={this.cancel}
                            errors={errors}
                            submit={this.submit}
                            submitButtonText="Create Course"
                            elements={() => (
                                <Fragment>
                                <div className="grid-66">
                                    <div className="course--header">
                                        <h4 className="course--label">Course</h4>
                                        <input 
                                            id="title"
                                            name="title"
                                            type="text"
                                            value={title}
                                            onChange={this.change}
                                            placeholder="Course title..." />
                                    <p>By {userName} </p>
                                    </div>
                                    <div className="course--description">
                                        <textarea 
                                            id="description"
                                            name="description"
                                            className="desc"
                                            value={description}
                                            onChange={this.change}
                                            placeholder="Course description..." />
                                    </div>
                                </div>
                                    <div className="grid-25 grid-right">
                                        <div className="course--stats">
                                            <ul className="course--stats--list">
                                                <li className="course--stats--list--item">
                                                    <h4>Estimated Time</h4>
                                                    <Fragment>
                                                        <input 
                                                            id="estimatedTime"
                                                            name="estimatedTime"
                                                            type="text"
                                                            className="course--time--input"
                                                            value={estimatedTime}
                                                            onChange={this.change}
                                                            placeholder="Hours" />
                                                    </Fragment>
                                                </li>
                                                <li className="course--stats--list--item">
                                                    <h4>Materials Needed</h4>
                                                    <Fragment>
                                                    <textarea 
                                                        id="materialsNeeded"
                                                        name="materialsNeeded"
                                                        className="materials"
                                                        value={materialsNeeded}
                                                        onChange={this.change}
                                                        placeholder="List materials..." />
                                                    </Fragment>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>   
                            </Fragment> )} />
                </div>
        </Fragment>            
        );
    }
}

export default CreateCourse;