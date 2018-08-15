"use strict";

function findDistance(a, b, c, d) {
    var e, f, g, h, i, j, k, l, m, n;
    return e = deg2rad(a), f = deg2rad(b), g = deg2rad(c), h = deg2rad(d), i = g - e, 
    j = h - f, k = Math.pow(Math.sin(i / 2), 2) + Math.cos(e) * Math.cos(g) * Math.pow(Math.sin(j / 2), 2), 
    l = 2 * Math.atan2(Math.sqrt(k), Math.sqrt(1 - k)), m = 3961 * l, n = 6373 * l, 
    round(m), round(n);
}

function deg2rad(a) {
    return a * Math.PI / 180;
}

function round(a) {
    return Math.round(1e3 * a) / 1e3;
}

function middle_latlng(a, b) {
    return {
        lat: b.lat + (a.lat - b.lat) / 2,
        lng: b.lng + (a.lng - b.lng) / 2
    };
}

function get_cookie(a) {
    var b = document.cookie.match(new RegExp("(?:^|; )" + a.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/gi, "\\$1") + "=([^;]*)"));
    return b ? decodeURIComponent(b[1]) : void 0;
}

function set_cookie(a, b) {
    var c = new Date(new Date().getTime() + 14089e6);
    document.cookie = a + "=" + b + "; path=/; expires=" + c.toUTCString();
}

function transliterate(a) {
    var b = "щ   ш  ч  ц  ю  я  ё  ж  ъ  ы  э  а б в г д е з и й к л м н о п р с т у ф х ь".split(/ +/g), c = "shh sh ch cz yu ya yo zh `` y' e` a b v g d e z i j k l m n o p r s t u f x `".split(/ +/g);
    return function(a, d) {
        var e;
        for (e = 0; e < b.length; e++) a = a.split(d ? c[e] : b[e]).join(d ? b[e] : c[e]), 
        a = a.split(d ? c[e].toUpperCase() : b[e].toUpperCase()).join(d ? b[e].toUpperCase() : c[e].toUpperCase());
        return a;
    };
}

function translit(a) {
    for (var b = new Array("Я", "я", "Ю", "ю", "Ч", "ч", "Ш", "ш", "Щ", "щ", "Ж", "ж", "А", "а", "Б", "б", "В", "в", "Г", "г", "Д", "д", "Е", "е", "Ё", "ё", "З", "з", "И", "и", "Й", "й", "К", "к", "Л", "л", "М", "м", "Н", "н", "О", "о", "П", "п", "Р", "р", "С", "с", "Т", "т", "У", "у", "Ф", "ф", "Х", "х", "Ц", "ц", "Ы", "ы", "Ь", "ь", "Ъ", "ъ", "Э", "э"), c = new Array("Ya", "ya", "Yu", "yu", "Ch", "ch", "Sh", "sh", "Sh", "sh", "Zh", "zh", "A", "a", "B", "b", "V", "v", "G", "g", "D", "d", "E", "e", "E", "e", "Z", "z", "I", "i", "J", "j", "K", "k", "L", "l", "M", "m", "N", "n", "O", "o", "P", "p", "R", "r", "S", "s", "T", "t", "U", "u", "F", "f", "H", "h", "C", "c", "Y", "y", "`", "`", "'", "'", "E", "e"), d = 0; d < b.length; d++) {
        var e = new RegExp(b[d], "g");
        a = a.replace(e, c[d]);
    }
    return a;
}

!function(a, b) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function(a) {
        if (!a.document) throw new Error("jQuery requires a window with a document");
        return b(a);
    } : b(a);
}("undefined" != typeof window ? window : this, function(a, b) {
    function c(a, b) {
        b = b || ba;
        var c = b.createElement("script");
        c.text = a, b.head.appendChild(c).parentNode.removeChild(c);
    }
    function d(a) {
        var b = !!a && "length" in a && a.length, c = oa.type(a);
        return "function" !== c && !oa.isWindow(a) && ("array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a);
    }
    function e(a, b, c) {
        return oa.isFunction(b) ? oa.grep(a, function(a, d) {
            return !!b.call(a, d, a) !== c;
        }) : b.nodeType ? oa.grep(a, function(a) {
            return a === b !== c;
        }) : "string" != typeof b ? oa.grep(a, function(a) {
            return ga.call(b, a) > -1 !== c;
        }) : ya.test(b) ? oa.filter(b, a, c) : (b = oa.filter(b, a), oa.grep(a, function(a) {
            return ga.call(b, a) > -1 !== c && 1 === a.nodeType;
        }));
    }
    function f(a, b) {
        for (;(a = a[b]) && 1 !== a.nodeType; ) ;
        return a;
    }
    function g(a) {
        var b = {};
        return oa.each(a.match(Da) || [], function(a, c) {
            b[c] = !0;
        }), b;
    }
    function h(a) {
        return a;
    }
    function i(a) {
        throw a;
    }
    function j(a, b, c) {
        var d;
        try {
            a && oa.isFunction(d = a.promise) ? d.call(a).done(b).fail(c) : a && oa.isFunction(d = a.then) ? d.call(a, b, c) : b.call(void 0, a);
        } catch (a) {
            c.call(void 0, a);
        }
    }
    function k() {
        ba.removeEventListener("DOMContentLoaded", k), a.removeEventListener("load", k), 
        oa.ready();
    }
    function l() {
        this.expando = oa.expando + l.uid++;
    }
    function m(a) {
        return "true" === a || "false" !== a && ("null" === a ? null : a === +a + "" ? +a : Ka.test(a) ? JSON.parse(a) : a);
    }
    function n(a, b, c) {
        var d;
        if (void 0 === c && 1 === a.nodeType) if (d = "data-" + b.replace(La, "-$&").toLowerCase(), 
        "string" == typeof (c = a.getAttribute(d))) {
            try {
                c = m(c);
            } catch (a) {}
            Ja.set(a, b, c);
        } else c = void 0;
        return c;
    }
    function o(a, b, c, d) {
        var e, f = 1, g = 20, h = d ? function() {
            return d.cur();
        } : function() {
            return oa.css(a, b, "");
        }, i = h(), j = c && c[3] || (oa.cssNumber[b] ? "" : "px"), k = (oa.cssNumber[b] || "px" !== j && +i) && Na.exec(oa.css(a, b));
        if (k && k[3] !== j) {
            j = j || k[3], c = c || [], k = +i || 1;
            do {
                f = f || ".5", k /= f, oa.style(a, b, k + j);
            } while (f !== (f = h() / i) && 1 !== f && --g);
        }
        return c && (k = +k || +i || 0, e = c[1] ? k + (c[1] + 1) * c[2] : +c[2], d && (d.unit = j, 
        d.start = k, d.end = e)), e;
    }
    function p(a) {
        var b, c = a.ownerDocument, d = a.nodeName, e = Ra[d];
        return e || (b = c.body.appendChild(c.createElement(d)), e = oa.css(b, "display"), 
        b.parentNode.removeChild(b), "none" === e && (e = "block"), Ra[d] = e, e);
    }
    function q(a, b) {
        for (var c, d, e = [], f = 0, g = a.length; f < g; f++) d = a[f], d.style && (c = d.style.display, 
        b ? ("none" === c && (e[f] = Ia.get(d, "display") || null, e[f] || (d.style.display = "")), 
        "" === d.style.display && Pa(d) && (e[f] = p(d))) : "none" !== c && (e[f] = "none", 
        Ia.set(d, "display", c)));
        for (f = 0; f < g; f++) null != e[f] && (a[f].style.display = e[f]);
        return a;
    }
    function r(a, b) {
        var c;
        return c = void 0 !== a.getElementsByTagName ? a.getElementsByTagName(b || "*") : void 0 !== a.querySelectorAll ? a.querySelectorAll(b || "*") : [], 
        void 0 === b || b && oa.nodeName(a, b) ? oa.merge([ a ], c) : c;
    }
    function s(a, b) {
        for (var c = 0, d = a.length; c < d; c++) Ia.set(a[c], "globalEval", !b || Ia.get(b[c], "globalEval"));
    }
    function t(a, b, c, d, e) {
        for (var f, g, h, i, j, k, l = b.createDocumentFragment(), m = [], n = 0, o = a.length; n < o; n++) if ((f = a[n]) || 0 === f) if ("object" === oa.type(f)) oa.merge(m, f.nodeType ? [ f ] : f); else if (Wa.test(f)) {
            for (g = g || l.appendChild(b.createElement("div")), h = (Ta.exec(f) || [ "", "" ])[1].toLowerCase(), 
            i = Va[h] || Va._default, g.innerHTML = i[1] + oa.htmlPrefilter(f) + i[2], k = i[0]; k--; ) g = g.lastChild;
            oa.merge(m, g.childNodes), g = l.firstChild, g.textContent = "";
        } else m.push(b.createTextNode(f));
        for (l.textContent = "", n = 0; f = m[n++]; ) if (d && oa.inArray(f, d) > -1) e && e.push(f); else if (j = oa.contains(f.ownerDocument, f), 
        g = r(l.appendChild(f), "script"), j && s(g), c) for (k = 0; f = g[k++]; ) Ua.test(f.type || "") && c.push(f);
        return l;
    }
    function u() {
        return !0;
    }
    function v() {
        return !1;
    }
    function w() {
        try {
            return ba.activeElement;
        } catch (a) {}
    }
    function x(a, b, c, d, e, f) {
        var g, h;
        if ("object" == typeof b) {
            "string" != typeof c && (d = d || c, c = void 0);
            for (h in b) x(a, h, c, d, b[h], f);
            return a;
        }
        if (null == d && null == e ? (e = c, d = c = void 0) : null == e && ("string" == typeof c ? (e = d, 
        d = void 0) : (e = d, d = c, c = void 0)), !1 === e) e = v; else if (!e) return a;
        return 1 === f && (g = e, e = function(a) {
            return oa().off(a), g.apply(this, arguments);
        }, e.guid = g.guid || (g.guid = oa.guid++)), a.each(function() {
            oa.event.add(this, b, e, d, c);
        });
    }
    function y(a, b) {
        return oa.nodeName(a, "table") && oa.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a : a;
    }
    function z(a) {
        return a.type = (null !== a.getAttribute("type")) + "/" + a.type, a;
    }
    function A(a) {
        var b = cb.exec(a.type);
        return b ? a.type = b[1] : a.removeAttribute("type"), a;
    }
    function B(a, b) {
        var c, d, e, f, g, h, i, j;
        if (1 === b.nodeType) {
            if (Ia.hasData(a) && (f = Ia.access(a), g = Ia.set(b, f), j = f.events)) {
                delete g.handle, g.events = {};
                for (e in j) for (c = 0, d = j[e].length; c < d; c++) oa.event.add(b, e, j[e][c]);
            }
            Ja.hasData(a) && (h = Ja.access(a), i = oa.extend({}, h), Ja.set(b, i));
        }
    }
    function C(a, b) {
        var c = b.nodeName.toLowerCase();
        "input" === c && Sa.test(a.type) ? b.checked = a.checked : "input" !== c && "textarea" !== c || (b.defaultValue = a.defaultValue);
    }
    function D(a, b, d, e) {
        b = ea.apply([], b);
        var f, g, h, i, j, k, l = 0, m = a.length, n = m - 1, o = b[0], p = oa.isFunction(o);
        if (p || m > 1 && "string" == typeof o && !ma.checkClone && bb.test(o)) return a.each(function(c) {
            var f = a.eq(c);
            p && (b[0] = o.call(this, c, f.html())), D(f, b, d, e);
        });
        if (m && (f = t(b, a[0].ownerDocument, !1, a, e), g = f.firstChild, 1 === f.childNodes.length && (f = g), 
        g || e)) {
            for (h = oa.map(r(f, "script"), z), i = h.length; l < m; l++) j = f, l !== n && (j = oa.clone(j, !0, !0), 
            i && oa.merge(h, r(j, "script"))), d.call(a[l], j, l);
            if (i) for (k = h[h.length - 1].ownerDocument, oa.map(h, A), l = 0; l < i; l++) j = h[l], 
            Ua.test(j.type || "") && !Ia.access(j, "globalEval") && oa.contains(k, j) && (j.src ? oa._evalUrl && oa._evalUrl(j.src) : c(j.textContent.replace(db, ""), k));
        }
        return a;
    }
    function E(a, b, c) {
        for (var d, e = b ? oa.filter(b, a) : a, f = 0; null != (d = e[f]); f++) c || 1 !== d.nodeType || oa.cleanData(r(d)), 
        d.parentNode && (c && oa.contains(d.ownerDocument, d) && s(r(d, "script")), d.parentNode.removeChild(d));
        return a;
    }
    function F(a, b, c) {
        var d, e, f, g, h = a.style;
        return c = c || gb(a), c && (g = c.getPropertyValue(b) || c[b], "" !== g || oa.contains(a.ownerDocument, a) || (g = oa.style(a, b)), 
        !ma.pixelMarginRight() && fb.test(g) && eb.test(b) && (d = h.width, e = h.minWidth, 
        f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, 
        h.minWidth = e, h.maxWidth = f)), void 0 !== g ? g + "" : g;
    }
    function G(a, b) {
        return {
            get: function() {
                return a() ? void delete this.get : (this.get = b).apply(this, arguments);
            }
        };
    }
    function H(a) {
        if (a in lb) return a;
        for (var b = a[0].toUpperCase() + a.slice(1), c = kb.length; c--; ) if ((a = kb[c] + b) in lb) return a;
    }
    function I(a, b, c) {
        var d = Na.exec(b);
        return d ? Math.max(0, d[2] - (c || 0)) + (d[3] || "px") : b;
    }
    function J(a, b, c, d, e) {
        var f, g = 0;
        for (f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0; f < 4; f += 2) "margin" === c && (g += oa.css(a, c + Oa[f], !0, e)), 
        d ? ("content" === c && (g -= oa.css(a, "padding" + Oa[f], !0, e)), "margin" !== c && (g -= oa.css(a, "border" + Oa[f] + "Width", !0, e))) : (g += oa.css(a, "padding" + Oa[f], !0, e), 
        "padding" !== c && (g += oa.css(a, "border" + Oa[f] + "Width", !0, e)));
        return g;
    }
    function K(a, b, c) {
        var d, e = !0, f = gb(a), g = "border-box" === oa.css(a, "boxSizing", !1, f);
        if (a.getClientRects().length && (d = a.getBoundingClientRect()[b]), d <= 0 || null == d) {
            if (d = F(a, b, f), (d < 0 || null == d) && (d = a.style[b]), fb.test(d)) return d;
            e = g && (ma.boxSizingReliable() || d === a.style[b]), d = parseFloat(d) || 0;
        }
        return d + J(a, b, c || (g ? "border" : "content"), e, f) + "px";
    }
    function L(a, b, c, d, e) {
        return new L.prototype.init(a, b, c, d, e);
    }
    function M() {
        nb && (a.requestAnimationFrame(M), oa.fx.tick());
    }
    function N() {
        return a.setTimeout(function() {
            mb = void 0;
        }), mb = oa.now();
    }
    function O(a, b) {
        var c, d = 0, e = {
            height: a
        };
        for (b = b ? 1 : 0; d < 4; d += 2 - b) c = Oa[d], e["margin" + c] = e["padding" + c] = a;
        return b && (e.opacity = e.width = a), e;
    }
    function P(a, b, c) {
        for (var d, e = (S.tweeners[b] || []).concat(S.tweeners["*"]), f = 0, g = e.length; f < g; f++) if (d = e[f].call(c, b, a)) return d;
    }
    function Q(a, b, c) {
        var d, e, f, g, h, i, j, k, l = "width" in b || "height" in b, m = this, n = {}, o = a.style, p = a.nodeType && Pa(a), r = Ia.get(a, "fxshow");
        c.queue || (g = oa._queueHooks(a, "fx"), null == g.unqueued && (g.unqueued = 0, 
        h = g.empty.fire, g.empty.fire = function() {
            g.unqueued || h();
        }), g.unqueued++, m.always(function() {
            m.always(function() {
                g.unqueued--, oa.queue(a, "fx").length || g.empty.fire();
            });
        }));
        for (d in b) if (e = b[d], ob.test(e)) {
            if (delete b[d], f = f || "toggle" === e, e === (p ? "hide" : "show")) {
                if ("show" !== e || !r || void 0 === r[d]) continue;
                p = !0;
            }
            n[d] = r && r[d] || oa.style(a, d);
        }
        if ((i = !oa.isEmptyObject(b)) || !oa.isEmptyObject(n)) {
            l && 1 === a.nodeType && (c.overflow = [ o.overflow, o.overflowX, o.overflowY ], 
            j = r && r.display, null == j && (j = Ia.get(a, "display")), k = oa.css(a, "display"), 
            "none" === k && (j ? k = j : (q([ a ], !0), j = a.style.display || j, k = oa.css(a, "display"), 
            q([ a ]))), ("inline" === k || "inline-block" === k && null != j) && "none" === oa.css(a, "float") && (i || (m.done(function() {
                o.display = j;
            }), null == j && (k = o.display, j = "none" === k ? "" : k)), o.display = "inline-block")), 
            c.overflow && (o.overflow = "hidden", m.always(function() {
                o.overflow = c.overflow[0], o.overflowX = c.overflow[1], o.overflowY = c.overflow[2];
            })), i = !1;
            for (d in n) i || (r ? "hidden" in r && (p = r.hidden) : r = Ia.access(a, "fxshow", {
                display: j
            }), f && (r.hidden = !p), p && q([ a ], !0), m.done(function() {
                p || q([ a ]), Ia.remove(a, "fxshow");
                for (d in n) oa.style(a, d, n[d]);
            })), i = P(p ? r[d] : 0, d, m), d in r || (r[d] = i.start, p && (i.end = i.start, 
            i.start = 0));
        }
    }
    function R(a, b) {
        var c, d, e, f, g;
        for (c in a) if (d = oa.camelCase(c), e = b[d], f = a[c], oa.isArray(f) && (e = f[1], 
        f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), (g = oa.cssHooks[d]) && "expand" in g) {
            f = g.expand(f), delete a[d];
            for (c in f) c in a || (a[c] = f[c], b[c] = e);
        } else b[d] = e;
    }
    function S(a, b, c) {
        var d, e, f = 0, g = S.prefilters.length, h = oa.Deferred().always(function() {
            delete i.elem;
        }), i = function() {
            if (e) return !1;
            for (var b = mb || N(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; g < i; g++) j.tweens[g].run(f);
            return h.notifyWith(a, [ j, f, c ]), f < 1 && i ? c : (h.resolveWith(a, [ j ]), 
            !1);
        }, j = h.promise({
            elem: a,
            props: oa.extend({}, b),
            opts: oa.extend(!0, {
                specialEasing: {},
                easing: oa.easing._default
            }, c),
            originalProperties: b,
            originalOptions: c,
            startTime: mb || N(),
            duration: c.duration,
            tweens: [],
            createTween: function(b, c) {
                var d = oa.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                return j.tweens.push(d), d;
            },
            stop: function(b) {
                var c = 0, d = b ? j.tweens.length : 0;
                if (e) return this;
                for (e = !0; c < d; c++) j.tweens[c].run(1);
                return b ? (h.notifyWith(a, [ j, 1, 0 ]), h.resolveWith(a, [ j, b ])) : h.rejectWith(a, [ j, b ]), 
                this;
            }
        }), k = j.props;
        for (R(k, j.opts.specialEasing); f < g; f++) if (d = S.prefilters[f].call(j, a, k, j.opts)) return oa.isFunction(d.stop) && (oa._queueHooks(j.elem, j.opts.queue).stop = oa.proxy(d.stop, d)), 
        d;
        return oa.map(k, P, j), oa.isFunction(j.opts.start) && j.opts.start.call(a, j), 
        oa.fx.timer(oa.extend(i, {
            elem: a,
            anim: j,
            queue: j.opts.queue
        })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always);
    }
    function T(a) {
        return (a.match(Da) || []).join(" ");
    }
    function U(a) {
        return a.getAttribute && a.getAttribute("class") || "";
    }
    function V(a, b, c, d) {
        var e;
        if (oa.isArray(b)) oa.each(b, function(b, e) {
            c || zb.test(a) ? d(a, e) : V(a + "[" + ("object" == typeof e && null != e ? b : "") + "]", e, c, d);
        }); else if (c || "object" !== oa.type(b)) d(a, b); else for (e in b) V(a + "[" + e + "]", b[e], c, d);
    }
    function W(a) {
        return function(b, c) {
            "string" != typeof b && (c = b, b = "*");
            var d, e = 0, f = b.toLowerCase().match(Da) || [];
            if (oa.isFunction(c)) for (;d = f[e++]; ) "+" === d[0] ? (d = d.slice(1) || "*", 
            (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c);
        };
    }
    function X(a, b, c, d) {
        function e(h) {
            var i;
            return f[h] = !0, oa.each(a[h] || [], function(a, h) {
                var j = h(b, c, d);
                return "string" != typeof j || g || f[j] ? g ? !(i = j) : void 0 : (b.dataTypes.unshift(j), 
                e(j), !1);
            }), i;
        }
        var f = {}, g = a === Lb;
        return e(b.dataTypes[0]) || !f["*"] && e("*");
    }
    function Y(a, b) {
        var c, d, e = oa.ajaxSettings.flatOptions || {};
        for (c in b) void 0 !== b[c] && ((e[c] ? a : d || (d = {}))[c] = b[c]);
        return d && oa.extend(!0, a, d), a;
    }
    function Z(a, b, c) {
        for (var d, e, f, g, h = a.contents, i = a.dataTypes; "*" === i[0]; ) i.shift(), 
        void 0 === d && (d = a.mimeType || b.getResponseHeader("Content-Type"));
        if (d) for (e in h) if (h[e] && h[e].test(d)) {
            i.unshift(e);
            break;
        }
        if (i[0] in c) f = i[0]; else {
            for (e in c) {
                if (!i[0] || a.converters[e + " " + i[0]]) {
                    f = e;
                    break;
                }
                g || (g = e);
            }
            f = f || g;
        }
        if (f) return f !== i[0] && i.unshift(f), c[f];
    }
    function $(a, b, c, d) {
        var e, f, g, h, i, j = {}, k = a.dataTypes.slice();
        if (k[1]) for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
        for (f = k.shift(); f; ) if (a.responseFields[f] && (c[a.responseFields[f]] = b), 
        !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift()) if ("*" === f) f = i; else if ("*" !== i && i !== f) {
            if (!(g = j[i + " " + f] || j["* " + f])) for (e in j) if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                !0 === g ? g = j[e] : !0 !== j[e] && (f = h[0], k.unshift(h[1]));
                break;
            }
            if (!0 !== g) if (g && a.throws) b = g(b); else try {
                b = g(b);
            } catch (a) {
                return {
                    state: "parsererror",
                    error: g ? a : "No conversion from " + i + " to " + f
                };
            }
        }
        return {
            state: "success",
            data: b
        };
    }
    function _(a) {
        return oa.isWindow(a) ? a : 9 === a.nodeType && a.defaultView;
    }
    var aa = [], ba = a.document, ca = Object.getPrototypeOf, da = aa.slice, ea = aa.concat, fa = aa.push, ga = aa.indexOf, ha = {}, ia = ha.toString, ja = ha.hasOwnProperty, ka = ja.toString, la = ka.call(Object), ma = {}, na = "3.1.1", oa = function(a, b) {
        return new oa.fn.init(a, b);
    }, pa = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, qa = /^-ms-/, ra = /-([a-z])/g, sa = function(a, b) {
        return b.toUpperCase();
    };
    oa.fn = oa.prototype = {
        jquery: na,
        constructor: oa,
        length: 0,
        toArray: function() {
            return da.call(this);
        },
        get: function(a) {
            return null == a ? da.call(this) : a < 0 ? this[a + this.length] : this[a];
        },
        pushStack: function(a) {
            var b = oa.merge(this.constructor(), a);
            return b.prevObject = this, b;
        },
        each: function(a) {
            return oa.each(this, a);
        },
        map: function(a) {
            return this.pushStack(oa.map(this, function(b, c) {
                return a.call(b, c, b);
            }));
        },
        slice: function() {
            return this.pushStack(da.apply(this, arguments));
        },
        first: function() {
            return this.eq(0);
        },
        last: function() {
            return this.eq(-1);
        },
        eq: function(a) {
            var b = this.length, c = +a + (a < 0 ? b : 0);
            return this.pushStack(c >= 0 && c < b ? [ this[c] ] : []);
        },
        end: function() {
            return this.prevObject || this.constructor();
        },
        push: fa,
        sort: aa.sort,
        splice: aa.splice
    }, oa.extend = oa.fn.extend = function() {
        var a, b, c, d, e, f, g = arguments[0] || {}, h = 1, i = arguments.length, j = !1;
        for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || oa.isFunction(g) || (g = {}), 
        h === i && (g = this, h--); h < i; h++) if (null != (a = arguments[h])) for (b in a) c = g[b], 
        d = a[b], g !== d && (j && d && (oa.isPlainObject(d) || (e = oa.isArray(d))) ? (e ? (e = !1, 
        f = c && oa.isArray(c) ? c : []) : f = c && oa.isPlainObject(c) ? c : {}, g[b] = oa.extend(j, f, d)) : void 0 !== d && (g[b] = d));
        return g;
    }, oa.extend({
        expando: "jQuery" + (na + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(a) {
            throw new Error(a);
        },
        noop: function() {},
        isFunction: function(a) {
            return "function" === oa.type(a);
        },
        isArray: Array.isArray,
        isWindow: function(a) {
            return null != a && a === a.window;
        },
        isNumeric: function(a) {
            var b = oa.type(a);
            return ("number" === b || "string" === b) && !isNaN(a - parseFloat(a));
        },
        isPlainObject: function(a) {
            var b, c;
            return !(!a || "[object Object]" !== ia.call(a) || (b = ca(a)) && ("function" != typeof (c = ja.call(b, "constructor") && b.constructor) || ka.call(c) !== la));
        },
        isEmptyObject: function(a) {
            var b;
            for (b in a) return !1;
            return !0;
        },
        type: function(a) {
            return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? ha[ia.call(a)] || "object" : typeof a;
        },
        globalEval: function(a) {
            c(a);
        },
        camelCase: function(a) {
            return a.replace(qa, "ms-").replace(ra, sa);
        },
        nodeName: function(a, b) {
            return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase();
        },
        each: function(a, b) {
            var c, e = 0;
            if (d(a)) for (c = a.length; e < c && !1 !== b.call(a[e], e, a[e]); e++) ; else for (e in a) if (!1 === b.call(a[e], e, a[e])) break;
            return a;
        },
        trim: function(a) {
            return null == a ? "" : (a + "").replace(pa, "");
        },
        makeArray: function(a, b) {
            var c = b || [];
            return null != a && (d(Object(a)) ? oa.merge(c, "string" == typeof a ? [ a ] : a) : fa.call(c, a)), 
            c;
        },
        inArray: function(a, b, c) {
            return null == b ? -1 : ga.call(b, a, c);
        },
        merge: function(a, b) {
            for (var c = +b.length, d = 0, e = a.length; d < c; d++) a[e++] = b[d];
            return a.length = e, a;
        },
        grep: function(a, b, c) {
            for (var d = [], e = 0, f = a.length, g = !c; e < f; e++) !b(a[e], e) !== g && d.push(a[e]);
            return d;
        },
        map: function(a, b, c) {
            var e, f, g = 0, h = [];
            if (d(a)) for (e = a.length; g < e; g++) null != (f = b(a[g], g, c)) && h.push(f); else for (g in a) null != (f = b(a[g], g, c)) && h.push(f);
            return ea.apply([], h);
        },
        guid: 1,
        proxy: function(a, b) {
            var c, d, e;
            if ("string" == typeof b && (c = a[b], b = a, a = c), oa.isFunction(a)) return d = da.call(arguments, 2), 
            e = function() {
                return a.apply(b || this, d.concat(da.call(arguments)));
            }, e.guid = a.guid = a.guid || oa.guid++, e;
        },
        now: Date.now,
        support: ma
    }), "function" == typeof Symbol && (oa.fn[Symbol.iterator] = aa[Symbol.iterator]), 
    oa.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(a, b) {
        ha["[object " + b + "]"] = b.toLowerCase();
    });
    var ta = function(a) {
        function b(a, b, c, d) {
            var e, f, g, h, i, j, k, m = b && b.ownerDocument, o = b ? b.nodeType : 9;
            if (c = c || [], "string" != typeof a || !a || 1 !== o && 9 !== o && 11 !== o) return c;
            if (!d && ((b ? b.ownerDocument || b : P) !== H && G(b), b = b || H, J)) {
                if (11 !== o && (i = ra.exec(a))) if (e = i[1]) {
                    if (9 === o) {
                        if (!(g = b.getElementById(e))) return c;
                        if (g.id === e) return c.push(g), c;
                    } else if (m && (g = m.getElementById(e)) && N(b, g) && g.id === e) return c.push(g), 
                    c;
                } else {
                    if (i[2]) return $.apply(c, b.getElementsByTagName(a)), c;
                    if ((e = i[3]) && w.getElementsByClassName && b.getElementsByClassName) return $.apply(c, b.getElementsByClassName(e)), 
                    c;
                }
                if (w.qsa && !U[a + " "] && (!K || !K.test(a))) {
                    if (1 !== o) m = b, k = a; else if ("object" !== b.nodeName.toLowerCase()) {
                        for ((h = b.getAttribute("id")) ? h = h.replace(va, wa) : b.setAttribute("id", h = O), 
                        j = A(a), f = j.length; f--; ) j[f] = "#" + h + " " + n(j[f]);
                        k = j.join(","), m = sa.test(a) && l(b.parentNode) || b;
                    }
                    if (k) try {
                        return $.apply(c, m.querySelectorAll(k)), c;
                    } catch (a) {} finally {
                        h === O && b.removeAttribute("id");
                    }
                }
            }
            return C(a.replace(ha, "$1"), b, c, d);
        }
        function c() {
            function a(c, d) {
                return b.push(c + " ") > x.cacheLength && delete a[b.shift()], a[c + " "] = d;
            }
            var b = [];
            return a;
        }
        function d(a) {
            return a[O] = !0, a;
        }
        function e(a) {
            var b = H.createElement("fieldset");
            try {
                return !!a(b);
            } catch (a) {
                return !1;
            } finally {
                b.parentNode && b.parentNode.removeChild(b), b = null;
            }
        }
        function f(a, b) {
            for (var c = a.split("|"), d = c.length; d--; ) x.attrHandle[c[d]] = b;
        }
        function g(a, b) {
            var c = b && a, d = c && 1 === a.nodeType && 1 === b.nodeType && a.sourceIndex - b.sourceIndex;
            if (d) return d;
            if (c) for (;c = c.nextSibling; ) if (c === b) return -1;
            return a ? 1 : -1;
        }
        function h(a) {
            return function(b) {
                return "input" === b.nodeName.toLowerCase() && b.type === a;
            };
        }
        function i(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return ("input" === c || "button" === c) && b.type === a;
            };
        }
        function j(a) {
            return function(b) {
                return "form" in b ? b.parentNode && !1 === b.disabled ? "label" in b ? "label" in b.parentNode ? b.parentNode.disabled === a : b.disabled === a : b.isDisabled === a || b.isDisabled !== !a && ya(b) === a : b.disabled === a : "label" in b && b.disabled === a;
            };
        }
        function k(a) {
            return d(function(b) {
                return b = +b, d(function(c, d) {
                    for (var e, f = a([], c.length, b), g = f.length; g--; ) c[e = f[g]] && (c[e] = !(d[e] = c[e]));
                });
            });
        }
        function l(a) {
            return a && void 0 !== a.getElementsByTagName && a;
        }
        function m() {}
        function n(a) {
            for (var b = 0, c = a.length, d = ""; b < c; b++) d += a[b].value;
            return d;
        }
        function o(a, b, c) {
            var d = b.dir, e = b.next, f = e || d, g = c && "parentNode" === f, h = R++;
            return b.first ? function(b, c, e) {
                for (;b = b[d]; ) if (1 === b.nodeType || g) return a(b, c, e);
                return !1;
            } : function(b, c, i) {
                var j, k, l, m = [ Q, h ];
                if (i) {
                    for (;b = b[d]; ) if ((1 === b.nodeType || g) && a(b, c, i)) return !0;
                } else for (;b = b[d]; ) if (1 === b.nodeType || g) if (l = b[O] || (b[O] = {}), 
                k = l[b.uniqueID] || (l[b.uniqueID] = {}), e && e === b.nodeName.toLowerCase()) b = b[d] || b; else {
                    if ((j = k[f]) && j[0] === Q && j[1] === h) return m[2] = j[2];
                    if (k[f] = m, m[2] = a(b, c, i)) return !0;
                }
                return !1;
            };
        }
        function p(a) {
            return a.length > 1 ? function(b, c, d) {
                for (var e = a.length; e--; ) if (!a[e](b, c, d)) return !1;
                return !0;
            } : a[0];
        }
        function q(a, c, d) {
            for (var e = 0, f = c.length; e < f; e++) b(a, c[e], d);
            return d;
        }
        function r(a, b, c, d, e) {
            for (var f, g = [], h = 0, i = a.length, j = null != b; h < i; h++) (f = a[h]) && (c && !c(f, d, e) || (g.push(f), 
            j && b.push(h)));
            return g;
        }
        function s(a, b, c, e, f, g) {
            return e && !e[O] && (e = s(e)), f && !f[O] && (f = s(f, g)), d(function(d, g, h, i) {
                var j, k, l, m = [], n = [], o = g.length, p = d || q(b || "*", h.nodeType ? [ h ] : h, []), s = !a || !d && b ? p : r(p, m, a, h, i), t = c ? f || (d ? a : o || e) ? [] : g : s;
                if (c && c(s, t, h, i), e) for (j = r(t, n), e(j, [], h, i), k = j.length; k--; ) (l = j[k]) && (t[n[k]] = !(s[n[k]] = l));
                if (d) {
                    if (f || a) {
                        if (f) {
                            for (j = [], k = t.length; k--; ) (l = t[k]) && j.push(s[k] = l);
                            f(null, t = [], j, i);
                        }
                        for (k = t.length; k--; ) (l = t[k]) && (j = f ? aa(d, l) : m[k]) > -1 && (d[j] = !(g[j] = l));
                    }
                } else t = r(t === g ? t.splice(o, t.length) : t), f ? f(null, g, t, i) : $.apply(g, t);
            });
        }
        function t(a) {
            for (var b, c, d, e = a.length, f = x.relative[a[0].type], g = f || x.relative[" "], h = f ? 1 : 0, i = o(function(a) {
                return a === b;
            }, g, !0), j = o(function(a) {
                return aa(b, a) > -1;
            }, g, !0), k = [ function(a, c, d) {
                var e = !f && (d || c !== D) || ((b = c).nodeType ? i(a, c, d) : j(a, c, d));
                return b = null, e;
            } ]; h < e; h++) if (c = x.relative[a[h].type]) k = [ o(p(k), c) ]; else {
                if (c = x.filter[a[h].type].apply(null, a[h].matches), c[O]) {
                    for (d = ++h; d < e && !x.relative[a[d].type]; d++) ;
                    return s(h > 1 && p(k), h > 1 && n(a.slice(0, h - 1).concat({
                        value: " " === a[h - 2].type ? "*" : ""
                    })).replace(ha, "$1"), c, h < d && t(a.slice(h, d)), d < e && t(a = a.slice(d)), d < e && n(a));
                }
                k.push(c);
            }
            return p(k);
        }
        function u(a, c) {
            var e = c.length > 0, f = a.length > 0, g = function(d, g, h, i, j) {
                var k, l, m, n = 0, o = "0", p = d && [], q = [], s = D, t = d || f && x.find.TAG("*", j), u = Q += null == s ? 1 : Math.random() || .1, v = t.length;
                for (j && (D = g === H || g || j); o !== v && null != (k = t[o]); o++) {
                    if (f && k) {
                        for (l = 0, g || k.ownerDocument === H || (G(k), h = !J); m = a[l++]; ) if (m(k, g || H, h)) {
                            i.push(k);
                            break;
                        }
                        j && (Q = u);
                    }
                    e && ((k = !m && k) && n--, d && p.push(k));
                }
                if (n += o, e && o !== n) {
                    for (l = 0; m = c[l++]; ) m(p, q, g, h);
                    if (d) {
                        if (n > 0) for (;o--; ) p[o] || q[o] || (q[o] = Y.call(i));
                        q = r(q);
                    }
                    $.apply(i, q), j && !d && q.length > 0 && n + c.length > 1 && b.uniqueSort(i);
                }
                return j && (Q = u, D = s), p;
            };
            return e ? d(g) : g;
        }
        var v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O = "sizzle" + 1 * new Date(), P = a.document, Q = 0, R = 0, S = c(), T = c(), U = c(), V = function(a, b) {
            return a === b && (F = !0), 0;
        }, W = {}.hasOwnProperty, X = [], Y = X.pop, Z = X.push, $ = X.push, _ = X.slice, aa = function(a, b) {
            for (var c = 0, d = a.length; c < d; c++) if (a[c] === b) return c;
            return -1;
        }, ba = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", ca = "[\\x20\\t\\r\\n\\f]", da = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+", ea = "\\[" + ca + "*(" + da + ")(?:" + ca + "*([*^$|!~]?=)" + ca + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + da + "))|)" + ca + "*\\]", fa = ":(" + da + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ea + ")*)|.*)\\)|)", ga = new RegExp(ca + "+", "g"), ha = new RegExp("^" + ca + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ca + "+$", "g"), ia = new RegExp("^" + ca + "*," + ca + "*"), ja = new RegExp("^" + ca + "*([>+~]|" + ca + ")" + ca + "*"), ka = new RegExp("=" + ca + "*([^\\]'\"]*?)" + ca + "*\\]", "g"), la = new RegExp(fa), ma = new RegExp("^" + da + "$"), na = {
            ID: new RegExp("^#(" + da + ")"),
            CLASS: new RegExp("^\\.(" + da + ")"),
            TAG: new RegExp("^(" + da + "|[*])"),
            ATTR: new RegExp("^" + ea),
            PSEUDO: new RegExp("^" + fa),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ca + "*(even|odd|(([+-]|)(\\d*)n|)" + ca + "*(?:([+-]|)" + ca + "*(\\d+)|))" + ca + "*\\)|)", "i"),
            bool: new RegExp("^(?:" + ba + ")$", "i"),
            needsContext: new RegExp("^" + ca + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ca + "*((?:-\\d)?\\d*)" + ca + "*\\)|)(?=[^-]|$)", "i")
        }, oa = /^(?:input|select|textarea|button)$/i, pa = /^h\d$/i, qa = /^[^{]+\{\s*\[native \w/, ra = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, sa = /[+~]/, ta = new RegExp("\\\\([\\da-f]{1,6}" + ca + "?|(" + ca + ")|.)", "ig"), ua = function(a, b, c) {
            var d = "0x" + b - 65536;
            return d !== d || c ? b : d < 0 ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320);
        }, va = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, wa = function(a, b) {
            return b ? "\0" === a ? "�" : a.slice(0, -1) + "\\" + a.charCodeAt(a.length - 1).toString(16) + " " : "\\" + a;
        }, xa = function() {
            G();
        }, ya = o(function(a) {
            return !0 === a.disabled && ("form" in a || "label" in a);
        }, {
            dir: "parentNode",
            next: "legend"
        });
        try {
            $.apply(X = _.call(P.childNodes), P.childNodes), X[P.childNodes.length].nodeType;
        } catch (a) {
            $ = {
                apply: X.length ? function(a, b) {
                    Z.apply(a, _.call(b));
                } : function(a, b) {
                    for (var c = a.length, d = 0; a[c++] = b[d++]; ) ;
                    a.length = c - 1;
                }
            };
        }
        w = b.support = {}, z = b.isXML = function(a) {
            var b = a && (a.ownerDocument || a).documentElement;
            return !!b && "HTML" !== b.nodeName;
        }, G = b.setDocument = function(a) {
            var b, c, d = a ? a.ownerDocument || a : P;
            return d !== H && 9 === d.nodeType && d.documentElement ? (H = d, I = H.documentElement, 
            J = !z(H), P !== H && (c = H.defaultView) && c.top !== c && (c.addEventListener ? c.addEventListener("unload", xa, !1) : c.attachEvent && c.attachEvent("onunload", xa)), 
            w.attributes = e(function(a) {
                return a.className = "i", !a.getAttribute("className");
            }), w.getElementsByTagName = e(function(a) {
                return a.appendChild(H.createComment("")), !a.getElementsByTagName("*").length;
            }), w.getElementsByClassName = qa.test(H.getElementsByClassName), w.getById = e(function(a) {
                return I.appendChild(a).id = O, !H.getElementsByName || !H.getElementsByName(O).length;
            }), w.getById ? (x.filter.ID = function(a) {
                var b = a.replace(ta, ua);
                return function(a) {
                    return a.getAttribute("id") === b;
                };
            }, x.find.ID = function(a, b) {
                if (void 0 !== b.getElementById && J) {
                    var c = b.getElementById(a);
                    return c ? [ c ] : [];
                }
            }) : (x.filter.ID = function(a) {
                var b = a.replace(ta, ua);
                return function(a) {
                    var c = void 0 !== a.getAttributeNode && a.getAttributeNode("id");
                    return c && c.value === b;
                };
            }, x.find.ID = function(a, b) {
                if (void 0 !== b.getElementById && J) {
                    var c, d, e, f = b.getElementById(a);
                    if (f) {
                        if ((c = f.getAttributeNode("id")) && c.value === a) return [ f ];
                        for (e = b.getElementsByName(a), d = 0; f = e[d++]; ) if ((c = f.getAttributeNode("id")) && c.value === a) return [ f ];
                    }
                    return [];
                }
            }), x.find.TAG = w.getElementsByTagName ? function(a, b) {
                return void 0 !== b.getElementsByTagName ? b.getElementsByTagName(a) : w.qsa ? b.querySelectorAll(a) : void 0;
            } : function(a, b) {
                var c, d = [], e = 0, f = b.getElementsByTagName(a);
                if ("*" === a) {
                    for (;c = f[e++]; ) 1 === c.nodeType && d.push(c);
                    return d;
                }
                return f;
            }, x.find.CLASS = w.getElementsByClassName && function(a, b) {
                if (void 0 !== b.getElementsByClassName && J) return b.getElementsByClassName(a);
            }, L = [], K = [], (w.qsa = qa.test(H.querySelectorAll)) && (e(function(a) {
                I.appendChild(a).innerHTML = "<a id='" + O + "'></a><select id='" + O + "-\r\\' msallowcapture=''><option selected=''></option></select>", 
                a.querySelectorAll("[msallowcapture^='']").length && K.push("[*^$]=" + ca + "*(?:''|\"\")"), 
                a.querySelectorAll("[selected]").length || K.push("\\[" + ca + "*(?:value|" + ba + ")"), 
                a.querySelectorAll("[id~=" + O + "-]").length || K.push("~="), a.querySelectorAll(":checked").length || K.push(":checked"), 
                a.querySelectorAll("a#" + O + "+*").length || K.push(".#.+[+~]");
            }), e(function(a) {
                a.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                var b = H.createElement("input");
                b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && K.push("name" + ca + "*[*^$|!~]?="), 
                2 !== a.querySelectorAll(":enabled").length && K.push(":enabled", ":disabled"), 
                I.appendChild(a).disabled = !0, 2 !== a.querySelectorAll(":disabled").length && K.push(":enabled", ":disabled"), 
                a.querySelectorAll("*,:x"), K.push(",.*:");
            })), (w.matchesSelector = qa.test(M = I.matches || I.webkitMatchesSelector || I.mozMatchesSelector || I.oMatchesSelector || I.msMatchesSelector)) && e(function(a) {
                w.disconnectedMatch = M.call(a, "*"), M.call(a, "[s!='']:x"), L.push("!=", fa);
            }), K = K.length && new RegExp(K.join("|")), L = L.length && new RegExp(L.join("|")), 
            b = qa.test(I.compareDocumentPosition), N = b || qa.test(I.contains) ? function(a, b) {
                var c = 9 === a.nodeType ? a.documentElement : a, d = b && b.parentNode;
                return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)));
            } : function(a, b) {
                if (b) for (;b = b.parentNode; ) if (b === a) return !0;
                return !1;
            }, V = b ? function(a, b) {
                if (a === b) return F = !0, 0;
                var c = !a.compareDocumentPosition - !b.compareDocumentPosition;
                return c || (c = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 
                1 & c || !w.sortDetached && b.compareDocumentPosition(a) === c ? a === H || a.ownerDocument === P && N(P, a) ? -1 : b === H || b.ownerDocument === P && N(P, b) ? 1 : E ? aa(E, a) - aa(E, b) : 0 : 4 & c ? -1 : 1);
            } : function(a, b) {
                if (a === b) return F = !0, 0;
                var c, d = 0, e = a.parentNode, f = b.parentNode, h = [ a ], i = [ b ];
                if (!e || !f) return a === H ? -1 : b === H ? 1 : e ? -1 : f ? 1 : E ? aa(E, a) - aa(E, b) : 0;
                if (e === f) return g(a, b);
                for (c = a; c = c.parentNode; ) h.unshift(c);
                for (c = b; c = c.parentNode; ) i.unshift(c);
                for (;h[d] === i[d]; ) d++;
                return d ? g(h[d], i[d]) : h[d] === P ? -1 : i[d] === P ? 1 : 0;
            }, H) : H;
        }, b.matches = function(a, c) {
            return b(a, null, null, c);
        }, b.matchesSelector = function(a, c) {
            if ((a.ownerDocument || a) !== H && G(a), c = c.replace(ka, "='$1']"), w.matchesSelector && J && !U[c + " "] && (!L || !L.test(c)) && (!K || !K.test(c))) try {
                var d = M.call(a, c);
                if (d || w.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d;
            } catch (a) {}
            return b(c, H, null, [ a ]).length > 0;
        }, b.contains = function(a, b) {
            return (a.ownerDocument || a) !== H && G(a), N(a, b);
        }, b.attr = function(a, b) {
            (a.ownerDocument || a) !== H && G(a);
            var c = x.attrHandle[b.toLowerCase()], d = c && W.call(x.attrHandle, b.toLowerCase()) ? c(a, b, !J) : void 0;
            return void 0 !== d ? d : w.attributes || !J ? a.getAttribute(b) : (d = a.getAttributeNode(b)) && d.specified ? d.value : null;
        }, b.escape = function(a) {
            return (a + "").replace(va, wa);
        }, b.error = function(a) {
            throw new Error("Syntax error, unrecognized expression: " + a);
        }, b.uniqueSort = function(a) {
            var b, c = [], d = 0, e = 0;
            if (F = !w.detectDuplicates, E = !w.sortStable && a.slice(0), a.sort(V), F) {
                for (;b = a[e++]; ) b === a[e] && (d = c.push(e));
                for (;d--; ) a.splice(c[d], 1);
            }
            return E = null, a;
        }, y = b.getText = function(a) {
            var b, c = "", d = 0, e = a.nodeType;
            if (e) {
                if (1 === e || 9 === e || 11 === e) {
                    if ("string" == typeof a.textContent) return a.textContent;
                    for (a = a.firstChild; a; a = a.nextSibling) c += y(a);
                } else if (3 === e || 4 === e) return a.nodeValue;
            } else for (;b = a[d++]; ) c += y(b);
            return c;
        }, x = b.selectors = {
            cacheLength: 50,
            createPseudo: d,
            match: na,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(a) {
                    return a[1] = a[1].replace(ta, ua), a[3] = (a[3] || a[4] || a[5] || "").replace(ta, ua), 
                    "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4);
                },
                CHILD: function(a) {
                    return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || b.error(a[0]), 
                    a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && b.error(a[0]), 
                    a;
                },
                PSEUDO: function(a) {
                    var b, c = !a[6] && a[2];
                    return na.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && la.test(c) && (b = A(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), 
                    a[2] = c.slice(0, b)), a.slice(0, 3));
                }
            },
            filter: {
                TAG: function(a) {
                    var b = a.replace(ta, ua).toLowerCase();
                    return "*" === a ? function() {
                        return !0;
                    } : function(a) {
                        return a.nodeName && a.nodeName.toLowerCase() === b;
                    };
                },
                CLASS: function(a) {
                    var b = S[a + " "];
                    return b || (b = new RegExp("(^|" + ca + ")" + a + "(" + ca + "|$)")) && S(a, function(a) {
                        return b.test("string" == typeof a.className && a.className || void 0 !== a.getAttribute && a.getAttribute("class") || "");
                    });
                },
                ATTR: function(a, c, d) {
                    return function(e) {
                        var f = b.attr(e, a);
                        return null == f ? "!=" === c : !c || (f += "", "=" === c ? f === d : "!=" === c ? f !== d : "^=" === c ? d && 0 === f.indexOf(d) : "*=" === c ? d && f.indexOf(d) > -1 : "$=" === c ? d && f.slice(-d.length) === d : "~=" === c ? (" " + f.replace(ga, " ") + " ").indexOf(d) > -1 : "|=" === c && (f === d || f.slice(0, d.length + 1) === d + "-"));
                    };
                },
                CHILD: function(a, b, c, d, e) {
                    var f = "nth" !== a.slice(0, 3), g = "last" !== a.slice(-4), h = "of-type" === b;
                    return 1 === d && 0 === e ? function(a) {
                        return !!a.parentNode;
                    } : function(b, c, i) {
                        var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling", q = b.parentNode, r = h && b.nodeName.toLowerCase(), s = !i && !h, t = !1;
                        if (q) {
                            if (f) {
                                for (;p; ) {
                                    for (m = b; m = m[p]; ) if (h ? m.nodeName.toLowerCase() === r : 1 === m.nodeType) return !1;
                                    o = p = "only" === a && !o && "nextSibling";
                                }
                                return !0;
                            }
                            if (o = [ g ? q.firstChild : q.lastChild ], g && s) {
                                for (m = q, l = m[O] || (m[O] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), 
                                j = k[a] || [], n = j[0] === Q && j[1], t = n && j[2], m = n && q.childNodes[n]; m = ++n && m && m[p] || (t = n = 0) || o.pop(); ) if (1 === m.nodeType && ++t && m === b) {
                                    k[a] = [ Q, n, t ];
                                    break;
                                }
                            } else if (s && (m = b, l = m[O] || (m[O] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), 
                            j = k[a] || [], n = j[0] === Q && j[1], t = n), !1 === t) for (;(m = ++n && m && m[p] || (t = n = 0) || o.pop()) && ((h ? m.nodeName.toLowerCase() !== r : 1 !== m.nodeType) || !++t || (s && (l = m[O] || (m[O] = {}), 
                            k = l[m.uniqueID] || (l[m.uniqueID] = {}), k[a] = [ Q, t ]), m !== b)); ) ;
                            return (t -= e) === d || t % d == 0 && t / d >= 0;
                        }
                    };
                },
                PSEUDO: function(a, c) {
                    var e, f = x.pseudos[a] || x.setFilters[a.toLowerCase()] || b.error("unsupported pseudo: " + a);
                    return f[O] ? f(c) : f.length > 1 ? (e = [ a, a, "", c ], x.setFilters.hasOwnProperty(a.toLowerCase()) ? d(function(a, b) {
                        for (var d, e = f(a, c), g = e.length; g--; ) d = aa(a, e[g]), a[d] = !(b[d] = e[g]);
                    }) : function(a) {
                        return f(a, 0, e);
                    }) : f;
                }
            },
            pseudos: {
                not: d(function(a) {
                    var b = [], c = [], e = B(a.replace(ha, "$1"));
                    return e[O] ? d(function(a, b, c, d) {
                        for (var f, g = e(a, null, d, []), h = a.length; h--; ) (f = g[h]) && (a[h] = !(b[h] = f));
                    }) : function(a, d, f) {
                        return b[0] = a, e(b, null, f, c), b[0] = null, !c.pop();
                    };
                }),
                has: d(function(a) {
                    return function(c) {
                        return b(a, c).length > 0;
                    };
                }),
                contains: d(function(a) {
                    return a = a.replace(ta, ua), function(b) {
                        return (b.textContent || b.innerText || y(b)).indexOf(a) > -1;
                    };
                }),
                lang: d(function(a) {
                    return ma.test(a || "") || b.error("unsupported lang: " + a), a = a.replace(ta, ua).toLowerCase(), 
                    function(b) {
                        var c;
                        do {
                            if (c = J ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return (c = c.toLowerCase()) === a || 0 === c.indexOf(a + "-");
                        } while ((b = b.parentNode) && 1 === b.nodeType);
                        return !1;
                    };
                }),
                target: function(b) {
                    var c = a.location && a.location.hash;
                    return c && c.slice(1) === b.id;
                },
                root: function(a) {
                    return a === I;
                },
                focus: function(a) {
                    return a === H.activeElement && (!H.hasFocus || H.hasFocus()) && !!(a.type || a.href || ~a.tabIndex);
                },
                enabled: j(!1),
                disabled: j(!0),
                checked: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && !!a.checked || "option" === b && !!a.selected;
                },
                selected: function(a) {
                    return a.parentNode && a.parentNode.selectedIndex, !0 === a.selected;
                },
                empty: function(a) {
                    for (a = a.firstChild; a; a = a.nextSibling) if (a.nodeType < 6) return !1;
                    return !0;
                },
                parent: function(a) {
                    return !x.pseudos.empty(a);
                },
                header: function(a) {
                    return pa.test(a.nodeName);
                },
                input: function(a) {
                    return oa.test(a.nodeName);
                },
                button: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && "button" === a.type || "button" === b;
                },
                text: function(a) {
                    var b;
                    return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase());
                },
                first: k(function() {
                    return [ 0 ];
                }),
                last: k(function(a, b) {
                    return [ b - 1 ];
                }),
                eq: k(function(a, b, c) {
                    return [ c < 0 ? c + b : c ];
                }),
                even: k(function(a, b) {
                    for (var c = 0; c < b; c += 2) a.push(c);
                    return a;
                }),
                odd: k(function(a, b) {
                    for (var c = 1; c < b; c += 2) a.push(c);
                    return a;
                }),
                lt: k(function(a, b, c) {
                    for (var d = c < 0 ? c + b : c; --d >= 0; ) a.push(d);
                    return a;
                }),
                gt: k(function(a, b, c) {
                    for (var d = c < 0 ? c + b : c; ++d < b; ) a.push(d);
                    return a;
                })
            }
        }, x.pseudos.nth = x.pseudos.eq;
        for (v in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) x.pseudos[v] = h(v);
        for (v in {
            submit: !0,
            reset: !0
        }) x.pseudos[v] = i(v);
        return m.prototype = x.filters = x.pseudos, x.setFilters = new m(), A = b.tokenize = function(a, c) {
            var d, e, f, g, h, i, j, k = T[a + " "];
            if (k) return c ? 0 : k.slice(0);
            for (h = a, i = [], j = x.preFilter; h; ) {
                d && !(e = ia.exec(h)) || (e && (h = h.slice(e[0].length) || h), i.push(f = [])), 
                d = !1, (e = ja.exec(h)) && (d = e.shift(), f.push({
                    value: d,
                    type: e[0].replace(ha, " ")
                }), h = h.slice(d.length));
                for (g in x.filter) !(e = na[g].exec(h)) || j[g] && !(e = j[g](e)) || (d = e.shift(), 
                f.push({
                    value: d,
                    type: g,
                    matches: e
                }), h = h.slice(d.length));
                if (!d) break;
            }
            return c ? h.length : h ? b.error(a) : T(a, i).slice(0);
        }, B = b.compile = function(a, b) {
            var c, d = [], e = [], f = U[a + " "];
            if (!f) {
                for (b || (b = A(a)), c = b.length; c--; ) f = t(b[c]), f[O] ? d.push(f) : e.push(f);
                f = U(a, u(e, d)), f.selector = a;
            }
            return f;
        }, C = b.select = function(a, b, c, d) {
            var e, f, g, h, i, j = "function" == typeof a && a, k = !d && A(a = j.selector || a);
            if (c = c || [], 1 === k.length) {
                if (f = k[0] = k[0].slice(0), f.length > 2 && "ID" === (g = f[0]).type && 9 === b.nodeType && J && x.relative[f[1].type]) {
                    if (!(b = (x.find.ID(g.matches[0].replace(ta, ua), b) || [])[0])) return c;
                    j && (b = b.parentNode), a = a.slice(f.shift().value.length);
                }
                for (e = na.needsContext.test(a) ? 0 : f.length; e-- && (g = f[e], !x.relative[h = g.type]); ) if ((i = x.find[h]) && (d = i(g.matches[0].replace(ta, ua), sa.test(f[0].type) && l(b.parentNode) || b))) {
                    if (f.splice(e, 1), !(a = d.length && n(f))) return $.apply(c, d), c;
                    break;
                }
            }
            return (j || B(a, k))(d, b, !J, c, !b || sa.test(a) && l(b.parentNode) || b), c;
        }, w.sortStable = O.split("").sort(V).join("") === O, w.detectDuplicates = !!F, 
        G(), w.sortDetached = e(function(a) {
            return 1 & a.compareDocumentPosition(H.createElement("fieldset"));
        }), e(function(a) {
            return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href");
        }) || f("type|href|height|width", function(a, b, c) {
            if (!c) return a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2);
        }), w.attributes && e(function(a) {
            return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value");
        }) || f("value", function(a, b, c) {
            if (!c && "input" === a.nodeName.toLowerCase()) return a.defaultValue;
        }), e(function(a) {
            return null == a.getAttribute("disabled");
        }) || f(ba, function(a, b, c) {
            var d;
            if (!c) return !0 === a[b] ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null;
        }), b;
    }(a);
    oa.find = ta, oa.expr = ta.selectors, oa.expr[":"] = oa.expr.pseudos, oa.uniqueSort = oa.unique = ta.uniqueSort, 
    oa.text = ta.getText, oa.isXMLDoc = ta.isXML, oa.contains = ta.contains, oa.escapeSelector = ta.escape;
    var ua = function(a, b, c) {
        for (var d = [], e = void 0 !== c; (a = a[b]) && 9 !== a.nodeType; ) if (1 === a.nodeType) {
            if (e && oa(a).is(c)) break;
            d.push(a);
        }
        return d;
    }, va = function(a, b) {
        for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
        return c;
    }, wa = oa.expr.match.needsContext, xa = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i, ya = /^.[^:#\[\.,]*$/;
    oa.filter = function(a, b, c) {
        var d = b[0];
        return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? oa.find.matchesSelector(d, a) ? [ d ] : [] : oa.find.matches(a, oa.grep(b, function(a) {
            return 1 === a.nodeType;
        }));
    }, oa.fn.extend({
        find: function(a) {
            var b, c, d = this.length, e = this;
            if ("string" != typeof a) return this.pushStack(oa(a).filter(function() {
                for (b = 0; b < d; b++) if (oa.contains(e[b], this)) return !0;
            }));
            for (c = this.pushStack([]), b = 0; b < d; b++) oa.find(a, e[b], c);
            return d > 1 ? oa.uniqueSort(c) : c;
        },
        filter: function(a) {
            return this.pushStack(e(this, a || [], !1));
        },
        not: function(a) {
            return this.pushStack(e(this, a || [], !0));
        },
        is: function(a) {
            return !!e(this, "string" == typeof a && wa.test(a) ? oa(a) : a || [], !1).length;
        }
    });
    var za, Aa = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
    (oa.fn.init = function(a, b, c) {
        var d, e;
        if (!a) return this;
        if (c = c || za, "string" == typeof a) {
            if (!(d = "<" === a[0] && ">" === a[a.length - 1] && a.length >= 3 ? [ null, a, null ] : Aa.exec(a)) || !d[1] && b) return !b || b.jquery ? (b || c).find(a) : this.constructor(b).find(a);
            if (d[1]) {
                if (b = b instanceof oa ? b[0] : b, oa.merge(this, oa.parseHTML(d[1], b && b.nodeType ? b.ownerDocument || b : ba, !0)), 
                xa.test(d[1]) && oa.isPlainObject(b)) for (d in b) oa.isFunction(this[d]) ? this[d](b[d]) : this.attr(d, b[d]);
                return this;
            }
            return e = ba.getElementById(d[2]), e && (this[0] = e, this.length = 1), this;
        }
        return a.nodeType ? (this[0] = a, this.length = 1, this) : oa.isFunction(a) ? void 0 !== c.ready ? c.ready(a) : a(oa) : oa.makeArray(a, this);
    }).prototype = oa.fn, za = oa(ba);
    var Ba = /^(?:parents|prev(?:Until|All))/, Ca = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    oa.fn.extend({
        has: function(a) {
            var b = oa(a, this), c = b.length;
            return this.filter(function() {
                for (var a = 0; a < c; a++) if (oa.contains(this, b[a])) return !0;
            });
        },
        closest: function(a, b) {
            var c, d = 0, e = this.length, f = [], g = "string" != typeof a && oa(a);
            if (!wa.test(a)) for (;d < e; d++) for (c = this[d]; c && c !== b; c = c.parentNode) if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && oa.find.matchesSelector(c, a))) {
                f.push(c);
                break;
            }
            return this.pushStack(f.length > 1 ? oa.uniqueSort(f) : f);
        },
        index: function(a) {
            return a ? "string" == typeof a ? ga.call(oa(a), this[0]) : ga.call(this, a.jquery ? a[0] : a) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
        },
        add: function(a, b) {
            return this.pushStack(oa.uniqueSort(oa.merge(this.get(), oa(a, b))));
        },
        addBack: function(a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a));
        }
    }), oa.each({
        parent: function(a) {
            var b = a.parentNode;
            return b && 11 !== b.nodeType ? b : null;
        },
        parents: function(a) {
            return ua(a, "parentNode");
        },
        parentsUntil: function(a, b, c) {
            return ua(a, "parentNode", c);
        },
        next: function(a) {
            return f(a, "nextSibling");
        },
        prev: function(a) {
            return f(a, "previousSibling");
        },
        nextAll: function(a) {
            return ua(a, "nextSibling");
        },
        prevAll: function(a) {
            return ua(a, "previousSibling");
        },
        nextUntil: function(a, b, c) {
            return ua(a, "nextSibling", c);
        },
        prevUntil: function(a, b, c) {
            return ua(a, "previousSibling", c);
        },
        siblings: function(a) {
            return va((a.parentNode || {}).firstChild, a);
        },
        children: function(a) {
            return va(a.firstChild);
        },
        contents: function(a) {
            return a.contentDocument || oa.merge([], a.childNodes);
        }
    }, function(a, b) {
        oa.fn[a] = function(c, d) {
            var e = oa.map(this, b, c);
            return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = oa.filter(d, e)), 
            this.length > 1 && (Ca[a] || oa.uniqueSort(e), Ba.test(a) && e.reverse()), this.pushStack(e);
        };
    });
    var Da = /[^\x20\t\r\n\f]+/g;
    oa.Callbacks = function(a) {
        a = "string" == typeof a ? g(a) : oa.extend({}, a);
        var b, c, d, e, f = [], h = [], i = -1, j = function() {
            for (e = a.once, d = b = !0; h.length; i = -1) for (c = h.shift(); ++i < f.length; ) !1 === f[i].apply(c[0], c[1]) && a.stopOnFalse && (i = f.length, 
            c = !1);
            a.memory || (c = !1), b = !1, e && (f = c ? [] : "");
        }, k = {
            add: function() {
                return f && (c && !b && (i = f.length - 1, h.push(c)), function b(c) {
                    oa.each(c, function(c, d) {
                        oa.isFunction(d) ? a.unique && k.has(d) || f.push(d) : d && d.length && "string" !== oa.type(d) && b(d);
                    });
                }(arguments), c && !b && j()), this;
            },
            remove: function() {
                return oa.each(arguments, function(a, b) {
                    for (var c; (c = oa.inArray(b, f, c)) > -1; ) f.splice(c, 1), c <= i && i--;
                }), this;
            },
            has: function(a) {
                return a ? oa.inArray(a, f) > -1 : f.length > 0;
            },
            empty: function() {
                return f && (f = []), this;
            },
            disable: function() {
                return e = h = [], f = c = "", this;
            },
            disabled: function() {
                return !f;
            },
            lock: function() {
                return e = h = [], c || b || (f = c = ""), this;
            },
            locked: function() {
                return !!e;
            },
            fireWith: function(a, c) {
                return e || (c = c || [], c = [ a, c.slice ? c.slice() : c ], h.push(c), b || j()), 
                this;
            },
            fire: function() {
                return k.fireWith(this, arguments), this;
            },
            fired: function() {
                return !!d;
            }
        };
        return k;
    }, oa.extend({
        Deferred: function(b) {
            var c = [ [ "notify", "progress", oa.Callbacks("memory"), oa.Callbacks("memory"), 2 ], [ "resolve", "done", oa.Callbacks("once memory"), oa.Callbacks("once memory"), 0, "resolved" ], [ "reject", "fail", oa.Callbacks("once memory"), oa.Callbacks("once memory"), 1, "rejected" ] ], d = "pending", e = {
                state: function() {
                    return d;
                },
                always: function() {
                    return f.done(arguments).fail(arguments), this;
                },
                catch: function(a) {
                    return e.then(null, a);
                },
                pipe: function() {
                    var a = arguments;
                    return oa.Deferred(function(b) {
                        oa.each(c, function(c, d) {
                            var e = oa.isFunction(a[d[4]]) && a[d[4]];
                            f[d[1]](function() {
                                var a = e && e.apply(this, arguments);
                                a && oa.isFunction(a.promise) ? a.promise().progress(b.notify).done(b.resolve).fail(b.reject) : b[d[0] + "With"](this, e ? [ a ] : arguments);
                            });
                        }), a = null;
                    }).promise();
                },
                then: function(b, d, e) {
                    function f(b, c, d, e) {
                        return function() {
                            var j = this, k = arguments, l = function() {
                                var a, l;
                                if (!(b < g)) {
                                    if ((a = d.apply(j, k)) === c.promise()) throw new TypeError("Thenable self-resolution");
                                    l = a && ("object" == typeof a || "function" == typeof a) && a.then, oa.isFunction(l) ? e ? l.call(a, f(g, c, h, e), f(g, c, i, e)) : (g++, 
                                    l.call(a, f(g, c, h, e), f(g, c, i, e), f(g, c, h, c.notifyWith))) : (d !== h && (j = void 0, 
                                    k = [ a ]), (e || c.resolveWith)(j, k));
                                }
                            }, m = e ? l : function() {
                                try {
                                    l();
                                } catch (a) {
                                    oa.Deferred.exceptionHook && oa.Deferred.exceptionHook(a, m.stackTrace), b + 1 >= g && (d !== i && (j = void 0, 
                                    k = [ a ]), c.rejectWith(j, k));
                                }
                            };
                            b ? m() : (oa.Deferred.getStackHook && (m.stackTrace = oa.Deferred.getStackHook()), 
                            a.setTimeout(m));
                        };
                    }
                    var g = 0;
                    return oa.Deferred(function(a) {
                        c[0][3].add(f(0, a, oa.isFunction(e) ? e : h, a.notifyWith)), c[1][3].add(f(0, a, oa.isFunction(b) ? b : h)), 
                        c[2][3].add(f(0, a, oa.isFunction(d) ? d : i));
                    }).promise();
                },
                promise: function(a) {
                    return null != a ? oa.extend(a, e) : e;
                }
            }, f = {};
            return oa.each(c, function(a, b) {
                var g = b[2], h = b[5];
                e[b[1]] = g.add, h && g.add(function() {
                    d = h;
                }, c[3 - a][2].disable, c[0][2].lock), g.add(b[3].fire), f[b[0]] = function() {
                    return f[b[0] + "With"](this === f ? void 0 : this, arguments), this;
                }, f[b[0] + "With"] = g.fireWith;
            }), e.promise(f), b && b.call(f, f), f;
        },
        when: function(a) {
            var b = arguments.length, c = b, d = Array(c), e = da.call(arguments), f = oa.Deferred(), g = function(a) {
                return function(c) {
                    d[a] = this, e[a] = arguments.length > 1 ? da.call(arguments) : c, --b || f.resolveWith(d, e);
                };
            };
            if (b <= 1 && (j(a, f.done(g(c)).resolve, f.reject), "pending" === f.state() || oa.isFunction(e[c] && e[c].then))) return f.then();
            for (;c--; ) j(e[c], g(c), f.reject);
            return f.promise();
        }
    });
    var Ea = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    oa.Deferred.exceptionHook = function(b, c) {
        a.console && a.console.warn && b && Ea.test(b.name) && a.console.warn("jQuery.Deferred exception: " + b.message, b.stack, c);
    }, oa.readyException = function(b) {
        a.setTimeout(function() {
            throw b;
        });
    };
    var Fa = oa.Deferred();
    oa.fn.ready = function(a) {
        return Fa.then(a).catch(function(a) {
            oa.readyException(a);
        }), this;
    }, oa.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(a) {
            a ? oa.readyWait++ : oa.ready(!0);
        },
        ready: function(a) {
            (!0 === a ? --oa.readyWait : oa.isReady) || (oa.isReady = !0, !0 !== a && --oa.readyWait > 0 || Fa.resolveWith(ba, [ oa ]));
        }
    }), oa.ready.then = Fa.then, "complete" === ba.readyState || "loading" !== ba.readyState && !ba.documentElement.doScroll ? a.setTimeout(oa.ready) : (ba.addEventListener("DOMContentLoaded", k), 
    a.addEventListener("load", k));
    var Ga = function(a, b, c, d, e, f, g) {
        var h = 0, i = a.length, j = null == c;
        if ("object" === oa.type(c)) {
            e = !0;
            for (h in c) Ga(a, b, h, c[h], !0, f, g);
        } else if (void 0 !== d && (e = !0, oa.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), 
        b = null) : (j = b, b = function(a, b, c) {
            return j.call(oa(a), c);
        })), b)) for (;h < i; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
        return e ? a : j ? b.call(a) : i ? b(a[0], c) : f;
    }, Ha = function(a) {
        return 1 === a.nodeType || 9 === a.nodeType || !+a.nodeType;
    };
    l.uid = 1, l.prototype = {
        cache: function(a) {
            var b = a[this.expando];
            return b || (b = {}, Ha(a) && (a.nodeType ? a[this.expando] = b : Object.defineProperty(a, this.expando, {
                value: b,
                configurable: !0
            }))), b;
        },
        set: function(a, b, c) {
            var d, e = this.cache(a);
            if ("string" == typeof b) e[oa.camelCase(b)] = c; else for (d in b) e[oa.camelCase(d)] = b[d];
            return e;
        },
        get: function(a, b) {
            return void 0 === b ? this.cache(a) : a[this.expando] && a[this.expando][oa.camelCase(b)];
        },
        access: function(a, b, c) {
            return void 0 === b || b && "string" == typeof b && void 0 === c ? this.get(a, b) : (this.set(a, b, c), 
            void 0 !== c ? c : b);
        },
        remove: function(a, b) {
            var c, d = a[this.expando];
            if (void 0 !== d) {
                if (void 0 !== b) {
                    oa.isArray(b) ? b = b.map(oa.camelCase) : (b = oa.camelCase(b), b = b in d ? [ b ] : b.match(Da) || []), 
                    c = b.length;
                    for (;c--; ) delete d[b[c]];
                }
                (void 0 === b || oa.isEmptyObject(d)) && (a.nodeType ? a[this.expando] = void 0 : delete a[this.expando]);
            }
        },
        hasData: function(a) {
            var b = a[this.expando];
            return void 0 !== b && !oa.isEmptyObject(b);
        }
    };
    var Ia = new l(), Ja = new l(), Ka = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, La = /[A-Z]/g;
    oa.extend({
        hasData: function(a) {
            return Ja.hasData(a) || Ia.hasData(a);
        },
        data: function(a, b, c) {
            return Ja.access(a, b, c);
        },
        removeData: function(a, b) {
            Ja.remove(a, b);
        },
        _data: function(a, b, c) {
            return Ia.access(a, b, c);
        },
        _removeData: function(a, b) {
            Ia.remove(a, b);
        }
    }), oa.fn.extend({
        data: function(a, b) {
            var c, d, e, f = this[0], g = f && f.attributes;
            if (void 0 === a) {
                if (this.length && (e = Ja.get(f), 1 === f.nodeType && !Ia.get(f, "hasDataAttrs"))) {
                    for (c = g.length; c--; ) g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = oa.camelCase(d.slice(5)), 
                    n(f, d, e[d])));
                    Ia.set(f, "hasDataAttrs", !0);
                }
                return e;
            }
            return "object" == typeof a ? this.each(function() {
                Ja.set(this, a);
            }) : Ga(this, function(b) {
                var c;
                if (f && void 0 === b) {
                    if (void 0 !== (c = Ja.get(f, a))) return c;
                    if (void 0 !== (c = n(f, a))) return c;
                } else this.each(function() {
                    Ja.set(this, a, b);
                });
            }, null, b, arguments.length > 1, null, !0);
        },
        removeData: function(a) {
            return this.each(function() {
                Ja.remove(this, a);
            });
        }
    }), oa.extend({
        queue: function(a, b, c) {
            var d;
            if (a) return b = (b || "fx") + "queue", d = Ia.get(a, b), c && (!d || oa.isArray(c) ? d = Ia.access(a, b, oa.makeArray(c)) : d.push(c)), 
            d || [];
        },
        dequeue: function(a, b) {
            b = b || "fx";
            var c = oa.queue(a, b), d = c.length, e = c.shift(), f = oa._queueHooks(a, b), g = function() {
                oa.dequeue(a, b);
            };
            "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), 
            delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire();
        },
        _queueHooks: function(a, b) {
            var c = b + "queueHooks";
            return Ia.get(a, c) || Ia.access(a, c, {
                empty: oa.Callbacks("once memory").add(function() {
                    Ia.remove(a, [ b + "queue", c ]);
                })
            });
        }
    }), oa.fn.extend({
        queue: function(a, b) {
            var c = 2;
            return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? oa.queue(this[0], a) : void 0 === b ? this : this.each(function() {
                var c = oa.queue(this, a, b);
                oa._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && oa.dequeue(this, a);
            });
        },
        dequeue: function(a) {
            return this.each(function() {
                oa.dequeue(this, a);
            });
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", []);
        },
        promise: function(a, b) {
            var c, d = 1, e = oa.Deferred(), f = this, g = this.length, h = function() {
                --d || e.resolveWith(f, [ f ]);
            };
            for ("string" != typeof a && (b = a, a = void 0), a = a || "fx"; g--; ) (c = Ia.get(f[g], a + "queueHooks")) && c.empty && (d++, 
            c.empty.add(h));
            return h(), e.promise(b);
        }
    });
    var Ma = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, Na = new RegExp("^(?:([+-])=|)(" + Ma + ")([a-z%]*)$", "i"), Oa = [ "Top", "Right", "Bottom", "Left" ], Pa = function(a, b) {
        return a = b || a, "none" === a.style.display || "" === a.style.display && oa.contains(a.ownerDocument, a) && "none" === oa.css(a, "display");
    }, Qa = function(a, b, c, d) {
        var e, f, g = {};
        for (f in b) g[f] = a.style[f], a.style[f] = b[f];
        e = c.apply(a, d || []);
        for (f in b) a.style[f] = g[f];
        return e;
    }, Ra = {};
    oa.fn.extend({
        show: function() {
            return q(this, !0);
        },
        hide: function() {
            return q(this);
        },
        toggle: function(a) {
            return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function() {
                Pa(this) ? oa(this).show() : oa(this).hide();
            });
        }
    });
    var Sa = /^(?:checkbox|radio)$/i, Ta = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i, Ua = /^$|\/(?:java|ecma)script/i, Va = {
        option: [ 1, "<select multiple='multiple'>", "</select>" ],
        thead: [ 1, "<table>", "</table>" ],
        col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        _default: [ 0, "", "" ]
    };
    Va.optgroup = Va.option, Va.tbody = Va.tfoot = Va.colgroup = Va.caption = Va.thead, 
    Va.th = Va.td;
    var Wa = /<|&#?\w+;/;
    !function() {
        var a = ba.createDocumentFragment(), b = a.appendChild(ba.createElement("div")), c = ba.createElement("input");
        c.setAttribute("type", "radio"), c.setAttribute("checked", "checked"), c.setAttribute("name", "t"), 
        b.appendChild(c), ma.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, 
        b.innerHTML = "<textarea>x</textarea>", ma.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue;
    }();
    var Xa = ba.documentElement, Ya = /^key/, Za = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, $a = /^([^.]*)(?:\.(.+)|)/;
    oa.event = {
        global: {},
        add: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, n, o, p, q = Ia.get(a);
            if (q) for (c.handler && (f = c, c = f.handler, e = f.selector), e && oa.find.matchesSelector(Xa, e), 
            c.guid || (c.guid = oa.guid++), (i = q.events) || (i = q.events = {}), (g = q.handle) || (g = q.handle = function(b) {
                return void 0 !== oa && oa.event.triggered !== b.type ? oa.event.dispatch.apply(a, arguments) : void 0;
            }), b = (b || "").match(Da) || [ "" ], j = b.length; j--; ) h = $a.exec(b[j]) || [], 
            n = p = h[1], o = (h[2] || "").split(".").sort(), n && (l = oa.event.special[n] || {}, 
            n = (e ? l.delegateType : l.bindType) || n, l = oa.event.special[n] || {}, k = oa.extend({
                type: n,
                origType: p,
                data: d,
                handler: c,
                guid: c.guid,
                selector: e,
                needsContext: e && oa.expr.match.needsContext.test(e),
                namespace: o.join(".")
            }, f), (m = i[n]) || (m = i[n] = [], m.delegateCount = 0, l.setup && !1 !== l.setup.call(a, d, o, g) || a.addEventListener && a.addEventListener(n, g)), 
            l.add && (l.add.call(a, k), k.handler.guid || (k.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, k) : m.push(k), 
            oa.event.global[n] = !0);
        },
        remove: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, n, o, p, q = Ia.hasData(a) && Ia.get(a);
            if (q && (i = q.events)) {
                for (b = (b || "").match(Da) || [ "" ], j = b.length; j--; ) if (h = $a.exec(b[j]) || [], 
                n = p = h[1], o = (h[2] || "").split(".").sort(), n) {
                    for (l = oa.event.special[n] || {}, n = (d ? l.delegateType : l.bindType) || n, 
                    m = i[n] || [], h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), 
                    g = f = m.length; f--; ) k = m[f], !e && p !== k.origType || c && c.guid !== k.guid || h && !h.test(k.namespace) || d && d !== k.selector && ("**" !== d || !k.selector) || (m.splice(f, 1), 
                    k.selector && m.delegateCount--, l.remove && l.remove.call(a, k));
                    g && !m.length && (l.teardown && !1 !== l.teardown.call(a, o, q.handle) || oa.removeEvent(a, n, q.handle), 
                    delete i[n]);
                } else for (n in i) oa.event.remove(a, n + b[j], c, d, !0);
                oa.isEmptyObject(i) && Ia.remove(a, "handle events");
            }
        },
        dispatch: function(a) {
            var b, c, d, e, f, g, h = oa.event.fix(a), i = new Array(arguments.length), j = (Ia.get(this, "events") || {})[h.type] || [], k = oa.event.special[h.type] || {};
            for (i[0] = h, b = 1; b < arguments.length; b++) i[b] = arguments[b];
            if (h.delegateTarget = this, !k.preDispatch || !1 !== k.preDispatch.call(this, h)) {
                for (g = oa.event.handlers.call(this, h, j), b = 0; (e = g[b++]) && !h.isPropagationStopped(); ) for (h.currentTarget = e.elem, 
                c = 0; (f = e.handlers[c++]) && !h.isImmediatePropagationStopped(); ) h.rnamespace && !h.rnamespace.test(f.namespace) || (h.handleObj = f, 
                h.data = f.data, void 0 !== (d = ((oa.event.special[f.origType] || {}).handle || f.handler).apply(e.elem, i)) && !1 === (h.result = d) && (h.preventDefault(), 
                h.stopPropagation()));
                return k.postDispatch && k.postDispatch.call(this, h), h.result;
            }
        },
        handlers: function(a, b) {
            var c, d, e, f, g, h = [], i = b.delegateCount, j = a.target;
            if (i && j.nodeType && !("click" === a.type && a.button >= 1)) for (;j !== this; j = j.parentNode || this) if (1 === j.nodeType && ("click" !== a.type || !0 !== j.disabled)) {
                for (f = [], g = {}, c = 0; c < i; c++) d = b[c], e = d.selector + " ", void 0 === g[e] && (g[e] = d.needsContext ? oa(e, this).index(j) > -1 : oa.find(e, this, null, [ j ]).length), 
                g[e] && f.push(d);
                f.length && h.push({
                    elem: j,
                    handlers: f
                });
            }
            return j = this, i < b.length && h.push({
                elem: j,
                handlers: b.slice(i)
            }), h;
        },
        addProp: function(a, b) {
            Object.defineProperty(oa.Event.prototype, a, {
                enumerable: !0,
                configurable: !0,
                get: oa.isFunction(b) ? function() {
                    if (this.originalEvent) return b(this.originalEvent);
                } : function() {
                    if (this.originalEvent) return this.originalEvent[a];
                },
                set: function(b) {
                    Object.defineProperty(this, a, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: b
                    });
                }
            });
        },
        fix: function(a) {
            return a[oa.expando] ? a : new oa.Event(a);
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== w() && this.focus) return this.focus(), !1;
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === w() && this.blur) return this.blur(), !1;
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if ("checkbox" === this.type && this.click && oa.nodeName(this, "input")) return this.click(), 
                    !1;
                },
                _default: function(a) {
                    return oa.nodeName(a.target, "a");
                }
            },
            beforeunload: {
                postDispatch: function(a) {
                    void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result);
                }
            }
        }
    }, oa.removeEvent = function(a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c);
    }, oa.Event = function(a, b) {
        return this instanceof oa.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, 
        this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && !1 === a.returnValue ? u : v, 
        this.target = a.target && 3 === a.target.nodeType ? a.target.parentNode : a.target, 
        this.currentTarget = a.currentTarget, this.relatedTarget = a.relatedTarget) : this.type = a, 
        b && oa.extend(this, b), this.timeStamp = a && a.timeStamp || oa.now(), void (this[oa.expando] = !0)) : new oa.Event(a, b);
    }, oa.Event.prototype = {
        constructor: oa.Event,
        isDefaultPrevented: v,
        isPropagationStopped: v,
        isImmediatePropagationStopped: v,
        isSimulated: !1,
        preventDefault: function() {
            var a = this.originalEvent;
            this.isDefaultPrevented = u, a && !this.isSimulated && a.preventDefault();
        },
        stopPropagation: function() {
            var a = this.originalEvent;
            this.isPropagationStopped = u, a && !this.isSimulated && a.stopPropagation();
        },
        stopImmediatePropagation: function() {
            var a = this.originalEvent;
            this.isImmediatePropagationStopped = u, a && !this.isSimulated && a.stopImmediatePropagation(), 
            this.stopPropagation();
        }
    }, oa.each({
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        char: !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: function(a) {
            var b = a.button;
            return null == a.which && Ya.test(a.type) ? null != a.charCode ? a.charCode : a.keyCode : !a.which && void 0 !== b && Za.test(a.type) ? 1 & b ? 1 : 2 & b ? 3 : 4 & b ? 2 : 0 : a.which;
        }
    }, oa.event.addProp), oa.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(a, b) {
        oa.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function(a) {
                var c, d = this, e = a.relatedTarget, f = a.handleObj;
                return e && (e === d || oa.contains(d, e)) || (a.type = f.origType, c = f.handler.apply(this, arguments), 
                a.type = b), c;
            }
        };
    }), oa.fn.extend({
        on: function(a, b, c, d) {
            return x(this, a, b, c, d);
        },
        one: function(a, b, c, d) {
            return x(this, a, b, c, d, 1);
        },
        off: function(a, b, c) {
            var d, e;
            if (a && a.preventDefault && a.handleObj) return d = a.handleObj, oa(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), 
            this;
            if ("object" == typeof a) {
                for (e in a) this.off(e, b, a[e]);
                return this;
            }
            return !1 !== b && "function" != typeof b || (c = b, b = void 0), !1 === c && (c = v), 
            this.each(function() {
                oa.event.remove(this, a, c, b);
            });
        }
    });
    var _a = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi, ab = /<script|<style|<link/i, bb = /checked\s*(?:[^=]|=\s*.checked.)/i, cb = /^true\/(.*)/, db = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    oa.extend({
        htmlPrefilter: function(a) {
            return a.replace(_a, "<$1></$2>");
        },
        clone: function(a, b, c) {
            var d, e, f, g, h = a.cloneNode(!0), i = oa.contains(a.ownerDocument, a);
            if (!(ma.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || oa.isXMLDoc(a))) for (g = r(h), 
            f = r(a), d = 0, e = f.length; d < e; d++) C(f[d], g[d]);
            if (b) if (c) for (f = f || r(a), g = g || r(h), d = 0, e = f.length; d < e; d++) B(f[d], g[d]); else B(a, h);
            return g = r(h, "script"), g.length > 0 && s(g, !i && r(a, "script")), h;
        },
        cleanData: function(a) {
            for (var b, c, d, e = oa.event.special, f = 0; void 0 !== (c = a[f]); f++) if (Ha(c)) {
                if (b = c[Ia.expando]) {
                    if (b.events) for (d in b.events) e[d] ? oa.event.remove(c, d) : oa.removeEvent(c, d, b.handle);
                    c[Ia.expando] = void 0;
                }
                c[Ja.expando] && (c[Ja.expando] = void 0);
            }
        }
    }), oa.fn.extend({
        detach: function(a) {
            return E(this, a, !0);
        },
        remove: function(a) {
            return E(this, a);
        },
        text: function(a) {
            return Ga(this, function(a) {
                return void 0 === a ? oa.text(this) : this.empty().each(function() {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = a);
                });
            }, null, a, arguments.length);
        },
        append: function() {
            return D(this, arguments, function(a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    y(this, a).appendChild(a);
                }
            });
        },
        prepend: function() {
            return D(this, arguments, function(a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = y(this, a);
                    b.insertBefore(a, b.firstChild);
                }
            });
        },
        before: function() {
            return D(this, arguments, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this);
            });
        },
        after: function() {
            return D(this, arguments, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this.nextSibling);
            });
        },
        empty: function() {
            for (var a, b = 0; null != (a = this[b]); b++) 1 === a.nodeType && (oa.cleanData(r(a, !1)), 
            a.textContent = "");
            return this;
        },
        clone: function(a, b) {
            return a = null != a && a, b = null == b ? a : b, this.map(function() {
                return oa.clone(this, a, b);
            });
        },
        html: function(a) {
            return Ga(this, function(a) {
                var b = this[0] || {}, c = 0, d = this.length;
                if (void 0 === a && 1 === b.nodeType) return b.innerHTML;
                if ("string" == typeof a && !ab.test(a) && !Va[(Ta.exec(a) || [ "", "" ])[1].toLowerCase()]) {
                    a = oa.htmlPrefilter(a);
                    try {
                        for (;c < d; c++) b = this[c] || {}, 1 === b.nodeType && (oa.cleanData(r(b, !1)), 
                        b.innerHTML = a);
                        b = 0;
                    } catch (a) {}
                }
                b && this.empty().append(a);
            }, null, a, arguments.length);
        },
        replaceWith: function() {
            var a = [];
            return D(this, arguments, function(b) {
                var c = this.parentNode;
                oa.inArray(this, a) < 0 && (oa.cleanData(r(this)), c && c.replaceChild(b, this));
            }, a);
        }
    }), oa.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(a, b) {
        oa.fn[a] = function(a) {
            for (var c, d = [], e = oa(a), f = e.length - 1, g = 0; g <= f; g++) c = g === f ? this : this.clone(!0), 
            oa(e[g])[b](c), fa.apply(d, c.get());
            return this.pushStack(d);
        };
    });
    var eb = /^margin/, fb = new RegExp("^(" + Ma + ")(?!px)[a-z%]+$", "i"), gb = function(b) {
        var c = b.ownerDocument.defaultView;
        return c && c.opener || (c = a), c.getComputedStyle(b);
    };
    !function() {
        function b() {
            if (h) {
                h.style.cssText = "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", 
                h.innerHTML = "", Xa.appendChild(g);
                var b = a.getComputedStyle(h);
                c = "1%" !== b.top, f = "2px" === b.marginLeft, d = "4px" === b.width, h.style.marginRight = "50%", 
                e = "4px" === b.marginRight, Xa.removeChild(g), h = null;
            }
        }
        var c, d, e, f, g = ba.createElement("div"), h = ba.createElement("div");
        h.style && (h.style.backgroundClip = "content-box", h.cloneNode(!0).style.backgroundClip = "", 
        ma.clearCloneStyle = "content-box" === h.style.backgroundClip, g.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", 
        g.appendChild(h), oa.extend(ma, {
            pixelPosition: function() {
                return b(), c;
            },
            boxSizingReliable: function() {
                return b(), d;
            },
            pixelMarginRight: function() {
                return b(), e;
            },
            reliableMarginLeft: function() {
                return b(), f;
            }
        }));
    }();
    var hb = /^(none|table(?!-c[ea]).+)/, ib = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, jb = {
        letterSpacing: "0",
        fontWeight: "400"
    }, kb = [ "Webkit", "Moz", "ms" ], lb = ba.createElement("div").style;
    oa.extend({
        cssHooks: {
            opacity: {
                get: function(a, b) {
                    if (b) {
                        var c = F(a, "opacity");
                        return "" === c ? "1" : c;
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            float: "cssFloat"
        },
        style: function(a, b, c, d) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var e, f, g, h = oa.camelCase(b), i = a.style;
                return b = oa.cssProps[h] || (oa.cssProps[h] = H(h) || h), g = oa.cssHooks[b] || oa.cssHooks[h], 
                void 0 === c ? g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b] : (f = typeof c, 
                "string" === f && (e = Na.exec(c)) && e[1] && (c = o(a, b, e), f = "number"), void (null != c && c === c && ("number" === f && (c += e && e[3] || (oa.cssNumber[h] ? "" : "px")), 
                ma.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), 
                g && "set" in g && void 0 === (c = g.set(a, c, d)) || (i[b] = c))));
            }
        },
        css: function(a, b, c, d) {
            var e, f, g, h = oa.camelCase(b);
            return b = oa.cssProps[h] || (oa.cssProps[h] = H(h) || h), g = oa.cssHooks[b] || oa.cssHooks[h], 
            g && "get" in g && (e = g.get(a, !0, c)), void 0 === e && (e = F(a, b, d)), "normal" === e && b in jb && (e = jb[b]), 
            "" === c || c ? (f = parseFloat(e), !0 === c || isFinite(f) ? f || 0 : e) : e;
        }
    }), oa.each([ "height", "width" ], function(a, b) {
        oa.cssHooks[b] = {
            get: function(a, c, d) {
                if (c) return !hb.test(oa.css(a, "display")) || a.getClientRects().length && a.getBoundingClientRect().width ? K(a, b, d) : Qa(a, ib, function() {
                    return K(a, b, d);
                });
            },
            set: function(a, c, d) {
                var e, f = d && gb(a), g = d && J(a, b, d, "border-box" === oa.css(a, "boxSizing", !1, f), f);
                return g && (e = Na.exec(c)) && "px" !== (e[3] || "px") && (a.style[b] = c, c = oa.css(a, b)), 
                I(a, c, g);
            }
        };
    }), oa.cssHooks.marginLeft = G(ma.reliableMarginLeft, function(a, b) {
        if (b) return (parseFloat(F(a, "marginLeft")) || a.getBoundingClientRect().left - Qa(a, {
            marginLeft: 0
        }, function() {
            return a.getBoundingClientRect().left;
        })) + "px";
    }), oa.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(a, b) {
        oa.cssHooks[a + b] = {
            expand: function(c) {
                for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [ c ]; d < 4; d++) e[a + Oa[d] + b] = f[d] || f[d - 2] || f[0];
                return e;
            }
        }, eb.test(a) || (oa.cssHooks[a + b].set = I);
    }), oa.fn.extend({
        css: function(a, b) {
            return Ga(this, function(a, b, c) {
                var d, e, f = {}, g = 0;
                if (oa.isArray(b)) {
                    for (d = gb(a), e = b.length; g < e; g++) f[b[g]] = oa.css(a, b[g], !1, d);
                    return f;
                }
                return void 0 !== c ? oa.style(a, b, c) : oa.css(a, b);
            }, a, b, arguments.length > 1);
        }
    }), oa.Tween = L, L.prototype = {
        constructor: L,
        init: function(a, b, c, d, e, f) {
            this.elem = a, this.prop = c, this.easing = e || oa.easing._default, this.options = b, 
            this.start = this.now = this.cur(), this.end = d, this.unit = f || (oa.cssNumber[c] ? "" : "px");
        },
        cur: function() {
            var a = L.propHooks[this.prop];
            return a && a.get ? a.get(this) : L.propHooks._default.get(this);
        },
        run: function(a) {
            var b, c = L.propHooks[this.prop];
            return this.options.duration ? this.pos = b = oa.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a, 
            this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), 
            c && c.set ? c.set(this) : L.propHooks._default.set(this), this;
        }
    }, L.prototype.init.prototype = L.prototype, L.propHooks = {
        _default: {
            get: function(a) {
                var b;
                return 1 !== a.elem.nodeType || null != a.elem[a.prop] && null == a.elem.style[a.prop] ? a.elem[a.prop] : (b = oa.css(a.elem, a.prop, ""), 
                b && "auto" !== b ? b : 0);
            },
            set: function(a) {
                oa.fx.step[a.prop] ? oa.fx.step[a.prop](a) : 1 !== a.elem.nodeType || null == a.elem.style[oa.cssProps[a.prop]] && !oa.cssHooks[a.prop] ? a.elem[a.prop] = a.now : oa.style(a.elem, a.prop, a.now + a.unit);
            }
        }
    }, L.propHooks.scrollTop = L.propHooks.scrollLeft = {
        set: function(a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now);
        }
    }, oa.easing = {
        linear: function(a) {
            return a;
        },
        swing: function(a) {
            return .5 - Math.cos(a * Math.PI) / 2;
        },
        _default: "swing"
    }, oa.fx = L.prototype.init, oa.fx.step = {};
    var mb, nb, ob = /^(?:toggle|show|hide)$/, pb = /queueHooks$/;
    oa.Animation = oa.extend(S, {
        tweeners: {
            "*": [ function(a, b) {
                var c = this.createTween(a, b);
                return o(c.elem, a, Na.exec(b), c), c;
            } ]
        },
        tweener: function(a, b) {
            oa.isFunction(a) ? (b = a, a = [ "*" ]) : a = a.match(Da);
            for (var c, d = 0, e = a.length; d < e; d++) c = a[d], S.tweeners[c] = S.tweeners[c] || [], 
            S.tweeners[c].unshift(b);
        },
        prefilters: [ Q ],
        prefilter: function(a, b) {
            b ? S.prefilters.unshift(a) : S.prefilters.push(a);
        }
    }), oa.speed = function(a, b, c) {
        var d = a && "object" == typeof a ? oa.extend({}, a) : {
            complete: c || !c && b || oa.isFunction(a) && a,
            duration: a,
            easing: c && b || b && !oa.isFunction(b) && b
        };
        return oa.fx.off || ba.hidden ? d.duration = 0 : "number" != typeof d.duration && (d.duration in oa.fx.speeds ? d.duration = oa.fx.speeds[d.duration] : d.duration = oa.fx.speeds._default), 
        null != d.queue && !0 !== d.queue || (d.queue = "fx"), d.old = d.complete, d.complete = function() {
            oa.isFunction(d.old) && d.old.call(this), d.queue && oa.dequeue(this, d.queue);
        }, d;
    }, oa.fn.extend({
        fadeTo: function(a, b, c, d) {
            return this.filter(Pa).css("opacity", 0).show().end().animate({
                opacity: b
            }, a, c, d);
        },
        animate: function(a, b, c, d) {
            var e = oa.isEmptyObject(a), f = oa.speed(b, c, d), g = function() {
                var b = S(this, oa.extend({}, a), f);
                (e || Ia.get(this, "finish")) && b.stop(!0);
            };
            return g.finish = g, e || !1 === f.queue ? this.each(g) : this.queue(f.queue, g);
        },
        stop: function(a, b, c) {
            var d = function(a) {
                var b = a.stop;
                delete a.stop, b(c);
            };
            return "string" != typeof a && (c = b, b = a, a = void 0), b && !1 !== a && this.queue(a || "fx", []), 
            this.each(function() {
                var b = !0, e = null != a && a + "queueHooks", f = oa.timers, g = Ia.get(this);
                if (e) g[e] && g[e].stop && d(g[e]); else for (e in g) g[e] && g[e].stop && pb.test(e) && d(g[e]);
                for (e = f.length; e--; ) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), 
                b = !1, f.splice(e, 1));
                !b && c || oa.dequeue(this, a);
            });
        },
        finish: function(a) {
            return !1 !== a && (a = a || "fx"), this.each(function() {
                var b, c = Ia.get(this), d = c[a + "queue"], e = c[a + "queueHooks"], f = oa.timers, g = d ? d.length : 0;
                for (c.finish = !0, oa.queue(this, a, []), e && e.stop && e.stop.call(this, !0), 
                b = f.length; b--; ) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), 
                f.splice(b, 1));
                for (b = 0; b < g; b++) d[b] && d[b].finish && d[b].finish.call(this);
                delete c.finish;
            });
        }
    }), oa.each([ "toggle", "show", "hide" ], function(a, b) {
        var c = oa.fn[b];
        oa.fn[b] = function(a, d, e) {
            return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(O(b, !0), a, d, e);
        };
    }), oa.each({
        slideDown: O("show"),
        slideUp: O("hide"),
        slideToggle: O("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(a, b) {
        oa.fn[a] = function(a, c, d) {
            return this.animate(b, a, c, d);
        };
    }), oa.timers = [], oa.fx.tick = function() {
        var a, b = 0, c = oa.timers;
        for (mb = oa.now(); b < c.length; b++) (a = c[b])() || c[b] !== a || c.splice(b--, 1);
        c.length || oa.fx.stop(), mb = void 0;
    }, oa.fx.timer = function(a) {
        oa.timers.push(a), a() ? oa.fx.start() : oa.timers.pop();
    }, oa.fx.interval = 13, oa.fx.start = function() {
        nb || (nb = a.requestAnimationFrame ? a.requestAnimationFrame(M) : a.setInterval(oa.fx.tick, oa.fx.interval));
    }, oa.fx.stop = function() {
        a.cancelAnimationFrame ? a.cancelAnimationFrame(nb) : a.clearInterval(nb), nb = null;
    }, oa.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, oa.fn.delay = function(b, c) {
        return b = oa.fx ? oa.fx.speeds[b] || b : b, c = c || "fx", this.queue(c, function(c, d) {
            var e = a.setTimeout(c, b);
            d.stop = function() {
                a.clearTimeout(e);
            };
        });
    }, function() {
        var a = ba.createElement("input"), b = ba.createElement("select"), c = b.appendChild(ba.createElement("option"));
        a.type = "checkbox", ma.checkOn = "" !== a.value, ma.optSelected = c.selected, a = ba.createElement("input"), 
        a.value = "t", a.type = "radio", ma.radioValue = "t" === a.value;
    }();
    var qb, rb = oa.expr.attrHandle;
    oa.fn.extend({
        attr: function(a, b) {
            return Ga(this, oa.attr, a, b, arguments.length > 1);
        },
        removeAttr: function(a) {
            return this.each(function() {
                oa.removeAttr(this, a);
            });
        }
    }), oa.extend({
        attr: function(a, b, c) {
            var d, e, f = a.nodeType;
            if (3 !== f && 8 !== f && 2 !== f) return void 0 === a.getAttribute ? oa.prop(a, b, c) : (1 === f && oa.isXMLDoc(a) || (e = oa.attrHooks[b.toLowerCase()] || (oa.expr.match.bool.test(b) ? qb : void 0)), 
            void 0 !== c ? null === c ? void oa.removeAttr(a, b) : e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : (a.setAttribute(b, c + ""), 
            c) : e && "get" in e && null !== (d = e.get(a, b)) ? d : (d = oa.find.attr(a, b), 
            null == d ? void 0 : d));
        },
        attrHooks: {
            type: {
                set: function(a, b) {
                    if (!ma.radioValue && "radio" === b && oa.nodeName(a, "input")) {
                        var c = a.value;
                        return a.setAttribute("type", b), c && (a.value = c), b;
                    }
                }
            }
        },
        removeAttr: function(a, b) {
            var c, d = 0, e = b && b.match(Da);
            if (e && 1 === a.nodeType) for (;c = e[d++]; ) a.removeAttribute(c);
        }
    }), qb = {
        set: function(a, b, c) {
            return !1 === b ? oa.removeAttr(a, c) : a.setAttribute(c, c), c;
        }
    }, oa.each(oa.expr.match.bool.source.match(/\w+/g), function(a, b) {
        var c = rb[b] || oa.find.attr;
        rb[b] = function(a, b, d) {
            var e, f, g = b.toLowerCase();
            return d || (f = rb[g], rb[g] = e, e = null != c(a, b, d) ? g : null, rb[g] = f), 
            e;
        };
    });
    var sb = /^(?:input|select|textarea|button)$/i, tb = /^(?:a|area)$/i;
    oa.fn.extend({
        prop: function(a, b) {
            return Ga(this, oa.prop, a, b, arguments.length > 1);
        },
        removeProp: function(a) {
            return this.each(function() {
                delete this[oa.propFix[a] || a];
            });
        }
    }), oa.extend({
        prop: function(a, b, c) {
            var d, e, f = a.nodeType;
            if (3 !== f && 8 !== f && 2 !== f) return 1 === f && oa.isXMLDoc(a) || (b = oa.propFix[b] || b, 
            e = oa.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b];
        },
        propHooks: {
            tabIndex: {
                get: function(a) {
                    var b = oa.find.attr(a, "tabindex");
                    return b ? parseInt(b, 10) : sb.test(a.nodeName) || tb.test(a.nodeName) && a.href ? 0 : -1;
                }
            }
        },
        propFix: {
            for: "htmlFor",
            class: "className"
        }
    }), ma.optSelected || (oa.propHooks.selected = {
        get: function(a) {
            var b = a.parentNode;
            return b && b.parentNode && b.parentNode.selectedIndex, null;
        },
        set: function(a) {
            var b = a.parentNode;
            b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex);
        }
    }), oa.each([ "tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable" ], function() {
        oa.propFix[this.toLowerCase()] = this;
    }), oa.fn.extend({
        addClass: function(a) {
            var b, c, d, e, f, g, h, i = 0;
            if (oa.isFunction(a)) return this.each(function(b) {
                oa(this).addClass(a.call(this, b, U(this)));
            });
            if ("string" == typeof a && a) for (b = a.match(Da) || []; c = this[i++]; ) if (e = U(c), 
            d = 1 === c.nodeType && " " + T(e) + " ") {
                for (g = 0; f = b[g++]; ) d.indexOf(" " + f + " ") < 0 && (d += f + " ");
                h = T(d), e !== h && c.setAttribute("class", h);
            }
            return this;
        },
        removeClass: function(a) {
            var b, c, d, e, f, g, h, i = 0;
            if (oa.isFunction(a)) return this.each(function(b) {
                oa(this).removeClass(a.call(this, b, U(this)));
            });
            if (!arguments.length) return this.attr("class", "");
            if ("string" == typeof a && a) for (b = a.match(Da) || []; c = this[i++]; ) if (e = U(c), 
            d = 1 === c.nodeType && " " + T(e) + " ") {
                for (g = 0; f = b[g++]; ) for (;d.indexOf(" " + f + " ") > -1; ) d = d.replace(" " + f + " ", " ");
                h = T(d), e !== h && c.setAttribute("class", h);
            }
            return this;
        },
        toggleClass: function(a, b) {
            var c = typeof a;
            return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : oa.isFunction(a) ? this.each(function(c) {
                oa(this).toggleClass(a.call(this, c, U(this), b), b);
            }) : this.each(function() {
                var b, d, e, f;
                if ("string" === c) for (d = 0, e = oa(this), f = a.match(Da) || []; b = f[d++]; ) e.hasClass(b) ? e.removeClass(b) : e.addClass(b); else void 0 !== a && "boolean" !== c || (b = U(this), 
                b && Ia.set(this, "__className__", b), this.setAttribute && this.setAttribute("class", b || !1 === a ? "" : Ia.get(this, "__className__") || ""));
            });
        },
        hasClass: function(a) {
            var b, c, d = 0;
            for (b = " " + a + " "; c = this[d++]; ) if (1 === c.nodeType && (" " + T(U(c)) + " ").indexOf(b) > -1) return !0;
            return !1;
        }
    });
    var ub = /\r/g;
    oa.fn.extend({
        val: function(a) {
            var b, c, d, e = this[0];
            return arguments.length ? (d = oa.isFunction(a), this.each(function(c) {
                var e;
                1 === this.nodeType && (e = d ? a.call(this, c, oa(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : oa.isArray(e) && (e = oa.map(e, function(a) {
                    return null == a ? "" : a + "";
                })), (b = oa.valHooks[this.type] || oa.valHooks[this.nodeName.toLowerCase()]) && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e));
            })) : e ? (b = oa.valHooks[e.type] || oa.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, 
            "string" == typeof c ? c.replace(ub, "") : null == c ? "" : c)) : void 0;
        }
    }), oa.extend({
        valHooks: {
            option: {
                get: function(a) {
                    var b = oa.find.attr(a, "value");
                    return null != b ? b : T(oa.text(a));
                }
            },
            select: {
                get: function(a) {
                    var b, c, d, e = a.options, f = a.selectedIndex, g = "select-one" === a.type, h = g ? null : [], i = g ? f + 1 : e.length;
                    for (d = f < 0 ? i : g ? f : 0; d < i; d++) if (c = e[d], (c.selected || d === f) && !c.disabled && (!c.parentNode.disabled || !oa.nodeName(c.parentNode, "optgroup"))) {
                        if (b = oa(c).val(), g) return b;
                        h.push(b);
                    }
                    return h;
                },
                set: function(a, b) {
                    for (var c, d, e = a.options, f = oa.makeArray(b), g = e.length; g--; ) d = e[g], 
                    (d.selected = oa.inArray(oa.valHooks.option.get(d), f) > -1) && (c = !0);
                    return c || (a.selectedIndex = -1), f;
                }
            }
        }
    }), oa.each([ "radio", "checkbox" ], function() {
        oa.valHooks[this] = {
            set: function(a, b) {
                if (oa.isArray(b)) return a.checked = oa.inArray(oa(a).val(), b) > -1;
            }
        }, ma.checkOn || (oa.valHooks[this].get = function(a) {
            return null === a.getAttribute("value") ? "on" : a.value;
        });
    });
    var vb = /^(?:focusinfocus|focusoutblur)$/;
    oa.extend(oa.event, {
        trigger: function(b, c, d, e) {
            var f, g, h, i, j, k, l, m = [ d || ba ], n = ja.call(b, "type") ? b.type : b, o = ja.call(b, "namespace") ? b.namespace.split(".") : [];
            if (g = h = d = d || ba, 3 !== d.nodeType && 8 !== d.nodeType && !vb.test(n + oa.event.triggered) && (n.indexOf(".") > -1 && (o = n.split("."), 
            n = o.shift(), o.sort()), j = n.indexOf(":") < 0 && "on" + n, b = b[oa.expando] ? b : new oa.Event(n, "object" == typeof b && b), 
            b.isTrigger = e ? 2 : 3, b.namespace = o.join("."), b.rnamespace = b.namespace ? new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, 
            b.result = void 0, b.target || (b.target = d), c = null == c ? [ b ] : oa.makeArray(c, [ b ]), 
            l = oa.event.special[n] || {}, e || !l.trigger || !1 !== l.trigger.apply(d, c))) {
                if (!e && !l.noBubble && !oa.isWindow(d)) {
                    for (i = l.delegateType || n, vb.test(i + n) || (g = g.parentNode); g; g = g.parentNode) m.push(g), 
                    h = g;
                    h === (d.ownerDocument || ba) && m.push(h.defaultView || h.parentWindow || a);
                }
                for (f = 0; (g = m[f++]) && !b.isPropagationStopped(); ) b.type = f > 1 ? i : l.bindType || n, 
                k = (Ia.get(g, "events") || {})[b.type] && Ia.get(g, "handle"), k && k.apply(g, c), 
                (k = j && g[j]) && k.apply && Ha(g) && (b.result = k.apply(g, c), !1 === b.result && b.preventDefault());
                return b.type = n, e || b.isDefaultPrevented() || l._default && !1 !== l._default.apply(m.pop(), c) || !Ha(d) || j && oa.isFunction(d[n]) && !oa.isWindow(d) && (h = d[j], 
                h && (d[j] = null), oa.event.triggered = n, d[n](), oa.event.triggered = void 0, 
                h && (d[j] = h)), b.result;
            }
        },
        simulate: function(a, b, c) {
            var d = oa.extend(new oa.Event(), c, {
                type: a,
                isSimulated: !0
            });
            oa.event.trigger(d, null, b);
        }
    }), oa.fn.extend({
        trigger: function(a, b) {
            return this.each(function() {
                oa.event.trigger(a, b, this);
            });
        },
        triggerHandler: function(a, b) {
            var c = this[0];
            if (c) return oa.event.trigger(a, b, c, !0);
        }
    }), oa.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(a, b) {
        oa.fn[b] = function(a, c) {
            return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b);
        };
    }), oa.fn.extend({
        hover: function(a, b) {
            return this.mouseenter(a).mouseleave(b || a);
        }
    }), ma.focusin = "onfocusin" in a, ma.focusin || oa.each({
        focus: "focusin",
        blur: "focusout"
    }, function(a, b) {
        var c = function(a) {
            oa.event.simulate(b, a.target, oa.event.fix(a));
        };
        oa.event.special[b] = {
            setup: function() {
                var d = this.ownerDocument || this, e = Ia.access(d, b);
                e || d.addEventListener(a, c, !0), Ia.access(d, b, (e || 0) + 1);
            },
            teardown: function() {
                var d = this.ownerDocument || this, e = Ia.access(d, b) - 1;
                e ? Ia.access(d, b, e) : (d.removeEventListener(a, c, !0), Ia.remove(d, b));
            }
        };
    });
    var wb = a.location, xb = oa.now(), yb = /\?/;
    oa.parseXML = function(b) {
        var c;
        if (!b || "string" != typeof b) return null;
        try {
            c = new a.DOMParser().parseFromString(b, "text/xml");
        } catch (a) {
            c = void 0;
        }
        return c && !c.getElementsByTagName("parsererror").length || oa.error("Invalid XML: " + b), 
        c;
    };
    var zb = /\[\]$/, Ab = /\r?\n/g, Bb = /^(?:submit|button|image|reset|file)$/i, Cb = /^(?:input|select|textarea|keygen)/i;
    oa.param = function(a, b) {
        var c, d = [], e = function(a, b) {
            var c = oa.isFunction(b) ? b() : b;
            d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(null == c ? "" : c);
        };
        if (oa.isArray(a) || a.jquery && !oa.isPlainObject(a)) oa.each(a, function() {
            e(this.name, this.value);
        }); else for (c in a) V(c, a[c], b, e);
        return d.join("&");
    }, oa.fn.extend({
        serialize: function() {
            return oa.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                var a = oa.prop(this, "elements");
                return a ? oa.makeArray(a) : this;
            }).filter(function() {
                var a = this.type;
                return this.name && !oa(this).is(":disabled") && Cb.test(this.nodeName) && !Bb.test(a) && (this.checked || !Sa.test(a));
            }).map(function(a, b) {
                var c = oa(this).val();
                return null == c ? null : oa.isArray(c) ? oa.map(c, function(a) {
                    return {
                        name: b.name,
                        value: a.replace(Ab, "\r\n")
                    };
                }) : {
                    name: b.name,
                    value: c.replace(Ab, "\r\n")
                };
            }).get();
        }
    });
    var Db = /%20/g, Eb = /#.*$/, Fb = /([?&])_=[^&]*/, Gb = /^(.*?):[ \t]*([^\r\n]*)$/gm, Hb = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Ib = /^(?:GET|HEAD)$/, Jb = /^\/\//, Kb = {}, Lb = {}, Mb = "*/".concat("*"), Nb = ba.createElement("a");
    Nb.href = wb.href, oa.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: wb.href,
            type: "GET",
            isLocal: Hb.test(wb.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Mb,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": JSON.parse,
                "text xml": oa.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(a, b) {
            return b ? Y(Y(a, oa.ajaxSettings), b) : Y(oa.ajaxSettings, a);
        },
        ajaxPrefilter: W(Kb),
        ajaxTransport: W(Lb),
        ajax: function(b, c) {
            function d(b, c, d, h) {
                var j, m, n, u, v, w = c;
                k || (k = !0, i && a.clearTimeout(i), e = void 0, g = h || "", x.readyState = b > 0 ? 4 : 0, 
                j = b >= 200 && b < 300 || 304 === b, d && (u = Z(o, x, d)), u = $(o, u, x, j), 
                j ? (o.ifModified && (v = x.getResponseHeader("Last-Modified"), v && (oa.lastModified[f] = v), 
                (v = x.getResponseHeader("etag")) && (oa.etag[f] = v)), 204 === b || "HEAD" === o.type ? w = "nocontent" : 304 === b ? w = "notmodified" : (w = u.state, 
                m = u.data, n = u.error, j = !n)) : (n = w, !b && w || (w = "error", b < 0 && (b = 0))), 
                x.status = b, x.statusText = (c || w) + "", j ? r.resolveWith(p, [ m, w, x ]) : r.rejectWith(p, [ x, w, n ]), 
                x.statusCode(t), t = void 0, l && q.trigger(j ? "ajaxSuccess" : "ajaxError", [ x, o, j ? m : n ]), 
                s.fireWith(p, [ x, w ]), l && (q.trigger("ajaxComplete", [ x, o ]), --oa.active || oa.event.trigger("ajaxStop")));
            }
            "object" == typeof b && (c = b, b = void 0), c = c || {};
            var e, f, g, h, i, j, k, l, m, n, o = oa.ajaxSetup({}, c), p = o.context || o, q = o.context && (p.nodeType || p.jquery) ? oa(p) : oa.event, r = oa.Deferred(), s = oa.Callbacks("once memory"), t = o.statusCode || {}, u = {}, v = {}, w = "canceled", x = {
                readyState: 0,
                getResponseHeader: function(a) {
                    var b;
                    if (k) {
                        if (!h) for (h = {}; b = Gb.exec(g); ) h[b[1].toLowerCase()] = b[2];
                        b = h[a.toLowerCase()];
                    }
                    return null == b ? null : b;
                },
                getAllResponseHeaders: function() {
                    return k ? g : null;
                },
                setRequestHeader: function(a, b) {
                    return null == k && (a = v[a.toLowerCase()] = v[a.toLowerCase()] || a, u[a] = b), 
                    this;
                },
                overrideMimeType: function(a) {
                    return null == k && (o.mimeType = a), this;
                },
                statusCode: function(a) {
                    var b;
                    if (a) if (k) x.always(a[x.status]); else for (b in a) t[b] = [ t[b], a[b] ];
                    return this;
                },
                abort: function(a) {
                    var b = a || w;
                    return e && e.abort(b), d(0, b), this;
                }
            };
            if (r.promise(x), o.url = ((b || o.url || wb.href) + "").replace(Jb, wb.protocol + "//"), 
            o.type = c.method || c.type || o.method || o.type, o.dataTypes = (o.dataType || "*").toLowerCase().match(Da) || [ "" ], 
            null == o.crossDomain) {
                j = ba.createElement("a");
                try {
                    j.href = o.url, j.href = j.href, o.crossDomain = Nb.protocol + "//" + Nb.host != j.protocol + "//" + j.host;
                } catch (a) {
                    o.crossDomain = !0;
                }
            }
            if (o.data && o.processData && "string" != typeof o.data && (o.data = oa.param(o.data, o.traditional)), 
            X(Kb, o, c, x), k) return x;
            l = oa.event && o.global, l && 0 == oa.active++ && oa.event.trigger("ajaxStart"), 
            o.type = o.type.toUpperCase(), o.hasContent = !Ib.test(o.type), f = o.url.replace(Eb, ""), 
            o.hasContent ? o.data && o.processData && 0 === (o.contentType || "").indexOf("application/x-www-form-urlencoded") && (o.data = o.data.replace(Db, "+")) : (n = o.url.slice(f.length), 
            o.data && (f += (yb.test(f) ? "&" : "?") + o.data, delete o.data), !1 === o.cache && (f = f.replace(Fb, "$1"), 
            n = (yb.test(f) ? "&" : "?") + "_=" + xb++ + n), o.url = f + n), o.ifModified && (oa.lastModified[f] && x.setRequestHeader("If-Modified-Since", oa.lastModified[f]), 
            oa.etag[f] && x.setRequestHeader("If-None-Match", oa.etag[f])), (o.data && o.hasContent && !1 !== o.contentType || c.contentType) && x.setRequestHeader("Content-Type", o.contentType), 
            x.setRequestHeader("Accept", o.dataTypes[0] && o.accepts[o.dataTypes[0]] ? o.accepts[o.dataTypes[0]] + ("*" !== o.dataTypes[0] ? ", " + Mb + "; q=0.01" : "") : o.accepts["*"]);
            for (m in o.headers) x.setRequestHeader(m, o.headers[m]);
            if (o.beforeSend && (!1 === o.beforeSend.call(p, x, o) || k)) return x.abort();
            if (w = "abort", s.add(o.complete), x.done(o.success), x.fail(o.error), e = X(Lb, o, c, x)) {
                if (x.readyState = 1, l && q.trigger("ajaxSend", [ x, o ]), k) return x;
                o.async && o.timeout > 0 && (i = a.setTimeout(function() {
                    x.abort("timeout");
                }, o.timeout));
                try {
                    k = !1, e.send(u, d);
                } catch (a) {
                    if (k) throw a;
                    d(-1, a);
                }
            } else d(-1, "No Transport");
            return x;
        },
        getJSON: function(a, b, c) {
            return oa.get(a, b, c, "json");
        },
        getScript: function(a, b) {
            return oa.get(a, void 0, b, "script");
        }
    }), oa.each([ "get", "post" ], function(a, b) {
        oa[b] = function(a, c, d, e) {
            return oa.isFunction(c) && (e = e || d, d = c, c = void 0), oa.ajax(oa.extend({
                url: a,
                type: b,
                dataType: e,
                data: c,
                success: d
            }, oa.isPlainObject(a) && a));
        };
    }), oa._evalUrl = function(a) {
        return oa.ajax({
            url: a,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            throws: !0
        });
    }, oa.fn.extend({
        wrapAll: function(a) {
            var b;
            return this[0] && (oa.isFunction(a) && (a = a.call(this[0])), b = oa(a, this[0].ownerDocument).eq(0).clone(!0), 
            this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
                for (var a = this; a.firstElementChild; ) a = a.firstElementChild;
                return a;
            }).append(this)), this;
        },
        wrapInner: function(a) {
            return oa.isFunction(a) ? this.each(function(b) {
                oa(this).wrapInner(a.call(this, b));
            }) : this.each(function() {
                var b = oa(this), c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a);
            });
        },
        wrap: function(a) {
            var b = oa.isFunction(a);
            return this.each(function(c) {
                oa(this).wrapAll(b ? a.call(this, c) : a);
            });
        },
        unwrap: function(a) {
            return this.parent(a).not("body").each(function() {
                oa(this).replaceWith(this.childNodes);
            }), this;
        }
    }), oa.expr.pseudos.hidden = function(a) {
        return !oa.expr.pseudos.visible(a);
    }, oa.expr.pseudos.visible = function(a) {
        return !!(a.offsetWidth || a.offsetHeight || a.getClientRects().length);
    }, oa.ajaxSettings.xhr = function() {
        try {
            return new a.XMLHttpRequest();
        } catch (a) {}
    };
    var Ob = {
        0: 200,
        1223: 204
    }, Pb = oa.ajaxSettings.xhr();
    ma.cors = !!Pb && "withCredentials" in Pb, ma.ajax = Pb = !!Pb, oa.ajaxTransport(function(b) {
        var c, d;
        if (ma.cors || Pb && !b.crossDomain) return {
            send: function(e, f) {
                var g, h = b.xhr();
                if (h.open(b.type, b.url, b.async, b.username, b.password), b.xhrFields) for (g in b.xhrFields) h[g] = b.xhrFields[g];
                b.mimeType && h.overrideMimeType && h.overrideMimeType(b.mimeType), b.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest");
                for (g in e) h.setRequestHeader(g, e[g]);
                c = function(a) {
                    return function() {
                        c && (c = d = h.onload = h.onerror = h.onabort = h.onreadystatechange = null, "abort" === a ? h.abort() : "error" === a ? "number" != typeof h.status ? f(0, "error") : f(h.status, h.statusText) : f(Ob[h.status] || h.status, h.statusText, "text" !== (h.responseType || "text") || "string" != typeof h.responseText ? {
                            binary: h.response
                        } : {
                            text: h.responseText
                        }, h.getAllResponseHeaders()));
                    };
                }, h.onload = c(), d = h.onerror = c("error"), void 0 !== h.onabort ? h.onabort = d : h.onreadystatechange = function() {
                    4 === h.readyState && a.setTimeout(function() {
                        c && d();
                    });
                }, c = c("abort");
                try {
                    h.send(b.hasContent && b.data || null);
                } catch (a) {
                    if (c) throw a;
                }
            },
            abort: function() {
                c && c();
            }
        };
    }), oa.ajaxPrefilter(function(a) {
        a.crossDomain && (a.contents.script = !1);
    }), oa.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(a) {
                return oa.globalEval(a), a;
            }
        }
    }), oa.ajaxPrefilter("script", function(a) {
        void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET");
    }), oa.ajaxTransport("script", function(a) {
        if (a.crossDomain) {
            var b, c;
            return {
                send: function(d, e) {
                    b = oa("<script>").prop({
                        charset: a.scriptCharset,
                        src: a.url
                    }).on("load error", c = function(a) {
                        b.remove(), c = null, a && e("error" === a.type ? 404 : 200, a.type);
                    }), ba.head.appendChild(b[0]);
                },
                abort: function() {
                    c && c();
                }
            };
        }
    });
    var Qb = [], Rb = /(=)\?(?=&|$)|\?\?/;
    oa.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var a = Qb.pop() || oa.expando + "_" + xb++;
            return this[a] = !0, a;
        }
    }), oa.ajaxPrefilter("json jsonp", function(b, c, d) {
        var e, f, g, h = !1 !== b.jsonp && (Rb.test(b.url) ? "url" : "string" == typeof b.data && 0 === (b.contentType || "").indexOf("application/x-www-form-urlencoded") && Rb.test(b.data) && "data");
        if (h || "jsonp" === b.dataTypes[0]) return e = b.jsonpCallback = oa.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, 
        h ? b[h] = b[h].replace(Rb, "$1" + e) : !1 !== b.jsonp && (b.url += (yb.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), 
        b.converters["script json"] = function() {
            return g || oa.error(e + " was not called"), g[0];
        }, b.dataTypes[0] = "json", f = a[e], a[e] = function() {
            g = arguments;
        }, d.always(function() {
            void 0 === f ? oa(a).removeProp(e) : a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, 
            Qb.push(e)), g && oa.isFunction(f) && f(g[0]), g = f = void 0;
        }), "script";
    }), ma.createHTMLDocument = function() {
        var a = ba.implementation.createHTMLDocument("").body;
        return a.innerHTML = "<form></form><form></form>", 2 === a.childNodes.length;
    }(), oa.parseHTML = function(a, b, c) {
        if ("string" != typeof a) return [];
        "boolean" == typeof b && (c = b, b = !1);
        var d, e, f;
        return b || (ma.createHTMLDocument ? (b = ba.implementation.createHTMLDocument(""), 
        d = b.createElement("base"), d.href = ba.location.href, b.head.appendChild(d)) : b = ba), 
        e = xa.exec(a), f = !c && [], e ? [ b.createElement(e[1]) ] : (e = t([ a ], b, f), 
        f && f.length && oa(f).remove(), oa.merge([], e.childNodes));
    }, oa.fn.load = function(a, b, c) {
        var d, e, f, g = this, h = a.indexOf(" ");
        return h > -1 && (d = T(a.slice(h)), a = a.slice(0, h)), oa.isFunction(b) ? (c = b, 
        b = void 0) : b && "object" == typeof b && (e = "POST"), g.length > 0 && oa.ajax({
            url: a,
            type: e || "GET",
            dataType: "html",
            data: b
        }).done(function(a) {
            f = arguments, g.html(d ? oa("<div>").append(oa.parseHTML(a)).find(d) : a);
        }).always(c && function(a, b) {
            g.each(function() {
                c.apply(this, f || [ a.responseText, b, a ]);
            });
        }), this;
    }, oa.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function(a, b) {
        oa.fn[b] = function(a) {
            return this.on(b, a);
        };
    }), oa.expr.pseudos.animated = function(a) {
        return oa.grep(oa.timers, function(b) {
            return a === b.elem;
        }).length;
    }, oa.offset = {
        setOffset: function(a, b, c) {
            var d, e, f, g, h, i, j, k = oa.css(a, "position"), l = oa(a), m = {};
            "static" === k && (a.style.position = "relative"), h = l.offset(), f = oa.css(a, "top"), 
            i = oa.css(a, "left"), j = ("absolute" === k || "fixed" === k) && (f + i).indexOf("auto") > -1, 
            j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), 
            oa.isFunction(b) && (b = b.call(a, c, oa.extend({}, h))), null != b.top && (m.top = b.top - h.top + g), 
            null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m);
        }
    }, oa.fn.extend({
        offset: function(a) {
            if (arguments.length) return void 0 === a ? this : this.each(function(b) {
                oa.offset.setOffset(this, a, b);
            });
            var b, c, d, e, f = this[0];
            return f ? f.getClientRects().length ? (d = f.getBoundingClientRect(), d.width || d.height ? (e = f.ownerDocument, 
            c = _(e), b = e.documentElement, {
                top: d.top + c.pageYOffset - b.clientTop,
                left: d.left + c.pageXOffset - b.clientLeft
            }) : d) : {
                top: 0,
                left: 0
            } : void 0;
        },
        position: function() {
            if (this[0]) {
                var a, b, c = this[0], d = {
                    top: 0,
                    left: 0
                };
                return "fixed" === oa.css(c, "position") ? b = c.getBoundingClientRect() : (a = this.offsetParent(), 
                b = this.offset(), oa.nodeName(a[0], "html") || (d = a.offset()), d = {
                    top: d.top + oa.css(a[0], "borderTopWidth", !0),
                    left: d.left + oa.css(a[0], "borderLeftWidth", !0)
                }), {
                    top: b.top - d.top - oa.css(c, "marginTop", !0),
                    left: b.left - d.left - oa.css(c, "marginLeft", !0)
                };
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var a = this.offsetParent; a && "static" === oa.css(a, "position"); ) a = a.offsetParent;
                return a || Xa;
            });
        }
    }), oa.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(a, b) {
        var c = "pageYOffset" === b;
        oa.fn[a] = function(d) {
            return Ga(this, function(a, d, e) {
                var f = _(a);
                return void 0 === e ? f ? f[b] : a[d] : void (f ? f.scrollTo(c ? f.pageXOffset : e, c ? e : f.pageYOffset) : a[d] = e);
            }, a, d, arguments.length);
        };
    }), oa.each([ "top", "left" ], function(a, b) {
        oa.cssHooks[b] = G(ma.pixelPosition, function(a, c) {
            if (c) return c = F(a, b), fb.test(c) ? oa(a).position()[b] + "px" : c;
        });
    }), oa.each({
        Height: "height",
        Width: "width"
    }, function(a, b) {
        oa.each({
            padding: "inner" + a,
            content: b,
            "": "outer" + a
        }, function(c, d) {
            oa.fn[d] = function(e, f) {
                var g = arguments.length && (c || "boolean" != typeof e), h = c || (!0 === e || !0 === f ? "margin" : "border");
                return Ga(this, function(b, c, e) {
                    var f;
                    return oa.isWindow(b) ? 0 === d.indexOf("outer") ? b["inner" + a] : b.document.documentElement["client" + a] : 9 === b.nodeType ? (f = b.documentElement, 
                    Math.max(b.body["scroll" + a], f["scroll" + a], b.body["offset" + a], f["offset" + a], f["client" + a])) : void 0 === e ? oa.css(b, c, h) : oa.style(b, c, e, h);
                }, b, g ? e : void 0, g);
            };
        });
    }), oa.fn.extend({
        bind: function(a, b, c) {
            return this.on(a, null, b, c);
        },
        unbind: function(a, b) {
            return this.off(a, null, b);
        },
        delegate: function(a, b, c, d) {
            return this.on(b, a, c, d);
        },
        undelegate: function(a, b, c) {
            return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c);
        }
    }), oa.parseJSON = JSON.parse, "function" == typeof define && define.amd && define("jquery", [], function() {
        return oa;
    });
    var Sb = a.jQuery, Tb = a.$;
    return oa.noConflict = function(b) {
        return a.$ === oa && (a.$ = Tb), b && a.jQuery === oa && (a.jQuery = Sb), oa;
    }, b || (a.jQuery = a.$ = oa), oa;
}), function(a, b, c) {
    function d() {
        var b = a.L;
        e.noConflict = function() {
            return a.L = b, this;
        }, a.L = e;
    }
    var e = {
        version: "1.0.3+ed36a04"
    };
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e : "function" == typeof define && define.amd && define(e), 
    void 0 !== a && d(), e.Util = {
        extend: function(a) {
            var b, c, d, e;
            for (c = 1, d = arguments.length; c < d; c++) {
                e = arguments[c];
                for (b in e) a[b] = e[b];
            }
            return a;
        },
        create: Object.create || function() {
            function a() {}
            return function(b) {
                return a.prototype = b, new a();
            };
        }(),
        bind: function(a, b) {
            var c = Array.prototype.slice;
            if (a.bind) return a.bind.apply(a, c.call(arguments, 1));
            var d = c.call(arguments, 2);
            return function() {
                return a.apply(b, d.length ? d.concat(c.call(arguments)) : arguments);
            };
        },
        stamp: function(a) {
            return a._leaflet_id = a._leaflet_id || ++e.Util.lastId, a._leaflet_id;
        },
        lastId: 0,
        throttle: function(a, b, c) {
            var d, e, f, g;
            return g = function() {
                d = !1, e && (f.apply(c, e), e = !1);
            }, f = function() {
                d ? e = arguments : (a.apply(c, arguments), setTimeout(g, b), d = !0);
            };
        },
        wrapNum: function(a, b, c) {
            var d = b[1], e = b[0], f = d - e;
            return a === d && c ? a : ((a - e) % f + f) % f + e;
        },
        falseFn: function() {
            return !1;
        },
        formatNum: function(a, b) {
            var c = Math.pow(10, b || 5);
            return Math.round(a * c) / c;
        },
        trim: function(a) {
            return a.trim ? a.trim() : a.replace(/^\s+|\s+$/g, "");
        },
        splitWords: function(a) {
            return e.Util.trim(a).split(/\s+/);
        },
        setOptions: function(a, b) {
            a.hasOwnProperty("options") || (a.options = a.options ? e.Util.create(a.options) : {});
            for (var c in b) a.options[c] = b[c];
            return a.options;
        },
        getParamString: function(a, b, c) {
            var d = [];
            for (var e in a) d.push(encodeURIComponent(c ? e.toUpperCase() : e) + "=" + encodeURIComponent(a[e]));
            return (b && -1 !== b.indexOf("?") ? "&" : "?") + d.join("&");
        },
        template: function(a, b) {
            return a.replace(e.Util.templateRe, function(a, d) {
                var e = b[d];
                if (e === c) throw new Error("No value provided for variable " + a);
                return "function" == typeof e && (e = e(b)), e;
            });
        },
        templateRe: /\{ *([\w_\-]+) *\}/g,
        isArray: Array.isArray || function(a) {
            return "[object Array]" === Object.prototype.toString.call(a);
        },
        indexOf: function(a, b) {
            for (var c = 0; c < a.length; c++) if (a[c] === b) return c;
            return -1;
        },
        emptyImageUrl: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
    }, function() {
        function b(b) {
            return a["webkit" + b] || a["moz" + b] || a["ms" + b];
        }
        function c(b) {
            var c = +new Date(), e = Math.max(0, 16 - (c - d));
            return d = c + e, a.setTimeout(b, e);
        }
        var d = 0, f = a.requestAnimationFrame || b("RequestAnimationFrame") || c, g = a.cancelAnimationFrame || b("CancelAnimationFrame") || b("CancelRequestAnimationFrame") || function(b) {
            a.clearTimeout(b);
        };
        e.Util.requestAnimFrame = function(b, d, g) {
            if (!g || f !== c) return f.call(a, e.bind(b, d));
            b.call(d);
        }, e.Util.cancelAnimFrame = function(b) {
            b && g.call(a, b);
        };
    }(), e.extend = e.Util.extend, e.bind = e.Util.bind, e.stamp = e.Util.stamp, e.setOptions = e.Util.setOptions, 
    e.Class = function() {}, e.Class.extend = function(a) {
        var b = function() {
            this.initialize && this.initialize.apply(this, arguments), this.callInitHooks();
        }, c = b.__super__ = this.prototype, d = e.Util.create(c);
        d.constructor = b, b.prototype = d;
        for (var f in this) this.hasOwnProperty(f) && "prototype" !== f && (b[f] = this[f]);
        return a.statics && (e.extend(b, a.statics), delete a.statics), a.includes && (e.Util.extend.apply(null, [ d ].concat(a.includes)), 
        delete a.includes), d.options && (a.options = e.Util.extend(e.Util.create(d.options), a.options)), 
        e.extend(d, a), d._initHooks = [], d.callInitHooks = function() {
            if (!this._initHooksCalled) {
                c.callInitHooks && c.callInitHooks.call(this), this._initHooksCalled = !0;
                for (var a = 0, b = d._initHooks.length; a < b; a++) d._initHooks[a].call(this);
            }
        }, b;
    }, e.Class.include = function(a) {
        return e.extend(this.prototype, a), this;
    }, e.Class.mergeOptions = function(a) {
        return e.extend(this.prototype.options, a), this;
    }, e.Class.addInitHook = function(a) {
        var b = Array.prototype.slice.call(arguments, 1), c = "function" == typeof a ? a : function() {
            this[a].apply(this, b);
        };
        return this.prototype._initHooks = this.prototype._initHooks || [], this.prototype._initHooks.push(c), 
        this;
    }, e.Evented = e.Class.extend({
        on: function(a, b, c) {
            if ("object" == typeof a) for (var d in a) this._on(d, a[d], b); else {
                a = e.Util.splitWords(a);
                for (var f = 0, g = a.length; f < g; f++) this._on(a[f], b, c);
            }
            return this;
        },
        off: function(a, b, c) {
            if (a) if ("object" == typeof a) for (var d in a) this._off(d, a[d], b); else {
                a = e.Util.splitWords(a);
                for (var f = 0, g = a.length; f < g; f++) this._off(a[f], b, c);
            } else delete this._events;
            return this;
        },
        _on: function(a, b, d) {
            this._events = this._events || {};
            var e = this._events[a];
            e || (e = [], this._events[a] = e), d === this && (d = c);
            for (var f = {
                fn: b,
                ctx: d
            }, g = e, h = 0, i = g.length; h < i; h++) if (g[h].fn === b && g[h].ctx === d) return;
            g.push(f);
        },
        _off: function(a, b, d) {
            var f, g, h;
            if (this._events && (f = this._events[a])) {
                if (!b) {
                    for (g = 0, h = f.length; g < h; g++) f[g].fn = e.Util.falseFn;
                    return void delete this._events[a];
                }
                if (d === this && (d = c), f) for (g = 0, h = f.length; g < h; g++) {
                    var i = f[g];
                    if (i.ctx === d && i.fn === b) return i.fn = e.Util.falseFn, this._firingCount && (this._events[a] = f = f.slice()), 
                    void f.splice(g, 1);
                }
            }
        },
        fire: function(a, b, c) {
            if (!this.listens(a, c)) return this;
            var d = e.Util.extend({}, b, {
                type: a,
                target: this
            });
            if (this._events) {
                var f = this._events[a];
                if (f) {
                    this._firingCount = this._firingCount + 1 || 1;
                    for (var g = 0, h = f.length; g < h; g++) {
                        var i = f[g];
                        i.fn.call(i.ctx || this, d);
                    }
                    this._firingCount--;
                }
            }
            return c && this._propagateEvent(d), this;
        },
        listens: function(a, b) {
            var c = this._events && this._events[a];
            if (c && c.length) return !0;
            if (b) for (var d in this._eventParents) if (this._eventParents[d].listens(a, b)) return !0;
            return !1;
        },
        once: function(a, b, c) {
            if ("object" == typeof a) {
                for (var d in a) this.once(d, a[d], b);
                return this;
            }
            var f = e.bind(function() {
                this.off(a, b, c).off(a, f, c);
            }, this);
            return this.on(a, b, c).on(a, f, c);
        },
        addEventParent: function(a) {
            return this._eventParents = this._eventParents || {}, this._eventParents[e.stamp(a)] = a, 
            this;
        },
        removeEventParent: function(a) {
            return this._eventParents && delete this._eventParents[e.stamp(a)], this;
        },
        _propagateEvent: function(a) {
            for (var b in this._eventParents) this._eventParents[b].fire(a.type, e.extend({
                layer: a.target
            }, a), !0);
        }
    });
    var f = e.Evented.prototype;
    f.addEventListener = f.on, f.removeEventListener = f.clearAllEventListeners = f.off, 
    f.addOneTimeEventListener = f.once, f.fireEvent = f.fire, f.hasEventListeners = f.listens, 
    e.Mixin = {
        Events: f
    }, function() {
        var c = navigator.userAgent.toLowerCase(), d = b.documentElement, f = "ActiveXObject" in a, g = -1 !== c.indexOf("webkit"), h = -1 !== c.indexOf("phantom"), i = -1 !== c.search("android [23]"), j = -1 !== c.indexOf("chrome"), k = -1 !== c.indexOf("gecko") && !g && !a.opera && !f, l = 0 === navigator.platform.indexOf("Win"), m = "undefined" != typeof orientation || -1 !== c.indexOf("mobile"), n = !a.PointerEvent && a.MSPointerEvent, o = a.PointerEvent || n, p = f && "transition" in d.style, q = "WebKitCSSMatrix" in a && "m11" in new a.WebKitCSSMatrix() && !i, r = "MozPerspective" in d.style, s = "OTransition" in d.style, t = !a.L_NO_TOUCH && (o || "ontouchstart" in a || a.DocumentTouch && b instanceof a.DocumentTouch);
        e.Browser = {
            ie: f,
            ielt9: f && !b.addEventListener,
            edge: "msLaunchUri" in navigator && !("documentMode" in b),
            webkit: g,
            gecko: k,
            android: -1 !== c.indexOf("android"),
            android23: i,
            chrome: j,
            safari: !j && -1 !== c.indexOf("safari"),
            win: l,
            ie3d: p,
            webkit3d: q,
            gecko3d: r,
            opera12: s,
            any3d: !a.L_DISABLE_3D && (p || q || r) && !s && !h,
            mobile: m,
            mobileWebkit: m && g,
            mobileWebkit3d: m && q,
            mobileOpera: m && a.opera,
            mobileGecko: m && k,
            touch: !!t,
            msPointer: !!n,
            pointer: !!o,
            retina: (a.devicePixelRatio || a.screen.deviceXDPI / a.screen.logicalXDPI) > 1
        };
    }(), e.Point = function(a, b, c) {
        this.x = c ? Math.round(a) : a, this.y = c ? Math.round(b) : b;
    }, e.Point.prototype = {
        clone: function() {
            return new e.Point(this.x, this.y);
        },
        add: function(a) {
            return this.clone()._add(e.point(a));
        },
        _add: function(a) {
            return this.x += a.x, this.y += a.y, this;
        },
        subtract: function(a) {
            return this.clone()._subtract(e.point(a));
        },
        _subtract: function(a) {
            return this.x -= a.x, this.y -= a.y, this;
        },
        divideBy: function(a) {
            return this.clone()._divideBy(a);
        },
        _divideBy: function(a) {
            return this.x /= a, this.y /= a, this;
        },
        multiplyBy: function(a) {
            return this.clone()._multiplyBy(a);
        },
        _multiplyBy: function(a) {
            return this.x *= a, this.y *= a, this;
        },
        scaleBy: function(a) {
            return new e.Point(this.x * a.x, this.y * a.y);
        },
        unscaleBy: function(a) {
            return new e.Point(this.x / a.x, this.y / a.y);
        },
        round: function() {
            return this.clone()._round();
        },
        _round: function() {
            return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
        },
        floor: function() {
            return this.clone()._floor();
        },
        _floor: function() {
            return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
        },
        ceil: function() {
            return this.clone()._ceil();
        },
        _ceil: function() {
            return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
        },
        distanceTo: function(a) {
            a = e.point(a);
            var b = a.x - this.x, c = a.y - this.y;
            return Math.sqrt(b * b + c * c);
        },
        equals: function(a) {
            return a = e.point(a), a.x === this.x && a.y === this.y;
        },
        contains: function(a) {
            return a = e.point(a), Math.abs(a.x) <= Math.abs(this.x) && Math.abs(a.y) <= Math.abs(this.y);
        },
        toString: function() {
            return "Point(" + e.Util.formatNum(this.x) + ", " + e.Util.formatNum(this.y) + ")";
        }
    }, e.point = function(a, b, d) {
        return a instanceof e.Point ? a : e.Util.isArray(a) ? new e.Point(a[0], a[1]) : a === c || null === a ? a : "object" == typeof a && "x" in a && "y" in a ? new e.Point(a.x, a.y) : new e.Point(a, b, d);
    }, e.Bounds = function(a, b) {
        if (a) for (var c = b ? [ a, b ] : a, d = 0, e = c.length; d < e; d++) this.extend(c[d]);
    }, e.Bounds.prototype = {
        extend: function(a) {
            return a = e.point(a), this.min || this.max ? (this.min.x = Math.min(a.x, this.min.x), 
            this.max.x = Math.max(a.x, this.max.x), this.min.y = Math.min(a.y, this.min.y), 
            this.max.y = Math.max(a.y, this.max.y)) : (this.min = a.clone(), this.max = a.clone()), 
            this;
        },
        getCenter: function(a) {
            return new e.Point((this.min.x + this.max.x) / 2, (this.min.y + this.max.y) / 2, a);
        },
        getBottomLeft: function() {
            return new e.Point(this.min.x, this.max.y);
        },
        getTopRight: function() {
            return new e.Point(this.max.x, this.min.y);
        },
        getSize: function() {
            return this.max.subtract(this.min);
        },
        contains: function(a) {
            var b, c;
            return a = "number" == typeof a[0] || a instanceof e.Point ? e.point(a) : e.bounds(a), 
            a instanceof e.Bounds ? (b = a.min, c = a.max) : b = c = a, b.x >= this.min.x && c.x <= this.max.x && b.y >= this.min.y && c.y <= this.max.y;
        },
        intersects: function(a) {
            a = e.bounds(a);
            var b = this.min, c = this.max, d = a.min, f = a.max, g = f.x >= b.x && d.x <= c.x, h = f.y >= b.y && d.y <= c.y;
            return g && h;
        },
        overlaps: function(a) {
            a = e.bounds(a);
            var b = this.min, c = this.max, d = a.min, f = a.max, g = f.x > b.x && d.x < c.x, h = f.y > b.y && d.y < c.y;
            return g && h;
        },
        isValid: function() {
            return !(!this.min || !this.max);
        }
    }, e.bounds = function(a, b) {
        return !a || a instanceof e.Bounds ? a : new e.Bounds(a, b);
    }, e.Transformation = function(a, b, c, d) {
        this._a = a, this._b = b, this._c = c, this._d = d;
    }, e.Transformation.prototype = {
        transform: function(a, b) {
            return this._transform(a.clone(), b);
        },
        _transform: function(a, b) {
            return b = b || 1, a.x = b * (this._a * a.x + this._b), a.y = b * (this._c * a.y + this._d), 
            a;
        },
        untransform: function(a, b) {
            return b = b || 1, new e.Point((a.x / b - this._b) / this._a, (a.y / b - this._d) / this._c);
        }
    }, e.DomUtil = {
        get: function(a) {
            return "string" == typeof a ? b.getElementById(a) : a;
        },
        getStyle: function(a, c) {
            var d = a.style[c] || a.currentStyle && a.currentStyle[c];
            if ((!d || "auto" === d) && b.defaultView) {
                var e = b.defaultView.getComputedStyle(a, null);
                d = e ? e[c] : null;
            }
            return "auto" === d ? null : d;
        },
        create: function(a, c, d) {
            var e = b.createElement(a);
            return e.className = c || "", d && d.appendChild(e), e;
        },
        remove: function(a) {
            var b = a.parentNode;
            b && b.removeChild(a);
        },
        empty: function(a) {
            for (;a.firstChild; ) a.removeChild(a.firstChild);
        },
        toFront: function(a) {
            a.parentNode.appendChild(a);
        },
        toBack: function(a) {
            var b = a.parentNode;
            b.insertBefore(a, b.firstChild);
        },
        hasClass: function(a, b) {
            if (a.classList !== c) return a.classList.contains(b);
            var d = e.DomUtil.getClass(a);
            return d.length > 0 && new RegExp("(^|\\s)" + b + "(\\s|$)").test(d);
        },
        addClass: function(a, b) {
            if (a.classList !== c) for (var d = e.Util.splitWords(b), f = 0, g = d.length; f < g; f++) a.classList.add(d[f]); else if (!e.DomUtil.hasClass(a, b)) {
                var h = e.DomUtil.getClass(a);
                e.DomUtil.setClass(a, (h ? h + " " : "") + b);
            }
        },
        removeClass: function(a, b) {
            a.classList !== c ? a.classList.remove(b) : e.DomUtil.setClass(a, e.Util.trim((" " + e.DomUtil.getClass(a) + " ").replace(" " + b + " ", " ")));
        },
        setClass: function(a, b) {
            a.className.baseVal === c ? a.className = b : a.className.baseVal = b;
        },
        getClass: function(a) {
            return a.className.baseVal === c ? a.className : a.className.baseVal;
        },
        setOpacity: function(a, b) {
            "opacity" in a.style ? a.style.opacity = b : "filter" in a.style && e.DomUtil._setOpacityIE(a, b);
        },
        _setOpacityIE: function(a, b) {
            var c = !1, d = "DXImageTransform.Microsoft.Alpha";
            try {
                c = a.filters.item(d);
            } catch (a) {
                if (1 === b) return;
            }
            b = Math.round(100 * b), c ? (c.Enabled = 100 !== b, c.Opacity = b) : a.style.filter += " progid:" + d + "(opacity=" + b + ")";
        },
        testProp: function(a) {
            for (var c = b.documentElement.style, d = 0; d < a.length; d++) if (a[d] in c) return a[d];
            return !1;
        },
        setTransform: function(a, b, c) {
            var d = b || new e.Point(0, 0);
            a.style[e.DomUtil.TRANSFORM] = (e.Browser.ie3d ? "translate(" + d.x + "px," + d.y + "px)" : "translate3d(" + d.x + "px," + d.y + "px,0)") + (c ? " scale(" + c + ")" : "");
        },
        setPosition: function(a, b) {
            a._leaflet_pos = b, e.Browser.any3d ? e.DomUtil.setTransform(a, b) : (a.style.left = b.x + "px", 
            a.style.top = b.y + "px");
        },
        getPosition: function(a) {
            return a._leaflet_pos || new e.Point(0, 0);
        }
    }, function() {
        e.DomUtil.TRANSFORM = e.DomUtil.testProp([ "transform", "WebkitTransform", "OTransform", "MozTransform", "msTransform" ]);
        var c = e.DomUtil.TRANSITION = e.DomUtil.testProp([ "webkitTransition", "transition", "OTransition", "MozTransition", "msTransition" ]);
        if (e.DomUtil.TRANSITION_END = "webkitTransition" === c || "OTransition" === c ? c + "End" : "transitionend", 
        "onselectstart" in b) e.DomUtil.disableTextSelection = function() {
            e.DomEvent.on(a, "selectstart", e.DomEvent.preventDefault);
        }, e.DomUtil.enableTextSelection = function() {
            e.DomEvent.off(a, "selectstart", e.DomEvent.preventDefault);
        }; else {
            var d = e.DomUtil.testProp([ "userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect" ]);
            e.DomUtil.disableTextSelection = function() {
                if (d) {
                    var a = b.documentElement.style;
                    this._userSelect = a[d], a[d] = "none";
                }
            }, e.DomUtil.enableTextSelection = function() {
                d && (b.documentElement.style[d] = this._userSelect, delete this._userSelect);
            };
        }
        e.DomUtil.disableImageDrag = function() {
            e.DomEvent.on(a, "dragstart", e.DomEvent.preventDefault);
        }, e.DomUtil.enableImageDrag = function() {
            e.DomEvent.off(a, "dragstart", e.DomEvent.preventDefault);
        }, e.DomUtil.preventOutline = function(b) {
            for (;-1 === b.tabIndex; ) b = b.parentNode;
            b && b.style && (e.DomUtil.restoreOutline(), this._outlineElement = b, this._outlineStyle = b.style.outline, 
            b.style.outline = "none", e.DomEvent.on(a, "keydown", e.DomUtil.restoreOutline, this));
        }, e.DomUtil.restoreOutline = function() {
            this._outlineElement && (this._outlineElement.style.outline = this._outlineStyle, 
            delete this._outlineElement, delete this._outlineStyle, e.DomEvent.off(a, "keydown", e.DomUtil.restoreOutline, this));
        };
    }(), e.LatLng = function(a, b, d) {
        if (isNaN(a) || isNaN(b)) throw new Error("Invalid LatLng object: (" + a + ", " + b + ")");
        this.lat = +a, this.lng = +b, d !== c && (this.alt = +d);
    }, e.LatLng.prototype = {
        equals: function(a, b) {
            return !!a && (a = e.latLng(a), Math.max(Math.abs(this.lat - a.lat), Math.abs(this.lng - a.lng)) <= (b === c ? 1e-9 : b));
        },
        toString: function(a) {
            return "LatLng(" + e.Util.formatNum(this.lat, a) + ", " + e.Util.formatNum(this.lng, a) + ")";
        },
        distanceTo: function(a) {
            return e.CRS.Earth.distance(this, e.latLng(a));
        },
        wrap: function() {
            return e.CRS.Earth.wrapLatLng(this);
        },
        toBounds: function(a) {
            var b = 180 * a / 40075017, c = b / Math.cos(Math.PI / 180 * this.lat);
            return e.latLngBounds([ this.lat - b, this.lng - c ], [ this.lat + b, this.lng + c ]);
        },
        clone: function() {
            return new e.LatLng(this.lat, this.lng, this.alt);
        }
    }, e.latLng = function(a, b, d) {
        return a instanceof e.LatLng ? a : e.Util.isArray(a) && "object" != typeof a[0] ? 3 === a.length ? new e.LatLng(a[0], a[1], a[2]) : 2 === a.length ? new e.LatLng(a[0], a[1]) : null : a === c || null === a ? a : "object" == typeof a && "lat" in a ? new e.LatLng(a.lat, "lng" in a ? a.lng : a.lon, a.alt) : b === c ? null : new e.LatLng(a, b, d);
    }, e.LatLngBounds = function(a, b) {
        if (a) for (var c = b ? [ a, b ] : a, d = 0, e = c.length; d < e; d++) this.extend(c[d]);
    }, e.LatLngBounds.prototype = {
        extend: function(a) {
            var b, c, d = this._southWest, f = this._northEast;
            if (a instanceof e.LatLng) b = a, c = a; else {
                if (!(a instanceof e.LatLngBounds)) return a ? this.extend(e.latLng(a) || e.latLngBounds(a)) : this;
                if (b = a._southWest, c = a._northEast, !b || !c) return this;
            }
            return d || f ? (d.lat = Math.min(b.lat, d.lat), d.lng = Math.min(b.lng, d.lng), 
            f.lat = Math.max(c.lat, f.lat), f.lng = Math.max(c.lng, f.lng)) : (this._southWest = new e.LatLng(b.lat, b.lng), 
            this._northEast = new e.LatLng(c.lat, c.lng)), this;
        },
        pad: function(a) {
            var b = this._southWest, c = this._northEast, d = Math.abs(b.lat - c.lat) * a, f = Math.abs(b.lng - c.lng) * a;
            return new e.LatLngBounds(new e.LatLng(b.lat - d, b.lng - f), new e.LatLng(c.lat + d, c.lng + f));
        },
        getCenter: function() {
            return new e.LatLng((this._southWest.lat + this._northEast.lat) / 2, (this._southWest.lng + this._northEast.lng) / 2);
        },
        getSouthWest: function() {
            return this._southWest;
        },
        getNorthEast: function() {
            return this._northEast;
        },
        getNorthWest: function() {
            return new e.LatLng(this.getNorth(), this.getWest());
        },
        getSouthEast: function() {
            return new e.LatLng(this.getSouth(), this.getEast());
        },
        getWest: function() {
            return this._southWest.lng;
        },
        getSouth: function() {
            return this._southWest.lat;
        },
        getEast: function() {
            return this._northEast.lng;
        },
        getNorth: function() {
            return this._northEast.lat;
        },
        contains: function(a) {
            a = "number" == typeof a[0] || a instanceof e.LatLng || "lat" in a ? e.latLng(a) : e.latLngBounds(a);
            var b, c, d = this._southWest, f = this._northEast;
            return a instanceof e.LatLngBounds ? (b = a.getSouthWest(), c = a.getNorthEast()) : b = c = a, 
            b.lat >= d.lat && c.lat <= f.lat && b.lng >= d.lng && c.lng <= f.lng;
        },
        intersects: function(a) {
            a = e.latLngBounds(a);
            var b = this._southWest, c = this._northEast, d = a.getSouthWest(), f = a.getNorthEast(), g = f.lat >= b.lat && d.lat <= c.lat, h = f.lng >= b.lng && d.lng <= c.lng;
            return g && h;
        },
        overlaps: function(a) {
            a = e.latLngBounds(a);
            var b = this._southWest, c = this._northEast, d = a.getSouthWest(), f = a.getNorthEast(), g = f.lat > b.lat && d.lat < c.lat, h = f.lng > b.lng && d.lng < c.lng;
            return g && h;
        },
        toBBoxString: function() {
            return [ this.getWest(), this.getSouth(), this.getEast(), this.getNorth() ].join(",");
        },
        equals: function(a) {
            return !!a && (a = e.latLngBounds(a), this._southWest.equals(a.getSouthWest()) && this._northEast.equals(a.getNorthEast()));
        },
        isValid: function() {
            return !(!this._southWest || !this._northEast);
        }
    }, e.latLngBounds = function(a, b) {
        return a instanceof e.LatLngBounds ? a : new e.LatLngBounds(a, b);
    }, e.Projection = {}, e.Projection.LonLat = {
        project: function(a) {
            return new e.Point(a.lng, a.lat);
        },
        unproject: function(a) {
            return new e.LatLng(a.y, a.x);
        },
        bounds: e.bounds([ -180, -90 ], [ 180, 90 ])
    }, e.Projection.SphericalMercator = {
        R: 6378137,
        MAX_LATITUDE: 85.0511287798,
        project: function(a) {
            var b = Math.PI / 180, c = this.MAX_LATITUDE, d = Math.max(Math.min(c, a.lat), -c), f = Math.sin(d * b);
            return new e.Point(this.R * a.lng * b, this.R * Math.log((1 + f) / (1 - f)) / 2);
        },
        unproject: function(a) {
            var b = 180 / Math.PI;
            return new e.LatLng((2 * Math.atan(Math.exp(a.y / this.R)) - Math.PI / 2) * b, a.x * b / this.R);
        },
        bounds: function() {
            var a = 6378137 * Math.PI;
            return e.bounds([ -a, -a ], [ a, a ]);
        }()
    }, e.CRS = {
        latLngToPoint: function(a, b) {
            var c = this.projection.project(a), d = this.scale(b);
            return this.transformation._transform(c, d);
        },
        pointToLatLng: function(a, b) {
            var c = this.scale(b), d = this.transformation.untransform(a, c);
            return this.projection.unproject(d);
        },
        project: function(a) {
            return this.projection.project(a);
        },
        unproject: function(a) {
            return this.projection.unproject(a);
        },
        scale: function(a) {
            return 256 * Math.pow(2, a);
        },
        zoom: function(a) {
            return Math.log(a / 256) / Math.LN2;
        },
        getProjectedBounds: function(a) {
            if (this.infinite) return null;
            var b = this.projection.bounds, c = this.scale(a), d = this.transformation.transform(b.min, c), f = this.transformation.transform(b.max, c);
            return e.bounds(d, f);
        },
        infinite: !1,
        wrapLatLng: function(a) {
            var b = this.wrapLng ? e.Util.wrapNum(a.lng, this.wrapLng, !0) : a.lng, c = this.wrapLat ? e.Util.wrapNum(a.lat, this.wrapLat, !0) : a.lat, d = a.alt;
            return e.latLng(c, b, d);
        },
        wrapLatLngBounds: function(a) {
            var b = a.getCenter(), c = this.wrapLatLng(b), d = b.lat - c.lat, f = b.lng - c.lng;
            if (0 === d && 0 === f) return a;
            var g = a.getSouthWest(), h = a.getNorthEast(), i = e.latLng({
                lat: g.lat - d,
                lng: g.lng - f
            }), j = e.latLng({
                lat: h.lat - d,
                lng: h.lng - f
            });
            return new e.LatLngBounds(i, j);
        }
    }, e.CRS.Simple = e.extend({}, e.CRS, {
        projection: e.Projection.LonLat,
        transformation: new e.Transformation(1, 0, -1, 0),
        scale: function(a) {
            return Math.pow(2, a);
        },
        zoom: function(a) {
            return Math.log(a) / Math.LN2;
        },
        distance: function(a, b) {
            var c = b.lng - a.lng, d = b.lat - a.lat;
            return Math.sqrt(c * c + d * d);
        },
        infinite: !0
    }), e.CRS.Earth = e.extend({}, e.CRS, {
        wrapLng: [ -180, 180 ],
        R: 6371e3,
        distance: function(a, b) {
            var c = Math.PI / 180, d = a.lat * c, e = b.lat * c, f = Math.sin(d) * Math.sin(e) + Math.cos(d) * Math.cos(e) * Math.cos((b.lng - a.lng) * c);
            return this.R * Math.acos(Math.min(f, 1));
        }
    }), e.CRS.EPSG3857 = e.extend({}, e.CRS.Earth, {
        code: "EPSG:3857",
        projection: e.Projection.SphericalMercator,
        transformation: function() {
            var a = .5 / (Math.PI * e.Projection.SphericalMercator.R);
            return new e.Transformation(a, .5, -a, .5);
        }()
    }), e.CRS.EPSG900913 = e.extend({}, e.CRS.EPSG3857, {
        code: "EPSG:900913"
    }), e.CRS.EPSG4326 = e.extend({}, e.CRS.Earth, {
        code: "EPSG:4326",
        projection: e.Projection.LonLat,
        transformation: new e.Transformation(1 / 180, 1, -1 / 180, .5)
    }), e.Map = e.Evented.extend({
        options: {
            crs: e.CRS.EPSG3857,
            center: c,
            zoom: c,
            minZoom: c,
            maxZoom: c,
            layers: [],
            maxBounds: c,
            renderer: c,
            zoomAnimation: !0,
            zoomAnimationThreshold: 4,
            fadeAnimation: !0,
            markerZoomAnimation: !0,
            transform3DLimit: 8388608,
            zoomSnap: 1,
            zoomDelta: 1,
            trackResize: !0
        },
        initialize: function(a, b) {
            b = e.setOptions(this, b), this._initContainer(a), this._initLayout(), this._onResize = e.bind(this._onResize, this), 
            this._initEvents(), b.maxBounds && this.setMaxBounds(b.maxBounds), b.zoom !== c && (this._zoom = this._limitZoom(b.zoom)), 
            b.center && b.zoom !== c && this.setView(e.latLng(b.center), b.zoom, {
                reset: !0
            }), this._handlers = [], this._layers = {}, this._zoomBoundLayers = {}, this._sizeChanged = !0, 
            this.callInitHooks(), this._zoomAnimated = e.DomUtil.TRANSITION && e.Browser.any3d && !e.Browser.mobileOpera && this.options.zoomAnimation, 
            this._zoomAnimated && (this._createAnimProxy(), e.DomEvent.on(this._proxy, e.DomUtil.TRANSITION_END, this._catchTransitionEnd, this)), 
            this._addLayers(this.options.layers);
        },
        setView: function(a, b, d) {
            if (b = b === c ? this._zoom : this._limitZoom(b), a = this._limitCenter(e.latLng(a), b, this.options.maxBounds), 
            d = d || {}, this._stop(), this._loaded && !d.reset && !0 !== d) {
                d.animate !== c && (d.zoom = e.extend({
                    animate: d.animate
                }, d.zoom), d.pan = e.extend({
                    animate: d.animate,
                    duration: d.duration
                }, d.pan));
                if (this._zoom !== b ? this._tryAnimatedZoom && this._tryAnimatedZoom(a, b, d.zoom) : this._tryAnimatedPan(a, d.pan)) return clearTimeout(this._sizeTimer), 
                this;
            }
            return this._resetView(a, b), this;
        },
        setZoom: function(a, b) {
            return this._loaded ? this.setView(this.getCenter(), a, {
                zoom: b
            }) : (this._zoom = a, this);
        },
        zoomIn: function(a, b) {
            return a = a || (e.Browser.any3d ? this.options.zoomDelta : 1), this.setZoom(this._zoom + a, b);
        },
        zoomOut: function(a, b) {
            return a = a || (e.Browser.any3d ? this.options.zoomDelta : 1), this.setZoom(this._zoom - a, b);
        },
        setZoomAround: function(a, b, c) {
            var d = this.getZoomScale(b), f = this.getSize().divideBy(2), g = a instanceof e.Point ? a : this.latLngToContainerPoint(a), h = g.subtract(f).multiplyBy(1 - 1 / d), i = this.containerPointToLatLng(f.add(h));
            return this.setView(i, b, {
                zoom: c
            });
        },
        _getBoundsCenterZoom: function(a, b) {
            b = b || {}, a = a.getBounds ? a.getBounds() : e.latLngBounds(a);
            var c = e.point(b.paddingTopLeft || b.padding || [ 0, 0 ]), d = e.point(b.paddingBottomRight || b.padding || [ 0, 0 ]), f = this.getBoundsZoom(a, !1, c.add(d));
            f = "number" == typeof b.maxZoom ? Math.min(b.maxZoom, f) : f;
            var g = d.subtract(c).divideBy(2), h = this.project(a.getSouthWest(), f), i = this.project(a.getNorthEast(), f);
            return {
                center: this.unproject(h.add(i).divideBy(2).add(g), f),
                zoom: f
            };
        },
        fitBounds: function(a, b) {
            if (a = e.latLngBounds(a), !a.isValid()) throw new Error("Bounds are not valid.");
            var c = this._getBoundsCenterZoom(a, b);
            return this.setView(c.center, c.zoom, b);
        },
        fitWorld: function(a) {
            return this.fitBounds([ [ -90, -180 ], [ 90, 180 ] ], a);
        },
        panTo: function(a, b) {
            return this.setView(a, this._zoom, {
                pan: b
            });
        },
        panBy: function(a, b) {
            if (a = e.point(a).round(), b = b || {}, !a.x && !a.y) return this.fire("moveend");
            if (!0 !== b.animate && !this.getSize().contains(a)) return this._resetView(this.unproject(this.project(this.getCenter()).add(a)), this.getZoom()), 
            this;
            if (this._panAnim || (this._panAnim = new e.PosAnimation(), this._panAnim.on({
                step: this._onPanTransitionStep,
                end: this._onPanTransitionEnd
            }, this)), b.noMoveStart || this.fire("movestart"), !1 !== b.animate) {
                e.DomUtil.addClass(this._mapPane, "leaflet-pan-anim");
                var c = this._getMapPanePos().subtract(a).round();
                this._panAnim.run(this._mapPane, c, b.duration || .25, b.easeLinearity);
            } else this._rawPanBy(a), this.fire("move").fire("moveend");
            return this;
        },
        flyTo: function(a, b, d) {
            function f(a) {
                var b = a ? -1 : 1, c = a ? s : r, d = s * s - r * r + b * v * v * t * t, e = 2 * c * v * t, f = d / e, g = Math.sqrt(f * f + 1) - f;
                return g < 1e-9 ? -18 : Math.log(g);
            }
            function g(a) {
                return (Math.exp(a) - Math.exp(-a)) / 2;
            }
            function h(a) {
                return (Math.exp(a) + Math.exp(-a)) / 2;
            }
            function i(a) {
                return g(a) / h(a);
            }
            function j(a) {
                return r * (h(w) / h(w + u * a));
            }
            function k(a) {
                return r * (h(w) * i(w + u * a) - g(w)) / v;
            }
            function l(a) {
                return 1 - Math.pow(1 - a, 1.5);
            }
            function m() {
                var c = (Date.now() - x) / z, d = l(c) * y;
                c <= 1 ? (this._flyToFrame = e.Util.requestAnimFrame(m, this), this._move(this.unproject(n.add(o.subtract(n).multiplyBy(k(d) / t)), q), this.getScaleZoom(r / j(d), q), {
                    flyTo: !0
                })) : this._move(a, b)._moveEnd(!0);
            }
            if (d = d || {}, !1 === d.animate || !e.Browser.any3d) return this.setView(a, b, d);
            this._stop();
            var n = this.project(this.getCenter()), o = this.project(a), p = this.getSize(), q = this._zoom;
            a = e.latLng(a), b = b === c ? q : b;
            var r = Math.max(p.x, p.y), s = r * this.getZoomScale(q, b), t = o.distanceTo(n) || 1, u = 1.42, v = u * u, w = f(0), x = Date.now(), y = (f(1) - w) / u, z = d.duration ? 1e3 * d.duration : 1e3 * y * .8;
            return this._moveStart(!0), m.call(this), this;
        },
        flyToBounds: function(a, b) {
            var c = this._getBoundsCenterZoom(a, b);
            return this.flyTo(c.center, c.zoom, b);
        },
        setMaxBounds: function(a) {
            return a = e.latLngBounds(a), a.isValid() ? (this.options.maxBounds && this.off("moveend", this._panInsideMaxBounds), 
            this.options.maxBounds = a, this._loaded && this._panInsideMaxBounds(), this.on("moveend", this._panInsideMaxBounds)) : (this.options.maxBounds = null, 
            this.off("moveend", this._panInsideMaxBounds));
        },
        setMinZoom: function(a) {
            return this.options.minZoom = a, this._loaded && this.getZoom() < this.options.minZoom ? this.setZoom(a) : this;
        },
        setMaxZoom: function(a) {
            return this.options.maxZoom = a, this._loaded && this.getZoom() > this.options.maxZoom ? this.setZoom(a) : this;
        },
        panInsideBounds: function(a, b) {
            this._enforcingBounds = !0;
            var c = this.getCenter(), d = this._limitCenter(c, this._zoom, e.latLngBounds(a));
            return c.equals(d) || this.panTo(d, b), this._enforcingBounds = !1, this;
        },
        invalidateSize: function(a) {
            if (!this._loaded) return this;
            a = e.extend({
                animate: !1,
                pan: !0
            }, !0 === a ? {
                animate: !0
            } : a);
            var b = this.getSize();
            this._sizeChanged = !0, this._lastCenter = null;
            var c = this.getSize(), d = b.divideBy(2).round(), f = c.divideBy(2).round(), g = d.subtract(f);
            return g.x || g.y ? (a.animate && a.pan ? this.panBy(g) : (a.pan && this._rawPanBy(g), 
            this.fire("move"), a.debounceMoveend ? (clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(e.bind(this.fire, this, "moveend"), 200)) : this.fire("moveend")), 
            this.fire("resize", {
                oldSize: b,
                newSize: c
            })) : this;
        },
        stop: function() {
            return this.setZoom(this._limitZoom(this._zoom)), this.options.zoomSnap || this.fire("viewreset"), 
            this._stop();
        },
        locate: function(a) {
            if (a = this._locateOptions = e.extend({
                timeout: 1e4,
                watch: !1
            }, a), !("geolocation" in navigator)) return this._handleGeolocationError({
                code: 0,
                message: "Geolocation not supported."
            }), this;
            var b = e.bind(this._handleGeolocationResponse, this), c = e.bind(this._handleGeolocationError, this);
            return a.watch ? this._locationWatchId = navigator.geolocation.watchPosition(b, c, a) : navigator.geolocation.getCurrentPosition(b, c, a), 
            this;
        },
        stopLocate: function() {
            return navigator.geolocation && navigator.geolocation.clearWatch && navigator.geolocation.clearWatch(this._locationWatchId), 
            this._locateOptions && (this._locateOptions.setView = !1), this;
        },
        _handleGeolocationError: function(a) {
            var b = a.code, c = a.message || (1 === b ? "permission denied" : 2 === b ? "position unavailable" : "timeout");
            this._locateOptions.setView && !this._loaded && this.fitWorld(), this.fire("locationerror", {
                code: b,
                message: "Geolocation error: " + c + "."
            });
        },
        _handleGeolocationResponse: function(a) {
            var b = a.coords.latitude, c = a.coords.longitude, d = new e.LatLng(b, c), f = d.toBounds(a.coords.accuracy), g = this._locateOptions;
            if (g.setView) {
                var h = this.getBoundsZoom(f);
                this.setView(d, g.maxZoom ? Math.min(h, g.maxZoom) : h);
            }
            var i = {
                latlng: d,
                bounds: f,
                timestamp: a.timestamp
            };
            for (var j in a.coords) "number" == typeof a.coords[j] && (i[j] = a.coords[j]);
            this.fire("locationfound", i);
        },
        addHandler: function(a, b) {
            if (!b) return this;
            var c = this[a] = new b(this);
            return this._handlers.push(c), this.options[a] && c.enable(), this;
        },
        remove: function() {
            if (this._initEvents(!0), this._containerId !== this._container._leaflet_id) throw new Error("Map container is being reused by another instance");
            try {
                delete this._container._leaflet_id, delete this._containerId;
            } catch (a) {
                this._container._leaflet_id = c, this._containerId = c;
            }
            e.DomUtil.remove(this._mapPane), this._clearControlPos && this._clearControlPos(), 
            this._clearHandlers(), this._loaded && this.fire("unload");
            for (var a in this._layers) this._layers[a].remove();
            return this;
        },
        createPane: function(a, b) {
            var c = "leaflet-pane" + (a ? " leaflet-" + a.replace("Pane", "") + "-pane" : ""), d = e.DomUtil.create("div", c, b || this._mapPane);
            return a && (this._panes[a] = d), d;
        },
        getCenter: function() {
            return this._checkIfLoaded(), this._lastCenter && !this._moved() ? this._lastCenter : this.layerPointToLatLng(this._getCenterLayerPoint());
        },
        getZoom: function() {
            return this._zoom;
        },
        getBounds: function() {
            var a = this.getPixelBounds(), b = this.unproject(a.getBottomLeft()), c = this.unproject(a.getTopRight());
            return new e.LatLngBounds(b, c);
        },
        getMinZoom: function() {
            return this.options.minZoom === c ? this._layersMinZoom || 0 : this.options.minZoom;
        },
        getMaxZoom: function() {
            return this.options.maxZoom === c ? this._layersMaxZoom === c ? 1 / 0 : this._layersMaxZoom : this.options.maxZoom;
        },
        getBoundsZoom: function(a, b, c) {
            a = e.latLngBounds(a), c = e.point(c || [ 0, 0 ]);
            var d = this.getZoom() || 0, f = this.getMinZoom(), g = this.getMaxZoom(), h = a.getNorthWest(), i = a.getSouthEast(), j = this.getSize().subtract(c), k = e.bounds(this.project(i, d), this.project(h, d)).getSize(), l = e.Browser.any3d ? this.options.zoomSnap : 1, m = Math.min(j.x / k.x, j.y / k.y);
            return d = this.getScaleZoom(m, d), l && (d = Math.round(d / (l / 100)) * (l / 100), 
            d = b ? Math.ceil(d / l) * l : Math.floor(d / l) * l), Math.max(f, Math.min(g, d));
        },
        getSize: function() {
            return this._size && !this._sizeChanged || (this._size = new e.Point(this._container.clientWidth || 0, this._container.clientHeight || 0), 
            this._sizeChanged = !1), this._size.clone();
        },
        getPixelBounds: function(a, b) {
            var c = this._getTopLeftPoint(a, b);
            return new e.Bounds(c, c.add(this.getSize()));
        },
        getPixelOrigin: function() {
            return this._checkIfLoaded(), this._pixelOrigin;
        },
        getPixelWorldBounds: function(a) {
            return this.options.crs.getProjectedBounds(a === c ? this.getZoom() : a);
        },
        getPane: function(a) {
            return "string" == typeof a ? this._panes[a] : a;
        },
        getPanes: function() {
            return this._panes;
        },
        getContainer: function() {
            return this._container;
        },
        getZoomScale: function(a, b) {
            var d = this.options.crs;
            return b = b === c ? this._zoom : b, d.scale(a) / d.scale(b);
        },
        getScaleZoom: function(a, b) {
            var d = this.options.crs;
            b = b === c ? this._zoom : b;
            var e = d.zoom(a * d.scale(b));
            return isNaN(e) ? 1 / 0 : e;
        },
        project: function(a, b) {
            return b = b === c ? this._zoom : b, this.options.crs.latLngToPoint(e.latLng(a), b);
        },
        unproject: function(a, b) {
            return b = b === c ? this._zoom : b, this.options.crs.pointToLatLng(e.point(a), b);
        },
        layerPointToLatLng: function(a) {
            var b = e.point(a).add(this.getPixelOrigin());
            return this.unproject(b);
        },
        latLngToLayerPoint: function(a) {
            return this.project(e.latLng(a))._round()._subtract(this.getPixelOrigin());
        },
        wrapLatLng: function(a) {
            return this.options.crs.wrapLatLng(e.latLng(a));
        },
        wrapLatLngBounds: function(a) {
            return this.options.crs.wrapLatLngBounds(e.latLngBounds(a));
        },
        distance: function(a, b) {
            return this.options.crs.distance(e.latLng(a), e.latLng(b));
        },
        containerPointToLayerPoint: function(a) {
            return e.point(a).subtract(this._getMapPanePos());
        },
        layerPointToContainerPoint: function(a) {
            return e.point(a).add(this._getMapPanePos());
        },
        containerPointToLatLng: function(a) {
            var b = this.containerPointToLayerPoint(e.point(a));
            return this.layerPointToLatLng(b);
        },
        latLngToContainerPoint: function(a) {
            return this.layerPointToContainerPoint(this.latLngToLayerPoint(e.latLng(a)));
        },
        mouseEventToContainerPoint: function(a) {
            return e.DomEvent.getMousePosition(a, this._container);
        },
        mouseEventToLayerPoint: function(a) {
            return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(a));
        },
        mouseEventToLatLng: function(a) {
            return this.layerPointToLatLng(this.mouseEventToLayerPoint(a));
        },
        _initContainer: function(a) {
            var b = this._container = e.DomUtil.get(a);
            if (!b) throw new Error("Map container not found.");
            if (b._leaflet_id) throw new Error("Map container is already initialized.");
            e.DomEvent.addListener(b, "scroll", this._onScroll, this), this._containerId = e.Util.stamp(b);
        },
        _initLayout: function() {
            var a = this._container;
            this._fadeAnimated = this.options.fadeAnimation && e.Browser.any3d, e.DomUtil.addClass(a, "leaflet-container" + (e.Browser.touch ? " leaflet-touch" : "") + (e.Browser.retina ? " leaflet-retina" : "") + (e.Browser.ielt9 ? " leaflet-oldie" : "") + (e.Browser.safari ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
            var b = e.DomUtil.getStyle(a, "position");
            "absolute" !== b && "relative" !== b && "fixed" !== b && (a.style.position = "relative"), 
            this._initPanes(), this._initControlPos && this._initControlPos();
        },
        _initPanes: function() {
            var a = this._panes = {};
            this._paneRenderers = {}, this._mapPane = this.createPane("mapPane", this._container), 
            e.DomUtil.setPosition(this._mapPane, new e.Point(0, 0)), this.createPane("tilePane"), 
            this.createPane("shadowPane"), this.createPane("overlayPane"), this.createPane("markerPane"), 
            this.createPane("tooltipPane"), this.createPane("popupPane"), this.options.markerZoomAnimation || (e.DomUtil.addClass(a.markerPane, "leaflet-zoom-hide"), 
            e.DomUtil.addClass(a.shadowPane, "leaflet-zoom-hide"));
        },
        _resetView: function(a, b) {
            e.DomUtil.setPosition(this._mapPane, new e.Point(0, 0));
            var c = !this._loaded;
            this._loaded = !0, b = this._limitZoom(b), this.fire("viewprereset");
            var d = this._zoom !== b;
            this._moveStart(d)._move(a, b)._moveEnd(d), this.fire("viewreset"), c && this.fire("load");
        },
        _moveStart: function(a) {
            return a && this.fire("zoomstart"), this.fire("movestart");
        },
        _move: function(a, b, d) {
            b === c && (b = this._zoom);
            var e = this._zoom !== b;
            return this._zoom = b, this._lastCenter = a, this._pixelOrigin = this._getNewPixelOrigin(a), 
            (e || d && d.pinch) && this.fire("zoom", d), this.fire("move", d);
        },
        _moveEnd: function(a) {
            return a && this.fire("zoomend"), this.fire("moveend");
        },
        _stop: function() {
            return e.Util.cancelAnimFrame(this._flyToFrame), this._panAnim && this._panAnim.stop(), 
            this;
        },
        _rawPanBy: function(a) {
            e.DomUtil.setPosition(this._mapPane, this._getMapPanePos().subtract(a));
        },
        _getZoomSpan: function() {
            return this.getMaxZoom() - this.getMinZoom();
        },
        _panInsideMaxBounds: function() {
            this._enforcingBounds || this.panInsideBounds(this.options.maxBounds);
        },
        _checkIfLoaded: function() {
            if (!this._loaded) throw new Error("Set map center and zoom first.");
        },
        _initEvents: function(b) {
            if (e.DomEvent) {
                this._targets = {}, this._targets[e.stamp(this._container)] = this;
                var c = b ? "off" : "on";
                e.DomEvent[c](this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress", this._handleDOMEvent, this), 
                this.options.trackResize && e.DomEvent[c](a, "resize", this._onResize, this), e.Browser.any3d && this.options.transform3DLimit && this[c]("moveend", this._onMoveEnd);
            }
        },
        _onResize: function() {
            e.Util.cancelAnimFrame(this._resizeRequest), this._resizeRequest = e.Util.requestAnimFrame(function() {
                this.invalidateSize({
                    debounceMoveend: !0
                });
            }, this);
        },
        _onScroll: function() {
            this._container.scrollTop = 0, this._container.scrollLeft = 0;
        },
        _onMoveEnd: function() {
            var a = this._getMapPanePos();
            Math.max(Math.abs(a.x), Math.abs(a.y)) >= this.options.transform3DLimit && this._resetView(this.getCenter(), this.getZoom());
        },
        _findEventTargets: function(a, b) {
            for (var c, d = [], f = "mouseout" === b || "mouseover" === b, g = a.target || a.srcElement, h = !1; g; ) {
                if ((c = this._targets[e.stamp(g)]) && ("click" === b || "preclick" === b) && !a._simulated && this._draggableMoved(c)) {
                    h = !0;
                    break;
                }
                if (c && c.listens(b, !0)) {
                    if (f && !e.DomEvent._isExternalTarget(g, a)) break;
                    if (d.push(c), f) break;
                }
                if (g === this._container) break;
                g = g.parentNode;
            }
            return d.length || h || f || !e.DomEvent._isExternalTarget(g, a) || (d = [ this ]), 
            d;
        },
        _handleDOMEvent: function(a) {
            if (this._loaded && !e.DomEvent._skipped(a)) {
                var b = "keypress" === a.type && 13 === a.keyCode ? "click" : a.type;
                "mousedown" === b && e.DomUtil.preventOutline(a.target || a.srcElement), this._fireDOMEvent(a, b);
            }
        },
        _fireDOMEvent: function(a, b, c) {
            if ("click" === a.type) {
                var d = e.Util.extend({}, a);
                d.type = "preclick", this._fireDOMEvent(d, d.type, c);
            }
            if (!a._stopped && (c = (c || []).concat(this._findEventTargets(a, b)), c.length)) {
                var f = c[0];
                "contextmenu" === b && f.listens(b, !0) && e.DomEvent.preventDefault(a);
                var g = {
                    originalEvent: a
                };
                if ("keypress" !== a.type) {
                    var h = f instanceof e.Marker;
                    g.containerPoint = h ? this.latLngToContainerPoint(f.getLatLng()) : this.mouseEventToContainerPoint(a), 
                    g.layerPoint = this.containerPointToLayerPoint(g.containerPoint), g.latlng = h ? f.getLatLng() : this.layerPointToLatLng(g.layerPoint);
                }
                for (var i = 0; i < c.length; i++) if (c[i].fire(b, g, !0), g.originalEvent._stopped || c[i].options.nonBubblingEvents && -1 !== e.Util.indexOf(c[i].options.nonBubblingEvents, b)) return;
            }
        },
        _draggableMoved: function(a) {
            return a = a.dragging && a.dragging.enabled() ? a : this, a.dragging && a.dragging.moved() || this.boxZoom && this.boxZoom.moved();
        },
        _clearHandlers: function() {
            for (var a = 0, b = this._handlers.length; a < b; a++) this._handlers[a].disable();
        },
        whenReady: function(a, b) {
            return this._loaded ? a.call(b || this, {
                target: this
            }) : this.on("load", a, b), this;
        },
        _getMapPanePos: function() {
            return e.DomUtil.getPosition(this._mapPane) || new e.Point(0, 0);
        },
        _moved: function() {
            var a = this._getMapPanePos();
            return a && !a.equals([ 0, 0 ]);
        },
        _getTopLeftPoint: function(a, b) {
            return (a && b !== c ? this._getNewPixelOrigin(a, b) : this.getPixelOrigin()).subtract(this._getMapPanePos());
        },
        _getNewPixelOrigin: function(a, b) {
            var c = this.getSize()._divideBy(2);
            return this.project(a, b)._subtract(c)._add(this._getMapPanePos())._round();
        },
        _latLngToNewLayerPoint: function(a, b, c) {
            var d = this._getNewPixelOrigin(c, b);
            return this.project(a, b)._subtract(d);
        },
        _latLngBoundsToNewLayerBounds: function(a, b, c) {
            var d = this._getNewPixelOrigin(c, b);
            return e.bounds([ this.project(a.getSouthWest(), b)._subtract(d), this.project(a.getNorthWest(), b)._subtract(d), this.project(a.getSouthEast(), b)._subtract(d), this.project(a.getNorthEast(), b)._subtract(d) ]);
        },
        _getCenterLayerPoint: function() {
            return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
        },
        _getCenterOffset: function(a) {
            return this.latLngToLayerPoint(a).subtract(this._getCenterLayerPoint());
        },
        _limitCenter: function(a, b, c) {
            if (!c) return a;
            var d = this.project(a, b), f = this.getSize().divideBy(2), g = new e.Bounds(d.subtract(f), d.add(f)), h = this._getBoundsOffset(g, c, b);
            return h.round().equals([ 0, 0 ]) ? a : this.unproject(d.add(h), b);
        },
        _limitOffset: function(a, b) {
            if (!b) return a;
            var c = this.getPixelBounds(), d = new e.Bounds(c.min.add(a), c.max.add(a));
            return a.add(this._getBoundsOffset(d, b));
        },
        _getBoundsOffset: function(a, b, c) {
            var d = e.bounds(this.project(b.getNorthEast(), c), this.project(b.getSouthWest(), c)), f = d.min.subtract(a.min), g = d.max.subtract(a.max), h = this._rebound(f.x, -g.x), i = this._rebound(f.y, -g.y);
            return new e.Point(h, i);
        },
        _rebound: function(a, b) {
            return a + b > 0 ? Math.round(a - b) / 2 : Math.max(0, Math.ceil(a)) - Math.max(0, Math.floor(b));
        },
        _limitZoom: function(a) {
            var b = this.getMinZoom(), c = this.getMaxZoom(), d = e.Browser.any3d ? this.options.zoomSnap : 1;
            return d && (a = Math.round(a / d) * d), Math.max(b, Math.min(c, a));
        },
        _onPanTransitionStep: function() {
            this.fire("move");
        },
        _onPanTransitionEnd: function() {
            e.DomUtil.removeClass(this._mapPane, "leaflet-pan-anim"), this.fire("moveend");
        },
        _tryAnimatedPan: function(a, b) {
            var c = this._getCenterOffset(a)._floor();
            return !(!0 !== (b && b.animate) && !this.getSize().contains(c)) && (this.panBy(c, b), 
            !0);
        },
        _createAnimProxy: function() {
            var a = this._proxy = e.DomUtil.create("div", "leaflet-proxy leaflet-zoom-animated");
            this._panes.mapPane.appendChild(a), this.on("zoomanim", function(b) {
                var c = e.DomUtil.TRANSFORM, d = a.style[c];
                e.DomUtil.setTransform(a, this.project(b.center, b.zoom), this.getZoomScale(b.zoom, 1)), 
                d === a.style[c] && this._animatingZoom && this._onZoomTransitionEnd();
            }, this), this.on("load moveend", function() {
                var b = this.getCenter(), c = this.getZoom();
                e.DomUtil.setTransform(a, this.project(b, c), this.getZoomScale(c, 1));
            }, this);
        },
        _catchTransitionEnd: function(a) {
            this._animatingZoom && a.propertyName.indexOf("transform") >= 0 && this._onZoomTransitionEnd();
        },
        _nothingToAnimate: function() {
            return !this._container.getElementsByClassName("leaflet-zoom-animated").length;
        },
        _tryAnimatedZoom: function(a, b, c) {
            if (this._animatingZoom) return !0;
            if (c = c || {}, !this._zoomAnimated || !1 === c.animate || this._nothingToAnimate() || Math.abs(b - this._zoom) > this.options.zoomAnimationThreshold) return !1;
            var d = this.getZoomScale(b), f = this._getCenterOffset(a)._divideBy(1 - 1 / d);
            return !(!0 !== c.animate && !this.getSize().contains(f)) && (e.Util.requestAnimFrame(function() {
                this._moveStart(!0)._animateZoom(a, b, !0);
            }, this), !0);
        },
        _animateZoom: function(a, b, c, d) {
            c && (this._animatingZoom = !0, this._animateToCenter = a, this._animateToZoom = b, 
            e.DomUtil.addClass(this._mapPane, "leaflet-zoom-anim")), this.fire("zoomanim", {
                center: a,
                zoom: b,
                noUpdate: d
            }), setTimeout(e.bind(this._onZoomTransitionEnd, this), 250);
        },
        _onZoomTransitionEnd: function() {
            this._animatingZoom && (e.DomUtil.removeClass(this._mapPane, "leaflet-zoom-anim"), 
            this._animatingZoom = !1, this._move(this._animateToCenter, this._animateToZoom), 
            e.Util.requestAnimFrame(function() {
                this._moveEnd(!0);
            }, this));
        }
    }), e.map = function(a, b) {
        return new e.Map(a, b);
    }, e.Layer = e.Evented.extend({
        options: {
            pane: "overlayPane",
            nonBubblingEvents: [],
            attribution: null
        },
        addTo: function(a) {
            return a.addLayer(this), this;
        },
        remove: function() {
            return this.removeFrom(this._map || this._mapToAdd);
        },
        removeFrom: function(a) {
            return a && a.removeLayer(this), this;
        },
        getPane: function(a) {
            return this._map.getPane(a ? this.options[a] || a : this.options.pane);
        },
        addInteractiveTarget: function(a) {
            return this._map._targets[e.stamp(a)] = this, this;
        },
        removeInteractiveTarget: function(a) {
            return delete this._map._targets[e.stamp(a)], this;
        },
        getAttribution: function() {
            return this.options.attribution;
        },
        _layerAdd: function(a) {
            var b = a.target;
            if (b.hasLayer(this)) {
                if (this._map = b, this._zoomAnimated = b._zoomAnimated, this.getEvents) {
                    var c = this.getEvents();
                    b.on(c, this), this.once("remove", function() {
                        b.off(c, this);
                    }, this);
                }
                this.onAdd(b), this.getAttribution && b.attributionControl && b.attributionControl.addAttribution(this.getAttribution()), 
                this.fire("add"), b.fire("layeradd", {
                    layer: this
                });
            }
        }
    }), e.Map.include({
        addLayer: function(a) {
            var b = e.stamp(a);
            return this._layers[b] ? this : (this._layers[b] = a, a._mapToAdd = this, a.beforeAdd && a.beforeAdd(this), 
            this.whenReady(a._layerAdd, a), this);
        },
        removeLayer: function(a) {
            var b = e.stamp(a);
            return this._layers[b] ? (this._loaded && a.onRemove(this), a.getAttribution && this.attributionControl && this.attributionControl.removeAttribution(a.getAttribution()), 
            delete this._layers[b], this._loaded && (this.fire("layerremove", {
                layer: a
            }), a.fire("remove")), a._map = a._mapToAdd = null, this) : this;
        },
        hasLayer: function(a) {
            return !!a && e.stamp(a) in this._layers;
        },
        eachLayer: function(a, b) {
            for (var c in this._layers) a.call(b, this._layers[c]);
            return this;
        },
        _addLayers: function(a) {
            a = a ? e.Util.isArray(a) ? a : [ a ] : [];
            for (var b = 0, c = a.length; b < c; b++) this.addLayer(a[b]);
        },
        _addZoomLimit: function(a) {
            !isNaN(a.options.maxZoom) && isNaN(a.options.minZoom) || (this._zoomBoundLayers[e.stamp(a)] = a, 
            this._updateZoomLevels());
        },
        _removeZoomLimit: function(a) {
            var b = e.stamp(a);
            this._zoomBoundLayers[b] && (delete this._zoomBoundLayers[b], this._updateZoomLevels());
        },
        _updateZoomLevels: function() {
            var a = 1 / 0, b = -1 / 0, d = this._getZoomSpan();
            for (var e in this._zoomBoundLayers) {
                var f = this._zoomBoundLayers[e].options;
                a = f.minZoom === c ? a : Math.min(a, f.minZoom), b = f.maxZoom === c ? b : Math.max(b, f.maxZoom);
            }
            this._layersMaxZoom = b === -1 / 0 ? c : b, this._layersMinZoom = a === 1 / 0 ? c : a, 
            d !== this._getZoomSpan() && this.fire("zoomlevelschange"), this.options.maxZoom === c && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom && this.setZoom(this._layersMaxZoom), 
            this.options.minZoom === c && this._layersMinZoom && this.getZoom() < this._layersMinZoom && this.setZoom(this._layersMinZoom);
        }
    });
    var g = "_leaflet_events";
    e.DomEvent = {
        on: function(a, b, c, d) {
            if ("object" == typeof b) for (var f in b) this._on(a, f, b[f], c); else {
                b = e.Util.splitWords(b);
                for (var g = 0, h = b.length; g < h; g++) this._on(a, b[g], c, d);
            }
            return this;
        },
        off: function(a, b, c, d) {
            if ("object" == typeof b) for (var f in b) this._off(a, f, b[f], c); else {
                b = e.Util.splitWords(b);
                for (var g = 0, h = b.length; g < h; g++) this._off(a, b[g], c, d);
            }
            return this;
        },
        _on: function(b, c, d, f) {
            var h = c + e.stamp(d) + (f ? "_" + e.stamp(f) : "");
            if (b[g] && b[g][h]) return this;
            var i = function(c) {
                return d.call(f || b, c || a.event);
            }, j = i;
            return e.Browser.pointer && 0 === c.indexOf("touch") ? this.addPointerListener(b, c, i, h) : !e.Browser.touch || "dblclick" !== c || !this.addDoubleTapListener || e.Browser.pointer && e.Browser.chrome ? "addEventListener" in b ? "mousewheel" === c ? b.addEventListener("onwheel" in b ? "wheel" : "mousewheel", i, !1) : "mouseenter" === c || "mouseleave" === c ? (i = function(c) {
                c = c || a.event, e.DomEvent._isExternalTarget(b, c) && j(c);
            }, b.addEventListener("mouseenter" === c ? "mouseover" : "mouseout", i, !1)) : ("click" === c && e.Browser.android && (i = function(a) {
                return e.DomEvent._filterClick(a, j);
            }), b.addEventListener(c, i, !1)) : "attachEvent" in b && b.attachEvent("on" + c, i) : this.addDoubleTapListener(b, i, h), 
            b[g] = b[g] || {}, b[g][h] = i, this;
        },
        _off: function(a, b, c, d) {
            var f = b + e.stamp(c) + (d ? "_" + e.stamp(d) : ""), h = a[g] && a[g][f];
            return h ? (e.Browser.pointer && 0 === b.indexOf("touch") ? this.removePointerListener(a, b, f) : e.Browser.touch && "dblclick" === b && this.removeDoubleTapListener ? this.removeDoubleTapListener(a, f) : "removeEventListener" in a ? "mousewheel" === b ? a.removeEventListener("onwheel" in a ? "wheel" : "mousewheel", h, !1) : a.removeEventListener("mouseenter" === b ? "mouseover" : "mouseleave" === b ? "mouseout" : b, h, !1) : "detachEvent" in a && a.detachEvent("on" + b, h), 
            a[g][f] = null, this) : this;
        },
        stopPropagation: function(a) {
            return a.stopPropagation ? a.stopPropagation() : a.originalEvent ? a.originalEvent._stopped = !0 : a.cancelBubble = !0, 
            e.DomEvent._skipped(a), this;
        },
        disableScrollPropagation: function(a) {
            return e.DomEvent.on(a, "mousewheel", e.DomEvent.stopPropagation);
        },
        disableClickPropagation: function(a) {
            var b = e.DomEvent.stopPropagation;
            return e.DomEvent.on(a, e.Draggable.START.join(" "), b), e.DomEvent.on(a, {
                click: e.DomEvent._fakeStop,
                dblclick: b
            });
        },
        preventDefault: function(a) {
            return a.preventDefault ? a.preventDefault() : a.returnValue = !1, this;
        },
        stop: function(a) {
            return e.DomEvent.preventDefault(a).stopPropagation(a);
        },
        getMousePosition: function(a, b) {
            if (!b) return new e.Point(a.clientX, a.clientY);
            var c = b.getBoundingClientRect();
            return new e.Point(a.clientX - c.left - b.clientLeft, a.clientY - c.top - b.clientTop);
        },
        _wheelPxFactor: e.Browser.win && e.Browser.chrome ? 2 : e.Browser.gecko ? a.devicePixelRatio : 1,
        getWheelDelta: function(a) {
            return e.Browser.edge ? a.wheelDeltaY / 2 : a.deltaY && 0 === a.deltaMode ? -a.deltaY / e.DomEvent._wheelPxFactor : a.deltaY && 1 === a.deltaMode ? 20 * -a.deltaY : a.deltaY && 2 === a.deltaMode ? 60 * -a.deltaY : a.deltaX || a.deltaZ ? 0 : a.wheelDelta ? (a.wheelDeltaY || a.wheelDelta) / 2 : a.detail && Math.abs(a.detail) < 32765 ? 20 * -a.detail : a.detail ? a.detail / -32765 * 60 : 0;
        },
        _skipEvents: {},
        _fakeStop: function(a) {
            e.DomEvent._skipEvents[a.type] = !0;
        },
        _skipped: function(a) {
            var b = this._skipEvents[a.type];
            return this._skipEvents[a.type] = !1, b;
        },
        _isExternalTarget: function(a, b) {
            var c = b.relatedTarget;
            if (!c) return !0;
            try {
                for (;c && c !== a; ) c = c.parentNode;
            } catch (a) {
                return !1;
            }
            return c !== a;
        },
        _filterClick: function(a, b) {
            var c = a.timeStamp || a.originalEvent && a.originalEvent.timeStamp, d = e.DomEvent._lastClick && c - e.DomEvent._lastClick;
            if (d && d > 100 && d < 500 || a.target._simulatedClick && !a._simulated) return void e.DomEvent.stop(a);
            e.DomEvent._lastClick = c, b(a);
        }
    }, e.DomEvent.addListener = e.DomEvent.on, e.DomEvent.removeListener = e.DomEvent.off, 
    e.PosAnimation = e.Evented.extend({
        run: function(a, b, c, d) {
            this.stop(), this._el = a, this._inProgress = !0, this._duration = c || .25, this._easeOutPower = 1 / Math.max(d || .5, .2), 
            this._startPos = e.DomUtil.getPosition(a), this._offset = b.subtract(this._startPos), 
            this._startTime = +new Date(), this.fire("start"), this._animate();
        },
        stop: function() {
            this._inProgress && (this._step(!0), this._complete());
        },
        _animate: function() {
            this._animId = e.Util.requestAnimFrame(this._animate, this), this._step();
        },
        _step: function(a) {
            var b = +new Date() - this._startTime, c = 1e3 * this._duration;
            b < c ? this._runFrame(this._easeOut(b / c), a) : (this._runFrame(1), this._complete());
        },
        _runFrame: function(a, b) {
            var c = this._startPos.add(this._offset.multiplyBy(a));
            b && c._round(), e.DomUtil.setPosition(this._el, c), this.fire("step");
        },
        _complete: function() {
            e.Util.cancelAnimFrame(this._animId), this._inProgress = !1, this.fire("end");
        },
        _easeOut: function(a) {
            return 1 - Math.pow(1 - a, this._easeOutPower);
        }
    }), e.Projection.Mercator = {
        R: 6378137,
        R_MINOR: 6356752.314245179,
        bounds: e.bounds([ -20037508.34279, -15496570.73972 ], [ 20037508.34279, 18764656.23138 ]),
        project: function(a) {
            var b = Math.PI / 180, c = this.R, d = a.lat * b, f = this.R_MINOR / c, g = Math.sqrt(1 - f * f), h = g * Math.sin(d), i = Math.tan(Math.PI / 4 - d / 2) / Math.pow((1 - h) / (1 + h), g / 2);
            return d = -c * Math.log(Math.max(i, 1e-10)), new e.Point(a.lng * b * c, d);
        },
        unproject: function(a) {
            for (var b, c = 180 / Math.PI, d = this.R, f = this.R_MINOR / d, g = Math.sqrt(1 - f * f), h = Math.exp(-a.y / d), i = Math.PI / 2 - 2 * Math.atan(h), j = 0, k = .1; j < 15 && Math.abs(k) > 1e-7; j++) b = g * Math.sin(i), 
            b = Math.pow((1 - b) / (1 + b), g / 2), k = Math.PI / 2 - 2 * Math.atan(h * b) - i, 
            i += k;
            return new e.LatLng(i * c, a.x * c / d);
        }
    }, e.CRS.EPSG3395 = e.extend({}, e.CRS.Earth, {
        code: "EPSG:3395",
        projection: e.Projection.Mercator,
        transformation: function() {
            var a = .5 / (Math.PI * e.Projection.Mercator.R);
            return new e.Transformation(a, .5, -a, .5);
        }()
    }), e.GridLayer = e.Layer.extend({
        options: {
            tileSize: 256,
            opacity: 1,
            updateWhenIdle: e.Browser.mobile,
            updateWhenZooming: !0,
            updateInterval: 200,
            zIndex: 1,
            bounds: null,
            minZoom: 0,
            maxZoom: c,
            noWrap: !1,
            pane: "tilePane",
            className: "",
            keepBuffer: 2
        },
        initialize: function(a) {
            e.setOptions(this, a);
        },
        onAdd: function() {
            this._initContainer(), this._levels = {}, this._tiles = {}, this._resetView(), this._update();
        },
        beforeAdd: function(a) {
            a._addZoomLimit(this);
        },
        onRemove: function(a) {
            this._removeAllTiles(), e.DomUtil.remove(this._container), a._removeZoomLimit(this), 
            this._container = null, this._tileZoom = null;
        },
        bringToFront: function() {
            return this._map && (e.DomUtil.toFront(this._container), this._setAutoZIndex(Math.max)), 
            this;
        },
        bringToBack: function() {
            return this._map && (e.DomUtil.toBack(this._container), this._setAutoZIndex(Math.min)), 
            this;
        },
        getContainer: function() {
            return this._container;
        },
        setOpacity: function(a) {
            return this.options.opacity = a, this._updateOpacity(), this;
        },
        setZIndex: function(a) {
            return this.options.zIndex = a, this._updateZIndex(), this;
        },
        isLoading: function() {
            return this._loading;
        },
        redraw: function() {
            return this._map && (this._removeAllTiles(), this._update()), this;
        },
        getEvents: function() {
            var a = {
                viewprereset: this._invalidateAll,
                viewreset: this._resetView,
                zoom: this._resetView,
                moveend: this._onMoveEnd
            };
            return this.options.updateWhenIdle || (this._onMove || (this._onMove = e.Util.throttle(this._onMoveEnd, this.options.updateInterval, this)), 
            a.move = this._onMove), this._zoomAnimated && (a.zoomanim = this._animateZoom), 
            a;
        },
        createTile: function() {
            return b.createElement("div");
        },
        getTileSize: function() {
            var a = this.options.tileSize;
            return a instanceof e.Point ? a : new e.Point(a, a);
        },
        _updateZIndex: function() {
            this._container && this.options.zIndex !== c && null !== this.options.zIndex && (this._container.style.zIndex = this.options.zIndex);
        },
        _setAutoZIndex: function(a) {
            for (var b, c = this.getPane().children, d = -a(-1 / 0, 1 / 0), e = 0, f = c.length; e < f; e++) b = c[e].style.zIndex, 
            c[e] !== this._container && b && (d = a(d, +b));
            isFinite(d) && (this.options.zIndex = d + a(-1, 1), this._updateZIndex());
        },
        _updateOpacity: function() {
            if (this._map && !e.Browser.ielt9) {
                e.DomUtil.setOpacity(this._container, this.options.opacity);
                var a = +new Date(), b = !1, c = !1;
                for (var d in this._tiles) {
                    var f = this._tiles[d];
                    if (f.current && f.loaded) {
                        var g = Math.min(1, (a - f.loaded) / 200);
                        e.DomUtil.setOpacity(f.el, g), g < 1 ? b = !0 : (f.active && (c = !0), f.active = !0);
                    }
                }
                c && !this._noPrune && this._pruneTiles(), b && (e.Util.cancelAnimFrame(this._fadeFrame), 
                this._fadeFrame = e.Util.requestAnimFrame(this._updateOpacity, this));
            }
        },
        _initContainer: function() {
            this._container || (this._container = e.DomUtil.create("div", "leaflet-layer " + (this.options.className || "")), 
            this._updateZIndex(), this.options.opacity < 1 && this._updateOpacity(), this.getPane().appendChild(this._container));
        },
        _updateLevels: function() {
            var a = this._tileZoom, b = this.options.maxZoom;
            if (a === c) return c;
            for (var d in this._levels) this._levels[d].el.children.length || d === a ? this._levels[d].el.style.zIndex = b - Math.abs(a - d) : (e.DomUtil.remove(this._levels[d].el), 
            this._removeTilesAtZoom(d), delete this._levels[d]);
            var f = this._levels[a], g = this._map;
            return f || (f = this._levels[a] = {}, f.el = e.DomUtil.create("div", "leaflet-tile-container leaflet-zoom-animated", this._container), 
            f.el.style.zIndex = b, f.origin = g.project(g.unproject(g.getPixelOrigin()), a).round(), 
            f.zoom = a, this._setZoomTransform(f, g.getCenter(), g.getZoom()), e.Util.falseFn(f.el.offsetWidth)), 
            this._level = f, f;
        },
        _pruneTiles: function() {
            if (this._map) {
                var a, b, c = this._map.getZoom();
                if (c > this.options.maxZoom || c < this.options.minZoom) return void this._removeAllTiles();
                for (a in this._tiles) b = this._tiles[a], b.retain = b.current;
                for (a in this._tiles) if (b = this._tiles[a], b.current && !b.active) {
                    var d = b.coords;
                    this._retainParent(d.x, d.y, d.z, d.z - 5) || this._retainChildren(d.x, d.y, d.z, d.z + 2);
                }
                for (a in this._tiles) this._tiles[a].retain || this._removeTile(a);
            }
        },
        _removeTilesAtZoom: function(a) {
            for (var b in this._tiles) this._tiles[b].coords.z === a && this._removeTile(b);
        },
        _removeAllTiles: function() {
            for (var a in this._tiles) this._removeTile(a);
        },
        _invalidateAll: function() {
            for (var a in this._levels) e.DomUtil.remove(this._levels[a].el), delete this._levels[a];
            this._removeAllTiles(), this._tileZoom = null;
        },
        _retainParent: function(a, b, c, d) {
            var f = Math.floor(a / 2), g = Math.floor(b / 2), h = c - 1, i = new e.Point(+f, +g);
            i.z = +h;
            var j = this._tileCoordsToKey(i), k = this._tiles[j];
            return k && k.active ? (k.retain = !0, !0) : (k && k.loaded && (k.retain = !0), 
            h > d && this._retainParent(f, g, h, d));
        },
        _retainChildren: function(a, b, c, d) {
            for (var f = 2 * a; f < 2 * a + 2; f++) for (var g = 2 * b; g < 2 * b + 2; g++) {
                var h = new e.Point(f, g);
                h.z = c + 1;
                var i = this._tileCoordsToKey(h), j = this._tiles[i];
                j && j.active ? j.retain = !0 : (j && j.loaded && (j.retain = !0), c + 1 < d && this._retainChildren(f, g, c + 1, d));
            }
        },
        _resetView: function(a) {
            var b = a && (a.pinch || a.flyTo);
            this._setView(this._map.getCenter(), this._map.getZoom(), b, b);
        },
        _animateZoom: function(a) {
            this._setView(a.center, a.zoom, !0, a.noUpdate);
        },
        _setView: function(a, b, d, e) {
            var f = Math.round(b);
            (this.options.maxZoom !== c && f > this.options.maxZoom || this.options.minZoom !== c && f < this.options.minZoom) && (f = c);
            var g = this.options.updateWhenZooming && f !== this._tileZoom;
            e && !g || (this._tileZoom = f, this._abortLoading && this._abortLoading(), this._updateLevels(), 
            this._resetGrid(), f !== c && this._update(a), d || this._pruneTiles(), this._noPrune = !!d), 
            this._setZoomTransforms(a, b);
        },
        _setZoomTransforms: function(a, b) {
            for (var c in this._levels) this._setZoomTransform(this._levels[c], a, b);
        },
        _setZoomTransform: function(a, b, c) {
            var d = this._map.getZoomScale(c, a.zoom), f = a.origin.multiplyBy(d).subtract(this._map._getNewPixelOrigin(b, c)).round();
            e.Browser.any3d ? e.DomUtil.setTransform(a.el, f, d) : e.DomUtil.setPosition(a.el, f);
        },
        _resetGrid: function() {
            var a = this._map, b = a.options.crs, c = this._tileSize = this.getTileSize(), d = this._tileZoom, e = this._map.getPixelWorldBounds(this._tileZoom);
            e && (this._globalTileRange = this._pxBoundsToTileRange(e)), this._wrapX = b.wrapLng && !this.options.noWrap && [ Math.floor(a.project([ 0, b.wrapLng[0] ], d).x / c.x), Math.ceil(a.project([ 0, b.wrapLng[1] ], d).x / c.y) ], 
            this._wrapY = b.wrapLat && !this.options.noWrap && [ Math.floor(a.project([ b.wrapLat[0], 0 ], d).y / c.x), Math.ceil(a.project([ b.wrapLat[1], 0 ], d).y / c.y) ];
        },
        _onMoveEnd: function() {
            this._map && !this._map._animatingZoom && this._update();
        },
        _getTiledPixelBounds: function(a) {
            var b = this._map, c = b._animatingZoom ? Math.max(b._animateToZoom, b.getZoom()) : b.getZoom(), d = b.getZoomScale(c, this._tileZoom), f = b.project(a, this._tileZoom).floor(), g = b.getSize().divideBy(2 * d);
            return new e.Bounds(f.subtract(g), f.add(g));
        },
        _update: function(a) {
            var d = this._map;
            if (d) {
                var f = d.getZoom();
                if (a === c && (a = d.getCenter()), this._tileZoom !== c) {
                    var g = this._getTiledPixelBounds(a), h = this._pxBoundsToTileRange(g), i = h.getCenter(), j = [], k = this.options.keepBuffer, l = new e.Bounds(h.getBottomLeft().subtract([ k, -k ]), h.getTopRight().add([ k, -k ]));
                    for (var m in this._tiles) {
                        var n = this._tiles[m].coords;
                        n.z === this._tileZoom && l.contains(e.point(n.x, n.y)) || (this._tiles[m].current = !1);
                    }
                    if (Math.abs(f - this._tileZoom) > 1) return void this._setView(a, f);
                    for (var o = h.min.y; o <= h.max.y; o++) for (var p = h.min.x; p <= h.max.x; p++) {
                        var q = new e.Point(p, o);
                        if (q.z = this._tileZoom, this._isValidTile(q)) {
                            var r = this._tiles[this._tileCoordsToKey(q)];
                            r ? r.current = !0 : j.push(q);
                        }
                    }
                    if (j.sort(function(a, b) {
                        return a.distanceTo(i) - b.distanceTo(i);
                    }), 0 !== j.length) {
                        this._loading || (this._loading = !0, this.fire("loading"));
                        var s = b.createDocumentFragment();
                        for (p = 0; p < j.length; p++) this._addTile(j[p], s);
                        this._level.el.appendChild(s);
                    }
                }
            }
        },
        _isValidTile: function(a) {
            var b = this._map.options.crs;
            if (!b.infinite) {
                var c = this._globalTileRange;
                if (!b.wrapLng && (a.x < c.min.x || a.x > c.max.x) || !b.wrapLat && (a.y < c.min.y || a.y > c.max.y)) return !1;
            }
            if (!this.options.bounds) return !0;
            var d = this._tileCoordsToBounds(a);
            return e.latLngBounds(this.options.bounds).overlaps(d);
        },
        _keyToBounds: function(a) {
            return this._tileCoordsToBounds(this._keyToTileCoords(a));
        },
        _tileCoordsToBounds: function(a) {
            var b = this._map, c = this.getTileSize(), d = a.scaleBy(c), f = d.add(c), g = b.unproject(d, a.z), h = b.unproject(f, a.z), i = new e.LatLngBounds(g, h);
            return this.options.noWrap || b.wrapLatLngBounds(i), i;
        },
        _tileCoordsToKey: function(a) {
            return a.x + ":" + a.y + ":" + a.z;
        },
        _keyToTileCoords: function(a) {
            var b = a.split(":"), c = new e.Point(+b[0], +b[1]);
            return c.z = +b[2], c;
        },
        _removeTile: function(a) {
            var b = this._tiles[a];
            b && (e.DomUtil.remove(b.el), delete this._tiles[a], this.fire("tileunload", {
                tile: b.el,
                coords: this._keyToTileCoords(a)
            }));
        },
        _initTile: function(a) {
            e.DomUtil.addClass(a, "leaflet-tile");
            var b = this.getTileSize();
            a.style.width = b.x + "px", a.style.height = b.y + "px", a.onselectstart = e.Util.falseFn, 
            a.onmousemove = e.Util.falseFn, e.Browser.ielt9 && this.options.opacity < 1 && e.DomUtil.setOpacity(a, this.options.opacity), 
            e.Browser.android && !e.Browser.android23 && (a.style.WebkitBackfaceVisibility = "hidden");
        },
        _addTile: function(a, b) {
            var c = this._getTilePos(a), d = this._tileCoordsToKey(a), f = this.createTile(this._wrapCoords(a), e.bind(this._tileReady, this, a));
            this._initTile(f), this.createTile.length < 2 && e.Util.requestAnimFrame(e.bind(this._tileReady, this, a, null, f)), 
            e.DomUtil.setPosition(f, c), this._tiles[d] = {
                el: f,
                coords: a,
                current: !0
            }, b.appendChild(f), this.fire("tileloadstart", {
                tile: f,
                coords: a
            });
        },
        _tileReady: function(a, b, c) {
            if (this._map) {
                b && this.fire("tileerror", {
                    error: b,
                    tile: c,
                    coords: a
                });
                var d = this._tileCoordsToKey(a);
                c = this._tiles[d], c && (c.loaded = +new Date(), this._map._fadeAnimated ? (e.DomUtil.setOpacity(c.el, 0), 
                e.Util.cancelAnimFrame(this._fadeFrame), this._fadeFrame = e.Util.requestAnimFrame(this._updateOpacity, this)) : (c.active = !0, 
                this._pruneTiles()), b || (e.DomUtil.addClass(c.el, "leaflet-tile-loaded"), this.fire("tileload", {
                    tile: c.el,
                    coords: a
                })), this._noTilesToLoad() && (this._loading = !1, this.fire("load"), e.Browser.ielt9 || !this._map._fadeAnimated ? e.Util.requestAnimFrame(this._pruneTiles, this) : setTimeout(e.bind(this._pruneTiles, this), 250)));
            }
        },
        _getTilePos: function(a) {
            return a.scaleBy(this.getTileSize()).subtract(this._level.origin);
        },
        _wrapCoords: function(a) {
            var b = new e.Point(this._wrapX ? e.Util.wrapNum(a.x, this._wrapX) : a.x, this._wrapY ? e.Util.wrapNum(a.y, this._wrapY) : a.y);
            return b.z = a.z, b;
        },
        _pxBoundsToTileRange: function(a) {
            var b = this.getTileSize();
            return new e.Bounds(a.min.unscaleBy(b).floor(), a.max.unscaleBy(b).ceil().subtract([ 1, 1 ]));
        },
        _noTilesToLoad: function() {
            for (var a in this._tiles) if (!this._tiles[a].loaded) return !1;
            return !0;
        }
    }), e.gridLayer = function(a) {
        return new e.GridLayer(a);
    }, e.TileLayer = e.GridLayer.extend({
        options: {
            minZoom: 0,
            maxZoom: 18,
            maxNativeZoom: null,
            minNativeZoom: null,
            subdomains: "abc",
            errorTileUrl: "",
            zoomOffset: 0,
            tms: !1,
            zoomReverse: !1,
            detectRetina: !1,
            crossOrigin: !1
        },
        initialize: function(a, b) {
            this._url = a, b = e.setOptions(this, b), b.detectRetina && e.Browser.retina && b.maxZoom > 0 && (b.tileSize = Math.floor(b.tileSize / 2), 
            b.zoomReverse ? (b.zoomOffset--, b.minZoom++) : (b.zoomOffset++, b.maxZoom--), b.minZoom = Math.max(0, b.minZoom)), 
            "string" == typeof b.subdomains && (b.subdomains = b.subdomains.split("")), e.Browser.android || this.on("tileunload", this._onTileRemove);
        },
        setUrl: function(a, b) {
            return this._url = a, b || this.redraw(), this;
        },
        createTile: function(a, c) {
            var d = b.createElement("img");
            return e.DomEvent.on(d, "load", e.bind(this._tileOnLoad, this, c, d)), e.DomEvent.on(d, "error", e.bind(this._tileOnError, this, c, d)), 
            this.options.crossOrigin && (d.crossOrigin = ""), d.alt = "", d.setAttribute("role", "presentation"), 
            d.src = this.getTileUrl(a), d;
        },
        getTileUrl: function(a) {
            var b = {
                r: e.Browser.retina ? "@2x" : "",
                s: this._getSubdomain(a),
                x: a.x,
                y: a.y,
                z: this._getZoomForUrl()
            };
            if (this._map && !this._map.options.crs.infinite) {
                var c = this._globalTileRange.max.y - a.y;
                this.options.tms && (b.y = c), b["-y"] = c;
            }
            return e.Util.template(this._url, e.extend(b, this.options));
        },
        _tileOnLoad: function(a, b) {
            e.Browser.ielt9 ? setTimeout(e.bind(a, this, null, b), 0) : a(null, b);
        },
        _tileOnError: function(a, b, c) {
            var d = this.options.errorTileUrl;
            d && b.src !== d && (b.src = d), a(c, b);
        },
        getTileSize: function() {
            var a = this._map, b = e.GridLayer.prototype.getTileSize.call(this), c = this._tileZoom + this.options.zoomOffset, d = this.options.minNativeZoom, f = this.options.maxNativeZoom;
            return null !== d && c < d ? b.divideBy(a.getZoomScale(d, c)).round() : null !== f && c > f ? b.divideBy(a.getZoomScale(f, c)).round() : b;
        },
        _onTileRemove: function(a) {
            a.tile.onload = null;
        },
        _getZoomForUrl: function() {
            var a = this._tileZoom, b = this.options.maxZoom, c = this.options.zoomReverse, d = this.options.zoomOffset, e = this.options.minNativeZoom, f = this.options.maxNativeZoom;
            return c && (a = b - a), a += d, null !== e && a < e ? e : null !== f && a > f ? f : a;
        },
        _getSubdomain: function(a) {
            var b = Math.abs(a.x + a.y) % this.options.subdomains.length;
            return this.options.subdomains[b];
        },
        _abortLoading: function() {
            var a, b;
            for (a in this._tiles) this._tiles[a].coords.z !== this._tileZoom && (b = this._tiles[a].el, 
            b.onload = e.Util.falseFn, b.onerror = e.Util.falseFn, b.complete || (b.src = e.Util.emptyImageUrl, 
            e.DomUtil.remove(b)));
        }
    }), e.tileLayer = function(a, b) {
        return new e.TileLayer(a, b);
    }, e.TileLayer.WMS = e.TileLayer.extend({
        defaultWmsParams: {
            service: "WMS",
            request: "GetMap",
            layers: "",
            styles: "",
            format: "image/jpeg",
            transparent: !1,
            version: "1.1.1"
        },
        options: {
            crs: null,
            uppercase: !1
        },
        initialize: function(a, b) {
            this._url = a;
            var c = e.extend({}, this.defaultWmsParams);
            for (var d in b) d in this.options || (c[d] = b[d]);
            b = e.setOptions(this, b), c.width = c.height = b.tileSize * (b.detectRetina && e.Browser.retina ? 2 : 1), 
            this.wmsParams = c;
        },
        onAdd: function(a) {
            this._crs = this.options.crs || a.options.crs, this._wmsVersion = parseFloat(this.wmsParams.version);
            var b = this._wmsVersion >= 1.3 ? "crs" : "srs";
            this.wmsParams[b] = this._crs.code, e.TileLayer.prototype.onAdd.call(this, a);
        },
        getTileUrl: function(a) {
            var b = this._tileCoordsToBounds(a), c = this._crs.project(b.getNorthWest()), d = this._crs.project(b.getSouthEast()), f = (this._wmsVersion >= 1.3 && this._crs === e.CRS.EPSG4326 ? [ d.y, c.x, c.y, d.x ] : [ c.x, d.y, d.x, c.y ]).join(","), g = e.TileLayer.prototype.getTileUrl.call(this, a);
            return g + e.Util.getParamString(this.wmsParams, g, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + f;
        },
        setParams: function(a, b) {
            return e.extend(this.wmsParams, a), b || this.redraw(), this;
        }
    }), e.tileLayer.wms = function(a, b) {
        return new e.TileLayer.WMS(a, b);
    }, e.ImageOverlay = e.Layer.extend({
        options: {
            opacity: 1,
            alt: "",
            interactive: !1,
            crossOrigin: !1
        },
        initialize: function(a, b, c) {
            this._url = a, this._bounds = e.latLngBounds(b), e.setOptions(this, c);
        },
        onAdd: function() {
            this._image || (this._initImage(), this.options.opacity < 1 && this._updateOpacity()), 
            this.options.interactive && (e.DomUtil.addClass(this._image, "leaflet-interactive"), 
            this.addInteractiveTarget(this._image)), this.getPane().appendChild(this._image), 
            this._reset();
        },
        onRemove: function() {
            e.DomUtil.remove(this._image), this.options.interactive && this.removeInteractiveTarget(this._image);
        },
        setOpacity: function(a) {
            return this.options.opacity = a, this._image && this._updateOpacity(), this;
        },
        setStyle: function(a) {
            return a.opacity && this.setOpacity(a.opacity), this;
        },
        bringToFront: function() {
            return this._map && e.DomUtil.toFront(this._image), this;
        },
        bringToBack: function() {
            return this._map && e.DomUtil.toBack(this._image), this;
        },
        setUrl: function(a) {
            return this._url = a, this._image && (this._image.src = a), this;
        },
        setBounds: function(a) {
            return this._bounds = a, this._map && this._reset(), this;
        },
        getEvents: function() {
            var a = {
                zoom: this._reset,
                viewreset: this._reset
            };
            return this._zoomAnimated && (a.zoomanim = this._animateZoom), a;
        },
        getBounds: function() {
            return this._bounds;
        },
        getElement: function() {
            return this._image;
        },
        _initImage: function() {
            var a = this._image = e.DomUtil.create("img", "leaflet-image-layer " + (this._zoomAnimated ? "leaflet-zoom-animated" : ""));
            a.onselectstart = e.Util.falseFn, a.onmousemove = e.Util.falseFn, a.onload = e.bind(this.fire, this, "load"), 
            this.options.crossOrigin && (a.crossOrigin = ""), a.src = this._url, a.alt = this.options.alt;
        },
        _animateZoom: function(a) {
            var b = this._map.getZoomScale(a.zoom), c = this._map._latLngBoundsToNewLayerBounds(this._bounds, a.zoom, a.center).min;
            e.DomUtil.setTransform(this._image, c, b);
        },
        _reset: function() {
            var a = this._image, b = new e.Bounds(this._map.latLngToLayerPoint(this._bounds.getNorthWest()), this._map.latLngToLayerPoint(this._bounds.getSouthEast())), c = b.getSize();
            e.DomUtil.setPosition(a, b.min), a.style.width = c.x + "px", a.style.height = c.y + "px";
        },
        _updateOpacity: function() {
            e.DomUtil.setOpacity(this._image, this.options.opacity);
        }
    }), e.imageOverlay = function(a, b, c) {
        return new e.ImageOverlay(a, b, c);
    }, e.Icon = e.Class.extend({
        initialize: function(a) {
            e.setOptions(this, a);
        },
        createIcon: function(a) {
            return this._createIcon("icon", a);
        },
        createShadow: function(a) {
            return this._createIcon("shadow", a);
        },
        _createIcon: function(a, b) {
            var c = this._getIconUrl(a);
            if (!c) {
                if ("icon" === a) throw new Error("iconUrl not set in Icon options (see the docs).");
                return null;
            }
            var d = this._createImg(c, b && "IMG" === b.tagName ? b : null);
            return this._setIconStyles(d, a), d;
        },
        _setIconStyles: function(a, b) {
            var c = this.options, d = c[b + "Size"];
            "number" == typeof d && (d = [ d, d ]);
            var f = e.point(d), g = e.point("shadow" === b && c.shadowAnchor || c.iconAnchor || f && f.divideBy(2, !0));
            a.className = "leaflet-marker-" + b + " " + (c.className || ""), g && (a.style.marginLeft = -g.x + "px", 
            a.style.marginTop = -g.y + "px"), f && (a.style.width = f.x + "px", a.style.height = f.y + "px");
        },
        _createImg: function(a, c) {
            return c = c || b.createElement("img"), c.src = a, c;
        },
        _getIconUrl: function(a) {
            return e.Browser.retina && this.options[a + "RetinaUrl"] || this.options[a + "Url"];
        }
    }), e.icon = function(a) {
        return new e.Icon(a);
    }, e.Icon.Default = e.Icon.extend({
        options: {
            iconUrl: "marker-icon.png",
            iconRetinaUrl: "marker-icon-2x.png",
            shadowUrl: "marker-shadow.png",
            iconSize: [ 25, 41 ],
            iconAnchor: [ 12, 41 ],
            popupAnchor: [ 1, -34 ],
            tooltipAnchor: [ 16, -28 ],
            shadowSize: [ 41, 41 ]
        },
        _getIconUrl: function(a) {
            return e.Icon.Default.imagePath || (e.Icon.Default.imagePath = this._detectIconPath()), 
            (this.options.imagePath || e.Icon.Default.imagePath) + e.Icon.prototype._getIconUrl.call(this, a);
        },
        _detectIconPath: function() {
            var a = e.DomUtil.create("div", "leaflet-default-icon-path", b.body), c = e.DomUtil.getStyle(a, "background-image") || e.DomUtil.getStyle(a, "backgroundImage");
            return b.body.removeChild(a), 0 === c.indexOf("url") ? c.replace(/^url\([\"\']?/, "").replace(/marker-icon\.png[\"\']?\)$/, "") : "";
        }
    }), e.Marker = e.Layer.extend({
        options: {
            icon: new e.Icon.Default(),
            interactive: !0,
            draggable: !1,
            keyboard: !0,
            title: "",
            alt: "",
            zIndexOffset: 0,
            opacity: 1,
            riseOnHover: !1,
            riseOffset: 250,
            pane: "markerPane",
            nonBubblingEvents: [ "click", "dblclick", "mouseover", "mouseout", "contextmenu" ]
        },
        initialize: function(a, b) {
            e.setOptions(this, b), this._latlng = e.latLng(a);
        },
        onAdd: function(a) {
            this._zoomAnimated = this._zoomAnimated && a.options.markerZoomAnimation, this._zoomAnimated && a.on("zoomanim", this._animateZoom, this), 
            this._initIcon(), this.update();
        },
        onRemove: function(a) {
            this.dragging && this.dragging.enabled() && (this.options.draggable = !0, this.dragging.removeHooks()), 
            this._zoomAnimated && a.off("zoomanim", this._animateZoom, this), this._removeIcon(), 
            this._removeShadow();
        },
        getEvents: function() {
            return {
                zoom: this.update,
                viewreset: this.update
            };
        },
        getLatLng: function() {
            return this._latlng;
        },
        setLatLng: function(a) {
            var b = this._latlng;
            return this._latlng = e.latLng(a), this.update(), this.fire("move", {
                oldLatLng: b,
                latlng: this._latlng
            });
        },
        setZIndexOffset: function(a) {
            return this.options.zIndexOffset = a, this.update();
        },
        setIcon: function(a) {
            return this.options.icon = a, this._map && (this._initIcon(), this.update()), this._popup && this.bindPopup(this._popup, this._popup.options), 
            this;
        },
        getElement: function() {
            return this._icon;
        },
        update: function() {
            if (this._icon) {
                var a = this._map.latLngToLayerPoint(this._latlng).round();
                this._setPos(a);
            }
            return this;
        },
        _initIcon: function() {
            var a = this.options, b = "leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide"), c = a.icon.createIcon(this._icon), d = !1;
            c !== this._icon && (this._icon && this._removeIcon(), d = !0, a.title && (c.title = a.title), 
            a.alt && (c.alt = a.alt)), e.DomUtil.addClass(c, b), a.keyboard && (c.tabIndex = "0"), 
            this._icon = c, a.riseOnHover && this.on({
                mouseover: this._bringToFront,
                mouseout: this._resetZIndex
            });
            var f = a.icon.createShadow(this._shadow), g = !1;
            f !== this._shadow && (this._removeShadow(), g = !0), f && (e.DomUtil.addClass(f, b), 
            f.alt = ""), this._shadow = f, a.opacity < 1 && this._updateOpacity(), d && this.getPane().appendChild(this._icon), 
            this._initInteraction(), f && g && this.getPane("shadowPane").appendChild(this._shadow);
        },
        _removeIcon: function() {
            this.options.riseOnHover && this.off({
                mouseover: this._bringToFront,
                mouseout: this._resetZIndex
            }), e.DomUtil.remove(this._icon), this.removeInteractiveTarget(this._icon), this._icon = null;
        },
        _removeShadow: function() {
            this._shadow && e.DomUtil.remove(this._shadow), this._shadow = null;
        },
        _setPos: function(a) {
            e.DomUtil.setPosition(this._icon, a), this._shadow && e.DomUtil.setPosition(this._shadow, a), 
            this._zIndex = a.y + this.options.zIndexOffset, this._resetZIndex();
        },
        _updateZIndex: function(a) {
            this._icon.style.zIndex = this._zIndex + a;
        },
        _animateZoom: function(a) {
            var b = this._map._latLngToNewLayerPoint(this._latlng, a.zoom, a.center).round();
            this._setPos(b);
        },
        _initInteraction: function() {
            if (this.options.interactive && (e.DomUtil.addClass(this._icon, "leaflet-interactive"), 
            this.addInteractiveTarget(this._icon), e.Handler.MarkerDrag)) {
                var a = this.options.draggable;
                this.dragging && (a = this.dragging.enabled(), this.dragging.disable()), this.dragging = new e.Handler.MarkerDrag(this), 
                a && this.dragging.enable();
            }
        },
        setOpacity: function(a) {
            return this.options.opacity = a, this._map && this._updateOpacity(), this;
        },
        _updateOpacity: function() {
            var a = this.options.opacity;
            e.DomUtil.setOpacity(this._icon, a), this._shadow && e.DomUtil.setOpacity(this._shadow, a);
        },
        _bringToFront: function() {
            this._updateZIndex(this.options.riseOffset);
        },
        _resetZIndex: function() {
            this._updateZIndex(0);
        },
        _getPopupAnchor: function() {
            return this.options.icon.options.popupAnchor || [ 0, 0 ];
        },
        _getTooltipAnchor: function() {
            return this.options.icon.options.tooltipAnchor || [ 0, 0 ];
        }
    }), e.marker = function(a, b) {
        return new e.Marker(a, b);
    }, e.DivIcon = e.Icon.extend({
        options: {
            iconSize: [ 12, 12 ],
            html: !1,
            bgPos: null,
            className: "leaflet-div-icon"
        },
        createIcon: function(a) {
            var c = a && "DIV" === a.tagName ? a : b.createElement("div"), d = this.options;
            if (c.innerHTML = !1 !== d.html ? d.html : "", d.bgPos) {
                var f = e.point(d.bgPos);
                c.style.backgroundPosition = -f.x + "px " + -f.y + "px";
            }
            return this._setIconStyles(c, "icon"), c;
        },
        createShadow: function() {
            return null;
        }
    }), e.divIcon = function(a) {
        return new e.DivIcon(a);
    }, e.DivOverlay = e.Layer.extend({
        options: {
            offset: [ 0, 7 ],
            className: "",
            pane: "popupPane"
        },
        initialize: function(a, b) {
            e.setOptions(this, a), this._source = b;
        },
        onAdd: function(a) {
            this._zoomAnimated = a._zoomAnimated, this._container || this._initLayout(), a._fadeAnimated && e.DomUtil.setOpacity(this._container, 0), 
            clearTimeout(this._removeTimeout), this.getPane().appendChild(this._container), 
            this.update(), a._fadeAnimated && e.DomUtil.setOpacity(this._container, 1), this.bringToFront();
        },
        onRemove: function(a) {
            a._fadeAnimated ? (e.DomUtil.setOpacity(this._container, 0), this._removeTimeout = setTimeout(e.bind(e.DomUtil.remove, e.DomUtil, this._container), 200)) : e.DomUtil.remove(this._container);
        },
        getLatLng: function() {
            return this._latlng;
        },
        setLatLng: function(a) {
            return this._latlng = e.latLng(a), this._map && (this._updatePosition(), this._adjustPan()), 
            this;
        },
        getContent: function() {
            return this._content;
        },
        setContent: function(a) {
            return this._content = a, this.update(), this;
        },
        getElement: function() {
            return this._container;
        },
        update: function() {
            this._map && (this._container.style.visibility = "hidden", this._updateContent(), 
            this._updateLayout(), this._updatePosition(), this._container.style.visibility = "", 
            this._adjustPan());
        },
        getEvents: function() {
            var a = {
                zoom: this._updatePosition,
                viewreset: this._updatePosition
            };
            return this._zoomAnimated && (a.zoomanim = this._animateZoom), a;
        },
        isOpen: function() {
            return !!this._map && this._map.hasLayer(this);
        },
        bringToFront: function() {
            return this._map && e.DomUtil.toFront(this._container), this;
        },
        bringToBack: function() {
            return this._map && e.DomUtil.toBack(this._container), this;
        },
        _updateContent: function() {
            if (this._content) {
                var a = this._contentNode, b = "function" == typeof this._content ? this._content(this._source || this) : this._content;
                if ("string" == typeof b) a.innerHTML = b; else {
                    for (;a.hasChildNodes(); ) a.removeChild(a.firstChild);
                    a.appendChild(b);
                }
                this.fire("contentupdate");
            }
        },
        _updatePosition: function() {
            if (this._map) {
                var a = this._map.latLngToLayerPoint(this._latlng), b = e.point(this.options.offset), c = this._getAnchor();
                this._zoomAnimated ? e.DomUtil.setPosition(this._container, a.add(c)) : b = b.add(a).add(c);
                var d = this._containerBottom = -b.y, f = this._containerLeft = -Math.round(this._containerWidth / 2) + b.x;
                this._container.style.bottom = d + "px", this._container.style.left = f + "px";
            }
        },
        _getAnchor: function() {
            return [ 0, 0 ];
        }
    }), e.Popup = e.DivOverlay.extend({
        options: {
            maxWidth: 300,
            minWidth: 50,
            maxHeight: null,
            autoPan: !0,
            autoPanPaddingTopLeft: null,
            autoPanPaddingBottomRight: null,
            autoPanPadding: [ 5, 5 ],
            keepInView: !1,
            closeButton: !0,
            autoClose: !0,
            className: ""
        },
        openOn: function(a) {
            return a.openPopup(this), this;
        },
        onAdd: function(a) {
            e.DivOverlay.prototype.onAdd.call(this, a), a.fire("popupopen", {
                popup: this
            }), this._source && (this._source.fire("popupopen", {
                popup: this
            }, !0), this._source instanceof e.Path || this._source.on("preclick", e.DomEvent.stopPropagation));
        },
        onRemove: function(a) {
            e.DivOverlay.prototype.onRemove.call(this, a), a.fire("popupclose", {
                popup: this
            }), this._source && (this._source.fire("popupclose", {
                popup: this
            }, !0), this._source instanceof e.Path || this._source.off("preclick", e.DomEvent.stopPropagation));
        },
        getEvents: function() {
            var a = e.DivOverlay.prototype.getEvents.call(this);
            return ("closeOnClick" in this.options ? this.options.closeOnClick : this._map.options.closePopupOnClick) && (a.preclick = this._close), 
            this.options.keepInView && (a.moveend = this._adjustPan), a;
        },
        _close: function() {
            this._map && this._map.closePopup(this);
        },
        _initLayout: function() {
            var a = "leaflet-popup", b = this._container = e.DomUtil.create("div", a + " " + (this.options.className || "") + " leaflet-zoom-animated");
            if (this.options.closeButton) {
                var c = this._closeButton = e.DomUtil.create("a", a + "-close-button", b);
                c.href = "#close", c.innerHTML = "&#215;", e.DomEvent.on(c, "click", this._onCloseButtonClick, this);
            }
            var d = this._wrapper = e.DomUtil.create("div", a + "-content-wrapper", b);
            this._contentNode = e.DomUtil.create("div", a + "-content", d), e.DomEvent.disableClickPropagation(d).disableScrollPropagation(this._contentNode).on(d, "contextmenu", e.DomEvent.stopPropagation), 
            this._tipContainer = e.DomUtil.create("div", a + "-tip-container", b), this._tip = e.DomUtil.create("div", a + "-tip", this._tipContainer);
        },
        _updateLayout: function() {
            var a = this._contentNode, b = a.style;
            b.width = "", b.whiteSpace = "nowrap";
            var c = a.offsetWidth;
            c = Math.min(c, this.options.maxWidth), c = Math.max(c, this.options.minWidth), 
            b.width = c + 1 + "px", b.whiteSpace = "", b.height = "";
            var d = a.offsetHeight, f = this.options.maxHeight, g = "leaflet-popup-scrolled";
            f && d > f ? (b.height = f + "px", e.DomUtil.addClass(a, g)) : e.DomUtil.removeClass(a, g), 
            this._containerWidth = this._container.offsetWidth;
        },
        _animateZoom: function(a) {
            var b = this._map._latLngToNewLayerPoint(this._latlng, a.zoom, a.center), c = this._getAnchor();
            e.DomUtil.setPosition(this._container, b.add(c));
        },
        _adjustPan: function() {
            if (!(!this.options.autoPan || this._map._panAnim && this._map._panAnim._inProgress)) {
                var a = this._map, b = parseInt(e.DomUtil.getStyle(this._container, "marginBottom"), 10) || 0, c = this._container.offsetHeight + b, d = this._containerWidth, f = new e.Point(this._containerLeft, -c - this._containerBottom);
                f._add(e.DomUtil.getPosition(this._container));
                var g = a.layerPointToContainerPoint(f), h = e.point(this.options.autoPanPadding), i = e.point(this.options.autoPanPaddingTopLeft || h), j = e.point(this.options.autoPanPaddingBottomRight || h), k = a.getSize(), l = 0, m = 0;
                g.x + d + j.x > k.x && (l = g.x + d - k.x + j.x), g.x - l - i.x < 0 && (l = g.x - i.x), 
                g.y + c + j.y > k.y && (m = g.y + c - k.y + j.y), g.y - m - i.y < 0 && (m = g.y - i.y), 
                (l || m) && a.fire("autopanstart").panBy([ l, m ]);
            }
        },
        _onCloseButtonClick: function(a) {
            this._close(), e.DomEvent.stop(a);
        },
        _getAnchor: function() {
            return e.point(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [ 0, 0 ]);
        }
    }), e.popup = function(a, b) {
        return new e.Popup(a, b);
    }, e.Map.mergeOptions({
        closePopupOnClick: !0
    }), e.Map.include({
        openPopup: function(a, b, c) {
            return a instanceof e.Popup || (a = new e.Popup(c).setContent(a)), b && a.setLatLng(b), 
            this.hasLayer(a) ? this : (this._popup && this._popup.options.autoClose && this.closePopup(), 
            this._popup = a, this.addLayer(a));
        },
        closePopup: function(a) {
            return a && a !== this._popup || (a = this._popup, this._popup = null), a && this.removeLayer(a), 
            this;
        }
    }), e.Layer.include({
        bindPopup: function(a, b) {
            return a instanceof e.Popup ? (e.setOptions(a, b), this._popup = a, a._source = this) : (this._popup && !b || (this._popup = new e.Popup(b, this)), 
            this._popup.setContent(a)), this._popupHandlersAdded || (this.on({
                click: this._openPopup,
                remove: this.closePopup,
                move: this._movePopup
            }), this._popupHandlersAdded = !0), this;
        },
        unbindPopup: function() {
            return this._popup && (this.off({
                click: this._openPopup,
                remove: this.closePopup,
                move: this._movePopup
            }), this._popupHandlersAdded = !1, this._popup = null), this;
        },
        openPopup: function(a, b) {
            if (a instanceof e.Layer || (b = a, a = this), a instanceof e.FeatureGroup) for (var c in this._layers) {
                a = this._layers[c];
                break;
            }
            return b || (b = a.getCenter ? a.getCenter() : a.getLatLng()), this._popup && this._map && (this._popup._source = a, 
            this._popup.update(), this._map.openPopup(this._popup, b)), this;
        },
        closePopup: function() {
            return this._popup && this._popup._close(), this;
        },
        togglePopup: function(a) {
            return this._popup && (this._popup._map ? this.closePopup() : this.openPopup(a)), 
            this;
        },
        isPopupOpen: function() {
            return !!this._popup && this._popup.isOpen();
        },
        setPopupContent: function(a) {
            return this._popup && this._popup.setContent(a), this;
        },
        getPopup: function() {
            return this._popup;
        },
        _openPopup: function(a) {
            var b = a.layer || a.target;
            if (this._popup && this._map) {
                if (e.DomEvent.stop(a), b instanceof e.Path) return void this.openPopup(a.layer || a.target, a.latlng);
                this._map.hasLayer(this._popup) && this._popup._source === b ? this.closePopup() : this.openPopup(b, a.latlng);
            }
        },
        _movePopup: function(a) {
            this._popup.setLatLng(a.latlng);
        }
    }), e.Tooltip = e.DivOverlay.extend({
        options: {
            pane: "tooltipPane",
            offset: [ 0, 0 ],
            direction: "auto",
            permanent: !1,
            sticky: !1,
            interactive: !1,
            opacity: .9
        },
        onAdd: function(a) {
            e.DivOverlay.prototype.onAdd.call(this, a), this.setOpacity(this.options.opacity), 
            a.fire("tooltipopen", {
                tooltip: this
            }), this._source && this._source.fire("tooltipopen", {
                tooltip: this
            }, !0);
        },
        onRemove: function(a) {
            e.DivOverlay.prototype.onRemove.call(this, a), a.fire("tooltipclose", {
                tooltip: this
            }), this._source && this._source.fire("tooltipclose", {
                tooltip: this
            }, !0);
        },
        getEvents: function() {
            var a = e.DivOverlay.prototype.getEvents.call(this);
            return e.Browser.touch && !this.options.permanent && (a.preclick = this._close), 
            a;
        },
        _close: function() {
            this._map && this._map.closeTooltip(this);
        },
        _initLayout: function() {
            var a = "leaflet-tooltip", b = a + " " + (this.options.className || "") + " leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
            this._contentNode = this._container = e.DomUtil.create("div", b);
        },
        _updateLayout: function() {},
        _adjustPan: function() {},
        _setPosition: function(a) {
            var b = this._map, c = this._container, d = b.latLngToContainerPoint(b.getCenter()), f = b.layerPointToContainerPoint(a), g = this.options.direction, h = c.offsetWidth, i = c.offsetHeight, j = e.point(this.options.offset), k = this._getAnchor();
            "top" === g ? a = a.add(e.point(-h / 2 + j.x, -i + j.y + k.y, !0)) : "bottom" === g ? a = a.subtract(e.point(h / 2 - j.x, -j.y, !0)) : "center" === g ? a = a.subtract(e.point(h / 2 + j.x, i / 2 - k.y + j.y, !0)) : "right" === g || "auto" === g && f.x < d.x ? (g = "right", 
            a = a.add(e.point(j.x + k.x, k.y - i / 2 + j.y, !0))) : (g = "left", a = a.subtract(e.point(h + k.x - j.x, i / 2 - k.y - j.y, !0))), 
            e.DomUtil.removeClass(c, "leaflet-tooltip-right"), e.DomUtil.removeClass(c, "leaflet-tooltip-left"), 
            e.DomUtil.removeClass(c, "leaflet-tooltip-top"), e.DomUtil.removeClass(c, "leaflet-tooltip-bottom"), 
            e.DomUtil.addClass(c, "leaflet-tooltip-" + g), e.DomUtil.setPosition(c, a);
        },
        _updatePosition: function() {
            var a = this._map.latLngToLayerPoint(this._latlng);
            this._setPosition(a);
        },
        setOpacity: function(a) {
            this.options.opacity = a, this._container && e.DomUtil.setOpacity(this._container, a);
        },
        _animateZoom: function(a) {
            var b = this._map._latLngToNewLayerPoint(this._latlng, a.zoom, a.center);
            this._setPosition(b);
        },
        _getAnchor: function() {
            return e.point(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [ 0, 0 ]);
        }
    }), e.tooltip = function(a, b) {
        return new e.Tooltip(a, b);
    }, e.Map.include({
        openTooltip: function(a, b, c) {
            return a instanceof e.Tooltip || (a = new e.Tooltip(c).setContent(a)), b && a.setLatLng(b), 
            this.hasLayer(a) ? this : this.addLayer(a);
        },
        closeTooltip: function(a) {
            return a && this.removeLayer(a), this;
        }
    }), e.Layer.include({
        bindTooltip: function(a, b) {
            return a instanceof e.Tooltip ? (e.setOptions(a, b), this._tooltip = a, a._source = this) : (this._tooltip && !b || (this._tooltip = e.tooltip(b, this)), 
            this._tooltip.setContent(a)), this._initTooltipInteractions(), this._tooltip.options.permanent && this._map && this._map.hasLayer(this) && this.openTooltip(), 
            this;
        },
        unbindTooltip: function() {
            return this._tooltip && (this._initTooltipInteractions(!0), this.closeTooltip(), 
            this._tooltip = null), this;
        },
        _initTooltipInteractions: function(a) {
            if (a || !this._tooltipHandlersAdded) {
                var b = a ? "off" : "on", c = {
                    remove: this.closeTooltip,
                    move: this._moveTooltip
                };
                this._tooltip.options.permanent ? c.add = this._openTooltip : (c.mouseover = this._openTooltip, 
                c.mouseout = this.closeTooltip, this._tooltip.options.sticky && (c.mousemove = this._moveTooltip), 
                e.Browser.touch && (c.click = this._openTooltip)), this[b](c), this._tooltipHandlersAdded = !a;
            }
        },
        openTooltip: function(a, b) {
            if (a instanceof e.Layer || (b = a, a = this), a instanceof e.FeatureGroup) for (var c in this._layers) {
                a = this._layers[c];
                break;
            }
            return b || (b = a.getCenter ? a.getCenter() : a.getLatLng()), this._tooltip && this._map && (this._tooltip._source = a, 
            this._tooltip.update(), this._map.openTooltip(this._tooltip, b), this._tooltip.options.interactive && this._tooltip._container && (e.DomUtil.addClass(this._tooltip._container, "leaflet-clickable"), 
            this.addInteractiveTarget(this._tooltip._container))), this;
        },
        closeTooltip: function() {
            return this._tooltip && (this._tooltip._close(), this._tooltip.options.interactive && this._tooltip._container && (e.DomUtil.removeClass(this._tooltip._container, "leaflet-clickable"), 
            this.removeInteractiveTarget(this._tooltip._container))), this;
        },
        toggleTooltip: function(a) {
            return this._tooltip && (this._tooltip._map ? this.closeTooltip() : this.openTooltip(a)), 
            this;
        },
        isTooltipOpen: function() {
            return this._tooltip.isOpen();
        },
        setTooltipContent: function(a) {
            return this._tooltip && this._tooltip.setContent(a), this;
        },
        getTooltip: function() {
            return this._tooltip;
        },
        _openTooltip: function(a) {
            var b = a.layer || a.target;
            this._tooltip && this._map && this.openTooltip(b, this._tooltip.options.sticky ? a.latlng : c);
        },
        _moveTooltip: function(a) {
            var b, c, d = a.latlng;
            this._tooltip.options.sticky && a.originalEvent && (b = this._map.mouseEventToContainerPoint(a.originalEvent), 
            c = this._map.containerPointToLayerPoint(b), d = this._map.layerPointToLatLng(c)), 
            this._tooltip.setLatLng(d);
        }
    }), e.LayerGroup = e.Layer.extend({
        initialize: function(a) {
            this._layers = {};
            var b, c;
            if (a) for (b = 0, c = a.length; b < c; b++) this.addLayer(a[b]);
        },
        addLayer: function(a) {
            var b = this.getLayerId(a);
            return this._layers[b] = a, this._map && this._map.addLayer(a), this;
        },
        removeLayer: function(a) {
            var b = a in this._layers ? a : this.getLayerId(a);
            return this._map && this._layers[b] && this._map.removeLayer(this._layers[b]), delete this._layers[b], 
            this;
        },
        hasLayer: function(a) {
            return !!a && (a in this._layers || this.getLayerId(a) in this._layers);
        },
        clearLayers: function() {
            for (var a in this._layers) this.removeLayer(this._layers[a]);
            return this;
        },
        invoke: function(a) {
            var b, c, d = Array.prototype.slice.call(arguments, 1);
            for (b in this._layers) c = this._layers[b], c[a] && c[a].apply(c, d);
            return this;
        },
        onAdd: function(a) {
            for (var b in this._layers) a.addLayer(this._layers[b]);
        },
        onRemove: function(a) {
            for (var b in this._layers) a.removeLayer(this._layers[b]);
        },
        eachLayer: function(a, b) {
            for (var c in this._layers) a.call(b, this._layers[c]);
            return this;
        },
        getLayer: function(a) {
            return this._layers[a];
        },
        getLayers: function() {
            var a = [];
            for (var b in this._layers) a.push(this._layers[b]);
            return a;
        },
        setZIndex: function(a) {
            return this.invoke("setZIndex", a);
        },
        getLayerId: function(a) {
            return e.stamp(a);
        }
    }), e.layerGroup = function(a) {
        return new e.LayerGroup(a);
    }, e.FeatureGroup = e.LayerGroup.extend({
        addLayer: function(a) {
            return this.hasLayer(a) ? this : (a.addEventParent(this), e.LayerGroup.prototype.addLayer.call(this, a), 
            this.fire("layeradd", {
                layer: a
            }));
        },
        removeLayer: function(a) {
            return this.hasLayer(a) ? (a in this._layers && (a = this._layers[a]), a.removeEventParent(this), 
            e.LayerGroup.prototype.removeLayer.call(this, a), this.fire("layerremove", {
                layer: a
            })) : this;
        },
        setStyle: function(a) {
            return this.invoke("setStyle", a);
        },
        bringToFront: function() {
            return this.invoke("bringToFront");
        },
        bringToBack: function() {
            return this.invoke("bringToBack");
        },
        getBounds: function() {
            var a = new e.LatLngBounds();
            for (var b in this._layers) {
                var c = this._layers[b];
                a.extend(c.getBounds ? c.getBounds() : c.getLatLng());
            }
            return a;
        }
    }), e.featureGroup = function(a) {
        return new e.FeatureGroup(a);
    }, e.Renderer = e.Layer.extend({
        options: {
            padding: .1
        },
        initialize: function(a) {
            e.setOptions(this, a), e.stamp(this), this._layers = this._layers || {};
        },
        onAdd: function() {
            this._container || (this._initContainer(), this._zoomAnimated && e.DomUtil.addClass(this._container, "leaflet-zoom-animated")), 
            this.getPane().appendChild(this._container), this._update(), this.on("update", this._updatePaths, this);
        },
        onRemove: function() {
            e.DomUtil.remove(this._container), this.off("update", this._updatePaths, this);
        },
        getEvents: function() {
            var a = {
                viewreset: this._reset,
                zoom: this._onZoom,
                moveend: this._update,
                zoomend: this._onZoomEnd
            };
            return this._zoomAnimated && (a.zoomanim = this._onAnimZoom), a;
        },
        _onAnimZoom: function(a) {
            this._updateTransform(a.center, a.zoom);
        },
        _onZoom: function() {
            this._updateTransform(this._map.getCenter(), this._map.getZoom());
        },
        _updateTransform: function(a, b) {
            var c = this._map.getZoomScale(b, this._zoom), d = e.DomUtil.getPosition(this._container), f = this._map.getSize().multiplyBy(.5 + this.options.padding), g = this._map.project(this._center, b), h = this._map.project(a, b), i = h.subtract(g), j = f.multiplyBy(-c).add(d).add(f).subtract(i);
            e.Browser.any3d ? e.DomUtil.setTransform(this._container, j, c) : e.DomUtil.setPosition(this._container, j);
        },
        _reset: function() {
            this._update(), this._updateTransform(this._center, this._zoom);
            for (var a in this._layers) this._layers[a]._reset();
        },
        _onZoomEnd: function() {
            for (var a in this._layers) this._layers[a]._project();
        },
        _updatePaths: function() {
            for (var a in this._layers) this._layers[a]._update();
        },
        _update: function() {
            var a = this.options.padding, b = this._map.getSize(), c = this._map.containerPointToLayerPoint(b.multiplyBy(-a)).round();
            this._bounds = new e.Bounds(c, c.add(b.multiplyBy(1 + 2 * a)).round()), this._center = this._map.getCenter(), 
            this._zoom = this._map.getZoom();
        }
    }), e.Map.include({
        getRenderer: function(a) {
            var b = a.options.renderer || this._getPaneRenderer(a.options.pane) || this.options.renderer || this._renderer;
            return b || (b = this._renderer = this.options.preferCanvas && e.canvas() || e.svg()), 
            this.hasLayer(b) || this.addLayer(b), b;
        },
        _getPaneRenderer: function(a) {
            if ("overlayPane" === a || a === c) return !1;
            var b = this._paneRenderers[a];
            return b === c && (b = e.SVG && e.svg({
                pane: a
            }) || e.Canvas && e.canvas({
                pane: a
            }), this._paneRenderers[a] = b), b;
        }
    }), e.Path = e.Layer.extend({
        options: {
            stroke: !0,
            color: "#3388ff",
            weight: 3,
            opacity: 1,
            lineCap: "round",
            lineJoin: "round",
            dashArray: null,
            dashOffset: null,
            fill: !1,
            fillColor: null,
            fillOpacity: .2,
            fillRule: "evenodd",
            interactive: !0
        },
        beforeAdd: function(a) {
            this._renderer = a.getRenderer(this);
        },
        onAdd: function() {
            this._renderer._initPath(this), this._reset(), this._renderer._addPath(this);
        },
        onRemove: function() {
            this._renderer._removePath(this);
        },
        redraw: function() {
            return this._map && this._renderer._updatePath(this), this;
        },
        setStyle: function(a) {
            return e.setOptions(this, a), this._renderer && this._renderer._updateStyle(this), 
            this;
        },
        bringToFront: function() {
            return this._renderer && this._renderer._bringToFront(this), this;
        },
        bringToBack: function() {
            return this._renderer && this._renderer._bringToBack(this), this;
        },
        getElement: function() {
            return this._path;
        },
        _reset: function() {
            this._project(), this._update();
        },
        _clickTolerance: function() {
            return (this.options.stroke ? this.options.weight / 2 : 0) + (e.Browser.touch ? 10 : 0);
        }
    }), e.LineUtil = {
        simplify: function(a, b) {
            if (!b || !a.length) return a.slice();
            var c = b * b;
            return a = this._reducePoints(a, c), a = this._simplifyDP(a, c);
        },
        pointToSegmentDistance: function(a, b, c) {
            return Math.sqrt(this._sqClosestPointOnSegment(a, b, c, !0));
        },
        closestPointOnSegment: function(a, b, c) {
            return this._sqClosestPointOnSegment(a, b, c);
        },
        _simplifyDP: function(a, b) {
            var d = a.length, e = typeof Uint8Array != c + "" ? Uint8Array : Array, f = new e(d);
            f[0] = f[d - 1] = 1, this._simplifyDPStep(a, f, b, 0, d - 1);
            var g, h = [];
            for (g = 0; g < d; g++) f[g] && h.push(a[g]);
            return h;
        },
        _simplifyDPStep: function(a, b, c, d, e) {
            var f, g, h, i = 0;
            for (g = d + 1; g <= e - 1; g++) (h = this._sqClosestPointOnSegment(a[g], a[d], a[e], !0)) > i && (f = g, 
            i = h);
            i > c && (b[f] = 1, this._simplifyDPStep(a, b, c, d, f), this._simplifyDPStep(a, b, c, f, e));
        },
        _reducePoints: function(a, b) {
            for (var c = [ a[0] ], d = 1, e = 0, f = a.length; d < f; d++) this._sqDist(a[d], a[e]) > b && (c.push(a[d]), 
            e = d);
            return e < f - 1 && c.push(a[f - 1]), c;
        },
        clipSegment: function(a, b, c, d, e) {
            var f, g, h, i = d ? this._lastCode : this._getBitCode(a, c), j = this._getBitCode(b, c);
            for (this._lastCode = j; ;) {
                if (!(i | j)) return [ a, b ];
                if (i & j) return !1;
                f = i || j, g = this._getEdgeIntersection(a, b, f, c, e), h = this._getBitCode(g, c), 
                f === i ? (a = g, i = h) : (b = g, j = h);
            }
        },
        _getEdgeIntersection: function(a, b, c, d, f) {
            var g, h, i = b.x - a.x, j = b.y - a.y, k = d.min, l = d.max;
            return 8 & c ? (g = a.x + i * (l.y - a.y) / j, h = l.y) : 4 & c ? (g = a.x + i * (k.y - a.y) / j, 
            h = k.y) : 2 & c ? (g = l.x, h = a.y + j * (l.x - a.x) / i) : 1 & c && (g = k.x, 
            h = a.y + j * (k.x - a.x) / i), new e.Point(g, h, f);
        },
        _getBitCode: function(a, b) {
            var c = 0;
            return a.x < b.min.x ? c |= 1 : a.x > b.max.x && (c |= 2), a.y < b.min.y ? c |= 4 : a.y > b.max.y && (c |= 8), 
            c;
        },
        _sqDist: function(a, b) {
            var c = b.x - a.x, d = b.y - a.y;
            return c * c + d * d;
        },
        _sqClosestPointOnSegment: function(a, b, c, d) {
            var f, g = b.x, h = b.y, i = c.x - g, j = c.y - h, k = i * i + j * j;
            return k > 0 && (f = ((a.x - g) * i + (a.y - h) * j) / k, f > 1 ? (g = c.x, h = c.y) : f > 0 && (g += i * f, 
            h += j * f)), i = a.x - g, j = a.y - h, d ? i * i + j * j : new e.Point(g, h);
        }
    }, e.Polyline = e.Path.extend({
        options: {
            smoothFactor: 1,
            noClip: !1
        },
        initialize: function(a, b) {
            e.setOptions(this, b), this._setLatLngs(a);
        },
        getLatLngs: function() {
            return this._latlngs;
        },
        setLatLngs: function(a) {
            return this._setLatLngs(a), this.redraw();
        },
        isEmpty: function() {
            return !this._latlngs.length;
        },
        closestLayerPoint: function(a) {
            for (var b, c, d = 1 / 0, f = null, g = e.LineUtil._sqClosestPointOnSegment, h = 0, i = this._parts.length; h < i; h++) for (var j = this._parts[h], k = 1, l = j.length; k < l; k++) {
                b = j[k - 1], c = j[k];
                var m = g(a, b, c, !0);
                m < d && (d = m, f = g(a, b, c));
            }
            return f && (f.distance = Math.sqrt(d)), f;
        },
        getCenter: function() {
            if (!this._map) throw new Error("Must add layer to map before using getCenter()");
            var a, b, c, d, e, f, g, h = this._rings[0], i = h.length;
            if (!i) return null;
            for (a = 0, b = 0; a < i - 1; a++) b += h[a].distanceTo(h[a + 1]) / 2;
            if (0 === b) return this._map.layerPointToLatLng(h[0]);
            for (a = 0, d = 0; a < i - 1; a++) if (e = h[a], f = h[a + 1], c = e.distanceTo(f), 
            (d += c) > b) return g = (d - b) / c, this._map.layerPointToLatLng([ f.x - g * (f.x - e.x), f.y - g * (f.y - e.y) ]);
        },
        getBounds: function() {
            return this._bounds;
        },
        addLatLng: function(a, b) {
            return b = b || this._defaultShape(), a = e.latLng(a), b.push(a), this._bounds.extend(a), 
            this.redraw();
        },
        _setLatLngs: function(a) {
            this._bounds = new e.LatLngBounds(), this._latlngs = this._convertLatLngs(a);
        },
        _defaultShape: function() {
            return e.Polyline._flat(this._latlngs) ? this._latlngs : this._latlngs[0];
        },
        _convertLatLngs: function(a) {
            for (var b = [], c = e.Polyline._flat(a), d = 0, f = a.length; d < f; d++) c ? (b[d] = e.latLng(a[d]), 
            this._bounds.extend(b[d])) : b[d] = this._convertLatLngs(a[d]);
            return b;
        },
        _project: function() {
            var a = new e.Bounds();
            this._rings = [], this._projectLatlngs(this._latlngs, this._rings, a);
            var b = this._clickTolerance(), c = new e.Point(b, b);
            this._bounds.isValid() && a.isValid() && (a.min._subtract(c), a.max._add(c), this._pxBounds = a);
        },
        _projectLatlngs: function(a, b, c) {
            var d, f, g = a[0] instanceof e.LatLng, h = a.length;
            if (g) {
                for (f = [], d = 0; d < h; d++) f[d] = this._map.latLngToLayerPoint(a[d]), c.extend(f[d]);
                b.push(f);
            } else for (d = 0; d < h; d++) this._projectLatlngs(a[d], b, c);
        },
        _clipPoints: function() {
            var a = this._renderer._bounds;
            if (this._parts = [], this._pxBounds && this._pxBounds.intersects(a)) {
                if (this.options.noClip) return void (this._parts = this._rings);
                var b, c, d, f, g, h, i, j = this._parts;
                for (b = 0, d = 0, f = this._rings.length; b < f; b++) for (i = this._rings[b], 
                c = 0, g = i.length; c < g - 1; c++) (h = e.LineUtil.clipSegment(i[c], i[c + 1], a, c, !0)) && (j[d] = j[d] || [], 
                j[d].push(h[0]), h[1] === i[c + 1] && c !== g - 2 || (j[d].push(h[1]), d++));
            }
        },
        _simplifyPoints: function() {
            for (var a = this._parts, b = this.options.smoothFactor, c = 0, d = a.length; c < d; c++) a[c] = e.LineUtil.simplify(a[c], b);
        },
        _update: function() {
            this._map && (this._clipPoints(), this._simplifyPoints(), this._updatePath());
        },
        _updatePath: function() {
            this._renderer._updatePoly(this);
        }
    }), e.polyline = function(a, b) {
        return new e.Polyline(a, b);
    }, e.Polyline._flat = function(a) {
        return !e.Util.isArray(a[0]) || "object" != typeof a[0][0] && void 0 !== a[0][0];
    }, e.PolyUtil = {}, e.PolyUtil.clipPolygon = function(a, b, c) {
        var d, f, g, h, i, j, k, l, m, n = [ 1, 4, 2, 8 ], o = e.LineUtil;
        for (f = 0, k = a.length; f < k; f++) a[f]._code = o._getBitCode(a[f], b);
        for (h = 0; h < 4; h++) {
            for (l = n[h], d = [], f = 0, k = a.length, g = k - 1; f < k; g = f++) i = a[f], 
            j = a[g], i._code & l ? j._code & l || (m = o._getEdgeIntersection(j, i, l, b, c), 
            m._code = o._getBitCode(m, b), d.push(m)) : (j._code & l && (m = o._getEdgeIntersection(j, i, l, b, c), 
            m._code = o._getBitCode(m, b), d.push(m)), d.push(i));
            a = d;
        }
        return a;
    }, e.Polygon = e.Polyline.extend({
        options: {
            fill: !0
        },
        isEmpty: function() {
            return !this._latlngs.length || !this._latlngs[0].length;
        },
        getCenter: function() {
            if (!this._map) throw new Error("Must add layer to map before using getCenter()");
            var a, b, c, d, e, f, g, h, i, j = this._rings[0], k = j.length;
            if (!k) return null;
            for (f = g = h = 0, a = 0, b = k - 1; a < k; b = a++) c = j[a], d = j[b], e = c.y * d.x - d.y * c.x, 
            g += (c.x + d.x) * e, h += (c.y + d.y) * e, f += 3 * e;
            return i = 0 === f ? j[0] : [ g / f, h / f ], this._map.layerPointToLatLng(i);
        },
        _convertLatLngs: function(a) {
            var b = e.Polyline.prototype._convertLatLngs.call(this, a), c = b.length;
            return c >= 2 && b[0] instanceof e.LatLng && b[0].equals(b[c - 1]) && b.pop(), b;
        },
        _setLatLngs: function(a) {
            e.Polyline.prototype._setLatLngs.call(this, a), e.Polyline._flat(this._latlngs) && (this._latlngs = [ this._latlngs ]);
        },
        _defaultShape: function() {
            return e.Polyline._flat(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
        },
        _clipPoints: function() {
            var a = this._renderer._bounds, b = this.options.weight, c = new e.Point(b, b);
            if (a = new e.Bounds(a.min.subtract(c), a.max.add(c)), this._parts = [], this._pxBounds && this._pxBounds.intersects(a)) {
                if (this.options.noClip) return void (this._parts = this._rings);
                for (var d, f = 0, g = this._rings.length; f < g; f++) d = e.PolyUtil.clipPolygon(this._rings[f], a, !0), 
                d.length && this._parts.push(d);
            }
        },
        _updatePath: function() {
            this._renderer._updatePoly(this, !0);
        }
    }), e.polygon = function(a, b) {
        return new e.Polygon(a, b);
    }, e.Rectangle = e.Polygon.extend({
        initialize: function(a, b) {
            e.Polygon.prototype.initialize.call(this, this._boundsToLatLngs(a), b);
        },
        setBounds: function(a) {
            return this.setLatLngs(this._boundsToLatLngs(a));
        },
        _boundsToLatLngs: function(a) {
            return a = e.latLngBounds(a), [ a.getSouthWest(), a.getNorthWest(), a.getNorthEast(), a.getSouthEast() ];
        }
    }), e.rectangle = function(a, b) {
        return new e.Rectangle(a, b);
    }, e.CircleMarker = e.Path.extend({
        options: {
            fill: !0,
            radius: 10
        },
        initialize: function(a, b) {
            e.setOptions(this, b), this._latlng = e.latLng(a), this._radius = this.options.radius;
        },
        setLatLng: function(a) {
            return this._latlng = e.latLng(a), this.redraw(), this.fire("move", {
                latlng: this._latlng
            });
        },
        getLatLng: function() {
            return this._latlng;
        },
        setRadius: function(a) {
            return this.options.radius = this._radius = a, this.redraw();
        },
        getRadius: function() {
            return this._radius;
        },
        setStyle: function(a) {
            var b = a && a.radius || this._radius;
            return e.Path.prototype.setStyle.call(this, a), this.setRadius(b), this;
        },
        _project: function() {
            this._point = this._map.latLngToLayerPoint(this._latlng), this._updateBounds();
        },
        _updateBounds: function() {
            var a = this._radius, b = this._radiusY || a, c = this._clickTolerance(), d = [ a + c, b + c ];
            this._pxBounds = new e.Bounds(this._point.subtract(d), this._point.add(d));
        },
        _update: function() {
            this._map && this._updatePath();
        },
        _updatePath: function() {
            this._renderer._updateCircle(this);
        },
        _empty: function() {
            return this._radius && !this._renderer._bounds.intersects(this._pxBounds);
        }
    }), e.circleMarker = function(a, b) {
        return new e.CircleMarker(a, b);
    }, e.Circle = e.CircleMarker.extend({
        initialize: function(a, b, c) {
            if ("number" == typeof b && (b = e.extend({}, c, {
                radius: b
            })), e.setOptions(this, b), this._latlng = e.latLng(a), isNaN(this.options.radius)) throw new Error("Circle radius cannot be NaN");
            this._mRadius = this.options.radius;
        },
        setRadius: function(a) {
            return this._mRadius = a, this.redraw();
        },
        getRadius: function() {
            return this._mRadius;
        },
        getBounds: function() {
            var a = [ this._radius, this._radiusY || this._radius ];
            return new e.LatLngBounds(this._map.layerPointToLatLng(this._point.subtract(a)), this._map.layerPointToLatLng(this._point.add(a)));
        },
        setStyle: e.Path.prototype.setStyle,
        _project: function() {
            var a = this._latlng.lng, b = this._latlng.lat, c = this._map, d = c.options.crs;
            if (d.distance === e.CRS.Earth.distance) {
                var f = Math.PI / 180, g = this._mRadius / e.CRS.Earth.R / f, h = c.project([ b + g, a ]), i = c.project([ b - g, a ]), j = h.add(i).divideBy(2), k = c.unproject(j).lat, l = Math.acos((Math.cos(g * f) - Math.sin(b * f) * Math.sin(k * f)) / (Math.cos(b * f) * Math.cos(k * f))) / f;
                (isNaN(l) || 0 === l) && (l = g / Math.cos(Math.PI / 180 * b)), this._point = j.subtract(c.getPixelOrigin()), 
                this._radius = isNaN(l) ? 0 : Math.max(Math.round(j.x - c.project([ k, a - l ]).x), 1), 
                this._radiusY = Math.max(Math.round(j.y - h.y), 1);
            } else {
                var m = d.unproject(d.project(this._latlng).subtract([ this._mRadius, 0 ]));
                this._point = c.latLngToLayerPoint(this._latlng), this._radius = this._point.x - c.latLngToLayerPoint(m).x;
            }
            this._updateBounds();
        }
    }), e.circle = function(a, b, c) {
        return new e.Circle(a, b, c);
    }, e.SVG = e.Renderer.extend({
        getEvents: function() {
            var a = e.Renderer.prototype.getEvents.call(this);
            return a.zoomstart = this._onZoomStart, a;
        },
        _initContainer: function() {
            this._container = e.SVG.create("svg"), this._container.setAttribute("pointer-events", "none"), 
            this._rootGroup = e.SVG.create("g"), this._container.appendChild(this._rootGroup);
        },
        _onZoomStart: function() {
            this._update();
        },
        _update: function() {
            if (!this._map._animatingZoom || !this._bounds) {
                e.Renderer.prototype._update.call(this);
                var a = this._bounds, b = a.getSize(), c = this._container;
                this._svgSize && this._svgSize.equals(b) || (this._svgSize = b, c.setAttribute("width", b.x), 
                c.setAttribute("height", b.y)), e.DomUtil.setPosition(c, a.min), c.setAttribute("viewBox", [ a.min.x, a.min.y, b.x, b.y ].join(" ")), 
                this.fire("update");
            }
        },
        _initPath: function(a) {
            var b = a._path = e.SVG.create("path");
            a.options.className && e.DomUtil.addClass(b, a.options.className), a.options.interactive && e.DomUtil.addClass(b, "leaflet-interactive"), 
            this._updateStyle(a), this._layers[e.stamp(a)] = a;
        },
        _addPath: function(a) {
            this._rootGroup.appendChild(a._path), a.addInteractiveTarget(a._path);
        },
        _removePath: function(a) {
            e.DomUtil.remove(a._path), a.removeInteractiveTarget(a._path), delete this._layers[e.stamp(a)];
        },
        _updatePath: function(a) {
            a._project(), a._update();
        },
        _updateStyle: function(a) {
            var b = a._path, c = a.options;
            b && (c.stroke ? (b.setAttribute("stroke", c.color), b.setAttribute("stroke-opacity", c.opacity), 
            b.setAttribute("stroke-width", c.weight), b.setAttribute("stroke-linecap", c.lineCap), 
            b.setAttribute("stroke-linejoin", c.lineJoin), c.dashArray ? b.setAttribute("stroke-dasharray", c.dashArray) : b.removeAttribute("stroke-dasharray"), 
            c.dashOffset ? b.setAttribute("stroke-dashoffset", c.dashOffset) : b.removeAttribute("stroke-dashoffset")) : b.setAttribute("stroke", "none"), 
            c.fill ? (b.setAttribute("fill", c.fillColor || c.color), b.setAttribute("fill-opacity", c.fillOpacity), 
            b.setAttribute("fill-rule", c.fillRule || "evenodd")) : b.setAttribute("fill", "none"));
        },
        _updatePoly: function(a, b) {
            this._setPath(a, e.SVG.pointsToPath(a._parts, b));
        },
        _updateCircle: function(a) {
            var b = a._point, c = a._radius, d = a._radiusY || c, e = "a" + c + "," + d + " 0 1,0 ", f = a._empty() ? "M0 0" : "M" + (b.x - c) + "," + b.y + e + 2 * c + ",0 " + e + 2 * -c + ",0 ";
            this._setPath(a, f);
        },
        _setPath: function(a, b) {
            a._path.setAttribute("d", b);
        },
        _bringToFront: function(a) {
            e.DomUtil.toFront(a._path);
        },
        _bringToBack: function(a) {
            e.DomUtil.toBack(a._path);
        }
    }), e.extend(e.SVG, {
        create: function(a) {
            return b.createElementNS("http://www.w3.org/2000/svg", a);
        },
        pointsToPath: function(a, b) {
            var c, d, f, g, h, i, j = "";
            for (c = 0, f = a.length; c < f; c++) {
                for (h = a[c], d = 0, g = h.length; d < g; d++) i = h[d], j += (d ? "L" : "M") + i.x + " " + i.y;
                j += b ? e.Browser.svg ? "z" : "x" : "";
            }
            return j || "M0 0";
        }
    }), e.Browser.svg = !(!b.createElementNS || !e.SVG.create("svg").createSVGRect), 
    e.svg = function(a) {
        return e.Browser.svg || e.Browser.vml ? new e.SVG(a) : null;
    }, e.Browser.vml = !e.Browser.svg && function() {
        try {
            var a = b.createElement("div");
            a.innerHTML = '<v:shape adj="1"/>';
            var c = a.firstChild;
            return c.style.behavior = "url(#default#VML)", c && "object" == typeof c.adj;
        } catch (a) {
            return !1;
        }
    }(), e.SVG.include(e.Browser.vml ? {
        _initContainer: function() {
            this._container = e.DomUtil.create("div", "leaflet-vml-container");
        },
        _update: function() {
            this._map._animatingZoom || (e.Renderer.prototype._update.call(this), this.fire("update"));
        },
        _initPath: function(a) {
            var b = a._container = e.SVG.create("shape");
            e.DomUtil.addClass(b, "leaflet-vml-shape " + (this.options.className || "")), b.coordsize = "1 1", 
            a._path = e.SVG.create("path"), b.appendChild(a._path), this._updateStyle(a), this._layers[e.stamp(a)] = a;
        },
        _addPath: function(a) {
            var b = a._container;
            this._container.appendChild(b), a.options.interactive && a.addInteractiveTarget(b);
        },
        _removePath: function(a) {
            var b = a._container;
            e.DomUtil.remove(b), a.removeInteractiveTarget(b), delete this._layers[e.stamp(a)];
        },
        _updateStyle: function(a) {
            var b = a._stroke, c = a._fill, d = a.options, f = a._container;
            f.stroked = !!d.stroke, f.filled = !!d.fill, d.stroke ? (b || (b = a._stroke = e.SVG.create("stroke")), 
            f.appendChild(b), b.weight = d.weight + "px", b.color = d.color, b.opacity = d.opacity, 
            d.dashArray ? b.dashStyle = e.Util.isArray(d.dashArray) ? d.dashArray.join(" ") : d.dashArray.replace(/( *, *)/g, " ") : b.dashStyle = "", 
            b.endcap = d.lineCap.replace("butt", "flat"), b.joinstyle = d.lineJoin) : b && (f.removeChild(b), 
            a._stroke = null), d.fill ? (c || (c = a._fill = e.SVG.create("fill")), f.appendChild(c), 
            c.color = d.fillColor || d.color, c.opacity = d.fillOpacity) : c && (f.removeChild(c), 
            a._fill = null);
        },
        _updateCircle: function(a) {
            var b = a._point.round(), c = Math.round(a._radius), d = Math.round(a._radiusY || c);
            this._setPath(a, a._empty() ? "M0 0" : "AL " + b.x + "," + b.y + " " + c + "," + d + " 0,23592600");
        },
        _setPath: function(a, b) {
            a._path.v = b;
        },
        _bringToFront: function(a) {
            e.DomUtil.toFront(a._container);
        },
        _bringToBack: function(a) {
            e.DomUtil.toBack(a._container);
        }
    } : {}), e.Browser.vml && (e.SVG.create = function() {
        try {
            return b.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"), function(a) {
                return b.createElement("<lvml:" + a + ' class="lvml">');
            };
        } catch (a) {
            return function(a) {
                return b.createElement("<" + a + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
            };
        }
    }()), e.Canvas = e.Renderer.extend({
        getEvents: function() {
            var a = e.Renderer.prototype.getEvents.call(this);
            return a.viewprereset = this._onViewPreReset, a;
        },
        _onViewPreReset: function() {
            this._postponeUpdatePaths = !0;
        },
        onAdd: function() {
            e.Renderer.prototype.onAdd.call(this), this._draw();
        },
        _initContainer: function() {
            var a = this._container = b.createElement("canvas");
            e.DomEvent.on(a, "mousemove", e.Util.throttle(this._onMouseMove, 32, this), this).on(a, "click dblclick mousedown mouseup contextmenu", this._onClick, this).on(a, "mouseout", this._handleMouseOut, this), 
            this._ctx = a.getContext("2d");
        },
        _updatePaths: function() {
            if (!this._postponeUpdatePaths) {
                var a;
                this._redrawBounds = null;
                for (var b in this._layers) a = this._layers[b], a._update();
                this._redraw();
            }
        },
        _update: function() {
            if (!this._map._animatingZoom || !this._bounds) {
                this._drawnLayers = {}, e.Renderer.prototype._update.call(this);
                var a = this._bounds, b = this._container, c = a.getSize(), d = e.Browser.retina ? 2 : 1;
                e.DomUtil.setPosition(b, a.min), b.width = d * c.x, b.height = d * c.y, b.style.width = c.x + "px", 
                b.style.height = c.y + "px", e.Browser.retina && this._ctx.scale(2, 2), this._ctx.translate(-a.min.x, -a.min.y), 
                this.fire("update");
            }
        },
        _reset: function() {
            e.Renderer.prototype._reset.call(this), this._postponeUpdatePaths && (this._postponeUpdatePaths = !1, 
            this._updatePaths());
        },
        _initPath: function(a) {
            this._updateDashArray(a), this._layers[e.stamp(a)] = a;
            var b = a._order = {
                layer: a,
                prev: this._drawLast,
                next: null
            };
            this._drawLast && (this._drawLast.next = b), this._drawLast = b, this._drawFirst = this._drawFirst || this._drawLast;
        },
        _addPath: function(a) {
            this._requestRedraw(a);
        },
        _removePath: function(a) {
            var b = a._order, c = b.next, d = b.prev;
            c ? c.prev = d : this._drawLast = d, d ? d.next = c : this._drawFirst = c, delete a._order, 
            delete this._layers[e.stamp(a)], this._requestRedraw(a);
        },
        _updatePath: function(a) {
            this._extendRedrawBounds(a), a._project(), a._update(), this._requestRedraw(a);
        },
        _updateStyle: function(a) {
            this._updateDashArray(a), this._requestRedraw(a);
        },
        _updateDashArray: function(a) {
            if (a.options.dashArray) {
                var b, c = a.options.dashArray.split(","), d = [];
                for (b = 0; b < c.length; b++) d.push(Number(c[b]));
                a.options._dashArray = d;
            }
        },
        _requestRedraw: function(a) {
            this._map && (this._extendRedrawBounds(a), this._redrawRequest = this._redrawRequest || e.Util.requestAnimFrame(this._redraw, this));
        },
        _extendRedrawBounds: function(a) {
            var b = (a.options.weight || 0) + 1;
            this._redrawBounds = this._redrawBounds || new e.Bounds(), this._redrawBounds.extend(a._pxBounds.min.subtract([ b, b ])), 
            this._redrawBounds.extend(a._pxBounds.max.add([ b, b ]));
        },
        _redraw: function() {
            this._redrawRequest = null, this._redrawBounds && (this._redrawBounds.min._floor(), 
            this._redrawBounds.max._ceil()), this._clear(), this._draw(), this._redrawBounds = null;
        },
        _clear: function() {
            var a = this._redrawBounds;
            if (a) {
                var b = a.getSize();
                this._ctx.clearRect(a.min.x, a.min.y, b.x, b.y);
            } else this._ctx.clearRect(0, 0, this._container.width, this._container.height);
        },
        _draw: function() {
            var a, b = this._redrawBounds;
            if (this._ctx.save(), b) {
                var c = b.getSize();
                this._ctx.beginPath(), this._ctx.rect(b.min.x, b.min.y, c.x, c.y), this._ctx.clip();
            }
            this._drawing = !0;
            for (var d = this._drawFirst; d; d = d.next) a = d.layer, (!b || a._pxBounds && a._pxBounds.intersects(b)) && a._updatePath();
            this._drawing = !1, this._ctx.restore();
        },
        _updatePoly: function(a, b) {
            if (this._drawing) {
                var c, d, e, f, g = a._parts, h = g.length, i = this._ctx;
                if (h) {
                    for (this._drawnLayers[a._leaflet_id] = a, i.beginPath(), i.setLineDash && i.setLineDash(a.options && a.options._dashArray || []), 
                    c = 0; c < h; c++) {
                        for (d = 0, e = g[c].length; d < e; d++) f = g[c][d], i[d ? "lineTo" : "moveTo"](f.x, f.y);
                        b && i.closePath();
                    }
                    this._fillStroke(i, a);
                }
            }
        },
        _updateCircle: function(a) {
            if (this._drawing && !a._empty()) {
                var b = a._point, c = this._ctx, d = a._radius, e = (a._radiusY || d) / d;
                this._drawnLayers[a._leaflet_id] = a, 1 !== e && (c.save(), c.scale(1, e)), c.beginPath(), 
                c.arc(b.x, b.y / e, d, 0, 2 * Math.PI, !1), 1 !== e && c.restore(), this._fillStroke(c, a);
            }
        },
        _fillStroke: function(a, b) {
            var c = b.options;
            c.fill && (a.globalAlpha = c.fillOpacity, a.fillStyle = c.fillColor || c.color, 
            a.fill(c.fillRule || "evenodd")), c.stroke && 0 !== c.weight && (a.globalAlpha = c.opacity, 
            a.lineWidth = c.weight, a.strokeStyle = c.color, a.lineCap = c.lineCap, a.lineJoin = c.lineJoin, 
            a.stroke());
        },
        _onClick: function(a) {
            for (var b, c, d = this._map.mouseEventToLayerPoint(a), f = this._drawFirst; f; f = f.next) b = f.layer, 
            b.options.interactive && b._containsPoint(d) && !this._map._draggableMoved(b) && (c = b);
            c && (e.DomEvent._fakeStop(a), this._fireEvent([ c ], a));
        },
        _onMouseMove: function(a) {
            if (this._map && !this._map.dragging.moving() && !this._map._animatingZoom) {
                var b = this._map.mouseEventToLayerPoint(a);
                this._handleMouseHover(a, b);
            }
        },
        _handleMouseOut: function(a) {
            var b = this._hoveredLayer;
            b && (e.DomUtil.removeClass(this._container, "leaflet-interactive"), this._fireEvent([ b ], a, "mouseout"), 
            this._hoveredLayer = null);
        },
        _handleMouseHover: function(a, b) {
            for (var c, d, f = this._drawFirst; f; f = f.next) c = f.layer, c.options.interactive && c._containsPoint(b) && (d = c);
            d !== this._hoveredLayer && (this._handleMouseOut(a), d && (e.DomUtil.addClass(this._container, "leaflet-interactive"), 
            this._fireEvent([ d ], a, "mouseover"), this._hoveredLayer = d)), this._hoveredLayer && this._fireEvent([ this._hoveredLayer ], a);
        },
        _fireEvent: function(a, b, c) {
            this._map._fireDOMEvent(b, c || b.type, a);
        },
        _bringToFront: function(a) {
            var b = a._order, c = b.next, d = b.prev;
            c && (c.prev = d, d ? d.next = c : c && (this._drawFirst = c), b.prev = this._drawLast, 
            this._drawLast.next = b, b.next = null, this._drawLast = b, this._requestRedraw(a));
        },
        _bringToBack: function(a) {
            var b = a._order, c = b.next, d = b.prev;
            d && (d.next = c, c ? c.prev = d : d && (this._drawLast = d), b.prev = null, b.next = this._drawFirst, 
            this._drawFirst.prev = b, this._drawFirst = b, this._requestRedraw(a));
        }
    }), e.Browser.canvas = function() {
        return !!b.createElement("canvas").getContext;
    }(), e.canvas = function(a) {
        return e.Browser.canvas ? new e.Canvas(a) : null;
    }, e.Polyline.prototype._containsPoint = function(a, b) {
        var c, d, f, g, h, i, j = this._clickTolerance();
        if (!this._pxBounds.contains(a)) return !1;
        for (c = 0, g = this._parts.length; c < g; c++) for (i = this._parts[c], d = 0, 
        h = i.length, f = h - 1; d < h; f = d++) if ((b || 0 !== d) && e.LineUtil.pointToSegmentDistance(a, i[f], i[d]) <= j) return !0;
        return !1;
    }, e.Polygon.prototype._containsPoint = function(a) {
        var b, c, d, f, g, h, i, j, k = !1;
        if (!this._pxBounds.contains(a)) return !1;
        for (f = 0, i = this._parts.length; f < i; f++) for (b = this._parts[f], g = 0, 
        j = b.length, h = j - 1; g < j; h = g++) c = b[g], d = b[h], c.y > a.y != d.y > a.y && a.x < (d.x - c.x) * (a.y - c.y) / (d.y - c.y) + c.x && (k = !k);
        return k || e.Polyline.prototype._containsPoint.call(this, a, !0);
    }, e.CircleMarker.prototype._containsPoint = function(a) {
        return a.distanceTo(this._point) <= this._radius + this._clickTolerance();
    }, e.GeoJSON = e.FeatureGroup.extend({
        initialize: function(a, b) {
            e.setOptions(this, b), this._layers = {}, a && this.addData(a);
        },
        addData: function(a) {
            var b, c, d, f = e.Util.isArray(a) ? a : a.features;
            if (f) {
                for (b = 0, c = f.length; b < c; b++) d = f[b], (d.geometries || d.geometry || d.features || d.coordinates) && this.addData(d);
                return this;
            }
            var g = this.options;
            if (g.filter && !g.filter(a)) return this;
            var h = e.GeoJSON.geometryToLayer(a, g);
            return h ? (h.feature = e.GeoJSON.asFeature(a), h.defaultOptions = h.options, this.resetStyle(h), 
            g.onEachFeature && g.onEachFeature(a, h), this.addLayer(h)) : this;
        },
        resetStyle: function(a) {
            return a.options = e.Util.extend({}, a.defaultOptions), this._setLayerStyle(a, this.options.style), 
            this;
        },
        setStyle: function(a) {
            return this.eachLayer(function(b) {
                this._setLayerStyle(b, a);
            }, this);
        },
        _setLayerStyle: function(a, b) {
            "function" == typeof b && (b = b(a.feature)), a.setStyle && a.setStyle(b);
        }
    }), e.extend(e.GeoJSON, {
        geometryToLayer: function(a, b) {
            var c, d, f, g, h = "Feature" === a.type ? a.geometry : a, i = h ? h.coordinates : null, j = [], k = b && b.pointToLayer, l = b && b.coordsToLatLng || this.coordsToLatLng;
            if (!i && !h) return null;
            switch (h.type) {
              case "Point":
                return c = l(i), k ? k(a, c) : new e.Marker(c);

              case "MultiPoint":
                for (f = 0, g = i.length; f < g; f++) c = l(i[f]), j.push(k ? k(a, c) : new e.Marker(c));
                return new e.FeatureGroup(j);

              case "LineString":
              case "MultiLineString":
                return d = this.coordsToLatLngs(i, "LineString" === h.type ? 0 : 1, l), new e.Polyline(d, b);

              case "Polygon":
              case "MultiPolygon":
                return d = this.coordsToLatLngs(i, "Polygon" === h.type ? 1 : 2, l), new e.Polygon(d, b);

              case "GeometryCollection":
                for (f = 0, g = h.geometries.length; f < g; f++) {
                    var m = this.geometryToLayer({
                        geometry: h.geometries[f],
                        type: "Feature",
                        properties: a.properties
                    }, b);
                    m && j.push(m);
                }
                return new e.FeatureGroup(j);

              default:
                throw new Error("Invalid GeoJSON object.");
            }
        },
        coordsToLatLng: function(a) {
            return new e.LatLng(a[1], a[0], a[2]);
        },
        coordsToLatLngs: function(a, b, c) {
            for (var d, e = [], f = 0, g = a.length; f < g; f++) d = b ? this.coordsToLatLngs(a[f], b - 1, c) : (c || this.coordsToLatLng)(a[f]), 
            e.push(d);
            return e;
        },
        latLngToCoords: function(a) {
            return a.alt !== c ? [ a.lng, a.lat, a.alt ] : [ a.lng, a.lat ];
        },
        latLngsToCoords: function(a, b, c) {
            for (var d = [], f = 0, g = a.length; f < g; f++) d.push(b ? e.GeoJSON.latLngsToCoords(a[f], b - 1, c) : e.GeoJSON.latLngToCoords(a[f]));
            return !b && c && d.push(d[0]), d;
        },
        getFeature: function(a, b) {
            return a.feature ? e.extend({}, a.feature, {
                geometry: b
            }) : e.GeoJSON.asFeature(b);
        },
        asFeature: function(a) {
            return "Feature" === a.type || "FeatureCollection" === a.type ? a : {
                type: "Feature",
                properties: {},
                geometry: a
            };
        }
    });
    var h = {
        toGeoJSON: function() {
            return e.GeoJSON.getFeature(this, {
                type: "Point",
                coordinates: e.GeoJSON.latLngToCoords(this.getLatLng())
            });
        }
    };
    e.Marker.include(h), e.Circle.include(h), e.CircleMarker.include(h), e.Polyline.prototype.toGeoJSON = function() {
        var a = !e.Polyline._flat(this._latlngs), b = e.GeoJSON.latLngsToCoords(this._latlngs, a ? 1 : 0);
        return e.GeoJSON.getFeature(this, {
            type: (a ? "Multi" : "") + "LineString",
            coordinates: b
        });
    }, e.Polygon.prototype.toGeoJSON = function() {
        var a = !e.Polyline._flat(this._latlngs), b = a && !e.Polyline._flat(this._latlngs[0]), c = e.GeoJSON.latLngsToCoords(this._latlngs, b ? 2 : a ? 1 : 0, !0);
        return a || (c = [ c ]), e.GeoJSON.getFeature(this, {
            type: (b ? "Multi" : "") + "Polygon",
            coordinates: c
        });
    }, e.LayerGroup.include({
        toMultiPoint: function() {
            var a = [];
            return this.eachLayer(function(b) {
                a.push(b.toGeoJSON().geometry.coordinates);
            }), e.GeoJSON.getFeature(this, {
                type: "MultiPoint",
                coordinates: a
            });
        },
        toGeoJSON: function() {
            var a = this.feature && this.feature.geometry && this.feature.geometry.type;
            if ("MultiPoint" === a) return this.toMultiPoint();
            var b = "GeometryCollection" === a, c = [];
            return this.eachLayer(function(a) {
                if (a.toGeoJSON) {
                    var d = a.toGeoJSON();
                    c.push(b ? d.geometry : e.GeoJSON.asFeature(d));
                }
            }), b ? e.GeoJSON.getFeature(this, {
                geometries: c,
                type: "GeometryCollection"
            }) : {
                type: "FeatureCollection",
                features: c
            };
        }
    }), e.geoJSON = function(a, b) {
        return new e.GeoJSON(a, b);
    }, e.geoJson = e.geoJSON, e.Draggable = e.Evented.extend({
        options: {
            clickTolerance: 3
        },
        statics: {
            START: e.Browser.touch ? [ "touchstart", "mousedown" ] : [ "mousedown" ],
            END: {
                mousedown: "mouseup",
                touchstart: "touchend",
                pointerdown: "touchend",
                MSPointerDown: "touchend"
            },
            MOVE: {
                mousedown: "mousemove",
                touchstart: "touchmove",
                pointerdown: "touchmove",
                MSPointerDown: "touchmove"
            }
        },
        initialize: function(a, b, c) {
            this._element = a, this._dragStartTarget = b || a, this._preventOutline = c;
        },
        enable: function() {
            this._enabled || (e.DomEvent.on(this._dragStartTarget, e.Draggable.START.join(" "), this._onDown, this), 
            this._enabled = !0);
        },
        disable: function() {
            this._enabled && (e.Draggable._dragging === this && this.finishDrag(), e.DomEvent.off(this._dragStartTarget, e.Draggable.START.join(" "), this._onDown, this), 
            this._enabled = !1, this._moved = !1);
        },
        _onDown: function(a) {
            if (!a._simulated && this._enabled && (this._moved = !1, !e.DomUtil.hasClass(this._element, "leaflet-zoom-anim") && !(e.Draggable._dragging || a.shiftKey || 1 !== a.which && 1 !== a.button && !a.touches || (e.Draggable._dragging = this, 
            this._preventOutline && e.DomUtil.preventOutline(this._element), e.DomUtil.disableImageDrag(), 
            e.DomUtil.disableTextSelection(), this._moving)))) {
                this.fire("down");
                var c = a.touches ? a.touches[0] : a;
                this._startPoint = new e.Point(c.clientX, c.clientY), e.DomEvent.on(b, e.Draggable.MOVE[a.type], this._onMove, this).on(b, e.Draggable.END[a.type], this._onUp, this);
            }
        },
        _onMove: function(c) {
            if (!c._simulated && this._enabled) {
                if (c.touches && c.touches.length > 1) return void (this._moved = !0);
                var d = c.touches && 1 === c.touches.length ? c.touches[0] : c, f = new e.Point(d.clientX, d.clientY), g = f.subtract(this._startPoint);
                (g.x || g.y) && (Math.abs(g.x) + Math.abs(g.y) < this.options.clickTolerance || (e.DomEvent.preventDefault(c), 
                this._moved || (this.fire("dragstart"), this._moved = !0, this._startPos = e.DomUtil.getPosition(this._element).subtract(g), 
                e.DomUtil.addClass(b.body, "leaflet-dragging"), this._lastTarget = c.target || c.srcElement, 
                a.SVGElementInstance && this._lastTarget instanceof SVGElementInstance && (this._lastTarget = this._lastTarget.correspondingUseElement), 
                e.DomUtil.addClass(this._lastTarget, "leaflet-drag-target")), this._newPos = this._startPos.add(g), 
                this._moving = !0, e.Util.cancelAnimFrame(this._animRequest), this._lastEvent = c, 
                this._animRequest = e.Util.requestAnimFrame(this._updatePosition, this, !0)));
            }
        },
        _updatePosition: function() {
            var a = {
                originalEvent: this._lastEvent
            };
            this.fire("predrag", a), e.DomUtil.setPosition(this._element, this._newPos), this.fire("drag", a);
        },
        _onUp: function(a) {
            !a._simulated && this._enabled && this.finishDrag();
        },
        finishDrag: function() {
            e.DomUtil.removeClass(b.body, "leaflet-dragging"), this._lastTarget && (e.DomUtil.removeClass(this._lastTarget, "leaflet-drag-target"), 
            this._lastTarget = null);
            for (var a in e.Draggable.MOVE) e.DomEvent.off(b, e.Draggable.MOVE[a], this._onMove, this).off(b, e.Draggable.END[a], this._onUp, this);
            e.DomUtil.enableImageDrag(), e.DomUtil.enableTextSelection(), this._moved && this._moving && (e.Util.cancelAnimFrame(this._animRequest), 
            this.fire("dragend", {
                distance: this._newPos.distanceTo(this._startPos)
            })), this._moving = !1, e.Draggable._dragging = !1;
        }
    }), e.Handler = e.Class.extend({
        initialize: function(a) {
            this._map = a;
        },
        enable: function() {
            return this._enabled ? this : (this._enabled = !0, this.addHooks(), this);
        },
        disable: function() {
            return this._enabled ? (this._enabled = !1, this.removeHooks(), this) : this;
        },
        enabled: function() {
            return !!this._enabled;
        }
    }), e.Map.mergeOptions({
        dragging: !0,
        inertia: !e.Browser.android23,
        inertiaDeceleration: 3400,
        inertiaMaxSpeed: 1 / 0,
        easeLinearity: .2,
        worldCopyJump: !1,
        maxBoundsViscosity: 0
    }), e.Map.Drag = e.Handler.extend({
        addHooks: function() {
            if (!this._draggable) {
                var a = this._map;
                this._draggable = new e.Draggable(a._mapPane, a._container), this._draggable.on({
                    down: this._onDown,
                    dragstart: this._onDragStart,
                    drag: this._onDrag,
                    dragend: this._onDragEnd
                }, this), this._draggable.on("predrag", this._onPreDragLimit, this), a.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDragWrap, this), 
                a.on("zoomend", this._onZoomEnd, this), a.whenReady(this._onZoomEnd, this));
            }
            e.DomUtil.addClass(this._map._container, "leaflet-grab leaflet-touch-drag"), this._draggable.enable(), 
            this._positions = [], this._times = [];
        },
        removeHooks: function() {
            e.DomUtil.removeClass(this._map._container, "leaflet-grab"), e.DomUtil.removeClass(this._map._container, "leaflet-touch-drag"), 
            this._draggable.disable();
        },
        moved: function() {
            return this._draggable && this._draggable._moved;
        },
        moving: function() {
            return this._draggable && this._draggable._moving;
        },
        _onDown: function() {
            this._map._stop();
        },
        _onDragStart: function() {
            var a = this._map;
            if (this._map.options.maxBounds && this._map.options.maxBoundsViscosity) {
                var b = e.latLngBounds(this._map.options.maxBounds);
                this._offsetLimit = e.bounds(this._map.latLngToContainerPoint(b.getNorthWest()).multiplyBy(-1), this._map.latLngToContainerPoint(b.getSouthEast()).multiplyBy(-1).add(this._map.getSize())), 
                this._viscosity = Math.min(1, Math.max(0, this._map.options.maxBoundsViscosity));
            } else this._offsetLimit = null;
            a.fire("movestart").fire("dragstart"), a.options.inertia && (this._positions = [], 
            this._times = []);
        },
        _onDrag: function(a) {
            if (this._map.options.inertia) {
                var b = this._lastTime = +new Date(), c = this._lastPos = this._draggable._absPos || this._draggable._newPos;
                this._positions.push(c), this._times.push(b), b - this._times[0] > 50 && (this._positions.shift(), 
                this._times.shift());
            }
            this._map.fire("move", a).fire("drag", a);
        },
        _onZoomEnd: function() {
            var a = this._map.getSize().divideBy(2), b = this._map.latLngToLayerPoint([ 0, 0 ]);
            this._initialWorldOffset = b.subtract(a).x, this._worldWidth = this._map.getPixelWorldBounds().getSize().x;
        },
        _viscousLimit: function(a, b) {
            return a - (a - b) * this._viscosity;
        },
        _onPreDragLimit: function() {
            if (this._viscosity && this._offsetLimit) {
                var a = this._draggable._newPos.subtract(this._draggable._startPos), b = this._offsetLimit;
                a.x < b.min.x && (a.x = this._viscousLimit(a.x, b.min.x)), a.y < b.min.y && (a.y = this._viscousLimit(a.y, b.min.y)), 
                a.x > b.max.x && (a.x = this._viscousLimit(a.x, b.max.x)), a.y > b.max.y && (a.y = this._viscousLimit(a.y, b.max.y)), 
                this._draggable._newPos = this._draggable._startPos.add(a);
            }
        },
        _onPreDragWrap: function() {
            var a = this._worldWidth, b = Math.round(a / 2), c = this._initialWorldOffset, d = this._draggable._newPos.x, e = (d - b + c) % a + b - c, f = (d + b + c) % a - b - c, g = Math.abs(e + c) < Math.abs(f + c) ? e : f;
            this._draggable._absPos = this._draggable._newPos.clone(), this._draggable._newPos.x = g;
        },
        _onDragEnd: function(a) {
            var b = this._map, c = b.options, d = !c.inertia || this._times.length < 2;
            if (b.fire("dragend", a), d) b.fire("moveend"); else {
                var f = this._lastPos.subtract(this._positions[0]), g = (this._lastTime - this._times[0]) / 1e3, h = c.easeLinearity, i = f.multiplyBy(h / g), j = i.distanceTo([ 0, 0 ]), k = Math.min(c.inertiaMaxSpeed, j), l = i.multiplyBy(k / j), m = k / (c.inertiaDeceleration * h), n = l.multiplyBy(-m / 2).round();
                n.x || n.y ? (n = b._limitOffset(n, b.options.maxBounds), e.Util.requestAnimFrame(function() {
                    b.panBy(n, {
                        duration: m,
                        easeLinearity: h,
                        noMoveStart: !0,
                        animate: !0
                    });
                })) : b.fire("moveend");
            }
        }
    }), e.Map.addInitHook("addHandler", "dragging", e.Map.Drag), e.Map.mergeOptions({
        doubleClickZoom: !0
    }), e.Map.DoubleClickZoom = e.Handler.extend({
        addHooks: function() {
            this._map.on("dblclick", this._onDoubleClick, this);
        },
        removeHooks: function() {
            this._map.off("dblclick", this._onDoubleClick, this);
        },
        _onDoubleClick: function(a) {
            var b = this._map, c = b.getZoom(), d = b.options.zoomDelta, e = a.originalEvent.shiftKey ? c - d : c + d;
            "center" === b.options.doubleClickZoom ? b.setZoom(e) : b.setZoomAround(a.containerPoint, e);
        }
    }), e.Map.addInitHook("addHandler", "doubleClickZoom", e.Map.DoubleClickZoom), e.Map.mergeOptions({
        scrollWheelZoom: !0,
        wheelDebounceTime: 40,
        wheelPxPerZoomLevel: 60
    }), e.Map.ScrollWheelZoom = e.Handler.extend({
        addHooks: function() {
            e.DomEvent.on(this._map._container, "mousewheel", this._onWheelScroll, this), this._delta = 0;
        },
        removeHooks: function() {
            e.DomEvent.off(this._map._container, "mousewheel", this._onWheelScroll, this);
        },
        _onWheelScroll: function(a) {
            var b = e.DomEvent.getWheelDelta(a), c = this._map.options.wheelDebounceTime;
            this._delta += b, this._lastMousePos = this._map.mouseEventToContainerPoint(a), 
            this._startTime || (this._startTime = +new Date());
            var d = Math.max(c - (+new Date() - this._startTime), 0);
            clearTimeout(this._timer), this._timer = setTimeout(e.bind(this._performZoom, this), d), 
            e.DomEvent.stop(a);
        },
        _performZoom: function() {
            var a = this._map, b = a.getZoom(), c = this._map.options.zoomSnap || 0;
            a._stop();
            var d = this._delta / (4 * this._map.options.wheelPxPerZoomLevel), e = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(d)))) / Math.LN2, f = c ? Math.ceil(e / c) * c : e, g = a._limitZoom(b + (this._delta > 0 ? f : -f)) - b;
            this._delta = 0, this._startTime = null, g && ("center" === a.options.scrollWheelZoom ? a.setZoom(b + g) : a.setZoomAround(this._lastMousePos, b + g));
        }
    }), e.Map.addInitHook("addHandler", "scrollWheelZoom", e.Map.ScrollWheelZoom), e.extend(e.DomEvent, {
        _touchstart: e.Browser.msPointer ? "MSPointerDown" : e.Browser.pointer ? "pointerdown" : "touchstart",
        _touchend: e.Browser.msPointer ? "MSPointerUp" : e.Browser.pointer ? "pointerup" : "touchend",
        addDoubleTapListener: function(a, b, c) {
            function d(a) {
                var b;
                if (e.Browser.pointer) {
                    if (!e.Browser.edge || "mouse" === a.pointerType) return;
                    b = e.DomEvent._pointersCount;
                } else b = a.touches.length;
                if (!(b > 1)) {
                    var c = Date.now(), d = c - (g || c);
                    h = a.touches ? a.touches[0] : a, i = d > 0 && d <= j, g = c;
                }
            }
            function f(a) {
                if (i && !h.cancelBubble) {
                    if (e.Browser.pointer) {
                        if (!e.Browser.edge || "mouse" === a.pointerType) return;
                        var c, d, f = {};
                        for (d in h) c = h[d], f[d] = c && c.bind ? c.bind(h) : c;
                        h = f;
                    }
                    h.type = "dblclick", b(h), g = null;
                }
            }
            var g, h, i = !1, j = 250, k = "_leaflet_", l = this._touchstart, m = this._touchend;
            return a[k + l + c] = d, a[k + m + c] = f, a[k + "dblclick" + c] = b, a.addEventListener(l, d, !1), 
            a.addEventListener(m, f, !1), a.addEventListener("dblclick", b, !1), this;
        },
        removeDoubleTapListener: function(a, b) {
            var c = "_leaflet_", d = a[c + this._touchstart + b], f = a[c + this._touchend + b], g = a[c + "dblclick" + b];
            return a.removeEventListener(this._touchstart, d, !1), a.removeEventListener(this._touchend, f, !1), 
            e.Browser.edge || a.removeEventListener("dblclick", g, !1), this;
        }
    }), e.extend(e.DomEvent, {
        POINTER_DOWN: e.Browser.msPointer ? "MSPointerDown" : "pointerdown",
        POINTER_MOVE: e.Browser.msPointer ? "MSPointerMove" : "pointermove",
        POINTER_UP: e.Browser.msPointer ? "MSPointerUp" : "pointerup",
        POINTER_CANCEL: e.Browser.msPointer ? "MSPointerCancel" : "pointercancel",
        TAG_WHITE_LIST: [ "INPUT", "SELECT", "OPTION" ],
        _pointers: {},
        _pointersCount: 0,
        addPointerListener: function(a, b, c, d) {
            return "touchstart" === b ? this._addPointerStart(a, c, d) : "touchmove" === b ? this._addPointerMove(a, c, d) : "touchend" === b && this._addPointerEnd(a, c, d), 
            this;
        },
        removePointerListener: function(a, b, c) {
            var d = a["_leaflet_" + b + c];
            return "touchstart" === b ? a.removeEventListener(this.POINTER_DOWN, d, !1) : "touchmove" === b ? a.removeEventListener(this.POINTER_MOVE, d, !1) : "touchend" === b && (a.removeEventListener(this.POINTER_UP, d, !1), 
            a.removeEventListener(this.POINTER_CANCEL, d, !1)), this;
        },
        _addPointerStart: function(a, c, d) {
            var f = e.bind(function(a) {
                if ("mouse" !== a.pointerType && a.MSPOINTER_TYPE_MOUSE && a.pointerType !== a.MSPOINTER_TYPE_MOUSE) {
                    if (!(this.TAG_WHITE_LIST.indexOf(a.target.tagName) < 0)) return;
                    e.DomEvent.preventDefault(a);
                }
                this._handlePointer(a, c);
            }, this);
            if (a["_leaflet_touchstart" + d] = f, a.addEventListener(this.POINTER_DOWN, f, !1), 
            !this._pointerDocListener) {
                var g = e.bind(this._globalPointerUp, this);
                b.documentElement.addEventListener(this.POINTER_DOWN, e.bind(this._globalPointerDown, this), !0), 
                b.documentElement.addEventListener(this.POINTER_MOVE, e.bind(this._globalPointerMove, this), !0), 
                b.documentElement.addEventListener(this.POINTER_UP, g, !0), b.documentElement.addEventListener(this.POINTER_CANCEL, g, !0), 
                this._pointerDocListener = !0;
            }
        },
        _globalPointerDown: function(a) {
            this._pointers[a.pointerId] = a, this._pointersCount++;
        },
        _globalPointerMove: function(a) {
            this._pointers[a.pointerId] && (this._pointers[a.pointerId] = a);
        },
        _globalPointerUp: function(a) {
            delete this._pointers[a.pointerId], this._pointersCount--;
        },
        _handlePointer: function(a, b) {
            a.touches = [];
            for (var c in this._pointers) a.touches.push(this._pointers[c]);
            a.changedTouches = [ a ], b(a);
        },
        _addPointerMove: function(a, b, c) {
            var d = e.bind(function(a) {
                (a.pointerType !== a.MSPOINTER_TYPE_MOUSE && "mouse" !== a.pointerType || 0 !== a.buttons) && this._handlePointer(a, b);
            }, this);
            a["_leaflet_touchmove" + c] = d, a.addEventListener(this.POINTER_MOVE, d, !1);
        },
        _addPointerEnd: function(a, b, c) {
            var d = e.bind(function(a) {
                this._handlePointer(a, b);
            }, this);
            a["_leaflet_touchend" + c] = d, a.addEventListener(this.POINTER_UP, d, !1), a.addEventListener(this.POINTER_CANCEL, d, !1);
        }
    }), e.Map.mergeOptions({
        touchZoom: e.Browser.touch && !e.Browser.android23,
        bounceAtZoomLimits: !0
    }), e.Map.TouchZoom = e.Handler.extend({
        addHooks: function() {
            e.DomUtil.addClass(this._map._container, "leaflet-touch-zoom"), e.DomEvent.on(this._map._container, "touchstart", this._onTouchStart, this);
        },
        removeHooks: function() {
            e.DomUtil.removeClass(this._map._container, "leaflet-touch-zoom"), e.DomEvent.off(this._map._container, "touchstart", this._onTouchStart, this);
        },
        _onTouchStart: function(a) {
            var c = this._map;
            if (a.touches && 2 === a.touches.length && !c._animatingZoom && !this._zooming) {
                var d = c.mouseEventToContainerPoint(a.touches[0]), f = c.mouseEventToContainerPoint(a.touches[1]);
                this._centerPoint = c.getSize()._divideBy(2), this._startLatLng = c.containerPointToLatLng(this._centerPoint), 
                "center" !== c.options.touchZoom && (this._pinchStartLatLng = c.containerPointToLatLng(d.add(f)._divideBy(2))), 
                this._startDist = d.distanceTo(f), this._startZoom = c.getZoom(), this._moved = !1, 
                this._zooming = !0, c._stop(), e.DomEvent.on(b, "touchmove", this._onTouchMove, this).on(b, "touchend", this._onTouchEnd, this), 
                e.DomEvent.preventDefault(a);
            }
        },
        _onTouchMove: function(a) {
            if (a.touches && 2 === a.touches.length && this._zooming) {
                var b = this._map, c = b.mouseEventToContainerPoint(a.touches[0]), d = b.mouseEventToContainerPoint(a.touches[1]), f = c.distanceTo(d) / this._startDist;
                if (this._zoom = b.getScaleZoom(f, this._startZoom), !b.options.bounceAtZoomLimits && (this._zoom < b.getMinZoom() && f < 1 || this._zoom > b.getMaxZoom() && f > 1) && (this._zoom = b._limitZoom(this._zoom)), 
                "center" === b.options.touchZoom) {
                    if (this._center = this._startLatLng, 1 === f) return;
                } else {
                    var g = c._add(d)._divideBy(2)._subtract(this._centerPoint);
                    if (1 === f && 0 === g.x && 0 === g.y) return;
                    this._center = b.unproject(b.project(this._pinchStartLatLng, this._zoom).subtract(g), this._zoom);
                }
                this._moved || (b._moveStart(!0), this._moved = !0), e.Util.cancelAnimFrame(this._animRequest);
                var h = e.bind(b._move, b, this._center, this._zoom, {
                    pinch: !0,
                    round: !1
                });
                this._animRequest = e.Util.requestAnimFrame(h, this, !0), e.DomEvent.preventDefault(a);
            }
        },
        _onTouchEnd: function() {
            if (!this._moved || !this._zooming) return void (this._zooming = !1);
            this._zooming = !1, e.Util.cancelAnimFrame(this._animRequest), e.DomEvent.off(b, "touchmove", this._onTouchMove).off(b, "touchend", this._onTouchEnd), 
            this._map.options.zoomAnimation ? this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), !0, this._map.options.zoomSnap) : this._map._resetView(this._center, this._map._limitZoom(this._zoom));
        }
    }), e.Map.addInitHook("addHandler", "touchZoom", e.Map.TouchZoom), e.Map.mergeOptions({
        tap: !0,
        tapTolerance: 15
    }), e.Map.Tap = e.Handler.extend({
        addHooks: function() {
            e.DomEvent.on(this._map._container, "touchstart", this._onDown, this);
        },
        removeHooks: function() {
            e.DomEvent.off(this._map._container, "touchstart", this._onDown, this);
        },
        _onDown: function(a) {
            if (a.touches) {
                if (e.DomEvent.preventDefault(a), this._fireClick = !0, a.touches.length > 1) return this._fireClick = !1, 
                void clearTimeout(this._holdTimeout);
                var c = a.touches[0], d = c.target;
                this._startPos = this._newPos = new e.Point(c.clientX, c.clientY), d.tagName && "a" === d.tagName.toLowerCase() && e.DomUtil.addClass(d, "leaflet-active"), 
                this._holdTimeout = setTimeout(e.bind(function() {
                    this._isTapValid() && (this._fireClick = !1, this._onUp(), this._simulateEvent("contextmenu", c));
                }, this), 1e3), this._simulateEvent("mousedown", c), e.DomEvent.on(b, {
                    touchmove: this._onMove,
                    touchend: this._onUp
                }, this);
            }
        },
        _onUp: function(a) {
            if (clearTimeout(this._holdTimeout), e.DomEvent.off(b, {
                touchmove: this._onMove,
                touchend: this._onUp
            }, this), this._fireClick && a && a.changedTouches) {
                var c = a.changedTouches[0], d = c.target;
                d && d.tagName && "a" === d.tagName.toLowerCase() && e.DomUtil.removeClass(d, "leaflet-active"), 
                this._simulateEvent("mouseup", c), this._isTapValid() && this._simulateEvent("click", c);
            }
        },
        _isTapValid: function() {
            return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance;
        },
        _onMove: function(a) {
            var b = a.touches[0];
            this._newPos = new e.Point(b.clientX, b.clientY), this._simulateEvent("mousemove", b);
        },
        _simulateEvent: function(c, d) {
            var e = b.createEvent("MouseEvents");
            e._simulated = !0, d.target._simulatedClick = !0, e.initMouseEvent(c, !0, !0, a, 1, d.screenX, d.screenY, d.clientX, d.clientY, !1, !1, !1, !1, 0, null), 
            d.target.dispatchEvent(e);
        }
    }), e.Browser.touch && !e.Browser.pointer && e.Map.addInitHook("addHandler", "tap", e.Map.Tap), 
    e.Map.mergeOptions({
        boxZoom: !0
    }), e.Map.BoxZoom = e.Handler.extend({
        initialize: function(a) {
            this._map = a, this._container = a._container, this._pane = a._panes.overlayPane;
        },
        addHooks: function() {
            e.DomEvent.on(this._container, "mousedown", this._onMouseDown, this);
        },
        removeHooks: function() {
            e.DomEvent.off(this._container, "mousedown", this._onMouseDown, this);
        },
        moved: function() {
            return this._moved;
        },
        _resetState: function() {
            this._moved = !1;
        },
        _onMouseDown: function(a) {
            if (!a.shiftKey || 1 !== a.which && 1 !== a.button) return !1;
            this._resetState(), e.DomUtil.disableTextSelection(), e.DomUtil.disableImageDrag(), 
            this._startPoint = this._map.mouseEventToContainerPoint(a), e.DomEvent.on(b, {
                contextmenu: e.DomEvent.stop,
                mousemove: this._onMouseMove,
                mouseup: this._onMouseUp,
                keydown: this._onKeyDown
            }, this);
        },
        _onMouseMove: function(a) {
            this._moved || (this._moved = !0, this._box = e.DomUtil.create("div", "leaflet-zoom-box", this._container), 
            e.DomUtil.addClass(this._container, "leaflet-crosshair"), this._map.fire("boxzoomstart")), 
            this._point = this._map.mouseEventToContainerPoint(a);
            var b = new e.Bounds(this._point, this._startPoint), c = b.getSize();
            e.DomUtil.setPosition(this._box, b.min), this._box.style.width = c.x + "px", this._box.style.height = c.y + "px";
        },
        _finish: function() {
            this._moved && (e.DomUtil.remove(this._box), e.DomUtil.removeClass(this._container, "leaflet-crosshair")), 
            e.DomUtil.enableTextSelection(), e.DomUtil.enableImageDrag(), e.DomEvent.off(b, {
                contextmenu: e.DomEvent.stop,
                mousemove: this._onMouseMove,
                mouseup: this._onMouseUp,
                keydown: this._onKeyDown
            }, this);
        },
        _onMouseUp: function(a) {
            if ((1 === a.which || 1 === a.button) && (this._finish(), this._moved)) {
                setTimeout(e.bind(this._resetState, this), 0);
                var b = new e.LatLngBounds(this._map.containerPointToLatLng(this._startPoint), this._map.containerPointToLatLng(this._point));
                this._map.fitBounds(b).fire("boxzoomend", {
                    boxZoomBounds: b
                });
            }
        },
        _onKeyDown: function(a) {
            27 === a.keyCode && this._finish();
        }
    }), e.Map.addInitHook("addHandler", "boxZoom", e.Map.BoxZoom), e.Map.mergeOptions({
        keyboard: !0,
        keyboardPanDelta: 80
    }), e.Map.Keyboard = e.Handler.extend({
        keyCodes: {
            left: [ 37 ],
            right: [ 39 ],
            down: [ 40 ],
            up: [ 38 ],
            zoomIn: [ 187, 107, 61, 171 ],
            zoomOut: [ 189, 109, 54, 173 ]
        },
        initialize: function(a) {
            this._map = a, this._setPanDelta(a.options.keyboardPanDelta), this._setZoomDelta(a.options.zoomDelta);
        },
        addHooks: function() {
            var a = this._map._container;
            a.tabIndex <= 0 && (a.tabIndex = "0"), e.DomEvent.on(a, {
                focus: this._onFocus,
                blur: this._onBlur,
                mousedown: this._onMouseDown
            }, this), this._map.on({
                focus: this._addHooks,
                blur: this._removeHooks
            }, this);
        },
        removeHooks: function() {
            this._removeHooks(), e.DomEvent.off(this._map._container, {
                focus: this._onFocus,
                blur: this._onBlur,
                mousedown: this._onMouseDown
            }, this), this._map.off({
                focus: this._addHooks,
                blur: this._removeHooks
            }, this);
        },
        _onMouseDown: function() {
            if (!this._focused) {
                var c = b.body, d = b.documentElement, e = c.scrollTop || d.scrollTop, f = c.scrollLeft || d.scrollLeft;
                this._map._container.focus(), a.scrollTo(f, e);
            }
        },
        _onFocus: function() {
            this._focused = !0, this._map.fire("focus");
        },
        _onBlur: function() {
            this._focused = !1, this._map.fire("blur");
        },
        _setPanDelta: function(a) {
            var b, c, d = this._panKeys = {}, e = this.keyCodes;
            for (b = 0, c = e.left.length; b < c; b++) d[e.left[b]] = [ -1 * a, 0 ];
            for (b = 0, c = e.right.length; b < c; b++) d[e.right[b]] = [ a, 0 ];
            for (b = 0, c = e.down.length; b < c; b++) d[e.down[b]] = [ 0, a ];
            for (b = 0, c = e.up.length; b < c; b++) d[e.up[b]] = [ 0, -1 * a ];
        },
        _setZoomDelta: function(a) {
            var b, c, d = this._zoomKeys = {}, e = this.keyCodes;
            for (b = 0, c = e.zoomIn.length; b < c; b++) d[e.zoomIn[b]] = a;
            for (b = 0, c = e.zoomOut.length; b < c; b++) d[e.zoomOut[b]] = -a;
        },
        _addHooks: function() {
            e.DomEvent.on(b, "keydown", this._onKeyDown, this);
        },
        _removeHooks: function() {
            e.DomEvent.off(b, "keydown", this._onKeyDown, this);
        },
        _onKeyDown: function(a) {
            if (!(a.altKey || a.ctrlKey || a.metaKey)) {
                var b, c = a.keyCode, d = this._map;
                if (c in this._panKeys) {
                    if (d._panAnim && d._panAnim._inProgress) return;
                    b = this._panKeys[c], a.shiftKey && (b = e.point(b).multiplyBy(3)), d.panBy(b), 
                    d.options.maxBounds && d.panInsideBounds(d.options.maxBounds);
                } else if (c in this._zoomKeys) d.setZoom(d.getZoom() + (a.shiftKey ? 3 : 1) * this._zoomKeys[c]); else {
                    if (27 !== c) return;
                    d.closePopup();
                }
                e.DomEvent.stop(a);
            }
        }
    }), e.Map.addInitHook("addHandler", "keyboard", e.Map.Keyboard), e.Handler.MarkerDrag = e.Handler.extend({
        initialize: function(a) {
            this._marker = a;
        },
        addHooks: function() {
            var a = this._marker._icon;
            this._draggable || (this._draggable = new e.Draggable(a, a, !0)), this._draggable.on({
                dragstart: this._onDragStart,
                drag: this._onDrag,
                dragend: this._onDragEnd
            }, this).enable(), e.DomUtil.addClass(a, "leaflet-marker-draggable");
        },
        removeHooks: function() {
            this._draggable.off({
                dragstart: this._onDragStart,
                drag: this._onDrag,
                dragend: this._onDragEnd
            }, this).disable(), this._marker._icon && e.DomUtil.removeClass(this._marker._icon, "leaflet-marker-draggable");
        },
        moved: function() {
            return this._draggable && this._draggable._moved;
        },
        _onDragStart: function() {
            this._oldLatLng = this._marker.getLatLng(), this._marker.closePopup().fire("movestart").fire("dragstart");
        },
        _onDrag: function(a) {
            var b = this._marker, c = b._shadow, d = e.DomUtil.getPosition(b._icon), f = b._map.layerPointToLatLng(d);
            c && e.DomUtil.setPosition(c, d), b._latlng = f, a.latlng = f, a.oldLatLng = this._oldLatLng, 
            b.fire("move", a).fire("drag", a);
        },
        _onDragEnd: function(a) {
            delete this._oldLatLng, this._marker.fire("moveend").fire("dragend", a);
        }
    }), e.Control = e.Class.extend({
        options: {
            position: "topright"
        },
        initialize: function(a) {
            e.setOptions(this, a);
        },
        getPosition: function() {
            return this.options.position;
        },
        setPosition: function(a) {
            var b = this._map;
            return b && b.removeControl(this), this.options.position = a, b && b.addControl(this), 
            this;
        },
        getContainer: function() {
            return this._container;
        },
        addTo: function(a) {
            this.remove(), this._map = a;
            var b = this._container = this.onAdd(a), c = this.getPosition(), d = a._controlCorners[c];
            return e.DomUtil.addClass(b, "leaflet-control"), -1 !== c.indexOf("bottom") ? d.insertBefore(b, d.firstChild) : d.appendChild(b), 
            this;
        },
        remove: function() {
            return this._map ? (e.DomUtil.remove(this._container), this.onRemove && this.onRemove(this._map), 
            this._map = null, this) : this;
        },
        _refocusOnMap: function(a) {
            this._map && a && a.screenX > 0 && a.screenY > 0 && this._map.getContainer().focus();
        }
    }), e.control = function(a) {
        return new e.Control(a);
    }, e.Map.include({
        addControl: function(a) {
            return a.addTo(this), this;
        },
        removeControl: function(a) {
            return a.remove(), this;
        },
        _initControlPos: function() {
            function a(a, f) {
                var g = c + a + " " + c + f;
                b[a + f] = e.DomUtil.create("div", g, d);
            }
            var b = this._controlCorners = {}, c = "leaflet-", d = this._controlContainer = e.DomUtil.create("div", c + "control-container", this._container);
            a("top", "left"), a("top", "right"), a("bottom", "left"), a("bottom", "right");
        },
        _clearControlPos: function() {
            e.DomUtil.remove(this._controlContainer);
        }
    }), e.Control.Zoom = e.Control.extend({
        options: {
            position: "topleft",
            zoomInText: "+",
            zoomInTitle: "Zoom in",
            zoomOutText: "-",
            zoomOutTitle: "Zoom out"
        },
        onAdd: function(a) {
            var b = "leaflet-control-zoom", c = e.DomUtil.create("div", b + " leaflet-bar"), d = this.options;
            return this._zoomInButton = this._createButton(d.zoomInText, d.zoomInTitle, b + "-in", c, this._zoomIn), 
            this._zoomOutButton = this._createButton(d.zoomOutText, d.zoomOutTitle, b + "-out", c, this._zoomOut), 
            this._updateDisabled(), a.on("zoomend zoomlevelschange", this._updateDisabled, this), 
            c;
        },
        onRemove: function(a) {
            a.off("zoomend zoomlevelschange", this._updateDisabled, this);
        },
        disable: function() {
            return this._disabled = !0, this._updateDisabled(), this;
        },
        enable: function() {
            return this._disabled = !1, this._updateDisabled(), this;
        },
        _zoomIn: function(a) {
            !this._disabled && this._map._zoom < this._map.getMaxZoom() && this._map.zoomIn(this._map.options.zoomDelta * (a.shiftKey ? 3 : 1));
        },
        _zoomOut: function(a) {
            !this._disabled && this._map._zoom > this._map.getMinZoom() && this._map.zoomOut(this._map.options.zoomDelta * (a.shiftKey ? 3 : 1));
        },
        _createButton: function(a, b, c, d, f) {
            var g = e.DomUtil.create("a", c, d);
            return g.innerHTML = a, g.href = "#", g.title = b, g.setAttribute("role", "button"), 
            g.setAttribute("aria-label", b), e.DomEvent.on(g, "mousedown dblclick", e.DomEvent.stopPropagation).on(g, "click", e.DomEvent.stop).on(g, "click", f, this).on(g, "click", this._refocusOnMap, this), 
            g;
        },
        _updateDisabled: function() {
            var a = this._map, b = "leaflet-disabled";
            e.DomUtil.removeClass(this._zoomInButton, b), e.DomUtil.removeClass(this._zoomOutButton, b), 
            (this._disabled || a._zoom === a.getMinZoom()) && e.DomUtil.addClass(this._zoomOutButton, b), 
            (this._disabled || a._zoom === a.getMaxZoom()) && e.DomUtil.addClass(this._zoomInButton, b);
        }
    }), e.Map.mergeOptions({
        zoomControl: !0
    }), e.Map.addInitHook(function() {
        this.options.zoomControl && (this.zoomControl = new e.Control.Zoom(), this.addControl(this.zoomControl));
    }), e.control.zoom = function(a) {
        return new e.Control.Zoom(a);
    }, e.Control.Attribution = e.Control.extend({
        options: {
            position: "bottomright",
            prefix: '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>'
        },
        initialize: function(a) {
            e.setOptions(this, a), this._attributions = {};
        },
        onAdd: function(a) {
            a.attributionControl = this, this._container = e.DomUtil.create("div", "leaflet-control-attribution"), 
            e.DomEvent && e.DomEvent.disableClickPropagation(this._container);
            for (var b in a._layers) a._layers[b].getAttribution && this.addAttribution(a._layers[b].getAttribution());
            return this._update(), this._container;
        },
        setPrefix: function(a) {
            return this.options.prefix = a, this._update(), this;
        },
        addAttribution: function(a) {
            return a ? (this._attributions[a] || (this._attributions[a] = 0), this._attributions[a]++, 
            this._update(), this) : this;
        },
        removeAttribution: function(a) {
            return a ? (this._attributions[a] && (this._attributions[a]--, this._update()), 
            this) : this;
        },
        _update: function() {
            if (this._map) {
                var a = [];
                for (var b in this._attributions) this._attributions[b] && a.push(b);
                var c = [];
                this.options.prefix && c.push(this.options.prefix), a.length && c.push(a.join(", ")), 
                this._container.innerHTML = c.join(" | ");
            }
        }
    }), e.Map.mergeOptions({
        attributionControl: !0
    }), e.Map.addInitHook(function() {
        this.options.attributionControl && new e.Control.Attribution().addTo(this);
    }), e.control.attribution = function(a) {
        return new e.Control.Attribution(a);
    }, e.Control.Scale = e.Control.extend({
        options: {
            position: "bottomleft",
            maxWidth: 100,
            metric: !0,
            imperial: !0
        },
        onAdd: function(a) {
            var b = "leaflet-control-scale", c = e.DomUtil.create("div", b), d = this.options;
            return this._addScales(d, b + "-line", c), a.on(d.updateWhenIdle ? "moveend" : "move", this._update, this), 
            a.whenReady(this._update, this), c;
        },
        onRemove: function(a) {
            a.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this);
        },
        _addScales: function(a, b, c) {
            a.metric && (this._mScale = e.DomUtil.create("div", b, c)), a.imperial && (this._iScale = e.DomUtil.create("div", b, c));
        },
        _update: function() {
            var a = this._map, b = a.getSize().y / 2, c = a.distance(a.containerPointToLatLng([ 0, b ]), a.containerPointToLatLng([ this.options.maxWidth, b ]));
            this._updateScales(c);
        },
        _updateScales: function(a) {
            this.options.metric && a && this._updateMetric(a), this.options.imperial && a && this._updateImperial(a);
        },
        _updateMetric: function(a) {
            var b = this._getRoundNum(a), c = b < 1e3 ? b + " m" : b / 1e3 + " km";
            this._updateScale(this._mScale, c, b / a);
        },
        _updateImperial: function(a) {
            var b, c, d, e = 3.2808399 * a;
            e > 5280 ? (b = e / 5280, c = this._getRoundNum(b), this._updateScale(this._iScale, c + " mi", c / b)) : (d = this._getRoundNum(e), 
            this._updateScale(this._iScale, d + " ft", d / e));
        },
        _updateScale: function(a, b, c) {
            a.style.width = Math.round(this.options.maxWidth * c) + "px", a.innerHTML = b;
        },
        _getRoundNum: function(a) {
            var b = Math.pow(10, (Math.floor(a) + "").length - 1), c = a / b;
            return c = c >= 10 ? 10 : c >= 5 ? 5 : c >= 3 ? 3 : c >= 2 ? 2 : 1, b * c;
        }
    }), e.control.scale = function(a) {
        return new e.Control.Scale(a);
    }, e.Control.Layers = e.Control.extend({
        options: {
            collapsed: !0,
            position: "topright",
            autoZIndex: !0,
            hideSingleBase: !1,
            sortLayers: !1,
            sortFunction: function(a, b, c, d) {
                return c < d ? -1 : d < c ? 1 : 0;
            }
        },
        initialize: function(a, b, c) {
            e.setOptions(this, c), this._layers = [], this._lastZIndex = 0, this._handlingClick = !1;
            for (var d in a) this._addLayer(a[d], d);
            for (d in b) this._addLayer(b[d], d, !0);
        },
        onAdd: function(a) {
            return this._initLayout(), this._update(), this._map = a, a.on("zoomend", this._checkDisabledLayers, this), 
            this._container;
        },
        onRemove: function() {
            this._map.off("zoomend", this._checkDisabledLayers, this);
            for (var a = 0; a < this._layers.length; a++) this._layers[a].layer.off("add remove", this._onLayerChange, this);
        },
        addBaseLayer: function(a, b) {
            return this._addLayer(a, b), this._map ? this._update() : this;
        },
        addOverlay: function(a, b) {
            return this._addLayer(a, b, !0), this._map ? this._update() : this;
        },
        removeLayer: function(a) {
            a.off("add remove", this._onLayerChange, this);
            var b = this._getLayer(e.stamp(a));
            return b && this._layers.splice(this._layers.indexOf(b), 1), this._map ? this._update() : this;
        },
        expand: function() {
            e.DomUtil.addClass(this._container, "leaflet-control-layers-expanded"), this._form.style.height = null;
            var a = this._map.getSize().y - (this._container.offsetTop + 50);
            return a < this._form.clientHeight ? (e.DomUtil.addClass(this._form, "leaflet-control-layers-scrollbar"), 
            this._form.style.height = a + "px") : e.DomUtil.removeClass(this._form, "leaflet-control-layers-scrollbar"), 
            this._checkDisabledLayers(), this;
        },
        collapse: function() {
            return e.DomUtil.removeClass(this._container, "leaflet-control-layers-expanded"), 
            this;
        },
        _initLayout: function() {
            var a = "leaflet-control-layers", b = this._container = e.DomUtil.create("div", a), c = this.options.collapsed;
            b.setAttribute("aria-haspopup", !0), e.DomEvent.disableClickPropagation(b), e.Browser.touch || e.DomEvent.disableScrollPropagation(b);
            var d = this._form = e.DomUtil.create("form", a + "-list");
            c && (this._map.on("click", this.collapse, this), e.Browser.android || e.DomEvent.on(b, {
                mouseenter: this.expand,
                mouseleave: this.collapse
            }, this));
            var f = this._layersLink = e.DomUtil.create("a", a + "-toggle", b);
            f.href = "#", f.title = "Layers", e.Browser.touch ? e.DomEvent.on(f, "click", e.DomEvent.stop).on(f, "click", this.expand, this) : e.DomEvent.on(f, "focus", this.expand, this), 
            e.DomEvent.on(d, "click", function() {
                setTimeout(e.bind(this._onInputClick, this), 0);
            }, this), c || this.expand(), this._baseLayersList = e.DomUtil.create("div", a + "-base", d), 
            this._separator = e.DomUtil.create("div", a + "-separator", d), this._overlaysList = e.DomUtil.create("div", a + "-overlays", d), 
            b.appendChild(d);
        },
        _getLayer: function(a) {
            for (var b = 0; b < this._layers.length; b++) if (this._layers[b] && e.stamp(this._layers[b].layer) === a) return this._layers[b];
        },
        _addLayer: function(a, b, c) {
            a.on("add remove", this._onLayerChange, this), this._layers.push({
                layer: a,
                name: b,
                overlay: c
            }), this.options.sortLayers && this._layers.sort(e.bind(function(a, b) {
                return this.options.sortFunction(a.layer, b.layer, a.name, b.name);
            }, this)), this.options.autoZIndex && a.setZIndex && (this._lastZIndex++, a.setZIndex(this._lastZIndex));
        },
        _update: function() {
            if (!this._container) return this;
            e.DomUtil.empty(this._baseLayersList), e.DomUtil.empty(this._overlaysList);
            var a, b, c, d, f = 0;
            for (c = 0; c < this._layers.length; c++) d = this._layers[c], this._addItem(d), 
            b = b || d.overlay, a = a || !d.overlay, f += d.overlay ? 0 : 1;
            return this.options.hideSingleBase && (a = a && f > 1, this._baseLayersList.style.display = a ? "" : "none"), 
            this._separator.style.display = b && a ? "" : "none", this;
        },
        _onLayerChange: function(a) {
            this._handlingClick || this._update();
            var b = this._getLayer(e.stamp(a.target)), c = b.overlay ? "add" === a.type ? "overlayadd" : "overlayremove" : "add" === a.type ? "baselayerchange" : null;
            c && this._map.fire(c, b);
        },
        _createRadioElement: function(a, c) {
            var d = '<input type="radio" class="leaflet-control-layers-selector" name="' + a + '"' + (c ? ' checked="checked"' : "") + "/>", e = b.createElement("div");
            return e.innerHTML = d, e.firstChild;
        },
        _addItem: function(a) {
            var c, d = b.createElement("label"), f = this._map.hasLayer(a.layer);
            a.overlay ? (c = b.createElement("input"), c.type = "checkbox", c.className = "leaflet-control-layers-selector", 
            c.defaultChecked = f) : c = this._createRadioElement("leaflet-base-layers", f), 
            c.layerId = e.stamp(a.layer), e.DomEvent.on(c, "click", this._onInputClick, this);
            var g = b.createElement("span");
            g.innerHTML = " " + a.name;
            var h = b.createElement("div");
            return d.appendChild(h), h.appendChild(c), h.appendChild(g), (a.overlay ? this._overlaysList : this._baseLayersList).appendChild(d), 
            this._checkDisabledLayers(), d;
        },
        _onInputClick: function() {
            var a, b, c, d = this._form.getElementsByTagName("input"), e = [], f = [];
            this._handlingClick = !0;
            for (var g = d.length - 1; g >= 0; g--) a = d[g], b = this._getLayer(a.layerId).layer, 
            c = this._map.hasLayer(b), a.checked && !c ? e.push(b) : !a.checked && c && f.push(b);
            for (g = 0; g < f.length; g++) this._map.removeLayer(f[g]);
            for (g = 0; g < e.length; g++) this._map.addLayer(e[g]);
            this._handlingClick = !1, this._refocusOnMap();
        },
        _checkDisabledLayers: function() {
            for (var a, b, d = this._form.getElementsByTagName("input"), e = this._map.getZoom(), f = d.length - 1; f >= 0; f--) a = d[f], 
            b = this._getLayer(a.layerId).layer, a.disabled = b.options.minZoom !== c && e < b.options.minZoom || b.options.maxZoom !== c && e > b.options.maxZoom;
        },
        _expand: function() {
            return this.expand();
        },
        _collapse: function() {
            return this.collapse();
        }
    }), e.control.layers = function(a, b, c) {
        return new e.Control.Layers(a, b, c);
    };
}(window, document), function(a, b) {
    "function" == typeof define && define.amd ? define([ "leaflet" ], a) : "object" == typeof exports && (module.exports = a(require("leaflet"))), 
    void 0 !== b && b.L && a(b.L);
}(function(a) {
    a.Editable = a.Evented.extend({
        statics: {
            FORWARD: 1,
            BACKWARD: -1
        },
        options: {
            zIndex: 1e3,
            polygonClass: a.Polygon,
            polylineClass: a.Polyline,
            markerClass: a.Marker,
            rectangleClass: a.Rectangle,
            circleClass: a.Circle,
            drawingCSSClass: "leaflet-editable-drawing",
            drawingCursor: "crosshair",
            editLayer: void 0,
            featuresLayer: void 0,
            polylineEditorClass: void 0,
            polygonEditorClass: void 0,
            markerEditorClass: void 0,
            rectangleEditorClass: void 0,
            circleEditorClass: void 0,
            lineGuideOptions: {},
            skipMiddleMarkers: !1
        },
        initialize: function(b, c) {
            a.setOptions(this, c), this._lastZIndex = this.options.zIndex, this.map = b, this.editLayer = this.createEditLayer(), 
            this.featuresLayer = this.createFeaturesLayer(), this.forwardLineGuide = this.createLineGuide(), 
            this.backwardLineGuide = this.createLineGuide();
        },
        fireAndForward: function(a, b) {
            b = b || {}, b.editTools = this, this.fire(a, b), this.map.fire(a, b);
        },
        createLineGuide: function() {
            var b = a.extend({
                dashArray: "5,10",
                weight: 1,
                interactive: !1
            }, this.options.lineGuideOptions);
            return a.polyline([], b);
        },
        createVertexIcon: function(b) {
            return a.Browser.touch ? new a.Editable.TouchVertexIcon(b) : new a.Editable.VertexIcon(b);
        },
        createEditLayer: function() {
            return this.options.editLayer || new a.LayerGroup().addTo(this.map);
        },
        createFeaturesLayer: function() {
            return this.options.featuresLayer || new a.LayerGroup().addTo(this.map);
        },
        moveForwardLineGuide: function(a) {
            this.forwardLineGuide._latlngs.length && (this.forwardLineGuide._latlngs[1] = a, 
            this.forwardLineGuide._bounds.extend(a), this.forwardLineGuide.redraw());
        },
        moveBackwardLineGuide: function(a) {
            this.backwardLineGuide._latlngs.length && (this.backwardLineGuide._latlngs[1] = a, 
            this.backwardLineGuide._bounds.extend(a), this.backwardLineGuide.redraw());
        },
        anchorForwardLineGuide: function(a) {
            this.forwardLineGuide._latlngs[0] = a, this.forwardLineGuide._bounds.extend(a), 
            this.forwardLineGuide.redraw();
        },
        anchorBackwardLineGuide: function(a) {
            this.backwardLineGuide._latlngs[0] = a, this.backwardLineGuide._bounds.extend(a), 
            this.backwardLineGuide.redraw();
        },
        attachForwardLineGuide: function() {
            this.editLayer.addLayer(this.forwardLineGuide);
        },
        attachBackwardLineGuide: function() {
            this.editLayer.addLayer(this.backwardLineGuide);
        },
        detachForwardLineGuide: function() {
            this.forwardLineGuide.setLatLngs([]), this.editLayer.removeLayer(this.forwardLineGuide);
        },
        detachBackwardLineGuide: function() {
            this.backwardLineGuide.setLatLngs([]), this.editLayer.removeLayer(this.backwardLineGuide);
        },
        blockEvents: function() {
            this._oldTargets || (this._oldTargets = this.map._targets, this.map._targets = {});
        },
        unblockEvents: function() {
            this._oldTargets && (this.map._targets = a.extend(this.map._targets, this._oldTargets), 
            delete this._oldTargets);
        },
        registerForDrawing: function(b) {
            this._drawingEditor && this.unregisterForDrawing(this._drawingEditor), this.map.on("mousemove touchmove", b.onDrawingMouseMove, b), 
            this.blockEvents(), b.reset(), this._drawingEditor = b, this.map.on("mousedown", this.onMousedown, this), 
            this.map.on("mouseup", this.onMouseup, this), a.DomUtil.addClass(this.map._container, this.options.drawingCSSClass), 
            this.defaultMapCursor = this.map._container.style.cursor, this.map._container.style.cursor = this.options.drawingCursor;
        },
        unregisterForDrawing: function(b) {
            this.unblockEvents(), a.DomUtil.removeClass(this.map._container, this.options.drawingCSSClass), 
            this.map._container.style.cursor = this.defaultMapCursor, (b = b || this._drawingEditor) && (this.map.off("mousemove touchmove", b.onDrawingMouseMove, b), 
            this.map.off("mousedown", this.onMousedown, this), this.map.off("mouseup", this.onMouseup, this), 
            b === this._drawingEditor && (delete this._drawingEditor, b._drawing && b.cancelDrawing()));
        },
        onMousedown: function(a) {
            this._mouseDown = a, this._drawingEditor.onDrawingMouseDown(a);
        },
        onMouseup: function(b) {
            if (this._mouseDown) {
                var c = this._drawingEditor, d = this._mouseDown;
                if (this._mouseDown = null, c.onDrawingMouseUp(b), this._drawingEditor !== c) return;
                var e = a.point(d.originalEvent.clientX, d.originalEvent.clientY), f = a.point(b.originalEvent.clientX, b.originalEvent.clientY).distanceTo(e);
                Math.abs(f) < 9 * (window.devicePixelRatio || 1) && this._drawingEditor.onDrawingClick(b);
            }
        },
        drawing: function() {
            return this._drawingEditor && this._drawingEditor.drawing();
        },
        stopDrawing: function() {
            this.unregisterForDrawing();
        },
        commitDrawing: function(a) {
            this._drawingEditor && this._drawingEditor.commitDrawing(a);
        },
        connectCreatedToMap: function(a) {
            return this.featuresLayer.addLayer(a);
        },
        startPolyline: function(a, b) {
            var c = this.createPolyline([], b);
            return c.enableEdit(this.map).newShape(a), c;
        },
        startPolygon: function(a, b) {
            var c = this.createPolygon([], b);
            return c.enableEdit(this.map).newShape(a), c;
        },
        startMarker: function(a, b) {
            a = a || this.map.getCenter().clone();
            var c = this.createMarker(a, b);
            return c.enableEdit(this.map).startDrawing(), c;
        },
        startRectangle: function(b, c) {
            var d = b || a.latLng([ 0, 0 ]), e = new a.LatLngBounds(d, d), f = this.createRectangle(e, c);
            return f.enableEdit(this.map).startDrawing(), f;
        },
        startCircle: function(a, b) {
            a = a || this.map.getCenter().clone();
            var c = this.createCircle(a, b);
            return c.enableEdit(this.map).startDrawing(), c;
        },
        startHole: function(a, b) {
            a.newHole(b);
        },
        createLayer: function(b, c, d) {
            d = a.Util.extend({
                editOptions: {
                    editTools: this
                }
            }, d);
            var e = new b(c, d);
            return this.fireAndForward("editable:created", {
                layer: e
            }), e;
        },
        createPolyline: function(a, b) {
            return this.createLayer(b && b.polylineClass || this.options.polylineClass, a, b);
        },
        createPolygon: function(a, b) {
            return this.createLayer(b && b.polygonClass || this.options.polygonClass, a, b);
        },
        createMarker: function(a, b) {
            return this.createLayer(b && b.markerClass || this.options.markerClass, a, b);
        },
        createRectangle: function(a, b) {
            return this.createLayer(b && b.rectangleClass || this.options.rectangleClass, a, b);
        },
        createCircle: function(a, b) {
            return this.createLayer(b && b.circleClass || this.options.circleClass, a, b);
        }
    }), a.extend(a.Editable, {
        makeCancellable: function(a) {
            a.cancel = function() {
                a._cancelled = !0;
            };
        }
    }), a.Map.mergeOptions({
        editToolsClass: a.Editable,
        editable: !1,
        editOptions: {}
    }), a.Map.addInitHook(function() {
        this.whenReady(function() {
            this.options.editable && (this.editTools = new this.options.editToolsClass(this, this.options.editOptions));
        });
    }), a.Editable.VertexIcon = a.DivIcon.extend({
        options: {
            iconSize: new a.Point(8, 8)
        }
    }), a.Editable.TouchVertexIcon = a.Editable.VertexIcon.extend({
        options: {
            iconSize: new a.Point(20, 20)
        }
    }), a.Editable.VertexMarker = a.Marker.extend({
        options: {
            draggable: !0,
            className: "leaflet-div-icon leaflet-vertex-icon"
        },
        initialize: function(b, c, d, e) {
            this.latlng = b, this.latlngs = c, this.editor = d, a.Marker.prototype.initialize.call(this, b, e), 
            this.options.icon = this.editor.tools.createVertexIcon({
                className: this.options.className
            }), this.latlng.__vertex = this, this.editor.editLayer.addLayer(this), this.setZIndexOffset(d.tools._lastZIndex + 1);
        },
        onAdd: function(b) {
            a.Marker.prototype.onAdd.call(this, b), this.on("drag", this.onDrag), this.on("dragstart", this.onDragStart), 
            this.on("dragend", this.onDragEnd), this.on("mouseup", this.onMouseup), this.on("click", this.onClick), 
            this.on("contextmenu", this.onContextMenu), this.on("mousedown touchstart", this.onMouseDown), 
            this.addMiddleMarkers();
        },
        onRemove: function(b) {
            this.middleMarker && this.middleMarker.delete(), delete this.latlng.__vertex, this.off("drag", this.onDrag), 
            this.off("dragstart", this.onDragStart), this.off("dragend", this.onDragEnd), this.off("mouseup", this.onMouseup), 
            this.off("click", this.onClick), this.off("contextmenu", this.onContextMenu), this.off("mousedown touchstart", this.onMouseDown), 
            a.Marker.prototype.onRemove.call(this, b);
        },
        onDrag: function(b) {
            b.vertex = this, this.editor.onVertexMarkerDrag(b);
            var c = a.DomUtil.getPosition(this._icon), d = this._map.layerPointToLatLng(c);
            this.latlng.update(d), this._latlng = this.latlng, this.editor.refresh(), this.middleMarker && this.middleMarker.updateLatLng();
            var e = this.getNext();
            e && e.middleMarker && e.middleMarker.updateLatLng();
        },
        onDragStart: function(a) {
            a.vertex = this, this.editor.onVertexMarkerDragStart(a);
        },
        onDragEnd: function(a) {
            a.vertex = this, this.editor.onVertexMarkerDragEnd(a);
        },
        onClick: function(a) {
            a.vertex = this, this.editor.onVertexMarkerClick(a);
        },
        onMouseup: function(b) {
            a.DomEvent.stop(b), b.vertex = this, this.editor.map.fire("mouseup", b);
        },
        onContextMenu: function(a) {
            a.vertex = this, this.editor.onVertexMarkerContextMenu(a);
        },
        onMouseDown: function(a) {
            a.vertex = this, this.editor.onVertexMarkerMouseDown(a);
        },
        delete: function() {
            var a = this.getNext();
            this.latlngs.splice(this.getIndex(), 1), this.editor.editLayer.removeLayer(this), 
            this.editor.onVertexDeleted({
                latlng: this.latlng,
                vertex: this
            }), this.latlngs.length || this.editor.deleteShape(this.latlngs), a && a.resetMiddleMarker(), 
            this.editor.refresh();
        },
        getIndex: function() {
            return this.latlngs.indexOf(this.latlng);
        },
        getLastIndex: function() {
            return this.latlngs.length - 1;
        },
        getPrevious: function() {
            if (!(this.latlngs.length < 2)) {
                var a = this.getIndex(), b = a - 1;
                0 === a && this.editor.CLOSED && (b = this.getLastIndex());
                var c = this.latlngs[b];
                return c ? c.__vertex : void 0;
            }
        },
        getNext: function() {
            if (!(this.latlngs.length < 2)) {
                var a = this.getIndex(), b = a + 1;
                a === this.getLastIndex() && this.editor.CLOSED && (b = 0);
                var c = this.latlngs[b];
                return c ? c.__vertex : void 0;
            }
        },
        addMiddleMarker: function(a) {
            this.editor.hasMiddleMarkers() && (a = a || this.getPrevious()) && !this.middleMarker && (this.middleMarker = this.editor.addMiddleMarker(a, this, this.latlngs, this.editor));
        },
        addMiddleMarkers: function() {
            if (this.editor.hasMiddleMarkers()) {
                var a = this.getPrevious();
                a && this.addMiddleMarker(a);
                var b = this.getNext();
                b && b.resetMiddleMarker();
            }
        },
        resetMiddleMarker: function() {
            this.middleMarker && this.middleMarker.delete(), this.addMiddleMarker();
        },
        split: function() {
            this.editor.splitShape && this.editor.splitShape(this.latlngs, this.getIndex());
        },
        continue: function() {
            if (this.editor.continueBackward) {
                var a = this.getIndex();
                0 === a ? this.editor.continueBackward(this.latlngs) : a === this.getLastIndex() && this.editor.continueForward(this.latlngs);
            }
        }
    }), a.Editable.mergeOptions({
        vertexMarkerClass: a.Editable.VertexMarker
    }), a.Editable.MiddleMarker = a.Marker.extend({
        options: {
            opacity: .5,
            className: "leaflet-div-icon leaflet-middle-icon",
            draggable: !0
        },
        initialize: function(b, c, d, e, f) {
            this.left = b, this.right = c, this.editor = e, this.latlngs = d, a.Marker.prototype.initialize.call(this, this.computeLatLng(), f), 
            this._opacity = this.options.opacity, this.options.icon = this.editor.tools.createVertexIcon({
                className: this.options.className
            }), this.editor.editLayer.addLayer(this), this.setVisibility();
        },
        setVisibility: function() {
            var b = this._map.latLngToContainerPoint(this.left.latlng), c = this._map.latLngToContainerPoint(this.right.latlng), d = a.point(this.options.icon.options.iconSize);
            b.distanceTo(c) < 3 * d.x ? this.hide() : this.show();
        },
        show: function() {
            this.setOpacity(this._opacity);
        },
        hide: function() {
            this.setOpacity(0);
        },
        updateLatLng: function() {
            this.setLatLng(this.computeLatLng()), this.setVisibility();
        },
        computeLatLng: function() {
            var a = this.editor.map.latLngToContainerPoint(this.left.latlng), b = this.editor.map.latLngToContainerPoint(this.right.latlng), c = (a.y + b.y) / 2, d = (a.x + b.x) / 2;
            return this.editor.map.containerPointToLatLng([ d, c ]);
        },
        onAdd: function(b) {
            a.Marker.prototype.onAdd.call(this, b), a.DomEvent.on(this._icon, "mousedown touchstart", this.onMouseDown, this), 
            b.on("zoomend", this.setVisibility, this);
        },
        onRemove: function(b) {
            delete this.right.middleMarker, a.DomEvent.off(this._icon, "mousedown touchstart", this.onMouseDown, this), 
            b.off("zoomend", this.setVisibility, this), a.Marker.prototype.onRemove.call(this, b);
        },
        onMouseDown: function(b) {
            var c = a.DomUtil.getPosition(this._icon);
            if (b = {
                originalEvent: b,
                latlng: this.editor.map.layerPointToLatLng(c)
            }, 0 !== this.options.opacity && (a.Editable.makeCancellable(b), this.editor.onMiddleMarkerMouseDown(b), 
            !b._cancelled)) {
                this.latlngs.splice(this.index(), 0, b.latlng), this.editor.refresh();
                var d = this._icon, e = this.editor.addVertexMarker(b.latlng, this.latlngs), f = e._icon.parentNode;
                f.removeChild(e._icon), e._icon = d, f.appendChild(e._icon), e._initIcon(), e._initInteraction(), 
                e.setOpacity(1), a.Draggable._dragging = !1, e.dragging._draggable._onDown(b.originalEvent), 
                this.delete();
            }
        },
        delete: function() {
            this.editor.editLayer.removeLayer(this);
        },
        index: function() {
            return this.latlngs.indexOf(this.right.latlng);
        }
    }), a.Editable.mergeOptions({
        middleMarkerClass: a.Editable.MiddleMarker
    }), a.Editable.BaseEditor = a.Handler.extend({
        initialize: function(b, c, d) {
            a.setOptions(this, d), this.map = b, this.feature = c, this.feature.editor = this, 
            this.editLayer = new a.LayerGroup(), this.tools = this.options.editTools || b.editTools;
        },
        addHooks: function() {
            this.isConnected() ? this.onFeatureAdd() : this.feature.once("add", this.onFeatureAdd, this), 
            this.onEnable(), this.feature.on(this._getEvents(), this);
        },
        removeHooks: function() {
            this.feature.off(this._getEvents(), this), this.feature.dragging && this.feature.dragging.disable(), 
            this.editLayer.clearLayers(), this.tools.editLayer.removeLayer(this.editLayer), 
            this.onDisable(), this._drawing && this.cancelDrawing();
        },
        drawing: function() {
            return !!this._drawing;
        },
        reset: function() {},
        onFeatureAdd: function() {
            this.tools.editLayer.addLayer(this.editLayer), this.feature.dragging && this.feature.dragging.enable();
        },
        hasMiddleMarkers: function() {
            return !this.options.skipMiddleMarkers && !this.tools.options.skipMiddleMarkers;
        },
        fireAndForward: function(a, b) {
            b = b || {}, b.layer = this.feature, this.feature.fire(a, b), this.tools.fireAndForward(a, b);
        },
        onEnable: function() {
            this.fireAndForward("editable:enable");
        },
        onDisable: function() {
            this.fireAndForward("editable:disable");
        },
        onEditing: function() {
            this.fireAndForward("editable:editing");
        },
        onStartDrawing: function() {
            this.fireAndForward("editable:drawing:start");
        },
        onEndDrawing: function() {
            this.fireAndForward("editable:drawing:end");
        },
        onCancelDrawing: function() {
            this.fireAndForward("editable:drawing:cancel");
        },
        onCommitDrawing: function(a) {
            this.fireAndForward("editable:drawing:commit", a);
        },
        onDrawingMouseDown: function(a) {
            this.fireAndForward("editable:drawing:mousedown", a);
        },
        onDrawingMouseUp: function(a) {
            this.fireAndForward("editable:drawing:mouseup", a);
        },
        startDrawing: function() {
            this._drawing || (this._drawing = a.Editable.FORWARD), this.tools.registerForDrawing(this), 
            this.onStartDrawing();
        },
        commitDrawing: function(a) {
            this.onCommitDrawing(a), this.endDrawing();
        },
        cancelDrawing: function() {
            a.Draggable._dragging = !1, this.onCancelDrawing(), this.endDrawing();
        },
        endDrawing: function() {
            this._drawing = !1, this.tools.unregisterForDrawing(this), this.onEndDrawing();
        },
        onDrawingClick: function(b) {
            this.drawing() && (a.Editable.makeCancellable(b), this.fireAndForward("editable:drawing:click", b), 
            b._cancelled || (this.isConnected() || this.connect(b), this.processDrawingClick(b)));
        },
        isConnected: function() {
            return this.map.hasLayer(this.feature);
        },
        connect: function(a) {
            this.tools.connectCreatedToMap(this.feature), this.tools.editLayer.addLayer(this.editLayer);
        },
        onMove: function(a) {
            this.fireAndForward("editable:drawing:move", a);
        },
        onDrawingMouseMove: function(a) {
            this.onMove(a);
        },
        _getEvents: function() {
            return {
                dragstart: this.onDragStart,
                drag: this.onDrag,
                dragend: this.onDragEnd,
                remove: this.disable
            };
        },
        onDragStart: function(a) {
            this.onEditing(), this.fireAndForward("editable:dragstart", a);
        },
        onDrag: function(a) {
            this.onMove(a), this.fireAndForward("editable:drag", a);
        },
        onDragEnd: function(a) {
            this.fireAndForward("editable:dragend", a);
        }
    }), a.Editable.MarkerEditor = a.Editable.BaseEditor.extend({
        onDrawingMouseMove: function(b) {
            a.Editable.BaseEditor.prototype.onDrawingMouseMove.call(this, b), this._drawing && this.feature.setLatLng(b.latlng);
        },
        processDrawingClick: function(a) {
            this.fireAndForward("editable:drawing:clicked", a), this.commitDrawing(a);
        },
        connect: function(b) {
            b && (this.feature._latlng = b.latlng), a.Editable.BaseEditor.prototype.connect.call(this, b);
        }
    }), a.Editable.PathEditor = a.Editable.BaseEditor.extend({
        CLOSED: !1,
        MIN_VERTEX: 2,
        addHooks: function() {
            return a.Editable.BaseEditor.prototype.addHooks.call(this), this.feature && this.initVertexMarkers(), 
            this;
        },
        initVertexMarkers: function(b) {
            if (this.enabled()) if (b = b || this.getLatLngs(), a.Polyline._flat(b)) this.addVertexMarkers(b); else for (var c = 0; c < b.length; c++) this.initVertexMarkers(b[c]);
        },
        getLatLngs: function() {
            return this.feature.getLatLngs();
        },
        reset: function() {
            this.editLayer.clearLayers(), this.initVertexMarkers();
        },
        addVertexMarker: function(a, b) {
            return new this.tools.options.vertexMarkerClass(a, b, this);
        },
        addVertexMarkers: function(a) {
            for (var b = 0; b < a.length; b++) this.addVertexMarker(a[b], a);
        },
        refreshVertexMarkers: function(a) {
            a = a || this.getDefaultLatLngs();
            for (var b = 0; b < a.length; b++) a[b].__vertex.update();
        },
        addMiddleMarker: function(a, b, c) {
            return new this.tools.options.middleMarkerClass(a, b, c, this);
        },
        onVertexMarkerClick: function(b) {
            if (a.Editable.makeCancellable(b), this.fireAndForward("editable:vertex:click", b), 
            !(b._cancelled || this.tools.drawing() && this.tools._drawingEditor !== this)) {
                var c, d = b.vertex.getIndex();
                b.originalEvent.ctrlKey ? this.onVertexMarkerCtrlClick(b) : b.originalEvent.altKey ? this.onVertexMarkerAltClick(b) : b.originalEvent.shiftKey ? this.onVertexMarkerShiftClick(b) : b.originalEvent.metaKey ? this.onVertexMarkerMetaKeyClick(b) : d === b.vertex.getLastIndex() && this._drawing === a.Editable.FORWARD ? d >= this.MIN_VERTEX - 1 && (c = !0) : 0 === d && this._drawing === a.Editable.BACKWARD && this._drawnLatLngs.length >= this.MIN_VERTEX ? c = !0 : 0 === d && this._drawing === a.Editable.FORWARD && this._drawnLatLngs.length >= this.MIN_VERTEX && this.CLOSED ? c = !0 : this.onVertexRawMarkerClick(b), 
                this.fireAndForward("editable:vertex:clicked", b), c && this.commitDrawing(b);
            }
        },
        onVertexRawMarkerClick: function(a) {
            this.fireAndForward("editable:vertex:rawclick", a), a._cancelled || this.vertexCanBeDeleted(a.vertex) && a.vertex.delete();
        },
        vertexCanBeDeleted: function(a) {
            return a.latlngs.length > this.MIN_VERTEX;
        },
        onVertexDeleted: function(a) {
            this.fireAndForward("editable:vertex:deleted", a);
        },
        onVertexMarkerCtrlClick: function(a) {
            this.fireAndForward("editable:vertex:ctrlclick", a);
        },
        onVertexMarkerShiftClick: function(a) {
            this.fireAndForward("editable:vertex:shiftclick", a);
        },
        onVertexMarkerMetaKeyClick: function(a) {
            this.fireAndForward("editable:vertex:metakeyclick", a);
        },
        onVertexMarkerAltClick: function(a) {
            this.fireAndForward("editable:vertex:altclick", a);
        },
        onVertexMarkerContextMenu: function(a) {
            this.fireAndForward("editable:vertex:contextmenu", a);
        },
        onVertexMarkerMouseDown: function(a) {
            this.fireAndForward("editable:vertex:mousedown", a);
        },
        onMiddleMarkerMouseDown: function(a) {
            this.fireAndForward("editable:middlemarker:mousedown", a);
        },
        onVertexMarkerDrag: function(a) {
            this.onMove(a), this.feature._bounds && this.extendBounds(a), this.fireAndForward("editable:vertex:drag", a);
        },
        onVertexMarkerDragStart: function(a) {
            this.fireAndForward("editable:vertex:dragstart", a);
        },
        onVertexMarkerDragEnd: function(a) {
            this.fireAndForward("editable:vertex:dragend", a);
        },
        setDrawnLatLngs: function(a) {
            this._drawnLatLngs = a || this.getDefaultLatLngs();
        },
        startDrawing: function() {
            this._drawnLatLngs || this.setDrawnLatLngs(), a.Editable.BaseEditor.prototype.startDrawing.call(this);
        },
        startDrawingForward: function() {
            this.startDrawing();
        },
        endDrawing: function() {
            this.tools.detachForwardLineGuide(), this.tools.detachBackwardLineGuide(), this._drawnLatLngs && this._drawnLatLngs.length < this.MIN_VERTEX && this.deleteShape(this._drawnLatLngs), 
            a.Editable.BaseEditor.prototype.endDrawing.call(this), delete this._drawnLatLngs;
        },
        addLatLng: function(b) {
            this._drawing === a.Editable.FORWARD ? this._drawnLatLngs.push(b) : this._drawnLatLngs.unshift(b), 
            this.feature._bounds.extend(b), this.addVertexMarker(b, this._drawnLatLngs), this.refresh();
        },
        newPointForward: function(a) {
            this.addLatLng(a), this.tools.attachForwardLineGuide(), this.tools.anchorForwardLineGuide(a);
        },
        newPointBackward: function(a) {
            this.addLatLng(a), this.tools.anchorBackwardLineGuide(a);
        },
        push: function(b) {
            if (!b) return console.error("L.Editable.PathEditor.push expect a vaild latlng as parameter");
            this._drawing === a.Editable.FORWARD ? this.newPointForward(b) : this.newPointBackward(b);
        },
        removeLatLng: function(a) {
            a.__vertex.delete(), this.refresh();
        },
        pop: function() {
            if (!(this._drawnLatLngs.length <= 1)) {
                var b;
                return b = this._drawing === a.Editable.FORWARD ? this._drawnLatLngs[this._drawnLatLngs.length - 1] : this._drawnLatLngs[0], 
                this.removeLatLng(b), this._drawing === a.Editable.FORWARD ? this.tools.anchorForwardLineGuide(this._drawnLatLngs[this._drawnLatLngs.length - 1]) : this.tools.anchorForwardLineGuide(this._drawnLatLngs[0]), 
                b;
            }
        },
        processDrawingClick: function(b) {
            b.vertex && b.vertex.editor === this || (this._drawing === a.Editable.FORWARD ? this.newPointForward(b.latlng) : this.newPointBackward(b.latlng), 
            this.fireAndForward("editable:drawing:clicked", b));
        },
        onDrawingMouseMove: function(b) {
            a.Editable.BaseEditor.prototype.onDrawingMouseMove.call(this, b), this._drawing && (this.tools.moveForwardLineGuide(b.latlng), 
            this.tools.moveBackwardLineGuide(b.latlng));
        },
        refresh: function() {
            this.feature.redraw(), this.onEditing();
        },
        newShape: function(a) {
            var b = this.addNewEmptyShape();
            b && (this.setDrawnLatLngs(b[0] || b), this.startDrawingForward(), this.fireAndForward("editable:shape:new", {
                shape: b
            }), a && this.newPointForward(a));
        },
        deleteShape: function(b, c) {
            var d = {
                shape: b
            };
            if (a.Editable.makeCancellable(d), this.fireAndForward("editable:shape:delete", d), 
            !d._cancelled) return b = this._deleteShape(b, c), this.ensureNotFlat && this.ensureNotFlat(), 
            this.feature.setLatLngs(this.getLatLngs()), this.refresh(), this.reset(), this.fireAndForward("editable:shape:deleted", {
                shape: b
            }), b;
        },
        _deleteShape: function(a, b) {
            if (b = b || this.getLatLngs(), b.length) {
                var c = this, d = function(a, b) {
                    return a.splice(0, Number.MAX_VALUE);
                }, e = function(a, b) {
                    return a.splice(a.indexOf(b), 1), a.length || c._deleteShape(a), b;
                };
                if (b === a) return d(b, a);
                for (var f = 0; f < b.length; f++) {
                    if (b[f] === a) return e(b, a);
                    if (-1 !== b[f].indexOf(a)) return e(b[f], a);
                }
            }
        },
        deleteShapeAt: function(a) {
            var b = this.feature.shapeAt(a);
            if (b) return this.deleteShape(b);
        },
        appendShape: function(a) {
            this.insertShape(a);
        },
        prependShape: function(a) {
            this.insertShape(a, 0);
        },
        insertShape: function(a, b) {
            this.ensureMulti(), a = this.formatShape(a), void 0 === b && (b = this.feature._latlngs.length), 
            this.feature._latlngs.splice(b, 0, a), this.feature.redraw(), this._enabled && this.reset();
        },
        extendBounds: function(a) {
            this.feature._bounds.extend(a.vertex.latlng);
        },
        onDragStart: function(b) {
            this.editLayer.clearLayers(), a.Editable.BaseEditor.prototype.onDragStart.call(this, b);
        },
        onDragEnd: function(b) {
            this.initVertexMarkers(), a.Editable.BaseEditor.prototype.onDragEnd.call(this, b);
        }
    }), a.Editable.PolylineEditor = a.Editable.PathEditor.extend({
        startDrawingBackward: function() {
            this._drawing = a.Editable.BACKWARD, this.startDrawing();
        },
        continueBackward: function(a) {
            this.drawing() || (a = a || this.getDefaultLatLngs(), this.setDrawnLatLngs(a), a.length > 0 && (this.tools.attachBackwardLineGuide(), 
            this.tools.anchorBackwardLineGuide(a[0])), this.startDrawingBackward());
        },
        continueForward: function(a) {
            this.drawing() || (a = a || this.getDefaultLatLngs(), this.setDrawnLatLngs(a), a.length > 0 && (this.tools.attachForwardLineGuide(), 
            this.tools.anchorForwardLineGuide(a[a.length - 1])), this.startDrawingForward());
        },
        getDefaultLatLngs: function(b) {
            return b = b || this.feature._latlngs, !b.length || b[0] instanceof a.LatLng ? b : this.getDefaultLatLngs(b[0]);
        },
        ensureMulti: function() {
            this.feature._latlngs.length && a.Polyline._flat(this.feature._latlngs) && (this.feature._latlngs = [ this.feature._latlngs ]);
        },
        addNewEmptyShape: function() {
            if (this.feature._latlngs.length) {
                var a = [];
                return this.appendShape(a), a;
            }
            return this.feature._latlngs;
        },
        formatShape: function(b) {
            return a.Polyline._flat(b) ? b : b[0] ? this.formatShape(b[0]) : void 0;
        },
        splitShape: function(b, c) {
            if (c && !(c >= b.length - 1)) {
                this.ensureMulti();
                var d = this.feature._latlngs.indexOf(b);
                if (-1 !== d) {
                    var e = b.slice(0, c + 1), f = b.slice(c);
                    f[0] = a.latLng(f[0].lat, f[0].lng, f[0].alt), this.feature._latlngs.splice(d, 1, e, f), 
                    this.refresh(), this.reset();
                }
            }
        }
    }), a.Editable.PolygonEditor = a.Editable.PathEditor.extend({
        CLOSED: !0,
        MIN_VERTEX: 3,
        newPointForward: function(b) {
            a.Editable.PathEditor.prototype.newPointForward.call(this, b), this.tools.backwardLineGuide._latlngs.length || this.tools.anchorBackwardLineGuide(b), 
            2 === this._drawnLatLngs.length && this.tools.attachBackwardLineGuide();
        },
        addNewEmptyHole: function(a) {
            this.ensureNotFlat();
            var b = this.feature.shapeAt(a);
            if (b) {
                var c = [];
                return b.push(c), c;
            }
        },
        newHole: function(a) {
            var b = this.addNewEmptyHole(a);
            b && (this.setDrawnLatLngs(b), this.startDrawingForward(), a && this.newPointForward(a));
        },
        addNewEmptyShape: function() {
            if (this.feature._latlngs.length && this.feature._latlngs[0].length) {
                var a = [];
                return this.appendShape(a), a;
            }
            return this.feature._latlngs;
        },
        ensureMulti: function() {
            this.feature._latlngs.length && a.Polyline._flat(this.feature._latlngs[0]) && (this.feature._latlngs = [ this.feature._latlngs ]);
        },
        ensureNotFlat: function() {
            this.feature._latlngs.length && !a.Polyline._flat(this.feature._latlngs) || (this.feature._latlngs = [ this.feature._latlngs ]);
        },
        vertexCanBeDeleted: function(b) {
            var c = this.feature.parentShape(b.latlngs);
            return a.Util.indexOf(c, b.latlngs) > 0 || a.Editable.PathEditor.prototype.vertexCanBeDeleted.call(this, b);
        },
        getDefaultLatLngs: function() {
            return this.feature._latlngs.length || this.feature._latlngs.push([]), this.feature._latlngs[0];
        },
        formatShape: function(b) {
            return !a.Polyline._flat(b) || b[0] && 0 === b[0].length ? b : [ b ];
        }
    }), a.Editable.RectangleEditor = a.Editable.PathEditor.extend({
        CLOSED: !0,
        MIN_VERTEX: 4,
        options: {
            skipMiddleMarkers: !0
        },
        extendBounds: function(b) {
            var c = b.vertex.getIndex(), d = b.vertex.getNext(), e = b.vertex.getPrevious(), f = (c + 2) % 4, g = b.vertex.latlngs[f], h = new a.LatLngBounds(b.latlng, g);
            e.latlng.update([ b.latlng.lat, g.lng ]), d.latlng.update([ g.lat, b.latlng.lng ]), 
            this.updateBounds(h), this.refreshVertexMarkers();
        },
        onDrawingMouseDown: function(b) {
            a.Editable.PathEditor.prototype.onDrawingMouseDown.call(this, b), this.connect();
            var c = this.getDefaultLatLngs();
            3 === c.length && c.push(b.latlng);
            var d = new a.LatLngBounds(b.latlng, b.latlng);
            this.updateBounds(d), this.updateLatLngs(d), this.refresh(), this.reset(), this.map.dragging._draggable._onUp(b.originalEvent), 
            c[3].__vertex.dragging._draggable._onDown(b.originalEvent);
        },
        onDrawingMouseUp: function(b) {
            this.commitDrawing(b), a.Editable.PathEditor.prototype.onDrawingMouseUp.call(this, b);
        },
        getDefaultLatLngs: function(a) {
            return a || this.feature._latlngs[0];
        },
        updateBounds: function(a) {
            this.feature._bounds = a;
        },
        updateLatLngs: function(a) {
            for (var b = this.getDefaultLatLngs(), c = this.feature._boundsToLatLngs(a), d = 0; d < b.length; d++) b[d].update(c[d]);
        }
    }), a.Editable.CircleEditor = a.Editable.PathEditor.extend({
        MIN_VERTEX: 2,
        options: {
            skipMiddleMarkers: !0
        },
        initialize: function(b, c, d) {
            a.Editable.PathEditor.prototype.initialize.call(this, b, c, d), this._resizeLatLng = this.computeResizeLatLng();
        },
        computeResizeLatLng: function() {
            var a = (this.feature._radius || this.feature._mRadius) * Math.cos(Math.PI / 4), b = this.map.project(this.feature._latlng);
            return this.map.unproject([ b.x + a, b.y - a ]);
        },
        updateResizeLatLng: function() {
            this._resizeLatLng.update(this.computeResizeLatLng()), this._resizeLatLng.__vertex.update();
        },
        getLatLngs: function() {
            return [ this.feature._latlng, this._resizeLatLng ];
        },
        getDefaultLatLngs: function() {
            return this.getLatLngs();
        },
        onVertexMarkerDrag: function(b) {
            1 === b.vertex.getIndex() ? this.resize(b) : this.updateResizeLatLng(b), a.Editable.PathEditor.prototype.onVertexMarkerDrag.call(this, b);
        },
        resize: function(a) {
            var b = this.feature._latlng.distanceTo(a.latlng);
            this.feature.setRadius(b);
        },
        onDrawingMouseDown: function(b) {
            a.Editable.PathEditor.prototype.onDrawingMouseDown.call(this, b), this._resizeLatLng.update(b.latlng), 
            this.feature._latlng.update(b.latlng), this.connect(), this.map.dragging._draggable._onUp(b.originalEvent), 
            this._resizeLatLng.__vertex.dragging._draggable._onDown(b.originalEvent);
        },
        onDrawingMouseUp: function(b) {
            this.commitDrawing(b), a.Editable.PathEditor.prototype.onDrawingMouseUp.call(this, b);
        },
        onDrag: function(b) {
            a.Editable.PathEditor.prototype.onDrag.call(this, b), this.feature.dragging.updateLatLng(this._resizeLatLng);
        }
    });
    var b = {
        createEditor: function(a) {
            a = a || this._map;
            var b = (this.options.editOptions || {}).editTools || a.editTools;
            if (!b) throw Error("Unable to detect Editable instance.");
            return new (this.options.editorClass || this.getEditorClass(b))(a, this, this.options.editOptions);
        },
        enableEdit: function(a) {
            return this.editor || this.createEditor(a), this.editor.enable(), this.editor;
        },
        editEnabled: function() {
            return this.editor && this.editor.enabled();
        },
        disableEdit: function() {
            this.editor && (this.editor.disable(), delete this.editor);
        },
        toggleEdit: function() {
            this.editEnabled() ? this.disableEdit() : this.enableEdit();
        },
        _onEditableAdd: function() {
            this.editor && this.enableEdit();
        }
    }, c = {
        getEditorClass: function(b) {
            return b && b.options.polylineEditorClass ? b.options.polylineEditorClass : a.Editable.PolylineEditor;
        },
        shapeAt: function(b, c) {
            var d = null;
            if (c = c || this._latlngs, !c.length) return d;
            if (a.Polyline._flat(c) && this.isInLatLngs(b, c)) d = c; else for (var e = 0; e < c.length; e++) if (this.isInLatLngs(b, c[e])) return c[e];
            return d;
        },
        isInLatLngs: function(b, c) {
            if (!c) return !1;
            var d, e, f, g, h = [], i = this._clickTolerance();
            if (this._projectLatlngs(c, h, this._pxBounds), h = h[0], g = this._map.latLngToLayerPoint(b), 
            !this._pxBounds.contains(g)) return !1;
            for (d = 1, f = h.length, e = 0; d < f; e = d++) if (a.LineUtil.pointToSegmentDistance(g, h[e], h[d]) <= i) return !0;
            return !1;
        }
    }, d = {
        getEditorClass: function(b) {
            return b && b.options.polygonEditorClass ? b.options.polygonEditorClass : a.Editable.PolygonEditor;
        },
        shapeAt: function(b, c) {
            var d = null;
            if (c = c || this._latlngs, !c.length) return d;
            if (a.Polyline._flat(c) && this.isInLatLngs(b, c)) d = c; else if (a.Polyline._flat(c[0]) && this.isInLatLngs(b, c[0])) d = c; else for (var e = 0; e < c.length; e++) if (this.isInLatLngs(b, c[e][0])) return c[e];
            return d;
        },
        isInLatLngs: function(a, b) {
            var c, d, e, f, g, h = !1;
            for (e = 0, g = b.length, f = g - 1; e < g; f = e++) c = b[e], d = b[f], c.lat > a.lat != d.lat > a.lat && a.lng < (d.lng - c.lng) * (a.lat - c.lat) / (d.lat - c.lat) + c.lng && (h = !h);
            return h;
        },
        parentShape: function(b, c) {
            if (c = c || this._latlngs) {
                var d = a.Util.indexOf(c, b);
                if (-1 !== d) return c;
                for (var e = 0; e < c.length; e++) if (-1 !== (d = a.Util.indexOf(c[e], b))) return c[e];
            }
        }
    }, e = {
        getEditorClass: function(b) {
            return b && b.options.markerEditorClass ? b.options.markerEditorClass : a.Editable.MarkerEditor;
        }
    }, f = {
        getEditorClass: function(b) {
            return b && b.options.rectangleEditorClass ? b.options.rectangleEditorClass : a.Editable.RectangleEditor;
        }
    }, g = {
        getEditorClass: function(b) {
            return b && b.options.circleEditorClass ? b.options.circleEditorClass : a.Editable.CircleEditor;
        }
    }, h = function() {
        this.on("add", this._onEditableAdd);
    };
    a.Polyline && (a.Polyline.include(b), a.Polyline.include(c), a.Polyline.addInitHook(h)), 
    a.Polygon && (a.Polygon.include(b), a.Polygon.include(d)), a.Marker && (a.Marker.include(b), 
    a.Marker.include(e), a.Marker.addInitHook(h)), a.Rectangle && (a.Rectangle.include(b), 
    a.Rectangle.include(f)), a.Circle && (a.Circle.include(b), a.Circle.include(g)), 
    a.LatLng.prototype.update = function(b) {
        b = a.latLng(b), this.lat = b.lat, this.lng = b.lng;
    };
}, window), function(a) {
    var b;
    if ("function" == typeof define && define.amd) define([ "leaflet" ], a); else if ("undefined" != typeof module) b = require("leaflet"), 
    module.exports = a(b); else {
        if (void 0 === window.L) throw "Leaflet must be loaded first";
        a(window.L);
    }
}(function(a) {
    return a.Polyline._flat = a.Polyline._flat || function(b) {
        return !a.Util.isArray(b[0]) || "object" != typeof b[0][0] && void 0 !== b[0][0];
    }, a.GeometryUtil = a.extend(a.GeometryUtil || {}, {
        distance: function(a, b, c) {
            return a.latLngToLayerPoint(b).distanceTo(a.latLngToLayerPoint(c));
        },
        distanceSegment: function(b, c, d, e) {
            var f = b.latLngToLayerPoint(c), g = b.latLngToLayerPoint(d), h = b.latLngToLayerPoint(e);
            return a.LineUtil.pointToSegmentDistance(f, g, h);
        },
        readableDistance: function(a, b) {
            var c, d = "imperial" !== b;
            return d ? c = a > 1e3 ? (a / 1e3).toFixed(2) + " km" : Math.ceil(a) + " m" : (a *= 1.09361, 
            c = a > 1760 ? (a / 1760).toFixed(2) + " miles" : Math.ceil(a) + " yd"), c;
        },
        belongsSegment: function(a, b, c, d) {
            d = void 0 === d ? .2 : d;
            var e = b.distanceTo(c);
            return (b.distanceTo(a) + a.distanceTo(c) - e) / e < d;
        },
        length: function(b) {
            var c = a.GeometryUtil.accumulatedLengths(b);
            return c.length > 0 ? c[c.length - 1] : 0;
        },
        accumulatedLengths: function(a) {
            if ("function" == typeof a.getLatLngs && (a = a.getLatLngs()), 0 === a.length) return [];
            for (var b = 0, c = [ 0 ], d = 0, e = a.length - 1; d < e; d++) b += a[d].distanceTo(a[d + 1]), 
            c.push(b);
            return c;
        },
        closestOnSegment: function(b, c, d, e) {
            var f = b.getMaxZoom();
            f === 1 / 0 && (f = b.getZoom());
            var g = b.project(c, f), h = b.project(d, f), i = b.project(e, f), j = a.LineUtil.closestPointOnSegment(g, h, i);
            return b.unproject(j, f);
        },
        closest: function(b, c, d, e) {
            var f, g, h, i, j = 1 / 0, k = null;
            if (c instanceof Array) {
                if (c[0] instanceof Array && "number" != typeof c[0][0]) {
                    for (var g = 0; g < c.length; g++) {
                        var l = a.GeometryUtil.closest(b, c[g], d, e);
                        l.distance < j && (j = l.distance, k = l);
                    }
                    return k;
                }
                if (!(c[0] instanceof a.LatLng || "number" == typeof c[0][0] || "number" == typeof c[0].lat)) return k;
                c = a.polyline(c);
            }
            if (!(c instanceof a.Polyline)) return k;
            if (f = JSON.parse(JSON.stringify(c.getLatLngs().slice(0))), c instanceof a.Polygon) {
                var m = function(b) {
                    if (a.Polyline._flat(b)) b.push(b[0]); else for (var c = 0; c < b.length; c++) m(b[c]);
                };
                m(f);
            }
            if (a.Polyline._flat(f)) {
                if (e) {
                    for (g = 0, h = f.length; g < h; g++) {
                        var n = f[g];
                        i = a.GeometryUtil.distance(b, d, n), i < j && (j = i, k = n, k.distance = i);
                    }
                    return k;
                }
                for (g = 0, h = f.length; g < h - 1; g++) {
                    var o = f[g], p = f[g + 1];
                    i = a.GeometryUtil.distanceSegment(b, d, o, p), i <= j && (j = i, k = a.GeometryUtil.closestOnSegment(b, d, o, p), 
                    k.distance = i);
                }
                return k;
            }
            for (var g = 0; g < f.length; g++) {
                var l = a.GeometryUtil.closest(b, f[g], d, e);
                l.distance < j && (j = l.distance, k = l);
            }
            return k;
        },
        closestLayer: function(b, c, d) {
            for (var e = 1 / 0, f = null, g = null, h = 1 / 0, i = 0, j = c.length; i < j; i++) {
                var k = c[i];
                if (k instanceof a.LayerGroup) {
                    var l = a.GeometryUtil.closestLayer(b, k.getLayers(), d);
                    l.distance < e && (e = l.distance, f = l);
                } else "function" == typeof k.getLatLng ? (g = k.getLatLng(), h = a.GeometryUtil.distance(b, d, g)) : (g = a.GeometryUtil.closest(b, k, d)) && (h = g.distance), 
                h < e && (e = h, f = {
                    layer: k,
                    latlng: g,
                    distance: h
                });
            }
            return f;
        },
        layersWithin: function(b, c, d, e) {
            e = "number" == typeof e ? e : 1 / 0;
            for (var f = [], g = null, h = 0, i = 0, j = c.length; i < j; i++) {
                var k = c[i];
                "function" == typeof k.getLatLng ? (g = k.getLatLng(), h = a.GeometryUtil.distance(b, d, g)) : (g = a.GeometryUtil.closest(b, k, d)) && (h = g.distance), 
                g && h < e && f.push({
                    layer: k,
                    latlng: g,
                    distance: h
                });
            }
            return f.sort(function(a, b) {
                return a.distance - b.distance;
            });
        },
        closestLayerSnap: function(b, c, d, e, f) {
            e = "number" == typeof e ? e : 1 / 0, f = "boolean" != typeof f || f;
            var g = a.GeometryUtil.closestLayer(b, c, d);
            if (!g || g.distance > e) return null;
            if (f && "function" == typeof g.layer.getLatLngs) {
                var h = a.GeometryUtil.closest(b, g.layer, g.latlng, !0);
                h.distance < e && (g.latlng = h, g.distance = a.GeometryUtil.distance(b, h, d));
            }
            return g;
        },
        interpolateOnPointSegment: function(b, c, d) {
            return a.point(b.x * (1 - d) + d * c.x, b.y * (1 - d) + d * c.y);
        },
        interpolateOnLine: function(b, c, d) {
            c = c instanceof a.Polyline ? c.getLatLngs() : c;
            var e = c.length;
            if (e < 2) return null;
            if (0 === (d = Math.max(Math.min(d, 1), 0))) return {
                latLng: c[0] instanceof a.LatLng ? c[0] : a.latLng(c[0]),
                predecessor: -1
            };
            if (1 == d) return {
                latLng: c[c.length - 1] instanceof a.LatLng ? c[c.length - 1] : a.latLng(c[c.length - 1]),
                predecessor: c.length - 2
            };
            var f = b.getMaxZoom();
            f === 1 / 0 && (f = b.getZoom());
            for (var g = [], h = 0, i = 0; i < e; i++) g[i] = b.project(c[i], f), i > 0 && (h += g[i - 1].distanceTo(g[i]));
            for (var j = h * d, k = g[0], l = g[1], m = 0, n = k.distanceTo(l), o = 1; o < e && n < j; o++) k = l, 
            m = n, l = g[o], n += k.distanceTo(l);
            var p = n - m != 0 ? (j - m) / (n - m) : 0, q = a.GeometryUtil.interpolateOnPointSegment(k, l, p);
            return {
                latLng: b.unproject(q, f),
                predecessor: o - 2
            };
        },
        locateOnLine: function(b, c, d) {
            var e = c.getLatLngs();
            if (d.equals(e[0])) return 0;
            if (d.equals(e[e.length - 1])) return 1;
            for (var f = a.GeometryUtil.closest(b, c, d, !1), g = a.GeometryUtil.accumulatedLengths(e), h = g[g.length - 1], i = 0, j = !1, k = 0, l = e.length - 1; k < l; k++) {
                var m = e[k], n = e[k + 1];
                if (i = g[k], a.GeometryUtil.belongsSegment(f, m, n)) {
                    i += m.distanceTo(f), j = !0;
                    break;
                }
            }
            if (!j) throw "Could not interpolate " + d.toString() + " within " + c.toString();
            return i / h;
        },
        reverse: function(b) {
            return a.polyline(b.getLatLngs().slice(0).reverse());
        },
        extract: function(b, c, d, e) {
            if (d > e) return a.GeometryUtil.extract(b, a.GeometryUtil.reverse(c), 1 - d, 1 - e);
            d = Math.max(Math.min(d, 1), 0), e = Math.max(Math.min(e, 1), 0);
            var f = c.getLatLngs(), g = a.GeometryUtil.interpolateOnLine(b, c, d), h = a.GeometryUtil.interpolateOnLine(b, c, e);
            if (d == e) {
                return [ a.GeometryUtil.interpolateOnLine(b, c, e).latLng ];
            }
            -1 == g.predecessor && (g.predecessor = 0), -1 == h.predecessor && (h.predecessor = 0);
            var i = f.slice(g.predecessor + 1, h.predecessor + 1);
            return i.unshift(g.latLng), i.push(h.latLng), i;
        },
        isBefore: function(a, b) {
            if (!b) return !1;
            var c = a.getLatLngs(), d = b.getLatLngs();
            return c[c.length - 1].equals(d[0]);
        },
        isAfter: function(a, b) {
            if (!b) return !1;
            var c = a.getLatLngs(), d = b.getLatLngs();
            return c[0].equals(d[d.length - 1]);
        },
        startsAtExtremity: function(a, b) {
            if (!b) return !1;
            var c = a.getLatLngs(), d = b.getLatLngs(), e = c[0];
            return e.equals(d[0]) || e.equals(d[d.length - 1]);
        },
        computeAngle: function(a, b) {
            return 180 * Math.atan2(b.y - a.y, b.x - a.x) / Math.PI;
        },
        computeSlope: function(a, b) {
            var c = (b.y - a.y) / (b.x - a.x);
            return {
                a: c,
                b: a.y - c * a.x
            };
        },
        rotatePoint: function(b, c, d, e) {
            var f = b.getMaxZoom();
            f === 1 / 0 && (f = b.getZoom());
            var g = d * Math.PI / 180, h = b.project(c, f), i = b.project(e, f), j = Math.cos(g) * (h.x - i.x) - Math.sin(g) * (h.y - i.y) + i.x, k = Math.sin(g) * (h.x - i.x) + Math.cos(g) * (h.y - i.y) + i.y;
            return b.unproject(new a.Point(j, k), f);
        },
        bearing: function(a, b) {
            var c = Math.PI / 180, d = a.lat * c, e = b.lat * c, f = a.lng * c, g = b.lng * c, h = Math.sin(g - f) * Math.cos(e), i = Math.cos(d) * Math.sin(e) - Math.sin(d) * Math.cos(e) * Math.cos(g - f), j = (180 * Math.atan2(h, i) / Math.PI + 360) % 360;
            return j >= 180 ? j - 360 : j;
        },
        destination: function(b, c, d) {
            c = (c + 360) % 360;
            var e = Math.PI / 180, f = 180 / Math.PI, g = 6378137, h = b.lng * e, i = b.lat * e, j = c * e, k = Math.sin(i), l = Math.cos(i), m = Math.cos(d / g), n = Math.sin(d / g), o = Math.asin(k * m + l * n * Math.cos(j)), p = h + Math.atan2(Math.sin(j) * n * l, m - k * Math.sin(o));
            return p *= f, p = p > 180 ? p - 360 : p < -180 ? p + 360 : p, a.latLng([ o * f, p ]);
        }
    }), a.GeometryUtil;
}), function a(b, c, d) {
    function e(g, h) {
        if (!c[g]) {
            if (!b[g]) {
                var i = "function" == typeof require && require;
                if (!h && i) return i(g, !0);
                if (f) return f(g, !0);
                var j = new Error("Cannot find module '" + g + "'");
                throw j.code = "MODULE_NOT_FOUND", j;
            }
            var k = c[g] = {
                exports: {}
            };
            b[g][0].call(k.exports, function(a) {
                var c = b[g][1][a];
                return e(c || a);
            }, k, k.exports, a, b, c, d);
        }
        return c[g].exports;
    }
    for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);
    return e;
}({
    1: [ function(a, b, c) {
        function d(a, b, c) {
            function d(a) {
                return a >= 200 && a < 300 || 304 === a;
            }
            function e() {
                void 0 === h.status || d(h.status) ? b.call(h, null, h) : b.call(h, h, null);
            }
            var f = !1;
            if (void 0 === window.XMLHttpRequest) return b(Error("Browser not supported"));
            if (void 0 === c) {
                var g = a.match(/^\s*https?:\/\/[^\/]*/);
                c = g && g[0] !== location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "");
            }
            var h = new window.XMLHttpRequest();
            if (c && !("withCredentials" in h)) {
                h = new window.XDomainRequest();
                var i = b;
                b = function() {
                    if (f) i.apply(this, arguments); else {
                        var a = this, b = arguments;
                        setTimeout(function() {
                            i.apply(a, b);
                        }, 0);
                    }
                };
            }
            return "onload" in h ? h.onload = e : h.onreadystatechange = function() {
                4 === h.readyState && e();
            }, h.onerror = function(a) {
                b.call(this, a || !0, null), b = function() {};
            }, h.onprogress = function() {}, h.ontimeout = function(a) {
                b.call(this, a, null), b = function() {};
            }, h.onabort = function(a) {
                b.call(this, a, null), b = function() {};
            }, h.open("GET", a, !0), h.send(null), f = !0, h;
        }
        void 0 !== b && (b.exports = d);
    }, {} ],
    2: [ function(a, b, c) {
        b.exports = function(b, c, d) {
            var e = a("./instructions").get(c);
            if (Object !== e.constructor) throw "instructions must be object";
            if (!e[b]) throw "invalid version " + b;
            return {
                capitalizeFirstLetter: function(a) {
                    return a.charAt(0).toUpperCase() + a.slice(1);
                },
                ordinalize: function(a) {
                    return e[b].constants.ordinalize[a.toString()] || "";
                },
                directionFromDegree: function(a) {
                    if (a || 0 === a) {
                        if (a >= 0 && a <= 20) return e[b].constants.direction.north;
                        if (a > 20 && a < 70) return e[b].constants.direction.northeast;
                        if (a >= 70 && a < 110) return e[b].constants.direction.east;
                        if (a >= 110 && a <= 160) return e[b].constants.direction.southeast;
                        if (a > 160 && a <= 200) return e[b].constants.direction.south;
                        if (a > 200 && a < 250) return e[b].constants.direction.southwest;
                        if (a >= 250 && a <= 290) return e[b].constants.direction.west;
                        if (a > 290 && a < 340) return e[b].constants.direction.northwest;
                        if (a >= 340 && a <= 360) return e[b].constants.direction.north;
                        throw new Error("Degree " + a + " invalid");
                    }
                    return "";
                },
                laneConfig: function(a) {
                    if (!a.intersections || !a.intersections[0].lanes) throw new Error("No lanes object");
                    var b = [], c = null;
                    return a.intersections[0].lanes.forEach(function(a) {
                        null !== c && c === a.valid || (a.valid ? b.push("o") : b.push("x"), c = a.valid);
                    }), b.join("");
                },
                compile: function(a) {
                    if (!a.maneuver) throw new Error("No step maneuver provided");
                    var c = a.maneuver.type, f = a.maneuver.modifier, g = a.mode;
                    if (!c) throw new Error("Missing step maneuver type");
                    if ("depart" !== c && "arrive" !== c && !f) throw new Error("Missing step maneuver modifier");
                    e[b][c] || (console.log("Encountered unknown instruction type: " + c), c = "turn");
                    var h;
                    h = e[b].modes[g] ? e[b].modes[g] : e[b][c][f] ? e[b][c][f] : e[b][c].default;
                    var i;
                    switch (c) {
                      case "use lane":
                        i = e[b].constants.lanes[this.laneConfig(a)], i || (h = e[b]["use lane"].no_lanes);
                        break;

                      case "rotary":
                      case "roundabout":
                        h = a.rotary_name && a.maneuver.exit && h.name_exit ? h.name_exit : a.rotary_name && h.name ? h.name : a.maneuver.exit && h.exit ? h.exit : h.default;
                    }
                    var j, k = a.name || "", l = (a.ref || "").split(";")[0];
                    k === a.ref && (k = ""), k = k.replace(" (" + a.ref + ")", ""), j = k && l && k !== l ? k + " (" + l + ")" : !k && l ? l : k;
                    var m;
                    m = a.destinations && h.destination ? h.destination : j && h.name ? h.name : h.default;
                    var n = ((d || {}).hooks || {}).tokenizedInstruction;
                    return n && (m = n(m)), m = m.replace("{way_name}", j).replace("{destination}", (a.destinations || "").split(",")[0]).replace("{exit_number}", this.ordinalize(a.maneuver.exit || 1)).replace("{rotary_name}", a.rotary_name).replace("{lane_instruction}", i).replace("{modifier}", e[b].constants.modifier[f]).replace("{direction}", this.directionFromDegree(a.maneuver.bearing_after)).replace("{nth}", "").replace(/ {2}/g, " "), 
                    e.meta.capitalizeFirstLetter && (m = this.capitalizeFirstLetter(m)), m;
                }
            };
        };
    }, {
        "./instructions": 3
    } ],
    3: [ function(a, b, c) {
        var d = a("./instructions/de.json"), e = a("./instructions/en.json"), f = a("./instructions/fr.json"), g = a("./instructions/nl.json"), h = a("./instructions/zh-Hans.json");
        b.exports = {
            get: function(a) {
                switch (a) {
                  case "en":
                    return e;

                  case "de":
                    return d;

                  case "fr":
                    return f;

                  case "nl":
                    return g;

                  case "zh":
                  case "zh-Hans":
                    return h;

                  default:
                    throw "invalid language " + a;
                }
            }
        };
    }, {
        "./instructions/de.json": 4,
        "./instructions/en.json": 5,
        "./instructions/fr.json": 6,
        "./instructions/nl.json": 7,
        "./instructions/zh-Hans.json": 8
    } ],
    4: [ function(a, b, c) {
        b.exports = {
            meta: {
                capitalizeFirstLetter: !0
            },
            v5: {
                constants: {
                    ordinalize: {
                        "1": "erste",
                        "2": "zweite",
                        "3": "dritte",
                        "4": "vierte",
                        "5": "fünfte",
                        "6": "sechste",
                        "7": "siebente",
                        "8": "achte",
                        "9": "neunte",
                        "10": "zehnte"
                    },
                    direction: {
                        north: "Norden",
                        northeast: "Nordosten",
                        east: "Osten",
                        southeast: "Südosten",
                        south: "Süden",
                        southwest: "Südwesten",
                        west: "Westen",
                        northwest: "Nordwesten"
                    },
                    modifier: {
                        left: "links",
                        right: "rechts",
                        "sharp left": "scharf links",
                        "sharp right": "scharf rechts",
                        "slight left": "leicht links",
                        "slight right": "leicht rechts",
                        straight: "geradeaus",
                        uturn: "180°-Wendung"
                    },
                    lanes: {
                        xo: "Rechts halten",
                        ox: "Links halten",
                        xox: "Mittlere Spur nutzen",
                        oxo: "Rechts oder links halten"
                    }
                },
                modes: {
                    ferry: {
                        default: "Fähre nehmen",
                        name: "Fähre nehmen {way_name}",
                        destination: "Fähre nehmen Richtung {destination}"
                    }
                },
                arrive: {
                    default: {
                        default: "Sie haben Ihr {nth} Ziel erreicht"
                    },
                    left: {
                        default: "Sie haben Ihr {nth} Ziel erreicht, es befindet sich links von Ihnen"
                    },
                    right: {
                        default: "Sie haben Ihr {nth} Ziel erreicht, es befindet sich rechts von Ihnen"
                    },
                    "sharp left": {
                        default: "Sie haben Ihr {nth} Ziel erreicht, es befindet sich links von Ihnen"
                    },
                    "sharp right": {
                        default: "Sie haben Ihr {nth} Ziel erreicht, es befindet sich rechts von Ihnen"
                    },
                    "slight right": {
                        default: "Sie haben Ihr {nth} Ziel erreicht, es befindet sich rechts von Ihnen"
                    },
                    "slight left": {
                        default: "Sie haben Ihr {nth} Ziel erreicht, es befindet sich links von Ihnen"
                    },
                    straight: {
                        default: "Sie haben Ihr {nth} Ziel erreicht, es befindet sich direkt vor Ihnen"
                    }
                },
                continue: {
                    default: {
                        default: "{modifier} weiterfahren",
                        name: "{modifier} weiterfahren auf {way_name}",
                        destination: "{modifier} weiterfahren Richtung {destination}"
                    },
                    "slight left": {
                        default: "Leicht links weiter",
                        name: "Leicht links weiter auf {way_name}",
                        destination: "Leicht links weiter Richtung {destination}"
                    },
                    "slight right": {
                        default: "Leicht rechts weiter",
                        name: "Leicht rechts weiter auf {way_name}",
                        destination: "Leicht rechts weiter Richtung {destination}"
                    },
                    uturn: {
                        default: "180°-Wendung",
                        name: "180°-Wendung auf {way_name}",
                        destination: "180°-Wendung Richtung {destination}"
                    }
                },
                depart: {
                    default: {
                        default: "Fahren Sie Richtung {direction}",
                        name: "Fahren Sie Richtung {direction} auf {way_name}"
                    }
                },
                "end of road": {
                    default: {
                        default: "{modifier} abbiegen",
                        name: "{modifier} abbiegen auf {way_name}",
                        destination: "{modifier} abbiegen Richtung {destination}"
                    },
                    straight: {
                        default: "Geradeaus weiterfahren",
                        name: "Geradeaus weiterfahren auf {way_name}",
                        destination: "Geradeaus weiterfahren Richtung {destination}"
                    },
                    uturn: {
                        default: "180°-Wendung am Ende der Straße",
                        name: "180°-Wendung auf {way_name} am Ende der Straße",
                        destination: "180°-Wendung Richtung {destination} am Ende der Straße"
                    }
                },
                fork: {
                    default: {
                        default: "{modifier} halten an der Gabelung",
                        name: "{modifier} halten an der Gabelung auf {way_name}",
                        destination: "{modifier}  halten an der Gabelung Richtung {destination}"
                    },
                    "slight left": {
                        default: "Links halten an der Gabelung",
                        name: "Links halten an der Gabelung auf {way_name}",
                        destination: "Links halten an der Gabelung Richtung {destination}"
                    },
                    "slight right": {
                        default: "Rechts halten an der Gabelung",
                        name: "Rechts halten an der Gabelung auf {way_name}",
                        destination: "Rechts halten an der Gabelung Richtung {destination}"
                    },
                    "sharp left": {
                        default: "Scharf links abbiegen an der Gabelung",
                        name: "Scharf links abbiegen an der Gabelung auf {way_name}",
                        destination: "Scharf links abbiegen an der Gabelung Richtung {destination}"
                    },
                    "sharp right": {
                        default: "Scharf rechts abbiegen an der Gabelung",
                        name: "Scharf rechts abbiegen an der Gabelung auf {way_name}",
                        destination: "Scharf rechts abbiegen an der Gabelung Richtung {destination}"
                    },
                    uturn: {
                        default: "180°-Wendung",
                        name: "180°-Wendung auf {way_name}",
                        destination: "180°-Wendung Richtung {destination}"
                    }
                },
                merge: {
                    default: {
                        default: "{modifier} auffahren",
                        name: "{modifier} auffahren auf {way_name}",
                        destination: "{modifier} auffahren Richtung {destination}"
                    },
                    "slight left": {
                        default: "Leicht links auffahren",
                        name: "Leicht links auffahren auf {way_name}",
                        destination: "Leicht links auffahren Richtung {destination}"
                    },
                    "slight right": {
                        default: "Leicht rechts auffahren",
                        name: "Leicht rechts auffahren auf {way_name}",
                        destination: "Leicht rechts auffahren Richtung {destination}"
                    },
                    "sharp left": {
                        default: "Scharf links auffahren",
                        name: "Scharf links auffahren auf {way_name}",
                        destination: "Scharf links auffahren Richtung {destination}"
                    },
                    "sharp right": {
                        default: "Scharf rechts auffahren",
                        name: "Scharf rechts auffahren auf {way_name}",
                        destination: "Scharf rechts auffahren Richtung {destination}"
                    },
                    uturn: {
                        default: "180°-Wendung",
                        name: "180°-Wendung auf {way_name}",
                        destination: "180°-Wendung Richtung {destination}"
                    }
                },
                "new name": {
                    default: {
                        default: "{modifier} weiterfahren",
                        name: "{modifier} weiterfahren auf {way_name}",
                        destination: "{modifier} weiterfahren Richtung {destination}"
                    },
                    "sharp left": {
                        default: "Scharf links",
                        name: "Scharf links auf {way_name}",
                        destination: "Scharf links Richtung {destination}"
                    },
                    "sharp right": {
                        default: "Scharf rechts",
                        name: "Scharf rechts auf {way_name}",
                        destination: "Scharf rechts Richtung {destination}"
                    },
                    "slight left": {
                        default: "Leicht links weiter",
                        name: "Leicht links weiter auf {way_name}",
                        destination: "Leicht links weiter Richtung {destination}"
                    },
                    "slight right": {
                        default: "Leicht rechts weiter",
                        name: "Leicht rechts weiter auf {way_name}",
                        destination: "Leicht rechts weiter Richtung {destination}"
                    },
                    uturn: {
                        default: "180°-Wendung",
                        name: "180°-Wendung auf {way_name}",
                        destination: "180°-Wendung Richtung {destination}"
                    }
                },
                notification: {
                    default: {
                        default: "{modifier} weiterfahren",
                        name: "{modifier} weiterfahren auf {way_name}",
                        destination: "{modifier} weiterfahren Richtung {destination}"
                    },
                    uturn: {
                        default: "180°-Wendung",
                        name: "180°-Wendung auf {way_name}",
                        destination: "180°-Wendung Richtung {destination}"
                    }
                },
                "off ramp": {
                    default: {
                        default: "Rampe nehmen",
                        name: "Rampe nehmen auf {way_name}",
                        destination: "Rampe nehmen Richtung {destination}"
                    },
                    left: {
                        default: "Rampe auf der linken Seite nehmen",
                        name: "Rampe auf der linken Seite nehmen auf {way_name}",
                        destination: "Rampe auf der linken Seite nehmen Richtung {destination}"
                    },
                    right: {
                        default: "Rampe auf der rechten Seite nehmen",
                        name: "Rampe auf der rechten Seite nehmen auf {way_name}",
                        destination: "Rampe auf der rechten Seite nehmen Richtung {destination}"
                    },
                    "sharp left": {
                        default: "Rampe auf der linken Seite nehmen",
                        name: "Rampe auf der linken Seite nehmen auf {way_name}",
                        destination: "Rampe auf der linken Seite nehmen Richtung {destination}"
                    },
                    "sharp right": {
                        default: "Rampe auf der rechten Seite nehmen",
                        name: "Rampe auf der rechten Seite nehmen auf {way_name}",
                        destination: "Rampe auf der rechten Seite nehmen Richtung {destination}"
                    },
                    "slight left": {
                        default: "Rampe auf der linken Seite nehmen",
                        name: "Rampe auf der linken Seite nehmen auf {way_name}",
                        destination: "Rampe auf der linken Seite nehmen Richtung {destination}"
                    },
                    "slight right": {
                        default: "Rampe auf der rechten Seite nehmen",
                        name: "Rampe auf der rechten Seite nehmen auf {way_name}",
                        destination: "Rampe auf der rechten Seite nehmen Richtung {destination}"
                    }
                },
                "on ramp": {
                    default: {
                        default: "Rampe nehmen",
                        name: "Rampe nehmen auf {way_name}",
                        destination: "Rampe nehmen Richtung {destination}"
                    },
                    left: {
                        default: "Rampe auf der linken Seite nehmen",
                        name: "Rampe auf der linken Seite nehmen auf {way_name}",
                        destination: "Rampe auf der linken Seite nehmen Richtung {destination}"
                    },
                    right: {
                        default: "Rampe auf der rechten Seite nehmen",
                        name: "Rampe auf der rechten Seite nehmen auf {way_name}",
                        destination: "Rampe auf der rechten Seite nehmen Richtung {destination}"
                    },
                    "sharp left": {
                        default: "Rampe auf der linken Seite nehmen",
                        name: "Rampe auf der linken Seite nehmen auf {way_name}",
                        destination: "Rampe auf der linken Seite nehmen Richtung {destination}"
                    },
                    "sharp right": {
                        default: "Rampe auf der rechten Seite nehmen",
                        name: "Rampe auf der rechten Seite nehmen auf {way_name}",
                        destination: "Rampe auf der rechten Seite nehmen Richtung {destination}"
                    },
                    "slight left": {
                        default: "Rampe auf der linken Seite nehmen",
                        name: "Rampe auf der linken Seite nehmen auf {way_name}",
                        destination: "Rampe auf der linken Seite nehmen Richtung {destination}"
                    },
                    "slight right": {
                        default: "Rampe auf der rechten Seite nehmen",
                        name: "Rampe auf der rechten Seite nehmen auf {way_name}",
                        destination: "Rampe auf der rechten Seite nehmen Richtung {destination}"
                    }
                },
                rotary: {
                    default: {
                        default: {
                            default: "In den Kreisverkehr fahren",
                            name: "In den Kreisverkehr fahren und auf {way_name} verlassen",
                            destination: "In den Kreisverkehr fahren und Richtung {destination} verlassen"
                        },
                        name: {
                            default: "In {rotary_name} fahren",
                            name: "In {rotary_name} fahren und auf {way_name} verlassen",
                            destination: "In {rotary_name} fahren und Richtung {destination} verlassen"
                        },
                        exit: {
                            default: "In den Kreisverkehr fahren und {exit_number} Ausfahrt nehmen",
                            name: "In den Kreisverkehr fahren und {exit_number} Ausfahrt nehmen auf {way_name}",
                            destination: "In den Kreisverkehr fahren und {exit_number} Ausfahrt nehmen Richtung {destination}"
                        },
                        name_exit: {
                            default: "In den Kreisverkehr fahren und {exit_number} Ausfahrt nehmen",
                            name: "In den Kreisverkehr fahren und {exit_number} Ausfahrt nehmen auf {way_name}",
                            destination: "In den Kreisverkehr fahren und {exit_number} Ausfahrt nehmen Richtung {destination}"
                        }
                    }
                },
                roundabout: {
                    default: {
                        exit: {
                            default: "In den Kreisverkehr fahren und {exit_number} Ausfahrt nehmen",
                            name: "In den Kreisverkehr fahren und {exit_number} Ausfahrt nehmen auf {way_name}",
                            destination: "In den Kreisverkehr fahren und {exit_number} Ausfahrt nehmen Richtung {destination}"
                        },
                        default: {
                            default: "In den Kreisverkehr fahren",
                            name: "In den Kreisverkehr fahren und auf {way_name} verlassen",
                            destination: "In den Kreisverkehr fahren und Richtung {destination} verlassen"
                        }
                    }
                },
                "roundabout turn": {
                    default: {
                        default: "Am Kreisverkehr {modifier}",
                        name: "Am Kreisverkehr {modifier} auf {way_name}",
                        destination: "Am Kreisverkehr {modifier} Richtung {destination}"
                    },
                    left: {
                        default: "Am Kreisverkehr links",
                        name: "Am Kreisverkehr links auf {way_name}",
                        destination: "Am Kreisverkehr links Richtung {destination}"
                    },
                    right: {
                        default: "Am Kreisverkehr rechts",
                        name: "Am Kreisverkehr rechts auf {way_name}",
                        destination: "Am Kreisverkehr rechts Richtung {destination}"
                    },
                    straight: {
                        default: "Am Kreisverkehr geradeaus weiterfahren",
                        name: "Am Kreisverkehr geradeaus weiterfahren auf {way_name}",
                        destination: "Am Kreisverkehr geradeaus weiterfahren Richtung {destination}"
                    }
                },
                turn: {
                    default: {
                        default: "{modifier} abbiegen",
                        name: "{modifier} abbiegen auf {way_name}",
                        destination: "{modifier} abbiegen Richtung {destination}"
                    },
                    left: {
                        default: "Links abbiegen",
                        name: "Links abbiegen auf {way_name}",
                        destination: "Links abbiegen Richtung {destination}"
                    },
                    right: {
                        default: "Rechts abbiegen",
                        name: "Rechts abbiegen auf {way_name}",
                        destination: "Rechts abbiegen Richtung {destination}"
                    },
                    straight: {
                        default: "Geradeaus weiterfahren",
                        name: "Geradeaus weiterfahren auf {way_name}",
                        destination: "Geradeaus weiterfahren Richtung {destination}"
                    }
                },
                "use lane": {
                    no_lanes: {
                        default: "Geradeaus weiterfahren"
                    },
                    default: {
                        default: "{lane_instruction}"
                    }
                }
            }
        };
    }, {} ],
    5: [ function(a, b, c) {
        b.exports = {
            meta: {
                capitalizeFirstLetter: !0
            },
            v5: {
                constants: {
                    ordinalize: {
                        "1": "1st",
                        "2": "2nd",
                        "3": "3rd",
                        "4": "4th",
                        "5": "5th",
                        "6": "6th",
                        "7": "7th",
                        "8": "8th",
                        "9": "9th",
                        "10": "10th"
                    },
                    direction: {
                        north: "north",
                        northeast: "northeast",
                        east: "east",
                        southeast: "southeast",
                        south: "south",
                        southwest: "southwest",
                        west: "west",
                        northwest: "northwest"
                    },
                    modifier: {
                        left: "left",
                        right: "right",
                        "sharp left": "sharp left",
                        "sharp right": "sharp right",
                        "slight left": "slight left",
                        "slight right": "slight right",
                        straight: "straight",
                        uturn: "U-turn"
                    },
                    lanes: {
                        xo: "Keep right",
                        ox: "Keep left",
                        xox: "Keep in the middle",
                        oxo: "Keep left or right"
                    }
                },
                modes: {
                    ferry: {
                        default: "Take the ferry",
                        name: "Take the ferry {way_name}",
                        destination: "Take the ferry towards {destination}"
                    }
                },
                arrive: {
                    default: {
                        default: "You have arrived at your {nth} destination"
                    },
                    left: {
                        default: "You have arrived at your {nth} destination, on the left"
                    },
                    right: {
                        default: "You have arrived at your {nth} destination, on the right"
                    },
                    "sharp left": {
                        default: "You have arrived at your {nth} destination, on the left"
                    },
                    "sharp right": {
                        default: "You have arrived at your {nth} destination, on the right"
                    },
                    "slight right": {
                        default: "You have arrived at your {nth} destination, on the right"
                    },
                    "slight left": {
                        default: "You have arrived at your {nth} destination, on the left"
                    },
                    straight: {
                        default: "You have arrived at your {nth} destination, straight ahead"
                    }
                },
                continue: {
                    default: {
                        default: "Continue {modifier}",
                        name: "Continue {modifier} onto {way_name}",
                        destination: "Continue {modifier} towards {destination}"
                    },
                    "slight left": {
                        default: "Continue slightly left",
                        name: "Continue slightly left onto {way_name}",
                        destination: "Continue slightly left towards {destination}"
                    },
                    "slight right": {
                        default: "Continue slightly right",
                        name: "Continue slightly right onto {way_name}",
                        destination: "Continue slightly right towards {destination}"
                    },
                    uturn: {
                        default: "Make a U-turn",
                        name: "Make a U-turn onto {way_name}",
                        destination: "Make a U-turn towards {destination}"
                    }
                },
                depart: {
                    default: {
                        default: "Head {direction}",
                        name: "Head {direction} on {way_name}"
                    }
                },
                "end of road": {
                    default: {
                        default: "Turn {modifier}",
                        name: "Turn {modifier} onto {way_name}",
                        destination: "Turn {modifier} towards {destination}"
                    },
                    straight: {
                        default: "Continue straight",
                        name: "Continue straight onto {way_name}",
                        destination: "Continue straight towards {destination}"
                    },
                    uturn: {
                        default: "Make a U-turn at the end of the road",
                        name: "Make a U-turn onto {way_name} at the end of the road",
                        destination: "Make a U-turn towards {destination} at the end of the road"
                    }
                },
                fork: {
                    default: {
                        default: "Keep {modifier} at the fork",
                        name: "Keep {modifier} at the fork onto {way_name}",
                        destination: "Keep {modifier} at the fork towards {destination}"
                    },
                    "slight left": {
                        default: "Keep left at the fork",
                        name: "Keep left at the fork onto {way_name}",
                        destination: "Keep left at the fork towards {destination}"
                    },
                    "slight right": {
                        default: "Keep right at the fork",
                        name: "Keep right at the fork onto {way_name}",
                        destination: "Keep right at the fork towards {destination}"
                    },
                    "sharp left": {
                        default: "Take a sharp left at the fork",
                        name: "Take a sharp left at the fork onto {way_name}",
                        destination: "Take a sharp left at the fork towards {destination}"
                    },
                    "sharp right": {
                        default: "Take a sharp right at the fork",
                        name: "Take a sharp right at the fork onto {way_name}",
                        destination: "Take a sharp right at the fork towards {destination}"
                    },
                    uturn: {
                        default: "Make a U-turn",
                        name: "Make a U-turn onto {way_name}",
                        destination: "Make a U-turn towards {destination}"
                    }
                },
                merge: {
                    default: {
                        default: "Merge {modifier}",
                        name: "Merge {modifier} onto {way_name}",
                        destination: "Merge {modifier} towards {destination}"
                    },
                    "slight left": {
                        default: "Merge left",
                        name: "Merge left onto {way_name}",
                        destination: "Merge left towards {destination}"
                    },
                    "slight right": {
                        default: "Merge right",
                        name: "Merge right onto {way_name}",
                        destination: "Merge right towards {destination}"
                    },
                    "sharp left": {
                        default: "Merge left",
                        name: "Merge left onto {way_name}",
                        destination: "Merge left towards {destination}"
                    },
                    "sharp right": {
                        default: "Merge right",
                        name: "Merge right onto {way_name}",
                        destination: "Merge right towards {destination}"
                    },
                    uturn: {
                        default: "Make a U-turn",
                        name: "Make a U-turn onto {way_name}",
                        destination: "Make a U-turn towards {destination}"
                    }
                },
                "new name": {
                    default: {
                        default: "Continue {modifier}",
                        name: "Continue {modifier} onto {way_name}",
                        destination: "Continue {modifier} towards {destination}"
                    },
                    "sharp left": {
                        default: "Take a sharp left",
                        name: "Take a sharp left onto {way_name}",
                        destination: "Take a sharp left towards {destination}"
                    },
                    "sharp right": {
                        default: "Take a sharp right",
                        name: "Take a sharp right onto {way_name}",
                        destination: "Take a sharp right towards {destination}"
                    },
                    "slight left": {
                        default: "Continue slightly left",
                        name: "Continue slightly left onto {way_name}",
                        destination: "Continue slightly left towards {destination}"
                    },
                    "slight right": {
                        default: "Continue slightly right",
                        name: "Continue slightly right onto {way_name}",
                        destination: "Continue slightly right towards {destination}"
                    },
                    uturn: {
                        default: "Make a U-turn",
                        name: "Make a U-turn onto {way_name}",
                        destination: "Make a U-turn towards {destination}"
                    }
                },
                notification: {
                    default: {
                        default: "Continue {modifier}",
                        name: "Continue {modifier} onto {way_name}",
                        destination: "Continue {modifier} towards {destination}"
                    },
                    uturn: {
                        default: "Make a U-turn",
                        name: "Make a U-turn onto {way_name}",
                        destination: "Make a U-turn towards {destination}"
                    }
                },
                "off ramp": {
                    default: {
                        default: "Take the ramp",
                        name: "Take the ramp onto {way_name}",
                        destination: "Take the ramp towards {destination}"
                    },
                    left: {
                        default: "Take the ramp on the left",
                        name: "Take the ramp on the left onto {way_name}",
                        destination: "Take the ramp on the left towards {destination}"
                    },
                    right: {
                        default: "Take the ramp on the right",
                        name: "Take the ramp on the right onto {way_name}",
                        destination: "Take the ramp on the right towards {destination}"
                    },
                    "sharp left": {
                        default: "Take the ramp on the left",
                        name: "Take the ramp on the left onto {way_name}",
                        destination: "Take the ramp on the left towards {destination}"
                    },
                    "sharp right": {
                        default: "Take the ramp on the right",
                        name: "Take the ramp on the right onto {way_name}",
                        destination: "Take the ramp on the right towards {destination}"
                    },
                    "slight left": {
                        default: "Take the ramp on the left",
                        name: "Take the ramp on the left onto {way_name}",
                        destination: "Take the ramp on the left towards {destination}"
                    },
                    "slight right": {
                        default: "Take the ramp on the right",
                        name: "Take the ramp on the right onto {way_name}",
                        destination: "Take the ramp on the right towards {destination}"
                    }
                },
                "on ramp": {
                    default: {
                        default: "Take the ramp",
                        name: "Take the ramp onto {way_name}",
                        destination: "Take the ramp towards {destination}"
                    },
                    left: {
                        default: "Take the ramp on the left",
                        name: "Take the ramp on the left onto {way_name}",
                        destination: "Take the ramp on the left towards {destination}"
                    },
                    right: {
                        default: "Take the ramp on the right",
                        name: "Take the ramp on the right onto {way_name}",
                        destination: "Take the ramp on the right towards {destination}"
                    },
                    "sharp left": {
                        default: "Take the ramp on the left",
                        name: "Take the ramp on the left onto {way_name}",
                        destination: "Take the ramp on the left towards {destination}"
                    },
                    "sharp right": {
                        default: "Take the ramp on the right",
                        name: "Take the ramp on the right onto {way_name}",
                        destination: "Take the ramp on the right towards {destination}"
                    },
                    "slight left": {
                        default: "Take the ramp on the left",
                        name: "Take the ramp on the left onto {way_name}",
                        destination: "Take the ramp on the left towards {destination}"
                    },
                    "slight right": {
                        default: "Take the ramp on the right",
                        name: "Take the ramp on the right onto {way_name}",
                        destination: "Take the ramp on the right towards {destination}"
                    }
                },
                rotary: {
                    default: {
                        default: {
                            default: "Enter the rotary",
                            name: "Enter the rotary and exit onto {way_name}",
                            destination: "Enter the rotary and exit towards {destination}"
                        },
                        name: {
                            default: "Enter {rotary_name}",
                            name: "Enter {rotary_name} and exit onto {way_name}",
                            destination: "Enter {rotary_name} and exit towards {destination}"
                        },
                        exit: {
                            default: "Enter the rotary and take the {exit_number} exit",
                            name: "Enter the rotary and take the {exit_number} exit onto {way_name}",
                            destination: "Enter the rotary and take the {exit_number} exit towards {destination}"
                        },
                        name_exit: {
                            default: "Enter {rotary_name} and take the {exit_number} exit",
                            name: "Enter {rotary_name} and take the {exit_number} exit onto {way_name}",
                            destination: "Enter {rotary_name} and take the {exit_number} exit towards {destination}"
                        }
                    }
                },
                roundabout: {
                    default: {
                        exit: {
                            default: "Enter the roundabout and take the {exit_number} exit",
                            name: "Enter the roundabout and take the {exit_number} exit onto {way_name}",
                            destination: "Enter the roundabout and take the {exit_number} exit towards {destination}"
                        },
                        default: {
                            default: "Enter the roundabout",
                            name: "Enter the roundabout and exit onto {way_name}",
                            destination: "Enter the roundabout and exit towards {destination}"
                        }
                    }
                },
                "roundabout turn": {
                    default: {
                        default: "At the roundabout make a {modifier}",
                        name: "At the roundabout make a {modifier} onto {way_name}",
                        destination: "At the roundabout make a {modifier} towards {destination}"
                    },
                    left: {
                        default: "At the roundabout turn left",
                        name: "At the roundabout turn left onto {way_name}",
                        destination: "At the roundabout turn left towards {destination}"
                    },
                    right: {
                        default: "At the roundabout turn right",
                        name: "At the roundabout turn right onto {way_name}",
                        destination: "At the roundabout turn right towards {destination}"
                    },
                    straight: {
                        default: "At the roundabout continue straight",
                        name: "At the roundabout continue straight onto {way_name}",
                        destination: "At the roundabout continue straight towards {destination}"
                    }
                },
                turn: {
                    default: {
                        default: "Make a {modifier}",
                        name: "Make a {modifier} onto {way_name}",
                        destination: "Make a {modifier} towards {destination}"
                    },
                    left: {
                        default: "Turn left",
                        name: "Turn left onto {way_name}",
                        destination: "Turn left towards {destination}"
                    },
                    right: {
                        default: "Turn right",
                        name: "Turn right onto {way_name}",
                        destination: "Turn right towards {destination}"
                    },
                    straight: {
                        default: "Go straight",
                        name: "Go straight onto {way_name}",
                        destination: "Go straight towards {destination}"
                    }
                },
                "use lane": {
                    no_lanes: {
                        default: "Continue straight"
                    },
                    default: {
                        default: "{lane_instruction}"
                    }
                }
            }
        };
    }, {} ],
    6: [ function(a, b, c) {
        b.exports = {
            meta: {
                capitalizeFirstLetter: !0
            },
            v5: {
                constants: {
                    ordinalize: {
                        "1": "première",
                        "2": "seconde",
                        "3": "troisième",
                        "4": "quatrième",
                        "5": "cinquième",
                        "6": "sixième",
                        "7": "setpième",
                        "8": "huitième",
                        "9": "neuvième",
                        "10": "dixième"
                    },
                    direction: {
                        north: "le nord",
                        northeast: "le nord-est",
                        east: "l'est",
                        southeast: "le sud-est",
                        south: "le sud",
                        southwest: "le sud-ouest",
                        west: "l'ouest",
                        northwest: "le nord-ouest"
                    },
                    modifier: {
                        left: "à gauche",
                        right: "à droite",
                        "sharp left": "franchement à gauche",
                        "sharp right": "franchement à droite",
                        "slight left": "légèrement à gauche",
                        "slight right": "légèrement à droite",
                        straight: "tout droit",
                        uturn: "demi-tour"
                    },
                    lanes: {
                        xo: "Serrer à droite",
                        ox: "Serrer à gauche",
                        xox: "Rester au milieu",
                        oxo: "Rester à gauche ou à droite"
                    }
                },
                modes: {
                    ferry: {
                        default: "Prendre le ferry",
                        name: "Prendre le ferry {way_name}",
                        destination: "Prendre le ferry en direction de {destination}"
                    }
                },
                arrive: {
                    default: {
                        default: "Vous êtes arrivés à votre {nth} destination"
                    },
                    left: {
                        default: "Vous êtes arrivés à votre {nth} destination, sur la gauche"
                    },
                    right: {
                        default: "Vous êtes arrivés à votre {nth} destination, sur la droite"
                    },
                    "sharp left": {
                        default: "Vous êtes arrivés à votre {nth} destination, sur la gauche"
                    },
                    "sharp right": {
                        default: "Vous êtes arrivés à votre {nth} destination, sur la droite"
                    },
                    "slight right": {
                        default: "Vous êtes arrivés à votre {nth} destination, sur la droite"
                    },
                    "slight left": {
                        default: "Vous êtes arrivés à votre {nth} destination, sur la gauche"
                    },
                    straight: {
                        default: "Vous êtes arrivés à votre {nth} destination, droit devant"
                    }
                },
                continue: {
                    default: {
                        default: "Continuer {modifier}",
                        name: "Continuer {modifier} sur {way_name}",
                        destination: "Continuer {modifier} en direction de {destination}"
                    },
                    "slight left": {
                        default: "Continuer légèrement à gauche",
                        name: "Continuer légèrement à gauche sur {way_name}",
                        destination: "Continuer légèrement à gauche en direction de {destination}"
                    },
                    "slight right": {
                        default: "Continuer légèrement à droite",
                        name: "Continuer légèrement à droite sur {way_name}",
                        destination: "Continuer légèrement à droite en direction de {destination}"
                    },
                    uturn: {
                        default: "Faire demi-tour",
                        name: "Faire demi-tour sur {way_name}",
                        destination: "Faire demi-tour en direction de {destination}"
                    }
                },
                depart: {
                    default: {
                        default: "Rouler vers {direction}",
                        name: "Rouler vers {direction} sur {way_name}"
                    }
                },
                "end of road": {
                    default: {
                        default: "Tourner {modifier}",
                        name: "Tourner {modifier} sur {way_name}",
                        destination: "Tourner {modifier} en direction de {destination}"
                    },
                    straight: {
                        default: "Continuer tout droit",
                        name: "Continuer tout droit sur {way_name}",
                        destination: "Continuer tout droit en direction de {destination}"
                    },
                    uturn: {
                        default: "Faire demi-tour à la fin de la route",
                        name: "Faire demi-tour à la fin de la route {way_name}",
                        destination: "Faire demi-tour à la fin de la route en direction de {destination}"
                    }
                },
                fork: {
                    default: {
                        default: "Rester {modifier} à l'embranchement",
                        name: "Rester {modifier} à l'embranchement sur {way_name}",
                        destination: "Rester {modifier} à l'embranchement en direction de {destination}"
                    },
                    "slight left": {
                        default: "Rester à gauche à l'embranchement",
                        name: "Rester à gauche à l'embranchement sur {way_name}",
                        destination: "Rester à gauche à l'embranchement en direction de {destination}"
                    },
                    "slight right": {
                        default: "Rester à droite à l'embranchement",
                        name: "Rester à droite à l'embranchement sur {way_name}",
                        destination: "Rester à droite à l'embranchement en direction de {destination}"
                    },
                    "sharp left": {
                        default: "Prendre à gauche à l'embranchement",
                        name: "Prendre à gauche à l'embranchement sur {way_name}",
                        destination: "Prendre à gauche à l'embranchement en direction de {destination}"
                    },
                    "sharp right": {
                        default: "Prendre à droite à l'embranchement",
                        name: "Prendre à droite à l'embranchement sur {way_name}",
                        destination: "Prendre à droite à l'embranchement en direction de {destination}"
                    },
                    uturn: {
                        default: "Faire demi-tour",
                        name: "Faire demi-tour sur {way_name}",
                        destination: "Faire demi-tour en direction de {destination}"
                    }
                },
                merge: {
                    default: {
                        default: "Rejoindre {modifier}",
                        name: "Rejoindre {modifier} sur {way_name}",
                        destination: "Rejoindre {modifier} en direction de {destination}"
                    },
                    "slight left": {
                        default: "Rejoindre légèrement par la gauche",
                        name: "Rejoindre {way_name} légèrement par la gauche",
                        destination: "Rejoindre légèrement par la gauche la route en direction de {destination}"
                    },
                    "slight right": {
                        default: "Rejoindre légèrement par la droite",
                        name: "Rejoindre {way_name} légèrement par la droite",
                        destination: "Rejoindre légèrement par la droite la route en direction de {destination}"
                    },
                    "sharp left": {
                        default: "Rejoindre par la gauche",
                        name: "Rejoindre {way_name} par la gauche",
                        destination: "Rejoindre par la gauche la route en direction de {destination}"
                    },
                    "sharp right": {
                        default: "Rejoindre par la droite",
                        name: "Rejoindre {way_name} par la droite",
                        destination: "Rejoindre par la droite la route en direction de {destination}"
                    },
                    uturn: {
                        default: "Fair demi-tour",
                        name: "Fair demi-tour sur {way_name}",
                        destination: "Fair demi-tour en direction de {destination}"
                    }
                },
                "new name": {
                    default: {
                        default: "Continuer {modifier}",
                        name: "Continuer {modifier} sur {way_name}",
                        destination: "Continuer {modifier} en direction de {destination}"
                    },
                    "sharp left": {
                        default: "Prendre à gauche",
                        name: "Prendre à gauche sur {way_name}",
                        destination: "Prendre à gauche en direction de {destination}"
                    },
                    "sharp right": {
                        default: "Prendre à droite",
                        name: "Prendre à droite sur {way_name}",
                        destination: "Prendre à droite en direction de {destination}"
                    },
                    "slight left": {
                        default: "Continuer légèrement à gauche",
                        name: "Continuer légèrement à gauche sur {way_name}",
                        destination: "Continuer légèrement à gauche en direction de {destination}"
                    },
                    "slight right": {
                        default: "Continuer légèrement à droite",
                        name: "Continuer légèrement à droite sur {way_name}",
                        destination: "Continuer légèrement à droite en direction de {destination}"
                    },
                    uturn: {
                        default: "Fair demi-tour",
                        name: "Fair demi-tour sur {way_name}",
                        destination: "Fair demi-tour en direction de {destination}"
                    }
                },
                notification: {
                    default: {
                        default: "Continuer {modifier}",
                        name: "Continuer {modifier} sur {way_name}",
                        destination: "Continuer {modifier} en direction de {destination}"
                    },
                    uturn: {
                        default: "Fair demi-tour",
                        name: "Fair demi-tour sur {way_name}",
                        destination: "Fair demi-tour en direction de {destination}"
                    }
                },
                "off ramp": {
                    default: {
                        default: "Prendre la sortie",
                        name: "Prendre la sortie sur {way_name}",
                        destination: "Prendre la sortie en direction de {destination}"
                    },
                    left: {
                        default: "Prendre la sortie à gauche",
                        name: "Prendre la sortie à gauche sur {way_name}",
                        destination: "Prendre la sortie à gauche en direction de {destination}"
                    },
                    right: {
                        default: "Prendre la sortie à droite",
                        name: "Prendre la sortie à droite sur {way_name}",
                        destination: "Prendre la sortie à droite en direction de {destination}"
                    },
                    "sharp left": {
                        default: "Prendre la sortie à gauche",
                        name: "Prendre la sortie à gauche sur {way_name}",
                        destination: "Prendre la sortie à gauche en direction de {destination}"
                    },
                    "sharp right": {
                        default: "Prendre la sortie à droite",
                        name: "Prendre la sortie à droite sur {way_name}",
                        destination: "Prendre la sortie à droite en direction de {destination}"
                    },
                    "slight left": {
                        default: "Prendre la sortie à gauche",
                        name: "Prendre la sortie à gauche sur {way_name}",
                        destination: "Prendre la sortie à gauche en direction de {destination}"
                    },
                    "slight right": {
                        default: "Prendre la sortie à droite",
                        name: "Prendre la sortie à droite sur {way_name}",
                        destination: "Prendre la sortie à droite en direction de {destination}"
                    }
                },
                "on ramp": {
                    default: {
                        default: "Prendre la sortie",
                        name: "Prendre la sortie sur {way_name}",
                        destination: "Prendre la sortie en direction de {destination}"
                    },
                    left: {
                        default: "Prendre la sortie à gauche",
                        name: "Prendre la sortie à gauche sur {way_name}",
                        destination: "Prendre la sortie à gauche en direction de {destination}"
                    },
                    right: {
                        default: "Prendre la sortie à droite",
                        name: "Prendre la sortie à droite sur {way_name}",
                        destination: "Prendre la sortie à droite en direction de {destination}"
                    },
                    "sharp left": {
                        default: "Prendre la sortie à gauche",
                        name: "Prendre la sortie à gauche sur {way_name}",
                        destination: "Prendre la sortie à gauche en direction de {destination}"
                    },
                    "sharp right": {
                        default: "Prendre la sortie à droite",
                        name: "Prendre la sortie à droite sur {way_name}",
                        destination: "Prendre la sortie à droite en direction de {destination}"
                    },
                    "slight left": {
                        default: "Prendre la sortie à gauche",
                        name: "Prendre la sortie à gauche sur {way_name}",
                        destination: "Prendre la sortie à gauche en direction de {destination}"
                    },
                    "slight right": {
                        default: "Prendre la sortie à droite",
                        name: "Prendre la sortie à droite sur {way_name}",
                        destination: "Prendre la sortie à droite en direction de {destination}"
                    }
                },
                rotary: {
                    default: {
                        default: {
                            default: "Entrer dans le rond-point",
                            name: "Entrer dans le rond-point et sortir par {way_name}",
                            destination: "Entrer dans le rond-point et sortir en direction de {destination}"
                        },
                        name: {
                            default: "Entrer dans le rond-point {rotary_name}",
                            name: "Entrer dans le rond-point {rotary_name} et sortir par {way_name}",
                            destination: "Entrer dans le rond-point {rotary_name} et sortir en direction de {destination}"
                        },
                        exit: {
                            default: "Entrer dans le rond-point et prendre la {exit_number} sortie",
                            name: "Entrer dans le rond-point et prendre la {exit_number} sortie sur {way_name}",
                            destination: "Entrer dans le rond-point et prendre la {exit_number} sortie en direction de {destination}"
                        },
                        name_exit: {
                            default: "Entrer dans le rond-point {rotary_name} et prendre la {exit_number} sortie",
                            name: "Entrer dans le rond-point {rotary_name} et prendre la {exit_number} sortie sur {way_name}",
                            destination: "Entrer dans le rond-point {rotary_name} et prendre la {exit_number} sortie en direction de {destination}"
                        }
                    }
                },
                roundabout: {
                    default: {
                        exit: {
                            default: "Entrer dans le rond-point et prendre la {exit_number} sortie",
                            name: "Entrer dans le rond-point et prendre la {exit_number} sortie sur {way_name}",
                            destination: "Entrer dans le rond-point et prendre la {exit_number} sortie en direction de {destination}"
                        },
                        default: {
                            default: "Entrer dans le rond-point",
                            name: "Entrer dans le rond-point et sortir par {way_name}",
                            destination: "Entrer dans le rond-point et sortir en direction de {destination}"
                        }
                    }
                },
                "roundabout turn": {
                    default: {
                        default: "Au rond-point, tourner {modifier}",
                        name: "Au rond-point, tourner {modifier} sur {way_name}",
                        destination: "Au rond-point, tourner {modifier} en direction de {destination}"
                    },
                    left: {
                        default: "Au rond-point, tourner à gauche",
                        name: "Au rond-point, tourner à gauche sur {way_name}",
                        destination: "Au rond-point, tourner à gauche en direction de {destination}"
                    },
                    right: {
                        default: "Au rond-point, tourner à droite",
                        name: "Au rond-point, tourner à droite sur {way_name}",
                        destination: "Au rond-point, tourner à droite en direction de {destination}"
                    },
                    straight: {
                        default: "Au rond-point, continuer tout droit",
                        name: "Au rond-point, continuer tout droit sur {way_name}",
                        destination: "Au rond-point, continuer tout droit en direction de {destination}"
                    }
                },
                turn: {
                    default: {
                        default: "Tourner {modifier}",
                        name: "Tourner {modifier} sur {way_name}",
                        destination: "Tourner {modifier} en direction de {destination}"
                    },
                    left: {
                        default: "Tourner à gauche",
                        name: "Tourner à gauche sur {way_name}",
                        destination: "Tourner à gauche en direction de {destination}"
                    },
                    right: {
                        default: "Tourner à droite",
                        name: "Tourner à droite sur {way_name}",
                        destination: "Tourner à droite en direction de {destination}"
                    },
                    straight: {
                        default: "Aller tout droit",
                        name: "Aller tout droit sur {way_name}",
                        destination: "Aller tout droit en direction de {destination}"
                    }
                },
                "use lane": {
                    no_lanes: {
                        default: "Continuer tout droit"
                    },
                    default: {
                        default: "{lane_instruction} pour continuer {modifier}"
                    },
                    straight: {
                        default: "{lane_instruction}"
                    },
                    left: {
                        default: "{lane_instruction} pour tourner à gauche"
                    },
                    right: {
                        default: "{lane_instruction} pour tourner à droite"
                    }
                }
            }
        };
    }, {} ],
    7: [ function(a, b, c) {
        b.exports = {
            meta: {
                capitalizeFirstLetter: !0
            },
            v5: {
                constants: {
                    ordinalize: {
                        "1": "eerste",
                        "2": "tweede",
                        "3": "derde",
                        "4": "vierde",
                        "5": "vijfde",
                        "6": "zesde",
                        "7": "zevende",
                        "8": "achtste",
                        "9": "negende",
                        "10": "tiende"
                    },
                    direction: {
                        north: "noord",
                        northeast: "noordoost",
                        east: "oost",
                        southeast: "zuidoost",
                        south: "zuid",
                        southwest: "zuidwest",
                        west: "west",
                        northwest: "noordwest"
                    },
                    modifier: {
                        left: "links",
                        right: "rechts",
                        "sharp left": "linksaf",
                        "sharp right": "rechtsaf",
                        "slight left": "links",
                        "slight right": "rechts",
                        straight: "rechtdoor",
                        uturn: "omkeren"
                    },
                    lanes: {
                        xo: "Rechts aanhouden",
                        ox: "Links aanhouden",
                        xox: "In het midden blijven",
                        oxo: "Links of rechts blijven"
                    }
                },
                modes: {
                    ferry: {
                        default: "Neem het veer",
                        name: "Neem het veer {way_name}",
                        destination: "Neem het veer naar {destination}"
                    }
                },
                arrive: {
                    default: {
                        default: "Je bent gearriveerd op de {nth} bestemming."
                    },
                    left: {
                        default: "Je bent gearriveerd. De {nth} bestemming bevindt zich links."
                    },
                    right: {
                        default: "Je bent gearriveerd. De {nth} bestemming bevindt zich rechts."
                    },
                    "sharp left": {
                        default: "Je bent gearriveerd. De {nth} bestemming bevindt zich links."
                    },
                    "sharp right": {
                        default: "Je bent gearriveerd. De {nth} bestemming bevindt zich rechts."
                    },
                    "slight right": {
                        default: "Je bent gearriveerd. De {nth} bestemming bevindt zich rechts."
                    },
                    "slight left": {
                        default: "Je bent gearriveerd. De {nth} bestemming bevindt zich links."
                    },
                    straight: {
                        default: "Je bent gearriveerd. De {nth} bestemming bevindt zich voor je."
                    }
                },
                continue: {
                    default: {
                        default: "Ga {modifier}",
                        name: "Ga {modifier} naar {way_name}",
                        destination: "Ga {modifier} richting {destination}"
                    },
                    "slight left": {
                        default: "Links aanhouden",
                        name: "Links aanhouden naar {way_name}",
                        destination: "Links aanhouden richting {destination}"
                    },
                    "slight right": {
                        default: "Rechts aanhouden",
                        name: "Rechts aanhouden naar {way_name}",
                        destination: "Rechts aanhouden richting {destination}"
                    },
                    uturn: {
                        default: "Keer om",
                        name: "Keer om naar {way_name}",
                        destination: "Keer om richting {destination}"
                    }
                },
                depart: {
                    default: {
                        default: "Vertrek in {direction}elijke richting",
                        name: "Neem {way_name} in {direction}elijke richting"
                    }
                },
                "end of road": {
                    default: {
                        default: "Ga {modifier}",
                        name: "Ga {modifier} naar {way_name}",
                        destination: "Ga {modifier} richting {destination}"
                    },
                    straight: {
                        default: "Ga in de aangegeven richting",
                        name: "Ga naar {way_name}",
                        destination: "Ga richting {destination}"
                    },
                    uturn: {
                        default: "Keer om",
                        name: "Keer om naar {way_name}",
                        destination: "Keer om richting {destination}"
                    }
                },
                fork: {
                    default: {
                        default: "Ga {modifier} op de splitsing",
                        name: "Ga {modifier} op de splitsing naar {way_name}",
                        destination: "Ga {modifier} op de splitsing richting {destination}"
                    },
                    "slight left": {
                        default: "Links aanhouden op de splitsing",
                        name: "Links aanhouden op de splitsing naar {way_name}",
                        destination: "Links aanhouden op de splitsing richting {destination}"
                    },
                    "slight right": {
                        default: "Rechts aanhouden op de splitsing",
                        name: "Rechts aanhouden op de splitsing naar {way_name}",
                        destination: "Rechts aanhouden op de splitsing richting {destination}"
                    },
                    "sharp left": {
                        default: "Linksaf op de splitsing",
                        name: "Linksaf op de splitsing naar {way_name}",
                        destination: "Linksaf op de splitsing richting {destination}"
                    },
                    "sharp right": {
                        default: "Rechtsaf op de splitsing",
                        name: "Rechtsaf op de splitsing naar {way_name}",
                        destination: "Rechtsaf op de splitsing richting {destination}"
                    },
                    uturn: {
                        default: "Keer om",
                        name: "Keer om naar {way_name}",
                        destination: "Keer om richting {destination}"
                    }
                },
                merge: {
                    default: {
                        default: "Bij de splitsing {modifier}",
                        name: "Bij de splitsing {modifier} naar {way_name}",
                        destination: "Bij de splitsing {modifier} richting {destination}"
                    },
                    "slight left": {
                        default: "Bij de splitsing links aanhouden",
                        name: "Bij de splitsing links aanhouden naar {way_name}",
                        destination: "Bij de splitsing links aanhouden richting {destination}"
                    },
                    "slight right": {
                        default: "Bij de splitsing rechts aanhouden",
                        name: "Bij de splitsing rechts aanhouden naar {way_name}",
                        destination: "Bij de splitsing rechts aanhouden richting {destination}"
                    },
                    "sharp left": {
                        default: "Bij de splitsing linksaf",
                        name: "Bij de splitsing linksaf naar {way_name}",
                        destination: "Bij de splitsing linksaf richting {destination}"
                    },
                    "sharp right": {
                        default: "Bij de splitsing rechtsaf",
                        name: "Bij de splitsing rechtsaf naar {way_name}",
                        destination: "Bij de splitsing rechtsaf richting {destination}"
                    },
                    uturn: {
                        default: "Keer om",
                        name: "Keer om naar {way_name}",
                        destination: "Keer om richting {destination}"
                    }
                },
                "new name": {
                    default: {
                        default: "Ga {modifier}",
                        name: "Ga {modifier} naar {way_name}",
                        destination: "Ga {modifier} richting {destination}"
                    },
                    "sharp left": {
                        default: "Linksaf",
                        name: "Linksaf naar {way_name}",
                        destination: "Linksaf richting {destination}"
                    },
                    "sharp right": {
                        default: "Rechtsaf",
                        name: "Rechtsaf naar {way_name}",
                        destination: "Rechtsaf richting {destination}"
                    },
                    "slight left": {
                        default: "Links aanhouden",
                        name: "Links aanhouden naar {way_name}",
                        destination: "Links aanhouden richting {destination}"
                    },
                    "slight right": {
                        default: "Rechts aanhouden",
                        name: "Rechts aanhouden naar {way_name}",
                        destination: "Rechts aanhouden richting {destination}"
                    },
                    uturn: {
                        default: "Keer om",
                        name: "Keer om naar {way_name}",
                        destination: "Keer om richting {destination}"
                    }
                },
                notification: {
                    default: {
                        default: "Ga {modifier}",
                        name: "Ga {modifier} naar {way_name}",
                        destination: "Ga {modifier} richting {destination}"
                    },
                    uturn: {
                        default: "Keer om",
                        name: "Keer om naar {way_name}",
                        destination: "Keer om richting {destination}"
                    }
                },
                "off ramp": {
                    default: {
                        default: "Neem de afrit",
                        name: "Neem de afrit naar {way_name}",
                        destination: "Neem de afrit richting {destination}"
                    },
                    left: {
                        default: "Neem de afrit links",
                        name: "Neem de afrit links naar {way_name}",
                        destination: "Neem de afrit links richting {destination}"
                    },
                    right: {
                        default: "Neem de afrit rechts",
                        name: "Neem de afrit rechts naar {way_name}",
                        destination: "Neem de afrit rechts richting {destination}"
                    },
                    "sharp left": {
                        default: "Neem de afrit links",
                        name: "Neem de afrit links naar {way_name}",
                        destination: "Neem de afrit links richting {destination}"
                    },
                    "sharp right": {
                        default: "Neem de afrit rechts",
                        name: "Neem de afrit rechts naar {way_name}",
                        destination: "Neem de afrit rechts richting {destination}"
                    },
                    "slight left": {
                        default: "Neem de afrit links",
                        name: "Neem de afrit links naar {way_name}",
                        destination: "Neem de afrit links richting {destination}"
                    },
                    "slight right": {
                        default: "Neem de afrit rechts",
                        name: "Neem de afrit rechts naar {way_name}",
                        destination: "Neem de afrit rechts richting {destination}"
                    }
                },
                "on ramp": {
                    default: {
                        default: "Neem de oprit",
                        name: "Neem de oprit naar {way_name}",
                        destination: "Neem de oprit richting {destination}"
                    },
                    left: {
                        default: "Neem de oprit links",
                        name: "Neem de oprit links naar {way_name}",
                        destination: "Neem de oprit links richting {destination}"
                    },
                    right: {
                        default: "Neem de oprit rechts",
                        name: "Neem de oprit rechts naar {way_name}",
                        destination: "Neem de oprit rechts richting {destination}"
                    },
                    "sharp left": {
                        default: "Neem de oprit links",
                        name: "Neem de oprit links naar {way_name}",
                        destination: "Neem de oprit links richting {destination}"
                    },
                    "sharp right": {
                        default: "Neem de oprit rechts",
                        name: "Neem de oprit rechts naar {way_name}",
                        destination: "Neem de oprit rechts richting {destination}"
                    },
                    "slight left": {
                        default: "Neem de oprit links",
                        name: "Neem de oprit links naar {way_name}",
                        destination: "Neem de oprit links richting {destination}"
                    },
                    "slight right": {
                        default: "Neem de oprit rechts",
                        name: "Neem de oprit rechts naar {way_name}",
                        destination: "Neem de oprit rechts richting {destination}"
                    }
                },
                rotary: {
                    default: {
                        default: {
                            default: "Ga het knooppunt op",
                            name: "Verlaat het knooppunt naar {way_name}",
                            destination: "Verlaat het knooppunt richting {destination}"
                        },
                        name: {
                            default: "Ga het knooppunt {rotary_name} op",
                            name: "Verlaat het knooppunt {rotary_name} naar {way_name}",
                            destination: "Verlaat het knooppunt {rotary_name} richting {destination}"
                        },
                        exit: {
                            default: "Ga het knooppunt op en neem afslag {exit_number}",
                            name: "Ga het knooppunt op en neem afslag {exit_number} naar {way_name}",
                            destination: "Ga het knooppunt op en neem afslag {exit_number} richting {destination}"
                        },
                        name_exit: {
                            default: "Ga het knooppunt {rotary_name} op en neem afslag {exit_number}",
                            name: "Ga het knooppunt {rotary_name} op en neem afslag {exit_number} naar {way_name}",
                            destination: "Ga het knooppunt {rotary_name} op en neem afslag {exit_number} richting {destination}"
                        }
                    }
                },
                roundabout: {
                    default: {
                        exit: {
                            default: "Ga de rotonde op en neem afslag {exit_number}",
                            name: "Ga de rotonde op en neem afslag {exit_number} naar {way_name}",
                            destination: "Ga de rotonde op en neem afslag {exit_number} richting {destination}"
                        },
                        default: {
                            default: "Ga de rotonde op",
                            name: "Verlaat de rotonde naar {way_name}",
                            destination: "Verlaat de rotonde richting {destination}"
                        }
                    }
                },
                "roundabout turn": {
                    default: {
                        default: "Ga {modifier} op de rotonde",
                        name: "Ga {modifier} op de rotonde naar {way_name}",
                        destination: "Ga {modifier} op de rotonde richting {destination}"
                    },
                    left: {
                        default: "Ga links op de rotonde",
                        name: "Ga links op de rotonde naar {way_name}",
                        destination: "Ga links op de rotonde richting {destination}"
                    },
                    right: {
                        default: "Ga rechts op de rotonde",
                        name: "Ga rechts op de rotonde naar {way_name}",
                        destination: "Ga rechts op de rotonde richting {destination}"
                    },
                    straight: {
                        default: "Rechtdoor op de rotonde",
                        name: "Rechtdoor op de rotonde naar {way_name}",
                        destination: "Rechtdoor op de rotonde richting {destination}"
                    }
                },
                turn: {
                    default: {
                        default: "Ga {modifier}",
                        name: "Ga {modifier} naar {way_name}",
                        destination: "Ga {modifier} richting {destination}"
                    },
                    left: {
                        default: "Ga linksaf",
                        name: "Ga linksaf naar {way_name}",
                        destination: "Ga linksaf richting {destination}"
                    },
                    right: {
                        default: "Ga rechtsaf",
                        name: "Ga rechtsaf naar {way_name}",
                        destination: "Ga rechtsaf richting {destination}"
                    },
                    straight: {
                        default: "Ga rechtdoor",
                        name: "Ga rechtdoor naar {way_name}",
                        destination: "Ga rechtdoor richting {destination}"
                    }
                },
                "use lane": {
                    no_lanes: {
                        default: "Rechtdoor"
                    },
                    default: {
                        default: "{lane_instruction} ga {modifier}"
                    },
                    straight: {
                        default: "{lane_instruction}"
                    },
                    left: {
                        default: "{lane_instruction} om links te gaan"
                    },
                    right: {
                        default: "{lane_instruction} om rechts te gaan"
                    }
                }
            }
        };
    }, {} ],
    8: [ function(a, b, c) {
        b.exports = {
            meta: {
                capitalizeFirstLetter: !1
            },
            v5: {
                constants: {
                    ordinalize: {
                        "1": "第一",
                        "2": "第二",
                        "3": "第三",
                        "4": "第四",
                        "5": "第五",
                        "6": "第六",
                        "7": "第七",
                        "8": "第八",
                        "9": "第九",
                        "10": "第十"
                    },
                    direction: {
                        north: "北",
                        northeast: "东北",
                        east: "东",
                        southeast: "东南",
                        south: "南",
                        southwest: "西南",
                        west: "西",
                        northwest: "西北"
                    },
                    modifier: {
                        left: "向左",
                        right: "向右",
                        "sharp left": "向左",
                        "sharp right": "向右",
                        "slight left": "向左",
                        "slight right": "向右",
                        straight: "直行",
                        uturn: "调头"
                    },
                    lanes: {
                        xo: "靠右直行",
                        ox: "靠左直行",
                        xox: "保持在道路中间直行",
                        oxo: "保持在道路两侧直行"
                    }
                },
                modes: {
                    ferry: {
                        default: "乘坐轮渡",
                        name: "乘坐{way_name}轮渡",
                        destination: "乘坐开往{destination}的轮渡"
                    }
                },
                arrive: {
                    default: {
                        default: "您已经到达您的{nth}个目的地"
                    },
                    left: {
                        default: "您已经到达您的{nth}个目的地，在道路左侧"
                    },
                    right: {
                        default: "您已经到达您的{nth}个目的地，在道路右侧"
                    },
                    "sharp left": {
                        default: "您已经到达您的{nth}个目的地，在道路左侧"
                    },
                    "sharp right": {
                        default: "您已经到达您的{nth}个目的地，在道路右侧"
                    },
                    "slight right": {
                        default: "您已经到达您的{nth}个目的地，在道路右侧"
                    },
                    "slight left": {
                        default: "您已经到达您的{nth}个目的地，在道路左侧"
                    },
                    straight: {
                        default: "您已经到达您的{nth}个目的地，在您正前方"
                    }
                },
                continue: {
                    default: {
                        default: "继续{modifier}",
                        name: "继续{modifier}，上{way_name}",
                        destination: "继续{modifier}行驶，前往{destination}"
                    },
                    uturn: {
                        default: "调头",
                        name: "调头上{way_name}",
                        destination: "调头后前往{destination}"
                    }
                },
                depart: {
                    default: {
                        default: "出发向{direction}",
                        name: "出发向{direction}，上{way_name}"
                    }
                },
                "end of road": {
                    default: {
                        default: "{modifier}行驶",
                        name: "{modifier}行驶，上{way_name}",
                        destination: "{modifier}行驶，前往{destination}"
                    },
                    straight: {
                        default: "继续直行",
                        name: "继续直行，上{way_name}",
                        destination: "继续直行，前往{destination}"
                    },
                    uturn: {
                        default: "在道路尽头调头",
                        name: "在道路尽头调头上{way_name}",
                        destination: "在道路尽头调头，前往{destination}"
                    }
                },
                fork: {
                    default: {
                        default: "在岔道保持{modifier}",
                        name: "在岔道保持{modifier}，上{way_name}",
                        destination: "在岔道保持{modifier}，前往{destination}"
                    },
                    uturn: {
                        default: "调头",
                        name: "调头，上{way_name}",
                        destination: "调头，前往{destination}"
                    }
                },
                merge: {
                    default: {
                        default: "{modifier}并道",
                        name: "{modifier}并道，上{way_name}",
                        destination: "{modifier}并道，前往{destination}"
                    },
                    uturn: {
                        default: "调头",
                        name: "调头，上{way_name}",
                        destination: "调头，前往{destination}"
                    }
                },
                "new name": {
                    default: {
                        default: "继续{modifier}",
                        name: "继续{modifier}，上{way_name}",
                        destination: "继续{modifier}，前往{destination}"
                    },
                    uturn: {
                        default: "调头",
                        name: "调头，上{way_name}",
                        destination: "调头，前往{destination}"
                    }
                },
                notification: {
                    default: {
                        default: "继续{modifier}",
                        name: "继续{modifier}，上{way_name}",
                        destination: "继续{modifier}，前往{destination}"
                    },
                    uturn: {
                        default: "调头",
                        name: "调头，上{way_name}",
                        destination: "调头，前往{destination}"
                    }
                },
                "off ramp": {
                    default: {
                        default: "上匝道",
                        name: "通过匝道驶入{way_name}",
                        destination: "通过匝道前往{destination}"
                    },
                    left: {
                        default: "通过左边的匝道",
                        name: "通过左边的匝道驶入{way_name}",
                        destination: "通过左边的匝道前往{destination}"
                    },
                    right: {
                        default: "通过右边的匝道",
                        name: "通过右边的匝道驶入{way_name}",
                        destination: "通过右边的匝道前往{destination}"
                    }
                },
                "on ramp": {
                    default: {
                        default: "通过匝道",
                        name: "通过匝道驶入{way_name}",
                        destination: "通过匝道前往{destination}"
                    },
                    left: {
                        default: "通过左边的匝道",
                        name: "通过左边的匝道驶入{way_name}",
                        destination: "通过左边的匝道前往{destination}"
                    },
                    right: {
                        default: "通过右边的匝道",
                        name: "通过右边的匝道驶入{way_name}",
                        destination: "通过右边的匝道前往{destination}"
                    }
                },
                rotary: {
                    default: {
                        default: {
                            default: "进入环岛",
                            name: "通过环岛后驶入{way_name}",
                            destination: "通过环岛前往{destination}"
                        },
                        name: {
                            default: "进入{rotary_name}环岛",
                            name: "通过{rotary_name}环岛后驶入{way_name}",
                            destination: "通过{rotary_name}环岛后前往{destination}"
                        },
                        exit: {
                            default: "进入环岛并从{exit_number}出口驶出",
                            name: "进入环岛后从{exit_number}出口驶出进入{way_name}",
                            destination: "进入环岛后从{exit_number}出口驶出前往{destination}"
                        },
                        name_exit: {
                            default: "进入{rotary_name}环岛后从{exit_number}出口驶出",
                            name: "进入{rotary_name}环岛后从{exit_number}出口驶出进入{way_name}",
                            destination: "进入{rotary_name}环岛后从{exit_number}出口驶出前往{destination}"
                        }
                    }
                },
                roundabout: {
                    default: {
                        exit: {
                            default: "进入环岛后从{exit_number}出口驶出",
                            name: "进入环岛后从{exit_number}出口驶出前往{way_name}",
                            destination: "进入环岛后从{exit_number}出口驶出前往{destination}"
                        },
                        default: {
                            default: "进入环岛",
                            name: "通过环岛后驶入{way_name}",
                            destination: "通过环岛后前往{destination}"
                        }
                    }
                },
                "roundabout turn": {
                    default: {
                        default: "在环岛{modifier}行驶",
                        name: "在环岛{modifier}行驶，上{way_name}",
                        destination: "在环岛{modifier}行驶，前往{destination}"
                    },
                    left: {
                        default: "在环岛左转",
                        name: "在环岛左转，上{way_name}",
                        destination: "在环岛左转，前往{destination}"
                    },
                    right: {
                        default: "在环岛右转",
                        name: "在环岛右转，上{way_name}",
                        destination: "在环岛右转，前往{destination}"
                    },
                    straight: {
                        default: "在环岛继续直行",
                        name: "在环岛继续直行，上{way_name}",
                        destination: "在环岛继续直行，前往{destination}"
                    }
                },
                turn: {
                    default: {
                        default: "{modifier}转弯",
                        name: "{modifier}转弯，上{way_name}",
                        destination: "{modifier}转弯，前往{destination}"
                    },
                    left: {
                        default: "左转",
                        name: "左转，上{way_name}",
                        destination: "左转，前往{destination}"
                    },
                    right: {
                        default: "右转",
                        name: "右转，上{way_name}",
                        destination: "右转，前往{destination}"
                    },
                    straight: {
                        default: "直行",
                        name: "直行，上{way_name}",
                        destination: "直行，前往{destination}"
                    }
                },
                "use lane": {
                    no_lanes: {
                        default: "继续直行"
                    },
                    default: {
                        default: "{lane_instruction}然后{modifier}"
                    },
                    straight: {
                        default: "{lane_instruction}"
                    },
                    left: {
                        default: "{lane_instruction}然后左转"
                    },
                    right: {
                        default: "{lane_instruction}然后右转"
                    }
                }
            }
        };
    }, {} ],
    9: [ function(a, b, c) {
        function d(a, b) {
            a = Math.round(a * b), (a <<= 1) < 0 && (a = ~a);
            for (var c = ""; a >= 32; ) c += String.fromCharCode(63 + (32 | 31 & a)), a >>= 5;
            return c += String.fromCharCode(a + 63);
        }
        function e(a) {
            for (var b = [], c = 0; c < a.length; c++) b.push(a[c].slice().reverse());
            return b;
        }
        var f = {};
        f.decode = function(a, b) {
            for (var c, d, e = 0, f = 0, g = 0, h = [], i = 0, j = 0, k = null, l = Math.pow(10, b || 5); e < a.length; ) {
                k = null, i = 0, j = 0;
                do {
                    k = a.charCodeAt(e++) - 63, j |= (31 & k) << i, i += 5;
                } while (k >= 32);
                c = 1 & j ? ~(j >> 1) : j >> 1, i = j = 0;
                do {
                    k = a.charCodeAt(e++) - 63, j |= (31 & k) << i, i += 5;
                } while (k >= 32);
                d = 1 & j ? ~(j >> 1) : j >> 1, f += c, g += d, h.push([ f / l, g / l ]);
            }
            return h;
        }, f.encode = function(a, b) {
            if (!a.length) return "";
            for (var c = Math.pow(10, b || 5), e = d(a[0][0], c) + d(a[0][1], c), f = 1; f < a.length; f++) {
                var g = a[f], h = a[f - 1];
                e += d(g[0] - h[0], c), e += d(g[1] - h[1], c);
            }
            return e;
        }, f.fromGeoJSON = function(a, b) {
            if (a && "Feature" === a.type && (a = a.geometry), !a || "LineString" !== a.type) throw new Error("Input must be a GeoJSON LineString");
            return f.encode(e(a.coordinates), b);
        }, f.toGeoJSON = function(a, b) {
            return {
                type: "LineString",
                coordinates: e(f.decode(a, b))
            };
        }, "object" == typeof b && b.exports && (b.exports = f);
    }, {} ],
    10: [ function(a, b, c) {
        (function(a) {
            !function() {
                var c = "undefined" != typeof window ? window.L : void 0 !== a ? a.L : null;
                b.exports = c.Class.extend({
                    options: {
                        timeout: 500,
                        blurTimeout: 100,
                        noResultsMessage: "No results found."
                    },
                    initialize: function(a, b, d, e) {
                        c.setOptions(this, e), this._elem = a, this._resultFn = e.resultFn ? c.Util.bind(e.resultFn, e.resultContext) : null, 
                        this._autocomplete = e.autocompleteFn ? c.Util.bind(e.autocompleteFn, e.autocompleteContext) : null, 
                        this._selectFn = c.Util.bind(b, d), this._container = c.DomUtil.create("div", "leaflet-routing-geocoder-result"), 
                        this._resultTable = c.DomUtil.create("table", "", this._container), c.DomEvent.addListener(this._elem, "input", this._keyPressed, this), 
                        c.DomEvent.addListener(this._elem, "keypress", this._keyPressed, this), c.DomEvent.addListener(this._elem, "keydown", this._keyDown, this), 
                        c.DomEvent.addListener(this._elem, "blur", function() {
                            this._isOpen && this.close();
                        }, this);
                    },
                    close: function() {
                        c.DomUtil.removeClass(this._container, "leaflet-routing-geocoder-result-open"), 
                        this._isOpen = !1;
                    },
                    _open: function() {
                        var a = this._elem.getBoundingClientRect();
                        if (!this._container.parentElement) {
                            var b = void 0 !== window.pageXOffset ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft, d = void 0 !== window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
                            this._container.style.left = a.left + b + "px", this._container.style.top = a.bottom + d + "px", 
                            this._container.style.width = a.right - a.left + "px", document.body.appendChild(this._container);
                        }
                        c.DomUtil.addClass(this._container, "leaflet-routing-geocoder-result-open"), this._isOpen = !0;
                    },
                    _setResults: function(a) {
                        var b, d, e, f;
                        for (delete this._selection, this._results = a; this._resultTable.firstChild; ) this._resultTable.removeChild(this._resultTable.firstChild);
                        for (b = 0; b < a.length; b++) d = c.DomUtil.create("tr", "", this._resultTable), 
                        d.setAttribute("data-result-index", b), e = c.DomUtil.create("td", "", d), f = document.createTextNode(a[b].name), 
                        e.appendChild(f), c.DomEvent.addListener(e, "mousedown", c.DomEvent.preventDefault), 
                        c.DomEvent.addListener(e, "click", this._createClickListener(a[b]));
                        b || (d = c.DomUtil.create("tr", "", this._resultTable), e = c.DomUtil.create("td", "leaflet-routing-geocoder-no-results", d), 
                        e.innerHTML = this.options.noResultsMessage), this._open(), a.length > 0 && this._select(1);
                    },
                    _createClickListener: function(a) {
                        var b = this._resultSelected(a);
                        return c.bind(function() {
                            this._elem.blur(), b();
                        }, this);
                    },
                    _resultSelected: function(a) {
                        return c.bind(function() {
                            this.close(), this._elem.value = a.name, this._lastCompletedText = a.name, this._selectFn(a);
                        }, this);
                    },
                    _keyPressed: function(a) {
                        var b;
                        return this._isOpen && 13 === a.keyCode && this._selection ? (b = parseInt(this._selection.getAttribute("data-result-index"), 10), 
                        this._resultSelected(this._results[b])(), void c.DomEvent.preventDefault(a)) : 13 === a.keyCode ? void this._complete(this._resultFn, !0) : this._autocomplete && document.activeElement === this._elem ? (this._timer && clearTimeout(this._timer), 
                        void (this._timer = setTimeout(c.Util.bind(function() {
                            this._complete(this._autocomplete);
                        }, this), this.options.timeout))) : void this._unselect();
                    },
                    _select: function(a) {
                        var b = this._selection;
                        b && (c.DomUtil.removeClass(b.firstChild, "leaflet-routing-geocoder-selected"), 
                        b = b[a > 0 ? "nextSibling" : "previousSibling"]), b || (b = this._resultTable[a > 0 ? "firstChild" : "lastChild"]), 
                        b && (c.DomUtil.addClass(b.firstChild, "leaflet-routing-geocoder-selected"), this._selection = b);
                    },
                    _unselect: function() {
                        this._selection && c.DomUtil.removeClass(this._selection.firstChild, "leaflet-routing-geocoder-selected"), 
                        delete this._selection;
                    },
                    _keyDown: function(a) {
                        if (this._isOpen) switch (a.keyCode) {
                          case 27:
                            return this.close(), void c.DomEvent.preventDefault(a);

                          case 38:
                            return this._select(-1), void c.DomEvent.preventDefault(a);

                          case 40:
                            return this._select(1), void c.DomEvent.preventDefault(a);
                        }
                    },
                    _complete: function(a, b) {
                        function c(a) {
                            this._lastCompletedText = d, b && 1 === a.length ? this._resultSelected(a[0])() : this._setResults(a);
                        }
                        var d = this._elem.value;
                        d && (d !== this._lastCompletedText ? a(d, c, this) : b && c.call(this, this._results));
                    }
                });
            }();
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {} ],
    11: [ function(a, b, c) {
        (function(c) {
            !function() {
                var d = "undefined" != typeof window ? window.L : void 0 !== c ? c.L : null, e = a("./itinerary"), f = a("./line"), g = a("./plan"), h = a("./osrm-v1");
                b.exports = e.extend({
                    options: {
                        fitSelectedRoutes: "smart",
                        routeLine: function(a, b) {
                            return new f(a, b);
                        },
                        autoRoute: !0,
                        routeWhileDragging: !1,
                        routeDragInterval: 500,
                        waypointMode: "connect",
                        showAlternatives: !1,
                        defaultErrorHandler: function(a) {
                            console.error("Routing error:", a.error);
                        }
                    },
                    initialize: function(a) {
                        d.Util.setOptions(this, a), this._router = this.options.router || new h(a), this._plan = this.options.plan || new g(this.options.waypoints, a), 
                        this._requestCount = 0, e.prototype.initialize.call(this, a), this.on("routeselected", this._routeSelected, this), 
                        this.options.defaultErrorHandler && this.on("routingerror", this.options.defaultErrorHandler), 
                        this._plan.on("waypointschanged", this._onWaypointsChanged, this), a.routeWhileDragging && this._setupRouteDragging(), 
                        this.options.autoRoute && this.route();
                    },
                    _onZoomEnd: function() {
                        if (this._selectedRoute && this._router.requiresMoreDetail) {
                            var a = this._map;
                            this._router.requiresMoreDetail(this._selectedRoute, a.getZoom(), a.getBounds()) && this.route({
                                callback: d.bind(function(a, b) {
                                    var c;
                                    if (!a) {
                                        for (c = 0; c < b.length; c++) this._routes[c].properties = b[c].properties;
                                        this._updateLineCallback(a, b);
                                    }
                                }, this),
                                simplifyGeometry: !1,
                                geometryOnly: !0
                            });
                        }
                    },
                    onAdd: function(a) {
                        var b = e.prototype.onAdd.call(this, a);
                        return this._map = a, this._map.addLayer(this._plan), this._map.on("zoomend", this._onZoomEnd, this), 
                        this._plan.options.geocoder && b.insertBefore(this._plan.createGeocoders(), b.firstChild), 
                        b;
                    },
                    onRemove: function(a) {
                        if (a.off("zoomend", this._onZoomEnd, this), this._line && a.removeLayer(this._line), 
                        a.removeLayer(this._plan), this._alternatives && this._alternatives.length > 0) for (var b = 0, c = this._alternatives.length; b < c; b++) a.removeLayer(this._alternatives[b]);
                        return e.prototype.onRemove.call(this, a);
                    },
                    getWaypoints: function() {
                        return this._plan.getWaypoints();
                    },
                    setWaypoints: function(a) {
                        return this._plan.setWaypoints(a), this;
                    },
                    spliceWaypoints: function() {
                        return this._plan.spliceWaypoints.apply(this._plan, arguments);
                    },
                    getPlan: function() {
                        return this._plan;
                    },
                    getRouter: function() {
                        return this._router;
                    },
                    _routeSelected: function(a) {
                        var b = this._selectedRoute = a.route, c = this.options.showAlternatives && a.alternatives, d = this.options.fitSelectedRoutes, e = "smart" === d && !this._waypointsVisible() || "smart" !== d && d;
                        this._updateLines({
                            route: b,
                            alternatives: c
                        }), e && this._map.fitBounds(this._line.getBounds()), "snap" === this.options.waypointMode && (this._plan.off("waypointschanged", this._onWaypointsChanged, this), 
                        this.setWaypoints(b.waypoints), this._plan.on("waypointschanged", this._onWaypointsChanged, this));
                    },
                    _waypointsVisible: function() {
                        var a, b, c, e, f, g = this.getWaypoints();
                        try {
                            for (a = this._map.getSize(), e = 0; e < g.length; e++) f = this._map.latLngToLayerPoint(g[e].latLng), 
                            b ? b.extend(f) : b = d.bounds([ f ]);
                            return c = b.getSize(), (c.x > a.x / 5 || c.y > a.y / 5) && this._waypointsInViewport();
                        } catch (a) {
                            return !1;
                        }
                    },
                    _waypointsInViewport: function() {
                        var a, b, c = this.getWaypoints();
                        try {
                            a = this._map.getBounds();
                        } catch (a) {
                            return !1;
                        }
                        for (b = 0; b < c.length; b++) if (a.contains(c[b].latLng)) return !0;
                        return !1;
                    },
                    _updateLines: function(a) {
                        var b = void 0 === this.options.addWaypoints || this.options.addWaypoints;
                        this._clearLines(), this._alternatives = [], a.alternatives && a.alternatives.forEach(function(a, b) {
                            this._alternatives[b] = this.options.routeLine(a, d.extend({
                                isAlternative: !0
                            }, this.options.altLineOptions || this.options.lineOptions)), this._alternatives[b].addTo(this._map), 
                            this._hookAltEvents(this._alternatives[b]);
                        }, this), this._line = this.options.routeLine(a.route, d.extend({
                            addWaypoints: b,
                            extendToWaypoints: "connect" === this.options.waypointMode
                        }, this.options.lineOptions)), this._line.addTo(this._map), this._hookEvents(this._line);
                    },
                    _hookEvents: function(a) {
                        a.on("linetouched", function(a) {
                            this._plan.dragNewWaypoint(a);
                        }, this);
                    },
                    _hookAltEvents: function(a) {
                        a.on("linetouched", function(a) {
                            var b = this._routes.slice(), c = b.splice(a.target._route.routesIndex, 1)[0];
                            this.fire("routeselected", {
                                route: c,
                                alternatives: b
                            });
                        }, this);
                    },
                    _onWaypointsChanged: function(a) {
                        this.options.autoRoute && this.route({}), this._plan.isReady() || (this._clearLines(), 
                        this._clearAlts()), this.fire("waypointschanged", {
                            waypoints: a.waypoints
                        });
                    },
                    _setupRouteDragging: function() {
                        var a, b = 0;
                        this._plan.on("waypointdrag", d.bind(function(c) {
                            a = c.waypoints, b || (b = setTimeout(d.bind(function() {
                                this.route({
                                    waypoints: a,
                                    geometryOnly: !0,
                                    callback: d.bind(this._updateLineCallback, this)
                                }), b = void 0;
                            }, this), this.options.routeDragInterval));
                        }, this)), this._plan.on("waypointdragend", function() {
                            b && (clearTimeout(b), b = void 0), this.route();
                        }, this);
                    },
                    _updateLineCallback: function(a, b) {
                        if (a) "abort" !== a.type && this._clearLines(); else {
                            b = b.slice();
                            var c = b.splice(this._selectedRoute.routesIndex, 1)[0];
                            this._updateLines({
                                route: c,
                                alternatives: b
                            });
                        }
                    },
                    route: function(a) {
                        var b, c = ++this._requestCount;
                        this._pendingRequest && this._pendingRequest.abort && (this._pendingRequest.abort(), 
                        this._pendingRequest = null), a = a || {}, this._plan.isReady() && (this.options.useZoomParameter && (a.z = this._map && this._map.getZoom()), 
                        b = a && a.waypoints || this._plan.getWaypoints(), this.fire("routingstart", {
                            waypoints: b
                        }), this._pendingRequest = this._router.route(b, function(d, e) {
                            if (this._pendingRequest = null, a.callback) return a.callback.call(this, d, e);
                            if (c === this._requestCount) {
                                if (this._clearLines(), this._clearAlts(), d && "abort" !== d.type) return void this.fire("routingerror", {
                                    error: d
                                });
                                if (e.forEach(function(a, b) {
                                    a.routesIndex = b;
                                }), a.geometryOnly) {
                                    var f = e.splice(0, 1)[0];
                                    this._routeSelected({
                                        route: f,
                                        alternatives: e
                                    });
                                } else this.fire("routesfound", {
                                    waypoints: b,
                                    routes: e
                                }), this.setAlternatives(e);
                            }
                        }, this, a));
                    },
                    _clearLines: function() {
                        if (this._line && (this._map.removeLayer(this._line), delete this._line), this._alternatives && this._alternatives.length) {
                            for (var a in this._alternatives) this._map.removeLayer(this._alternatives[a]);
                            this._alternatives = [];
                        }
                    }
                });
            }();
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {
        "./itinerary": 17,
        "./line": 18,
        "./osrm-v1": 21,
        "./plan": 22
    } ],
    12: [ function(a, b, c) {
        (function(a) {
            !function() {
                var c = "undefined" != typeof window ? window.L : void 0 !== a ? a.L : null;
                b.exports = c.Control.extend({
                    options: {
                        header: "Routing error",
                        formatMessage: function(a) {
                            return a.status < 0 ? "Calculating the route caused an error. Technical description follows: <code><pre>" + a.message + "</pre></code" : "The route could not be calculated. " + a.message;
                        }
                    },
                    initialize: function(a, b) {
                        c.Control.prototype.initialize.call(this, b), a.on("routingerror", c.bind(function(a) {
                            this._element && (this._element.children[1].innerHTML = this.options.formatMessage(a.error), 
                            this._element.style.visibility = "visible");
                        }, this)).on("routingstart", c.bind(function() {
                            this._element && (this._element.style.visibility = "hidden");
                        }, this));
                    },
                    onAdd: function() {
                        var a;
                        return this._element = c.DomUtil.create("div", "leaflet-bar leaflet-routing-error"), 
                        this._element.style.visibility = "hidden", a = c.DomUtil.create("h3", null, this._element), 
                        c.DomUtil.create("span", null, this._element), a.innerHTML = this.options.header, 
                        this._element;
                    },
                    onRemove: function() {
                        delete this._element;
                    }
                });
            }();
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {} ],
    13: [ function(a, b, c) {
        (function(c) {
            !function() {
                var d = "undefined" != typeof window ? window.L : void 0 !== c ? c.L : null, e = a("./localization");
                b.exports = d.Class.extend({
                    options: {
                        units: "metric",
                        unitNames: null,
                        language: "en",
                        roundingSensitivity: 1,
                        distanceTemplate: "{value} {unit}"
                    },
                    initialize: function(a) {
                        d.setOptions(this, a);
                        var b = d.Util.isArray(this.options.language) ? this.options.language : [ this.options.language, "en" ];
                        this._localization = new e(b);
                    },
                    formatDistance: function(a, b) {
                        var c, e, f, g = this.options.unitNames || this._localization.localize("units"), h = b <= 0, i = h ? function(a) {
                            return a;
                        } : d.bind(this._round, this);
                        return "imperial" === this.options.units ? (e = a / .9144, f = e >= 1e3 ? {
                            value: i(a / 1609.344, b),
                            unit: g.miles
                        } : {
                            value: i(e, b),
                            unit: g.yards
                        }) : (c = i(a, b), f = {
                            value: c >= 1e3 ? c / 1e3 : c,
                            unit: c >= 1e3 ? g.kilometers : g.meters
                        }), h && (f.value = f.value.toFixed(-b)), d.Util.template(this.options.distanceTemplate, f);
                    },
                    _round: function(a, b) {
                        var c = b || this.options.roundingSensitivity, d = Math.pow(10, (Math.floor(a / c) + "").length - 1), e = Math.floor(a / d), f = e > 5 ? d : d / 2;
                        return Math.round(a / f) * f;
                    },
                    formatTime: function(a) {
                        var b = this.options.unitNames || this._localization.localize("units");
                        return a = 30 * Math.round(a / 30), a > 86400 ? Math.round(a / 3600) + " " + b.hours : a > 3600 ? Math.floor(a / 3600) + " " + b.hours + " " + Math.round(a % 3600 / 60) + " " + b.minutes : a > 300 ? Math.round(a / 60) + " " + b.minutes : a > 60 ? Math.floor(a / 60) + " " + b.minutes + (a % 60 != 0 ? " " + a % 60 + " " + b.seconds : "") : a + " " + b.seconds;
                    },
                    formatInstruction: function(a, b) {
                        return void 0 === a.text ? this.capitalize(d.Util.template(this._getInstructionTemplate(a, b), d.extend({}, a, {
                            exitStr: a.exit ? this._localization.localize("formatOrder")(a.exit) : "",
                            dir: this._localization.localize([ "directions", a.direction ]),
                            modifier: this._localization.localize([ "directions", a.modifier ])
                        }))) : a.text;
                    },
                    getIconName: function(a, b) {
                        switch (a.type) {
                          case "Head":
                            if (0 === b) return "depart";
                            break;

                          case "WaypointReached":
                            return "via";

                          case "Roundabout":
                            return "enter-roundabout";

                          case "DestinationReached":
                            return "arrive";
                        }
                        switch (a.modifier) {
                          case "Straight":
                            return "continue";

                          case "SlightRight":
                            return "bear-right";

                          case "Right":
                            return "turn-right";

                          case "SharpRight":
                            return "sharp-right";

                          case "TurnAround":
                          case "Uturn":
                            return "u-turn";

                          case "SharpLeft":
                            return "sharp-left";

                          case "Left":
                            return "turn-left";

                          case "SlightLeft":
                            return "bear-left";
                        }
                    },
                    capitalize: function(a) {
                        return a.charAt(0).toUpperCase() + a.substring(1);
                    },
                    _getInstructionTemplate: function(a, b) {
                        var c = "Straight" === a.type ? 0 === b ? "Head" : "Continue" : a.type, d = this._localization.localize([ "instructions", c ]);
                        return d || (d = [ this._localization.localize([ "directions", c ]), " " + this._localization.localize([ "instructions", "Onto" ]) ]), 
                        d[0] + (d.length > 1 && a.road ? d[1] : "");
                    }
                });
            }();
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {
        "./localization": 19
    } ],
    14: [ function(a, b, c) {
        (function(c) {
            !function() {
                function d(a) {
                    a.setSelectionRange ? a.setSelectionRange(0, 9999) : a.select();
                }
                var e = "undefined" != typeof window ? window.L : void 0 !== c ? c.L : null, f = a("./autocomplete"), g = a("./localization");
                b.exports = e.Class.extend({
                    includes: e.Mixin.Events,
                    options: {
                        createGeocoder: function(a, b, c) {
                            var d = e.DomUtil.create("div", "leaflet-routing-geocoder"), f = e.DomUtil.create("input", "", d), g = c.addWaypoints ? e.DomUtil.create("span", "leaflet-routing-remove-waypoint", d) : void 0;
                            return f.disabled = !c.addWaypoints, {
                                container: d,
                                input: f,
                                closeButton: g
                            };
                        },
                        geocoderPlaceholder: function(a, b, c) {
                            var d = new g(c.options.language).localize("ui");
                            return 0 === a ? d.startPlaceholder : a < b - 1 ? e.Util.template(d.viaPlaceholder, {
                                viaNumber: a
                            }) : d.endPlaceholder;
                        },
                        geocoderClass: function() {
                            return "";
                        },
                        waypointNameFallback: function(a) {
                            var b = a.lat < 0 ? "S" : "N", c = a.lng < 0 ? "W" : "E";
                            return b + (Math.round(1e4 * Math.abs(a.lat)) / 1e4).toString() + ", " + c + (Math.round(1e4 * Math.abs(a.lng)) / 1e4).toString();
                        },
                        maxGeocoderTolerance: 200,
                        autocompleteOptions: {},
                        language: "en"
                    },
                    initialize: function(a, b, c, g) {
                        e.setOptions(this, g);
                        var h = this.options.createGeocoder(b, c, this.options), i = h.closeButton, j = h.input;
                        j.setAttribute("placeholder", this.options.geocoderPlaceholder(b, c, this)), j.className = this.options.geocoderClass(b, c), 
                        this._element = h, this._waypoint = a, this.update(), j.value = a.name, e.DomEvent.addListener(j, "click", function() {
                            d(this);
                        }, j), i && e.DomEvent.addListener(i, "click", function() {
                            this.fire("delete", {
                                waypoint: this._waypoint
                            });
                        }, this), new f(j, function(b) {
                            j.value = b.name, a.name = b.name, a.latLng = b.center, this.fire("geocoded", {
                                waypoint: a,
                                value: b
                            });
                        }, this, e.extend({
                            resultFn: this.options.geocoder.geocode,
                            resultContext: this.options.geocoder,
                            autocompleteFn: this.options.geocoder.suggest,
                            autocompleteContext: this.options.geocoder
                        }, this.options.autocompleteOptions));
                    },
                    getContainer: function() {
                        return this._element.container;
                    },
                    setValue: function(a) {
                        this._element.input.value = a;
                    },
                    update: function(a) {
                        var b, c = this._waypoint;
                        c.name = c.name || "", !c.latLng || !a && c.name || (b = this.options.waypointNameFallback(c.latLng), 
                        this.options.geocoder && this.options.geocoder.reverse ? this.options.geocoder.reverse(c.latLng, 67108864, function(a) {
                            a.length > 0 && a[0].center.distanceTo(c.latLng) < this.options.maxGeocoderTolerance ? c.name = a[0].name : c.name = b, 
                            this._update();
                        }, this) : (c.name = b, this._update()));
                    },
                    focus: function() {
                        var a = this._element.input;
                        a.focus(), d(a);
                    },
                    _update: function() {
                        var a = this._waypoint, b = a && a.name ? a.name : "";
                        this.setValue(b), this.fire("reversegeocoded", {
                            waypoint: a,
                            value: b
                        });
                    }
                });
            }();
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {
        "./autocomplete": 10,
        "./localization": 19
    } ],
    15: [ function(a, b, c) {
        (function(c) {
            var d = "undefined" != typeof window ? window.L : void 0 !== c ? c.L : null, e = a("./control"), f = a("./itinerary"), g = a("./line"), h = a("./osrm-v1"), i = a("./plan"), j = a("./waypoint"), k = a("./autocomplete"), l = a("./formatter"), m = a("./geocoder-element"), n = a("./localization"), o = a("./itinerary-builder"), p = a("./mapbox"), q = a("./error-control");
            d.routing = {
                control: function(a) {
                    return new e(a);
                },
                itinerary: function(a) {
                    return f(a);
                },
                line: function(a, b) {
                    return new g(a, b);
                },
                plan: function(a, b) {
                    return new i(a, b);
                },
                waypoint: function(a, b, c) {
                    return new j(a, b, c);
                },
                osrmv1: function(a) {
                    return new h(a);
                },
                localization: function(a) {
                    return new n(a);
                },
                formatter: function(a) {
                    return new l(a);
                },
                geocoderElement: function(a, b, c, e) {
                    return new d.Routing.GeocoderElement(a, b, c, e);
                },
                itineraryBuilder: function(a) {
                    return new o(a);
                },
                mapbox: function(a, b) {
                    return new p(a, b);
                },
                errorControl: function(a, b) {
                    return new q(a, b);
                },
                autocomplete: function(a, b, c, d) {
                    return new k(a, b, c, d);
                }
            }, b.exports = d.Routing = {
                Control: e,
                Itinerary: f,
                Line: g,
                OSRMv1: h,
                Plan: i,
                Waypoint: j,
                Autocomplete: k,
                Formatter: l,
                GeocoderElement: m,
                Localization: n,
                Formatter: l,
                ItineraryBuilder: o,
                control: d.routing.control,
                itinerary: d.routing.itinerary,
                line: d.routing.line,
                plan: d.routing.plan,
                waypoint: d.routing.waypoint,
                osrmv1: d.routing.osrmv1,
                geocoderElement: d.routing.geocoderElement,
                mapbox: d.routing.mapbox,
                errorControl: d.routing.errorControl
            };
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {
        "./autocomplete": 10,
        "./control": 11,
        "./error-control": 12,
        "./formatter": 13,
        "./geocoder-element": 14,
        "./itinerary": 17,
        "./itinerary-builder": 16,
        "./line": 18,
        "./localization": 19,
        "./mapbox": 20,
        "./osrm-v1": 21,
        "./plan": 22,
        "./waypoint": 23
    } ],
    16: [ function(a, b, c) {
        (function(a) {
            !function() {
                var c = "undefined" != typeof window ? window.L : void 0 !== a ? a.L : null;
                b.exports = c.Class.extend({
                    options: {
                        containerClassName: ""
                    },
                    initialize: function(a) {
                        c.setOptions(this, a);
                    },
                    createContainer: function(a) {
                        var b = c.DomUtil.create("table", a || ""), d = c.DomUtil.create("colgroup", "", b);
                        return c.DomUtil.create("col", "leaflet-routing-instruction-icon", d), c.DomUtil.create("col", "leaflet-routing-instruction-text", d), 
                        c.DomUtil.create("col", "leaflet-routing-instruction-distance", d), b;
                    },
                    createStepsContainer: function() {
                        return c.DomUtil.create("tbody", "");
                    },
                    createStep: function(a, b, d, e) {
                        var f, g, h = c.DomUtil.create("tr", "", e);
                        return g = c.DomUtil.create("td", "", h), f = c.DomUtil.create("span", "leaflet-routing-icon leaflet-routing-icon-" + d, g), 
                        g.appendChild(f), g = c.DomUtil.create("td", "", h), g.appendChild(document.createTextNode(a)), 
                        g = c.DomUtil.create("td", "", h), g.appendChild(document.createTextNode(b)), h;
                    }
                });
            }();
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {} ],
    17: [ function(a, b, c) {
        (function(c) {
            !function() {
                var d = "undefined" != typeof window ? window.L : void 0 !== c ? c.L : null, e = a("./formatter"), f = a("./itinerary-builder");
                b.exports = d.Control.extend({
                    includes: d.Mixin.Events,
                    options: {
                        pointMarkerStyle: {
                            radius: 5,
                            color: "#03f",
                            fillColor: "white",
                            opacity: 1,
                            fillOpacity: .7
                        },
                        summaryTemplate: "<h2>{name}</h2><h3>{distance}, {time}</h3>",
                        timeTemplate: "{time}",
                        containerClassName: "",
                        alternativeClassName: "",
                        minimizedClassName: "",
                        itineraryClassName: "",
                        totalDistanceRoundingSensitivity: -1,
                        show: !0,
                        collapsible: void 0,
                        collapseBtn: function(a) {
                            var b = d.DomUtil.create("span", a.options.collapseBtnClass);
                            d.DomEvent.on(b, "click", a._toggle, a), a._container.insertBefore(b, a._container.firstChild);
                        },
                        collapseBtnClass: "leaflet-routing-collapse-btn"
                    },
                    initialize: function(a) {
                        d.setOptions(this, a), this._formatter = this.options.formatter || new e(this.options), 
                        this._itineraryBuilder = this.options.itineraryBuilder || new f({
                            containerClassName: this.options.itineraryClassName
                        });
                    },
                    onAdd: function(a) {
                        var b = this.options.collapsible;
                        return b = b || void 0 === b && a.getSize().x <= 640, this._container = d.DomUtil.create("div", "leaflet-routing-container leaflet-bar " + (this.options.show ? "" : "leaflet-routing-container-hide ") + (b ? "leaflet-routing-collapsible " : "") + this.options.containerClassName), 
                        this._altContainer = this.createAlternativesContainer(), this._container.appendChild(this._altContainer), 
                        d.DomEvent.disableClickPropagation(this._container), d.DomEvent.addListener(this._container, "mousewheel", function(a) {
                            d.DomEvent.stopPropagation(a);
                        }), b && this.options.collapseBtn(this), this._container;
                    },
                    onRemove: function() {},
                    createAlternativesContainer: function() {
                        return d.DomUtil.create("div", "leaflet-routing-alternatives-container");
                    },
                    setAlternatives: function(a) {
                        var b, c, d;
                        for (this._clearAlts(), this._routes = a, b = 0; b < this._routes.length; b++) c = this._routes[b], 
                        d = this._createAlternative(c, b), this._altContainer.appendChild(d), this._altElements.push(d);
                        return this._selectRoute({
                            route: this._routes[0],
                            alternatives: this._routes.slice(1)
                        }), this;
                    },
                    show: function() {
                        d.DomUtil.removeClass(this._container, "leaflet-routing-container-hide");
                    },
                    hide: function() {
                        d.DomUtil.addClass(this._container, "leaflet-routing-container-hide");
                    },
                    _toggle: function() {
                        this[d.DomUtil.hasClass(this._container, "leaflet-routing-container-hide") ? "show" : "hide"]();
                    },
                    _createAlternative: function(a, b) {
                        var c = d.DomUtil.create("div", "leaflet-routing-alt " + this.options.alternativeClassName + (b > 0 ? " leaflet-routing-alt-minimized " + this.options.minimizedClassName : "")), e = this.options.summaryTemplate, f = d.extend({
                            name: a.name,
                            distance: this._formatter.formatDistance(a.summary.totalDistance, this.options.totalDistanceRoundingSensitivity),
                            time: this._formatter.formatTime(a.summary.totalTime)
                        }, a);
                        return c.innerHTML = "function" == typeof e ? e(f) : d.Util.template(e, f), d.DomEvent.addListener(c, "click", this._onAltClicked, this), 
                        this.on("routeselected", this._selectAlt, this), c.appendChild(this._createItineraryContainer(a)), 
                        c;
                    },
                    _clearAlts: function() {
                        for (var a = this._altContainer; a && a.firstChild; ) a.removeChild(a.firstChild);
                        this._altElements = [];
                    },
                    _createItineraryContainer: function(a) {
                        var b, c, d, e, f, g, h = this._itineraryBuilder.createContainer(), i = this._itineraryBuilder.createStepsContainer();
                        for (h.appendChild(i), b = 0; b < a.instructions.length; b++) c = a.instructions[b], 
                        f = this._formatter.formatInstruction(c, b), e = this._formatter.formatDistance(c.distance), 
                        g = this._formatter.getIconName(c, b), d = this._itineraryBuilder.createStep(f, e, g, i), 
                        this._addRowListeners(d, a.coordinates[c.index]);
                        return h;
                    },
                    _addRowListeners: function(a, b) {
                        d.DomEvent.addListener(a, "mouseover", function() {
                            this._marker = d.circleMarker(b, this.options.pointMarkerStyle).addTo(this._map);
                        }, this), d.DomEvent.addListener(a, "mouseout", function() {
                            this._marker && (this._map.removeLayer(this._marker), delete this._marker);
                        }, this), d.DomEvent.addListener(a, "click", function(a) {
                            this._map.panTo(b), d.DomEvent.stopPropagation(a);
                        }, this);
                    },
                    _onAltClicked: function(a) {
                        for (var b = a.target || window.event.srcElement; !d.DomUtil.hasClass(b, "leaflet-routing-alt"); ) b = b.parentElement;
                        var c = this._altElements.indexOf(b), e = this._routes.slice(), f = e.splice(c, 1)[0];
                        this.fire("routeselected", {
                            route: f,
                            alternatives: e
                        });
                    },
                    _selectAlt: function(a) {
                        var b, c, e, f;
                        if (b = this._altElements[a.route.routesIndex], d.DomUtil.hasClass(b, "leaflet-routing-alt-minimized")) for (c = 0; c < this._altElements.length; c++) e = this._altElements[c], 
                        f = c === a.route.routesIndex ? "removeClass" : "addClass", d.DomUtil[f](e, "leaflet-routing-alt-minimized"), 
                        this.options.minimizedClassName && d.DomUtil[f](e, this.options.minimizedClassName), 
                        c !== a.route.routesIndex && (e.scrollTop = 0);
                        d.DomEvent.stop(a);
                    },
                    _selectRoute: function(a) {
                        this._marker && (this._map.removeLayer(this._marker), delete this._marker), this.fire("routeselected", a);
                    }
                });
            }();
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {
        "./formatter": 13,
        "./itinerary-builder": 16
    } ],
    18: [ function(a, b, c) {
        (function(a) {
            !function() {
                var c = "undefined" != typeof window ? window.L : void 0 !== a ? a.L : null;
                b.exports = c.LayerGroup.extend({
                    includes: c.Mixin.Events,
                    options: {
                        styles: [ {
                            color: "black",
                            opacity: .15,
                            weight: 9
                        }, {
                            color: "white",
                            opacity: .8,
                            weight: 6
                        }, {
                            color: "red",
                            opacity: 1,
                            weight: 2
                        } ],
                        missingRouteStyles: [ {
                            color: "black",
                            opacity: .15,
                            weight: 7
                        }, {
                            color: "white",
                            opacity: .6,
                            weight: 4
                        }, {
                            color: "gray",
                            opacity: .8,
                            weight: 2,
                            dashArray: "7,12"
                        } ],
                        addWaypoints: !0,
                        extendToWaypoints: !0,
                        missingRouteTolerance: 10
                    },
                    initialize: function(a, b) {
                        c.setOptions(this, b), c.LayerGroup.prototype.initialize.call(this, b), this._route = a, 
                        this.options.extendToWaypoints && this._extendToWaypoints(), this._addSegment(a.coordinates, this.options.styles, this.options.addWaypoints);
                    },
                    getBounds: function() {
                        return c.latLngBounds(this._route.coordinates);
                    },
                    _findWaypointIndices: function() {
                        var a, b = this._route.inputWaypoints, c = [];
                        for (a = 0; a < b.length; a++) c.push(this._findClosestRoutePoint(b[a].latLng));
                        return c;
                    },
                    _findClosestRoutePoint: function(a) {
                        var b, c, d, e = Number.MAX_VALUE;
                        for (c = this._route.coordinates.length - 1; c >= 0; c--) (d = a.distanceTo(this._route.coordinates[c])) < e && (b = c, 
                        e = d);
                        return b;
                    },
                    _extendToWaypoints: function() {
                        var a, b, d, e = this._route.inputWaypoints, f = this._getWaypointIndices();
                        for (a = 0; a < e.length; a++) b = e[a].latLng, d = c.latLng(this._route.coordinates[f[a]]), 
                        b.distanceTo(d) > this.options.missingRouteTolerance && this._addSegment([ b, d ], this.options.missingRouteStyles);
                    },
                    _addSegment: function(a, b, d) {
                        var e, f;
                        for (e = 0; e < b.length; e++) f = c.polyline(a, b[e]), this.addLayer(f), d && f.on("mousedown", this._onLineTouched, this);
                    },
                    _findNearestWpBefore: function(a) {
                        for (var b = this._getWaypointIndices(), c = b.length - 1; c >= 0 && b[c] > a; ) c--;
                        return c;
                    },
                    _onLineTouched: function(a) {
                        var b = this._findNearestWpBefore(this._findClosestRoutePoint(a.latlng));
                        this.fire("linetouched", {
                            afterIndex: b,
                            latlng: a.latlng
                        });
                    },
                    _getWaypointIndices: function() {
                        return this._wpIndices || (this._wpIndices = this._route.waypointIndices || this._findWaypointIndices()), 
                        this._wpIndices;
                    }
                });
            }();
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {} ],
    19: [ function(a, b, c) {
        !function() {
            var a = {
                directions: {
                    N: "norte",
                    NE: "noreste",
                    E: "este",
                    SE: "sureste",
                    S: "sur",
                    SW: "suroeste",
                    W: "oeste",
                    NW: "noroeste",
                    SlightRight: "leve giro a la derecha",
                    Right: "derecha",
                    SharpRight: "giro pronunciado a la derecha",
                    SlightLeft: "leve giro a la izquierda",
                    Left: "izquierda",
                    SharpLeft: "giro pronunciado a la izquierda",
                    Uturn: "media vuelta"
                },
                instructions: {
                    Head: [ "Derecho {dir}", " sobre {road}" ],
                    Continue: [ "Continuar {dir}", " en {road}" ],
                    TurnAround: [ "Dar vuelta" ],
                    WaypointReached: [ "Llegó a un punto del camino" ],
                    Roundabout: [ "Tomar {exitStr} salida en la rotonda", " en {road}" ],
                    DestinationReached: [ "Llegada a destino" ],
                    Fork: [ "En el cruce gira a {modifier}", " hacia {road}" ],
                    Merge: [ "Incorpórate {modifier}", " hacia {road}" ],
                    OnRamp: [ "Gira {modifier} en la salida", " hacia {road}" ],
                    OffRamp: [ "Toma la salida {modifier}", " hacia {road}" ],
                    EndOfRoad: [ "Gira {modifier} al final de la carretera", " hacia {road}" ],
                    Onto: "hacia {road}"
                },
                formatOrder: function(a) {
                    return a + "º";
                },
                ui: {
                    startPlaceholder: "Inicio",
                    viaPlaceholder: "Via {viaNumber}",
                    endPlaceholder: "Destino"
                },
                units: {
                    meters: "m",
                    kilometers: "km",
                    yards: "yd",
                    miles: "mi",
                    hours: "h",
                    minutes: "min",
                    seconds: "s"
                }
            };
            L.Routing = L.Routing || {};
            var c = L.Class.extend({
                initialize: function(a) {
                    this._langs = L.Util.isArray(a) ? a : [ a, "en" ];
                    for (var b = 0, d = this._langs.length; b < d; b++) if (!c[this._langs[b]]) throw new Error('No localization for language "' + this._langs[b] + '".');
                },
                localize: function(a) {
                    var b, d, e;
                    a = L.Util.isArray(a) ? a : [ a ];
                    for (var f = 0, g = this._langs.length; f < g; f++) {
                        b = c[this._langs[f]];
                        for (var h = 0, i = a.length; b && h < i; h++) d = a[h], e = b[d], b = e;
                        if (e) return e;
                    }
                }
            });
            b.exports = L.extend(c, {
                en: {
                    directions: {
                        N: "north",
                        NE: "northeast",
                        E: "east",
                        SE: "southeast",
                        S: "south",
                        SW: "southwest",
                        W: "west",
                        NW: "northwest",
                        SlightRight: "slight right",
                        Right: "right",
                        SharpRight: "sharp right",
                        SlightLeft: "slight left",
                        Left: "left",
                        SharpLeft: "sharp left",
                        Uturn: "Turn around"
                    },
                    instructions: {
                        Head: [ "Head {dir}", " on {road}" ],
                        Continue: [ "Continue {dir}" ],
                        TurnAround: [ "Turn around" ],
                        WaypointReached: [ "Waypoint reached" ],
                        Roundabout: [ "Take the {exitStr} exit in the roundabout", " onto {road}" ],
                        DestinationReached: [ "Destination reached" ],
                        Fork: [ "At the fork, turn {modifier}", " onto {road}" ],
                        Merge: [ "Merge {modifier}", " onto {road}" ],
                        OnRamp: [ "Turn {modifier} on the ramp", " onto {road}" ],
                        OffRamp: [ "Take the ramp on the {modifier}", " onto {road}" ],
                        EndOfRoad: [ "Turn {modifier} at the end of the road", " onto {road}" ],
                        Onto: "onto {road}"
                    },
                    formatOrder: function(a) {
                        var b = a % 10 - 1, c = [ "st", "nd", "rd" ];
                        return c[b] ? a + c[b] : a + "th";
                    },
                    ui: {
                        startPlaceholder: "Start",
                        viaPlaceholder: "Via {viaNumber}",
                        endPlaceholder: "End"
                    },
                    units: {
                        meters: "m",
                        kilometers: "km",
                        yards: "yd",
                        miles: "mi",
                        hours: "h",
                        minutes: "min",
                        seconds: "s"
                    }
                },
                de: {
                    directions: {
                        N: "Norden",
                        NE: "Nordosten",
                        E: "Osten",
                        SE: "Südosten",
                        S: "Süden",
                        SW: "Südwesten",
                        W: "Westen",
                        NW: "Nordwesten",
                        SlightRight: "leicht rechts",
                        Right: "rechts",
                        SharpRight: "scharf rechts",
                        SlightLeft: "leicht links",
                        Left: "links",
                        SharpLeft: "scharf links",
                        Uturn: "Wenden"
                    },
                    instructions: {
                        Head: [ "Richtung {dir}", " auf {road}" ],
                        Continue: [ "Geradeaus Richtung {dir}", " auf {road}" ],
                        SlightRight: [ "Leicht rechts abbiegen", " auf {road}" ],
                        Right: [ "Rechts abbiegen", " auf {road}" ],
                        SharpRight: [ "Scharf rechts abbiegen", " auf {road}" ],
                        TurnAround: [ "Wenden" ],
                        SharpLeft: [ "Scharf links abbiegen", " auf {road}" ],
                        Left: [ "Links abbiegen", " auf {road}" ],
                        SlightLeft: [ "Leicht links abbiegen", " auf {road}" ],
                        WaypointReached: [ "Zwischenhalt erreicht" ],
                        Roundabout: [ "Nehmen Sie die {exitStr} Ausfahrt im Kreisverkehr", " auf {road}" ],
                        DestinationReached: [ "Sie haben ihr Ziel erreicht" ],
                        Fork: [ "An der Kreuzung {modifier}", " auf {road}" ],
                        Merge: [ "Fahren Sie {modifier} weiter", " auf {road}" ],
                        OnRamp: [ "Fahren Sie {modifier} auf die Auffahrt", " auf {road}" ],
                        OffRamp: [ "Nehmen Sie die Ausfahrt {modifier}", " auf {road}" ],
                        EndOfRoad: [ "Fahren Sie {modifier} am Ende der Straße", " auf {road}" ],
                        Onto: "auf {road}"
                    },
                    formatOrder: function(a) {
                        return a + ".";
                    },
                    ui: {
                        startPlaceholder: "Start",
                        viaPlaceholder: "Via {viaNumber}",
                        endPlaceholder: "Ziel"
                    }
                },
                sv: {
                    directions: {
                        N: "norr",
                        NE: "nordost",
                        E: "öst",
                        SE: "sydost",
                        S: "syd",
                        SW: "sydväst",
                        W: "väst",
                        NW: "nordväst",
                        SlightRight: "svagt höger",
                        Right: "höger",
                        SharpRight: "skarpt höger",
                        SlightLeft: "svagt vänster",
                        Left: "vänster",
                        SharpLeft: "skarpt vänster",
                        Uturn: "Vänd"
                    },
                    instructions: {
                        Head: [ "Åk åt {dir}", " till {road}" ],
                        Continue: [ "Fortsätt {dir}" ],
                        SlightRight: [ "Svagt höger", " till {road}" ],
                        Right: [ "Sväng höger", " till {road}" ],
                        SharpRight: [ "Skarpt höger", " till {road}" ],
                        TurnAround: [ "Vänd" ],
                        SharpLeft: [ "Skarpt vänster", " till {road}" ],
                        Left: [ "Sväng vänster", " till {road}" ],
                        SlightLeft: [ "Svagt vänster", " till {road}" ],
                        WaypointReached: [ "Viapunkt nådd" ],
                        Roundabout: [ "Tag {exitStr} avfarten i rondellen", " till {road}" ],
                        DestinationReached: [ "Framme vid resans mål" ],
                        Fork: [ "Tag av {modifier}", " till {road}" ],
                        Merge: [ "Anslut {modifier} ", " till {road}" ],
                        OnRamp: [ "Tag påfarten {modifier}", " till {road}" ],
                        OffRamp: [ "Tag avfarten {modifier}", " till {road}" ],
                        EndOfRoad: [ "Sväng {modifier} vid vägens slut", " till {road}" ],
                        Onto: "till {road}"
                    },
                    formatOrder: function(a) {
                        return [ "första", "andra", "tredje", "fjärde", "femte", "sjätte", "sjunde", "åttonde", "nionde", "tionde" ][a - 1];
                    },
                    ui: {
                        startPlaceholder: "Från",
                        viaPlaceholder: "Via {viaNumber}",
                        endPlaceholder: "Till"
                    }
                },
                es: a,
                sp: a,
                nl: {
                    directions: {
                        N: "noordelijke",
                        NE: "noordoostelijke",
                        E: "oostelijke",
                        SE: "zuidoostelijke",
                        S: "zuidelijke",
                        SW: "zuidewestelijke",
                        W: "westelijke",
                        NW: "noordwestelijke"
                    },
                    instructions: {
                        Head: [ "Vertrek in {dir} richting", " de {road} op" ],
                        Continue: [ "Ga in {dir} richting", " de {road} op" ],
                        SlightRight: [ "Volg de weg naar rechts", " de {road} op" ],
                        Right: [ "Ga rechtsaf", " de {road} op" ],
                        SharpRight: [ "Ga scherpe bocht naar rechts", " de {road} op" ],
                        TurnAround: [ "Keer om" ],
                        SharpLeft: [ "Ga scherpe bocht naar links", " de {road} op" ],
                        Left: [ "Ga linksaf", " de {road} op" ],
                        SlightLeft: [ "Volg de weg naar links", " de {road} op" ],
                        WaypointReached: [ "Aangekomen bij tussenpunt" ],
                        Roundabout: [ "Neem de {exitStr} afslag op de rotonde", " de {road} op" ],
                        DestinationReached: [ "Aangekomen op eindpunt" ]
                    },
                    formatOrder: function(a) {
                        return 1 === a || a >= 20 ? a + "ste" : a + "de";
                    },
                    ui: {
                        startPlaceholder: "Vertrekpunt",
                        viaPlaceholder: "Via {viaNumber}",
                        endPlaceholder: "Bestemming"
                    }
                },
                fr: {
                    directions: {
                        N: "nord",
                        NE: "nord-est",
                        E: "est",
                        SE: "sud-est",
                        S: "sud",
                        SW: "sud-ouest",
                        W: "ouest",
                        NW: "nord-ouest"
                    },
                    instructions: {
                        Head: [ "Tout droit au {dir}", " sur {road}" ],
                        Continue: [ "Continuer au {dir}", " sur {road}" ],
                        SlightRight: [ "Légèrement à droite", " sur {road}" ],
                        Right: [ "A droite", " sur {road}" ],
                        SharpRight: [ "Complètement à droite", " sur {road}" ],
                        TurnAround: [ "Faire demi-tour" ],
                        SharpLeft: [ "Complètement à gauche", " sur {road}" ],
                        Left: [ "A gauche", " sur {road}" ],
                        SlightLeft: [ "Légèrement à gauche", " sur {road}" ],
                        WaypointReached: [ "Point d'étape atteint" ],
                        Roundabout: [ "Au rond-point, prenez la {exitStr} sortie", " sur {road}" ],
                        DestinationReached: [ "Destination atteinte" ]
                    },
                    formatOrder: function(a) {
                        return a + "º";
                    },
                    ui: {
                        startPlaceholder: "Départ",
                        viaPlaceholder: "Intermédiaire {viaNumber}",
                        endPlaceholder: "Arrivée"
                    }
                },
                it: {
                    directions: {
                        N: "nord",
                        NE: "nord-est",
                        E: "est",
                        SE: "sud-est",
                        S: "sud",
                        SW: "sud-ovest",
                        W: "ovest",
                        NW: "nord-ovest"
                    },
                    instructions: {
                        Head: [ "Dritto verso {dir}", " su {road}" ],
                        Continue: [ "Continuare verso {dir}", " su {road}" ],
                        SlightRight: [ "Mantenere la destra", " su {road}" ],
                        Right: [ "A destra", " su {road}" ],
                        SharpRight: [ "Strettamente a destra", " su {road}" ],
                        TurnAround: [ "Fare inversione di marcia" ],
                        SharpLeft: [ "Strettamente a sinistra", " su {road}" ],
                        Left: [ "A sinistra", " sur {road}" ],
                        SlightLeft: [ "Mantenere la sinistra", " su {road}" ],
                        WaypointReached: [ "Punto di passaggio raggiunto" ],
                        Roundabout: [ "Alla rotonda, prendere la {exitStr} uscita" ],
                        DestinationReached: [ "Destinazione raggiunta" ]
                    },
                    formatOrder: function(a) {
                        return a + "º";
                    },
                    ui: {
                        startPlaceholder: "Partenza",
                        viaPlaceholder: "Intermedia {viaNumber}",
                        endPlaceholder: "Destinazione"
                    }
                },
                pt: {
                    directions: {
                        N: "norte",
                        NE: "nordeste",
                        E: "leste",
                        SE: "sudeste",
                        S: "sul",
                        SW: "sudoeste",
                        W: "oeste",
                        NW: "noroeste",
                        SlightRight: "curva ligeira a direita",
                        Right: "direita",
                        SharpRight: "curva fechada a direita",
                        SlightLeft: "ligeira a esquerda",
                        Left: "esquerda",
                        SharpLeft: "curva fechada a esquerda",
                        Uturn: "Meia volta"
                    },
                    instructions: {
                        Head: [ "Siga {dir}", " na {road}" ],
                        Continue: [ "Continue {dir}", " na {road}" ],
                        SlightRight: [ "Curva ligeira a direita", " na {road}" ],
                        Right: [ "Curva a direita", " na {road}" ],
                        SharpRight: [ "Curva fechada a direita", " na {road}" ],
                        TurnAround: [ "Retorne" ],
                        SharpLeft: [ "Curva fechada a esquerda", " na {road}" ],
                        Left: [ "Curva a esquerda", " na {road}" ],
                        SlightLeft: [ "Curva ligueira a esquerda", " na {road}" ],
                        WaypointReached: [ "Ponto de interesse atingido" ],
                        Roundabout: [ "Pegue a {exitStr} saída na rotatória", " na {road}" ],
                        DestinationReached: [ "Destino atingido" ],
                        Fork: [ "Na encruzilhada, vire a {modifier}", " na {road}" ],
                        Merge: [ "Entre à {modifier}", " na {road}" ],
                        OnRamp: [ "Vire {modifier} na rampa", " na {road}" ],
                        OffRamp: [ "Entre na rampa na {modifier}", " na {road}" ],
                        EndOfRoad: [ "Vire {modifier} no fim da rua", " na {road}" ],
                        Onto: "na {road}"
                    },
                    formatOrder: function(a) {
                        return a + "º";
                    },
                    ui: {
                        startPlaceholder: "Origem",
                        viaPlaceholder: "Intermédio {viaNumber}",
                        endPlaceholder: "Destino"
                    }
                },
                sk: {
                    directions: {
                        N: "sever",
                        NE: "serverovýchod",
                        E: "východ",
                        SE: "juhovýchod",
                        S: "juh",
                        SW: "juhozápad",
                        W: "západ",
                        NW: "serverozápad"
                    },
                    instructions: {
                        Head: [ "Mierte na {dir}", " na {road}" ],
                        Continue: [ "Pokračujte na {dir}", " na {road}" ],
                        SlightRight: [ "Mierne doprava", " na {road}" ],
                        Right: [ "Doprava", " na {road}" ],
                        SharpRight: [ "Prudko doprava", " na {road}" ],
                        TurnAround: [ "Otočte sa" ],
                        SharpLeft: [ "Prudko doľava", " na {road}" ],
                        Left: [ "Doľava", " na {road}" ],
                        SlightLeft: [ "Mierne doľava", " na {road}" ],
                        WaypointReached: [ "Ste v prejazdovom bode." ],
                        Roundabout: [ "Odbočte na {exitStr} výjazde", " na {road}" ],
                        DestinationReached: [ "Prišli ste do cieľa." ]
                    },
                    formatOrder: function(a) {
                        var b = a % 10 - 1, c = [ ".", ".", "." ];
                        return c[b] ? a + c[b] : a + ".";
                    },
                    ui: {
                        startPlaceholder: "Začiatok",
                        viaPlaceholder: "Cez {viaNumber}",
                        endPlaceholder: "Koniec"
                    }
                },
                el: {
                    directions: {
                        N: "βόρεια",
                        NE: "βορειοανατολικά",
                        E: "ανατολικά",
                        SE: "νοτιοανατολικά",
                        S: "νότια",
                        SW: "νοτιοδυτικά",
                        W: "δυτικά",
                        NW: "βορειοδυτικά"
                    },
                    instructions: {
                        Head: [ "Κατευθυνθείτε {dir}", " στην {road}" ],
                        Continue: [ "Συνεχίστε {dir}", " στην {road}" ],
                        SlightRight: [ "Ελαφρώς δεξιά", " στην {road}" ],
                        Right: [ "Δεξιά", " στην {road}" ],
                        SharpRight: [ "Απότομη δεξιά στροφή", " στην {road}" ],
                        TurnAround: [ "Κάντε αναστροφή" ],
                        SharpLeft: [ "Απότομη αριστερή στροφή", " στην {road}" ],
                        Left: [ "Αριστερά", " στην {road}" ],
                        SlightLeft: [ "Ελαφρώς αριστερά", " στην {road}" ],
                        WaypointReached: [ "Φτάσατε στο σημείο αναφοράς" ],
                        Roundabout: [ "Ακολουθήστε την {exitStr} έξοδο στο κυκλικό κόμβο", " στην {road}" ],
                        DestinationReached: [ "Φτάσατε στον προορισμό σας" ]
                    },
                    formatOrder: function(a) {
                        return a + "º";
                    },
                    ui: {
                        startPlaceholder: "Αφετηρία",
                        viaPlaceholder: "μέσω {viaNumber}",
                        endPlaceholder: "Προορισμός"
                    }
                },
                ca: {
                    directions: {
                        N: "nord",
                        NE: "nord-est",
                        E: "est",
                        SE: "sud-est",
                        S: "sud",
                        SW: "sud-oest",
                        W: "oest",
                        NW: "nord-oest",
                        SlightRight: "lleu gir a la dreta",
                        Right: "dreta",
                        SharpRight: "gir pronunciat a la dreta",
                        SlightLeft: "gir pronunciat a l'esquerra",
                        Left: "esquerra",
                        SharpLeft: "lleu gir a l'esquerra",
                        Uturn: "mitja volta"
                    },
                    instructions: {
                        Head: [ "Recte {dir}", " sobre {road}" ],
                        Continue: [ "Continuar {dir}" ],
                        TurnAround: [ "Donar la volta" ],
                        WaypointReached: [ "Ha arribat a un punt del camí" ],
                        Roundabout: [ "Agafar {exitStr} sortida a la rotonda", " a {road}" ],
                        DestinationReached: [ "Arribada al destí" ],
                        Fork: [ "A la cruïlla gira a la {modifier}", " cap a {road}" ],
                        Merge: [ "Incorpora't {modifier}", " a {road}" ],
                        OnRamp: [ "Gira {modifier} a la sortida", " cap a {road}" ],
                        OffRamp: [ "Pren la sortida {modifier}", " cap a {road}" ],
                        EndOfRoad: [ "Gira {modifier} al final de la carretera", " cap a {road}" ],
                        Onto: "cap a {road}"
                    },
                    formatOrder: function(a) {
                        return a + "º";
                    },
                    ui: {
                        startPlaceholder: "Origen",
                        viaPlaceholder: "Via {viaNumber}",
                        endPlaceholder: "Destí"
                    },
                    units: {
                        meters: "m",
                        kilometers: "km",
                        yards: "yd",
                        miles: "mi",
                        hours: "h",
                        minutes: "min",
                        seconds: "s"
                    }
                },
                ru: {
                    directions: {
                        N: "север",
                        NE: "северовосток",
                        E: "восток",
                        SE: "юговосток",
                        S: "юг",
                        SW: "югозапад",
                        W: "запад",
                        NW: "северозапад",
                        SlightRight: "плавно направо",
                        Right: "направо",
                        SharpRight: "резко направо",
                        SlightLeft: "плавно налево",
                        Left: "налево",
                        SharpLeft: "резко налево",
                        Uturn: "развернуться"
                    },
                    instructions: {
                        Head: [ "Начать движение на {dir}", " по {road}" ],
                        Continue: [ "Продолжать движение на {dir}", " по {road}" ],
                        SlightRight: [ "Плавный поворот направо", " на {road}" ],
                        Right: [ "Направо", " на {road}" ],
                        SharpRight: [ "Резкий поворот направо", " на {road}" ],
                        TurnAround: [ "Развернуться" ],
                        SharpLeft: [ "Резкий поворот налево", " на {road}" ],
                        Left: [ "Поворот налево", " на {road}" ],
                        SlightLeft: [ "Плавный поворот налево", " на {road}" ],
                        WaypointReached: [ "Точка достигнута" ],
                        Roundabout: [ "{exitStr} съезд с кольца", " на {road}" ],
                        DestinationReached: [ "Окончание маршрута" ],
                        Fork: [ "На развилке поверните {modifier}", " на {road}" ],
                        Merge: [ "Перестройтесь {modifier}", " на {road}" ],
                        OnRamp: [ "Поверните {modifier} на съезд", " на {road}" ],
                        OffRamp: [ "Съезжайте на {modifier}", " на {road}" ],
                        EndOfRoad: [ "Поверните {modifier} в конце дороги", " на {road}" ],
                        Onto: "на {road}"
                    },
                    formatOrder: function(a) {
                        return a + "-й";
                    },
                    ui: {
                        startPlaceholder: "Начало",
                        viaPlaceholder: "Через {viaNumber}",
                        endPlaceholder: "Конец"
                    },
                    units: {
                        meters: "м",
                        kilometers: "км",
                        yards: "ярд",
                        miles: "ми",
                        hours: "ч",
                        minutes: "м",
                        seconds: "с"
                    }
                }
            });
        }();
    }, {} ],
    20: [ function(a, b, c) {
        (function(c) {
            !function() {
                var d = "undefined" != typeof window ? window.L : void 0 !== c ? c.L : null, e = a("./osrm-v1");
                b.exports = e.extend({
                    options: {
                        serviceUrl: "https://api.mapbox.com/directions/v5",
                        profile: "mapbox/driving",
                        useHints: !1
                    },
                    initialize: function(a, b) {
                        d.Routing.OSRMv1.prototype.initialize.call(this, b), this.options.requestParameters = this.options.requestParameters || {}, 
                        this.options.requestParameters.access_token = a;
                    }
                });
            }();
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {
        "./osrm-v1": 21
    } ],
    21: [ function(a, b, c) {
        (function(c) {
            !function() {
                var d = "undefined" != typeof window ? window.L : void 0 !== c ? c.L : null, e = a("corslite"), f = a("polyline"), g = a("osrm-text-instructions"), h = a("./waypoint");
                b.exports = d.Class.extend({
                    options: {
                        serviceUrl: "https://router.project-osrm.org/route/v1",
                        profile: "driving",
                        timeout: 3e4,
                        routingOptions: {
                            alternatives: !0,
                            steps: !0
                        },
                        polylinePrecision: 5,
                        useHints: !0,
                        suppressDemoServerWarning: !1,
                        language: "en"
                    },
                    initialize: function(a) {
                        d.Util.setOptions(this, a), this._hints = {
                            locations: {}
                        }, !this.options.suppressDemoServerWarning && this.options.serviceUrl.indexOf("//router.project-osrm.org") >= 0 && console.warn("You are using OSRM's demo server. Please note that it is **NOT SUITABLE FOR PRODUCTION USE**.\nRefer to the demo server's usage policy: https://github.com/Project-OSRM/osrm-backend/wiki/Api-usage-policy\n\nTo change, set the serviceUrl option.\n\nPlease do not report issues with this server to neither Leaflet Routing Machine or OSRM - it's for\ndemo only, and will sometimes not be available, or work in unexpected ways.\n\nPlease set up your own OSRM server, or use a paid service provider for production.");
                    },
                    route: function(a, b, c, f) {
                        var g, i, j, k, l, m = !1, n = [];
                        for (f = d.extend({}, this.options.routingOptions, f), g = this.buildRouteUrl(a, f), 
                        this.options.requestParameters && (g += d.Util.getParamString(this.options.requestParameters, g)), 
                        i = setTimeout(function() {
                            m = !0, b.call(c || b, {
                                status: -1,
                                message: "OSRM request timed out."
                            });
                        }, this.options.timeout), k = 0; k < a.length; k++) j = a[k], n.push(new h(j.latLng, j.name, j.options));
                        return l = e(g, d.bind(function(a, d) {
                            var e, h = {};
                            if (clearTimeout(i), m) l.abort(); else {
                                if (a) h.message = "HTTP request failed: " + a.type + (a.target && a.target.status ? " HTTP " + a.target.status + ": " + a.target.statusText : ""), 
                                h.url = g, h.status = -1, h.target = a; else try {
                                    e = JSON.parse(d.responseText);
                                    try {
                                        return this._routeDone(e, n, f, b, c);
                                    } catch (a) {
                                        h.status = -3, h.message = a.toString();
                                    }
                                } catch (a) {
                                    h.status = -2, h.message = "Error parsing OSRM response: " + a.toString();
                                }
                                b.call(c || b, h);
                            }
                        }, this));
                    },
                    requiresMoreDetail: function(a, b, c) {
                        if (!a.properties.isSimplified) return !1;
                        var d, e = a.inputWaypoints;
                        for (d = 0; d < e.length; ++d) if (!c.contains(e[d].latLng)) return !0;
                        return !1;
                    },
                    _routeDone: function(a, b, c, d, e) {
                        var f, g, h, i = [];
                        if (e = e || d, "Ok" !== a.code) return void d.call(e, {
                            status: a.code
                        });
                        for (f = this._toWaypoints(b, a.waypoints), g = 0; g < a.routes.length; g++) h = this._convertRoute(a.routes[g]), 
                        h.inputWaypoints = b, h.waypoints = f, h.properties = {
                            isSimplified: !c || !c.geometryOnly || c.simplifyGeometry
                        }, i.push(h);
                        this._saveHintData(a.waypoints, b), d.call(e, null, i);
                    },
                    _convertRoute: function(a) {
                        var b, c, d, e, f, h, i, j, k, l = {
                            name: "",
                            coordinates: [],
                            instructions: [],
                            summary: {
                                totalDistance: a.distance,
                                totalTime: a.duration
                            }
                        }, m = [], n = [], o = 0, p = a.legs.length, q = a.legs[0].steps.length > 0;
                        if (this.options.stepToText) k = this.options.stepToText; else {
                            var r = g("v5", this.options.language);
                            k = r.compile.bind(r);
                        }
                        for (b = 0; b < p; b++) for (d = a.legs[b], m.push(d.summary && d.summary.charAt(0).toUpperCase() + d.summary.substring(1)), 
                        c = 0; c < d.steps.length; c++) e = d.steps[c], f = this._decodePolyline(e.geometry), 
                        l.coordinates.push.apply(l.coordinates, f), h = this._maneuverToInstructionType(e.maneuver, b === p - 1), 
                        i = this._maneuverToModifier(e.maneuver), j = k(e), h && ((0 == b && "depart" == e.maneuver.type || "arrive" == e.maneuver.type) && n.push(o), 
                        l.instructions.push({
                            type: h,
                            distance: e.distance,
                            time: e.duration,
                            road: e.name,
                            direction: this._bearingToDirection(e.maneuver.bearing_after),
                            exit: e.maneuver.exit,
                            index: o,
                            mode: e.mode,
                            modifier: i,
                            text: j
                        })), o += f.length;
                        return l.name = m.join(", "), q ? l.waypointIndices = n : l.coordinates = this._decodePolyline(a.geometry), 
                        l;
                    },
                    _bearingToDirection: function(a) {
                        return [ "N", "NE", "E", "SE", "S", "SW", "W", "NW" ][Math.round(a / 45) % 8];
                    },
                    _maneuverToInstructionType: function(a, b) {
                        switch (a.type) {
                          case "new name":
                            return "Continue";

                          case "depart":
                            return "Head";

                          case "arrive":
                            return b ? "DestinationReached" : "WaypointReached";

                          case "roundabout":
                          case "rotary":
                            return "Roundabout";

                          case "merge":
                          case "fork":
                          case "on ramp":
                          case "off ramp":
                          case "end of road":
                            return this._camelCase(a.type);

                          default:
                            return this._camelCase(a.modifier);
                        }
                    },
                    _maneuverToModifier: function(a) {
                        var b = a.modifier;
                        switch (a.type) {
                          case "merge":
                          case "fork":
                          case "on ramp":
                          case "off ramp":
                          case "end of road":
                            b = this._leftOrRight(b);
                        }
                        return b && this._camelCase(b);
                    },
                    _camelCase: function(a) {
                        for (var b = a.split(" "), c = "", d = 0, e = b.length; d < e; d++) c += b[d].charAt(0).toUpperCase() + b[d].substring(1);
                        return c;
                    },
                    _leftOrRight: function(a) {
                        return a.indexOf("left") >= 0 ? "Left" : "Right";
                    },
                    _decodePolyline: function(a) {
                        var b, c = f.decode(a, this.options.polylinePrecision), e = new Array(c.length);
                        for (b = c.length - 1; b >= 0; b--) e[b] = d.latLng(c[b]);
                        return e;
                    },
                    _toWaypoints: function(a, b) {
                        var c, e, f = [];
                        for (c = 0; c < b.length; c++) e = b[c].location, f.push(new h(d.latLng(e[1], e[0]), a[c].name, a[c].options));
                        return f;
                    },
                    buildRouteUrl: function(a, b) {
                        for (var c, d, e, f = [], g = [], h = !0, i = 0; i < a.length; i++) c = a[i], d = c.latLng, 
                        f.push(d.lng + "," + d.lat), g.push(this._hints.locations[this._locationKey(d)] || "");
                        return e = !0, this.options.serviceUrl + "/" + this.options.profile + "/" + f.join(";") + "?" + (b.geometryOnly ? b.simplifyGeometry ? "" : "overview=full" : "overview=false") + "&alternatives=" + h.toString() + "&steps=" + e.toString() + (this.options.useHints ? "&hints=" + g.join(";") : "") + (b.allowUTurns ? "&continue_straight=" + !b.allowUTurns : "");
                    },
                    _locationKey: function(a) {
                        return a.lat + "," + a.lng;
                    },
                    _saveHintData: function(a, b) {
                        var c;
                        this._hints = {
                            locations: {}
                        };
                        for (var d = a.length - 1; d >= 0; d--) c = b[d].latLng, this._hints.locations[this._locationKey(c)] = a[d].hint;
                    }
                });
            }();
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {
        "./waypoint": 23,
        corslite: 1,
        "osrm-text-instructions": 2,
        polyline: 9
    } ],
    22: [ function(a, b, c) {
        (function(c) {
            !function() {
                var d = "undefined" != typeof window ? window.L : void 0 !== c ? c.L : null, e = a("./geocoder-element"), f = a("./waypoint");
                b.exports = (d.Layer || d.Class).extend({
                    includes: d.Mixin.Events,
                    options: {
                        dragStyles: [ {
                            color: "black",
                            opacity: .15,
                            weight: 9
                        }, {
                            color: "white",
                            opacity: .8,
                            weight: 6
                        }, {
                            color: "red",
                            opacity: 1,
                            weight: 2,
                            dashArray: "7,12"
                        } ],
                        draggableWaypoints: !0,
                        routeWhileDragging: !1,
                        addWaypoints: !0,
                        reverseWaypoints: !1,
                        addButtonClassName: "",
                        language: "en",
                        createGeocoderElement: function(a, b, c, d) {
                            return new e(a, b, c, d);
                        },
                        createMarker: function(a, b) {
                            var c = {
                                draggable: this.draggableWaypoints
                            };
                            return d.marker(b.latLng, c);
                        },
                        geocodersClassName: ""
                    },
                    initialize: function(a, b) {
                        d.Util.setOptions(this, b), this._waypoints = [], this.setWaypoints(a);
                    },
                    isReady: function() {
                        var a;
                        for (a = 0; a < this._waypoints.length; a++) if (!this._waypoints[a].latLng) return !1;
                        return !0;
                    },
                    getWaypoints: function() {
                        var a, b = [];
                        for (a = 0; a < this._waypoints.length; a++) b.push(this._waypoints[a]);
                        return b;
                    },
                    setWaypoints: function(a) {
                        var b = [ 0, this._waypoints.length ].concat(a);
                        return this.spliceWaypoints.apply(this, b), this;
                    },
                    spliceWaypoints: function() {
                        var a, b = [ arguments[0], arguments[1] ];
                        for (a = 2; a < arguments.length; a++) b.push(arguments[a] && arguments[a].hasOwnProperty("latLng") ? arguments[a] : new f(arguments[a]));
                        for ([].splice.apply(this._waypoints, b); this._waypoints.length < 2; ) this.spliceWaypoints(this._waypoints.length, 0, null);
                        this._updateMarkers(), this._fireChanged.apply(this, b);
                    },
                    onAdd: function(a) {
                        this._map = a, this._updateMarkers();
                    },
                    onRemove: function() {
                        var a;
                        if (this._removeMarkers(), this._newWp) for (a = 0; a < this._newWp.lines.length; a++) this._map.removeLayer(this._newWp.lines[a]);
                        delete this._map;
                    },
                    createGeocoders: function() {
                        var a, b, c = d.DomUtil.create("div", "leaflet-routing-geocoders " + this.options.geocodersClassName), e = this._waypoints;
                        return this._geocoderContainer = c, this._geocoderElems = [], this.options.addWaypoints && (a = d.DomUtil.create("button", "leaflet-routing-add-waypoint " + this.options.addButtonClassName, c), 
                        a.setAttribute("type", "button"), d.DomEvent.addListener(a, "click", function() {
                            this.spliceWaypoints(e.length, 0, null);
                        }, this)), this.options.reverseWaypoints && (b = d.DomUtil.create("button", "leaflet-routing-reverse-waypoints", c), 
                        b.setAttribute("type", "button"), d.DomEvent.addListener(b, "click", function() {
                            this._waypoints.reverse(), this.setWaypoints(this._waypoints);
                        }, this)), this._updateGeocoders(), this.on("waypointsspliced", this._updateGeocoders), 
                        c;
                    },
                    _createGeocoder: function(a) {
                        var b = this.options.createGeocoderElement(this._waypoints[a], a, this._waypoints.length, this.options);
                        return b.on("delete", function() {
                            a > 0 || this._waypoints.length > 2 ? this.spliceWaypoints(a, 1) : this.spliceWaypoints(a, 1, new f());
                        }, this).on("geocoded", function(b) {
                            this._updateMarkers(), this._fireChanged(), this._focusGeocoder(a + 1), this.fire("waypointgeocoded", {
                                waypointIndex: a,
                                waypoint: b.waypoint
                            });
                        }, this).on("reversegeocoded", function(b) {
                            this.fire("waypointgeocoded", {
                                waypointIndex: a,
                                waypoint: b.waypoint
                            });
                        }, this), b;
                    },
                    _updateGeocoders: function() {
                        var a, b, c = [];
                        for (a = 0; a < this._geocoderElems.length; a++) this._geocoderContainer.removeChild(this._geocoderElems[a].getContainer());
                        for (a = this._waypoints.length - 1; a >= 0; a--) b = this._createGeocoder(a), this._geocoderContainer.insertBefore(b.getContainer(), this._geocoderContainer.firstChild), 
                        c.push(b);
                        this._geocoderElems = c.reverse();
                    },
                    _removeMarkers: function() {
                        var a;
                        if (this._markers) for (a = 0; a < this._markers.length; a++) this._markers[a] && this._map.removeLayer(this._markers[a]);
                        this._markers = [];
                    },
                    _updateMarkers: function() {
                        var a, b;
                        if (this._map) for (this._removeMarkers(), a = 0; a < this._waypoints.length; a++) this._waypoints[a].latLng ? (b = this.options.createMarker(a, this._waypoints[a], this._waypoints.length)) && (b.addTo(this._map), 
                        this.options.draggableWaypoints && this._hookWaypointEvents(b, a)) : b = null, this._markers.push(b);
                    },
                    _fireChanged: function() {
                        this.fire("waypointschanged", {
                            waypoints: this.getWaypoints()
                        }), arguments.length >= 2 && this.fire("waypointsspliced", {
                            index: Array.prototype.shift.call(arguments),
                            nRemoved: Array.prototype.shift.call(arguments),
                            added: arguments
                        });
                    },
                    _hookWaypointEvents: function(a, b, c) {
                        var e, f, g = function(a) {
                            return c ? a.latlng : a.target.getLatLng();
                        }, h = d.bind(function(a) {
                            this.fire("waypointdragstart", {
                                index: b,
                                latlng: g(a)
                            });
                        }, this), i = d.bind(function(a) {
                            this._waypoints[b].latLng = g(a), this.fire("waypointdrag", {
                                index: b,
                                latlng: g(a)
                            });
                        }, this), j = d.bind(function(a) {
                            this._waypoints[b].latLng = g(a), this._waypoints[b].name = "", this._geocoderElems && this._geocoderElems[b].update(!0), 
                            this.fire("waypointdragend", {
                                index: b,
                                latlng: g(a)
                            }), this._fireChanged();
                        }, this);
                        c ? (e = d.bind(function(a) {
                            this._markers[b].setLatLng(a.latlng), i(a);
                        }, this), f = d.bind(function(a) {
                            this._map.dragging.enable(), this._map.off("mouseup", f), this._map.off("mousemove", e), 
                            j(a);
                        }, this), this._map.dragging.disable(), this._map.on("mousemove", e), this._map.on("mouseup", f), 
                        h({
                            latlng: this._waypoints[b].latLng
                        })) : (a.on("dragstart", h), a.on("drag", i), a.on("dragend", j));
                    },
                    dragNewWaypoint: function(a) {
                        var b = a.afterIndex + 1;
                        this.options.routeWhileDragging ? (this.spliceWaypoints(b, 0, a.latlng), this._hookWaypointEvents(this._markers[b], b, !0)) : this._dragNewWaypoint(b, a.latlng);
                    },
                    _dragNewWaypoint: function(a, b) {
                        var c, e = new f(b), g = this._waypoints[a - 1], h = this._waypoints[a], i = this.options.createMarker(a, e, this._waypoints.length + 1), j = [], k = this._map.dragging.enabled(), l = d.bind(function(a) {
                            var b, c;
                            for (i && i.setLatLng(a.latlng), b = 0; b < j.length; b++) c = j[b].getLatLngs(), 
                            c.splice(1, 1, a.latlng), j[b].setLatLngs(c);
                            d.DomEvent.stop(a);
                        }, this), m = d.bind(function(b) {
                            var c;
                            for (i && this._map.removeLayer(i), c = 0; c < j.length; c++) this._map.removeLayer(j[c]);
                            this._map.off("mousemove", l), this._map.off("mouseup", m), this.spliceWaypoints(a, 0, b.latlng), 
                            k && this._map.dragging.enable();
                        }, this);
                        for (i && i.addTo(this._map), c = 0; c < this.options.dragStyles.length; c++) j.push(d.polyline([ g.latLng, b, h.latLng ], this.options.dragStyles[c]).addTo(this._map));
                        k && this._map.dragging.disable(), this._map.on("mousemove", l), this._map.on("mouseup", m);
                    },
                    _focusGeocoder: function(a) {
                        this._geocoderElems[a] ? this._geocoderElems[a].focus() : document.activeElement.blur();
                    }
                });
            }();
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {
        "./geocoder-element": 14,
        "./waypoint": 23
    } ],
    23: [ function(a, b, c) {
        (function(a) {
            !function() {
                var c = "undefined" != typeof window ? window.L : void 0 !== a ? a.L : null;
                b.exports = c.Class.extend({
                    options: {
                        allowUTurn: !1
                    },
                    initialize: function(a, b, d) {
                        c.Util.setOptions(this, d), this.latLng = c.latLng(a), this.name = b;
                    }
                });
            }();
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {} ]
}, {}, [ 15 ]), function(a, b) {
    "object" == typeof exports && "undefined" != typeof module ? b(require("jquery")) : "function" == typeof define && define.amd ? define([ "jquery" ], b) : b(a.$);
}(this, function(a) {
    function b(a) {
        return "number" == typeof a && !isNaN(a);
    }
    function c(a) {
        return void 0 === a;
    }
    function d(a, c) {
        var d = [];
        return b(c) && d.push(c), d.slice.apply(a, d);
    }
    function e(a, b) {
        for (var c = arguments.length, e = Array(c > 2 ? c - 2 : 0), f = 2; f < c; f++) e[f - 2] = arguments[f];
        return function() {
            for (var c = arguments.length, f = Array(c), g = 0; g < c; g++) f[g] = arguments[g];
            return a.apply(b, e.concat(d(f)));
        };
    }
    function f(b) {
        var c = [];
        return a.each(b, function(a) {
            c.push(a);
        }), c;
    }
    function g(a) {
        var b = a.match(/^(https?:)\/\/([^:\/?#]+):?(\d*)/i);
        return b && (b[1] !== location.protocol || b[2] !== location.hostname || b[3] !== location.port);
    }
    function h(a) {
        var b = "timestamp=" + new Date().getTime();
        return a + (-1 === a.indexOf("?") ? "?" : "&") + b;
    }
    function i(a) {
        return a ? ' crossOrigin="' + a + '"' : "";
    }
    function j(a, b) {
        if (a.naturalWidth && !z) return void b(a.naturalWidth, a.naturalHeight);
        var c = document.createElement("img");
        c.onload = function() {
            b(this.width, this.height);
        }, c.src = a.src;
    }
    function k(a) {
        var c = [], d = a.translateX, e = a.translateY, f = a.rotate, g = a.scaleX, h = a.scaleY;
        return b(d) && 0 !== d && c.push("translateX(" + d + "px)"), b(e) && 0 !== e && c.push("translateY(" + e + "px)"), 
        b(f) && 0 !== f && c.push("rotate(" + f + "deg)"), b(g) && 1 !== g && c.push("scaleX(" + g + ")"), 
        b(h) && 1 !== h && c.push("scaleY(" + h + ")"), c.length ? c.join(" ") : "none";
    }
    function l(a, b) {
        var c = Math.abs(a.degree) % 180, d = (c > 90 ? 180 - c : c) * Math.PI / 180, e = Math.sin(d), f = Math.cos(d), g = a.width, h = a.height, i = a.aspectRatio, j = void 0, k = void 0;
        return b ? (j = g / (f + e / i), k = j / i) : (j = g * f + h * e, k = g * e + h * f), 
        {
            width: j,
            height: k
        };
    }
    function m(c, d) {
        var e = a("<canvas>")[0], f = e.getContext("2d"), g = 0, h = 0, i = d.naturalWidth, j = d.naturalHeight, k = d.rotate, m = d.scaleX, n = d.scaleY, o = b(m) && b(n) && (1 !== m || 1 !== n), p = b(k) && 0 !== k, q = p || o, r = i * Math.abs(m || 1), s = j * Math.abs(n || 1), t = void 0, u = void 0, v = void 0;
        return o && (t = r / 2, u = s / 2), p && (v = l({
            width: r,
            height: s,
            degree: k
        }), r = v.width, s = v.height, t = r / 2, u = s / 2), e.width = r, e.height = s, 
        q && (g = -i / 2, h = -j / 2, f.save(), f.translate(t, u)), p && f.rotate(k * Math.PI / 180), 
        o && f.scale(m, n), f.drawImage(c, Math.floor(g), Math.floor(h), Math.floor(i), Math.floor(j)), 
        q && f.restore(), e;
    }
    function n(a, b, c) {
        var d = "", e = void 0;
        for (e = b, c += b; e < c; e++) d += A(a.getUint8(e));
        return d;
    }
    function o(a) {
        var b = new DataView(a), c = b.byteLength, d = void 0, e = void 0, f = void 0, g = void 0, h = void 0, i = void 0, j = void 0, k = void 0, l = void 0, m = void 0;
        if (255 === b.getUint8(0) && 216 === b.getUint8(1)) for (l = 2; l < c; ) {
            if (255 === b.getUint8(l) && 225 === b.getUint8(l + 1)) {
                j = l;
                break;
            }
            l++;
        }
        if (j && (e = j + 4, f = j + 10, "Exif" === n(b, e, 4) && (i = b.getUint16(f), ((h = 18761 === i) || 19789 === i) && 42 === b.getUint16(f + 2, h) && (g = b.getUint32(f + 4, h)) >= 8 && (k = f + g))), 
        k) for (c = b.getUint16(k, h), m = 0; m < c; m++) if (l = k + 12 * m + 2, 274 === b.getUint16(l, h)) {
            l += 8, d = b.getUint16(l, h), z && b.setUint16(l, 1, h);
            break;
        }
        return d;
    }
    function p(a) {
        var b = a.replace(w, ""), c = atob(b), d = c.length, e = new ArrayBuffer(d), f = new Uint8Array(e), g = void 0;
        for (g = 0; g < d; g++) f[g] = c.charCodeAt(g);
        return e;
    }
    function q(a) {
        var b = new Uint8Array(a), c = b.length, d = "", e = void 0;
        for (e = 0; e < c; e++) d += A(b[e]);
        return "data:image/jpeg;base64," + btoa(d);
    }
    function r(b, c) {
        var d = b.pageX, e = b.pageY, f = {
            endX: d,
            endY: e
        };
        return c ? f : a.extend({
            startX: d,
            startY: e
        }, f);
    }
    function s(b) {
        var c = a.extend({}, b), d = [];
        return a.each(b, function(b, e) {
            delete c[b], a.each(c, function(a, b) {
                var c = Math.abs(e.startX - b.startX), f = Math.abs(e.startY - b.startY), g = Math.abs(e.endX - b.endX), h = Math.abs(e.endY - b.endY), i = Math.sqrt(c * c + f * f), j = Math.sqrt(g * g + h * h), k = (j - i) / i;
                d.push(k);
            });
        }), d.sort(function(a, b) {
            return Math.abs(a) < Math.abs(b);
        }), d[0];
    }
    function t(b) {
        var c = 0, d = 0, e = 0;
        return a.each(b, function(a, b) {
            var f = b.startX, g = b.startY;
            c += f, d += g, e += 1;
        }), c /= e, d /= e, {
            pageX: c,
            pageY: d
        };
    }
    a = "default" in a ? a.default : a;
    var u = {
        viewMode: 0,
        dragMode: "crop",
        aspectRatio: NaN,
        data: null,
        preview: "",
        responsive: !0,
        restore: !0,
        checkCrossOrigin: !0,
        checkOrientation: !0,
        modal: !0,
        guides: !0,
        center: !0,
        highlight: !0,
        background: !0,
        autoCrop: !0,
        autoCropArea: .8,
        movable: !0,
        rotatable: !0,
        scalable: !0,
        zoomable: !0,
        zoomOnTouch: !0,
        zoomOnWheel: !0,
        wheelZoomRatio: .1,
        cropBoxMovable: !0,
        cropBoxResizable: !0,
        toggleDragModeOnDblclick: !0,
        minCanvasWidth: 0,
        minCanvasHeight: 0,
        minCropBoxWidth: 0,
        minCropBoxHeight: 0,
        minContainerWidth: 200,
        minContainerHeight: 100,
        ready: null,
        cropstart: null,
        cropmove: null,
        cropend: null,
        crop: null,
        zoom: null
    }, v = '<div class="cropper-container"><div class="cropper-wrap-box"><div class="cropper-canvas"></div></div><div class="cropper-drag-box"></div><div class="cropper-crop-box"><span class="cropper-view-box"></span><span class="cropper-dashed dashed-h"></span><span class="cropper-dashed dashed-v"></span><span class="cropper-center"></span><span class="cropper-face"></span><span class="cropper-line line-e" data-action="e"></span><span class="cropper-line line-n" data-action="n"></span><span class="cropper-line line-w" data-action="w"></span><span class="cropper-line line-s" data-action="s"></span><span class="cropper-point point-e" data-action="e"></span><span class="cropper-point point-n" data-action="n"></span><span class="cropper-point point-w" data-action="w"></span><span class="cropper-point point-s" data-action="s"></span><span class="cropper-point point-ne" data-action="ne"></span><span class="cropper-point point-nw" data-action="nw"></span><span class="cropper-point point-sw" data-action="sw"></span><span class="cropper-point point-se" data-action="se"></span></div></div>', w = /^data:([^;]+);base64,/, x = /(Macintosh|iPhone|iPod|iPad).*AppleWebKit/i, y = "undefined" != typeof window ? window.navigator : null, z = y && x.test(y.userAgent), A = String.fromCharCode, B = {
        render: function() {
            var a = this;
            a.initContainer(), a.initCanvas(), a.initCropBox(), a.renderCanvas(), a.cropped && a.renderCropBox();
        },
        initContainer: function() {
            var a = this, b = a.options, c = a.$element, d = a.$container, e = a.$cropper, f = "cropper-hidden";
            e.addClass(f), c.removeClass(f), e.css(a.container = {
                width: Math.max(d.width(), Number(b.minContainerWidth) || 200),
                height: Math.max(d.height(), Number(b.minContainerHeight) || 100)
            }), c.addClass(f), e.removeClass(f);
        },
        initCanvas: function() {
            var b = this, c = b.options.viewMode, d = b.container, e = d.width, f = d.height, g = b.image, h = g.naturalWidth, i = g.naturalHeight, j = 90 === Math.abs(g.rotate), k = j ? i : h, l = j ? h : i, m = k / l, n = e, o = f;
            f * m > e ? 3 === c ? n = f * m : o = e / m : 3 === c ? o = e / m : n = f * m;
            var p = {
                naturalWidth: k,
                naturalHeight: l,
                aspectRatio: m,
                width: n,
                height: o
            };
            p.oldLeft = p.left = (e - n) / 2, p.oldTop = p.top = (f - o) / 2, b.canvas = p, 
            b.limited = 1 === c || 2 === c, b.limitCanvas(!0, !0), b.initialImage = a.extend({}, g), 
            b.initialCanvas = a.extend({}, p);
        },
        limitCanvas: function(a, b) {
            var c = this, d = c.options, e = d.viewMode, f = c.container, g = f.width, h = f.height, i = c.canvas, j = i.aspectRatio, k = c.cropBox, l = c.cropped && k;
            if (a) {
                var m = Number(d.minCanvasWidth) || 0, n = Number(d.minCanvasHeight) || 0;
                e && (e > 1 ? (m = Math.max(m, g), n = Math.max(n, h), 3 === e && (n * j > m ? m = n * j : n = m / j)) : m ? m = Math.max(m, l ? k.width : 0) : n ? n = Math.max(n, l ? k.height : 0) : l && (m = k.width, 
                n = k.height, n * j > m ? m = n * j : n = m / j)), m && n ? n * j > m ? n = m / j : m = n * j : m ? n = m / j : n && (m = n * j), 
                i.minWidth = m, i.minHeight = n, i.maxWidth = 1 / 0, i.maxHeight = 1 / 0;
            }
            if (b) if (e) {
                var o = g - i.width, p = h - i.height;
                i.minLeft = Math.min(0, o), i.minTop = Math.min(0, p), i.maxLeft = Math.max(0, o), 
                i.maxTop = Math.max(0, p), l && c.limited && (i.minLeft = Math.min(k.left, k.left + k.width - i.width), 
                i.minTop = Math.min(k.top, k.top + k.height - i.height), i.maxLeft = k.left, i.maxTop = k.top, 
                2 === e && (i.width >= g && (i.minLeft = Math.min(0, o), i.maxLeft = Math.max(0, o)), 
                i.height >= h && (i.minTop = Math.min(0, p), i.maxTop = Math.max(0, p))));
            } else i.minLeft = -i.width, i.minTop = -i.height, i.maxLeft = g, i.maxTop = h;
        },
        renderCanvas: function(a) {
            var b = this, c = b.canvas, d = b.image, e = d.rotate, f = d.naturalWidth, g = d.naturalHeight, h = void 0, i = void 0;
            b.rotated && (b.rotated = !1, i = l({
                width: d.width,
                height: d.height,
                degree: e
            }), (h = i.width / i.height) !== c.aspectRatio && (c.left -= (i.width - c.width) / 2, 
            c.top -= (i.height - c.height) / 2, c.width = i.width, c.height = i.height, c.aspectRatio = h, 
            c.naturalWidth = f, c.naturalHeight = g, e % 180 && (i = l({
                width: f,
                height: g,
                degree: e
            }), c.naturalWidth = i.width, c.naturalHeight = i.height), b.limitCanvas(!0, !1))), 
            (c.width > c.maxWidth || c.width < c.minWidth) && (c.left = c.oldLeft), (c.height > c.maxHeight || c.height < c.minHeight) && (c.top = c.oldTop), 
            c.width = Math.min(Math.max(c.width, c.minWidth), c.maxWidth), c.height = Math.min(Math.max(c.height, c.minHeight), c.maxHeight), 
            b.limitCanvas(!1, !0), c.oldLeft = c.left = Math.min(Math.max(c.left, c.minLeft), c.maxLeft), 
            c.oldTop = c.top = Math.min(Math.max(c.top, c.minTop), c.maxTop), b.$canvas.css({
                width: c.width,
                height: c.height,
                transform: k({
                    translateX: c.left,
                    translateY: c.top
                })
            }), b.renderImage(), b.cropped && b.limited && b.limitCropBox(!0, !0), a && b.output();
        },
        renderImage: function(b) {
            var c = this, d = c.canvas, e = c.image, f = void 0;
            e.rotate && (f = l({
                width: d.width,
                height: d.height,
                degree: e.rotate,
                aspectRatio: e.aspectRatio
            }, !0)), a.extend(e, f ? {
                width: f.width,
                height: f.height,
                left: (d.width - f.width) / 2,
                top: (d.height - f.height) / 2
            } : {
                width: d.width,
                height: d.height,
                left: 0,
                top: 0
            }), c.$clone.css({
                width: e.width,
                height: e.height,
                transform: k(a.extend({
                    translateX: e.left,
                    translateY: e.top
                }, e))
            }), b && c.output();
        },
        initCropBox: function() {
            var b = this, c = b.options, d = b.canvas, e = c.aspectRatio, f = Number(c.autoCropArea) || .8, g = {
                width: d.width,
                height: d.height
            };
            e && (d.height * e > d.width ? g.height = g.width / e : g.width = g.height * e), 
            b.cropBox = g, b.limitCropBox(!0, !0), g.width = Math.min(Math.max(g.width, g.minWidth), g.maxWidth), 
            g.height = Math.min(Math.max(g.height, g.minHeight), g.maxHeight), g.width = Math.max(g.minWidth, g.width * f), 
            g.height = Math.max(g.minHeight, g.height * f), g.oldLeft = g.left = d.left + (d.width - g.width) / 2, 
            g.oldTop = g.top = d.top + (d.height - g.height) / 2, b.initialCropBox = a.extend({}, g);
        },
        limitCropBox: function(a, b) {
            var c = this, d = c.options, e = d.aspectRatio, f = c.container, g = f.width, h = f.height, i = c.canvas, j = c.cropBox, k = c.limited;
            if (a) {
                var l = Number(d.minCropBoxWidth) || 0, m = Number(d.minCropBoxHeight) || 0, n = Math.min(g, k ? i.width : g), o = Math.min(h, k ? i.height : h);
                l = Math.min(l, g), m = Math.min(m, h), e && (l && m ? m * e > l ? m = l / e : l = m * e : l ? m = l / e : m && (l = m * e), 
                o * e > n ? o = n / e : n = o * e), j.minWidth = Math.min(l, n), j.minHeight = Math.min(m, o), 
                j.maxWidth = n, j.maxHeight = o;
            }
            b && (k ? (j.minLeft = Math.max(0, i.left), j.minTop = Math.max(0, i.top), j.maxLeft = Math.min(g, i.left + i.width) - j.width, 
            j.maxTop = Math.min(h, i.top + i.height) - j.height) : (j.minLeft = 0, j.minTop = 0, 
            j.maxLeft = g - j.width, j.maxTop = h - j.height));
        },
        renderCropBox: function() {
            var a = this, b = a.options, c = a.container, d = c.width, e = c.height, f = a.cropBox;
            (f.width > f.maxWidth || f.width < f.minWidth) && (f.left = f.oldLeft), (f.height > f.maxHeight || f.height < f.minHeight) && (f.top = f.oldTop), 
            f.width = Math.min(Math.max(f.width, f.minWidth), f.maxWidth), f.height = Math.min(Math.max(f.height, f.minHeight), f.maxHeight), 
            a.limitCropBox(!1, !0), f.oldLeft = f.left = Math.min(Math.max(f.left, f.minLeft), f.maxLeft), 
            f.oldTop = f.top = Math.min(Math.max(f.top, f.minTop), f.maxTop), b.movable && b.cropBoxMovable && a.$face.data("action", f.width === d && f.height === e ? "move" : "all"), 
            a.$cropBox.css({
                width: f.width,
                height: f.height,
                transform: k({
                    translateX: f.left,
                    translateY: f.top
                })
            }), a.cropped && a.limited && a.limitCanvas(!0, !0), a.disabled || a.output();
        },
        output: function() {
            var a = this;
            a.preview(), a.completed && a.trigger("crop", a.getData());
        }
    }, C = "preview", D = {
        initPreview: function() {
            var b = this, c = i(b.crossOrigin), d = c ? b.crossOriginUrl : b.url, e = void 0;
            b.$preview = a(b.options.preview), b.$clone2 = e = a("<img " + c + ' src="' + d + '">'), 
            b.$viewBox.html(e), b.$preview.each(function(b, e) {
                var f = a(e);
                f.data(C, {
                    width: f.width(),
                    height: f.height(),
                    html: f.html()
                }), f.html("<img " + c + ' src="' + d + '" style="display:block;width:100%;height:auto;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation:0deg!important;">');
            });
        },
        resetPreview: function() {
            this.$preview.each(function(b, c) {
                var d = a(c), e = d.data(C);
                d.css({
                    width: e.width,
                    height: e.height
                }).html(e.html).removeData(C);
            });
        },
        preview: function() {
            var b = this, c = b.image, d = b.canvas, e = b.cropBox, f = e.width, g = e.height, h = c.width, i = c.height, j = e.left - d.left - c.left, l = e.top - d.top - c.top;
            b.cropped && !b.disabled && (b.$clone2.css({
                width: h,
                height: i,
                transform: k(a.extend({
                    translateX: -j,
                    translateY: -l
                }, c))
            }), b.$preview.each(function(b, d) {
                var e = a(d), m = e.data(C), n = m.width, o = m.height, p = n, q = o, r = 1;
                f && (r = n / f, q = g * r), g && q > o && (r = o / g, p = f * r, q = o), e.css({
                    width: p,
                    height: q
                }).find("img").css({
                    width: h * r,
                    height: i * r,
                    transform: k(a.extend({
                        translateX: -j * r,
                        translateY: -l * r
                    }, c))
                });
            }));
        }
    }, E = "undefined" != typeof window ? window.PointerEvent : null, F = E ? "pointerdown" : "touchstart mousedown", G = E ? "pointermove" : "touchmove mousemove", H = E ? " pointerup pointercancel" : "touchend touchcancel mouseup", I = "wheel mousewheel DOMMouseScroll", J = "dblclick", K = "resize", L = "cropstart", M = "cropmove", N = "cropend", O = "crop", P = "zoom", Q = {
        bind: function() {
            var b = this, c = b.options, d = b.$element, f = b.$cropper;
            a.isFunction(c.cropstart) && d.on(L, c.cropstart), a.isFunction(c.cropmove) && d.on(M, c.cropmove), 
            a.isFunction(c.cropend) && d.on(N, c.cropend), a.isFunction(c.crop) && d.on(O, c.crop), 
            a.isFunction(c.zoom) && d.on(P, c.zoom), f.on(F, e(b.cropStart, this)), c.zoomable && c.zoomOnWheel && f.on(I, e(b.wheel, this)), 
            c.toggleDragModeOnDblclick && f.on(J, e(b.dblclick, this)), a(document).on(G, b.onCropMove = e(b.cropMove, this)).on(H, b.onCropEnd = e(b.cropEnd, this)), 
            c.responsive && a(window).on(K, b.onResize = e(b.resize, this));
        },
        unbind: function() {
            var b = this, c = b.options, d = b.$element, e = b.$cropper;
            a.isFunction(c.cropstart) && d.off(L, c.cropstart), a.isFunction(c.cropmove) && d.off(M, c.cropmove), 
            a.isFunction(c.cropend) && d.off(N, c.cropend), a.isFunction(c.crop) && d.off(O, c.crop), 
            a.isFunction(c.zoom) && d.off(P, c.zoom), e.off(F, b.cropStart), c.zoomable && c.zoomOnWheel && e.off(I, b.wheel), 
            c.toggleDragModeOnDblclick && e.off(J, b.dblclick), a(document).off(G, b.onCropMove).off(H, b.onCropEnd), 
            c.responsive && a(window).off(K, b.onResize);
        }
    }, R = /^(e|w|s|n|se|sw|ne|nw|all|crop|move|zoom)$/, S = {
        resize: function() {
            var b = this, c = b.options.restore, d = b.$container, e = b.container;
            if (!b.disabled && e) {
                var f = d.width() / e.width;
                1 === f && d.height() === e.height || function() {
                    var d = void 0, e = void 0;
                    c && (d = b.getCanvasData(), e = b.getCropBoxData()), b.render(), c && (b.setCanvasData(a.each(d, function(a, b) {
                        d[a] = b * f;
                    })), b.setCropBoxData(a.each(e, function(a, b) {
                        e[a] = b * f;
                    })));
                }();
            }
        },
        dblclick: function() {
            var a = this;
            a.disabled || a.setDragMode(a.$dragBox.hasClass("cropper-crop") ? "move" : "crop");
        },
        wheel: function(a) {
            var b = this, c = a.originalEvent || a, d = Number(b.options.wheelZoomRatio) || .1;
            if (!b.disabled && (a.preventDefault(), !b.wheeling)) {
                b.wheeling = !0, setTimeout(function() {
                    b.wheeling = !1;
                }, 50);
                var e = 1;
                c.deltaY ? e = c.deltaY > 0 ? 1 : -1 : c.wheelDelta ? e = -c.wheelDelta / 120 : c.detail && (e = c.detail > 0 ? 1 : -1), 
                b.zoom(-e * d, a);
            }
        },
        cropStart: function(b) {
            var c = this;
            if (!c.disabled) {
                var d = c.options, e = c.pointers, g = b.originalEvent, h = void 0;
                if (g && g.changedTouches ? a.each(g.changedTouches, function(a, b) {
                    e[b.identifier] = r(b);
                }) : e[g && g.pointerId || 0] = r(b), h = f(e).length > 1 && d.zoomable && d.zoomOnTouch ? "zoom" : a(b.target).data("action"), 
                R.test(h)) {
                    if (c.trigger("cropstart", {
                        originalEvent: g,
                        action: h
                    }).isDefaultPrevented()) return;
                    b.preventDefault(), c.action = h, c.cropping = !1, "crop" === h && (c.cropping = !0, 
                    c.$dragBox.addClass("cropper-modal"));
                }
            }
        },
        cropMove: function(b) {
            var c = this, d = c.action;
            if (!c.disabled && d) {
                var e = c.pointers, f = b.originalEvent;
                b.preventDefault(), c.trigger("cropmove", {
                    originalEvent: f,
                    action: d
                }).isDefaultPrevented() || (f && f.changedTouches ? a.each(f.changedTouches, function(b, c) {
                    a.extend(e[c.identifier], r(c, !0));
                }) : a.extend(e[f && f.pointerId || 0], r(b, !0)), c.change(b));
            }
        },
        cropEnd: function(b) {
            var c = this, d = c.action;
            if (!c.disabled && d) {
                var e = c.pointers, g = b.originalEvent;
                b.preventDefault(), g && g.changedTouches ? a.each(g.changedTouches, function(a, b) {
                    delete e[b.identifier];
                }) : delete e[g && g.pointerId || 0], f(e).length || (c.action = ""), c.cropping && (c.cropping = !1, 
                c.$dragBox.toggleClass("cropper-modal", c.cropped && c.options.modal)), c.trigger("cropend", {
                    originalEvent: g,
                    action: d
                });
            }
        }
    }, T = "e", U = "w", V = "s", W = "n", X = "se", Y = "sw", Z = "ne", $ = "nw", _ = {
        change: function(b) {
            var c = this, d = c.options, e = c.pointers, g = e[f(e)[0]], h = c.container, i = c.canvas, j = c.cropBox, k = c.action, l = d.aspectRatio, m = j.width, n = j.height, o = j.left, p = j.top, q = o + m, r = p + n, t = 0, u = 0, v = h.width, w = h.height, x = !0, y = void 0;
            !l && b.shiftKey && (l = m && n ? m / n : 1), c.limited && (t = j.minLeft, u = j.minTop, 
            v = t + Math.min(h.width, i.width, i.left + i.width), w = u + Math.min(h.height, i.height, i.top + i.height));
            var z = {
                x: g.endX - g.startX,
                y: g.endY - g.startY
            };
            switch (l && (z.X = z.y * l, z.Y = z.x / l), k) {
              case "all":
                o += z.x, p += z.y;
                break;

              case T:
                if (z.x >= 0 && (q >= v || l && (p <= u || r >= w))) {
                    x = !1;
                    break;
                }
                m += z.x, l && (n = m / l, p -= z.Y / 2), m < 0 && (k = U, m = 0);
                break;

              case W:
                if (z.y <= 0 && (p <= u || l && (o <= t || q >= v))) {
                    x = !1;
                    break;
                }
                n -= z.y, p += z.y, l && (m = n * l, o += z.X / 2), n < 0 && (k = V, n = 0);
                break;

              case U:
                if (z.x <= 0 && (o <= t || l && (p <= u || r >= w))) {
                    x = !1;
                    break;
                }
                m -= z.x, o += z.x, l && (n = m / l, p += z.Y / 2), m < 0 && (k = T, m = 0);
                break;

              case V:
                if (z.y >= 0 && (r >= w || l && (o <= t || q >= v))) {
                    x = !1;
                    break;
                }
                n += z.y, l && (m = n * l, o -= z.X / 2), n < 0 && (k = W, n = 0);
                break;

              case Z:
                if (l) {
                    if (z.y <= 0 && (p <= u || q >= v)) {
                        x = !1;
                        break;
                    }
                    n -= z.y, p += z.y, m = n * l;
                } else z.x >= 0 ? q < v ? m += z.x : z.y <= 0 && p <= u && (x = !1) : m += z.x, 
                z.y <= 0 ? p > u && (n -= z.y, p += z.y) : (n -= z.y, p += z.y);
                m < 0 && n < 0 ? (k = Y, n = 0, m = 0) : m < 0 ? (k = $, m = 0) : n < 0 && (k = X, 
                n = 0);
                break;

              case $:
                if (l) {
                    if (z.y <= 0 && (p <= u || o <= t)) {
                        x = !1;
                        break;
                    }
                    n -= z.y, p += z.y, m = n * l, o += z.X;
                } else z.x <= 0 ? o > t ? (m -= z.x, o += z.x) : z.y <= 0 && p <= u && (x = !1) : (m -= z.x, 
                o += z.x), z.y <= 0 ? p > u && (n -= z.y, p += z.y) : (n -= z.y, p += z.y);
                m < 0 && n < 0 ? (k = X, n = 0, m = 0) : m < 0 ? (k = Z, m = 0) : n < 0 && (k = Y, 
                n = 0);
                break;

              case Y:
                if (l) {
                    if (z.x <= 0 && (o <= t || r >= w)) {
                        x = !1;
                        break;
                    }
                    m -= z.x, o += z.x, n = m / l;
                } else z.x <= 0 ? o > t ? (m -= z.x, o += z.x) : z.y >= 0 && r >= w && (x = !1) : (m -= z.x, 
                o += z.x), z.y >= 0 ? r < w && (n += z.y) : n += z.y;
                m < 0 && n < 0 ? (k = Z, n = 0, m = 0) : m < 0 ? (k = X, m = 0) : n < 0 && (k = $, 
                n = 0);
                break;

              case X:
                if (l) {
                    if (z.x >= 0 && (q >= v || r >= w)) {
                        x = !1;
                        break;
                    }
                    m += z.x, n = m / l;
                } else z.x >= 0 ? q < v ? m += z.x : z.y >= 0 && r >= w && (x = !1) : m += z.x, 
                z.y >= 0 ? r < w && (n += z.y) : n += z.y;
                m < 0 && n < 0 ? (k = $, n = 0, m = 0) : m < 0 ? (k = Y, m = 0) : n < 0 && (k = Z, 
                n = 0);
                break;

              case "move":
                c.move(z.x, z.y), x = !1;
                break;

              case "zoom":
                c.zoom(s(e), b.originalEvent), x = !1;
                break;

              case "crop":
                if (!z.x || !z.y) {
                    x = !1;
                    break;
                }
                y = c.$cropper.offset(), o = g.startX - y.left, p = g.startY - y.top, m = j.minWidth, 
                n = j.minHeight, z.x > 0 ? k = z.y > 0 ? X : Z : z.x < 0 && (o -= m, k = z.y > 0 ? Y : $), 
                z.y < 0 && (p -= n), c.cropped || (c.$cropBox.removeClass("cropper-hidden"), c.cropped = !0, 
                c.limited && c.limitCropBox(!0, !0));
            }
            x && (j.width = m, j.height = n, j.left = o, j.top = p, c.action = k, c.renderCropBox()), 
            a.each(e, function(a, b) {
                b.startX = b.endX, b.startY = b.endY;
            });
        }
    }, aa = function(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
    }, ba = function() {
        function a(a, b) {
            for (var c = 0; c < b.length; c++) {
                var d = b[c];
                d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), 
                Object.defineProperty(a, d.key, d);
            }
        }
        return function(b, c, d) {
            return c && a(b.prototype, c), d && a(b, d), b;
        };
    }(), ca = function(a) {
        if (Array.isArray(a)) {
            for (var b = 0, c = Array(a.length); b < a.length; b++) c[b] = a[b];
            return c;
        }
        return Array.from(a);
    }, da = {
        crop: function() {
            var a = this;
            a.ready && !a.disabled && (a.cropped || (a.cropped = !0, a.limitCropBox(!0, !0), 
            a.options.modal && a.$dragBox.addClass("cropper-modal"), a.$cropBox.removeClass("cropper-hidden")), 
            a.setCropBoxData(a.initialCropBox));
        },
        reset: function() {
            var b = this;
            b.ready && !b.disabled && (b.image = a.extend({}, b.initialImage), b.canvas = a.extend({}, b.initialCanvas), 
            b.cropBox = a.extend({}, b.initialCropBox), b.renderCanvas(), b.cropped && b.renderCropBox());
        },
        clear: function() {
            var b = this;
            b.cropped && !b.disabled && (a.extend(b.cropBox, {
                left: 0,
                top: 0,
                width: 0,
                height: 0
            }), b.cropped = !1, b.renderCropBox(), b.limitCanvas(!0, !0), b.renderCanvas(), 
            b.$dragBox.removeClass("cropper-modal"), b.$cropBox.addClass("cropper-hidden"));
        },
        replace: function(a, b) {
            var c = this;
            !c.disabled && a && (c.isImg && c.$element.attr("src", a), b ? (c.url = a, c.$clone.attr("src", a), 
            c.ready && c.$preview.find("img").add(c.$clone2).attr("src", a)) : (c.isImg && (c.replaced = !0), 
            c.options.data = null, c.load(a)));
        },
        enable: function() {
            var a = this;
            a.ready && (a.disabled = !1, a.$cropper.removeClass("cropper-disabled"));
        },
        disable: function() {
            var a = this;
            a.ready && (a.disabled = !0, a.$cropper.addClass("cropper-disabled"));
        },
        destroy: function() {
            var a = this, b = a.$element;
            a.loaded ? (a.isImg && a.replaced && b.attr("src", a.originalUrl), a.unbuild(), 
            b.removeClass("cropper-hidden")) : a.isImg ? b.off("load", a.start) : a.$clone && a.$clone.remove(), 
            b.removeData("cropper");
        },
        move: function(a, b) {
            var d = this, e = d.canvas;
            d.moveTo(c(a) ? a : e.left + Number(a), c(b) ? b : e.top + Number(b));
        },
        moveTo: function(a, d) {
            var e = this, f = e.canvas, g = !1;
            c(d) && (d = a), a = Number(a), d = Number(d), e.ready && !e.disabled && e.options.movable && (b(a) && (f.left = a, 
            g = !0), b(d) && (f.top = d, g = !0), g && e.renderCanvas(!0));
        },
        zoom: function(a, b) {
            var c = this, d = c.canvas;
            a = Number(a), a = a < 0 ? 1 / (1 - a) : 1 + a, c.zoomTo(d.width * a / d.naturalWidth, b);
        },
        zoomTo: function(a, b) {
            var c = this, d = c.options, e = c.pointers, g = c.canvas, h = g.width, i = g.height, j = g.naturalWidth, k = g.naturalHeight;
            if ((a = Number(a)) >= 0 && c.ready && !c.disabled && d.zoomable) {
                var l = j * a, m = k * a, n = void 0;
                if (b && (n = b.originalEvent), c.trigger("zoom", {
                    originalEvent: n,
                    oldRatio: h / j,
                    ratio: l / j
                }).isDefaultPrevented()) return;
                if (n) {
                    var o = c.$cropper.offset(), p = e && f(e).length ? t(e) : {
                        pageX: b.pageX || n.pageX || 0,
                        pageY: b.pageY || n.pageY || 0
                    };
                    g.left -= (l - h) * ((p.pageX - o.left - g.left) / h), g.top -= (m - i) * ((p.pageY - o.top - g.top) / i);
                } else g.left -= (l - h) / 2, g.top -= (m - i) / 2;
                g.width = l, g.height = m, c.renderCanvas(!0);
            }
        },
        rotate: function(a) {
            var b = this;
            b.rotateTo((b.image.rotate || 0) + Number(a));
        },
        rotateTo: function(a) {
            var c = this;
            a = Number(a), b(a) && c.ready && !c.disabled && c.options.rotatable && (c.image.rotate = a % 360, 
            c.rotated = !0, c.renderCanvas(!0));
        },
        scale: function(a, d) {
            var e = this, f = e.image, g = !1;
            c(d) && (d = a), a = Number(a), d = Number(d), e.ready && !e.disabled && e.options.scalable && (b(a) && (f.scaleX = a, 
            g = !0), b(d) && (f.scaleY = d, g = !0), g && e.renderImage(!0));
        },
        scaleX: function(a) {
            var c = this, d = c.image.scaleY;
            c.scale(a, b(d) ? d : 1);
        },
        scaleY: function(a) {
            var c = this, d = c.image.scaleX;
            c.scale(b(d) ? d : 1, a);
        },
        getData: function(b) {
            var c = this, d = c.options, e = c.image, f = c.canvas, g = c.cropBox, h = void 0, i = void 0;
            return c.ready && c.cropped ? (i = {
                x: g.left - f.left,
                y: g.top - f.top,
                width: g.width,
                height: g.height
            }, h = e.width / e.naturalWidth, a.each(i, function(a, c) {
                c /= h, i[a] = b ? Math.round(c) : c;
            })) : i = {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            }, d.rotatable && (i.rotate = e.rotate || 0), d.scalable && (i.scaleX = e.scaleX || 1, 
            i.scaleY = e.scaleY || 1), i;
        },
        setData: function(c) {
            var d = this, e = d.options, f = d.image, g = d.canvas, h = {}, i = void 0, j = void 0, k = void 0;
            a.isFunction(c) && (c = c.call(d.element)), d.ready && !d.disabled && a.isPlainObject(c) && (e.rotatable && b(c.rotate) && c.rotate !== f.rotate && (f.rotate = c.rotate, 
            d.rotated = i = !0), e.scalable && (b(c.scaleX) && c.scaleX !== f.scaleX && (f.scaleX = c.scaleX, 
            j = !0), b(c.scaleY) && c.scaleY !== f.scaleY && (f.scaleY = c.scaleY, j = !0)), 
            i ? d.renderCanvas() : j && d.renderImage(), k = f.width / f.naturalWidth, b(c.x) && (h.left = c.x * k + g.left), 
            b(c.y) && (h.top = c.y * k + g.top), b(c.width) && (h.width = c.width * k), b(c.height) && (h.height = c.height * k), 
            d.setCropBoxData(h));
        },
        getContainerData: function() {
            return this.ready ? this.container : {};
        },
        getImageData: function() {
            return this.loaded ? this.image : {};
        },
        getCanvasData: function() {
            var b = this, c = b.canvas, d = {};
            return b.ready && a.each([ "left", "top", "width", "height", "naturalWidth", "naturalHeight" ], function(a, b) {
                d[b] = c[b];
            }), d;
        },
        setCanvasData: function(c) {
            var d = this, e = d.canvas, f = e.aspectRatio;
            a.isFunction(c) && (c = c.call(d.$element)), d.ready && !d.disabled && a.isPlainObject(c) && (b(c.left) && (e.left = c.left), 
            b(c.top) && (e.top = c.top), b(c.width) ? (e.width = c.width, e.height = c.width / f) : b(c.height) && (e.height = c.height, 
            e.width = c.height * f), d.renderCanvas(!0));
        },
        getCropBoxData: function() {
            var a = this, b = a.cropBox;
            return a.ready && a.cropped ? {
                left: b.left,
                top: b.top,
                width: b.width,
                height: b.height
            } : {};
        },
        setCropBoxData: function(c) {
            var d = this, e = d.cropBox, f = d.options.aspectRatio, g = void 0, h = void 0;
            a.isFunction(c) && (c = c.call(d.$element)), d.ready && d.cropped && !d.disabled && a.isPlainObject(c) && (b(c.left) && (e.left = c.left), 
            b(c.top) && (e.top = c.top), b(c.width) && c.width !== e.width && (g = !0, e.width = c.width), 
            b(c.height) && c.height !== e.height && (h = !0, e.height = c.height), f && (g ? e.height = e.width / f : h && (e.width = e.height * f)), 
            d.renderCropBox());
        },
        getCroppedCanvas: function(b) {
            var c = this;
            if (!c.ready || !window.HTMLCanvasElement) return null;
            if (!c.cropped) return m(c.$clone[0], c.image);
            a.isPlainObject(b) || (b = {});
            var d = c.getData(), e = d.width, f = d.height, g = e / f, h = void 0, i = void 0, j = void 0;
            a.isPlainObject(b) && (h = b.width, i = b.height, h ? (i = h / g, j = h / e) : i && (h = i * g, 
            j = i / f));
            var k = Math.floor(h || e), l = Math.floor(i || f), n = a("<canvas>")[0], o = n.getContext("2d");
            n.width = k, n.height = l, b.fillColor && (o.fillStyle = b.fillColor, o.fillRect(0, 0, k, l));
            var p = function() {
                var a = m(c.$clone[0], c.image), b = a.width, g = a.height, h = c.canvas, i = [ a ], k = d.x + h.naturalWidth * (Math.abs(d.scaleX || 1) - 1) / 2, l = d.y + h.naturalHeight * (Math.abs(d.scaleY || 1) - 1) / 2, n = void 0, o = void 0, p = void 0, q = void 0, r = void 0, s = void 0;
                return k <= -e || k > b ? k = n = p = r = 0 : k <= 0 ? (p = -k, k = 0, n = r = Math.min(b, e + k)) : k <= b && (p = 0, 
                n = r = Math.min(e, b - k)), n <= 0 || l <= -f || l > g ? l = o = q = s = 0 : l <= 0 ? (q = -l, 
                l = 0, o = s = Math.min(g, f + l)) : l <= g && (q = 0, o = s = Math.min(f, g - l)), 
                i.push(Math.floor(k), Math.floor(l), Math.floor(n), Math.floor(o)), j && (p *= j, 
                q *= j, r *= j, s *= j), r > 0 && s > 0 && i.push(Math.floor(p), Math.floor(q), Math.floor(r), Math.floor(s)), 
                i;
            }();
            return o.drawImage.apply(o, ca(p)), n;
        },
        setAspectRatio: function(a) {
            var b = this, d = b.options;
            b.disabled || c(a) || (d.aspectRatio = Math.max(0, a) || NaN, b.ready && (b.initCropBox(), 
            b.cropped && b.renderCropBox()));
        },
        setDragMode: function(a) {
            var b = this, c = b.options, d = void 0, e = void 0;
            b.loaded && !b.disabled && (d = "crop" === a, e = c.movable && "move" === a, a = d || e ? a : "none", 
            b.$dragBox.data("action", a).toggleClass("cropper-crop", d).toggleClass("cropper-move", e), 
            c.cropBoxMovable || b.$face.data("action", a).toggleClass("cropper-crop", d).toggleClass("cropper-move", e));
        }
    }, ea = "cropper-hidden", fa = /^data:/, ga = /^data:image\/jpeg.*;base64,/, ha = function() {
        function b(c, d) {
            aa(this, b);
            var e = this;
            e.$element = a(c), e.options = a.extend({}, u, a.isPlainObject(d) && d), e.loaded = !1, 
            e.ready = !1, e.completed = !1, e.rotated = !1, e.cropped = !1, e.disabled = !1, 
            e.replaced = !1, e.limited = !1, e.wheeling = !1, e.isImg = !1, e.originalUrl = "", 
            e.canvas = null, e.cropBox = null, e.pointers = {}, e.init();
        }
        return ba(b, [ {
            key: "init",
            value: function() {
                var a = this, b = a.$element, c = void 0;
                if (b.is("img")) {
                    if (a.isImg = !0, a.originalUrl = c = b.attr("src"), !c) return;
                    c = b.prop("src");
                } else b.is("canvas") && window.HTMLCanvasElement && (c = b[0].toDataURL());
                a.load(c);
            }
        }, {
            key: "trigger",
            value: function(b, c) {
                var d = a.Event(b, c);
                return this.$element.trigger(d), d;
            }
        }, {
            key: "load",
            value: function(b) {
                var c = this, d = c.options, e = c.$element;
                if (b) {
                    if (c.url = b, c.image = {}, !d.checkOrientation || !ArrayBuffer) return void c.clone();
                    if (fa.test(b)) return void (ga.test(b) ? c.read(p(b)) : c.clone());
                    var f = new XMLHttpRequest();
                    f.onerror = f.onabort = a.proxy(function() {
                        c.clone();
                    }, this), f.onload = function() {
                        c.read(this.response);
                    }, d.checkCrossOrigin && g(b) && e.prop("crossOrigin") && (b = h(b)), f.open("get", b), 
                    f.responseType = "arraybuffer", f.withCredentials = "use-credentials" === e.prop("crossOrigin"), 
                    f.send();
                }
            }
        }, {
            key: "read",
            value: function(a) {
                var b = this, c = b.options, d = o(a), e = b.image, f = 0, g = 1, h = 1;
                if (d > 1) switch (b.url = q(a), d) {
                  case 2:
                    g = -1;
                    break;

                  case 3:
                    f = -180;
                    break;

                  case 4:
                    h = -1;
                    break;

                  case 5:
                    f = 90, h = -1;
                    break;

                  case 6:
                    f = 90;
                    break;

                  case 7:
                    f = 90, g = -1;
                    break;

                  case 8:
                    f = -90;
                }
                c.rotatable && (e.rotate = f), c.scalable && (e.scaleX = g, e.scaleY = h), b.clone();
            }
        }, {
            key: "clone",
            value: function() {
                var b = this, c = b.options, d = b.$element, e = b.url, f = "", j = void 0;
                c.checkCrossOrigin && g(e) && (f = d.prop("crossOrigin"), f ? j = e : (f = "anonymous", 
                j = h(e))), b.crossOrigin = f, b.crossOriginUrl = j;
                var k = a("<img " + i(f) + ' src="' + (j || e) + '">');
                b.$clone = k, b.isImg ? d[0].complete ? b.start() : d.one("load", a.proxy(b.start, this)) : k.one("load", a.proxy(b.start, this)).one("error", a.proxy(b.stop, this)).addClass("cropper-hide").insertAfter(d);
            }
        }, {
            key: "start",
            value: function() {
                var b = this, c = b.$clone, d = b.$element;
                b.isImg || (c.off("error", b.stop), d = c), j(d[0], function(c, d) {
                    a.extend(b.image, {
                        naturalWidth: c,
                        naturalHeight: d,
                        aspectRatio: c / d
                    }), b.loaded = !0, b.build();
                });
            }
        }, {
            key: "stop",
            value: function() {
                var a = this;
                a.$clone.remove(), a.$clone = null;
            }
        }, {
            key: "build",
            value: function() {
                var b = this, c = b.options, d = b.$element, e = b.$clone, f = void 0, g = void 0, h = void 0;
                b.loaded && (b.ready && b.unbuild(), b.$container = d.parent(), b.$cropper = f = a(v), 
                b.$canvas = f.find(".cropper-canvas").append(e), b.$dragBox = f.find(".cropper-drag-box"), 
                b.$cropBox = g = f.find(".cropper-crop-box"), b.$viewBox = f.find(".cropper-view-box"), 
                b.$face = h = g.find(".cropper-face"), d.addClass(ea).after(f), b.isImg || e.removeClass("cropper-hide"), 
                b.initPreview(), b.bind(), c.aspectRatio = Math.max(0, c.aspectRatio) || NaN, c.viewMode = Math.max(0, Math.min(3, Math.round(c.viewMode))) || 0, 
                b.cropped = c.autoCrop, c.autoCrop ? c.modal && b.$dragBox.addClass("cropper-modal") : g.addClass(ea), 
                c.guides || g.find(".cropper-dashed").addClass(ea), c.center || g.find(".cropper-center").addClass(ea), 
                c.cropBoxMovable && h.addClass("cropper-move").data("action", "all"), c.highlight || h.addClass("cropper-invisible"), 
                c.background && f.addClass("cropper-bg"), c.cropBoxResizable || g.find(".cropper-line, .cropper-point").addClass(ea), 
                b.setDragMode(c.dragMode), b.render(), b.ready = !0, b.setData(c.data), b.completing = setTimeout(function() {
                    a.isFunction(c.ready) && d.one("ready", c.ready), b.trigger("ready"), b.trigger("crop", b.getData()), 
                    b.completed = !0;
                }, 0));
            }
        }, {
            key: "unbuild",
            value: function() {
                var a = this;
                a.ready && (a.completed || clearTimeout(a.completing), a.ready = !1, a.completed = !1, 
                a.initialImage = null, a.initialCanvas = null, a.initialCropBox = null, a.container = null, 
                a.canvas = null, a.cropBox = null, a.unbind(), a.resetPreview(), a.$preview = null, 
                a.$viewBox = null, a.$cropBox = null, a.$dragBox = null, a.$canvas = null, a.$container = null, 
                a.$cropper.remove(), a.$cropper = null);
            }
        } ], [ {
            key: "setDefaults",
            value: function(b) {
                a.extend(u, a.isPlainObject(b) && b);
            }
        } ]), b;
    }();
    a.extend(ha.prototype, B), a.extend(ha.prototype, D), a.extend(ha.prototype, Q), 
    a.extend(ha.prototype, S), a.extend(ha.prototype, _), a.extend(ha.prototype, da);
    var ia = "cropper", ja = a.fn.cropper;
    a.fn.cropper = function(b) {
        for (var c = arguments.length, d = Array(c > 1 ? c - 1 : 0), e = 1; e < c; e++) d[e - 1] = arguments[e];
        var f = void 0;
        return this.each(function(c, e) {
            var g = a(e), h = g.data(ia);
            if (!h) {
                if (/destroy/.test(b)) return;
                var i = a.extend({}, g.data(), a.isPlainObject(b) && b);
                g.data(ia, h = new ha(e, i));
            }
            if ("string" == typeof b) {
                var j = h[b];
                a.isFunction(j) && (f = j.apply(h, d));
            }
        }), void 0 !== f ? f : this;
    }, a.fn.cropper.Constructor = ha, a.fn.cropper.setDefaults = ha.setDefaults, a.fn.cropper.noConflict = function() {
        return a.fn.cropper = ja, this;
    };
}), function(global) {
    !function(a) {
        function b(a) {
            var b = h(a || {}), d = c(b);
            return e(d), g(b, d), l;
        }
        function c(a) {
            var b = f("uploaderType"), c = f("endpointType");
            return b ? (b = b.charAt(0).toUpperCase() + b.slice(1).toLowerCase(), c ? new qq[c]["FineUploader" + b](a) : new qq["FineUploader" + b](a)) : c ? new qq[c].FineUploader(a) : new qq.FineUploader(a);
        }
        function d(a, b) {
            var c = l.data("fineuploader");
            if (!b) return void 0 === c ? null : c[a];
            void 0 === c && (c = {}), c[a] = b, l.data("fineuploader", c);
        }
        function e(a) {
            return d("uploader", a);
        }
        function f(a, b) {
            return d(a, b);
        }
        function g(b, c) {
            var d = b.callbacks = {};
            a.each(c._options.callbacks, function(b, c) {
                var e, f;
                e = /^on(\w+)/.exec(b)[1], e = e.substring(0, 1).toLowerCase() + e.substring(1), 
                f = l, d[b] = function() {
                    var b, d, g = Array.prototype.slice.call(arguments), h = [];
                    a.each(g, function(a, b) {
                        h.push(k(b));
                    }), b = c.apply(this, g);
                    try {
                        d = f.triggerHandler(e, h);
                    } catch (a) {
                        qq.log("Caught error in Fine Uploader jQuery event handler: " + a.message, "error");
                    }
                    return null != b ? b : d;
                };
            }), c._options.callbacks = d;
        }
        function h(b, c) {
            var d, e;
            if (d = void 0 === c ? "basic" !== b.uploaderType ? {
                element: l[0]
            } : {} : c, a.each(b, function(b, c) {
                a.inArray(b, m) >= 0 ? f(b, c) : c instanceof a ? d[b] = c[0] : a.isPlainObject(c) ? (d[b] = {}, 
                h(c, d[b])) : a.isArray(c) ? (e = [], a.each(c, function(b, c) {
                    var d = {};
                    c instanceof a ? a.merge(e, c) : a.isPlainObject(c) ? (h(c, d), e.push(d)) : e.push(c);
                }), d[b] = e) : d[b] = c;
            }), void 0 === c) return d;
        }
        function i(b) {
            return "string" === a.type(b) && !b.match(/^_/) && void 0 !== e()[b];
        }
        function j(a) {
            var b, c = [];
            return h(Array.prototype.slice.call(arguments, 1), c), b = e()[a].apply(e(), c), 
            k(b);
        }
        function k(b) {
            var c = b;
            return null == b || "object" != typeof b || 1 !== b.nodeType && 9 !== b.nodeType || !b.cloneNode || (c = a(b)), 
            c;
        }
        var l, m = [ "uploaderType", "endpointType" ];
        a.fn.fineUploader = function(c) {
            var d = this, f = arguments, g = [];
            return this.each(function(h, k) {
                if (l = a(k), e() && i(c)) {
                    if (g.push(j.apply(d, f)), 1 === d.length) return !1;
                } else "object" != typeof c && c ? a.error("Method " + c + " does not exist on jQuery.fineUploader") : b.apply(d, f);
            }), 1 === g.length ? g[0] : g.length > 1 ? g : this;
        };
    }(jQuery), function(a) {
        function b(a) {
            a || (a = {}), a.dropZoneElements = [ i ];
            var b = f(a);
            return e(b), d(new qq.DragAndDrop(b)), i;
        }
        function c(a, b) {
            var c = i.data("fineUploaderDnd");
            if (!b) return void 0 === c ? null : c[a];
            void 0 === c && (c = {}), c[a] = b, i.data("fineUploaderDnd", c);
        }
        function d(a) {
            return c("dndInstance", a);
        }
        function e(b) {
            var c = b.callbacks = {};
            a.each(new qq.DragAndDrop.callbacks(), function(a, b) {
                var d, e = a;
                d = i, c[a] = function() {
                    var a = Array.prototype.slice.call(arguments);
                    return d.triggerHandler(e, a);
                };
            });
        }
        function f(b, c) {
            var d, e;
            if (d = void 0 === c ? {} : c, a.each(b, function(b, c) {
                c instanceof a ? d[b] = c[0] : a.isPlainObject(c) ? (d[b] = {}, f(c, d[b])) : a.isArray(c) ? (e = [], 
                a.each(c, function(b, c) {
                    c instanceof a ? a.merge(e, c) : e.push(c);
                }), d[b] = e) : d[b] = c;
            }), void 0 === c) return d;
        }
        function g(b) {
            return "string" === a.type(b) && "dispose" === b && void 0 !== d()[b];
        }
        function h(a) {
            var b = [];
            return f(Array.prototype.slice.call(arguments, 1), b), d()[a].apply(d(), b);
        }
        var i;
        a.fn.fineUploaderDnd = function(c) {
            var e = this, f = arguments, j = [];
            return this.each(function(k, l) {
                if (i = a(l), d() && g(c)) {
                    if (j.push(h.apply(e, f)), 1 === e.length) return !1;
                } else "object" != typeof c && c ? a.error("Method " + c + " does not exist in Fine Uploader's DnD module.") : b.apply(e, f);
            }), 1 === j.length ? j[0] : j.length > 1 ? j : this;
        };
    }(jQuery);
    var qq = function(a) {
        return {
            hide: function() {
                return a.style.display = "none", this;
            },
            attach: function(b, c) {
                return a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent("on" + b, c), 
                function() {
                    qq(a).detach(b, c);
                };
            },
            detach: function(b, c) {
                return a.removeEventListener ? a.removeEventListener(b, c, !1) : a.attachEvent && a.detachEvent("on" + b, c), 
                this;
            },
            contains: function(b) {
                return !!b && (a === b || (a.contains ? a.contains(b) : !!(8 & b.compareDocumentPosition(a))));
            },
            insertBefore: function(b) {
                return b.parentNode.insertBefore(a, b), this;
            },
            remove: function() {
                return a.parentNode.removeChild(a), this;
            },
            css: function(b) {
                if (null == a.style) throw new qq.Error("Can't apply style to node as it is not on the HTMLElement prototype chain!");
                return null != b.opacity && "string" != typeof a.style.opacity && void 0 !== a.filters && (b.filter = "alpha(opacity=" + Math.round(100 * b.opacity) + ")"), 
                qq.extend(a.style, b), this;
            },
            hasClass: function(b, c) {
                var d = new RegExp("(^| )" + b + "( |$)");
                return d.test(a.className) || !(!c || !d.test(a.parentNode.className));
            },
            addClass: function(b) {
                return qq(a).hasClass(b) || (a.className += " " + b), this;
            },
            removeClass: function(b) {
                var c = new RegExp("(^| )" + b + "( |$)");
                return a.className = a.className.replace(c, " ").replace(/^\s+|\s+$/g, ""), this;
            },
            getByClass: function(b, c) {
                var d, e = [];
                return c && a.querySelector ? a.querySelector("." + b) : a.querySelectorAll ? a.querySelectorAll("." + b) : (d = a.getElementsByTagName("*"), 
                qq.each(d, function(a, c) {
                    qq(c).hasClass(b) && e.push(c);
                }), c ? e[0] : e);
            },
            getFirstByClass: function(b) {
                return qq(a).getByClass(b, !0);
            },
            children: function() {
                for (var b = [], c = a.firstChild; c; ) 1 === c.nodeType && b.push(c), c = c.nextSibling;
                return b;
            },
            setText: function(b) {
                return a.innerText = b, a.textContent = b, this;
            },
            clearText: function() {
                return qq(a).setText("");
            },
            hasAttribute: function(b) {
                var c;
                return a.hasAttribute ? !!a.hasAttribute(b) && null == /^false$/i.exec(a.getAttribute(b)) : void 0 !== (c = a[b]) && null == /^false$/i.exec(c);
            }
        };
    };
    !function() {
        qq.canvasToBlob = function(a, b, c) {
            return qq.dataUriToBlob(a.toDataURL(b, c));
        }, qq.dataUriToBlob = function(a) {
            var b, c, d, e, f = function(a, b) {
                var c = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder, d = c && new c();
                return d ? (d.append(a), d.getBlob(b)) : new Blob([ a ], {
                    type: b
                });
            };
            return c = a.split(",")[0].indexOf("base64") >= 0 ? atob(a.split(",")[1]) : decodeURI(a.split(",")[1]), 
            e = a.split(",")[0].split(":")[1].split(";")[0], b = new ArrayBuffer(c.length), 
            d = new Uint8Array(b), qq.each(c, function(a, b) {
                d[a] = b.charCodeAt(0);
            }), f(b, e);
        }, qq.log = function(a, b) {
            window.console && (b && "info" !== b ? window.console[b] ? window.console[b](a) : window.console.log("<" + b + "> " + a) : window.console.log(a));
        }, qq.isObject = function(a) {
            return a && !a.nodeType && "[object Object]" === Object.prototype.toString.call(a);
        }, qq.isFunction = function(a) {
            return "function" == typeof a;
        }, qq.isArray = function(a) {
            return "[object Array]" === Object.prototype.toString.call(a) || a && window.ArrayBuffer && a.buffer && a.buffer.constructor === ArrayBuffer;
        }, qq.isItemList = function(a) {
            return "[object DataTransferItemList]" === Object.prototype.toString.call(a);
        }, qq.isNodeList = function(a) {
            return "[object NodeList]" === Object.prototype.toString.call(a) || a.item && a.namedItem;
        }, qq.isString = function(a) {
            return "[object String]" === Object.prototype.toString.call(a);
        }, qq.trimStr = function(a) {
            return String.prototype.trim ? a.trim() : a.replace(/^\s+|\s+$/g, "");
        }, qq.format = function(a) {
            var b = Array.prototype.slice.call(arguments, 1), c = a, d = c.indexOf("{}");
            return qq.each(b, function(a, b) {
                if (c = c.substring(0, d) + b + c.substring(d + 2), (d = c.indexOf("{}", d + b.length)) < 0) return !1;
            }), c;
        }, qq.isFile = function(a) {
            return window.File && "[object File]" === Object.prototype.toString.call(a);
        }, qq.isFileList = function(a) {
            return window.FileList && "[object FileList]" === Object.prototype.toString.call(a);
        }, qq.isFileOrInput = function(a) {
            return qq.isFile(a) || qq.isInput(a);
        }, qq.isInput = function(a, b) {
            var c = function(a) {
                var c = a.toLowerCase();
                return b ? "file" !== c : "file" === c;
            };
            return !!(window.HTMLInputElement && "[object HTMLInputElement]" === Object.prototype.toString.call(a) && a.type && c(a.type)) || !!(a.tagName && "input" === a.tagName.toLowerCase() && a.type && c(a.type));
        }, qq.isBlob = function(a) {
            if (window.Blob && "[object Blob]" === Object.prototype.toString.call(a)) return !0;
        }, qq.isXhrUploadSupported = function() {
            var a = document.createElement("input");
            return a.type = "file", void 0 !== a.multiple && "undefined" != typeof File && "undefined" != typeof FormData && void 0 !== qq.createXhrInstance().upload;
        }, qq.createXhrInstance = function() {
            if (window.XMLHttpRequest) return new XMLHttpRequest();
            try {
                return new ActiveXObject("MSXML2.XMLHTTP.3.0");
            } catch (a) {
                return qq.log("Neither XHR or ActiveX are supported!", "error"), null;
            }
        }, qq.isFolderDropSupported = function(a) {
            return a.items && a.items.length > 0 && a.items[0].webkitGetAsEntry;
        }, qq.isFileChunkingSupported = function() {
            return !qq.androidStock() && qq.isXhrUploadSupported() && (void 0 !== File.prototype.slice || void 0 !== File.prototype.webkitSlice || void 0 !== File.prototype.mozSlice);
        }, qq.sliceBlob = function(a, b, c) {
            return (a.slice || a.mozSlice || a.webkitSlice).call(a, b, c);
        }, qq.arrayBufferToHex = function(a) {
            var b = "", c = new Uint8Array(a);
            return qq.each(c, function(a, c) {
                var d = c.toString(16);
                d.length < 2 && (d = "0" + d), b += d;
            }), b;
        }, qq.readBlobToHex = function(a, b, c) {
            var d = qq.sliceBlob(a, b, b + c), e = new FileReader(), f = new qq.Promise();
            return e.onload = function() {
                f.success(qq.arrayBufferToHex(e.result));
            }, e.onerror = f.failure, e.readAsArrayBuffer(d), f;
        }, qq.extend = function(a, b, c) {
            return qq.each(b, function(b, d) {
                c && qq.isObject(d) ? (void 0 === a[b] && (a[b] = {}), qq.extend(a[b], d, !0)) : a[b] = d;
            }), a;
        }, qq.override = function(a, b) {
            var c = {}, d = b(c);
            return qq.each(d, function(b, d) {
                void 0 !== a[b] && (c[b] = a[b]), a[b] = d;
            }), a;
        }, qq.indexOf = function(a, b, c) {
            if (a.indexOf) return a.indexOf(b, c);
            c = c || 0;
            var d = a.length;
            for (c < 0 && (c += d); c < d; c += 1) if (a.hasOwnProperty(c) && a[c] === b) return c;
            return -1;
        }, qq.getUniqueId = function() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(a) {
                var b = 16 * Math.random() | 0;
                return ("x" == a ? b : 3 & b | 8).toString(16);
            });
        }, qq.ie = function() {
            return -1 !== navigator.userAgent.indexOf("MSIE") || -1 !== navigator.userAgent.indexOf("Trident");
        }, qq.ie7 = function() {
            return -1 !== navigator.userAgent.indexOf("MSIE 7");
        }, qq.ie8 = function() {
            return -1 !== navigator.userAgent.indexOf("MSIE 8");
        }, qq.ie10 = function() {
            return -1 !== navigator.userAgent.indexOf("MSIE 10");
        }, qq.ie11 = function() {
            return qq.ie() && -1 !== navigator.userAgent.indexOf("rv:11");
        }, qq.edge = function() {
            return navigator.userAgent.indexOf("Edge") >= 0;
        }, qq.safari = function() {
            return void 0 !== navigator.vendor && -1 !== navigator.vendor.indexOf("Apple");
        }, qq.chrome = function() {
            return void 0 !== navigator.vendor && -1 !== navigator.vendor.indexOf("Google");
        }, qq.opera = function() {
            return void 0 !== navigator.vendor && -1 !== navigator.vendor.indexOf("Opera");
        }, qq.firefox = function() {
            return !qq.edge() && !qq.ie11() && -1 !== navigator.userAgent.indexOf("Mozilla") && void 0 !== navigator.vendor && "" === navigator.vendor;
        }, qq.windows = function() {
            return "Win32" === navigator.platform;
        }, qq.android = function() {
            return -1 !== navigator.userAgent.toLowerCase().indexOf("android");
        }, qq.androidStock = function() {
            return qq.android() && navigator.userAgent.toLowerCase().indexOf("chrome") < 0;
        }, qq.ios6 = function() {
            return qq.ios() && -1 !== navigator.userAgent.indexOf(" OS 6_");
        }, qq.ios7 = function() {
            return qq.ios() && -1 !== navigator.userAgent.indexOf(" OS 7_");
        }, qq.ios8 = function() {
            return qq.ios() && -1 !== navigator.userAgent.indexOf(" OS 8_");
        }, qq.ios800 = function() {
            return qq.ios() && -1 !== navigator.userAgent.indexOf(" OS 8_0 ");
        }, qq.ios = function() {
            return -1 !== navigator.userAgent.indexOf("iPad") || -1 !== navigator.userAgent.indexOf("iPod") || -1 !== navigator.userAgent.indexOf("iPhone");
        }, qq.iosChrome = function() {
            return qq.ios() && -1 !== navigator.userAgent.indexOf("CriOS");
        }, qq.iosSafari = function() {
            return qq.ios() && !qq.iosChrome() && -1 !== navigator.userAgent.indexOf("Safari");
        }, qq.iosSafariWebView = function() {
            return qq.ios() && !qq.iosChrome() && !qq.iosSafari();
        }, qq.preventDefault = function(a) {
            a.preventDefault ? a.preventDefault() : a.returnValue = !1;
        }, qq.toElement = function() {
            var a = document.createElement("div");
            return function(b) {
                a.innerHTML = b;
                var c = a.firstChild;
                return a.removeChild(c), c;
            };
        }(), qq.each = function(a, b) {
            var c;
            if (a) if (window.Storage && a.constructor === window.Storage) for (c = 0; c < a.length && !1 !== b(a.key(c), a.getItem(a.key(c))); c++) ; else if (qq.isArray(a) || qq.isItemList(a) || qq.isNodeList(a)) for (c = 0; c < a.length && !1 !== b(c, a[c]); c++) ; else if (qq.isString(a)) for (c = 0; c < a.length && !1 !== b(c, a.charAt(c)); c++) ; else for (c in a) if (Object.prototype.hasOwnProperty.call(a, c) && !1 === b(c, a[c])) break;
        }, qq.bind = function(a, b) {
            if (qq.isFunction(a)) {
                var c = Array.prototype.slice.call(arguments, 2);
                return function() {
                    var d = qq.extend([], c);
                    return arguments.length && (d = d.concat(Array.prototype.slice.call(arguments))), 
                    a.apply(b, d);
                };
            }
            throw new Error("first parameter must be a function!");
        }, qq.obj2url = function(a, b, c) {
            var d = [], e = "&", f = function(a, c) {
                var e = b ? /\[\]$/.test(b) ? b : b + "[" + c + "]" : c;
                "undefined" !== e && "undefined" !== c && d.push("object" == typeof a ? qq.obj2url(a, e, !0) : "[object Function]" === Object.prototype.toString.call(a) ? encodeURIComponent(e) + "=" + encodeURIComponent(a()) : encodeURIComponent(e) + "=" + encodeURIComponent(a));
            };
            return !c && b ? (e = /\?/.test(b) ? /\?$/.test(b) ? "" : "&" : "?", d.push(b), 
            d.push(qq.obj2url(a))) : "[object Array]" === Object.prototype.toString.call(a) && void 0 !== a ? qq.each(a, function(a, b) {
                f(b, a);
            }) : void 0 !== a && null !== a && "object" == typeof a ? qq.each(a, function(a, b) {
                f(b, a);
            }) : d.push(encodeURIComponent(b) + "=" + encodeURIComponent(a)), b ? d.join(e) : d.join(e).replace(/^&/, "").replace(/%20/g, "+");
        }, qq.obj2FormData = function(a, b, c) {
            return b || (b = new FormData()), qq.each(a, function(a, d) {
                a = c ? c + "[" + a + "]" : a, qq.isObject(d) ? qq.obj2FormData(d, b, a) : qq.isFunction(d) ? b.append(a, d()) : b.append(a, d);
            }), b;
        }, qq.obj2Inputs = function(a, b) {
            var c;
            return b || (b = document.createElement("form")), qq.obj2FormData(a, {
                append: function(a, d) {
                    c = document.createElement("input"), c.setAttribute("name", a), c.setAttribute("value", d), 
                    b.appendChild(c);
                }
            }), b;
        }, qq.parseJson = function(json) {
            return window.JSON && qq.isFunction(JSON.parse) ? JSON.parse(json) : eval("(" + json + ")");
        }, qq.getExtension = function(a) {
            var b = a.lastIndexOf(".") + 1;
            if (b > 0) return a.substr(b, a.length - b);
        }, qq.getFilename = function(a) {
            return qq.isInput(a) ? a.value.replace(/.*(\/|\\)/, "") : qq.isFile(a) && null !== a.fileName && void 0 !== a.fileName ? a.fileName : a.name;
        }, qq.DisposeSupport = function() {
            var a = [];
            return {
                dispose: function() {
                    var b;
                    do {
                        (b = a.shift()) && b();
                    } while (b);
                },
                attach: function() {
                    var a = arguments;
                    this.addDisposer(qq(a[0]).attach.apply(this, Array.prototype.slice.call(arguments, 1)));
                },
                addDisposer: function(b) {
                    a.push(b);
                }
            };
        };
    }(), function() {
        "function" == typeof define && define.amd ? define(function() {
            return qq;
        }) : "undefined" != typeof module && module.exports ? module.exports = qq : global.qq = qq;
    }(), function() {
        qq.Error = function(a) {
            this.message = "[Fine Uploader " + qq.version + "] " + a;
        }, qq.Error.prototype = new Error();
    }(), qq.version = "5.15.0", qq.supportedFeatures = function() {
        function a() {
            var a, b = !0;
            try {
                a = document.createElement("input"), a.type = "file", qq(a).hide(), a.disabled && (b = !1);
            } catch (a) {
                b = !1;
            }
            return b;
        }
        function b() {
            return (qq.chrome() || qq.opera()) && void 0 !== navigator.userAgent.match(/Chrome\/[2][1-9]|Chrome\/[3-9][0-9]/);
        }
        function c() {
            return (qq.chrome() || qq.opera()) && void 0 !== navigator.userAgent.match(/Chrome\/[1][4-9]|Chrome\/[2-9][0-9]/);
        }
        function d() {
            return !!window.XMLHttpRequest && void 0 !== qq.createXhrInstance().withCredentials;
        }
        function e() {
            return void 0 !== window.XDomainRequest;
        }
        function f() {
            return !!d() || e();
        }
        function g() {
            return void 0 !== document.createElement("input").webkitdirectory;
        }
        function h() {
            try {
                return !!window.localStorage && qq.isFunction(window.localStorage.setItem);
            } catch (a) {
                return !1;
            }
        }
        function i() {
            var a = document.createElement("span");
            return ("draggable" in a || "ondragstart" in a && "ondrop" in a) && !qq.android() && !qq.ios();
        }
        var j, k, l, m, n, o, p, q, r, s, t, u, v, w, x;
        return j = a(), m = j && qq.isXhrUploadSupported(), k = m && !qq.androidStock(), 
        l = m && i(), n = l && b(), o = m && qq.isFileChunkingSupported(), p = m && o && h(), 
        q = m && c(), r = j && (void 0 !== window.postMessage || m), t = d(), s = e(), u = f(), 
        v = g(), w = m && void 0 !== window.FileReader, x = function() {
            return !!m && !qq.androidStock() && !qq.iosChrome();
        }(), {
            ajaxUploading: m,
            blobUploading: k,
            canDetermineSize: m,
            chunking: o,
            deleteFileCors: u,
            deleteFileCorsXdr: s,
            deleteFileCorsXhr: t,
            dialogElement: !!window.HTMLDialogElement,
            fileDrop: l,
            folderDrop: n,
            folderSelection: v,
            imagePreviews: w,
            imageValidation: w,
            itemSizeValidation: m,
            pause: o,
            progressBar: x,
            resume: p,
            scaling: w && k,
            tiffPreviews: qq.safari(),
            unlimitedScaledImageSize: !qq.ios(),
            uploading: j,
            uploadCors: r,
            uploadCustomHeaders: m,
            uploadNonMultipart: m,
            uploadViaPaste: q
        };
    }(), qq.isGenericPromise = function(a) {
        return !!(a && a.then && qq.isFunction(a.then));
    }, qq.Promise = function() {
        var a, b, c = [], d = [], e = [], f = 0;
        qq.extend(this, {
            then: function(e, g) {
                return 0 === f ? (e && c.push(e), g && d.push(g)) : -1 === f ? g && g.apply(null, b) : e && e.apply(null, a), 
                this;
            },
            done: function(c) {
                return 0 === f ? e.push(c) : c.apply(null, void 0 === b ? a : b), this;
            },
            success: function() {
                return f = 1, a = arguments, c.length && qq.each(c, function(b, c) {
                    c.apply(null, a);
                }), e.length && qq.each(e, function(b, c) {
                    c.apply(null, a);
                }), this;
            },
            failure: function() {
                return f = -1, b = arguments, d.length && qq.each(d, function(a, c) {
                    c.apply(null, b);
                }), e.length && qq.each(e, function(a, c) {
                    c.apply(null, b);
                }), this;
            }
        });
    }, qq.BlobProxy = function(a, b) {
        qq.extend(this, {
            referenceBlob: a,
            create: function() {
                return b(a);
            }
        });
    }, qq.UploadButton = function(a) {
        function b() {
            var a = document.createElement("input");
            return a.setAttribute(qq.UploadButton.BUTTON_ID_ATTR_NAME, d), a.setAttribute("title", g.title), 
            e.setMultiple(g.multiple, a), g.folders && qq.supportedFeatures.folderSelection && a.setAttribute("webkitdirectory", ""), 
            g.acceptFiles && a.setAttribute("accept", g.acceptFiles), a.setAttribute("type", "file"), 
            a.setAttribute("name", g.name), qq(a).css({
                position: "absolute",
                right: 0,
                top: 0,
                fontFamily: "Arial",
                fontSize: qq.ie() && !qq.ie8() ? "3500px" : "118px",
                margin: 0,
                padding: 0,
                cursor: "pointer",
                opacity: 0
            }), !qq.ie7() && qq(a).css({
                height: "100%"
            }), g.element.appendChild(a), f.attach(a, "change", function() {
                g.onChange(a);
            }), f.attach(a, "mouseover", function() {
                qq(g.element).addClass(g.hoverClass);
            }), f.attach(a, "mouseout", function() {
                qq(g.element).removeClass(g.hoverClass);
            }), f.attach(a, "focus", function() {
                qq(g.element).addClass(g.focusClass);
            }), f.attach(a, "blur", function() {
                qq(g.element).removeClass(g.focusClass);
            }), a;
        }
        var c, d, e = this, f = new qq.DisposeSupport(), g = {
            acceptFiles: null,
            element: null,
            focusClass: "qq-upload-button-focus",
            folders: !1,
            hoverClass: "qq-upload-button-hover",
            ios8BrowserCrashWorkaround: !1,
            multiple: !1,
            name: "qqfile",
            onChange: function(a) {},
            title: null
        };
        qq.extend(g, a), d = qq.getUniqueId(), qq(g.element).css({
            position: "relative",
            overflow: "hidden",
            direction: "ltr"
        }), qq.extend(this, {
            getInput: function() {
                return c;
            },
            getButtonId: function() {
                return d;
            },
            setMultiple: function(a, b) {
                var c = b || this.getInput();
                g.ios8BrowserCrashWorkaround && qq.ios8() && (qq.iosChrome() || qq.iosSafariWebView()) ? c.setAttribute("multiple", "") : a ? c.setAttribute("multiple", "") : c.removeAttribute("multiple");
            },
            setAcceptFiles: function(a) {
                a !== g.acceptFiles && c.setAttribute("accept", a);
            },
            reset: function() {
                c.parentNode && qq(c).remove(), qq(g.element).removeClass(g.focusClass), c = null, 
                c = b();
            }
        }), c = b();
    }, qq.UploadButton.BUTTON_ID_ATTR_NAME = "qq-button-id", qq.UploadData = function(a) {
        function b(a) {
            if (qq.isArray(a)) {
                var b = [];
                return qq.each(a, function(a, c) {
                    b.push(e[c]);
                }), b;
            }
            return e[a];
        }
        function c(a) {
            if (qq.isArray(a)) {
                var b = [];
                return qq.each(a, function(a, c) {
                    b.push(e[f[c]]);
                }), b;
            }
            return e[f[a]];
        }
        function d(a) {
            var b = [], c = [].concat(a);
            return qq.each(c, function(a, c) {
                var d = g[c];
                void 0 !== d && qq.each(d, function(a, c) {
                    b.push(e[c]);
                });
            }), b;
        }
        var e = [], f = {}, g = {}, h = {}, i = {};
        qq.extend(this, {
            addFile: function(b) {
                var c = b.status || qq.status.SUBMITTING, d = e.push({
                    name: b.name,
                    originalName: b.name,
                    uuid: b.uuid,
                    size: null == b.size ? -1 : b.size,
                    status: c
                }) - 1;
                return b.batchId && (e[d].batchId = b.batchId, void 0 === i[b.batchId] && (i[b.batchId] = []), 
                i[b.batchId].push(d)), b.proxyGroupId && (e[d].proxyGroupId = b.proxyGroupId, void 0 === h[b.proxyGroupId] && (h[b.proxyGroupId] = []), 
                h[b.proxyGroupId].push(d)), e[d].id = d, f[b.uuid] = d, void 0 === g[c] && (g[c] = []), 
                g[c].push(d), b.onBeforeStatusChange && b.onBeforeStatusChange(d), a.onStatusChange(d, null, c), 
                d;
            },
            retrieve: function(a) {
                return qq.isObject(a) && e.length ? void 0 !== a.id ? b(a.id) : void 0 !== a.uuid ? c(a.uuid) : a.status ? d(a.status) : void 0 : qq.extend([], e, !0);
            },
            reset: function() {
                e = [], f = {}, g = {}, i = {};
            },
            setStatus: function(b, c) {
                var d = e[b].status, f = qq.indexOf(g[d], b);
                g[d].splice(f, 1), e[b].status = c, void 0 === g[c] && (g[c] = []), g[c].push(b), 
                a.onStatusChange(b, d, c);
            },
            uuidChanged: function(a, b) {
                var c = e[a].uuid;
                e[a].uuid = b, f[b] = a, delete f[c];
            },
            updateName: function(a, b) {
                e[a].name = b;
            },
            updateSize: function(a, b) {
                e[a].size = b;
            },
            setParentId: function(a, b) {
                e[a].parentId = b;
            },
            getIdsInProxyGroup: function(a) {
                var b = e[a].proxyGroupId;
                return b ? h[b] : [];
            },
            getIdsInBatch: function(a) {
                return i[e[a].batchId];
            }
        });
    }, qq.status = {
        SUBMITTING: "submitting",
        SUBMITTED: "submitted",
        REJECTED: "rejected",
        QUEUED: "queued",
        CANCELED: "canceled",
        PAUSED: "paused",
        UPLOADING: "uploading",
        UPLOAD_RETRYING: "retrying upload",
        UPLOAD_SUCCESSFUL: "upload successful",
        UPLOAD_FAILED: "upload failed",
        DELETE_FAILED: "delete failed",
        DELETING: "deleting",
        DELETED: "deleted"
    }, function() {
        qq.basePublicApi = {
            addBlobs: function(a, b, c) {
                this.addFiles(a, b, c);
            },
            addInitialFiles: function(a) {
                var b = this;
                qq.each(a, function(a, c) {
                    b._addCannedFile(c);
                });
            },
            addFiles: function(a, b, c) {
                this._maybeHandleIos8SafariWorkaround();
                var d = 0 === this._storedIds.length ? qq.getUniqueId() : this._currentBatchId, e = qq.bind(function(a) {
                    this._handleNewFile({
                        blob: a,
                        name: this._options.blobs.defaultName
                    }, d, l);
                }, this), f = qq.bind(function(a) {
                    this._handleNewFile(a, d, l);
                }, this), g = qq.bind(function(a) {
                    var b = qq.canvasToBlob(a);
                    this._handleNewFile({
                        blob: b,
                        name: this._options.blobs.defaultName + ".png"
                    }, d, l);
                }, this), h = qq.bind(function(a) {
                    var b = a.quality && a.quality / 100, c = qq.canvasToBlob(a.canvas, a.type, b);
                    this._handleNewFile({
                        blob: c,
                        name: a.name
                    }, d, l);
                }, this), i = qq.bind(function(a) {
                    if (qq.isInput(a) && qq.supportedFeatures.ajaxUploading) {
                        var b = Array.prototype.slice.call(a.files), c = this;
                        qq.each(b, function(a, b) {
                            c._handleNewFile(b, d, l);
                        });
                    } else this._handleNewFile(a, d, l);
                }, this), j = function() {
                    qq.isFileList(a) && (a = Array.prototype.slice.call(a)), a = [].concat(a);
                }, k = this, l = [];
                this._currentBatchId = d, a && (j(), qq.each(a, function(a, b) {
                    qq.isFileOrInput(b) ? i(b) : qq.isBlob(b) ? e(b) : qq.isObject(b) ? b.blob && b.name ? f(b) : b.canvas && b.name && h(b) : b.tagName && "canvas" === b.tagName.toLowerCase() ? g(b) : k.log(b + " is not a valid file container!  Ignoring!", "warn");
                }), this.log("Received " + l.length + " files."), this._prepareItemsForUpload(l, b, c));
            },
            cancel: function(a) {
                this._handler.cancel(a);
            },
            cancelAll: function() {
                var a = [], b = this;
                qq.extend(a, this._storedIds), qq.each(a, function(a, c) {
                    b.cancel(c);
                }), this._handler.cancelAll();
            },
            clearStoredFiles: function() {
                this._storedIds = [];
            },
            continueUpload: function(a) {
                var b = this._uploadData.retrieve({
                    id: a
                });
                return !(!qq.supportedFeatures.pause || !this._options.chunking.enabled || (b.status === qq.status.PAUSED ? (this.log(qq.format("Paused file ID {} ({}) will be continued.  Not paused.", a, this.getName(a))), 
                this._uploadFile(a), 0) : (this.log(qq.format("Ignoring continue for file ID {} ({}).  Not paused.", a, this.getName(a)), "error"), 
                1)));
            },
            deleteFile: function(a) {
                return this._onSubmitDelete(a);
            },
            doesExist: function(a) {
                return this._handler.isValid(a);
            },
            drawThumbnail: function(a, b, c, d, e) {
                var f, g, h = new qq.Promise();
                return this._imageGenerator ? (f = this._thumbnailUrls[a], g = {
                    customResizeFunction: e,
                    maxSize: c > 0 ? c : null,
                    scale: c > 0
                }, !d && qq.supportedFeatures.imagePreviews && (f = this.getFile(a)), null == f ? h.failure({
                    container: b,
                    error: "File or URL not found."
                }) : this._imageGenerator.generate(f, b, g).then(function(a) {
                    h.success(a);
                }, function(a, b) {
                    h.failure({
                        container: a,
                        error: b || "Problem generating thumbnail"
                    });
                })) : h.failure({
                    container: b,
                    error: "Missing image generator module"
                }), h;
            },
            getButton: function(a) {
                return this._getButton(this._buttonIdsForFileIds[a]);
            },
            getEndpoint: function(a) {
                return this._endpointStore.get(a);
            },
            getFile: function(a) {
                return this._handler.getFile(a) || null;
            },
            getInProgress: function() {
                return this._uploadData.retrieve({
                    status: [ qq.status.UPLOADING, qq.status.UPLOAD_RETRYING, qq.status.QUEUED ]
                }).length;
            },
            getName: function(a) {
                return this._uploadData.retrieve({
                    id: a
                }).name;
            },
            getParentId: function(a) {
                var b = this.getUploads({
                    id: a
                }), c = null;
                return b && void 0 !== b.parentId && (c = b.parentId), c;
            },
            getResumableFilesData: function() {
                return this._handler.getResumableFilesData();
            },
            getSize: function(a) {
                return this._uploadData.retrieve({
                    id: a
                }).size;
            },
            getNetUploads: function() {
                return this._netUploaded;
            },
            getRemainingAllowedItems: function() {
                var a = this._currentItemLimit;
                return a > 0 ? a - this._netUploadedOrQueued : null;
            },
            getUploads: function(a) {
                return this._uploadData.retrieve(a);
            },
            getUuid: function(a) {
                return this._uploadData.retrieve({
                    id: a
                }).uuid;
            },
            log: function(a, b) {
                !this._options.debug || b && "info" !== b ? b && "info" !== b && qq.log("[Fine Uploader " + qq.version + "] " + a, b) : qq.log("[Fine Uploader " + qq.version + "] " + a);
            },
            pauseUpload: function(a) {
                var b = this._uploadData.retrieve({
                    id: a
                });
                if (!qq.supportedFeatures.pause || !this._options.chunking.enabled) return !1;
                if (qq.indexOf([ qq.status.UPLOADING, qq.status.UPLOAD_RETRYING ], b.status) >= 0) {
                    if (this._handler.pause(a)) return this._uploadData.setStatus(a, qq.status.PAUSED), 
                    !0;
                    this.log(qq.format("Unable to pause file ID {} ({}).", a, this.getName(a)), "error");
                } else this.log(qq.format("Ignoring pause for file ID {} ({}).  Not in progress.", a, this.getName(a)), "error");
                return !1;
            },
            removeFileRef: function(a) {
                this._handler.expunge(a);
            },
            reset: function() {
                this.log("Resetting uploader..."), this._handler.reset(), this._storedIds = [], 
                this._autoRetries = [], this._retryTimeouts = [], this._preventRetries = [], this._thumbnailUrls = [], 
                qq.each(this._buttons, function(a, b) {
                    b.reset();
                }), this._paramsStore.reset(), this._endpointStore.reset(), this._netUploadedOrQueued = 0, 
                this._netUploaded = 0, this._uploadData.reset(), this._buttonIdsForFileIds = [], 
                this._pasteHandler && this._pasteHandler.reset(), this._options.session.refreshOnReset && this._refreshSessionData(), 
                this._succeededSinceLastAllComplete = [], this._failedSinceLastAllComplete = [], 
                this._totalProgress && this._totalProgress.reset();
            },
            retry: function(a) {
                return this._manualRetry(a);
            },
            scaleImage: function(a, b) {
                var c = this;
                return qq.Scaler.prototype.scaleImage(a, b, {
                    log: qq.bind(c.log, c),
                    getFile: qq.bind(c.getFile, c),
                    uploadData: c._uploadData
                });
            },
            setCustomHeaders: function(a, b) {
                this._customHeadersStore.set(a, b);
            },
            setDeleteFileCustomHeaders: function(a, b) {
                this._deleteFileCustomHeadersStore.set(a, b);
            },
            setDeleteFileEndpoint: function(a, b) {
                this._deleteFileEndpointStore.set(a, b);
            },
            setDeleteFileParams: function(a, b) {
                this._deleteFileParamsStore.set(a, b);
            },
            setEndpoint: function(a, b) {
                this._endpointStore.set(a, b);
            },
            setForm: function(a) {
                this._updateFormSupportAndParams(a);
            },
            setItemLimit: function(a) {
                this._currentItemLimit = a;
            },
            setName: function(a, b) {
                this._uploadData.updateName(a, b);
            },
            setParams: function(a, b) {
                this._paramsStore.set(a, b);
            },
            setUuid: function(a, b) {
                return this._uploadData.uuidChanged(a, b);
            },
            setStatus: function(a, b) {
                if (!this.getUploads({
                    id: a
                })) throw new qq.Error(a + " is not a valid file ID.");
                switch (b) {
                  case qq.status.DELETED:
                    this._onDeleteComplete(a, null, !1);
                    break;

                  case qq.status.DELETE_FAILED:
                    this._onDeleteComplete(a, null, !0);
                    break;

                  default:
                    var c = "Method setStatus called on '" + name + "' not implemented yet for " + b;
                    throw this.log(c), new qq.Error(c);
                }
            },
            uploadStoredFiles: function() {
                0 === this._storedIds.length ? this._itemError("noFilesError") : this._uploadStoredFiles();
            }
        }, qq.basePrivateApi = {
            _addCannedFile: function(a) {
                var b = this;
                return this._uploadData.addFile({
                    uuid: a.uuid,
                    name: a.name,
                    size: a.size,
                    status: qq.status.UPLOAD_SUCCESSFUL,
                    onBeforeStatusChange: function(c) {
                        a.deleteFileEndpoint && b.setDeleteFileEndpoint(a.deleteFileEndpoint, c), a.deleteFileParams && b.setDeleteFileParams(a.deleteFileParams, c), 
                        a.thumbnailUrl && (b._thumbnailUrls[c] = a.thumbnailUrl), b._netUploaded++, b._netUploadedOrQueued++;
                    }
                });
            },
            _annotateWithButtonId: function(a, b) {
                qq.isFile(a) && (a.qqButtonId = this._getButtonId(b));
            },
            _batchError: function(a) {
                this._options.callbacks.onError(null, null, a, void 0);
            },
            _createDeleteHandler: function() {
                var a = this;
                return new qq.DeleteFileAjaxRequester({
                    method: this._options.deleteFile.method.toUpperCase(),
                    maxConnections: this._options.maxConnections,
                    uuidParamName: this._options.request.uuidName,
                    customHeaders: this._deleteFileCustomHeadersStore,
                    paramsStore: this._deleteFileParamsStore,
                    endpointStore: this._deleteFileEndpointStore,
                    cors: this._options.cors,
                    log: qq.bind(a.log, a),
                    onDelete: function(b) {
                        a._onDelete(b), a._options.callbacks.onDelete(b);
                    },
                    onDeleteComplete: function(b, c, d) {
                        a._onDeleteComplete(b, c, d), a._options.callbacks.onDeleteComplete(b, c, d);
                    }
                });
            },
            _createPasteHandler: function() {
                var a = this;
                return new qq.PasteSupport({
                    targetElement: this._options.paste.targetElement,
                    callbacks: {
                        log: qq.bind(a.log, a),
                        pasteReceived: function(b) {
                            a._handleCheckedCallback({
                                name: "onPasteReceived",
                                callback: qq.bind(a._options.callbacks.onPasteReceived, a, b),
                                onSuccess: qq.bind(a._handlePasteSuccess, a, b),
                                identifier: "pasted image"
                            });
                        }
                    }
                });
            },
            _createStore: function(a, b) {
                var c = {}, d = a, e = {}, f = b, g = function(a) {
                    return qq.isObject(a) ? qq.extend({}, a) : a;
                }, h = function() {
                    return qq.isFunction(f) ? f() : f;
                }, i = function(a, b) {
                    f && qq.isObject(b) && qq.extend(b, h()), e[a] && qq.extend(b, e[a]);
                };
                return {
                    set: function(a, b) {
                        null == b ? (c = {}, d = g(a)) : c[b] = g(a);
                    },
                    get: function(a) {
                        var b;
                        return b = null != a && c[a] ? c[a] : g(d), i(a, b), g(b);
                    },
                    addReadOnly: function(a, b) {
                        qq.isObject(c) && (null === a ? qq.isFunction(b) ? f = b : (f = f || {}, qq.extend(f, b)) : (e[a] = e[a] || {}, 
                        qq.extend(e[a], b)));
                    },
                    remove: function(a) {
                        return delete c[a];
                    },
                    reset: function() {
                        c = {}, e = {}, d = a;
                    }
                };
            },
            _createUploadDataTracker: function() {
                var a = this;
                return new qq.UploadData({
                    getName: function(b) {
                        return a.getName(b);
                    },
                    getUuid: function(b) {
                        return a.getUuid(b);
                    },
                    getSize: function(b) {
                        return a.getSize(b);
                    },
                    onStatusChange: function(b, c, d) {
                        a._onUploadStatusChange(b, c, d), a._options.callbacks.onStatusChange(b, c, d), 
                        a._maybeAllComplete(b, d), a._totalProgress && setTimeout(function() {
                            a._totalProgress.onStatusChange(b, c, d);
                        }, 0);
                    }
                });
            },
            _createUploadButton: function(a) {
                function b() {
                    return !!qq.supportedFeatures.ajaxUploading && !(d._options.workarounds.iosEmptyVideos && qq.ios() && !qq.ios6() && d._isAllowedExtension(f, ".mov")) && (void 0 === a.multiple ? d._options.multiple : a.multiple);
                }
                var c, d = this, e = a.accept || this._options.validation.acceptFiles, f = a.allowedExtensions || this._options.validation.allowedExtensions;
                return c = new qq.UploadButton({
                    acceptFiles: e,
                    element: a.element,
                    focusClass: this._options.classes.buttonFocus,
                    folders: a.folders,
                    hoverClass: this._options.classes.buttonHover,
                    ios8BrowserCrashWorkaround: this._options.workarounds.ios8BrowserCrash,
                    multiple: b(),
                    name: this._options.request.inputName,
                    onChange: function(a) {
                        d._onInputChange(a);
                    },
                    title: null == a.title ? this._options.text.fileInputTitle : a.title
                }), this._disposeSupport.addDisposer(function() {
                    c.dispose();
                }), d._buttons.push(c), c;
            },
            _createUploadHandler: function(a, b) {
                var c = this, d = {}, e = {
                    debug: this._options.debug,
                    maxConnections: this._options.maxConnections,
                    cors: this._options.cors,
                    paramsStore: this._paramsStore,
                    endpointStore: this._endpointStore,
                    chunking: this._options.chunking,
                    resume: this._options.resume,
                    blobs: this._options.blobs,
                    log: qq.bind(c.log, c),
                    preventRetryParam: this._options.retry.preventRetryResponseProperty,
                    onProgress: function(a, b, e, f) {
                        e < 0 || f < 0 || (d[a] ? d[a].loaded === e && d[a].total === f || (c._onProgress(a, b, e, f), 
                        c._options.callbacks.onProgress(a, b, e, f)) : (c._onProgress(a, b, e, f), c._options.callbacks.onProgress(a, b, e, f)), 
                        d[a] = {
                            loaded: e,
                            total: f
                        });
                    },
                    onComplete: function(a, b, e, f) {
                        delete d[a];
                        var g, h = c.getUploads({
                            id: a
                        }).status;
                        h !== qq.status.UPLOAD_SUCCESSFUL && h !== qq.status.UPLOAD_FAILED && (g = c._onComplete(a, b, e, f), 
                        g instanceof qq.Promise ? g.done(function() {
                            c._options.callbacks.onComplete(a, b, e, f);
                        }) : c._options.callbacks.onComplete(a, b, e, f));
                    },
                    onCancel: function(a, b, d) {
                        var e = new qq.Promise();
                        return c._handleCheckedCallback({
                            name: "onCancel",
                            callback: qq.bind(c._options.callbacks.onCancel, c, a, b),
                            onFailure: e.failure,
                            onSuccess: function() {
                                d.then(function() {
                                    c._onCancel(a, b);
                                }), e.success();
                            },
                            identifier: a
                        }), e;
                    },
                    onUploadPrep: qq.bind(this._onUploadPrep, this),
                    onUpload: function(a, b) {
                        c._onUpload(a, b), c._options.callbacks.onUpload(a, b);
                    },
                    onUploadChunk: function(a, b, d) {
                        c._onUploadChunk(a, d), c._options.callbacks.onUploadChunk(a, b, d);
                    },
                    onUploadChunkSuccess: function(a, b, d, e) {
                        c._options.callbacks.onUploadChunkSuccess.apply(c, arguments);
                    },
                    onResume: function(a, b, d) {
                        return c._options.callbacks.onResume(a, b, d);
                    },
                    onAutoRetry: function(a, b, d, e) {
                        return c._onAutoRetry.apply(c, arguments);
                    },
                    onUuidChanged: function(a, b) {
                        c.log("Server requested UUID change from '" + c.getUuid(a) + "' to '" + b + "'"), 
                        c.setUuid(a, b);
                    },
                    getName: qq.bind(c.getName, c),
                    getUuid: qq.bind(c.getUuid, c),
                    getSize: qq.bind(c.getSize, c),
                    setSize: qq.bind(c._setSize, c),
                    getDataByUuid: function(a) {
                        return c.getUploads({
                            uuid: a
                        });
                    },
                    isQueued: function(a) {
                        var b = c.getUploads({
                            id: a
                        }).status;
                        return b === qq.status.QUEUED || b === qq.status.SUBMITTED || b === qq.status.UPLOAD_RETRYING || b === qq.status.PAUSED;
                    },
                    getIdsInProxyGroup: c._uploadData.getIdsInProxyGroup,
                    getIdsInBatch: c._uploadData.getIdsInBatch
                };
                return qq.each(this._options.request, function(a, b) {
                    e[a] = b;
                }), e.customHeaders = this._customHeadersStore, a && qq.each(a, function(a, b) {
                    e[a] = b;
                }), new qq.UploadHandlerController(e, b);
            },
            _fileOrBlobRejected: function(a) {
                this._netUploadedOrQueued--, this._uploadData.setStatus(a, qq.status.REJECTED);
            },
            _formatSize: function(a) {
                if (0 === a) return a + this._options.text.sizeSymbols[0];
                var b = -1;
                do {
                    a /= 1e3, b++;
                } while (a > 999);
                return Math.max(a, .1).toFixed(1) + this._options.text.sizeSymbols[b];
            },
            _generateExtraButtonSpecs: function() {
                var a = this;
                this._extraButtonSpecs = {}, qq.each(this._options.extraButtons, function(b, c) {
                    var d = c.multiple, e = qq.extend({}, a._options.validation, !0), f = qq.extend({}, c);
                    void 0 === d && (d = a._options.multiple), f.validation && qq.extend(e, c.validation, !0), 
                    qq.extend(f, {
                        multiple: d,
                        validation: e
                    }, !0), a._initExtraButton(f);
                });
            },
            _getButton: function(a) {
                var b = this._extraButtonSpecs[a];
                return b ? b.element : a === this._defaultButtonId ? this._options.button : void 0;
            },
            _getButtonId: function(a) {
                var b, c, d = a;
                if (d instanceof qq.BlobProxy && (d = d.referenceBlob), d && !qq.isBlob(d)) {
                    if (qq.isFile(d)) return d.qqButtonId;
                    if ("input" === d.tagName.toLowerCase() && "file" === d.type.toLowerCase()) return d.getAttribute(qq.UploadButton.BUTTON_ID_ATTR_NAME);
                    if (b = d.getElementsByTagName("input"), qq.each(b, function(a, b) {
                        if ("file" === b.getAttribute("type")) return c = b, !1;
                    }), c) return c.getAttribute(qq.UploadButton.BUTTON_ID_ATTR_NAME);
                }
            },
            _getNotFinished: function() {
                return this._uploadData.retrieve({
                    status: [ qq.status.UPLOADING, qq.status.UPLOAD_RETRYING, qq.status.QUEUED, qq.status.SUBMITTING, qq.status.SUBMITTED, qq.status.PAUSED ]
                }).length;
            },
            _getValidationBase: function(a) {
                var b = this._extraButtonSpecs[a];
                return b ? b.validation : this._options.validation;
            },
            _getValidationDescriptor: function(a) {
                return a.file instanceof qq.BlobProxy ? {
                    name: qq.getFilename(a.file.referenceBlob),
                    size: a.file.referenceBlob.size
                } : {
                    name: this.getUploads({
                        id: a.id
                    }).name,
                    size: this.getUploads({
                        id: a.id
                    }).size
                };
            },
            _getValidationDescriptors: function(a) {
                var b = this, c = [];
                return qq.each(a, function(a, d) {
                    c.push(b._getValidationDescriptor(d));
                }), c;
            },
            _handleCameraAccess: function() {
                if (this._options.camera.ios && qq.ios()) {
                    var a = this._options.camera.button, b = a ? this._getButtonId(a) : this._defaultButtonId, c = this._options;
                    b && b !== this._defaultButtonId && (c = this._extraButtonSpecs[b]), c.multiple = !1, 
                    null === c.validation.acceptFiles ? c.validation.acceptFiles = "image/*;capture=camera" : c.validation.acceptFiles += ",image/*;capture=camera", 
                    qq.each(this._buttons, function(a, d) {
                        if (d.getButtonId() === b) return d.setMultiple(c.multiple), d.setAcceptFiles(c.acceptFiles), 
                        !1;
                    });
                }
            },
            _handleCheckedCallback: function(a) {
                var b = this, c = a.callback();
                return qq.isGenericPromise(c) ? (this.log(a.name + " - waiting for " + a.name + " promise to be fulfilled for " + a.identifier), 
                c.then(function(c) {
                    b.log(a.name + " promise success for " + a.identifier), a.onSuccess(c);
                }, function() {
                    a.onFailure ? (b.log(a.name + " promise failure for " + a.identifier), a.onFailure()) : b.log(a.name + " promise failure for " + a.identifier);
                })) : (!1 !== c ? a.onSuccess(c) : a.onFailure ? (this.log(a.name + " - return value was 'false' for " + a.identifier + ".  Invoking failure callback."), 
                a.onFailure()) : this.log(a.name + " - return value was 'false' for " + a.identifier + ".  Will not proceed."), 
                c);
            },
            _handleNewFile: function(a, b, c) {
                var d = this, e = qq.getUniqueId(), f = -1, g = qq.getFilename(a), h = a.blob || a, i = this._customNewFileHandler ? this._customNewFileHandler : qq.bind(d._handleNewFileGeneric, d);
                !qq.isInput(h) && h.size >= 0 && (f = h.size), i(h, g, e, f, c, b, this._options.request.uuidName, {
                    uploadData: d._uploadData,
                    paramsStore: d._paramsStore,
                    addFileToHandler: function(a, b) {
                        d._handler.add(a, b), d._netUploadedOrQueued++, d._trackButton(a);
                    }
                });
            },
            _handleNewFileGeneric: function(a, b, c, d, e, f) {
                var g = this._uploadData.addFile({
                    uuid: c,
                    name: b,
                    size: d,
                    batchId: f
                });
                this._handler.add(g, a), this._trackButton(g), this._netUploadedOrQueued++, e.push({
                    id: g,
                    file: a
                });
            },
            _handlePasteSuccess: function(a, b) {
                var c = a.type.split("/")[1], d = b;
                null == d && (d = this._options.paste.defaultName), d += "." + c, this.addFiles({
                    name: d,
                    blob: a
                });
            },
            _handleDeleteSuccess: function(a) {
                if (this.getUploads({
                    id: a
                }).status !== qq.status.DELETED) {
                    var b = this.getName(a);
                    this._netUploadedOrQueued--, this._netUploaded--, this._handler.expunge(a), this._uploadData.setStatus(a, qq.status.DELETED), 
                    this.log("Delete request for '" + b + "' has succeeded.");
                }
            },
            _handleDeleteFailed: function(a, b) {
                var c = this.getName(a);
                this._uploadData.setStatus(a, qq.status.DELETE_FAILED), this.log("Delete request for '" + c + "' has failed.", "error"), 
                b && void 0 !== b.withCredentials ? this._options.callbacks.onError(a, c, "Delete request failed with response code " + b.status, b) : this._options.callbacks.onError(a, c, "Delete request failed", b);
            },
            _initExtraButton: function(a) {
                var b = this._createUploadButton({
                    accept: a.validation.acceptFiles,
                    allowedExtensions: a.validation.allowedExtensions,
                    element: a.element,
                    folders: a.folders,
                    multiple: a.multiple,
                    title: a.fileInputTitle
                });
                this._extraButtonSpecs[b.getButtonId()] = a;
            },
            _initFormSupportAndParams: function() {
                this._formSupport = qq.FormSupport && new qq.FormSupport(this._options.form, qq.bind(this.uploadStoredFiles, this), qq.bind(this.log, this)), 
                this._formSupport && this._formSupport.attachedToForm ? (this._paramsStore = this._createStore(this._options.request.params, this._formSupport.getFormInputsAsObject), 
                this._options.autoUpload = this._formSupport.newAutoUpload, this._formSupport.newEndpoint && (this._options.request.endpoint = this._formSupport.newEndpoint)) : this._paramsStore = this._createStore(this._options.request.params);
            },
            _isDeletePossible: function() {
                return !(!qq.DeleteFileAjaxRequester || !this._options.deleteFile.enabled || this._options.cors.expected && !qq.supportedFeatures.deleteFileCorsXhr && (!qq.supportedFeatures.deleteFileCorsXdr || !this._options.cors.allowXdr));
            },
            _isAllowedExtension: function(a, b) {
                var c = !1;
                return !a.length || (qq.each(a, function(a, d) {
                    if (qq.isString(d)) {
                        var e = new RegExp("\\." + d + "$", "i");
                        if (null != b.match(e)) return c = !0, !1;
                    }
                }), c);
            },
            _itemError: function(a, b, c) {
                function d(a, b) {
                    g = g.replace(a, b);
                }
                var e, f, g = this._options.messages[a], h = [], i = [].concat(b), j = i[0], k = this._getButtonId(c), l = this._getValidationBase(k);
                return qq.each(l.allowedExtensions, function(a, b) {
                    qq.isString(b) && h.push(b);
                }), e = h.join(", ").toLowerCase(), d("{file}", this._options.formatFileName(j)), 
                d("{extensions}", e), d("{sizeLimit}", this._formatSize(l.sizeLimit)), d("{minSizeLimit}", this._formatSize(l.minSizeLimit)), 
                f = g.match(/(\{\w+\})/g), null !== f && qq.each(f, function(a, b) {
                    d(b, i[a]);
                }), this._options.callbacks.onError(null, j, g, void 0), g;
            },
            _manualRetry: function(a, b) {
                if (this._onBeforeManualRetry(a)) return this._netUploadedOrQueued++, this._uploadData.setStatus(a, qq.status.UPLOAD_RETRYING), 
                b ? b(a) : this._handler.retry(a), !0;
            },
            _maybeAllComplete: function(a, b) {
                var c = this, d = this._getNotFinished();
                b === qq.status.UPLOAD_SUCCESSFUL ? this._succeededSinceLastAllComplete.push(a) : b === qq.status.UPLOAD_FAILED && this._failedSinceLastAllComplete.push(a), 
                0 === d && (this._succeededSinceLastAllComplete.length || this._failedSinceLastAllComplete.length) && setTimeout(function() {
                    c._onAllComplete(c._succeededSinceLastAllComplete, c._failedSinceLastAllComplete);
                }, 0);
            },
            _maybeHandleIos8SafariWorkaround: function() {
                var a = this;
                if (this._options.workarounds.ios8SafariUploads && qq.ios800() && qq.iosSafari()) throw setTimeout(function() {
                    window.alert(a._options.messages.unsupportedBrowserIos8Safari);
                }, 0), new qq.Error(this._options.messages.unsupportedBrowserIos8Safari);
            },
            _maybeParseAndSendUploadError: function(a, b, c, d) {
                if (!c.success) if (d && 200 !== d.status && !c.error) this._options.callbacks.onError(a, b, "XHR returned response code " + d.status, d); else {
                    var e = c.error ? c.error : this._options.text.defaultResponseError;
                    this._options.callbacks.onError(a, b, e, d);
                }
            },
            _maybeProcessNextItemAfterOnValidateCallback: function(a, b, c, d, e) {
                var f = this;
                if (b.length > c) if (a || !this._options.validation.stopOnFirstInvalidFile) setTimeout(function() {
                    var a = f._getValidationDescriptor(b[c]), g = f._getButtonId(b[c].file), h = f._getButton(g);
                    f._handleCheckedCallback({
                        name: "onValidate",
                        callback: qq.bind(f._options.callbacks.onValidate, f, a, h),
                        onSuccess: qq.bind(f._onValidateCallbackSuccess, f, b, c, d, e),
                        onFailure: qq.bind(f._onValidateCallbackFailure, f, b, c, d, e),
                        identifier: "Item '" + a.name + "', size: " + a.size
                    });
                }, 0); else if (!a) for (;c < b.length; c++) f._fileOrBlobRejected(b[c].id);
            },
            _onAllComplete: function(a, b) {
                this._totalProgress && this._totalProgress.onAllComplete(a, b, this._preventRetries), 
                this._options.callbacks.onAllComplete(qq.extend([], a), qq.extend([], b)), this._succeededSinceLastAllComplete = [], 
                this._failedSinceLastAllComplete = [];
            },
            _onAutoRetry: function(a, b, c, d, e) {
                var f = this;
                if (f._preventRetries[a] = c[f._options.retry.preventRetryResponseProperty], f._shouldAutoRetry(a, b, c)) {
                    var g = 1e3 * f._options.retry.autoAttemptDelay;
                    return f._maybeParseAndSendUploadError.apply(f, arguments), f._options.callbacks.onAutoRetry(a, b, f._autoRetries[a]), 
                    f._onBeforeAutoRetry(a, b), f._uploadData.setStatus(a, qq.status.UPLOAD_RETRYING), 
                    f._retryTimeouts[a] = setTimeout(function() {
                        f.log("Starting retry for " + b + "..."), e ? e(a) : f._handler.retry(a);
                    }, g), !0;
                }
            },
            _onBeforeAutoRetry: function(a, b) {
                this.log("Waiting " + this._options.retry.autoAttemptDelay + " seconds before retrying " + b + "...");
            },
            _onBeforeManualRetry: function(a) {
                var b, c = this._currentItemLimit;
                return this._preventRetries[a] ? (this.log("Retries are forbidden for id " + a, "warn"), 
                !1) : this._handler.isValid(a) ? (b = this.getName(a), !1 !== this._options.callbacks.onManualRetry(a, b) && (c > 0 && this._netUploadedOrQueued + 1 > c ? (this._itemError("retryFailTooManyItems"), 
                !1) : (this.log("Retrying upload for '" + b + "' (id: " + a + ")..."), !0))) : (this.log("'" + a + "' is not a valid file ID", "error"), 
                !1);
            },
            _onCancel: function(a, b) {
                this._netUploadedOrQueued--, clearTimeout(this._retryTimeouts[a]);
                var c = qq.indexOf(this._storedIds, a);
                !this._options.autoUpload && c >= 0 && this._storedIds.splice(c, 1), this._uploadData.setStatus(a, qq.status.CANCELED);
            },
            _onComplete: function(a, b, c, d) {
                return c.success ? (c.thumbnailUrl && (this._thumbnailUrls[a] = c.thumbnailUrl), 
                this._netUploaded++, this._uploadData.setStatus(a, qq.status.UPLOAD_SUCCESSFUL)) : (this._netUploadedOrQueued--, 
                this._uploadData.setStatus(a, qq.status.UPLOAD_FAILED), !0 === c[this._options.retry.preventRetryResponseProperty] && (this._preventRetries[a] = !0)), 
                this._maybeParseAndSendUploadError(a, b, c, d), !!c.success;
            },
            _onDelete: function(a) {
                this._uploadData.setStatus(a, qq.status.DELETING);
            },
            _onDeleteComplete: function(a, b, c) {
                this.getName(a), c ? this._handleDeleteFailed(a, b) : this._handleDeleteSuccess(a);
            },
            _onInputChange: function(a) {
                var b;
                if (qq.supportedFeatures.ajaxUploading) {
                    for (b = 0; b < a.files.length; b++) this._annotateWithButtonId(a.files[b], a);
                    this.addFiles(a.files);
                } else a.value.length > 0 && this.addFiles(a);
                qq.each(this._buttons, function(a, b) {
                    b.reset();
                });
            },
            _onProgress: function(a, b, c, d) {
                this._totalProgress && this._totalProgress.onIndividualProgress(a, c, d);
            },
            _onSubmit: function(a, b) {},
            _onSubmitCallbackSuccess: function(a, b) {
                this._onSubmit.apply(this, arguments), this._uploadData.setStatus(a, qq.status.SUBMITTED), 
                this._onSubmitted.apply(this, arguments), this._options.autoUpload ? (this._options.callbacks.onSubmitted.apply(this, arguments), 
                this._uploadFile(a)) : (this._storeForLater(a), this._options.callbacks.onSubmitted.apply(this, arguments));
            },
            _onSubmitDelete: function(a, b, c) {
                var d, e = this.getUuid(a);
                return b && (d = qq.bind(b, this, a, e, c)), this._isDeletePossible() ? (this._handleCheckedCallback({
                    name: "onSubmitDelete",
                    callback: qq.bind(this._options.callbacks.onSubmitDelete, this, a),
                    onSuccess: d || qq.bind(this._deleteHandler.sendDelete, this, a, e, c),
                    identifier: a
                }), !0) : (this.log("Delete request ignored for ID " + a + ", delete feature is disabled or request not possible due to CORS on a user agent that does not support pre-flighting.", "warn"), 
                !1);
            },
            _onSubmitted: function(a) {},
            _onTotalProgress: function(a, b) {
                this._options.callbacks.onTotalProgress(a, b);
            },
            _onUploadPrep: function(a) {},
            _onUpload: function(a, b) {
                this._uploadData.setStatus(a, qq.status.UPLOADING);
            },
            _onUploadChunk: function(a, b) {},
            _onUploadStatusChange: function(a, b, c) {
                c === qq.status.PAUSED && clearTimeout(this._retryTimeouts[a]);
            },
            _onValidateBatchCallbackFailure: function(a) {
                var b = this;
                qq.each(a, function(a, c) {
                    b._fileOrBlobRejected(c.id);
                });
            },
            _onValidateBatchCallbackSuccess: function(a, b, c, d, e) {
                var f, g = this._currentItemLimit, h = this._netUploadedOrQueued;
                0 === g || h <= g ? b.length > 0 ? this._handleCheckedCallback({
                    name: "onValidate",
                    callback: qq.bind(this._options.callbacks.onValidate, this, a[0], e),
                    onSuccess: qq.bind(this._onValidateCallbackSuccess, this, b, 0, c, d),
                    onFailure: qq.bind(this._onValidateCallbackFailure, this, b, 0, c, d),
                    identifier: "Item '" + b[0].file.name + "', size: " + b[0].file.size
                }) : this._itemError("noFilesError") : (this._onValidateBatchCallbackFailure(b), 
                f = this._options.messages.tooManyItemsError.replace(/\{netItems\}/g, h).replace(/\{itemLimit\}/g, g), 
                this._batchError(f));
            },
            _onValidateCallbackFailure: function(a, b, c, d) {
                var e = b + 1;
                this._fileOrBlobRejected(a[b].id, a[b].file.name), this._maybeProcessNextItemAfterOnValidateCallback(!1, a, e, c, d);
            },
            _onValidateCallbackSuccess: function(a, b, c, d) {
                var e = this, f = b + 1, g = this._getValidationDescriptor(a[b]);
                this._validateFileOrBlobData(a[b], g).then(function() {
                    e._upload(a[b].id, c, d), e._maybeProcessNextItemAfterOnValidateCallback(!0, a, f, c, d);
                }, function() {
                    e._maybeProcessNextItemAfterOnValidateCallback(!1, a, f, c, d);
                });
            },
            _prepareItemsForUpload: function(a, b, c) {
                if (0 === a.length) return void this._itemError("noFilesError");
                var d = this._getValidationDescriptors(a), e = this._getButtonId(a[0].file), f = this._getButton(e);
                this._handleCheckedCallback({
                    name: "onValidateBatch",
                    callback: qq.bind(this._options.callbacks.onValidateBatch, this, d, f),
                    onSuccess: qq.bind(this._onValidateBatchCallbackSuccess, this, d, a, b, c, f),
                    onFailure: qq.bind(this._onValidateBatchCallbackFailure, this, a),
                    identifier: "batch validation"
                });
            },
            _preventLeaveInProgress: function() {
                var a = this;
                this._disposeSupport.attach(window, "beforeunload", function(b) {
                    if (a.getInProgress()) return b = b || window.event, b.returnValue = a._options.messages.onLeave, 
                    a._options.messages.onLeave;
                });
            },
            _refreshSessionData: function() {
                var a = this, b = this._options.session;
                qq.Session && null != this._options.session.endpoint && (this._session || (qq.extend(b, {
                    cors: this._options.cors
                }), b.log = qq.bind(this.log, this), b.addFileRecord = qq.bind(this._addCannedFile, this), 
                this._session = new qq.Session(b)), setTimeout(function() {
                    a._session.refresh().then(function(b, c) {
                        a._sessionRequestComplete(), a._options.callbacks.onSessionRequestComplete(b, !0, c);
                    }, function(b, c) {
                        a._options.callbacks.onSessionRequestComplete(b, !1, c);
                    });
                }, 0));
            },
            _sessionRequestComplete: function() {},
            _setSize: function(a, b) {
                this._uploadData.updateSize(a, b), this._totalProgress && this._totalProgress.onNewSize(a);
            },
            _shouldAutoRetry: function(a, b, c) {
                var d = this._uploadData.retrieve({
                    id: a
                });
                return !!(!this._preventRetries[a] && this._options.retry.enableAuto && d.status !== qq.status.PAUSED && (void 0 === this._autoRetries[a] && (this._autoRetries[a] = 0), 
                this._autoRetries[a] < this._options.retry.maxAutoAttempts)) && (this._autoRetries[a] += 1, 
                !0);
            },
            _storeForLater: function(a) {
                this._storedIds.push(a);
            },
            _trackButton: function(a) {
                var b;
                (b = qq.supportedFeatures.ajaxUploading ? this._handler.getFile(a).qqButtonId : this._getButtonId(this._handler.getInput(a))) && (this._buttonIdsForFileIds[a] = b);
            },
            _updateFormSupportAndParams: function(a) {
                this._options.form.element = a, this._formSupport = qq.FormSupport && new qq.FormSupport(this._options.form, qq.bind(this.uploadStoredFiles, this), qq.bind(this.log, this)), 
                this._formSupport && this._formSupport.attachedToForm && (this._paramsStore.addReadOnly(null, this._formSupport.getFormInputsAsObject), 
                this._options.autoUpload = this._formSupport.newAutoUpload, this._formSupport.newEndpoint && this.setEndpoint(this._formSupport.newEndpoint));
            },
            _upload: function(a, b, c) {
                var d = this.getName(a);
                b && this.setParams(b, a), c && this.setEndpoint(c, a), this._handleCheckedCallback({
                    name: "onSubmit",
                    callback: qq.bind(this._options.callbacks.onSubmit, this, a, d),
                    onSuccess: qq.bind(this._onSubmitCallbackSuccess, this, a, d),
                    onFailure: qq.bind(this._fileOrBlobRejected, this, a, d),
                    identifier: a
                });
            },
            _uploadFile: function(a) {
                this._handler.upload(a) || this._uploadData.setStatus(a, qq.status.QUEUED);
            },
            _uploadStoredFiles: function() {
                for (var a, b, c = this; this._storedIds.length; ) a = this._storedIds.shift(), 
                this._uploadFile(a);
                (b = this.getUploads({
                    status: qq.status.SUBMITTING
                }).length) && (qq.log("Still waiting for " + b + " files to clear submit queue. Will re-parse stored IDs array shortly."), 
                setTimeout(function() {
                    c._uploadStoredFiles();
                }, 1e3));
            },
            _validateFileOrBlobData: function(a, b) {
                var c = this, d = function() {
                    return a.file instanceof qq.BlobProxy ? a.file.referenceBlob : a.file;
                }(), e = b.name, f = b.size, g = this._getButtonId(a.file), h = this._getValidationBase(g), i = new qq.Promise();
                return i.then(function() {}, function() {
                    c._fileOrBlobRejected(a.id, e);
                }), qq.isFileOrInput(d) && !this._isAllowedExtension(h.allowedExtensions, e) ? (this._itemError("typeError", e, d), 
                i.failure()) : this._options.validation.allowEmpty || 0 !== f ? f > 0 && h.sizeLimit && f > h.sizeLimit ? (this._itemError("sizeError", e, d), 
                i.failure()) : f > 0 && f < h.minSizeLimit ? (this._itemError("minSizeError", e, d), 
                i.failure()) : (qq.ImageValidation && qq.supportedFeatures.imagePreviews && qq.isFile(d) ? new qq.ImageValidation(d, qq.bind(c.log, c)).validate(h.image).then(i.success, function(a) {
                    c._itemError(a + "ImageError", e, d), i.failure();
                }) : i.success(), i) : (this._itemError("emptyError", e, d), i.failure());
            },
            _wrapCallbacks: function() {
                var a, b, c;
                a = this, b = function(b, c, d) {
                    var e;
                    try {
                        return c.apply(a, d);
                    } catch (c) {
                        e = c.message || c.toString(), a.log("Caught exception in '" + b + "' callback - " + e, "error");
                    }
                };
                for (c in this._options.callbacks) !function() {
                    var d, e;
                    d = c, e = a._options.callbacks[d], a._options.callbacks[d] = function() {
                        return b(d, e, arguments);
                    };
                }();
            }
        };
    }(), function() {
        qq.FineUploaderBasic = function(a) {
            var b = this;
            this._options = {
                debug: !1,
                button: null,
                multiple: !0,
                maxConnections: 3,
                disableCancelForFormUploads: !1,
                autoUpload: !0,
                request: {
                    customHeaders: {},
                    endpoint: "/server/upload",
                    filenameParam: "qqfilename",
                    forceMultipart: !0,
                    inputName: "qqfile",
                    method: "POST",
                    params: {},
                    paramsInBody: !0,
                    totalFileSizeName: "qqtotalfilesize",
                    uuidName: "qquuid"
                },
                validation: {
                    allowedExtensions: [],
                    sizeLimit: 0,
                    minSizeLimit: 0,
                    itemLimit: 0,
                    stopOnFirstInvalidFile: !0,
                    acceptFiles: null,
                    image: {
                        maxHeight: 0,
                        maxWidth: 0,
                        minHeight: 0,
                        minWidth: 0
                    },
                    allowEmpty: !1
                },
                callbacks: {
                    onSubmit: function(a, b) {},
                    onSubmitted: function(a, b) {},
                    onComplete: function(a, b, c, d) {},
                    onAllComplete: function(a, b) {},
                    onCancel: function(a, b) {},
                    onUpload: function(a, b) {},
                    onUploadChunk: function(a, b, c) {},
                    onUploadChunkSuccess: function(a, b, c, d) {},
                    onResume: function(a, b, c) {},
                    onProgress: function(a, b, c, d) {},
                    onTotalProgress: function(a, b) {},
                    onError: function(a, b, c, d) {},
                    onAutoRetry: function(a, b, c) {},
                    onManualRetry: function(a, b) {},
                    onValidateBatch: function(a) {},
                    onValidate: function(a) {},
                    onSubmitDelete: function(a) {},
                    onDelete: function(a) {},
                    onDeleteComplete: function(a, b, c) {},
                    onPasteReceived: function(a) {},
                    onStatusChange: function(a, b, c) {},
                    onSessionRequestComplete: function(a, b, c) {}
                },
                messages: {
                    typeError: "{file} has an invalid extension. Valid extension(s): {extensions}.",
                    sizeError: "{file} is too large, maximum file size is {sizeLimit}.",
                    minSizeError: "{file} is too small, minimum file size is {minSizeLimit}.",
                    emptyError: "{file} is empty, please select files again without it.",
                    noFilesError: "No files to upload.",
                    tooManyItemsError: "Too many items ({netItems}) would be uploaded.  Item limit is {itemLimit}.",
                    maxHeightImageError: "Image is too tall.",
                    maxWidthImageError: "Image is too wide.",
                    minHeightImageError: "Image is not tall enough.",
                    minWidthImageError: "Image is not wide enough.",
                    retryFailTooManyItems: "Retry failed - you have reached your file limit.",
                    onLeave: "The files are being uploaded, if you leave now the upload will be canceled.",
                    unsupportedBrowserIos8Safari: "Unrecoverable error - this browser does not permit file uploading of any kind due to serious bugs in iOS8 Safari.  Please use iOS8 Chrome until Apple fixes these issues."
                },
                retry: {
                    enableAuto: !1,
                    maxAutoAttempts: 3,
                    autoAttemptDelay: 5,
                    preventRetryResponseProperty: "preventRetry"
                },
                classes: {
                    buttonHover: "qq-upload-button-hover",
                    buttonFocus: "qq-upload-button-focus"
                },
                chunking: {
                    enabled: !1,
                    concurrent: {
                        enabled: !1
                    },
                    mandatory: !1,
                    paramNames: {
                        partIndex: "qqpartindex",
                        partByteOffset: "qqpartbyteoffset",
                        chunkSize: "qqchunksize",
                        totalFileSize: "qqtotalfilesize",
                        totalParts: "qqtotalparts"
                    },
                    partSize: 2e6,
                    success: {
                        endpoint: null
                    }
                },
                resume: {
                    enabled: !1,
                    recordsExpireIn: 7,
                    paramNames: {
                        resuming: "qqresume"
                    }
                },
                formatFileName: function(a) {
                    return a;
                },
                text: {
                    defaultResponseError: "Upload failure reason unknown",
                    fileInputTitle: "file input",
                    sizeSymbols: [ "kB", "MB", "GB", "TB", "PB", "EB" ]
                },
                deleteFile: {
                    enabled: !1,
                    method: "DELETE",
                    endpoint: "/server/upload",
                    customHeaders: {},
                    params: {}
                },
                cors: {
                    expected: !1,
                    sendCredentials: !1,
                    allowXdr: !1
                },
                blobs: {
                    defaultName: "misc_data"
                },
                paste: {
                    targetElement: null,
                    defaultName: "pasted_image"
                },
                camera: {
                    ios: !1,
                    button: null
                },
                extraButtons: [],
                session: {
                    endpoint: null,
                    params: {},
                    customHeaders: {},
                    refreshOnReset: !0
                },
                form: {
                    element: "qq-form",
                    autoUpload: !1,
                    interceptSubmit: !0
                },
                scaling: {
                    customResizer: null,
                    sendOriginal: !0,
                    orient: !0,
                    defaultType: null,
                    defaultQuality: 80,
                    failureText: "Failed to scale",
                    includeExif: !1,
                    sizes: []
                },
                workarounds: {
                    iosEmptyVideos: !0,
                    ios8SafariUploads: !0,
                    ios8BrowserCrash: !1
                }
            }, qq.extend(this._options, a, !0), this._buttons = [], this._extraButtonSpecs = {}, 
            this._buttonIdsForFileIds = [], this._wrapCallbacks(), this._disposeSupport = new qq.DisposeSupport(), 
            this._storedIds = [], this._autoRetries = [], this._retryTimeouts = [], this._preventRetries = [], 
            this._thumbnailUrls = [], this._netUploadedOrQueued = 0, this._netUploaded = 0, 
            this._uploadData = this._createUploadDataTracker(), this._initFormSupportAndParams(), 
            this._customHeadersStore = this._createStore(this._options.request.customHeaders), 
            this._deleteFileCustomHeadersStore = this._createStore(this._options.deleteFile.customHeaders), 
            this._deleteFileParamsStore = this._createStore(this._options.deleteFile.params), 
            this._endpointStore = this._createStore(this._options.request.endpoint), this._deleteFileEndpointStore = this._createStore(this._options.deleteFile.endpoint), 
            this._handler = this._createUploadHandler(), this._deleteHandler = qq.DeleteFileAjaxRequester && this._createDeleteHandler(), 
            this._options.button && (this._defaultButtonId = this._createUploadButton({
                element: this._options.button,
                title: this._options.text.fileInputTitle
            }).getButtonId()), this._generateExtraButtonSpecs(), this._handleCameraAccess(), 
            this._options.paste.targetElement && (qq.PasteSupport ? this._pasteHandler = this._createPasteHandler() : this.log("Paste support module not found", "error")), 
            this._preventLeaveInProgress(), this._imageGenerator = qq.ImageGenerator && new qq.ImageGenerator(qq.bind(this.log, this)), 
            this._refreshSessionData(), this._succeededSinceLastAllComplete = [], this._failedSinceLastAllComplete = [], 
            this._scaler = qq.Scaler && new qq.Scaler(this._options.scaling, qq.bind(this.log, this)) || {}, 
            this._scaler.enabled && (this._customNewFileHandler = qq.bind(this._scaler.handleNewFile, this._scaler)), 
            qq.TotalProgress && qq.supportedFeatures.progressBar && (this._totalProgress = new qq.TotalProgress(qq.bind(this._onTotalProgress, this), function(a) {
                var c = b._uploadData.retrieve({
                    id: a
                });
                return c && c.size || 0;
            })), this._currentItemLimit = this._options.validation.itemLimit;
        }, qq.FineUploaderBasic.prototype = qq.basePublicApi, qq.extend(qq.FineUploaderBasic.prototype, qq.basePrivateApi);
    }(), qq.AjaxRequester = function(a) {
        function b() {
            return qq.indexOf([ "GET", "POST", "HEAD" ], w.method) >= 0;
        }
        function c(a) {
            var b = !1;
            return qq.each(b, function(a, c) {
                if (qq.indexOf([ "Accept", "Accept-Language", "Content-Language", "Content-Type" ], c) < 0) return b = !0, 
                !1;
            }), b;
        }
        function d(a) {
            return w.cors.expected && void 0 === a.withCredentials;
        }
        function e() {
            var a;
            return (window.XMLHttpRequest || window.ActiveXObject) && (a = qq.createXhrInstance(), 
            void 0 === a.withCredentials && (a = new XDomainRequest(), a.onload = function() {}, 
            a.onerror = function() {}, a.ontimeout = function() {}, a.onprogress = function() {})), 
            a;
        }
        function f(a, b) {
            var c = v[a].xhr;
            return c || (c = b || (w.cors.expected ? e() : qq.createXhrInstance()), v[a].xhr = c), 
            c;
        }
        function g(a) {
            var b, c = qq.indexOf(u, a), d = w.maxConnections;
            delete v[a], u.splice(c, 1), u.length >= d && c < d && (b = u[d - 1], j(b));
        }
        function h(a, b) {
            var c = f(a), e = w.method, h = !0 === b;
            g(a), h ? s(e + " request for " + a + " has failed", "error") : d(c) || q(c.status) || (h = !0, 
            s(e + " request for " + a + " has failed - response code " + c.status, "error")), 
            w.onComplete(a, c, h);
        }
        function i(a) {
            var b, c = v[a].additionalParams, d = w.mandatedParams;
            return w.paramsStore.get && (b = w.paramsStore.get(a)), c && qq.each(c, function(a, c) {
                b = b || {}, b[a] = c;
            }), d && qq.each(d, function(a, c) {
                b = b || {}, b[a] = c;
            }), b;
        }
        function j(a, b) {
            var c, e = f(a, b), g = w.method, h = i(a), j = v[a].payload;
            return w.onSend(a), c = k(a, h, v[a].additionalQueryParams), d(e) ? (e.onload = n(a), 
            e.onerror = o(a)) : e.onreadystatechange = l(a), m(a), e.open(g, c, !0), w.cors.expected && w.cors.sendCredentials && !d(e) && (e.withCredentials = !0), 
            p(a), s("Sending " + g + " request for " + a), j ? e.send(j) : t || !h ? e.send() : h && w.contentType && w.contentType.toLowerCase().indexOf("application/x-www-form-urlencoded") >= 0 ? e.send(qq.obj2url(h, "")) : h && w.contentType && w.contentType.toLowerCase().indexOf("application/json") >= 0 ? e.send(JSON.stringify(h)) : e.send(h), 
            e;
        }
        function k(a, b, c) {
            var d = w.endpointStore.get(a), e = v[a].addToPath;
            return void 0 != e && (d += "/" + e), t && b && (d = qq.obj2url(b, d)), c && (d = qq.obj2url(c, d)), 
            d;
        }
        function l(a) {
            return function() {
                4 === f(a).readyState && h(a);
            };
        }
        function m(a) {
            var b = w.onProgress;
            b && (f(a).upload.onprogress = function(c) {
                c.lengthComputable && b(a, c.loaded, c.total);
            });
        }
        function n(a) {
            return function() {
                h(a);
            };
        }
        function o(a) {
            return function() {
                h(a, !0);
            };
        }
        function p(a) {
            var e = f(a), g = w.customHeaders, h = v[a].additionalHeaders || {}, i = w.method, j = {};
            d(e) || (w.acceptHeader && e.setRequestHeader("Accept", w.acceptHeader), w.allowXRequestedWithAndCacheControl && (w.cors.expected && b() && !c(g) || (e.setRequestHeader("X-Requested-With", "XMLHttpRequest"), 
            e.setRequestHeader("Cache-Control", "no-cache"))), !w.contentType || "POST" !== i && "PUT" !== i || e.setRequestHeader("Content-Type", w.contentType), 
            qq.extend(j, qq.isFunction(g) ? g(a) : g), qq.extend(j, h), qq.each(j, function(a, b) {
                e.setRequestHeader(a, b);
            }));
        }
        function q(a) {
            return qq.indexOf(w.successfulResponseCodes[w.method], a) >= 0;
        }
        function r(a, b, c, d, e, f, g) {
            if (v[a] = {
                addToPath: c,
                additionalParams: d,
                additionalQueryParams: e,
                additionalHeaders: f,
                payload: g
            }, u.push(a) <= w.maxConnections) return j(a, b);
        }
        var s, t, u = [], v = {}, w = {
            acceptHeader: null,
            validMethods: [ "PATCH", "POST", "PUT" ],
            method: "POST",
            contentType: "application/x-www-form-urlencoded",
            maxConnections: 3,
            customHeaders: {},
            endpointStore: {},
            paramsStore: {},
            mandatedParams: {},
            allowXRequestedWithAndCacheControl: !0,
            successfulResponseCodes: {
                DELETE: [ 200, 202, 204 ],
                PATCH: [ 200, 201, 202, 203, 204 ],
                POST: [ 200, 201, 202, 203, 204 ],
                PUT: [ 200, 201, 202, 203, 204 ],
                GET: [ 200 ]
            },
            cors: {
                expected: !1,
                sendCredentials: !1
            },
            log: function(a, b) {},
            onSend: function(a) {},
            onComplete: function(a, b, c) {},
            onProgress: null
        };
        if (qq.extend(w, a), s = w.log, qq.indexOf(w.validMethods, w.method) < 0) throw new Error("'" + w.method + "' is not a supported method for this type of request!");
        t = "GET" === w.method || "DELETE" === w.method, qq.extend(this, {
            initTransport: function(a) {
                var b, c, d, e, f, g;
                return {
                    withPath: function(a) {
                        return b = a, this;
                    },
                    withParams: function(a) {
                        return c = a, this;
                    },
                    withQueryParams: function(a) {
                        return g = a, this;
                    },
                    withHeaders: function(a) {
                        return d = a, this;
                    },
                    withPayload: function(a) {
                        return e = a, this;
                    },
                    withCacheBuster: function() {
                        return f = !0, this;
                    },
                    send: function(h) {
                        return f && qq.indexOf([ "GET", "DELETE" ], w.method) >= 0 && (c.qqtimestamp = new Date().getTime()), 
                        r(a, h, b, c, g, d, e);
                    }
                };
            },
            canceled: function(a) {
                g(a);
            }
        });
    }, qq.UploadHandler = function(a) {
        var b = a.proxy, c = {}, d = b.onCancel, e = b.getName;
        qq.extend(this, {
            add: function(a, b) {
                c[a] = b, c[a].temp = {};
            },
            cancel: function(a) {
                var b = this, f = new qq.Promise();
                d(a, e(a), f).then(function() {
                    b.isValid(a) && (c[a].canceled = !0, b.expunge(a)), f.success();
                });
            },
            expunge: function(a) {
                delete c[a];
            },
            getThirdPartyFileId: function(a) {
                return c[a].key;
            },
            isValid: function(a) {
                return void 0 !== c[a];
            },
            reset: function() {
                c = {};
            },
            _getFileState: function(a) {
                return c[a];
            },
            _setThirdPartyFileId: function(a, b) {
                c[a].key = b;
            },
            _wasCanceled: function(a) {
                return !!c[a].canceled;
            }
        });
    }, qq.UploadHandlerController = function(a, b) {
        var c, d, e, f = this, g = !1, h = !1, i = {
            paramsStore: {},
            maxConnections: 3,
            chunking: {
                enabled: !1,
                multiple: {
                    enabled: !1
                }
            },
            log: function(a, b) {},
            onProgress: function(a, b, c, d) {},
            onComplete: function(a, b, c, d) {},
            onCancel: function(a, b) {},
            onUploadPrep: function(a) {},
            onUpload: function(a, b) {},
            onUploadChunk: function(a, b, c) {},
            onUploadChunkSuccess: function(a, b, c, d) {},
            onAutoRetry: function(a, b, c, d) {},
            onResume: function(a, b, c) {},
            onUuidChanged: function(a, b) {},
            getName: function(a) {},
            setSize: function(a, b) {},
            isQueued: function(a) {},
            getIdsInProxyGroup: function(a) {},
            getIdsInBatch: function(a) {}
        }, j = {
            done: function(a, b, c, d) {
                var f = e._getChunkData(a, b);
                e._getFileState(a).attemptingResume = !1, delete e._getFileState(a).temp.chunkProgress[b], 
                e._getFileState(a).loaded += f.size, i.onUploadChunkSuccess(a, e._getChunkDataForCallback(f), c, d);
            },
            finalize: function(a) {
                var b = i.getSize(a), c = i.getName(a);
                d("All chunks have been uploaded for " + a + " - finalizing...."), e.finalizeChunks(a).then(function(f, g) {
                    d("Finalize successful for " + a);
                    var h = m.normalizeResponse(f, !0);
                    i.onProgress(a, c, b, b), e._maybeDeletePersistedChunkData(a), m.cleanup(a, h, g);
                }, function(b, e) {
                    var f = m.normalizeResponse(b, !1);
                    d("Problem finalizing chunks for file ID " + a + " - " + f.error, "error"), f.reset && j.reset(a), 
                    i.onAutoRetry(a, c, f, e) || m.cleanup(a, f, e);
                });
            },
            handleFailure: function(a, b, c, f) {
                var g = i.getName(b);
                d("Chunked upload request failed for " + b + ", chunk " + a), e.clearCachedChunk(b, a);
                var l, n = m.normalizeResponse(c, !1);
                n.reset ? j.reset(b) : (l = qq.indexOf(e._getFileState(b).chunking.inProgress, a)) >= 0 && (e._getFileState(b).chunking.inProgress.splice(l, 1), 
                e._getFileState(b).chunking.remaining.unshift(a)), e._getFileState(b).temp.ignoreFailure || (h && (e._getFileState(b).temp.ignoreFailure = !0, 
                d(qq.format("Going to attempt to abort these chunks: {}. These are currently in-progress: {}.", JSON.stringify(Object.keys(e._getXhrs(b))), JSON.stringify(e._getFileState(b).chunking.inProgress))), 
                qq.each(e._getXhrs(b), function(a, c) {
                    d(qq.format("Attempting to abort file {}.{}. XHR readyState {}. ", b, a, c.readyState)), 
                    c.abort(), c._cancelled = !0;
                }), e.moveInProgressToRemaining(b), k.free(b, !0)), i.onAutoRetry(b, g, n, f) || m.cleanup(b, n, f));
            },
            hasMoreParts: function(a) {
                return !!e._getFileState(a).chunking.remaining.length;
            },
            nextPart: function(a) {
                var b = e._getFileState(a).chunking.remaining.shift();
                return b >= e._getTotalChunks(a) && (b = null), b;
            },
            reset: function(a) {
                d("Server or callback has ordered chunking effort to be restarted on next attempt for item ID " + a, "error"), 
                e._maybeDeletePersistedChunkData(a), e.reevaluateChunking(a), e._getFileState(a).loaded = 0;
            },
            sendNext: function(a) {
                var b = i.getSize(a), c = i.getName(a), f = j.nextPart(a), g = e._getChunkData(a, f), l = e._getFileState(a).attemptingResume, n = e._getFileState(a).chunking.inProgress || [];
                null == e._getFileState(a).loaded && (e._getFileState(a).loaded = 0), l && !1 === i.onResume(a, c, g) && (j.reset(a), 
                f = j.nextPart(a), g = e._getChunkData(a, f), l = !1), null == f && 0 === n.length ? j.finalize(a) : (d(qq.format("Sending chunked upload request for item {}.{}, bytes {}-{} of {}.", a, f, g.start + 1, g.end, b)), 
                i.onUploadChunk(a, c, e._getChunkDataForCallback(g)), n.push(f), e._getFileState(a).chunking.inProgress = n, 
                h && k.open(a, f), h && k.available() && e._getFileState(a).chunking.remaining.length && j.sendNext(a), 
                0 === g.blob.size ? (d(qq.format("Chunk {} for file {} will not be uploaded, zero sized chunk.", f, a), "error"), 
                j.handleFailure(f, a, "File is no longer available", null)) : e.uploadChunk(a, f, l).then(function(b, c) {
                    d("Chunked upload request succeeded for " + a + ", chunk " + f), e.clearCachedChunk(a, f);
                    var g = e._getFileState(a).chunking.inProgress || [], h = m.normalizeResponse(b, !0), i = qq.indexOf(g, f);
                    d(qq.format("Chunk {} for file {} uploaded successfully.", f, a)), j.done(a, f, h, c), 
                    i >= 0 && g.splice(i, 1), e._maybePersistChunkedState(a), j.hasMoreParts(a) || 0 !== g.length ? j.hasMoreParts(a) ? j.sendNext(a) : d(qq.format("File ID {} has no more chunks to send and these chunk indexes are still marked as in-progress: {}", a, JSON.stringify(g))) : j.finalize(a);
                }, function(b, c) {
                    j.handleFailure(f, a, b, c);
                }).done(function() {
                    e.clearXhr(a, f);
                }));
            }
        }, k = {
            _open: [],
            _openChunks: {},
            _waiting: [],
            available: function() {
                var a = i.maxConnections, b = 0, c = 0;
                return qq.each(k._openChunks, function(a, d) {
                    b++, c += d.length;
                }), a - (k._open.length - b + c);
            },
            free: function(a, b) {
                var c, f = !b, g = qq.indexOf(k._waiting, a), h = qq.indexOf(k._open, a);
                delete k._openChunks[a], m.getProxyOrBlob(a) instanceof qq.BlobProxy && (d("Generated blob upload has ended for " + a + ", disposing generated blob."), 
                delete e._getFileState(a).file), g >= 0 ? k._waiting.splice(g, 1) : f && h >= 0 && (k._open.splice(h, 1), 
                (c = k._waiting.shift()) >= 0 && (k._open.push(c), m.start(c)));
            },
            getWaitingOrConnected: function() {
                var a = [];
                return qq.each(k._openChunks, function(b, c) {
                    c && c.length && a.push(parseInt(b));
                }), qq.each(k._open, function(b, c) {
                    k._openChunks[c] || a.push(parseInt(c));
                }), a = a.concat(k._waiting);
            },
            isUsingConnection: function(a) {
                return qq.indexOf(k._open, a) >= 0;
            },
            open: function(a, b) {
                return null == b && k._waiting.push(a), !!k.available() && (null == b ? (k._waiting.pop(), 
                k._open.push(a)) : function() {
                    var c = k._openChunks[a] || [];
                    c.push(b), k._openChunks[a] = c;
                }(), !0);
            },
            reset: function() {
                k._waiting = [], k._open = [];
            }
        }, l = {
            send: function(a, b) {
                e._getFileState(a).loaded = 0, d("Sending simple upload request for " + a), e.uploadFile(a).then(function(c, e) {
                    d("Simple upload request succeeded for " + a);
                    var f = m.normalizeResponse(c, !0), g = i.getSize(a);
                    i.onProgress(a, b, g, g), m.maybeNewUuid(a, f), m.cleanup(a, f, e);
                }, function(c, e) {
                    d("Simple upload request failed for " + a);
                    var f = m.normalizeResponse(c, !1);
                    i.onAutoRetry(a, b, f, e) || m.cleanup(a, f, e);
                });
            }
        }, m = {
            cancel: function(a) {
                d("Cancelling " + a), i.paramsStore.remove(a), k.free(a);
            },
            cleanup: function(a, b, c) {
                var d = i.getName(a);
                i.onComplete(a, d, b, c), e._getFileState(a) && e._clearXhrs && e._clearXhrs(a), 
                k.free(a);
            },
            getProxyOrBlob: function(a) {
                return e.getProxy && e.getProxy(a) || e.getFile && e.getFile(a);
            },
            initHandler: function() {
                e = new (b ? qq[b] : qq.traditional)[(qq.supportedFeatures.ajaxUploading ? "Xhr" : "Form") + "UploadHandler"](i, {
                    getDataByUuid: i.getDataByUuid,
                    getName: i.getName,
                    getSize: i.getSize,
                    getUuid: i.getUuid,
                    log: d,
                    onCancel: i.onCancel,
                    onProgress: i.onProgress,
                    onUuidChanged: i.onUuidChanged
                }), e._removeExpiredChunkingRecords && e._removeExpiredChunkingRecords();
            },
            isDeferredEligibleForUpload: function(a) {
                return i.isQueued(a);
            },
            maybeDefer: function(a, b) {
                return b && !e.getFile(a) && b instanceof qq.BlobProxy ? (i.onUploadPrep(a), d("Attempting to generate a blob on-demand for " + a), 
                b.create().then(function(b) {
                    d("Generated an on-demand blob for " + a), e.updateBlob(a, b), i.setSize(a, b.size), 
                    e.reevaluateChunking(a), m.maybeSendDeferredFiles(a);
                }, function(b) {
                    var e = {};
                    b && (e.error = b), d(qq.format("Failed to generate blob for ID {}.  Error message: {}.", a, b), "error"), 
                    i.onComplete(a, i.getName(a), qq.extend(e, c), null), m.maybeSendDeferredFiles(a), 
                    k.free(a);
                }), !1) : m.maybeSendDeferredFiles(a);
            },
            maybeSendDeferredFiles: function(a) {
                var b = i.getIdsInProxyGroup(a), c = !1;
                return b && b.length ? (d("Maybe ready to upload proxy group file " + a), qq.each(b, function(b, d) {
                    if (m.isDeferredEligibleForUpload(d) && e.getFile(d)) c = d === a, m.now(d); else if (m.isDeferredEligibleForUpload(d)) return !1;
                })) : (c = !0, m.now(a)), c;
            },
            maybeNewUuid: function(a, b) {
                void 0 !== b.newUuid && i.onUuidChanged(a, b.newUuid);
            },
            normalizeResponse: function(a, b) {
                var c = a;
                return qq.isObject(a) || (c = {}, qq.isString(a) && !b && (c.error = a)), c.success = b, 
                c;
            },
            now: function(a) {
                var b = i.getName(a);
                if (!f.isValid(a)) throw new qq.Error(a + " is not a valid file ID to upload!");
                i.onUpload(a, b), g && e._shouldChunkThisFile(a) ? j.sendNext(a) : l.send(a, b);
            },
            start: function(a) {
                var b = m.getProxyOrBlob(a);
                return b ? m.maybeDefer(a, b) : (m.now(a), !0);
            }
        };
        qq.extend(this, {
            add: function(a, b) {
                e.add.apply(this, arguments);
            },
            upload: function(a) {
                return !!k.open(a) && m.start(a);
            },
            retry: function(a) {
                return h && (e._getFileState(a).temp.ignoreFailure = !1), k.isUsingConnection(a) ? m.start(a) : f.upload(a);
            },
            cancel: function(a) {
                var b = e.cancel(a);
                qq.isGenericPromise(b) ? b.then(function() {
                    m.cancel(a);
                }) : !1 !== b && m.cancel(a);
            },
            cancelAll: function() {
                var a, b = k.getWaitingOrConnected();
                if (b.length) for (a = b.length - 1; a >= 0; a--) f.cancel(b[a]);
                k.reset();
            },
            getFile: function(a) {
                return e.getProxy && e.getProxy(a) ? e.getProxy(a).referenceBlob : e.getFile && e.getFile(a);
            },
            isProxied: function(a) {
                return !(!e.getProxy || !e.getProxy(a));
            },
            getInput: function(a) {
                if (e.getInput) return e.getInput(a);
            },
            reset: function() {
                d("Resetting upload handler"), f.cancelAll(), k.reset(), e.reset();
            },
            expunge: function(a) {
                if (f.isValid(a)) return e.expunge(a);
            },
            isValid: function(a) {
                return e.isValid(a);
            },
            getResumableFilesData: function() {
                return e.getResumableFilesData ? e.getResumableFilesData() : [];
            },
            getThirdPartyFileId: function(a) {
                if (f.isValid(a)) return e.getThirdPartyFileId(a);
            },
            pause: function(a) {
                return !!(f.isResumable(a) && e.pause && f.isValid(a) && e.pause(a)) && (k.free(a), 
                e.moveInProgressToRemaining(a), !0);
            },
            isResumable: function(a) {
                return !!e.isResumable && e.isResumable(a);
            }
        }), qq.extend(i, a), d = i.log, g = i.chunking.enabled && qq.supportedFeatures.chunking, 
        h = g && i.chunking.concurrent.enabled, c = function() {
            var a = {};
            return a[i.preventRetryParam] = !0, a;
        }(), m.initHandler();
    }, qq.WindowReceiveMessage = function(a) {
        var b = {
            log: function(a, b) {}
        }, c = {};
        qq.extend(b, a), qq.extend(this, {
            receiveMessage: function(a, b) {
                var d = function(a) {
                    b(a.data);
                };
                window.postMessage ? c[a] = qq(window).attach("message", d) : log("iframe message passing not supported in this browser!", "error");
            },
            stopReceivingMessages: function(a) {
                if (window.postMessage) {
                    var b = c[a];
                    b && b();
                }
            }
        });
    }, qq.FormUploadHandler = function(a) {
        function b(a) {
            delete k[a], m && (clearTimeout(l[a]), delete l[a], q.stopReceivingMessages(a));
            var b = document.getElementById(g._getIframeName(a));
            b && (b.setAttribute("src", "javascript:false;"), qq(b).remove());
        }
        function c(a) {
            return a.split("_")[0];
        }
        function d(a) {
            var b = qq.toElement("<iframe src='javascript:false;' name='" + a + "' />");
            return b.setAttribute("id", a), b.style.display = "none", document.body.appendChild(b), 
            b;
        }
        function e(a, b) {
            var d = a.id, e = c(d);
            j[o(e)] = b, k[e] = qq(a).attach("load", function() {
                g.getInput(e) && (p("Received iframe load event for CORS upload request (iframe name " + d + ")"), 
                l[d] = setTimeout(function() {
                    var a = "No valid message received from loaded iframe for iframe name " + d;
                    p(a, "error"), b({
                        error: a
                    });
                }, 1e3));
            }), q.receiveMessage(d, function(a) {
                p("Received the following window message: '" + a + "'");
                var b, e = (c(d), g._parseJsonResponse(a)), f = e.uuid;
                f && j[f] ? (p("Handling response for iframe name " + d), clearTimeout(l[d]), delete l[d], 
                g._detachLoadEvent(d), b = j[f], delete j[f], q.stopReceivingMessages(d), b(e)) : f || p("'" + a + "' does not contain a UUID - ignoring.");
            });
        }
        var f = a.options, g = this, h = a.proxy, i = qq.getUniqueId(), j = {}, k = {}, l = {}, m = f.isCors, n = f.inputName, o = h.getUuid, p = h.log, q = new qq.WindowReceiveMessage({
            log: p
        });
        qq.extend(this, new qq.UploadHandler(a)), qq.override(this, function(a) {
            return {
                add: function(b, c) {
                    a.add(b, {
                        input: c
                    }), c.setAttribute("name", n), c.parentNode && qq(c).remove();
                },
                expunge: function(c) {
                    b(c), a.expunge(c);
                },
                isValid: function(b) {
                    return a.isValid(b) && void 0 !== g._getFileState(b).input;
                }
            };
        }), qq.extend(this, {
            getInput: function(a) {
                return g._getFileState(a).input;
            },
            _attachLoadEvent: function(a, b) {
                var c;
                m ? e(a, b) : k[a.id] = qq(a).attach("load", function() {
                    if (p("Received response for " + a.id), a.parentNode) {
                        try {
                            if (a.contentDocument && a.contentDocument.body && "false" == a.contentDocument.body.innerHTML) return;
                        } catch (a) {
                            p("Error when attempting to access iframe during handling of upload response (" + a.message + ")", "error"), 
                            c = {
                                success: !1
                            };
                        }
                        b(c);
                    }
                });
            },
            _createIframe: function(a) {
                return d(g._getIframeName(a));
            },
            _detachLoadEvent: function(a) {
                void 0 !== k[a] && (k[a](), delete k[a]);
            },
            _getIframeName: function(a) {
                return a + "_" + i;
            },
            _initFormForUpload: function(a) {
                var b = a.method, c = a.endpoint, d = a.params, e = a.paramsInBody, f = a.targetName, g = qq.toElement("<form method='" + b + "' enctype='multipart/form-data'></form>"), h = c;
                return e ? qq.obj2Inputs(d, g) : h = qq.obj2url(d, c), g.setAttribute("action", h), 
                g.setAttribute("target", f), g.style.display = "none", document.body.appendChild(g), 
                g;
            },
            _parseJsonResponse: function(a) {
                var b = {};
                try {
                    b = qq.parseJson(a);
                } catch (a) {
                    p("Error when attempting to parse iframe upload response (" + a.message + ")", "error");
                }
                return b;
            }
        });
    }, qq.XhrUploadHandler = function(a) {
        function b(a) {
            qq.each(c._getXhrs(a), function(b, d) {
                var e = c._getAjaxRequester(a, b);
                d.onreadystatechange = null, d.upload.onprogress = null, d.abort(), e && e.canceled && e.canceled(a);
            });
        }
        var c = this, d = a.options.namespace, e = a.proxy, f = a.options.chunking, g = a.options.resume, h = f && a.options.chunking.enabled && qq.supportedFeatures.chunking, i = g && a.options.resume.enabled && h && qq.supportedFeatures.resume, j = e.getName, k = e.getSize, l = e.getUuid, m = e.getEndpoint, n = e.getDataByUuid, o = e.onUuidChanged, p = e.onProgress, q = e.log;
        qq.extend(this, new qq.UploadHandler(a)), qq.override(this, function(a) {
            return {
                add: function(b, d) {
                    if (qq.isFile(d) || qq.isBlob(d)) a.add(b, {
                        file: d
                    }); else {
                        if (!(d instanceof qq.BlobProxy)) throw new Error("Passed obj is not a File, Blob, or proxy");
                        a.add(b, {
                            proxy: d
                        });
                    }
                    c._initTempState(b), i && c._maybePrepareForResume(b);
                },
                expunge: function(d) {
                    b(d), c._maybeDeletePersistedChunkData(d), c._clearXhrs(d), a.expunge(d);
                }
            };
        }), qq.extend(this, {
            clearCachedChunk: function(a, b) {
                delete c._getFileState(a).temp.cachedChunks[b];
            },
            clearXhr: function(a, b) {
                var d = c._getFileState(a).temp;
                d.xhrs && delete d.xhrs[b], d.ajaxRequesters && delete d.ajaxRequesters[b];
            },
            finalizeChunks: function(a, b) {
                var d = c._getTotalChunks(a) - 1, e = c._getXhr(a, d);
                return b ? new qq.Promise().success(b(e), e) : new qq.Promise().success({}, e);
            },
            getFile: function(a) {
                return c.isValid(a) && c._getFileState(a).file;
            },
            getProxy: function(a) {
                return c.isValid(a) && c._getFileState(a).proxy;
            },
            getResumableFilesData: function() {
                var a = [];
                return c._iterateResumeRecords(function(b, d) {
                    c.moveInProgressToRemaining(null, d.chunking.inProgress, d.chunking.remaining);
                    var e = {
                        name: d.name,
                        remaining: d.chunking.remaining,
                        size: d.size,
                        uuid: d.uuid
                    };
                    d.key && (e.key = d.key), a.push(e);
                }), a;
            },
            isResumable: function(a) {
                return !!f && c.isValid(a) && !c._getFileState(a).notResumable;
            },
            moveInProgressToRemaining: function(a, b, d) {
                var e = b || c._getFileState(a).chunking.inProgress, f = d || c._getFileState(a).chunking.remaining;
                e && (q(qq.format("Moving these chunks from in-progress {}, to remaining.", JSON.stringify(e))), 
                e.reverse(), qq.each(e, function(a, b) {
                    f.unshift(b);
                }), e.length = 0);
            },
            pause: function(a) {
                if (c.isValid(a)) return q(qq.format("Aborting XHR upload for {} '{}' due to pause instruction.", a, j(a))), 
                c._getFileState(a).paused = !0, b(a), !0;
            },
            reevaluateChunking: function(a) {
                if (f && c.isValid(a)) {
                    var b, d, e = c._getFileState(a);
                    if (delete e.chunking, e.chunking = {}, (b = c._getTotalChunks(a)) > 1 || f.mandatory) {
                        for (e.chunking.enabled = !0, e.chunking.parts = b, e.chunking.remaining = [], d = 0; d < b; d++) e.chunking.remaining.push(d);
                        c._initTempState(a);
                    } else e.chunking.enabled = !1;
                }
            },
            updateBlob: function(a, b) {
                c.isValid(a) && (c._getFileState(a).file = b);
            },
            _clearXhrs: function(a) {
                var b = c._getFileState(a).temp;
                qq.each(b.ajaxRequesters, function(a) {
                    delete b.ajaxRequesters[a];
                }), qq.each(b.xhrs, function(a) {
                    delete b.xhrs[a];
                });
            },
            _createXhr: function(a, b) {
                return c._registerXhr(a, b, qq.createXhrInstance());
            },
            _getAjaxRequester: function(a, b) {
                var d = null == b ? -1 : b;
                return c._getFileState(a).temp.ajaxRequesters[d];
            },
            _getChunkData: function(a, b) {
                var d = f.partSize, e = k(a), g = c.getFile(a), h = d * b, i = h + d >= e ? e : h + d, j = c._getTotalChunks(a), l = this._getFileState(a).temp.cachedChunks, m = l[b] || qq.sliceBlob(g, h, i);
                return l[b] = m, {
                    part: b,
                    start: h,
                    end: i,
                    count: j,
                    blob: m,
                    size: i - h
                };
            },
            _getChunkDataForCallback: function(a) {
                return {
                    partIndex: a.part,
                    startByte: a.start + 1,
                    endByte: a.end,
                    totalParts: a.count
                };
            },
            _getLocalStorageId: function(a) {
                var b = j(a), c = k(a), e = f.partSize, g = m(a);
                return qq.format("qq{}resume{}-{}-{}-{}-{}", d, "5.0", b, c, e, g);
            },
            _getMimeType: function(a) {
                return c.getFile(a).type;
            },
            _getPersistableData: function(a) {
                return c._getFileState(a).chunking;
            },
            _getTotalChunks: function(a) {
                if (f) {
                    var b = k(a), c = f.partSize;
                    return Math.ceil(b / c);
                }
            },
            _getXhr: function(a, b) {
                var d = null == b ? -1 : b;
                return c._getFileState(a).temp.xhrs[d];
            },
            _getXhrs: function(a) {
                return c._getFileState(a).temp.xhrs;
            },
            _iterateResumeRecords: function(a) {
                i && qq.each(localStorage, function(b, c) {
                    0 === b.indexOf(qq.format("qq{}resume", d)) && a(b, JSON.parse(c));
                });
            },
            _initTempState: function(a) {
                c._getFileState(a).temp = {
                    ajaxRequesters: {},
                    chunkProgress: {},
                    xhrs: {},
                    cachedChunks: {}
                };
            },
            _markNotResumable: function(a) {
                c._getFileState(a).notResumable = !0;
            },
            _maybeDeletePersistedChunkData: function(a) {
                var b;
                return !!(i && c.isResumable(a) && (b = c._getLocalStorageId(a)) && localStorage.getItem(b)) && (localStorage.removeItem(b), 
                !0);
            },
            _maybePrepareForResume: function(a) {
                var b, d, e = c._getFileState(a);
                i && void 0 === e.key && (b = c._getLocalStorageId(a), (d = localStorage.getItem(b)) && (d = JSON.parse(d), 
                n(d.uuid) ? c._markNotResumable(a) : (q(qq.format("Identified file with ID {} and name of {} as resumable.", a, j(a))), 
                o(a, d.uuid), e.key = d.key, e.chunking = d.chunking, e.loaded = d.loaded, e.attemptingResume = !0, 
                c.moveInProgressToRemaining(a))));
            },
            _maybePersistChunkedState: function(a) {
                var b, d, e = c._getFileState(a);
                if (i && c.isResumable(a)) {
                    b = c._getLocalStorageId(a), d = {
                        name: j(a),
                        size: k(a),
                        uuid: l(a),
                        key: e.key,
                        chunking: e.chunking,
                        loaded: e.loaded,
                        lastUpdated: Date.now()
                    };
                    try {
                        localStorage.setItem(b, JSON.stringify(d));
                    } catch (b) {
                        q(qq.format("Unable to save resume data for '{}' due to error: '{}'.", a, b.toString()), "warn");
                    }
                }
            },
            _registerProgressHandler: function(a, b, d) {
                var e = c._getXhr(a, b), f = j(a), g = {
                    simple: function(b, c) {
                        var d = k(a);
                        b === c ? p(a, f, d, d) : p(a, f, b >= d ? d - 1 : b, d);
                    },
                    chunked: function(e, g) {
                        var h = c._getFileState(a).temp.chunkProgress, i = c._getFileState(a).loaded, j = e, l = g, m = k(a), n = j - (l - d), o = i;
                        h[b] = n, qq.each(h, function(a, b) {
                            o += b;
                        }), p(a, f, o, m);
                    }
                };
                e.upload.onprogress = function(a) {
                    a.lengthComputable && g[null == d ? "simple" : "chunked"](a.loaded, a.total);
                };
            },
            _registerXhr: function(a, b, d, e) {
                var f = null == b ? -1 : b, g = c._getFileState(a).temp;
                return g.xhrs = g.xhrs || {}, g.ajaxRequesters = g.ajaxRequesters || {}, g.xhrs[f] = d, 
                e && (g.ajaxRequesters[f] = e), d;
            },
            _removeExpiredChunkingRecords: function() {
                var a = g.recordsExpireIn;
                c._iterateResumeRecords(function(b, c) {
                    var d = new Date(c.lastUpdated);
                    d.setDate(d.getDate() + a), d.getTime() <= Date.now() && (q("Removing expired resume record with key " + b), 
                    localStorage.removeItem(b));
                });
            },
            _shouldChunkThisFile: function(a) {
                var b = c._getFileState(a);
                return b.chunking || c.reevaluateChunking(a), b.chunking.enabled;
            }
        });
    }, qq.DeleteFileAjaxRequester = function(a) {
        function b() {
            return "POST" === d.method.toUpperCase() ? {
                _method: "DELETE"
            } : {};
        }
        var c, d = {
            method: "DELETE",
            uuidParamName: "qquuid",
            endpointStore: {},
            maxConnections: 3,
            customHeaders: function(a) {
                return {};
            },
            paramsStore: {},
            cors: {
                expected: !1,
                sendCredentials: !1
            },
            log: function(a, b) {},
            onDelete: function(a) {},
            onDeleteComplete: function(a, b, c) {}
        };
        qq.extend(d, a), c = qq.extend(this, new qq.AjaxRequester({
            acceptHeader: "application/json",
            validMethods: [ "POST", "DELETE" ],
            method: d.method,
            endpointStore: d.endpointStore,
            paramsStore: d.paramsStore,
            mandatedParams: b(),
            maxConnections: d.maxConnections,
            customHeaders: function(a) {
                return d.customHeaders.get(a);
            },
            log: d.log,
            onSend: d.onDelete,
            onComplete: d.onDeleteComplete,
            cors: d.cors
        })), qq.extend(this, {
            sendDelete: function(a, b, e) {
                var f = e || {};
                d.log("Submitting delete file request for " + a), "DELETE" === d.method ? c.initTransport(a).withPath(b).withParams(f).send() : (f[d.uuidParamName] = b, 
                c.initTransport(a).withParams(f).send());
            }
        });
    }, function() {
        function a(a) {
            var b, c = a.naturalWidth, d = a.naturalHeight, e = document.createElement("canvas");
            return c * d > 1048576 && (e.width = e.height = 1, b = e.getContext("2d"), b.drawImage(a, 1 - c, 0), 
            0 === b.getImageData(0, 0, 1, 1).data[3]);
        }
        function b(a, b, c) {
            var d, e, f, g, h = document.createElement("canvas"), i = 0, j = c, k = c;
            for (h.width = 1, h.height = c, d = h.getContext("2d"), d.drawImage(a, 0, 0), e = d.getImageData(0, 0, 1, c).data; k > i; ) f = e[4 * (k - 1) + 3], 
            0 === f ? j = k : i = k, k = j + i >> 1;
            return g = k / c, 0 === g ? 1 : g;
        }
        function c(a, b, c, d) {
            var f = document.createElement("canvas"), g = c.mime || "image/jpeg", h = new qq.Promise();
            return e(a, b, f, c, d).then(function() {
                h.success(f.toDataURL(g, c.quality || .8));
            }), h;
        }
        function d(a) {
            if (!qq.ios()) throw new qq.Error("Downsampled dimensions can only be reliably calculated for iOS!");
            if (a.origHeight * a.origWidth > 5241e3) return {
                newHeight: Math.round(Math.sqrt(a.origHeight / a.origWidth * 5241e3)),
                newWidth: Math.round(Math.sqrt(a.origWidth / a.origHeight * 5241e3))
            };
        }
        function e(c, e, h, i, j) {
            var k, l = c.naturalWidth, m = c.naturalHeight, n = i.width, o = i.height, p = h.getContext("2d"), q = new qq.Promise();
            return p.save(), i.resize ? f({
                blob: e,
                canvas: h,
                image: c,
                imageHeight: m,
                imageWidth: l,
                orientation: i.orientation,
                resize: i.resize,
                targetHeight: o,
                targetWidth: n
            }) : (qq.supportedFeatures.unlimitedScaledImageSize || (k = d({
                origWidth: n,
                origHeight: o
            })) && (qq.log(qq.format("Had to reduce dimensions due to device limitations from {}w / {}h to {}w / {}h", n, o, k.newWidth, k.newHeight), "warn"), 
            n = k.newWidth, o = k.newHeight), g(h, n, o, i.orientation), qq.ios() ? function() {
                a(c) && (l /= 2, m /= 2);
                var d, e, f, g = 1024, h = document.createElement("canvas"), i = j ? b(c, l, m) : 1, k = Math.ceil(g * n / l), q = Math.ceil(g * o / m / i), r = 0, s = 0;
                for (h.width = h.height = g, d = h.getContext("2d"); r < m; ) {
                    for (e = 0, f = 0; e < l; ) d.clearRect(0, 0, g, g), d.drawImage(c, -e, -r), p.drawImage(h, 0, 0, g, g, f, s, k, q), 
                    e += g, f += k;
                    r += g, s += q;
                }
                p.restore(), h = d = null;
            }() : p.drawImage(c, 0, 0, n, o), h.qqImageRendered && h.qqImageRendered(), q.success(), 
            q);
        }
        function f(a) {
            var b = a.blob, c = a.image, d = a.imageHeight, e = a.imageWidth, f = a.orientation, h = new qq.Promise(), i = a.resize, j = document.createElement("canvas"), k = j.getContext("2d"), l = a.canvas, m = a.targetHeight, n = a.targetWidth;
            return g(j, e, d, f), l.height = m, l.width = n, k.drawImage(c, 0, 0), i({
                blob: b,
                height: m,
                image: c,
                sourceCanvas: j,
                targetCanvas: l,
                width: n
            }).then(function() {
                l.qqImageRendered && l.qqImageRendered(), h.success();
            }, h.failure), h;
        }
        function g(a, b, c, d) {
            switch (d) {
              case 5:
              case 6:
              case 7:
              case 8:
                a.width = c, a.height = b;
                break;

              default:
                a.width = b, a.height = c;
            }
            var e = a.getContext("2d");
            switch (d) {
              case 2:
                e.translate(b, 0), e.scale(-1, 1);
                break;

              case 3:
                e.translate(b, c), e.rotate(Math.PI);
                break;

              case 4:
                e.translate(0, c), e.scale(1, -1);
                break;

              case 5:
                e.rotate(.5 * Math.PI), e.scale(1, -1);
                break;

              case 6:
                e.rotate(.5 * Math.PI), e.translate(0, -c);
                break;

              case 7:
                e.rotate(.5 * Math.PI), e.translate(b, -c), e.scale(-1, 1);
                break;

              case 8:
                e.rotate(-.5 * Math.PI), e.translate(-b, 0);
            }
        }
        function h(a, b) {
            var c = this;
            window.Blob && a instanceof Blob && function() {
                var b = new Image(), d = window.URL && window.URL.createObjectURL ? window.URL : window.webkitURL && window.webkitURL.createObjectURL ? window.webkitURL : null;
                if (!d) throw Error("No createObjectURL function found to create blob url");
                b.src = d.createObjectURL(a), c.blob = a, a = b;
            }(), a.naturalWidth || a.naturalHeight || (a.onload = function() {
                var a = c.imageLoadListeners;
                a && (c.imageLoadListeners = null, setTimeout(function() {
                    for (var b = 0, c = a.length; b < c; b++) a[b]();
                }, 0));
            }, a.onerror = b, this.imageLoadListeners = []), this.srcImage = a;
        }
        h.prototype.render = function(a, b) {
            b = b || {};
            var d, f = this, g = this.srcImage.naturalWidth, h = this.srcImage.naturalHeight, i = b.width, j = b.height, k = b.maxWidth, l = b.maxHeight, m = !this.blob || "image/jpeg" === this.blob.type, n = a.tagName.toLowerCase();
            if (this.imageLoadListeners) return void this.imageLoadListeners.push(function() {
                f.render(a, b);
            });
            i && !j ? j = h * i / g << 0 : j && !i ? i = g * j / h << 0 : (i = g, j = h), k && i > k && (i = k, 
            j = h * i / g << 0), l && j > l && (j = l, i = g * j / h << 0), d = {
                width: i,
                height: j
            }, qq.each(b, function(a, b) {
                d[a] = b;
            }), "img" === n ? function() {
                var b = a.src;
                c(f.srcImage, f.blob, d, m).then(function(c) {
                    a.src = c, b === a.src && a.onload();
                });
            }() : "canvas" === n && e(this.srcImage, this.blob, a, d, m), "function" == typeof this.onrender && this.onrender(a);
        }, qq.MegaPixImage = h;
    }(), qq.ImageGenerator = function(a) {
        function b(a) {
            return "img" === a.tagName.toLowerCase();
        }
        function c(a) {
            return "canvas" === a.tagName.toLowerCase();
        }
        function d() {
            return void 0 !== new Image().crossOrigin;
        }
        function e() {
            var a = document.createElement("canvas");
            return a.getContext && a.getContext("2d");
        }
        function f(a) {
            var b = a.split("/"), c = b[b.length - 1].split("?")[0], d = qq.getExtension(c);
            switch (d = d && d.toLowerCase()) {
              case "jpeg":
              case "jpg":
                return "image/jpeg";

              case "png":
                return "image/png";

              case "bmp":
                return "image/bmp";

              case "gif":
                return "image/gif";

              case "tiff":
              case "tif":
                return "image/tiff";
            }
        }
        function g(a) {
            var b, c, d, e = document.createElement("a");
            return e.href = a, b = e.protocol, d = e.port, c = e.hostname, b.toLowerCase() !== window.location.protocol.toLowerCase() || c.toLowerCase() !== window.location.hostname.toLowerCase() || d !== window.location.port && !qq.ie();
        }
        function h(b, c) {
            b.onload = function() {
                b.onload = null, b.onerror = null, c.success(b);
            }, b.onerror = function() {
                b.onload = null, b.onerror = null, a("Problem drawing thumbnail!", "error"), c.failure(b, "Problem drawing thumbnail!");
            };
        }
        function i(a, b) {
            a.qqImageRendered = function() {
                b.success(a);
            };
        }
        function j(d, e) {
            var f = b(d) || c(d);
            return b(d) ? h(d, e) : c(d) ? i(d, e) : (e.failure(d), a(qq.format("Element container of type {} is not supported!", d.tagName), "error")), 
            f;
        }
        function k(b, c, d) {
            var e = new qq.Promise(), f = new qq.Identify(b, a), g = d.maxSize, h = null == d.orient || d.orient, i = function() {
                c.onerror = null, c.onload = null, a("Could not render preview, file may be too large!", "error"), 
                e.failure(c, "Browser cannot render image!");
            };
            return f.isPreviewable().then(function(f) {
                var k = {
                    parse: function() {
                        return new qq.Promise().success();
                    }
                }, l = h ? new qq.Exif(b, a) : k, m = new qq.MegaPixImage(b, i);
                j(c, e) && l.parse().then(function(a) {
                    var b = a && a.Orientation;
                    m.render(c, {
                        maxWidth: g,
                        maxHeight: g,
                        orientation: b,
                        mime: f,
                        resize: d.customResizeFunction
                    });
                }, function(b) {
                    a(qq.format("EXIF data could not be parsed ({}).  Assuming orientation = 1.", b)), 
                    m.render(c, {
                        maxWidth: g,
                        maxHeight: g,
                        mime: f,
                        resize: d.customResizeFunction
                    });
                });
            }, function() {
                a("Not previewable"), e.failure(c, "Not previewable");
            }), e;
        }
        function l(a, b, c, d, e) {
            var h = new Image(), i = new qq.Promise();
            j(h, i), g(a) && (h.crossOrigin = "anonymous"), h.src = a, i.then(function() {
                j(b, c), new qq.MegaPixImage(h).render(b, {
                    maxWidth: d,
                    maxHeight: d,
                    mime: f(a),
                    resize: e
                });
            }, c.failure);
        }
        function m(a, b, c, d) {
            j(b, c), qq(b).css({
                maxWidth: d + "px",
                maxHeight: d + "px"
            }), b.src = a;
        }
        function n(a, f, h) {
            var i = new qq.Promise(), k = h.scale, n = k ? h.maxSize : null;
            return k && b(f) ? e() ? g(a) && !d() ? m(a, f, i, n) : l(a, f, i, n) : m(a, f, i, n) : c(f) ? l(a, f, i, n) : j(f, i) && (f.src = a), 
            i;
        }
        qq.extend(this, {
            generate: function(b, c, d) {
                return qq.isString(b) ? (a("Attempting to update thumbnail based on server response."), 
                n(b, c, d || {})) : (a("Attempting to draw client-side image preview."), k(b, c, d || {}));
            }
        }), this._testing = {}, this._testing.isImg = b, this._testing.isCanvas = c, this._testing.isCrossOrigin = g, 
        this._testing.determineMimeOfFileName = f;
    }, qq.Exif = function(a, b) {
        function c(a) {
            for (var b = 0, c = 0; a.length > 0; ) b += parseInt(a.substring(0, 2), 16) * Math.pow(2, c), 
            a = a.substring(2, a.length), c += 8;
            return b;
        }
        function d(b, c) {
            var e = b, f = c;
            return void 0 === e && (e = 2, f = new qq.Promise()), qq.readBlobToHex(a, e, 4).then(function(a) {
                var b, c = /^ffe([0-9])/.exec(a);
                c ? "1" !== c[1] ? (b = parseInt(a.slice(4, 8), 16), d(e + b + 2, f)) : f.success(e) : f.failure("No EXIF header to be found!");
            }), f;
        }
        function e() {
            var b = new qq.Promise();
            return qq.readBlobToHex(a, 0, 6).then(function(a) {
                0 !== a.indexOf("ffd8") ? b.failure("Not a valid JPEG!") : d().then(function(a) {
                    b.success(a);
                }, function(a) {
                    b.failure(a);
                });
            }), b;
        }
        function f(b) {
            var c = new qq.Promise();
            return qq.readBlobToHex(a, b + 10, 2).then(function(a) {
                c.success("4949" === a);
            }), c;
        }
        function g(b, d) {
            var e = new qq.Promise();
            return qq.readBlobToHex(a, b + 18, 2).then(function(a) {
                if (d) return e.success(c(a));
                e.success(parseInt(a, 16));
            }), e;
        }
        function h(b, c) {
            var d = b + 20, e = 12 * c;
            return qq.readBlobToHex(a, d, e);
        }
        function i(a) {
            for (var b = [], c = 0; c + 24 <= a.length; ) b.push(a.slice(c, c + 24)), c += 24;
            return b;
        }
        function j(a, b) {
            var d = qq.extend([], k), e = {};
            return qq.each(b, function(b, f) {
                var g, h, i, j = f.slice(0, 4), k = a ? c(j) : parseInt(j, 16), m = d.indexOf(k);
                if (m >= 0 && (h = l[k].name, i = l[k].bytes, g = f.slice(16, 16 + 2 * i), e[h] = a ? c(g) : parseInt(g, 16), 
                d.splice(m, 1)), 0 === d.length) return !1;
            }), e;
        }
        var k = [ 274 ], l = {
            274: {
                name: "Orientation",
                bytes: 2
            }
        };
        qq.extend(this, {
            parse: function() {
                var c = new qq.Promise(), d = function(a) {
                    b(qq.format("EXIF header parse failed: '{}' ", a)), c.failure(a);
                };
                return e().then(function(e) {
                    b(qq.format("Moving forward with EXIF header parsing for '{}'", void 0 === a.name ? "blob" : a.name)), 
                    f(e).then(function(a) {
                        b(qq.format("EXIF Byte order is {} endian", a ? "little" : "big")), g(e, a).then(function(f) {
                            b(qq.format("Found {} APP1 directory entries", f)), h(e, f).then(function(d) {
                                var e = i(d), f = j(a, e);
                                b("Successfully parsed some EXIF tags"), c.success(f);
                            }, d);
                        }, d);
                    }, d);
                }, d), c;
            }
        }), this._testing = {}, this._testing.parseLittleEndian = c;
    }, qq.Identify = function(a, b) {
        function c(a, b) {
            var c = !1, d = [].concat(a);
            return qq.each(d, function(a, d) {
                if (0 === b.indexOf(d)) return c = !0, !1;
            }), c;
        }
        qq.extend(this, {
            isPreviewable: function() {
                var d = this, e = new qq.Promise(), f = !1, g = void 0 === a.name ? "blob" : a.name;
                return b(qq.format("Attempting to determine if {} can be rendered in this browser", g)), 
                b("First pass: check type attribute of blob object."), this.isPreviewableSync() ? (b("Second pass: check for magic bytes in file header."), 
                qq.readBlobToHex(a, 0, 4).then(function(a) {
                    qq.each(d.PREVIEWABLE_MIME_TYPES, function(b, d) {
                        if (c(d, a)) return ("image/tiff" !== b || qq.supportedFeatures.tiffPreviews) && (f = !0, 
                        e.success(b)), !1;
                    }), b(qq.format("'{}' is {} able to be rendered in this browser", g, f ? "" : "NOT")), 
                    f || e.failure();
                }, function() {
                    b("Error reading file w/ name '" + g + "'.  Not able to be rendered in this browser."), 
                    e.failure();
                })) : e.failure(), e;
            },
            isPreviewableSync: function() {
                var c = a.type, d = qq.indexOf(Object.keys(this.PREVIEWABLE_MIME_TYPES), c) >= 0, e = !1, f = void 0 === a.name ? "blob" : a.name;
                return d && (e = "image/tiff" !== c || qq.supportedFeatures.tiffPreviews), !e && b(f + " is not previewable in this browser per the blob's type attr"), 
                e;
            }
        });
    }, qq.Identify.prototype.PREVIEWABLE_MIME_TYPES = {
        "image/jpeg": "ffd8ff",
        "image/gif": "474946",
        "image/png": "89504e",
        "image/bmp": "424d",
        "image/tiff": [ "49492a00", "4d4d002a" ]
    }, qq.ImageValidation = function(a, b) {
        function c(a) {
            var b = !1;
            return qq.each(a, function(a, c) {
                if (c > 0) return b = !0, !1;
            }), b;
        }
        function d() {
            var c = new qq.Promise();
            return new qq.Identify(a, b).isPreviewable().then(function() {
                var d = new Image(), e = window.URL && window.URL.createObjectURL ? window.URL : window.webkitURL && window.webkitURL.createObjectURL ? window.webkitURL : null;
                e ? (d.onerror = function() {
                    b("Cannot determine dimensions for image.  May be too large.", "error"), c.failure();
                }, d.onload = function() {
                    c.success({
                        width: this.width,
                        height: this.height
                    });
                }, d.src = e.createObjectURL(a)) : (b("No createObjectURL function available to generate image URL!", "error"), 
                c.failure());
            }, c.failure), c;
        }
        function e(a, b) {
            var c;
            return qq.each(a, function(a, d) {
                if (d > 0) {
                    var e = /(max|min)(Width|Height)/.exec(a), f = e[2].charAt(0).toLowerCase() + e[2].slice(1), g = b[f];
                    switch (e[1]) {
                      case "min":
                        if (g < d) return c = a, !1;
                        break;

                      case "max":
                        if (g > d) return c = a, !1;
                    }
                }
            }), c;
        }
        this.validate = function(a) {
            var f = new qq.Promise();
            return b("Attempting to validate image."), c(a) ? d().then(function(b) {
                var c = e(a, b);
                c ? f.failure(c) : f.success();
            }, f.success) : f.success(), f;
        };
    }, qq.Session = function(a) {
        function b(a) {
            if (qq.isArray(a)) return !0;
            d.log("Session response is not an array.", "error");
        }
        function c(a, c, e, f) {
            var g = !1;
            c = c && b(a), c && qq.each(a, function(a, b) {
                if (null == b.uuid) g = !0, d.log(qq.format("Session response item {} did not include a valid UUID - ignoring.", a), "error"); else if (null == b.name) g = !0, 
                d.log(qq.format("Session response item {} did not include a valid name - ignoring.", a), "error"); else try {
                    return d.addFileRecord(b), !0;
                } catch (a) {
                    g = !0, d.log(a.message, "error");
                }
                return !1;
            }), f[c && !g ? "success" : "failure"](a, e);
        }
        var d = {
            endpoint: null,
            params: {},
            customHeaders: {},
            cors: {},
            addFileRecord: function(a) {},
            log: function(a, b) {}
        };
        qq.extend(d, a, !0), this.refresh = function() {
            var a = new qq.Promise(), b = function(b, d, e) {
                c(b, d, e, a);
            }, e = qq.extend({}, d);
            return new qq.SessionAjaxRequester(qq.extend(e, {
                onComplete: b
            })).queryServer(), a;
        };
    }, qq.SessionAjaxRequester = function(a) {
        function b(a, b, c) {
            var e = null;
            if (null != b.responseText) try {
                e = qq.parseJson(b.responseText);
            } catch (a) {
                d.log("Problem parsing session response: " + a.message, "error"), c = !0;
            }
            d.onComplete(e, !c, b);
        }
        var c, d = {
            endpoint: null,
            customHeaders: {},
            params: {},
            cors: {
                expected: !1,
                sendCredentials: !1
            },
            onComplete: function(a, b, c) {},
            log: function(a, b) {}
        };
        qq.extend(d, a), c = qq.extend(this, new qq.AjaxRequester({
            acceptHeader: "application/json",
            validMethods: [ "GET" ],
            method: "GET",
            endpointStore: {
                get: function() {
                    return d.endpoint;
                }
            },
            customHeaders: d.customHeaders,
            log: d.log,
            onComplete: b,
            cors: d.cors
        })), qq.extend(this, {
            queryServer: function() {
                var a = qq.extend({}, d.params);
                d.log("Session query request."), c.initTransport("sessionRefresh").withParams(a).withCacheBuster().send();
            }
        });
    }, qq.Scaler = function(a, b) {
        var c = a.customResizer, d = a.sendOriginal, e = a.orient, f = a.defaultType, g = a.defaultQuality / 100, h = a.failureText, i = a.includeExif, j = this._getSortedSizes(a.sizes);
        qq.extend(this, {
            enabled: qq.supportedFeatures.scaling && j.length > 0,
            getFileRecords: function(a, k, l) {
                var m = this, n = [], o = l.blob ? l.blob : l;
                return new qq.Identify(o, b).isPreviewableSync() ? (qq.each(j, function(a, d) {
                    var j = m._determineOutputType({
                        defaultType: f,
                        requestedType: d.type,
                        refType: o.type
                    });
                    n.push({
                        uuid: qq.getUniqueId(),
                        name: m._getName(k, {
                            name: d.name,
                            type: j,
                            refType: o.type
                        }),
                        blob: new qq.BlobProxy(o, qq.bind(m._generateScaledImage, m, {
                            customResizeFunction: c,
                            maxSize: d.maxSize,
                            orient: e,
                            type: j,
                            quality: g,
                            failedText: h,
                            includeExif: i,
                            log: b
                        }))
                    });
                }), n.push({
                    uuid: a,
                    name: k,
                    size: o.size,
                    blob: d ? o : null
                })) : n.push({
                    uuid: a,
                    name: k,
                    size: o.size,
                    blob: o
                }), n;
            },
            handleNewFile: function(a, b, c, d, e, f, g, h) {
                var i = this, j = (a.qqButtonId || a.blob && a.blob.qqButtonId, []), k = null, l = h.addFileToHandler, m = h.uploadData, n = h.paramsStore, o = qq.getUniqueId();
                qq.each(i.getFileRecords(c, b, a), function(a, b) {
                    var c, d = b.size;
                    b.blob instanceof qq.BlobProxy && (d = -1), c = m.addFile({
                        uuid: b.uuid,
                        name: b.name,
                        size: d,
                        batchId: f,
                        proxyGroupId: o
                    }), b.blob instanceof qq.BlobProxy ? j.push(c) : k = c, b.blob ? (l(c, b.blob), 
                    e.push({
                        id: c,
                        file: b.blob
                    })) : m.setStatus(c, qq.status.REJECTED);
                }), null !== k && (qq.each(j, function(a, b) {
                    var c = {
                        qqparentuuid: m.retrieve({
                            id: k
                        }).uuid,
                        qqparentsize: m.retrieve({
                            id: k
                        }).size
                    };
                    c[g] = m.retrieve({
                        id: b
                    }).uuid, m.setParentId(b, k), n.addReadOnly(b, c);
                }), j.length && function() {
                    var a = {};
                    a[g] = m.retrieve({
                        id: k
                    }).uuid, n.addReadOnly(k, a);
                }());
            }
        });
    }, qq.extend(qq.Scaler.prototype, {
        scaleImage: function(a, b, c) {
            if (!qq.supportedFeatures.scaling) throw new qq.Error("Scaling is not supported in this browser!");
            var d = new qq.Promise(), e = c.log, f = c.getFile(a), g = c.uploadData.retrieve({
                id: a
            }), h = g && g.name, i = g && g.uuid, j = {
                customResizer: b.customResizer,
                sendOriginal: !1,
                orient: b.orient,
                defaultType: b.type || null,
                defaultQuality: b.quality,
                failedToScaleText: "Unable to scale",
                sizes: [ {
                    name: "",
                    maxSize: b.maxSize
                } ]
            }, k = new qq.Scaler(j, e);
            return qq.Scaler && qq.supportedFeatures.imagePreviews && f ? qq.bind(function() {
                var b = k.getFileRecords(i, h, f)[0];
                b && b.blob instanceof qq.BlobProxy ? b.blob.create().then(d.success, d.failure) : (e(a + " is not a scalable image!", "error"), 
                d.failure());
            }, this)() : (d.failure(), e("Could not generate requested scaled image for " + a + ".  Scaling is either not possible in this browser, or the file could not be located.", "error")), 
            d;
        },
        _determineOutputType: function(a) {
            var b = a.requestedType, c = a.defaultType, d = a.refType;
            return c || b ? b && qq.indexOf(Object.keys(qq.Identify.prototype.PREVIEWABLE_MIME_TYPES), b) >= 0 ? "image/tiff" === b ? qq.supportedFeatures.tiffPreviews ? b : c : b : c : "image/jpeg" !== d ? "image/png" : d;
        },
        _getName: function(a, b) {
            var c = a.lastIndexOf("."), d = b.type || "image/png", e = b.refType, f = "", g = qq.getExtension(a), h = "";
            return b.name && b.name.trim().length && (h = " (" + b.name + ")"), c >= 0 ? (f = a.substr(0, c), 
            e !== d && (g = d.split("/")[1]), f += h + "." + g) : f = a + h, f;
        },
        _getSortedSizes: function(a) {
            return a = qq.extend([], a), a.sort(function(a, b) {
                return a.maxSize > b.maxSize ? 1 : a.maxSize < b.maxSize ? -1 : 0;
            });
        },
        _generateScaledImage: function(a, b) {
            var c = this, d = a.customResizeFunction, e = a.log, f = a.maxSize, g = a.orient, h = a.type, i = a.quality, j = a.failedText, k = a.includeExif && "image/jpeg" === b.type && "image/jpeg" === h, l = new qq.Promise(), m = new qq.ImageGenerator(e), n = document.createElement("canvas");
            return e("Attempting to generate scaled version for " + b.name), m.generate(b, n, {
                maxSize: f,
                orient: g,
                customResizeFunction: d
            }).then(function() {
                var a = n.toDataURL(h, i), d = function() {
                    e("Success generating scaled version for " + b.name);
                    var c = qq.dataUriToBlob(a);
                    l.success(c);
                };
                k ? c._insertExifHeader(b, a, e).then(function(b) {
                    a = b, d();
                }, function() {
                    e("Problem inserting EXIF header into scaled image.  Using scaled image w/out EXIF data.", "error"), 
                    d();
                }) : d();
            }, function() {
                e("Failed attempt to generate scaled version for " + b.name, "error"), l.failure(j);
            }), l;
        },
        _insertExifHeader: function(a, b, c) {
            var d = new FileReader(), e = new qq.Promise(), f = "";
            return d.onload = function() {
                f = d.result, e.success(qq.ExifRestorer.restore(f, b));
            }, d.onerror = function() {
                c("Problem reading " + a.name + " during attempt to transfer EXIF data to scaled version.", "error"), 
                e.failure();
            }, d.readAsDataURL(a), e;
        },
        _dataUriToBlob: function(a) {
            var b, c, d, e;
            return b = a.split(",")[0].indexOf("base64") >= 0 ? atob(a.split(",")[1]) : decodeURI(a.split(",")[1]), 
            c = a.split(",")[0].split(":")[1].split(";")[0], d = new ArrayBuffer(b.length), 
            e = new Uint8Array(d), qq.each(b, function(a, b) {
                e[a] = b.charCodeAt(0);
            }), this._createBlob(d, c);
        },
        _createBlob: function(a, b) {
            var c = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder, d = c && new c();
            return d ? (d.append(a), d.getBlob(b)) : new Blob([ a ], {
                type: b
            });
        }
    }), qq.ExifRestorer = function() {
        var a = {};
        return a.KEY_STR = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", 
        a.encode64 = function(a) {
            var b, c, d, e, f, g = "", h = "", i = "", j = 0;
            do {
                b = a[j++], c = a[j++], h = a[j++], d = b >> 2, e = (3 & b) << 4 | c >> 4, f = (15 & c) << 2 | h >> 6, 
                i = 63 & h, isNaN(c) ? f = i = 64 : isNaN(h) && (i = 64), g = g + this.KEY_STR.charAt(d) + this.KEY_STR.charAt(e) + this.KEY_STR.charAt(f) + this.KEY_STR.charAt(i), 
                b = c = h = "", d = e = f = i = "";
            } while (j < a.length);
            return g;
        }, a.restore = function(a, b) {
            if (!a.match("data:image/jpeg;base64,")) return b;
            var c = this.decode64(a.replace("data:image/jpeg;base64,", "")), d = this.slice2Segments(c), e = this.exifManipulation(b, d);
            return "data:image/jpeg;base64," + this.encode64(e);
        }, a.exifManipulation = function(a, b) {
            var c = this.getExifArray(b), d = this.insertExif(a, c);
            return new Uint8Array(d);
        }, a.getExifArray = function(a) {
            for (var b, c = 0; c < a.length; c++) if (b = a[c], 255 == b[0] & 225 == b[1]) return b;
            return [];
        }, a.insertExif = function(a, b) {
            var c = a.replace("data:image/jpeg;base64,", ""), d = this.decode64(c), e = d.indexOf(255, 3), f = d.slice(0, e), g = d.slice(e), h = f;
            return h = h.concat(b), h = h.concat(g);
        }, a.slice2Segments = function(a) {
            for (var b = 0, c = []; !(255 == a[b] & 218 == a[b + 1]); ) {
                if (255 == a[b] & 216 == a[b + 1]) b += 2; else {
                    var d = 256 * a[b + 2] + a[b + 3], e = b + d + 2, f = a.slice(b, e);
                    c.push(f), b = e;
                }
                if (b > a.length) break;
            }
            return c;
        }, a.decode64 = function(a) {
            var b, c, d, e, f, g = "", h = "", i = 0, j = [];
            if (/[^A-Za-z0-9\+\/\=]/g.exec(a)) throw new Error("There were invalid base64 characters in the input text.  Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='");
            a = a.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            do {
                d = this.KEY_STR.indexOf(a.charAt(i++)), e = this.KEY_STR.indexOf(a.charAt(i++)), 
                f = this.KEY_STR.indexOf(a.charAt(i++)), h = this.KEY_STR.indexOf(a.charAt(i++)), 
                b = d << 2 | e >> 4, c = (15 & e) << 4 | f >> 2, g = (3 & f) << 6 | h, j.push(b), 
                64 != f && j.push(c), 64 != h && j.push(g), b = c = g = "", d = e = f = h = "";
            } while (i < a.length);
            return j;
        }, a;
    }(), qq.TotalProgress = function(a, b) {
        var c = {}, d = 0, e = 0, f = -1, g = -1, h = function(b, c) {
            b === f && c === g || a(b, c), f = b, g = c;
        }, i = function(a, b) {
            var c = !0;
            return qq.each(a, function(a, d) {
                if (qq.indexOf(b, d) >= 0) return c = !1, !1;
            }), c;
        }, j = function(a) {
            m(a, -1, -1), delete c[a];
        }, k = function(a, b, c) {
            (0 === b.length || i(b, c)) && (h(e, e), this.reset());
        }, l = function(a) {
            var d = b(a);
            d > 0 && (m(a, 0, d), c[a] = {
                loaded: 0,
                total: d
            });
        }, m = function(a, b, f) {
            var g = c[a] ? c[a].loaded : 0, i = c[a] ? c[a].total : 0;
            -1 === b && -1 === f ? (d -= g, e -= i) : (b && (d += b - g), f && (e += f - i)), 
            h(d, e);
        };
        qq.extend(this, {
            onAllComplete: k,
            onStatusChange: function(a, b, c) {
                c === qq.status.CANCELED || c === qq.status.REJECTED ? j(a) : c === qq.status.SUBMITTING && l(a);
            },
            onIndividualProgress: function(a, b, d) {
                m(a, b, d), c[a] = {
                    loaded: b,
                    total: d
                };
            },
            onNewSize: function(a) {
                l(a);
            },
            reset: function() {
                c = {}, d = 0, e = 0;
            }
        });
    }, qq.PasteSupport = function(a) {
        function b(a) {
            return a.type && 0 === a.type.indexOf("image/");
        }
        function c() {
            f = qq(e.targetElement).attach("paste", function(a) {
                var c = a.clipboardData;
                c && qq.each(c.items, function(a, c) {
                    if (b(c)) {
                        var d = c.getAsFile();
                        e.callbacks.pasteReceived(d);
                    }
                });
            });
        }
        function d() {
            f && f();
        }
        var e, f;
        e = {
            targetElement: null,
            callbacks: {
                log: function(a, b) {},
                pasteReceived: function(a) {}
            }
        }, qq.extend(e, a), c(), qq.extend(this, {
            reset: function() {
                d();
            }
        });
    }, qq.FormSupport = function(a, b, c) {
        function d(a) {
            a.getAttribute("action") && (h.newEndpoint = a.getAttribute("action"));
        }
        function e(a, b) {
            if (!a.checkValidity || a.checkValidity()) return !0;
            c("Form did not pass validation checks - will not upload.", "error"), b();
        }
        function f(a) {
            var c = a.submit;
            qq(a).attach("submit", function(d) {
                d = d || window.event, d.preventDefault ? d.preventDefault() : d.returnValue = !1, 
                e(a, c) && b();
            }), a.submit = function() {
                e(a, c) && b();
            };
        }
        function g(a) {
            return a && (qq.isString(a) && (a = document.getElementById(a)), a && (c("Attaching to form element."), 
            d(a), i && f(a))), a;
        }
        var h = this, i = a.interceptSubmit, j = a.element, k = a.autoUpload;
        qq.extend(this, {
            newEndpoint: null,
            newAutoUpload: k,
            attachedToForm: !1,
            getFormInputsAsObject: function() {
                return null == j ? null : h._form2Obj(j);
            }
        }), j = g(j), this.attachedToForm = !!j;
    }, qq.extend(qq.FormSupport.prototype, {
        _form2Obj: function(a) {
            var b = {}, c = function(a) {
                var b = [ "button", "image", "reset", "submit" ];
                return qq.indexOf(b, a.toLowerCase()) < 0;
            }, d = function(a) {
                return qq.indexOf([ "checkbox", "radio" ], a.toLowerCase()) >= 0;
            }, e = function(a) {
                return !(!d(a.type) || a.checked) || a.disabled && "hidden" !== a.type.toLowerCase();
            }, f = function(a) {
                var b = null;
                return qq.each(qq(a).children(), function(a, c) {
                    if ("option" === c.tagName.toLowerCase() && c.selected) return b = c.value, !1;
                }), b;
            };
            return qq.each(a.elements, function(a, d) {
                if (!qq.isInput(d, !0) && "textarea" !== d.tagName.toLowerCase() || !c(d.type) || e(d)) {
                    if ("select" === d.tagName.toLowerCase() && !e(d)) {
                        var g = f(d);
                        null !== g && (b[d.name] = g);
                    }
                } else b[d.name] = d.value;
            }), b;
        }
    }), qq.traditional = qq.traditional || {}, qq.traditional.FormUploadHandler = function(a, b) {
        function c(a, b) {
            var c, d, f;
            try {
                d = b.contentDocument || b.contentWindow.document, f = d.body.innerHTML, h("converting iframe's innerHTML to JSON"), 
                h("innerHTML = " + f), f && f.match(/^<pre/i) && (f = d.body.firstChild.firstChild.nodeValue), 
                c = e._parseJsonResponse(f);
            } catch (a) {
                h("Error when attempting to parse form upload response (" + a.message + ")", "error"), 
                c = {
                    success: !1
                };
            }
            return c;
        }
        function d(b, c) {
            var d = a.paramsStore.get(b), h = "get" === a.method.toLowerCase() ? "GET" : "POST", i = a.endpointStore.get(b), j = f(b);
            return d[a.uuidName] = g(b), d[a.filenameParam] = j, e._initFormForUpload({
                method: h,
                endpoint: i,
                params: d,
                paramsInBody: a.paramsInBody,
                targetName: c.name
            });
        }
        var e = this, f = b.getName, g = b.getUuid, h = b.log;
        this.uploadFile = function(b) {
            var f, g = e.getInput(b), i = e._createIframe(b), j = new qq.Promise();
            return f = d(b, i), f.appendChild(g), e._attachLoadEvent(i, function(d) {
                h("iframe loaded");
                var f = d || c(b, i);
                e._detachLoadEvent(b), a.cors.expected || qq(i).remove(), f.success ? j.success(f) : j.failure(f);
            }), h("Sending upload request for " + b), f.submit(), qq(f).remove(), j;
        }, qq.extend(this, new qq.FormUploadHandler({
            options: {
                isCors: a.cors.expected,
                inputName: a.inputName
            },
            proxy: {
                onCancel: a.onCancel,
                getName: f,
                getUuid: g,
                log: h
            }
        }));
    }, qq.traditional = qq.traditional || {}, qq.traditional.XhrUploadHandler = function(a, b) {
        var c = this, d = b.getName, e = b.getSize, f = b.getUuid, g = b.log, h = a.forceMultipart || a.paramsInBody, i = function(b, c, f) {
            var g = e(b), i = d(b);
            c[a.chunking.paramNames.partIndex] = f.part, c[a.chunking.paramNames.partByteOffset] = f.start, 
            c[a.chunking.paramNames.chunkSize] = f.size, c[a.chunking.paramNames.totalParts] = f.count, 
            c[a.totalFileSizeName] = g, h && (c[a.filenameParam] = i);
        }, j = new qq.traditional.AllChunksDoneAjaxRequester({
            cors: a.cors,
            endpoint: a.chunking.success.endpoint,
            log: g
        }), k = function(a, b) {
            var c = new qq.Promise();
            return b.onreadystatechange = function() {
                if (4 === b.readyState) {
                    var d = n(a, b);
                    d.success ? c.success(d.response, b) : c.failure(d.response, b);
                }
            }, c;
        }, l = function(b) {
            var g = a.paramsStore.get(b), h = d(b), i = e(b);
            return g[a.uuidName] = f(b), g[a.filenameParam] = h, g[a.totalFileSizeName] = i, 
            g[a.chunking.paramNames.totalParts] = c._getTotalChunks(b), g;
        }, m = function(a, b) {
            return qq.indexOf([ 200, 201, 202, 203, 204 ], a.status) < 0 || !b.success || b.reset;
        }, n = function(a, b) {
            var c;
            return g("xhr - server response received for " + a), g("responseText = " + b.responseText), 
            c = o(!0, b), {
                success: !m(b, c),
                response: c
            };
        }, o = function(a, b) {
            var c = {};
            try {
                g(qq.format("Received response status {} with body: {}", b.status, b.responseText)), 
                c = qq.parseJson(b.responseText);
            } catch (b) {
                a && g("Error when attempting to parse xhr response text (" + b.message + ")", "error");
            }
            return c;
        }, p = function(b) {
            var d = new qq.Promise();
            return j.complete(b, c._createXhr(b), l(b), a.customHeaders.get(b)).then(function(a) {
                d.success(o(!1, a), a);
            }, function(a) {
                d.failure(o(!1, a), a);
            }), d;
        }, q = function(b, c, g, i) {
            var j = new FormData(), k = a.method, l = a.endpointStore.get(i), m = d(i), n = e(i);
            return b[a.uuidName] = f(i), b[a.filenameParam] = m, h && (b[a.totalFileSizeName] = n), 
            a.paramsInBody || (h || (b[a.inputName] = m), l = qq.obj2url(b, l)), c.open(k, l, !0), 
            a.cors.expected && a.cors.sendCredentials && (c.withCredentials = !0), h ? (a.paramsInBody && qq.obj2FormData(b, j), 
            j.append(a.inputName, g), j) : g;
        }, r = function(b, d) {
            var e = a.customHeaders.get(b), f = c.getFile(b);
            d.setRequestHeader("Accept", "application/json"), d.setRequestHeader("X-Requested-With", "XMLHttpRequest"), 
            d.setRequestHeader("Cache-Control", "no-cache"), h || (d.setRequestHeader("Content-Type", "application/octet-stream"), 
            d.setRequestHeader("X-Mime-Type", f.type)), qq.each(e, function(a, b) {
                d.setRequestHeader(a, b);
            });
        };
        qq.extend(this, {
            uploadChunk: function(b, d, f) {
                var g, h, j, l = c._getChunkData(b, d), m = c._createXhr(b, d);
                return e(b), g = k(b, m), c._registerProgressHandler(b, d, l.size), j = a.paramsStore.get(b), 
                i(b, j, l), f && (j[a.resume.paramNames.resuming] = !0), h = q(j, m, l.blob, b), 
                r(b, m), m.send(h), g;
            },
            uploadFile: function(b) {
                var d, e, f, g, h = c.getFile(b);
                return e = c._createXhr(b), c._registerProgressHandler(b), d = k(b, e), f = a.paramsStore.get(b), 
                g = q(f, e, h, b), r(b, e), e.send(g), d;
            }
        }), qq.extend(this, new qq.XhrUploadHandler({
            options: qq.extend({
                namespace: "traditional"
            }, a),
            proxy: qq.extend({
                getEndpoint: a.endpointStore.get
            }, b)
        })), qq.override(this, function(b) {
            return {
                finalizeChunks: function(c) {
                    return a.chunking.success.endpoint ? p(c) : b.finalizeChunks(c, qq.bind(o, this, !0));
                }
            };
        });
    }, qq.traditional.AllChunksDoneAjaxRequester = function(a) {
        var b, c = {
            cors: {
                allowXdr: !1,
                expected: !1,
                sendCredentials: !1
            },
            endpoint: null,
            log: function(a, b) {}
        }, d = {}, e = {
            get: function(a) {
                return c.endpoint;
            }
        };
        qq.extend(c, a), b = qq.extend(this, new qq.AjaxRequester({
            acceptHeader: "application/json",
            validMethods: [ "POST" ],
            method: "POST",
            endpointStore: e,
            allowXRequestedWithAndCacheControl: !1,
            cors: c.cors,
            log: c.log,
            onComplete: function(a, b, c) {
                var e = d[a];
                delete d[a], c ? e.failure(b) : e.success(b);
            }
        })), qq.extend(this, {
            complete: function(a, e, f, g) {
                var h = new qq.Promise();
                return c.log("Submitting All Chunks Done request for " + a), d[a] = h, b.initTransport(a).withParams(f).withHeaders(g).send(e), 
                h;
            }
        });
    }, qq.DragAndDrop = function(a) {
        function b(a, b) {
            var c = Array.prototype.slice.call(a);
            j.callbacks.dropLog("Grabbed " + a.length + " dropped files."), b.dropDisabled(!1), 
            j.callbacks.processingDroppedFilesComplete(c, b.getElement());
        }
        function c(a) {
            var b = new qq.Promise();
            return a.isFile ? a.file(function(c) {
                var d = a.name, e = a.fullPath, f = e.indexOf(d);
                e = e.substr(0, f), "/" === e.charAt(0) && (e = e.substr(1)), c.qqPath = e, l.push(c), 
                b.success();
            }, function(c) {
                j.callbacks.dropLog("Problem parsing '" + a.fullPath + "'.  FileError code " + c.code + ".", "error"), 
                b.failure();
            }) : a.isDirectory && d(a).then(function(a) {
                var d = a.length;
                qq.each(a, function(a, e) {
                    c(e).done(function() {
                        0 === (d -= 1) && b.success();
                    });
                }), a.length || b.success();
            }, function(c) {
                j.callbacks.dropLog("Problem parsing '" + a.fullPath + "'.  FileError code " + c.code + ".", "error"), 
                b.failure();
            }), b;
        }
        function d(a, b, c, e) {
            var f = e || new qq.Promise(), g = b || a.createReader();
            return g.readEntries(function(b) {
                var e = c ? c.concat(b) : b;
                b.length ? setTimeout(function() {
                    d(a, g, e, f);
                }, 0) : f.success(e);
            }, f.failure), f;
        }
        function e(a, b) {
            var d = [], e = new qq.Promise();
            return j.callbacks.processingDroppedFiles(), b.dropDisabled(!0), a.files.length > 1 && !j.allowMultipleItems ? (j.callbacks.processingDroppedFilesComplete([]), 
            j.callbacks.dropError("tooManyFilesError", ""), b.dropDisabled(!1), e.failure()) : (l = [], 
            qq.isFolderDropSupported(a) ? qq.each(a.items, function(a, b) {
                var f = b.webkitGetAsEntry();
                f && (f.isFile ? l.push(b.getAsFile()) : d.push(c(f).done(function() {
                    d.pop(), 0 === d.length && e.success();
                })));
            }) : l = a.files, 0 === d.length && e.success()), e;
        }
        function f(a) {
            var c = new qq.UploadDropZone({
                HIDE_ZONES_EVENT_NAME: "qq-hidezones",
                element: a,
                onEnter: function(b) {
                    qq(a).addClass(j.classes.dropActive), b.stopPropagation();
                },
                onLeaveNotDescendants: function(b) {
                    qq(a).removeClass(j.classes.dropActive);
                },
                onDrop: function(a) {
                    e(a.dataTransfer, c).then(function() {
                        b(l, c);
                    }, function() {
                        j.callbacks.dropLog("Drop event DataTransfer parsing failed.  No files will be uploaded.", "error");
                    });
                }
            });
            return m.addDisposer(function() {
                c.dispose();
            }), qq(a).hasAttribute("qq-hide-dropzone") && qq(a).hide(), k.push(c), c;
        }
        function g(a) {
            var b;
            return qq.each(a.dataTransfer.types, function(a, c) {
                if ("Files" === c) return b = !0, !1;
            }), b;
        }
        function h(a) {
            return qq.firefox() ? !a.relatedTarget : qq.safari() ? a.x < 0 || a.y < 0 : 0 === a.x && 0 === a.y;
        }
        function i() {
            var a = j.dropZoneElements, b = function() {
                setTimeout(function() {
                    qq.each(a, function(a, b) {
                        qq(b).hasAttribute("qq-hide-dropzone") && qq(b).hide(), qq(b).removeClass(j.classes.dropActive);
                    });
                }, 10);
            };
            qq.each(a, function(b, c) {
                var d = f(c);
                a.length && qq.supportedFeatures.fileDrop && m.attach(document, "dragenter", function(b) {
                    !d.dropDisabled() && g(b) && qq.each(a, function(a, b) {
                        b instanceof HTMLElement && qq(b).hasAttribute("qq-hide-dropzone") && qq(b).css({
                            display: "block"
                        });
                    });
                });
            }), m.attach(document, "dragleave", function(a) {
                h(a) && b();
            }), m.attach(qq(document).children()[0], "mouseenter", function(a) {
                b();
            }), m.attach(document, "drop", function(a) {
                a.preventDefault(), b();
            }), m.attach(document, "qq-hidezones", b);
        }
        var j, k = [], l = [], m = new qq.DisposeSupport();
        j = {
            dropZoneElements: [],
            allowMultipleItems: !0,
            classes: {
                dropActive: null
            },
            callbacks: new qq.DragAndDrop.callbacks()
        }, qq.extend(j, a, !0), i(), qq.extend(this, {
            setupExtraDropzone: function(a) {
                j.dropZoneElements.push(a), f(a);
            },
            removeDropzone: function(a) {
                var b, c = j.dropZoneElements;
                for (b in c) if (c[b] === a) return c.splice(b, 1);
            },
            dispose: function() {
                m.dispose(), qq.each(k, function(a, b) {
                    b.dispose();
                });
            }
        });
    }, qq.DragAndDrop.callbacks = function() {
        return {
            processingDroppedFiles: function() {},
            processingDroppedFilesComplete: function(a, b) {},
            dropError: function(a, b) {
                qq.log("Drag & drop error code '" + a + " with these specifics: '" + b + "'", "error");
            },
            dropLog: function(a, b) {
                qq.log(a, b);
            }
        };
    }, qq.UploadDropZone = function(a) {
        function b() {
            return qq.safari() || qq.firefox() && qq.windows();
        }
        function c(a) {
            k || (b ? l.attach(document, "dragover", function(a) {
                a.preventDefault();
            }) : l.attach(document, "dragover", function(a) {
                a.dataTransfer && (a.dataTransfer.dropEffect = "none", a.preventDefault());
            }), k = !0);
        }
        function d(a) {
            if (!qq.supportedFeatures.fileDrop) return !1;
            var b, c = a.dataTransfer, d = qq.safari();
            return b = !(!qq.ie() || !qq.supportedFeatures.fileDrop) || "none" !== c.effectAllowed, 
            c && b && (c.files || !d && c.types.contains && c.types.contains("Files"));
        }
        function e(a) {
            return void 0 !== a && (j = a), j;
        }
        function f() {
            function a() {
                b = document.createEvent("Event"), b.initEvent(h.HIDE_ZONES_EVENT_NAME, !0, !0);
            }
            var b;
            if (window.CustomEvent) try {
                b = new CustomEvent(h.HIDE_ZONES_EVENT_NAME);
            } catch (b) {
                a();
            } else a();
            document.dispatchEvent(b);
        }
        function g() {
            l.attach(i, "dragover", function(a) {
                if (d(a)) {
                    var b = qq.ie() && qq.supportedFeatures.fileDrop ? null : a.dataTransfer.effectAllowed;
                    a.dataTransfer.dropEffect = "move" === b || "linkMove" === b ? "move" : "copy", 
                    a.stopPropagation(), a.preventDefault();
                }
            }), l.attach(i, "dragenter", function(a) {
                if (!e()) {
                    if (!d(a)) return;
                    h.onEnter(a);
                }
            }), l.attach(i, "dragleave", function(a) {
                if (d(a)) {
                    h.onLeave(a);
                    var b = document.elementFromPoint(a.clientX, a.clientY);
                    qq(this).contains(b) || h.onLeaveNotDescendants(a);
                }
            }), l.attach(i, "drop", function(a) {
                if (!e()) {
                    if (!d(a)) return;
                    a.preventDefault(), a.stopPropagation(), h.onDrop(a), f();
                }
            });
        }
        var h, i, j, k, l = new qq.DisposeSupport();
        h = {
            element: null,
            onEnter: function(a) {},
            onLeave: function(a) {},
            onLeaveNotDescendants: function(a) {},
            onDrop: function(a) {}
        }, qq.extend(h, a), i = h.element, c(), g(), qq.extend(this, {
            dropDisabled: function(a) {
                return e(a);
            },
            dispose: function() {
                l.dispose();
            },
            getElement: function() {
                return i;
            }
        });
    }, function() {
        qq.uiPublicApi = {
            addInitialFiles: function(a) {
                this._parent.prototype.addInitialFiles.apply(this, arguments), this._templating.addCacheToDom();
            },
            clearStoredFiles: function() {
                this._parent.prototype.clearStoredFiles.apply(this, arguments), this._templating.clearFiles();
            },
            addExtraDropzone: function(a) {
                this._dnd && this._dnd.setupExtraDropzone(a);
            },
            removeExtraDropzone: function(a) {
                if (this._dnd) return this._dnd.removeDropzone(a);
            },
            getItemByFileId: function(a) {
                if (!this._templating.isHiddenForever(a)) return this._templating.getFileContainer(a);
            },
            reset: function() {
                this._parent.prototype.reset.apply(this, arguments), this._templating.reset(), !this._options.button && this._templating.getButton() && (this._defaultButtonId = this._createUploadButton({
                    element: this._templating.getButton(),
                    title: this._options.text.fileInputTitle
                }).getButtonId()), this._dnd && (this._dnd.dispose(), this._dnd = this._setupDragAndDrop()), 
                this._totalFilesInBatch = 0, this._filesInBatchAddedToUi = 0, this._setupClickAndEditEventHandlers();
            },
            setName: function(a, b) {
                var c = this._options.formatFileName(b);
                this._parent.prototype.setName.apply(this, arguments), this._templating.updateFilename(a, c);
            },
            pauseUpload: function(a) {
                var b = this._parent.prototype.pauseUpload.apply(this, arguments);
                return b && this._templating.uploadPaused(a), b;
            },
            continueUpload: function(a) {
                var b = this._parent.prototype.continueUpload.apply(this, arguments);
                return b && this._templating.uploadContinued(a), b;
            },
            getId: function(a) {
                return this._templating.getFileId(a);
            },
            getDropTarget: function(a) {
                return this.getFile(a).qqDropTarget;
            }
        }, qq.uiPrivateApi = {
            _getButton: function(a) {
                var b = this._parent.prototype._getButton.apply(this, arguments);
                return b || a === this._defaultButtonId && (b = this._templating.getButton()), b;
            },
            _removeFileItem: function(a) {
                this._templating.removeFile(a);
            },
            _setupClickAndEditEventHandlers: function() {
                this._fileButtonsClickHandler = qq.FileButtonsClickHandler && this._bindFileButtonsClickEvent(), 
                this._focusinEventSupported = !qq.firefox(), this._isEditFilenameEnabled() && (this._filenameClickHandler = this._bindFilenameClickEvent(), 
                this._filenameInputFocusInHandler = this._bindFilenameInputFocusInEvent(), this._filenameInputFocusHandler = this._bindFilenameInputFocusEvent());
            },
            _setupDragAndDrop: function() {
                var a = this, b = this._options.dragAndDrop.extraDropzones, c = this._templating, d = c.getDropZone();
                return d && b.push(d), new qq.DragAndDrop({
                    dropZoneElements: b,
                    allowMultipleItems: this._options.multiple,
                    classes: {
                        dropActive: this._options.classes.dropActive
                    },
                    callbacks: {
                        processingDroppedFiles: function() {
                            c.showDropProcessing();
                        },
                        processingDroppedFilesComplete: function(b, d) {
                            c.hideDropProcessing(), qq.each(b, function(a, b) {
                                b.qqDropTarget = d;
                            }), b.length && a.addFiles(b, null, null);
                        },
                        dropError: function(b, c) {
                            a._itemError(b, c);
                        },
                        dropLog: function(b, c) {
                            a.log(b, c);
                        }
                    }
                });
            },
            _bindFileButtonsClickEvent: function() {
                var a = this;
                return new qq.FileButtonsClickHandler({
                    templating: this._templating,
                    log: function(b, c) {
                        a.log(b, c);
                    },
                    onDeleteFile: function(b) {
                        a.deleteFile(b);
                    },
                    onCancel: function(b) {
                        a.cancel(b);
                    },
                    onRetry: function(b) {
                        a.retry(b);
                    },
                    onPause: function(b) {
                        a.pauseUpload(b);
                    },
                    onContinue: function(b) {
                        a.continueUpload(b);
                    },
                    onGetName: function(b) {
                        return a.getName(b);
                    }
                });
            },
            _isEditFilenameEnabled: function() {
                return this._templating.isEditFilenamePossible() && !this._options.autoUpload && qq.FilenameClickHandler && qq.FilenameInputFocusHandler && qq.FilenameInputFocusHandler;
            },
            _filenameEditHandler: function() {
                var a = this, b = this._templating;
                return {
                    templating: b,
                    log: function(b, c) {
                        a.log(b, c);
                    },
                    onGetUploadStatus: function(b) {
                        return a.getUploads({
                            id: b
                        }).status;
                    },
                    onGetName: function(b) {
                        return a.getName(b);
                    },
                    onSetName: function(b, c) {
                        a.setName(b, c);
                    },
                    onEditingStatusChange: function(a, c) {
                        var d = qq(b.getEditInput(a)), e = qq(b.getFileContainer(a));
                        c ? (d.addClass("qq-editing"), b.hideFilename(a), b.hideEditIcon(a)) : (d.removeClass("qq-editing"), 
                        b.showFilename(a), b.showEditIcon(a)), e.addClass("qq-temp").removeClass("qq-temp");
                    }
                };
            },
            _onUploadStatusChange: function(a, b, c) {
                this._parent.prototype._onUploadStatusChange.apply(this, arguments), this._isEditFilenameEnabled() && this._templating.getFileContainer(a) && c !== qq.status.SUBMITTED && (this._templating.markFilenameEditable(a), 
                this._templating.hideEditIcon(a)), b === qq.status.UPLOAD_RETRYING && c === qq.status.UPLOADING ? (this._templating.hideRetry(a), 
                this._templating.setStatusText(a), qq(this._templating.getFileContainer(a)).removeClass(this._classes.retrying)) : c === qq.status.UPLOAD_FAILED && this._templating.hidePause(a);
            },
            _bindFilenameInputFocusInEvent: function() {
                var a = qq.extend({}, this._filenameEditHandler());
                return new qq.FilenameInputFocusInHandler(a);
            },
            _bindFilenameInputFocusEvent: function() {
                var a = qq.extend({}, this._filenameEditHandler());
                return new qq.FilenameInputFocusHandler(a);
            },
            _bindFilenameClickEvent: function() {
                var a = qq.extend({}, this._filenameEditHandler());
                return new qq.FilenameClickHandler(a);
            },
            _storeForLater: function(a) {
                this._parent.prototype._storeForLater.apply(this, arguments), this._templating.hideSpinner(a);
            },
            _onAllComplete: function(a, b) {
                this._parent.prototype._onAllComplete.apply(this, arguments), this._templating.resetTotalProgress();
            },
            _onSubmit: function(a, b) {
                var c = this.getFile(a);
                c && c.qqPath && this._options.dragAndDrop.reportDirectoryPaths && this._paramsStore.addReadOnly(a, {
                    qqpath: c.qqPath
                }), this._parent.prototype._onSubmit.apply(this, arguments), this._addToList(a, b);
            },
            _onSubmitted: function(a) {
                this._isEditFilenameEnabled() && (this._templating.markFilenameEditable(a), this._templating.showEditIcon(a), 
                this._focusinEventSupported || this._filenameInputFocusHandler.addHandler(this._templating.getEditInput(a)));
            },
            _onProgress: function(a, b, c, d) {
                this._parent.prototype._onProgress.apply(this, arguments), this._templating.updateProgress(a, c, d), 
                0 === d || 100 === Math.round(c / d * 100) ? (this._templating.hideCancel(a), this._templating.hidePause(a), 
                this._templating.hideProgress(a), this._templating.setStatusText(a, this._options.text.waitingForResponse), 
                this._displayFileSize(a)) : this._displayFileSize(a, c, d);
            },
            _onTotalProgress: function(a, b) {
                this._parent.prototype._onTotalProgress.apply(this, arguments), this._templating.updateTotalProgress(a, b);
            },
            _onComplete: function(a, b, c, d) {
                function e(b) {
                    h && (g.setStatusText(a), qq(h).removeClass(i._classes.retrying), g.hideProgress(a), 
                    i.getUploads({
                        id: a
                    }).status !== qq.status.UPLOAD_FAILED && g.hideCancel(a), g.hideSpinner(a), b.success ? i._markFileAsSuccessful(a) : (qq(h).addClass(i._classes.fail), 
                    g.showCancel(a), g.isRetryPossible() && !i._preventRetries[a] && (qq(h).addClass(i._classes.retryable), 
                    g.showRetry(a)), i._controlFailureTextDisplay(a, b)));
                }
                var f = this._parent.prototype._onComplete.apply(this, arguments), g = this._templating, h = g.getFileContainer(a), i = this;
                return f instanceof qq.Promise ? f.done(function(a) {
                    e(a);
                }) : e(c), f;
            },
            _markFileAsSuccessful: function(a) {
                var b = this._templating;
                this._isDeletePossible() && b.showDeleteButton(a), qq(b.getFileContainer(a)).addClass(this._classes.success), 
                this._maybeUpdateThumbnail(a);
            },
            _onUploadPrep: function(a) {
                this._parent.prototype._onUploadPrep.apply(this, arguments), this._templating.showSpinner(a);
            },
            _onUpload: function(a, b) {
                var c = this._parent.prototype._onUpload.apply(this, arguments);
                return this._templating.showSpinner(a), c;
            },
            _onUploadChunk: function(a, b) {
                this._parent.prototype._onUploadChunk.apply(this, arguments), b.partIndex > 0 && this._handler.isResumable(a) && this._templating.allowPause(a);
            },
            _onCancel: function(a, b) {
                this._parent.prototype._onCancel.apply(this, arguments), this._removeFileItem(a), 
                0 === this._getNotFinished() && this._templating.resetTotalProgress();
            },
            _onBeforeAutoRetry: function(a) {
                var b, c, d;
                this._parent.prototype._onBeforeAutoRetry.apply(this, arguments), this._showCancelLink(a), 
                this._options.retry.showAutoRetryNote && (b = this._autoRetries[a], c = this._options.retry.maxAutoAttempts, 
                d = this._options.retry.autoRetryNote.replace(/\{retryNum\}/g, b), d = d.replace(/\{maxAuto\}/g, c), 
                this._templating.setStatusText(a, d), qq(this._templating.getFileContainer(a)).addClass(this._classes.retrying));
            },
            _onBeforeManualRetry: function(a) {
                return this._parent.prototype._onBeforeManualRetry.apply(this, arguments) ? (this._templating.resetProgress(a), 
                qq(this._templating.getFileContainer(a)).removeClass(this._classes.fail), this._templating.setStatusText(a), 
                this._templating.showSpinner(a), this._showCancelLink(a), !0) : (qq(this._templating.getFileContainer(a)).addClass(this._classes.retryable), 
                this._templating.showRetry(a), !1);
            },
            _onSubmitDelete: function(a) {
                var b = qq.bind(this._onSubmitDeleteSuccess, this);
                this._parent.prototype._onSubmitDelete.call(this, a, b);
            },
            _onSubmitDeleteSuccess: function(a, b, c) {
                this._options.deleteFile.forceConfirm ? this._showDeleteConfirm.apply(this, arguments) : this._sendDeleteRequest.apply(this, arguments);
            },
            _onDeleteComplete: function(a, b, c) {
                this._parent.prototype._onDeleteComplete.apply(this, arguments), this._templating.hideSpinner(a), 
                c ? (this._templating.setStatusText(a, this._options.deleteFile.deletingFailedText), 
                this._templating.showDeleteButton(a)) : this._removeFileItem(a);
            },
            _sendDeleteRequest: function(a, b, c) {
                this._templating.hideDeleteButton(a), this._templating.showSpinner(a), this._templating.setStatusText(a, this._options.deleteFile.deletingStatusText), 
                this._deleteHandler.sendDelete.apply(this, arguments);
            },
            _showDeleteConfirm: function(a, b, c) {
                var d, e = this.getName(a), f = this._options.deleteFile.confirmMessage.replace(/\{filename\}/g, e), g = (this.getUuid(a), 
                arguments), h = this;
                d = this._options.showConfirm(f), qq.isGenericPromise(d) ? d.then(function() {
                    h._sendDeleteRequest.apply(h, g);
                }) : !1 !== d && h._sendDeleteRequest.apply(h, g);
            },
            _addToList: function(a, b, c) {
                var d, e, f = 0, g = this._handler.isProxied(a) && this._options.scaling.hideScaled;
                this._options.display.prependFiles && (this._totalFilesInBatch > 1 && this._filesInBatchAddedToUi > 0 && (f = this._filesInBatchAddedToUi - 1), 
                d = {
                    index: f
                }), c || (this._options.disableCancelForFormUploads && !qq.supportedFeatures.ajaxUploading && this._templating.disableCancel(), 
                this._options.multiple || (e = this.getUploads({
                    id: a
                }), this._handledProxyGroup = this._handledProxyGroup || e.proxyGroupId, e.proxyGroupId === this._handledProxyGroup && e.proxyGroupId || (this._handler.cancelAll(), 
                this._clearList(), this._handledProxyGroup = null))), c ? (this._templating.addFileToCache(a, this._options.formatFileName(b), d, g), 
                this._templating.updateThumbnail(a, this._thumbnailUrls[a], !0, this._options.thumbnails.customResizer)) : (this._templating.addFile(a, this._options.formatFileName(b), d, g), 
                this._templating.generatePreview(a, this.getFile(a), this._options.thumbnails.customResizer)), 
                this._filesInBatchAddedToUi += 1, (c || this._options.display.fileSizeOnSubmit && qq.supportedFeatures.ajaxUploading) && this._displayFileSize(a);
            },
            _clearList: function() {
                this._templating.clearFiles(), this.clearStoredFiles();
            },
            _displayFileSize: function(a, b, c) {
                var d = this.getSize(a), e = this._formatSize(d);
                d >= 0 && (void 0 !== b && void 0 !== c && (e = this._formatProgress(b, c)), this._templating.updateSize(a, e));
            },
            _formatProgress: function(a, b) {
                function c(a, b) {
                    d = d.replace(a, b);
                }
                var d = this._options.text.formatProgress;
                return c("{percent}", Math.round(a / b * 100)), c("{total_size}", this._formatSize(b)), 
                d;
            },
            _controlFailureTextDisplay: function(a, b) {
                var c, d, e;
                c = this._options.failedUploadTextDisplay.mode, d = this._options.failedUploadTextDisplay.responseProperty, 
                "custom" === c ? (e = b[d], e || (e = this._options.text.failUpload), this._templating.setStatusText(a, e), 
                this._options.failedUploadTextDisplay.enableTooltip && this._showTooltip(a, e)) : "default" === c ? this._templating.setStatusText(a, this._options.text.failUpload) : "none" !== c && this.log("failedUploadTextDisplay.mode value of '" + c + "' is not valid", "warn");
            },
            _showTooltip: function(a, b) {
                this._templating.getFileContainer(a).title = b;
            },
            _showCancelLink: function(a) {
                this._options.disableCancelForFormUploads && !qq.supportedFeatures.ajaxUploading || this._templating.showCancel(a);
            },
            _itemError: function(a, b, c) {
                var d = this._parent.prototype._itemError.apply(this, arguments);
                this._options.showMessage(d);
            },
            _batchError: function(a) {
                this._parent.prototype._batchError.apply(this, arguments), this._options.showMessage(a);
            },
            _setupPastePrompt: function() {
                var a = this;
                this._options.callbacks.onPasteReceived = function() {
                    var b = a._options.paste.namePromptMessage, c = a._options.paste.defaultName;
                    return a._options.showPrompt(b, c);
                };
            },
            _fileOrBlobRejected: function(a, b) {
                this._totalFilesInBatch -= 1, this._parent.prototype._fileOrBlobRejected.apply(this, arguments);
            },
            _prepareItemsForUpload: function(a, b, c) {
                this._totalFilesInBatch = a.length, this._filesInBatchAddedToUi = 0, this._parent.prototype._prepareItemsForUpload.apply(this, arguments);
            },
            _maybeUpdateThumbnail: function(a) {
                var b = this._thumbnailUrls[a];
                this.getUploads({
                    id: a
                }).status === qq.status.DELETED || !b && !this._options.thumbnails.placeholders.waitUntilResponse && qq.supportedFeatures.imagePreviews || this._templating.updateThumbnail(a, b, this._options.thumbnails.customResizer);
            },
            _addCannedFile: function(a) {
                var b = this._parent.prototype._addCannedFile.apply(this, arguments);
                return this._addToList(b, this.getName(b), !0), this._templating.hideSpinner(b), 
                this._templating.hideCancel(b), this._markFileAsSuccessful(b), b;
            },
            _setSize: function(a, b) {
                this._parent.prototype._setSize.apply(this, arguments), this._templating.updateSize(a, this._formatSize(b));
            },
            _sessionRequestComplete: function() {
                this._templating.addCacheToDom(), this._parent.prototype._sessionRequestComplete.apply(this, arguments);
            }
        };
    }(), qq.FineUploader = function(a, b) {
        var c = this;
        this._parent = b ? qq[b].FineUploaderBasic : qq.FineUploaderBasic, this._parent.apply(this, arguments), 
        qq.extend(this._options, {
            element: null,
            button: null,
            listElement: null,
            dragAndDrop: {
                extraDropzones: [],
                reportDirectoryPaths: !1
            },
            text: {
                formatProgress: "{percent}% of {total_size}",
                failUpload: "Upload failed",
                waitingForResponse: "Processing...",
                paused: "Paused"
            },
            template: "qq-template",
            classes: {
                retrying: "qq-upload-retrying",
                retryable: "qq-upload-retryable",
                success: "qq-upload-success",
                fail: "qq-upload-fail",
                editable: "qq-editable",
                hide: "qq-hide",
                dropActive: "qq-upload-drop-area-active"
            },
            failedUploadTextDisplay: {
                mode: "default",
                responseProperty: "error",
                enableTooltip: !0
            },
            messages: {
                tooManyFilesError: "You may only drop one file",
                unsupportedBrowser: "Unrecoverable error - this browser does not permit file uploading of any kind."
            },
            retry: {
                showAutoRetryNote: !0,
                autoRetryNote: "Retrying {retryNum}/{maxAuto}..."
            },
            deleteFile: {
                forceConfirm: !1,
                confirmMessage: "Are you sure you want to delete {filename}?",
                deletingStatusText: "Deleting...",
                deletingFailedText: "Delete failed"
            },
            display: {
                fileSizeOnSubmit: !1,
                prependFiles: !1
            },
            paste: {
                promptForName: !1,
                namePromptMessage: "Please name this image"
            },
            thumbnails: {
                customResizer: null,
                maxCount: 0,
                placeholders: {
                    waitUntilResponse: !1,
                    notAvailablePath: null,
                    waitingPath: null
                },
                timeBetweenThumbs: 750
            },
            scaling: {
                hideScaled: !1
            },
            showMessage: function(a) {
                if (c._templating.hasDialog("alert")) return c._templating.showDialog("alert", a);
                setTimeout(function() {
                    window.alert(a);
                }, 0);
            },
            showConfirm: function(a) {
                return c._templating.hasDialog("confirm") ? c._templating.showDialog("confirm", a) : window.confirm(a);
            },
            showPrompt: function(a, b) {
                return c._templating.hasDialog("prompt") ? c._templating.showDialog("prompt", a, b) : window.prompt(a, b);
            }
        }, !0), qq.extend(this._options, a, !0), this._templating = new qq.Templating({
            log: qq.bind(this.log, this),
            templateIdOrEl: this._options.template,
            containerEl: this._options.element,
            fileContainerEl: this._options.listElement,
            button: this._options.button,
            imageGenerator: this._imageGenerator,
            classes: {
                hide: this._options.classes.hide,
                editable: this._options.classes.editable
            },
            limits: {
                maxThumbs: this._options.thumbnails.maxCount,
                timeBetweenThumbs: this._options.thumbnails.timeBetweenThumbs
            },
            placeholders: {
                waitUntilUpdate: this._options.thumbnails.placeholders.waitUntilResponse,
                thumbnailNotAvailable: this._options.thumbnails.placeholders.notAvailablePath,
                waitingForThumbnail: this._options.thumbnails.placeholders.waitingPath
            },
            text: this._options.text
        }), this._options.workarounds.ios8SafariUploads && qq.ios800() && qq.iosSafari() ? this._templating.renderFailure(this._options.messages.unsupportedBrowserIos8Safari) : !qq.supportedFeatures.uploading || this._options.cors.expected && !qq.supportedFeatures.uploadCors ? this._templating.renderFailure(this._options.messages.unsupportedBrowser) : (this._wrapCallbacks(), 
        this._templating.render(), this._classes = this._options.classes, !this._options.button && this._templating.getButton() && (this._defaultButtonId = this._createUploadButton({
            element: this._templating.getButton(),
            title: this._options.text.fileInputTitle
        }).getButtonId()), this._setupClickAndEditEventHandlers(), qq.DragAndDrop && qq.supportedFeatures.fileDrop && (this._dnd = this._setupDragAndDrop()), 
        this._options.paste.targetElement && this._options.paste.promptForName && (qq.PasteSupport ? this._setupPastePrompt() : this.log("Paste support module not found.", "error")), 
        this._totalFilesInBatch = 0, this._filesInBatchAddedToUi = 0);
    }, qq.extend(qq.FineUploader.prototype, qq.basePublicApi), qq.extend(qq.FineUploader.prototype, qq.basePrivateApi), 
    qq.extend(qq.FineUploader.prototype, qq.uiPublicApi), qq.extend(qq.FineUploader.prototype, qq.uiPrivateApi), 
    qq.Templating = function(a) {
        var b, c, d, e, f, g, h, i, j = {
            content: document.createDocumentFragment(),
            map: {}
        }, k = !1, l = 0, m = !1, n = [], o = -1, p = {
            log: null,
            limits: {
                maxThumbs: 0,
                timeBetweenThumbs: 750
            },
            templateIdOrEl: "qq-template",
            containerEl: null,
            fileContainerEl: null,
            button: null,
            imageGenerator: null,
            classes: {
                hide: "qq-hide",
                editable: "qq-editable"
            },
            placeholders: {
                waitUntilUpdate: !1,
                thumbnailNotAvailable: null,
                waitingForThumbnail: null
            },
            text: {
                paused: "Paused"
            }
        }, q = {
            button: "qq-upload-button-selector",
            alertDialog: "qq-alert-dialog-selector",
            dialogCancelButton: "qq-cancel-button-selector",
            confirmDialog: "qq-confirm-dialog-selector",
            dialogMessage: "qq-dialog-message-selector",
            dialogOkButton: "qq-ok-button-selector",
            promptDialog: "qq-prompt-dialog-selector",
            uploader: "qq-uploader-selector",
            drop: "qq-upload-drop-area-selector",
            list: "qq-upload-list-selector",
            progressBarContainer: "qq-progress-bar-container-selector",
            progressBar: "qq-progress-bar-selector",
            totalProgressBarContainer: "qq-total-progress-bar-container-selector",
            totalProgressBar: "qq-total-progress-bar-selector",
            file: "qq-upload-file-selector",
            spinner: "qq-upload-spinner-selector",
            size: "qq-upload-size-selector",
            cancel: "qq-upload-cancel-selector",
            pause: "qq-upload-pause-selector",
            continueButton: "qq-upload-continue-selector",
            deleteButton: "qq-upload-delete-selector",
            retry: "qq-upload-retry-selector",
            statusText: "qq-upload-status-text-selector",
            editFilenameInput: "qq-edit-filename-selector",
            editNameIcon: "qq-edit-filename-icon-selector",
            dropText: "qq-upload-drop-area-text-selector",
            dropProcessing: "qq-drop-processing-selector",
            dropProcessingSpinner: "qq-drop-processing-spinner-selector",
            thumbnail: "qq-thumbnail-selector"
        }, r = {}, s = new qq.Promise(), t = new qq.Promise(), u = function() {
            var a = p.placeholders.thumbnailNotAvailable, c = p.placeholders.waitingForThumbnail, d = {
                maxSize: o,
                scale: i
            };
            h && (a ? p.imageGenerator.generate(a, new Image(), d).then(function(a) {
                s.success(a);
            }, function() {
                s.failure(), b("Problem loading 'not available' placeholder image at " + a, "error");
            }) : s.failure(), c ? p.imageGenerator.generate(c, new Image(), d).then(function(a) {
                t.success(a);
            }, function() {
                t.failure(), b("Problem loading 'waiting for thumbnail' placeholder image at " + c, "error");
            }) : t.failure());
        }, v = function(a) {
            var b = new qq.Promise();
            return t.then(function(c) {
                O(c, a), a.src ? b.success() : (a.src = c.src, a.onload = function() {
                    a.onload = null, V(a), b.success();
                });
            }, function() {
                N(a), b.success();
            }), b;
        }, w = function(a, c, d) {
            var e = M(a);
            return b("Generating new thumbnail for " + a), c.qqThumbnailId = a, p.imageGenerator.generate(c, e, d).then(function() {
                l++, V(e), r[a].success();
            }, function() {
                r[a].failure(), p.placeholders.waitUntilUpdate || P(a, e);
            });
        }, x = function() {
            if (n.length) {
                m = !0;
                var a = n.shift();
                a.update ? T(a) : S(a);
            } else m = !1;
        }, y = function(a) {
            return L(E(a), q.cancel);
        }, z = function(a) {
            return L(E(a), q.continueButton);
        }, A = function(a) {
            return L(f, q[a + "Dialog"]);
        }, B = function(a) {
            return L(E(a), q.deleteButton);
        }, C = function() {
            return L(f, q.dropProcessing);
        }, D = function(a) {
            return L(E(a), q.editNameIcon);
        }, E = function(a) {
            return j.map[a] || qq(g).getFirstByClass("qq-file-id-" + a);
        }, F = function(a) {
            return L(E(a), q.file);
        }, G = function(a) {
            return L(E(a), q.pause);
        }, H = function(a) {
            return null == a ? L(f, q.totalProgressBarContainer) || L(f, q.totalProgressBar) : L(E(a), q.progressBarContainer) || L(E(a), q.progressBar);
        }, I = function(a) {
            return L(E(a), q.retry);
        }, J = function(a) {
            return L(E(a), q.size);
        }, K = function(a) {
            return L(E(a), q.spinner);
        }, L = function(a, b) {
            return a && qq(a).getFirstByClass(b);
        }, M = function(a) {
            return h && L(E(a), q.thumbnail);
        }, N = function(a) {
            a && qq(a).addClass(p.classes.hide);
        }, O = function(a, b) {
            var c = a.style.maxWidth, d = a.style.maxHeight;
            d && c && !b.style.maxWidth && !b.style.maxHeight && qq(b).css({
                maxWidth: c,
                maxHeight: d
            });
        }, P = function(a, b) {
            var c = r[a] || new qq.Promise().failure(), d = new qq.Promise();
            return s.then(function(a) {
                c.then(function() {
                    d.success();
                }, function() {
                    O(a, b), b.onload = function() {
                        b.onload = null, d.success();
                    }, b.src = a.src, V(b);
                });
            }), d;
        }, Q = function() {
            var a, e, f, g, j, k, l, m, n, r, s;
            if (b("Parsing template"), null == p.templateIdOrEl) throw new Error("You MUST specify either a template element or ID!");
            if (qq.isString(p.templateIdOrEl)) {
                if (null === (a = document.getElementById(p.templateIdOrEl))) throw new Error(qq.format("Cannot find template script at ID '{}'!", p.templateIdOrEl));
                e = a.innerHTML;
            } else {
                if (void 0 === p.templateIdOrEl.innerHTML) throw new Error("You have specified an invalid value for the template option!  It must be an ID or an Element.");
                e = p.templateIdOrEl.innerHTML;
            }
            if (e = qq.trimStr(e), g = document.createElement("div"), g.appendChild(qq.toElement(e)), 
            s = qq(g).getFirstByClass(q.uploader), p.button && (k = qq(g).getFirstByClass(q.button)) && qq(k).remove(), 
            qq.DragAndDrop && qq.supportedFeatures.fileDrop || (n = qq(g).getFirstByClass(q.dropProcessing)) && qq(n).remove(), 
            l = qq(g).getFirstByClass(q.drop), l && !qq.DragAndDrop && (b("DnD module unavailable.", "info"), 
            qq(l).remove()), qq.supportedFeatures.fileDrop ? qq(s).hasAttribute("qq-drop-area-text") && l && (r = qq(l).getFirstByClass(q.dropText)) && qq(r).remove() : (s.removeAttribute("qq-drop-area-text"), 
            l && qq(l).hasAttribute("qq-hide-dropzone") && qq(l).css({
                display: "none"
            })), m = qq(g).getFirstByClass(q.thumbnail), h ? m && (o = parseInt(m.getAttribute("qq-max-size")), 
            o = o > 0 ? o : null, i = qq(m).hasAttribute("qq-server-scale")) : m && qq(m).remove(), 
            h = h && m, c = qq(g).getByClass(q.editFilenameInput).length > 0, d = qq(g).getByClass(q.retry).length > 0, 
            null == (f = qq(g).getFirstByClass(q.list))) throw new Error("Could not find the file list container in the template!");
            return j = f.innerHTML, f.innerHTML = "", g.getElementsByTagName("DIALOG").length && document.createElement("dialog"), 
            b("Template parsing complete"), {
                template: qq.trimStr(g.innerHTML),
                fileTemplate: qq.trimStr(j)
            };
        }, R = function(a, b, c) {
            var d = c, e = d.firstChild;
            b > 0 && (e = qq(d).children()[b].nextSibling), d.insertBefore(a, e);
        }, S = function(a) {
            var b = a.id, c = a.optFileOrBlob, d = c && c.qqThumbnailId, e = M(b), f = {
                customResizeFunction: a.customResizeFunction,
                maxSize: o,
                orient: !0,
                scale: !0
            };
            qq.supportedFeatures.imagePreviews ? e ? p.limits.maxThumbs && p.limits.maxThumbs <= l ? (P(b, e), 
            x()) : v(e).done(function() {
                r[b] = new qq.Promise(), r[b].done(function() {
                    setTimeout(x, p.limits.timeBetweenThumbs);
                }), null != d ? W(b, d) : w(b, c, f);
            }) : x() : e && (v(e), x());
        }, T = function(a) {
            var b = a.id, c = a.thumbnailUrl, d = a.showWaitingImg, e = M(b), f = {
                customResizeFunction: a.customResizeFunction,
                scale: i,
                maxSize: o
            };
            if (e) if (c) {
                if (!(p.limits.maxThumbs && p.limits.maxThumbs <= l)) return d && v(e), p.imageGenerator.generate(c, e, f).then(function() {
                    V(e), l++, setTimeout(x, p.limits.timeBetweenThumbs);
                }, function() {
                    P(b, e), setTimeout(x, p.limits.timeBetweenThumbs);
                });
                P(b, e), x();
            } else P(b, e), x();
        }, U = function(a, b) {
            var c = H(a), d = null == a ? q.totalProgressBar : q.progressBar;
            c && !qq(c).hasClass(d) && (c = qq(c).getFirstByClass(d)), c && (qq(c).css({
                width: b + "%"
            }), c.setAttribute("aria-valuenow", b));
        }, V = function(a) {
            a && qq(a).removeClass(p.classes.hide);
        }, W = function(a, c) {
            var d = M(a), e = M(c);
            b(qq.format("ID {} is the same file as ID {}.  Will use generated thumbnail from ID {} instead.", a, c, c)), 
            r[c].then(function() {
                l++, r[a].success(), b(qq.format("Now using previously generated thumbnail created for ID {} on ID {}.", c, a)), 
                d.src = e.src, V(d);
            }, function() {
                r[a].failure(), p.placeholders.waitUntilUpdate || P(a, d);
            });
        };
        qq.extend(p, a), b = p.log, qq.supportedFeatures.imagePreviews || (p.limits.timeBetweenThumbs = 0, 
        p.limits.maxThumbs = 0), f = p.containerEl, h = void 0 !== p.imageGenerator, e = Q(), 
        u(), qq.extend(this, {
            render: function() {
                b("Rendering template in DOM."), l = 0, f.innerHTML = e.template, N(C()), this.hideTotalProgress(), 
                g = p.fileContainerEl || L(f, q.list), b("Template rendering complete");
            },
            renderFailure: function(a) {
                var b = qq.toElement(a);
                f.innerHTML = "", f.appendChild(b);
            },
            reset: function() {
                this.render();
            },
            clearFiles: function() {
                g.innerHTML = "";
            },
            disableCancel: function() {
                k = !0;
            },
            addFile: function(a, b, c, d, h) {
                var i, l = qq.toElement(e.fileTemplate), m = L(l, q.file), n = L(f, q.uploader), o = h ? j.content : g;
                h && (j.map[a] = l), qq(l).addClass("qq-file-id-" + a), n.removeAttribute("qq-drop-area-text"), 
                m && (qq(m).setText(b), m.setAttribute("title", b)), l.setAttribute("qq-file-id", a), 
                c ? R(l, c.index, o) : o.appendChild(l), d ? (l.style.display = "none", qq(l).addClass("qq-hidden-forever")) : (N(H(a)), 
                N(J(a)), N(B(a)), N(I(a)), N(G(a)), N(z(a)), k && this.hideCancel(a), (i = M(a)) && !i.src && t.then(function(a) {
                    i.src = a.src, a.style.maxHeight && a.style.maxWidth && qq(i).css({
                        maxHeight: a.style.maxHeight,
                        maxWidth: a.style.maxWidth
                    }), V(i);
                }));
            },
            addFileToCache: function(a, b, c, d) {
                this.addFile(a, b, c, d, !0);
            },
            addCacheToDom: function() {
                g.appendChild(j.content), j.content = document.createDocumentFragment(), j.map = {};
            },
            removeFile: function(a) {
                qq(E(a)).remove();
            },
            getFileId: function(a) {
                var b = a;
                if (b) {
                    for (;null == b.getAttribute("qq-file-id"); ) b = b.parentNode;
                    return parseInt(b.getAttribute("qq-file-id"));
                }
            },
            getFileList: function() {
                return g;
            },
            markFilenameEditable: function(a) {
                var b = F(a);
                b && qq(b).addClass(p.classes.editable);
            },
            updateFilename: function(a, b) {
                var c = F(a);
                c && (qq(c).setText(b), c.setAttribute("title", b));
            },
            hideFilename: function(a) {
                N(F(a));
            },
            showFilename: function(a) {
                V(F(a));
            },
            isFileName: function(a) {
                return qq(a).hasClass(q.file);
            },
            getButton: function() {
                return p.button || L(f, q.button);
            },
            hideDropProcessing: function() {
                N(C());
            },
            showDropProcessing: function() {
                V(C());
            },
            getDropZone: function() {
                return L(f, q.drop);
            },
            isEditFilenamePossible: function() {
                return c;
            },
            hideRetry: function(a) {
                N(I(a));
            },
            isRetryPossible: function() {
                return d;
            },
            showRetry: function(a) {
                V(I(a));
            },
            getFileContainer: function(a) {
                return E(a);
            },
            showEditIcon: function(a) {
                var b = D(a);
                b && qq(b).addClass(p.classes.editable);
            },
            isHiddenForever: function(a) {
                return qq(E(a)).hasClass("qq-hidden-forever");
            },
            hideEditIcon: function(a) {
                var b = D(a);
                b && qq(b).removeClass(p.classes.editable);
            },
            isEditIcon: function(a) {
                return qq(a).hasClass(q.editNameIcon, !0);
            },
            getEditInput: function(a) {
                return L(E(a), q.editFilenameInput);
            },
            isEditInput: function(a) {
                return qq(a).hasClass(q.editFilenameInput, !0);
            },
            updateProgress: function(a, b, c) {
                var d, e = H(a);
                e && c > 0 && (d = Math.round(b / c * 100), 100 === d ? N(e) : V(e), U(a, d));
            },
            updateTotalProgress: function(a, b) {
                this.updateProgress(null, a, b);
            },
            hideProgress: function(a) {
                var b = H(a);
                b && N(b);
            },
            hideTotalProgress: function() {
                this.hideProgress();
            },
            resetProgress: function(a) {
                U(a, 0), this.hideTotalProgress(a);
            },
            resetTotalProgress: function() {
                this.resetProgress();
            },
            showCancel: function(a) {
                if (!k) {
                    var b = y(a);
                    b && qq(b).removeClass(p.classes.hide);
                }
            },
            hideCancel: function(a) {
                N(y(a));
            },
            isCancel: function(a) {
                return qq(a).hasClass(q.cancel, !0);
            },
            allowPause: function(a) {
                V(G(a)), N(z(a));
            },
            uploadPaused: function(a) {
                this.setStatusText(a, p.text.paused), this.allowContinueButton(a), N(K(a));
            },
            hidePause: function(a) {
                N(G(a));
            },
            isPause: function(a) {
                return qq(a).hasClass(q.pause, !0);
            },
            isContinueButton: function(a) {
                return qq(a).hasClass(q.continueButton, !0);
            },
            allowContinueButton: function(a) {
                V(z(a)), N(G(a));
            },
            uploadContinued: function(a) {
                this.setStatusText(a, ""), this.allowPause(a), V(K(a));
            },
            showDeleteButton: function(a) {
                V(B(a));
            },
            hideDeleteButton: function(a) {
                N(B(a));
            },
            isDeleteButton: function(a) {
                return qq(a).hasClass(q.deleteButton, !0);
            },
            isRetry: function(a) {
                return qq(a).hasClass(q.retry, !0);
            },
            updateSize: function(a, b) {
                var c = J(a);
                c && (V(c), qq(c).setText(b));
            },
            setStatusText: function(a, b) {
                var c = L(E(a), q.statusText);
                c && (null == b ? qq(c).clearText() : qq(c).setText(b));
            },
            hideSpinner: function(a) {
                qq(E(a)).removeClass("qq-in-progress"), N(K(a));
            },
            showSpinner: function(a) {
                qq(E(a)).addClass("qq-in-progress"), V(K(a));
            },
            generatePreview: function(a, b, c) {
                this.isHiddenForever(a) || (n.push({
                    id: a,
                    customResizeFunction: c,
                    optFileOrBlob: b
                }), !m && x());
            },
            updateThumbnail: function(a, b, c, d) {
                this.isHiddenForever(a) || (n.push({
                    customResizeFunction: d,
                    update: !0,
                    id: a,
                    thumbnailUrl: b,
                    showWaitingImg: c
                }), !m && x());
            },
            hasDialog: function(a) {
                return qq.supportedFeatures.dialogElement && !!A(a);
            },
            showDialog: function(a, b, c) {
                var d = A(a), e = L(d, q.dialogMessage), f = d.getElementsByTagName("INPUT")[0], g = L(d, q.dialogCancelButton), h = L(d, q.dialogOkButton), i = new qq.Promise(), j = function() {
                    g.removeEventListener("click", k), h && h.removeEventListener("click", l), i.failure();
                }, k = function() {
                    g.removeEventListener("click", k), d.close();
                }, l = function() {
                    d.removeEventListener("close", j), h.removeEventListener("click", l), d.close(), 
                    i.success(f && f.value);
                };
                return d.addEventListener("close", j), g.addEventListener("click", k), h && h.addEventListener("click", l), 
                f && (f.value = c), e.textContent = b, d.showModal(), i;
            }
        });
    }, qq.UiEventHandler = function(a, b) {
        function c(a) {
            d.attach(a, e.eventType, function(a) {
                a = a || window.event;
                var b = a.target || a.srcElement;
                e.onHandled(b, a);
            });
        }
        var d = new qq.DisposeSupport(), e = {
            eventType: "click",
            attachTo: null,
            onHandled: function(a, b) {}
        };
        qq.extend(this, {
            addHandler: function(a) {
                c(a);
            },
            dispose: function() {
                d.dispose();
            }
        }), qq.extend(b, {
            getFileIdFromItem: function(a) {
                return a.qqFileId;
            },
            getDisposeSupport: function() {
                return d;
            }
        }), qq.extend(e, a), e.attachTo && c(e.attachTo);
    }, qq.FileButtonsClickHandler = function(a) {
        function b(a, b) {
            qq.each(e, function(c, e) {
                var f, g = c.charAt(0).toUpperCase() + c.slice(1);
                if (d.templating["is" + g](a)) return f = d.templating.getFileId(a), qq.preventDefault(b), 
                d.log(qq.format("Detected valid file button click event on file '{}', ID: {}.", d.onGetName(f), f)), 
                e(f), !1;
            });
        }
        var c = {}, d = {
            templating: null,
            log: function(a, b) {},
            onDeleteFile: function(a) {},
            onCancel: function(a) {},
            onRetry: function(a) {},
            onPause: function(a) {},
            onContinue: function(a) {},
            onGetName: function(a) {}
        }, e = {
            cancel: function(a) {
                d.onCancel(a);
            },
            retry: function(a) {
                d.onRetry(a);
            },
            deleteButton: function(a) {
                d.onDeleteFile(a);
            },
            pause: function(a) {
                d.onPause(a);
            },
            continueButton: function(a) {
                d.onContinue(a);
            }
        };
        qq.extend(d, a), d.eventType = "click", d.onHandled = b, d.attachTo = d.templating.getFileList(), 
        qq.extend(this, new qq.UiEventHandler(d, c));
    }, qq.FilenameClickHandler = function(a) {
        function b(a, b) {
            if (d.templating.isFileName(a) || d.templating.isEditIcon(a)) {
                var e = d.templating.getFileId(a);
                d.onGetUploadStatus(e) === qq.status.SUBMITTED && (d.log(qq.format("Detected valid filename click event on file '{}', ID: {}.", d.onGetName(e), e)), 
                qq.preventDefault(b), c.handleFilenameEdit(e, a, !0));
            }
        }
        var c = {}, d = {
            templating: null,
            log: function(a, b) {},
            classes: {
                file: "qq-upload-file",
                editNameIcon: "qq-edit-filename-icon"
            },
            onGetUploadStatus: function(a) {},
            onGetName: function(a) {}
        };
        qq.extend(d, a), d.eventType = "click", d.onHandled = b, qq.extend(this, new qq.FilenameEditHandler(d, c));
    }, qq.FilenameInputFocusInHandler = function(a, b) {
        function c(a, c) {
            if (d.templating.isEditInput(a)) {
                var e = d.templating.getFileId(a);
                d.onGetUploadStatus(e) === qq.status.SUBMITTED && (d.log(qq.format("Detected valid filename input focus event on file '{}', ID: {}.", d.onGetName(e), e)), 
                b.handleFilenameEdit(e, a));
            }
        }
        var d = {
            templating: null,
            onGetUploadStatus: function(a) {},
            log: function(a, b) {}
        };
        b || (b = {}), d.eventType = "focusin", d.onHandled = c, qq.extend(d, a), qq.extend(this, new qq.FilenameEditHandler(d, b));
    }, qq.FilenameInputFocusHandler = function(a) {
        a.eventType = "focus", a.attachTo = null, qq.extend(this, new qq.FilenameInputFocusInHandler(a, {}));
    }, qq.FilenameEditHandler = function(a, b) {
        function c(a) {
            var b = h.onGetName(a), c = b.lastIndexOf(".");
            return c > 0 && (b = b.substr(0, c)), b;
        }
        function d(a) {
            var b = h.onGetName(a);
            return qq.getExtension(b);
        }
        function e(a, b) {
            var c, e = a.value;
            void 0 !== e && qq.trimStr(e).length > 0 && (c = d(b), void 0 !== c && (e = e + "." + c), 
            h.onSetName(b, e)), h.onEditingStatusChange(b, !1);
        }
        function f(a, c) {
            b.getDisposeSupport().attach(a, "blur", function() {
                e(a, c);
            });
        }
        function g(a, c) {
            b.getDisposeSupport().attach(a, "keyup", function(b) {
                13 === (b.keyCode || b.which) && e(a, c);
            });
        }
        var h = {
            templating: null,
            log: function(a, b) {},
            onGetUploadStatus: function(a) {},
            onGetName: function(a) {},
            onSetName: function(a, b) {},
            onEditingStatusChange: function(a, b) {}
        };
        qq.extend(h, a), h.attachTo = h.templating.getFileList(), qq.extend(this, new qq.UiEventHandler(h, b)), 
        qq.extend(b, {
            handleFilenameEdit: function(a, b, d) {
                var e = h.templating.getEditInput(a);
                h.onEditingStatusChange(a, !0), e.value = c(a), d && e.focus(), f(e, a), g(e, a);
            }
        });
    };
}(window), function(a, b, c) {
    L.MarkerClusterGroup = L.FeatureGroup.extend({
        options: {
            maxClusterRadius: 80,
            iconCreateFunction: null,
            spiderfyOnMaxZoom: !0,
            showCoverageOnHover: !0,
            zoomToBoundsOnClick: !0,
            singleMarkerMode: !1,
            disableClusteringAtZoom: null,
            removeOutsideVisibleBounds: !0,
            animate: !0,
            animateAddingMarkers: !1,
            spiderfyDistanceMultiplier: 1,
            spiderLegPolylineOptions: {
                weight: 1.5,
                color: "#222",
                opacity: .5
            },
            chunkedLoading: !1,
            chunkInterval: 200,
            chunkDelay: 50,
            chunkProgress: null,
            polygonOptions: {}
        },
        initialize: function(a) {
            L.Util.setOptions(this, a), this.options.iconCreateFunction || (this.options.iconCreateFunction = this._defaultIconCreateFunction), 
            this.options.clusterPane || (this.options.clusterPane = L.Marker.prototype.options.pane), 
            this._featureGroup = L.featureGroup(), this._featureGroup.addEventParent(this), 
            this._nonPointGroup = L.featureGroup(), this._nonPointGroup.addEventParent(this), 
            this._inZoomAnimation = 0, this._needsClustering = [], this._needsRemoving = [], 
            this._currentShownBounds = null, this._queue = [], this._childMarkerEventHandlers = {
                dragstart: this._childMarkerDragStart,
                move: this._childMarkerMoved,
                dragend: this._childMarkerDragEnd
            };
            var b = L.DomUtil.TRANSITION && this.options.animate;
            L.extend(this, b ? this._withAnimation : this._noAnimation), this._markerCluster = b ? L.MarkerCluster : L.MarkerClusterNonAnimated;
        },
        addLayer: function(a) {
            if (a instanceof L.LayerGroup) return this.addLayers([ a ]);
            if (!a.getLatLng) return this._nonPointGroup.addLayer(a), this.fire("layeradd", {
                layer: a
            }), this;
            if (!this._map) return this._needsClustering.push(a), this.fire("layeradd", {
                layer: a
            }), this;
            if (this.hasLayer(a)) return this;
            this._unspiderfy && this._unspiderfy(), this._addLayer(a, this._maxZoom), this.fire("layeradd", {
                layer: a
            }), this._topClusterLevel._recalculateBounds(), this._refreshClustersIcons();
            var b = a, c = this._zoom;
            if (a.__parent) for (;b.__parent._zoom >= c; ) b = b.__parent;
            return this._currentShownBounds.contains(b.getLatLng()) && (this.options.animateAddingMarkers ? this._animationAddLayer(a, b) : this._animationAddLayerNonAnimated(a, b)), 
            this;
        },
        removeLayer: function(a) {
            return a instanceof L.LayerGroup ? this.removeLayers([ a ]) : a.getLatLng ? this._map ? a.__parent ? (this._unspiderfy && (this._unspiderfy(), 
            this._unspiderfyLayer(a)), this._removeLayer(a, !0), this.fire("layerremove", {
                layer: a
            }), this._topClusterLevel._recalculateBounds(), this._refreshClustersIcons(), a.off(this._childMarkerEventHandlers, this), 
            this._featureGroup.hasLayer(a) && (this._featureGroup.removeLayer(a), a.clusterShow && a.clusterShow()), 
            this) : this : (!this._arraySplice(this._needsClustering, a) && this.hasLayer(a) && this._needsRemoving.push({
                layer: a,
                latlng: a._latlng
            }), this.fire("layerremove", {
                layer: a
            }), this) : (this._nonPointGroup.removeLayer(a), this.fire("layerremove", {
                layer: a
            }), this);
        },
        addLayers: function(a, b) {
            if (!L.Util.isArray(a)) return this.addLayer(a);
            var c, d = this._featureGroup, e = this._nonPointGroup, f = this.options.chunkedLoading, g = this.options.chunkInterval, h = this.options.chunkProgress, i = a.length, j = 0, k = !0;
            if (this._map) {
                var l = new Date().getTime(), m = L.bind(function() {
                    for (var n = new Date().getTime(); i > j; j++) {
                        if (f && 0 == j % 200) {
                            if (new Date().getTime() - n > g) break;
                        }
                        if ((c = a[j]) instanceof L.LayerGroup) k && (a = a.slice(), k = !1), this._extractNonGroupLayers(c, a), 
                        i = a.length; else if (c.getLatLng) {
                            if (!this.hasLayer(c) && (this._addLayer(c, this._maxZoom), b || this.fire("layeradd", {
                                layer: c
                            }), c.__parent && 2 === c.__parent.getChildCount())) {
                                var o = c.__parent.getAllChildMarkers(), p = o[0] === c ? o[1] : o[0];
                                d.removeLayer(p);
                            }
                        } else e.addLayer(c), b || this.fire("layeradd", {
                            layer: c
                        });
                    }
                    h && h(j, i, new Date().getTime() - l), j === i ? (this._topClusterLevel._recalculateBounds(), 
                    this._refreshClustersIcons(), this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds)) : setTimeout(m, this.options.chunkDelay);
                }, this);
                m();
            } else for (var n = this._needsClustering; i > j; j++) c = a[j], c instanceof L.LayerGroup ? (k && (a = a.slice(), 
            k = !1), this._extractNonGroupLayers(c, a), i = a.length) : c.getLatLng ? this.hasLayer(c) || n.push(c) : e.addLayer(c);
            return this;
        },
        removeLayers: function(a) {
            var b, c, d = a.length, e = this._featureGroup, f = this._nonPointGroup, g = !0;
            if (!this._map) {
                for (b = 0; d > b; b++) c = a[b], c instanceof L.LayerGroup ? (g && (a = a.slice(), 
                g = !1), this._extractNonGroupLayers(c, a), d = a.length) : (this._arraySplice(this._needsClustering, c), 
                f.removeLayer(c), this.hasLayer(c) && this._needsRemoving.push({
                    layer: c,
                    latlng: c._latlng
                }), this.fire("layerremove", {
                    layer: c
                }));
                return this;
            }
            if (this._unspiderfy) {
                this._unspiderfy();
                var h = a.slice(), i = d;
                for (b = 0; i > b; b++) c = h[b], c instanceof L.LayerGroup ? (this._extractNonGroupLayers(c, h), 
                i = h.length) : this._unspiderfyLayer(c);
            }
            for (b = 0; d > b; b++) c = a[b], c instanceof L.LayerGroup ? (g && (a = a.slice(), 
            g = !1), this._extractNonGroupLayers(c, a), d = a.length) : c.__parent ? (this._removeLayer(c, !0, !0), 
            this.fire("layerremove", {
                layer: c
            }), e.hasLayer(c) && (e.removeLayer(c), c.clusterShow && c.clusterShow())) : (f.removeLayer(c), 
            this.fire("layerremove", {
                layer: c
            }));
            return this._topClusterLevel._recalculateBounds(), this._refreshClustersIcons(), 
            this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds), 
            this;
        },
        clearLayers: function() {
            return this._map || (this._needsClustering = [], delete this._gridClusters, delete this._gridUnclustered), 
            this._noanimationUnspiderfy && this._noanimationUnspiderfy(), this._featureGroup.clearLayers(), 
            this._nonPointGroup.clearLayers(), this.eachLayer(function(a) {
                a.off(this._childMarkerEventHandlers, this), delete a.__parent;
            }, this), this._map && this._generateInitialClusters(), this;
        },
        getBounds: function() {
            var a = new L.LatLngBounds();
            this._topClusterLevel && a.extend(this._topClusterLevel._bounds);
            for (var b = this._needsClustering.length - 1; b >= 0; b--) a.extend(this._needsClustering[b].getLatLng());
            return a.extend(this._nonPointGroup.getBounds()), a;
        },
        eachLayer: function(a, b) {
            var c, d, e, f = this._needsClustering.slice(), g = this._needsRemoving;
            for (this._topClusterLevel && this._topClusterLevel.getAllChildMarkers(f), d = f.length - 1; d >= 0; d--) {
                for (c = !0, e = g.length - 1; e >= 0; e--) if (g[e].layer === f[d]) {
                    c = !1;
                    break;
                }
                c && a.call(b, f[d]);
            }
            this._nonPointGroup.eachLayer(a, b);
        },
        getLayers: function() {
            var a = [];
            return this.eachLayer(function(b) {
                a.push(b);
            }), a;
        },
        getLayer: function(a) {
            var b = null;
            return a = parseInt(a, 10), this.eachLayer(function(c) {
                L.stamp(c) === a && (b = c);
            }), b;
        },
        hasLayer: function(a) {
            if (!a) return !1;
            var b, c = this._needsClustering;
            for (b = c.length - 1; b >= 0; b--) if (c[b] === a) return !0;
            for (c = this._needsRemoving, b = c.length - 1; b >= 0; b--) if (c[b].layer === a) return !1;
            return !(!a.__parent || a.__parent._group !== this) || this._nonPointGroup.hasLayer(a);
        },
        zoomToShowLayer: function(a, b) {
            "function" != typeof b && (b = function() {});
            var c = function() {
                !a._icon && !a.__parent._icon || this._inZoomAnimation || (this._map.off("moveend", c, this), 
                this.off("animationend", c, this), a._icon ? b() : a.__parent._icon && (this.once("spiderfied", b, this), 
                a.__parent.spiderfy()));
            };
            a._icon && this._map.getBounds().contains(a.getLatLng()) ? b() : a.__parent._zoom < Math.round(this._map._zoom) ? (this._map.on("moveend", c, this), 
            this._map.panTo(a.getLatLng())) : (this._map.on("moveend", c, this), this.on("animationend", c, this), 
            a.__parent.zoomToBounds());
        },
        onAdd: function(a) {
            this._map = a;
            var b, c, d;
            if (!isFinite(this._map.getMaxZoom())) throw "Map has no maxZoom specified";
            for (this._featureGroup.addTo(a), this._nonPointGroup.addTo(a), this._gridClusters || this._generateInitialClusters(), 
            this._maxLat = a.options.crs.projection.MAX_LATITUDE, b = 0, c = this._needsRemoving.length; c > b; b++) d = this._needsRemoving[b], 
            d.newlatlng = d.layer._latlng, d.layer._latlng = d.latlng;
            for (b = 0, c = this._needsRemoving.length; c > b; b++) d = this._needsRemoving[b], 
            this._removeLayer(d.layer, !0), d.layer._latlng = d.newlatlng;
            this._needsRemoving = [], this._zoom = Math.round(this._map._zoom), this._currentShownBounds = this._getExpandedVisibleBounds(), 
            this._map.on("zoomend", this._zoomEnd, this), this._map.on("moveend", this._moveEnd, this), 
            this._spiderfierOnAdd && this._spiderfierOnAdd(), this._bindEvents(), c = this._needsClustering, 
            this._needsClustering = [], this.addLayers(c, !0);
        },
        onRemove: function(a) {
            a.off("zoomend", this._zoomEnd, this), a.off("moveend", this._moveEnd, this), this._unbindEvents(), 
            this._map._mapPane.className = this._map._mapPane.className.replace(" leaflet-cluster-anim", ""), 
            this._spiderfierOnRemove && this._spiderfierOnRemove(), delete this._maxLat, this._hideCoverage(), 
            this._featureGroup.remove(), this._nonPointGroup.remove(), this._featureGroup.clearLayers(), 
            this._map = null;
        },
        getVisibleParent: function(a) {
            for (var b = a; b && !b._icon; ) b = b.__parent;
            return b || null;
        },
        _arraySplice: function(a, b) {
            for (var c = a.length - 1; c >= 0; c--) if (a[c] === b) return a.splice(c, 1), !0;
        },
        _removeFromGridUnclustered: function(a, b) {
            for (var c = this._map, d = this._gridUnclustered, e = Math.floor(this._map.getMinZoom()); b >= e && d[b].removeObject(a, c.project(a.getLatLng(), b)); b--) ;
        },
        _childMarkerDragStart: function(a) {
            a.target.__dragStart = a.target._latlng;
        },
        _childMarkerMoved: function(a) {
            if (!this._ignoreMove && !a.target.__dragStart) {
                var b = a.target._popup && a.target._popup.isOpen();
                this._moveChild(a.target, a.oldLatLng, a.latlng), b && a.target.openPopup();
            }
        },
        _moveChild: function(a, b, c) {
            a._latlng = b, this.removeLayer(a), a._latlng = c, this.addLayer(a);
        },
        _childMarkerDragEnd: function(a) {
            a.target.__dragStart && this._moveChild(a.target, a.target.__dragStart, a.target._latlng), 
            delete a.target.__dragStart;
        },
        _removeLayer: function(a, b, c) {
            var d = this._gridClusters, e = this._gridUnclustered, f = this._featureGroup, g = this._map, h = Math.floor(this._map.getMinZoom());
            b && this._removeFromGridUnclustered(a, this._maxZoom);
            var i, j = a.__parent, k = j._markers;
            for (this._arraySplice(k, a); j && (j._childCount--, j._boundsNeedUpdate = !0, !(j._zoom < h)); ) b && j._childCount <= 1 ? (i = j._markers[0] === a ? j._markers[1] : j._markers[0], 
            d[j._zoom].removeObject(j, g.project(j._cLatLng, j._zoom)), e[j._zoom].addObject(i, g.project(i.getLatLng(), j._zoom)), 
            this._arraySplice(j.__parent._childClusters, j), j.__parent._markers.push(i), i.__parent = j.__parent, 
            j._icon && (f.removeLayer(j), c || f.addLayer(i))) : j._iconNeedsUpdate = !0, j = j.__parent;
            delete a.__parent;
        },
        _isOrIsParent: function(a, b) {
            for (;b; ) {
                if (a === b) return !0;
                b = b.parentNode;
            }
            return !1;
        },
        fire: function(a, b, c) {
            if (b && b.layer instanceof L.MarkerCluster) {
                if (b.originalEvent && this._isOrIsParent(b.layer._icon, b.originalEvent.relatedTarget)) return;
                a = "cluster" + a;
            }
            L.FeatureGroup.prototype.fire.call(this, a, b, c);
        },
        listens: function(a, b) {
            return L.FeatureGroup.prototype.listens.call(this, a, b) || L.FeatureGroup.prototype.listens.call(this, "cluster" + a, b);
        },
        _defaultIconCreateFunction: function(a) {
            var b = a.getChildCount(), c = " marker-cluster-";
            return c += 10 > b ? "small" : 100 > b ? "medium" : "large", new L.DivIcon({
                html: "<div><span>" + b + "</span></div>",
                className: "marker-cluster" + c,
                iconSize: new L.Point(40, 40)
            });
        },
        _bindEvents: function() {
            var a = this._map, b = this.options.spiderfyOnMaxZoom, c = this.options.showCoverageOnHover, d = this.options.zoomToBoundsOnClick;
            (b || d) && this.on("clusterclick", this._zoomOrSpiderfy, this), c && (this.on("clustermouseover", this._showCoverage, this), 
            this.on("clustermouseout", this._hideCoverage, this), a.on("zoomend", this._hideCoverage, this));
        },
        _zoomOrSpiderfy: function(a) {
            for (var b = a.layer, c = b; 1 === c._childClusters.length; ) c = c._childClusters[0];
            c._zoom === this._maxZoom && c._childCount === b._childCount && this.options.spiderfyOnMaxZoom ? b.spiderfy() : this.options.zoomToBoundsOnClick && b.zoomToBounds(), 
            a.originalEvent && 13 === a.originalEvent.keyCode && this._map._container.focus();
        },
        _showCoverage: function(a) {
            var b = this._map;
            this._inZoomAnimation || (this._shownPolygon && b.removeLayer(this._shownPolygon), 
            a.layer.getChildCount() > 2 && a.layer !== this._spiderfied && (this._shownPolygon = new L.Polygon(a.layer.getConvexHull(), this.options.polygonOptions), 
            b.addLayer(this._shownPolygon)));
        },
        _hideCoverage: function() {
            this._shownPolygon && (this._map.removeLayer(this._shownPolygon), this._shownPolygon = null);
        },
        _unbindEvents: function() {
            var a = this.options.spiderfyOnMaxZoom, b = this.options.showCoverageOnHover, c = this.options.zoomToBoundsOnClick, d = this._map;
            (a || c) && this.off("clusterclick", this._zoomOrSpiderfy, this), b && (this.off("clustermouseover", this._showCoverage, this), 
            this.off("clustermouseout", this._hideCoverage, this), d.off("zoomend", this._hideCoverage, this));
        },
        _zoomEnd: function() {
            this._map && (this._mergeSplitClusters(), this._zoom = Math.round(this._map._zoom), 
            this._currentShownBounds = this._getExpandedVisibleBounds());
        },
        _moveEnd: function() {
            if (!this._inZoomAnimation) {
                var a = this._getExpandedVisibleBounds();
                this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), this._zoom, a), 
                this._topClusterLevel._recursivelyAddChildrenToMap(null, Math.round(this._map._zoom), a), 
                this._currentShownBounds = a;
            }
        },
        _generateInitialClusters: function() {
            var a = Math.ceil(this._map.getMaxZoom()), b = Math.floor(this._map.getMinZoom()), c = this.options.maxClusterRadius, d = c;
            "function" != typeof c && (d = function() {
                return c;
            }), null !== this.options.disableClusteringAtZoom && (a = this.options.disableClusteringAtZoom - 1), 
            this._maxZoom = a, this._gridClusters = {}, this._gridUnclustered = {};
            for (var e = a; e >= b; e--) this._gridClusters[e] = new L.DistanceGrid(d(e)), this._gridUnclustered[e] = new L.DistanceGrid(d(e));
            this._topClusterLevel = new this._markerCluster(this, b - 1);
        },
        _addLayer: function(a, b) {
            var c, d, e = this._gridClusters, f = this._gridUnclustered, g = Math.floor(this._map.getMinZoom());
            for (this.options.singleMarkerMode && this._overrideMarkerIcon(a), a.on(this._childMarkerEventHandlers, this); b >= g; b--) {
                c = this._map.project(a.getLatLng(), b);
                var h = e[b].getNearObject(c);
                if (h) return h._addChild(a), void (a.__parent = h);
                if (h = f[b].getNearObject(c)) {
                    var i = h.__parent;
                    i && this._removeLayer(h, !1);
                    var j = new this._markerCluster(this, b, h, a);
                    e[b].addObject(j, this._map.project(j._cLatLng, b)), h.__parent = j, a.__parent = j;
                    var k = j;
                    for (d = b - 1; d > i._zoom; d--) k = new this._markerCluster(this, d, k), e[d].addObject(k, this._map.project(h.getLatLng(), d));
                    return i._addChild(k), void this._removeFromGridUnclustered(h, b);
                }
                f[b].addObject(a, c);
            }
            this._topClusterLevel._addChild(a), a.__parent = this._topClusterLevel;
        },
        _refreshClustersIcons: function() {
            this._featureGroup.eachLayer(function(a) {
                a instanceof L.MarkerCluster && a._iconNeedsUpdate && a._updateIcon();
            });
        },
        _enqueue: function(a) {
            this._queue.push(a), this._queueTimeout || (this._queueTimeout = setTimeout(L.bind(this._processQueue, this), 300));
        },
        _processQueue: function() {
            for (var a = 0; a < this._queue.length; a++) this._queue[a].call(this);
            this._queue.length = 0, clearTimeout(this._queueTimeout), this._queueTimeout = null;
        },
        _mergeSplitClusters: function() {
            var a = Math.round(this._map._zoom);
            this._processQueue(), this._zoom < a && this._currentShownBounds.intersects(this._getExpandedVisibleBounds()) ? (this._animationStart(), 
            this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), this._zoom, this._getExpandedVisibleBounds()), 
            this._animationZoomIn(this._zoom, a)) : this._zoom > a ? (this._animationStart(), 
            this._animationZoomOut(this._zoom, a)) : this._moveEnd();
        },
        _getExpandedVisibleBounds: function() {
            return this.options.removeOutsideVisibleBounds ? L.Browser.mobile ? this._checkBoundsMaxLat(this._map.getBounds()) : this._checkBoundsMaxLat(this._map.getBounds().pad(1)) : this._mapBoundsInfinite;
        },
        _checkBoundsMaxLat: function(a) {
            var b = this._maxLat;
            return b !== c && (a.getNorth() >= b && (a._northEast.lat = 1 / 0), a.getSouth() <= -b && (a._southWest.lat = -1 / 0)), 
            a;
        },
        _animationAddLayerNonAnimated: function(a, b) {
            if (b === a) this._featureGroup.addLayer(a); else if (2 === b._childCount) {
                b._addToMap();
                var c = b.getAllChildMarkers();
                this._featureGroup.removeLayer(c[0]), this._featureGroup.removeLayer(c[1]);
            } else b._updateIcon();
        },
        _extractNonGroupLayers: function(a, b) {
            var c, d = a.getLayers(), e = 0;
            for (b = b || []; e < d.length; e++) c = d[e], c instanceof L.LayerGroup ? this._extractNonGroupLayers(c, b) : b.push(c);
            return b;
        },
        _overrideMarkerIcon: function(a) {
            return a.options.icon = this.options.iconCreateFunction({
                getChildCount: function() {
                    return 1;
                },
                getAllChildMarkers: function() {
                    return [ a ];
                }
            });
        }
    }), L.MarkerClusterGroup.include({
        _mapBoundsInfinite: new L.LatLngBounds(new L.LatLng(-1 / 0, -1 / 0), new L.LatLng(1 / 0, 1 / 0))
    }), L.MarkerClusterGroup.include({
        _noAnimation: {
            _animationStart: function() {},
            _animationZoomIn: function(a, b) {
                this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), a), 
                this._topClusterLevel._recursivelyAddChildrenToMap(null, b, this._getExpandedVisibleBounds()), 
                this.fire("animationend");
            },
            _animationZoomOut: function(a, b) {
                this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), a), 
                this._topClusterLevel._recursivelyAddChildrenToMap(null, b, this._getExpandedVisibleBounds()), 
                this.fire("animationend");
            },
            _animationAddLayer: function(a, b) {
                this._animationAddLayerNonAnimated(a, b);
            }
        },
        _withAnimation: {
            _animationStart: function() {
                this._map._mapPane.className += " leaflet-cluster-anim", this._inZoomAnimation++;
            },
            _animationZoomIn: function(a, b) {
                var c, d = this._getExpandedVisibleBounds(), e = this._featureGroup, f = Math.floor(this._map.getMinZoom());
                this._ignoreMove = !0, this._topClusterLevel._recursively(d, a, f, function(f) {
                    var g, h = f._latlng, i = f._markers;
                    for (d.contains(h) || (h = null), f._isSingleParent() && a + 1 === b ? (e.removeLayer(f), 
                    f._recursivelyAddChildrenToMap(null, b, d)) : (f.clusterHide(), f._recursivelyAddChildrenToMap(h, b, d)), 
                    c = i.length - 1; c >= 0; c--) g = i[c], d.contains(g._latlng) || e.removeLayer(g);
                }), this._forceLayout(), this._topClusterLevel._recursivelyBecomeVisible(d, b), 
                e.eachLayer(function(a) {
                    a instanceof L.MarkerCluster || !a._icon || a.clusterShow();
                }), this._topClusterLevel._recursively(d, a, b, function(a) {
                    a._recursivelyRestoreChildPositions(b);
                }), this._ignoreMove = !1, this._enqueue(function() {
                    this._topClusterLevel._recursively(d, a, f, function(a) {
                        e.removeLayer(a), a.clusterShow();
                    }), this._animationEnd();
                });
            },
            _animationZoomOut: function(a, b) {
                this._animationZoomOutSingle(this._topClusterLevel, a - 1, b), this._topClusterLevel._recursivelyAddChildrenToMap(null, b, this._getExpandedVisibleBounds()), 
                this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), a, this._getExpandedVisibleBounds());
            },
            _animationAddLayer: function(a, b) {
                var c = this, d = this._featureGroup;
                d.addLayer(a), b !== a && (b._childCount > 2 ? (b._updateIcon(), this._forceLayout(), 
                this._animationStart(), a._setPos(this._map.latLngToLayerPoint(b.getLatLng())), 
                a.clusterHide(), this._enqueue(function() {
                    d.removeLayer(a), a.clusterShow(), c._animationEnd();
                })) : (this._forceLayout(), c._animationStart(), c._animationZoomOutSingle(b, this._map.getMaxZoom(), this._zoom)));
            }
        },
        _animationZoomOutSingle: function(a, b, c) {
            var d = this._getExpandedVisibleBounds(), e = Math.floor(this._map.getMinZoom());
            a._recursivelyAnimateChildrenInAndAddSelfToMap(d, e, b + 1, c);
            var f = this;
            this._forceLayout(), a._recursivelyBecomeVisible(d, c), this._enqueue(function() {
                if (1 === a._childCount) {
                    var g = a._markers[0];
                    this._ignoreMove = !0, g.setLatLng(g.getLatLng()), this._ignoreMove = !1, g.clusterShow && g.clusterShow();
                } else a._recursively(d, c, e, function(a) {
                    a._recursivelyRemoveChildrenFromMap(d, e, b + 1);
                });
                f._animationEnd();
            });
        },
        _animationEnd: function() {
            this._map && (this._map._mapPane.className = this._map._mapPane.className.replace(" leaflet-cluster-anim", "")), 
            this._inZoomAnimation--, this.fire("animationend");
        },
        _forceLayout: function() {
            L.Util.falseFn(b.body.offsetWidth);
        }
    }), L.markerClusterGroup = function(a) {
        return new L.MarkerClusterGroup(a);
    }, L.MarkerCluster = L.Marker.extend({
        initialize: function(a, b, c, d) {
            L.Marker.prototype.initialize.call(this, c ? c._cLatLng || c.getLatLng() : new L.LatLng(0, 0), {
                icon: this,
                pane: a.options.clusterPane
            }), this._group = a, this._zoom = b, this._markers = [], this._childClusters = [], 
            this._childCount = 0, this._iconNeedsUpdate = !0, this._boundsNeedUpdate = !0, this._bounds = new L.LatLngBounds(), 
            c && this._addChild(c), d && this._addChild(d);
        },
        getAllChildMarkers: function(a) {
            a = a || [];
            for (var b = this._childClusters.length - 1; b >= 0; b--) this._childClusters[b].getAllChildMarkers(a);
            for (var c = this._markers.length - 1; c >= 0; c--) a.push(this._markers[c]);
            return a;
        },
        getChildCount: function() {
            return this._childCount;
        },
        zoomToBounds: function(a) {
            for (var b, c = this._childClusters.slice(), d = this._group._map, e = d.getBoundsZoom(this._bounds), f = this._zoom + 1, g = d.getZoom(); c.length > 0 && e > f; ) {
                f++;
                var h = [];
                for (b = 0; b < c.length; b++) h = h.concat(c[b]._childClusters);
                c = h;
            }
            e > f ? this._group._map.setView(this._latlng, f) : g >= e ? this._group._map.setView(this._latlng, g + 1) : this._group._map.fitBounds(this._bounds, a);
        },
        getBounds: function() {
            var a = new L.LatLngBounds();
            return a.extend(this._bounds), a;
        },
        _updateIcon: function() {
            this._iconNeedsUpdate = !0, this._icon && this.setIcon(this);
        },
        createIcon: function() {
            return this._iconNeedsUpdate && (this._iconObj = this._group.options.iconCreateFunction(this), 
            this._iconNeedsUpdate = !1), this._iconObj.createIcon();
        },
        createShadow: function() {
            return this._iconObj.createShadow();
        },
        _addChild: function(a, b) {
            this._iconNeedsUpdate = !0, this._boundsNeedUpdate = !0, this._setClusterCenter(a), 
            a instanceof L.MarkerCluster ? (b || (this._childClusters.push(a), a.__parent = this), 
            this._childCount += a._childCount) : (b || this._markers.push(a), this._childCount++), 
            this.__parent && this.__parent._addChild(a, !0);
        },
        _setClusterCenter: function(a) {
            this._cLatLng || (this._cLatLng = a._cLatLng || a._latlng);
        },
        _resetBounds: function() {
            var a = this._bounds;
            a._southWest && (a._southWest.lat = 1 / 0, a._southWest.lng = 1 / 0), a._northEast && (a._northEast.lat = -1 / 0, 
            a._northEast.lng = -1 / 0);
        },
        _recalculateBounds: function() {
            var a, b, c, d, e = this._markers, f = this._childClusters, g = 0, h = 0, i = this._childCount;
            if (0 !== i) {
                for (this._resetBounds(), a = 0; a < e.length; a++) c = e[a]._latlng, this._bounds.extend(c), 
                g += c.lat, h += c.lng;
                for (a = 0; a < f.length; a++) b = f[a], b._boundsNeedUpdate && b._recalculateBounds(), 
                this._bounds.extend(b._bounds), c = b._wLatLng, d = b._childCount, g += c.lat * d, 
                h += c.lng * d;
                this._latlng = this._wLatLng = new L.LatLng(g / i, h / i), this._boundsNeedUpdate = !1;
            }
        },
        _addToMap: function(a) {
            a && (this._backupLatlng = this._latlng, this.setLatLng(a)), this._group._featureGroup.addLayer(this);
        },
        _recursivelyAnimateChildrenIn: function(a, b, c) {
            this._recursively(a, this._group._map.getMinZoom(), c - 1, function(a) {
                var c, d, e = a._markers;
                for (c = e.length - 1; c >= 0; c--) d = e[c], d._icon && (d._setPos(b), d.clusterHide());
            }, function(a) {
                var c, d, e = a._childClusters;
                for (c = e.length - 1; c >= 0; c--) d = e[c], d._icon && (d._setPos(b), d.clusterHide());
            });
        },
        _recursivelyAnimateChildrenInAndAddSelfToMap: function(a, b, c, d) {
            this._recursively(a, d, b, function(e) {
                e._recursivelyAnimateChildrenIn(a, e._group._map.latLngToLayerPoint(e.getLatLng()).round(), c), 
                e._isSingleParent() && c - 1 === d ? (e.clusterShow(), e._recursivelyRemoveChildrenFromMap(a, b, c)) : e.clusterHide(), 
                e._addToMap();
            });
        },
        _recursivelyBecomeVisible: function(a, b) {
            this._recursively(a, this._group._map.getMinZoom(), b, null, function(a) {
                a.clusterShow();
            });
        },
        _recursivelyAddChildrenToMap: function(a, b, c) {
            this._recursively(c, this._group._map.getMinZoom() - 1, b, function(d) {
                if (b !== d._zoom) for (var e = d._markers.length - 1; e >= 0; e--) {
                    var f = d._markers[e];
                    c.contains(f._latlng) && (a && (f._backupLatlng = f.getLatLng(), f.setLatLng(a), 
                    f.clusterHide && f.clusterHide()), d._group._featureGroup.addLayer(f));
                }
            }, function(b) {
                b._addToMap(a);
            });
        },
        _recursivelyRestoreChildPositions: function(a) {
            for (var b = this._markers.length - 1; b >= 0; b--) {
                var c = this._markers[b];
                c._backupLatlng && (c.setLatLng(c._backupLatlng), delete c._backupLatlng);
            }
            if (a - 1 === this._zoom) for (var d = this._childClusters.length - 1; d >= 0; d--) this._childClusters[d]._restorePosition(); else for (var e = this._childClusters.length - 1; e >= 0; e--) this._childClusters[e]._recursivelyRestoreChildPositions(a);
        },
        _restorePosition: function() {
            this._backupLatlng && (this.setLatLng(this._backupLatlng), delete this._backupLatlng);
        },
        _recursivelyRemoveChildrenFromMap: function(a, b, c, d) {
            var e, f;
            this._recursively(a, b - 1, c - 1, function(a) {
                for (f = a._markers.length - 1; f >= 0; f--) e = a._markers[f], d && d.contains(e._latlng) || (a._group._featureGroup.removeLayer(e), 
                e.clusterShow && e.clusterShow());
            }, function(a) {
                for (f = a._childClusters.length - 1; f >= 0; f--) e = a._childClusters[f], d && d.contains(e._latlng) || (a._group._featureGroup.removeLayer(e), 
                e.clusterShow && e.clusterShow());
            });
        },
        _recursively: function(a, b, c, d, e) {
            var f, g, h = this._childClusters, i = this._zoom;
            if (i >= b && (d && d(this), e && i === c && e(this)), b > i || c > i) for (f = h.length - 1; f >= 0; f--) g = h[f], 
            a.intersects(g._bounds) && g._recursively(a, b, c, d, e);
        },
        _isSingleParent: function() {
            return this._childClusters.length > 0 && this._childClusters[0]._childCount === this._childCount;
        }
    }), L.Marker.include({
        clusterHide: function() {
            return this.options.opacityWhenUnclustered = this.options.opacity || 1, this.setOpacity(0);
        },
        clusterShow: function() {
            var a = this.setOpacity(this.options.opacity || this.options.opacityWhenUnclustered);
            return delete this.options.opacityWhenUnclustered, a;
        }
    }), L.DistanceGrid = function(a) {
        this._cellSize = a, this._sqCellSize = a * a, this._grid = {}, this._objectPoint = {};
    }, L.DistanceGrid.prototype = {
        addObject: function(a, b) {
            var c = this._getCoord(b.x), d = this._getCoord(b.y), e = this._grid, f = e[d] = e[d] || {}, g = f[c] = f[c] || [], h = L.Util.stamp(a);
            this._objectPoint[h] = b, g.push(a);
        },
        updateObject: function(a, b) {
            this.removeObject(a), this.addObject(a, b);
        },
        removeObject: function(a, b) {
            var c, d, e = this._getCoord(b.x), f = this._getCoord(b.y), g = this._grid, h = g[f] = g[f] || {}, i = h[e] = h[e] || [];
            for (delete this._objectPoint[L.Util.stamp(a)], c = 0, d = i.length; d > c; c++) if (i[c] === a) return i.splice(c, 1), 
            1 === d && delete h[e], !0;
        },
        eachObject: function(a, b) {
            var c, d, e, f, g, h, i = this._grid;
            for (c in i) {
                g = i[c];
                for (d in g) for (h = g[d], e = 0, f = h.length; f > e; e++) a.call(b, h[e]) && (e--, 
                f--);
            }
        },
        getNearObject: function(a) {
            var b, c, d, e, f, g, h, i, j = this._getCoord(a.x), k = this._getCoord(a.y), l = this._objectPoint, m = this._sqCellSize, n = null;
            for (b = k - 1; k + 1 >= b; b++) if (e = this._grid[b]) for (c = j - 1; j + 1 >= c; c++) if (f = e[c]) for (d = 0, 
            g = f.length; g > d; d++) h = f[d], i = this._sqDist(l[L.Util.stamp(h)], a), m > i && (m = i, 
            n = h);
            return n;
        },
        _getCoord: function(a) {
            return Math.floor(a / this._cellSize);
        },
        _sqDist: function(a, b) {
            var c = b.x - a.x, d = b.y - a.y;
            return c * c + d * d;
        }
    }, function() {
        L.QuickHull = {
            getDistant: function(a, b) {
                var c = b[1].lat - b[0].lat;
                return (b[0].lng - b[1].lng) * (a.lat - b[0].lat) + c * (a.lng - b[0].lng);
            },
            findMostDistantPointFromBaseLine: function(a, b) {
                var c, d, e, f = 0, g = null, h = [];
                for (c = b.length - 1; c >= 0; c--) d = b[c], (e = this.getDistant(d, a)) > 0 && (h.push(d), 
                e > f && (f = e, g = d));
                return {
                    maxPoint: g,
                    newPoints: h
                };
            },
            buildConvexHull: function(a, b) {
                var c = [], d = this.findMostDistantPointFromBaseLine(a, b);
                return d.maxPoint ? (c = c.concat(this.buildConvexHull([ a[0], d.maxPoint ], d.newPoints)), 
                c = c.concat(this.buildConvexHull([ d.maxPoint, a[1] ], d.newPoints))) : [ a[0] ];
            },
            getConvexHull: function(a) {
                var b, c = !1, d = !1, e = !1, f = !1, g = null, h = null, i = null, j = null, k = null, l = null;
                for (b = a.length - 1; b >= 0; b--) {
                    var m = a[b];
                    (!1 === c || m.lat > c) && (g = m, c = m.lat), (!1 === d || m.lat < d) && (h = m, 
                    d = m.lat), (!1 === e || m.lng > e) && (i = m, e = m.lng), (!1 === f || m.lng < f) && (j = m, 
                    f = m.lng);
                }
                return d !== c ? (l = h, k = g) : (l = j, k = i), [].concat(this.buildConvexHull([ l, k ], a), this.buildConvexHull([ k, l ], a));
            }
        };
    }(), L.MarkerCluster.include({
        getConvexHull: function() {
            var a, b, c = this.getAllChildMarkers(), d = [];
            for (b = c.length - 1; b >= 0; b--) a = c[b].getLatLng(), d.push(a);
            return L.QuickHull.getConvexHull(d);
        }
    }), L.MarkerCluster.include({
        _2PI: 2 * Math.PI,
        _circleFootSeparation: 25,
        _circleStartAngle: Math.PI / 6,
        _spiralFootSeparation: 28,
        _spiralLengthStart: 11,
        _spiralLengthFactor: 5,
        _circleSpiralSwitchover: 9,
        spiderfy: function() {
            if (this._group._spiderfied !== this && !this._group._inZoomAnimation) {
                var a, b = this.getAllChildMarkers(), c = this._group, d = c._map, e = d.latLngToLayerPoint(this._latlng);
                this._group._unspiderfy(), this._group._spiderfied = this, b.length >= this._circleSpiralSwitchover ? a = this._generatePointsSpiral(b.length, e) : (e.y += 10, 
                a = this._generatePointsCircle(b.length, e)), this._animationSpiderfy(b, a);
            }
        },
        unspiderfy: function(a) {
            this._group._inZoomAnimation || (this._animationUnspiderfy(a), this._group._spiderfied = null);
        },
        _generatePointsCircle: function(a, b) {
            var c, d, e = this._group.options.spiderfyDistanceMultiplier * this._circleFootSeparation * (2 + a), f = e / this._2PI, g = this._2PI / a, h = [];
            for (h.length = a, c = a - 1; c >= 0; c--) d = this._circleStartAngle + c * g, h[c] = new L.Point(b.x + f * Math.cos(d), b.y + f * Math.sin(d))._round();
            return h;
        },
        _generatePointsSpiral: function(a, b) {
            var c, d = this._group.options.spiderfyDistanceMultiplier, e = d * this._spiralLengthStart, f = d * this._spiralFootSeparation, g = d * this._spiralLengthFactor * this._2PI, h = 0, i = [];
            for (i.length = a, c = a - 1; c >= 0; c--) h += f / e + 5e-4 * c, i[c] = new L.Point(b.x + e * Math.cos(h), b.y + e * Math.sin(h))._round(), 
            e += g / h;
            return i;
        },
        _noanimationUnspiderfy: function() {
            var a, b, c = this._group, d = c._map, e = c._featureGroup, f = this.getAllChildMarkers();
            for (c._ignoreMove = !0, this.setOpacity(1), b = f.length - 1; b >= 0; b--) a = f[b], 
            e.removeLayer(a), a._preSpiderfyLatlng && (a.setLatLng(a._preSpiderfyLatlng), delete a._preSpiderfyLatlng), 
            a.setZIndexOffset && a.setZIndexOffset(0), a._spiderLeg && (d.removeLayer(a._spiderLeg), 
            delete a._spiderLeg);
            c.fire("unspiderfied", {
                cluster: this,
                markers: f
            }), c._ignoreMove = !1, c._spiderfied = null;
        }
    }), L.MarkerClusterNonAnimated = L.MarkerCluster.extend({
        _animationSpiderfy: function(a, b) {
            var c, d, e, f, g = this._group, h = g._map, i = g._featureGroup, j = this._group.options.spiderLegPolylineOptions;
            for (g._ignoreMove = !0, c = 0; c < a.length; c++) f = h.layerPointToLatLng(b[c]), 
            d = a[c], e = new L.Polyline([ this._latlng, f ], j), h.addLayer(e), d._spiderLeg = e, 
            d._preSpiderfyLatlng = d._latlng, d.setLatLng(f), d.setZIndexOffset && d.setZIndexOffset(1e6), 
            i.addLayer(d);
            this.setOpacity(.3), g._ignoreMove = !1, g.fire("spiderfied", {
                cluster: this,
                markers: a
            });
        },
        _animationUnspiderfy: function() {
            this._noanimationUnspiderfy();
        }
    }), L.MarkerCluster.include({
        _animationSpiderfy: function(a, b) {
            var d, e, f, g, h, i, j = this, k = this._group, l = k._map, m = k._featureGroup, n = this._latlng, o = l.latLngToLayerPoint(n), p = L.Path.SVG, q = L.extend({}, this._group.options.spiderLegPolylineOptions), r = q.opacity;
            for (r === c && (r = L.MarkerClusterGroup.prototype.options.spiderLegPolylineOptions.opacity), 
            p ? (q.opacity = 0, q.className = (q.className || "") + " leaflet-cluster-spider-leg") : q.opacity = r, 
            k._ignoreMove = !0, d = 0; d < a.length; d++) e = a[d], i = l.layerPointToLatLng(b[d]), 
            f = new L.Polyline([ n, i ], q), l.addLayer(f), e._spiderLeg = f, p && (g = f._path, 
            h = g.getTotalLength() + .1, g.style.strokeDasharray = h, g.style.strokeDashoffset = h), 
            e.setZIndexOffset && e.setZIndexOffset(1e6), e.clusterHide && e.clusterHide(), m.addLayer(e), 
            e._setPos && e._setPos(o);
            for (k._forceLayout(), k._animationStart(), d = a.length - 1; d >= 0; d--) i = l.layerPointToLatLng(b[d]), 
            e = a[d], e._preSpiderfyLatlng = e._latlng, e.setLatLng(i), e.clusterShow && e.clusterShow(), 
            p && (f = e._spiderLeg, g = f._path, g.style.strokeDashoffset = 0, f.setStyle({
                opacity: r
            }));
            this.setOpacity(.3), k._ignoreMove = !1, setTimeout(function() {
                k._animationEnd(), k.fire("spiderfied", {
                    cluster: j,
                    markers: a
                });
            }, 200);
        },
        _animationUnspiderfy: function(a) {
            var b, c, d, e, f, g, h = this, i = this._group, j = i._map, k = i._featureGroup, l = a ? j._latLngToNewLayerPoint(this._latlng, a.zoom, a.center) : j.latLngToLayerPoint(this._latlng), m = this.getAllChildMarkers(), n = L.Path.SVG;
            for (i._ignoreMove = !0, i._animationStart(), this.setOpacity(1), c = m.length - 1; c >= 0; c--) b = m[c], 
            b._preSpiderfyLatlng && (b.closePopup(), b.setLatLng(b._preSpiderfyLatlng), delete b._preSpiderfyLatlng, 
            g = !0, b._setPos && (b._setPos(l), g = !1), b.clusterHide && (b.clusterHide(), 
            g = !1), g && k.removeLayer(b), n && (d = b._spiderLeg, e = d._path, f = e.getTotalLength() + .1, 
            e.style.strokeDashoffset = f, d.setStyle({
                opacity: 0
            })));
            i._ignoreMove = !1, setTimeout(function() {
                var a = 0;
                for (c = m.length - 1; c >= 0; c--) b = m[c], b._spiderLeg && a++;
                for (c = m.length - 1; c >= 0; c--) b = m[c], b._spiderLeg && (b.clusterShow && b.clusterShow(), 
                b.setZIndexOffset && b.setZIndexOffset(0), a > 1 && k.removeLayer(b), j.removeLayer(b._spiderLeg), 
                delete b._spiderLeg);
                i._animationEnd(), i.fire("unspiderfied", {
                    cluster: h,
                    markers: m
                });
            }, 200);
        }
    }), L.MarkerClusterGroup.include({
        _spiderfied: null,
        unspiderfy: function() {
            this._unspiderfy.apply(this, arguments);
        },
        _spiderfierOnAdd: function() {
            this._map.on("click", this._unspiderfyWrapper, this), this._map.options.zoomAnimation && this._map.on("zoomstart", this._unspiderfyZoomStart, this), 
            this._map.on("zoomend", this._noanimationUnspiderfy, this), L.Browser.touch || this._map.getRenderer(this);
        },
        _spiderfierOnRemove: function() {
            this._map.off("click", this._unspiderfyWrapper, this), this._map.off("zoomstart", this._unspiderfyZoomStart, this), 
            this._map.off("zoomanim", this._unspiderfyZoomAnim, this), this._map.off("zoomend", this._noanimationUnspiderfy, this), 
            this._noanimationUnspiderfy();
        },
        _unspiderfyZoomStart: function() {
            this._map && this._map.on("zoomanim", this._unspiderfyZoomAnim, this);
        },
        _unspiderfyZoomAnim: function(a) {
            L.DomUtil.hasClass(this._map._mapPane, "leaflet-touching") || (this._map.off("zoomanim", this._unspiderfyZoomAnim, this), 
            this._unspiderfy(a));
        },
        _unspiderfyWrapper: function() {
            this._unspiderfy();
        },
        _unspiderfy: function(a) {
            this._spiderfied && this._spiderfied.unspiderfy(a);
        },
        _noanimationUnspiderfy: function() {
            this._spiderfied && this._spiderfied._noanimationUnspiderfy();
        },
        _unspiderfyLayer: function(a) {
            a._spiderLeg && (this._featureGroup.removeLayer(a), a.clusterShow && a.clusterShow(), 
            a.setZIndexOffset && a.setZIndexOffset(0), this._map.removeLayer(a._spiderLeg), 
            delete a._spiderLeg);
        }
    }), L.MarkerClusterGroup.include({
        refreshClusters: function(a) {
            return a ? a instanceof L.MarkerClusterGroup ? a = a._topClusterLevel.getAllChildMarkers() : a instanceof L.LayerGroup ? a = a._layers : a instanceof L.MarkerCluster ? a = a.getAllChildMarkers() : a instanceof L.Marker && (a = [ a ]) : a = this._topClusterLevel.getAllChildMarkers(), 
            this._flagParentsIconsNeedUpdate(a), this._refreshClustersIcons(), this.options.singleMarkerMode && this._refreshSingleMarkerModeMarkers(a), 
            this;
        },
        _flagParentsIconsNeedUpdate: function(a) {
            var b, c;
            for (b in a) for (c = a[b].__parent; c; ) c._iconNeedsUpdate = !0, c = c.__parent;
        },
        _refreshSingleMarkerModeMarkers: function(a) {
            var b, c;
            for (b in a) c = a[b], this.hasLayer(c) && c.setIcon(this._overrideMarkerIcon(c));
        }
    }), L.Marker.include({
        refreshIconOptions: function(a, b) {
            var c = this.options.icon;
            return L.setOptions(c, a), this.setIcon(c), b && this.__parent && this.__parent._group.refreshClusters(this), 
            this;
        }
    });
}(window, document);