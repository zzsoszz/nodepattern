var cluster = require('cluster');
var os = require('os');
if(cluster.isMaster) {
	var cpus = os.cpus().length;
	//start as many children as the number of CPUs
	for (var i = 0; i < cpus; i++) { //[1]
		cluster.fork();
	}

	// process.on('SIGUSR2', function() {
 //            console.log('Restarting workers');
 //            var workers = Object.keys(cluster.workers);
 //            function restartWorker(i) {
 //                if (i >= workers.length) return;
 //                var worker = cluster.workers[workers[i]];
 //                console.log('Stopping worker: ' + worker.process.pid);
 //                worker.disconnect(); 
 //                worker.on('exit', function() {
 //                    if (!worker.suicide) return;
 //                    var newWorker = cluster.fork();
 //                    newWorker.on('listening', function() {
 //                        restartWorker(i + 1);
 //                    });
 //                });
 //            }
 //            restartWorker(0);
 //   });


}
else 
{
	require('./app'); //[2]
}
