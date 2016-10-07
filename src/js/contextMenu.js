/**
 * Created by koco on 10/5/2016.
 */
window.note = window.note || {};
+(function () {

    "use strict";


    note.ContextMenu = function (menuItems, options) {

        this.menuItems      = menuItems;
        this.option         = $.extend({}, note.ContextMenu.OPTIONS, options);
        $('body').append(this.getMenuHtml(this.menuItems));

        this.contextMenuClassName = "context-menu";
        this.contextMenuItemClassName = "context-menu__item";
        this.contextMenuLinkClassName = "context-menu__link";
        this.contextMenuActive = "context-menu--active";

        this.taskItemClassName = "jquery-sticky-note";
        this.taskItemInContext = "";

        this.clickCoords = 0;
        this.clickCoordsX = 0;
        this.clickCoordsY = 0;



        this.menu = document.querySelector("#context-menu");
        this.menuItems = this.menu.querySelectorAll(".context-menu__item");
        this.menuState = 0;
        this.menuWidth = 0;
        this.menuHeight = 0;
        this.menuPosition = 0;
        this.menuPositionX = 0;
        this.menuPositionY = 0;

        this.windowWidth = 0;
        this.windowHeight = 0;

        this.init();
    };

    note.ContextMenu.OPTIONS = {
        itemClickCallback: function () {},
        menuOwnerActiveClass: 'context-menu-open'
    };


    note.ContextMenu.prototype = {
        constructor: note.ContextMenu,

        //////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////
        //
        // C O R E    F U N C T I O N S
        //
        //////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////

        /**
         * Initialise our application's code.
         */
        init: function () {
            this.contextListener();
            this.clickListener();
            this.keyupListener();
            this.resizeListener();
        },

        /* Listens for contextmenu events.
         */
        contextListener: function () {
            var self = this;

            document.addEventListener("contextmenu", function (e) {
                self.taskItemInContext = self.clickInsideElement(e, self.taskItemClassName);

                if (self.taskItemInContext) {
                    e.preventDefault();
                    self.toggleMenuOn();
                    self.positionMenu(e);
                    $(self.taskItemInContext).addClass(self.option.menuOwnerActiveClass);
                    console.log('open');
                } else {
                    self.taskItemInContext = null;
                    self.toggleMenuOff();
                    console.log('close');
                }
            });
        },
        /**
         * Listens for click events.
         */
        clickListener: function () {
            var self = this;
            document.addEventListener("click", function (e) {
                var clickElIsLink = self.clickInsideElement(e, self.contextMenuLinkClassName);
                //console.log(clickElIsLink);
                if (clickElIsLink) {
                    e.preventDefault();
                    //console.log('click');
                    self.menuItemListener(e, clickElIsLink);
                } else {
                    var button = e.which || e.button;
                    if (button === 1) {
                        self.toggleMenuOff();
                    }
                }
            });
        },

        /**
         * Listens for keyup events.
         */
        keyupListener: function () {
            var self = this;
            window.onkeyup = function (e) {
                if (e.keyCode === 27) {
                    self.toggleMenuOff();
                }
            }
        },

        /**
         * Window resize event listener
         */
        resizeListener: function () {
            var self = this;
            window.onresize = function (e) {
                self.toggleMenuOff();
            };
        },

        /**
         * Turns the custom context menu on.
         */
        toggleMenuOn: function () {
            if (this.menuState !== 1) {
                this.menuState = 1;
                this.menu.classList.add(this.contextMenuActive);
            }
        },

        /**
         * Turns the custom context menu off.
         */
        toggleMenuOff: function () {
            if (this.menuState !== 0) {
                this.menuState = 0;
                this.menu.classList.remove(this.contextMenuActive);
                $('.'+this.option.menuOwnerActiveClass).removeClass(this.option.menuOwnerActiveClass);
            }
        },

        /**
         * Positions the menu properly.
         *
         * @param {Object} e The event
         */
        positionMenu: function (e) {
            this.clickCoords = this.getPosition(e);
            this.clickCoordsX =  this.clickCoords.x;
            this.clickCoordsY =  this.clickCoords.y;

            this.menuWidth = this.menu.offsetWidth + 4;
            this.menuHeight = this.menu.offsetHeight + 4;

            this.windowWidth = window.innerWidth;
            this.windowHeight = window.innerHeight;

            if ((this.windowWidth - this.clickCoordsX) < this.menuWidth) {
                this.menu.style.left = this.windowWidth - this.menuWidth + "px";
            } else {
                this.menu.style.left = this.clickCoordsX + "px";
            }

            if ((this.windowHeight - this.clickCoordsY) < this.menuHeight) {
                this.menu.style.top = this.windowHeight - this.menuHeight + "px";
            } else {
                this.menu.style.top = this.clickCoordsY + "px";
            }
        },

        /**
         * Dummy action function that logs an action when a menu item link is clicked
         *
         * @param e
         * @param {HTMLElement} link The link that was clicked
         */
        menuItemListener: function (e, link) {
            if(typeof this.option.itemClickCallback == 'function'){
                var menuOwner = $('.'+this.option.menuOwnerActiveClass);
                this.option.itemClickCallback.call(null, e, link, menuOwner);
            }
            this.toggleMenuOff();
        },

        //////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////
        //
        // H E L P E R    F U N C T I O N S
        //
        //////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////

        /**
         * Function to check if we clicked inside an element with a particular class
         * name.
         *
         * @param {Object} e The event
         * @param {String} className The class name to check against
         * @return {Boolean}
         */
        clickInsideElement: function (e, className) {
            var el = e.srcElement || e.target;

            if (el.classList.contains(className)) {
                return el;
            } else {
                while (el = el.parentNode) {
                    if (el.classList && el.classList.contains(className)) {
                        return el;
                    }
                }
            }
            //console.log(e, className);

            return false;
        }
        ,

        /**
         * Get's exact position of event.
         *
         * @param {Object} e The event passed in
         * @return {Object} Returns the x and y position
         */
        getPosition: function (e) {
            var posx = 0;
            var posy = 0;

            if (!e) e = window.event;

            if (e.pageX || e.pageY) {
                posx = e.pageX;
                posy = e.pageY;
            } else if (e.clientX || e.clientY) {
                posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }

            return {
                x: posx,
                y: posy
            }
        },


        getMenuHtml: function (menuItems) {
          var html = '<nav id="context-menu" class="context-menu"><ul class="context-menu__items">';
              for(var i = 0; i < menuItems.length; i++){
                  html += '<li class="context-menu__item">'+
                            '<a href="#" class="context-menu__link" data-key="'+menuItems[i].name+'" data-value="'+menuItems[i].value+'"><span style="background-color:'+menuItems[i].value+'"></span>'+menuItems[i].name+'</a>'+
                          '</li>';
              }
              return html +='</ul></nav>';
        }

    };

})();