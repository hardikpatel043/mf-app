!(function (t) {
  var e = {};
  function n(i) {
    if (e[i]) return e[i].exports;
    var r = (e[i] = { i, l: !1, exports: {} });
    return t[i].call(r.exports, r, r.exports, n), (r.l = !0), r.exports;
  }
  (n.m = t),
    (n.c = e),
    (n.d = function (t, e, i) {
      n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: i });
    }),
    (n.r = function (t) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(t, '__esModule', { value: !0 });
    }),
    (n.t = function (t, e) {
      if ((1 & e && (t = n(t)), 8 & e)) return t;
      if (4 & e && 'object' == typeof t && t && t.__esModule) return t;
      var i = Object.create(null);
      if (
        (n.r(i),
        Object.defineProperty(i, 'default', { enumerable: !0, value: t }),
        2 & e && 'string' != typeof t)
      )
        for (var r in t)
          n.d(
            i,
            r,
            function (e) {
              return t[e];
            }.bind(null, r)
          );
      return i;
    }),
    (n.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return n.d(e, 'a', e), e;
    }),
    (n.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (n.p = ''),
    n((n.s = 0));
})({
  0: function (t, e, n) {
    t.exports = n('zUnb');
  },
  '0S4P': function (t, e) {
    t.exports = ng.common;
  },
  Fqor: function (t, e) {
    t.exports = ag.grid.angular;
  },
  JAnZ: function (t, e) {
    t.exports = ng.router;
  },
  Vgaj: function (t, e) {
    t.exports = rxjs;
  },
  'g/Wr': function (t, e) {
    t.exports = ng.elements;
  },
  'vG+p': function (t, e) {
    t.exports = ng.platformBrowser;
  },
  vOrQ: function (t, e) {
    t.exports = ng.core;
  },
  zUnb: function (t, e, n) {
    'use strict';
    n.r(e);
    var i = n('vOrQ'),
      r = n('Fqor'),
      s = n('0S4P'),
      o = n('Vgaj');
    function a(t) {
      return 'function' == typeof t;
    }
    let c = !1;
    const l = {
      Promise: void 0,
      set useDeprecatedSynchronousErrorHandling(t) {
        if (t) {
          const t = new Error();
          console.warn(
            'DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n' +
              t.stack
          );
        } else
          c &&
            console.log('RxJS: Back to a better error behavior. Thank you. <3');
        c = t;
      },
      get useDeprecatedSynchronousErrorHandling() {
        return c;
      },
    };
    function u(t) {
      setTimeout(() => {
        throw t;
      }, 0);
    }
    const d = {
        closed: !0,
        next(t) {},
        error(t) {
          if (l.useDeprecatedSynchronousErrorHandling) throw t;
          u(t);
        },
        complete() {},
      },
      h = (() => Array.isArray || ((t) => t && 'number' == typeof t.length))();
    function p(t) {
      return null !== t && 'object' == typeof t;
    }
    const m = (() => {
      function t(t) {
        return (
          Error.call(this),
          (this.message = t
            ? `${t.length} errors occurred during unsubscription:\n${t
                .map((t, e) => `${e + 1}) ${t.toString()}`)
                .join('\n  ')}`
            : ''),
          (this.name = 'UnsubscriptionError'),
          (this.errors = t),
          this
        );
      }
      return (t.prototype = Object.create(Error.prototype)), t;
    })();
    let f = (() => {
      class t {
        constructor(t) {
          (this.closed = !1),
            (this._parentOrParents = null),
            (this._subscriptions = null),
            t && (this._unsubscribe = t);
        }
        unsubscribe() {
          let e;
          if (this.closed) return;
          let {
            _parentOrParents: n,
            _unsubscribe: i,
            _subscriptions: r,
          } = this;
          if (
            ((this.closed = !0),
            (this._parentOrParents = null),
            (this._subscriptions = null),
            n instanceof t)
          )
            n.remove(this);
          else if (null !== n)
            for (let t = 0; t < n.length; ++t) n[t].remove(this);
          if (a(i))
            try {
              i.call(this);
            } catch (s) {
              e = s instanceof m ? b(s.errors) : [s];
            }
          if (h(r)) {
            let t = -1,
              n = r.length;
            for (; ++t < n; ) {
              const n = r[t];
              if (p(n))
                try {
                  n.unsubscribe();
                } catch (s) {
                  (e = e || []),
                    s instanceof m ? (e = e.concat(b(s.errors))) : e.push(s);
                }
            }
          }
          if (e) throw new m(e);
        }
        add(e) {
          let n = e;
          if (!e) return t.EMPTY;
          switch (typeof e) {
            case 'function':
              n = new t(e);
            case 'object':
              if (n === this || n.closed || 'function' != typeof n.unsubscribe)
                return n;
              if (this.closed) return n.unsubscribe(), n;
              if (!(n instanceof t)) {
                const e = n;
                (n = new t()), (n._subscriptions = [e]);
              }
              break;
            default:
              throw new Error(
                'unrecognized teardown ' + e + ' added to Subscription.'
              );
          }
          let { _parentOrParents: i } = n;
          if (null === i) n._parentOrParents = this;
          else if (i instanceof t) {
            if (i === this) return n;
            n._parentOrParents = [i, this];
          } else {
            if (-1 !== i.indexOf(this)) return n;
            i.push(this);
          }
          const r = this._subscriptions;
          return null === r ? (this._subscriptions = [n]) : r.push(n), n;
        }
        remove(t) {
          const e = this._subscriptions;
          if (e) {
            const n = e.indexOf(t);
            -1 !== n && e.splice(n, 1);
          }
        }
      }
      return (
        (t.EMPTY = (function (t) {
          return (t.closed = !0), t;
        })(new t())),
        t
      );
    })();
    function b(t) {
      return t.reduce((t, e) => t.concat(e instanceof m ? e.errors : e), []);
    }
    const g = (() =>
      'function' == typeof Symbol
        ? Symbol('rxSubscriber')
        : '@@rxSubscriber_' + Math.random())();
    class y extends f {
      constructor(t, e, n) {
        switch (
          (super(),
          (this.syncErrorValue = null),
          (this.syncErrorThrown = !1),
          (this.syncErrorThrowable = !1),
          (this.isStopped = !1),
          arguments.length)
        ) {
          case 0:
            this.destination = d;
            break;
          case 1:
            if (!t) {
              this.destination = d;
              break;
            }
            if ('object' == typeof t) {
              t instanceof y
                ? ((this.syncErrorThrowable = t.syncErrorThrowable),
                  (this.destination = t),
                  t.add(this))
                : ((this.syncErrorThrowable = !0),
                  (this.destination = new x(this, t)));
              break;
            }
          default:
            (this.syncErrorThrowable = !0),
              (this.destination = new x(this, t, e, n));
        }
      }
      [g]() {
        return this;
      }
      static create(t, e, n) {
        const i = new y(t, e, n);
        return (i.syncErrorThrowable = !1), i;
      }
      next(t) {
        this.isStopped || this._next(t);
      }
      error(t) {
        this.isStopped || ((this.isStopped = !0), this._error(t));
      }
      complete() {
        this.isStopped || ((this.isStopped = !0), this._complete());
      }
      unsubscribe() {
        this.closed || ((this.isStopped = !0), super.unsubscribe());
      }
      _next(t) {
        this.destination.next(t);
      }
      _error(t) {
        this.destination.error(t), this.unsubscribe();
      }
      _complete() {
        this.destination.complete(), this.unsubscribe();
      }
      _unsubscribeAndRecycle() {
        const { _parentOrParents: t } = this;
        return (
          (this._parentOrParents = null),
          this.unsubscribe(),
          (this.closed = !1),
          (this.isStopped = !1),
          (this._parentOrParents = t),
          this
        );
      }
    }
    class x extends y {
      constructor(t, e, n, i) {
        let r;
        super(), (this._parentSubscriber = t);
        let s = this;
        a(e)
          ? (r = e)
          : e &&
            ((r = e.next),
            (n = e.error),
            (i = e.complete),
            e !== d &&
              ((s = Object.create(e)),
              a(s.unsubscribe) && this.add(s.unsubscribe.bind(s)),
              (s.unsubscribe = this.unsubscribe.bind(this)))),
          (this._context = s),
          (this._next = r),
          (this._error = n),
          (this._complete = i);
      }
      next(t) {
        if (!this.isStopped && this._next) {
          const { _parentSubscriber: e } = this;
          l.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable
            ? this.__tryOrSetError(e, this._next, t) && this.unsubscribe()
            : this.__tryOrUnsub(this._next, t);
        }
      }
      error(t) {
        if (!this.isStopped) {
          const { _parentSubscriber: e } = this,
            { useDeprecatedSynchronousErrorHandling: n } = l;
          if (this._error)
            n && e.syncErrorThrowable
              ? (this.__tryOrSetError(e, this._error, t), this.unsubscribe())
              : (this.__tryOrUnsub(this._error, t), this.unsubscribe());
          else if (e.syncErrorThrowable)
            n ? ((e.syncErrorValue = t), (e.syncErrorThrown = !0)) : u(t),
              this.unsubscribe();
          else {
            if ((this.unsubscribe(), n)) throw t;
            u(t);
          }
        }
      }
      complete() {
        if (!this.isStopped) {
          const { _parentSubscriber: t } = this;
          if (this._complete) {
            const e = () => this._complete.call(this._context);
            l.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable
              ? (this.__tryOrSetError(t, e), this.unsubscribe())
              : (this.__tryOrUnsub(e), this.unsubscribe());
          } else this.unsubscribe();
        }
      }
      __tryOrUnsub(t, e) {
        try {
          t.call(this._context, e);
        } catch (n) {
          if ((this.unsubscribe(), l.useDeprecatedSynchronousErrorHandling))
            throw n;
          u(n);
        }
      }
      __tryOrSetError(t, e, n) {
        if (!l.useDeprecatedSynchronousErrorHandling)
          throw new Error('bad call');
        try {
          e.call(this._context, n);
        } catch (i) {
          return l.useDeprecatedSynchronousErrorHandling
            ? ((t.syncErrorValue = i), (t.syncErrorThrown = !0), !0)
            : (u(i), !0);
        }
        return !1;
      }
      _unsubscribe() {
        const { _parentSubscriber: t } = this;
        (this._context = null),
          (this._parentSubscriber = null),
          t.unsubscribe();
      }
    }
    function v(t, e) {
      return function (n) {
        return n.lift(new _(t, e));
      };
    }
    class _ {
      constructor(t, e) {
        (this.predicate = t), (this.thisArg = e);
      }
      call(t, e) {
        return e.subscribe(new w(t, this.predicate, this.thisArg));
      }
    }
    class w extends y {
      constructor(t, e, n) {
        super(t), (this.predicate = e), (this.thisArg = n), (this.count = 0);
      }
      _next(t) {
        let e;
        try {
          e = this.predicate.call(this.thisArg, t, this.count++);
        } catch (n) {
          return void this.destination.error(n);
        }
        e && this.destination.next(t);
      }
    }
    class E extends y {
      notifyNext(t, e, n, i, r) {
        this.destination.next(e);
      }
      notifyError(t, e) {
        this.destination.error(t);
      }
      notifyComplete(t) {
        this.destination.complete();
      }
    }
    class k extends y {
      constructor(t, e, n) {
        super(),
          (this.parent = t),
          (this.outerValue = e),
          (this.outerIndex = n),
          (this.index = 0);
      }
      _next(t) {
        this.parent.notifyNext(
          this.outerValue,
          t,
          this.outerIndex,
          this.index++,
          this
        );
      }
      _error(t) {
        this.parent.notifyError(t, this), this.unsubscribe();
      }
      _complete() {
        this.parent.notifyComplete(this), this.unsubscribe();
      }
    }
    function j() {
      return 'function' == typeof Symbol && Symbol.iterator
        ? Symbol.iterator
        : '@@iterator';
    }
    const L = j(),
      A = (() =>
        ('function' == typeof Symbol && Symbol.observable) || '@@observable')();
    function O(t) {
      return t;
    }
    let T = (() => {
      class t {
        constructor(t) {
          (this._isScalar = !1), t && (this._subscribe = t);
        }
        lift(e) {
          const n = new t();
          return (n.source = this), (n.operator = e), n;
        }
        subscribe(t, e, n) {
          const { operator: i } = this,
            r = (function (t, e, n) {
              if (t) {
                if (t instanceof y) return t;
                if (t[g]) return t[g]();
              }
              return t || e || n ? new y(t, e, n) : new y(d);
            })(t, e, n);
          if (
            (r.add(
              i
                ? i.call(r, this.source)
                : this.source ||
                  (l.useDeprecatedSynchronousErrorHandling &&
                    !r.syncErrorThrowable)
                ? this._subscribe(r)
                : this._trySubscribe(r)
            ),
            l.useDeprecatedSynchronousErrorHandling &&
              r.syncErrorThrowable &&
              ((r.syncErrorThrowable = !1), r.syncErrorThrown))
          )
            throw r.syncErrorValue;
          return r;
        }
        _trySubscribe(t) {
          try {
            return this._subscribe(t);
          } catch (e) {
            l.useDeprecatedSynchronousErrorHandling &&
              ((t.syncErrorThrown = !0), (t.syncErrorValue = e)),
              (function (t) {
                for (; t; ) {
                  const { closed: e, destination: n, isStopped: i } = t;
                  if (e || i) return !1;
                  t = n && n instanceof y ? n : null;
                }
                return !0;
              })(t)
                ? t.error(e)
                : console.warn(e);
          }
        }
        forEach(t, e) {
          return new (e = S(e))((e, n) => {
            let i;
            i = this.subscribe(
              (e) => {
                try {
                  t(e);
                } catch (r) {
                  n(r), i && i.unsubscribe();
                }
              },
              n,
              e
            );
          });
        }
        _subscribe(t) {
          const { source: e } = this;
          return e && e.subscribe(t);
        }
        [A]() {
          return this;
        }
        pipe(...t) {
          return 0 === t.length
            ? this
            : (0 === (e = t).length
                ? O
                : 1 === e.length
                ? e[0]
                : function (t) {
                    return e.reduce((t, e) => e(t), t);
                  })(this);
          var e;
        }
        toPromise(t) {
          return new (t = S(t))((t, e) => {
            let n;
            this.subscribe(
              (t) => (n = t),
              (t) => e(t),
              () => t(n)
            );
          });
        }
      }
      return (t.create = (e) => new t(e)), t;
    })();
    function S(t) {
      if ((t || (t = l.Promise || Promise), !t))
        throw new Error('no Promise impl found');
      return t;
    }
    class I {
      constructor(t) {
        this.notifier = t;
      }
      call(t, e) {
        const n = new C(t),
          i = (function (t, e, n, i, r = new k(t, n, i)) {
            if (!r.closed)
              return e instanceof T
                ? e.subscribe(r)
                : ((t) => {
                    if (t && 'function' == typeof t[A])
                      return (
                        (o = t),
                        (t) => {
                          const e = o[A]();
                          if ('function' != typeof e.subscribe)
                            throw new TypeError(
                              'Provided object does not correctly implement Symbol.observable'
                            );
                          return e.subscribe(t);
                        }
                      );
                    if (
                      (n = t) &&
                      'number' == typeof n.length &&
                      'function' != typeof n
                    )
                      return (
                        (e = t),
                        (t) => {
                          for (let n = 0, i = e.length; n < i && !t.closed; n++)
                            t.next(e[n]);
                          t.complete();
                        }
                      );
                    var e, n, i, r, s, o;
                    if (
                      (i = t) &&
                      'function' != typeof i.subscribe &&
                      'function' == typeof i.then
                    )
                      return (
                        (s = t),
                        (t) => (
                          s
                            .then(
                              (e) => {
                                t.closed || (t.next(e), t.complete());
                              },
                              (e) => t.error(e)
                            )
                            .then(null, u),
                          t
                        )
                      );
                    if (t && 'function' == typeof t[L])
                      return (
                        (r = t),
                        (t) => {
                          const e = r[L]();
                          for (;;) {
                            const n = e.next();
                            if (n.done) {
                              t.complete();
                              break;
                            }
                            if ((t.next(n.value), t.closed)) break;
                          }
                          return (
                            'function' == typeof e.return &&
                              t.add(() => {
                                e.return && e.return();
                              }),
                            t
                          );
                        }
                      );
                    {
                      const e = p(t) ? 'an invalid object' : `'${t}'`;
                      throw new TypeError(
                        `You provided ${e} where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.`
                      );
                    }
                  })(e)(r);
          })(n, this.notifier);
        return i && !n.seenValue ? (n.add(i), e.subscribe(n)) : n;
      }
    }
    class C extends E {
      constructor(t) {
        super(t), (this.seenValue = !1);
      }
      notifyNext(t, e, n, i, r) {
        (this.seenValue = !0), this.complete();
      }
      notifyComplete() {}
    }
    function M() {}
    class D {
      constructor(t, e, n) {
        (this.nextOrObserver = t), (this.error = e), (this.complete = n);
      }
      call(t, e) {
        return e.subscribe(
          new P(t, this.nextOrObserver, this.error, this.complete)
        );
      }
    }
    class P extends y {
      constructor(t, e, n, i) {
        super(t),
          (this._tapNext = M),
          (this._tapError = M),
          (this._tapComplete = M),
          (this._tapError = n || M),
          (this._tapComplete = i || M),
          a(e)
            ? ((this._context = this), (this._tapNext = e))
            : e &&
              ((this._context = e),
              (this._tapNext = e.next || M),
              (this._tapError = e.error || M),
              (this._tapComplete = e.complete || M));
      }
      _next(t) {
        try {
          this._tapNext.call(this._context, t);
        } catch (e) {
          return void this.destination.error(e);
        }
        this.destination.next(t);
      }
      _error(t) {
        try {
          this._tapError.call(this._context, t);
        } catch (t) {
          return void this.destination.error(t);
        }
        this.destination.error(t);
      }
      _complete() {
        try {
          this._tapComplete.call(this._context);
        } catch (t) {
          return void this.destination.error(t);
        }
        return this.destination.complete();
      }
    }
    const R = {
        provide: i.APP_BOOTSTRAP_LISTENER,
        useFactory: function (t, e) {
          return () => {
            if (Object(s.isPlatformBrowser)(e)) {
              const e = Array.from(t.querySelectorAll(`[class*=${B}]`)),
                n = /\bflex-layout-.+?\b/g;
              e.forEach((t) => {
                t.classList.contains(B + 'ssr') && t.parentNode
                  ? t.parentNode.removeChild(t)
                  : t.className.replace(n, '');
              });
            }
          };
        },
        deps: [s.DOCUMENT, i.PLATFORM_ID],
        multi: !0,
      },
      B = 'flex-layout-';
    let N = (() => {
      class t {}
      return (
        (t.ɵmod = i['\u0275\u0275defineNgModule']({ type: t })),
        (t.ɵinj = i['\u0275\u0275defineInjector']({
          factory: function (e) {
            return new (e || t)();
          },
          providers: [R],
        })),
        t
      );
    })();
    class V {
      constructor(t = !1, e = 'all', n = '', i = '', r = 0) {
        (this.matches = t),
          (this.mediaQuery = e),
          (this.mqAlias = n),
          (this.suffix = i),
          (this.priority = r),
          (this.property = '');
      }
      clone() {
        return new V(this.matches, this.mediaQuery, this.mqAlias, this.suffix);
      }
    }
    let F = (() => {
      class t {
        constructor() {
          this.stylesheet = new Map();
        }
        addStyleToElement(t, e, n) {
          const i = this.stylesheet.get(t);
          i ? i.set(e, n) : this.stylesheet.set(t, new Map([[e, n]]));
        }
        clearStyles() {
          this.stylesheet.clear();
        }
        getStyleForElement(t, e) {
          const n = this.stylesheet.get(t);
          let i = '';
          if (n) {
            const t = n.get(e);
            ('number' != typeof t && 'string' != typeof t) || (i = t + '');
          }
          return i;
        }
      }
      return (
        (t.ɵfac = function (e) {
          return new (e || t)();
        }),
        (t.ɵprov = Object(i['\u0275\u0275defineInjectable'])({
          factory: function () {
            return new t();
          },
          token: t,
          providedIn: 'root',
        })),
        t
      );
    })();
    const Q = {
        addFlexToParent: !0,
        addOrientationBps: !1,
        disableDefaultBps: !1,
        disableVendorPrefixes: !1,
        serverLoaded: !1,
        useColumnBasisZero: !0,
        printWithBreakpoints: [],
        mediaTriggerAutoRestore: !0,
        ssrObserveBreakpoints: [],
      },
      z = new i.InjectionToken(
        'Flex Layout token, config options for the library',
        { providedIn: 'root', factory: () => Q }
      ),
      H = new i.InjectionToken('FlexLayoutServerLoaded', {
        providedIn: 'root',
        factory: () => !1,
      }),
      W = new i.InjectionToken(
        'Flex Layout token, collect all breakpoints into one provider',
        { providedIn: 'root', factory: () => null }
      );
    function U(t, e) {
      return (
        (t = t ? t.clone() : new V()),
        e &&
          ((t.mqAlias = e.alias),
          (t.mediaQuery = e.mediaQuery),
          (t.suffix = e.suffix),
          (t.priority = e.priority)),
        t
      );
    }
    const K = ['row', 'column', 'row-reverse', 'column-reverse'];
    function Z(t) {
      if (t)
        switch (t.toLowerCase()) {
          case 'reverse':
          case 'wrap-reverse':
          case 'reverse-wrap':
            t = 'wrap-reverse';
            break;
          case 'no':
          case 'none':
          case 'nowrap':
            t = 'nowrap';
            break;
          default:
            t = 'wrap';
        }
      return t;
    }
    let $ = (() => {
      class t {
        constructor(t, e, n, i) {
          (this.elementRef = t),
            (this.styleBuilder = e),
            (this.styler = n),
            (this.marshal = i),
            (this.DIRECTIVE_KEY = ''),
            (this.inputs = []),
            (this.mru = {}),
            (this.destroySubject = new o.Subject()),
            (this.styleCache = new Map());
        }
        get parentElement() {
          return this.elementRef.nativeElement.parentElement;
        }
        get nativeElement() {
          return this.elementRef.nativeElement;
        }
        get activatedValue() {
          return this.marshal.getValue(this.nativeElement, this.DIRECTIVE_KEY);
        }
        set activatedValue(t) {
          this.marshal.setValue(
            this.nativeElement,
            this.DIRECTIVE_KEY,
            t,
            this.marshal.activatedAlias
          );
        }
        ngOnChanges(t) {
          Object.keys(t).forEach((e) => {
            if (-1 !== this.inputs.indexOf(e)) {
              const n = e.split('.').slice(1).join('.');
              this.setValue(t[e].currentValue, n);
            }
          });
        }
        ngOnDestroy() {
          this.destroySubject.next(),
            this.destroySubject.complete(),
            this.marshal.releaseElement(this.nativeElement);
        }
        init(t = []) {
          this.marshal.init(
            this.elementRef.nativeElement,
            this.DIRECTIVE_KEY,
            this.updateWithValue.bind(this),
            this.clearStyles.bind(this),
            t
          );
        }
        addStyles(t, e) {
          const n = this.styleBuilder,
            i = n.shouldCache;
          let r = this.styleCache.get(t);
          (r && i) ||
            ((r = n.buildStyles(t, e)), i && this.styleCache.set(t, r)),
            (this.mru = Object.assign({}, r)),
            this.applyStyleToElement(r),
            n.sideEffect(t, r, e);
        }
        clearStyles() {
          Object.keys(this.mru).forEach((t) => {
            this.mru[t] = '';
          }),
            this.applyStyleToElement(this.mru),
            (this.mru = {});
        }
        triggerUpdate() {
          this.marshal.triggerUpdate(this.nativeElement, this.DIRECTIVE_KEY);
        }
        getFlexFlowDirection(t, e = !1) {
          if (t) {
            const [n, i] = this.styler.getFlowDirection(t);
            if (!i && e) {
              const e = (function (t) {
                let [e, n, i] = (function (t) {
                  t = t ? t.toLowerCase() : '';
                  let [e, n, i] = t.split(' ');
                  return (
                    K.find((t) => t === e) || (e = K[0]),
                    'inline' === n &&
                      ((n = 'inline' !== i ? i : ''), (i = 'inline')),
                    [e, Z(n), !!i]
                  );
                })(t);
                return (function (t, e = null, n = !1) {
                  return {
                    display: n ? 'inline-flex' : 'flex',
                    'box-sizing': 'border-box',
                    'flex-direction': t,
                    'flex-wrap': e || null,
                  };
                })(e, n, i);
              })(n);
              this.styler.applyStyleToElements(e, [t]);
            }
            return n.trim();
          }
          return 'row';
        }
        hasWrap(t) {
          return this.styler.hasWrap(t);
        }
        applyStyleToElement(t, e, n = this.nativeElement) {
          this.styler.applyStyleToElement(n, t, e);
        }
        setValue(t, e) {
          this.marshal.setValue(this.nativeElement, this.DIRECTIVE_KEY, t, e);
        }
        updateWithValue(t) {
          this.currentValue !== t &&
            (this.addStyles(t), (this.currentValue = t));
        }
      }
      return (
        (t.ɵfac = function (t) {
          i['\u0275\u0275invalidFactory']();
        }),
        (t.ɵdir = i['\u0275\u0275defineDirective']({
          type: t,
          features: [i['\u0275\u0275NgOnChangesFeature']],
        })),
        t
      );
    })();
    const G = [
        {
          alias: 'xs',
          mediaQuery: 'screen and (min-width: 0px) and (max-width: 599.9px)',
          priority: 1e3,
        },
        {
          alias: 'sm',
          mediaQuery: 'screen and (min-width: 600px) and (max-width: 959.9px)',
          priority: 900,
        },
        {
          alias: 'md',
          mediaQuery: 'screen and (min-width: 960px) and (max-width: 1279.9px)',
          priority: 800,
        },
        {
          alias: 'lg',
          mediaQuery:
            'screen and (min-width: 1280px) and (max-width: 1919.9px)',
          priority: 700,
        },
        {
          alias: 'xl',
          mediaQuery:
            'screen and (min-width: 1920px) and (max-width: 4999.9px)',
          priority: 600,
        },
        {
          alias: 'lt-sm',
          overlapping: !0,
          mediaQuery: 'screen and (max-width: 599.9px)',
          priority: 950,
        },
        {
          alias: 'lt-md',
          overlapping: !0,
          mediaQuery: 'screen and (max-width: 959.9px)',
          priority: 850,
        },
        {
          alias: 'lt-lg',
          overlapping: !0,
          mediaQuery: 'screen and (max-width: 1279.9px)',
          priority: 750,
        },
        {
          alias: 'lt-xl',
          overlapping: !0,
          priority: 650,
          mediaQuery: 'screen and (max-width: 1919.9px)',
        },
        {
          alias: 'gt-xs',
          overlapping: !0,
          mediaQuery: 'screen and (min-width: 600px)',
          priority: -950,
        },
        {
          alias: 'gt-sm',
          overlapping: !0,
          mediaQuery: 'screen and (min-width: 960px)',
          priority: -850,
        },
        {
          alias: 'gt-md',
          overlapping: !0,
          mediaQuery: 'screen and (min-width: 1280px)',
          priority: -750,
        },
        {
          alias: 'gt-lg',
          overlapping: !0,
          mediaQuery: 'screen and (min-width: 1920px)',
          priority: -650,
        },
      ],
      Y =
        '(orientation: portrait) and (min-width: 600px) and (max-width: 839.9px)',
      q =
        '(orientation: landscape) and (min-width: 960px) and (max-width: 1279.9px)',
      J = '(orientation: portrait) and (min-width: 840px)',
      X = '(orientation: landscape) and (min-width: 1280px)',
      tt = {
        HANDSET:
          '(orientation: portrait) and (max-width: 599.9px), (orientation: landscape) and (max-width: 959.9px)',
        TABLET: `${Y} , ${q}`,
        WEB: `${J}, ${X} `,
        HANDSET_PORTRAIT: '(orientation: portrait) and (max-width: 599.9px)',
        TABLET_PORTRAIT: Y + ' ',
        WEB_PORTRAIT: '' + J,
        HANDSET_LANDSCAPE: '(orientation: landscape) and (max-width: 959.9px)',
        TABLET_LANDSCAPE: '' + q,
        WEB_LANDSCAPE: '' + X,
      },
      et = [
        { alias: 'handset', priority: 2e3, mediaQuery: tt.HANDSET },
        {
          alias: 'handset.landscape',
          priority: 2e3,
          mediaQuery: tt.HANDSET_LANDSCAPE,
        },
        {
          alias: 'handset.portrait',
          priority: 2e3,
          mediaQuery: tt.HANDSET_PORTRAIT,
        },
        { alias: 'tablet', priority: 2100, mediaQuery: tt.TABLET },
        {
          alias: 'tablet.landscape',
          priority: 2100,
          mediaQuery: tt.TABLET_LANDSCAPE,
        },
        {
          alias: 'tablet.portrait',
          priority: 2100,
          mediaQuery: tt.TABLET_PORTRAIT,
        },
        { alias: 'web', priority: 2200, mediaQuery: tt.WEB, overlapping: !0 },
        {
          alias: 'web.landscape',
          priority: 2200,
          mediaQuery: tt.WEB_LANDSCAPE,
          overlapping: !0,
        },
        {
          alias: 'web.portrait',
          priority: 2200,
          mediaQuery: tt.WEB_PORTRAIT,
          overlapping: !0,
        },
      ],
      nt = /(\.|-|_)/g;
    function it(t) {
      let e = t.length > 0 ? t.charAt(0) : '',
        n = t.length > 1 ? t.slice(1) : '';
      return e.toUpperCase() + n;
    }
    const rt = new i.InjectionToken(
      'Token (@angular/flex-layout) Breakpoints',
      {
        providedIn: 'root',
        factory: () => {
          const t = Object(i.inject)(W),
            e = Object(i.inject)(z),
            n = [].concat.apply(
              [],
              (t || []).map((t) => (Array.isArray(t) ? t : [t]))
            );
          return (function (t, e = []) {
            const n = {};
            return (
              t.forEach((t) => {
                n[t.alias] = t;
              }),
              e.forEach((t) => {
                n[t.alias]
                  ? (function (t, ...e) {
                      if (null == t)
                        throw TypeError(
                          'Cannot convert undefined or null to object'
                        );
                      for (let n of e)
                        if (null != n)
                          for (let e in n) n.hasOwnProperty(e) && (t[e] = n[e]);
                    })(n[t.alias], t)
                  : (n[t.alias] = t);
              }),
              (i = Object.keys(n).map((t) => n[t])).forEach((t) => {
                t.suffix ||
                  ((t.suffix = t.alias
                    .replace(nt, '|')
                    .split('|')
                    .map(it)
                    .join('')),
                  (t.overlapping = !!t.overlapping));
              }),
              i
            );
            var i;
          })(
            (e.disableDefaultBps ? [] : G).concat(
              e.addOrientationBps ? et : []
            ),
            n
          );
        },
      }
    );
    function st(t, e) {
      return ((e && e.priority) || 0) - ((t && t.priority) || 0);
    }
    function ot(t, e) {
      return (t.priority || 0) - (e.priority || 0);
    }
    let at = (() => {
        class t {
          constructor(t) {
            (this.findByMap = new Map()), (this.items = [...t].sort(ot));
          }
          findByAlias(t) {
            return t ? this.findWithPredicate(t, (e) => e.alias == t) : null;
          }
          findByQuery(t) {
            return this.findWithPredicate(t, (e) => e.mediaQuery == t);
          }
          get overlappings() {
            return this.items.filter((t) => 1 == t.overlapping);
          }
          get aliases() {
            return this.items.map((t) => t.alias);
          }
          get suffixes() {
            return this.items.map((t) => (t.suffix ? t.suffix : ''));
          }
          findWithPredicate(t, e) {
            let n = this.findByMap.get(t);
            return (
              n || ((n = this.items.find(e) || null), this.findByMap.set(t, n)),
              n || null
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(i['\u0275\u0275inject'](rt));
          }),
          (t.ɵprov = Object(i['\u0275\u0275defineInjectable'])({
            factory: function () {
              return new t(Object(i['\u0275\u0275inject'])(rt));
            },
            token: t,
            providedIn: 'root',
          })),
          t
        );
      })(),
      ct = (() => {
        class t {
          constructor(t, e, n) {
            (this._zone = t),
              (this._platformId = e),
              (this._document = n),
              (this.source = new o.BehaviorSubject(new V(!0))),
              (this.registry = new Map()),
              (this.pendingRemoveListenerFns = []),
              (this._observable$ = this.source.asObservable());
          }
          get activations() {
            const t = [];
            return (
              this.registry.forEach((e, n) => {
                e.matches && t.push(n);
              }),
              t
            );
          }
          isActive(t) {
            const e = this.registry.get(t);
            return e ? e.matches : this.registerQuery(t).some((t) => t.matches);
          }
          observe(t, e = !1) {
            if (t && t.length) {
              const n = this._observable$.pipe(
                  v((n) => !e || t.indexOf(n.mediaQuery) > -1)
                ),
                i = new o.Observable((e) => {
                  const n = this.registerQuery(t);
                  if (n.length) {
                    const t = n.pop();
                    n.forEach((t) => {
                      e.next(t);
                    }),
                      this.source.next(t);
                  }
                  e.complete();
                });
              return Object(o.merge)(i, n);
            }
            return this._observable$;
          }
          registerQuery(t) {
            const e = Array.isArray(t) ? t : [t],
              n = [];
            return (
              (function (t, e) {
                const n = t.filter((t) => !lt[t]);
                if (n.length > 0) {
                  const t = n.join(', ');
                  try {
                    const i = e.createElement('style');
                    i.setAttribute('type', 'text/css'),
                      i.styleSheet ||
                        i.appendChild(
                          e.createTextNode(
                            `\n/*\n  @angular/flex-layout - workaround for possible browser quirk with mediaQuery listeners\n  see http://bit.ly/2sd4HMP\n*/\n@media ${t} {.fx-query-test{ }}\n`
                          )
                        ),
                      e.head.appendChild(i),
                      n.forEach((t) => (lt[t] = i));
                  } catch (i) {
                    console.error(i);
                  }
                }
              })(e, this._document),
              e.forEach((t) => {
                const e = (e) => {
                  this._zone.run(() => this.source.next(new V(e.matches, t)));
                };
                let i = this.registry.get(t);
                i ||
                  ((i = this.buildMQL(t)),
                  i.addListener(e),
                  this.pendingRemoveListenerFns.push(() => i.removeListener(e)),
                  this.registry.set(t, i)),
                  i.matches && n.push(new V(!0, t));
              }),
              n
            );
          }
          ngOnDestroy() {
            let t;
            for (; (t = this.pendingRemoveListenerFns.pop()); ) t();
          }
          buildMQL(t) {
            return (function (t, e) {
              return e && window.matchMedia('all').addListener
                ? window.matchMedia(t)
                : {
                    matches: 'all' === t || '' === t,
                    media: t,
                    addListener: () => {},
                    removeListener: () => {},
                    onchange: null,
                    addEventListener() {},
                    removeEventListener() {},
                    dispatchEvent: () => !1,
                  };
            })(t, Object(s.isPlatformBrowser)(this._platformId));
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(
              i['\u0275\u0275inject'](i.NgZone),
              i['\u0275\u0275inject'](i.PLATFORM_ID),
              i['\u0275\u0275inject'](s.DOCUMENT)
            );
          }),
          (t.ɵprov = Object(i['\u0275\u0275defineInjectable'])({
            factory: function () {
              return new t(
                Object(i['\u0275\u0275inject'])(i.NgZone),
                Object(i['\u0275\u0275inject'])(i.PLATFORM_ID),
                Object(i['\u0275\u0275inject'])(s.DOCUMENT)
              );
            },
            token: t,
            providedIn: 'root',
          })),
          t
        );
      })();
    const lt = {},
      ut = { alias: 'print', mediaQuery: 'print', priority: 1e3 };
    let dt = (() => {
      class t {
        constructor(t, e, n) {
          (this.breakpoints = t),
            (this.layoutConfig = e),
            (this._document = n),
            (this.registeredBeforeAfterPrintHooks = !1),
            (this.isPrintingBeforeAfterEvent = !1),
            (this.beforePrintEventListeners = []),
            (this.afterPrintEventListeners = []),
            (this.isPrinting = !1),
            (this.queue = new ht()),
            (this.deactivations = []);
        }
        withPrintQuery(t) {
          return [...t, 'print'];
        }
        isPrintEvent(t) {
          return t.mediaQuery.startsWith('print');
        }
        get printAlias() {
          return this.layoutConfig.printWithBreakpoints || [];
        }
        get printBreakPoints() {
          return this.printAlias
            .map((t) => this.breakpoints.findByAlias(t))
            .filter((t) => null !== t);
        }
        getEventBreakpoints({ mediaQuery: t }) {
          const e = this.breakpoints.findByQuery(t);
          return (e
            ? [...this.printBreakPoints, e]
            : this.printBreakPoints
          ).sort(st);
        }
        updateEvent(t) {
          let e = this.breakpoints.findByQuery(t.mediaQuery);
          return (
            this.isPrintEvent(t) &&
              ((e = this.getEventBreakpoints(t)[0]),
              (t.mediaQuery = e ? e.mediaQuery : '')),
            U(t, e)
          );
        }
        registerBeforeAfterPrintHooks(t) {
          if (
            !this._document.defaultView ||
            this.registeredBeforeAfterPrintHooks
          )
            return;
          this.registeredBeforeAfterPrintHooks = !0;
          const e = () => {
              this.isPrinting ||
                ((this.isPrintingBeforeAfterEvent = !0),
                this.startPrinting(
                  t,
                  this.getEventBreakpoints(new V(!0, 'print'))
                ),
                t.updateStyles());
            },
            n = () => {
              (this.isPrintingBeforeAfterEvent = !1),
                this.isPrinting && (this.stopPrinting(t), t.updateStyles());
            };
          this._document.defaultView.addEventListener('beforeprint', e),
            this._document.defaultView.addEventListener('afterprint', n),
            this.beforePrintEventListeners.push(e),
            this.afterPrintEventListeners.push(n);
        }
        interceptEvents(t) {
          return (
            this.registerBeforeAfterPrintHooks(t),
            (e) => {
              this.isPrintEvent(e)
                ? e.matches && !this.isPrinting
                  ? (this.startPrinting(t, this.getEventBreakpoints(e)),
                    t.updateStyles())
                  : e.matches ||
                    !this.isPrinting ||
                    this.isPrintingBeforeAfterEvent ||
                    (this.stopPrinting(t), t.updateStyles())
                : this.collectActivations(e);
            }
          );
        }
        blockPropagation() {
          return (t) => !(this.isPrinting || this.isPrintEvent(t));
        }
        startPrinting(t, e) {
          (this.isPrinting = !0),
            (t.activatedBreakpoints = this.queue.addPrintBreakpoints(e));
        }
        stopPrinting(t) {
          (t.activatedBreakpoints = this.deactivations),
            (this.deactivations = []),
            this.queue.clear(),
            (this.isPrinting = !1);
        }
        collectActivations(t) {
          if (!this.isPrinting || this.isPrintingBeforeAfterEvent)
            if (t.matches)
              this.isPrintingBeforeAfterEvent || (this.deactivations = []);
            else {
              const e = this.breakpoints.findByQuery(t.mediaQuery);
              e && (this.deactivations.push(e), this.deactivations.sort(st));
            }
        }
        ngOnDestroy() {
          this.beforePrintEventListeners.forEach((t) =>
            this._document.defaultView.removeEventListener('beforeprint', t)
          ),
            this.afterPrintEventListeners.forEach((t) =>
              this._document.defaultView.removeEventListener('afterprint', t)
            );
        }
      }
      return (
        (t.ɵfac = function (e) {
          return new (e || t)(
            i['\u0275\u0275inject'](at),
            i['\u0275\u0275inject'](z),
            i['\u0275\u0275inject'](s.DOCUMENT)
          );
        }),
        (t.ɵprov = Object(i['\u0275\u0275defineInjectable'])({
          factory: function () {
            return new t(
              Object(i['\u0275\u0275inject'])(at),
              Object(i['\u0275\u0275inject'])(z),
              Object(i['\u0275\u0275inject'])(s.DOCUMENT)
            );
          },
          token: t,
          providedIn: 'root',
        })),
        t
      );
    })();
    class ht {
      constructor() {
        this.printBreakpoints = [];
      }
      addPrintBreakpoints(t) {
        return (
          t.push(ut),
          t.sort(st),
          t.forEach((t) => this.addBreakpoint(t)),
          this.printBreakpoints
        );
      }
      addBreakpoint(t) {
        t &&
          void 0 ===
            this.printBreakpoints.find((e) => e.mediaQuery === t.mediaQuery) &&
          (this.printBreakpoints = (function (t) {
            return !!t && t.mediaQuery.startsWith('print');
          })(t)
            ? [t, ...this.printBreakpoints]
            : [...this.printBreakpoints, t]);
      }
      clear() {
        this.printBreakpoints = [];
      }
    }
    function pt(t) {
      for (let e in t) {
        let n = t[e] || '';
        switch (e) {
          case 'display':
            t.display =
              'flex' === n
                ? ['-webkit-flex', 'flex']
                : 'inline-flex' === n
                ? ['-webkit-inline-flex', 'inline-flex']
                : n;
            break;
          case 'align-items':
          case 'align-self':
          case 'align-content':
          case 'flex':
          case 'flex-basis':
          case 'flex-flow':
          case 'flex-grow':
          case 'flex-shrink':
          case 'flex-wrap':
          case 'justify-content':
            t['-webkit-' + e] = n;
            break;
          case 'flex-direction':
            (n = n || 'row'),
              (t['-webkit-flex-direction'] = n),
              (t['flex-direction'] = n);
            break;
          case 'order':
            t.order = t['-webkit-' + e] = isNaN(+n) ? '0' : n;
        }
      }
      return t;
    }
    let mt = (() => {
      class t {
        constructor(t, e, n, i) {
          (this._serverStylesheet = t),
            (this._serverModuleLoaded = e),
            (this._platformId = n),
            (this.layoutConfig = i);
        }
        applyStyleToElement(t, e, n = null) {
          let i = {};
          'string' == typeof e && ((i[e] = n), (e = i)),
            (i = this.layoutConfig.disableVendorPrefixes ? e : pt(e)),
            this._applyMultiValueStyleToElement(i, t);
        }
        applyStyleToElements(t, e = []) {
          const n = this.layoutConfig.disableVendorPrefixes ? t : pt(t);
          e.forEach((t) => {
            this._applyMultiValueStyleToElement(n, t);
          });
        }
        getFlowDirection(t) {
          let e = this.lookupStyle(t, 'flex-direction');
          return [
            e || 'row',
            this.lookupInlineStyle(t, 'flex-direction') ||
            (Object(s.isPlatformServer)(this._platformId) &&
              this._serverModuleLoaded)
              ? e
              : '',
          ];
        }
        hasWrap(t) {
          return 'wrap' === this.lookupStyle(t, 'flex-wrap');
        }
        lookupAttributeValue(t, e) {
          return t.getAttribute(e) || '';
        }
        lookupInlineStyle(t, e) {
          return Object(s.isPlatformBrowser)(this._platformId)
            ? t.style.getPropertyValue(e)
            : this._getServerStyle(t, e);
        }
        lookupStyle(t, e, n = !1) {
          let i = '';
          return (
            t &&
              ((i = this.lookupInlineStyle(t, e)) ||
                (Object(s.isPlatformBrowser)(this._platformId)
                  ? n || (i = getComputedStyle(t).getPropertyValue(e))
                  : this._serverModuleLoaded &&
                    (i = this._serverStylesheet.getStyleForElement(t, e)))),
            i ? i.trim() : ''
          );
        }
        _applyMultiValueStyleToElement(t, e) {
          Object.keys(t)
            .sort()
            .forEach((n) => {
              const i = t[n],
                r = Array.isArray(i) ? i : [i];
              r.sort();
              for (let t of r)
                (t = t ? t + '' : ''),
                  Object(s.isPlatformBrowser)(this._platformId) ||
                  !this._serverModuleLoaded
                    ? Object(s.isPlatformBrowser)(this._platformId)
                      ? e.style.setProperty(n, t)
                      : this._setServerStyle(e, n, t)
                    : this._serverStylesheet.addStyleToElement(e, n, t);
            });
        }
        _setServerStyle(t, e, n) {
          e = e.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
          const i = this._readStyleAttribute(t);
          (i[e] = n || ''), this._writeStyleAttribute(t, i);
        }
        _getServerStyle(t, e) {
          return this._readStyleAttribute(t)[e] || '';
        }
        _readStyleAttribute(t) {
          const e = {},
            n = t.getAttribute('style');
          if (n) {
            const t = n.split(/;+/g);
            for (let n = 0; n < t.length; n++) {
              const i = t[n].trim();
              if (i.length > 0) {
                const t = i.indexOf(':');
                if (-1 === t) throw new Error('Invalid CSS style: ' + i);
                e[i.substr(0, t).trim()] = i.substr(t + 1).trim();
              }
            }
          }
          return e;
        }
        _writeStyleAttribute(t, e) {
          let n = '';
          for (const i in e) e[i] && (n += i + ':' + e[i] + ';');
          t.setAttribute('style', n);
        }
      }
      return (
        (t.ɵfac = function (e) {
          return new (e || t)(
            i['\u0275\u0275inject'](F),
            i['\u0275\u0275inject'](H),
            i['\u0275\u0275inject'](i.PLATFORM_ID),
            i['\u0275\u0275inject'](z)
          );
        }),
        (t.ɵprov = Object(i['\u0275\u0275defineInjectable'])({
          factory: function () {
            return new t(
              Object(i['\u0275\u0275inject'])(F),
              Object(i['\u0275\u0275inject'])(H),
              Object(i['\u0275\u0275inject'])(i.PLATFORM_ID),
              Object(i['\u0275\u0275inject'])(z)
            );
          },
          token: t,
          providedIn: 'root',
        })),
        t
      );
    })();
    class ft {
      constructor() {
        this.shouldCache = !0;
      }
      sideEffect(t, e, n) {}
    }
    let bt = (() => {
      class t {
        constructor(t, e, n) {
          (this.matchMedia = t),
            (this.breakpoints = e),
            (this.hook = n),
            (this.activatedBreakpoints = []),
            (this.elementMap = new Map()),
            (this.elementKeyMap = new WeakMap()),
            (this.watcherMap = new WeakMap()),
            (this.updateMap = new WeakMap()),
            (this.clearMap = new WeakMap()),
            (this.subject = new o.Subject()),
            this.observeActivations();
        }
        get activatedAlias() {
          return this.activatedBreakpoints[0]
            ? this.activatedBreakpoints[0].alias
            : '';
        }
        onMediaChange(t) {
          const e = this.findByQuery(t.mediaQuery);
          e &&
            ((t = U(t, e)).matches &&
            -1 === this.activatedBreakpoints.indexOf(e)
              ? (this.activatedBreakpoints.push(e),
                this.activatedBreakpoints.sort(st),
                this.updateStyles())
              : t.matches ||
                -1 === this.activatedBreakpoints.indexOf(e) ||
                (this.activatedBreakpoints.splice(
                  this.activatedBreakpoints.indexOf(e),
                  1
                ),
                this.activatedBreakpoints.sort(st),
                this.updateStyles()));
        }
        init(t, e, n, i, r = []) {
          gt(this.updateMap, t, e, n),
            gt(this.clearMap, t, e, i),
            this.buildElementKeyMap(t, e),
            this.watchExtraTriggers(t, e, r);
        }
        getValue(t, e, n) {
          const i = this.elementMap.get(t);
          if (i) {
            const t = void 0 !== n ? i.get(n) : this.getActivatedValues(i, e);
            if (t) return t.get(e);
          }
        }
        hasValue(t, e) {
          const n = this.elementMap.get(t);
          if (n) {
            const t = this.getActivatedValues(n, e);
            if (t) return void 0 !== t.get(e) || !1;
          }
          return !1;
        }
        setValue(t, e, n, i) {
          let r = this.elementMap.get(t);
          if (r) {
            const s = (r.get(i) || new Map()).set(e, n);
            r.set(i, s), this.elementMap.set(t, r);
          } else
            (r = new Map().set(i, new Map().set(e, n))),
              this.elementMap.set(t, r);
          const s = this.getValue(t, e);
          void 0 !== s && this.updateElement(t, e, s);
        }
        trackValue(t, e) {
          return this.subject
            .asObservable()
            .pipe(v((n) => n.element === t && n.key === e));
        }
        updateStyles() {
          this.elementMap.forEach((t, e) => {
            const n = new Set(this.elementKeyMap.get(e));
            let i = this.getActivatedValues(t);
            i &&
              i.forEach((t, i) => {
                this.updateElement(e, i, t), n.delete(i);
              }),
              n.forEach((n) => {
                if (((i = this.getActivatedValues(t, n)), i)) {
                  const t = i.get(n);
                  this.updateElement(e, n, t);
                } else this.clearElement(e, n);
              });
          });
        }
        clearElement(t, e) {
          const n = this.clearMap.get(t);
          if (n) {
            const i = n.get(e);
            i && (i(), this.subject.next({ element: t, key: e, value: '' }));
          }
        }
        updateElement(t, e, n) {
          const i = this.updateMap.get(t);
          if (i) {
            const r = i.get(e);
            r && (r(n), this.subject.next({ element: t, key: e, value: n }));
          }
        }
        releaseElement(t) {
          const e = this.watcherMap.get(t);
          e && (e.forEach((t) => t.unsubscribe()), this.watcherMap.delete(t));
          const n = this.elementMap.get(t);
          n && (n.forEach((t, e) => n.delete(e)), this.elementMap.delete(t));
        }
        triggerUpdate(t, e) {
          const n = this.elementMap.get(t);
          if (n) {
            const i = this.getActivatedValues(n, e);
            i &&
              (e
                ? this.updateElement(t, e, i.get(e))
                : i.forEach((e, n) => this.updateElement(t, n, e)));
          }
        }
        buildElementKeyMap(t, e) {
          let n = this.elementKeyMap.get(t);
          n || ((n = new Set()), this.elementKeyMap.set(t, n)), n.add(e);
        }
        watchExtraTriggers(t, e, n) {
          if (n && n.length) {
            let i = this.watcherMap.get(t);
            if (
              (i || ((i = new Map()), this.watcherMap.set(t, i)), !i.get(e))
            ) {
              const r = Object(o.merge)(...n).subscribe(() => {
                const n = this.getValue(t, e);
                this.updateElement(t, e, n);
              });
              i.set(e, r);
            }
          }
        }
        findByQuery(t) {
          return this.breakpoints.findByQuery(t);
        }
        getActivatedValues(t, e) {
          for (let i = 0; i < this.activatedBreakpoints.length; i++) {
            const n = t.get(this.activatedBreakpoints[i].alias);
            if (n && (void 0 === e || (n.has(e) && null != n.get(e)))) return n;
          }
          const n = t.get('');
          return void 0 === e || (n && n.has(e)) ? n : void 0;
        }
        observeActivations() {
          const t = this.breakpoints.items.map((t) => t.mediaQuery);
          var e;
          this.matchMedia
            .observe(this.hook.withPrintQuery(t))
            .pipe(
              ((e = this.hook.interceptEvents(this)),
              function (t) {
                return t.lift(new D(e, void 0, void 0));
              }),
              v(this.hook.blockPropagation())
            )
            .subscribe(this.onMediaChange.bind(this));
        }
      }
      return (
        (t.ɵfac = function (e) {
          return new (e || t)(
            i['\u0275\u0275inject'](ct),
            i['\u0275\u0275inject'](at),
            i['\u0275\u0275inject'](dt)
          );
        }),
        (t.ɵprov = Object(i['\u0275\u0275defineInjectable'])({
          factory: function () {
            return new t(
              Object(i['\u0275\u0275inject'])(ct),
              Object(i['\u0275\u0275inject'])(at),
              Object(i['\u0275\u0275inject'])(dt)
            );
          },
          token: t,
          providedIn: 'root',
        })),
        t
      );
    })();
    function gt(t, e, n, i) {
      if (void 0 !== i) {
        let r = t.get(e);
        r || ((r = new Map()), t.set(e, r)), r.set(n, i);
      }
    }
    let yt = (() => {
      class t {}
      return (
        (t.ɵmod = i['\u0275\u0275defineNgModule']({ type: t })),
        (t.ɵinj = i['\u0275\u0275defineInjector']({
          factory: function (e) {
            return new (e || t)();
          },
        })),
        t
      );
    })();
    const xt = ['row', 'column', 'row-reverse', 'column-reverse'];
    function vt(t) {
      t = t ? t.toLowerCase() : '';
      let [e, n, i] = t.split(' ');
      return (
        xt.find((t) => t === e) || (e = xt[0]),
        'inline' === n && ((n = 'inline' !== i ? i : ''), (i = 'inline')),
        [e, wt(n), !!i]
      );
    }
    function _t(t) {
      let [e] = vt(t);
      return e.indexOf('row') > -1;
    }
    function wt(t) {
      if (t)
        switch (t.toLowerCase()) {
          case 'reverse':
          case 'wrap-reverse':
          case 'reverse-wrap':
            t = 'wrap-reverse';
            break;
          case 'no':
          case 'none':
          case 'nowrap':
            t = 'nowrap';
            break;
          default:
            t = 'wrap';
        }
      return t;
    }
    let Et = (() => {
      class t extends ft {
        buildStyles(t) {
          return (function (t) {
            let [e, n, i] = vt(t);
            return (function (t, e = null, n = !1) {
              return {
                display: n ? 'inline-flex' : 'flex',
                'box-sizing': 'border-box',
                'flex-direction': t,
                'flex-wrap': e || null,
              };
            })(e, n, i);
          })(t);
        }
      }
      (t.ɵfac = function (n) {
        return e(n || t);
      }),
        (t.ɵprov = Object(i['\u0275\u0275defineInjectable'])({
          factory: function () {
            return new t();
          },
          token: t,
          providedIn: 'root',
        }));
      const e = i['\u0275\u0275getInheritedFactory'](t);
      return t;
    })();
    const kt = [
      'fxLayout',
      'fxLayout.xs',
      'fxLayout.sm',
      'fxLayout.md',
      'fxLayout.lg',
      'fxLayout.xl',
      'fxLayout.lt-sm',
      'fxLayout.lt-md',
      'fxLayout.lt-lg',
      'fxLayout.lt-xl',
      'fxLayout.gt-xs',
      'fxLayout.gt-sm',
      'fxLayout.gt-md',
      'fxLayout.gt-lg',
    ];
    let jt = (() => {
        class t extends $ {
          constructor(t, e, n, i) {
            super(t, n, e, i),
              (this.DIRECTIVE_KEY = 'layout'),
              (this.styleCache = At),
              this.init();
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(
              i['\u0275\u0275directiveInject'](i.ElementRef),
              i['\u0275\u0275directiveInject'](mt),
              i['\u0275\u0275directiveInject'](Et),
              i['\u0275\u0275directiveInject'](bt)
            );
          }),
          (t.ɵdir = i['\u0275\u0275defineDirective']({
            type: t,
            features: [i['\u0275\u0275InheritDefinitionFeature']],
          })),
          t
        );
      })(),
      Lt = (() => {
        class t extends jt {
          constructor() {
            super(...arguments), (this.inputs = kt);
          }
        }
        (t.ɵfac = function (n) {
          return e(n || t);
        }),
          (t.ɵdir = i['\u0275\u0275defineDirective']({
            type: t,
            selectors: [
              ['', 'fxLayout', ''],
              ['', 'fxLayout.xs', ''],
              ['', 'fxLayout.sm', ''],
              ['', 'fxLayout.md', ''],
              ['', 'fxLayout.lg', ''],
              ['', 'fxLayout.xl', ''],
              ['', 'fxLayout.lt-sm', ''],
              ['', 'fxLayout.lt-md', ''],
              ['', 'fxLayout.lt-lg', ''],
              ['', 'fxLayout.lt-xl', ''],
              ['', 'fxLayout.gt-xs', ''],
              ['', 'fxLayout.gt-sm', ''],
              ['', 'fxLayout.gt-md', ''],
              ['', 'fxLayout.gt-lg', ''],
            ],
            inputs: {
              fxLayout: 'fxLayout',
              'fxLayout.xs': 'fxLayout.xs',
              'fxLayout.sm': 'fxLayout.sm',
              'fxLayout.md': 'fxLayout.md',
              'fxLayout.lg': 'fxLayout.lg',
              'fxLayout.xl': 'fxLayout.xl',
              'fxLayout.lt-sm': 'fxLayout.lt-sm',
              'fxLayout.lt-md': 'fxLayout.lt-md',
              'fxLayout.lt-lg': 'fxLayout.lt-lg',
              'fxLayout.lt-xl': 'fxLayout.lt-xl',
              'fxLayout.gt-xs': 'fxLayout.gt-xs',
              'fxLayout.gt-sm': 'fxLayout.gt-sm',
              'fxLayout.gt-md': 'fxLayout.gt-md',
              'fxLayout.gt-lg': 'fxLayout.gt-lg',
            },
            features: [i['\u0275\u0275InheritDefinitionFeature']],
          }));
        const e = i['\u0275\u0275getInheritedFactory'](t);
        return t;
      })();
    const At = new Map();
    let Ot = (() => {
      class t extends ft {
        buildStyles(t, e) {
          const n = {},
            [i, r] = t.split(' ');
          switch (i) {
            case 'center':
              n['justify-content'] = 'center';
              break;
            case 'space-around':
              n['justify-content'] = 'space-around';
              break;
            case 'space-between':
              n['justify-content'] = 'space-between';
              break;
            case 'space-evenly':
              n['justify-content'] = 'space-evenly';
              break;
            case 'end':
            case 'flex-end':
              n['justify-content'] = 'flex-end';
              break;
            case 'start':
            case 'flex-start':
            default:
              n['justify-content'] = 'flex-start';
          }
          switch (r) {
            case 'start':
            case 'flex-start':
              n['align-items'] = n['align-content'] = 'flex-start';
              break;
            case 'center':
              n['align-items'] = n['align-content'] = 'center';
              break;
            case 'end':
            case 'flex-end':
              n['align-items'] = n['align-content'] = 'flex-end';
              break;
            case 'space-between':
              (n['align-content'] = 'space-between'),
                (n['align-items'] = 'stretch');
              break;
            case 'space-around':
              (n['align-content'] = 'space-around'),
                (n['align-items'] = 'stretch');
              break;
            case 'baseline':
              (n['align-content'] = 'stretch'), (n['align-items'] = 'baseline');
              break;
            case 'stretch':
            default:
              n['align-items'] = n['align-content'] = 'stretch';
          }
          return (function (t, ...e) {
            if (null == t)
              throw TypeError('Cannot convert undefined or null to object');
            for (let n of e)
              if (null != n)
                for (let e in n) n.hasOwnProperty(e) && (t[e] = n[e]);
            return t;
          })(n, {
            display: e.inline ? 'inline-flex' : 'flex',
            'flex-direction': e.layout,
            'box-sizing': 'border-box',
            'max-width':
              'stretch' === r ? (_t(e.layout) ? null : '100%') : null,
            'max-height': 'stretch' === r && _t(e.layout) ? '100%' : null,
          });
        }
      }
      (t.ɵfac = function (n) {
        return e(n || t);
      }),
        (t.ɵprov = Object(i['\u0275\u0275defineInjectable'])({
          factory: function () {
            return new t();
          },
          token: t,
          providedIn: 'root',
        }));
      const e = i['\u0275\u0275getInheritedFactory'](t);
      return t;
    })();
    const Tt = [
      'fxLayoutAlign',
      'fxLayoutAlign.xs',
      'fxLayoutAlign.sm',
      'fxLayoutAlign.md',
      'fxLayoutAlign.lg',
      'fxLayoutAlign.xl',
      'fxLayoutAlign.lt-sm',
      'fxLayoutAlign.lt-md',
      'fxLayoutAlign.lt-lg',
      'fxLayoutAlign.lt-xl',
      'fxLayoutAlign.gt-xs',
      'fxLayoutAlign.gt-sm',
      'fxLayoutAlign.gt-md',
      'fxLayoutAlign.gt-lg',
    ];
    let St = (() => {
        class t extends $ {
          constructor(t, e, n, i) {
            var r;
            super(t, n, e, i),
              (this.DIRECTIVE_KEY = 'layout-align'),
              (this.layout = 'row'),
              (this.inline = !1),
              this.init(),
              this.marshal
                .trackValue(this.nativeElement, 'layout')
                .pipe(((r = this.destroySubject), (t) => t.lift(new I(r))))
                .subscribe(this.onLayoutChange.bind(this));
          }
          updateWithValue(t) {
            const e = this.layout || 'row',
              n = this.inline;
            'row' === e && n
              ? (this.styleCache = Rt)
              : 'row' !== e || n
              ? 'row-reverse' === e && n
                ? (this.styleCache = Nt)
                : 'row-reverse' !== e || n
                ? 'column' === e && n
                  ? (this.styleCache = Bt)
                  : 'column' !== e || n
                  ? 'column-reverse' === e && n
                    ? (this.styleCache = Vt)
                    : 'column-reverse' !== e || n || (this.styleCache = Pt)
                  : (this.styleCache = Mt)
                : (this.styleCache = Dt)
              : (this.styleCache = Ct),
              this.addStyles(t, { layout: e, inline: n });
          }
          onLayoutChange(t) {
            const e = t.value.split(' ');
            (this.layout = e[0]),
              (this.inline = t.value.includes('inline')),
              xt.find((t) => t === this.layout) || (this.layout = 'row'),
              this.triggerUpdate();
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(
              i['\u0275\u0275directiveInject'](i.ElementRef),
              i['\u0275\u0275directiveInject'](mt),
              i['\u0275\u0275directiveInject'](Ot),
              i['\u0275\u0275directiveInject'](bt)
            );
          }),
          (t.ɵdir = i['\u0275\u0275defineDirective']({
            type: t,
            features: [i['\u0275\u0275InheritDefinitionFeature']],
          })),
          t
        );
      })(),
      It = (() => {
        class t extends St {
          constructor() {
            super(...arguments), (this.inputs = Tt);
          }
        }
        (t.ɵfac = function (n) {
          return e(n || t);
        }),
          (t.ɵdir = i['\u0275\u0275defineDirective']({
            type: t,
            selectors: [
              ['', 'fxLayoutAlign', ''],
              ['', 'fxLayoutAlign.xs', ''],
              ['', 'fxLayoutAlign.sm', ''],
              ['', 'fxLayoutAlign.md', ''],
              ['', 'fxLayoutAlign.lg', ''],
              ['', 'fxLayoutAlign.xl', ''],
              ['', 'fxLayoutAlign.lt-sm', ''],
              ['', 'fxLayoutAlign.lt-md', ''],
              ['', 'fxLayoutAlign.lt-lg', ''],
              ['', 'fxLayoutAlign.lt-xl', ''],
              ['', 'fxLayoutAlign.gt-xs', ''],
              ['', 'fxLayoutAlign.gt-sm', ''],
              ['', 'fxLayoutAlign.gt-md', ''],
              ['', 'fxLayoutAlign.gt-lg', ''],
            ],
            inputs: {
              fxLayoutAlign: 'fxLayoutAlign',
              'fxLayoutAlign.xs': 'fxLayoutAlign.xs',
              'fxLayoutAlign.sm': 'fxLayoutAlign.sm',
              'fxLayoutAlign.md': 'fxLayoutAlign.md',
              'fxLayoutAlign.lg': 'fxLayoutAlign.lg',
              'fxLayoutAlign.xl': 'fxLayoutAlign.xl',
              'fxLayoutAlign.lt-sm': 'fxLayoutAlign.lt-sm',
              'fxLayoutAlign.lt-md': 'fxLayoutAlign.lt-md',
              'fxLayoutAlign.lt-lg': 'fxLayoutAlign.lt-lg',
              'fxLayoutAlign.lt-xl': 'fxLayoutAlign.lt-xl',
              'fxLayoutAlign.gt-xs': 'fxLayoutAlign.gt-xs',
              'fxLayoutAlign.gt-sm': 'fxLayoutAlign.gt-sm',
              'fxLayoutAlign.gt-md': 'fxLayoutAlign.gt-md',
              'fxLayoutAlign.gt-lg': 'fxLayoutAlign.gt-lg',
            },
            features: [i['\u0275\u0275InheritDefinitionFeature']],
          }));
        const e = i['\u0275\u0275getInheritedFactory'](t);
        return t;
      })();
    const Ct = new Map(),
      Mt = new Map(),
      Dt = new Map(),
      Pt = new Map(),
      Rt = new Map(),
      Bt = new Map(),
      Nt = new Map(),
      Vt = new Map();
    let Ft = (() => {
      class t {}
      return (
        (t.ɵmod = i['\u0275\u0275defineNgModule']({ type: t })),
        (t.ɵinj = i['\u0275\u0275defineInjector']({
          factory: function (e) {
            return new (e || t)();
          },
          imports: [[N, yt]],
        })),
        t
      );
    })();
    var Qt = n('vG+p');
    function zt() {
      return (
        'undefined' != typeof process &&
        '[object process]' === {}.toString.call(process)
      );
    }
    let Ht = (t, e) => !1,
      Wt = (t, e) => !1,
      Ut = (t, e, n) => [];
    const Kt = zt();
    (Kt || 'undefined' != typeof Element) &&
      ((t, e) => t.contains(e),
      (Wt = (() => {
        if (Kt || Element.prototype.matches) return (t, e) => t.matches(e);
        {
          const t = Element.prototype,
            e =
              t.matchesSelector ||
              t.mozMatchesSelector ||
              t.msMatchesSelector ||
              t.oMatchesSelector ||
              t.webkitMatchesSelector;
          return e ? (t, n) => e.apply(t, [n]) : Wt;
        }
      })()));
    const Zt = new i.InjectionToken('AnimationModuleType');
    let $t;
    try {
      $t = 'undefined' != typeof Intl && Intl.v8BreakIterator;
    } catch (nn) {
      $t = !1;
    }
    let Gt,
      Yt,
      qt = (() => {
        class t {
          constructor(t) {
            (this._platformId = t),
              (this.isBrowser = this._platformId
                ? Object(s.isPlatformBrowser)(this._platformId)
                : 'object' == typeof document && !!document),
              (this.EDGE =
                this.isBrowser && /(edge)/i.test(navigator.userAgent)),
              (this.TRIDENT =
                this.isBrowser && /(msie|trident)/i.test(navigator.userAgent)),
              (this.BLINK =
                this.isBrowser &&
                !(!window.chrome && !$t) &&
                'undefined' != typeof CSS &&
                !this.EDGE &&
                !this.TRIDENT),
              (this.WEBKIT =
                this.isBrowser &&
                /AppleWebKit/i.test(navigator.userAgent) &&
                !this.BLINK &&
                !this.EDGE &&
                !this.TRIDENT),
              (this.IOS =
                this.isBrowser &&
                /iPad|iPhone|iPod/.test(navigator.userAgent) &&
                !('MSStream' in window)),
              (this.FIREFOX =
                this.isBrowser &&
                /(firefox|minefield)/i.test(navigator.userAgent)),
              (this.ANDROID =
                this.isBrowser &&
                /android/i.test(navigator.userAgent) &&
                !this.TRIDENT),
              (this.SAFARI =
                this.isBrowser &&
                /safari/i.test(navigator.userAgent) &&
                this.WEBKIT);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(i['\u0275\u0275inject'](i.PLATFORM_ID));
          }),
          (t.ɵprov = Object(i['\u0275\u0275defineInjectable'])({
            factory: function () {
              return new t(Object(i['\u0275\u0275inject'])(i.PLATFORM_ID));
            },
            token: t,
            providedIn: 'root',
          })),
          t
        );
      })(),
      Jt = (() => {
        class t {}
        return (
          (t.ɵmod = i['\u0275\u0275defineNgModule']({ type: t })),
          (t.ɵinj = i['\u0275\u0275defineInjector']({
            factory: function (e) {
              return new (e || t)();
            },
          })),
          t
        );
      })();
    function Xt(t) {
      return (function () {
        if (null == Gt && 'undefined' != typeof window)
          try {
            window.addEventListener(
              'test',
              null,
              Object.defineProperty({}, 'passive', { get: () => (Gt = !0) })
            );
          } finally {
            Gt = Gt || !1;
          }
        return Gt;
      })()
        ? t
        : !!t.capture;
    }
    function te(t) {
      return null != t && '' + t != 'false';
    }
    function ee(t) {
      return t instanceof i.ElementRef ? t.nativeElement : t;
    }
    function ne(t) {
      return 0 === t.buttons;
    }
    'undefined' != typeof Element && Element;
    const ie = new i.InjectionToken('cdk-focus-monitor-default-options'),
      re = Xt({ passive: !0, capture: !0 });
    let se = (() => {
      class t {
        constructor(t, e, n, i) {
          (this._ngZone = t),
            (this._platform = e),
            (this._origin = null),
            (this._windowFocused = !1),
            (this._elementInfo = new Map()),
            (this._monitoredElementCount = 0),
            (this._rootNodeFocusListenerCount = new Map()),
            (this._documentKeydownListener = () => {
              (this._lastTouchTarget = null),
                this._setOriginForCurrentEventQueue('keyboard');
            }),
            (this._documentMousedownListener = (t) => {
              if (!this._lastTouchTarget) {
                const e = ne(t) ? 'keyboard' : 'mouse';
                this._setOriginForCurrentEventQueue(e);
              }
            }),
            (this._documentTouchstartListener = (t) => {
              null != this._touchTimeoutId &&
                clearTimeout(this._touchTimeoutId),
                (this._lastTouchTarget = oe(t)),
                (this._touchTimeoutId = setTimeout(
                  () => (this._lastTouchTarget = null),
                  650
                ));
            }),
            (this._windowFocusListener = () => {
              (this._windowFocused = !0),
                (this._windowFocusTimeoutId = setTimeout(
                  () => (this._windowFocused = !1)
                ));
            }),
            (this._rootNodeFocusAndBlurListener = (t) => {
              const e = oe(t),
                n = 'focus' === t.type ? this._onFocus : this._onBlur;
              for (let i = e; i; i = i.parentElement) n.call(this, t, i);
            }),
            (this._document = n),
            (this._detectionMode = (null == i ? void 0 : i.detectionMode) || 0);
        }
        monitor(t, e = !1) {
          if (!this._platform.isBrowser) return Object(o.of)(null);
          const n = ee(t),
            i =
              (function (t) {
                if (
                  (function () {
                    if (null == Yt) {
                      const t =
                        'undefined' != typeof document ? document.head : null;
                      Yt = !(!t || (!t.createShadowRoot && !t.attachShadow));
                    }
                    return Yt;
                  })()
                ) {
                  const e = t.getRootNode ? t.getRootNode() : null;
                  if (
                    'undefined' != typeof ShadowRoot &&
                    ShadowRoot &&
                    e instanceof ShadowRoot
                  )
                    return e;
                }
                return null;
              })(n) || this._getDocument(),
            r = this._elementInfo.get(n);
          if (r) return e && (r.checkChildren = !0), r.subject.asObservable();
          const s = { checkChildren: e, subject: new o.Subject(), rootNode: i };
          return (
            this._elementInfo.set(n, s),
            this._registerGlobalListeners(s),
            s.subject.asObservable()
          );
        }
        stopMonitoring(t) {
          const e = ee(t),
            n = this._elementInfo.get(e);
          n &&
            (n.subject.complete(),
            this._setClasses(e),
            this._elementInfo.delete(e),
            this._removeGlobalListeners(n));
        }
        focusVia(t, e, n) {
          const i = ee(t);
          this._setOriginForCurrentEventQueue(e),
            'function' == typeof i.focus && i.focus(n);
        }
        ngOnDestroy() {
          this._elementInfo.forEach((t, e) => this.stopMonitoring(e));
        }
        _getDocument() {
          return this._document || document;
        }
        _getWindow() {
          return this._getDocument().defaultView || window;
        }
        _toggleClass(t, e, n) {
          n ? t.classList.add(e) : t.classList.remove(e);
        }
        _getFocusOrigin(t) {
          return this._origin
            ? this._origin
            : this._windowFocused && this._lastFocusOrigin
            ? this._lastFocusOrigin
            : this._wasCausedByTouch(t)
            ? 'touch'
            : 'program';
        }
        _setClasses(t, e) {
          this._toggleClass(t, 'cdk-focused', !!e),
            this._toggleClass(t, 'cdk-touch-focused', 'touch' === e),
            this._toggleClass(t, 'cdk-keyboard-focused', 'keyboard' === e),
            this._toggleClass(t, 'cdk-mouse-focused', 'mouse' === e),
            this._toggleClass(t, 'cdk-program-focused', 'program' === e);
        }
        _setOriginForCurrentEventQueue(t) {
          this._ngZone.runOutsideAngular(() => {
            (this._origin = t),
              0 === this._detectionMode &&
                (this._originTimeoutId = setTimeout(
                  () => (this._origin = null),
                  1
                ));
          });
        }
        _wasCausedByTouch(t) {
          const e = oe(t);
          return (
            this._lastTouchTarget instanceof Node &&
            e instanceof Node &&
            (e === this._lastTouchTarget || e.contains(this._lastTouchTarget))
          );
        }
        _onFocus(t, e) {
          const n = this._elementInfo.get(e);
          if (!n || (!n.checkChildren && e !== oe(t))) return;
          const i = this._getFocusOrigin(t);
          this._setClasses(e, i),
            this._emitOrigin(n.subject, i),
            (this._lastFocusOrigin = i);
        }
        _onBlur(t, e) {
          const n = this._elementInfo.get(e);
          !n ||
            (n.checkChildren &&
              t.relatedTarget instanceof Node &&
              e.contains(t.relatedTarget)) ||
            (this._setClasses(e), this._emitOrigin(n.subject, null));
        }
        _emitOrigin(t, e) {
          this._ngZone.run(() => t.next(e));
        }
        _registerGlobalListeners(t) {
          if (!this._platform.isBrowser) return;
          const e = t.rootNode,
            n = this._rootNodeFocusListenerCount.get(e) || 0;
          n ||
            this._ngZone.runOutsideAngular(() => {
              e.addEventListener(
                'focus',
                this._rootNodeFocusAndBlurListener,
                re
              ),
                e.addEventListener(
                  'blur',
                  this._rootNodeFocusAndBlurListener,
                  re
                );
            }),
            this._rootNodeFocusListenerCount.set(e, n + 1),
            1 == ++this._monitoredElementCount &&
              this._ngZone.runOutsideAngular(() => {
                const t = this._getDocument(),
                  e = this._getWindow();
                t.addEventListener(
                  'keydown',
                  this._documentKeydownListener,
                  re
                ),
                  t.addEventListener(
                    'mousedown',
                    this._documentMousedownListener,
                    re
                  ),
                  t.addEventListener(
                    'touchstart',
                    this._documentTouchstartListener,
                    re
                  ),
                  e.addEventListener('focus', this._windowFocusListener);
              });
        }
        _removeGlobalListeners(t) {
          const e = t.rootNode;
          if (this._rootNodeFocusListenerCount.has(e)) {
            const t = this._rootNodeFocusListenerCount.get(e);
            t > 1
              ? this._rootNodeFocusListenerCount.set(e, t - 1)
              : (e.removeEventListener(
                  'focus',
                  this._rootNodeFocusAndBlurListener,
                  re
                ),
                e.removeEventListener(
                  'blur',
                  this._rootNodeFocusAndBlurListener,
                  re
                ),
                this._rootNodeFocusListenerCount.delete(e));
          }
          if (!--this._monitoredElementCount) {
            const t = this._getDocument(),
              e = this._getWindow();
            t.removeEventListener('keydown', this._documentKeydownListener, re),
              t.removeEventListener(
                'mousedown',
                this._documentMousedownListener,
                re
              ),
              t.removeEventListener(
                'touchstart',
                this._documentTouchstartListener,
                re
              ),
              e.removeEventListener('focus', this._windowFocusListener),
              clearTimeout(this._windowFocusTimeoutId),
              clearTimeout(this._touchTimeoutId),
              clearTimeout(this._originTimeoutId);
          }
        }
      }
      return (
        (t.ɵfac = function (e) {
          return new (e || t)(
            i['\u0275\u0275inject'](i.NgZone),
            i['\u0275\u0275inject'](qt),
            i['\u0275\u0275inject'](s.DOCUMENT, 8),
            i['\u0275\u0275inject'](ie, 8)
          );
        }),
        (t.ɵprov = Object(i['\u0275\u0275defineInjectable'])({
          factory: function () {
            return new t(
              Object(i['\u0275\u0275inject'])(i.NgZone),
              Object(i['\u0275\u0275inject'])(qt),
              Object(i['\u0275\u0275inject'])(s.DOCUMENT, 8),
              Object(i['\u0275\u0275inject'])(ie, 8)
            );
          },
          token: t,
          providedIn: 'root',
        })),
        t
      );
    })();
    function oe(t) {
      return t.composedPath ? t.composedPath()[0] : t.target;
    }
    let ae = (() => {
      class t {
        constructor(t, e) {
          (this._platform = t), (this._document = e);
        }
        getHighContrastMode() {
          if (!this._platform.isBrowser) return 0;
          const t = this._document.createElement('div');
          (t.style.backgroundColor = 'rgb(1,2,3)'),
            (t.style.position = 'absolute'),
            this._document.body.appendChild(t);
          const e = this._document.defaultView || window,
            n = e && e.getComputedStyle ? e.getComputedStyle(t) : null,
            i = ((n && n.backgroundColor) || '').replace(/ /g, '');
          switch ((this._document.body.removeChild(t), i)) {
            case 'rgb(0,0,0)':
              return 2;
            case 'rgb(255,255,255)':
              return 1;
          }
          return 0;
        }
        _applyBodyHighContrastModeCssClasses() {
          if (this._platform.isBrowser && this._document.body) {
            const t = this._document.body.classList;
            t.remove('cdk-high-contrast-active'),
              t.remove('cdk-high-contrast-black-on-white'),
              t.remove('cdk-high-contrast-white-on-black');
            const e = this.getHighContrastMode();
            1 === e
              ? (t.add('cdk-high-contrast-active'),
                t.add('cdk-high-contrast-black-on-white'))
              : 2 === e &&
                (t.add('cdk-high-contrast-active'),
                t.add('cdk-high-contrast-white-on-black'));
          }
        }
      }
      return (
        (t.ɵfac = function (e) {
          return new (e || t)(
            i['\u0275\u0275inject'](qt),
            i['\u0275\u0275inject'](s.DOCUMENT)
          );
        }),
        (t.ɵprov = Object(i['\u0275\u0275defineInjectable'])({
          factory: function () {
            return new t(
              Object(i['\u0275\u0275inject'])(qt),
              Object(i['\u0275\u0275inject'])(s.DOCUMENT)
            );
          },
          token: t,
          providedIn: 'root',
        })),
        t
      );
    })();
    const ce = new i.Version('10.1.3'),
      le = new i.Version('10.1.3'),
      ue = new i.InjectionToken('mat-sanity-checks', {
        providedIn: 'root',
        factory: function () {
          return !0;
        },
      });
    let de,
      he = (() => {
        class t {
          constructor(t, e, n) {
            (this._hasDoneGlobalChecks = !1),
              (this._document = n),
              t._applyBodyHighContrastModeCssClasses(),
              (this._sanityChecks = e),
              this._hasDoneGlobalChecks ||
                (this._checkDoctypeIsDefined(),
                this._checkThemeIsPresent(),
                this._checkCdkVersionMatch(),
                (this._hasDoneGlobalChecks = !0));
          }
          _getDocument() {
            const t = this._document || document;
            return 'object' == typeof t && t ? t : null;
          }
          _getWindow() {
            const t = this._getDocument(),
              e = (null == t ? void 0 : t.defaultView) || window;
            return 'object' == typeof e && e ? e : null;
          }
          _checksAreEnabled() {
            return Object(i.isDevMode)() && !this._isTestEnv();
          }
          _isTestEnv() {
            const t = this._getWindow();
            return t && (t.__karma__ || t.jasmine);
          }
          _checkDoctypeIsDefined() {
            const t =
                this._checksAreEnabled() &&
                (!0 === this._sanityChecks || this._sanityChecks.doctype),
              e = this._getDocument();
            t &&
              e &&
              !e.doctype &&
              console.warn(
                'Current document does not have a doctype. This may cause some Angular Material components not to behave as expected.'
              );
          }
          _checkThemeIsPresent() {
            const t =
                !this._checksAreEnabled() ||
                !1 === this._sanityChecks ||
                !this._sanityChecks.theme,
              e = this._getDocument();
            if (t || !e || !e.body || 'function' != typeof getComputedStyle)
              return;
            const n = e.createElement('div');
            n.classList.add('mat-theme-loaded-marker'), e.body.appendChild(n);
            const i = getComputedStyle(n);
            i &&
              'none' !== i.display &&
              console.warn(
                'Could not find Angular Material core theme. Most Material components may not work as expected. For more info refer to the theming guide: https://material.angular.io/guide/theming'
              ),
              e.body.removeChild(n);
          }
          _checkCdkVersionMatch() {
            this._checksAreEnabled() &&
              (!0 === this._sanityChecks || this._sanityChecks.version) &&
              le.full !== ce.full &&
              console.warn(
                'The Angular Material version (' +
                  le.full +
                  ') does not match the Angular CDK version (' +
                  ce.full +
                  ').\nPlease ensure the versions of these two packages exactly match.'
              );
          }
        }
        return (
          (t.ɵmod = i['\u0275\u0275defineNgModule']({ type: t })),
          (t.ɵinj = i['\u0275\u0275defineInjector']({
            factory: function (e) {
              return new (e || t)(
                i['\u0275\u0275inject'](ae),
                i['\u0275\u0275inject'](ue, 8),
                i['\u0275\u0275inject'](s.DOCUMENT, 8)
              );
            },
            imports: [[yt], yt],
          })),
          t
        );
      })();
    function pe(t) {
      return class extends t {
        constructor(...t) {
          super(...t), (this._disabled = !1);
        }
        get disabled() {
          return this._disabled;
        }
        set disabled(t) {
          this._disabled = te(t);
        }
      };
    }
    function me(t, e) {
      return class extends t {
        constructor(...t) {
          super(...t), (this.color = e);
        }
        get color() {
          return this._color;
        }
        set color(t) {
          const n = t || e;
          n !== this._color &&
            (this._color &&
              this._elementRef.nativeElement.classList.remove(
                'mat-' + this._color
              ),
            n && this._elementRef.nativeElement.classList.add('mat-' + n),
            (this._color = n));
        }
      };
    }
    function fe(t) {
      return class extends t {
        constructor(...t) {
          super(...t), (this._disableRipple = !1);
        }
        get disableRipple() {
          return this._disableRipple;
        }
        set disableRipple(t) {
          this._disableRipple = te(t);
        }
      };
    }
    try {
      de = 'undefined' != typeof Intl;
    } catch (nn) {
      de = !1;
    }
    class be {
      constructor(t, e, n) {
        (this._renderer = t),
          (this.element = e),
          (this.config = n),
          (this.state = 3);
      }
      fadeOut() {
        this._renderer.fadeOutRipple(this);
      }
    }
    const ge = { enterDuration: 450, exitDuration: 400 },
      ye = Xt({ passive: !0 }),
      xe = ['mousedown', 'touchstart'],
      ve = ['mouseup', 'mouseleave', 'touchend', 'touchcancel'];
    class _e {
      constructor(t, e, n, i) {
        (this._target = t),
          (this._ngZone = e),
          (this._isPointerDown = !1),
          (this._activeRipples = new Set()),
          (this._pointerUpEventsRegistered = !1),
          i.isBrowser && (this._containerElement = ee(n));
      }
      fadeInRipple(t, e, n = {}) {
        const i = (this._containerRect =
            this._containerRect ||
            this._containerElement.getBoundingClientRect()),
          r = Object.assign(Object.assign({}, ge), n.animation);
        n.centered && ((t = i.left + i.width / 2), (e = i.top + i.height / 2));
        const s =
            n.radius ||
            (function (t, e, n) {
              const i = Math.max(Math.abs(t - n.left), Math.abs(t - n.right)),
                r = Math.max(Math.abs(e - n.top), Math.abs(e - n.bottom));
              return Math.sqrt(i * i + r * r);
            })(t, e, i),
          o = t - i.left,
          a = e - i.top,
          c = r.enterDuration,
          l = document.createElement('div');
        l.classList.add('mat-ripple-element'),
          (l.style.left = o - s + 'px'),
          (l.style.top = a - s + 'px'),
          (l.style.height = 2 * s + 'px'),
          (l.style.width = 2 * s + 'px'),
          null != n.color && (l.style.backgroundColor = n.color),
          (l.style.transitionDuration = c + 'ms'),
          this._containerElement.appendChild(l),
          window.getComputedStyle(l).getPropertyValue('opacity'),
          (l.style.transform = 'scale(1)');
        const u = new be(this, l, n);
        return (
          (u.state = 0),
          this._activeRipples.add(u),
          n.persistent || (this._mostRecentTransientRipple = u),
          this._runTimeoutOutsideZone(() => {
            const t = u === this._mostRecentTransientRipple;
            (u.state = 1),
              n.persistent || (t && this._isPointerDown) || u.fadeOut();
          }, c),
          u
        );
      }
      fadeOutRipple(t) {
        const e = this._activeRipples.delete(t);
        if (
          (t === this._mostRecentTransientRipple &&
            (this._mostRecentTransientRipple = null),
          this._activeRipples.size || (this._containerRect = null),
          !e)
        )
          return;
        const n = t.element,
          i = Object.assign(Object.assign({}, ge), t.config.animation);
        (n.style.transitionDuration = i.exitDuration + 'ms'),
          (n.style.opacity = '0'),
          (t.state = 2),
          this._runTimeoutOutsideZone(() => {
            (t.state = 3), n.parentNode.removeChild(n);
          }, i.exitDuration);
      }
      fadeOutAll() {
        this._activeRipples.forEach((t) => t.fadeOut());
      }
      setupTriggerEvents(t) {
        const e = ee(t);
        e &&
          e !== this._triggerElement &&
          (this._removeTriggerEvents(),
          (this._triggerElement = e),
          this._registerEvents(xe));
      }
      handleEvent(t) {
        'mousedown' === t.type
          ? this._onMousedown(t)
          : 'touchstart' === t.type
          ? this._onTouchStart(t)
          : this._onPointerUp(),
          this._pointerUpEventsRegistered ||
            (this._registerEvents(ve), (this._pointerUpEventsRegistered = !0));
      }
      _onMousedown(t) {
        const e = ne(t),
          n =
            this._lastTouchStartEvent &&
            Date.now() < this._lastTouchStartEvent + 800;
        this._target.rippleDisabled ||
          e ||
          n ||
          ((this._isPointerDown = !0),
          this.fadeInRipple(t.clientX, t.clientY, this._target.rippleConfig));
      }
      _onTouchStart(t) {
        if (!this._target.rippleDisabled) {
          (this._lastTouchStartEvent = Date.now()), (this._isPointerDown = !0);
          const e = t.changedTouches;
          for (let t = 0; t < e.length; t++)
            this.fadeInRipple(
              e[t].clientX,
              e[t].clientY,
              this._target.rippleConfig
            );
        }
      }
      _onPointerUp() {
        this._isPointerDown &&
          ((this._isPointerDown = !1),
          this._activeRipples.forEach((t) => {
            !t.config.persistent &&
              (1 === t.state ||
                (t.config.terminateOnPointerUp && 0 === t.state)) &&
              t.fadeOut();
          }));
      }
      _runTimeoutOutsideZone(t, e = 0) {
        this._ngZone.runOutsideAngular(() => setTimeout(t, e));
      }
      _registerEvents(t) {
        this._ngZone.runOutsideAngular(() => {
          t.forEach((t) => {
            this._triggerElement.addEventListener(t, this, ye);
          });
        });
      }
      _removeTriggerEvents() {
        this._triggerElement &&
          (xe.forEach((t) => {
            this._triggerElement.removeEventListener(t, this, ye);
          }),
          this._pointerUpEventsRegistered &&
            ve.forEach((t) => {
              this._triggerElement.removeEventListener(t, this, ye);
            }));
      }
    }
    const we = new i.InjectionToken('mat-ripple-global-options');
    let Ee = (() => {
        class t {
          constructor(t, e, n, i, r) {
            (this._elementRef = t),
              (this._animationMode = r),
              (this.radius = 0),
              (this._disabled = !1),
              (this._isInitialized = !1),
              (this._globalOptions = i || {}),
              (this._rippleRenderer = new _e(this, e, t, n));
          }
          get disabled() {
            return this._disabled;
          }
          set disabled(t) {
            (this._disabled = t), this._setupTriggerEventsIfEnabled();
          }
          get trigger() {
            return this._trigger || this._elementRef.nativeElement;
          }
          set trigger(t) {
            (this._trigger = t), this._setupTriggerEventsIfEnabled();
          }
          ngOnInit() {
            (this._isInitialized = !0), this._setupTriggerEventsIfEnabled();
          }
          ngOnDestroy() {
            this._rippleRenderer._removeTriggerEvents();
          }
          fadeOutAll() {
            this._rippleRenderer.fadeOutAll();
          }
          get rippleConfig() {
            return {
              centered: this.centered,
              radius: this.radius,
              color: this.color,
              animation: Object.assign(
                Object.assign(
                  Object.assign({}, this._globalOptions.animation),
                  'NoopAnimations' === this._animationMode
                    ? { enterDuration: 0, exitDuration: 0 }
                    : {}
                ),
                this.animation
              ),
              terminateOnPointerUp: this._globalOptions.terminateOnPointerUp,
            };
          }
          get rippleDisabled() {
            return this.disabled || !!this._globalOptions.disabled;
          }
          _setupTriggerEventsIfEnabled() {
            !this.disabled &&
              this._isInitialized &&
              this._rippleRenderer.setupTriggerEvents(this.trigger);
          }
          launch(t, e = 0, n) {
            return 'number' == typeof t
              ? this._rippleRenderer.fadeInRipple(
                  t,
                  e,
                  Object.assign(Object.assign({}, this.rippleConfig), n)
                )
              : this._rippleRenderer.fadeInRipple(
                  0,
                  0,
                  Object.assign(Object.assign({}, this.rippleConfig), t)
                );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(
              i['\u0275\u0275directiveInject'](i.ElementRef),
              i['\u0275\u0275directiveInject'](i.NgZone),
              i['\u0275\u0275directiveInject'](qt),
              i['\u0275\u0275directiveInject'](we, 8),
              i['\u0275\u0275directiveInject'](Zt, 8)
            );
          }),
          (t.ɵdir = i['\u0275\u0275defineDirective']({
            type: t,
            selectors: [
              ['', 'mat-ripple', ''],
              ['', 'matRipple', ''],
            ],
            hostAttrs: [1, 'mat-ripple'],
            hostVars: 2,
            hostBindings: function (t, e) {
              2 & t &&
                i['\u0275\u0275classProp']('mat-ripple-unbounded', e.unbounded);
            },
            inputs: {
              radius: ['matRippleRadius', 'radius'],
              disabled: ['matRippleDisabled', 'disabled'],
              trigger: ['matRippleTrigger', 'trigger'],
              color: ['matRippleColor', 'color'],
              unbounded: ['matRippleUnbounded', 'unbounded'],
              centered: ['matRippleCentered', 'centered'],
              animation: ['matRippleAnimation', 'animation'],
            },
            exportAs: ['matRipple'],
          })),
          t
        );
      })(),
      ke = (() => {
        class t {}
        return (
          (t.ɵmod = i['\u0275\u0275defineNgModule']({ type: t })),
          (t.ɵinj = i['\u0275\u0275defineInjector']({
            factory: function (e) {
              return new (e || t)();
            },
            imports: [[he, Jt], he],
          })),
          t
        );
      })();
    const je = ['*', [['mat-card-footer']]],
      Le = ['*', 'mat-card-footer'],
      Ae = [
        [
          ['', 'mat-card-avatar', ''],
          ['', 'matCardAvatar', ''],
        ],
        [
          ['mat-card-title'],
          ['mat-card-subtitle'],
          ['', 'mat-card-title', ''],
          ['', 'mat-card-subtitle', ''],
          ['', 'matCardTitle', ''],
          ['', 'matCardSubtitle', ''],
        ],
        '*',
      ],
      Oe = [
        '[mat-card-avatar], [matCardAvatar]',
        'mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]',
        '*',
      ];
    let Te = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵdir = i['\u0275\u0275defineDirective']({
            type: t,
            selectors: [
              ['mat-card-content'],
              ['', 'mat-card-content', ''],
              ['', 'matCardContent', ''],
            ],
            hostAttrs: [1, 'mat-card-content'],
          })),
          t
        );
      })(),
      Se = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵdir = i['\u0275\u0275defineDirective']({
            type: t,
            selectors: [
              ['mat-card-title'],
              ['', 'mat-card-title', ''],
              ['', 'matCardTitle', ''],
            ],
            hostAttrs: [1, 'mat-card-title'],
          })),
          t
        );
      })(),
      Ie = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵdir = i['\u0275\u0275defineDirective']({
            type: t,
            selectors: [
              ['mat-card-subtitle'],
              ['', 'mat-card-subtitle', ''],
              ['', 'matCardSubtitle', ''],
            ],
            hostAttrs: [1, 'mat-card-subtitle'],
          })),
          t
        );
      })(),
      Ce = (() => {
        class t {
          constructor() {
            this.align = 'start';
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵdir = i['\u0275\u0275defineDirective']({
            type: t,
            selectors: [['mat-card-actions']],
            hostAttrs: [1, 'mat-card-actions'],
            hostVars: 2,
            hostBindings: function (t, e) {
              2 & t &&
                i['\u0275\u0275classProp'](
                  'mat-card-actions-align-end',
                  'end' === e.align
                );
            },
            inputs: { align: 'align' },
            exportAs: ['matCardActions'],
          })),
          t
        );
      })(),
      Me = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵdir = i['\u0275\u0275defineDirective']({
            type: t,
            selectors: [
              ['', 'mat-card-image', ''],
              ['', 'matCardImage', ''],
            ],
            hostAttrs: [1, 'mat-card-image'],
          })),
          t
        );
      })(),
      De = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵdir = i['\u0275\u0275defineDirective']({
            type: t,
            selectors: [
              ['', 'mat-card-avatar', ''],
              ['', 'matCardAvatar', ''],
            ],
            hostAttrs: [1, 'mat-card-avatar'],
          })),
          t
        );
      })(),
      Pe = (() => {
        class t {
          constructor(t) {
            this._animationMode = t;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(i['\u0275\u0275directiveInject'](Zt, 8));
          }),
          (t.ɵcmp = i['\u0275\u0275defineComponent']({
            type: t,
            selectors: [['mat-card']],
            hostAttrs: [1, 'mat-card', 'mat-focus-indicator'],
            hostVars: 2,
            hostBindings: function (t, e) {
              2 & t &&
                i['\u0275\u0275classProp'](
                  '_mat-animation-noopable',
                  'NoopAnimations' === e._animationMode
                );
            },
            exportAs: ['matCard'],
            ngContentSelectors: Le,
            decls: 2,
            vars: 0,
            template: function (t, e) {
              1 & t &&
                (i['\u0275\u0275projectionDef'](je),
                i['\u0275\u0275projection'](0),
                i['\u0275\u0275projection'](1, 1));
            },
            styles: [
              '.mat-card{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);display:block;position:relative;padding:16px;border-radius:4px}._mat-animation-noopable.mat-card{transition:none;animation:none}.mat-card .mat-divider-horizontal{position:absolute;left:0;width:100%}[dir=rtl] .mat-card .mat-divider-horizontal{left:auto;right:0}.mat-card .mat-divider-horizontal.mat-divider-inset{position:static;margin:0}[dir=rtl] .mat-card .mat-divider-horizontal.mat-divider-inset{margin-right:0}.cdk-high-contrast-active .mat-card{outline:solid 1px}.mat-card-actions,.mat-card-subtitle,.mat-card-content{display:block;margin-bottom:16px}.mat-card-title{display:block;margin-bottom:8px}.mat-card-actions{margin-left:-8px;margin-right:-8px;padding:8px 0}.mat-card-actions-align-end{display:flex;justify-content:flex-end}.mat-card-image{width:calc(100% + 32px);margin:0 -16px 16px -16px}.mat-card-footer{display:block;margin:0 -16px -16px -16px}.mat-card-actions .mat-button,.mat-card-actions .mat-raised-button,.mat-card-actions .mat-stroked-button{margin:0 8px}.mat-card-header{display:flex;flex-direction:row}.mat-card-header .mat-card-title{margin-bottom:12px}.mat-card-header-text{margin:0 16px}.mat-card-avatar{height:40px;width:40px;border-radius:50%;flex-shrink:0;object-fit:cover}.mat-card-title-group{display:flex;justify-content:space-between}.mat-card-sm-image{width:80px;height:80px}.mat-card-md-image{width:112px;height:112px}.mat-card-lg-image{width:152px;height:152px}.mat-card-xl-image{width:240px;height:240px;margin:-8px}.mat-card-title-group>.mat-card-xl-image{margin:-8px 0 8px}@media(max-width: 599px){.mat-card-title-group{margin:0}.mat-card-xl-image{margin-left:0;margin-right:0}}.mat-card>:first-child,.mat-card-content>:first-child{margin-top:0}.mat-card>:last-child:not(.mat-card-footer),.mat-card-content>:last-child:not(.mat-card-footer){margin-bottom:0}.mat-card-image:first-child{margin-top:-16px;border-top-left-radius:inherit;border-top-right-radius:inherit}.mat-card>.mat-card-actions:last-child{margin-bottom:-8px;padding-bottom:0}.mat-card-actions .mat-button:first-child,.mat-card-actions .mat-raised-button:first-child,.mat-card-actions .mat-stroked-button:first-child{margin-left:0;margin-right:0}.mat-card-title:not(:first-child),.mat-card-subtitle:not(:first-child){margin-top:-4px}.mat-card-header .mat-card-subtitle:not(:first-child){margin-top:-8px}.mat-card>.mat-card-xl-image:first-child{margin-top:-8px}.mat-card>.mat-card-xl-image:last-child{margin-bottom:-8px}\n',
            ],
            encapsulation: 2,
            changeDetection: 0,
          })),
          t
        );
      })(),
      Re = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵcmp = i['\u0275\u0275defineComponent']({
            type: t,
            selectors: [['mat-card-header']],
            hostAttrs: [1, 'mat-card-header'],
            ngContentSelectors: Oe,
            decls: 4,
            vars: 0,
            consts: [[1, 'mat-card-header-text']],
            template: function (t, e) {
              1 & t &&
                (i['\u0275\u0275projectionDef'](Ae),
                i['\u0275\u0275projection'](0),
                i['\u0275\u0275elementStart'](1, 'div', 0),
                i['\u0275\u0275projection'](2, 1),
                i['\u0275\u0275elementEnd'](),
                i['\u0275\u0275projection'](3, 2));
            },
            encapsulation: 2,
            changeDetection: 0,
          })),
          t
        );
      })(),
      Be = (() => {
        class t {}
        return (
          (t.ɵmod = i['\u0275\u0275defineNgModule']({ type: t })),
          (t.ɵinj = i['\u0275\u0275defineInjector']({
            factory: function (e) {
              return new (e || t)();
            },
            imports: [[he], he],
          })),
          t
        );
      })();
    const Ne = ['mat-button', ''],
      Ve = ['*'],
      Fe = [
        'mat-button',
        'mat-flat-button',
        'mat-icon-button',
        'mat-raised-button',
        'mat-stroked-button',
        'mat-mini-fab',
        'mat-fab',
      ];
    class Qe {
      constructor(t) {
        this._elementRef = t;
      }
    }
    const ze = me(pe(fe(Qe)));
    let He = (() => {
        class t extends ze {
          constructor(t, e, n) {
            super(t),
              (this._focusMonitor = e),
              (this._animationMode = n),
              (this.isRoundButton = this._hasHostAttributes(
                'mat-fab',
                'mat-mini-fab'
              )),
              (this.isIconButton = this._hasHostAttributes('mat-icon-button'));
            for (const i of Fe)
              this._hasHostAttributes(i) &&
                this._getHostElement().classList.add(i);
            t.nativeElement.classList.add('mat-button-base'),
              this.isRoundButton && (this.color = 'accent');
          }
          ngAfterViewInit() {
            this._focusMonitor.monitor(this._elementRef, !0);
          }
          ngOnDestroy() {
            this._focusMonitor.stopMonitoring(this._elementRef);
          }
          focus(t = 'program', e) {
            this._focusMonitor.focusVia(this._getHostElement(), t, e);
          }
          _getHostElement() {
            return this._elementRef.nativeElement;
          }
          _isRippleDisabled() {
            return this.disableRipple || this.disabled;
          }
          _hasHostAttributes(...t) {
            return t.some((t) => this._getHostElement().hasAttribute(t));
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(
              i['\u0275\u0275directiveInject'](i.ElementRef),
              i['\u0275\u0275directiveInject'](se),
              i['\u0275\u0275directiveInject'](Zt, 8)
            );
          }),
          (t.ɵcmp = i['\u0275\u0275defineComponent']({
            type: t,
            selectors: [
              ['button', 'mat-button', ''],
              ['button', 'mat-raised-button', ''],
              ['button', 'mat-icon-button', ''],
              ['button', 'mat-fab', ''],
              ['button', 'mat-mini-fab', ''],
              ['button', 'mat-stroked-button', ''],
              ['button', 'mat-flat-button', ''],
            ],
            viewQuery: function (t, e) {
              var n;
              1 & t && i['\u0275\u0275viewQuery'](Ee, !0),
                2 & t &&
                  i['\u0275\u0275queryRefresh'](
                    (n = i['\u0275\u0275loadQuery']())
                  ) &&
                  (e.ripple = n.first);
            },
            hostAttrs: [1, 'mat-focus-indicator'],
            hostVars: 5,
            hostBindings: function (t, e) {
              2 & t &&
                (i['\u0275\u0275attribute']('disabled', e.disabled || null),
                i['\u0275\u0275classProp'](
                  '_mat-animation-noopable',
                  'NoopAnimations' === e._animationMode
                )('mat-button-disabled', e.disabled));
            },
            inputs: {
              disabled: 'disabled',
              disableRipple: 'disableRipple',
              color: 'color',
            },
            exportAs: ['matButton'],
            features: [i['\u0275\u0275InheritDefinitionFeature']],
            attrs: Ne,
            ngContentSelectors: Ve,
            decls: 4,
            vars: 5,
            consts: [
              [1, 'mat-button-wrapper'],
              [
                'matRipple',
                '',
                1,
                'mat-button-ripple',
                3,
                'matRippleDisabled',
                'matRippleCentered',
                'matRippleTrigger',
              ],
              [1, 'mat-button-focus-overlay'],
            ],
            template: function (t, e) {
              1 & t &&
                (i['\u0275\u0275projectionDef'](),
                i['\u0275\u0275elementStart'](0, 'span', 0),
                i['\u0275\u0275projection'](1),
                i['\u0275\u0275elementEnd'](),
                i['\u0275\u0275element'](2, 'div', 1),
                i['\u0275\u0275element'](3, 'div', 2)),
                2 & t &&
                  (i['\u0275\u0275advance'](2),
                  i['\u0275\u0275classProp'](
                    'mat-button-ripple-round',
                    e.isRoundButton || e.isIconButton
                  ),
                  i['\u0275\u0275property'](
                    'matRippleDisabled',
                    e._isRippleDisabled()
                  )('matRippleCentered', e.isIconButton)(
                    'matRippleTrigger',
                    e._getHostElement()
                  ));
            },
            directives: [Ee],
            styles: [
              '.mat-button .mat-button-focus-overlay,.mat-icon-button .mat-button-focus-overlay{opacity:0}.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:.04}@media(hover: none){.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:0}}.mat-button,.mat-icon-button,.mat-stroked-button,.mat-flat-button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-button.mat-button-disabled,.mat-icon-button.mat-button-disabled,.mat-stroked-button.mat-button-disabled,.mat-flat-button.mat-button-disabled{cursor:default}.mat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-button.cdk-program-focused .mat-button-focus-overlay,.mat-icon-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-icon-button.cdk-program-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-program-focused .mat-button-focus-overlay,.mat-flat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-flat-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-raised-button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-raised-button::-moz-focus-inner{border:0}.mat-raised-button.mat-button-disabled{cursor:default}.mat-raised-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-raised-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-raised-button::-moz-focus-inner{border:0}._mat-animation-noopable.mat-raised-button{transition:none;animation:none}.mat-stroked-button{border:1px solid currentColor;padding:0 15px;line-height:34px}.mat-stroked-button .mat-button-ripple.mat-ripple,.mat-stroked-button .mat-button-focus-overlay{top:-1px;left:-1px;right:-1px;bottom:-1px}.mat-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:56px;height:56px;padding:0;flex-shrink:0}.mat-fab::-moz-focus-inner{border:0}.mat-fab.mat-button-disabled{cursor:default}.mat-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-fab::-moz-focus-inner{border:0}._mat-animation-noopable.mat-fab{transition:none;animation:none}.mat-fab .mat-button-wrapper{padding:16px 0;display:inline-block;line-height:24px}.mat-mini-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:40px;height:40px;padding:0;flex-shrink:0}.mat-mini-fab::-moz-focus-inner{border:0}.mat-mini-fab.mat-button-disabled{cursor:default}.mat-mini-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-mini-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-mini-fab::-moz-focus-inner{border:0}._mat-animation-noopable.mat-mini-fab{transition:none;animation:none}.mat-mini-fab .mat-button-wrapper{padding:8px 0;display:inline-block;line-height:24px}.mat-icon-button{padding:0;min-width:0;width:40px;height:40px;flex-shrink:0;line-height:40px;border-radius:50%}.mat-icon-button i,.mat-icon-button .mat-icon{line-height:24px}.mat-button-ripple.mat-ripple,.mat-button-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-button-ripple.mat-ripple:not(:empty){transform:translateZ(0)}.mat-button-focus-overlay{opacity:0;transition:opacity 200ms cubic-bezier(0.35, 0, 0.25, 1),background-color 200ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-button-focus-overlay{transition:none}.cdk-high-contrast-active .mat-button-focus-overlay{background-color:#fff}.cdk-high-contrast-black-on-white .mat-button-focus-overlay{background-color:#000}.mat-button-ripple-round{border-radius:50%;z-index:1}.mat-button .mat-button-wrapper>*,.mat-flat-button .mat-button-wrapper>*,.mat-stroked-button .mat-button-wrapper>*,.mat-raised-button .mat-button-wrapper>*,.mat-icon-button .mat-button-wrapper>*,.mat-fab .mat-button-wrapper>*,.mat-mini-fab .mat-button-wrapper>*{vertical-align:middle}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button{display:block;font-size:inherit;width:2.5em;height:2.5em}.cdk-high-contrast-active .mat-button,.cdk-high-contrast-active .mat-flat-button,.cdk-high-contrast-active .mat-raised-button,.cdk-high-contrast-active .mat-icon-button,.cdk-high-contrast-active .mat-fab,.cdk-high-contrast-active .mat-mini-fab{outline:solid 1px}\n',
            ],
            encapsulation: 2,
            changeDetection: 0,
          })),
          t
        );
      })(),
      We = (() => {
        class t {}
        return (
          (t.ɵmod = i['\u0275\u0275defineNgModule']({ type: t })),
          (t.ɵinj = i['\u0275\u0275defineInjector']({
            factory: function (e) {
              return new (e || t)();
            },
            imports: [[ke, he], he],
          })),
          t
        );
      })();
    function Ue(t, e) {
      if (
        (1 & t &&
          (i['\u0275\u0275elementStart'](0, 'mat-card', 2),
          i['\u0275\u0275elementStart'](1, 'mat-card-header'),
          i['\u0275\u0275element'](2, 'div', 3),
          i['\u0275\u0275elementStart'](3, 'mat-card-title'),
          i['\u0275\u0275text'](4),
          i['\u0275\u0275elementEnd'](),
          i['\u0275\u0275elementStart'](5, 'mat-card-subtitle'),
          i['\u0275\u0275text'](6),
          i['\u0275\u0275elementEnd'](),
          i['\u0275\u0275elementEnd'](),
          i['\u0275\u0275element'](7, 'img', 4),
          i['\u0275\u0275elementStart'](8, 'mat-card-content'),
          i['\u0275\u0275elementStart'](9, 'p'),
          i['\u0275\u0275text'](10),
          i['\u0275\u0275elementEnd'](),
          i['\u0275\u0275elementEnd'](),
          i['\u0275\u0275elementStart'](11, 'mat-card-actions'),
          i['\u0275\u0275elementStart'](12, 'button', 5),
          i['\u0275\u0275text'](13, 'LIKE'),
          i['\u0275\u0275elementEnd'](),
          i['\u0275\u0275elementStart'](14, 'button', 5),
          i['\u0275\u0275text'](15, 'SHARE'),
          i['\u0275\u0275elementEnd'](),
          i['\u0275\u0275elementEnd'](),
          i['\u0275\u0275elementEnd']()),
        2 & t)
      ) {
        const t = i['\u0275\u0275nextContext']();
        i['\u0275\u0275advance'](4),
          i['\u0275\u0275textInterpolate'](t.title),
          i['\u0275\u0275advance'](2),
          i['\u0275\u0275textInterpolate'](t.subtitle),
          i['\u0275\u0275advance'](4),
          i['\u0275\u0275textInterpolate1'](' ', t.description, ' ');
      }
    }
    const Ke = function () {
      return [];
    };
    let Ze = (() => {
        class t {
          constructor() {}
          ngOnInit() {}
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵcmp = i['\u0275\u0275defineComponent']({
            type: t,
            selectors: [['mf-app-card']],
            inputs: {
              title: 'title',
              subtitle: 'subtitle',
              description: 'description',
            },
            decls: 2,
            vars: 2,
            consts: [
              [
                'fxLayout',
                'row wrap',
                'fxLayout.xs',
                'column',
                'fxLayoutAlign',
                'space-evenly center',
                1,
                'example-sidenav-content',
              ],
              ['class', 'example-card', 4, 'ngFor', 'ngForOf'],
              [1, 'example-card'],
              [
                'mat-card-avatar',
                '',
                'fxLayoutAlign.xs',
                'center center',
                1,
                'example-header-image',
              ],
              [
                'mat-card-image',
                '',
                'src',
                'https://material.angular.io/assets/img/examples/shiba2.jpg',
                'alt',
                'Photo of a Shiba Inu',
              ],
              ['mat-button', ''],
            ],
            template: function (t, e) {
              1 & t &&
                (i['\u0275\u0275elementStart'](0, 'div', 0),
                i['\u0275\u0275template'](1, Ue, 16, 3, 'mat-card', 1),
                i['\u0275\u0275elementEnd']()),
                2 & t &&
                  (i['\u0275\u0275advance'](1),
                  i['\u0275\u0275property'](
                    'ngForOf',
                    i['\u0275\u0275pureFunction0'](1, Ke).constructor(10)
                  ));
            },
            directives: [Lt, It, s.NgForOf, Pe, Re, De, Se, Ie, Me, Te, Ce, He],
            styles: [
              '.example-card[_ngcontent-%COMP%]{max-width:320px;margin:0 5px 5px 0}.example-header-image[_ngcontent-%COMP%]{background-image:url(https://material.angular.io/assets/img/examples/shiba1.jpg);background-size:cover}.example-sidenav-content[_ngcontent-%COMP%]:first-child{margin:10px 5px 5px}',
            ],
            changeDetection: 0,
          })),
          t
        );
      })(),
      $e = (() => {
        class t {
          constructor() {
            (this.title = 'home'),
              (this.columnDefs = [
                { headerName: 'Make', field: 'make' },
                { headerName: 'Model', field: 'model' },
                { headerName: 'Price', field: 'price' },
              ]),
              (this.rowData = [
                { make: 'Toyota', model: 'Celica', price: 35e3 },
                { make: 'Ford', model: 'Mondeo', price: 32e3 },
                { make: 'Porsche', model: 'Boxter', price: 72e3 },
              ]);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵcmp = i['\u0275\u0275defineComponent']({
            type: t,
            selectors: [['mf-home']],
            decls: 4,
            vars: 5,
            consts: [
              [
                1,
                'ag-theme-alpine',
                2,
                'width',
                '500px',
                'height',
                '500px',
                3,
                'rowData',
                'columnDefs',
              ],
              [3, 'title', 'subtitle', 'description'],
            ],
            template: function (t, e) {
              1 & t &&
                (i['\u0275\u0275elementStart'](0, 'div'),
                i['\u0275\u0275text'](1, ' Welcome Home v2!!!!!\n'),
                i['\u0275\u0275elementEnd'](),
                i['\u0275\u0275element'](2, 'ag-grid-angular', 0),
                i['\u0275\u0275element'](3, 'mf-app-card', 1)),
                2 & t &&
                  (i['\u0275\u0275advance'](2),
                  i['\u0275\u0275property']('rowData', e.rowData)(
                    'columnDefs',
                    e.columnDefs
                  ),
                  i['\u0275\u0275advance'](1),
                  i['\u0275\u0275property']('title', 'home card new')(
                    'subtitle',
                    'home card subtitle new'
                  )('description', 'home card description new'));
            },
            directives: [r.AgGridAngular, Ze],
            styles: [''],
          })),
          t
        );
      })(),
      Ge = (() => {
        class t {}
        return (
          (t.ɵmod = i['\u0275\u0275defineNgModule']({ type: t })),
          (t.ɵinj = i['\u0275\u0275defineInjector']({
            factory: function (e) {
              return new (e || t)();
            },
            imports: [[N]],
          })),
          t
        );
      })(),
      Ye = (() => {
        class t {}
        return (
          (t.ɵmod = i['\u0275\u0275defineNgModule']({ type: t })),
          (t.ɵinj = i['\u0275\u0275defineInjector']({
            factory: function (e) {
              return new (e || t)();
            },
            imports: [[N]],
          })),
          t
        );
      })(),
      qe = (() => {
        class t {
          constructor(t, e) {
            Object(s.isPlatformServer)(e) &&
              !t &&
              console.warn(
                'Warning: Flex Layout loaded on the server without FlexLayoutServerModule'
              );
          }
          static withConfig(e, n = []) {
            return {
              ngModule: t,
              providers: e.serverLoaded
                ? [
                    {
                      provide: z,
                      useValue: Object.assign(Object.assign({}, Q), e),
                    },
                    { provide: W, useValue: n, multi: !0 },
                    { provide: H, useValue: !0 },
                  ]
                : [
                    {
                      provide: z,
                      useValue: Object.assign(Object.assign({}, Q), e),
                    },
                    { provide: W, useValue: n, multi: !0 },
                  ],
            };
          }
        }
        return (
          (t.ɵmod = i['\u0275\u0275defineNgModule']({ type: t })),
          (t.ɵinj = i['\u0275\u0275defineInjector']({
            factory: function (e) {
              return new (e || t)(
                i['\u0275\u0275inject'](H),
                i['\u0275\u0275inject'](i.PLATFORM_ID)
              );
            },
            imports: [[Ft, Ge, Ye], Ft, Ge, Ye],
          })),
          t
        );
      })(),
      Je = (() => {
        class t {}
        return (
          (t.ɵmod = i['\u0275\u0275defineNgModule']({ type: t })),
          (t.ɵinj = i['\u0275\u0275defineInjector']({
            factory: function (e) {
              return new (e || t)();
            },
            imports: [[s.CommonModule, Be, qe, We]],
          })),
          t
        );
      })();
    var Xe = n('JAnZ'),
      tn = n('g/Wr');
    let en = (() => {
      class t {
        constructor(t) {
          this.injector = t;
        }
        ngDoBootstrap() {
          const t = Object(tn.createCustomElement)($e, {
            injector: this.injector,
          });
          customElements.get('mf-home') || customElements.define('mf-home', t);
        }
      }
      return (
        (t.ɵmod = i['\u0275\u0275defineNgModule']({ type: t })),
        (t.ɵinj = i['\u0275\u0275defineInjector']({
          factory: function (e) {
            return new (e || t)(i['\u0275\u0275inject'](i.Injector));
          },
          providers: [],
          imports: [
            [
              Qt.BrowserModule,
              Je,
              Xe.RouterModule.forRoot([]),
              r.AgGridModule.withComponents([]),
            ],
          ],
        })),
        t
      );
    })();
    Qt.platformBrowser()
      .bootstrapModule(en)
      .catch((t) => console.error(t));
  },
});
