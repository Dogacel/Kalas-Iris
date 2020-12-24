#!/bin/bash

NEWIP=`ifconfig | grep eth0 -A1 | tail -n1 | cut -d ' '  -f10 `

# delete IP from windows hosts file
sed '/wsl/d' -i '/mnt/c/Windows/System32/drivers/etc/hosts' || true

echo "$NEWIP        wsl" >> '/mnt/c/Windows/System32/drivers/etc/hosts'
