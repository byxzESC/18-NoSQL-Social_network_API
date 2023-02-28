const router = require("express").Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../../controllers/userController");

router.route("/")
  .get(getUsers)
  .post(createUser);

router.route("/:userId")
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// router.route("/:userId/friends/:friendId")
//   .post()
//   .delete()

module.exports = router;
