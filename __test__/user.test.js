'use strict'


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Sequelize, DataTypes } = require('sequelize');
const UsersSchema = require('../src/models/user');

const sequelize = new Sequelize('postgres://postgres@localhost:5432/testdb');

const Users = UsersSchema(sequelize, DataTypes);

beforeAll(async () => {
    await sequelize.sync();
});

afterAll(async () => {
    await sequelize.drop();
});

describe("bearer auth",()=>{
    let userInfo = {
        username: 'eman',
        password: '12345'
    }
    it('create user with hash password',async ()=>{
 
  let user = await Users.create(userInfo);
        
  let isValid = await bcrypt.compare(userInfo.password, user.password);

  expect(user.id).toBeTruthy();
  
  expect(isValid).toBeTruthy();

    })

    it('should attach a teken on find', async () => {
       
      
        let user = await Users.findOne({ username: userInfo.username});
        let decodedJwt = jwt.decode(user.token);

      
        expect(user.username).toEqual(userInfo.username);
        expect(user.token).toBeTruthy();
        expect(decodedJwt.username).toEqual(userInfo.username);
    });

})