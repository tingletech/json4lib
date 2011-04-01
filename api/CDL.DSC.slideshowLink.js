/**
* CDL.DSC.SlideshowLink(anchor) turns link to a calisphere search result into a slideshow
*/

var CDL = (typeof CDL !== 'undefined') ? CDL : {} ;
CDL.DSC = (typeof CDL.DSC !== 'undefined') ? CDL.DSC : {};
CDL.DSC.SlideshowLink = (typeof CDL.DSC.SlideshowLink !== 'undefined') ? CDL.DSC.SlideshowLink : function(anchor) {
  if ( $("#CDL_DSC_SlideshowDialog").length == 0) {
    $(anchor).append("<div id='CDL_DSC_SlideshowDialog' class='pikachoose'></div>");
    $("#CDL_DSC_SlideshowDialog").dialog('open').dialog({ 
      autoOpen: false,
      position: 'top',
      modal: true,
      width: 550 
    });
  } else {
    return false;
  }
  $("#CDL_DSC_SlideshowDialog").dialog('open');
  do_api_Pikachoose({
    url: anchor.getAttribute('href') + "&rmode=json", 
    slideshow: $("#CDL_DSC_SlideshowDialog"), 
    carousel: true,
    target: "_blank"
  });
  return false;

};


/**
* exports for commonJS modules (node.js)
*/
if ( typeof exports != "undefined" ) {
    exports.CDL.DSC.SlideshowLink = CDL.DSC.SlideshowLink;
}
