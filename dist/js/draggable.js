/**
 * Created by koco on 19.09.2016.
 */
/* ========================================================================
 * jQueryStickyNote: abstractDbController.js v1.0.0
 *
 * ========================================================================
 * Copyright 2016
 * Licensed under MIT (https://github.com/keshikashvili-gio/jQueryStickyNote/master/LICENSE)
 * ======================================================================== */

+function ($) {
    'use strict';

    var Draggable = function (element, container) {
        this.$element = $(element);
        this.$container = $(container) || $(document.body);
        this.selected = null;
        this.xPos = 0;
        this.yPos = 0;
        this.xElem = 0;
        this.yElem = 0;

        //console.log('init');
        this.init();
    };

    Draggable.prototype = {
        constructor: Draggable,

        init: function () {
            console.log('beforeInit');
            this.$element.trigger('beforeInit', this.$element);
            $(this.$element).off('mousedown').mousedown(this.startDrag.bind(this));
            $(this.$element).off('mousemove').mousemove(this.move.bind(this));
            $(document).off('mouseup').mouseup(this.stop.bind(this));
            this.$element.trigger('afterInit', this.$element);
            console.log('afterInit');
        },
        startDrag: function () {
            console.log('beforeStartDrag');
            this.$element.trigger('beforeStartDrag', this.$element);
            this.$element.css('z-index', '999999999');
            this.selected = $(this.$element);
            this.xElem = this.xPos - this.selected.offset().left;
            this.yElem = this.yPos - this.selected.offset().top;
            this.$element.trigger('afterStartDrag', this.$element);
            console.log('afterStartDrag');
        },
        move: function (e) {
            this.xPos = document.all ? window.event.clientX : e.pageX;
            this.yPos = document.all ? window.event.clientY : e.pageY;
            //console.log(this.selected);
            if (this.selected !== null) {
                console.log('beforeMove');
                this.$element.trigger('beforeMove', this.selected);
                if(this._checkContainerFrames() === false){
                    return;
                }
                this.$element[0].style.left = (this.xPos - this.xElem) + 'px';
                this.$element[0].style.top = (this.yPos - this.yElem) + 'px';
                this.$element.trigger('afterMove', this.selected);
                console.log('afterMove');
            }
        },
        stop: function () {
            console.log('beforeStop');
            this.$element.trigger('beforeStop', this.selected);
            this.$element.css('z-index', 'auto');
            this.selected = null;
            $(document).off('mouseup');
            $(this.$element).off('mousemove');
            this.init();
            this.$element.trigger('afterStop', this.$element);
            console.log('afterStop');
        },

        //privit methods
        _checkContainerFrames: function(){
            var containerFrameRight = this.$container.width() + this.$container.offset().left,
                containerFrameLeft = this.$container.offset().left,
                containerFrameTop = this.$container.offset().top,
                containerFrameBottom = this.$container.offset().top + this.$container.height();
            if(window.event.clientX >= containerFrameRight - 20){
                this.$element[0].style.left -= 30;
                return false;
            }
            if(window.event.clientX <= (containerFrameLeft + 20)){
                this.$element[0].style.left += 30;
                return false;
            }
            if(window.event.clientY >= (containerFrameBottom - 20)){
                this.$element[0].style.top -= 30;
                return false;
            }
            if(window.event.clientY <= (containerFrameTop + 20)){
                this.$element[0].style.top += 30;
                return false;
            }
        }

    };

    jQuery.fn.draggable = function ($container) {
        return new Draggable(this, $container);
    };

    jQuery.each($('[data-draggable]'), function (i, elem) {
        $(elem).draggable();
    });

}(jQuery);

