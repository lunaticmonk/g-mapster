# G-Mapster

A hack which helps in cleaning areas in cities.(useful for municipalities).

To try, goto :-
https://g-mapster.herokuapp.com
Upload an image of garbage in your vicinity.

See the status of the garbage at:-
https://g-mapster.herokuapp.com/home

### How to use?
* Take a picture in your mobile where you see garbage or litter in any area.
* Go to https://g-mapster.herokuapp.com
* Click upload and upload the pic
* That's it.You are done.

The location and the image is stored in the database and the admin side(municipalities) can view it on map.
As the number of images from a particular area increases, the priority of cleaning that area also increases.
This is how it works.

## Prerequisites

You will need the following things properly installed on your computer.

* **[Git](https://git-scm.com/)** - Git is a version control system which helps in tracking changes in files and also in coordinating with number of people on same project.
* **[Node.js](https://nodejs.org/)** *(node v9.2.1)* *(with NPM v5.5.1)* - Node.js is a JavaScript runtime which is built on the top of chrome's v8 JavaScript engine. You can install Node.js easily with [nvm](https://github.com/creationix/nvm).

### Installation
- Fork the repo.
- Clone the repo.
```
git clone https://github.com/sumedh123/g-mapster
```
```
cd g-mapster
```
- Install dependencies
```
npm install
```

### Running
```
node server.js
```
- Head over to localhost:8000 in your browser.

### Contributing
1. Read [CONTRIBUTING.md](https://github.com/sumedh123/g-mapster/blob/user-admin/CONTRIBUTING.md).
2. Before you start contributing, run the app in tour local machine, get familiar with it and then check for bugs or more features.
3. For any bug or for adding an feature you may open an issue.
4. If you would like to work on an issue, drop in a comment at the issue.
