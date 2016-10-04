/* ========================================================================
 * jQueryStickyNote: note.js v1.0.0
 *
 * ========================================================================
 * Copyright 2016
 * Licensed under MIT (https://github.com/keshikashvili-gio/jQueryStickyNote/master/LICENSE)
 * ======================================================================== */

note = {};

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
            return  '<div id="note-' + id + '" class="jquery-sticky-note theme-' + theme + '" style="width:' + width + 'px;height:' + height + 'px;left:' + x + 'px;top:' + y + 'px;">' +
                    '<div class="sticky-note-header">' +
                    '<a href="javascript:" class="add-new-note">+</a>' +
                    '<a href="javascript:" class="remove-note">x</a>' +
                    '</div>' +
                    '<div class="sticky-note-body">' + text + '</div>' +
                    '</div>';
        }
    }


}(jQuery);

/* ========================================================================
 * jQueryStickyNote: abstractDbController.js v1.0.0
 *
 * ========================================================================
 * Copyright 2016
 * Licensed under MIT (https://github.com/keshikashvili-gio/jQueryStickyNote/master/LICENSE)
 * ======================================================================== */

+function ($) {
    'use strict';

    note.DbController = function (options) {

    };

    note.DbController.prototype = {
        constructor: note.DbController,

        save: function(data){},

        delete: function(){},

        deleteAll: function(){},

        update: function(){},

        updateAll: function(){},

        getData: function(){}

    }
}(jQuery);

/* ========================================================================
 * jQueryStickyNote: abstractDbController.js v1.0.0
 *
 * ========================================================================
 * Copyright 2016
 * Licensed under MIT (https://github.com/keshikashvili-gio/jQueryStickyNote/master/LICENSE)
 * ======================================================================== */

+function ($) {
    'use strict';

    note.DbLocalStorageController = function (options) {
        this.options = options;
    };


    note.DbLocalStorageController.prototype = Object.create(note.DbController.prototype);


    note.DbLocalStorageController.prototype.constructor = note.DbLocalStorageController;


    note.DbLocalStorageController.prototype.save = function (data) {
         this._saveToLocalStorage(data)
    };


    note.DbLocalStorageController.prototype.delete = function (id) {
         var data = this._getAllFromLocalStorage();
             for(var i = 0; i < data.length; i++){
                 if(data[i].id == id){
                     data.splice(data[i], 1);
                 }
             }
             this._saveToLocalStorage(data);
    };


    note.DbLocalStorageController.prototype.deleteAll = function () {

    };


    note.DbLocalStorageController.prototype.update = function () {

    };


    note.DbLocalStorageController.prototype.updateAll = function () {

    };


    note.DbLocalStorageController.prototype.getData = function () {
        return this._getAllFromLocalStorage();
    };


    note.DbLocalStorageController.prototype._addToLocalStorage = function (obj) {
        var data = this._getAllFromLocalStorage();
            data.push(obj);
            this._saveToLocalStorage(data);
    };


    note.DbLocalStorageController.prototype._getAllFromLocalStorage = function () {
        var storage = localStorage.getItem(this.options.localStorageKey);
        return storage ? JSON.parse(storage) : [];
    };


    note.DbLocalStorageController.prototype._saveToLocalStorage = function (data) {
        localStorage.setItem(this.options.localStorageKey, JSON.stringify(data));
    };


    note.DbLocalStorageController.prototype._getItemFromLocalStorage = function (key) {
        return this._getAllFromLocalStorage()[key];
    };


}(jQuery);


/* ========================================================================
 * jQueryStickyNote: abstractDbController.js v1.0.0
 *
 * ========================================================================
 * Copyright 2016
 * Licensed under MIT (https://github.com/keshikashvili-gio/jQueryStickyNote/master/LICENSE)
 * ======================================================================== */

+function ($) {
    'use strict';

    note.DbBackendController = function (options) {
        this.options = options;
        this.data = {};
    };

    note.DbBackendController.prototype = Object.create(note.DbController.prototype);

    note.DbBackendController.prototype.constructor = note.DbBackendController;

    note.DbBackendController.prototype.save = function (data) {
        var self = this;
         this._post(this.options.postUrl, data).done(function(res){
             if(res.success){
                 self.data = res.data;
             }else{
                 return res.errorMsg;
             }
         });

        return self.data;
    };

    note.DbBackendController.prototype.delete = function () {

    };

    note.DbBackendController.prototype.deleteAll = function () {

    };

    note.DbBackendController.prototype.update = function () {

    };

    note.DbBackendController.prototype.updateAll = function () {

    };

    note.DbBackendController.prototype.getData = function () {
        var self = this;
        this._get(this.options.loadUrl).done(function(data){
            self.data = data;
        });
        return self.data;
    };

    note.DbBackendController.prototype._get = function (url, data) {
        return $.ajax({
            url: url,
            type: 'GET',
            data: data
        });
    };

    note.DbBackendController.prototype._post = function (url, data) {
        return $.ajax({
            url: url,
            type: 'POST',
            data: data
        });
    };


}(jQuery);


/* ========================================================================
 * jQueryStickyNote v1.0.0
 *
 * ========================================================================
 * Copyright 2016
 * Licensed under MIT (https://github.com/keshikashvili-gio/jQueryStickyNote/master/LICENSE)
 * ======================================================================== */
//window.noteManager = {};

+function ($) {
    'use strict';

    note.NoteManager = function (element, options) {
        this.options = options;
        this.$element = $(element);
        this.notes = {};
        this.dbController = {};
        this.maxId = 1;
        this.init();
    };
    note.NoteManager.prototype = {
        constructor: note.NoteManager,

        init: function () {
            console.log('init');
            var self = this, savedData;

            self.options = $.extend({}, note.NoteManager.DEFAULTS, self.options);
            if (self.options.dbController === 'dbLocalStorageController') {
                self.dbController = new note.DbLocalStorageController(self.options.dbLocalStorageOptions);
            } else if (self.options.dbController === 'dbBackendController') {
                self.dbController = new note.DbBackendController(self.options.dbBackendOptions);
            }
            savedData = self.dbController.getData();
            if (savedData.length) {
                self.notes = savedData;
            } else {
                self.notes = self.options.plainNoteObject;
                self.dbController.save(self.notes[0]);
            }

            $.each(self.notes, function (i, item) {
                self.createNote(item);
            });

        },


        attachEvents: function ($element) {
            $element.find('.add-new-note').on('click', this.openNewNote.bind(this));
        },


        openNewNote: function () {
            this.createNote(this.options.plainNoteObject[0]);
            this.dbController.save(this.options.plainNoteObject[0]);
        },

        createNote: function (object) {
            var Note = new note.Note(this.$element, object);
            this.attachEvents(Note.$note);
            Note.run();
        },


        getMaxId: function () {
            return ++this.maxId;
        },


        toObject: function () {

        }
    };


    note.NoteManager.THEMES = [
        'blue',
        'green',
        'pink',
        'purple',
        'white',
        'yellow'
    ];

    note.NoteManager.DEFAULTS = {
        plainNoteObject: [{
            id: 1,
            width: 180,
            height: 166,
            x: 300,
            y: 100,
            text: "",
            theme: 'yellow'
        }],
        dbController: 'dbLocalStorageController', // to server store 'dbBackendController'
        dbLocalStorageOptions: {
            localStorageKey: '_jq_sticky_note'
        },
        dbBackendOptions: {
            loadUrl: '',
            saveUrl: '',
            updateUrl: '',
            deleteUrl: '',
            deleteAllUrl: ''
        }
    };

    jQuery.fn.jQueryStickyNote = function (options) {
        return new note.NoteManager(this, options);
    }


}(jQuery);
