const User = require("../db/models/User");
const bcrypt = require("bcrypt");

const LocalStrategy = require("passport-local").Strategy;

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const User = await User.findOne({ where: { username: username } });

    const userAuthenticated = User
      ? await bcrypt.compare(password, User.password)
      : false;

    if (userAuthenticated) return done(null, User);
    else return done(null, false);
  } catch (error) {
    done(error);
  }
});
