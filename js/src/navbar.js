import $ from 'jquery';

class Navbar {
    constructor(element, options) {}
}

$(window).on('load', () => {
    $('[data-toggle="navbar"]').each(() => {
        var $this = $(this);
    });
});

export default Navbar;
