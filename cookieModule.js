;
var cookieModule = ( function(){
    function _getDomain() {
        // return window.location.hostname.replace(/^(www\.)*([a-zA-Z0-9][-_a-zA-Z0-9.]+)+$/, '$2');
        // console.log(window.location.hostname.replace(/^(www\.)*([a-zA-Z0-9][-_a-zA-Z0-9.]+)+$/, '$1,$2').split(','));
        return window.location.hostname.replace(/^(www\.)*([a-zA-Z0-9][-_a-zA-Z0-9.]+)+$/, '$1,$2').split(',');
    }

    return {
        get: function( name ){
            if (_getDomain()[0]) {
                name = 'www' + name;
            }


            var matches = document.cookie.match( new RegExp( "(?:^|; )" + name.replace( /([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1' ) + "=([^;]*)" ) );
            return matches ? decodeURIComponent( matches[1] ) : undefined;
        },

        set: function( name, value ){

            /*
            if (!/pvd/i.test(name)) {
                console.log(1);
                return;
            }
            */

            var date = new Date(new Date().setFullYear(new Date().getFullYear() + 100)); // Current date + 100 years
            var expires = 'expires=' + date.toUTCString() + ';';
            var path = 'path=/;';
            // var domain = 'domain=' + window.location.hostname + ';';
            // var newCookie = name + '=' + value + '; ' + expires + ' ' + path + ' ' + domain;

            var domain;
            var newCookie;
            if (_getDomain()[0]) {
                domain = 'domain=' + _getDomain()[0] + _getDomain()[1] + ';';
                newCookie = 'www' + name + '=' + value + '; ' + expires + ' ' + path + ' ' + domain;
            }

            else {
                domain = 'domain=.' + _getDomain()[1] + ';';
                newCookie = name + '=' + value + '; ' + expires + ' ' + path + ' ' + domain;
            }

            console.log(domain);



            document.cookie = newCookie;
        },

        del: function( name ){

            var date = new Date(0),
                expires = 'expires=' + date.toUTCString() + ';';

            var path = 'path=/;';
            // var domain = 'domain=' + window.location.hostname + ';';
            // var domain = 'domain=.' + _getDomain() + ';';
            // document.cookie = name + '=;' + expires + ' ' + path + ' ' + domain;

            var domain;
            if (_getDomain()[0]) {
                domain = 'domain=' + _getDomain()[0] + _getDomain()[1] + ';';
                document.cookie = 'www' + name + '=;' + expires + ' ' + path + ' ' + domain;
            }

            else {
                domain = 'domain=.' + _getDomain()[1] + ';';
                document.cookie = name + '=;' + expires + ' ' + path + ' ' + domain;
            }

        }
    };
})();