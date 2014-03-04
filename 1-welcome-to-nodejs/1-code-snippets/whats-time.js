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
