/* eslint-disable func-names, new-cap */

import $ from 'jquery';

function jQueryPlugin(name, key, component) {
    const jQueryInterface = function (option) {
        return this.each(function () {
            let data = $(this).data(key);
            const options = typeof option === 'object' && option;

            if (!data) {
                data = new component(this, options);
                $(this).data(key, data);
            }

            if (typeof option === 'string') {
                if (typeof data[option] === 'undefined') {
                    throw new TypeError(`No method named "${option}"`);
                }

                data[option]();
            }
        });
    };

    const prev = $.fn[name];
    $.fn[name] = jQueryInterface;
    $.fn[name].Constructor = component;
    $.fn[name].noConflict = () => {
        $.fn[name] = prev;
        return jQueryInterface;
    };

    return jQueryInterface;
}

export default jQueryPlugin;
