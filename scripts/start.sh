#!/bin/bash
cd /home/ubuntu/Lentool/server
authbind --deep pm2 start app.js
