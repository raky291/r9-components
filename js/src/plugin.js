import $ from 'jquery';

class Plugin {
    constructor(name, key, component) {
        this.name = name;
        this.key = key;
        this.component = component;
    }

    instance(option) {
        // eslint-disable-next-line func-names
        return this.each(function() {
            let data = $(this).data(this.key);
            const options = typeof option === 'object' && option;

            if (!data) {
                // eslint-disable-next-line new-cap
                data = new this.component(this, options);
                $(this).data(this.key, data);
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
        $.fn[this.name].Constructor = this.component;
        $.fn[this.name].noConflict = () => {
            $.fn[this.name] = JQUERY_NO_CONFLICT;
            return this.instance;
        };
    }
}

export default Plugin;
