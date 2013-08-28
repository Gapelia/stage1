#!/bin/sh

echo "Working path: `pwd`"

echo "Compiling CoffeeScripts..."

coffee -w -c -o static/js/app/ static/coffee/
