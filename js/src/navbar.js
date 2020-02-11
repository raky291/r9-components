import $ from 'jquery';

function Navbar(element) {
    let prev = $(window).scrollTop();
    $(window).on('scroll', () => {
        const current = $(window).scrollTop();
        if (prev > current && current > 200) {
            // show
            $(element).addClass('show');
        } else {
            // hide
            $(element).removeClass('show');
        }
        prev = current;
    });
}

$(window).on('load', () => {
    $('[data-toggle="navbar"]').each(function() {
        const $this = $(this);
        Navbar($this);
    });
});
