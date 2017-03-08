#!/bin/bash
 raspivid -o - -t 0 -n -w 1296 -h 730 -fps 25 -rot 180 --bitrate 3000000 --exposure auto --brightness 65 --contrast 50 --awb auto| cvlc -vvv stream:///dev/stdin --sout '#rtp{sdp=rtsp://:8554/}' :demux=h264


