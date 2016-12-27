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
        this.title = data.title;

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
           this.$note = $(this.getHtml(this.id, this.theme, this.width, this.height, this.x, this.y, this.text, this.title));
           return this;
        },

        getNote: function(){
           return this.$note;
        },

        run: function(){
            this.$container.append(this.getNote());
        },

        getHtml: function (id, theme, width, height, x, y, text, title) {
            return  '<div id="note-' + id + '" data-id="'+id+'" data-x="'+x+'" data-y="'+y+'" class="'+note.Note.NOTECLASS+' theme-' + theme + '" style="width:' + width + 'px;height:' + height + 'px;-webkit-transform: translate('+x+'px, '+y+'px);transform: translate('+x+'px, '+y+'px);">' +
                    '<div class="sn-header">'
                    + note.NoteManager.DEFAULTS.noteOptions.buttons[0]+
                     '<span class="sn-title">'+title+'</span>'+
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
                title: html.find('.sn-title').val(),
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
