/*
* do_api acts as a namespace to hold cdl javascript functions
* digital object api
*/

var do_api = {};

/**
* Item provides an API to the JSON
* @constructor
*/
do_api.Item = function(json) {
  this.data = json;
}

/**
* @returns a caption to display
*/
do_api.Item.prototype.caption = function() {
  return this.data.qdc.title.toString();
}

/**
* @returns URL to image file
*/
do_api.Item.prototype.getImg = function() {
  if(this.data.files.reference.src) {
    return this.data.files.reference.src;
  } else if (this.data.files.reference[0].src) {
    return this.data.files.reference[0].src;
  } else {
    return this.data.files.thumbnail.src;
  }
}

/**
* @returns URL to the thumbnail
*/
do_api.Item.prototype.thumbnail = function() {
  return this.data.files.thumbnail.src;
}

/**
* @returns href to the item in OAC/Calisphere
*/
do_api.Item.prototype.href = function() {
  return (this.data.qdc.identifier[0]) ? this.data.qdc.identifier[0] : this.data.qdc.identifier;
}

/**
* exports for commonJS modules (node.js)
*/
if ( typeof exports != "undefined" ) {
    exports.do_api = do_api;
}
