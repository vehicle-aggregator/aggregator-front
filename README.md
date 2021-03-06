# Vehicle-aggregator

### Description

...

### Recommendations before installation

Before starting, make sure that the server part of the application is running
(link to the backend repository: https://github.com/vehicle-aggregator/aggregator_back_go)

Node.js is needed to launch the project

### Installation

Install the Angular CLI: open a terminal and run the following command:

```sh
npm install -g @angular/cli
```

Clone the repository to your computer

```sh
git clone https://github.com/vehicle-aggregator/aggregator-front .
```

Navigate to the workspace folder, such as aggregator-front and run the following command:

```sh
cd aggregator-front
npm i
ng serve --open
```
The ng serve command launches the server, watches your files, and rebuilds the app as you make changes to those files.

The --open (or just -o) option automatically opens your browser to http://localhost:4200/.

### Note

If you deploy client and server parts on the same device, use a proxy, find the **src/proxy.conf** file  and check the **target** field:

```sh
{
  "/api/v1": {
    "target": "http://localhost:8080",
    "secure": false,
    "logLevel": "debug"
  }
}
```
