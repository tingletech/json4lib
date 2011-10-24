/* set up the CDL.DSC namespace object if it does not exist yet 
 */

var CDL = (typeof CDL !== 'undefined') ? CDL : {} ;
CDL.DSC = (typeof CDL.DSC !== 'undefined') ? CDL.DSC : {};

// placeholder for flash cookie
CDL.DSC.PopUpSurveyCookie = (typeof CDL.DSC.PopUpSurveyCookie !== 'undefined') ? CDL.DSC.PopUpSurveyCookie : "";

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
    return false;
  }
  // is other filled in if selected
  if ( answer == 'other' &&  ! other ) {
    $("#CDLDSCSurveyFormB").text("Please fill in a value to the right of \"other\"");
    return false;
  }
  if ( other && typeof answer == 'undefined' ) {
    answer = 'other';
  }
  _gaq = _gaq || [];
  /* http://code.google.com/apis/analytics/docs/tracking/eventTrackerGuide.html
     _trackEvent(                 category,    action, opt_label, opt_value) */
  _gaq.push( ['cst._trackEvent', 'SurveyTest', answer, other ] ); 
  flash_cookie.set('test',"no");
  // time how long they spent before clicking?
  $("#CDL_DSC_PopUpSurvey").remove();
}


/* CDL.DSC.PopUpSurveyPop() 
 *  open the jQueryDialog; pass the flash cookie up?
 */

CDL.DSC.PopUpSurveyPop = (typeof CDL.DSC.PopUpSurveyPop !== 'undefined') ? CDL.DSC.PopUpSurveyPop : function(flash_cookie){
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
        flash_cookie.set('test',"noa");
        _gaq.push( ['cst._trackEvent', 'SurveyTest', "declined" ] );
      }
    });
    $("#CDL_DSC_PopUpSurvey").load('questions.html'); // async
  } else {
    $("#CDL_DSC_PopUpSurvey").dialog('open');
    return false;
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
  flash_cookie = new SwfStore({ 
    // this must match all other instances that want to share cookies
    namespace: 'CDL.OAC/Calisphere.survey_test', 
    swf_url: '/json4lib/survey/jfc/storage.swf', 
    // swf_url: 'http://cdn.calisphere.org/json4lib/survey/jfc/storage.swf', 
    debug: false, 
    onready: function(){ // wait for the page to be ready
      // check if they have been surveyed before
      if ( !flash_cookie.get('testforThis')) { 
        // pop up the survey form, pass along the cookie
        // load jQuery.ui if it's not already loaded
        if (typeof jQuery.ui == 'undefined') {
          jQuery.getScript('http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js',function(){
            CDL.DSC.PopUpSurveyPop(flash_cookie); 
          });
        } else {
          CDL.DSC.PopUpSurveyPop(flash_cookie); 
        }
      };
    },
    onerror: function(){
      // in case we had an error. (The most common cause is that the user disabled flash cookies.)
      // $('#status').text('Error');
      // we don't want to run the survey if the flash cookies don't work
    }
  });
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
