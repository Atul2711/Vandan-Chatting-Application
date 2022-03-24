const User=require('../models/userModel')
const bcrypt=require("bcrypt")

module.exports.register=async (req,res,next)=>{
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: hashedPass,
        });
    
        const user = await newUser.save();
        //delete user.password
        return res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const validated = await bcrypt.compare(password, user.password);
    if (!validated)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

module.exports.setAvatar=async(req,res,next)=>{
  try{
    const userId=req.params.id;
    const avatarImage=req.body.image;
    const userData=await User.findByIdAndUpdate(userId,{
      isAvatarImageSet:true,
      avatarImage
    });
    return res.json({isSet:userData.isAvatarImageSet,image:userData.avatarImage})

  }catch(err){
    next(err);
  }
}

module.exports.getAllUsers=async(req,res,next)=>{
  try{
    const users=await User.find({_id:{$ne:req.params.id}}).select([
      "email","username","avatarImage","_id"
    ]);

    return res.json(users);
  }catch(ex){
    next(ex);
  }
}