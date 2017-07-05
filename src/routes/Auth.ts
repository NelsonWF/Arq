import { log, Jwt } from '../utils/';
import * as passport from 'passport';
import { BasicStrategy, DigestStrategy } from 'passport-http';
import * as BearerStrategy from 'passport-http-bearer';

//Serialize passport
passport.serializeUser<any, any>((user, done) => {
    done(undefined, user.id);
});

//Deserialize passport
passport.deserializeUser((user, done) => {
    //TODO: configurar
    done(undefined, user);
});

//Sign Basic in using Email and Password. 
passport.use(new BasicStrategy({}, function (user, password, done) {
    log.info(user);
    let token = Jwt.create();
    log.info(token);
    log.error(""+Jwt.verify(token));
    if (user)
        done(null, { id: 1, user: user, username: "Nelson Wandurraga" });
    else
        done({ err: "sdfsdfsdf ffsd" });
}));
//Sign Bearer with Token
passport.use(new BearerStrategy({}, function (token, done) {
    log.info(token);
    log.error(""+Jwt.verify(token));
    done(null, { id: 1, token: token, username: "Nelson Wandurraga" }, { scope: '*' });
}));
export let isAuthenticated = passport.authenticate(['basic', 'bearer'], { session: false });
