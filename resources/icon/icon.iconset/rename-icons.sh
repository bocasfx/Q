#/bin/bash

mv icon-16.png icon_16x16.png
mv icon-32.png icon_32x32.png
mv icon-64.png icon_64x64.png
mv icon-128.png icon_128x128.png
mv icon-256.png icon_256x256.png
mv icon-512.png icon_512x512.png

cp icon_32x32.png icon_16x16@2x.png
cp icon_64x64.png icon_32x32@2x.png
cp icon_128x128.png icon_64x64@2x.png
cp icon_256x256.png icon_128x128@2x.png
cp icon_512x512.png icon_256x256@2x.png

cp ../icon.png icon_1024x1024.png

cp icon_1024x1024.png icon_512x512@2x.png