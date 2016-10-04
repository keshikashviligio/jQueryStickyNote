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


    note.DbLocalStorageController.prototype = Object.create(note.DbController.prototype);


    note.DbLocalStorageController.prototype.constructor = note.DbLocalStorageController;


    note.DbLocalStorageController.prototype.save = function (data) {
         this._saveToLocalStorage(data)
    };


    note.DbLocalStorageController.prototype.delete = function (id) {
         var data = this._getAllFromLocalStorage();
             for(var i = 0; i < data.length; i++){
                 if(data[i].id == id){
                     data.splice(data[i], 1);
                 }
             }
             this._saveToLocalStorage(data);
    };


    note.DbLocalStorageController.prototype.deleteAll = function () {

    };


    note.DbLocalStorageController.prototype.update = function () {

    };


    note.DbLocalStorageController.prototype.updateAll = function () {

    };


    note.DbLocalStorageController.prototype.getData = function () {
        return this._getAllFromLocalStorage();
    };


    note.DbLocalStorageController.prototype._addToLocalStorage = function (obj) {
        var data = this._getAllFromLocalStorage();
            data.push(obj);
            this._saveToLocalStorage(data);
    };


    note.DbLocalStorageController.prototype._getAllFromLocalStorage = function () {
        var storage = localStorage.getItem(this.options.localStorageKey);
        return storage ? JSON.parse(storage) : [];
    };


    note.DbLocalStorageController.prototype._saveToLocalStorage = function (data) {
        localStorage.setItem(this.options.localStorageKey, JSON.stringify(data));
    };


    note.DbLocalStorageController.prototype._getItemFromLocalStorage = function (key) {
        return this._getAllFromLocalStorage()[key];
    };


}(jQuery);

