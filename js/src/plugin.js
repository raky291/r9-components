import $ from 'jquery';

function Plugin(NAME, DATA_KEY, CONSTRUCTOR) {
    const jQueryInterface = option => {
        return this.each(() => {
            let data = $(this).data(DATA_KEY);
            const options = typeof option === 'object' && option;

            if (!data) {
                data = new CONSTRUCTOR(this, options);
                $(this).data(DATA_KEY, data);
            }

            if (typeof option === 'string') {
                if (typeof data[option] === 'undefined') {
                    throw new TypeError(`No method named "${option}"`);
                }

                data[option]();
            }
        });
    };

    const JQUERY_NO_CONFLICT = $.fn[NAME];
    $.fn[NAME] = jQueryInterface;
    $.fn[NAME].Constructor = CONSTRUCTOR;
    $.fn[NAME].noConflict = () => {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return jQueryInterface;
    };
}

export default Plugin;
