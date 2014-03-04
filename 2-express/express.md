# NodeJS web 应用实践 2 －express

在前一篇文章中，有一段代码展示了创建HTTP Server的过程。

		var http = require('http');
		http.createServer(function (req, res) {
  			res.writeHead(200, {'Content-Type': 'text/plain'});
  			res.end('Hello World\n');
		}).listen(1337, '127.0.0.1');
		
一个匿名函数，接受了*req*,*res*的值，当调用者访问时，这个函数控制了请求和返回结果。如果能构建一个框架，可以分类型的处理这些请求，就可以快速开发web应用的工具。基于这样的想法，**senchalabs** 提供了[connect 框架](http://www.senchalabs.org/connect/).

## Connect 拦截器

		var app = connect()
 		 .use(connect.logger('dev'))
   		 .use(connect.static('public'))
   		 .use(function(req, res){
    			res.end('hello world\n');
  			})

		http.createServer(app).listen(3000);
		
use形成了一个拦截器栈，按照顺序得到请求和执行返回的对象。每个拦截器按照它的逻辑来检测，处理请求和返回。 当一个拦截器返回了请求，那么后面的拦截器就没有被执行。 Connect有很多拦截器，也称**中间件** －
	
>**logger** request logger with custom format support

>**csrf** Cross-site request forgery protection

>**compress** Gzip compression middleware

>**basicAuth** basic http authentication
> 
>**bodyParser** extensible request body parser
> 
>**json** application/json parser

>**urlencoded** application/x-www-form-urlencoded parser

>**multipart** multipart/form-data parser

>**timeout** request timeouts

>**cookieParser** cookie parser

>**session** session management support with bundled MemoryStore

>**cookieSession** cookie-based session support

>**methodOverride** faux HTTP method support

>**responseTime** calculates response-time and exposes via X-Response-Time

>**staticCache** memory cache layer for the static() middleware

>**static** streaming static file server supporting Range and more

>**directory** directory listing middleware

>**vhost** virtual host sub-domain mapping middleware

>**favicon** efficient favicon server (with default icon)

>**limit** limit the bytesize of request bodies

>**query** automatic querystring parser, populating req.query

>**errorHandler** flexible error handler

然而，开发者们还不满意，框架还不够简单！于是乎，express诞生了。

## [Express](http://expressjs.com/)

express是基于connect的，在express里，可以直接使用connect的中间件。

### install express

		sudo npm install express --global
		
### create a skelecton

		express -e foo
		
		  create : foo
   		  create : foo/package.json
          create : foo/app.js
          create : foo/public
   		  create : foo/public/javascripts
          create : foo/public/images
          create : foo/public/stylesheets
          create : foo/public/stylesheets/style.css
          create : foo/routes
          create : foo/routes/index.js
          create : foo/routes/user.js
          create : foo/views
          create : foo/views/index.ejs

        install dependencies:
        $ cd foo && npm install

        run the app:
        $ node app

*package* 应用的描述及依赖

*app.js*  应用的启动文件

*pubic* 存放静态文件

*routes* 路由请求

*views* 存放jade,ejs等html渲染模版

### static files

Serve basic static files - 

		vi app.js
		
		var express = require('express');
		var app = express();

		app.use(express.static(__dirname + '/public'));

		app.listen(process.env.PORT || 3000); 
		
More requirements? check out this [link](http://blog.modulus.io/nodejs-and-express-static-content) !

### authentication

Authentication and logins in Node can be a complicated thing. Actually logging in for any application can be a pain. This [article](http://scotch.io/tutorials/javascript/easy-node-authentication-setup-and-local) series will deal with authenticating in your Node application using the package Passport.

### [Jade](http://jade-lang.com/)
Jade is designed primarily for server side templating in node.js.

* installation

		sudo npm install jade --global

* get started

[tutorial](http://jade-lang.com/tutorial)

[elemet reference](http://jade-lang.com/reference/)

* template

写一个模版

		touch t.jade
		
		h1
  		  | Maintainer:
		  = ' ' + maintainer.name
		table
		  tr
    		td Twitter
   		    td= maintainer.twitter
  		  tr
   		    td Blog
   		    td= maintainer.blog

使用jade渲染一下

		touch j.js
		
		var jade = require('jade'),
    	fs = require('fs');

		var data = {
  			maintainer: {
 			   name: 'Forbes Lindesay',
 			   twitter: '@ForbesLindesay',
 			   blog: 'forbeslindesay.co.uk'
		 		 }
			}

		fs.readFile('./t.jade', 'utf8', function (err, t) {
  			  if (err) throw err;
   			  var fn = jade.compile(t);
    		  var html = fn(data);
    		  console.log(html);
			});
*Run*
	
	node j.js > o.html

<img src="/Users/faramir/Documents/markdown/nodejs-io/2-express/jade.png" alt="jade" height="200" width="400">  

### jQuery

### cookie

