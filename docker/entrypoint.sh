#!/bin/sh

# Start SSH
/usr/sbin/sshd

exec "$@"