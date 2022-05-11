#!/bin/bash
cd /home/ubuntu/Lentool/server
pm2 stop bin/www 2> /dev/null || true
pm2 delete bin/www 2> /dev/null || true
