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
        this.data = {};
    };

    note.DbBackendService.prototype = Object.create(note.DbService.prototype);

    note.DbBackendService.prototype.constructor = note.DbBackendService;

    note.DbBackendService.prototype.save = function (data) {
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

