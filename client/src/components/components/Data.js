//helper class to help allow the React client to talk to the Express Server
import config from '../config';

export default class Data {
    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
        const url = config.apiBaseUrl + path;

        const options = {
            method,
            headers: {
            'Content-Type': 'application/json; charset=utf-8',
            },
        };

        if (body !== null) {
            options.body = JSON.stringify(body);
        }

        //checking if auth is required
        if (requiresAuth) {
            //encode the credentials that were passed through
            const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
            //set the auth header
            //Example: Authorization: Basic am9lQHNtaXRoLmNvbTpqb2U=
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }

        return fetch(url, options);
    }

    async getUser(emailAddress, password) {
        const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
        if (response.status === 200) {
            return response.json().then(data => data);
        } else if (response.status === 401) {
            return null;
        } else {
            throw new Error();
        }
    }

    async createUser(user) {
        const response = await this.api('/users', 'POST', user);
        if (response.status === 201) {
            return [];
        } else if (response.status === 400) {
            return response.json().then(data => {
                console.log('Error from Data.js: ', data);
                return data;
            });
        } else {
            throw new Error();
        }
    }

    //create new course
    //requires auth and need to pass creds
    async createCourse(course, emailAddress, password) {
        const response = await this.api('/courses', 'POST', course, true, { emailAddress, password });
        if (response.status === 201) {
            return [];
        } else if (response.status === 400) {
            return response.json().then(data => {
                console.log('Error from Data.js: ', data);
                return data;
            });
        } else {
            throw new Error();
        }
    }

    //update an existing course
    //requires auth and need to pass creds
    async updateCourse(course, emailAddress, password) {
        const response = await this.api(`/courses/${course.id}`, 'PUT', course, true, { emailAddress, password });
        if (response.status === 204) {
            return [];
        } else if (response.status === 400) {
            return response.json().then(data => {
                console.log('Error from Data.js: ', data);
                return data;
            });
        } else {
            throw new Error();
        }
    }
    
    //get specific course
    //requires auth and need to pass creds
    async getCourse(courseId) {
        const response = await this.api(`/courses/${courseId}`, 'GET');
        if (response.status === 200) {
            return response.json().then(data => data);
        } else if (response.status === 401) {
            return null;
        } else {
            throw new Error();
        }
    }    

    //get all existing courses
    async getCourses() {
        const response = await this.api('/courses', 'GET');
        if (response.status === 200) {
            return response.json().then(data => data);
        } else if (response.status === 401) {
            return null;
        } else {
            throw new Error();
        }
    }    


    //delete course
    //204 no content is good.
    async deleteCourse(courseId, emailAddress, password) {
        const response = await this.api(`/courses/${courseId}`, 'DELETE', null, true, { emailAddress, password });
        if (response.status === 204) {
            return [];
        } else if (response.status === 401) {
            return response.json().then(data => data);
        } else {
            throw new Error();
        }
    }    
}