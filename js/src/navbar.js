import $ from 'jquery';
import plugin from './plugin';

const NAME = 'navbar';
const DATA_KEY = `r9.${NAME}`;
const EVENT_KEY = `.${DATA_KEY}`;
const DATA_API_KEY = '.data-api';

const Default = {
    min: 200,
    show: false
};

const Event = {
    SCROLL: `scroll${EVENT_KEY}`,
    LOAD_DATA_API: `load${EVENT_KEY}${DATA_API_KEY}`
};

const ClassName = {
    SHOW: 'show'
};

const Selector = {
    DATA_SPY: '[data-spy="navbar"]'
};

class Navbar {
    constructor(element, options) {
        this.element = element;
        this.options = $.extend({}, Default, options);
        this.prev = $(window).scrollTop();

        $(window).on(Event.SCROLL, () => this.process());
    }

    static get Default() {
        return Default;
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
        if (scroll <= this.options.min) {
            if (this.options.show) {
                return true;
            }
        } else if (scroll < this.prev) {
            return true;
        }

        return false;
    }

    dispose() {
        $(window).off(EVENT_KEY);
        $(this.element).removeData(DATA_KEY);

        this.element = null;
        this.options = null;
        this.prev = null;
    }
}

const instance = plugin(NAME, DATA_KEY, Navbar);

$(window).on(Event.LOAD_DATA_API, () => {
    // eslint-disable-next-line func-names
    $(Selector.DATA_SPY).each(function() {
        const $this = $(this);
        instance.call($this, $this.data());
    });
});
