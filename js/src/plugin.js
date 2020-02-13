import $ from 'jquery';

class Plugin {
    static instance() {}

    static init() {
        const JQUERY_NO_CONFLICT = $.fn[this.NAME];
        $.fn[this.NAME] = this.instance;
        $.fn[this.NAME].Constructor = this;
        $.fn[this.NAME].noConflict = () => {
            $.fn[this.NAME] = JQUERY_NO_CONFLICT;
            return this.instance;
        };
    }
}

export default Plugin;
