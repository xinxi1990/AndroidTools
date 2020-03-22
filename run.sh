#!/usr/bin/env bash

nohup adb shell LD_LIBRARY_PATH=/data/local/tmp /data/local/tmp/minicap -P 1080x1920@1080x1920/0 &

echo "************************** minicap **************************"

sleep 2

adb forward tcp:1717 localabstract:minicap

echo "************************** localabstract **************************"

cd minicapweb

nohup node app.js &

echo "************************** minicapweb **************************"

sleep 2

cd ..

echo "************************** run dev **************************"

pwd

npm run dev

