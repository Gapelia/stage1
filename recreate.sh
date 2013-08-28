#! /bin/bash
rm gapelia.sqlite3
# mysql -u root -e 'DROP DATABASE gapelia;'
# mysql -u root -e 'CREATE DATABASE gapelia;'
./manage.py syncdb
