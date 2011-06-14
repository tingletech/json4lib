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
  return "<div>" + this.data.qdc.title.toString() + "<br/>" + this.data.qdc.publisher.toString() + "</div>";
}

/**
* @returns URL to image file
*/
do_api.Item.prototype.getImg = function() {
  if(this.data.files.reference) {
    if(this.data.files.reference.src) {
      return this.data.files.reference.src;
    } else if (this.data.files.reference[0].src) {
      return this.data.files.reference[0].src;
    }
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

/** 

Copyright (c) 2011, Regents of the University of California
All rights reserved.

Redistribution and use in source and binary forms, with or without 
modification, are permitted provided that the following conditions are met:

- Redistributions of source code must retain the above copyright notice, 
  this list of conditions and the following disclaimer.
- Redistributions in binary form must reproduce the above copyright notice, 
  this list of conditions and the following disclaimer in the documentation 
  and/or other materials provided with the distribution.
- Neither the name of the University of California nor the names of its
  contributors may be used to endorse or promote products derived from this 
  software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" 
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE 
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE 
ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE 
LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR 
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF 
SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS 
INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN 
CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) 
ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE 
POSSIBILITY OF SUCH DAMAGE.

*/
