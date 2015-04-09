/*global zicht, jQuery*/

(function (z, $) {
    'use strict';

    /**
     * <p data-binding="binding-type:model.property|filters,events"></p>
     */

    /**
     * @namespace {zicht.backbone.view}
     */
    var view = z.createNamespace('zicht.backbone.view');

    view.Template = {
        create: function (html, model) {
            var $html = $(html),
                bindings = [];

            $html.find('[data-binding]').each(function (index) {
                var $element = $(this);

//                bindings.push();
            });
        }
    };
}(zicht, jQuery));