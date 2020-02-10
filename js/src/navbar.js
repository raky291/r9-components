import $ from 'jquery';
import Plugin from './plugin';

const NAME = 'navbar';
const DATA_KEY = 'r9.navbar';
// const VERSION = '4.4.1';
// const EVENT_KEY = `.${DATA_KEY}`;
// const DATA_API_KEY = '.data-api';
// const JQUERY_NO_CONFLICT = $.fn[NAME];

const Default = {};

const Event = {
    LOAD_DATA_API: 'load'
};

const Selector = {
    DATA_SPY: '[data-spy="scroll"]'
};

class Navbar {
    constructor(element, options) {}

    static get Default() {
        return Default;
    }
}

Plugin(NAME, DATA_KEY, Navbar);

$(window).on(Event.LOAD_DATA_API, () => {
    $(Selector.DATA_SPY).each(() => {
        // var $this = $(this);
    });
});

export default Navbar;
