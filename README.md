# Vue Simple Quiz App


## Technologies
- [VueJS](https://vuejs.org) (The Progressive JavaScript Framework)
- [TailwindCss](https://tailwindcss.com) (The Modern utility-first CSS framework)

## Running with Docker

You can run the project by doing the following steps using Docker

```bash
# Building the Container
$ cd
$ docker build -t vue-quiz-app .

# Running the Container
$ docker run -it -p 8080:8080 vue-quiz-app
```
After you should be able to access our vuejs app on http://localhost:8080 in your browser.

## Build Setup

```bash
# project setup
$ npm install

# compiles and hot-reloads for development
$ npm run serve

# compiles and minifies for production
$ npm run build
```
