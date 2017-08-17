import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

import configenv from '../config/config.json';

const env = process.env.NODE_ENV || 'development';
const config = configenv[env];

const db = {};
const basename = path.basename(module.filename);

let sequelize;

if (configenv.use_env_variable) {
 console.log(configenv, config, '--------------');
 sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
 console.log(configenv, config, '???????????');
 sequelize = new Sequelize(
  config.database, config.username, config.password, config
 );
}

fs
 .readdirSync(__dirname)
 .filter(file =>
  (file.indexOf('.') !== 0) &&
  (file !== basename) &&
  (file.slice(-3) === '.js'))
 .forEach((file) => {
  const model = sequelize.import(path.join(__dirname, file));
  db[model.name] = model;
 });

Object.keys(db).forEach((modelName) => {
 if (db[modelName].associate) {
  db[modelName].associate(db);
 }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;