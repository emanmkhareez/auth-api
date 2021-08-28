"use strict";

const express = require('express');
const authRouter = express.Router();

const { users } = require('../models');

const signupCheck = require("../middelware/signupCheck.js");
const basicAuth = require('../middelware/basic.js')
const bearerAuth = require('../middelware/bearer.js')
const permissions = require('../middelware/acl')

authRouter.post('/signup', signupCheck, async (req, res, next) => {
  const userInfo = {
    id: req.user.id,
    username: req.user.username,
    password: req.user.password
  };
  res.status(201).json(userInfo);
});

authRouter.post('/signin', basicAuth, (req, res, next) => {
  const user = {
    username: req.user.username,
    password: req.user.password,
    role: req.user.role,
    capabilities: req.user.capabilities,
    token: req.user.token
  };
  res.status(200).json(user);
});

authRouter.get('/users', bearerAuth, permissions('delete'), async (req, res, next) => {
  try {
    const userRecords = await users.findAll({});
    const list = userRecords.map(user => `◼ ${user.username} 〰 ${user.role}`);
    res.status(200).json(list);
  } catch (e) {
    next(e.message)
  }
});

authRouter.get('/secret', bearerAuth, async (req, res, next) => {
  const secretInfo = {
    secret: 'Welcome to the secret area 🔐',
    user: req.user,
 
    token: `📌 ${req.token}`
  };
  console.log(req.user)
  res.status(200).json(secretInfo)
});

module.exports = authRouter;
