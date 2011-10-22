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

/* CDL.DSC.PopUpSurveySubmit(form)
 * final step submit form to google analytics
 */

CDL.DSC.PopUpSurveySubmit = (typeof CDL.DSC.PopUpSurveySubmit !== 'undefined') ? CDL.DSC.PopUpSurveySubmit : function(){
  // console.log(this);
  // console.log(CDL.DSC.PopUpSurveyCookie);
  var _gaq = _gaq || [];
  _gaq.push( ['cst._trackEvent', 'SurveyTest', 'teacher', 'other' , 60 ] ); 
   // time how long they spent before clicking?

/* 
  http://code.google.com/apis/analytics/docs/tracking/eventTrackerGuide.html
  Call the _trackEvent() method in the source code of a page object, widget, or video. 
    The specification for the _trackEvent() method is:

_trackEvent(category, action, opt_label, opt_value)

  category (required) 
	The name you supply for the group of objects you want to
	track.  
  action (required)
	A string that is uniquely paired with each category, and
	commonly used to define the type of user interaction for the
	web object.  
  label (optional)
	An optional string to provide additional dimensions to the
	event data.
  value (optional)
	An integer that you can use to provide numerical data about the
	user event.

*/


}


/* CDL.DSC.PopUpSurveyPop() 
 *  open the jQueryDialog; pass the flash cookie up?
 */

CDL.DSC.PopUpSurveyPop = (typeof CDL.DSC.PopUpSurveyPop !== 'undefined') ? CDL.DSC.PopUpSurveyPop : function(){
  // will settimer go here; or one level up the call stack
  $('#SwfStore_CDL_OAC_Calisphere_survey_test_0').hide(); // needed for chrome
  var anchor=$('body');
  // the logic here leave something to be desired works via trial and error, based on slideshow widget
  if ( $("#CDL_DSC_PopUpSurvey").length == 0) {
    $(anchor).append('<div id="CDL_DSC_PopUpSurvey"/>');
    $("#CDL_DSC_PopUpSurvey").dialog({ 
      title: "We want to hear from you!",
      position: 'top',
      autoOpen: false,
      modal: true,
      resizable: false,
      width: 550,
      close: function() { $("#CDL_DSC_PopUpSurvey").remove(); }
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
  CDL.DSC.PopUpSurveyCookie = new SwfStore({ // Javascript Flash Cookie
    namespace: 'CDL.OAC/Calisphere.survey_test', // the this must match all other instances that want to share cookies
    swf_url: 'http://cdn.calisphere.org/json4lib/survey/jfc/storage.swf', // to work cross-domain, use the same absolute url on both pages; change to your URL
    debug: false, // depending on your browser, this will either go to the console or the bottom of the page.
    onready: function(){ // wait for the page to be ready
      if ( !CDL.DSC.PopUpSurveyCookie.get('beenSurveyed') ) { // check if they have been surveyed before
        CDL.DSC.PopUpSurveyPop(); // pop up the survey form
      };
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
