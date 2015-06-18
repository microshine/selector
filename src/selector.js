var $ = (function () {
    function isString(v) {
        return typeof v == "string"
    }

    function isNumber(v) {
        return typeof v == "number"
    }

    function isBoolean(v) {
        return typeof v == "boolean"
    }

    function isObject(v) {
        return typeof v == "object"
    }

    function isFunction(v) {
        return typeof v == "function"
    }

    function isArray(v) {
        return Array.isArray(v)
    }

    function isUndefined(v) {
        return typeof v === "undefined"
    }

    function isNull(v) {
        return v === null
    }

    function isEmpty(v) {
        return isUndefined(v) && isNull(v)
    }

    function isType(v, t) {
        if (isString(t))
            return typeof v == t
        return v instanceof t
    }

    function P(s, p) {
        if (isType(s, Node))
            return createP([s]);
        else if (isType(s, NodeList))
            return createP(s);
        else {
            var _p = p || document;
            if (!(_p instanceof Node))
                throw new TypeError("Parameter 2 is not Node");
            var a = _p.querySelectorAll(s);
            createP(a);
            return a;
        }
    }
    var extension = {
        on: function on(e, cb) {
            this.each(function (i, v) {
                if (!v._eventListeners)
                    v._eventListeners = [];
                v.addEventListener(e, cb);
                v._eventListeners.push(cb);
            })
            return this;
        },
        off: function off(e) {
            this.each(function (i, v) {
                if (v._eventListeners) {
                    for (var j in v._eventListeners)
                        v.removeEventListener(e, v._eventListeners[j]);
                }
            })
            return this;
        },
        each: function each(cb) {
            for (var i = 0; i < this.length; i++) {
                if (cb(i, this[i]) === false)
                    break;
            }
            return this;
        },
        addClass: function (n) {
            this.each(function (i, v) {
                v.classList.add(n);
            })
            return this;
        },
        removeClass: function (n) {
            this.each(function (i, v) {
                v.classList.remove(n);
            })
            return this;
        },
        hasClass: function (n) {
            var res = false;
            this.each(function (i, v) {
                res = v.classList.contains(n);
                return false;
            })
            return res;
        },
        attr: function (n, val) {
            var res = this;
            this.each(function (i, v) {
                if (isNull(val))
                    v.removeAttribute(n);
                else if (isUndefined(val)) {
                    res = v.getAttribute(n);
                }
                else {
                    return v.setAttribute(n, val);
                }
                return false
            })
            return res;
        },
        prop: function (n, val) {
            var res = this;
            this.each(function (i, v) {
                if (!v._prop) v._prop = {};
                if (isNull(val))
                    delete v._prop[n];
                else if (isUndefined(val)) {
                    res = v._prop[n];
                }
                else {
                    return v._prop[n] = val;
                }
                return false
            })
            return res;
        }
    }


    function createP(a) {
        for (var i in extension) {
            Object.defineProperty(a, i, { value: extension[i] });
        }
        return a;
    }

    return P;
})();