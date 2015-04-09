/*global _, zicht*/

(function (z) {
    'use strict';

    /**
     * @namespace zicht.request
     */
    z.createNamespace('zicht.request');

    /**
     * @typedef {Object} Status
     * @property {Number} loaded
     * @property {Number} error
     * @property {Number} total
     */

    /**
     * @typedef {Object} Listeners
     * @property {Function} load
     * @property {Function} progress
     * @property {Function} error
     * @property {Function} finish
     */

    var /** @type {Listeners} */
        defaultListeners = {
            load: function () {},
            progress: function () {},
            error: function () {},
            finish: function () {}
        };

    z.request.Loader = {
        /**
         * Create a loader
         *
         * @param {Listeners} [listeners]
         * @returns {{add: add, load: load}}
         */
        create: function (listeners) {
            var onProgress,
                onSuccess,
                onError,
                loaders = [],
                /** @type {Status} */
                status = {
                    loaded: 0,
                    error: 0,
                    total: 0
                };

            listeners = listeners || {};
            _.defaults(listeners, defaultListeners);

            onProgress = function () {
                listeners.progress(status);

                if (status.error + status.loaded === status.total) {
                    loaders = [];
                    listeners.finish(status);
                }
            };

            onSuccess = function () {
                status.loaded += 1;
                listeners.load(status);
                onProgress(status, listeners);
            };

            onError = function () {
                status.error += 1;
                listeners.error(status);
                onProgress(status, listeners);
            };

            return {
                /**
                 * @param {Function} loader
                 * @param {Function} [success]
                 * @param {Function} [error]
                 */
                add: function (loader, success, error) {
                    status.total += 1;

                    success = success || function () {};
                    error = error || function () {};

                    loaders.push({
                        loader: loader,
                        success: function () {
                            onSuccess();
                            success.apply(null, arguments);
                        },
                        error: function () {
                            onError();
                            error.apply(null, arguments);
                        }
                    });
                },

                /**
                 * Start loading the resources
                 */
                load: function () {
                    onProgress(status, listeners);

                    _.each(loaders, function (loader) {
                        loader.loader(loader.success, loader.error);
                    });
                }
            };
        }
    };
}(zicht));