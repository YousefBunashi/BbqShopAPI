const User = require("../db/models/User");
const bcrypt = require("bcrypt");

const LocalStrategy = require("passport-local").Strategy;

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const User = await User.findOne({
      where: { username },
    });
    const passwordsMatch = User
      ? await bcrypt.compare(password, User.password)
      : false;

    if (passwordsMatch) {
      return done(null, User);
    }
    return done(null, false);
  } catch (error) {
    done(error);
  }
});
