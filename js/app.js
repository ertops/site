$(document).ready(function() {
    $('#content').load('home.html');

    $('a#contact-link').click(function() {
        $('#content').load('contact.html');
        $('#head-contact').addClass('active');
        $('#head-home').removeClass('active');

    });

    $('a#home-link').click(function() {
        $('#content').load('home.html');
        $('#head-home').addClass('active');
        $('#head-contact').removeClass('active');
    });
});
