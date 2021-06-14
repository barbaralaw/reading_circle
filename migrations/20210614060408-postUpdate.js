const mongoose = require('mongoose')

module.exports = {
  async up(db, client) {
    const users = await db.collection('users').find({}).toArray();
    const userToClass = {}
    for (let i=0; i<users.length; i++) {
      let user = users[i]
      userToClass[user._id] = user.classroomId
    }

    const posts = await db.collection('posts').find({}).toArray();

    let operations = []
    for (let i=0; i<posts.length; i++) {
      let post = posts[i]
      console.log(typeof post.userId)
      let userId = post.userId.toString()
      console.log(userId)
      let updates = {
        // add the classroom id of the user who made each post
        classroomId : userToClass[userId],
      }

      operations.push(db.collection('posts').updateOne({ _id: post._id }, {
        $set: updates
      }))
    }
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};


// make userId into foreign key
