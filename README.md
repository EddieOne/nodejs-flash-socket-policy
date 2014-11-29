nodejs flash socket policy server
==========================

A simple node.js flash socket policy server.

This should be ran using Forever as a deamon. It's useful so that a server side application doesn't need to handle the policy request.

In most unix inviroments, ports below 1000 will require root privileges. Adobe's socket policy by default uses port 843. You can use sudo to run this script.
