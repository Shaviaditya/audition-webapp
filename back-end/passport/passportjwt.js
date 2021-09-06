const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../src/models/user.model');

//------------------------adddition-------------------	


//---------------------------------------addition------------------------	
module.exports = function (passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = 'GLUGAUDITION2021';
    //opts.secretOrKey = process.env.SECRET;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.getUserById(jwt_payload.id, (err, User) => {
            if (err) {
                return done(err, false);
            }
            if (User) {
                return done(null, User);
            } else {
                return done(null, false);
            }
        });
    }))


    passport.serializeUser((user, done) => {
        done(null, user.id);
    })

    passport.deserializeUser((id, done) => {
        User.findById(id).then((user) => {
            done(null, user);

        })
    })
}
