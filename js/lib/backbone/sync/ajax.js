/*global zicht, _*/

(function ($, z) {
    'use strict';

    /**
     * @naemspace {zicht.backbone.sync}
     */
    var sync = z.createNamespace('zicht.backbone.sync');

    /**
     * @param {string} csrf
     * @param {Function} [onerror]
     * @returns {Function}
     */
    sync.Ajax = function (csrf, onerror) {
        return function (method, model, options) {
            var success = options.success || function () {},
                error = options.error || function () {},
                url = model.url(),
                data = {
                    csrf: csrf,
                    data: _.isFunction(model.prepare) ? model.prepare() : model.attributes
                };

            if (csrf && method === 'read') {
                url += '?csrf=' + csrf;
            }

            $.ajax({
                url: url,
                type: method === 'read' ? 'GET' : 'POST',
                data: method === 'read' ? '' : data,
                success: function (response) {
                    if (response.error) {
                        if (_.isFunction(onerror)) {
                            onerror(response.error);
                        }

                        error(response);
                    } else {
                        success(response.data ? response.data : response);
                    }
                },
                error: function (response) {
                    if (_.isFunction(onerror)) {
                        onerror(response.error);
                    }

                    error(response);
                }
            });
        };
    };
}(jQuery, zicht));