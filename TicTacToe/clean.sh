#!/bin/sh

cd $(dirname "$0")
watchman watch-del-all
# rm -rf node_modules
rm -rf /tmp/metro-bundler-cache-*
rm -rf /tmp/haste-map-react-native-packager-*
rm -rf android/.gradle
rm -rf android/app/build
rm -rf android/build
rm -rf ios/TicTacToe.xcodeproj/project.xcworkspace
rm -rf ios/build
rm -rf ~/.gradle
rm -rf ~/Library/Developer/Xcode/DerivedData/*
rm -rf ~/Library/Detox/ios/*

# kill-8081
lsof -F p -i :8081 -s TCP:LISTEN | egrep ^p | cut -f 2 -d p | xargs kill
