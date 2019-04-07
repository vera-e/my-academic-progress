const mongoose = require('mongoose')

// Course Schema
const CourseSchema = mongoose.Schema({
  cid: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  semester: {
    type: Number,
    required: true
  }
})

const Course = module.exports = mongoose.model('Course', CourseSchema)

module.exports.getCourseById = function (cid, callback) {
  const query = { cid: new RegExp('^' + cid, 'i') }
  Course.find(query, callback)
}

module.exports.addCourse = function (newCourse, callback) {
  newCourse.save(callback)
}
