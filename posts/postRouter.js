const express = require('express'); //imports express

const router = express.Router(); //adds router to express

const Posts = require('./postDb'); //imports the posts database

//gets list of posts
router.get('/', (req, res) => {
  // /api/posts
  Posts.get(req.query)
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({message: 'failed to get posts'})
  })
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
