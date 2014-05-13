(function(root, $, undefined) {

  "use strict";


/* inspector main */

// Base function.
var inspector = function() {

  var $inspectorOutline = null,
      $currentDOMNode = null;

  var _createOutline = function() {
    var outline = $('<div id="inspector-lib-outline"></div>')
      .css({
        'z-index': 9999999,
        'position': 'absolute',
        'background-color': 'transparent',
        'border': '1px solid magenta',
        'pointer-events':'none'
      });
    return outline;
  };

  var _addOutline = function() {
    $('body').append($inspectorOutline);
  };

  var _toggleOutlineVisibility = function() {
    if($inspectorOutline.is(":visible")) {
      $inspectorOutline.hide();
    }
    else {
      $inspectorOutline.show();
    }
  };

  var _updateOutline = function(bounding) {
    $inspectorOutline
      .css({
        "width": bounding.w + "px",
        "height": bounding.h + "px",
        "left": bounding.x + "px",
        "top": bounding.y + "px",
      });
  };

  var _nodeHovered = function(ele) {
    //Update outline position
    var $ele = $(ele);
    var bounding = {};
    var offset = $ele.offset();
    bounding.w = $ele.width();
    bounding.h = $ele.height();
    bounding.x = offset.left;
    bounding.y = offset.top;
    _updateOutline(bounding);

  };

  var _mouseOverDOMNode = function(event) {
    event.stopPropagation();
    $currentDOMNode = $(this);
    //console.log(event.target);
    _nodeHovered(event.target);
  };

  var _nodeSelected = function(ele) {
    // do something then send selected event
    console.log(ele);
    console.log('selected');
  };

  var _clickOnDOMNode = function(event) {
    if($currentDOMNode !== null) {

      if(event.target === $currentDOMNode[0] ) {
        _nodeSelected(event.target);
      }
    }
  };

  var _setUpEvents = function() {
    $('*').on('mouseover', _mouseOverDOMNode);
    $(document).on('click', _clickOnDOMNode);
  };

  var _init = function() {
    $(document).on('ready', function(){
      $inspectorOutline = _createOutline();
      _addOutline();
      _setUpEvents();
    });

  };

  _init();


  return {

  };
};


// Version.
inspector.VERSION = '0.0.0';


// Export to the root, which is probably `window`.
root.inspector = inspector;


}(this, jQuery));
