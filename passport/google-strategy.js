const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const mongoose = require('mongoose');

module.exports = (passport) => {

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        mongoose.model('User').findById(id, (err, item) => {
            if (err)
                done(err, null);
            else
                done(null, item);
        });
    });


    passport.use('google', new GoogleStrategy({
            clientID: '413479812004-0rdarjlcghnji9q68alnp2mt58519ivg.apps.googleusercontent.com',
            clientSecret: 'xEDbr_9MhWKFhJD6c2uOA8p9',
            callbackURL: "http://localhost:8080/auth/google/callback"
        },
        function (accessToken, refreshToken, profile, cb) {
            if (accessToken) {
                mongoose.model('User').findOne({
                    "google.id": profile.id
                }, (err, user) => {
                    if (err)
                        return cb(err);
                    if (!user) {
                        const user = new mongoose.model('User')({
                            username: profile.name.givenName,
                            name: profile.displayName,
                            google: {
                                accessToken,
                                refreshToken,
                                id: profile.id
                            }
                        });
                        user.save(err => {
                            return cb(err, user);
                        });

                    } else {
                        user.google.accessToken = accessToken;
                        user.google.refreshToken = refreshToken;

                        user.save(err => {
                            cb(err, user);
                        });
                    }
                });
            }
        }
    ));
}