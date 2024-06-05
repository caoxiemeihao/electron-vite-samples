// ✅ Only use `require("./fsevents.node")`
const fsevents = require('fsevents');

// ✅ Build with node-gyp, has a fixed path -- `node_modules/sqlite3/Release/node_sqlite3.node`
const sqlite3 = require('sqlite3');

// ✅ Build with node-gyp, has a fixed path -- `node_modules/better-sqlite3/Release/node_sqlite3.node`
const better_sqlite3 = require('better-sqlite3');

// ❌ Finally import `@serialport/bindings-cpp` --- `node_modules/@serialport/bindings-cpp/prebuilds/win32-x64/node.napi.node`
// const serialport = require('serialport');

console.log('fsevents:', typeof fsevents);
console.log('sqlite3:', typeof sqlite3);
console.log('better_sqlite3:', typeof better_sqlite3);
// console.log('serialport:', typeof serialport);

module.exports = {
  fsevents,
  sqlite3,
  better_sqlite3,
  // serialport,
};
