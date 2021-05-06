const Feed = require('../models/Post')

module.exports = {
    getFeed: async (req,res)=>{
        try{
            const posts = await Feed.find()
                .sort({ createdAt: 'desc' })
                .lean()
            res.render('feed.ejs', {posts: posts})
        }catch(err){
            console.log(err)
        }
    }
}