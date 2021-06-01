module.exports = {
    getIndex: (req,res)=>{
        //const isLogged = req.isAuthenticated();
        res.render('index.ejs')
    }
}
