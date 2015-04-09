/*global zicht*/

(function (z) {
    'use strict';

    /**
     * @namespace zicht.test
     */
    z.createNamespace('zicht.test');

    /**
     * @returns {number}
     */
    function now() {
        return (new Date()).getTime();
    }

    /**
     * @param {Function} f
     * @param {Object} ctx
     * @param {Array} args
     * @param {Number} repeat
     * @param {Function} ready
     */
    zicht.test.stress = function (f, ctx, args, repeat, ready) {
        var start = now();

        do {
            f.apply(ctx, args);
        } while ((repeat -= 1));

        ready.call(null, now() - start);
    };
}(zicht));
