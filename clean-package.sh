#!/bin/bash
#
echo 'Cleaning generated package...'

rm ./Q-darwin-x64/Q.app/Contents/Resources/app/clean-package.sh
rm -rf ./Q-darwin-x64/Q.app/Contents/Resources/app/build/audio
mv ./Q-darwin-x64/Q.app/Contents/Resources/app/node_modules/about-window ./Q-darwin-x64/Q.app/Contents/Resources/app/
rm -rf ./Q-darwin-x64/Q.app/Contents/Resources/app/node_modules/*
mv ./Q-darwin-x64/Q.app/Contents/Resources/app/about-window ./Q-darwin-x64/Q.app/Contents/Resources/app/node_modules/
mv ./Q-darwin-x64/Q.app/Contents/Resources/app/src/electron-* ./Q-darwin-x64/Q.app/Contents/Resources/app/
rm -rf ./Q-darwin-x64/Q.app/Contents/Resources/app/src/*
mv ./Q-darwin-x64/Q.app/Contents/Resources/app/electron-* ./Q-darwin-x64/Q.app/Contents/Resources/app/src/
rm -rf ./Q-darwin-x64/Q.app/Contents/Resources/app/resources

echo 'Done cleaning.'