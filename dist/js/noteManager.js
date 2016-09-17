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
