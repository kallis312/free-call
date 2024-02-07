import userModel from "@/models/userModel"
import { ExtractJwt, Strategy } from "passport-jwt"

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: process.env.JWT_SECRET || 'SecretSupterStar',
};


export const jwtLogin = new Strategy(jwtOptions, async (payload, done) => {
  console.log('passport => ', payload)
  const existUser = await userModel.findOne({ where: { id: payload.id } })
  if (existUser)
    done(null, existUser)
  else
    done(false)
});
