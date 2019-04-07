const express = require('express')
const router = express.Router()

const Course = require('../models/course')

router.post('/', (req, res, next) => {
  let newCourse = new Course({
    cid: req.body.cid,
    name: req.body.name,
    semester: req.body.semester
  })
  Course.addCourse(newCourse, (err, course) => {
    if (err) {
      res.json({ success: false, msg: 'Failed to add a new course' })
    } else {
      res.json({ success: true, msg: 'A new course added' })
    }
  })
})

router.get('/all/:cid3', (req, res, next) => {
  // Get all course with first 3 cid
  let cid3 = req.params.cid3
  if (cid3.length === 3) {
    Course.getCourseById(cid3, (err, course) => {
      if (err) {
        res.json({ success: false, msg: `Failed to reach db` })
      } else {
        res.json(course)
      }
    })
  } else {
    res.json({ success: false, msg: `Must enter only first 3 character of course id` })
  }
})

router.get('/:cid', (req, res, next) => {
  // Get a course with exact cid
  let cid = req.params.cid
  if (cid.length === 6) {
    Course.getCourseById(cid, (err, course) => {
      if (err) {
        res.json({ success: false, msg: `Failed to reach db` })
      } else {
        res.json(course)
      }
    })
  } else {
    res.json({ success: false, msg: `Must enter all 6 character of course id` })
  }
})

module.exports = router
