/**
*  function that does the ajax API call and loads it into the
   pikachoose slideshow inside of a jquery UI dialog

    config_object = { 
      url: <REQUIRED: string; url of search results>,
      slideshow: <REQUIRED: element; element that will get turned to a slideshow>
    }
      carousel: <OPTIONAL: boolean>,
      showTooltips: <OPTIONAL: boolean>,
      IESafe: <OPTIONAL: boolean>,
      target: <OPTIONAL: string; set to _blank to open in new window>
*/
var do_api_Pikachoose = function (config){
  $.ajax({
    dataType: "jsonp",
    cache: true,
    url: config.url, 
    error: function(){ return false; }, 
    success: function(data){
      // set up array to hold data transfered out of the JSON feed
      var a = [];
      // add each result to the data array
      $.each(data.objset, function(i,item){
        item = new do_api.Item(item);
        if (typeof item.data !== 'undefined') {
          a[i] = {};
          a[i].image = item.getImg();
          a[i].caption = item.caption();
          a[i].link = item.href();
          a[i].title = "Image: " + item.caption();
        }
      });
      // turn supplied slideshow element into PikaChoose slideshow
      config.slideshow.PikaChoose({
        transition: [0], 
        showTooltips: config.showTooltips || false,
        carousel: (typeof(config.carousel) !== undefined) ? config.carousel : true,
        IESafe: (typeof(config.IESafe) !== undefined) ? config.IESafe : true,
        text: { play: "Play", stop: "Stop", previous: "Previous", next: "Next" },
        buildFinished: function(self) {
          if (typeof(config.target) !== undefined) {
            self.anchor.attr('target',config.target)
          }
        },
        data: a
      });
    }
  });
  return true;
};

/**
*/

/**
* exports for commonJS modules (node.js)
*/
if ( typeof exports != "undefined" ) {
    exports.do_api_Pikachoose = do_api_Pikachoose;
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
