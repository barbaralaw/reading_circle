const Feed = require('../models/Post')
const User = require('../models/User')

module.exports = {
    getFeed: async (req,res)=>{
        try{
          //const isLogged = req.isAuthenticated();
            const posts = await Feed.find()
                .sort({ createdAt: 'desc' })
                .lean()
            //const userClassroomId = await User.find( { classroomId: req.user.classroomId })
            console.log('here we are: ', req.user.classroomId)
            res.render('feed.ejs', {posts:posts, userClassroomId: req.user.classroomId})
        }catch(err){
            console.log(err)
        }
    }
}
