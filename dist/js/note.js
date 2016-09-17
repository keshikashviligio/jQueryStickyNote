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
