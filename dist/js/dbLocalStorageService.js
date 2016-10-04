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

    /**
     * add new note to localStorage
     * @param newData
     */
    note.DbLocalStorageService.prototype.save = function (newData) {
        var data = this._getAllFromLocalStorage();
        newData.id = parseInt(this._getMaxId() + 1);
         data.push(newData);
         this._saveToLocalStorage(data);
    };

    /**
     * delete note from localStorage
     * @param id
     */
    note.DbLocalStorageController.prototype.delete = function (id) {
        var data = this._getAllFromLocalStorage();
        for (var i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                data.splice(data[i], 1);
            }
        }
        this._saveToLocalStorage(data);
    };

    note.DbLocalStorageService.prototype.deleteAll = function () {

    };

    /**
     *
     * @param updatedData
     */
    note.DbLocalStorageController.prototype.update = function (updatedData) {
        var data = this._getAllFromLocalStorage();
        for (var i = 0; i < data.length; i++) {
            if (data[i].id == updatedData.id) {
                data[i] = updatedData;
            }
        }
        this._saveToLocalStorage(data);
    };

    note.DbLocalStorageService.prototype.updateAll = function () {

    };

    /**
     *
     * @returns {Array|Object}
     */
    note.DbLocalStorageController.prototype.getData = function () {
        return this._getAllFromLocalStorage();
    };

    /**
     *
     * @returns {Array|object}
     * @private
     */
    note.DbLocalStorageController.prototype._getAllFromLocalStorage = function () {
        var storage = localStorage.getItem(this.options.localStorageKey);
        return storage ? JSON.parse(storage) : [];
    };

    /**
     *
     * @param data
     * @private
     */
    note.DbLocalStorageController.prototype._saveToLocalStorage = function (data) {
        localStorage.setItem(this.options.localStorageKey, JSON.stringify(data));
    };

    /**
     *
     * @param key
     * @returns {*}
     * @private
     */
    note.DbLocalStorageController.prototype._getItemFromLocalStorage = function (key) {
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


