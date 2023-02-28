const router = require("express").Router();
const {
  getThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

// Get all thoughts, and create new thought from root route
router.route("/")
  .get(getThoughts)
  .post(createThought);

router.route("/:thoughtId")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought)

router.route("/:thoughtId/reactions/")
  .post(createReaction)

router.route("/:thoughtId/reactions/:reactionId")
  .delete(deleteReaction);

module.exports = router;