module.exports = {
  async up(db, client) {
    const users = await db.collection('users').find({}).toArray();
    let operations = []
    for (let i=0; i<users.length; i++) {
      let user = users[i]
      let updates = {
        userType: user.firstNameChild ? "student" : "teacher",

      }
      if (!user.bookCount) {
        updates.bookCount = 0;
        updates.pageCount = 0;
        updates.wordCount = 0;
        updates.imageCount = 0;
      }
      if (!user.classroomId) {
        updates.classroomId = null
      }
      operations.push(db.collection('users').updateOne({ _id: user._id }, {
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
