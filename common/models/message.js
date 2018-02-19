module.exports = function (Message) {
  Message.greet = function (msg, cb) {
    process.nextTick(function () {
      msg = msg || 'hello';
      cb(null, 'Sender says ' + msg + ' to receiver');
    });
  };

  Message.customCreate = function (data, context, callback) {

    Message.create({
      title: data.title,
      description: data.description,
      userId: context.accessToken.userId
    }, (err, message) => {
      if (err) {
        callback(err);
      }
      callback(null, message);
    })
  };


  Message.remoteMethod('customCreate', {
    http: {
      verb: 'post',
      path: '/custom-create'
    },
    accepts: [
      {
        arg: 'data',
        type: 'object',
        http: {
          source: 'body'
        }
      },
      {
        arg: 'context',
        type: 'object',
        http: 'optionsFromRequest'
      }],
    returns: {
      arg: 'message',
      type: 'object'
    }
  });

  Message.customFind = function (criteria, callback) {

    Message.find(criteria)
      .then(messages => {
        callback(null, messages);
      })
      .catch(err =>{
        callback(err);
      })

  };

  Message.remoteMethod('customFind', {
    accepts: {
      arg: 'criteria',
      type: 'object'
    },
    http:{
      verb: 'get',
      path: '/custom-find'
    },
    returns:{
      arg: 'messages',
      type: 'array'
    }
  });

  Message.customFindById = function (id, callback) {

    Message.findById(id)
      .then(message => {
        callback(null, message);
      })
      .catch(err =>{
        callback(err);
      })

  };

  Message.remoteMethod('customFindById', {
    accepts: {
      arg: 'id',
      type: 'number'
    },
    http:{
      verb: 'get',
      path: '/custom-findById'
    },
    returns:{
      arg: 'message',
      type: 'object'
    }
  });
};
