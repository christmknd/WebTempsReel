"use strict";

const bcrypt = require("bcryptjs");

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async function (db, callback) {
  const password_hash = await bcrypt.hash("pwd", 10);
  const dateNow = new Date();
  await db.insert(
    "users",
    [
      "username",
      "password",
      "firstname",
      "lastname",
      "role",
      "createdAt",
      "updatedAt",
    ],
    ["user1", password_hash, "firstname", "lastname", "user", dateNow, dateNow],
    callback
  );
  await db.insert(
    "users",
    [
      "username",
      "password",
      "firstname",
      "lastname",
      "role",
      "createdAt",
      "updatedAt",
    ],
    ["user2", password_hash, "firstname", "lastname", "user", dateNow, dateNow],
    callback
  );
  await db.insert(
    "users",
    [
      "username",
      "password",
      "firstname",
      "lastname",
      "role",
      "createdAt",
      "updatedAt",
    ],
    ["user3", password_hash, "firstname", "lastname", "user", dateNow, dateNow],
    callback
  );
  await db.insert(
    "users",
    [
      "username",
      "password",
      "firstname",
      "lastname",
      "role",
      "createdAt",
      "updatedAt",
    ],
    [
      "admin1",
      password_hash,
      "firstname",
      "lastname",
      "admin",
      dateNow,
      dateNow,
    ],
    callback
  );
  await db.insert(
    "users",
    [
      "username",
      "password",
      "firstname",
      "lastname",
      "role",
      "createdAt",
      "updatedAt",
    ],
    [
      "admin2",
      password_hash,
      "firstname",
      "lastname",
      "admin",
      dateNow,
      dateNow,
    ],
    callback
  );
  return null;
};

exports.down = function (db, callback) {
  db.runSql("DELETE FROM users", callback);
  return null;
};

exports._meta = {
  version: 1,
};
