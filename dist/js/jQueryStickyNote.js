/* ========================================================================
 * jQueryStickyNote: note.js v1.0.0
 *
 * ========================================================================
 * Copyright 2016
 * Licensed under MIT (https://github.com/keshikashvili-gio/jQueryStickyNote/master/LICENSE)
 * ======================================================================== */

window.note = {};

+function ($) {
    'use strict';

    note.Note = function (container, data) {
        console.log(data);
        this.$container = $(container);
        this.id = data.id;
        this.width = data.width;
        this.height = data.height;
        this.x = data.x;
        this.y = data.y;
        this.theme = data.theme;
        this.text = data.text;

        this.$note = null;

        this.init();
    };
    note.Note.NOTECLASS = 'sn-box';

    note.Note.prototype = {
        constructor: note.Note,

        init: function () {
            this.createNote();
        },

        createNote: function () {
           this.$note = $(this.getHtml(this.id, this.theme, this.width, this.height, this.x, this.y, this.text));
           return this;
        },

        getNote: function(){
           return this.$note;
        },

        run: function(){
            this.$container.append(this.getNote());
        },

        getHtml: function (id, theme, width, height, x, y, text) {
            return  '<div id="note-' + id + '" data-id="'+id+'" data-x="'+x+'" data-y="'+y+'" class="'+note.Note.NOTECLASS+' theme-' + theme + '" style="width:' + width + 'px;height:' + height + 'px;-webkit-transform: translate('+x+'px, '+y+'px);transform: translate('+x+'px, '+y+'px);">' +
                    '<div class="sn-header">' + note.NoteManager.DEFAULTS.noteOptions.buttons[0]+
              note.NoteManager.DEFAULTS.noteOptions.buttons[1] +
                    '</div>' +
                    '<div class="sn-body"><textarea class="sn-editor">' + text + '</textarea></div>' +
                    '</div>';
        },
        
        htmlToObject: function (html) {
            html = $(html);
            var theme = this.getHTmlClass(html[0].className, "theme-\\w+");
                theme = theme.substr(theme.indexOf('-')+1);
            return {
                id: html.data('id'),
                width: html.width(),
                height: html.height(),
                x: html.attr('data-x'),
                y: html.attr('data-y'),
                text: html.find('.sn-editor').val(),
                title: "title",
                theme: theme
            }
        },
        getHTmlClass : function(str, klass) {
            var r = new RegExp("(?:^| )(" + klass + ")(?: |$)")
                , m = (""+str).match(r);
            return (m) ? m[1] : null;
        }
    }


}(jQuery);

/* ========================================================================
 * jQueryStickyNote: abstractDbService.js v1.0.0
 *
 * ========================================================================
 * Copyright 2016
 * Licensed under MIT (https://github.com/keshikashviligio/jQueryStickyNote/master/LICENSE)
 * ======================================================================== */
window.note = window.note || {};
+function ($) {
    'use strict';

    note.DbService = function (options) {

    };

    note.DbService.prototype = {
        constructor: note.DbService,

        /**
         *
         * @param data
         */
        save: function(data){console.error('SAVE method must be implemented in your DbService class')},

        /**
         *
         * @param item
         */
        delete: function(item){console.error('DELETE method must be implemented in your DbService class')},

        /**
         *
         * @param items
         */
        deleteAll: function(items){console.error('DELETEALL method must be implemented in your DbService class')},

        /**
         *
         * @param item
         */
        update: function(item){console.error('UPDATE method must be implemented in your DbService class')},

        /**
         *
         * @param items
         */
        updateAll: function(items){console.error('UPDATEALL method must be implemented in your DbService class')},

        /**
         *
         */
        getData: function(){console.error('GETDATA method must be implemented in your DbService class')},


        lastInsertId: function(){console.error('lastInsertId method must be implemented in your DbService class')}
    }
}(jQuery);

/* ========================================================================
 * jQueryStickyNote: dbLocalStorageService.js v1.0.0
 *
 * ========================================================================
 * Copyright 2016
 * Licensed under MIT (https://github.com/keshikashviligio/jQueryStickyNote/master/LICENSE)
 * ======================================================================== */
window.note = window.note || {};
+function ($) {
    'use strict';

    note.DbLocalStorageService = function (options) {
        this.options = options;
    };

    note.DbLocalStorageService.prototype = Object.create(note.DbService.prototype);

    note.DbLocalStorageService.prototype.constructor = note.DbLocalStorageService;

    /**
     * add new note to localStorage
     * @param newData
     */
    note.DbLocalStorageService.prototype.save = function (newData) {
        var data = this._getAllFromLocalStorage();
        newData.id = parseInt(this._getMaxId() + 1);
         data.push(newData);
         this._saveToLocalStorage(data);
    };

    /**
     * delete note from localStorage
     * @param id
     */
    note.DbLocalStorageService.prototype.delete = function (id) {
        var data = this._getAllFromLocalStorage();
        for (var i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                data.splice(i, 1);
                // console.log('if');
            }
        }
        // console.log(data);
        // console.log(id);
        this._saveToLocalStorage(data);
    };

    note.DbLocalStorageService.prototype.deleteAll = function () {

    };

    /**
     * @type object
     * @param updatedData
     */
    note.DbLocalStorageService.prototype.update = function (updatedData) {
        var data = this._getAllFromLocalStorage();
        for (var i = 0; i < data.length; i++) {
            if (data[i].id == updatedData.id) {
                data[i] = updatedData;
            }
        }
        console.log(updatedData);
        this._saveToLocalStorage(data);
    };

    note.DbLocalStorageService.prototype.updateAll = function () {

    };

    /**
     *
     * @returns {Array|Object}
     */
    note.DbLocalStorageService.prototype.getData = function () {
        return this._getAllFromLocalStorage();
    };

    /**
     *
     */
    note.DbLocalStorageService.prototype.lastInsertId = function () {
        return this._getMaxId();
    };

    /**
     *
     * @returns {Array|object}
     * @private
     */
    note.DbLocalStorageService.prototype._getAllFromLocalStorage = function () {
        var storage = localStorage.getItem(this.options.localStorageKey);
        return storage ? JSON.parse(storage) : [];
    };

    /**
     *
     * @param data
     * @private
     */
    note.DbLocalStorageService.prototype._saveToLocalStorage = function (data) {
        localStorage.setItem(this.options.localStorageKey, JSON.stringify(data));
    };

    /**
     *
     * @param key
     * @returns {*}
     * @private
     */
    note.DbLocalStorageService.prototype._getItemFromLocalStorage = function (key) {
        return this._getAllFromLocalStorage()[key];
    };

    note.DbLocalStorageService.prototype._getMaxId = function(){
        var max = 0;
        $.each(this.getData(), function(index, item){
            if(item.id > max){
                max = item.id;
            }
        });
        return max;
    }


}(jQuery);



/* ========================================================================
 * jQueryStickyNote: dbBackendService.js v1.0.0
 *
 * ========================================================================
 * Copyright 2016
 * Licensed under MIT (https://github.com/keshikashvili-gio/jQueryStickyNote/master/LICENSE)
 * ======================================================================== */
window.note = window.note || {};
+function ($) {
    'use strict';

    note.DbBackendService = function (options) {
        this.options = options;
        console.log(options);
        this.data = {};
    };

    note.DbBackendService.prototype = Object.create(note.DbService.prototype);

    note.DbBackendService.prototype.constructor = note.DbBackendService;

    note.DbBackendService.prototype.save = function (data) {
        var self = this;
         this._post(this.options.saveUrl, data).done(function(res){
             if(res.success){
                 self.data = res.data;
             }else{
                 return res.errorMsg;
             }
         });

        return self.data;
    };

    note.DbBackendService.prototype.delete = function () {

    };

    note.DbBackendService.prototype.deleteAll = function () {

    };

    note.DbBackendService.prototype.update = function () {

    };

    note.DbBackendService.prototype.updateAll = function () {

    };

    note.DbBackendService.prototype.getData = function () {
        var self = this;
        this._get(this.options.loadUrl).done(function(data){
            self.data = data;
        });
        return self.data;
    };

    note.DbBackendService.prototype.lastInsertId = function () {

        return this._getMaxId();
    };

    note.DbBackendService.prototype._get = function (url, data) {
        return $.ajax({
            url: url,
            type: 'GET',
            data: data
        });
    };

    note.DbBackendService.prototype._post = function (url, data) {
        return $.ajax({
            url: url,
            type: 'POST',
            data: data
        });
    };


}(jQuery);


/**
 * Created by koco on 10/5/2016.
 */
window.note = window.note || {};
+(function () {

    "use strict";


    note.ContextMenu = function (menuItems, options) {

        this.menuItems      = menuItems;
        this.option         = $.extend({}, note.ContextMenu.OPTIONS, options);
        $('body').append(this.getMenuHtml(this.menuItems));

        this.contextMenuClassName = "context-menu";
        this.contextMenuItemClassName = "context-menu__item";
        this.contextMenuLinkClassName = "context-menu__link";
        this.contextMenuActive = "context-menu--active";

        this.taskItemClassName = "sn-box";
        this.taskItemInContext = "";

        this.clickCoords = 0;
        this.clickCoordsX = 0;
        this.clickCoordsY = 0;



        this.menu = document.querySelector("#context-menu");
        this.menuItems = this.menu.querySelectorAll(".context-menu__item");
        this.menuState = 0;
        this.menuWidth = 0;
        this.menuHeight = 0;
        this.menuPosition = 0;
        this.menuPositionX = 0;
        this.menuPositionY = 0;

        this.windowWidth = 0;
        this.windowHeight = 0;

        this.init();
    };

    note.ContextMenu.OPTIONS = {
        itemClickCallback: function () {},
        menuOwnerActiveClass: 'context-menu-open'
    };


    note.ContextMenu.prototype = {
        constructor: note.ContextMenu,

        //////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////
        //
        // C O R E    F U N C T I O N S
        //
        //////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////

        /**
         * Initialise our application's code.
         */
        init: function () {
            this.contextListener();
            this.clickListener();
            this.keyupListener();
            this.resizeListener();
        },

        /* Listens for contextmenu events.
         */
        contextListener: function () {
            var self = this;

            document.addEventListener("contextmenu", function (e) {
                self.taskItemInContext = self.clickInsideElement(e, self.taskItemClassName);

                if (self.taskItemInContext) {
                    e.preventDefault();
                    self.toggleMenuOn();
                    self.positionMenu(e);
                    $(self.taskItemInContext).addClass(self.option.menuOwnerActiveClass);
                    console.log('open');
                } else {
                    self.taskItemInContext = null;
                    self.toggleMenuOff();
                    console.log('close');
                }
            });
        },
        /**
         * Listens for click events.
         */
        clickListener: function () {
            var self = this;
            document.addEventListener("click", function (e) {
                var clickElIsLink = self.clickInsideElement(e, self.contextMenuLinkClassName);
                //console.log(clickElIsLink);
                if (clickElIsLink) {
                    e.preventDefault();
                    //console.log('click');
                    self.menuItemListener(e, clickElIsLink);
                } else {
                    var button = e.which || e.button;
                    if (button === 1) {
                        self.toggleMenuOff();
                    }
                }
            });
        },

        /**
         * Listens for keyup events.
         */
        keyupListener: function () {
            var self = this;
            window.onkeyup = function (e) {
                if (e.keyCode === 27) {
                    self.toggleMenuOff();
                }
            }
        },

        /**
         * Window resize event listener
         */
        resizeListener: function () {
            var self = this;
            window.onresize = function (e) {
                self.toggleMenuOff();
            };
        },

        /**
         * Turns the custom context menu on.
         */
        toggleMenuOn: function () {
            if (this.menuState !== 1) {
                this.menuState = 1;
                this.menu.classList.add(this.contextMenuActive);
            }
        },

        /**
         * Turns the custom context menu off.
         */
        toggleMenuOff: function () {
            if (this.menuState !== 0) {
                this.menuState = 0;
                this.menu.classList.remove(this.contextMenuActive);
                $('.'+this.option.menuOwnerActiveClass).removeClass(this.option.menuOwnerActiveClass);
            }
        },

        /**
         * Positions the menu properly.
         *
         * @param {Object} e The event
         */
        positionMenu: function (e) {
            this.clickCoords = this.getPosition(e);
            this.clickCoordsX =  this.clickCoords.x;
            this.clickCoordsY =  this.clickCoords.y;

            this.menuWidth = this.menu.offsetWidth + 4;
            this.menuHeight = this.menu.offsetHeight + 4;

            this.windowWidth = window.innerWidth;
            this.windowHeight = window.innerHeight;

            if ((this.windowWidth - this.clickCoordsX) < this.menuWidth) {
                this.menu.style.left = this.windowWidth - this.menuWidth + "px";
            } else {
                this.menu.style.left = this.clickCoordsX + "px";
            }

            if ((this.windowHeight - this.clickCoordsY) < this.menuHeight) {
                this.menu.style.top = this.windowHeight - this.menuHeight + "px";
            } else {
                this.menu.style.top = this.clickCoordsY + "px";
            }
        },

        /**
         * Dummy action function that logs an action when a menu item link is clicked
         *
         * @param e
         * @param {HTMLElement} link The link that was clicked
         */
        menuItemListener: function (e, link) {
            if(typeof this.option.itemClickCallback == 'function'){
                var menuOwner = $('.'+this.option.menuOwnerActiveClass);
                this.option.itemClickCallback.call(null, e, link, menuOwner);
            }
            this.toggleMenuOff();
        },

        //////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////
        //
        // H E L P E R    F U N C T I O N S
        //
        //////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////

        /**
         * Function to check if we clicked inside an element with a particular class
         * name.
         *
         * @param {Object} e The event
         * @param {String} className The class name to check against
         * @return {Boolean}
         */
        clickInsideElement: function (e, className) {
            var el = e.srcElement || e.target;

            if (el.classList.contains(className)) {
                return el;
            } else {
                while (el = el.parentNode) {
                    if (el.classList && el.classList.contains(className)) {
                        return el;
                    }
                }
            }
            //console.log(e, className);

            return false;
        }
        ,

        /**
         * Get's exact position of event.
         *
         * @param {Object} e The event passed in
         * @return {Object} Returns the x and y position
         */
        getPosition: function (e) {
            var posx = 0;
            var posy = 0;

            if (!e) e = window.event;

            if (e.pageX || e.pageY) {
                posx = e.pageX;
                posy = e.pageY;
            } else if (e.clientX || e.clientY) {
                posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }

            return {
                x: posx,
                y: posy
            }
        },


        getMenuHtml: function (menuItems) {
          var html = '<nav id="context-menu" class="context-menu"><ul class="context-menu__items">';
              for(var i = 0; i < menuItems.length; i++){
                  html += '<li class="context-menu__item">'+
                            '<a href="#" class="context-menu__link" data-key="'+menuItems[i].name+'" data-value="'+menuItems[i].value+'"><span style="background-color:'+menuItems[i].value+'"></span>'+menuItems[i].name+'</a>'+
                          '</li>';
              }
              return html +='</ul></nav>';
        }

    };

})();
/* ========================================================================
 * jQueryStickyNote v1.0.0
 *
 * ========================================================================
 * Copyright 2016
 * Licensed under MIT (https://github.com/keshikashvili-gio/jQueryStickyNote/master/LICENSE)
 * ======================================================================== */
window.note = window.note || {};
+function ($) {
  'use strict';

  note.NoteManager = function (element, options) {
    this.options = options;
    this.$element = $(element);
    this.notes = {};
    this.dbService = {};
    this.eventDelaytimer = 0;
    this.eventDelaytimerMs = 300;
    this.init();
  };
  note.NoteManager.prototype = {
    constructor: note.NoteManager,

    init: function () {
      console.log('init');
      var self = this, savedData;

      self.options = $.extend({}, note.NoteManager.DEFAULTS, self.options);
      if (self.options.dbService === 'localStorageService') {
        self.dbService = new note.DbLocalStorageService(self.options.dbServices.localStorageService.localStorageServiceOptions);
      } else if (self.options.dbService === 'backendService') {
        self.dbService = new note.DbBackendService(self.options.dbServices.backendService.backendServiceOptions);
      }
      savedData = self.dbService.getData();
      if (savedData.length) {
        self.notes = savedData;
      } else {
        self.notes = self.options.plainNoteObject;
        self.dbService.save(self.notes[0]);
      }

      $.each(self.notes, function (i, item) {
        self.createNote(item);
      });

      var menu = new note.ContextMenu(note.NoteManager.THEMES, {
        itemClickCallback: self.themeChangeClickListener.bind(this)
      });

      // this.$element.on('sn-afterMove', function (element, data) {
      //     console.log('on-sn-afterMove');
      //     console.log(element, data);
      // })
      // this.$element.on('sn-afterResize', function (element, data) {
      //     console.log('on-sn-afterResize');
      //     console.log(element, data);
      // })

    },


    bindEvents: function ($element) {
      $element.find('.sn-btn-add-new')
        .on('click', this.openNewNote.bind(this));
      $element.find('.sn-btn-remove')
        .on('click', this.removeNote.bind(this));
      $element.find('.sn-editor')
        .on('click, mousedown', function (e) {
          e.stopPropagation();
        })
        .on('keyup', this.textEditListener.bind(this))
    },


    openNewNote: function () {
      this.dbService.save(this.options.plainNoteObject[0]);
      this.options.plainNoteObject[0].id = this.dbService.lastInsertId();
      this.createNote(this.options.plainNoteObject[0]);
    },


    createNote: function (object) {
      var Note = new note.Note(this.$element, object);
      this.bindEvents(Note.$note);
      this.initDrag(Note.$note, this.$element);
      Note.run();
    },


    updateNote: function (updatedData) {
      this.dbService.update(updatedData);
    },

    removeNote: function (event) {
      var conf = confirm('are you sure to remove this note?');
      if (conf) {
        var noteNode = $(event.target).parents('.' + note.Note.NOTECLASS);
        $(noteNode).remove();
        this.dbService.delete($(noteNode).data('id'));
      }
    },


    toObject: function () {

    },


    initDrag: function () {
      // this is used later in the resizing and gesture demos
      var self = this;
      interact('.' + note.Note.NOTECLASS)
        .draggable({
          onmove: self.dragMoveListener.bind(this),
          // enable inertial throwing
          inertia: true,
          // keep the element within the area of it's parent
          restrict: {
            restriction: "parent",
            endOnly: true,
            elementRect: {top: 0, left: 0, bottom: 1, right: 1}
          },
          // enable autoScroll
          autoScroll: true,
          // call this function on every dragend event
          onend: function (event) {
            event.target.style.zIndex = '';
          }
        })
        .resizable({
          //preserveAspectRatio: true,
          edges: {left: true, right: true, bottom: true, top: true}
        })
        .on('resizemove', self.resizeListener.bind(this));
    },
    dragMoveListener: function (event) {

      var self = this;
      var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

      console.log('sn-beforeMove');
      target.style.zIndex = '10000';
      self.$element.trigger('sn-beforeMove', target, event);
      // translate the element
      target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

      // update the posiion attributes
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);

      //save updated data
      this.setEventDelay(function () {
        console.log('sn-afterMove');
        var data = note.Note.prototype.htmlToObject(target);
        self.$element.trigger('sn-afterMove', target, data);
        self.updateNote(data);
      }, this.eventDelaytimerMs);

    },
    resizeListener: function (event) {
      var self = this;
      var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0),
        y = (parseFloat(target.getAttribute('data-y')) || 0);

      console.log('sn-beforeResize');
      self.$element.trigger('sn-beforeResize', target, event);
      // update the element's style
      var w = event.rect.width, h = event.rect.height;
      if (w > self.options.noteOptions.maxWidth) {
        w = self.options.noteOptions.maxWidth;
      }
      if (w < self.options.noteOptions.minWidth) {
        w = self.options.noteOptions.minWidth;
      }
      if (h > self.options.noteOptions.maxHeight) {
        h = self.options.noteOptions.maxHeight;
      }
      if (h < self.options.noteOptions.minHeight) {
        h = self.options.noteOptions.minHeight;
      }
      console.log(w, h, self.options.noteOptions.minHeight);
      target.style.width = w + 'px';
      target.style.height = h + 'px';

      // translate when resizing from top or left edges
      x += event.deltaRect.left;
      y += event.deltaRect.top;


      target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px,' + y + 'px)';

      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
      this.setEventDelay(function () {
        console.log('sn-afterResize');
        var data = note.Note.prototype.htmlToObject(target);
        self.$element.trigger('sn-afterResize', target, data);
        self.updateNote(data);
      }, this.eventDelaytimerMs);

    },


    themeChangeClickListener: function () {
      var event = arguments[0], link = arguments[1], $note = arguments[2];

      var currentTheme = note.Note.prototype.getHTmlClass($note[0].className, "theme-\\w+");
      $note.removeClass(currentTheme).addClass('theme-' + $(link).data('key'));
      this.dbService.update(note.Note.prototype.htmlToObject($note));
    },

    textEditListener: function (e) {
      var event = e, self = this;
      this.setEventDelay(function () {
        console.log('beforeTextChange');
        var elem = $(event.target).parents('.' + note.Note.NOTECLASS);
        var noteObj = note.Note.prototype.htmlToObject(elem);

        self.$element.trigger('beforeTextChange', noteObj, elem);
        self.dbService.update(noteObj);
        self.$element.trigger('afterTextChanged', noteObj, elem);
        console.log('afterTextChanged');
      }, 500);
    },


    setEventDelay: function (callback, ms) {
      clearTimeout(this.eventDelaytimer);
      this.eventDelaytimer = setTimeout(callback, ms);
    }
  };


  note.NoteManager.THEMES = [
    {name: 'blue', value: '#BFE0F5'},
    {name: 'green', value: '#C2F4BD'},
    {name: 'pink', value: '#F0BFF0'},
    {name: 'purple', value: '#D1C8FE'},
    {name: 'white', value: '#F4F4F4'},
    {name: 'yellow', value: '#FDFBB6'}
  ];


  note.NoteManager.DEFAULTS = {
    plainNoteObject: [{
      id: 1,
      width: 180,
      height: 166,
      x: 300,
      y: 100,
      text: "",
      title: "",
      theme: 'yellow'
    }],
    noteOptions: {
      maxWidth: 200,
      maxHeight: 200,
      minWidth: 30,
      minHeight: 30,
      buttons: ['<a href="javascript:" class="sn-btn-add-new">+</a>', '<a href="javascript:" class="sn-btn-remove">x</a>']
    },
    dbServices: {
      localStorageService: {
        localStorageServiceOptions: {
          localStorageKey: '_jq_sticky_note'
        }
      },
      backendService: {
        backendServiceOptions: {
          loadUrl: '',
          saveUrl: '',
          updateUrl: '',
          deleteUrl: '',
          deleteAllUrl: ''
        }
      }
    },
    dbService: 'localStorageService'
  };


  jQuery.fn.jQueryStickyNote = function (options) {
    return new note.NoteManager(this, options);
  }


}(jQuery);
