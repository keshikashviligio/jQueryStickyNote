/* ========================================================================
 * jQueryStickyNote: note.js v1.0.0
 *
 * ========================================================================
 * Copyright 2016
 * Licensed under MIT (https://github.com/keshikashvili-gio/jQueryStickyNote/master/LICENSE)
 * ======================================================================== */

var Note = Note || {};

+function ($) {
    'use strict';

    Note = function (container) {
        this.id          = this.uniqueId();
        this.$container  = $(container);
        this.width       = 250;
        this.height      = 200;
        this.x           = 500;
        this.y           = 500;
        this.theme       = null;
        this.text        = null;

        this.init();
    };


    Note.COLORS = {
        blue: "#BFE0F5",
        green: "#C2F4BD",
        pink: "#F0BFF0",
        purple: "#D1C8FE",
        white: "#F4F4F4",
        yellow: "#FDFBB6"
    };


    Note.prototype.init = function () {
        this.theme = Note.COLORS.yellow;
        this.createNote();
    };


    Note.prototype.createNote = function () {
         this.$container.append(this.getTemplate(this.theme, this.width, this.height, this.id, this.text));

    };


    Note.prototype.uniqueId = function(){
        return this.id ? this.id + 1 : 1;
    };


    Note.prototype.getTemplate = function(theme, width, height, id, text){
        return '<div id="note-'+id+'" class="jquery-sticky-note theme-'+theme+'" style="width:'+width+';height:'+height+'">' +
                    '<div class="sticky-note-header">' +
                        '<a href="javascript:" class="add-new-note">+</a>' +
                        '<a href="javascript:" class="remove-note">x</a>' +
                    '</div>' +
                    '<div class="sticky-note-body">'+text+'</div>' +
               '</div>';
    };

}(jQuery);

/* ========================================================================
 * jQueryStickyNote v1.0.0
 *
 * ========================================================================
 * Copyright 2016
 * Licensed under MIT (https://github.com/keshikashvili-gio/jQueryStickyNote/master/LICENSE)
 * ======================================================================== */


+function ($) {
    'use strict';

    var NoteManager = function(element, options){
        this.$element         = $(element);
        this.notes = {};
        this.init();
    };

    NoteManager.DEFAULTS = {

    };

    NoteManager.prototype.init = function(){
        for(var i = 0; i < 10; i++){
            this.notes[i] = new Note(this.$element);
        }

    };

    NoteManager.prototype.toObject = function(){

    };

    jQuery.fn.jqueryStickyNote = function(options){
        //console.log(this);
        return new NoteManager(this, options);
    }

}(jQuery);
