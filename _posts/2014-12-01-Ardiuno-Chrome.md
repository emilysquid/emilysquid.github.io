---
layout: post
title: "Shaders in Unity"
photo_url: "http://emilysaliba.com/public/pictures/3Dparticles.png"
---


<div class="message">
  This project has been going on for a while and has changed significantly.
</div>

I started out messing around with arduino.  I got an accelerometer hooked up, a light sensor, some LEDs, but now I'm just back to the LSR.  

Here's the old set up. It's a little janky looking.

![placeholder](http://emilysaliba.com/public/pictures/9-LeavingEngineRoom.png "Bread board set up")

When I got to the point that I wanted some kind of feedback on the screen, I had an urge to get the Arduino to communicate with WebGL.  I couldn't find much online at the time. I think I found just one project someone had done.  I did manage to find this cool js app called href="http://involt.github.io">Involt</a> It bridged the gap between Arduino and HTML.  From there I opened up a canvas and put in my WebGL.

It started out really simple looking.

![placeholder](http://emilysaliba.com/public/pictures/particles1.png "basic particles")

This was my first WebGL project, but once I learned more, I made the jump to 3D, made my own fog and lighting, and set up camera controls.

![placeholder](http://emilysaliba.com/public/pictures/3dparticles.png "3D particles")

I wanted this to be really easy to set up.  I packaged it into a chrome app and Involt checked all the USB ports.  It's as simple as clicking the app, and plugging in the Arduino.
I even made this little icon for the app.  

![placeholder](http://emilysaliba.com/public/pictures/icon128.png "app icon")

