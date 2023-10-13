

module.exports = {
    protect
}

async function protect(req,res,next) {
   if (req.session.user) {
    next();
   } else {
    next({status : 401, message : 'you shall not pass'})
   }
}