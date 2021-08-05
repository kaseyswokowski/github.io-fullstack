//stateful class component
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class Courses extends Component {
    //setting up state
    constructor(props) {
        super(props);
        this.state = {
            courses: []
        }
    }

    //fetching courses data
    componentDidMount() {
        //making the call via context and data to get all course data
        const { context } = this.props;
        context.data.getCourses()
        .then(courseData => {
            this.setState({
                courses: courseData
            });
        })
        .catch(err => {
            console.log('Something went wrong: ', err);
            this.props.history.push('/error');
        });
    }

    render() {
        const courses = this.state.courses;
        //using map to create a new array that I can include below
        //to add all of the courses in the db
        const coursesArray = courses.map(course => {
            return (
                <div key={course.id.toString()} className="grid-33">
                <Link className="course--module course--link" to={`/courses/${course.id}`}>
                    <h4 className="course--label">Course</h4>
                    <h3 className="course--title">{course.title}</h3>
                </Link>
                </div>
            );
        });

        return (
            <Fragment>
                <div className="bounds">
                    {coursesArray}
                    <div className="grid-33">
                    <Link
                        className="course--module course--add--module"
                        to="/courses/create"
                    >
                        <h3 className="course--add--title">
                        <svg
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            viewBox="0 0 13 13"
                            className="add"
                        >
                            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 " />
                        </svg>
                        New Course
                        </h3>
                    </Link>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Courses;