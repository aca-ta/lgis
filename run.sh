#!/bin/bash

npm install
npm run-script build

docker build .

#TODO: run docker-compose
