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

// gets a specific post
router.get('/:id', (req, res) => {
  // /api/posts
  Posts.getById(req.params.id)
  .then(post => {
    res.status(200).json(post)
  })
  .catch(err => {
    res.status(500).json({message: `${err} error retrieving post`})
  })
});

// deletes a specific post
router.delete('/:id', (req, res) => {
  // /api/posts
  Posts.remove(req.params.id)
  .then(post => {
    res.status(200).json(post)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({errorMessage: 'failed to delete'})
  })
});

//modifies a specific post
router.put('/:id', (req, res) => {
  // /api/posts
  Posts.update(req.params.id, req.body)
  .then(post => {
    res.status(200).json(post)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({message: 'failed to update post'})
  })
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
