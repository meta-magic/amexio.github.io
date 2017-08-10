#!/bin/bash

echo "Begining Amexio Build Process..."

npm run build

echo "Finished Amexio Build Process..."

cd src/modules/charts/ && npm run build

echo "Finished building Charts Module"
