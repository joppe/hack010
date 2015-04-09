/*global Backbone, zicht, _*/

(function (z) {
    'use strict';

    /**
     * @namespace {zicht.backbone.collection}
     */
    var collection = z.createNamespace('zicht.backbone.collection');

    /**
     * @constructor zicht.backbone.collection.Abstract
     * @extends Backbone.Collection
     * @abstract
     */
    collection.Abstract = Backbone.Collection.extend({
        classPath: 'zicht.backbone.collection.Abstract',

        /**
         * @returns {Object}
         */
        prepare: function () {
            return _.map(this.models, function (model) {
                var attributes;

                if (_.isFunction(model.prepare)) {
                    attributes = model.prepare();
                } else {
                    attributes = model.attributes;
                }

                return attributes;
            }, this);
        },

        /**
         * @param {Object} response
         * @returns {Object}
         */
        parse: function (response) {
            return response;
        },

        /**
         * @returns {string}
         */
        getClassPath: function () {
            return this.classPath;
        }
    });
}(zicht));