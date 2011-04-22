*****************************
digital object javascript API
*****************************

:file:`api/do_api.js` provides javascript methods to data objects in the XTF JSONP results

.. code-block:: javascript 

  item = new do_api.Item(item);
  if (typeof item.data !== 'undefined') {
    var image = item.getImg();
    var caption = item.caption();
    var href = item.href();
  }


.. js:class:: do_api.Item(json)

  :param json: JSON returned from XTF
  :returns: digital library item object

  .. js:function:: item.getImg()

    :returns: href to image file

  .. js:function:: item.caption()

    :returns: caption to the image (HTML fragment)

  .. js:function:: item.thumbnail()

    :returns: href to thumbnail image

  .. js:function:: item.href()

    :returns: cannonical URL for the object (HTML web page)
