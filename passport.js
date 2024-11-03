const passport = require("passport");
const { User } = require("./models/user");
const googlePlusTokenStrategy = require("passport-google-plus-token");
passport.use(
  "googleToken",
  new googlePlusTokenStrategy(
    {
      clientID:
        "317440382796-eipeejq5l40qkloklhht1l7296f8d02u.apps.googleusercontent.com",
      clientSecret: "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",
    },
    async (accessToken,refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ googleId: profile.id });
        if (user) {
          //in controller i have req.user with the user that verified his gmail
          // if it's match any google id in db it will be unathorized(400)
          return done(null, user);
        } else {
          console.log("it doesn't exist");
          return;
        }
      } catch (err) {
        console.log(err);
      }
    }
  )
);
