import $ from 'jquery';

function jQueryPlugin(NAME, DATA_KEY, Constructor) {
    const interface = function(config) {
        return this.each(function() {
            let data = $(this).data(DATA_KEY);
            const _config = typeof config === 'object' && config;

            if (!data) {
                data = new Constructor(this, _config);
                $(this).data(DATA_KEY, data);
            }

            if (typeof config === 'string') {
                if (typeof data[config] === 'undefined') {
                    throw new TypeError(`No method named "${config}"`);
                }

                data[config]();
            }
        });
    };

    const JQUERY_NO_CONFLICT = $.fn[NAME];
    $.fn[NAME] = interface;
    $.fn[NAME].Constructor = Constructor;
    $.fn[NAME].noConflict = () => {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return interface;
    };
}

export { jQueryInterface, jQueryPlugin };
