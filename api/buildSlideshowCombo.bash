set -x
java -jar /dsc/java/yuicompressor-2.4.2/build/yuicompressor-2.4.2.jar -o CDL.DSC.slideshowLink-min.js CDL.DSC.slideshowLink.js 
java -jar /dsc/java/yuicompressor-2.4.2/build/yuicompressor-2.4.2.jar -o do_api-min.js do_api.js 
java -jar /dsc/java/yuicompressor-2.4.2/build/yuicompressor-2.4.2.jar -o do_api_Pikachoose-min.js do_api_Pikachoose.js 
cat ../lib/jquery-ui/js/jquery-1.5.1.min.js ../lib/PikaChoose/lib/jquery.pikachoose.js do_api-min.js do_api_Pikachoose-min.js CDL.DSC.slideshowLink-min.js ../lib/jquery-ui/js/jquery-ui-1.8.11.custom.min.js > ../slideshow/slideshowLink-combo.js

java -jar /dsc/java/yuicompressor-2.4.2/build/yuicompressor-2.4.2.jar -o pikachoose.css ../lib/PikaChoose/styles/bottom.css
java -jar /dsc/java/yuicompressor-2.4.2/build/yuicompressor-2.4.2.jar -o jquery-ui.css ../lib/jquery-ui/css/ui-lightness/jquery-ui-1.8.11.custom.css
cat pikachoose.css jquery-ui.css > ../slideshow/slideshowLink-combo.css
