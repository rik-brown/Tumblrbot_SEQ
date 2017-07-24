//2016-10-27 Updated to run sequentially rather than in random order.
//2016-11-08 Changed running order

console.log('Tumblrbot starting up!');

var tumblr = require('tumblr.js');
var config = require('./tumblrConfig');
var timer = require('./timer');
var fs = require('fs');
var exec = require('child_process').exec;
var client = tumblr.createClient(config);

var iteration = 1;
var firstSketch = 1; // Start with this sketch
var numSketches = 13; // The number of different Processing sketches to choose between
var selecter = firstSketch; // Always start at the beginning

postTumblr();
setInterval(postTumblr, timer.milliseconds*timer.seconds*timer.minutes*timer.hours);

function postTumblr() {

  console.log("Iteration:" + iteration + "  Selecter picks sketch nr. " + selecter);
  iteration ++;

  if      (selecter == 1)  {var cmd = '../p2048/p001/p001';}
  else if (selecter == 2)  {var cmd = '../p2048/p004/p004';}
  else if (selecter == 3)  {var cmd = '../p2048/p005/p005';}
  else if (selecter == 4)  {var cmd = '../p2048/p003/p003';}
  else if (selecter == 5)  {var cmd = '../p2048/p010/p010';}
  else if (selecter == 6)  {var cmd = '../p2048/p008/p008';}
  else if (selecter == 7)  {var cmd = '../p2048/p002/p002';}
  else if (selecter == 8)  {var cmd = '../p2048/p011/p011';}
  else if (selecter == 9)  {var cmd = '../p2048/p009/p009';}
  else if (selecter == 10) {var cmd = '../p2048/p006/p006';}
  else if (selecter == 11) {var cmd = '../p2048/p007/p007';}
  else if (selecter == 12) {var cmd = '../p2048/p012/p012';}
  else                     {var cmd = '../p2048/p016/p016';}

  exec (cmd, processing);

  function processing() {
    console.log('Encoding image as base64...');
    var filename = '../p2048/output.png';
    var params = {
      encoding: 'base64'
    }
    var b64 = fs.readFileSync(filename, params);

    var options = {
      data64: b64,
      caption: 'Generated cellular life stories.',
      tags: 'abstract, abstractart, codeart, computerart, artistsontumblr, generative, processing, cellendipity'
    };

    client.createPhotoPost('cellendipity', options, posted);

    function posted(err, success) {
      if (err) {
        console.log("Something went wrong!   " + err);
      }
      else {
        console.log("It worked!");
      }
    }
  }

  selecter ++;
  if (selecter > numSketches) {
    selecter = firstSketch;
  }
}
