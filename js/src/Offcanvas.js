/* eslint-disable func-names, no-underscore-dangle */

import $ from 'jquery';
import Util from './Util';
import jQueryPlugin from './jQueryPlugin';

// -----------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------

const NAME = 'offcanvas';
const DATA_KEY = `r9.${NAME}`;
const EVENT_KEY = `.${DATA_KEY}`;
const DATA_API_KEY = '.data-api';

const ESCAPE_KEYCODE = 27;

const Default = {
    keyboard: true,
    focus: true,
    show: true,
};

const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY}`;
const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY}`;
const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;

const CLASS_NAME_SHOW = 'show';

const SELECTOR_DATA_TOGGLE = '[data-toggle="offcanvas"]';
const SELECTOR_DATA_DISMISS = '[data-dismiss="offcanvas"]';

// -----------------------------------------------------------------------
// Class Definition
// -----------------------------------------------------------------------

class Offcanvas {
    constructor(element, config) {
        this._element = element;
        this._config = { ...Default, ...config };
        this._isShown = false;

        if (this._config.show) {
            this.show();
        }
    }

    // Getters

    static get Default() {
        return Default;
    }

    // Public

    toggle() {
        if (this._isShown) {
            this.hide();
        } else {
            this.show();
        }
    }

    show() {
        if (this._isShown) {
            return;
        }

        this._isShown = true;

        $(this._element).on(EVENT_KEYDOWN_DISMISS, (event) => {
            if (this._config.keyboard && event.which === ESCAPE_KEYCODE) {
                this.hide(event);
            }
        });

        $(this._element).on(EVENT_CLICK_DISMISS, SELECTOR_DATA_DISMISS, (event) => this.hide(event));

        $(this._element).addClass(CLASS_NAME_SHOW);

        if (this._config.focus) {
            this._element.focus();
        }
    }

    hide(event) {
        if (event) {
            event.preventDefault();
        }

        if (!this._isShown) {
            return;
        }

        this._isShown = false;

        $(this._element).off(EVENT_KEYDOWN_DISMISS);

        $(this._element).off(EVENT_CLICK_DISMISS);

        $(this._element).removeClass(CLASS_NAME_SHOW);
    }
}

// -----------------------------------------------------------------------
// jQuery
// -----------------------------------------------------------------------

const jQueryInterface = jQueryPlugin(NAME, DATA_KEY, Offcanvas);

// -----------------------------------------------------------------------
// Data Api Implementation
// -----------------------------------------------------------------------

$(document).on(EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
    if (this.tagName === 'A') {
        event.preventDefault();
    }

    const target = Util.getSelectorFromElement(this);
    const config = $(target).data(DATA_KEY) ? 'toggle' : { ...$(target).data(), ...$(this).data() };

    jQueryInterface.call($(target), config);
});
