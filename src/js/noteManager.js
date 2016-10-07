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
        this.maxId = 1;
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
            if (self.options.dbService === 'dbLocalStorageService') {
                self.dbService = new note.DbLocalStorageService(self.options.dbLocalStorageOptions);
            } else if (self.options.dbService === 'dbBackendService') {
                self.dbService = new note.DbBackendService(self.options.dbBackendOptions);
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
            this.createNote(this.options.plainNoteObject[0]);
            this.dbService.save(this.options.plainNoteObject[0]);
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
            var note = $(event.target).parents('.'+note.Note.NOTECLASS);
            console.log(note);
            $(note).remove();
            this.dbService.delete($(note).data('id'));
        },


        getMaxId: function () {
            return ++this.maxId;
        },


        toObject: function () {

        },


        initDrag: function () {
            // this is used later in the resizing and gesture demos
            var self = this;
            interact('.'+note.Note.NOTECLASS)
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
                        var textEl = event.target.querySelector('p');

                        textEl && (textEl.textContent =
                            'moved a distance of '
                            + (Math.sqrt(event.dx * event.dx +
                                event.dy * event.dy) | 0) + 'px');
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
            target.style.width = event.rect.width + 'px';
            target.style.height = event.rect.height + 'px';

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
                var elem = $(event.target).parents('.'+note.Note.NOTECLASS);
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
            theme: 'yellow'
        }],
        dbService: 'dbLocalStorageService', // to server store 'dbBackendService'
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
