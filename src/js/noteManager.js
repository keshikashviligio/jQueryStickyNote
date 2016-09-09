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
