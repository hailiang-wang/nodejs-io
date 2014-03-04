# NodeJS web 应用实践 1 － 瞧，一个新的选择
## NodeJS 历史
[NodeJS](http://en.wikipedia.org/wiki/Nodejs)的开端要追溯到 2009年 JSonf上Ryan的[演讲](https://www.youtube.com/watch?v=ztspvPYybIY)。


>JavaScript is designed with Event Loop, Event Driven. NodeJS promises to provide a purely evented, non-blocking insfrastructure to script highly concurrent programs.  
-- Ryan Dahl 

### Apache V.S. Ngnix

#### Savings in I/O cost 
 Because of the architecture, Node.js provides high performance like Nginx server as shown below. (As a side note: Nginx uses evented, non-blocking architecture, where as Apache uses multi-threaded architecture. Nginx doesn’t use Node.js, this is just an architecture comparison).
<img src="/Users/faramir/Documents/markdown/nodejs-io/1-welcome-to-nodejs/apach-vs-nginx.png" alt="Apache v.s. Nginx" height="500" width="700">  

#### Savings in Memory
Again, because of the architecture, Node.js uses relatively very little memory much like Nginx server as shown below.
<img src="/Users/faramir/Documents/markdown/nodejs-io/1-welcome-to-nodejs/apache-vs-nginx-mem.png" alt="Apache v.s. Nginx" height="500" width="700"> 

#### Principles
* non-blocking I/O : file system,network,database

Tranditional way

		Result = query (‘select * from T’); 
		do something // I need to wait for sometime.
		
NodeJS 

		query('select * from T', callback); 
		do something // no wait.
		
		

* [Single Process](http://nodejs.org/api/cluster.html)

A single instance of Node runs in a single thread. To take advantage of multi-core systems the user will sometimes want to launch a cluster of Node processes to handle the load.

The cluster module allows you to easily create child processes that all share server ports.

* [Event Loop](http://www.tuicool.com/articles/RreQJn)

<img src="/Users/faramir/Documents/markdown/nodejs-io/1-welcome-to-nodejs/NODEJS_EVENT_LOOP.png" alt="Apache v.s. Nginx" height="500" width="700"> 


## 成功案例
使用NodeJS的[公司、网站](http://nodejs.org/industry/)。

#### [Blazing fast node.js: 10 performance tips from LinkedIn Mobile](http://engineering.linkedin.com/nodejs/blazing-fast-nodejs-10-performance-tips-linkedin-mobile)

#### [LinkedIn Moved From Rails To Node: 27 Servers Cut And Up To 20x Faster](http://highscalability.com/blog/2012/10/4/linkedin-moved-from-rails-to-node-27-servers-cut-and-up-to-2.html)

## 下载，安装

		git clone https://github.com/joyent/node.git
		cd node
		git checkout v0.6.18 #Try checking nodejs.org for what the stable version is
		./configure && make && sudo make install

## 动手写一段

### Create Server

**vi create-http-server.js**

	var http = require('http');

	var server = http.createServer(function (req,res) {
    	res.writeHead(200, {'Content-Type': 'text/plain'});
    	res.write('Hellor ');
    	res.end('World');
	})
	server.listen(8000);

*node create-http-server.js*

### Read File

		var fs = require('fs')
		var stat = require('fs').stat

		stat('./read-file.js', function (err, s) {
   		 	if (err) throw err;
    			console.log(s)
    			console.log("data ...")
    			fs.readFile('./read-file.js', 'utf8', function(err, data) {
        	if (err) throw err;
        		console.log(data)
   			 });
		});

### [Event Emitter](http://nodejs.org/api/events.html)

		/**
		 * print time until exit
		 */

		var wt = setInterval(function(){
    		console.log("What's time ?")
    		console.log(":), let me see ... " + (new Date()) )
		},3000)

		process.addListener('SIGINT', function(){
                            clearInterval(wt)
                            console.log( 'Bye-bye.' );
                               }
                    );
                   
             
## [NPM](https://www.npmjs.org/) - Node Packaged Modules

npm is the package manager for the Node JavaScript platform. It puts modules in place so that node can find them, and manages dependency conflicts intelligently.

It is extremely configurable to support a wide variety of use cases. Most commonly, it is used to publish, discover, install, and develop node programs.

## Best Practice
### Promise
<img src="/Users/faramir/Documents/markdown/nodejs-io/1-welcome-to-nodejs/async.png" alt="Apache v.s. Nginx" height="300" width="500"> 


		doThisAsync()
  		.then(function (data) {
    		data.foo.baz = 'bar' // throws a ReferenceError as foo is not defined
 		 })
  		.then(null, console.error)
