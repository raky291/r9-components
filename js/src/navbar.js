import $ from 'jquery';

const Default = {
    minScroll: 200
};

const Event = {
    SCROLL: 'scroll',
    LOAD: 'load'
};

const ClassName = {
    SHOW: 'show'
};

const Selector = {
    DATA_TOGGLE: '[data-toggle="navbar"]'
};

class Navbar {
    constructor(element, options) {
        this.element = element;
        this.options = $.extend({}, Default, options);
        this.prevScroll = $(window).scrollTop();

        $(window).on(Event.SCROLL, () => this.process());
    }

    show() {
        $(this.element).addClass(ClassName.SHOW);
    }

    hide() {
        $(this.element).removeClass(ClassName.SHOW);
    }

    process() {
        const scroll = $(window).scrollTop();

        if (scroll < this.prevScroll && scroll > this.options.minScroll) {
            this.show();
        } else {
            this.hide();
        }

        this.prevScroll = scroll;
    }
}

$(window).on(Event.LOAD, () => {
    $(Selector.DATA_TOGGLE).each(function() {
        const $this = $(this);
        Navbar($this);
    });
});
