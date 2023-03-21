import API from './API';

export default {
    getCourse() {
        return API.get('/course')
    },

    newCourse(req) {
        return API.post('/course/create_course', req)
    },

    editCourse(id) {
        return API.put(`/course/edit/${id}`)
    },
}