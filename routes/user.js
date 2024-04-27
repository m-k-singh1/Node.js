const express = require("express");
const router = express.Router();
const myuser = require("../model/user");

const { 
   hendelGetAllUser,
   hendelPostAllUser,
   hendelGetAllUserById,
   hendelPatchAllUserById,
   hendelDeleteAllUserById
   } = require("../controller/user")

router.route("/")
  .get(hendelGetAllUser)
  .post(hendelPostAllUser)
router.route("/:id")
  .get(hendelGetAllUserById)   
  .patch(hendelPatchAllUserById)      
  .delete(hendelDeleteAllUserById);

module.exports = router;