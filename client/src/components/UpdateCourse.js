//stateful class component
import React, { Component, Fragment } from 'react';
import Form from './Form';

class UpdateCourse extends Component {
    //setting up state
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            title: '',
            description: '',
            estimatedTime: '',
            materialsNeeded: '',
            userId: null,
            errors: []
        }
    }

    componentDidMount() {
        //getting the existing course data
        const { context } = this.props;
        const courseId = this.props.match.params.id;
        const authUserId = context.authenticatedUser.id;

        context.data.getCourse(courseId)
        .then(course => {
            const courseOwnerId = course.userId
            if (course) {
                if (courseOwnerId === authUserId) {
                    this.setState({
                        id: course.id,
                        title: course.title,
                        description: course.description,
                        estimatedTime: course.estimatedTime,
                        materialsNeeded: course.materialsNeeded,
                        userId: course.userId
                    });
                } else {
                    this.props.history.push('/forbidden');
                }
            } else {
                this.props.history.push('/notfound');
            }
        })
        .catch(err => {
            console.log('Something went wrong: ', err);
            this.props.history.push('/error'); 
        });
    }

    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name]: value
            }
        });
    }

    //updating course on submit
    submit = () => {
        const { context } = this.props;
        const {
            id,
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId
        } = this.state;

        //updated course payload
        const updateCourse = {
            id,
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId
        }

        //grabbing needed creds
        const emailAddress = context.authenticatedUser.emailAddress;
        const password = context.authenticatedUser.password;

        //calling updateCourse
        context.data.updateCourse(updateCourse, emailAddress, password)
        .then(errors => {
            if (errors.length) {
                this.setState({ errors });
            } else {
                console.log(`Course #${updateCourse.id} has been succesfully updated!`);
                //after course updated send back to course detail
                this.props.history.push(`/courses/${updateCourse.id}`);
            }
        })
        .catch(err => {
            console.log('Something went wrong: ', err);
            this.props.history.push('/error');
        });
    }

    cancel = () => {
        //redirecting back to the course detail page
        this.props.history.push(`/courses/${this.state.id}`);
    }

    render() {
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            errors
        } = this.state;
        
        return (
            <Fragment>
                <div className="bounds course--detail">
                    <h1>Update Course</h1>
                        <Form 
                            cancel={this.cancel}
                            errors={errors}
                            submit={this.submit}
                            submitButtonText="Update Course"
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
                                        <p>By Joe Smith</p>
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

export default UpdateCourse;