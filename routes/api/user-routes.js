const router = require("express").Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require("../../controllers/userController");

router.route("/")
  .get(getUsers)
  .post(createUser);

router.route("/:userId")
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

router.route("/:userId/friends")
  .post(addFriend)

// http://localhost:3001/api/users/63fd9b3bd91e044bf249886e/friends/63fd9b3bd91e044bf249886f
router.route("/:userId/friends/:friendId")
  .delete(removeFriend)

module.exports = router;
