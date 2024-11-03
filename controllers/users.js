const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const joi = require("joi");
const { Home } = require("../models/home");
module.exports = {
  logIn: async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) {
      res.status(400).json(error.details[0].message);
      return;
    }
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).json({error:"invalid email or password"});
      return;
    }
    const pass = await bcrypt.compare(req.body.password, user.password);
    if (!pass) {
      res.status(400).json({error:"invalid email or password"});
      return;
    }
    const token = user.genToken();
    res.header("x-auth-token", token);
    res.json({message:"logged in successfully"});
  },
  getHome: async (req, res, next) => {
    if (!req.tokenPayload.homeId) {
      res.status(403).json({error:"accsess denied"});
    }
    const home = await Home.findById(req.tokenPayload.homeId);
    res.send(home);
  },
  googleLogIn: async (req, res, next) => {
    if(!req.user){
      res.status(400).json({error:"unauthorized"});
      return;
    }
    let user = new User(req.user);
    const token = user.genToken();
    res
      .status(200)
      .header("x-auth-token", token)
      .json({message:"logged in successfully"});
  },
};
function validate(user) {
  const schema = joi.object({
    email: joi.string().email().min(3).max(255).required(),
    password: joi.string().required(),
  });
  return schema.validate(user);
}
