# Ordinare, the learning tool and visualizer for sorting algorithms

Welcome to Ordinare!

This web app is a learning tool and visualizer for sorting algorithms. It allows users to visualize sorting on arrays of different elements and sizes, and with custom speeds.

The following sorting algorithms are supported so far: bubble sort, selection sort, insertion sort, merge sort, quick sort and heap sort.

This app is deployed with Netlify and can be accessed here: https://ordinare.netlify.app/. I hope you have fun playing around with it.

## Purpose of this project

The purpose is two-fold: To create a meaningful learning tool for anyone wishing to learn how sorting works and to improve my skills with React and Typescript while revising my own knowledge on sorting algorithms. The app was built from the ground up, and the entirety of the code was written by me.

## Installation

The app is already deployed and you can use the final product on this [link](https://ordinare.netlify.app/). 
If you want to play around with it locally, clone this repo and install the dependencies:

$ git clone https://github.com/HSemic/Ordinare-sorting-visualizer.git
$ cd Ordinare-sorting-visualizer
$ npm i

## Used technologies

The app was built using the [React library](https://reactjs.org/) and bootstrapped using create-react-app.

Code itself was written using [TypeScript](https://www.typescriptlang.org/), a statically typed JavaScript superset.

UI and styling was done using [MaterialUI](https://material-ui.com/), a React UI framework.

Global state was managed using the [Redux](https://redux.js.org/) library.

## Code organization

The ```src``` directory contains the following five subdirectories. 

* ```app``` - Global configuration, custom hooks and Redux store
* ```assets``` - Images used on the page
* ```helpers``` - Helper functions
* ```styles``` - MaterialUI theme and vanilla CSS classes 
* ```features``` - App logic split into directories as features. There are two main features:
  * ```UI``` - Tasked with rendering the app's components on screen and showing sorting in real time.
  * ```sorting``` - Actual sorting logic

## Design

Design was implemented using MaterialUI. The app is responsive and works on various screen sizes.

The app also has a dark mode switch.

## License

Ordinare is released under the [MIT license](https://opensource.org/licenses/MIT).
