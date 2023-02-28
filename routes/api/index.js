const router = require('express').Router();
const friendRoutes = require('./friend-routes');
const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');

router.use('/friends', friendRoutes);
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;