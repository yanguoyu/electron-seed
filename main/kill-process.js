const killer = require('cross-port-killer');

console.log(`kill port begin`);
killer.kill(3000).then(pid => {
  console.log(`kill 3000 success, pid is${pid}`)
});
killer.kill(7001).then(pid => {
  console.log(`kill 7001 success, pid is${pid}`)
});
console.log(`kill port success`);