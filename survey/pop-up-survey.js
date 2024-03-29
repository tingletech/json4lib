/* set up the CDL.DSC namespace object if it does not exist yet 
 */

var CDL = (typeof CDL !== 'undefined') ? CDL : {} ;
CDL.DSC = (typeof CDL.DSC !== 'undefined') ? CDL.DSC : {};

/* 
 * CDL.DSC.PopUpSurvey* are functions that encapsulate functionality of the pop up survey
 * seems to be written in backwards order of what it gets run in
 */

/* CDL.DSC.PopUpSurveySubmit(answer,other)
 * final step submit form to google analytics
 */

CDL.DSC.PopUpSurveySubmit = (typeof CDL.DSC.PopUpSurveySubmit !== 'undefined') ? CDL.DSC.PopUpSurveySubmit : function(answer,other){
  // form validation; was something selected
  if (typeof answer == 'undefined' && ! other ) {
    $("#CDLDSCSurveyFormB").text("Please select the best answer above.");
    $("#CDLDSCSurveyFormB").css("color", "#f11");
    return false;
  }
  if ( other && typeof answer == 'undefined' ) {
    answer = 'other';
  }
  _gaq = _gaq || [];
  /* http://code.google.com/apis/analytics/docs/tracking/eventTrackerGuide.html
     _trackEvent(                 category,    action, opt_label, opt_value) */
  _gaq.push( ['cst._trackEvent', 'SurveyTest', answer, other ] ); 
  // time how long they spent before clicking?
  $("#CDL_DSC_PopUpSurvey").remove();
}


/* CDL.DSC.PopUpSurveyPop() 
 *  open the jQueryDialog; pass the flash cookie up?
 */

CDL.DSC.PopUpSurveyPop = (typeof CDL.DSC.PopUpSurveyPop !== 'undefined') ? CDL.DSC.PopUpSurveyPop : function(){
  var anchor=$('body');
  // the logic here leave something to be desired works via trial and
  // error, based on slideshow widget
  if ( $("#CDL_DSC_PopUpSurvey").length == 0) {
    $(anchor).append('<div id="CDL_DSC_PopUpSurvey"/>');
    $("#CDL_DSC_PopUpSurvey").dialog({ 
      title: "We want to hear from you!",
      position: 'top',
      autoOpen: false,
      modal: true,
      debug: true,
      resizable: false,
      width: 550,
      close: function() { 
        $("#CDL_DSC_PopUpSurvey").remove(); 
        _gaq.push( ['cst._trackEvent', 'SurveyTest', "declined" ] );
      },
      open: function() {
        $(this).load('/json4lib/survey/questions.html', function() {
          innerHeight = $('#CDLDSCSurveyForm').height();
          $(this).height(innerHeight);
        });
      }
    });
  } 
  $("#CDL_DSC_PopUpSurvey").dialog('open');
  return false;
};

/* CDL.DSC.PopUpSurvey
 * sets the flash cookie
 * calls the function that creates the jQuery survey CDL.DSC.PopUpSurveyPop()
 */
CDL.DSC.PopUpSurvey = (typeof CDL.DSC.PopUpSurvey !== 'undefined') ? CDL.DSC.PopUpSurvey : function(){
  // Javascript Flash Cookie
  var lotto =  Math.floor(Math.random() * (1000)) + 1;
  if (lotto == 1) {
    // pop up the survey form
    // load jQuery.ui if it's not already loaded
    if (typeof jQuery.ui == 'undefined') {
      jQuery.getScript('http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js',function(){
        CDL.DSC.PopUpSurveyPop(); 
      });
    } else {
      CDL.DSC.PopUpSurveyPop(); 
    }
  }
};

(function() {
  if (typeof jQuery == 'undefined') {
    // more or less stolen form jquery core and adapted by paul irish
    function getScript(url,success){
      var script=document.createElement('script');
      script.src=url;
      var head=document.getElementsByTagName('head')[0],
          done=false;
      // Attach handlers for all browsers
      script.onload=script.onreadystatechange = function(){
        if ( !done && (!this.readyState
             || this.readyState == 'loaded'
             || this.readyState == 'complete') ) {
          done=true;
          success();
          script.onload = script.onreadystatechange = null;
          head.removeChild(script);
        }
      };
      head.appendChild(script);
    }
    getScript('https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js', function() {
      if (typeof jQuery=='undefined') { 
      } else {
        CDL.DSC.PopUpSurvey();
      }
    });
  } else { 
    CDL.DSC.PopUpSurvey();
  }
})();

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
