import $ from 'jquery';

const Default = {
    min: 200,
    show: true
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
        this.prev = $(window).scrollTop();

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

        if ((scroll <= this.options.min && this.options.show) || (scroll > this.options.min && scroll < this.prev)) {
            this.show();
        } else {
            this.hide();
        }

        this.prev = scroll;
    }
}

$(window).on(Event.LOAD, () => {
    $(Selector.DATA_TOGGLE).each((i, element) => {
        // eslint-disable-next-line no-new
        new Navbar(element);
    });
});
