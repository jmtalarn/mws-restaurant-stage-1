# Mobile Web Specialist Certification Course
---
#### _Three Stage Course Material Project - Restaurant Reviews_

## Project Overview: Stage 1

For the **Restaurant Reviews** projects, you will incrementally convert a static webpage to a mobile-ready web application. In **Stage One**, you will take a static design that lacks accessibility and convert the design to be responsive on different sized displays and accessible for screen reader use. You will also add a service worker to begin the process of creating a seamless offline experience for your users.

### Specification

You have been provided the code for a restaurant reviews website. The code has a lot of issues. It’s barely usable on a desktop browser, much less a mobile device. It also doesn’t include any standard accessibility features, and it doesn’t work offline at all. Your job is to update the code to resolve these issues while still maintaining the included functionality. 


### Note about ES6
Most of the code in this project has been written to the ES6 JavaScript specification for compatibility with modern web browsers and future proofing JavaScript code. As much as possible, try to maintain use of ES6 in any additional JavaScript you write. 

### How to start
1. First of all do a `npm install` to install the required npm packages
 - The gulp plugin used to resize images https://www.npmjs.com/package/gulp-image-resize requires the `imagemagick` and `graphicsmagick` software to be installed.
   - Ubuntu:
   ```bash
   apt-get install imagemagick
   apt-get install graphicsmagick
   ```
   - Mac OS X (using Homebrew):
   ```bash
   brew install imagemagick
   brew install graphicsmagick
   ```
   - Windows & others:
   ```http://www.imagemagick.org/script/binary-releases.php```

Confirm that ImageMagick is properly set up by executing convert -help in a terminal
  - 
2. Run the git command to init and update the server app included as submodule `git submodule init && git submodule update --recursive --remote`
 - Install the node modules required by the server `cd server/ && npm install && cd ..`
3. Run `npm start` command. That will launch two things:
 - The server module
 - The default `gulp` task with development purposes with live reload while you're editing. Running also the client in the port 8000

### Build only and run the apps separately
If you want to only build the app you should run `gulp build`. Run the content of the `dist` folder in port `8000`, run the server app on port `1337`.


