const express = require('express');
const User = require('../models/User');

module.exports = {
  doGetAllUsers : (req,res,next) => {
    User.getAllUsers();
  }
}