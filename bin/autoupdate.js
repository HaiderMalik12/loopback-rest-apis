"use strict";

const app = require('../server/server');
const ds = app.datasources.mysqlDs;

ds.autoupdate(['Customer'], err => {
  if (err) throw err;
  console.log('models synced!');
  ds.disconnect();
  process.exit();
});
