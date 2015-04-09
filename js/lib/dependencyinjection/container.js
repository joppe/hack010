/*global zicht, _*/

(function (z) {
    'use strict';

    /**
     * @typedef {Container}
     * @property {Function} has
     * @property {Function} get
     * @property {Function} register
     */

    /**
     * @typedef {Service}
     * @property {Function} get
     */

    /**
     * @namespace zicht.dependencyinjection
     */
    var dependencyinjection = z.createNamespace('zicht.dependencyinjection'),
        Service;

    Service = (function () {
        /**
         * @param {Array} args
         * @param {Container} container
         * @returns {Array}
         */
        function inject(args, container) {
            return _.map(args, function (arg) {
                return container.has(arg) ? container.get(arg) : null;
            });
        }

        return {
            /**
             * @param {Function} func
             * @param {boolean} singleton
             * @param {Container} container
             * @returns {Service}
             */
            create: function (func, singleton, container) {
                var args = z.lang.Function.args(func);

                if (true === singleton) {
                    func = z.lang.Function.cache(func);
                }

                return {
                    get: function () {
                        return func.apply(func, inject(args, container));
                    }
                };
            }
        };
    }());

    dependencyinjection.Container = (function () {
        return {
            /**
             * @returns {Container}
             */
            create: function () {
                var services = {};

                return {
                    /**
                     * @param {string} name
                     * @returns {boolean}
                     */
                    has: function (name) {
                        return undefined !== services[name];
                    },

                    /**
                     * @param {string} name
                     */
                    get: function (name) {
                        if (this.has(name)) {
                            return services[name].get();
                        } else {
                            throw 'Service "' + name + '" not found';
                        }
                    },

                    /**
                     * @param {string} name
                     * @param {Function} func
                     * @param {boolean} singleton
                     * @returns {Container}
                     */
                    register: function (name, func, singleton) {
                        services[name] = Service.create(func, singleton, this);

                        return this;
                    }
                };
            }
        };
    }());
}(zicht));