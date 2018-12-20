#!/bin/sh

if ! $ANDROID_HOME/platform-tools/adb get-state > /dev/null 2>&1 ; then
    avd=$($ANDROID_HOME/tools/bin/avdmanager list avd \
              | egrep -o '^ *Name: (\w+)'             \
              | egrep -i ${1:-.}                      \
              | head -1                               \
              | awk '{ print $2 }')
    echo "# Starting $avd"
    webcam=$($ANDROID_HOME/emulator/emulator -webcam-list \
              | egrep '^ *Camera'                         \
              | head -1                                   \
              | cut -f 2 -d "'")
    if [ -n "$webcam" ]; then
        webcam="-camera-back $webcam"
    fi
    $ANDROID_HOME/emulator/emulator -avd $avd -gpu auto -no-snapshot $webcam &
fi

$ANDROID_HOME/platform-tools/adb wait-for-device
