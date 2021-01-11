/*!
  * bootstrap v4.1.3 (https://getbootstrap.com/)
  * copyright 2011-2018 the bootstrap authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * licensed under mit (https://github.com/twbs/bootstrap/blob/master/license)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery'), require('popper.js')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jquery', 'popper.js'], factory) :
  (factory((global.bootstrap = {}),global.jquery,global.popper));
}(this, (function (exports,$,popper) { 'use strict';

  $ = $ && $.hasownproperty('default') ? $['default'] : $;
  popper = popper && popper.hasownproperty('default') ? popper['default'] : popper;

  function _defineproperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      object.defineproperty(target, descriptor.key, descriptor);
    }
  }

  function _createclass(constructor, protoprops, staticprops) {
    if (protoprops) _defineproperties(constructor.prototype, protoprops);
    if (staticprops) _defineproperties(constructor, staticprops);
    return constructor;
  }

  function _defineproperty(obj, key, value) {
    if (key in obj) {
      object.defineproperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectspread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownkeys = object.keys(source);

      if (typeof object.getownpropertysymbols === 'function') {
        ownkeys = ownkeys.concat(object.getownpropertysymbols(source).filter(function (sym) {
          return object.getownpropertydescriptor(source, sym).enumerable;
        }));
      }

      ownkeys.foreach(function (key) {
        _defineproperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _inheritsloose(subclass, superclass) {
    subclass.prototype = object.create(superclass.prototype);
    subclass.prototype.constructor = subclass;
    subclass.__proto__ = superclass;
  }

  /**
   * --------------------------------------------------------------------------
   * bootstrap (v4.1.3): util.js
   * licensed under mit (https://github.com/twbs/bootstrap/blob/master/license)
   * --------------------------------------------------------------------------
   */

  var util = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * private transitionend helpers
     * ------------------------------------------------------------------------
     */
    var transition_end = 'transitionend';
    var max_uid = 1000000;
    var milliseconds_multiplier = 1000; // shoutout anguscroll (https://goo.gl/pxwqgp)

    function totype(obj) {
      return {}.tostring.call(obj).match(/\s([a-z]+)/i)[1].tolowercase();
    }

    function getspecialtransitionendevent() {
      return {
        bindtype: transition_end,
        delegatetype: transition_end,
        handle: function handle(event) {
          if ($$$1(event.target).is(this)) {
            return event.handleobj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
          }

          return undefined; // eslint-disable-line no-undefined
        }
      };
    }

    function transitionendemulator(duration) {
      var _this = this;

      var called = false;
      $$$1(this).one(util.transition_end, function () {
        called = true;
      });
      settimeout(function () {
        if (!called) {
          util.triggertransitionend(_this);
        }
      }, duration);
      return this;
    }

    function settransitionendsupport() {
      $$$1.fn.emulatetransitionend = transitionendemulator;
      $$$1.event.special[util.transition_end] = getspecialtransitionendevent();
    }
    /**
     * --------------------------------------------------------------------------
     * public util api
     * --------------------------------------------------------------------------
     */


    var util = {
      transition_end: 'bstransitionend',
      getuid: function getuid(prefix) {
        do {
          // eslint-disable-next-line no-bitwise
          prefix += ~~(math.random() * max_uid); // "~~" acts like a faster math.floor() here
        } while (document.getelementbyid(prefix));

        return prefix;
      },
      getselectorfromelement: function getselectorfromelement(element) {
        var selector = element.getattribute('data-target');

        if (!selector || selector === '#') {
          selector = element.getattribute('href') || '';
        }

        try {
          return document.queryselector(selector) ? selector : null;
        } catch (err) {
          return null;
        }
      },
      gettransitiondurationfromelement: function gettransitiondurationfromelement(element) {
        if (!element) {
          return 0;
        } // get transition-duration of the element


        var transitionduration = $$$1(element).css('transition-duration');
        var floattransitionduration = parsefloat(transitionduration); // return 0 if element or transition duration is not found

        if (!floattransitionduration) {
          return 0;
        } // if multiple durations are defined, take the first


        transitionduration = transitionduration.split(',')[0];
        return parsefloat(transitionduration) * milliseconds_multiplier;
      },
      reflow: function reflow(element) {
        return element.offsetheight;
      },
      triggertransitionend: function triggertransitionend(element) {
        $$$1(element).trigger(transition_end);
      },
      // todo: remove in v5
      supportstransitionend: function supportstransitionend() {
        return boolean(transition_end);
      },
      iselement: function iselement(obj) {
        return (obj[0] || obj).nodetype;
      },
      typecheckconfig: function typecheckconfig(componentname, config, configtypes) {
        for (var property in configtypes) {
          if (object.prototype.hasownproperty.call(configtypes, property)) {
            var expectedtypes = configtypes[property];
            var value = config[property];
            var valuetype = value && util.iselement(value) ? 'element' : totype(value);

            if (!new regexp(expectedtypes).test(valuetype)) {
              throw new error(componentname.touppercase() + ": " + ("option \"" + property + "\" provided type \"" + valuetype + "\" ") + ("but expected type \"" + expectedtypes + "\"."));
            }
          }
        }
      }
    };
    settransitionendsupport();
    return util;
  }($);

  /**
   * --------------------------------------------------------------------------
   * bootstrap (v4.1.3): alert.js
   * licensed under mit (https://github.com/twbs/bootstrap/blob/master/license)
   * --------------------------------------------------------------------------
   */

  var alert = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * constants
     * ------------------------------------------------------------------------
     */
    var name = 'alert';
    var version = '4.1.3';
    var data_key = 'bs.alert';
    var event_key = "." + data_key;
    var data_api_key = '.data-api';
    var jquery_no_conflict = $$$1.fn[name];
    var selector = {
      dismiss: '[data-dismiss="alert"]'
    };
    var event = {
      close: "close" + event_key,
      closed: "closed" + event_key,
      click_data_api: "click" + event_key + data_api_key
    };
    var classname = {
      alert: 'alert',
      fade: 'fade',
      show: 'show'
      /**
       * ------------------------------------------------------------------------
       * class definition
       * ------------------------------------------------------------------------
       */

    };

    var alert =
    /*#__pure__*/
    function () {
      function alert(element) {
        this._element = element;
      } // getters


      var _proto = alert.prototype;

      // public
      _proto.close = function close(element) {
        var rootelement = this._element;

        if (element) {
          rootelement = this._getrootelement(element);
        }

        var customevent = this._triggercloseevent(rootelement);

        if (customevent.isdefaultprevented()) {
          return;
        }

        this._removeelement(rootelement);
      };

      _proto.dispose = function dispose() {
        $$$1.removedata(this._element, data_key);
        this._element = null;
      }; // private


      _proto._getrootelement = function _getrootelement(element) {
        var selector = util.getselectorfromelement(element);
        var parent = false;

        if (selector) {
          parent = document.queryselector(selector);
        }

        if (!parent) {
          parent = $$$1(element).closest("." + classname.alert)[0];
        }

        return parent;
      };

      _proto._triggercloseevent = function _triggercloseevent(element) {
        var closeevent = $$$1.event(event.close);
        $$$1(element).trigger(closeevent);
        return closeevent;
      };

      _proto._removeelement = function _removeelement(element) {
        var _this = this;

        $$$1(element).removeclass(classname.show);

        if (!$$$1(element).hasclass(classname.fade)) {
          this._destroyelement(element);

          return;
        }

        var transitionduration = util.gettransitiondurationfromelement(element);
        $$$1(element).one(util.transition_end, function (event) {
          return _this._destroyelement(element, event);
        }).emulatetransitionend(transitionduration);
      };

      _proto._destroyelement = function _destroyelement(element) {
        $$$1(element).detach().trigger(event.closed).remove();
      }; // static


      alert._jqueryinterface = function _jqueryinterface(config) {
        return this.each(function () {
          var $element = $$$1(this);
          var data = $element.data(data_key);

          if (!data) {
            data = new alert(this);
            $element.data(data_key, data);
          }

          if (config === 'close') {
            data[config](this);
          }
        });
      };

      alert._handledismiss = function _handledismiss(alertinstance) {
        return function (event) {
          if (event) {
            event.preventdefault();
          }

          alertinstance.close(this);
        };
      };

      _createclass(alert, null, [{
        key: "version",
        get: function get() {
          return version;
        }
      }]);

      return alert;
    }();
    /**
     * ------------------------------------------------------------------------
     * data api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(event.click_data_api, selector.dismiss, alert._handledismiss(new alert()));
    /**
     * ------------------------------------------------------------------------
     * jquery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[name] = alert._jqueryinterface;
    $$$1.fn[name].constructor = alert;

    $$$1.fn[name].noconflict = function () {
      $$$1.fn[name] = jquery_no_conflict;
      return alert._jqueryinterface;
    };

    return alert;
  }($);

  /**
   * --------------------------------------------------------------------------
   * bootstrap (v4.1.3): button.js
   * licensed under mit (https://github.com/twbs/bootstrap/blob/master/license)
   * --------------------------------------------------------------------------
   */

  var button = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * constants
     * ------------------------------------------------------------------------
     */
    var name = 'button';
    var version = '4.1.3';
    var data_key = 'bs.button';
    var event_key = "." + data_key;
    var data_api_key = '.data-api';
    var jquery_no_conflict = $$$1.fn[name];
    var classname = {
      active: 'active',
      button: 'btn',
      focus: 'focus'
    };
    var selector = {
      data_toggle_carrot: '[data-toggle^="button"]',
      data_toggle: '[data-toggle="buttons"]',
      input: 'input',
      active: '.active',
      button: '.btn'
    };
    var event = {
      click_data_api: "click" + event_key + data_api_key,
      focus_blur_data_api: "focus" + event_key + data_api_key + " " + ("blur" + event_key + data_api_key)
      /**
       * ------------------------------------------------------------------------
       * class definition
       * ------------------------------------------------------------------------
       */

    };

    var button =
    /*#__pure__*/
    function () {
      function button(element) {
        this._element = element;
      } // getters


      var _proto = button.prototype;

      // public
      _proto.toggle = function toggle() {
        var triggerchangeevent = true;
        var addariapressed = true;
        var rootelement = $$$1(this._element).closest(selector.data_toggle)[0];

        if (rootelement) {
          var input = this._element.queryselector(selector.input);

          if (input) {
            if (input.type === 'radio') {
              if (input.checked && this._element.classlist.contains(classname.active)) {
                triggerchangeevent = false;
              } else {
                var activeelement = rootelement.queryselector(selector.active);

                if (activeelement) {
                  $$$1(activeelement).removeclass(classname.active);
                }
              }
            }

            if (triggerchangeevent) {
              if (input.hasattribute('disabled') || rootelement.hasattribute('disabled') || input.classlist.contains('disabled') || rootelement.classlist.contains('disabled')) {
                return;
              }

              input.checked = !this._element.classlist.contains(classname.active);
              $$$1(input).trigger('change');
            }

            input.focus();
            addariapressed = false;
          }
        }

        if (addariapressed) {
          this._element.setattribute('aria-pressed', !this._element.classlist.contains(classname.active));
        }

        if (triggerchangeevent) {
          $$$1(this._element).toggleclass(classname.active);
        }
      };

      _proto.dispose = function dispose() {
        $$$1.removedata(this._element, data_key);
        this._element = null;
      }; // static


      button._jqueryinterface = function _jqueryinterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(data_key);

          if (!data) {
            data = new button(this);
            $$$1(this).data(data_key, data);
          }

          if (config === 'toggle') {
            data[config]();
          }
        });
      };

      _createclass(button, null, [{
        key: "version",
        get: function get() {
          return version;
        }
      }]);

      return button;
    }();
    /**
     * ------------------------------------------------------------------------
     * data api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(event.click_data_api, selector.data_toggle_carrot, function (event) {
      event.preventdefault();
      var button = event.target;

      if (!$$$1(button).hasclass(classname.button)) {
        button = $$$1(button).closest(selector.button);
      }

      button._jqueryinterface.call($$$1(button), 'toggle');
    }).on(event.focus_blur_data_api, selector.data_toggle_carrot, function (event) {
      var button = $$$1(event.target).closest(selector.button)[0];
      $$$1(button).toggleclass(classname.focus, /^focus(in)?$/.test(event.type));
    });
    /**
     * ------------------------------------------------------------------------
     * jquery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[name] = button._jqueryinterface;
    $$$1.fn[name].constructor = button;

    $$$1.fn[name].noconflict = function () {
      $$$1.fn[name] = jquery_no_conflict;
      return button._jqueryinterface;
    };

    return button;
  }($);

  /**
   * --------------------------------------------------------------------------
   * bootstrap (v4.1.3): carousel.js
   * licensed under mit (https://github.com/twbs/bootstrap/blob/master/license)
   * --------------------------------------------------------------------------
   */

  var carousel = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * constants
     * ------------------------------------------------------------------------
     */
    var name = 'carousel';
    var version = '4.1.3';
    var data_key = 'bs.carousel';
    var event_key = "." + data_key;
    var data_api_key = '.data-api';
    var jquery_no_conflict = $$$1.fn[name];
    var arrow_left_keycode = 37; // keyboardevent.which value for left arrow key

    var arrow_right_keycode = 39; // keyboardevent.which value for right arrow key

    var touchevent_compat_wait = 500; // time for mouse compat events to fire after touch

    var default = {
      interval: 5000,
      keyboard: true,
      slide: false,
      pause: 'hover',
      wrap: true
    };
    var defaulttype = {
      interval: '(number|boolean)',
      keyboard: 'boolean',
      slide: '(boolean|string)',
      pause: '(string|boolean)',
      wrap: 'boolean'
    };
    var direction = {
      next: 'next',
      prev: 'prev',
      left: 'left',
      right: 'right'
    };
    var event = {
      slide: "slide" + event_key,
      slid: "slid" + event_key,
      keydown: "keydown" + event_key,
      mouseenter: "mouseenter" + event_key,
      mouseleave: "mouseleave" + event_key,
      touchend: "touchend" + event_key,
      load_data_api: "load" + event_key + data_api_key,
      click_data_api: "click" + event_key + data_api_key
    };
    var classname = {
      carousel: 'carousel',
      active: 'active',
      slide: 'slide',
      right: 'carousel-item-right',
      left: 'carousel-item-left',
      next: 'carousel-item-next',
      prev: 'carousel-item-prev',
      item: 'carousel-item'
    };
    var selector = {
      active: '.active',
      active_item: '.active.carousel-item',
      item: '.carousel-item',
      next_prev: '.carousel-item-next, .carousel-item-prev',
      indicators: '.carousel-indicators',
      data_slide: '[data-slide], [data-slide-to]',
      data_ride: '[data-ride="carousel"]'
      /**
       * ------------------------------------------------------------------------
       * class definition
       * ------------------------------------------------------------------------
       */

    };

    var carousel =
    /*#__pure__*/
    function () {
      function carousel(element, config) {
        this._items = null;
        this._interval = null;
        this._activeelement = null;
        this._ispaused = false;
        this._issliding = false;
        this.touchtimeout = null;
        this._config = this._getconfig(config);
        this._element = $$$1(element)[0];
        this._indicatorselement = this._element.queryselector(selector.indicators);

        this._addeventlisteners();
      } // getters


      var _proto = carousel.prototype;

      // public
      _proto.next = function next() {
        if (!this._issliding) {
          this._slide(direction.next);
        }
      };

      _proto.nextwhenvisible = function nextwhenvisible() {
        // don't call next when the page isn't visible
        // or the carousel or its parent isn't visible
        if (!document.hidden && $$$1(this._element).is(':visible') && $$$1(this._element).css('visibility') !== 'hidden') {
          this.next();
        }
      };

      _proto.prev = function prev() {
        if (!this._issliding) {
          this._slide(direction.prev);
        }
      };

      _proto.pause = function pause(event) {
        if (!event) {
          this._ispaused = true;
        }

        if (this._element.queryselector(selector.next_prev)) {
          util.triggertransitionend(this._element);
          this.cycle(true);
        }

        clearinterval(this._interval);
        this._interval = null;
      };

      _proto.cycle = function cycle(event) {
        if (!event) {
          this._ispaused = false;
        }

        if (this._interval) {
          clearinterval(this._interval);
          this._interval = null;
        }

        if (this._config.interval && !this._ispaused) {
          this._interval = setinterval((document.visibilitystate ? this.nextwhenvisible : this.next).bind(this), this._config.interval);
        }
      };

      _proto.to = function to(index) {
        var _this = this;

        this._activeelement = this._element.queryselector(selector.active_item);

        var activeindex = this._getitemindex(this._activeelement);

        if (index > this._items.length - 1 || index < 0) {
          return;
        }

        if (this._issliding) {
          $$$1(this._element).one(event.slid, function () {
            return _this.to(index);
          });
          return;
        }

        if (activeindex === index) {
          this.pause();
          this.cycle();
          return;
        }

        var direction = index > activeindex ? direction.next : direction.prev;

        this._slide(direction, this._items[index]);
      };

      _proto.dispose = function dispose() {
        $$$1(this._element).off(event_key);
        $$$1.removedata(this._element, data_key);
        this._items = null;
        this._config = null;
        this._element = null;
        this._interval = null;
        this._ispaused = null;
        this._issliding = null;
        this._activeelement = null;
        this._indicatorselement = null;
      }; // private


      _proto._getconfig = function _getconfig(config) {
        config = _objectspread({}, default, config);
        util.typecheckconfig(name, config, defaulttype);
        return config;
      };

      _proto._addeventlisteners = function _addeventlisteners() {
        var _this2 = this;

        if (this._config.keyboard) {
          $$$1(this._element).on(event.keydown, function (event) {
            return _this2._keydown(event);
          });
        }

        if (this._config.pause === 'hover') {
          $$$1(this._element).on(event.mouseenter, function (event) {
            return _this2.pause(event);
          }).on(event.mouseleave, function (event) {
            return _this2.cycle(event);
          });

          if ('ontouchstart' in document.documentelement) {
            // if it's a touch-enabled device, mouseenter/leave are fired as
            // part of the mouse compatibility events on first tap - the carousel
            // would stop cycling until user tapped out of it;
            // here, we listen for touchend, explicitly pause the carousel
            // (as if it's the second time we tap on it, mouseenter compat event
            // is not fired) and after a timeout (to allow for mouse compatibility
            // events to fire) we explicitly restart cycling
            $$$1(this._element).on(event.touchend, function () {
              _this2.pause();

              if (_this2.touchtimeout) {
                cleartimeout(_this2.touchtimeout);
              }

              _this2.touchtimeout = settimeout(function (event) {
                return _this2.cycle(event);
              }, touchevent_compat_wait + _this2._config.interval);
            });
          }
        }
      };

      _proto._keydown = function _keydown(event) {
        if (/input|textarea/i.test(event.target.tagname)) {
          return;
        }

        switch (event.which) {
          case arrow_left_keycode:
            event.preventdefault();
            this.prev();
            break;

          case arrow_right_keycode:
            event.preventdefault();
            this.next();
            break;

          default:
        }
      };

      _proto._getitemindex = function _getitemindex(element) {
        this._items = element && element.parentnode ? [].slice.call(element.parentnode.queryselectorall(selector.item)) : [];
        return this._items.indexof(element);
      };

      _proto._getitembydirection = function _getitembydirection(direction, activeelement) {
        var isnextdirection = direction === direction.next;
        var isprevdirection = direction === direction.prev;

        var activeindex = this._getitemindex(activeelement);

        var lastitemindex = this._items.length - 1;
        var isgoingtowrap = isprevdirection && activeindex === 0 || isnextdirection && activeindex === lastitemindex;

        if (isgoingtowrap && !this._config.wrap) {
          return activeelement;
        }

        var delta = direction === direction.prev ? -1 : 1;
        var itemindex = (activeindex + delta) % this._items.length;
        return itemindex === -1 ? this._items[this._items.length - 1] : this._items[itemindex];
      };

      _proto._triggerslideevent = function _triggerslideevent(relatedtarget, eventdirectionname) {
        var targetindex = this._getitemindex(relatedtarget);

        var fromindex = this._getitemindex(this._element.queryselector(selector.active_item));

        var slideevent = $$$1.event(event.slide, {
          relatedtarget: relatedtarget,
          direction: eventdirectionname,
          from: fromindex,
          to: targetindex
        });
        $$$1(this._element).trigger(slideevent);
        return slideevent;
      };

      _proto._setactiveindicatorelement = function _setactiveindicatorelement(element) {
        if (this._indicatorselement) {
          var indicators = [].slice.call(this._indicatorselement.queryselectorall(selector.active));
          $$$1(indicators).removeclass(classname.active);

          var nextindicator = this._indicatorselement.children[this._getitemindex(element)];

          if (nextindicator) {
            $$$1(nextindicator).addclass(classname.active);
          }
        }
      };

      _proto._slide = function _slide(direction, element) {
        var _this3 = this;

        var activeelement = this._element.queryselector(selector.active_item);

        var activeelementindex = this._getitemindex(activeelement);

        var nextelement = element || activeelement && this._getitembydirection(direction, activeelement);

        var nextelementindex = this._getitemindex(nextelement);

        var iscycling = boolean(this._interval);
        var directionalclassname;
        var orderclassname;
        var eventdirectionname;

        if (direction === direction.next) {
          directionalclassname = classname.left;
          orderclassname = classname.next;
          eventdirectionname = direction.left;
        } else {
          directionalclassname = classname.right;
          orderclassname = classname.prev;
          eventdirectionname = direction.right;
        }

        if (nextelement && $$$1(nextelement).hasclass(classname.active)) {
          this._issliding = false;
          return;
        }

        var slideevent = this._triggerslideevent(nextelement, eventdirectionname);

        if (slideevent.isdefaultprevented()) {
          return;
        }

        if (!activeelement || !nextelement) {
          // some weirdness is happening, so we bail
          return;
        }

        this._issliding = true;

        if (iscycling) {
          this.pause();
        }

        this._setactiveindicatorelement(nextelement);

        var slidevent = $$$1.event(event.slid, {
          relatedtarget: nextelement,
          direction: eventdirectionname,
          from: activeelementindex,
          to: nextelementindex
        });

        if ($$$1(this._element).hasclass(classname.slide)) {
          $$$1(nextelement).addclass(orderclassname);
          util.reflow(nextelement);
          $$$1(activeelement).addclass(directionalclassname);
          $$$1(nextelement).addclass(directionalclassname);
          var transitionduration = util.gettransitiondurationfromelement(activeelement);
          $$$1(activeelement).one(util.transition_end, function () {
            $$$1(nextelement).removeclass(directionalclassname + " " + orderclassname).addclass(classname.active);
            $$$1(activeelement).removeclass(classname.active + " " + orderclassname + " " + directionalclassname);
            _this3._issliding = false;
            settimeout(function () {
              return $$$1(_this3._element).trigger(slidevent);
            }, 0);
          }).emulatetransitionend(transitionduration);
        } else {
          $$$1(activeelement).removeclass(classname.active);
          $$$1(nextelement).addclass(classname.active);
          this._issliding = false;
          $$$1(this._element).trigger(slidevent);
        }

        if (iscycling) {
          this.cycle();
        }
      }; // static


      carousel._jqueryinterface = function _jqueryinterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(data_key);

          var _config = _objectspread({}, default, $$$1(this).data());

          if (typeof config === 'object') {
            _config = _objectspread({}, _config, config);
          }

          var action = typeof config === 'string' ? config : _config.slide;

          if (!data) {
            data = new carousel(this, _config);
            $$$1(this).data(data_key, data);
          }

          if (typeof config === 'number') {
            data.to(config);
          } else if (typeof action === 'string') {
            if (typeof data[action] === 'undefined') {
              throw new typeerror("no method named \"" + action + "\"");
            }

            data[action]();
          } else if (_config.interval) {
            data.pause();
            data.cycle();
          }
        });
      };

      carousel._dataapiclickhandler = function _dataapiclickhandler(event) {
        var selector = util.getselectorfromelement(this);

        if (!selector) {
          return;
        }

        var target = $$$1(selector)[0];

        if (!target || !$$$1(target).hasclass(classname.carousel)) {
          return;
        }

        var config = _objectspread({}, $$$1(target).data(), $$$1(this).data());

        var slideindex = this.getattribute('data-slide-to');

        if (slideindex) {
          config.interval = false;
        }

        carousel._jqueryinterface.call($$$1(target), config);

        if (slideindex) {
          $$$1(target).data(data_key).to(slideindex);
        }

        event.preventdefault();
      };

      _createclass(carousel, null, [{
        key: "version",
        get: function get() {
          return version;
        }
      }, {
        key: "default",
        get: function get() {
          return default;
        }
      }]);

      return carousel;
    }();
    /**
     * ------------------------------------------------------------------------
     * data api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(event.click_data_api, selector.data_slide, carousel._dataapiclickhandler);
    $$$1(window).on(event.load_data_api, function () {
      var carousels = [].slice.call(document.queryselectorall(selector.data_ride));

      for (var i = 0, len = carousels.length; i < len; i++) {
        var $carousel = $$$1(carousels[i]);

        carousel._jqueryinterface.call($carousel, $carousel.data());
      }
    });
    /**
     * ------------------------------------------------------------------------
     * jquery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[name] = carousel._jqueryinterface;
    $$$1.fn[name].constructor = carousel;

    $$$1.fn[name].noconflict = function () {
      $$$1.fn[name] = jquery_no_conflict;
      return carousel._jqueryinterface;
    };

    return carousel;
  }($);

  /**
   * --------------------------------------------------------------------------
   * bootstrap (v4.1.3): collapse.js
   * licensed under mit (https://github.com/twbs/bootstrap/blob/master/license)
   * --------------------------------------------------------------------------
   */

  var collapse = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * constants
     * ------------------------------------------------------------------------
     */
    var name = 'collapse';
    var version = '4.1.3';
    var data_key = 'bs.collapse';
    var event_key = "." + data_key;
    var data_api_key = '.data-api';
    var jquery_no_conflict = $$$1.fn[name];
    var default = {
      toggle: true,
      parent: ''
    };
    var defaulttype = {
      toggle: 'boolean',
      parent: '(string|element)'
    };
    var event = {
      show: "show" + event_key,
      shown: "shown" + event_key,
      hide: "hide" + event_key,
      hidden: "hidden" + event_key,
      click_data_api: "click" + event_key + data_api_key
    };
    var classname = {
      show: 'show',
      collapse: 'collapse',
      collapsing: 'collapsing',
      collapsed: 'collapsed'
    };
    var dimension = {
      width: 'width',
      height: 'height'
    };
    var selector = {
      actives: '.show, .collapsing',
      data_toggle: '[data-toggle="collapse"]'
      /**
       * ------------------------------------------------------------------------
       * class definition
       * ------------------------------------------------------------------------
       */

    };

    var collapse =
    /*#__pure__*/
    function () {
      function collapse(element, config) {
        this._istransitioning = false;
        this._element = element;
        this._config = this._getconfig(config);
        this._triggerarray = $$$1.makearray(document.queryselectorall("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
        var togglelist = [].slice.call(document.queryselectorall(selector.data_toggle));

        for (var i = 0, len = togglelist.length; i < len; i++) {
          var elem = togglelist[i];
          var selector = util.getselectorfromelement(elem);
          var filterelement = [].slice.call(document.queryselectorall(selector)).filter(function (foundelem) {
            return foundelem === element;
          });

          if (selector !== null && filterelement.length > 0) {
            this._selector = selector;

            this._triggerarray.push(elem);
          }
        }

        this._parent = this._config.parent ? this._getparent() : null;

        if (!this._config.parent) {
          this._addariaandcollapsedclass(this._element, this._triggerarray);
        }

        if (this._config.toggle) {
          this.toggle();
        }
      } // getters


      var _proto = collapse.prototype;

      // public
      _proto.toggle = function toggle() {
        if ($$$1(this._element).hasclass(classname.show)) {
          this.hide();
        } else {
          this.show();
        }
      };

      _proto.show = function show() {
        var _this = this;

        if (this._istransitioning || $$$1(this._element).hasclass(classname.show)) {
          return;
        }

        var actives;
        var activesdata;

        if (this._parent) {
          actives = [].slice.call(this._parent.queryselectorall(selector.actives)).filter(function (elem) {
            return elem.getattribute('data-parent') === _this._config.parent;
          });

          if (actives.length === 0) {
            actives = null;
          }
        }

        if (actives) {
          activesdata = $$$1(actives).not(this._selector).data(data_key);

          if (activesdata && activesdata._istransitioning) {
            return;
          }
        }

        var startevent = $$$1.event(event.show);
        $$$1(this._element).trigger(startevent);

        if (startevent.isdefaultprevented()) {
          return;
        }

        if (actives) {
          collapse._jqueryinterface.call($$$1(actives).not(this._selector), 'hide');

          if (!activesdata) {
            $$$1(actives).data(data_key, null);
          }
        }

        var dimension = this._getdimension();

        $$$1(this._element).removeclass(classname.collapse).addclass(classname.collapsing);
        this._element.style[dimension] = 0;

        if (this._triggerarray.length) {
          $$$1(this._triggerarray).removeclass(classname.collapsed).attr('aria-expanded', true);
        }

        this.settransitioning(true);

        var complete = function complete() {
          $$$1(_this._element).removeclass(classname.collapsing).addclass(classname.collapse).addclass(classname.show);
          _this._element.style[dimension] = '';

          _this.settransitioning(false);

          $$$1(_this._element).trigger(event.shown);
        };

        var capitalizeddimension = dimension[0].touppercase() + dimension.slice(1);
        var scrollsize = "scroll" + capitalizeddimension;
        var transitionduration = util.gettransitiondurationfromelement(this._element);
        $$$1(this._element).one(util.transition_end, complete).emulatetransitionend(transitionduration);
        this._element.style[dimension] = this._element[scrollsize] + "px";
      };

      _proto.hide = function hide() {
        var _this2 = this;

        if (this._istransitioning || !$$$1(this._element).hasclass(classname.show)) {
          return;
        }

        var startevent = $$$1.event(event.hide);
        $$$1(this._element).trigger(startevent);

        if (startevent.isdefaultprevented()) {
          return;
        }

        var dimension = this._getdimension();

        this._element.style[dimension] = this._element.getboundingclientrect()[dimension] + "px";
        util.reflow(this._element);
        $$$1(this._element).addclass(classname.collapsing).removeclass(classname.collapse).removeclass(classname.show);
        var triggerarraylength = this._triggerarray.length;

        if (triggerarraylength > 0) {
          for (var i = 0; i < triggerarraylength; i++) {
            var trigger = this._triggerarray[i];
            var selector = util.getselectorfromelement(trigger);

            if (selector !== null) {
              var $elem = $$$1([].slice.call(document.queryselectorall(selector)));

              if (!$elem.hasclass(classname.show)) {
                $$$1(trigger).addclass(classname.collapsed).attr('aria-expanded', false);
              }
            }
          }
        }

        this.settransitioning(true);

        var complete = function complete() {
          _this2.settransitioning(false);

          $$$1(_this2._element).removeclass(classname.collapsing).addclass(classname.collapse).trigger(event.hidden);
        };

        this._element.style[dimension] = '';
        var transitionduration = util.gettransitiondurationfromelement(this._element);
        $$$1(this._element).one(util.transition_end, complete).emulatetransitionend(transitionduration);
      };

      _proto.settransitioning = function settransitioning(istransitioning) {
        this._istransitioning = istransitioning;
      };

      _proto.dispose = function dispose() {
        $$$1.removedata(this._element, data_key);
        this._config = null;
        this._parent = null;
        this._element = null;
        this._triggerarray = null;
        this._istransitioning = null;
      }; // private


      _proto._getconfig = function _getconfig(config) {
        config = _objectspread({}, default, config);
        config.toggle = boolean(config.toggle); // coerce string values

        util.typecheckconfig(name, config, defaulttype);
        return config;
      };

      _proto._getdimension = function _getdimension() {
        var haswidth = $$$1(this._element).hasclass(dimension.width);
        return haswidth ? dimension.width : dimension.height;
      };

      _proto._getparent = function _getparent() {
        var _this3 = this;

        var parent = null;

        if (util.iselement(this._config.parent)) {
          parent = this._config.parent; // it's a jquery object

          if (typeof this._config.parent.jquery !== 'undefined') {
            parent = this._config.parent[0];
          }
        } else {
          parent = document.queryselector(this._config.parent);
        }

        var selector = "[data-toggle=\"collapse\"][data-parent=\"" + this._config.parent + "\"]";
        var children = [].slice.call(parent.queryselectorall(selector));
        $$$1(children).each(function (i, element) {
          _this3._addariaandcollapsedclass(collapse._gettargetfromelement(element), [element]);
        });
        return parent;
      };

      _proto._addariaandcollapsedclass = function _addariaandcollapsedclass(element, triggerarray) {
        if (element) {
          var isopen = $$$1(element).hasclass(classname.show);

          if (triggerarray.length) {
            $$$1(triggerarray).toggleclass(classname.collapsed, !isopen).attr('aria-expanded', isopen);
          }
        }
      }; // static


      collapse._gettargetfromelement = function _gettargetfromelement(element) {
        var selector = util.getselectorfromelement(element);
        return selector ? document.queryselector(selector) : null;
      };

      collapse._jqueryinterface = function _jqueryinterface(config) {
        return this.each(function () {
          var $this = $$$1(this);
          var data = $this.data(data_key);

          var _config = _objectspread({}, default, $this.data(), typeof config === 'object' && config ? config : {});

          if (!data && _config.toggle && /show|hide/.test(config)) {
            _config.toggle = false;
          }

          if (!data) {
            data = new collapse(this, _config);
            $this.data(data_key, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new typeerror("no method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createclass(collapse, null, [{
        key: "version",
        get: function get() {
          return version;
        }
      }, {
        key: "default",
        get: function get() {
          return default;
        }
      }]);

      return collapse;
    }();
    /**
     * ------------------------------------------------------------------------
     * data api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(event.click_data_api, selector.data_toggle, function (event) {
      // preventdefault only for <a> elements (which change the url) not inside the collapsible element
      if (event.currenttarget.tagname === 'a') {
        event.preventdefault();
      }

      var $trigger = $$$1(this);
      var selector = util.getselectorfromelement(this);
      var selectors = [].slice.call(document.queryselectorall(selector));
      $$$1(selectors).each(function () {
        var $target = $$$1(this);
        var data = $target.data(data_key);
        var config = data ? 'toggle' : $trigger.data();

        collapse._jqueryinterface.call($target, config);
      });
    });
    /**
     * ------------------------------------------------------------------------
     * jquery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[name] = collapse._jqueryinterface;
    $$$1.fn[name].constructor = collapse;

    $$$1.fn[name].noconflict = function () {
      $$$1.fn[name] = jquery_no_conflict;
      return collapse._jqueryinterface;
    };

    return collapse;
  }($);

  /**
   * --------------------------------------------------------------------------
   * bootstrap (v4.1.3): dropdown.js
   * licensed under mit (https://github.com/twbs/bootstrap/blob/master/license)
   * --------------------------------------------------------------------------
   */

  var dropdown = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * constants
     * ------------------------------------------------------------------------
     */
    var name = 'dropdown';
    var version = '4.1.3';
    var data_key = 'bs.dropdown';
    var event_key = "." + data_key;
    var data_api_key = '.data-api';
    var jquery_no_conflict = $$$1.fn[name];
    var escape_keycode = 27; // keyboardevent.which value for escape (esc) key

    var space_keycode = 32; // keyboardevent.which value for space key

    var tab_keycode = 9; // keyboardevent.which value for tab key

    var arrow_up_keycode = 38; // keyboardevent.which value for up arrow key

    var arrow_down_keycode = 40; // keyboardevent.which value for down arrow key

    var right_mouse_button_which = 3; // mouseevent.which value for the right button (assuming a right-handed mouse)

    var regexp_keydown = new regexp(arrow_up_keycode + "|" + arrow_down_keycode + "|" + escape_keycode);
    var event = {
      hide: "hide" + event_key,
      hidden: "hidden" + event_key,
      show: "show" + event_key,
      shown: "shown" + event_key,
      click: "click" + event_key,
      click_data_api: "click" + event_key + data_api_key,
      keydown_data_api: "keydown" + event_key + data_api_key,
      keyup_data_api: "keyup" + event_key + data_api_key
    };
    var classname = {
      disabled: 'disabled',
      show: 'show',
      dropup: 'dropup',
      dropright: 'dropright',
      dropleft: 'dropleft',
      menuright: 'dropdown-menu-right',
      menuleft: 'dropdown-menu-left',
      position_static: 'position-static'
    };
    var selector = {
      data_toggle: '[data-toggle="dropdown"]',
      form_child: '.dropdown form',
      menu: '.dropdown-menu',
      navbar_nav: '.navbar-nav',
      visible_items: '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'
    };
    var attachmentmap = {
      top: 'top-start',
      topend: 'top-end',
      bottom: 'bottom-start',
      bottomend: 'bottom-end',
      right: 'right-start',
      rightend: 'right-end',
      left: 'left-start',
      leftend: 'left-end'
    };
    var default = {
      offset: 0,
      flip: true,
      boundary: 'scrollparent',
      reference: 'toggle',
      display: 'dynamic'
    };
    var defaulttype = {
      offset: '(number|string|function)',
      flip: 'boolean',
      boundary: '(string|element)',
      reference: '(string|element)',
      display: 'string'
      /**
       * ------------------------------------------------------------------------
       * class definition
       * ------------------------------------------------------------------------
       */

    };

    var dropdown =
    /*#__pure__*/
    function () {
      function dropdown(element, config) {
        this._element = element;
        this._popper = null;
        this._config = this._getconfig(config);
        this._menu = this._getmenuelement();
        this._innavbar = this._detectnavbar();

        this._addeventlisteners();
      } // getters


      var _proto = dropdown.prototype;

      // public
      _proto.toggle = function toggle() {
        if (this._element.disabled || $$$1(this._element).hasclass(classname.disabled)) {
          return;
        }

        var parent = dropdown._getparentfromelement(this._element);

        var isactive = $$$1(this._menu).hasclass(classname.show);

        dropdown._clearmenus();

        if (isactive) {
          return;
        }

        var relatedtarget = {
          relatedtarget: this._element
        };
        var showevent = $$$1.event(event.show, relatedtarget);
        $$$1(parent).trigger(showevent);

        if (showevent.isdefaultprevented()) {
          return;
        } // disable totally popper.js for dropdown in navbar


        if (!this._innavbar) {
          /**
           * check for popper dependency
           * popper - https://popper.js.org
           */
          if (typeof popper === 'undefined') {
            throw new typeerror('bootstrap dropdown require popper.js (https://popper.js.org)');
          }

          var referenceelement = this._element;

          if (this._config.reference === 'parent') {
            referenceelement = parent;
          } else if (util.iselement(this._config.reference)) {
            referenceelement = this._config.reference; // check if it's jquery element

            if (typeof this._config.reference.jquery !== 'undefined') {
              referenceelement = this._config.reference[0];
            }
          } // if boundary is not `scrollparent`, then set position to `static`
          // to allow the menu to "escape" the scroll parent's boundaries
          // https://github.com/twbs/bootstrap/issues/24251


          if (this._config.boundary !== 'scrollparent') {
            $$$1(parent).addclass(classname.position_static);
          }

          this._popper = new popper(referenceelement, this._menu, this._getpopperconfig());
        } // if this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on ios
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


        if ('ontouchstart' in document.documentelement && $$$1(parent).closest(selector.navbar_nav).length === 0) {
          $$$1(document.body).children().on('mouseover', null, $$$1.noop);
        }

        this._element.focus();

        this._element.setattribute('aria-expanded', true);

        $$$1(this._menu).toggleclass(classname.show);
        $$$1(parent).toggleclass(classname.show).trigger($$$1.event(event.shown, relatedtarget));
      };

      _proto.dispose = function dispose() {
        $$$1.removedata(this._element, data_key);
        $$$1(this._element).off(event_key);
        this._element = null;
        this._menu = null;

        if (this._popper !== null) {
          this._popper.destroy();

          this._popper = null;
        }
      };

      _proto.update = function update() {
        this._innavbar = this._detectnavbar();

        if (this._popper !== null) {
          this._popper.scheduleupdate();
        }
      }; // private


      _proto._addeventlisteners = function _addeventlisteners() {
        var _this = this;

        $$$1(this._element).on(event.click, function (event) {
          event.preventdefault();
          event.stoppropagation();

          _this.toggle();
        });
      };

      _proto._getconfig = function _getconfig(config) {
        config = _objectspread({}, this.constructor.default, $$$1(this._element).data(), config);
        util.typecheckconfig(name, config, this.constructor.defaulttype);
        return config;
      };

      _proto._getmenuelement = function _getmenuelement() {
        if (!this._menu) {
          var parent = dropdown._getparentfromelement(this._element);

          if (parent) {
            this._menu = parent.queryselector(selector.menu);
          }
        }

        return this._menu;
      };

      _proto._getplacement = function _getplacement() {
        var $parentdropdown = $$$1(this._element.parentnode);
        var placement = attachmentmap.bottom; // handle dropup

        if ($parentdropdown.hasclass(classname.dropup)) {
          placement = attachmentmap.top;

          if ($$$1(this._menu).hasclass(classname.menuright)) {
            placement = attachmentmap.topend;
          }
        } else if ($parentdropdown.hasclass(classname.dropright)) {
          placement = attachmentmap.right;
        } else if ($parentdropdown.hasclass(classname.dropleft)) {
          placement = attachmentmap.left;
        } else if ($$$1(this._menu).hasclass(classname.menuright)) {
          placement = attachmentmap.bottomend;
        }

        return placement;
      };

      _proto._detectnavbar = function _detectnavbar() {
        return $$$1(this._element).closest('.navbar').length > 0;
      };

      _proto._getpopperconfig = function _getpopperconfig() {
        var _this2 = this;

        var offsetconf = {};

        if (typeof this._config.offset === 'function') {
          offsetconf.fn = function (data) {
            data.offsets = _objectspread({}, data.offsets, _this2._config.offset(data.offsets) || {});
            return data;
          };
        } else {
          offsetconf.offset = this._config.offset;
        }

        var popperconfig = {
          placement: this._getplacement(),
          modifiers: {
            offset: offsetconf,
            flip: {
              enabled: this._config.flip
            },
            preventoverflow: {
              boundarieselement: this._config.boundary
            }
          } // disable popper.js if we have a static display

        };

        if (this._config.display === 'static') {
          popperconfig.modifiers.applystyle = {
            enabled: false
          };
        }

        return popperconfig;
      }; // static


      dropdown._jqueryinterface = function _jqueryinterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(data_key);

          var _config = typeof config === 'object' ? config : null;

          if (!data) {
            data = new dropdown(this, _config);
            $$$1(this).data(data_key, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new typeerror("no method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      dropdown._clearmenus = function _clearmenus(event) {
        if (event && (event.which === right_mouse_button_which || event.type === 'keyup' && event.which !== tab_keycode)) {
          return;
        }

        var toggles = [].slice.call(document.queryselectorall(selector.data_toggle));

        for (var i = 0, len = toggles.length; i < len; i++) {
          var parent = dropdown._getparentfromelement(toggles[i]);

          var context = $$$1(toggles[i]).data(data_key);
          var relatedtarget = {
            relatedtarget: toggles[i]
          };

          if (event && event.type === 'click') {
            relatedtarget.clickevent = event;
          }

          if (!context) {
            continue;
          }

          var dropdownmenu = context._menu;

          if (!$$$1(parent).hasclass(classname.show)) {
            continue;
          }

          if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagname) || event.type === 'keyup' && event.which === tab_keycode) && $$$1.contains(parent, event.target)) {
            continue;
          }

          var hideevent = $$$1.event(event.hide, relatedtarget);
          $$$1(parent).trigger(hideevent);

          if (hideevent.isdefaultprevented()) {
            continue;
          } // if this is a touch-enabled device we remove the extra
          // empty mouseover listeners we added for ios support


          if ('ontouchstart' in document.documentelement) {
            $$$1(document.body).children().off('mouseover', null, $$$1.noop);
          }

          toggles[i].setattribute('aria-expanded', 'false');
          $$$1(dropdownmenu).removeclass(classname.show);
          $$$1(parent).removeclass(classname.show).trigger($$$1.event(event.hidden, relatedtarget));
        }
      };

      dropdown._getparentfromelement = function _getparentfromelement(element) {
        var parent;
        var selector = util.getselectorfromelement(element);

        if (selector) {
          parent = document.queryselector(selector);
        }

        return parent || element.parentnode;
      }; // eslint-disable-next-line complexity


      dropdown._dataapikeydownhandler = function _dataapikeydownhandler(event) {
        // if not input/textarea:
        //  - and not a key in regexp_keydown => not a dropdown command
        // if input/textarea:
        //  - if space key => not a dropdown command
        //  - if key is other than escape
        //    - if key is not up or down => not a dropdown command
        //    - if trigger inside the menu => not a dropdown command
        if (/input|textarea/i.test(event.target.tagname) ? event.which === space_keycode || event.which !== escape_keycode && (event.which !== arrow_down_keycode && event.which !== arrow_up_keycode || $$$1(event.target).closest(selector.menu).length) : !regexp_keydown.test(event.which)) {
          return;
        }

        event.preventdefault();
        event.stoppropagation();

        if (this.disabled || $$$1(this).hasclass(classname.disabled)) {
          return;
        }

        var parent = dropdown._getparentfromelement(this);

        var isactive = $$$1(parent).hasclass(classname.show);

        if (!isactive && (event.which !== escape_keycode || event.which !== space_keycode) || isactive && (event.which === escape_keycode || event.which === space_keycode)) {
          if (event.which === escape_keycode) {
            var toggle = parent.queryselector(selector.data_toggle);
            $$$1(toggle).trigger('focus');
          }

          $$$1(this).trigger('click');
          return;
        }

        var items = [].slice.call(parent.queryselectorall(selector.visible_items));

        if (items.length === 0) {
          return;
        }

        var index = items.indexof(event.target);

        if (event.which === arrow_up_keycode && index > 0) {
          // up
          index--;
        }

        if (event.which === arrow_down_keycode && index < items.length - 1) {
          // down
          index++;
        }

        if (index < 0) {
          index = 0;
        }

        items[index].focus();
      };

      _createclass(dropdown, null, [{
        key: "version",
        get: function get() {
          return version;
        }
      }, {
        key: "default",
        get: function get() {
          return default;
        }
      }, {
        key: "defaulttype",
        get: function get() {
          return defaulttype;
        }
      }]);

      return dropdown;
    }();
    /**
     * ------------------------------------------------------------------------
     * data api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(event.keydown_data_api, selector.data_toggle, dropdown._dataapikeydownhandler).on(event.keydown_data_api, selector.menu, dropdown._dataapikeydownhandler).on(event.click_data_api + " " + event.keyup_data_api, dropdown._clearmenus).on(event.click_data_api, selector.data_toggle, function (event) {
      event.preventdefault();
      event.stoppropagation();

      dropdown._jqueryinterface.call($$$1(this), 'toggle');
    }).on(event.click_data_api, selector.form_child, function (e) {
      e.stoppropagation();
    });
    /**
     * ------------------------------------------------------------------------
     * jquery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[name] = dropdown._jqueryinterface;
    $$$1.fn[name].constructor = dropdown;

    $$$1.fn[name].noconflict = function () {
      $$$1.fn[name] = jquery_no_conflict;
      return dropdown._jqueryinterface;
    };

    return dropdown;
  }($, popper);

  /**
   * --------------------------------------------------------------------------
   * bootstrap (v4.1.3): modal.js
   * licensed under mit (https://github.com/twbs/bootstrap/blob/master/license)
   * --------------------------------------------------------------------------
   */

  var modal = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * constants
     * ------------------------------------------------------------------------
     */
    var name = 'modal';
    var version = '4.1.3';
    var data_key = 'bs.modal';
    var event_key = "." + data_key;
    var data_api_key = '.data-api';
    var jquery_no_conflict = $$$1.fn[name];
    var escape_keycode = 27; // keyboardevent.which value for escape (esc) key

    var default = {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: true
    };
    var defaulttype = {
      backdrop: '(boolean|string)',
      keyboard: 'boolean',
      focus: 'boolean',
      show: 'boolean'
    };
    var event = {
      hide: "hide" + event_key,
      hidden: "hidden" + event_key,
      show: "show" + event_key,
      shown: "shown" + event_key,
      focusin: "focusin" + event_key,
      resize: "resize" + event_key,
      click_dismiss: "click.dismiss" + event_key,
      keydown_dismiss: "keydown.dismiss" + event_key,
      mouseup_dismiss: "mouseup.dismiss" + event_key,
      mousedown_dismiss: "mousedown.dismiss" + event_key,
      click_data_api: "click" + event_key + data_api_key
    };
    var classname = {
      scrollbar_measurer: 'modal-scrollbar-measure',
      backdrop: 'modal-backdrop',
      open: 'modal-open',
      fade: 'fade',
      show: 'show'
    };
    var selector = {
      dialog: '.modal-dialog',
      data_toggle: '[data-toggle="modal"]',
      data_dismiss: '[data-dismiss="modal"]',
      fixed_content: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
      sticky_content: '.sticky-top'
      /**
       * ------------------------------------------------------------------------
       * class definition
       * ------------------------------------------------------------------------
       */

    };

    var modal =
    /*#__pure__*/
    function () {
      function modal(element, config) {
        this._config = this._getconfig(config);
        this._element = element;
        this._dialog = element.queryselector(selector.dialog);
        this._backdrop = null;
        this._isshown = false;
        this._isbodyoverflowing = false;
        this._ignorebackdropclick = false;
        this._scrollbarwidth = 0;
      } // getters


      var _proto = modal.prototype;

      // public
      _proto.toggle = function toggle(relatedtarget) {
        return this._isshown ? this.hide() : this.show(relatedtarget);
      };

      _proto.show = function show(relatedtarget) {
        var _this = this;

        if (this._istransitioning || this._isshown) {
          return;
        }

        if ($$$1(this._element).hasclass(classname.fade)) {
          this._istransitioning = true;
        }

        var showevent = $$$1.event(event.show, {
          relatedtarget: relatedtarget
        });
        $$$1(this._element).trigger(showevent);

        if (this._isshown || showevent.isdefaultprevented()) {
          return;
        }

        this._isshown = true;

        this._checkscrollbar();

        this._setscrollbar();

        this._adjustdialog();

        $$$1(document.body).addclass(classname.open);

        this._setescapeevent();

        this._setresizeevent();

        $$$1(this._element).on(event.click_dismiss, selector.data_dismiss, function (event) {
          return _this.hide(event);
        });
        $$$1(this._dialog).on(event.mousedown_dismiss, function () {
          $$$1(_this._element).one(event.mouseup_dismiss, function (event) {
            if ($$$1(event.target).is(_this._element)) {
              _this._ignorebackdropclick = true;
            }
          });
        });

        this._showbackdrop(function () {
          return _this._showelement(relatedtarget);
        });
      };

      _proto.hide = function hide(event) {
        var _this2 = this;

        if (event) {
          event.preventdefault();
        }

        if (this._istransitioning || !this._isshown) {
          return;
        }

        var hideevent = $$$1.event(event.hide);
        $$$1(this._element).trigger(hideevent);

        if (!this._isshown || hideevent.isdefaultprevented()) {
          return;
        }

        this._isshown = false;
        var transition = $$$1(this._element).hasclass(classname.fade);

        if (transition) {
          this._istransitioning = true;
        }

        this._setescapeevent();

        this._setresizeevent();

        $$$1(document).off(event.focusin);
        $$$1(this._element).removeclass(classname.show);
        $$$1(this._element).off(event.click_dismiss);
        $$$1(this._dialog).off(event.mousedown_dismiss);

        if (transition) {
          var transitionduration = util.gettransitiondurationfromelement(this._element);
          $$$1(this._element).one(util.transition_end, function (event) {
            return _this2._hidemodal(event);
          }).emulatetransitionend(transitionduration);
        } else {
          this._hidemodal();
        }
      };

      _proto.dispose = function dispose() {
        $$$1.removedata(this._element, data_key);
        $$$1(window, document, this._element, this._backdrop).off(event_key);
        this._config = null;
        this._element = null;
        this._dialog = null;
        this._backdrop = null;
        this._isshown = null;
        this._isbodyoverflowing = null;
        this._ignorebackdropclick = null;
        this._scrollbarwidth = null;
      };

      _proto.handleupdate = function handleupdate() {
        this._adjustdialog();
      }; // private


      _proto._getconfig = function _getconfig(config) {
        config = _objectspread({}, default, config);
        util.typecheckconfig(name, config, defaulttype);
        return config;
      };

      _proto._showelement = function _showelement(relatedtarget) {
        var _this3 = this;

        var transition = $$$1(this._element).hasclass(classname.fade);

        if (!this._element.parentnode || this._element.parentnode.nodetype !== node.element_node) {
          // don't move modal's dom position
          document.body.appendchild(this._element);
        }

        this._element.style.display = 'block';

        this._element.removeattribute('aria-hidden');

        this._element.scrolltop = 0;

        if (transition) {
          util.reflow(this._element);
        }

        $$$1(this._element).addclass(classname.show);

        if (this._config.focus) {
          this._enforcefocus();
        }

        var shownevent = $$$1.event(event.shown, {
          relatedtarget: relatedtarget
        });

        var transitioncomplete = function transitioncomplete() {
          if (_this3._config.focus) {
            _this3._element.focus();
          }

          _this3._istransitioning = false;
          $$$1(_this3._element).trigger(shownevent);
        };

        if (transition) {
          var transitionduration = util.gettransitiondurationfromelement(this._element);
          $$$1(this._dialog).one(util.transition_end, transitioncomplete).emulatetransitionend(transitionduration);
        } else {
          transitioncomplete();
        }
      };

      _proto._enforcefocus = function _enforcefocus() {
        var _this4 = this;

        $$$1(document).off(event.focusin) // guard against infinite focus loop
        .on(event.focusin, function (event) {
          if (document !== event.target && _this4._element !== event.target && $$$1(_this4._element).has(event.target).length === 0) {
            _this4._element.focus();
          }
        });
      };

      _proto._setescapeevent = function _setescapeevent() {
        var _this5 = this;

        if (this._isshown && this._config.keyboard) {
          $$$1(this._element).on(event.keydown_dismiss, function (event) {
            if (event.which === escape_keycode) {
              event.preventdefault();

              _this5.hide();
            }
          });
        } else if (!this._isshown) {
          $$$1(this._element).off(event.keydown_dismiss);
        }
      };

      _proto._setresizeevent = function _setresizeevent() {
        var _this6 = this;

        if (this._isshown) {
          $$$1(window).on(event.resize, function (event) {
            return _this6.handleupdate(event);
          });
        } else {
          $$$1(window).off(event.resize);
        }
      };

      _proto._hidemodal = function _hidemodal() {
        var _this7 = this;

        this._element.style.display = 'none';

        this._element.setattribute('aria-hidden', true);

        this._istransitioning = false;

        this._showbackdrop(function () {
          $$$1(document.body).removeclass(classname.open);

          _this7._resetadjustments();

          _this7._resetscrollbar();

          $$$1(_this7._element).trigger(event.hidden);
        });
      };

      _proto._removebackdrop = function _removebackdrop() {
        if (this._backdrop) {
          $$$1(this._backdrop).remove();
          this._backdrop = null;
        }
      };

      _proto._showbackdrop = function _showbackdrop(callback) {
        var _this8 = this;

        var animate = $$$1(this._element).hasclass(classname.fade) ? classname.fade : '';

        if (this._isshown && this._config.backdrop) {
          this._backdrop = document.createelement('div');
          this._backdrop.classname = classname.backdrop;

          if (animate) {
            this._backdrop.classlist.add(animate);
          }

          $$$1(this._backdrop).appendto(document.body);
          $$$1(this._element).on(event.click_dismiss, function (event) {
            if (_this8._ignorebackdropclick) {
              _this8._ignorebackdropclick = false;
              return;
            }

            if (event.target !== event.currenttarget) {
              return;
            }

            if (_this8._config.backdrop === 'static') {
              _this8._element.focus();
            } else {
              _this8.hide();
            }
          });

          if (animate) {
            util.reflow(this._backdrop);
          }

          $$$1(this._backdrop).addclass(classname.show);

          if (!callback) {
            return;
          }

          if (!animate) {
            callback();
            return;
          }

          var backdroptransitionduration = util.gettransitiondurationfromelement(this._backdrop);
          $$$1(this._backdrop).one(util.transition_end, callback).emulatetransitionend(backdroptransitionduration);
        } else if (!this._isshown && this._backdrop) {
          $$$1(this._backdrop).removeclass(classname.show);

          var callbackremove = function callbackremove() {
            _this8._removebackdrop();

            if (callback) {
              callback();
            }
          };

          if ($$$1(this._element).hasclass(classname.fade)) {
            var _backdroptransitionduration = util.gettransitiondurationfromelement(this._backdrop);

            $$$1(this._backdrop).one(util.transition_end, callbackremove).emulatetransitionend(_backdroptransitionduration);
          } else {
            callbackremove();
          }
        } else if (callback) {
          callback();
        }
      }; // ----------------------------------------------------------------------
      // the following methods are used to handle overflowing modals
      // todo (fat): these should probably be refactored out of modal.js
      // ----------------------------------------------------------------------


      _proto._adjustdialog = function _adjustdialog() {
        var ismodaloverflowing = this._element.scrollheight > document.documentelement.clientheight;

        if (!this._isbodyoverflowing && ismodaloverflowing) {
          this._element.style.paddingleft = this._scrollbarwidth + "px";
        }

        if (this._isbodyoverflowing && !ismodaloverflowing) {
          this._element.style.paddingright = this._scrollbarwidth + "px";
        }
      };

      _proto._resetadjustments = function _resetadjustments() {
        this._element.style.paddingleft = '';
        this._element.style.paddingright = '';
      };

      _proto._checkscrollbar = function _checkscrollbar() {
        var rect = document.body.getboundingclientrect();
        this._isbodyoverflowing = rect.left + rect.right < window.innerwidth;
        this._scrollbarwidth = this._getscrollbarwidth();
      };

      _proto._setscrollbar = function _setscrollbar() {
        var _this9 = this;

        if (this._isbodyoverflowing) {
          // note: domnode.style.paddingright returns the actual value or '' if not set
          //   while $(domnode).css('padding-right') returns the calculated value or 0 if not set
          var fixedcontent = [].slice.call(document.queryselectorall(selector.fixed_content));
          var stickycontent = [].slice.call(document.queryselectorall(selector.sticky_content)); // adjust fixed content padding

          $$$1(fixedcontent).each(function (index, element) {
            var actualpadding = element.style.paddingright;
            var calculatedpadding = $$$1(element).css('padding-right');
            $$$1(element).data('padding-right', actualpadding).css('padding-right', parsefloat(calculatedpadding) + _this9._scrollbarwidth + "px");
          }); // adjust sticky content margin

          $$$1(stickycontent).each(function (index, element) {
            var actualmargin = element.style.marginright;
            var calculatedmargin = $$$1(element).css('margin-right');
            $$$1(element).data('margin-right', actualmargin).css('margin-right', parsefloat(calculatedmargin) - _this9._scrollbarwidth + "px");
          }); // adjust body padding

          var actualpadding = document.body.style.paddingright;
          var calculatedpadding = $$$1(document.body).css('padding-right');
          $$$1(document.body).data('padding-right', actualpadding).css('padding-right', parsefloat(calculatedpadding) + this._scrollbarwidth + "px");
        }
      };

      _proto._resetscrollbar = function _resetscrollbar() {
        // restore fixed content padding
        var fixedcontent = [].slice.call(document.queryselectorall(selector.fixed_content));
        $$$1(fixedcontent).each(function (index, element) {
          var padding = $$$1(element).data('padding-right');
          $$$1(element).removedata('padding-right');
          element.style.paddingright = padding ? padding : '';
        }); // restore sticky content

        var elements = [].slice.call(document.queryselectorall("" + selector.sticky_content));
        $$$1(elements).each(function (index, element) {
          var margin = $$$1(element).data('margin-right');

          if (typeof margin !== 'undefined') {
            $$$1(element).css('margin-right', margin).removedata('margin-right');
          }
        }); // restore body padding

        var padding = $$$1(document.body).data('padding-right');
        $$$1(document.body).removedata('padding-right');
        document.body.style.paddingright = padding ? padding : '';
      };

      _proto._getscrollbarwidth = function _getscrollbarwidth() {
        // thx d.walsh
        var scrolldiv = document.createelement('div');
        scrolldiv.classname = classname.scrollbar_measurer;
        document.body.appendchild(scrolldiv);
        var scrollbarwidth = scrolldiv.getboundingclientrect().width - scrolldiv.clientwidth;
        document.body.removechild(scrolldiv);
        return scrollbarwidth;
      }; // static


      modal._jqueryinterface = function _jqueryinterface(config, relatedtarget) {
        return this.each(function () {
          var data = $$$1(this).data(data_key);

          var _config = _objectspread({}, default, $$$1(this).data(), typeof config === 'object' && config ? config : {});

          if (!data) {
            data = new modal(this, _config);
            $$$1(this).data(data_key, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new typeerror("no method named \"" + config + "\"");
            }

            data[config](relatedtarget);
          } else if (_config.show) {
            data.show(relatedtarget);
          }
        });
      };

      _createclass(modal, null, [{
        key: "version",
        get: function get() {
          return version;
        }
      }, {
        key: "default",
        get: function get() {
          return default;
        }
      }]);

      return modal;
    }();
    /**
     * ------------------------------------------------------------------------
     * data api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(event.click_data_api, selector.data_toggle, function (event) {
      var _this10 = this;

      var target;
      var selector = util.getselectorfromelement(this);

      if (selector) {
        target = document.queryselector(selector);
      }

      var config = $$$1(target).data(data_key) ? 'toggle' : _objectspread({}, $$$1(target).data(), $$$1(this).data());

      if (this.tagname === 'a' || this.tagname === 'area') {
        event.preventdefault();
      }

      var $target = $$$1(target).one(event.show, function (showevent) {
        if (showevent.isdefaultprevented()) {
          // only register focus restorer if modal will actually get shown
          return;
        }

        $target.one(event.hidden, function () {
          if ($$$1(_this10).is(':visible')) {
            _this10.focus();
          }
        });
      });

      modal._jqueryinterface.call($$$1(target), config, this);
    });
    /**
     * ------------------------------------------------------------------------
     * jquery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[name] = modal._jqueryinterface;
    $$$1.fn[name].constructor = modal;

    $$$1.fn[name].noconflict = function () {
      $$$1.fn[name] = jquery_no_conflict;
      return modal._jqueryinterface;
    };

    return modal;
  }($);

  /**
   * --------------------------------------------------------------------------
   * bootstrap (v4.1.3): tooltip.js
   * licensed under mit (https://github.com/twbs/bootstrap/blob/master/license)
   * --------------------------------------------------------------------------
   */

  var tooltip = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * constants
     * ------------------------------------------------------------------------
     */
    var name = 'tooltip';
    var version = '4.1.3';
    var data_key = 'bs.tooltip';
    var event_key = "." + data_key;
    var jquery_no_conflict = $$$1.fn[name];
    var class_prefix = 'bs-tooltip';
    var bscls_prefix_regex = new regexp("(^|\\s)" + class_prefix + "\\s+", 'g');
    var defaulttype = {
      animation: 'boolean',
      template: 'string',
      title: '(string|element|function)',
      trigger: 'string',
      delay: '(number|object)',
      html: 'boolean',
      selector: '(string|boolean)',
      placement: '(string|function)',
      offset: '(number|string)',
      container: '(string|element|boolean)',
      fallbackplacement: '(string|array)',
      boundary: '(string|element)'
    };
    var attachmentmap = {
      auto: 'auto',
      top: 'top',
      right: 'right',
      bottom: 'bottom',
      left: 'left'
    };
    var default = {
      animation: true,
      template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
      trigger: 'hover focus',
      title: '',
      delay: 0,
      html: false,
      selector: false,
      placement: 'top',
      offset: 0,
      container: false,
      fallbackplacement: 'flip',
      boundary: 'scrollparent'
    };
    var hoverstate = {
      show: 'show',
      out: 'out'
    };
    var event = {
      hide: "hide" + event_key,
      hidden: "hidden" + event_key,
      show: "show" + event_key,
      shown: "shown" + event_key,
      inserted: "inserted" + event_key,
      click: "click" + event_key,
      focusin: "focusin" + event_key,
      focusout: "focusout" + event_key,
      mouseenter: "mouseenter" + event_key,
      mouseleave: "mouseleave" + event_key
    };
    var classname = {
      fade: 'fade',
      show: 'show'
    };
    var selector = {
      tooltip: '.tooltip',
      tooltip_inner: '.tooltip-inner',
      arrow: '.arrow'
    };
    var trigger = {
      hover: 'hover',
      focus: 'focus',
      click: 'click',
      manual: 'manual'
      /**
       * ------------------------------------------------------------------------
       * class definition
       * ------------------------------------------------------------------------
       */

    };

    var tooltip =
    /*#__pure__*/
    function () {
      function tooltip(element, config) {
        /**
         * check for popper dependency
         * popper - https://popper.js.org
         */
        if (typeof popper === 'undefined') {
          throw new typeerror('bootstrap tooltips require popper.js (https://popper.js.org)');
        } // private


        this._isenabled = true;
        this._timeout = 0;
        this._hoverstate = '';
        this._activetrigger = {};
        this._popper = null; // protected

        this.element = element;
        this.config = this._getconfig(config);
        this.tip = null;

        this._setlisteners();
      } // getters


      var _proto = tooltip.prototype;

      // public
      _proto.enable = function enable() {
        this._isenabled = true;
      };

      _proto.disable = function disable() {
        this._isenabled = false;
      };

      _proto.toggleenabled = function toggleenabled() {
        this._isenabled = !this._isenabled;
      };

      _proto.toggle = function toggle(event) {
        if (!this._isenabled) {
          return;
        }

        if (event) {
          var datakey = this.constructor.data_key;
          var context = $$$1(event.currenttarget).data(datakey);

          if (!context) {
            context = new this.constructor(event.currenttarget, this._getdelegateconfig());
            $$$1(event.currenttarget).data(datakey, context);
          }

          context._activetrigger.click = !context._activetrigger.click;

          if (context._iswithactivetrigger()) {
            context._enter(null, context);
          } else {
            context._leave(null, context);
          }
        } else {
          if ($$$1(this.gettipelement()).hasclass(classname.show)) {
            this._leave(null, this);

            return;
          }

          this._enter(null, this);
        }
      };

      _proto.dispose = function dispose() {
        cleartimeout(this._timeout);
        $$$1.removedata(this.element, this.constructor.data_key);
        $$$1(this.element).off(this.constructor.event_key);
        $$$1(this.element).closest('.modal').off('hide.bs.modal');

        if (this.tip) {
          $$$1(this.tip).remove();
        }

        this._isenabled = null;
        this._timeout = null;
        this._hoverstate = null;
        this._activetrigger = null;

        if (this._popper !== null) {
          this._popper.destroy();
        }

        this._popper = null;
        this.element = null;
        this.config = null;
        this.tip = null;
      };

      _proto.show = function show() {
        var _this = this;

        if ($$$1(this.element).css('display') === 'none') {
          throw new error('please use show on visible elements');
        }

        var showevent = $$$1.event(this.constructor.event.show);

        if (this.iswithcontent() && this._isenabled) {
          $$$1(this.element).trigger(showevent);
          var isinthedom = $$$1.contains(this.element.ownerdocument.documentelement, this.element);

          if (showevent.isdefaultprevented() || !isinthedom) {
            return;
          }

          var tip = this.gettipelement();
          var tipid = util.getuid(this.constructor.name);
          tip.setattribute('id', tipid);
          this.element.setattribute('aria-describedby', tipid);
          this.setcontent();

          if (this.config.animation) {
            $$$1(tip).addclass(classname.fade);
          }

          var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

          var attachment = this._getattachment(placement);

          this.addattachmentclass(attachment);
          var container = this.config.container === false ? document.body : $$$1(document).find(this.config.container);
          $$$1(tip).data(this.constructor.data_key, this);

          if (!$$$1.contains(this.element.ownerdocument.documentelement, this.tip)) {
            $$$1(tip).appendto(container);
          }

          $$$1(this.element).trigger(this.constructor.event.inserted);
          this._popper = new popper(this.element, tip, {
            placement: attachment,
            modifiers: {
              offset: {
                offset: this.config.offset
              },
              flip: {
                behavior: this.config.fallbackplacement
              },
              arrow: {
                element: selector.arrow
              },
              preventoverflow: {
                boundarieselement: this.config.boundary
              }
            },
            oncreate: function oncreate(data) {
              if (data.originalplacement !== data.placement) {
                _this._handlepopperplacementchange(data);
              }
            },
            onupdate: function onupdate(data) {
              _this._handlepopperplacementchange(data);
            }
          });
          $$$1(tip).addclass(classname.show); // if this is a touch-enabled device we add extra
          // empty mouseover listeners to the body's immediate children;
          // only needed because of broken event delegation on ios
          // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

          if ('ontouchstart' in document.documentelement) {
            $$$1(document.body).children().on('mouseover', null, $$$1.noop);
          }

          var complete = function complete() {
            if (_this.config.animation) {
              _this._fixtransition();
            }

            var prevhoverstate = _this._hoverstate;
            _this._hoverstate = null;
            $$$1(_this.element).trigger(_this.constructor.event.shown);

            if (prevhoverstate === hoverstate.out) {
              _this._leave(null, _this);
            }
          };

          if ($$$1(this.tip).hasclass(classname.fade)) {
            var transitionduration = util.gettransitiondurationfromelement(this.tip);
            $$$1(this.tip).one(util.transition_end, complete).emulatetransitionend(transitionduration);
          } else {
            complete();
          }
        }
      };

      _proto.hide = function hide(callback) {
        var _this2 = this;

        var tip = this.gettipelement();
        var hideevent = $$$1.event(this.constructor.event.hide);

        var complete = function complete() {
          if (_this2._hoverstate !== hoverstate.show && tip.parentnode) {
            tip.parentnode.removechild(tip);
          }

          _this2._cleantipclass();

          _this2.element.removeattribute('aria-describedby');

          $$$1(_this2.element).trigger(_this2.constructor.event.hidden);

          if (_this2._popper !== null) {
            _this2._popper.destroy();
          }

          if (callback) {
            callback();
          }
        };

        $$$1(this.element).trigger(hideevent);

        if (hideevent.isdefaultprevented()) {
          return;
        }

        $$$1(tip).removeclass(classname.show); // if this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for ios support

        if ('ontouchstart' in document.documentelement) {
          $$$1(document.body).children().off('mouseover', null, $$$1.noop);
        }

        this._activetrigger[trigger.click] = false;
        this._activetrigger[trigger.focus] = false;
        this._activetrigger[trigger.hover] = false;

        if ($$$1(this.tip).hasclass(classname.fade)) {
          var transitionduration = util.gettransitiondurationfromelement(tip);
          $$$1(tip).one(util.transition_end, complete).emulatetransitionend(transitionduration);
        } else {
          complete();
        }

        this._hoverstate = '';
      };

      _proto.update = function update() {
        if (this._popper !== null) {
          this._popper.scheduleupdate();
        }
      }; // protected


      _proto.iswithcontent = function iswithcontent() {
        return boolean(this.gettitle());
      };

      _proto.addattachmentclass = function addattachmentclass(attachment) {
        $$$1(this.gettipelement()).addclass(class_prefix + "-" + attachment);
      };

      _proto.gettipelement = function gettipelement() {
        this.tip = this.tip || $$$1(this.config.template)[0];
        return this.tip;
      };

      _proto.setcontent = function setcontent() {
        var tip = this.gettipelement();
        this.setelementcontent($$$1(tip.queryselectorall(selector.tooltip_inner)), this.gettitle());
        $$$1(tip).removeclass(classname.fade + " " + classname.show);
      };

      _proto.setelementcontent = function setelementcontent($element, content) {
        var html = this.config.html;

        if (typeof content === 'object' && (content.nodetype || content.jquery)) {
          // content is a dom node or a jquery
          if (html) {
            if (!$$$1(content).parent().is($element)) {
              $element.empty().append(content);
            }
          } else {
            $element.text($$$1(content).text());
          }
        } else {
          $element[html ? 'html' : 'text'](content);
        }
      };

      _proto.gettitle = function gettitle() {
        var title = this.element.getattribute('data-original-title');

        if (!title) {
          title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
        }

        return title;
      }; // private


      _proto._getattachment = function _getattachment(placement) {
        return attachmentmap[placement.touppercase()];
      };

      _proto._setlisteners = function _setlisteners() {
        var _this3 = this;

        var triggers = this.config.trigger.split(' ');
        triggers.foreach(function (trigger) {
          if (trigger === 'click') {
            $$$1(_this3.element).on(_this3.constructor.event.click, _this3.config.selector, function (event) {
              return _this3.toggle(event);
            });
          } else if (trigger !== trigger.manual) {
            var eventin = trigger === trigger.hover ? _this3.constructor.event.mouseenter : _this3.constructor.event.focusin;
            var eventout = trigger === trigger.hover ? _this3.constructor.event.mouseleave : _this3.constructor.event.focusout;
            $$$1(_this3.element).on(eventin, _this3.config.selector, function (event) {
              return _this3._enter(event);
            }).on(eventout, _this3.config.selector, function (event) {
              return _this3._leave(event);
            });
          }

          $$$1(_this3.element).closest('.modal').on('hide.bs.modal', function () {
            return _this3.hide();
          });
        });

        if (this.config.selector) {
          this.config = _objectspread({}, this.config, {
            trigger: 'manual',
            selector: ''
          });
        } else {
          this._fixtitle();
        }
      };

      _proto._fixtitle = function _fixtitle() {
        var titletype = typeof this.element.getattribute('data-original-title');

        if (this.element.getattribute('title') || titletype !== 'string') {
          this.element.setattribute('data-original-title', this.element.getattribute('title') || '');
          this.element.setattribute('title', '');
        }
      };

      _proto._enter = function _enter(event, context) {
        var datakey = this.constructor.data_key;
        context = context || $$$1(event.currenttarget).data(datakey);

        if (!context) {
          context = new this.constructor(event.currenttarget, this._getdelegateconfig());
          $$$1(event.currenttarget).data(datakey, context);
        }

        if (event) {
          context._activetrigger[event.type === 'focusin' ? trigger.focus : trigger.hover] = true;
        }

        if ($$$1(context.gettipelement()).hasclass(classname.show) || context._hoverstate === hoverstate.show) {
          context._hoverstate = hoverstate.show;
          return;
        }

        cleartimeout(context._timeout);
        context._hoverstate = hoverstate.show;

        if (!context.config.delay || !context.config.delay.show) {
          context.show();
          return;
        }

        context._timeout = settimeout(function () {
          if (context._hoverstate === hoverstate.show) {
            context.show();
          }
        }, context.config.delay.show);
      };

      _proto._leave = function _leave(event, context) {
        var datakey = this.constructor.data_key;
        context = context || $$$1(event.currenttarget).data(datakey);

        if (!context) {
          context = new this.constructor(event.currenttarget, this._getdelegateconfig());
          $$$1(event.currenttarget).data(datakey, context);
        }

        if (event) {
          context._activetrigger[event.type === 'focusout' ? trigger.focus : trigger.hover] = false;
        }

        if (context._iswithactivetrigger()) {
          return;
        }

        cleartimeout(context._timeout);
        context._hoverstate = hoverstate.out;

        if (!context.config.delay || !context.config.delay.hide) {
          context.hide();
          return;
        }

        context._timeout = settimeout(function () {
          if (context._hoverstate === hoverstate.out) {
            context.hide();
          }
        }, context.config.delay.hide);
      };

      _proto._iswithactivetrigger = function _iswithactivetrigger() {
        for (var trigger in this._activetrigger) {
          if (this._activetrigger[trigger]) {
            return true;
          }
        }

        return false;
      };

      _proto._getconfig = function _getconfig(config) {
        config = _objectspread({}, this.constructor.default, $$$1(this.element).data(), typeof config === 'object' && config ? config : {});

        if (typeof config.delay === 'number') {
          config.delay = {
            show: config.delay,
            hide: config.delay
          };
        }

        if (typeof config.title === 'number') {
          config.title = config.title.tostring();
        }

        if (typeof config.content === 'number') {
          config.content = config.content.tostring();
        }

        util.typecheckconfig(name, config, this.constructor.defaulttype);
        return config;
      };

      _proto._getdelegateconfig = function _getdelegateconfig() {
        var config = {};

        if (this.config) {
          for (var key in this.config) {
            if (this.constructor.default[key] !== this.config[key]) {
              config[key] = this.config[key];
            }
          }
        }

        return config;
      };

      _proto._cleantipclass = function _cleantipclass() {
        var $tip = $$$1(this.gettipelement());
        var tabclass = $tip.attr('class').match(bscls_prefix_regex);

        if (tabclass !== null && tabclass.length) {
          $tip.removeclass(tabclass.join(''));
        }
      };

      _proto._handlepopperplacementchange = function _handlepopperplacementchange(popperdata) {
        var popperinstance = popperdata.instance;
        this.tip = popperinstance.popper;

        this._cleantipclass();

        this.addattachmentclass(this._getattachment(popperdata.placement));
      };

      _proto._fixtransition = function _fixtransition() {
        var tip = this.gettipelement();
        var initconfiganimation = this.config.animation;

        if (tip.getattribute('x-placement') !== null) {
          return;
        }

        $$$1(tip).removeclass(classname.fade);
        this.config.animation = false;
        this.hide();
        this.show();
        this.config.animation = initconfiganimation;
      }; // static


      tooltip._jqueryinterface = function _jqueryinterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(data_key);

          var _config = typeof config === 'object' && config;

          if (!data && /dispose|hide/.test(config)) {
            return;
          }

          if (!data) {
            data = new tooltip(this, _config);
            $$$1(this).data(data_key, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new typeerror("no method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createclass(tooltip, null, [{
        key: "version",
        get: function get() {
          return version;
        }
      }, {
        key: "default",
        get: function get() {
          return default;
        }
      }, {
        key: "name",
        get: function get() {
          return name;
        }
      }, {
        key: "data_key",
        get: function get() {
          return data_key;
        }
      }, {
        key: "event",
        get: function get() {
          return event;
        }
      }, {
        key: "event_key",
        get: function get() {
          return event_key;
        }
      }, {
        key: "defaulttype",
        get: function get() {
          return defaulttype;
        }
      }]);

      return tooltip;
    }();
    /**
     * ------------------------------------------------------------------------
     * jquery
     * ------------------------------------------------------------------------
     */


    $$$1.fn[name] = tooltip._jqueryinterface;
    $$$1.fn[name].constructor = tooltip;

    $$$1.fn[name].noconflict = function () {
      $$$1.fn[name] = jquery_no_conflict;
      return tooltip._jqueryinterface;
    };

    return tooltip;
  }($, popper);

  /**
   * --------------------------------------------------------------------------
   * bootstrap (v4.1.3): popover.js
   * licensed under mit (https://github.com/twbs/bootstrap/blob/master/license)
   * --------------------------------------------------------------------------
   */

  var popover = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * constants
     * ------------------------------------------------------------------------
     */
    var name = 'popover';
    var version = '4.1.3';
    var data_key = 'bs.popover';
    var event_key = "." + data_key;
    var jquery_no_conflict = $$$1.fn[name];
    var class_prefix = 'bs-popover';
    var bscls_prefix_regex = new regexp("(^|\\s)" + class_prefix + "\\s+", 'g');

    var default = _objectspread({}, tooltip.default, {
      placement: 'right',
      trigger: 'click',
      content: '',
      template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
    });

    var defaulttype = _objectspread({}, tooltip.defaulttype, {
      content: '(string|element|function)'
    });

    var classname = {
      fade: 'fade',
      show: 'show'
    };
    var selector = {
      title: '.popover-header',
      content: '.popover-body'
    };
    var event = {
      hide: "hide" + event_key,
      hidden: "hidden" + event_key,
      show: "show" + event_key,
      shown: "shown" + event_key,
      inserted: "inserted" + event_key,
      click: "click" + event_key,
      focusin: "focusin" + event_key,
      focusout: "focusout" + event_key,
      mouseenter: "mouseenter" + event_key,
      mouseleave: "mouseleave" + event_key
      /**
       * ------------------------------------------------------------------------
       * class definition
       * ------------------------------------------------------------------------
       */

    };

    var popover =
    /*#__pure__*/
    function (_tooltip) {
      _inheritsloose(popover, _tooltip);

      function popover() {
        return _tooltip.apply(this, arguments) || this;
      }

      var _proto = popover.prototype;

      // overrides
      _proto.iswithcontent = function iswithcontent() {
        return this.gettitle() || this._getcontent();
      };

      _proto.addattachmentclass = function addattachmentclass(attachment) {
        $$$1(this.gettipelement()).addclass(class_prefix + "-" + attachment);
      };

      _proto.gettipelement = function gettipelement() {
        this.tip = this.tip || $$$1(this.config.template)[0];
        return this.tip;
      };

      _proto.setcontent = function setcontent() {
        var $tip = $$$1(this.gettipelement()); // we use append for html objects to maintain js events

        this.setelementcontent($tip.find(selector.title), this.gettitle());

        var content = this._getcontent();

        if (typeof content === 'function') {
          content = content.call(this.element);
        }

        this.setelementcontent($tip.find(selector.content), content);
        $tip.removeclass(classname.fade + " " + classname.show);
      }; // private


      _proto._getcontent = function _getcontent() {
        return this.element.getattribute('data-content') || this.config.content;
      };

      _proto._cleantipclass = function _cleantipclass() {
        var $tip = $$$1(this.gettipelement());
        var tabclass = $tip.attr('class').match(bscls_prefix_regex);

        if (tabclass !== null && tabclass.length > 0) {
          $tip.removeclass(tabclass.join(''));
        }
      }; // static


      popover._jqueryinterface = function _jqueryinterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(data_key);

          var _config = typeof config === 'object' ? config : null;

          if (!data && /destroy|hide/.test(config)) {
            return;
          }

          if (!data) {
            data = new popover(this, _config);
            $$$1(this).data(data_key, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new typeerror("no method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createclass(popover, null, [{
        key: "version",
        // getters
        get: function get() {
          return version;
        }
      }, {
        key: "default",
        get: function get() {
          return default;
        }
      }, {
        key: "name",
        get: function get() {
          return name;
        }
      }, {
        key: "data_key",
        get: function get() {
          return data_key;
        }
      }, {
        key: "event",
        get: function get() {
          return event;
        }
      }, {
        key: "event_key",
        get: function get() {
          return event_key;
        }
      }, {
        key: "defaulttype",
        get: function get() {
          return defaulttype;
        }
      }]);

      return popover;
    }(tooltip);
    /**
     * ------------------------------------------------------------------------
     * jquery
     * ------------------------------------------------------------------------
     */


    $$$1.fn[name] = popover._jqueryinterface;
    $$$1.fn[name].constructor = popover;

    $$$1.fn[name].noconflict = function () {
      $$$1.fn[name] = jquery_no_conflict;
      return popover._jqueryinterface;
    };

    return popover;
  }($);

  /**
   * --------------------------------------------------------------------------
   * bootstrap (v4.1.3): scrollspy.js
   * licensed under mit (https://github.com/twbs/bootstrap/blob/master/license)
   * --------------------------------------------------------------------------
   */

  var scrollspy = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * constants
     * ------------------------------------------------------------------------
     */
    var name = 'scrollspy';
    var version = '4.1.3';
    var data_key = 'bs.scrollspy';
    var event_key = "." + data_key;
    var data_api_key = '.data-api';
    var jquery_no_conflict = $$$1.fn[name];
    var default = {
      offset: 10,
      method: 'auto',
      target: ''
    };
    var defaulttype = {
      offset: 'number',
      method: 'string',
      target: '(string|element)'
    };
    var event = {
      activate: "activate" + event_key,
      scroll: "scroll" + event_key,
      load_data_api: "load" + event_key + data_api_key
    };
    var classname = {
      dropdown_item: 'dropdown-item',
      dropdown_menu: 'dropdown-menu',
      active: 'active'
    };
    var selector = {
      data_spy: '[data-spy="scroll"]',
      active: '.active',
      nav_list_group: '.nav, .list-group',
      nav_links: '.nav-link',
      nav_items: '.nav-item',
      list_items: '.list-group-item',
      dropdown: '.dropdown',
      dropdown_items: '.dropdown-item',
      dropdown_toggle: '.dropdown-toggle'
    };
    var offsetmethod = {
      offset: 'offset',
      position: 'position'
      /**
       * ------------------------------------------------------------------------
       * class definition
       * ------------------------------------------------------------------------
       */

    };

    var scrollspy =
    /*#__pure__*/
    function () {
      function scrollspy(element, config) {
        var _this = this;

        this._element = element;
        this._scrollelement = element.tagname === 'body' ? window : element;
        this._config = this._getconfig(config);
        this._selector = this._config.target + " " + selector.nav_links + "," + (this._config.target + " " + selector.list_items + ",") + (this._config.target + " " + selector.dropdown_items);
        this._offsets = [];
        this._targets = [];
        this._activetarget = null;
        this._scrollheight = 0;
        $$$1(this._scrollelement).on(event.scroll, function (event) {
          return _this._process(event);
        });
        this.refresh();

        this._process();
      } // getters


      var _proto = scrollspy.prototype;

      // public
      _proto.refresh = function refresh() {
        var _this2 = this;

        var automethod = this._scrollelement === this._scrollelement.window ? offsetmethod.offset : offsetmethod.position;
        var offsetmethod = this._config.method === 'auto' ? automethod : this._config.method;
        var offsetbase = offsetmethod === offsetmethod.position ? this._getscrolltop() : 0;
        this._offsets = [];
        this._targets = [];
        this._scrollheight = this._getscrollheight();
        var targets = [].slice.call(document.queryselectorall(this._selector));
        targets.map(function (element) {
          var target;
          var targetselector = util.getselectorfromelement(element);

          if (targetselector) {
            target = document.queryselector(targetselector);
          }

          if (target) {
            var targetbcr = target.getboundingclientrect();

            if (targetbcr.width || targetbcr.height) {
              // todo (fat): remove sketch reliance on jquery position/offset
              return [$$$1(target)[offsetmethod]().top + offsetbase, targetselector];
            }
          }

          return null;
        }).filter(function (item) {
          return item;
        }).sort(function (a, b) {
          return a[0] - b[0];
        }).foreach(function (item) {
          _this2._offsets.push(item[0]);

          _this2._targets.push(item[1]);
        });
      };

      _proto.dispose = function dispose() {
        $$$1.removedata(this._element, data_key);
        $$$1(this._scrollelement).off(event_key);
        this._element = null;
        this._scrollelement = null;
        this._config = null;
        this._selector = null;
        this._offsets = null;
        this._targets = null;
        this._activetarget = null;
        this._scrollheight = null;
      }; // private


      _proto._getconfig = function _getconfig(config) {
        config = _objectspread({}, default, typeof config === 'object' && config ? config : {});

        if (typeof config.target !== 'string') {
          var id = $$$1(config.target).attr('id');

          if (!id) {
            id = util.getuid(name);
            $$$1(config.target).attr('id', id);
          }

          config.target = "#" + id;
        }

        util.typecheckconfig(name, config, defaulttype);
        return config;
      };

      _proto._getscrolltop = function _getscrolltop() {
        return this._scrollelement === window ? this._scrollelement.pageyoffset : this._scrollelement.scrolltop;
      };

      _proto._getscrollheight = function _getscrollheight() {
        return this._scrollelement.scrollheight || math.max(document.body.scrollheight, document.documentelement.scrollheight);
      };

      _proto._getoffsetheight = function _getoffsetheight() {
        return this._scrollelement === window ? window.innerheight : this._scrollelement.getboundingclientrect().height;
      };

      _proto._process = function _process() {
        var scrolltop = this._getscrolltop() + this._config.offset;

        var scrollheight = this._getscrollheight();

        var maxscroll = this._config.offset + scrollheight - this._getoffsetheight();

        if (this._scrollheight !== scrollheight) {
          this.refresh();
        }

        if (scrolltop >= maxscroll) {
          var target = this._targets[this._targets.length - 1];

          if (this._activetarget !== target) {
            this._activate(target);
          }

          return;
        }

        if (this._activetarget && scrolltop < this._offsets[0] && this._offsets[0] > 0) {
          this._activetarget = null;

          this._clear();

          return;
        }

        var offsetlength = this._offsets.length;

        for (var i = offsetlength; i--;) {
          var isactivetarget = this._activetarget !== this._targets[i] && scrolltop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrolltop < this._offsets[i + 1]);

          if (isactivetarget) {
            this._activate(this._targets[i]);
          }
        }
      };

      _proto._activate = function _activate(target) {
        this._activetarget = target;

        this._clear();

        var queries = this._selector.split(','); // eslint-disable-next-line arrow-body-style


        queries = queries.map(function (selector) {
          return selector + "[data-target=\"" + target + "\"]," + (selector + "[href=\"" + target + "\"]");
        });
        var $link = $$$1([].slice.call(document.queryselectorall(queries.join(','))));

        if ($link.hasclass(classname.dropdown_item)) {
          $link.closest(selector.dropdown).find(selector.dropdown_toggle).addclass(classname.active);
          $link.addclass(classname.active);
        } else {
          // set triggered link as active
          $link.addclass(classname.active); // set triggered links parents as active
          // with both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor

          $link.parents(selector.nav_list_group).prev(selector.nav_links + ", " + selector.list_items).addclass(classname.active); // handle special case when .nav-link is inside .nav-item

          $link.parents(selector.nav_list_group).prev(selector.nav_items).children(selector.nav_links).addclass(classname.active);
        }

        $$$1(this._scrollelement).trigger(event.activate, {
          relatedtarget: target
        });
      };

      _proto._clear = function _clear() {
        var nodes = [].slice.call(document.queryselectorall(this._selector));
        $$$1(nodes).filter(selector.active).removeclass(classname.active);
      }; // static


      scrollspy._jqueryinterface = function _jqueryinterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(data_key);

          var _config = typeof config === 'object' && config;

          if (!data) {
            data = new scrollspy(this, _config);
            $$$1(this).data(data_key, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new typeerror("no method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createclass(scrollspy, null, [{
        key: "version",
        get: function get() {
          return version;
        }
      }, {
        key: "default",
        get: function get() {
          return default;
        }
      }]);

      return scrollspy;
    }();
    /**
     * ------------------------------------------------------------------------
     * data api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(window).on(event.load_data_api, function () {
      var scrollspys = [].slice.call(document.queryselectorall(selector.data_spy));
      var scrollspyslength = scrollspys.length;

      for (var i = scrollspyslength; i--;) {
        var $spy = $$$1(scrollspys[i]);

        scrollspy._jqueryinterface.call($spy, $spy.data());
      }
    });
    /**
     * ------------------------------------------------------------------------
     * jquery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[name] = scrollspy._jqueryinterface;
    $$$1.fn[name].constructor = scrollspy;

    $$$1.fn[name].noconflict = function () {
      $$$1.fn[name] = jquery_no_conflict;
      return scrollspy._jqueryinterface;
    };

    return scrollspy;
  }($);

  /**
   * --------------------------------------------------------------------------
   * bootstrap (v4.1.3): tab.js
   * licensed under mit (https://github.com/twbs/bootstrap/blob/master/license)
   * --------------------------------------------------------------------------
   */

  var tab = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * constants
     * ------------------------------------------------------------------------
     */
    var name = 'tab';
    var version = '4.1.3';
    var data_key = 'bs.tab';
    var event_key = "." + data_key;
    var data_api_key = '.data-api';
    var jquery_no_conflict = $$$1.fn[name];
    var event = {
      hide: "hide" + event_key,
      hidden: "hidden" + event_key,
      show: "show" + event_key,
      shown: "shown" + event_key,
      click_data_api: "click" + event_key + data_api_key
    };
    var classname = {
      dropdown_menu: 'dropdown-menu',
      active: 'active',
      disabled: 'disabled',
      fade: 'fade',
      show: 'show'
    };
    var selector = {
      dropdown: '.dropdown',
      nav_list_group: '.nav, .list-group',
      active: '.active',
      active_ul: '> li > .active',
      data_toggle: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
      dropdown_toggle: '.dropdown-toggle',
      dropdown_active_child: '> .dropdown-menu .active'
      /**
       * ------------------------------------------------------------------------
       * class definition
       * ------------------------------------------------------------------------
       */

    };

    var tab =
    /*#__pure__*/
    function () {
      function tab(element) {
        this._element = element;
      } // getters


      var _proto = tab.prototype;

      // public
      _proto.show = function show() {
        var _this = this;

        if (this._element.parentnode && this._element.parentnode.nodetype === node.element_node && $$$1(this._element).hasclass(classname.active) || $$$1(this._element).hasclass(classname.disabled)) {
          return;
        }

        var target;
        var previous;
        var listelement = $$$1(this._element).closest(selector.nav_list_group)[0];
        var selector = util.getselectorfromelement(this._element);

        if (listelement) {
          var itemselector = listelement.nodename === 'ul' ? selector.active_ul : selector.active;
          previous = $$$1.makearray($$$1(listelement).find(itemselector));
          previous = previous[previous.length - 1];
        }

        var hideevent = $$$1.event(event.hide, {
          relatedtarget: this._element
        });
        var showevent = $$$1.event(event.show, {
          relatedtarget: previous
        });

        if (previous) {
          $$$1(previous).trigger(hideevent);
        }

        $$$1(this._element).trigger(showevent);

        if (showevent.isdefaultprevented() || hideevent.isdefaultprevented()) {
          return;
        }

        if (selector) {
          target = document.queryselector(selector);
        }

        this._activate(this._element, listelement);

        var complete = function complete() {
          var hiddenevent = $$$1.event(event.hidden, {
            relatedtarget: _this._element
          });
          var shownevent = $$$1.event(event.shown, {
            relatedtarget: previous
          });
          $$$1(previous).trigger(hiddenevent);
          $$$1(_this._element).trigger(shownevent);
        };

        if (target) {
          this._activate(target, target.parentnode, complete);
        } else {
          complete();
        }
      };

      _proto.dispose = function dispose() {
        $$$1.removedata(this._element, data_key);
        this._element = null;
      }; // private


      _proto._activate = function _activate(element, container, callback) {
        var _this2 = this;

        var activeelements;

        if (container.nodename === 'ul') {
          activeelements = $$$1(container).find(selector.active_ul);
        } else {
          activeelements = $$$1(container).children(selector.active);
        }

        var active = activeelements[0];
        var istransitioning = callback && active && $$$1(active).hasclass(classname.fade);

        var complete = function complete() {
          return _this2._transitioncomplete(element, active, callback);
        };

        if (active && istransitioning) {
          var transitionduration = util.gettransitiondurationfromelement(active);
          $$$1(active).one(util.transition_end, complete).emulatetransitionend(transitionduration);
        } else {
          complete();
        }
      };

      _proto._transitioncomplete = function _transitioncomplete(element, active, callback) {
        if (active) {
          $$$1(active).removeclass(classname.show + " " + classname.active);
          var dropdownchild = $$$1(active.parentnode).find(selector.dropdown_active_child)[0];

          if (dropdownchild) {
            $$$1(dropdownchild).removeclass(classname.active);
          }

          if (active.getattribute('role') === 'tab') {
            active.setattribute('aria-selected', false);
          }
        }

        $$$1(element).addclass(classname.active);

        if (element.getattribute('role') === 'tab') {
          element.setattribute('aria-selected', true);
        }

        util.reflow(element);
        $$$1(element).addclass(classname.show);

        if (element.parentnode && $$$1(element.parentnode).hasclass(classname.dropdown_menu)) {
          var dropdownelement = $$$1(element).closest(selector.dropdown)[0];

          if (dropdownelement) {
            var dropdowntogglelist = [].slice.call(dropdownelement.queryselectorall(selector.dropdown_toggle));
            $$$1(dropdowntogglelist).addclass(classname.active);
          }

          element.setattribute('aria-expanded', true);
        }

        if (callback) {
          callback();
        }
      }; // static


      tab._jqueryinterface = function _jqueryinterface(config) {
        return this.each(function () {
          var $this = $$$1(this);
          var data = $this.data(data_key);

          if (!data) {
            data = new tab(this);
            $this.data(data_key, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new typeerror("no method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createclass(tab, null, [{
        key: "version",
        get: function get() {
          return version;
        }
      }]);

      return tab;
    }();
    /**
     * ------------------------------------------------------------------------
     * data api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(event.click_data_api, selector.data_toggle, function (event) {
      event.preventdefault();

      tab._jqueryinterface.call($$$1(this), 'show');
    });
    /**
     * ------------------------------------------------------------------------
     * jquery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[name] = tab._jqueryinterface;
    $$$1.fn[name].constructor = tab;

    $$$1.fn[name].noconflict = function () {
      $$$1.fn[name] = jquery_no_conflict;
      return tab._jqueryinterface;
    };

    return tab;
  }($);

  /**
   * --------------------------------------------------------------------------
   * bootstrap (v4.1.3): index.js
   * licensed under mit (https://github.com/twbs/bootstrap/blob/master/license)
   * --------------------------------------------------------------------------
   */

  (function ($$$1) {
    if (typeof $$$1 === 'undefined') {
      throw new typeerror('bootstrap\'s javascript requires jquery. jquery must be included before bootstrap\'s javascript.');
    }

    var version = $$$1.fn.jquery.split(' ')[0].split('.');
    var minmajor = 1;
    var ltmajor = 2;
    var minminor = 9;
    var minpatch = 1;
    var maxmajor = 4;

    if (version[0] < ltmajor && version[1] < minminor || version[0] === minmajor && version[1] === minminor && version[2] < minpatch || version[0] >= maxmajor) {
      throw new error('bootstrap\'s javascript requires at least jquery v1.9.1 but less than v4.0.0');
    }
  })($);

  exports.util = util;
  exports.alert = alert;
  exports.button = button;
  exports.carousel = carousel;
  exports.collapse = collapse;
  exports.dropdown = dropdown;
  exports.modal = modal;
  exports.popover = popover;
  exports.scrollspy = scrollspy;
  exports.tab = tab;
  exports.tooltip = tooltip;

  object.defineproperty(exports, '__esmodule', { value: true });

})));
//# sourcemappingurl=bootstrap.js.map
