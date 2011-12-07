var assert = require('assert');
var fs = require('fs');
test = fs.readFileSync("digital-object.json", encoding='utf8');
parsed = JSON.parse(test);


/**
* Item 
* @constructor
*/
function Item(json) {
  this.data = json;
}

/**
* @returns a caption to display
*/
Item.prototype.caption = function() {
  return this.data.qdc.title.toString();
}

/**
* @returns URL to image file
*/
Item.prototype.getImg = function() {
  if(this.data.files.reference.src) {
    return this.data.files.reference.src;
  } else if (this.data.files.reference[0].src) {
    return this.data.files.reference[0].src;
  } else {
    return this.data.files.thumbnail.src;
  }
} 

var testB = new Item(parsed.objset[0]);

assert.equal(testB.caption(),'[Street scene, Chinatown.]');

assert.equal(testB.getImg(),'/ark:/13030/tf8r29p300/med-res');
