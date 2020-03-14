const http = require('http');//подключение модуля сервера(уже есть в ноде)
const fs = require('fs');//подключение модуля файловой системы

const server = http.createServer(function(req, res){    //создаем сервер+инциализируем функцию, которая будет активироваться с каждым запросом на сервер
    const url = req.url;//константа, которая будет означать нашу ссылку
    const method = req.method; 
    if (url === '/') {//при переходе на ссылку localhost:3000/ будет запускаться код снизу
        res.write('<html>');
    res.write('<head><title>Enter message</title></head>');
    res.write('<body><form action="/message" method="POST"><input type ="text" name="message"><button type="submit">Send</button></form></body>');
    res.write('</html>');
    return res.end();//выходим из функции
    }
    if (url === '/message' && method === 'POST') {
        const body =[];//array with chunks
        req.on('data', (chunk) =>  { //listen events and fuctioin receve's chunk of data to work with
            console.log(chunk);
            body.push(chunk);//add chunk
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();//converting chunks to a string
            const message = parsedBody.split("=")[1];//присваиваем сообщение константе 
            fs.writeFile('message.txt', message, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
       
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('</head><title>MyFirstAss</title></head>');
    res.write('<body><h1>Hello faggot</h1></body>');
    res.write('</html>');
    res.end();
});

server.listen(3000);