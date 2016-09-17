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

