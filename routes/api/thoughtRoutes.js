const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    updateReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought);

router.route('/:videoId').get(getSingleThought).put(updateThought).delete(deleteThought);

router.route('/:videoId/reactions').post(createReaction);

router.route('/:videoId/reactions/:reactionId').put(updateReaction).delete(deleteReaction);

module.exports = router;