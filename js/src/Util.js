import $ from 'jquery';

const Util = {
    getSelectorFromElement(element) {
        let selector = $(element).attr('data-target');

        if (!selector) {
            selector = $(element).attr('href');
        }

        return selector;
    },
};

export default Util;
