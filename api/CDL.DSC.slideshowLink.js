/**
* CDL.DSC.SlideshowLink(anchor) turns link to a calisphere search result into a slideshow
*/

var CDL = (typeof CDL !== 'undefined') ? CDL : {} ;
CDL.DSC = (typeof CDL.DSC !== 'undefined') ? CDL.DSC : {};
CDL.DSC.SlideshowLink = (typeof CDL.DSC.SlideshowLink !== 'undefined') ? CDL.DSC.SlideshowLink : function(anchor, title) {
  title = title || "Calisphere Slideshow";
  // the logic here leave something to be desired works via trial and error
  if ( $("#CDL_DSC_SlideshowDialog").length == 0) {
    $(anchor).append('<div id="CDL_DSC_SlideshowDialog" class="pikachoose"><div/><div style="background-color: #FFFFFF; padding: 1em;"><a href="http://calisphere.org/" tabindex="-1"><img src="http://www.calisphere.universityofcalifornia.edu/images/logos/calisphere_logo.gif" tabindex="-1" title="Calisphere" border="0"/></a></div></div>').blur();
    $("#CDL_DSC_SlideshowDialog").dialog({ 
      title: title,
      autoOpen: false,
      position: 'top',
      modal: true,
      width: 550,
      close: function() { $("#CDL_DSC_SlideshowDialog").remove(); }
    });
  } else {
    $("#CDL_DSC_SlideshowDialog").dialog('open');
    return false;
  }
  $("#CDL_DSC_SlideshowDialog").dialog('open');
  // http://forum.jquery.com/topic/modal-dialog-with-click-outside-dialog-to-dismiss
  $(".ui-widget-overlay").live("click", function (){
    $("div:ui-dialog:visible").dialog("close");
  });
  do_api_Pikachoose({
    url: anchor.getAttribute('href') + "&rmode=json", 
    slideshow: $("#CDL_DSC_SlideshowDialog div:first-child"), 
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
