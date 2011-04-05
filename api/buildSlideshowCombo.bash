set -x
set -e
java -jar /dsc/java/yuicompressor-2.4.2/build/yuicompressor-2.4.2.jar -o CDL.DSC.slideshowLink-min.js CDL.DSC.slideshowLink.js 
java -jar /dsc/java/yuicompressor-2.4.2/build/yuicompressor-2.4.2.jar -o do_api-min.js do_api.js 
java -jar /dsc/java/yuicompressor-2.4.2/build/yuicompressor-2.4.2.jar -o do_api_Pikachoose-min.js do_api_Pikachoose.js 
cat ../lib/jquery-ui/js/jquery-1.5.1.min.js ../lib/PikaChoose/lib/jquery.pikachoose.js do_api-min.js do_api_Pikachoose-min.js CDL.DSC.slideshowLink-min.js ../lib/jquery-ui/js/jquery-ui-1.8.11.custom.min.js > ../slideshow/slideshowLink-combo.js

java -jar /dsc/java/yuicompressor-2.4.2/build/yuicompressor-2.4.2.jar -o pikachoose.css ../lib/PikaChoose/styles/bottom.css
java -jar /dsc/java/yuicompressor-2.4.2/build/yuicompressor-2.4.2.jar -o jquery-ui.css ../lib/jquery-ui/css/ui-lightness/jquery-ui-1.8.11.custom.css
cat pikachoose.css jquery-ui.css > ../slideshow/slideshowLink-combo.css



# Copyright (c) 2011, Regents of the University of California
# All rights reserved.
#
# Redistribution and use in source and binary forms, with or without 
# modification, are permitted provided that the following conditions are met:
#
# - Redistributions of source code must retain the above copyright notice, 
#   this list of conditions and the following disclaimer.
# - Redistributions in binary form must reproduce the above copyright notice, 
#   this list of conditions and the following disclaimer in the documentation 
#   and/or other materials provided with the distribution.
# - Neither the name of the University of California nor the names of its
#    contributors may be used to endorse or promote products derived from this 
#    software without specific prior written permission.
#
#  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" 
#  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE 
#  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE 
#  ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE 
#  LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR 
#  CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF 
#  SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS 
#  INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN 
#  CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) 
#  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE 
#  POSSIBILITY OF SUCH DAMAGE.
