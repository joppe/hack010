/*global window, Backbone, zicht, _*/

(function (win, z) {
    'use strict';

    /**
     * @namespace {zicht.backbone.model}
     */
    var model = z.createNamespace('zicht.backbone.model');

    /**
     * @constructor zicht.backbone.model.Abstract
     * @extends Backbone.Model
     * @abstract
     *
     * http://stackoverflow.com/questions/6535948/nested-models-in-backbone-js-how-to-approach
     */
    model.Abstract = Backbone.Model.extend({
        classPath: 'zicht.backbone.model.Abstract',

        model: {},

        /**
         * @param {Object} [attributes]
         * @param {Object} [options]
         */
        initialize: function (attributes, options) {
            if (options && options.urlRoot) {
                this.urlRoot = options.urlRoot;
            }

            if (options && options.connection) {
                this.connection = options.connection;
            }
        },

        /**
         * @returns {Object}
         */
        prepare: function () {
            return _.reduce(this.model, function (attributes, type, name) {
                var value = this.get(name);

                if (value && _.isFunction(value.prepare)) {
                    attributes[name] = value.prepare();
                } else {
                    attributes[name] = value;
                }

                return attributes;
            }, {}, this);
        },

        /**
         * @param {Object} response
         * @returns {Object}
         */
        parse: function (response) {
            var attributes = {};

            _.each(this.model, function (type, identifier) {
                var data = response[identifier],
                    model,
                    ClassName;

                if ('variant' === type || 'string' === type) {
                    attributes[identifier] = data;
                } else if ('float' === type) {
                    data = parseFloat(data);
                    attributes[identifier] = isNaN(data) ? 0 : data;
                } else if ('int' === type) {
                    data = parseInt(data, 10);
                    attributes[identifier] = isNaN(data) ? 0 : data;
                } else {
                    model = this.get(identifier);

                    if (model) {
                        model.set(model.parse(data));
                    } else {
                        ClassName = z.lang.Class.resolveClass(win, type);

                        attributes[identifier] = new ClassName(data, {
                            parse: true
                        });
                    }
                }
            }, this);

            return attributes;
        },

        /**
         * @param {Array} path
         * @returns {Earcheck.Model.Abstract}
         */
        getChild: function (path) {
            return _.reduce(path, function (model, modelName) {
                var ret = null;

                if (model) {
                    ret = model.get(modelName);
                }

                return ret;
            }, this);
        },

        /**
         * @returns {string}
         */
        getClassPath: function () {
            return this.classPath;
        }
    });
}(window, zicht));