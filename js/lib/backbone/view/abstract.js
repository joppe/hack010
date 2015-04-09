/*global Backbone, zicht*/

(function (z) {
    'use strict';

    /**
     * @namespace {zicht.backbone.view}
     */
    var view = z.createNamespace('zicht.backbone.view');

    /**
     * @constructor zicht.backbone.view.Abstract
     * @extends Backbone.View
     * @abstract
     */
    view.Abstract = Backbone.View.extend({
        classPath: 'zicht.backbone.view.Abstract',

        /**
         * @returns void
         */
        remove: function () {
            this.stopListening();
            this.$el.remove();
        },

        /**
         * @returns {string}
         */
        getClassPath: function () {
            return this.classPath;
        }
    });
}(zicht));