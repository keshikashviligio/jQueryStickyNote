/* ========================================================================
 * jQueryStickyNote: dbLocalStorageService.js v1.0.0
 *
 * ========================================================================
 * Copyright 2016
 * Licensed under MIT (https://github.com/keshikashvili-gio/jQueryStickyNote/master/LICENSE)
 * ======================================================================== */
window.note = window.note || {};
+function ($) {
    'use strict';

    note.DbLocalStorageService = function (options) {
        this.options = options;
    };

    note.DbLocalStorageService.prototype = Object.create(note.DbService.prototype);

    note.DbLocalStorageService.prototype.constructor = note.DbLocalStorageService;

    note.DbLocalStorageService.prototype.save = function (data) {
         data.id = parseInt(this._getMaxId() + 1);
         this._saveToLocalStorage(data);
    };

    note.DbLocalStorageService.prototype.delete = function () {

    };

    note.DbLocalStorageService.prototype.deleteAll = function () {

    };

    note.DbLocalStorageService.prototype.update = function () {

    };

    note.DbLocalStorageService.prototype.updateAll = function () {

    };

    note.DbLocalStorageService.prototype.getData = function () {
        return this._getAllFromLocalStorage();
    };

    note.DbLocalStorageService.prototype._saveToLocalStorage = function (obj) {
        var data = this._getAllFromLocalStorage();
            data.push(obj);
        localStorage.setItem(this.options.localStorageKey, JSON.stringify(data));
    };

    note.DbLocalStorageService.prototype._getAllFromLocalStorage = function () {
        var storage = localStorage.getItem(this.options.localStorageKey);
        return storage ? JSON.parse(storage) : [];
    };

    note.DbLocalStorageService.prototype._getItemFromLocalStorage = function (key) {
        return this._getAllFromLocalStorage()[key];
    };

    note.DbLocalStorageService.prototype._getMaxId = function(){
        var max = 0;
        $.each(this.getData(), function(index, item){
            if(item.id > max){
                max = item.id;
            }
        });
        return max;
    }


}(jQuery);

