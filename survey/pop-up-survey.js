/* ideally this is the only file required */

var CDL = (typeof CDL !== 'undefined') ? CDL : {} ;
CDL.DSC = (typeof CDL.DSC !== 'undefined') ? CDL.DSC : {};


CDL.DSC.PopUpSurveySubmit = (typeof CDL.DSC.PopUpSurveySubmit !== 'undefined') ? CDL.DSC.PopUpSurveySubmit : function(form){
  var _gaq = _gaq || [];
  _gaq.push( ['cst._x', 'x'] );
}



/* CDL.DSC.PopUpSurveyPop(flash_cookie) 
 * step 2 needs to be defined first
 */

CDL.DSC.PopUpSurveyPop = (typeof CDL.DSC.PopUpSurveyPop !== 'undefined') ? CDL.DSC.PopUpSurveyPop : function(flash_cookie){
  // will settimer go here; or one level up the call stack
  $('#SwfStore_CDL_OAC_Calisphere_survey_test_0').hide(); // needed for chrome
  var anchor=$('body');
  // the logic here leave something to be desired works via trial and error
  if ( $("#CDL_DSC_PopUpSurvey").length == 0) {
    $(anchor).append('<div id="CDL_DSC_PopUpSurvey">Survey </div>');
    $("#CDL_DSC_PopUpSurvey").dialog({ 
      title: "survey title",
      autoOpen: false,
      position: 'top',
      modal: true,
      width: 550,
      close: function() { $("#CDL_DSC_PopUpSurvey").remove(); }
    });
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
  var flash_cookie = new SwfStore({ // Javascript Flash Cookie
    namespace: 'CDL.OAC/Calisphere.survey_test', // the this must match all other instances that want to share cookies
    swf_url: './jfc/storage.swf', // to work cross-domain, use the same absolute url on both pages
    debug: false, // depending on your browser, this will either go to the console or the bottom of the page.
    onready: function(){ // wait for the page to be ready
      if ( !flash_cookie.get('beenSurveyed') ) { // check if they have been surveyed before
        CDL.DSC.PopUpSurveyPop({"cookie":flash_cookie, "question":"./question.json"}); // pop up the survey form
      }
    },
    onerror: function(){
      // in case we had an error. (The most common cause is that the user disabled flash cookies.)
      // $('#status').text('Error');
      // we don't want to run the survey if the flash cookies don't work
    }
  });
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
