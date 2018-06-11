/*
Setting Up a REPL with Sequelize
   Read-Evaluate-Print-Loop
   This will customize REPL to load our models and helper code into the context of the REPL

Why Use a REPL?
   Test out features without running application


Setting Up a Node.js REPL
   repl-history and repl-models are helpful
*/
// Source
// Require the REPL module and models
var repl = require("repl").start({});
var models = require("./models");

// Make the 'models' object a global variable in the REPL
repl.context.models = models;

// Make each model a global object in the REPL
Object.keys(models).forEach(modelName => {
  repl.context[modelName] = models[modelName];
});

// Provide a convenience function `lg` to pass
// to `then()` and `catch()` to output less verbose
// values for sequelize model query results
repl.context.lg = data => {
  if (Array.isArray(data)) {
    if (data.length && data[0].dataValues) {
      data = data.map(item => item.dataValues);
    } else {
      if (data.dataValues) {
        data = data.dataValues;
      }
    }
  }
  console.log(data);
};

// Above code:
// 1. Require Node.js REPL module and our models
// 2. Set the models object and each model as a global variable in the repl
// 3. Provides a function lg to pass to promise then() and catch() functions to output results in a less verbose format

//    $ node repl.js
// User.findAll({}).then(lg);

// Promise {
//   _bitField: 2097152,
//   _fulfillmentHandler0: undefined,
//   _rejectionHandler0: undefined,
//   _promise0: undefined,
//   _receiver0: undefined,
//   _boundTo: User }
// > Executing (default): SELECT "id", "fname", "lname", "username", "email", "createdAt", "updatedAt" FROM "Users" AS "User";
// [ { id: 1,
//     fname: 'Foo0',
//     lname: 'Bar0',
//     username: 'foobar0',
//     email: 'foobar0@gmail.com',
//     createdAt: 2017-04-07T07:19:22.421Z,
//     updatedAt: 2017-04-07T07:19:22.421Z },
//   { id: 2,
//     fname: 'Foo1',
//     lname: 'Bar1',
//     username: 'foobar1',
//     email: 'foobar1@gmail.com',
//     createdAt: 2017-04-07T07:19:22.421Z,
//     updatedAt: 2017-04-07T07:19:22.421Z },
//   { id: 3,
//     fname: 'Foo2',
//     lname: 'Bar2',
//     username: 'foobar2',
//     email: 'foobar2@gmail.com',
//     createdAt: 2017-04-07T07:19:22.421Z,
//     updatedAt: 2017-04-07T07:19:22.421Z },
//...

// Setting Up a convenience Command with NPM
/*
   In scripts (package.json)
      "c": "node repl.js"
      npm run c will bring up console
*/
