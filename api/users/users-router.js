const router = require("express").Router()
const { protect } = require("../auth/auth-middleware");

const Users = require("./users-model.js")

router.get("/", protect, (req, res, next) => {
  Users.find()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(next)
})

module.exports = router
