/**
 * Created by haidermalik504 on 2/7/18.
 */
'use strict';

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
  'Role'
];
ds.automigrate(models, (err) => {
  if (err) {
    throw err;
  }
  console.log('models created!');
  ds.disconnect();
  process.exit();
});
