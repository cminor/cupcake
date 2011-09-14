/**
 * Cupcake
 * @author cminor
 */
(function(host) {
    'use strict';
    var root = host,
        _prevCupcake = root.Cupcake,

        _hasOwnProp = Object.prototype.hasOwnProperty,

        _mix = function(receiver, supplier, overwrite, whitelist) {
            if (!receiver || !supplier || receiver === supplier) {
                return receiver;
            }
            if (overwrite.length) {
                whitelist = overwrite;
                overwrite = false;
            }
            var key, i, len;
            if (whitelist) {
                for (i = 0, len = whitelist.length; i < len; i++) {
                    key = whitelist[i];
                    if (_hasOwnProp.call(supplier, key)) {
                        if (overwrite || !_hasOwnProp.call(receiver, key)) {
                            receiver[key] = supplier[key];
                        }
                    }
                }
            } else {
                for (key in supplier) {
                    if (overwrite || !_hasOwnProp.call(receiver, key)) {
                        receiver[key] = supplier[key];
                    }
                }
            }
            return receiver;
        },

        _merge = function(/*supplier1, supplier2, ... */) {
            var args = arguments, i = 0, len = args.length, receiver = {};
            for (; i < len; i++) {
                _mix(receiver, args[i], true);
            }
            return receiver;
        },

        _now = Date.now ||
            function() {
                return (new Date()).getTime();
            },

        _guidCounter = 0,
        GUID_KEY = '__GUID_' + _now() + '__',
        _guid = function(prefix) {
            _guidCounter++;
            prefix = prefix || '';
            return prefix + _guidCounter;
        },

        // TODO: deep copy
        _clone = function() {};

    root.Cupcake = {
        __VERSION__: '0.1',
        __HOST__: host,
        previousCupcake: _prevCupcake,

        guid: _guid,
        stamp: function(obj, readonly) {
            var guid = null;
            if (obj) {
                guid = (typeof obj === 'string') ? obj : obj[GUID_KEY];
                if (!guid && !readonly) {
                    try {
                        obj[GUID_KEY] = guid = _guid();
                    } catch (e) {
                    }
                }
                guid = guid || null;
            }
            return guid;
        },
        /**
         * Returns the numeric value corresponding to the current time.
         * @return {Number} The numeric value (milliseconds)
         */
        now: _now,
        /**
         * mix
         * @param {Object} receiver 
         * @param {Object} supplier 
         * @param {Boolean} overwrite 
         * @param {String[]} whitelist 
         * @return {Object} 
         */
        mix: _mix,
        /**
         * merge
         * @param {Object} supplier1, supplier2, ...
         * @return {Object} 
         */
        merge: _merge
    };
}(window));

