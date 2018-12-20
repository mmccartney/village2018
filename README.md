# Village Elementary Career Day 2018

This repository contains the code used for my presentation to Village Elementary's 5th Grade class for Career Day.

The C++ file `count.cpp` shows how fast computers can count.  It can be compiled using [gcc](https://gcc.gnu.org) and run in a Terminal window like this:

```
gcc count.cpp -o count
./count
```

The file `server.py` is a simple web server that acts as a "cloud database".  It accepts HTTP POSTs to store JSON data and returns the same data with an HTTP GET.  It runs on port 8000 and was written in python 2.7.

```
python server.py &
```

The `TicTacToe` folder contains a [react-native](https://facebook.github.io/react-native/) project for a Tic-Tac-Toe game.  There are 4 different versions of App.js that I used to show the evolution of the game by changing `index.js`.  To run both iOS and Android versions of the app:

```
cd TicTacToe
react-native run-ios
ANDROID_HOME=~/Library/Android/sdk ./start-android.sh
react-native run-android
```

(You will need to follow the setup instructions for `react-native` before any of this will work).

## Enjoy!
