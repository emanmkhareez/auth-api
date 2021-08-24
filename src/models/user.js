'use strict'

const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'super-secret';
const user = (sequelize, DataTypes) => {
 const model=sequelize.define("users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
        type: DataTypes.VIRTUAL,
        get() {
            return jwt.sign({ username: this.username, test: 'this is a test payload' }, SECRET);
        },
        set(tokenObj) { 
            let token = jwt.sign(tokenObj, SECRET);
            return token;
        },
    
    }

  });
  model.beforeCreate(async(user1)=>{
      let hash=await bcrypt.hash(user1.password,10)
      user1.password=hash
  })
model.authenticateBasic =async function(username,password){
  const user=await this.findOne({where:{username}})
  const valid=await bcrypt.compare(password,user.password)
  if(valid){
      return user
  }
  throw new Error('invalid user')
}

model.authenticateBearer = async function (token) {
    console.log(token);
    console.log(jwt.decode(token));

    const verifiedToken = jwt.verify(token, SECRET);

    //if not verfiied you need to throw an error
    const user = await this.findOne({ where: { username: verifiedToken.username } });

    if(user) { return user;}
    throw new Error('Invalid user');

}


  return model

}
module.exports=user;
