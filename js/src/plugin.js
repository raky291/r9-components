import $ from 'jquery';

class Plugin {
    constructor(name, dataKey) {
        this.name = name;
        this.dataKey = dataKey;
    }

    instance(option) {
        // eslint-disable-next-line func-names
        return this.each(function() {
            let data = $(this).data(this.dataKey);
            const options = typeof option === 'object' && option;

            if (!data) {
                data = new ScrollSpy(this, options);
                $(this).data(this.dataKey, data);
            }

            if (typeof option === 'string') {
                if (typeof data[option] === 'undefined') {
                    throw new TypeError(`No method named "${option}"`);
                }

                data[option]();
            }
        });
    }

    init() {
        const JQUERY_NO_CONFLICT = $.fn[this.name];
        $.fn[this.name] = this.instance;
        $.fn[this.name].Constructor = this;
        $.fn[this.name].noConflict = () => {
            $.fn[this.name] = JQUERY_NO_CONFLICT;
            return this.instance;
        };
    }
}

export default Plugin;
