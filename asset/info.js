"use strict";

function LogID(){
  this.uid = 0;
  this.zeroPaddingLength = 2;
};
LogID.prototype.getFormattedLogID = function () {
  return this._zeroPadding(this.uid, this.zeroPaddingLength);
};
LogID.prototype.increment = function () {
  this.uid++;
};
LogID.prototype._zeroPadding = function (number, length) {
  return number.toLocaleString( "ja-JP" , { useGrouping : false , minimumIntegerDigits : length } );
}

function getFilename(src) {
  var pathList = src.split('/');
  return pathList.pop();
};

window.addEventListener("DOMContentLoaded", function(){
  var logID = new LogID();
  var imgs = document.querySelectorAll('img');
  var info = document.getElementById('info');
  for (var i=0; i<imgs.length; i++) {
    var img = imgs[i];
    img.setAttribute('data-idx', i);
    img.addEventListener('load', function(){
      var src = this.currentSrc || this.src;
      var filename = getFilename(src);
      var idx = this.getAttribute('data-idx')|0;
      var log = '<li> ' + logID.getFormattedLogID() +' : ';
      if (imgs.length>1) {
        log += '<b>'+ (idx+1) +'番目</b>のimg要素で';
      }
      log += '<b>'+ filename +'</b>が読み込まれました';
      log += '</li>';
      info.innerHTML = log + info.innerHTML;
      logID.increment();
    }, false);
  }
}, false);
