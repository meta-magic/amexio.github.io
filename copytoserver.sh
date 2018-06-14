#!/usr/bin/env bash
echo "Copy dist/ to Apache Server"
cd dist && npm pack && mv amexio-ng-extensions-4.2.4.tgz amexio-ng-extensions.tgz
cp -a amexio-ng-extensions.tgz /var/www/html/desireplatform/amexio-builds/

