import $ from 'jquery';

function plugin(name, key, component) {
    // eslint-disable-next-line func-names
    const instance = function (option) {
        // eslint-disable-next-line func-names
        return this.each(function () {
            let data = $(this).data(key);
            const options = typeof option === 'object' && option;

            if (!data) {
                // eslint-disable-next-line new-cap
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
    $.fn[name] = instance;
    $.fn[name].Constructor = component;
    $.fn[name].noConflict = () => {
        $.fn[name] = prev;
        return instance;
    };

    return instance;
}

export default plugin;
