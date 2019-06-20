# Reactive Programming workshop (RxJS 6) 08-30-2018

Welcome to the Reactive Programming workshop!

This workshop is meant to get familiar with RxJS (which is part of the ReactiveX family).
The focus of this workshop lies on familiarizing yourself with the ReactiveX API.
Prior to the workshop a presentation is given to explain the Reactive Programming fundamentals and introduce ReactiveX.
The sheets of this presentation will be added here to this repository on the day of the workshop itself.

## Installation and setup

* First make sure you've got Node.js installed on your machine.
  **version 8 or higher is required.**
  You can download the latest version from: [https://nodejs.org/en/download/](https://nodejs.org/en/download/).
  To verify whether Node.js was installed correctly and which version you have running, execute the following command from a console:
  ```sh
  node -v
  ```

* [Download](https://gitlab.com/craftsmen/rxjs-workshop-craftsmen-2018-08-30/repository/archive.zip?ref=master) or [clone](https://gitlab.com/craftsmen/rxjs-workshop-craftsmen-2018-08-30.git) the workshop files from [https://gitlab.com/craftsmen/rxjs-workshop-craftsmen-2018-08-30](https://gitlab.com/craftsmen/rxjs-workshop-craftsmen-2018-08-30)

* Once you have downloaded or cloned the workshop files open the directory containing the project with your favorite IDE or editor.

* Additionally you need to install the NPM dependencies for the workshop.
  To do so open a console and navigate to the workshop directory.
  From this directory execute the following command:
  ```sh
  npm install
  ```

* Finally test whether everything has been installed correctly and whether you can run the workshop by running the following command:
  ```sh
  npm test
  ```

## Exercises

Great! If you have followed the _installation and setup_ instructions you are ready to start doing the workshop!

The exercises can be found in the `exercises` directory of the workshop.
Just open the first exercise and follow the instructions in the comments.
When you wish to test your solution for an exercise, run the following command:

```sh
npm start <exercise number>
```

Except for the first two, all exercises are automatically checked for correctness.
If your solution is incorrect you will receive some feedback as to what is wrong.

> Note that all RxJS imports needed for the exercises have already been added to each exercise.
> You do **not** need to add additional imports yourself to solve the exercises.

## Solutions

The solutions for the exercises are available as well.
These can be found in the `solutions` branch of this GIT repository.
Obviously try not to peek at the solutions before you have tried to solve the assignments yourself.
If you get stuck during the workshop, just shout for help :)

## Resources
* [Presentation sheets](https://gitlab.com/craftsmen/rxjs-workshop-craftsmen-2018-08-30/raw/master/sheets.pdf)
* [RxJS API docs](https://rxjs-dev.firebaseapp.com/api)
* [RxMarbles](http://rxmarbles.com/)

## Demo application

During the workshop we showed a demo application, which illustrates the difference between a 'traditional' and 'reactive' programming style.
This demo application can be found at the following repository:

[https://gitlab.com/craftsmen/reactive-meetup-demo](https://gitlab.com/craftsmen/reactive-meetup-demo)

## Recommended extra material

Below you will find some links to articles and presentations that we recommend if you are interested in learning more about reactive programming.

* [The introduction to Reactive Programming you've been missing by André Staltz](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754)
* [You will learn RxJS by André Staltz @ ng-europe 2016](https://www.youtube.com/watch?v=uQ1zhJHclvs)
* [Reactive Programming by Venkat Subramaniam @ Devoxx Belgium 2016](https://www.youtube.com/watch?v=weWSYIUdX6c)
* [Reactive Web Applications with Spring 5 by Rossen Stoyanchev @ Devoxx Belgium 2016](https://www.youtube.com/watch?v=rdgJ8fOxJhc)
* [Angular & RxJS by Rob Wormald at ng-europe 2016](https://www.youtube.com/watch?v=WWR9nxVx1ec)
* [Writing Marble Tests](https://github.com/ReactiveX/rxjs/blob/master/doc/writing-marble-tests.md)
