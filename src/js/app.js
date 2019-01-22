//= ../../node_modules/jquery/dist/jquery.min.js
//= ajaxEmailSender.js
//= fetchAddress.js
//= jquery.validate.min.js
//= ../../node_modules/foundation-sites/dist/js/foundation.min.js
//= ../../node_modules/foundation-sites/dist/js/plugins/foundation.core.min.js
//= ../../node_modules/foundation-sites/dist/js/plugins/foundation.smoothScroll.min.js


$(document).ready(function() {

    $(document).foundation();

    $('.hamburger').on('click', function() {
      $('.hamburger__element').toggleClass('hamburger__element--active');
      $('.main-navigation').toggleClass('main-navigation--show');
    });

    $('.main-navigation__link').on('click', function() {
      $('.hamburger__element').toggleClass('hamburger__element--active');
      $('.main-navigation').toggleClass('main-navigation--show');
    });

    


    // form validation and submit
    var contactForm = $("#contactForm");

    contactForm.validate({
        rules: {
            name: {
                required: true
            },
            email: {
                email: true
            },
            message: {
                required: true
            }
        },
        messages: {
            name: "Please specify your name",
            textarea: "Enter you message",
            email: {
                required: "We need your email address to contact you",
                email: "Your email address must be in the format of name@domain.com"
            }
        },
        submitHandler: function(form) {
            $(form).trigger("formvalid");
        }
    });

    contactForm.on("submit", function(e) {
        e.preventDefault;
    });

    contactForm.ajaxEmailSender({
        domain: "sentivenlimited.com",
        autorizationToken: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzZW50aXZlbmxpbWl0ZWQuY29tIiwiaWF0IjoxNTQ2OTYxODE3NTkxLCJleHAiOjE1Nzg0OTc4MTc1OTEsImF1ZCI6InNlbnRpdmVubGltaXRlZC5jb20iLCJzdWIiOiJzZW50aXZlbmxpbWl0ZWQuY29tIn0.Jjt5n0zz0nCfG5N3l90-6mOnq9eDdUYt73MUvlIAPi8",
        event: "formvalid",
        supportEmail: "support@sentivenlimited.com"
    });
});

var getAddress = ({
    site: "emyela.net",
    corp_id: "550",
    country_code: "UK",
    addressContainer: $('#addressContainer')
});
