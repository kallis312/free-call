import userModel, { UsertModel } from "@/models/userModel";
import passport from "passport"
import { ExtractJwt, Strategy } from "passport-jwt"

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: process.env.SECRET_KEY || 'secret',
};

const jwtLogin = new Strategy(jwtOptions, async (payload, done) => {
  const existUser = await userModel.findOne({ where: { id: payload.id } })
  if (existUser)
    done(null, existUser)
  else
    done(false)
});

passport.use(jwtLogin);