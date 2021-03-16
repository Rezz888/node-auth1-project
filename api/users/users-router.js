const express = require("express")
const bcrypt = require("bcryptjs")

const db = require("./users-model")
const { restrict } = require("../auth/auth-middleware")
const router = express.Router()
// Require the `restricted` middleware from `auth-middleware.js`. You will need it here!


/**
  [GET] /api/users

  This endpoint is RESTRICTED: only authenticated clients
  should have access.

  response:
  status 200
  [
    {
      "user_id": 1,
      "username": "bob"
    },
    // etc
  ]

  response on non-authenticated:
  status 401
  {
    "message": "You shall not pass!"
  }
 */

  router.get("/api/users", restrict(), async (req, res, next) => {
    try {
       const users = await db.find()
       res.json(users)

    } catch(err){
      next(err)
    }
  })


// Don't forget to add the router to the `exports` object so it can be required in other modules

module.exports = router