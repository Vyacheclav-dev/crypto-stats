# crypto-stats

## Install Node, Docker, docker-compose(if you haven't) and go to bin directory in which we have deploy script and run it:


### Development, watch mode
 $ cd ./client <br/>
 $ npm install <br/>
 $ cd ../ <br/>
 $ cd ./proxy-server <br/>
 $ npm install <br/>
 $ cd ../ <br/>
 $ cd ./bin <br/>
 $ ./deploy.sh dev up (to start app) <br/>
 $ ./deploy.sh dev down (to shut down app) <br/>
 $ URL http://localhost:5173 <br/>

### Production mode
 $ cd ./bin <br/>
 $ ./deploy.sh prod up (to start app) <br/>
 $ ./deploy.sh prod down (to shut down app) <br/>
 $ URL http://localhost:80 <br/>