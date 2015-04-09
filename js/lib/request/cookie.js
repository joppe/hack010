/*global zicht, window, _*/

(function (z, win) {
    'use strict';

    /**
     * @namespace zicht.request
     */
    var request = z.createNamespace('zicht.request'),
        encode,
        decode,
        createDatString,
        createKeyValue,
        defaultOptions = {
            expires: null,
            path: '/',
            domain: null
        };

    /**
     * @param {string} key
     * @returns {string}
     */
    encode = function (key) {
        return encodeURIComponent(key);
    };

    /**
     * @param {string} key
     * @returns {string}
     */
    decode = function (key) {
        return decodeURIComponent(key);
    };

    /**
     * @param {string} key
     * @param {*} value
     * @returns {string}
     */
    createKeyValue = function (key, value) {
        return key + '=' + value;
    };

    /**
     * @param {Number} days
     * @returns {string}
     */
    createDatString = function (days) {
        var date,
            str = '';

        if (null !== days) {
            date = new Date();
            date.setTime(date.getTime() + (parseInt(days, 10) * 24 * 60 * 60 * 1000));
            str = date.toUTCString();
        }

        return str;
    };

    request.Cookie = {
        /**
         * @param {string} name
         * @param {*} value
         * @param {Object} options
         */
        set: function (name, value, options) {
            var data = [],
                cookie;

            options = options || {};
            _.defaults(options, defaultOptions);

            data.push(createKeyValue(encode(name), encode(value)));
            data.push('expires', createDatString(options.expires));

            if (null !== options.domain) {
                data.push('domain', options.domain);
            }

            data.push('path', options.path);

            cookie = data.join('; ');

            win.document.cookie = cookie;
        },

        /**
         * @param {string} name
         * @returns {*}
         */
        get: function (name) {
            var value = null;

            name = encode(name);

            _.every(win.document.cookie.split(';'), function (row) {
                var ret = true;

                row = z.lang.String.trim(row);

                if (0 === row.indexOf(name + '=')) {
                    ret = false;
                    value = decode(row.substring(name.length + 1, row.length));
                }

                return ret;
            });

            return value;
        },

        /**
         * @param {string} name
         */
        remove: function (name) {
            this.set(name, '', {
                days: -1
            });
        }
    };
}(zicht, window));