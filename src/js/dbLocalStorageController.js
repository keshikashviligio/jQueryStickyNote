/* ========================================================================
 * jQueryStickyNote: abstractDbController.js v1.0.0
 *
 * ========================================================================
 * Copyright 2016
 * Licensed under MIT (https://github.com/keshikashvili-gio/jQueryStickyNote/master/LICENSE)
 * ======================================================================== */

+function ($) {
    'use strict';

    note.DbLocalStorageController = function (options) {
        this.options = options;
    };

    /**
     * extend Base D
     * @type {note.DbService}
     */
    note.DbLocalStorageController.prototype = Object.create(note.DbController.prototype);


    note.DbLocalStorageController.prototype.constructor = note.DbLocalStorageController;

    /**
     * add new note to localStorage
     * @param newData
     */
    note.DbLocalStorageController.prototype.save = function (newData) {
        var data = this._getAllFromLocalStorage();
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


    note.DbLocalStorageController.prototype.deleteAll = function () {

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


    note.DbLocalStorageController.prototype.updateAll = function () {

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


}(jQuery);

