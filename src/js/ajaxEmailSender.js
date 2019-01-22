/* 
Small jquery plugin that sends form via ajax to specified url
settings: 
action - url where to send form
domain - site's domain name needed by server to identefy from which site email was send by default it gets it from window.location.host
messageContainer - DOM element in which response from server should be inserted
errorColor - error message text's color by default it's red
successColor - success message text's color by default it's green
submitBtn - submit button
event - event on which plugin sends data
autorizationToken - generated token for server that MUST be send
supportEmail - site's support email(email to which form should be send)
 */

(function( $ ) {

    $.fn.ajaxEmailSender = function(options) {
        var settings = $.extend({
            // These are the defaults.
            action: "https://w59660nu6h.execute-api.us-west-2.amazonaws.com/prod/corpEmailSender",
            domain: window.location.hostname,
            errorText: "Error! The email has not been sent. Please try later.",
            messageContainer: $("#formMessage"),
            errorColor: "red",
            succesColor: "#7471FE",
            submitBtn: $(this).find("[type='submit']"),
            event: "submit",
            autorizationToken: "",
            supportEmail: ""
        }, options );

        this.on(settings.event, function (event){
            var form = this,
                formData = $(this).serializeArray(),
                formDataJson = {};

            settings.submitBtn.prop('disabled', true);
            jQuery.each(formData, function() {
                formDataJson[this.name] = this.value || "";
            });
            formDataJson.domainName = settings.domain;
            formDataJson.supportEmail = settings.supportEmail;
            event.preventDefault();

            $.ajax({
                url: settings.action,
                dataType: "json",
                data: JSON.stringify(formDataJson),
                crossDomain: true,
                cache: false,
                type: 'post',
                beforeSend: function(request) {
                    request.setRequestHeader('AuthorizationToken', settings.autorizationToken);
                }
            })
                .done(function(data) {
                    // console.log(data);
                    var response = JSON.parse(data);
                    if(response){
                        settings.submitBtn.prop('disabled', false);
                        $(settings.messageContainer).text(response.message);
                        $(settings.messageContainer).attr('data-csp', 'main-success-message');
                        $(settings.messageContainer).css("color", settings.succesColor);
                        document.getElementById($(form).attr('id')).reset();
                    }
                })
                .fail(function(xhr){
                    settings.submitBtn.prop('disabled', false);
                    $(settings.messageContainer).text(settings.errorText);
                    $(settings.messageContainer).attr('data-csp', 'main-error-message');
                    $(settings.messageContainer).css("color", settings.errorColor);
                });
        });

        return false;
    };

}( jQuery ));


