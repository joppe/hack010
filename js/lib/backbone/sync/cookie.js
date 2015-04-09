/*global zicht*/

(function (z) {
    'use strict';

    /**
     * @naemspace {zicht.backbone.sync}
     */
    var sync = z.createNamespace('zicht.backbone.sync'),
        createName,
        createValue;

    /**
     * @param {Backbone.Model} model
     * @returns {string}
     */
    createName = function (model) {
        return model.getClassPath() + model.id;
    };

    /**
     * @param {Object} attributes
     * @returns {string}
     */
    createValue = function (attributes) {
        return JSON.stringify(attributes);
    };

    /**
     * @param {string} method
     * @param {Object} model
     * @param {Object} options
     */
    sync.Cookie = function (method, model, options) {
        var attributes = {};

        if ('read' === method) {
            attributes = JSON.parse(z.request.Cookie.get(createName(model)));
        } else if ('delete' === method) {
            z.request.Cookie.remove(createName(model));
        } else {
            attributes = model.toJSON();
            z.request.Cookie.set(createName(model), createValue(attributes));
        }

        if (options && options.success) {
            options.success(attributes);
        }
    };
}(zicht));