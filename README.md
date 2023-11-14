
# Products

Application to manage products.



## Requirements

* [asdf](https://asdf-vm.com/)

* Docker compose



## Components

### Server

Code of the server of the application is in the directory `server`

#### Local Installation

We need to run the necessary services of the application, so we run docker containers:

~~~bash
docker-compose up -d
~~~

After we run all containers, kafka ui is running in [link](http://localhost:8080/)

> :bulb: **NOTE:** Mongo container loads local data on the first execution. We need remove the container and start again to restore these data:

~~~bash
docker-compose down
docker-compose up -d
~~~

After run containers, we need to create the configuration file of the application:

~~~bash
cp config.local.yaml config.yaml
~~~

Then we can install tools:

~~~bash
asdf install
~~~

And finally, we can install dependencies and run application:

~~~bash
yarn install
yarn run start
~~~



####  Development

##### Lint code

We can execute the below command to lint the code:

~~~bash
yarn run lint
~~~


##### Run test

We can run unit tests:

~~~bash
yarn run test
~~~

E2E test:

~~~bash
yarn run test:e2e
~~~

or coverage:

~~~bash
yarn run test:cov
~~~



## Configure VS Code

There is a .vscode folder which contains configuration of VSCode:

* launch.json: Launchs of tha application in debug mode
* products.code-workspace: Information about the workspace of the application
