const express = require('express');

const router = express.Router();

const Users = require('./userDb.js'); //imports the user database
const Posts = require('../posts/postDb.js') // imports the post database


//posts a new user
router.post('/', (req, res) => {
  // /api/users
  Users.insert(req.body)
  .then(user => {
    res.status(201).json(user)
  })
  .catch(err => {
    res.status(500).json({message: `An error occurred when adding user: ${err}`})
  })
});

//creates a post from user
router.post('/:id/posts', validateUserId, (req, res) => {
  const newPost = {...req.body, user_id: req.user.id}
  console.log(req.body)
  Posts.insert(newPost)
  .then(post => {
    res.status(201).json(post)
  })
  .catch(err => {
    res.status(500).json({message: `error adding post: ${err}`})
  })
});

//gets list of users
router.get('/', (req, res) => {
  Users.get(req.query)
  .then(users => {
    res.status(200).json({message: 'error retrieving users'})
  })
  .catch(err => {
    res.status(500).json({message: `error retrieving users: ${err}`})
  })
});

//gets a specific user
router.get('/:id', validateUserId, (req, res) => {
  Users.getUserPosts(req.user.id)
  .then(posts => res.status(200).json(posts))
  .catch(err => {
    res.status(500).json({message: `error retrieving user: ${err}`})
  })
});

//get a user's posts
router.get('/:id/posts', validateUserId, (req, res) => {
  Users.getUserPosts(req.user.id)
  .then(posts => res.status(200).json(posts))
  .catch(err => {
    res.status(500).json({message: `${err} error retrieving posts`})
  })
});

//deletes a specific user
router.delete('/:id', (req, res) => {
  Users.remove(req.user.id)
  .then(user => {
    res.status(200).json({message: `${user} deleted`})
  })
  .catch(err => {
    res.status(500).json({message: `${err}: failed to delete`})
  })
});

//modifies specific user
router.put('/:id', validateUserId, (req, res) => {
  Users.update(req.user.id, req.body)
  .then(user => {
    res.status(200).json({message: `user ${user} updated successfully!`})
  })
  .catch(err => {
    res.status(500).json({message: `${err}: failed to update user`})
  })
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  Users.getById(id)
  .then(user => {
    if(!user){
      res.status(400).json({message: `invalid user id`})
    }
    else {
      req.user = user;
      next();
    }
  })
  .catch(err => {
    res.status(500).json({errorMessage: `${err} internal server error`})
  })
}

function validateUser(req, res, next) {
  if(!req.body){
    res.status(404).json({errorMessage: 'missing user data'})
  }
  else if (!req.body.name){
    res.status(400).json({message: 'missing required name field'})
  }
  else {
    next();
  }
}

function validatePost(req, res, next) {
  if(!req.body){
    res.status(404).json({errorMessage: 'missing post data'})
  }
  else if (!req.body.text) {
    res.status(400).json({errorMessage: 'missing post data'})
  }
  else {
    next();
  }
}

module.exports = router;
