const http = require('http');//подключение модуля сервера(уже есть в ноде)
const routs = require('./routs');//подключение модуля файловой системы

const server = http.createServer(routs);   //создаем сервер+инциализируем функцию, которая будет активироваться с каждым запросом на сервер;

server.listen(3000);