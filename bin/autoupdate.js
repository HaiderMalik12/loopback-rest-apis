"use strict";

const app = require('../server/server');
const ds = app.datasources.mysqlDs;

const models = [
  'Customer',
  'Order',
  'OrderItem',
  'Item',
  'CreditCard',
  'User',
  'AccessToken',
  'ACL',
  'RoleMapping',
  'Role',
  'Message'
];
ds.autoupdate(models, err => {
  if (err) throw err;
  console.log('models synced!');
  ds.disconnect();
  process.exit();
});
