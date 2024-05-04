const fs = require('fs');
const path = require('path');
const database = require('../database/connection');
const { Sequelize, Op, Model, DataTypes } = require('sequelize');
const basename = path.basename(__filename);
const models = {};

fs.readdirSync(__dirname)
  .filter((file) => (
    file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  ))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(database, DataTypes)
    models[model.name] = model;
  });

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});
module.exports = models;