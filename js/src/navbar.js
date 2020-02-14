import $ from 'jquery';
import Plugin from './plugin';

const NAME = 'navbar';
const DATA_KEY = `r9.${NAME}`;
const EVENT_KEY = `.${DATA_KEY}`;
const DATA_API_KEY = '.data-api';

const Default = {
    min: 200,
    show: true
};

const Event = {
    SCROLL: `scroll${EVENT_KEY}`,
    LOAD_DATA_API: `load${EVENT_KEY}${DATA_API_KEY}`
};

const ClassName = {
    SHOW: 'show'
};

const Selector = {
    DATA_TOGGLE: '[data-spy="navbar"]'
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

        if (this.visibility(scroll)) {
            this.show();
        } else {
            this.hide();
        }

        this.prev = scroll;
    }

    visibility(scroll) {
        return (scroll <= this.options.min && this.options.show) || (scroll > this.options.min && scroll < this.prev);
    }
}

const plugin = new Plugin(NAME, DATA_KEY, Navbar);

plugin.init();

$(window).on(Event.LOAD_DATA_API, () => {
    $(Selector.DATA_TOGGLE).each(function() {
        plugin.instance.call($(this), $(this).data());
    });
});
