/**
*  function that does the ajax API call and loads it into the pikachoose slideshow
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
