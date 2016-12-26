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
