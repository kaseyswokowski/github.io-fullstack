//stateful class component
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
const ReactMarkdown = require('react-markdown');

class CourseDetail extends Component {
    //setting up state
    constructor(props) {
        super(props);
        this.state = {
            courseDetail: []
        }
    }

    //when the component mounts grab the course details
    componentDidMount() {
        const { context } = this.props;
        const { id } = this.props.match.params;
        context.data.getCourse(id)
        .then(course => {
            if (course) {
                this.setState({
                    courseDetail: course
                });
            } else {
                this.props.history.push('/notfound');
            }
        })
        .catch(err => {
            console.log('Something went wrong: ', err);
            this.props.history.push('/error');
        });

    }

    //when the delete button is clicked pop up confirms. If confirmed the course is removed from the db
    onDelete = event => {
        //use the id and insert into the api call for the delete function.
        if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
            console.log('Delete Confirmed')
            //grabbing the id of the course from the url
            const { id } = this.props.match.params;
            const { context } = this.props;
            //getting the email and password of current auth user
            const emailAddress = context.authenticatedUser.emailAddress;
            const password = context.authenticatedUser.password

            //make the call using the method in data via context
            context.data.deleteCourse(id, emailAddress, password)
            .then(() => {
                //redirect back to home page
                this.props.history.push('/');
            })
            .catch(err => {
                console.log('Something went wrong: ', err);
                this.props.history.push('/error');
            });
        } else {
            console.log('Delete Canceled');
        }
    }

    render() {
        const { context } = this.props;
        const authUser = context.authenticatedUser;
        const { id, title, description, estimatedTime, materialsNeeded, userId, userInfo} = this.state.courseDetail;
        //was able to figure out how to access the nested object because of this article: https://hackernoon.com/accessing-nested-objects-in-javascript-f02f1bd6387f
        const userName = userInfo ? `${userInfo.firstName} ${userInfo.lastName}` : null;

        return (
            <Fragment>
                <div>
                    <div className="actions--bar">
                    {
                        (() => {
                            if (authUser) {
                                const authUserId = context.authenticatedUser.id;
                                if (authUserId === userId) {
                                    return (
                                        <Fragment>
                                            <div className="bounds">
                                                <div className="grid-100">
                                                <span>
                                                    <Link className="button" to={`/courses/${id}/update`}>
                                                    Update Course
                                                    </Link>
                                                    <button onClick={this.onDelete} className="button">
                                                    Delete Course
                                                    </button>
                                                </span>
                                                <Link className="button button-secondary" to="/">
                                                    Return to List
                                                </Link>
                                                </div>
                                            </div>
                                        </Fragment>
                                    );
                                } else {
                                    return (
                                        <Fragment>
                                            <div className="bounds">
                                                <div className="grid-100">
                                                <Link className="button button-secondary" to="/">
                                                    Return to List
                                                </Link>
                                                </div>
                                            </div>
                                        </Fragment>
                                    );
                                }
                            } else {
                                return (
                                        <Fragment>
                                            <div className="bounds">
                                                <div className="grid-100">
                                                <Link className="button button-secondary" to="/">
                                                    Return to List
                                                </Link>
                                                </div>
                                            </div>
                                        </Fragment>
                                    );
                            }
                        })()
                    }
                    </div>
                    <div className="bounds course--detail">
                    <div className="grid-66">
                        <div className="course--header">
                        <h4 className="course--label">Course</h4>
                        <h3 className="course--title">{title}</h3>
                        <p>By {userName} </p>
                        </div>
                        <div className="course--description">
                        <div>
                            <ReactMarkdown children={description} />
                        </div>
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                        <ul className="course--stats--list">
                            <li className="course--stats--list--item">
                            <h4>Estimated Time</h4>
                            <h3>{estimatedTime}</h3>
                            </li>
                            <li className="course--stats--list--item">
                            <h4>Materials Needed</h4>
                            <ul>
                                <ReactMarkdown children={materialsNeeded} />
                            </ul>
                            </li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default CourseDetail;