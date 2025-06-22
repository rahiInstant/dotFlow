(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) s(r);
  new MutationObserver((r) => {
    for (const l of r)
      if (l.type === "childList")
        for (const o of l.addedNodes)
          o.tagName === "LINK" && o.rel === "modulepreload" && s(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(r) {
    const l = {};
    return (
      r.integrity && (l.integrity = r.integrity),
      r.referrerPolicy && (l.referrerPolicy = r.referrerPolicy),
      r.crossOrigin === "use-credentials"
        ? (l.credentials = "include")
        : r.crossOrigin === "anonymous"
        ? (l.credentials = "omit")
        : (l.credentials = "same-origin"),
      l
    );
  }
  function s(r) {
    if (r.ep) return;
    r.ep = !0;
    const l = n(r);
    fetch(r.href, l);
  }
})();
const ui = !1,
  pi = (e, t) => e === t,
  mi = Symbol("solid-track"),
  dn = { equals: pi };
let sr = mr;
const Ze = 1,
  cn = 2,
  dr = { owned: null, cleanups: null, context: null, owner: null };
var ve = null;
let xn = null,
  gi = null,
  $e = null,
  Oe = null,
  je = null,
  vn = 0;
function rt(e, t) {
  const n = $e,
    s = ve,
    r = e.length === 0,
    l = t === void 0 ? s : t,
    o = r
      ? dr
      : {
          owned: null,
          cleanups: null,
          context: l ? l.context : null,
          owner: l,
        },
    i = r ? e : () => e(() => ze(() => Ft(o)));
  (ve = o), ($e = null);
  try {
    return yt(i, !0);
  } finally {
    ($e = n), (ve = s);
  }
}
function k(e, t) {
  t = t ? Object.assign({}, dn, t) : dn;
  const n = {
      value: e,
      observers: null,
      observerSlots: null,
      comparator: t.equals || void 0,
    },
    s = (r) => (typeof r == "function" && (r = r(n.value)), pr(n, r));
  return [ur.bind(n), s];
}
function W(e, t, n) {
  const s = co(e, t, !1, Ze);
  Rt(s);
}
function be(e, t, n) {
  sr = wi;
  const s = co(e, t, !1, Ze);
  (!n || !n.render) && (s.user = !0), je ? je.push(s) : Rt(s);
}
function oe(e, t, n) {
  n = n ? Object.assign({}, dn, n) : dn;
  const s = co(e, t, !0, 0);
  return (
    (s.observers = null),
    (s.observerSlots = null),
    (s.comparator = n.equals || void 0),
    Rt(s),
    ur.bind(s)
  );
}
function ze(e) {
  if ($e === null) return e();
  const t = $e;
  $e = null;
  try {
    return e();
  } finally {
    $e = t;
  }
}
function Ie(e) {
  be(() => ze(e));
}
function De(e) {
  return (
    ve === null ||
      (ve.cleanups === null ? (ve.cleanups = [e]) : ve.cleanups.push(e)),
    e
  );
}
function hi() {
  return ve;
}
function fi(e, t) {
  const n = ve,
    s = $e;
  (ve = e), ($e = null);
  try {
    return yt(t, !0);
  } catch (r) {
    uo(r);
  } finally {
    (ve = n), ($e = s);
  }
}
function vi(e, t) {
  const n = Symbol("context");
  return { id: n, Provider: _i(n), defaultValue: e };
}
function bi(e) {
  let t;
  return ve && ve.context && (t = ve.context[e.id]) !== void 0
    ? t
    : e.defaultValue;
}
function cr(e) {
  const t = oe(e),
    n = oe(() => Bn(t()));
  return (
    (n.toArray = () => {
      const s = n();
      return Array.isArray(s) ? s : s != null ? [s] : [];
    }),
    n
  );
}
function ur() {
  if (this.sources && this.state)
    if (this.state === Ze) Rt(this);
    else {
      const e = Oe;
      (Oe = null), yt(() => pn(this), !1), (Oe = e);
    }
  if ($e) {
    const e = this.observers ? this.observers.length : 0;
    $e.sources
      ? ($e.sources.push(this), $e.sourceSlots.push(e))
      : (($e.sources = [this]), ($e.sourceSlots = [e])),
      this.observers
        ? (this.observers.push($e),
          this.observerSlots.push($e.sources.length - 1))
        : ((this.observers = [$e]),
          (this.observerSlots = [$e.sources.length - 1]));
  }
  return this.value;
}
function pr(e, t, n) {
  let s = e.value;
  return (
    (!e.comparator || !e.comparator(s, t)) &&
      ((e.value = t),
      e.observers &&
        e.observers.length &&
        yt(() => {
          for (let r = 0; r < e.observers.length; r += 1) {
            const l = e.observers[r],
              o = xn && xn.running;
            o && xn.disposed.has(l),
              (o ? !l.tState : !l.state) &&
                (l.pure ? Oe.push(l) : je.push(l), l.observers && gr(l)),
              o || (l.state = Ze);
          }
          if (Oe.length > 1e6) throw ((Oe = []), new Error());
        }, !1)),
    t
  );
}
function Rt(e) {
  if (!e.fn) return;
  Ft(e);
  const t = vn;
  xi(e, e.value, t);
}
function xi(e, t, n) {
  let s;
  const r = ve,
    l = $e;
  $e = ve = e;
  try {
    s = e.fn(t);
  } catch (o) {
    return (
      e.pure &&
        ((e.state = Ze), e.owned && e.owned.forEach(Ft), (e.owned = null)),
      (e.updatedAt = n + 1),
      uo(o)
    );
  } finally {
    ($e = l), (ve = r);
  }
  (!e.updatedAt || e.updatedAt <= n) &&
    (e.updatedAt != null && "observers" in e ? pr(e, s) : (e.value = s),
    (e.updatedAt = n));
}
function co(e, t, n, s = Ze, r) {
  const l = {
    fn: e,
    state: s,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: ve,
    context: ve ? ve.context : null,
    pure: n,
  };
  return (
    ve === null ||
      (ve !== dr && (ve.owned ? ve.owned.push(l) : (ve.owned = [l]))),
    l
  );
}
function un(e) {
  if (e.state === 0) return;
  if (e.state === cn) return pn(e);
  if (e.suspense && ze(e.suspense.inFallback))
    return e.suspense.effects.push(e);
  const t = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < vn); )
    e.state && t.push(e);
  for (let n = t.length - 1; n >= 0; n--)
    if (((e = t[n]), e.state === Ze)) Rt(e);
    else if (e.state === cn) {
      const s = Oe;
      (Oe = null), yt(() => pn(e, t[0]), !1), (Oe = s);
    }
}
function yt(e, t) {
  if (Oe) return e();
  let n = !1;
  t || (Oe = []), je ? (n = !0) : (je = []), vn++;
  try {
    const s = e();
    return yi(n), s;
  } catch (s) {
    n || (je = null), (Oe = null), uo(s);
  }
}
function yi(e) {
  if ((Oe && (mr(Oe), (Oe = null)), e)) return;
  const t = je;
  (je = null), t.length && yt(() => sr(t), !1);
}
function mr(e) {
  for (let t = 0; t < e.length; t++) un(e[t]);
}
function wi(e) {
  let t,
    n = 0;
  for (t = 0; t < e.length; t++) {
    const s = e[t];
    s.user ? (e[n++] = s) : un(s);
  }
  for (t = 0; t < n; t++) un(e[t]);
}
function pn(e, t) {
  e.state = 0;
  for (let n = 0; n < e.sources.length; n += 1) {
    const s = e.sources[n];
    if (s.sources) {
      const r = s.state;
      r === Ze
        ? s !== t && (!s.updatedAt || s.updatedAt < vn) && un(s)
        : r === cn && pn(s, t);
    }
  }
}
function gr(e) {
  for (let t = 0; t < e.observers.length; t += 1) {
    const n = e.observers[t];
    n.state ||
      ((n.state = cn), n.pure ? Oe.push(n) : je.push(n), n.observers && gr(n));
  }
}
function Ft(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const n = e.sources.pop(),
        s = e.sourceSlots.pop(),
        r = n.observers;
      if (r && r.length) {
        const l = r.pop(),
          o = n.observerSlots.pop();
        s < r.length &&
          ((l.sourceSlots[o] = s), (r[s] = l), (n.observerSlots[s] = o));
      }
    }
  if (e.tOwned) {
    for (t = e.tOwned.length - 1; t >= 0; t--) Ft(e.tOwned[t]);
    delete e.tOwned;
  }
  if (e.owned) {
    for (t = e.owned.length - 1; t >= 0; t--) Ft(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = e.cleanups.length - 1; t >= 0; t--) e.cleanups[t]();
    e.cleanups = null;
  }
  e.state = 0;
}
function $i(e) {
  return e instanceof Error
    ? e
    : new Error(typeof e == "string" ? e : "Unknown error", { cause: e });
}
function uo(e, t = ve) {
  throw $i(e);
}
function Bn(e) {
  if (typeof e == "function" && !e.length) return Bn(e());
  if (Array.isArray(e)) {
    const t = [];
    for (let n = 0; n < e.length; n++) {
      const s = Bn(e[n]);
      Array.isArray(s) ? t.push.apply(t, s) : t.push(s);
    }
    return t;
  }
  return e;
}
function _i(e, t) {
  return function (s) {
    let r;
    return (
      W(
        () =>
          (r = ze(
            () => (
              (ve.context = { ...ve.context, [e]: s.value }),
              cr(() => s.children)
            )
          )),
        void 0
      ),
      r
    );
  };
}
const Ti = Symbol("fallback");
function fo(e) {
  for (let t = 0; t < e.length; t++) e[t]();
}
function Ci(e, t, n = {}) {
  let s = [],
    r = [],
    l = [],
    o = 0,
    i = t.length > 1 ? [] : null;
  return (
    De(() => fo(l)),
    () => {
      let c = e() || [],
        p = c.length,
        u,
        m;
      return (
        c[mi],
        ze(() => {
          let _, E, w, D, T, S, h, b, x;
          if (p === 0)
            o !== 0 &&
              (fo(l), (l = []), (s = []), (r = []), (o = 0), i && (i = [])),
              n.fallback &&
                ((s = [Ti]),
                (r[0] = rt((I) => ((l[0] = I), n.fallback()))),
                (o = 1));
          else if (o === 0) {
            for (r = new Array(p), m = 0; m < p; m++)
              (s[m] = c[m]), (r[m] = rt(v));
            o = p;
          } else {
            for (
              w = new Array(p),
                D = new Array(p),
                i && (T = new Array(p)),
                S = 0,
                h = Math.min(o, p);
              S < h && s[S] === c[S];
              S++
            );
            for (
              h = o - 1, b = p - 1;
              h >= S && b >= S && s[h] === c[b];
              h--, b--
            )
              (w[b] = r[h]), (D[b] = l[h]), i && (T[b] = i[h]);
            for (_ = new Map(), E = new Array(b + 1), m = b; m >= S; m--)
              (x = c[m]),
                (u = _.get(x)),
                (E[m] = u === void 0 ? -1 : u),
                _.set(x, m);
            for (u = S; u <= h; u++)
              (x = s[u]),
                (m = _.get(x)),
                m !== void 0 && m !== -1
                  ? ((w[m] = r[u]),
                    (D[m] = l[u]),
                    i && (T[m] = i[u]),
                    (m = E[m]),
                    _.set(x, m))
                  : l[u]();
            for (m = S; m < p; m++)
              m in w
                ? ((r[m] = w[m]), (l[m] = D[m]), i && ((i[m] = T[m]), i[m](m)))
                : (r[m] = rt(v));
            (r = r.slice(0, (o = p))), (s = c.slice(0));
          }
          return r;
        })
      );
      function v(_) {
        if (((l[m] = _), i)) {
          const [E, w] = k(m);
          return (i[m] = w), t(c[m], E);
        }
        return t(c[m]);
      }
    }
  );
}
function d(e, t) {
  return ze(() => e(t || {}));
}
const Ii = (e) => `Stale read from <${e}>.`;
function ae(e) {
  const t = "fallback" in e && { fallback: () => e.fallback };
  return oe(Ci(() => e.each, e.children, t || void 0));
}
function te(e) {
  const t = e.keyed,
    n = oe(() => e.when, void 0, void 0),
    s = t ? n : oe(n, void 0, { equals: (r, l) => !r == !l });
  return oe(
    () => {
      const r = s();
      if (r) {
        const l = e.children;
        return typeof l == "function" && l.length > 0
          ? ze(() =>
              l(
                t
                  ? r
                  : () => {
                      if (!ze(s)) throw Ii("Show");
                      return n();
                    }
              )
            )
          : l;
      }
      return e.fallback;
    },
    void 0,
    void 0
  );
}
function Si(e, t, n) {
  let s = n.length,
    r = t.length,
    l = s,
    o = 0,
    i = 0,
    c = t[r - 1].nextSibling,
    p = null;
  for (; o < r || i < l; ) {
    if (t[o] === n[i]) {
      o++, i++;
      continue;
    }
    for (; t[r - 1] === n[l - 1]; ) r--, l--;
    if (r === o) {
      const u = l < s ? (i ? n[i - 1].nextSibling : n[l - i]) : c;
      for (; i < l; ) e.insertBefore(n[i++], u);
    } else if (l === i)
      for (; o < r; ) (!p || !p.has(t[o])) && t[o].remove(), o++;
    else if (t[o] === n[l - 1] && n[i] === t[r - 1]) {
      const u = t[--r].nextSibling;
      e.insertBefore(n[i++], t[o++].nextSibling),
        e.insertBefore(n[--l], u),
        (t[r] = n[l]);
    } else {
      if (!p) {
        p = new Map();
        let m = i;
        for (; m < l; ) p.set(n[m], m++);
      }
      const u = p.get(t[o]);
      if (u != null)
        if (i < u && u < l) {
          let m = o,
            v = 1,
            _;
          for (
            ;
            ++m < r && m < l && !((_ = p.get(t[m])) == null || _ !== u + v);

          )
            v++;
          if (v > u - i) {
            const E = t[o];
            for (; i < u; ) e.insertBefore(n[i++], E);
          } else e.replaceChild(n[i++], t[o++]);
        } else o++;
      else t[o++].remove();
    }
  }
}
const vo = "_$DX_DELEGATE";
function Ei(e, t, n, s = {}) {
  let r;
  return (
    rt((l) => {
      (r = l),
        t === document ? e() : a(t, e(), t.firstChild ? null : void 0, n);
    }, s.owner),
    () => {
      r(), (t.textContent = "");
    }
  );
}
function O(e, t, n, s) {
  let r;
  const l = () => {
      const i = document.createElement("template");
      return (i.innerHTML = e), i.content.firstChild;
    },
    o = () => (r || (r = l())).cloneNode(!0);
  return (o.cloneNode = o), o;
}
function ge(e, t = window.document) {
  const n = t[vo] || (t[vo] = new Set());
  for (let s = 0, r = e.length; s < r; s++) {
    const l = e[s];
    n.has(l) || (n.add(l), t.addEventListener(l, Oi));
  }
}
function le(e, t, n) {
  n == null ? e.removeAttribute(t) : e.setAttribute(t, n);
}
function L(e, t) {
  t == null ? e.removeAttribute("class") : (e.className = t);
}
function Ae(e, t, n, s) {
  Array.isArray(n)
    ? ((e[`$$${t}`] = n[0]), (e[`$$${t}Data`] = n[1]))
    : (e[`$$${t}`] = n);
}
function Be(e, t, n = {}) {
  const s = Object.keys(t || {}),
    r = Object.keys(n);
  let l, o;
  for (l = 0, o = r.length; l < o; l++) {
    const i = r[l];
    !i || i === "undefined" || t[i] || (bo(e, i, !1), delete n[i]);
  }
  for (l = 0, o = s.length; l < o; l++) {
    const i = s[l],
      c = !!t[i];
    !i || i === "undefined" || n[i] === c || !c || (bo(e, i, !0), (n[i] = c));
  }
  return n;
}
function ye(e, t, n) {
  return ze(() => e(t, n));
}
function a(e, t, n, s) {
  if ((n !== void 0 && !s && (s = []), typeof t != "function"))
    return mn(e, t, s, n);
  W((r) => mn(e, t(), r, n), s);
}
function bo(e, t, n) {
  const s = t.trim().split(/\s+/);
  for (let r = 0, l = s.length; r < l; r++) e.classList.toggle(s[r], n);
}
function Oi(e) {
  let t = e.target;
  const n = `$$${e.type}`,
    s = e.target,
    r = e.currentTarget,
    l = (c) =>
      Object.defineProperty(e, "target", { configurable: !0, value: c }),
    o = () => {
      const c = t[n];
      if (c && !t.disabled) {
        const p = t[`${n}Data`];
        if ((p !== void 0 ? c.call(t, p, e) : c.call(t, e), e.cancelBubble))
          return;
      }
      return (
        t.host &&
          typeof t.host != "string" &&
          !t.host._$host &&
          t.contains(e.target) &&
          l(t.host),
        !0
      );
    },
    i = () => {
      for (; o() && (t = t._$host || t.parentNode || t.host); );
    };
  if (
    (Object.defineProperty(e, "currentTarget", {
      configurable: !0,
      get() {
        return t || document;
      },
    }),
    e.composedPath)
  ) {
    const c = e.composedPath();
    l(c[0]);
    for (let p = 0; p < c.length - 2 && ((t = c[p]), !!o()); p++) {
      if (t._$host) {
        (t = t._$host), i();
        break;
      }
      if (t.parentNode === r) break;
    }
  } else i();
  l(s);
}
function mn(e, t, n, s, r) {
  for (; typeof n == "function"; ) n = n();
  if (t === n) return n;
  const l = typeof t,
    o = s !== void 0;
  if (
    ((e = (o && n[0] && n[0].parentNode) || e),
    l === "string" || l === "number")
  ) {
    if (l === "number" && ((t = t.toString()), t === n)) return n;
    if (o) {
      let i = n[0];
      i && i.nodeType === 3
        ? i.data !== t && (i.data = t)
        : (i = document.createTextNode(t)),
        (n = at(e, n, s, i));
    } else
      n !== "" && typeof n == "string"
        ? (n = e.firstChild.data = t)
        : (n = e.textContent = t);
  } else if (t == null || l === "boolean") n = at(e, n, s);
  else {
    if (l === "function")
      return (
        W(() => {
          let i = t();
          for (; typeof i == "function"; ) i = i();
          n = mn(e, i, n, s);
        }),
        () => n
      );
    if (Array.isArray(t)) {
      const i = [],
        c = n && Array.isArray(n);
      if (Rn(i, t, n, r)) return W(() => (n = mn(e, i, n, s, !0))), () => n;
      if (i.length === 0) {
        if (((n = at(e, n, s)), o)) return n;
      } else
        c
          ? n.length === 0
            ? xo(e, i, s)
            : Si(e, n, i)
          : (n && at(e), xo(e, i));
      n = i;
    } else if (t.nodeType) {
      if (Array.isArray(n)) {
        if (o) return (n = at(e, n, s, t));
        at(e, n, null, t);
      } else
        n == null || n === "" || !e.firstChild
          ? e.appendChild(t)
          : e.replaceChild(t, e.firstChild);
      n = t;
    }
  }
  return n;
}
function Rn(e, t, n, s) {
  let r = !1;
  for (let l = 0, o = t.length; l < o; l++) {
    let i = t[l],
      c = n && n[e.length],
      p;
    if (!(i == null || i === !0 || i === !1))
      if ((p = typeof i) == "object" && i.nodeType) e.push(i);
      else if (Array.isArray(i)) r = Rn(e, i, c) || r;
      else if (p === "function")
        if (s) {
          for (; typeof i == "function"; ) i = i();
          r =
            Rn(e, Array.isArray(i) ? i : [i], Array.isArray(c) ? c : [c]) || r;
        } else e.push(i), (r = !0);
      else {
        const u = String(i);
        c && c.nodeType === 3 && c.data === u
          ? e.push(c)
          : e.push(document.createTextNode(u));
      }
  }
  return r;
}
function xo(e, t, n = null) {
  for (let s = 0, r = t.length; s < r; s++) e.insertBefore(t[s], n);
}
function at(e, t, n, s) {
  if (n === void 0) return (e.textContent = "");
  const r = s || document.createTextNode("");
  if (t.length) {
    let l = !1;
    for (let o = t.length - 1; o >= 0; o--) {
      const i = t[o];
      if (r !== i) {
        const c = i.parentNode === e;
        !l && !o
          ? c
            ? e.replaceChild(r, i)
            : e.insertBefore(r, n)
          : c && i.remove();
      } else l = !0;
    }
  } else e.insertBefore(r, n);
  return [r];
}
const Di = "http://www.w3.org/2000/svg";
function Ni(e, t = !1) {
  return t ? document.createElementNS(Di, e) : document.createElement(e);
}
function ki(e) {
  const { useShadow: t } = e,
    n = document.createTextNode(""),
    s = () => e.mount || document.body,
    r = hi();
  let l;
  return (
    be(
      () => {
        l || (l = fi(r, () => oe(() => e.children)));
        const o = s();
        if (o instanceof HTMLHeadElement) {
          const [i, c] = k(!1),
            p = () => c(!0);
          rt((u) => a(o, () => (i() ? u() : l()), null)), De(p);
        } else {
          const i = Ni(e.isSVG ? "g" : "div", e.isSVG),
            c = t && i.attachShadow ? i.attachShadow({ mode: "open" }) : i;
          Object.defineProperty(i, "_$host", {
            get() {
              return n.parentNode;
            },
            configurable: !0,
          }),
            a(c, l),
            o.appendChild(i),
            e.ref && e.ref(i),
            De(() => o.removeChild(i));
        }
      },
      void 0,
      { render: !0 }
    ),
    n
  );
}
const Pi = "_draggable_q87cm_71",
  Ai = "_dragging_q87cm_79",
  Mi = "_selection_q87cm_87",
  Vi = "_testWorkFlow_q87cm_245",
  Li = "_loader_q87cm_273",
  Fi = "_testButton_q87cm_315",
  Bi = "_zoomControl_q87cm_337",
  Ri = "_zoomFit_q87cm_355",
  qi = "_zoomIn_q87cm_409",
  Hi = "_zoomOut_q87cm_461",
  ji = "_zoomReset_q87cm_513",
  zi = "_zoomResetHide_q87cm_565",
  Ee = {
    "dot-flow__pane": "_dot-flow__pane_q87cm_63",
    draggable: Pi,
    dragging: Ai,
    selection: Mi,
    "dot-flow__viewport": "_dot-flow__viewport_q87cm_97",
    "dot-flow__background": "_dot-flow__background_q87cm_127",
    testWorkFlow: Vi,
    loader: Li,
    testButton: Fi,
    zoomControl: Bi,
    zoomFit: Ri,
    zoomIn: qi,
    zoomOut: Hi,
    zoomReset: ji,
    zoomResetHide: zi,
  },
  [hr, fr] = k(!1),
  [vr, br] = k(!1),
  [xr, yr] = k(!1),
  [wr, $r] = k(1),
  [_r, Tr] = k([]),
  [Cr, Ir] = k(null),
  [Sr, Er] = k([]),
  [Or, Dr] = k(0);
let [Nr, kr] = k(!1),
  Pr;
const [Ar, Mr] = k({ x: 0, y: 0 }),
  [Vr, Lr] = k({ x: 0, y: 0 }),
  [Fr, Br] = k([]),
  [Rr, qr] = k({ x: 0, y: 0 }),
  [Hr, jr] = k(null),
  [zr, Wr] = k(null),
  [Kr, Ur] = k(null),
  [Gr, Xr] = k(!1),
  [Yr, Jr] = k({ x: 0, y: 0 }),
  [Qr, Zr] = k(!1),
  [el, tl] = k(!1),
  [nl, ol] = k(!1),
  [rl, ll] = k(!1),
  [il, al] = k(""),
  [sl, dl] = k(null),
  [cl, ul] = k({ name: "", id: "", title: "" }),
  [pl, ml] = k({ name: "", id: "", title: "" }),
  [gl, hl] = k([]),
  [fl, vl] = k(null),
  [bl, xl] = k({}),
  [yl, wl] = k({ x: -1, y: -1 }),
  [$l, _l] = k(!1),
  [Tl, Cl] = k(null),
  [Il, Sl] = k(null),
  [El, Ol] = k(null),
  [Dl, Nl] = k([]),
  [kl, Pl] = k(null),
  [Al, Ml] = k(null),
  Vl = vi({
    scale: wr,
    setScale: $r,
    draggable: hr,
    setDraggable: fr,
    isCtrlPressed: vr,
    setIsCtrlPressed: br,
    isSpacePressed: xr,
    setIsSpacePressed: yr,
    edges: _r,
    setEdges: Tr,
    newEdge: Cr,
    setNewEdge: Ir,
    busyIndex: Sr,
    setBusyIndex: Er,
    edgeLength: Or,
    setEdgeLength: Dr,
    isOpen: Nr,
    setIsOpen: kr,
    inputRef: Pr,
    edgeEnd: Ar,
    setEdgeEnd: Mr,
    transform: Vr,
    setTransform: Lr,
    nodes: Fr,
    setNodes: Br,
    preTransform: Rr,
    setPreTransform: qr,
    selectedNode: Hr,
    setSelectedNode: jr,
    pendingOutput: zr,
    setPendingOutput: Wr,
    lastClickPosition: Kr,
    setLastClickPosition: Ur,
    isShowModal: Gr,
    setIsShowModal: Xr,
    positionButton: Yr,
    setPositionButton: Jr,
    isOpening: Qr,
    setIsOpening: Zr,
    isModalOpen: el,
    setIsModalOpen: tl,
    typeOfVertex: il,
    setTypeOfVertex: al,
    currentFormConfig: cl,
    setCurrentFormConfig: ul,
    previousFormConfig: pl,
    setPreviousFormConfig: ml,
    isModalOpen2: nl,
    setIsModalOpen2: ol,
    isModalOpen3: rl,
    setIsModalOpen3: ll,
    credentialOptions: gl,
    setCredentialOptions: hl,
    selectedCredential: fl,
    setSelectedCredential: vl,
    formData: bl,
    setFormData: xl,
    settingConfig: sl,
    setSettingConfig: dl,
    clickedPosition: yl,
    setClickedPosition: wl,
    boardDragging: $l,
    setBoardDragging: _l,
    selectedEdge: Tl,
    setSelectedEdge: Cl,
    insideInput: Il,
    setInsideInput: Sl,
    selectionBox: El,
    setSelectionBox: Ol,
    selectedNodesGroup: Dl,
    setSelectedNodesGroup: Nl,
    groupBoundingBox: kl,
    setGroupBoundingBox: Pl,
    lastPointer: Al,
    setLastPointer: Ml,
  }),
  ie = () => {
    const e = bi(Vl);
    if (!e)
      throw new Error(
        "useStateContext must be used within StateContextProvider."
      );
    return e;
  };
var Wi = O(
  '<div id=zoom-control><button title=fit type=button id=zoom-fit><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=1.5em width=1.5em style=overflow:visible;color:currentcolor;><path d="M342 88H120c-17.7 0-32 14.3-32 32v224c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16V168h174c8.8 0 16-7.2 16-16v-48c0-8.8-7.2-16-16-16zm578 576h-48c-8.8 0-16 7.2-16 16v176H682c-8.8 0-16 7.2-16 16v48c0 8.8 7.2 16 16 16h222c17.7 0 32-14.3 32-32V680c0-8.8-7.2-16-16-16zM342 856H168V680c0-8.8-7.2-16-16-16h-48c-8.8 0-16 7.2-16 16v224c0 17.7 14.3 32 32 32h222c8.8 0 16-7.2 16-16v-48c0-8.8-7.2-16-16-16zM904 88H682c-8.8 0-16 7.2-16 16v48c0 8.8 7.2 16 16 16h174v176c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16V120c0-17.7-14.3-32-32-32z"></path></svg></button><button title=in type=button id=zoom-in><svg fill=none stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 16 16"height=1.3em width=1.3em style=overflow:visible;color:currentcolor;><path fill=currentColor d="m15.504 13.616-3.79-3.223c-.392-.353-.811-.514-1.149-.499a6 6 0 1 0-.672.672c-.016.338.146.757.499 1.149l3.223 3.79c.552.613 1.453.665 2.003.115s.498-1.452-.115-2.003zM6 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm1-7H5v2H3v2h2v2h2V7h2V5H7z"></path></svg></button><button title=out type=button id=zoom-out><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 16 16"height=1.3em width=1.3em style=overflow:visible;color:currentcolor;><path fill=currentColor d="m15.504 13.616-3.79-3.223c-.392-.353-.811-.514-1.149-.499a6 6 0 1 0-.672.672c-.016.338.146.757.499 1.149l3.223 3.79c.552.613 1.453.665 2.003.115s.498-1.452-.115-2.003zM6 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM3 5h6v2H3z"></path></svg></button><button title=reset type=button id=zoom-reset><svg fill=none stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"height=2em width=2em style=overflow:visible;color:currentcolor;><path fill=currentColor d="M5.34 4.468h2v2.557a7 7 0 1 1-1.037 10.011l1.619-1.185a5 5 0 1 0 .826-7.384h2.591v2h-6v-6Z">'
);
const Ki = ({ minScale: e = 0, maxScale: t = 2 }) => {
  const {
    setDraggable: n,
    setIsCtrlPressed: s,
    setIsSpacePressed: r,
    isCtrlPressed: l,
    isSpacePressed: o,
    scale: i,
    setScale: c,
    nodes: p,
    setTransform: u,
    setPreTransform: m,
    transform: v,
  } = ie();
  Ie(() => {
    const D = document.getElementById("pane"),
      T = (h) => {
        h.ctrlKey || (n(!1), s(!1)),
          (h.code === "Space" || h.key === " ") &&
            !(h.target instanceof HTMLInputElement) &&
            (h.preventDefault(), r(!1), n(!1));
      },
      S = (h) => {
        h.ctrlKey && (n(!0), s(!0)),
          (h.code === "Space" || h.key === " ") &&
            !(h.target instanceof HTMLInputElement) &&
            (h.preventDefault(), r(!0), n(!0));
      };
    if (D) {
      const h = (b) => {
        b.preventDefault(),
          l() || o()
            ? (console.log("good"),
              w(b, () => i() + b.deltaY * -1e-4, "cursor"))
            : b.shiftKey
            ? u((x) => ({ x: x.x - b.deltaY * 0.5, y: x.y }))
            : u((x) => ({ x: x.x, y: x.y - b.deltaY * 0.5 }));
      };
      document.addEventListener("keyup", T),
        document.addEventListener("keydown", S),
        D.addEventListener("wheel", h, { passive: !1 }),
        De(() => {
          document.removeEventListener("keydown", S),
            document.removeEventListener("keyup", T),
            D.removeEventListener("wheel", h);
        });
    }
  });
  function _(D) {
    if (D.length === 0) return { minX: 0, minY: 0, width: 0, height: 0 };
    const T = Math.min(...D.map((x) => x.currPosition.get().x)),
      S = Math.min(...D.map((x) => x.currPosition.get().y)),
      h = Math.max(
        ...D.map((x) => {
          const I = document.getElementById(x.id);
          return I
            ? x.currPosition.get().x + I.clientWidth
            : x.currPosition.get().x;
        })
      ),
      b = Math.max(
        ...D.map((x) => {
          const I = document.getElementById(x.id);
          return I
            ? x.currPosition.get().y + I.clientHeight
            : x.currPosition.get().y;
        })
      );
    return { minX: T, minY: S, width: h - T, height: b - S };
  }
  function E() {
    const D = document.getElementById("pane");
    if (!D) return;
    const T = _(p());
    if (!T) return;
    const S = 80,
      h = D.getBoundingClientRect(),
      b = h.width - S * 2,
      x = h.height - S * 2,
      I = b / T.width,
      A = x / T.height,
      y = Math.min(I, A, 1),
      g = T.minX + T.width / 2,
      N = T.minY + T.height / 2,
      C = h.width / 2 - g * y,
      $ = h.height / 2 - N * y;
    c(y), u({ x: C, y: $ }), m({ x: C, y: $ });
  }
  const w = (D, T, S = "cursor") => {
    const h = document.getElementById("pane");
    if (!h) return;
    D.preventDefault();
    const b = h.getBoundingClientRect(),
      x = S === "cursor" ? D.clientX - b.left : b.width / 2,
      I = S === "cursor" ? D.clientY - b.top : b.height / 2,
      A = i(),
      y = Math.min(Math.max(e, T()), t),
      g = (x - v().x) / A,
      N = (I - v().y) / A,
      C = x - g * y,
      $ = I - N * y;
    c(y), u({ x: C, y: $ }), m({ x: C, y: $ });
  };
  return (() => {
    var D = Wi(),
      T = D.firstChild,
      S = T.nextSibling,
      h = S.nextSibling,
      b = h.nextSibling;
    return (
      (T.$$click = () => E()),
      (S.$$click = (x) => w(x, () => i() + 0.01, "center")),
      (h.$$click = (x) => w(x, () => Math.max(0, i() - 0.01), "center")),
      (b.$$click = (x) =>
        w(x, () => (c(1), u({ x: 0, y: 0 }), m({ x: 0, y: 0 }), 1), "center")),
      W(
        (x) => {
          var I = Ee.zoomControl,
            A = Ee.zoomFit,
            y = Ee.zoomIn,
            g = Ee.zoomOut,
            N = i() > 1 || i() < 1 ? Ee.zoomReset : Ee.zoomResetHide;
          return (
            I !== x.e && L(D, (x.e = I)),
            A !== x.t && L(T, (x.t = A)),
            y !== x.a && L(S, (x.a = y)),
            g !== x.o && L(h, (x.o = g)),
            N !== x.i && L(b, (x.i = N)),
            x
          );
        },
        { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
      ),
      D
    );
  })();
};
ge(["click"]);
const Ui = "_sidebarMain_dxkxu_1",
  Gi = "_addNode_dxkxu_11",
  Xi = "_sidebarContent_dxkxu_71",
  Yi = "_nodeList_dxkxu_99",
  Ji = "_sidebarContentShow_dxkxu_113",
  Qi = "_sidebarContentHide_dxkxu_123",
  Zi = "_sidebarTitle_dxkxu_135",
  ea = "_searchContainer_dxkxu_153",
  ta = "_inputFieldContainer_dxkxu_161",
  na = "_inputField_dxkxu_161",
  oa = "_searchIcon_dxkxu_211",
  ra = "_firstWrapper_dxkxu_229",
  la = "_restNodeWrapper_dxkxu_251",
  ia = "_node_dxkxu_99",
  aa = "_nodeIcon_dxkxu_299",
  sa = "_title_dxkxu_311",
  da = "_description_dxkxu_325",
  Se = {
    sidebarMain: Ui,
    addNode: Gi,
    sidebarContent: Xi,
    nodeList: Yi,
    sidebarContentShow: Ji,
    sidebarContentHide: Qi,
    sidebarTitle: Zi,
    searchContainer: ea,
    inputFieldContainer: ta,
    inputField: na,
    searchIcon: oa,
    firstWrapper: ra,
    restNodeWrapper: la,
    node: ia,
    nodeIcon: aa,
    title: sa,
    description: da,
  };
var ca = O(
    '<aside id=sidebar-main><button title=add type=button id=add-node><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 448 512"height=1.5em width=1.5em style=overflow:visible;color:currentcolor;><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V288h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"></path></svg></button><div id=sidebar-content class><div id=sidebar-title>What happens next?</div><div><div><div><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 16 16"height=.8em width=.8em style=overflow:visible;color:currentcolor;><path fill=currentColor d="m15.504 13.616-3.79-3.223c-.392-.353-.811-.514-1.149-.499a6 6 0 1 0-.672.672c-.016.338.146.757.499 1.149l3.223 3.79c.552.613 1.453.665 2.003.115s.498-1.452-.115-2.003zM6 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"></path></svg></div><input title=search type=text placeholder="Search nodes..."></div></div><div>'
  ),
  ua = O("<div><div><div></div><div><div></div><div>");
const pa = (e) => {
  const { isOpen: t, setIsOpen: n } = ie();
  let s;
  const r = (o) => {
    const i = document.getElementById("sidebar-main"),
      c = document.querySelectorAll('[id^="output-"]');
    let p = !1;
    c.forEach((u) => {
      u.contains(o.target) && (p = !0);
    }),
      i && !i.contains(o.target) && !p && n(!1);
  };
  Ie(() => {
    document.addEventListener("click", r);
  });
  const l = (o, i) => {
    o.stopPropagation(), e.onClickAdd(i);
  };
  return (() => {
    var o = ca(),
      i = o.firstChild,
      c = i.nextSibling,
      p = c.firstChild,
      u = p.nextSibling,
      m = u.firstChild,
      v = m.firstChild,
      _ = v.nextSibling,
      E = u.nextSibling;
    return (
      (i.$$click = (w) => {
        w.stopPropagation(), n(!0), s && s.focus();
      }),
      ye((w) => (s = w), _),
      a(
        E,
        d(ae, {
          get each() {
            return e.nodeMark;
          },
          children: (w, D) =>
            (() => {
              var T = ua(),
                S = T.firstChild,
                h = S.firstChild,
                b = h.nextSibling,
                x = b.firstChild,
                I = x.nextSibling;
              return (
                (T.$$click = (A) => {
                  A.stopPropagation(), l(A, w.name);
                }),
                a(h, d(w.icon, {})),
                a(x, () => w.title),
                a(I, () => w.description),
                W(
                  (A) => {
                    var y = D() == 0 ? Se.firstWrapper : Se.restNodeWrapper,
                      g = Se.node,
                      N = Se.nodeIcon,
                      C = Se.title,
                      $ = Se.description;
                    return (
                      y !== A.e && L(T, (A.e = y)),
                      g !== A.t && L(S, (A.t = g)),
                      N !== A.a && L(h, (A.a = N)),
                      C !== A.o && L(x, (A.o = C)),
                      $ !== A.i && L(I, (A.i = $)),
                      A
                    );
                  },
                  { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
                ),
                T
              );
            })(),
        })
      ),
      W(
        (w) => {
          var D = Se.sidebarMain,
            T = Se.addNode,
            S = {
              [Se.sidebarContent]: !0,
              [Se.sidebarContentShow]: t(),
              [Se.sidebarContentHide]: !t(),
            },
            h = Se.sidebarTitle,
            b = Se.searchContainer,
            x = Se.inputFieldContainer,
            I = Se.searchIcon,
            A = Se.inputField,
            y = Se.nodeList;
          return (
            D !== w.e && L(o, (w.e = D)),
            T !== w.t && L(i, (w.t = T)),
            (w.a = Be(c, S, w.a)),
            h !== w.o && L(p, (w.o = h)),
            b !== w.i && L(u, (w.i = b)),
            x !== w.n && L(m, (w.n = x)),
            I !== w.s && L(v, (w.s = I)),
            A !== w.h && L(_, (w.h = A)),
            y !== w.r && L(E, (w.r = y)),
            w
          );
        },
        {
          e: void 0,
          t: void 0,
          a: void 0,
          o: void 0,
          i: void 0,
          n: void 0,
          s: void 0,
          h: void 0,
          r: void 0,
        }
      ),
      o
    );
  })();
};
ge(["click"]);
const ma = "_node_xsk2j_1",
  ga = "_nodeSelected_xsk2j_35",
  ha = "_inputsWrapper_xsk2j_69",
  fa = "_input_xsk2j_69",
  va = "_inputsUPWrapper_xsk2j_113",
  ba = "_inputUp_xsk2j_143",
  xa = "_outputsDownWrapper_xsk2j_169",
  ya = "_outputDown_xsk2j_195",
  wa = "_outputDownVertex_xsk2j_207",
  $a = "_downOutputLine_xsk2j_225",
  _a = "_downPlusLine_xsk2j_241",
  Ta = "_outputsWrapper_xsk2j_275",
  Ca = "_output_xsk2j_169",
  Ia = "_outputCircle_xsk2j_325",
  Sa = "_outputLine_xsk2j_351",
  Ea = "_plusLine_xsk2j_367",
  Oa = "_vertexNum_xsk2j_387",
  Da = "_plusLineHidden_xsk2j_453",
  Na = "_outputPlus_xsk2j_463",
  ka = "_functionWrapper_xsk2j_555",
  he = {
    node: ma,
    nodeSelected: ga,
    inputsWrapper: ha,
    input: fa,
    inputsUPWrapper: va,
    inputUp: ba,
    outputsDownWrapper: xa,
    outputDown: ya,
    outputDownVertex: wa,
    downOutputLine: $a,
    downPlusLine: _a,
    outputsWrapper: Ta,
    output: Ca,
    outputCircle: Ia,
    outputLine: Sa,
    plusLine: Ea,
    vertexNum: Oa,
    plusLineHidden: Da,
    outputPlus: Na,
    function: "_function_xsk2j_521",
    functionWrapper: ka,
  };
var Pa = O(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 448 512"height=.8em width=.8em style=overflow:visible;color:currentcolor;><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V288h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z">'
);
const qn = (e) => Pa();
var Ke = O("<div>"),
  yo = O("<div><div>"),
  wo = O("<div><div></div><div><div></div><div id=plus>");
const Aa = (e) => {
  const { newEdge: t, edgeLength: n, setIsOpen: s, setPendingOutput: r } = ie();
  function l(c, p) {
    const { left: u, right: m, top: v, bottom: _ } = c.getBoundingClientRect(),
      E = u + Math.abs(u - m) / 2,
      w = v + Math.abs(v - _) / 2;
    e.onMouseEnterInput(E, w, e.id, p);
  }
  function o(c) {
    e.onMouseLeaveInput(e.id, c);
  }
  function i(c, p, u, m, v, _, E) {
    p.stopPropagation();
    const { left: w, right: D, top: T, bottom: S } = c.getBoundingClientRect(),
      h = w + Math.abs(w - D) / 2,
      b = T + Math.abs(T - S) / 2;
    _(h, b, E, u, m, v);
  }
  return (() => {
    var c = Ke();
    return (
      a(
        c,
        (() => {
          var p = oe(() => !!e.isInputVertex);
          return () =>
            p()
              ? (() => {
                  var u = Ke();
                  return (
                    a(
                      u,
                      d(ae, {
                        get each() {
                          return e.inputVertexIds;
                        },
                        children: (m, v) => {
                          let _ = null;
                          return (() => {
                            var E = yo(),
                              w = E.firstChild;
                            E.addEventListener("mouseleave", () => o(v())),
                              E.addEventListener("mouseenter", () => l(_, v())),
                              le(E, "id", `input-${m}`);
                            var D = _;
                            return (
                              typeof D == "function" ? ye(D, w) : (_ = w),
                              le(w, "id", m),
                              W(() => L(w, he.input)),
                              E
                            );
                          })();
                        },
                      })
                    ),
                    W(() => L(u, he.inputsWrapper)),
                    u
                  );
                })()
              : Ke();
        })(),
        null
      ),
      a(
        c,
        (() => {
          var p = oe(() => !!e.isOutputVertex);
          return () =>
            p() &&
            (() => {
              var u = Ke();
              return (
                a(
                  u,
                  d(ae, {
                    get each() {
                      return e.outputVertexIds;
                    },
                    children: (m, v) => {
                      let _ = null;
                      return (() => {
                        var E = wo(),
                          w = E.firstChild,
                          D = w.nextSibling,
                          T = D.firstChild,
                          S = T.nextSibling;
                        (E.$$mousedown = (b) => i(_, b, v(), m, "solid")),
                          (E.$$click = (b) => {
                            b.stopPropagation(),
                              s(!0),
                              r({ nodeId: e.id, outputVertexIndex: v() });
                          }),
                          le(E, "id", `output-${m}`);
                        var h = _;
                        return (
                          typeof h == "function" ? ye(h, w) : (_ = w),
                          le(w, "id", m),
                          a(
                            D,
                            (() => {
                              var b = oe(() => e.numberOutputs > 1);
                              return () =>
                                b() &&
                                (() => {
                                  var x = Ke();
                                  return (
                                    a(x, v), W(() => L(x, he.vertexNum)), x
                                  );
                                })();
                            })(),
                            T
                          ),
                          a(S, d(qn, {})),
                          W(
                            (b) => {
                              var x = he.output,
                                I = he.outputCircle,
                                A = {
                                  [he.plusLine]: !0,
                                  [he.plusLineHidden]:
                                    (t()?.outputVertexId == m && n() > 10) ||
                                    e.busyIndex.get().includes(m),
                                },
                                y = he.outputLine,
                                g = he.outputPlus;
                              return (
                                x !== b.e && L(E, (b.e = x)),
                                I !== b.t && L(w, (b.t = I)),
                                (b.a = Be(D, A, b.a)),
                                y !== b.o && L(T, (b.o = y)),
                                g !== b.i && L(S, (b.i = g)),
                                b
                              );
                            },
                            {
                              e: void 0,
                              t: void 0,
                              a: void 0,
                              o: void 0,
                              i: void 0,
                            }
                          ),
                          E
                        );
                      })();
                    },
                  })
                ),
                W(() => L(u, he.outputsWrapper)),
                u
              );
            })();
        })(),
        null
      ),
      a(
        c,
        (() => {
          var p = oe(() => !!e.isDownVertex);
          return () =>
            p() &&
            (() => {
              var u = Ke();
              return (
                a(
                  u,
                  d(ae, {
                    get each() {
                      return e.downVertexIds;
                    },
                    children: (m, v) => {
                      let _ = null;
                      return (() => {
                        var E = wo(),
                          w = E.firstChild,
                          D = w.nextSibling,
                          T = D.firstChild,
                          S = T.nextSibling;
                        (E.$$mousedown = (b) =>
                          i(_, b, v(), m, "dash", e.onMouseDownOutput, e.id)),
                          (E.$$click = (b) => {
                            b.stopPropagation(),
                              s(!0),
                              r({ nodeId: e.id, outputVertexIndex: v() });
                          }),
                          le(E, "id", `output-${m}`);
                        var h = _;
                        return (
                          typeof h == "function" ? ye(h, w) : (_ = w),
                          le(w, "id", m),
                          a(S, d(qn, {})),
                          W(
                            (b) => {
                              var x = he.outputDown,
                                I = he.outputDownVertex,
                                A = { [he.downPlusLine]: !0 },
                                y = he.downOutputLine,
                                g = he.outputPlus;
                              return (
                                x !== b.e && L(E, (b.e = x)),
                                I !== b.t && L(w, (b.t = I)),
                                (b.a = Be(D, A, b.a)),
                                y !== b.o && L(T, (b.o = y)),
                                g !== b.i && L(S, (b.i = g)),
                                b
                              );
                            },
                            {
                              e: void 0,
                              t: void 0,
                              a: void 0,
                              o: void 0,
                              i: void 0,
                            }
                          ),
                          E
                        );
                      })();
                    },
                  })
                ),
                W(() => L(u, `${he.outputsDownWrapper} `)),
                u
              );
            })();
        })(),
        null
      ),
      a(
        c,
        (() => {
          var p = oe(() => !!e.isUpVertex);
          return () =>
            p()
              ? (() => {
                  var u = Ke();
                  return (
                    a(
                      u,
                      d(ae, {
                        get each() {
                          return e.upVertexIds;
                        },
                        children: (m, v) => {
                          let _ = null;
                          return (() => {
                            var E = yo(),
                              w = E.firstChild;
                            E.addEventListener("mouseleave", () => o(v())),
                              E.addEventListener("mouseenter", () => l(_, v())),
                              le(E, "id", `input-${m}`);
                            var D = _;
                            return (
                              typeof D == "function" ? ye(D, w) : (_ = w),
                              le(w, "id", m),
                              W(() => L(w, he.inputUp)),
                              E
                            );
                          })();
                        },
                      })
                    ),
                    W(() => L(u, he.inputsUPWrapper)),
                    u
                  );
                })()
              : Ke();
        })(),
        null
      ),
      c
    );
  })();
};
ge(["click", "mousedown"]);
var Ma = O(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 384 512"height=1em width=1em style=overflow:visible;><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80v352c0 17.4 9.4 33.4 24.5 41.9S58.2 482 73 473l288-176c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z">'
);
const Va = (e) => Ma();
var La = O(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"height=1em width=1em style=overflow:visible;><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32v224c0 17.7 14.3 32 32 32s32-14.3 32-32V32zm-144.5 88.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4 0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z">'
);
const Fa = (e) => La();
var Ba = O(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=1em width=1em style=overflow:visible;><path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z">'
);
const Ra = (e) => Ba();
var qa = O(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 16 16"height=1em width=1em style=overflow:visible;><path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z">'
);
const Ha = (e) => qa(),
  ja = {
    chat: { parameters: [], settings: [] },
    filter: { parameters: [], settings: [] },
    "pg-vector": { parameters: [], settings: [] },
    "ollama-chat": { parameters: [], settings: [] },
    "gmail-trigger": { parameters: [], settings: [] },
    "create-draft": { parameters: [], settings: [] },
    embedding: { parameters: [], settings: [] },
    edit: {
      parameters: [],
      settings: [
        { type: "switch", label: "Duplicate item", tooltipText: "" },
        {
          type: "switch",
          label: "Always output data",
          tooltipText:
            "If active, will output a single, empty item when the output would have been empty. Use to prevent the workflow finishing on this node.",
        },
        {
          type: "switch",
          label: "Execute once",
          tooltipText:
            "If active, the node executes only once, with data from the first item it receives",
        },
        {
          type: "switch",
          label: "Retry on fail",
          tooltipText:
            "If active, the node tries to execute again when it fails",
        },
        {
          type: "dropdown",
          label: "on Error",
          tooltipText: "Action to take when the node execution fails",
        },
      ],
    },
    switch: {
      parameters: [],
      settings: [
        { type: "switch", label: "Duplicate item", tooltipText: "" },
        {
          type: "switch",
          label: "Execute once",
          tooltipText:
            "If active, the node executes only once, with data from the first item it receives",
        },
        {
          type: "switch",
          label: "Retry on fail",
          tooltipText:
            "If active, the node tries to execute again when it fails",
        },
        {
          type: "dropdown",
          label: "on Error",
          tooltipText: "Action to take when the node execution fails",
        },
      ],
    },
    "ai-agent": {
      parameters: [],
      settings: [
        { type: "switch", label: "Duplicate item", tooltipText: "" },
        {
          type: "switch",
          label: "Always output data",
          tooltipText:
            "If active, will output a single, empty item when the output would have been empty. Use to prevent the workflow finishing on this node.",
        },
        {
          type: "switch",
          label: "Execute once",
          tooltipText:
            "If active, the node executes only once, with data from the first item it receives",
        },
        {
          type: "switch",
          label: "Retry on fail",
          tooltipText:
            "If active, the node tries to execute again when it fails",
        },
        {
          type: "dropdown",
          label: "on Error",
          tooltipText: "Action to take when the node execution fails",
        },
      ],
    },
    "vector-store": { parameters: [], settings: [] },
    "send-email": {
      parameters: [],
      settings: [
        { type: "switch", label: "Duplicate item", tooltipText: "" },
        {
          type: "switch",
          label: "Always output data",
          tooltipText:
            "If active, will output a single, empty item when the output would have been empty. Use to prevent the workflow finishing on this node.",
        },
        {
          type: "switch",
          label: "Execute once",
          tooltipText:
            "If active, the node executes only once, with data from the first item it receives",
        },
        {
          type: "switch",
          label: "Retry on fail",
          tooltipText:
            "If active, the node tries to execute again when it fails",
        },
        {
          type: "dropdown",
          label: "on Error",
          tooltipText: "Action to take when the node execution fails",
        },
      ],
    },
  };
var za = O(
    "<div><div><div id=function><div></div><div></div><div></div><div></div></div></div><div>"
  ),
  $o = O("<div>"),
  Wa = O("<div><div></div><div><div></div><div id=plus>");
const Ka = (e) => {
  const {
    setIsModalOpen: t,
    setCurrentFormConfig: n,
    setSettingConfig: s,
    currentFormConfig: r,
    setIsOpen: l,
    setPendingOutput: o,
    newEdge: i,
    edgeLength: c,
  } = ie();
  function p(u, m, v, _, E) {
    m.stopPropagation();
    const { left: w, right: D, top: T, bottom: S } = u.getBoundingClientRect(),
      h = w + Math.abs(w - D) / 2,
      b = T + Math.abs(T - S) / 2;
    e.onMouseDownOutput(h, b, e.id, v, _, E);
  }
  return (() => {
    var u = za(),
      m = u.firstChild,
      v = m.firstChild,
      _ = v.firstChild,
      E = _.nextSibling,
      w = E.nextSibling,
      D = w.nextSibling,
      T = m.nextSibling;
    return (
      ye((S) => S, u),
      (u.$$pointerdown = (S) => {
        S.stopPropagation(), e.onMouseDownNode(S, e.id);
      }),
      (u.$$dblclick = () => {
        t(!0),
          console.log(e.name),
          n({ name: e.name, id: e.id, title: e.title }),
          console.log(r()),
          s(ja[e.name]);
      }),
      (_.$$click = (S) => S.stopPropagation()),
      a(_, d(Va, {})),
      (E.$$click = (S) => S.stopPropagation()),
      a(E, d(Fa, {})),
      (w.$$pointerdown = (S) => {
        S.stopPropagation(), e.onClickDeleteNode(e.id);
      }),
      a(w, d(Ra, {})),
      (D.$$click = (S) => S.stopPropagation()),
      a(D, d(Ha, {})),
      a(
        T,
        d(e.content, {
          get selected() {
            return e.selected;
          },
          get title() {
            return e.title;
          },
        })
      ),
      a(
        u,
        d(Aa, {
          get id() {
            return e.id;
          },
          get name() {
            return e.name;
          },
          get numberInputs() {
            return e.numberInputs;
          },
          numberOutputs: 0,
          get isInputVertex() {
            return e.isInputVertex;
          },
          isOutputVertex: !1,
          get inputVertexIds() {
            return e.inputVertexIds;
          },
          get outputVertexIds() {
            return e.outputVertexIds;
          },
          get isDownVertex() {
            return e.isDownVertex;
          },
          get isUpVertex() {
            return e.isUpVertex;
          },
          get downVertexNumber() {
            return e.downVertexNumber;
          },
          get upVertexNumber() {
            return e.upVertexNumber;
          },
          get downVertexIds() {
            return e.downVertexIds;
          },
          get upVertexIds() {
            return e.upVertexIds;
          },
          get downVertexOrientation() {
            return e.downVertexOrientation;
          },
          get busyIndex() {
            return e.busyIndex;
          },
          get onMouseDownOutput() {
            return e.onMouseDownOutput;
          },
          get onMouseEnterInput() {
            return e.onMouseEnterInput;
          },
          get onMouseLeaveInput() {
            return e.onMouseLeaveInput;
          },
        }),
        null
      ),
      a(
        u,
        (() => {
          var S = oe(() => !!e.isOutputVertex);
          return () =>
            S() &&
            (() => {
              var h = $o();
              return (
                a(
                  h,
                  d(ae, {
                    get each() {
                      return e.outputVertexIds;
                    },
                    children: (b, x) => {
                      let I = null;
                      return (() => {
                        var A = Wa(),
                          y = A.firstChild,
                          g = y.nextSibling,
                          N = g.firstChild,
                          C = N.nextSibling;
                        (A.$$mousedown = (f) => p(I, f, x(), b, "solid")),
                          (A.$$click = (f) => {
                            f.stopPropagation(),
                              l(!0),
                              o({ nodeId: e.id, outputVertexIndex: x() });
                          }),
                          le(A, "id", `output-${b}`);
                        var $ = I;
                        return (
                          typeof $ == "function" ? ye($, y) : (I = y),
                          le(y, "id", b),
                          a(
                            g,
                            (() => {
                              var f = oe(() => e.numberOutputs > 1);
                              return () =>
                                f() &&
                                (() => {
                                  var P = $o();
                                  return (
                                    a(P, x), W(() => L(P, he.vertexNum)), P
                                  );
                                })();
                            })(),
                            N
                          ),
                          a(C, d(qn, {})),
                          W(
                            (f) => {
                              var P = he.output,
                                V = he.outputCircle,
                                R = {
                                  [he.plusLine]: !0,
                                  [he.plusLineHidden]:
                                    (i()?.outputVertexId == b && c() > 10) ||
                                    e.busyIndex.get().includes(b),
                                },
                                H = he.outputLine,
                                J = he.outputPlus;
                              return (
                                P !== f.e && L(A, (f.e = P)),
                                V !== f.t && L(y, (f.t = V)),
                                (f.a = Be(g, R, f.a)),
                                H !== f.o && L(N, (f.o = H)),
                                J !== f.i && L(C, (f.i = J)),
                                f
                              );
                            },
                            {
                              e: void 0,
                              t: void 0,
                              a: void 0,
                              o: void 0,
                              i: void 0,
                            }
                          ),
                          A
                        );
                      })();
                    },
                  })
                ),
                W(() => L(h, he.outputsWrapper)),
                h
              );
            })();
        })(),
        null
      ),
      W(
        (S) => {
          var h = e.id,
            b = e.selected ? he.nodeSelected : he.node,
            x = `translate(${e.x}px, ${e.y}px)`,
            I = he.functionWrapper,
            A = he.function;
          return (
            h !== S.e && le(u, "id", (S.e = h)),
            b !== S.t && L(u, (S.t = b)),
            x !== S.a &&
              ((S.a = x) != null
                ? u.style.setProperty("transform", x)
                : u.style.removeProperty("transform")),
            I !== S.o && L(m, (S.o = I)),
            A !== S.i && L(v, (S.i = A)),
            S
          );
        },
        { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
      ),
      u
    );
  })();
};
ge(["dblclick", "pointerdown", "click", "mousedown"]);
const Ua = "_wrapper_gp6p5_1",
  Ga = "_edge_gp6p5_29",
  Xa = "_hitArea_gp6p5_61",
  Ya = "_edgeDash_gp6p5_91",
  Ja = "_deleteHidden_gp6p5_111",
  Qa = "_icon_gp6p5_125",
  Za = "_circle_gp6p5_139",
  es = "_edgeSelected_gp6p5_177",
  ts = "_edgeNew_gp6p5_81",
  Fe = {
    wrapper: Ua,
    edge: Ga,
    delete: "_delete_gp6p5_43",
    hitArea: Xa,
    edgeDash: Ya,
    deleteHidden: Ja,
    icon: Qa,
    circle: Za,
    edgeSelected: es,
    edgeNew: ts,
  };
var ns = O(
  '<svg><defs><marker id=arrowhead markerWidth=6 markerHeight=6 refX=6 refY=3 orient=auto markerUnits=strokeWidth><path d="M 0 0 L 6 3 L 0 6 z"fill=#c3c9d5></path></marker></defs><path fill=none stroke=transparent stroke-width=40 style=pointer-events:stroke;></path><path fill=none marker-end=url(#arrowhead) style=pointer-events:none;></path><g><circle></circle><svg fill=currentColor stroke-width=0 width=30 height=30 viewBox="210 240 1000 1000"style=overflow:visible;><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0h120.4c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64s14.3-32 32-32h96l7.2-14.3zM32 128h384v320c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z">'
);
const _o = (e) => {
  const [t, n] = k({
      x: e.position.x0 + (e.position.x1 - e.position.x0) / 2,
      y: e.position.y0 + (e.position.y1 - e.position.y0) / 2,
    }),
    [s, r] = k(0);
  be(() => {
    const p = e.position.x0,
      u = e.position.y0,
      m = e.position.x1,
      v = e.position.y1,
      _ = m - p,
      E =
        e.typeOfEdge !== "dash" &&
        ((e.isNew && e.edgeLength() > 40 && _ < 40) || (!e.isNew && _ < 40));
    let w, D;
    if (E) {
      const T = p + 40,
        S = m - 40,
        h = 120;
      (w = (T + S) / 2), (D = u + h);
    } else (w = p + (m - p) / 2), (D = u + (v - u) / 2);
    n({ x: w, y: D });
  });
  const l = (p) => {
      p.stopPropagation(), e.onMouseDownEdge();
    },
    o = (p) => {
      p.stopPropagation(), e.onClickDeleteEdge();
    },
    i = () => Math.abs(e.position.x1 - e.position.x0) / 2,
    c = (p, u, m, v) => {
      const E = p + 40,
        w = m - 40,
        D = m - p;
      r(D);
      const T = v - u,
        S = 120,
        h = 105,
        b = i();
      function x() {
        return T > 105 && T < 135 ? 0 : 10;
      }
      function I() {
        return `
      M ${p} ${u}
      L ${E - 10} ${u}
      Q ${E} ${u} ${E} ${u + 10}
  
      L ${E} ${u + S - 10}
      Q ${E} ${u + S} ${E - 10} ${u + S}
  
      L ${w + 10} ${u + S}
      Q ${w} ${u + S} ${w} ${T > h ? u + S + x() : u + S - x()}
  
      L ${w} ${T > h ? v - x() : v + x()}
      Q ${w} ${v} ${w + 10} ${v}
  
      L ${m} ${v}
    `;
      }
      return e.typeOfEdge === "dash"
        ? `M ${p} ${u} C ${p} ${u + b}, ${m} ${v - b}, ${m} ${v}`
        : (e.isNew && e.edgeLength() > 40 && D < 40) || (!e.isNew && D < 40)
        ? I()
        : `M ${p} ${u} C ${p + b} ${u}, ${m - b} ${v}, ${m} ${v}`;
    };
  return (() => {
    var p = ns(),
      u = p.firstChild,
      m = u.nextSibling,
      v = m.nextSibling,
      _ = v.nextSibling,
      E = _.firstChild,
      w = E.nextSibling;
    return (
      (v.$$mousedown = l),
      (_.$$mousedown = o),
      W(
        (D) => {
          var T = Fe.wrapper,
            S = Fe.hitArea,
            h = c(e.position.x0, e.position.y0, e.position.x1, e.position.y1),
            b = `${e.isNew ? Fe.edgeNew : Fe.edge} ${
              e.typeOfEdge == "dash" ? Fe.edgeDash : ""
            } ${e.selected ? Fe.edgeSelected : ""}`,
            x = c(e.position.x0, e.position.y0, e.position.x1, e.position.y1),
            I = e.isNew ? Fe.deleteHidden : Fe.delete,
            A = `translate(${t().x}, ${t().y})`,
            y = Fe.circle,
            g = Fe.icon;
          return (
            T !== D.e && le(p, "class", (D.e = T)),
            S !== D.t && le(m, "class", (D.t = S)),
            h !== D.a && le(m, "d", (D.a = h)),
            b !== D.o && le(v, "class", (D.o = b)),
            x !== D.i && le(v, "d", (D.i = x)),
            I !== D.n && le(_, "class", (D.n = I)),
            A !== D.s && le(_, "transform", (D.s = A)),
            y !== D.h && le(E, "class", (D.h = y)),
            g !== D.r && le(w, "class", (D.r = g)),
            D
          );
        },
        {
          e: void 0,
          t: void 0,
          a: void 0,
          o: void 0,
          i: void 0,
          n: void 0,
          s: void 0,
          h: void 0,
          r: void 0,
        }
      ),
      p
    );
  })();
};
ge(["mousedown"]);
const {
    setLastClickPosition: os,
    setSelectedNode: rs,
    isCtrlPressed: ls,
    isSpacePressed: is,
    setSelectedEdge: as,
    setBoardDragging: ss,
    setClickedPosition: To,
    setSelectionBox: ds,
    setGroupBoundingBox: cs,
    setSelectedNodesGroup: us,
  } = ie(),
  ps = (e) => {
    os({ x: e.clientX, y: e.clientY }),
      rs(null),
      as(null),
      ls() || is()
        ? (ss(!0), To({ x: e.x, y: e.y }))
        : (To({ x: e.clientX, y: e.clientY }),
          ds({ x: e.clientX, y: e.clientY, width: 0, height: 0 }),
          cs(null),
          us([]));
  },
  { newEdge: jt } = ie();
function Hn() {
  const e = jt().currEndPosition.get().x - jt().currStartPosition.get().x,
    t = jt().currEndPosition.get().y - jt().currStartPosition.get().y;
  return Math.sqrt(e * e + t * t);
}
const {
  setTransform: ms,
  setPreTransform: gs,
  groupBoundingBox: Co,
  setClickedPosition: Io,
  setGroupBoundingBox: hs,
  nodes: So,
  selectedNodesGroup: fs,
  scale: ke,
  edges: zt,
  selectedNode: Eo,
} = ie();
function Oo(e) {
  const t = window.innerWidth,
    n = window.innerHeight;
  let s = 0,
    r = 0;
  const l = 60,
    o = 10;
  if (
    (e.clientX < l ? (s = o) : e.clientX > t - l && (s = -10),
    e.clientY < l ? (r = o) : e.clientY > n - l && (r = -10),
    s !== 0 || r !== 0)
  ) {
    if (
      (ms((i) => ({ x: i.x + s, y: i.y + r })),
      gs((i) => ({ x: i.x + s, y: i.y + r })),
      Co()
        ? Io((i) => ({ x: i.x - s, y: i.y - r }))
        : Io((i) => ({ x: i.x + s, y: i.y + r })),
      Co())
    )
      hs((i) => ({
        x: i.x - s / ke(),
        y: i.y - r / ke(),
        width: i.width,
        height: i.height,
      })),
        fs().forEach((i) => {
          const c = So().find((p) => p.id === i);
          if (c) {
            const p = c.currPosition.get();
            c.currPosition.set({ x: p.x - s / ke(), y: p.y - r / ke() }),
              c.inputEdgeIds.get().forEach((u) => {
                const m = zt().find((v) => v.id === u);
                if (m) {
                  const v = m.currEndPosition.get();
                  m.currEndPosition.set({
                    x: v.x - s / ke(),
                    y: v.y - r / ke(),
                  });
                }
              }),
              c.outputEdgeIds.get().forEach((u) => {
                const m = zt().find((v) => v.id === u);
                if (m) {
                  const v = m.currStartPosition.get();
                  m.currStartPosition.set({
                    x: v.x - s / ke(),
                    y: v.y - r / ke(),
                  });
                }
              });
          }
        });
    else if (Eo() !== null) {
      const i = So().find((c) => c.id === Eo());
      if (i) {
        const c = i.currPosition.get();
        i.currPosition.set({ x: c.x - s / ke(), y: c.y - r / ke() }),
          i.inputEdgeIds.get().forEach((p) => {
            const u = zt().find((m) => m.id === p);
            if (u) {
              const m = u.currEndPosition.get();
              u.currEndPosition.set({ x: m.x - s / ke(), y: m.y - r / ke() });
            }
          }),
          i.outputEdgeIds.get().forEach((p) => {
            const u = zt().find((m) => m.id === p);
            if (u) {
              const m = u.currStartPosition.get();
              u.currStartPosition.set({ x: m.x - s / ke(), y: m.y - r / ke() });
            }
          });
      }
    }
  }
}
const {
    isCtrlPressed: vs,
    isSpacePressed: bs,
    clickedPosition: st,
    selectionBox: xs,
    setSelectionBox: ys,
    nodes: Wt,
    edges: Kt,
    setGroupBoundingBox: ws,
    setSelectedNodesGroup: $s,
    scale: Ce,
    transform: dt,
    lastPointer: yn,
    groupBoundingBox: Do,
    selectedNodesGroup: _s,
    selectedNode: wn,
    setLastPointer: Ts,
    newEdge: ct,
    preTransform: No,
    setTransform: Cs,
    setEdgeLength: Is,
    boardDragging: Ss,
    setInsideInput: ko,
  } = ie(),
  Es = (e) => {
    const t = vs() || bs(),
      n = e.x - st().x,
      s = e.y - st().y;
    if (xs()) {
      const r = st(),
        l = e.clientX - r.x,
        o = e.clientY - r.y;
      ys({ x: r.x, y: r.y, width: l, height: o });
      const i = {
          x: Math.min(r.x, e.clientX),
          y: Math.min(r.y, e.clientY),
          width: Math.abs(l),
          height: Math.abs(o),
        },
        c = Wt().filter((p) => {
          const u = document.getElementById(p.id);
          if (!u) return !1;
          const m = p.currPosition.get().x * Ce() + dt().x,
            v = p.currPosition.get().y * Ce() + dt().y,
            _ = u.offsetWidth,
            E = u.offsetHeight;
          return (
            m + _ > i.x &&
            m < i.x + i.width &&
            v + E > i.y &&
            v < i.y + i.height
          );
        });
      $s(c.map((p) => p.id));
    }
    if (Do() && yn()) {
      const r = e.clientX - yn().x,
        l = e.clientY - yn().y,
        o = Do();
      ws({
        x: o.x + r / Ce(),
        y: o.y + l / Ce(),
        width: o.width,
        height: o.height,
      }),
        _s().forEach((i) => {
          const c = Wt().find((p) => p.id === i);
          if (c) {
            const p = c.currPosition.get(),
              u = p.x + r / Ce(),
              m = p.y + l / Ce();
            c.currPosition.set({ x: u, y: m }),
              c.inputEdgeIds.get().forEach((v) => {
                const _ = Kt().find((E) => E.id === v);
                if (_) {
                  const E = _.currEndPosition.get();
                  _.currEndPosition.set(() => ({
                    x: E.x + r / Ce(),
                    y: E.y + l / Ce(),
                  }));
                }
              }),
              c.outputEdgeIds.get().forEach((v) => {
                const _ = Kt().find((E) => E.id === v);
                if (_) {
                  const E = _.currStartPosition.get();
                  _.currStartPosition.set(() => ({
                    x: E.x + r / Ce(),
                    y: E.y + l / Ce(),
                  }));
                }
              });
          }
        }),
        Ts({ x: e.clientX, y: e.clientY }),
        Oo(e);
    } else if (st().x >= 0 && wn() !== null) {
      const r = Wt().find((l) => l.id === wn());
      if (r) {
        r.currPosition.set((l) => ({
          x: (r.prevPosition.get().x + n) / Ce(),
          y: (r.prevPosition.get().y + s) / Ce(),
        }));
        for (let l = 0; l < r.inputEdgeIds.get().length; l++) {
          const o = r.inputEdgeIds.get()[l],
            i = Kt().find((c) => c.id === o);
          i &&
            i.currEndPosition.set(() => ({
              x: (i.prevEndPosition.get().x + n) / Ce(),
              y: (i.prevEndPosition.get().y + s) / Ce(),
            }));
        }
        for (let l = 0; l < r.outputEdgeIds.get().length; l++) {
          const o = r.outputEdgeIds.get()[l],
            i = Kt().find((c) => c.id === o);
          i &&
            i.currStartPosition.set(() => ({
              x: (i.prevStartPosition.get().x + n) / Ce(),
              y: (i.prevStartPosition.get().y + s) / Ce(),
            }));
        }
        Oo(e);
      }
    } else if (t && Ss() && wn() === null) {
      e.preventDefault();
      const r = e.x - st().x,
        l = e.y - st().y;
      Cs({ x: r + No().x, y: l + No().y });
    }
    if (ct() !== null) {
      Is(Hn());
      const r = document.getElementById("boardWrapper"),
        l = 50;
      if (r) {
        const [o, i] = k(null),
          c = ct()?.typeOfEdge;
        for (const p of Wt()) {
          console.log(ct()?.typeOfEdge);
          const u = c === "dash" ? p.isUpVertex : p.isInputVertex;
          if (p.id !== ct().nodeStartId && u) {
            const m = c === "dash" ? p.upVertexIds[0] : p.inputVertexIds[0],
              v = document.getElementById(m),
              {
                left: _,
                right: E,
                top: w,
                bottom: D,
              } = v.getBoundingClientRect(),
              T = _ + Math.abs(_ - E) / 2,
              S = w + Math.abs(w - D) / 2,
              h = e.clientX - T,
              b = e.clientY - S;
            if (Math.sqrt(h * h + b * b) < l) {
              i({ positionX: T, positionY: S, id: p.id });
              break;
            }
          }
        }
        o() !== null
          ? (ct()?.currEndPosition.set({
              x: (o().positionX - dt().x) / Ce(),
              y: (o().positionY - dt().y) / Ce(),
            }),
            ko({
              nodeId: o().id,
              inputIndex: 0,
              positionX: o().positionX,
              positionY: o().positionY,
            }))
          : (ko(null),
            ct()?.currEndPosition.set({
              x: (e.x - dt().x) / Ce(),
              y: (e.y - dt().y) / Ce(),
            }));
      }
    }
  },
  {
    setClickedPosition: Os,
    setBoardDragging: Ds,
    setPreTransform: Ns,
    transform: Le,
    selectionBox: Po,
    nodes: Ut,
    scale: Pe,
    setSelectedNodesGroup: ks,
    setSelectionBox: Ps,
    setGroupBoundingBox: As,
    newEdge: Ve,
    setNewEdge: $n,
    insideInput: He,
    setEdges: Ms,
    edges: Vs,
    setLastPointer: Ls,
  } = ie(),
  Fs = () => {
    if ((Os({ x: -1, y: -1 }), Ds(!1), Ns(Le()), Po())) {
      const e = Po();
      let t = {
        x: Math.min(e.x, e.x + e.width),
        y: Math.min(e.y, e.y + e.height),
        width: Math.abs(e.width),
        height: Math.abs(e.height),
      };
      const n = Ut().filter((s) => {
        const r = document.getElementById(s.id);
        if (!r) return !1;
        const l = s.currPosition.get().x * Pe() + Le().x,
          o = s.currPosition.get().y * Pe() + Le().y,
          i = r.offsetWidth,
          c = r.offsetHeight;
        return (
          l + i > t.x && l < t.x + t.width && o + c > t.y && o < t.y + t.height
        );
      });
      if ((ks(n.map((s) => s.id)), Ps(null), n.length > 0)) {
        const s = n.map((c) => {
            const u = document.getElementById(c.id)?.getBoundingClientRect();
            if (!u) return { x: 0, y: 0, width: 0, height: 0 };
            const m = (u.left - Le().x) / Pe(),
              v = (u.top - Le().y) / Pe(),
              _ = u.width / Pe(),
              E = u.height / Pe();
            return { x: m, y: v, width: _, height: E };
          }),
          r = Math.min(...s.map((c) => c.x)),
          l = Math.min(...s.map((c) => c.y)),
          o = Math.max(...s.map((c) => c.x + c.width)),
          i = Math.max(...s.map((c) => c.y + c.height));
        As({ x: r, y: l, width: o - r, height: i - l }),
          n.forEach((c) => {
            c.prevPosition.set({
              x: c.currPosition.get().x * Pe(),
              y: c.currPosition.get().y * Pe(),
            });
          });
      }
    }
    if (
      (Ve() !== null && He() === null && $n(null),
      Ve() !== null && He() !== null)
    ) {
      const e = Ve().nodeStartId,
        t = He().nodeId;
      console.log(t, "nodeEndId");
      const n = Ut().find((l) => l.id === e),
        s = Ut().find((l) => l.id === t);
      console.log(s, "nodeEnd");
      const r = document.getElementById("boardWrapper");
      if (n && s && r) {
        const l = `edge_${Math.random().toString(36).substring(2, 8)}_${n.id}_${
          Ve()?.outputIndex
        }_${s.id}_${He()?.inputIndex}`;
        if (
          n.outputEdgeIds.get().includes(l) &&
          s.inputEdgeIds.get().includes(l)
        ) {
          $n(null);
          return;
        }
        n.outputEdgeIds.set([...n.outputEdgeIds.get(), l]),
          s.inputEdgeIds.set([...s.inputEdgeIds.get(), l]),
          Ve().prevStartPosition.set(() => ({
            x: (Ve().currStartPosition.get().x - Le().x) / Pe(),
            y: (Ve().currStartPosition.get().y - Le().y) / Pe(),
          })),
          Ve().prevEndPosition.set(() => ({
            x: (He().positionX - Le().x) / Pe(),
            y: (He().positionY - Le().y) / Pe(),
          })),
          Ve().currEndPosition.set(() => ({
            x: (He().positionX - Le().x) / Pe(),
            y: (He().positionY - Le().y) / Pe(),
          })),
          Ms([
            ...Vs(),
            {
              ...Ve(),
              id: l,
              nodeEndId: s.id,
              inputVertexId: s.inputVertexIds[0] || s.upVertexIds[0],
              nodeEndInputIndex: He().inputIndex,
            },
          ]);
        const o = Ut().find((i) => i.id == Ve()?.nodeStartId);
        o.busyIndex.set([...o.busyIndex.get(), Ve().outputVertexId]), $n(null);
      }
    }
    Ls(null);
  },
  {
    setSelectedNode: Bs,
    setClickedPosition: Rs,
    nodes: qs,
    scale: ut,
    edges: Ao,
    selectedNode: Hs,
  } = ie();
function js(e, t) {
  Bs(t), Rs({ x: e.x, y: e.y });
  const n = qs().find((s) => s.id == Hs());
  if (n) {
    n.prevPosition.set((s) => ({
      x: n.currPosition.get().x * ut(),
      y: n.currPosition.get().y * ut(),
    }));
    for (let s = 0; s < n.inputEdgeIds.get().length; s++) {
      const r = n.inputEdgeIds.get()[s],
        l = Ao().find((o) => o.id === r);
      l &&
        l.prevEndPosition.set(() => ({
          x: l.currEndPosition.get().x * ut(),
          y: l.currEndPosition.get().y * ut(),
        }));
    }
    for (let s = 0; s < n.outputEdgeIds.get().length; s++) {
      const r = n.outputEdgeIds.get()[s],
        l = Ao().find((o) => o.id === r);
      l &&
        l.prevStartPosition.set(() => ({
          x: l.currStartPosition.get().x * ut(),
          y: l.currStartPosition.get().y * ut(),
        }));
    }
  }
}
const { setSelectedNode: zs, transform: Ue, scale: Ge, setNewEdge: Ws } = ie();
function Ks(e, t, n, s, r, l) {
  if ((zs(null), document.getElementById("pane"))) {
    const [i, c] = k({ x: (e - Ue().x) / Ge(), y: (t - Ue().y) / Ge() }),
      [p, u] = k({ x: (e - Ue().x) / Ge(), y: (t - Ue().y) / Ge() }),
      [m, v] = k({ x: (e - Ue().x) / Ge(), y: (t - Ue().y) / Ge() }),
      [_, E] = k({ x: (e - Ue().x) / Ge(), y: (t - Ue().y) / Ge() });
    Ws({
      id: "",
      nodeStartId: n,
      outputIndex: s,
      nodeEndId: "",
      inputIndex: -1,
      outputVertexId: r,
      inputVertexId: "",
      typeOfEdge: l,
      prevStartPosition: { get: i, set: c },
      prevEndPosition: { get: p, set: u },
      currStartPosition: { get: m, set: v },
      currEndPosition: { get: _, set: E },
    });
  }
}
const { setInsideInput: Us } = ie();
function Gs(e, t, n, s) {
  Us({ nodeId: n, inputIndex: s, positionX: e, positionY: t });
}
const { insideInput: Mo, setInsideInput: Xs } = ie();
function Ys(e, t) {
  Mo()?.nodeId == e && Mo()?.inputIndex == t && Xs(null);
}
const {
  nodes: Gt,
  setSelectedNode: Vo,
  edges: _n,
  setEdges: Js,
  setNodes: Qs,
} = ie();
function Tn(e) {
  const t = Gt().find((o) => o.id == e);
  if (!t) {
    Vo(null);
    return;
  }
  const n = t.inputEdgeIds.get(),
    s = t.outputEdgeIds.get(),
    l = [...n, ...s].filter((o, i, c) => c.indexOf(o) === i);
  for (let o = 0; o < l.length; o++) {
    const i = _n().find((c) => c.id === l[o]);
    if (i) {
      const c = Gt().find((m) => m.id === i.nodeStartId),
        p = Gt().find((m) => m.id === i.nodeEndId);
      c?.outputEdgeIds.set([
        ...c.outputEdgeIds.get().filter((m) => m !== l[o]),
      ]),
        p?.inputEdgeIds.set([
          ...p.inputEdgeIds.get().filter((m) => m !== l[o]),
        ]),
        _n().filter((m) => m.outputVertexId === i.outputVertexId).length <= 1 &&
          c &&
          c.busyIndex.set([
            ...c.busyIndex.get().filter((m) => m !== i.outputVertexId),
          ]),
        Js([..._n().filter((m) => i.id !== m.id)]);
    }
  }
  Qs([...Gt().filter((o) => o.id !== e)]), Vo(null);
}
const { setSelectedNode: Zs, setSelectedEdge: ed, edges: td } = ie();
function nd(e) {
  Zs(null), ed(e);
  const t = td().find((n) => n.id === e);
  t && console.log(t.currStartPosition.get().x, t.currStartPosition.get().y);
}
const { edges: Cn, nodes: Lo, setEdges: od } = ie();
function rd(e) {
  const t = Cn().find((n) => n.id === e);
  if (t) {
    const n = Lo().find((l) => l.id == t.nodeStartId);
    n && n.outputEdgeIds.set([...n.outputEdgeIds.get().filter((l) => l !== e)]);
    const s = Lo().find((l) => l.id === t.nodeEndId);
    s && s.inputEdgeIds.set([...s.inputEdgeIds.get().filter((l) => l !== e)]),
      Cn().filter((l) => l.outputVertexId === t.outputVertexId).length <= 1 &&
        n &&
        n.busyIndex.set([
          ...n.busyIndex.get().filter((l) => l !== t.outputVertexId),
        ]),
      od([...Cn().filter((l) => l.id !== e)]);
  }
}
var ld = O(
    '<div id=pane class="absolute w-full h-full top-0 left-0 select-none cursor-default"><div></div><div id=board class="w-screen h-screen absolute top-0 left-0"><div id=flow>'
  ),
  Fo = O("<div>");
const id = () => {
  const {
    draggable: e,
    scale: t,
    edges: n,
    newEdge: s,
    transform: r,
    selectedNode: l,
    nodes: o,
    setClickedPosition: i,
    boardDragging: c,
    selectedEdge: p,
    selectionBox: u,
    selectedNodesGroup: m,
    groupBoundingBox: v,
    setGroupBoundingBox: _,
    setLastPointer: E,
  } = ie();
  return (
    be(() => {
      console.log("from board", o()), console.log(n());
    }),
    Ie(() => {
      const w = (S) => {
          if (S.code === "Delete") {
            if (m() && l() === null)
              m().forEach((h) => {
                const b = o().find((x) => x.id === h);
                b && Tn(b.id);
              }),
                _(null);
            else if (l() !== null) {
              const h = o().find((b) => b.id === l());
              h && Tn(h.id);
            }
          }
        },
        D = (S) => {
          S.preventDefault();
        },
        T = document.getElementById("pane");
      T && T.addEventListener("wheel", D, { passive: !1 }),
        document.addEventListener("keydown", w),
        De(() => {
          document.removeEventListener("keydown", w),
            T && T.removeEventListener("wheel", D);
        });
    }),
    (() => {
      var w = ld(),
        D = w.firstChild,
        T = D.nextSibling,
        S = T.firstChild;
      return (
        Ae(w, "mousemove", Es),
        Ae(w, "mouseup", Fs),
        Ae(w, "pointerdown", ps),
        D.style.setProperty("transform-origin", "top left"),
        a(
          w,
          (() => {
            var h = oe(() => !!u());
            return () =>
              h() &&
              (() => {
                var b = Fo();
                return (
                  b.style.setProperty("position", "absolute"),
                  b.style.setProperty("border", "1px dashed #00aaff"),
                  b.style.setProperty("background", "rgba(0, 170, 255, 0.1)"),
                  b.style.setProperty("z-index", "999"),
                  b.style.setProperty("pointer-events", "none"),
                  W(
                    (x) => {
                      var I = `${Math.min(u().x, u().x + u().width)}px`,
                        A = `${Math.min(u().y, u().y + u().height)}px`,
                        y = `${Math.abs(u().width)}px`,
                        g = `${Math.abs(u().height)}px`;
                      return (
                        I !== x.e &&
                          ((x.e = I) != null
                            ? b.style.setProperty("left", I)
                            : b.style.removeProperty("left")),
                        A !== x.t &&
                          ((x.t = A) != null
                            ? b.style.setProperty("top", A)
                            : b.style.removeProperty("top")),
                        y !== x.a &&
                          ((x.a = y) != null
                            ? b.style.setProperty("width", y)
                            : b.style.removeProperty("width")),
                        g !== x.o &&
                          ((x.o = g) != null
                            ? b.style.setProperty("height", g)
                            : b.style.removeProperty("height")),
                        x
                      );
                    },
                    { e: void 0, t: void 0, a: void 0, o: void 0 }
                  ),
                  b
                );
              })();
          })(),
          T
        ),
        a(
          w,
          (() => {
            var h = oe(() => !!v());
            return () =>
              h() &&
              (() => {
                var b = Fo();
                return (
                  (b.$$pointerdown = (x) => {
                    x.stopPropagation(),
                      i({ x: x.clientX, y: x.clientY }),
                      E({ x: x.clientX, y: x.clientY });
                  }),
                  b.style.setProperty("position", "absolute"),
                  b.style.setProperty("border", "1px solid #00aaff"),
                  b.style.setProperty("background", "rgba(0, 170, 255, 0.05)"),
                  b.style.setProperty("z-index", "998"),
                  b.style.setProperty("cursor", "move"),
                  b.style.setProperty("transform-origin", "top left"),
                  W(
                    (x) => {
                      var I = `${v().x * t() + r().x}px`,
                        A = `${v().y * t() + r().y}px`,
                        y = `${v().width * t()}px`,
                        g = `${v().height * t()}px`;
                      return (
                        I !== x.e &&
                          ((x.e = I) != null
                            ? b.style.setProperty("left", I)
                            : b.style.removeProperty("left")),
                        A !== x.t &&
                          ((x.t = A) != null
                            ? b.style.setProperty("top", A)
                            : b.style.removeProperty("top")),
                        y !== x.a &&
                          ((x.a = y) != null
                            ? b.style.setProperty("width", y)
                            : b.style.removeProperty("width")),
                        g !== x.o &&
                          ((x.o = g) != null
                            ? b.style.setProperty("height", g)
                            : b.style.removeProperty("height")),
                        x
                      );
                    },
                    { e: void 0, t: void 0, a: void 0, o: void 0 }
                  ),
                  b
                );
              })();
          })(),
          T
        ),
        T.style.setProperty("transform-origin", "top left"),
        a(
          S,
          d(ae, {
            get each() {
              return o();
            },
            children: (h) =>
              d(Ka, {
                get id() {
                  return h.id;
                },
                get name() {
                  return h.name;
                },
                get title() {
                  return h.title;
                },
                get x() {
                  return h.currPosition.get().x;
                },
                get y() {
                  return h.currPosition.get().y;
                },
                get numberInputs() {
                  return h.numberInputs;
                },
                get numberOutputs() {
                  return h.numberOutputs;
                },
                get downVertexNumber() {
                  return h.downVertexNumber || 0;
                },
                get upVertexNumber() {
                  return h.upVertexNumber || 0;
                },
                get isInputVertex() {
                  return h.isInputVertex;
                },
                get isOutputVertex() {
                  return h.isOutputVertex;
                },
                get isDownVertex() {
                  return h.isDownVertex || !1;
                },
                get isUpVertex() {
                  return h.isUpVertex || !1;
                },
                get inputVertexIds() {
                  return h.inputVertexIds;
                },
                get outputVertexIds() {
                  return h.outputVertexIds;
                },
                get downVertexIds() {
                  return h.downVertexIds || [];
                },
                get upVertexIds() {
                  return h.upVertexIds || [];
                },
                get downVertexOrientation() {
                  return h.downVertexOrientation || "";
                },
                get busyIndex() {
                  return h.busyIndex;
                },
                get content() {
                  return h.content;
                },
                get selected() {
                  return l() == h.id || m().includes(h.id);
                },
                onMouseDownNode: js,
                onMouseDownOutput: Ks,
                onMouseEnterInput: Gs,
                onMouseLeaveInput: Ys,
                onClickDeleteNode: Tn,
              }),
          }),
          null
        ),
        a(
          S,
          (() => {
            var h = oe(() => s() !== null);
            return () =>
              h() &&
              d(_o, {
                selected: !1,
                isNew: !0,
                edgeLength: () => Hn(),
                get typeOfEdge() {
                  return s().typeOfEdge;
                },
                get position() {
                  return {
                    x0: s().currStartPosition.get().x,
                    y0: s().currStartPosition.get().y,
                    x1: s().currEndPosition.get().x,
                    y1: s().currEndPosition.get().y,
                  };
                },
                onMouseDownEdge: () => {},
                onClickDeleteEdge: () => {},
              });
          })(),
          null
        ),
        a(
          S,
          d(ae, {
            get each() {
              return n();
            },
            children: (h) =>
              d(_o, {
                get selected() {
                  return p() === h.id;
                },
                isNew: !1,
                edgeLength: () => Hn(),
                get typeOfEdge() {
                  return h.typeOfEdge;
                },
                get position() {
                  return {
                    x0: h.currStartPosition.get().x,
                    y0: h.currStartPosition.get().y,
                    x1: h.currEndPosition.get().x,
                    y1: h.currEndPosition.get().y,
                  };
                },
                onMouseDownEdge: () => nd(h.id),
                onClickDeleteEdge: () => rd(h.id),
              }),
          }),
          null
        ),
        W(
          (h) => {
            var b = {
                [Ee["dot-flow__pane"]]: !0,
                [Ee.draggable]: e(),
                [Ee.dragging]: c(),
                [Ee.selection]: !1,
              },
              x = Ee["dot-flow__background"],
              I = `scale(${t()})`,
              A = `calc(100vw / ${t()})`,
              y = `calc(100vh / ${t()})`,
              g = `${r().x / t()}px ${r().y / t()}px`,
              N = {
                [Ee["dot-flow__viewport"]]: !0,
                [Ee["dot-flow__viewport"]]: !0,
              },
              C = `translate(${r().x}px, ${r().y}px) scale(${t()})`;
            return (
              (h.e = Be(w, b, h.e)),
              x !== h.t && L(D, (h.t = x)),
              I !== h.a &&
                ((h.a = I) != null
                  ? D.style.setProperty("transform", I)
                  : D.style.removeProperty("transform")),
              A !== h.o &&
                ((h.o = A) != null
                  ? D.style.setProperty("width", A)
                  : D.style.removeProperty("width")),
              y !== h.i &&
                ((h.i = y) != null
                  ? D.style.setProperty("height", y)
                  : D.style.removeProperty("height")),
              g !== h.n &&
                ((h.n = g) != null
                  ? D.style.setProperty("background-position", g)
                  : D.style.removeProperty("background-position")),
              (h.s = Be(T, N, h.s)),
              C !== h.h &&
                ((h.h = C) != null
                  ? T.style.setProperty("transform", C)
                  : T.style.removeProperty("transform")),
              h
            );
          },
          {
            e: void 0,
            t: void 0,
            a: void 0,
            o: void 0,
            i: void 0,
            n: void 0,
            s: void 0,
            h: void 0,
          }
        ),
        w
      );
    })()
  );
};
ge(["pointerdown", "mouseup", "mousemove"]);
const wt = (e) =>
  d(Vl.Provider, {
    value: {
      scale: wr,
      setScale: $r,
      draggable: hr,
      setDraggable: fr,
      isCtrlPressed: vr,
      isSpacePressed: xr,
      setIsCtrlPressed: br,
      setIsSpacePressed: yr,
      edges: _r,
      setEdges: Tr,
      newEdge: Cr,
      setNewEdge: Ir,
      busyIndex: Sr,
      setBusyIndex: Er,
      edgeLength: Or,
      setEdgeLength: Dr,
      isOpen: Nr,
      setIsOpen: kr,
      inputRef: Pr,
      edgeEnd: Ar,
      setEdgeEnd: Mr,
      transform: Vr,
      setTransform: Lr,
      nodes: Fr,
      setNodes: Br,
      preTransform: Rr,
      setPreTransform: qr,
      selectedNode: Hr,
      setSelectedNode: jr,
      pendingOutput: zr,
      setPendingOutput: Wr,
      lastClickPosition: Kr,
      setLastClickPosition: Ur,
      isShowModal: Gr,
      setIsShowModal: Xr,
      setPositionButton: Jr,
      positionButton: Yr,
      isModalOpen: el,
      setIsModalOpen: tl,
      isOpening: Qr,
      setIsOpening: Zr,
      typeOfVertex: il,
      setTypeOfVertex: al,
      currentFormConfig: cl,
      setCurrentFormConfig: ul,
      previousFormConfig: pl,
      setPreviousFormConfig: ml,
      isModalOpen2: nl,
      setIsModalOpen2: ol,
      credentialOptions: gl,
      setCredentialOptions: hl,
      selectedCredential: fl,
      setSelectedCredential: vl,
      formData: bl,
      setFormData: xl,
      settingConfig: sl,
      setSettingConfig: dl,
      isModalOpen3: rl,
      setIsModalOpen3: ll,
      clickedPosition: yl,
      setClickedPosition: wl,
      boardDragging: $l,
      setBoardDragging: _l,
      selectedEdge: Tl,
      setSelectedEdge: Cl,
      insideInput: Il,
      setInsideInput: Sl,
      selectionBox: El,
      setSelectionBox: Ol,
      selectedNodesGroup: Dl,
      setSelectedNodesGroup: Nl,
      groupBoundingBox: kl,
      setGroupBoundingBox: Pl,
      lastPointer: Al,
      setLastPointer: Ml,
    },
    get children() {
      return e.children;
    },
  });
var ad = O(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"height=1em width=1em style=overflow:visible;color:#58abff;><path d="M19 11h-6V8h6a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H5L2 5l3 3h6v3H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h6v5h2v-5h6l3-3-3-3z">'
);
const sd = (e) => ad();
var dd = O(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=1em width=1em style=overflow:visible;color:#c3c9d5;><path d="M690.1 377.4c5.9 0 11.8.2 17.6.5-24.4-128.7-158.3-227.1-319.9-227.1C209 150.8 64 271.4 64 420.2c0 81.1 43.6 154.2 111.9 203.6a21.5 21.5 0 0 1 9.1 17.6c0 2.4-.5 4.6-1.1 6.9-5.5 20.3-14.2 52.8-14.6 54.3-.7 2.6-1.7 5.2-1.7 7.9 0 5.9 4.8 10.8 10.8 10.8 2.3 0 4.2-.9 6.2-2l70.9-40.9c5.3-3.1 11-5 17.2-5 3.2 0 6.4.5 9.5 1.4 33.1 9.5 68.8 14.8 105.7 14.8 6 0 11.9-.1 17.8-.4-7.1-21-10.9-43.1-10.9-66 0-135.8 132.2-245.8 295.3-245.8zm-194.3-86.5c23.8 0 43.2 19.3 43.2 43.1s-19.3 43.1-43.2 43.1c-23.8 0-43.2-19.3-43.2-43.1s19.4-43.1 43.2-43.1zm-215.9 86.2c-23.8 0-43.2-19.3-43.2-43.1s19.3-43.1 43.2-43.1 43.2 19.3 43.2 43.1-19.4 43.1-43.2 43.1zm586.8 415.6c56.9-41.2 93.2-102 93.2-169.7 0-124-120.8-224.5-269.9-224.5-149 0-269.9 100.5-269.9 224.5S540.9 847.5 690 847.5c30.8 0 60.6-4.4 88.1-12.3 2.6-.8 5.2-1.2 7.9-1.2 5.2 0 9.9 1.6 14.3 4.1l59.1 34c1.7 1 3.3 1.7 5.2 1.7a9 9 0 0 0 6.4-2.6 9 9 0 0 0 2.6-6.4c0-2.2-.9-4.4-1.4-6.6-.3-1.2-7.6-28.3-12.2-45.3-.5-1.9-.9-3.8-.9-5.7.1-5.9 3.1-11.2 7.6-14.5zM600.2 587.2c-19.9 0-36-16.1-36-35.9 0-19.8 16.1-35.9 36-35.9s36 16.1 36 35.9c0 19.8-16.2 35.9-36 35.9zm179.9 0c-19.9 0-36-16.1-36-35.9 0-19.8 16.1-35.9 36-35.9s36 16.1 36 35.9a36.08 36.08 0 0 1-36 35.9z">'
);
const cd = (e) => dd();
var ud = O(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"height=1em width=1em style=overflow:visible;color:#898FFF;><path d="m362.7 19.3-48.4 48.4 130 130 48.4-48.4c25-25 25-65.5 0-90.5l-39.4-39.5c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2c-2.5 8.5-.2 17.6 6 23.8s15.3 8.5 23.7 6.1L151 475.7c14.1-4.2 27-11.8 37.4-22.2l233.3-233.2-130-130z">'
);
const pd = ({ height: e = 2, width: t = 2 }) => ud();
var md = O(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"height=1em width=1em style=overflow:visible;color:#58ABFF;><path d="M3.9 54.9C10.5 40.9 24.5 32 40 32h432c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6v-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z">'
);
const gd = (e) => md();
var hd = O(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 640 512"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="M320 0c17.7 0 32 14.3 32 32v64h120c39.8 0 72 32.2 72 72v272c0 39.8-32.2 72-72 72H168c-39.8 0-72-32.2-72-72V168c0-39.8 32.2-72 72-72h120V32c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16h-32zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16h-32zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16h-32zM264 256a40 40 0 1 0-80 0 40 40 0 1 0 80 0zm152 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80zM48 224h16v192H48c-26.5 0-48-21.5-48-48v-96c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48h-16V224h16z">'
);
const jn = (e) => hd();
var fd = O(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="M424 80H88a56.06 56.06 0 0 0-56 56v240a56.06 56.06 0 0 0 56 56h336a56.06 56.06 0 0 0 56-56V136a56.06 56.06 0 0 0-56-56Zm-14.18 92.63-144 112a16 16 0 0 1-19.64 0l-144-112a16 16 0 1 1 19.64-25.26L256 251.73l134.18-104.36a16 16 0 0 1 19.64 25.26Z">'
);
const Ll = (e) => fd();
var vd = O(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 448 512"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="M448 80v48c0 44.2-100.3 80-224 80S0 172.2 0 128V80C0 35.8 100.3 0 224 0s224 35.8 224 80zm-54.8 134.7c20.8-7.4 39.9-16.9 54.8-28.6V288c0 44.2-100.3 80-224 80S0 332.2 0 288V186.1c14.9 11.8 34 21.2 54.8 28.6C99.7 230.7 159.5 240 224 240s124.3-9.3 169.2-25.3zM0 346.1c14.9 11.8 34 21.2 54.8 28.6C99.7 390.7 159.5 400 224 400s124.3-9.3 169.2-25.3c20.8-7.4 39.9-16.9 54.8-28.6V432c0 44.2-100.3 80-224 80S0 476.2 0 432v-85.9z">'
);
const Fl = (e) => vd();
var bd = O(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="M10.74 12.89v-.11c.06-.15.12-.29.19-.43a5.15 5.15 0 0 0 .26-3.74.86.86 0 0 0-.66-.74 3.12 3.12 0 0 0-2.08.61v.18a11.34 11.34 0 0 1-.06 2.41 2.37 2.37 0 0 0 .62 2 2 2 0 0 0 1.43.63 8.05 8.05 0 0 1 .3-.81zM10 8.58a.36.36 0 0 1-.09-.23.19.19 0 0 1 .09-.12.74.74 0 0 1 .48-.07c.25 0 .5.16.48.34a.51.51 0 0 1-.49.33h-.06a.63.63 0 0 1-.41-.25z"></path><path d="M7.88 11a12.58 12.58 0 0 0 .06-2.3v-.28a7 7 0 0 1 1.54-4.55c-1-.32-3.4-1-4.87.1-.9.64-1.32 1.84-1.23 3.55a24.85 24.85 0 0 0 1 4.4c.68 2.22 1.45 3.62 2.11 3.85.1 0 .41.13.86-.41.64-.76 1.23-1.41 1.5-1.7l-.19-.19A2.89 2.89 0 0 1 7.88 11zm3.5 3.4c-.16-.06-.24-.1-.42.11a2.52 2.52 0 0 0-.29.35c-.35.43-.5.58-1.51.79a2 2 0 0 0-.4.11 1 1 0 0 0 .37.16 2.21 2.21 0 0 0 2.5-.8.41.41 0 0 0 0-.35.59.59 0 0 0-.25-.37zm6.29-5.82a5.29 5.29 0 0 0 .08-.79c-.66-.08-1.42-.07-1.72.36-.58.83.56 2.88 1 3.75a4.34 4.34 0 0 1 .26.48 1.79 1.79 0 0 0 .15.31 3.72 3.72 0 0 0 .16-2.13 7.51 7.51 0 0 1-.07-1.05 6 6 0 0 1 .14-.93zm-.56-.16a.6.6 0 0 1-.32.17h-.06a.47.47 0 0 1-.44-.3c0-.14.2-.24.44-.28s.48 0 .5.15a.38.38 0 0 1-.12.26z"></path><path d="M17 4.88a6.06 6.06 0 0 1 1.37 2.57.71.71 0 0 1 0 .15 5.67 5.67 0 0 1-.09 1.06 7.11 7.11 0 0 0-.09.86 6.61 6.61 0 0 0 .07 1 4 4 0 0 1-.36 2.71l.07.08c2.22-3.49 3-7.54 2.29-8.43a4.77 4.77 0 0 0-3.81-1.8 7.34 7.34 0 0 0-1.63.16A6.17 6.17 0 0 1 17 4.88z"></path><path d="M21.65 14c-.07-.2-.37-.85-1.47-.62a6.28 6.28 0 0 1-1 .13 19.74 19.74 0 0 0 2.06-4.88c.37-1.45.66-3.39-.11-4.38A5.91 5.91 0 0 0 16.37 2a8.44 8.44 0 0 0-2.46.35 9.38 9.38 0 0 0-1.45-.14 4.8 4.8 0 0 0-2.46.62 12.22 12.22 0 0 0-1.77-.44A5.44 5.44 0 0 0 4 3.05c-1.24.87-1.81 2.39-1.71 4.52a26.28 26.28 0 0 0 1 4.67A15.76 15.76 0 0 0 4.4 15a3.39 3.39 0 0 0 1.75 1.83 1.71 1.71 0 0 0 1.69-.37 2 2 0 0 0 1 .59 3.65 3.65 0 0 0 2.35-.14v.81a8.46 8.46 0 0 0 .31 2.36 1 1 0 0 1 0 .13 3 3 0 0 0 .71 1.24 2.08 2.08 0 0 0 1.49.56 3 3 0 0 0 .7-.08 3.27 3.27 0 0 0 2.21-1.27 7.34 7.34 0 0 0 .91-4v-.26h.17a5.24 5.24 0 0 0 2.4-.4c.45-.23 1.91-1 1.56-2zm-1.81 1.47a4.7 4.7 0 0 1-1.8.34 2.62 2.62 0 0 1-.79-.1c-.1.94-.32 2.69-.45 3.42a2.47 2.47 0 0 1-2.25 2.3 3.23 3.23 0 0 1-.66.07A2 2 0 0 1 12 20a16.77 16.77 0 0 1-.28-4.06 2.56 2.56 0 0 1-1.78.66 3.94 3.94 0 0 1-.94-.13c-.09 0-.87-.23-.86-.73s.66-.59.9-.64c.86-.18.92-.25 1.19-.59a2.79 2.79 0 0 1 .19-.24 2.56 2.56 0 0 1-1.11-.3c-.23.25-.86.93-1.54 1.74a1.43 1.43 0 0 1-1.11.63 1.23 1.23 0 0 1-.35 0C5.43 16 4.6 14.55 3.84 12a25.21 25.21 0 0 1-1-4.53c-.1-1.92.4-3.28 1.47-4 1.92-1.36 5-.31 5.7-.06a4 4 0 0 1 2.41-.66 5.58 5.58 0 0 1 1.4.18 7.51 7.51 0 0 1 2.5-.4 5.35 5.35 0 0 1 4.32 2c.69.88.23 3 0 3.89a18.84 18.84 0 0 1-2.41 5.41c.16.11.65.31 2 0 .46-.1.73 0 .82.25.22.55-.7 1.13-1.21 1.37z"></path><path d="M17.43 13.59a4 4 0 0 1-.62-1c0-.07-.12-.24-.23-.43-.58-1-1.79-3.22-1-4.34a2.16 2.16 0 0 1 2.12-.61 6.28 6.28 0 0 0-1.13-1.94 5.41 5.41 0 0 0-4.13-2 3.34 3.34 0 0 0-2.55.95A5.82 5.82 0 0 0 8.51 7.8l.15-.08A3.7 3.7 0 0 1 10 7.3a1.45 1.45 0 0 1 1.76 1.19 5.73 5.73 0 0 1-.29 4.09 3.29 3.29 0 0 0-.17.39v.11c-.1.27-.19.52-.25.73a.94.94 0 0 1 .57.07 1.16 1.16 0 0 1 .62.74v.16a.28.28 0 0 1 0 .09 22.22 22.22 0 0 0 .22 4.9 1.5 1.5 0 0 0 2 1.09A1.92 1.92 0 0 0 16.25 19c.15-.88.45-3.35.49-3.88 0-1.06.52-1.27.84-1.36z"></path><path d="m18 14.33-.08-.06h-.12c-.26.07-.5.14-.47.8a1.9 1.9 0 0 0 .93.12 4.29 4.29 0 0 0 1.38-.29 3 3 0 0 0 .79-.52 3.47 3.47 0 0 1-2.43-.05z">'
);
const Bl = (e) => bd();
var xd = O(
  '<svg xmlns:xlink=http://www.w3.org/1999/xlink xmlns=http://www.w3.org/2000/svg width=1em height=1em viewBox="0 0 646 854"fill=none><path d="M140.629 0.239929C132.66 1.52725 123.097 5.69568 116.354 10.845C95.941 26.3541 80.1253 59.2728 73.4435 100.283C70.9302 115.792 69.2138 137.309 69.2138 153.738C69.2138 173.109 71.4819 197.874 74.7309 214.977C75.4665 218.778 75.8343 222.15 75.5278 222.395C75.2826 222.64 72.2788 225.092 68.9072 227.789C57.3827 236.984 44.2029 251.145 35.1304 264.08C17.7209 288.784 6.44151 316.86 1.72133 347.265C-0.117698 359.28 -0.608106 383.555 0.863118 395.57C4.11207 423.278 12.449 446.695 26.7321 468.151L31.391 475.078L30.0424 477.346C20.4794 493.407 12.3264 516.64 8.52575 538.953C5.522 556.608 5.15419 561.328 5.15419 584.99C5.15419 608.837 5.4607 613.557 8.28054 630.047C11.6521 649.786 18.5178 670.689 26.1804 684.605C28.6938 689.141 34.8239 698.581 35.5595 699.072C35.8047 699.194 35.0691 701.462 33.9044 704.098C25.077 723.408 17.537 749.093 14.4106 770.733C12.2038 785.567 11.8973 790.349 11.8973 805.981C11.8973 825.903 13.0007 835.589 17.1692 851.466L17.7822 853.795H44.019H70.3172L68.6007 850.546C57.9957 830.93 57.0149 794.517 66.1487 758.166C70.3172 741.369 75.0374 729.048 83.8647 712.067L89.1366 701.769V695.455C89.1366 689.57 89.014 688.896 87.1137 685.034C85.6424 682.091 83.6808 679.578 80.1866 676.145C74.2404 670.383 69.9494 664.314 66.5165 656.835C51.4365 624.1 48.494 575.489 59.0991 534.049C63.5128 516.762 70.8076 501.376 78.4702 492.978C83.6808 487.215 86.378 480.779 86.378 474.097C86.378 467.17 83.926 461.469 78.4089 455.523C62.5932 438.604 52.8464 418.006 49.3522 394.038C44.3868 359.893 53.3981 322.683 73.8726 293.198C93.9181 264.263 122.055 245.689 153.503 240.724C160.552 239.559 173.732 239.743 181.088 241.092C189.119 242.502 194.145 242.072 199.295 239.62C205.67 236.617 208.858 232.877 212.597 224.295C215.907 216.633 218.482 212.464 225.409 203.821C233.746 193.461 241.776 186.411 254.649 177.89C269.362 168.266 286.097 161.278 302.771 157.906C308.839 156.68 311.659 156.496 323 156.496C334.341 156.496 337.161 156.68 343.229 157.906C367.688 162.872 391.964 175.5 411.335 193.399C415.503 197.261 425.495 209.644 428.683 214.794C429.909 216.816 432.055 221.108 433.403 224.295C437.142 232.877 440.33 236.617 446.705 239.62C451.671 242.011 456.881 242.502 464.605 241.214C476.804 239.13 486.183 239.314 498.137 241.766C538.841 249.98 574.273 283.512 589.966 328.446C603.636 367.862 599.774 409.118 579.422 440.626C575.989 445.96 572.556 450.251 567.591 455.523C556.863 466.986 556.863 481.208 567.53 492.978C585.062 512.165 596.035 559.367 592.724 600.99C590.518 628.453 583.468 653.035 573.782 666.95C572.066 669.402 568.511 673.57 565.813 676.145C562.319 679.578 560.358 682.091 558.886 685.034C556.986 688.896 556.863 689.57 556.863 695.455V701.769L562.135 712.067C570.963 729.048 575.683 741.369 579.851 758.166C588.863 794.027 588.066 829.704 577.767 849.995C576.909 851.711 576.173 853.305 576.173 853.489C576.173 853.673 587.882 853.795 602.226 853.795H628.218L628.892 851.159C629.26 849.75 629.873 847.604 630.179 846.378C630.854 843.681 632.202 835.712 633.306 828.049C634.348 820.325 634.348 791.881 633.306 783.299C629.383 752.158 622.823 727.454 612.096 704.098C610.931 701.462 610.195 699.194 610.44 699.072C610.747 698.888 612.463 696.436 614.302 693.677C627.666 673.448 635.88 648.008 640.049 614.415C641.152 605.158 641.152 565.374 640.049 556.485C637.106 533.559 633.551 517.988 627.666 502.234C625.214 495.675 618.716 481.821 615.958 477.346L614.609 475.078L619.268 468.151C633.551 446.695 641.888 423.278 645.137 395.57C646.608 383.555 646.118 359.28 644.279 347.265C639.497 316.798 628.279 288.845 610.87 264.08C601.797 251.145 588.617 236.984 577.093 227.789C573.721 225.092 570.717 222.64 570.472 222.395C570.166 222.15 570.534 218.778 571.269 214.977C578.687 176.296 578.441 128.053 570.656 90.3524C563.913 57.4951 551.653 31.3808 535.837 16.3008C523.209 4.28578 510.336 -0.863507 494.888 0.11731C459.456 2.20154 430.89 42.9667 419.61 107.21C417.771 117.57 416.178 129.708 416.178 133.018C416.178 134.305 415.932 135.347 415.626 135.347C415.319 135.347 412.929 134.121 410.354 132.589C383.014 116.405 352.608 107.762 323 107.762C293.392 107.762 262.986 116.405 235.646 132.589C233.071 134.121 230.681 135.347 230.374 135.347C230.068 135.347 229.822 134.305 229.822 133.018C229.822 129.585 228.167 117.08 226.39 107.21C216.152 49.5259 192.674 11.3354 161.472 1.71112C157.181 0.423799 144.982 -0.434382 140.629 0.239929ZM151.051 50.139C159.878 57.1273 169.686 77.1114 175.326 99.4863C176.368 103.532 177.471 108.191 177.778 109.907C178.023 111.563 178.697 115.302 179.249 118.183C181.64 131.179 182.743 145.217 182.866 162.32L182.927 179.178L178.697 185.43L174.468 191.744H164.598C153.074 191.744 141.61 193.216 130.637 196.158C126.714 197.139 122.913 198.12 122.178 198.304C121.013 198.549 120.829 198.181 120.155 193.154C116.538 165.875 116.722 135.654 120.707 110.52C125.12 82.5059 135.419 57.1273 145.472 49.6486C147.863 47.8708 148.292 47.9321 151.051 50.139ZM500.589 49.7098C506.658 54.1848 513.34 66.0772 518.305 81.2798C528.297 111.685 531.117 153.431 525.845 193.154C525.171 198.181 524.987 198.549 523.822 198.304C523.087 198.12 519.286 197.139 515.363 196.158C504.39 193.216 492.926 191.744 481.402 191.744H471.532L467.303 185.43L463.073 179.178L463.134 162.32C463.257 138.535 465.464 119.961 470.735 99.3024C476.314 77.1114 486.183 57.1273 494.949 50.139C497.708 47.9321 498.137 47.8708 500.589 49.7098Z"fill=white></path><path d="M313.498 358.237C300.195 359.525 296.579 360.015 290.203 361.303C279.843 363.448 265.989 368.23 256.365 372.95C222.895 389.317 199.846 416.596 192.796 448.166C191.386 454.419 191.202 456.503 191.202 467.047C191.202 477.468 191.386 479.736 192.735 485.682C202.114 526.938 240.12 557.405 289.284 562.983C299.95 564.148 346.049 564.148 356.715 562.983C396.193 558.508 430.154 537.114 445.418 507.076C449.463 499.046 451.425 493.835 453.264 485.682C454.613 479.736 454.797 477.468 454.797 467.047C454.797 456.503 454.613 454.419 453.203 448.166C442.965 402.313 398.461 366.207 343.903 359.341C336.792 358.483 318.157 357.747 313.498 358.237ZM336.424 391.585C354.631 393.547 372.96 400.045 387.672 409.853C395.58 415.125 406.737 426.159 411.518 433.393C417.403 442.342 420.774 451.476 422.307 462.572C422.981 467.66 422.614 471.522 420.774 479.736C417.893 491.996 408.943 504.808 396.867 513.758C391.227 517.865 379.519 523.812 372.347 526.141C358.738 530.493 349.849 531.29 318.095 531.045C297.376 530.861 293.697 530.677 287.751 529.574C267.461 525.773 251.4 517.681 239.753 505.36C230.312 495.429 226.021 486.357 223.692 471.706C222.65 464.901 224.611 453.622 228.596 444.12C233.439 432.534 245.944 418.129 258.327 409.853C272.671 400.29 291.552 393.486 308.9 391.647C315.582 390.911 329.742 390.911 336.424 391.585Z"fill=white></path><path d="M299.584 436.336C294.925 438.849 291.676 445.224 292.657 449.944C293.76 455.032 298.235 460.182 305.223 464.412C308.963 466.68 309.208 466.986 309.392 469.254C309.514 470.603 309.024 474.465 308.35 477.898C307.614 481.269 307.062 484.825 307.062 485.806C307.124 488.442 309.576 492.733 312.15 494.817C314.419 496.656 314.848 496.717 321.223 496.901C327.047 497.085 328.273 496.962 330.602 495.859C336.61 492.916 338.142 487.522 335.935 477.162C334.096 468.519 334.464 467.17 339.062 464.534C343.904 461.714 349.054 456.749 350.586 453.377C353.529 446.941 350.831 439.646 344.333 436.274C342.74 435.477 340.778 435.11 337.897 435.11C333.422 435.11 330.541 436.152 325.269 439.523L322.265 441.424L320.365 440.259C312.58 435.661 311.17 435.11 306.449 435.171C303.078 435.171 301.239 435.477 299.584 436.336Z"fill=white></path><path d="M150.744 365.165C139.894 368.598 131.802 376.567 127.634 387.908C125.611 393.303 124.63 401.824 125.488 406.421C127.511 417.394 136.522 427.386 146.76 430.145C159.633 433.516 169.257 431.309 177.778 422.85C182.743 418.007 185.441 413.777 188.138 406.911C190.099 402.069 190.222 401.211 190.222 394.345L190.283 386.989L187.709 381.717C183.601 373.38 176.184 367.188 167.602 364.92C162.759 363.694 154.974 363.756 150.744 365.165Z"fill=white></path><path d="M478.153 364.982C469.755 367.25 462.276 373.502 458.291 381.717L455.717 386.989L455.778 394.345C455.778 401.211 455.901 402.069 457.862 406.911C460.56 413.777 463.257 418.007 468.222 422.85C476.743 431.309 486.367 433.516 499.241 430.145C506.658 428.183 514.075 421.93 517.631 414.635C520.696 408.444 521.431 403.969 520.451 396.919C518.183 380.797 508.742 369.089 494.704 364.982C490.597 363.756 482.628 363.756 478.153 364.982Z"fill=white>'
);
const Rl = (e) => xd();
var yd = O(
  '<svg xmlns=http://www.w3.org/2000/svg x=0px y=0px width=1em height=1em viewBox="0 0 48 48"><path fill=#4caf50 d=M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z></path><path fill=#1e88e5 d=M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z></path><polygon fill=#e53935 points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"></polygon><path fill=#c62828 d=M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z></path><path fill=#fbc02d d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z">'
);
const ql = (e) => yd();
var wd = O(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"height=1em width=1em style=overflow:visible;color:currentcolor;><path fill=currentColor d="M20 2a1 1 0 0 1 1 1v3.757l-8.999 9-.006 4.238 4.246.006L21 15.242V21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h16Zm1.778 6.808 1.414 1.414L15.414 18l-1.416-.002.002-1.412 7.778-7.778ZM12 12H7v2h5v-2Zm3-4H7v2h8V8Z">'
);
const Hl = (e) => wd();
var $d = O(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 20 16"height=1em width=1em style=overflow:visible;color:currentcolor;><path fill=currentColor d="m13 11.5 1.5 1.5 5-5-5-5L13 4.5 16.5 8zM7 4.5 5.5 3l-5 5 5 5L7 11.5 3.5 8zM10.958 2.352l1.085.296-3 11-1.085-.296 3-11z">'
);
const jl = (e) => $d(),
  _d = [
    {
      name: "chat",
      title: "On Chat Message",
      description:
        " Runs the flow when a user send a chat message. For use with AI nodes.",
      icon: cd,
    },
    {
      name: "switch",
      title: "Switch",
      description: "Routes items depending on defined expression or rules",
      icon: sd,
    },
    {
      name: "edit",
      title: "Edit",
      description: "Modify, Add or Remove item fields.",
      icon: pd,
    },
    {
      name: "filter",
      title: "Filter",
      description: "Remove items matching a condition.",
      icon: gd,
    },
    {
      name: "ai-agent",
      title: "AI Agent",
      description:
        "Runs the flow when a user send a chat message. For use with AI nodes.",
      icon: jn,
    },
    {
      name: "customer-support-agent",
      title: "Customer Support Agent",
      description:
        "Runs the flow when a user send a chat message. For use with AI nodes.",
      icon: jn,
    },
    {
      name: "send-email",
      title: "Send Email",
      description: "Send email to a user.",
      icon: Ll,
    },
    {
      name: "vector-store",
      title: "Vector Store",
      description: "Store and retrieve data from a vector database.",
      icon: Fl,
    },
    {
      name: "pg-vector",
      title: "PgVector",
      description: "Answer questions with a vector store.",
      icon: Bl,
    },
    {
      name: "ollama-chat",
      title: "Ollama Chat Model",
      description:
        "Runs the flow when a user send a chat message. For use with AI nodes.",
      icon: Rl,
    },
    {
      name: "gmail-trigger",
      title: "Gmail Trigger",
      description:
        "Runs the flow when a user send a chat message. For use with AI nodes.",
      icon: ql,
    },
    {
      name: "create-draft",
      title: "Create Draft",
      description: "Creates a draft with specified content and recipients.",
      icon: Hl,
    },
    {
      name: "embedding",
      title: "Embed everything",
      description:
        "Generates text embeddings from input data for use in search or analysis.",
      icon: jl,
    },
  ];
var Td = O('<div><div class="border border-white/20 rounded-[9px] flex"><div>');
const In = (e) => {
  let t;
  const n = e.zIndex ?? 9999,
    s = e.widthClass ?? "w-[90vw] max-w-[95vw] h-[90vh] max-h-[95vh] ";
  return (
    Ie(() => {
      const r = (l) => {
        l.target === t && e.onClose();
      };
      return (
        window.addEventListener("click", r),
        () => window.removeEventListener("click", r)
      );
    }),
    (() => {
      var r = Td(),
        l = r.firstChild,
        o = l.firstChild,
        i = t;
      return (
        typeof i == "function" ? ye(i, r) : (t = r),
        n != null
          ? r.style.setProperty("z-index", n)
          : r.style.removeProperty("z-index"),
        L(o, `${s} border border-purple-500/20 rounded-[9px] flex flex-col`),
        a(o, () => e.children),
        W(() =>
          L(
            r,
            `fixed inset-0 bg-[#45455042] backdrop-blur-xs flex items-center justify-center overflow-auto ${
              e.isOpen() ? "block" : "hidden"
            }`
          )
        ),
        r
      );
    })()
  );
};
var Cd = O('<span class=text-yellow-300>"<!>"'),
  Id = O("<span class=text-cyan-300>"),
  Sd = O("<span class=text-pink-300>"),
  Ed = O("<span class=text-gray-400>null"),
  Od = O('<div class="text-purple-400 cursor-pointer select-none">'),
  Dd = O("<div class=text-purple-400>}"),
  Nd = O(
    '<div class="font-mono text-sm text-gray-200 whitespace-pre leading-relaxed">'
  ),
  kd = O("<span>[<!>]"),
  Pd = O("<span>["),
  Ad = O("<div>]"),
  Md = O("<div>"),
  Vd = O(
    '<div><span class=text-green-400>"<!>"</span><span class=text-white>: '
  );
const gn = ({ data: e, indent: t = 0 }) => {
  const [n, s] = k(!1),
    r = `${t * 5}px`,
    l = () => s(!n()),
    o = (p) => typeof p == "object" && p !== null && !Array.isArray(p),
    i = Array.isArray,
    c = (p) =>
      typeof p == "string"
        ? (() => {
            var u = Cd(),
              m = u.firstChild,
              v = m.nextSibling;
            return v.nextSibling, a(u, p, v), u;
          })()
        : typeof p == "number"
        ? (() => {
            var u = Id();
            return a(u, p), u;
          })()
        : typeof p == "boolean"
        ? (() => {
            var u = Sd();
            return a(u, () => p.toString()), u;
          })()
        : p === null
        ? Ed()
        : d(gn, { data: p, indent: t + 1 });
  return (() => {
    var p = Nd();
    return (
      a(
        p,
        d(te, {
          get when() {
            return o(e);
          },
          get fallback() {
            return d(te, {
              get when() {
                return i(e);
              },
              get fallback() {
                return c(e);
              },
              get children() {
                return oe(() => !!e.every((u) => typeof u != "object"))()
                  ? (() => {
                      var u = kd(),
                        m = u.firstChild,
                        v = m.nextSibling;
                      return (
                        v.nextSibling,
                        a(
                          u,
                          d(ae, {
                            each: e,
                            children: (_, E) => [
                              oe(() => c(_)),
                              oe(() => (E() < e.length - 1 ? ", " : "")),
                            ],
                          }),
                          v
                        ),
                        u
                      );
                    })()
                  : [
                      (() => {
                        var u = Pd();
                        return (
                          r != null
                            ? u.style.setProperty("padding-left", r)
                            : u.style.removeProperty("padding-left"),
                          u
                        );
                      })(),
                      d(ae, {
                        each: e,
                        children: (u, m) =>
                          (() => {
                            var v = Md();
                            return (
                              `${(t + 1) * 4}px` != null
                                ? v.style.setProperty(
                                    "padding-left",
                                    `${(t + 1) * 4}px`
                                  )
                                : v.style.removeProperty("padding-left"),
                              a(v, d(gn, { data: u, indent: t + 1 }), null),
                              a(v, () => (m() < e.length - 1 ? "," : ""), null),
                              v
                            );
                          })(),
                      }),
                      (() => {
                        var u = Ad();
                        return (
                          r != null
                            ? u.style.setProperty("padding-left", r)
                            : u.style.removeProperty("padding-left"),
                          u
                        );
                      })(),
                    ];
              },
            });
          },
          get children() {
            return [
              (() => {
                var u = Od();
                return (
                  (u.$$click = l),
                  r != null
                    ? u.style.setProperty("padding-left", r)
                    : u.style.removeProperty("padding-left"),
                  a(u, () => (n() ? "{...}" : "{")),
                  u
                );
              })(),
              d(te, {
                get when() {
                  return !n();
                },
                get children() {
                  return [
                    d(ae, {
                      get each() {
                        return Object.entries(e);
                      },
                      children: ([u, m], v) =>
                        (() => {
                          var _ = Vd(),
                            E = _.firstChild,
                            w = E.firstChild,
                            D = w.nextSibling;
                          return (
                            D.nextSibling,
                            E.nextSibling,
                            `${(t + 1) * 4}px` != null
                              ? _.style.setProperty(
                                  "padding-left",
                                  `${(t + 1) * 4}px`
                                )
                              : _.style.removeProperty("padding-left"),
                            a(E, u, D),
                            a(_, () => c(m), null),
                            a(
                              _,
                              () =>
                                v() < Object.entries(e).length - 1 ? "," : "",
                              null
                            ),
                            _
                          );
                        })(),
                    }),
                    (() => {
                      var u = Dd();
                      return (
                        r != null
                          ? u.style.setProperty("padding-left", r)
                          : u.style.removeProperty("padding-left"),
                        u
                      );
                    })(),
                  ];
                },
              }),
            ];
          },
        })
      ),
      p
    );
  })();
};
ge(["click"]);
const Ld = "_leftPanel_kuca9_1",
  Fd = { leftPanel: Ld };
var Bd = O(
  '<div class="bg-gradient-to-br from-[#1c1c24] to-[#222230] h-full rounded-bl-lg w-1/4 overflow-auto"><div class="p-4 text-white h-full "><h3 class="uppercase text-xs text-blue-300 font-semibold mb-2 tracking-wider">Input'
);
const Rd = (e) =>
    (() => {
      var t = Bd(),
        n = t.firstChild;
      return (
        n.firstChild,
        a(
          n,
          d(gn, {
            data: [
              {
                threadid: "19535ae314ffe32b",
                sender: "bill.rassel@gmail.com",
                body: `Hey,

I regret to inform you that I need to cancel my order. Could you please
provide the necessary steps to complete this process?

Thank you for your assistance.

Best regards,
Bill Rassel
`,
              },
            ],
          }),
          null
        ),
        W((s) => Be(t, { [Fd.leftPanel]: !0 }, s)),
        t
      );
    })(),
  qd = "_midPanel_u0ucm_1",
  zl = { midPanel: qd };
var Hd = O("<div class>"),
  jd = O(
    '<div class="w-3 h-3 rounded-full bg-[#dbdbdd] text-xs text-black flex items-center justify-center font-semibold select-none">?'
  ),
  Bo = O("<div>");
const Re = (e) => {
  const [t, n] = k(!1),
    s = () => (e.visible !== void 0 ? e.visible : t()),
    [r, l] = k({ x: 0, y: 0 }),
    [o, i] = k(e.placement || "top");
  let c, p, u, m;
  const v = (g) => {
      const N = g.length;
      return N <= 50
        ? "max-w-xs"
        : N <= 120
        ? "max-w-sm"
        : N <= 200
        ? "max-w-md"
        : "max-w-lg";
    },
    _ = () => {
      if (!c || !p) return;
      const g = c.getBoundingClientRect(),
        N = p.getBoundingClientRect(),
        C = {
          width: window.innerWidth,
          height: window.innerHeight,
          scrollX: window.scrollX,
          scrollY: window.scrollY,
        },
        $ = 8;
      let f = e.placement || "top";
      const P = {
        top: {
          x: g.left + g.width / 2 - N.width / 2 + C.scrollX,
          y: g.top - N.height - $ + C.scrollY,
        },
        bottom: {
          x: g.left + g.width / 2 - N.width / 2 + C.scrollX,
          y: g.bottom + $ + C.scrollY,
        },
        left: {
          x: g.left - N.width - $ + C.scrollX,
          y: g.top + g.height / 2 - N.height / 2 + C.scrollY,
        },
        right: {
          x: g.right + $ + C.scrollX,
          y: g.top + g.height / 2 - N.height / 2 + C.scrollY,
        },
      };
      let V = P[f];
      f === "top" && V.y < C.scrollY
        ? ((f = "bottom"), (V = P.bottom))
        : f === "bottom" && V.y + N.height > C.height + C.scrollY
        ? ((f = "top"), (V = P.top))
        : f === "left" && V.x < C.scrollX
        ? ((f = "right"), (V = P.right))
        : f === "right" &&
          V.x + N.width > C.width + C.scrollX &&
          ((f = "left"), (V = P.left)),
        V.x < C.scrollX
          ? (V.x = C.scrollX + $)
          : V.x + N.width > C.width + C.scrollX &&
            (V.x = C.width + C.scrollX - N.width - $),
        V.y < C.scrollY
          ? (V.y = C.scrollY + $)
          : V.y + N.height > C.height + C.scrollY &&
            (V.y = C.height + C.scrollY - N.height - $),
        l({ x: V.x, y: V.y }),
        i(f);
    },
    E = () => {
      if (e.visible !== void 0 && e.onVisibilityChange) {
        e.onVisibilityChange(!0);
        return;
      }
      m && clearTimeout(m),
        (u = setTimeout(() => {
          n(!0), setTimeout(_, 0);
        }, e.delay || 200));
    },
    w = () => {
      if (e.visible !== void 0 && e.onVisibilityChange) {
        e.onVisibilityChange(!1);
        return;
      }
      u && clearTimeout(u),
        (m = setTimeout(() => {
          n(!1);
        }, e.hideDelay || 100));
    },
    D = () => {
      e.disableHover || E();
    },
    T = () => {
      e.disableHover || w();
    },
    S = () => {
      e.disableHover || E();
    },
    h = () => {
      e.disableHover || w();
    },
    b = () => {
      s() && setTimeout(_, 0);
    };
  let x = s();
  const I = () => {
      const g = s();
      g !== x && g && b(), (x = g);
    },
    A = () => {
      s() && _();
    };
  Ie(() => {
    window.addEventListener("scroll", A, { passive: !0 }),
      window.addEventListener("resize", A, { passive: !0 });
    const g = setInterval(I, 16);
    De(() => {
      clearInterval(g);
    });
  }),
    De(() => {
      u && clearTimeout(u),
        m && clearTimeout(m),
        window.removeEventListener("scroll", A),
        window.removeEventListener("resize", A);
    });
  const y = () => {
    const g = "absolute w-2 h-2 bg-[#464668] transform rotate-45";
    switch (o()) {
      case "top":
        return `${g} -bottom-1 left-1/2 -translate-x-1/2`;
      case "bottom":
        return `${g} -top-1 left-1/2 -translate-x-1/2`;
      case "left":
        return `${g} -right-1 top-1/2 -translate-y-1/2`;
      case "right":
        return `${g} -left-1 top-1/2 -translate-y-1/2`;
      default:
        return g;
    }
  };
  return [
    (() => {
      var g = Hd();
      g.addEventListener("blur", h),
        g.addEventListener("focus", S),
        g.addEventListener("mouseleave", T),
        g.addEventListener("mouseenter", D);
      var N = c;
      return (
        typeof N == "function" ? ye(N, g) : (c = g),
        a(
          g,
          (() => {
            var C = oe(() => !!e.children);
            return () => (C() ? e.children : jd());
          })()
        ),
        W(() => le(g, "tabindex", e.focusable ? 0 : void 0)),
        g
      );
    })(),
    oe(
      () =>
        oe(() => !!s())() &&
        d(ki, {
          get children() {
            var g = Bo(),
              N = p;
            return (
              typeof N == "function" ? ye(N, g) : (p = g),
              a(g, () => e.content, null),
              a(
                g,
                (() => {
                  var C = oe(() => e.showArrow !== !1);
                  return () =>
                    C() &&
                    (() => {
                      var $ = Bo();
                      return W(() => L($, y())), $;
                    })();
                })(),
                null
              ),
              W(
                (C) => {
                  var $ = `
              fixed z-50 px-3 py-2 text-sm text-[#c9c9db] bg-[#464668] rounded-lg shadow-lg
              pointer-events-none select-none whitespace-pre-wrap break-words
              ${v(e.content || "")}
              transition-opacity duration-200
            `,
                    f = `${r().x}px`,
                    P = `${r().y}px`,
                    V = s() ? 1 : 0;
                  return (
                    $ !== C.e && L(g, (C.e = $)),
                    f !== C.t &&
                      ((C.t = f) != null
                        ? g.style.setProperty("left", f)
                        : g.style.removeProperty("left")),
                    P !== C.a &&
                      ((C.a = P) != null
                        ? g.style.setProperty("top", P)
                        : g.style.removeProperty("top")),
                    V !== C.o &&
                      ((C.o = V) != null
                        ? g.style.setProperty("opacity", V)
                        : g.style.removeProperty("opacity")),
                    C
                  );
                },
                { e: void 0, t: void 0, a: void 0, o: void 0 }
              ),
              g
            );
          },
        })
    ),
  ];
};
var zd = O(
    '<div class="text-white bg-[#1e1e2f] p-2 rounded w-full"><div class="flex flex-col gap-2"><div class="flex items-center justify-between"><div class="text-sm flex items-center gap-1 group"></div><div class="text-[#60738d] hover:text-[#d3e1f3] rounded-sm hover:drop-shadow-[0_0_6px_#3eb5da] transition duration-300 text-xs cursor-pointer font-medium">Reset value</div></div><label class="relative inline-block w-12 h-6"><input title=switch type=checkbox class="sr-only peer"><div class="w-12 h-6 bg-gray-400 peer-checked:bg-green-400 rounded-full transition-colors duration-200"></div><div class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 transform peer-checked:translate-x-6">'
  ),
  Wd = O("<label class=label>"),
  Kd = O("<div class=toolTipBtn>");
const _e = (e) => {
  const t = (r) => {
      e.onChange?.(r.target.checked);
    },
    [n, s] = k("");
  return (
    be(() => {
      const r = `${e.uniqueKey}-${e.name}`;
      r !== n() && (s(r), e.onChange?.(e.checked ?? !1));
    }),
    Ie(() => {}),
    (() => {
      var r = zd(),
        l = r.firstChild,
        o = l.firstChild,
        i = o.firstChild,
        c = o.nextSibling,
        p = c.firstChild;
      return (
        a(
          i,
          (() => {
            var u = oe(() => !!e.title);
            return () =>
              u() &&
              (() => {
                var m = Wd();
                return (
                  a(m, () => e.title, null),
                  a(
                    m,
                    (() => {
                      var v = oe(() => !!e.toolTipText);
                      return () =>
                        v() &&
                        (() => {
                          var _ = Kd();
                          return (
                            a(
                              _,
                              d(Re, {
                                get content() {
                                  return e.toolTipText;
                                },
                              })
                            ),
                            _
                          );
                        })();
                    })(),
                    null
                  ),
                  m
                );
              })();
          })()
        ),
        p.addEventListener("change", t),
        W(() => le(p, "name", e.name)),
        W(() => (p.checked = e.checked)),
        r
      );
    })()
  );
};
var Ud = O(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z">'
);
const pe = (e) => Ud();
var Gd = O(
    '<div class=w-full><div class=custom-select><select title="single select"class=hidden-select></select><div title="custom select button"aria-haspopup=listbox role=combobox></div><div title="dropdown items"role=listbox>'
  ),
  Xd = O("<label class=label>"),
  Yd = O("<div class=toolTipBtn>"),
  Jd = O("<option>"),
  Qd = O("<div role=option><p>"),
  Zd = O('<p class="text-xs font-light text-[#b9b5b5]">'),
  ec = O("<p class=foot-note>");
const we = (e) => {
  const [t, n] = k(!1),
    [s, r] = k({ value: "", label: "", description: "" }),
    [l, o] = k("down");
  let i, c;
  const [p, u] = k(""),
    m = (T) => {
      i && !i.contains(T.target) && n(!1);
    };
  e.defaultValue;
  const v = () => {
    console.log("hey, i am in setDefault value.");
    const T = e.options.find((S) => S.value === e.defaultValue);
    r(T || e.options[0]), e.onChange?.(T || e.options[0]);
  };
  be(() => {
    const T = `${e.uniqueKey}-${e.name}`;
    console.log("from outside", T), T !== p() && (u(T), v());
  });
  const _ = () => n(!1);
  Ie(() => {
    document.addEventListener("mousedown", m),
      document.addEventListener("touchstart", m, { passive: !0 }),
      window.addEventListener("resize", _),
      window.addEventListener("blur", _);
  }),
    De(() => {
      document.removeEventListener("mousedown", m),
        document.removeEventListener("touchstart", m),
        window.removeEventListener("resize", _),
        window.removeEventListener("blur", _);
    });
  const E = (T) => {
      T.stopPropagation(), t() || D(), n(!t());
    },
    w = (T) => {
      r(T), n(!1), s() && e.onChange && e.onChange(s()), i && i.focus();
    },
    D = () => {
      if (!i) return;
      const T = i.getBoundingClientRect();
      document.getElementById("mid-panel")?.clientHeight - T.bottom < 200
        ? o("up")
        : o("down");
    };
  return (() => {
    var T = Gd(),
      S = T.firstChild,
      h = S.firstChild,
      b = h.nextSibling,
      x = b.nextSibling;
    a(
      T,
      (() => {
        var y = oe(() => !!e.title);
        return () =>
          y() &&
          (() => {
            var g = Xd();
            return (
              a(g, () => e.title, null),
              a(
                g,
                (() => {
                  var N = oe(() => !!e.toolTipText);
                  return () =>
                    N() &&
                    (() => {
                      var C = Yd();
                      return (
                        a(
                          C,
                          d(Re, {
                            get content() {
                              return e.toolTipText;
                            },
                          })
                        ),
                        C
                      );
                    })();
                })(),
                null
              ),
              W(() => le(g, "for", e.name)),
              g
            );
          })();
      })(),
      S
    );
    var I = i;
    typeof I == "function" ? ye(I, S) : (i = S),
      a(
        h,
        d(ae, {
          get each() {
            return e.options;
          },
          children: (y) =>
            (() => {
              var g = Jd();
              return (
                a(g, () => y.label),
                W(() => (g.selected = y.value === s().value)),
                W(() => (g.value = y.value)),
                g
              );
            })(),
        })
      ),
      Ae(b, "click", e.disabled ? void 0 : E),
      a(b, () => s().label || e.placeholder);
    var A = c;
    return (
      typeof A == "function" ? ye(A, x) : (c = x),
      a(
        x,
        d(ae, {
          get each() {
            return e.options;
          },
          children: (y, g) =>
            (() => {
              var N = Qd(),
                C = N.firstChild;
              return (
                (N.$$click = w),
                (N.$$clickData = y),
                a(C, () => y.label),
                a(
                  N,
                  (() => {
                    var $ = oe(() => !!y.description);
                    return () =>
                      $() &&
                      (() => {
                        var f = Zd();
                        return a(f, () => y.description), f;
                      })();
                  })(),
                  null
                ),
                W(
                  ($) => {
                    var f = y.value === s().value ? "selected" : "",
                      P = t() ? 0 : -1,
                      V = y.value === s().value;
                    return (
                      f !== $.e && L(N, ($.e = f)),
                      P !== $.t && le(N, "tabindex", ($.t = P)),
                      V !== $.a && le(N, "aria-selected", ($.a = V)),
                      $
                    );
                  },
                  { e: void 0, t: void 0, a: void 0 }
                ),
                N
              );
            })(),
        })
      ),
      a(
        S,
        (() => {
          var y = oe(() => !!e.footNote);
          return () =>
            y() &&
            (() => {
              var g = ec();
              return a(g, () => e.footNote), g;
            })();
        })(),
        null
      ),
      W(
        (y) => {
          var g = e.name,
            N = e.required,
            C = e.disabled,
            $ = `select-selected ${t() ? "active" : ""} ${
              e.disabled ? "disabled" : ""
            }`,
            f = e.disabled ? -1 : 0,
            P = t(),
            V = `select-items ${t() ? "select-show" : "select-hide"}
        ${l() === "up" ? "select-direction-up" : ""}`;
          return (
            g !== y.e && le(h, "name", (y.e = g)),
            N !== y.t && (h.required = y.t = N),
            C !== y.a && (h.disabled = y.a = C),
            $ !== y.o && L(b, (y.o = $)),
            f !== y.i && le(b, "tabindex", (y.i = f)),
            P !== y.n && le(b, "aria-expanded", (y.n = P)),
            V !== y.s && L(x, (y.s = V)),
            y
          );
        },
        {
          e: void 0,
          t: void 0,
          a: void 0,
          o: void 0,
          i: void 0,
          n: void 0,
          s: void 0,
        }
      ),
      T
    );
  })();
};
ge(["click"]);
var tc = O(
    '<div class="flex gap-1 rounded-md bg-[#323236] px-1 py-1 items-center">+ '
  ),
  nc = O(
    '<div class=w-full><div class=custom-select><div aria-haspopup=listbox role=combobox><div class="flex gap-1.5"></div></div><div title="dropdown items"role=listbox></div><p class=foot-note>'
  ),
  oc = O("<label class=label>"),
  rc = O("<div class=toolTipBtn>"),
  lc = O("<input type=hidden>"),
  ic = O(
    '<div class="flex relative gap-1 rounded-md bg-[#323236] px-2 py-1 items-center group duration-200"><div class="text-xs font-medium"></div><div class="overflow-hidden transition-all duration-300 ease-in-out max-w-0 opacity-0 scale-75 group-hover:max-w-[20px] group-hover:opacity-100 "><div class="text-[#c45454] font-bold cursor-pointer">×'
  ),
  ac = O("<div role=option>");
const Wl = (e) => {
  const [t, n] = k(!1),
    [s, r] = k([]),
    [l, o] = k([]),
    [i, c] = k("down");
  let p, u;
  const m = (T) => {
      p && !p.contains(T.target) && n(!1);
    },
    v = () => n(!1);
  Ie(() => {
    if (e.defaultSelectedOptions) {
      const T = e.options.filter((S) =>
        e.defaultSelectedOptions.includes(S.value)
      );
      if (T) {
        r(T);
        const S = T.map((h) => h.label);
        o(S), e.onChange?.(T);
      }
    }
    document.addEventListener("mousedown", m),
      document.addEventListener("touchstart", m, { passive: !0 }),
      window.addEventListener("resize", v),
      window.addEventListener("blur", v);
  }),
    De(() => {
      document.removeEventListener("mousedown", m),
        document.removeEventListener("touchstart", m),
        window.removeEventListener("resize", v),
        window.removeEventListener("blur", v);
    });
  const _ = (T) => {
      T.stopPropagation(), t() || D(), n(!t());
    },
    E = (T) => {
      const S = s();
      if (S.some((I) => I.value === T.value)) return;
      const b = [...S, T];
      r(b);
      const x = b.map((I) => I.label);
      o(x), n(!1), e.onChange && e.onChange(b), p && p.focus();
    };
  function w(T, S) {
    T.stopPropagation();
    const h = s().filter((b) => b.label !== S);
    r(h), o(l().filter((b) => b !== S)), e.onChange && e.onChange(h);
  }
  const D = () => {
    if (!p) return;
    const T = p.getBoundingClientRect();
    document.getElementById("mid-panel")?.clientHeight - T.bottom < 200
      ? c("up")
      : c("down");
  };
  return (() => {
    var T = nc(),
      S = T.firstChild,
      h = S.firstChild,
      b = h.firstChild,
      x = h.nextSibling,
      I = x.nextSibling;
    a(
      T,
      (() => {
        var g = oe(() => !!e.title);
        return () =>
          g() &&
          (() => {
            var N = oc();
            return (
              a(N, () => e.title, null),
              a(
                N,
                (() => {
                  var C = oe(() => !!e.toolTipText);
                  return () =>
                    C() &&
                    (() => {
                      var $ = rc();
                      return (
                        a(
                          $,
                          d(Re, {
                            get content() {
                              return e.toolTipText;
                            },
                          })
                        ),
                        $
                      );
                    })();
                })(),
                null
              ),
              W(() => le(N, "for", e.name)),
              N
            );
          })();
      })(),
      S
    );
    var A = p;
    typeof A == "function" ? ye(A, S) : (p = S),
      a(
        S,
        d(ae, {
          get each() {
            return s();
          },
          children: (g, N) =>
            (() => {
              var C = lc();
              return (
                W(() => le(C, "name", `${e.name}`)),
                W(() => (C.value = g.value)),
                C
              );
            })(),
        }),
        h
      ),
      Ae(h, "click", e.disabled ? void 0 : _),
      a(
        h,
        () => (l().length <= 0 ? e.placeholder || "Select an option" : ""),
        b
      ),
      a(
        b,
        d(ae, {
          get each() {
            return l();
          },
          children: (g, N) => {
            if (N() < 3)
              return (() => {
                var C = ic(),
                  $ = C.firstChild,
                  f = $.nextSibling,
                  P = f.firstChild;
                return a($, g), (P.$$click = (V) => w(V, g)), C;
              })();
          },
        }),
        null
      ),
      a(
        b,
        d(te, {
          get when() {
            return l().length > 3;
          },
          get children() {
            var g = tc();
            return g.firstChild, a(g, () => l().length - 3, null), g;
          },
        }),
        null
      );
    var y = u;
    return (
      typeof y == "function" ? ye(y, x) : (u = x),
      a(
        x,
        d(ae, {
          get each() {
            return e.options;
          },
          children: (g, N) =>
            (() => {
              var C = ac();
              return (
                (C.$$click = E),
                (C.$$clickData = g),
                a(C, () => g.label),
                W(
                  ($) => {
                    var f = s().some((R) => R.value === g.value)
                        ? "selected"
                        : "",
                      P = t() ? 0 : -1,
                      V = s().some((R) => R.value === g.value);
                    return (
                      f !== $.e && L(C, ($.e = f)),
                      P !== $.t && le(C, "tabindex", ($.t = P)),
                      V !== $.a && le(C, "aria-selected", ($.a = V)),
                      $
                    );
                  },
                  { e: void 0, t: void 0, a: void 0 }
                ),
                C
              );
            })(),
        })
      ),
      a(I, () => e.footNote),
      W(
        (g) => {
          var N = `select-selected ${t() ? "active" : ""} ${
              e.disabled ? "disabled" : ""
            }`,
            C = e.disabled ? -1 : 0,
            $ = t(),
            f = `select-items ${t() ? "select-show" : "select-hide"} ${
              i() === "up" ? "select-direction-up" : ""
            }`;
          return (
            N !== g.e && L(h, (g.e = N)),
            C !== g.t && le(h, "tabindex", (g.t = C)),
            $ !== g.a && le(h, "aria-expanded", (g.a = $)),
            f !== g.o && L(x, (g.o = f)),
            g
          );
        },
        { e: void 0, t: void 0, a: void 0, o: void 0 }
      ),
      T
    );
  })();
};
ge(["click"]);
var sc = O(
    '<div class=custom-select><div aria-haspopup=listbox role=combobox></div><div title="dropdown items"role=listbox>'
  ),
  dc = O("<div role=option>");
const Me = (e) => {
  const [t, n] = k(!1),
    [s, r] = k("down");
  let l, o;
  const i = (v) => {
    l && !l.contains(v.target) && c();
  };
  Ie(() => {
    document.addEventListener("mousedown", i),
      document.addEventListener("touchstart", i, { passive: !0 }),
      window.addEventListener("resize", c),
      window.addEventListener("blur", c);
  }),
    De(() => {
      document.removeEventListener("mousedown", i),
        document.removeEventListener("touchstart", i),
        window.removeEventListener("resize", c),
        window.removeEventListener("blur", c);
    }),
    be(() => {
      e.selectedOptions().length >= 1 &&
        e.onChange &&
        e.onChange(e.selectedOptions());
    });
  const c = () => {
      t() &&
        (n(!1),
        setTimeout(() => {
          const v = o;
          v && v.classList.add("select-hide-complete");
        }, 200));
    },
    p = (v) => {
      v.stopPropagation(), t() || m(), n(!t());
    },
    u = (v) => {
      const _ = e.selectedOptions();
      _.some((w) => w.value === v.value) ||
        (e.setSelectedOptions([..._, v]),
        e.setDropdownOptions(
          e.dropdownOptions().filter((w) => w.value !== v.value)
        ),
        c(),
        l && l.focus());
    },
    m = () => {
      if (!l) return;
      const v = l.getBoundingClientRect();
      document.getElementById("mid-panel")?.clientHeight - v.bottom < 200
        ? r("up")
        : r("down");
    };
  return d(te, {
    get when() {
      return e.dropdownOptions().length >= 1;
    },
    get children() {
      var v = sc(),
        _ = v.firstChild,
        E = _.nextSibling,
        w = l;
      typeof w == "function" ? ye(w, v) : (l = v),
        Ae(_, "click", e.disabled ? void 0 : p),
        a(_, () => e.placeholder);
      var D = o;
      return (
        typeof D == "function" ? ye(D, E) : (o = E),
        a(
          E,
          d(ae, {
            get each() {
              return e.dropdownOptions();
            },
            children: (T, S) =>
              (() => {
                var h = dc();
                return (
                  (h.$$click = u),
                  (h.$$clickData = T),
                  a(h, () => T.label),
                  W(() => le(h, "tabindex", t() ? 0 : -1)),
                  h
                );
              })(),
          })
        ),
        W(
          (T) => {
            var S = `select-selected ${t() ? "active" : ""} ${
                e.disabled ? "disabled" : ""
              }`,
              h = e.disabled ? -1 : 0,
              b = t(),
              x = `select-items ${t() ? "select-show" : "select-hide"} ${
                s() === "up" ? "select-direction-up" : ""
              }`;
            return (
              S !== T.e && L(_, (T.e = S)),
              h !== T.t && le(_, "tabindex", (T.t = h)),
              b !== T.a && le(_, "aria-expanded", (T.a = b)),
              x !== T.o && L(E, (T.o = x)),
              T
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0 }
        ),
        v
      );
    },
  });
};
ge(["click"]);
var cc = O(
    '<div class=custom-select><label class=label></label><select title="single select"class=hidden-select></select><div title="custom select button"aria-haspopup=listbox role=combobox></div><div title="dropdown items"role=listbox><div role=option aria-selected=true>+ Create new credentials</div></div><p class=foot-note>'
  ),
  uc = O("<div class=toolTipBtn>"),
  pc = O("<option>"),
  mc = O("<div role=option aria-selected=true>");
const et = (e) => {
  const [t, n] = k(!1),
    { setIsModalOpen2: s } = ie(),
    [r, l] = k({ value: "", label: "", description: "" }),
    [o, i] = k("down");
  let c, p;
  const u = (w) => {
      c && !c.contains(w.target) && n(!1);
    },
    m = () => n(!1);
  Ie(() => {
    if (e.defaultValue) {
      const w = e.options && e.options.find((D) => D.value === e.defaultValue);
      w && l(w);
    }
    document.addEventListener("mousedown", u),
      document.addEventListener("touchstart", u, { passive: !0 }),
      window.addEventListener("resize", m),
      window.addEventListener("blur", m);
  }),
    De(() => {
      document.removeEventListener("mousedown", u),
        document.removeEventListener("touchstart", u),
        window.removeEventListener("resize", m),
        window.removeEventListener("blur", m);
    }),
    be(() => {
      r() && e.onChange && e.onChange(r());
    });
  const v = (w) => {
      w.stopPropagation(), t() || E(), n(!t());
    },
    _ = (w) => {
      l(w), n(!1), c && c.focus();
    },
    E = () => {
      if (!c) return;
      const w = c.getBoundingClientRect();
      document.getElementById("mid-panel")?.clientHeight - w.bottom < 200
        ? i("up")
        : i("down");
    };
  return (() => {
    var w = cc(),
      D = w.firstChild,
      T = D.nextSibling,
      S = T.nextSibling,
      h = S.nextSibling,
      b = h.firstChild,
      x = h.nextSibling,
      I = c;
    typeof I == "function" ? ye(I, w) : (c = w),
      a(D, () => e.title, null),
      a(
        D,
        (() => {
          var y = oe(() => !!e.toolTipText);
          return () =>
            y() &&
            (() => {
              var g = uc();
              return (
                a(
                  g,
                  d(Re, {
                    get content() {
                      return e.toolTipText;
                    },
                  })
                ),
                g
              );
            })();
        })(),
        null
      ),
      a(
        T,
        d(ae, {
          get each() {
            return e.options;
          },
          children: (y) =>
            (() => {
              var g = pc();
              return (
                a(g, () => y.label),
                W(() => (g.selected = y.value === r().value)),
                W(() => (g.value = y.value)),
                g
              );
            })(),
        })
      ),
      Ae(S, "click", e.disabled ? void 0 : v),
      a(S, () => r().label || e.placeholder);
    var A = p;
    return (
      typeof A == "function" ? ye(A, h) : (p = h),
      a(
        h,
        d(ae, {
          get each() {
            return e.options;
          },
          children: (y, g) =>
            (() => {
              var N = mc();
              return (
                (N.$$click = _),
                (N.$$clickData = y),
                a(N, () => y.label),
                W(
                  (C) => {
                    var $ = `child-option ${
                        (y.value === r().value ? "selected" : "") || ""
                      }`,
                      f = y.value === r().value,
                      P = y.value === r().value,
                      V = t() ? 0 : -1;
                    return (
                      $ !== C.e && L(N, (C.e = $)),
                      f !== C.t && N.classList.toggle("selected", (C.t = f)),
                      P !== C.a &&
                        N.classList.toggle("aria-selected-true", (C.a = P)),
                      V !== C.o && le(N, "tabindex", (C.o = V)),
                      C
                    );
                  },
                  { e: void 0, t: void 0, a: void 0, o: void 0 }
                ),
                N
              );
            })(),
        }),
        b
      ),
      (b.$$click = (y) => {
        v(y), s(!0);
      }),
      a(x, () => e.footNote),
      W(
        (y) => {
          var g = e.name,
            N = e.name,
            C = e.required,
            $ = e.disabled,
            f = `select-selected ${t() ? "active" : ""} ${
              e.disabled ? "disabled" : ""
            }`,
            P = e.disabled ? -1 : 0,
            V = t(),
            R = `select-items ${t() ? "select-show" : "select-hide"}
        ${o() === "up" ? "select-direction-up" : ""}`,
            H = t() ? 0 : -1;
          return (
            g !== y.e && le(D, "for", (y.e = g)),
            N !== y.t && le(T, "name", (y.t = N)),
            C !== y.a && (T.required = y.a = C),
            $ !== y.o && (T.disabled = y.o = $),
            f !== y.i && L(S, (y.i = f)),
            P !== y.n && le(S, "tabindex", (y.n = P)),
            V !== y.s && le(S, "aria-expanded", (y.s = V)),
            R !== y.h && L(h, (y.h = R)),
            H !== y.r && le(b, "tabindex", (y.r = H)),
            y
          );
        },
        {
          e: void 0,
          t: void 0,
          a: void 0,
          o: void 0,
          i: void 0,
          n: void 0,
          s: void 0,
          h: void 0,
          r: void 0,
        }
      ),
      w
    );
  })();
};
ge(["click"]);
var gc = O(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 16 16"height=1em width=1em style=overflow:visible;color:currentcolor; data--h-bstatus=0OBSERVED><path fill-rule=evenodd d="M7.364 3.5a.5.5 0 0 1 .5-.5H14.5A1.5 1.5 0 0 1 16 4.5v10a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 3 14.5V7.864a.5.5 0 1 1 1 0V14.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-10a.5.5 0 0 0-.5-.5H7.864a.5.5 0 0 1-.5-.5z"></path><path fill-rule=evenodd d="M0 .5A.5.5 0 0 1 .5 0h5a.5.5 0 0 1 0 1H1.707l8.147 8.146a.5.5 0 0 1-.708.708L1 1.707V5.5a.5.5 0 0 1-1 0v-5z">'
);
const Kl = (e) => gc();
var hc = O("<div><div class=relative><input>"),
  fc = O("<label class=label>"),
  vc = O("<div class=toolTipBtn>"),
  bc = O('<button type=button aria-label="Toggle expanded view">'),
  xc = O(
    '<div><div class><div class=mb-3><div class="flex justify-between items-center mb-2"><span class="text-white text-sm font-medium">Result</span><div class="flex items-center gap-2"><span class="text-gray-400 text-xs">Item</span><span class="bg-gray-600 text-white text-xs px-2 py-1 rounded">0</span><div class="flex gap-1"><button type=button class="text-gray-400 hover:text-white text-xs cursor-pointer"aria-label="Previous item">‹</button><button type=button class="text-gray-400 hover:text-white text-xs cursor-pointer"aria-label="Next item">›</button></div></div></div><div class="text-white text-sm"></div></div><div><div class="text-yellow-400 text-xs font-medium mb-1">Tip:</div><div class="text-gray-300 text-xs">Anything inside <span class=text-blue-400>{}</span> is JavaScript.<button type=button class="text-blue-400 hover:underline ml-1 cursor-pointer">Learn more</button></div></div><div class="mt-3 pt-3 border-t border-gray-600"><div class="text-gray-400 text-xs">Press <kbd class="bg-gray-600 px-1 rounded text-white">Escape</kbd> to close'
  ),
  yc = O("<p class=foot-note>");
const se = (e) => {
  const { setIsModalOpen3: t } = ie(),
    [n, s] = k(!1),
    [r, l] = k(e.value || "");
  let o, i;
  const [c, p] = k("");
  be(() => {
    const w = `${e.uniqueKey}-${e.name}`;
    w !== c() && (p(w), l(e.value || ""), e.onInput?.(e.value || ""));
  });
  const u = (w) => {
      i && !i.contains(w.target) && s(!1);
    },
    m = () => s(!1);
  Ie(() => {
    document.addEventListener("mousedown", u),
      document.addEventListener("touchstart", u, { passive: !0 }),
      window.addEventListener("resize", m),
      window.addEventListener("blur", m);
  }),
    De(() => {
      document.removeEventListener("click", u);
    });
  const v = () => {
      e.disabled || s(!0);
    },
    _ = (w) => {
      const T = w.target.value;
      l(T), e.onInput?.(T, w);
    },
    E = (w) => {
      w.preventDefault(), w.stopPropagation();
    };
  return (() => {
    var w = hc(),
      D = w.firstChild,
      T = D.firstChild,
      S = i;
    typeof S == "function" ? ye(S, w) : (i = w),
      a(
        w,
        (() => {
          var b = oe(() => !!e.title);
          return () =>
            b() &&
            (() => {
              var x = fc();
              return (
                a(x, () => e.title, null),
                a(
                  x,
                  (() => {
                    var I = oe(() => !!e.toolTipText);
                    return () =>
                      I() &&
                      (() => {
                        var A = vc();
                        return (
                          a(
                            A,
                            d(Re, {
                              get content() {
                                return e.toolTipText;
                              },
                            })
                          ),
                          A
                        );
                      })();
                  })(),
                  null
                ),
                W(() => le(x, "for", e.name)),
                x
              );
            })();
        })(),
        D
      ),
      T.addEventListener("focus", v),
      (T.$$input = _);
    var h = o;
    return (
      typeof h == "function" ? ye(h, T) : (o = T),
      a(
        D,
        (() => {
          var b = oe(() => !!e.isArrow);
          return () =>
            b() &&
            (() => {
              var x = bc();
              return (
                (x.$$click = () => t(!0)),
                a(x, d(Kl, {})),
                W(
                  (I) => {
                    var A = e.disabled,
                      y = `absolute right-0 bottom-0 text-gray-400 text-[10px] hover:text-white opacity-0 group-hover:opacity-100 transition-colors rounded-br-[3px] rounded-bl-none rounded-tr-none rounded-tl-[6px] border border-[#4b4747] p-1 ${
                        e.disabled
                          ? "cursor-not-allowed opacity-50"
                          : "cursor-pointer"
                      }`;
                    return (
                      A !== I.e && (x.disabled = I.e = A),
                      y !== I.t && L(x, (I.t = y)),
                      I
                    );
                  },
                  { e: void 0, t: void 0 }
                ),
                x
              );
            })();
        })(),
        null
      ),
      a(
        w,
        (() => {
          var b = oe(() => !!e.isExpand);
          return () =>
            b() &&
            (() => {
              var x = xc(),
                I = x.firstChild,
                A = I.firstChild,
                y = A.firstChild,
                g = y.nextSibling,
                N = A.nextSibling,
                C = N.firstChild,
                $ = C.nextSibling,
                f = $.firstChild,
                P = f.nextSibling,
                V = P.nextSibling,
                R = V.nextSibling;
              return (
                a(g, () => r() || "threadid"),
                (R.$$click = E),
                W(() =>
                  L(
                    x,
                    `absolute top-[105%] rounded-sm  left-0 right-0 p-4 bg-[#1f1f2b] border border-gray-600 border-t-0 rounded-b transition-all duration-200 z-10 ${
                      n() ? "opacity-100 visible" : "opacity-0 invisible"
                    }`
                  )
                ),
                x
              );
            })();
        })(),
        null
      ),
      a(
        w,
        (() => {
          var b = oe(() => !!e.footNote);
          return () =>
            b() &&
            (() => {
              var x = yc();
              return a(x, () => e.footNote), x;
            })();
        })(),
        null
      ),
      W(
        (b) => {
          var x = `relative w-full group ${e.class || ""}`,
            I = e.autocomplete ? "on" : "off",
            A = e.type || "text",
            y = e.name,
            g = e.disabled,
            N = e.placeholder || "",
            C = e.pattern,
            $ = `w-full px-3 py-2.5 pr-8 border font-normal rounded-sm border-neutral-700 bg-[#282a39] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#dad7d742] focus:border-[#dad7d742] focus:bg-[#282a39] transition-colors ${
              e.disabled ? "opacity-50 cursor-not-allowed" : ""
            }`;
          return (
            x !== b.e && L(w, (b.e = x)),
            I !== b.t && le(T, "autocomplete", (b.t = I)),
            A !== b.a && le(T, "type", (b.a = A)),
            y !== b.o && le(T, "name", (b.o = y)),
            g !== b.i && (T.disabled = b.i = g),
            N !== b.n && le(T, "placeholder", (b.n = N)),
            C !== b.s && le(T, "pattern", (b.s = C)),
            $ !== b.h && L(T, (b.h = $)),
            b
          );
        },
        {
          e: void 0,
          t: void 0,
          a: void 0,
          o: void 0,
          i: void 0,
          n: void 0,
          s: void 0,
          h: void 0,
        }
      ),
      W(() => (T.value = e.value || "")),
      w
    );
  })();
};
ge(["input", "click"]);
var wc = O(
  '<div class="text-[#dfe0e3] mt-5 select-none bg-[#383649] text-[15px] font-light text-center py-1.5 rounded-md cursor-pointer hover:bg-[#3d3b4e]">'
);
const lt = (e) =>
  (() => {
    var t = wc();
    return Ae(t, "click", e.onClick), a(t, () => e.label), t;
  })();
ge(["click"]);
var $c = O(
    '<div class=w-full><div class=custom-select><select title="single select"class=hidden-select></select><div title="custom select button"aria-haspopup=listbox role=combobox></div><div title="dropdown items"role=listbox></div><p class=foot-note>'
  ),
  _c = O("<label class=label>"),
  Tc = O("<div class=toolTipBtn>"),
  Cc = O("<option>"),
  Ic = O("<div role=option><p>"),
  Sc = O('<p class="text-xs font-light text-[#b9b5b5]">');
const Te = (e) => {
  const [t, n] = k(!1),
    [s, r] = k({ value: "", label: "", children: [] }),
    [l, o] = k("down");
  let i, c;
  const [p, u] = k(""),
    m = () => {
      console.log("hey, i am in setDefault value.");
      const T = e.options.find((S) => S.value === e.defaultValue);
      r(T || e.options[0]), e.onChange?.(T || e.options[0]);
    };
  be(() => {
    const T = `${e.uniqueKey}-${e.name}`;
    console.log("from outside", T), T !== p() && (u(T), m());
  });
  const v = (T) => {
      i && !i.contains(T.target) && n(!1);
    },
    _ = () => n(!1);
  Ie(() => {
    document.addEventListener("mousedown", v),
      document.addEventListener("touchstart", v, { passive: !0 }),
      window.addEventListener("resize", _),
      window.addEventListener("blur", _);
  }),
    De(() => {
      document.removeEventListener("mousedown", v),
        document.removeEventListener("touchstart", v),
        window.removeEventListener("resize", _),
        window.removeEventListener("blur", _);
    });
  const E = (T) => {
      T.stopPropagation(), t() || D(), n(!t());
    },
    w = (T) => {
      r(T), n(!1), s() && e.onChange && e.onChange(s()), i && i.focus();
    },
    D = () => {
      if (!i) return;
      const T = i.getBoundingClientRect();
      document.getElementById("mid-panel")?.clientHeight - T.bottom < 200
        ? o("up")
        : o("down");
    };
  return (() => {
    var T = $c(),
      S = T.firstChild,
      h = S.firstChild,
      b = h.nextSibling,
      x = b.nextSibling,
      I = x.nextSibling;
    a(
      T,
      (() => {
        var g = oe(() => !!e.title);
        return () =>
          g() &&
          (() => {
            var N = _c();
            return (
              a(N, () => e.title, null),
              a(
                N,
                (() => {
                  var C = oe(() => !!e.toolTipText);
                  return () =>
                    C() &&
                    (() => {
                      var $ = Tc();
                      return (
                        a(
                          $,
                          d(Re, {
                            get content() {
                              return e.toolTipText;
                            },
                          })
                        ),
                        $
                      );
                    })();
                })(),
                null
              ),
              W(() => le(N, "for", e.name)),
              N
            );
          })();
      })(),
      S
    );
    var A = i;
    typeof A == "function" ? ye(A, S) : (i = S),
      a(
        h,
        d(ae, {
          get each() {
            return e.options;
          },
          children: (g) =>
            (() => {
              var N = Cc();
              return (
                a(N, () => g.label),
                W(() => (N.selected = g.value === s().value)),
                W(() => (N.value = g.value)),
                N
              );
            })(),
        })
      ),
      Ae(b, "click", e.disabled ? void 0 : E),
      a(b, () => s().label || e.placeholder);
    var y = c;
    return (
      typeof y == "function" ? ye(y, x) : (c = x),
      a(
        x,
        d(ae, {
          get each() {
            return e.options;
          },
          children: (g, N) =>
            (() => {
              var C = Ic(),
                $ = C.firstChild;
              return (
                (C.$$click = w),
                (C.$$clickData = g),
                a($, () => g.label),
                a(
                  C,
                  (() => {
                    var f = oe(() => !!g.description);
                    return () =>
                      f() &&
                      (() => {
                        var P = Sc();
                        return a(P, () => g.description), P;
                      })();
                  })(),
                  null
                ),
                W(
                  (f) => {
                    var P = g.value === s().value ? "selected" : "",
                      V = t() ? 0 : -1,
                      R = g.value === s().value;
                    return (
                      P !== f.e && L(C, (f.e = P)),
                      V !== f.t && le(C, "tabindex", (f.t = V)),
                      R !== f.a && le(C, "aria-selected", (f.a = R)),
                      f
                    );
                  },
                  { e: void 0, t: void 0, a: void 0 }
                ),
                C
              );
            })(),
        })
      ),
      a(I, () => e.footNote),
      W(
        (g) => {
          var N = e.name,
            C = e.required,
            $ = e.disabled,
            f = `select-selected ${t() ? "active" : ""} ${
              e.disabled ? "disabled" : ""
            }`,
            P = e.disabled ? -1 : 0,
            V = t(),
            R = `select-items ${t() ? "select-show" : "select-hide"}
        ${l() === "up" ? "select-direction-up" : ""}`;
          return (
            N !== g.e && le(h, "name", (g.e = N)),
            C !== g.t && (h.required = g.t = C),
            $ !== g.a && (h.disabled = g.a = $),
            f !== g.o && L(b, (g.o = f)),
            P !== g.i && le(b, "tabindex", (g.i = P)),
            V !== g.n && le(b, "aria-expanded", (g.n = V)),
            R !== g.s && L(x, (g.s = R)),
            g
          );
        },
        {
          e: void 0,
          t: void 0,
          a: void 0,
          o: void 0,
          i: void 0,
          n: void 0,
          s: void 0,
        }
      ),
      T
    );
  })();
};
ge(["click"]);
const Xt = [
    {
      label: "Include Spam and Trash",
      value: "includeSpamTrash",
      content: {
        type: "switch",
        name: "includeSpamTrash",
        title: "Include Spam and Trash",
        toolTipText:
          "Whether to include messages from SPAM and TRASH in the results.",
        footNote: "",
        options: [],
        placeholder: "",
      },
    },
    {
      label: "Include Drafts",
      value: "includeDrafts",
      content: {
        type: "switch",
        name: "includeDrafts",
        title: "Include Drafts",
        toolTipText: "Whether to include email drafts in the results.",
        footNote: "",
        options: [],
        placeholder: "",
      },
    },
    {
      label: "Label Names or IDs",
      value: "labelIds",
      content: {
        type: "dropdownMultiple",
        name: "labelIds",
        title: "Label Names or IDs",
        toolTipText:
          "Only return messages with labels that match all of the specified label IDs. Choose from the list, or specify IDs using an expression.",
        footNote: "",
        options: [
          { label: "INBOX", value: "INBOX" },
          { label: "UNREAD", value: "UNREAD" },
          { label: "STARRED", value: "STARRED" },
          { label: "IMPORTANT", value: "IMPORTANT" },
        ],
        placeholder: "",
      },
    },
    {
      label: "Search",
      value: "q",
      content: {
        type: "dynamicInput",
        name: "q",
        title: "Search",
        toolTipText: "Only return messages matching the specified query",
        footNote: "Use the same format as in the Gmail search box. More info.",
        options: [],
        placeholder: "has:attachment",
      },
    },
    {
      label: "Read Status",
      value: "readStatus",
      content: {
        type: "dropdownN",
        name: "readStatus",
        title: "Read Status",
        toolTipText: "",
        footNote: "Filter emails by whether they have been read or not.",
        options: [
          { label: "unread and read email", value: "unread and read email" },
          { label: "read email only", value: "read email only" },
          { label: "read emails only", value: "read emails only" },
        ],
        placeholder: "",
      },
    },
    {
      label: "Sender",
      value: "sender",
      content: {
        type: "dynamicInput",
        name: "sender",
        title: "Sender",
        toolTipText: "Sender name or email to filter by.",
        footNote: "",
        options: [],
        placeholder: "",
      },
    },
  ],
  Yt = [
    {
      label: "Attachment Prefix",
      value: "attachmentPrefix",
      content: {
        type: "dynamicInput",
        name: "attachmentPrefix",
        title: "Attachment Prefix",
        toolTipText:
          "Prefix for name of the binary property to which to write the attachment. An index starting with 0 will be added. So if name is 'attachment_' the first attachment is saved to 'attachment_0'.",
        footNote: "",
        options: [],
        placeholder: "attachment_",
        value: "attachment_",
      },
    },
    {
      label: "Download Attachments",
      value: "downloadAttachments",
      content: {
        type: "switch",
        name: "downloadAttachments",
        title: "Download Attachments",
        toolTipText: "Whether the email's attachments will be downloaded",
        footNote: "",
        options: [],
        placeholder: "",
        value: "",
      },
    },
  ],
  Ro = [
    { value: "Every Minute", label: "Every Minute", children: [] },
    {
      value: "Every Hour",
      label: "Every Hour",
      children: [
        {
          type: "input",
          title: "Minute",
          value: 10,
          toolTipText: "The minute of the day to trigger.",
        },
      ],
    },
    {
      value: "Every Day",
      label: "Every Day",
      children: [
        {
          type: "input",
          value: 14,
          title: "Hour",
          toolTipText: "The hour of the day to trigger(24 hour format).",
        },
        {
          type: "input",
          value: 10,
          title: "Minute",
          toolTipText: "The minute of the day to trigger.",
        },
      ],
    },
    {
      value: "Every Week",
      label: "Every Week",
      children: [
        {
          type: "dropdownN",
          title: "Weekday",
          options: [
            { label: "Sunday", value: "Sunday" },
            { label: "Monday", value: "Monday" },
            { label: "Tuesday", value: "Tuesday" },
            { label: "Wednesday", value: "Wednesday" },
            { label: "Thursday", value: "Thursday" },
            { label: "Friday", value: "Friday" },
            { label: "Saturday", value: "Saturday" },
          ],
          toolTipText: "The weekday to trigger.",
        },
        {
          type: "input",
          value: 10,
          title: "Hour",
          toolTipText: "The hour of the day to trigger(24 hour format).",
        },
        {
          type: "input",
          value: 0,
          title: "Minute",
          toolTipText: "The minute of the day to trigger.",
        },
      ],
    },
    {
      value: "Every Month",
      label: "Every Month",
      children: [
        {
          type: "input",
          title: "Day of Month",
          value: 1,
          toolTipText: "The day of the month to trigger.",
        },
        {
          type: "input",
          title: "Hour",
          value: 14,
          toolTipText: "The hour of the day to trigger(24 hour format).",
        },
        {
          type: "input",
          title: "Minute",
          value: 0,
          toolTipText: "The minute of the day to trigger.",
        },
      ],
    },
    {
      value: "Every X",
      label: "Every X",
      children: [
        {
          type: "input",
          title: "Value",
          value: 2,
          toolTipText: "All how many X minutes/hours it should trigger",
        },
        {
          type: "dropdownN",
          title: "Unit",
          toolTipText: "If it should trigger all X minutes or hours",
          options: [
            { label: "Minutes", value: "minutes" },
            { label: "Hours", value: "hours" },
          ],
        },
      ],
    },
    {
      value: "Custom",
      label: "Custom",
      children: [
        {
          type: "input",
          title: "Cron Expression",
          value: "0 0 14 * *",
          toolTipText:
            "Use custom cron expression. Values and ranges as follows:Seconds: 0-59Minutes: 0 - 59Hours: 0 - 23Day of Month: 1 - 31Months: 0 - 11 (Jan - Dec)Day of Week: 0 - 6 (Sun - Sat)",
        },
      ],
    },
  ],
  Ec = (e) =>
    Object.values(
      Object.entries(e)
        .filter(([t, n]) => t.startsWith("pollTime_"))
        .reduce((t, n) => {
          const [s, r] = n,
            l = s.split("_"),
            o = `${l[0]}_${l[1]}`,
            i = l[2];
          return (
            (t[o] ??= {}),
            i
              ? i === "Hour"
                ? (t[o].hour = r)
                : i === "Minute"
                ? (t[o].minute = r)
                : i === "Day of Month"
                ? (t[o].dayOfMonth = r)
                : i === "Weekday"
                ? (t[o].weekday = r)
                : i === "Value"
                ? (t[o].value = r)
                : i === "Unit"
                ? (t[o].unit = r)
                : i === "Cron Expression" && (t[o].cronExpression = r)
              : (t[o].mode = r),
            t
          );
        }, {})
    ),
  en = (e, t) => {
    const { nodes: n } = ie();
    console.log("from encoder top", e);
    const s = (i, c) =>
        i.reduce(
          (p, u) => (
            u in e && (c.includes(u) ? (p[u] = !!e[u]) : (p[u] = e[u])), p
          ),
          {}
        ),
      r = () =>
        s(
          [
            "includeSpamTrash",
            "includeDrafts",
            "labelIds",
            "q",
            "readStatus",
            "sender",
          ],
          ["includeSpamTrash", "includeDrafts"]
        );
    console.log("transformed filter", r());
    const l = () =>
      s(["downloadAttachments", "attachmentPrefix"], ["downloadAttachments"]);
    console.log("transformed option", l());
    const o = () => {
      const i = n().find((c) => c.id === t);
      if (i) return i.currPosition.get();
    };
    return {
      id: t,
      name: "Gmail Trigger",
      description: "Gmail reader",
      type: "GmailReader",
      parameters: {
        credentials: {
          id: "d0esgqltcbthv6156tjg",
          name: "Gmail Account",
          provider: "gmail",
          ctype: "oauth2",
        },
        pollTimes: Ec(e),
        simple: !!e?.simplify,
        filters: r(),
        options: l(),
      },
      position: o(),
      inputs: [],
      outputs: [
        {
          id: "output",
          name: "Last Email",
          description: "Read last email from your gmail inbox",
          type: "object",
        },
      ],
    };
  },
  Oc = (e) => {
    if (e) {
      const { parameters: t } = e,
        n = t.pollTimes,
        s = [],
        r = {},
        l = {};
      return (
        n &&
          n.forEach((o) => {
            const i = `pollTime_${Math.random().toString(36).substring(2, 8)}`;
            s.push(i),
              (r[i] = o.mode),
              (l[i] = o.mode),
              "hour" in o && (l[`${i}_Hour`] = o.hour),
              "minute" in o && (l[`${i}_Minute`] = o.minute),
              "dayOfMonth" in o && (l[`${i}_Day of Month`] = o.dayOfMonth),
              "weekday" in o && (l[`${i}_Weekday`] = o.weekday),
              "value" in o && (l[`${i}_Value`] = o.value),
              "unit" in o && (l[`${i}_Unit`] = o.unit),
              "cronExpression" in o &&
                (l[`${i}_Cron Expression`] = o.cronExpression);
          }),
        {
          simplify: t?.simple,
          pollTimes: { parsedPollTimes: s, parseModesData: l, parsedModes: r },
          filters: t?.filters,
          options: t?.options,
        }
      );
    }
  };
function Dc() {
  const { formData: e, setFormData: t, currentFormConfig: n } = ie(),
    [s, r] = k([]),
    [l, o] = k([]),
    [i, c] = k([]),
    [p, u] = k({}),
    [m, v] = k({});
  k({});
  const [_, E] = k([]),
    [w, D] = k([]),
    [T, S] = k({}),
    [h, b] = k({}),
    [x, I] = k(""),
    A = new Set();
  Ie(() => {
    r(Xt), o(Yt);
  });
  const y = () => {
      S({}), c([]), u({}), v({}), D([]), E([]), b({}), r(Xt), o(Yt);
    },
    g = ($, f) => {
      if (
        (console.log("from data handler raw >>>> ", $, " >>>>> ", f),
        console.log("before check from data handler", h()),
        $ in h())
      ) {
        if (h()[$] === f) {
          console.log(
            "from data handler:::: >> submitted Data,>>> data unchanged, key unchanged",
            T()
          ),
            S((P) => ({ ...P, [$]: f })),
            console.log(
              "from data handler:::: >> submitted data from previous data >>> data unchanged, key unchanged",
              T()
            ),
            console.log(
              "from data handler:::: >> form data >>> data unchanged, key unchanged",
              e()
            );
          return;
        } else if (h()[$] !== f) {
          console.log(
            "from data handler, 2,>>> key unchanged but data changed",
            h()
          ),
            console.log(
              "from data handler:::: >> submitted data 1 >>> key unchanged but data changed",
              T()
            ),
            S((V) => ({ ...V, [$]: f })),
            console.log(
              "from data handler:::: >> submitted data 2 >>> key unchanged but data changed",
              T()
            );
          const P = en(T(), n().id);
          console.log(
            "from data handler:::: >> formatted key >>>  unchanged but data changed",
            P
          ),
            t({ ...e(), [n().id]: P }),
            console.log(
              "from data handler:::: >> formData() >>> key unchanged but data changed",
              e()
            );
        }
      } else {
        console.log("from data handler, 2 >>> both key and data changed", h()),
          console.log(
            "from data handler:::: >> submitted data 1  >>> both key and data changed",
            T()
          ),
          S((V) => ({ ...V, [$]: f })),
          console.log(
            "from data handler:::: >> submitted data 2 >>> both key and data changed",
            T()
          );
        const P = en(T(), n().id);
        console.log(
          "from data handler:::: >> formatted >>> both key and data changed",
          P
        ),
          t({ ...e(), [n().id]: P }),
          console.log(
            "from data handler:::: >> formData() >>> both key and data changed",
            e()
          );
      }
    },
    N = ($) => {
      console.log("from data remover raw >>>> ", $, " >>>>>> "),
        console.log(" from data remover submitted>>>> pre data", T()),
        S((P) =>
          Object.entries(P).reduce(
            (V, [R, H]) => (R.includes($) || (V[R] = H), V),
            {}
          )
        ),
        console.log(" from data remover submitted>>>> post data", T());
      const f = en(T(), n().id);
      console.log("from data remover >>>>> formattedPrev", f),
        t({ ...e(), [n().id]: f }),
        console.log("from data remover >>> form data", e());
    },
    C = ($, f, P) => {
      console.log($, "not ok");
      const V = $.flatMap((R) => f.filter((H) => H.value === R));
      console.log(V, "ok"), P((R) => [...R, ...V]);
    };
  return (
    be(() => {
      if (
        (console.log(
          n().id,
          "  >  node data  >  ",
          `
`,
          _(),
          `
`,
          w()
        ),
        console.log(">>>>>>.>>>>>>>>>>>>>>>>>.>>>>>>>>>>>>>>>>>>>>>>>>>"),
        console.log(h(), "from outside"),
        !A.has(n().id))
      ) {
        A.clear(), A.add(n().id), I(n().id);
        const $ = e()[n().id];
        if ((console.log("data1", $), !$)) {
          y();
          return;
        }
        y(), console.log("data2", $);
        const f = Oc($);
        f &&
          (console.log(
            "decoded from observer, >>>>>> ",
            n().id,
            f?.filters,
            f.options
          ),
          b((P) => ({
            ...P,
            simplify: f.simplify,
            ...f.pollTimes.parseModesData,
            ...f.filters,
            ...f.options,
          })),
          console.log(h(), "from inside"),
          console.log(f.pollTimes.parseModesData, "from inside parseModesData"),
          c(f.pollTimes.parsedPollTimes ?? []),
          u(f.pollTimes.parsedModes ?? {}),
          C(Object.keys(f.filters), Xt, D),
          r(() => Xt.filter((P) => w().every((V) => V.value !== P.value))),
          C(Object.keys(f.options), Yt, E),
          o(() => Yt.filter((P) => _().every((V) => V.value !== P.value))));
      }
    }),
    {
      pollTimes: i,
      setPollTimes: c,
      mode: p,
      setMode: u,
      selectedOptions: _,
      setSelectedOptions: E,
      selectedFilter: w,
      setSelectedFilter: D,
      submittedData: T,
      dataHandler: g,
      modeChild: m,
      setModeChild: v,
      filters: s,
      setFilters: r,
      options: l,
      setOptions: o,
      previousData: h,
      setPreviousData: b,
      setSubmittedData: S,
      dataRemoveHandler: N,
      uniqueKey: x,
    }
  );
}
var Nc = O(
    '<div><form class=form id=gmail-triggerForm><div class=space-y-5><div><div class="label hr-solid-line">Pool Times</div><div class=mt-5></div></div><div></div><div></div><div><div class="label hr-solid-line">Filters</div><div class="space-y-6 mt-5"></div><div class=mt-6></div></div><div><div class="label hr-solid-line">Options</div><div class="space-y-6 mt-5"></div><div class=mt-6>'
  ),
  kc = O(
    '<div class="text-[#9c9c9e] text-center text-sm border border-[#9c9c9e] p-4 rounded-md border-dashed">Currently no items exist'
  ),
  Pc = O('<div class="space-y-4 mt-5">'),
  Ac = O(
    '<div><div class=pt-9><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"></div></div><div class=w-full>'
  ),
  pt = O(
    '<div class="group flex items-start gap-1.5 w-full"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100">'
  );
const Mc = (e) => {
  const { currentFormConfig: t, formData: n, setFormData: s } = ie(),
    {
      pollTimes: r,
      setPollTimes: l,
      mode: o,
      setMode: i,
      selectedOptions: c,
      setSelectedOptions: p,
      selectedFilter: u,
      setSelectedFilter: m,
      previousData: v,
      dataHandler: _,
      modeChild: E,
      setModeChild: w,
      setFilters: D,
      filters: T,
      options: S,
      setOptions: h,
      dataRemoveHandler: b,
      uniqueKey: x,
    } = Dc(),
    I = (y, g) =>
      Object.entries(y).reduce(
        (N, [C, $]) => (C.startsWith(g) || (N[C] = $), N),
        {}
      ),
    A = (y) => {
      y.preventDefault();
      const g = new FormData(y.target);
      let N = {
        ...Object.fromEntries(g.entries()),
        labelIds: g.getAll("labelIds"),
      };
      console.log("unformatted data", N);
      const C = en(N, t().id);
      s({ ...n(), [t().id]: C }), console.log("formattedData", C);
      const $ = new CustomEvent("RIN", { detail: N, bubbles: !0 }),
        f = document.getElementById("submitBtn");
      f && f.dispatchEvent($);
    };
  return (() => {
    var y = Nc(),
      g = y.firstChild,
      N = g.firstChild,
      C = N.firstChild,
      $ = C.firstChild,
      f = $.nextSibling,
      P = C.nextSibling,
      V = P.nextSibling,
      R = V.nextSibling,
      H = R.firstChild,
      J = H.nextSibling,
      j = J.nextSibling,
      K = R.nextSibling,
      B = K.firstChild,
      F = B.nextSibling,
      q = F.nextSibling;
    return (
      g.addEventListener("submit", A),
      a(
        N,
        d(et, {
          name: "credential",
          title: "Credential to connect with",
          placeholder: "Create credential...",
        }),
        C
      ),
      a(
        f,
        (() => {
          var M = oe(() => r().length <= 0);
          return () => M() && kc();
        })(),
        null
      ),
      a(
        f,
        d(ae, {
          get each() {
            return r();
          },
          children: (M, G) =>
            (() => {
              var X = Ac(),
                Y = X.firstChild,
                re = Y.firstChild,
                U = Y.nextSibling;
              return (
                (re.$$click = () => {
                  l(r().filter((Q, z) => Q !== M)),
                    console.log("pre-previous", v()),
                    console.log("from delete handler: previous", o(), E()),
                    i((Q) => I(Q, M)),
                    w((Q) => I(Q, M)),
                    console.log("from delete handler:after", o(), E()),
                    b(M),
                    console.log("post-previous", v());
                }),
                a(re, d(pe, {})),
                a(
                  U,
                  d(Te, {
                    name: M,
                    get uniqueKey() {
                      return x();
                    },
                    get defaultValue() {
                      return o()[M] || Ro[1].value;
                    },
                    options: Ro,
                    title: "Mode",
                    toolTipText: "How often to trigger.",
                    onChange: (Q) => {
                      _(M, Q.value),
                        i((z) => {
                          const ne = { ...z };
                          return (ne[M] = `${Q.value}`), ne;
                        }),
                        w((z) => {
                          const ne = { ...z };
                          return (ne[M] = Q.children ?? []), ne;
                        });
                    },
                  }),
                  null
                ),
                a(
                  U,
                  d(te, {
                    get when() {
                      return E()[M];
                    },
                    get children() {
                      var Q = Pc();
                      return (
                        a(
                          Q,
                          d(ae, {
                            get each() {
                              return E()[M];
                            },
                            children: (z, ne) => {
                              if (z.type === "input")
                                return d(se, {
                                  get name() {
                                    return `${M}_${z.title}`;
                                  },
                                  get title() {
                                    return z.title;
                                  },
                                  get toolTipText() {
                                    return z.toolTipText;
                                  },
                                  isArrow: !0,
                                  get value() {
                                    return (
                                      v()[`${M}_${z.title}`] || z.value || ""
                                    );
                                  },
                                  onInput: (ee, me) => {
                                    _(`${M}_${z.title}`, ee);
                                  },
                                });
                              if (z.type === "dropdownN")
                                return d(we, {
                                  get name() {
                                    return `${M}_${z.title}`;
                                  },
                                  get uniqueKey() {
                                    return x();
                                  },
                                  get title() {
                                    return z.title;
                                  },
                                  get options() {
                                    return z.options ?? [];
                                  },
                                  get defaultValue() {
                                    return (
                                      v()[`${M}_${z.title}`] ||
                                      z.options?.[0]?.value
                                    );
                                  },
                                  get toolTipText() {
                                    return z.toolTipText;
                                  },
                                  onChange: (ee) => {
                                    _(`${M}_${z.title}`, ee.value);
                                  },
                                });
                            },
                          })
                        ),
                        Q
                      );
                    },
                  }),
                  null
                ),
                W(() =>
                  L(
                    X,
                    `mb-10 flex flex-row gap-1.5 items-top group ${
                      G() !== 0
                        ? "border-t border-dashed border-[#727171] pt-3"
                        : ""
                    }`
                  )
                ),
                X
              );
            })(),
        }),
        null
      ),
      a(
        C,
        d(lt, {
          onClick: () => {
            l([
              ...r(),
              `pollTime_${Math.random().toString(36).substring(2, 8)}`,
            ]);
          },
          label: "Add Poll Time",
        }),
        null
      ),
      a(
        P,
        d(we, {
          name: "event",
          title: "Event",
          get uniqueKey() {
            return x();
          },
          get defaultValue() {
            return v().event;
          },
          options: [{ label: "Message received", value: "Message received" }],
          onChange: (M) => {},
        })
      ),
      a(
        V,
        d(_e, {
          title: "Simplify",
          name: "simplify",
          get uniqueKey() {
            return x();
          },
          get checked() {
            return v().simplify;
          },
          toolTipText:
            "Whether to return a simplified version of the response instead of the raw data.",
          onChange: (M) => {
            _("simplify", M);
          },
        })
      ),
      a(
        J,
        d(ae, {
          get each() {
            return u();
          },
          children: (M, G) => {
            if (M.content.type === "switch")
              return (() => {
                var X = pt(),
                  Y = X.firstChild;
                return (
                  (Y.$$click = () => {
                    const re = u().filter((U) => U.value !== M.value);
                    m(re), D([...T(), M]), b(M.value);
                  }),
                  a(Y, d(pe, {})),
                  a(
                    X,
                    d(_e, {
                      get name() {
                        return M.content.name;
                      },
                      get title() {
                        return M.content.title;
                      },
                      get uniqueKey() {
                        return x();
                      },
                      get checked() {
                        return v()[M.content.name];
                      },
                      get toolTipText() {
                        return M.content.toolTipText;
                      },
                      onChange: (re) => {
                        _(M.content.name, re);
                      },
                    }),
                    null
                  ),
                  X
                );
              })();
            if (M.content.type === "dynamicInput")
              return (() => {
                var X = pt(),
                  Y = X.firstChild;
                return (
                  (Y.$$click = () => {
                    const re = u().filter((U) => U.value !== M.value);
                    m(re), D([...T(), M]), b(M.value);
                  }),
                  a(Y, d(pe, {})),
                  a(
                    X,
                    d(se, {
                      get name() {
                        return M.content.name;
                      },
                      get title() {
                        return M.content.title;
                      },
                      get toolTipText() {
                        return M.content.toolTipText;
                      },
                      isArrow: !0,
                      get footNote() {
                        return M.content.footNote;
                      },
                      get placeholder() {
                        return M.content.placeholder ?? "";
                      },
                      get value() {
                        return v()[M.content.name];
                      },
                      onInput: (re) => {
                        _(M.content.name, re);
                      },
                    }),
                    null
                  ),
                  X
                );
              })();
            if (M.content.type === "dropdownMultiple")
              return (() => {
                var X = pt(),
                  Y = X.firstChild;
                return (
                  (Y.$$click = () => {
                    const re = u().filter((U) => U.value !== M.value);
                    m(re), D([...T(), M]), b(M.value);
                  }),
                  a(Y, d(pe, {})),
                  a(
                    X,
                    d(Wl, {
                      get name() {
                        return M.content.name;
                      },
                      get title() {
                        return M.content.title;
                      },
                      get options() {
                        return M.content.options;
                      },
                      get toolTipText() {
                        return M.content.toolTipText;
                      },
                      get defaultSelectedOptions() {
                        return v()[M.content.name] || [];
                      },
                      get footNote() {
                        return M.content.footNote;
                      },
                      onChange: (re) => {
                        _(
                          M.content.name,
                          re.map((U) => U.value)
                        );
                      },
                    }),
                    null
                  ),
                  X
                );
              })();
            if (M.content.type === "dropdownN")
              return (() => {
                var X = pt(),
                  Y = X.firstChild;
                return (
                  (Y.$$click = () => {
                    const re = u().filter((U) => U.value !== M.value);
                    m(re), D([...T(), M]), b(M.value);
                  }),
                  a(Y, d(pe, {})),
                  a(
                    X,
                    d(we, {
                      get uniqueKey() {
                        return x();
                      },
                      get defaultValue() {
                        return (
                          v()[M.content.name] ?? M.content.options[0].value
                        );
                      },
                      get name() {
                        return M.content.name;
                      },
                      get title() {
                        return M.content.title;
                      },
                      get options() {
                        return M.content.options;
                      },
                      get toolTipText() {
                        return M.content.toolTipText;
                      },
                      get footNote() {
                        return M.content.footNote;
                      },
                      onChange: (re) => {
                        _(M.content.name, re.value);
                      },
                    }),
                    null
                  ),
                  X
                );
              })();
          },
        })
      ),
      a(
        j,
        d(Me, {
          name: "filter",
          dropdownOptions: T,
          setDropdownOptions: D,
          selectedOptions: u,
          setSelectedOptions: m,
          placeholder: "Add filter",
          onChange: (M) => {},
        })
      ),
      a(
        F,
        d(ae, {
          get each() {
            return c();
          },
          children: (M, G) => {
            if (M.content.type === "switch")
              return (() => {
                var X = pt(),
                  Y = X.firstChild;
                return (
                  (Y.$$click = () => {
                    const re = c().filter((U) => U.value !== M.value);
                    p(re), h([...S(), M]), b(M.value);
                  }),
                  a(Y, d(pe, {})),
                  a(
                    X,
                    d(_e, {
                      get name() {
                        return M.content.name;
                      },
                      get title() {
                        return M.content.title;
                      },
                      get uniqueKey() {
                        return x();
                      },
                      get toolTipText() {
                        return M.content.toolTipText;
                      },
                      get checked() {
                        return v()[M.content.name] ?? !1;
                      },
                      onChange: (re) => {
                        _(M.content.name, re);
                      },
                    }),
                    null
                  ),
                  X
                );
              })();
            if (M.content.type === "dynamicInput")
              return (() => {
                var X = pt(),
                  Y = X.firstChild;
                return (
                  (Y.$$click = () => {
                    const re = c().filter((U) => U.value !== M.value);
                    p(re), h([...S(), M]), b(M.value);
                  }),
                  a(Y, d(pe, {})),
                  a(
                    X,
                    d(se, {
                      get name() {
                        return M.content.name;
                      },
                      get title() {
                        return M.content.title;
                      },
                      get toolTipText() {
                        return M.content.toolTipText;
                      },
                      isArrow: !0,
                      get footNote() {
                        return M.content.footNote;
                      },
                      get value() {
                        return v()[M.content.name] || M.content.value || "";
                      },
                      onInput: (re) => {
                        _(M.content.name, re);
                      },
                    }),
                    null
                  ),
                  X
                );
              })();
          },
        })
      ),
      a(
        q,
        d(Me, {
          name: "options_gmail_node",
          dropdownOptions: S,
          setDropdownOptions: h,
          selectedOptions: c,
          setSelectedOptions: p,
          placeholder: "Add Options",
          onChange: (M) => {},
        })
      ),
      W(() => le(y, "id", t().id)),
      y
    );
  })();
};
ge(["click"]);
const zn = [
    {
      value: "Tools Agent",
      label: "Tools Agent",
      description: `
        Utilizes structured tool schemas for precise and reliable tool selection and execution. Recommended for complex tasks requiring accurate and consistent tool usage, but only usable with models that support tool calling.`,
    },
    {
      value: "Conversational Agent",
      label: "Conversational Agent",
      description: `
        Describes tools in the system prompt and parses JSON responses for tool calls. More flexible but potentially less reliable than the Tools Agent. Suitable for simpler interactions or with models not supporting structured schemas.`,
    },
    {
      value: "OpenAI Functions Agent",
      label: "OpenAI Functions Agent",
      description: `
        Leverages OpenAI's function calling capabilities to precisely select and execute tools. Excellent for tasks requiring structured outputs when working with OpenAI models.`,
    },
    {
      value: "Plan and Execute Agent",
      label: "Plan and Execute Agent",
      description:
        "Creates a high-level plan for complex tasks and then executes each step. Suitable for multi-stage problems or when a strategic approach is needed.",
    },
    {
      value: "ReAct Agent",
      label: "ReAct Agent",
      description:
        "Combines reasoning and action in an iterative process. Effective for tasks that require careful analysis and step-by-step problem-solving.",
    },
    {
      value: "SQL Agent",
      label: "SQL Agent",
      description:
        "Specializes in interacting with SQL databases. Ideal for data analysis tasks, generating queries, or extracting insights from structured data.",
    },
  ],
  Wn = [
    {
      value: "ConnectedChatTriggerNode",
      label: "Connected Chat Trigger Node",
      description:
        "Looks for an input field called 'chatInput' that is coming from a directly connected Chat Trigger.",
      children: [],
    },
    {
      value: "Define below",
      label: "DefineBelow",
      description:
        "Use an expression to reference data in previous nodes or enter static text.",
      children: [],
    },
  ],
  Sn = [
    {
      label: "System Message",
      value: "systemMessage",
      content: {
        type: "textArea",
        title: "System Message",
        value: "You are a helpful assistant.",
        name: "systemMessage",
        toolTipText:
          "The message that will be sent to the agent before the conversation starts.",
      },
    },
    {
      label: "Max Iterations",
      value: "maxIterations",
      content: {
        type: "input",
        title: "Max Iterations",
        value: "10",
        name: "maxIterations",
        toolTipText:
          "The maximum number of iterations the agent will run before stopping.",
      },
    },
    {
      label: "Return Intermediate Steps",
      value: "returnIntermediateSteps",
      content: {
        type: "switch",
        title: "Return Intermediate Steps",
        name: "returnIntermediateSteps",
        toolTipText:
          "Whether or not the output should include intermediate steps the agent took",
      },
    },
    {
      label: "Automatically Passthrough Binary Images",
      value: "passthroughBinaryImages",
      content: {
        type: "switch",
        title: "Automatically Passthrough Binary Images",
        name: "passthroughBinaryImages",
        toolTipText:
          "Whether or not binary images should be automatically passed through to the agent as image type messages.",
      },
    },
  ],
  Kn = [
    {
      label: "MySQL",
      value: "mysql",
      description: "Connected to a MySQL Database",
    },
    {
      label: "Postgres",
      value: "postgres",
      description: "Connected to a Postgres Database",
    },
    {
      label: "SQLite",
      value: "sqlite",
      description: "Use SQLite by connecting a database file as binary input.",
    },
  ];
var Vc = O("<div class=relative><textarea autocomplete=off rows=3>"),
  Lc = O("<label class=label>"),
  Fc = O("<div class=toolTipBtn>"),
  Bc = O(
    '<div class="absolute right-3 top-1/2 transform -translate-y-1/2"><svg width=20 height=20 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round class=text-red-500><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><path d="M12 9v4"></path><path d="m12 17 .01 0">'
  );
const We = (e) => {
  const [t, n] = k(""),
    [s, r] = k(!0),
    [l, o] = k("");
  be(() => {
    const c = `${e.uniqueKey}-${e.name}`;
    c !== l() &&
      (console.log("unique key from inside", e.uniqueKey),
      r(e.value?.trim() === "" || !1),
      o(c),
      e.onInput?.(e.value || ""));
  });
  const i = (c) => {
    const u = c.target.value;
    n(u), r(u.trim() === ""), e.onInput?.(u || "");
  };
  return (() => {
    var c = Vc(),
      p = c.firstChild;
    return (
      a(
        c,
        (() => {
          var u = oe(() => !!e.title);
          return () =>
            u() &&
            (() => {
              var m = Lc();
              return (
                a(m, () => e.title, null),
                a(
                  m,
                  (() => {
                    var v = oe(() => !!e.toolTipText);
                    return () =>
                      v() &&
                      (() => {
                        var _ = Fc();
                        return (
                          a(
                            _,
                            d(Re, {
                              get content() {
                                return e.toolTipText;
                              },
                            })
                          ),
                          _
                        );
                      })();
                  })(),
                  null
                ),
                W(() => le(m, "for", e.name)),
                m
              );
            })();
        })(),
        p
      ),
      (p.$$input = i),
      a(
        c,
        (() => {
          var u = oe(() => !!s());
          return () => u() && Bc();
        })(),
        null
      ),
      W(
        (u) => {
          var m = e.name,
            v = e.placeholder || "Type here...",
            _ = `
              w-full px-4 py-3 pr-12 
              bg-[#252434] text-white 
              rounded-lg resize-none 
              placeholder-gray-400
              focus:outline-none
              transition-all duration-200
              ${
                s()
                  ? "border-1 border-[#b46262] focus:border-[#888484]"
                  : "border-1 border-[#dad7d742] focus:border-[#888484]"
              }
            `;
          return (
            m !== u.e && le(p, "name", (u.e = m)),
            v !== u.t && le(p, "placeholder", (u.t = v)),
            _ !== u.a && L(p, (u.a = _)),
            u
          );
        },
        { e: void 0, t: void 0, a: void 0 }
      ),
      W(() => (p.value = e.value || "")),
      c
    );
  })();
};
ge(["input"]);
var Rc = O(
  '<div class="bg-[#584d38] border-[#f2dbb0] border-l-8 border font-light text-[#e7e1e1] py-2 px-3 leading-6 rounded-sm">'
);
const qt = (e) => {
    const t = cr(() => e.children);
    return (() => {
      var n = Rc();
      return a(n, t), n;
    })();
  },
  tn = (e, t) => {
    const { nodes: n } = ie(),
      s = (o, i) =>
        o.reduce(
          (c, p) => (
            p in e && (i.includes(p) ? (c[p] = !!e[p]) : (c[p] = e[p])), c
          ),
          {}
        ),
      r = () =>
        s(
          [
            "systemMessage",
            "maxIterations",
            "returnIntermediateSteps",
            "passthroughBinaryImages",
          ],
          ["returnIntermediateSteps", "passthroughBinaryImages"]
        ),
      l = () => {
        const o = n().find((i) => i.id === t);
        if (o)
          return {
            x: Math.trunc(o.currPosition.get().x),
            y: Math.trunc(o.currPosition.get().y),
          };
      };
    return {
      id: t,
      name: "AI Agent",
      description: "AI Agent",
      type: "LangChainAgent",
      parameters: {
        agent: e?.agent,
        promptType: e?.sourceForPrompt,
        text: e?.promptDefineBelow || e?.promptConnectedChatTriggerNode || "",
        options: r(),
      },
      position: l(),
      inputs: [
        {
          id: "input",
          name: "fromEdit",
          description: "data coming from previous node",
          type: "object",
        },
      ],
      outputs: [
        {
          id: "output",
          name: "agent output",
          description: "reAct agent",
          type: "object",
        },
        {
          id: "chatModel",
          name: "from ollamaChatModel1",
          description: "data coming from ollama node",
          type: "object",
        },
      ],
    };
  },
  qc = (e) => {
    if (e) {
      const { parameters: t } = e;
      return {
        agent: t?.agent,
        sourceForPrompt: t?.promptType,
        promptDefineBelow: t?.text,
        promptConnectedChatTriggerNode: t?.text,
        options: t?.options,
      };
    }
  };
function Hc() {
  const { formData: e, setFormData: t, currentFormConfig: n } = ie(),
    [s, r] = k(zn[0].value),
    [l, o] = k(Wn[0].value),
    [i, c] = k(Kn[0].value),
    [p, u] = k([]),
    [m, v] = k([]),
    [_, E] = k({}),
    [w, D] = k({}),
    [T, S] = k(""),
    h = new Set(),
    b = () => {
      v(Sn), u([]), E({}), D({});
    },
    x = (y, g) => {
      if (
        (console.log("from data handler raw >>>> ", y, " >>>>> ", g),
        console.log("before check: previous data from dataHandler", w()),
        y in w())
      ) {
        if (w()[y] === g) {
          console.log(
            "from data handler:::: >> previous Data,>>> data unchanged, key unchanged",
            _()
          ),
            E((N) => ({ ...N, [y]: g })),
            console.log(
              "from data handler:::: >> submitted data from previous data >>> data unchanged, key unchanged",
              _()
            );
          return;
        } else if (w()[y] !== g) {
          console.log(
            "from data handler, 2,>>> key unchanged but data changed",
            w()
          ),
            console.log(
              "from data handler:::: >> submitted data 1 >>> key unchanged but data changed",
              _()
            ),
            E((C) => ({ ...C, [y]: g })),
            console.log(
              "from data handler:::: >> submitted data 2 >>> key unchanged but data changed",
              _()
            );
          const N = tn(_(), n().id);
          console.log(
            "from data handler:::: >> formatted key >>>  unchanged but data changed",
            N
          ),
            t({ ...e(), [n().id]: N }),
            console.log(
              "from data handler:::: >> formData() >>> key unchanged but data changed",
              e()
            );
        }
      } else {
        console.log("from data handler, 2 >>> both key and data changed", w()),
          console.log(
            "from data handler:::: >> submitted data 1  >>> both key and data changed",
            _()
          ),
          E((C) => ({ ...C, [y]: g })),
          console.log(
            "from data handler:::: >> submitted data 2 >>> both key and data changed",
            _()
          );
        const N = tn(_(), n().id);
        console.log(
          "from data handler:::: >> formatted >>> both key and data changed",
          N
        ),
          t({ ...e(), [n().id]: N }),
          console.log(
            "from data handler:::: >> formData() >>> both key and data changed",
            e()
          );
      }
    },
    I = (y) => {
      console.log("from data remover raw >>>> ", y, " >>>>>> "),
        E((N) =>
          Object.entries(N).reduce(
            (C, [$, f]) => ($.includes(y) || (C[$] = f), C),
            {}
          )
        ),
        console.log(" from data remover >>>> previous data", _());
      const g = tn(_(), n().id);
      console.log("from data remover >>>>> formattedPrev", g),
        t({ ...e(), [n().id]: g }),
        console.log("from data remover >>> form data", e());
    },
    A = (y, g, N) => {
      console.log(y, "not ok");
      const C = y.flatMap(($) => g.filter((f) => f.value === $));
      console.log(C, "ok"), N(($) => [...$, ...C]);
    };
  return (
    be(() => {
      if (
        (console.log(
          n().id,
          "  >  node data  >  ",
          `
`,
          p()
        ),
        console.log(">>>>>>.>>>>>>>>>>>>>>>>>.>>>>>>>>>>>>>>>>>>>>>>>>>"),
        console.log(w(), "from outside"),
        !h.has(n().id))
      ) {
        h.clear(), h.add(n().id), S(n().id);
        const y = e()[n().id];
        if ((console.log("data1", y), b(), !y)) return;
        console.log("data2", y);
        const g = qc(y);
        g &&
          (console.log(
            "decoded from observer, >>>>>> ",
            n().id,
            g.agent,
            g.sourceForPrompt
          ),
          D((N) => ({
            ...N,
            agent: g.agent,
            sourceForPrompt: g.sourceForPrompt,
            promptDefineBelow: g.promptDefineBelow,
            promptConnectedChatTriggerNode: g.promptConnectedChatTriggerNode,
            ...g.options,
          })),
          console.log(w(), "from inside"),
          console.log(g.sourceForPrompt, "from inside createEffect"),
          r(g.agent),
          o(g.sourceForPrompt),
          A(Object.keys(g.options), Sn, u),
          v(() => Sn.filter((N) => p().every((C) => C.value !== N.value))));
      }
    }),
    {
      selectedOptions: p,
      setSelectedOptions: u,
      submittedData: _,
      dataInsertHandler: x,
      options: m,
      setOptions: v,
      previousData: w,
      setPreviousData: D,
      setSubmittedData: E,
      dataRemoveHandler: I,
      reset: b,
      uniqueKey: T,
      currentAgent: s,
      setCurrentAgent: r,
      currentSourceForPrompt: l,
      setCurrentSourceForPrompt: o,
      dataSource: i,
      setDataSource: c,
    }
  );
}
var jc = O('<a href=# class="font-semibold text-[#fe705a]">tutorial'),
  zc = O('<a href=# class="font-semibold text-[#fe705a]">example'),
  Wc = O(
    `<div class="mt-5 space-y-5"><div class="bg-[#584d38] border-[#f2dbb0] border-l-8 border font-extralight text-[#e7e1e1] py-2 px-3 leading-6 rounded-sm">Pass the SQLite database into this node as binary data, e.g. by inserting a 'Read/Write Files from Disk' node beforehand</div><div>`
  ),
  Kc = O('<div class="mt-5 space-y-5"><div></div><div>'),
  Uc = O("<div class=mt-5>"),
  Gc = O(
    '<form class=form id=ai-agentForm><div><div></div><div class=mt-5><div class=mt-4></div></div><div class=mt-5><div class="label hr-solid-line">Options</div><div class="mt-5 space-y-5"></div><div class=mt-5>'
  ),
  qo = O(
    '<div class="group flex items-start gap-1.5 w-full"><div class="text-[#6f6f70] hover:text-[#ff6f5c] mt-1 cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"></div><div class=flex-1>'
  ),
  Xc = O(
    '<div class="group flex items-start gap-1.5 w-full"><div class="text-[#6f6f70] hover:text-[#ff6f5c] mt-1 cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"></div><div class=flex-1></div>;'
  );
const Yc = (e) => {
  const { currentFormConfig: t } = ie(),
    { formData: n, setFormData: s } = ie(),
    {
      selectedOptions: r,
      setSelectedOptions: l,
      dataInsertHandler: o,
      options: i,
      setOptions: c,
      previousData: p,
      dataRemoveHandler: u,
      uniqueKey: m,
      currentAgent: v,
      setCurrentAgent: _,
      currentSourceForPrompt: E,
      setCurrentSourceForPrompt: w,
      dataSource: D,
      setDataSource: T,
    } = Hc(),
    S = () => v() === "Tools Agent" || v() === "Conversational Agent",
    h = (b) => {
      b.preventDefault();
      const x = new FormData(b.target);
      let I = Object.fromEntries(x.entries());
      const A = tn(I, t().id);
      s({ ...n(), [t().id]: A }), console.log(A);
      const y = new CustomEvent("formSubmitEvent", { detail: I, bubbles: !0 }),
        g = document.getElementById("submitBtn");
      g && g.dispatchEvent(y);
    };
  return (() => {
    var b = Gc(),
      x = b.firstChild,
      I = x.firstChild,
      A = I.nextSibling,
      y = A.firstChild,
      g = A.nextSibling,
      N = g.firstChild,
      C = N.nextSibling,
      $ = C.nextSibling;
    return (
      b.addEventListener("submit", h),
      a(
        x,
        d(te, {
          get when() {
            return S();
          },
          get children() {
            return d(qt, {
              get children() {
                return [
                  "Tip: Get a feel for agents with our quick",
                  " ",
                  jc(),
                  " ",
                  "or see an",
                  " ",
                  zc(),
                  " ",
                  "of how this node works",
                ];
              },
            });
          },
        }),
        I
      ),
      a(
        I,
        d(Te, {
          name: "agent",
          title: "Agent",
          get uniqueKey() {
            return m();
          },
          get defaultValue() {
            return zn[0].value;
          },
          options: zn,
          onChange: (f) => {
            _(f.value), o("agent", f.value);
          },
        })
      ),
      a(
        x,
        d(te, {
          get when() {
            return v() === "SQL Agent";
          },
          get children() {
            var f = Kc(),
              P = f.firstChild,
              V = P.nextSibling;
            return (
              a(
                P,
                d(we, {
                  name: "dataSource",
                  options: Kn,
                  title: "Data Source",
                  get uniqueKey() {
                    return m();
                  },
                  get defaultValue() {
                    return Kn[0].value;
                  },
                  onChange: (R) => {
                    T(R.value), o("dataSource", R);
                  },
                })
              ),
              a(
                f,
                d(te, {
                  get when() {
                    return D() === "sqlite";
                  },
                  get children() {
                    var R = Wc(),
                      H = R.firstChild,
                      J = H.nextSibling;
                    return (
                      a(
                        J,
                        d(se, {
                          name: "inputBinaryField",
                          title: "Input Binary Field",
                          get uniqueKey() {
                            return m();
                          },
                          placeholder: "e.g. Data",
                          value: "",
                          footNote:
                            "The name of the input binary field containing the file to be extracted",
                          isArrow: !0,
                          onInput: (j) => {
                            o("inputBinaryField", j);
                          },
                        })
                      ),
                      R
                    );
                  },
                }),
                V
              ),
              a(
                V,
                d(te, {
                  get when() {
                    return D() !== "sqlite";
                  },
                  get children() {
                    return d(et, {
                      get name() {
                        return `credential_for_${D()}`;
                      },
                      get title() {
                        return `Credential for ${D()}`;
                      },
                      placeholder: "Select Credential",
                    });
                  },
                })
              ),
              f
            );
          },
        }),
        A
      ),
      a(
        A,
        d(Te, {
          name: "sourceForPrompt",
          title: "Source for Prompt (User message)",
          get uniqueKey() {
            return m();
          },
          options: Wn,
          get defaultValue() {
            return Wn[0].value;
          },
          onChange: (f) => {
            w(f.value), o("sourceForPrompt", f.value);
          },
        }),
        y
      ),
      a(
        y,
        d(te, {
          get when() {
            return E() === "DefineBelow";
          },
          get children() {
            return d(We, {
              name: "promptDefineBelow",
              title: "Prompt (User message)",
              get value() {
                return p().promptDefineBelow;
              },
              get uniqueKey() {
                return m();
              },
              placeholder: "e.g. Hello, how can you help me?",
              onInput: (f) => {
                o(`prompt${E()}`, f);
              },
            });
          },
        }),
        null
      ),
      a(
        y,
        d(te, {
          get when() {
            return E() === "ConnectedChatTriggerNode";
          },
          get children() {
            return d(se, {
              name: "promptConnectedChatTriggerNode",
              title: "Prompt (User message)",
              placeholder: "{{ $json.chatInput }}",
              get uniqueKey() {
                return m();
              },
              isArrow: !0,
              isExpand: !0,
              get value() {
                return p().promptConnectedChatTriggerNode;
              },
              onInput: (f) => {
                o(`prompt${E()}`, f);
              },
            });
          },
        }),
        null
      ),
      a(
        x,
        d(te, {
          get when() {
            return v() !== "SQL Agent";
          },
          get children() {
            var f = Uc();
            return (
              a(
                f,
                d(_e, {
                  checked: !0,
                  get uniqueKey() {
                    return m();
                  },
                  title: "Require Specific Output Format",
                  name: "requireSpecificOutputFormat",
                })
              ),
              f
            );
          },
        }),
        g
      ),
      a(
        C,
        d(ae, {
          get each() {
            return r();
          },
          children: (f) => {
            if (f.content.type === "textArea")
              return (() => {
                var P = qo(),
                  V = P.firstChild,
                  R = V.nextSibling;
                return (
                  (V.$$click = () => {
                    const H = r().filter((J) => J.value !== f.value);
                    l(H), c([...i(), f]), u(f.value);
                  }),
                  a(V, d(pe, {})),
                  a(
                    R,
                    d(We, {
                      get name() {
                        return f.content.name;
                      },
                      get value() {
                        return f.content.value;
                      },
                      get title() {
                        return f.content.title ?? "";
                      },
                      get toolTipText() {
                        return f.content.toolTipText;
                      },
                      onInput: (H) => {
                        o(f.content.name, H);
                      },
                    })
                  ),
                  P
                );
              })();
            if (f.content.type === "input")
              return (() => {
                var P = Xc(),
                  V = P.firstChild,
                  R = V.nextSibling;
                return (
                  (V.$$click = () => {
                    const H = r().filter((J) => J.value !== f.value);
                    l(H), c([...i(), f]), u(f.value);
                  }),
                  a(V, d(pe, {})),
                  a(
                    R,
                    d(se, {
                      get name() {
                        return f.content.name;
                      },
                      get uniqueKey() {
                        return m();
                      },
                      get value() {
                        return f.content.value;
                      },
                      get title() {
                        return f.content.title ?? "";
                      },
                      get toolTipText() {
                        return f.content.toolTipText;
                      },
                      onInput: (H) => {
                        o(f.content.name, H);
                      },
                    })
                  ),
                  P
                );
              })();
            if (f.content.type === "switch")
              return (() => {
                var P = qo(),
                  V = P.firstChild,
                  R = V.nextSibling;
                return (
                  (V.$$click = () => {
                    const H = r().filter((J) => J.value !== f.value);
                    l(H), c([...i(), f]), u(f.value);
                  }),
                  a(V, d(pe, {})),
                  a(
                    R,
                    d(_e, {
                      get uniqueKey() {
                        return m();
                      },
                      get checked() {
                        return p()[f.content.name];
                      },
                      get name() {
                        return f.content.name;
                      },
                      get title() {
                        return f.content.title ?? "";
                      },
                      get toolTipText() {
                        return f.content.toolTipText;
                      },
                      onChange: (H) => {
                        o(f.content.name, H);
                      },
                    })
                  ),
                  P
                );
              })();
          },
        })
      ),
      a(
        $,
        d(Me, {
          name: "Ai Agent Options",
          placeholder: "Add Option",
          dropdownOptions: i,
          selectedOptions: r,
          setSelectedOptions: l,
          setDropdownOptions: c,
          onChange: (f) => {
            l(f);
          },
        })
      ),
      W(() => L(I, `${S() ? "mt-5" : "mt-1"}`)),
      b
    );
  })();
};
ge(["click"]);
const Jc = [
    { label: "deepseek-r1:r1.5b", value: "deepseek-r1:r1.5b" },
    { label: "llma 3.2:1b", value: "llma 3.2:1b" },
    { label: "llma 3.2:1b", value: "llma 3.2:1b" },
    { label: "phi4:latest", value: "phi4:latest" },
  ],
  En = [
    {
      label: "Sampling Temperature",
      value: "temperature",
      content: {
        type: "dynamicInput",
        title: "Sampling Temperature",
        name: "temperature",
        value: ".7",
        toolTipText:
          "Controls the randomness of the generated text. Lower values make the output more focused and deterministic, while higher values make it more diverse and random.",
      },
    },
    {
      label: "Top K",
      value: "topK",
      content: {
        type: "dynamicInput",
        title: "Top K",
        name: "topK",
        value: "-1.0",
        toolTipText:
          "Limits the number of highest probability vocabulary tokens to consider at each step. A higher value increases diversity but may reduce coherence. Set to -1 to disable.",
      },
    },
    {
      label: "Top P",
      value: "topP",
      content: {
        type: "dynamicInput",
        title: "Top P",
        name: "topP",
        value: "1.0",
        toolTipText:
          "Chooses from the smallest possible set of tokens whose cumulative probability exceeds the probability top_p. Helps generate more human-like text by reducing repetitions.",
      },
    },
    {
      label: "Frequency Penalty",
      value: "frequencyPenalty",
      content: {
        type: "dynamicInput",
        title: "Frequency Penalty",
        name: "frequencyPenalty",
        value: "0",
        toolTipText:
          "Adjusts the penalty for tokens that have already appeared in the generated text. Higher values discourage repetition.",
      },
    },
    {
      label: "Keep Alive",
      value: "keepAlive",
      content: {
        type: "dynamicInput",
        title: "Keep Alive",
        name: "keepAlive",
        value: "5m",
        toolTipText:
          "Specifies the duration to keep the loaded model in memory after use. Useful for frequently used models. Format: 1h30m (1 hour 30 minutes).",
      },
    },
    {
      label: "Low VRAM Mode",
      value: "lowVram",
      content: {
        type: "switch",
        title: "Low VRAM Mode",
        name: "lowVram",
        toolTipText:
          "Whether to Activate low VRAM mode, which reduces memory usage at the cost of slower generation speed. Useful for GPUs with limited memory.",
      },
    },
    {
      label: "Main GPU ID",
      value: "mainGpu",
      content: {
        type: "dynamicInput",
        title: "Main GPU ID",
        name: "mainGpu",
        value: "1",
        toolTipText:
          "Specifies the ID of the GPU to use for the main computation. Only change this if you have multiple GPUs.",
      },
    },
    {
      label: "Context Batch Size",
      value: "numBatch",
      content: {
        type: "dynamicInput",
        title: "Context Batch Size",
        name: "numBatch",
        value: "512",
        toolTipText:
          "Specifies the number of GPUs to use for parallel processing. Set to -1 for auto-detection.",
      },
    },
    {
      label: "Context Length",
      value: "numCtx",
      content: {
        type: "dynamicInput",
        title: "Context Length",
        name: "numCtx",
        value: "2048",
        toolTipText:
          "The maximum number of tokens to use as context for generating the next token. Smaller values reduce memory usage, while larger values provide more context to the model.",
      },
    },
    {
      label: "Number of GPUs",
      value: "numGpus",
      content: {
        type: "dynamicInput",
        title: "Number of GPUs",
        name: "numGpus",
        value: "-1",
        toolTipText:
          "Specifies the number of GPUs to use for parallel processing. Set to -1 for auto-detection.",
      },
    },
    {
      label: "Max Tokens to Generate",
      value: "maxTokensToGenerate",
      content: {
        type: "dynamicInput",
        title: "Max Tokens to Generate",
        name: "maxTokensToGenerate",
        value: "-1",
        toolTipText:
          "The maximum number of tokens to generate. Set to -1 for no limit. Be cautious when setting this to a large value, as it can lead to very long outputs.",
      },
    },
    {
      label: "Number of CPU Threads",
      value: "numThread",
      content: {
        type: "dynamicInput",
        title: "Number of CPU Threads",
        name: "numThread",
        value: "0",
        toolTipText:
          "Specifies the number of CPU threads to use for processing. Set to 0 for auto-detection.",
      },
    },
    {
      label: "Penalize Newlines",
      value: "penalizeNewline",
      content: {
        type: "switch",
        title: "Penalize Newlines",
        name: "penalizeNewline",
        toolTipText:
          "Whether to lock the model in memory to prevent swapping. This can improve performance but requires sufficient available memory.",
      },
    },
    {
      label: "Presence Penalty",
      value: "presencePenalty",
      content: {
        type: "dynamicInput",
        title: "Presence Penalty",
        name: "presencePenalty",
        value: "0",
        toolTipText:
          "Adjusts the penalty for tokens based on their presence in the generated text so far. Positive values penalize tokens that have already appeared, encouraging diversity.",
      },
    },
    {
      label: "Repetition Penalty",
      value: "repeatPenalty",
      content: {
        type: "dynamicInput",
        title: "Repetition Penalty",
        name: "repeatPenalty",
        value: "1",
        toolTipText:
          "Adjusts the penalty factor for repeated tokens. Higher values more strongly discourage repetition. Set to 1.0 to disable repetition penalty.",
      },
    },
    {
      label: "Use Memory Locking",
      value: "useMLock",
      content: {
        type: "switch",
        title: "Use Memory Locking",
        name: "useMLock",
        toolTipText:
          "Whether to lock the model in memory to prevent swapping. This can improve performance but requires sufficient available memory.",
      },
    },
    {
      label: "Use Memory Mapping",
      value: "useMMap",
      content: {
        type: "switch",
        title: "Use Memory Mapping",
        name: "useMMap",
        toolTipText:
          "Whether to use memory mapping for loading the model. This can reduce memory usage but may impact performance. Recommended to keep enabled.",
      },
    },
    {
      label: "Load Vocabulary Only",
      value: "vocabOnly",
      content: {
        type: "switch",
        title: "Load Vocabulary Only",
        name: "vocabOnly",
        toolTipText:
          "Whether to only load the model vocabulary without the weights. Useful for quickly testing tokenization.",
      },
    },
    {
      label: "Output Format",
      value: "format",
      content: {
        type: "dropdownN",
        title: "Output Format",
        name: "format",
        options: [
          { label: "JSON", value: "JSON" },
          { label: "Default", value: "Default" },
        ],
        toolTipText:
          "Controls the randomness of the generated text. Lower values make the output more focused and deterministic, while higher values make it more diverse and random.",
      },
    },
  ],
  nn = (e, t) => {
    const { nodes: n } = ie(),
      s = (o, i) =>
        o.reduce(
          (c, p) => (
            p in e && (i.includes(p) ? (c[p] = !!e[p]) : (c[p] = e[p])), c
          ),
          {}
        ),
      r = () =>
        s(
          [
            "temperature",
            "topK",
            "topP",
            "frequencyPenalty",
            "keepAlive",
            "lowVram",
            "mainGpu",
            "numBatch",
            "numCtx",
            "numGpu",
            "numThread",
            "penalizeNewline",
            "presencePenalty",
            "repeatPenalty",
            "useMLock",
            "useMMap",
            "vocabOnly",
            "format",
          ],
          ["penalizeNewline", "vocabOnly", "useMMap", "useMLock", "lowVram"]
        ),
      l = () => {
        const o = n().find((i) => i.id === t);
        if (o)
          return {
            x: Math.trunc(o.currPosition.get().x),
            y: Math.trunc(o.currPosition.get().y),
          };
      };
    return {
      id: t,
      name: "Ollama Chat Model",
      description: "Ollama Chat Model",
      type: "Ollama",
      parameters: {
        credentials: {
          id: "d0rvblltcbtlha4jl3n0",
          name: "Ollama account",
          provider: "ollama",
          ctype: "url",
        },
        model: e?.model || "",
        options: r(),
      },
      position: l(),
      inputs: [
        {
          id: "output",
          name: "ollma_output",
          description: "ollama output port",
          type: "object",
        },
      ],
      outputs: [],
    };
  },
  Qc = (e) => {
    if (e) {
      const { parameters: t } = e;
      return { model: t?.model, options: t?.options };
    }
  };
function Zc() {
  const { formData: e, setFormData: t, currentFormConfig: n } = ie(),
    [s, r] = k([]),
    [l, o] = k([]),
    [i, c] = k({}),
    [p, u] = k({}),
    [m, v] = k(""),
    _ = new Set(),
    E = () => {
      o(En), r([]), c({}), u({});
    },
    w = (S, h) => {
      if (
        (console.log("from data handler raw >>>> ", S, " >>>>> ", h),
        console.log("before check: previous data from dataHandler", p()),
        S in p())
      ) {
        if (p()[S] === h) {
          console.log(
            "from data handler:::: >> previous Data,>>> data unchanged, key unchanged",
            i()
          ),
            c((b) => ({ ...b, [S]: h })),
            console.log(
              "from data handler:::: >> submitted data from previous data >>> data unchanged, key unchanged",
              i()
            );
          return;
        } else if (p()[S] !== h) {
          console.log(
            "from data handler, 2,>>> key unchanged but data changed",
            p()
          ),
            console.log(
              "from data handler:::: >> submitted data 1 >>> key unchanged but data changed",
              i()
            ),
            c((x) => ({ ...x, [S]: h })),
            console.log(
              "from data handler:::: >> submitted data 2 >>> key unchanged but data changed",
              i()
            );
          const b = nn(i(), n().id);
          console.log(
            "from data handler:::: >> formatted key >>>  unchanged but data changed",
            b
          ),
            t({ ...e(), [n().id]: b }),
            console.log(
              "from data handler:::: >> formData() >>> key unchanged but data changed",
              e()
            );
        }
      } else {
        console.log("from data handler, 2 >>> both key and data changed", p()),
          console.log(
            "from data handler:::: >> submitted data 1  >>> both key and data changed",
            i()
          ),
          c((x) => ({ ...x, [S]: h })),
          console.log(
            "from data handler:::: >> submitted data 2 >>> both key and data changed",
            i()
          );
        const b = nn(i(), n().id);
        console.log(
          "from data handler:::: >> formatted >>> both key and data changed",
          b
        ),
          t({ ...e(), [n().id]: b }),
          console.log(
            "from data handler:::: >> formData() >>> both key and data changed",
            e()
          );
      }
    },
    D = (S) => {
      console.log("from data remover raw >>>> ", S, " >>>>>> "),
        c((b) =>
          Object.entries(b).reduce(
            (x, [I, A]) => (I.includes(S) || (x[I] = A), x),
            {}
          )
        ),
        console.log(" from data remover >>>> previous data", i());
      const h = nn(i(), n().id);
      console.log("from data remover >>>>> formattedPrev", h),
        t({ ...e(), [n().id]: h }),
        console.log("from data remover >>> form data", e());
    },
    T = (S, h, b) => {
      console.log(S, "not ok");
      const x = S.flatMap((I) => h.filter((A) => A.value === I));
      console.log(x, "ok"), b((I) => [...I, ...x]);
    };
  return (
    be(() => {
      if (
        (console.log(
          n().id,
          "  >  node data  >  ",
          `
`,
          s()
        ),
        console.log(">>>>>>.>>>>>>>>>>>>>>>>>.>>>>>>>>>>>>>>>>>>>>>>>>>"),
        console.log(p(), "from outside"),
        !_.has(n().id))
      ) {
        _.clear(), _.add(n().id), v(n().id);
        const S = e()[n().id];
        if ((console.log("data1", S), E(), !S)) return;
        console.log("data2", S);
        const h = Qc(S);
        h &&
          (console.log(
            "decoded from observer, >>>>>> ",
            n().id,
            h.model,
            h.options
          ),
          u((b) => ({ ...b, model: h.model, ...h.options })),
          console.log(p(), "from inside"),
          console.log(h.options, "from inside createEffect"),
          T(Object.keys(h.options), En, r),
          o(() => En.filter((b) => s().every((x) => x.value !== b.value))));
      }
    }),
    {
      selectedOptions: s,
      setSelectedOptions: r,
      submittedData: i,
      dataInsertHandler: w,
      options: l,
      setOptions: o,
      previousData: p,
      setPreviousData: u,
      setSubmittedData: c,
      dataRemoveHandler: D,
      uniqueKey: m,
    }
  );
}
var eu = O(
    '<form class=form id=ollama-chatForm><div><div class=space-y-5><div></div><div></div><div><div class="label hr-solid-line">Options</div><div class="space-y-6 mt-5"></div></div><div class=mt-5>'
  ),
  On = O(
    '<div class="group flex items-start gap-1.5 w-full"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100">'
  );
const tu = (e) => {
  const { currentFormConfig: t, formData: n, setFormData: s } = ie(),
    {
      selectedOptions: r,
      setSelectedOptions: l,
      dataInsertHandler: o,
      options: i,
      setOptions: c,
      previousData: p,
      dataRemoveHandler: u,
      uniqueKey: m,
    } = Zc(),
    v = (_) => {
      _.preventDefault();
      const E = new FormData(_.target);
      let w = Object.fromEntries(E.entries());
      const D = nn(w, t().id);
      s({ ...n(), [t().id]: D });
      const T = new CustomEvent("formSubmitEvent", { detail: w, bubbles: !0 }),
        S = document.getElementById("submitBtn");
      S && S.dispatchEvent(T);
    };
  return (() => {
    var _ = eu(),
      E = _.firstChild,
      w = E.firstChild,
      D = w.firstChild,
      T = D.nextSibling,
      S = T.nextSibling,
      h = S.firstChild,
      b = h.nextSibling,
      x = S.nextSibling;
    return (
      _.addEventListener("submit", v),
      a(
        D,
        d(et, { name: "credential_ollama", placeholder: "Select a Credential" })
      ),
      a(
        T,
        d(we, {
          name: "model",
          title: "Model",
          get uniqueKey() {
            return m();
          },
          get defaultValue() {
            return p().model;
          },
          options: Jc,
          onChange: (I) => {
            o("model", I.value);
          },
        })
      ),
      a(
        b,
        d(ae, {
          get each() {
            return r();
          },
          children: (I, A) => {
            if (I.content.type === "switch")
              return (() => {
                var y = On(),
                  g = y.firstChild;
                return (
                  (g.$$click = () => {
                    const N = r().filter((C) => C.value !== I.value);
                    l(N), c([...i(), I]), u(I.value);
                  }),
                  a(g, d(pe, {})),
                  a(
                    y,
                    d(_e, {
                      get uniqueKey() {
                        return m();
                      },
                      get checked() {
                        return p()[I.content.name];
                      },
                      get name() {
                        return I.content.name;
                      },
                      get title() {
                        return I.content.title ?? "";
                      },
                      get toolTipText() {
                        return I.content.toolTipText;
                      },
                      onChange: (N) => {
                        o(I.content.name, N);
                      },
                    }),
                    null
                  ),
                  y
                );
              })();
            if (I.content.type === "dynamicInput")
              return (() => {
                var y = On(),
                  g = y.firstChild;
                return (
                  (g.$$click = () => {
                    const N = r().filter((C) => C.value !== I.value);
                    l(N), c([...i(), I]), u(I.value);
                  }),
                  a(g, d(pe, {})),
                  a(
                    y,
                    d(se, {
                      get name() {
                        return I.content.name;
                      },
                      get uniqueKey() {
                        return m();
                      },
                      get value() {
                        return p()[I.content.name] || I.content.value;
                      },
                      get title() {
                        return I.content.title;
                      },
                      get toolTipText() {
                        return I.content.toolTipText;
                      },
                      isArrow: !0,
                      get footNote() {
                        return I.content.footNote;
                      },
                      get placeholder() {
                        return I.content.placeholder ?? "";
                      },
                      onInput: (N) => {
                        o(I.content.name, N);
                      },
                    }),
                    null
                  ),
                  y
                );
              })();
            if (I.content.type === "dropdownN")
              return (() => {
                var y = On(),
                  g = y.firstChild;
                return (
                  (g.$$click = () => {
                    const N = r().filter((C) => C.value !== I.value);
                    l(N), c([...i(), I]), u(I.value);
                  }),
                  a(g, d(pe, {})),
                  a(
                    y,
                    d(we, {
                      get name() {
                        return I.content.name;
                      },
                      get uniqueKey() {
                        return m();
                      },
                      get title() {
                        return I.content.title;
                      },
                      get defaultValue() {
                        return (
                          (p()[I.content.name] ||
                            I.content.options?.[0]?.value) ??
                          ""
                        );
                      },
                      get options() {
                        return I.content.options ?? [];
                      },
                      get toolTipText() {
                        return I.content.toolTipText;
                      },
                      get footNote() {
                        return I.content.footNote;
                      },
                      onChange: (N) => {
                        o(I.content.name, N.value);
                      },
                    }),
                    null
                  ),
                  y
                );
              })();
          },
        })
      ),
      a(
        x,
        d(Me, {
          name: "Add Option",
          placeholder: "Add Option",
          selectedOptions: r,
          setSelectedOptions: l,
          dropdownOptions: i,
          setDropdownOptions: c,
          onChange: (I) => {
            l(I);
          },
        })
      ),
      _
    );
  })();
};
ge(["click"]);
const nu = [
    {
      label: "Message Button Label",
      value: "messageButtonLabel",
      content: {
        type: "dynamicInput",
        name: "messageButtonLabel",
        title: "Message Button Label",
        value: "Respond",
      },
    },
    {
      label: "Response From Title",
      value: "responseFromTitle",
      content: {
        type: "dynamicInput",
        name: "responseFromTitle",
        title: "Response From Title",
        toolTipText:
          "Title of the form that the user can access to provide their response.",
      },
    },
    {
      label: "Response From Description",
      value: "responseFromDescription",
      content: {
        type: "dynamicInput",
        name: "responseFromDescription",
        title: "Response From Description",
        toolTipText:
          "Description of the form that the user can access to provide their response",
      },
    },
    {
      label: "Response Form Button Label",
      value: "responseFormButtonLabel",
      content: {
        type: "dynamicInput",
        name: "responseFormButtonLabel",
        title: "Response Form Button Label",
        value: "Submit",
      },
    },
    {
      label: "Limit Wait Time",
      value: "limitWaitTime",
      content: {
        type: "reproductiveDropDown",
        name: "limitWaitTime",
        title: "Limit Wait Time",
        options: [
          {
            label: "After Time Interval",
            value: "afterTimeInterval",
            description: "Waits for a certain amount of time.",
          },
          {
            label: "At Specified Time",
            value: "atSpecifiedTime",
            description: "Waits until the set date and time to continue",
          },
        ],
        toolTipText:
          "Sets the condition for the execution to resume. Can be a specified date or after some time.",
      },
    },
  ],
  Dn = [
    {
      value: "Text",
      label: "Text",
      description: "Send Email as Plain Text",
      children: [
        {
          type: "textArea",
          title: "Text",
          toolTipText: "Plain text message of email",
        },
      ],
    },
    {
      value: "HTML",
      label: "HTML",
      description: "Send Email as HTML",
      children: [
        {
          type: "textArea",
          title: "HTML",
          toolTipText: "HTML text message of email",
        },
      ],
    },
    {
      value: "Both",
      label: "Both",
      description:
        "Send both formats, recipient's client select version to display",
      children: [
        {
          type: "textArea",
          title: "Text",
          toolTipText: "Plain text message of email",
        },
        {
          type: "textArea",
          title: "HTML",
          toolTipText: "HTML text message of email",
        },
      ],
    },
  ],
  Ho = [
    {
      label: "Append n8n Attribution",
      value: "appendAttribution",
      content: {
        type: "switch",
        name: "appendAttribution",
        title: "Append n8n Attribution",
        toolTipText:
          "Whether to include the phrase “This email was sent automatically with n8n” to the end of the email",
      },
    },
    {
      label: "Attachments",
      value: "attachments",
      content: {
        type: "dynamicInput",
        name: "attachments",
        title: "Attachments",
        toolTipText:
          'Name of the binary properties that contain data to add to email as attachment. Multiple ones can be comma-separated. Reference embedded images or other content within the body of an email message, e.g. <img src="cid:image_1">',
      },
    },
    {
      label: "CC Email",
      value: "ccEmail",
      content: {
        type: "dynamicInput",
        name: "ccEmail",
        title: "CC Email",
        value: "cc@example.com",
        toolTipText: "Email address of CC recipient",
      },
    },
    {
      label: "BCC Email",
      value: "bccEmail",
      content: {
        type: "dynamicInput",
        name: "bccEmail",
        title: "BCC Email",
        value: "cc@example.com",
        toolTipText: "Email address of BCC recipient",
      },
    },
    {
      label: "Ignore SSL Issues (Insecure)",
      value: "ignoreSSL",
      content: {
        type: "switch",
        name: "ignoreSSL",
        title: "Ignore SSL Issues (Insecure)",
        toolTipText:
          "Whether to connect even if SSL certificate validation is not possible",
      },
    },
    {
      label: "Reply To",
      value: "replyTo",
      content: {
        type: "dynamicInput",
        name: "replyTo",
        title: "Reply To",
        toolTipText: "The email address to send the reply to",
      },
    },
  ],
  $t = [
    { value: "approvedOnly", label: "Approved Only" },
    { value: "approvedAndDisapproved", label: "Approved and Disapproved" },
  ],
  _t = [
    {
      label: "After Time Interval",
      value: "afterTimeInterval",
      description: "Waits for a certain amount of time.",
    },
    {
      label: "At Specified Time",
      value: "atSpecifiedTime",
      description: "Waits until the set date and time to continue",
    },
  ],
  Nn = [
    {
      value: "Approval",
      label: "Approval",
      description: "User can approve/disapprove from within the message",
    },
    {
      value: "freeText",
      label: "Free Text",
      description: "User can submit a response via a form.",
    },
    {
      label: "Custom Form",
      value: "customForm",
      description: "User can submit a response via a form.",
    },
  ],
  kn = [
    { label: "Using Field Below", value: "usingFieldBelow" },
    { label: "Using JSON", value: "usingJSON" },
  ],
  Pn = [
    { value: "Send", label: "Send" },
    { value: "sendAndWaitForResponse", label: "Send and Wait for Response" },
  ],
  Xe = {
    type: "dynamicInput",
    title: "Field Name",
    toolTipText: "Label that appears above the input field.",
    placeholder: "e.g. What is your name?",
  },
  Ye = {
    type: "switch",
    title: "Required Field",
    toolTipText:
      "Whether to require the user to enter a value for this field before submitting the form",
  },
  Tt = {
    type: "dynamicInput",
    title: "Placeholder",
    toolTipText: "Sample text to display inside the field.",
  },
  jo = [
    { value: "text", label: "Text", children: [Xe, Ye, Tt] },
    {
      value: "customHTML",
      label: "Custom HTML",
      children: [
        {
          type: "dynamicInput",
          title: "Element Name",
          toolTipText:
            "Optional field. It can be used to include the html in the output.",
          placeholder: "e.g. content section",
        },
        {
          type: "jsonEditor",
          title: "HTML",
          toolTipText: "HTML elements to display on the form page",
          footNote: "Does not accept <script>, <style> or <input> tags",
        },
      ],
    },
    {
      value: "date",
      label: "Date",
      children: [
        Xe,
        {
          type: "textBlock",
          placeholder:
            "The displayed date is formatted based on the locale of the user's browser",
        },
        Ye,
      ],
    },
    {
      value: "dropDownList",
      label: "DropDown List",
      children: [
        {
          type: "inputBlock",
          title: "Field Options",
          name: "fieldOption",
          placeholder: "Add Field Option",
        },
        {
          type: "switch",
          title: "Multiple Choice",
          toolTipText:
            "Whether to allow the user to select multiple options from the dropdown list.",
        },
        Ye,
        Xe,
      ],
    },
    { value: "email", label: "Email", children: [Xe, Ye, Tt] },
    {
      value: "file",
      label: "File",
      children: [
        Xe,
        Ye,
        {
          type: "switch",
          title: "Multiple Files",
          toolTipText:
            "Whether to allow the user to select multiple files from the file input or just one",
        },
        {
          type: "dynamicInput",
          title: "Accepted File Types",
          toolTipText: "Comma-separated list of allowed file extensions",
          footNote: "Leave empty to allow all file types",
        },
      ],
    },
    {
      value: "hiddenField",
      label: "Hidden Field",
      children: [
        {
          type: "dynamicInput",
          title: "Field Name",
          toolTipText:
            "The name of the field, used in input attributes and referenced by the workflow",
        },
        {
          type: "dynamicInput",
          title: "Field Value",
          toolTipText:
            "Input value can be set here or will be passed as a query parameter via Field Name if no value is set",
        },
      ],
    },
    { value: "number", label: "Number", children: [Xe, Ye, Tt] },
    { value: "password", label: "Password", children: [Xe, Ye, Tt] },
    { value: "textArea", label: "Textarea", children: [Xe, Ye, Tt] },
  ];
var ou = O("<button type=button>");
const hn = ({ title: e, width: t = "w-auto", onClick: n }) =>
  (() => {
    var s = ou();
    return (
      Ae(s, "click", n),
      L(
        s,
        `bg-[#2A2A40] border ${t} border-gray-600/50 text-white hover:bg-[#353555] hover:text-white py-1.5 px-2.5 cursor-pointer rounded-md`
      ),
      a(s, e),
      s
    );
  })();
ge(["click"]);
var Un = ((e) => (
    (e.Text = "text"),
    (e.Number = "number"),
    (e.Password = "password"),
    (e.Email = "email"),
    (e.Url = "url"),
    e
  ))(Un || {}),
  ru = O(
    '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg baseProfile=tiny version=1.2 viewBox="0 0 24 24"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="M17.707 8.293a.999.999 0 1 0-1.414 1.414L17.586 11H13V6.414l1.293 1.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L12 2.586 8.293 6.293a.999.999 0 1 0 1.414 1.414L11 6.414V11H6.414l1.293-1.293a.999.999 0 1 0-1.414-1.414L2.586 12l3.707 3.707a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L6.414 13H11v4.586l-1.293-1.293a.999.999 0 1 0-1.414 1.414L12 21.414l3.707-3.707a.999.999 0 1 0-1.414-1.414L13 17.586V13h4.586l-1.293 1.293a.999.999 0 1 0 1.414 1.414L21.414 12l-3.707-3.707z">'
  );
const xt = (e) => ru();
var lu = O(
    '<div><div class="flex font-mono rounded bg-[#252631] min-h-[200px] max-h-[220px] "><div class="w-12 bg-[#1a1b26] border-r border-neutral-600 text-gray-400 text-sm leading-6 px-2 py-4 text-right select-none overflow-hidden">1</div><div class="flex-1 relative"><textarea autocomplete=off>'
  ),
  iu = O("<label class=label>"),
  au = O("<div class=toolTipBtn>"),
  su = O(
    '<div class="mb-2 p-2 bg-red-900/20 border border-red-500/30 rounded text-red-400 text-sm"><span class=font-semibold>Line <!>:</span> '
  ),
  du = O('<button type=button aria-label="Toggle expanded view">'),
  cu = O("<p class=foot-note>");
const Bt = (e) => {
  const { setIsModalOpen3: t } = ie();
  let n, s, r;
  const [l, o] = k(null),
    i = (w) => {
      if (!w.trim()) return o(null), null;
      try {
        return JSON.parse(w), o(null), null;
      } catch (D) {
        const T = D instanceof Error ? D.message : "Invalid JSON",
          S = T.match(/line (\d+)/i) || T.match(/position (\d+)/i);
        let h = 1;
        if (S) {
          const x = parseInt(S[1]);
          h = (w.substring(0, x).match(/\n/g) || []).length + 1;
        }
        const b = { line: h, message: T };
        return o(b), b;
      }
    },
    c = (w) => {
      try {
        const D = JSON.parse(w);
        return JSON.stringify(D, null, 2);
      } catch {
        return w;
      }
    },
    p = (w) => {
      const D = w.split(`
`);
      if (r) {
        const T = D.map((S, h) => `${h + 1}`).join(`
`);
        r.textContent = T;
      }
    },
    u = (w) => {
      const T = w.target.value;
      p(T), i(T), e.onInput?.(T);
    },
    m = (w) => {
      w.preventDefault();
      const D = w.clipboardData?.getData("text") || "";
      if (D.trim())
        try {
          const T = c(D);
          n && ((n.value = T), p(T), i(T), e.onInput?.(T));
        } catch {
          n && ((n.value = D), p(D), i(D), e.onInput?.(D));
        }
    },
    v = () => {
      n && r && (r.scrollTop = n.scrollTop);
    },
    _ = () => {
      e.disabled;
    },
    E = (w) => {
      setTimeout(() => v(), 0);
    };
  return (
    be(() => {
      e.value && (p(e.value), i(e.value));
    }),
    (() => {
      var w = lu(),
        D = w.firstChild,
        T = D.firstChild,
        S = T.nextSibling,
        h = S.firstChild,
        b = s;
      typeof b == "function" ? ye(b, w) : (s = w),
        a(
          w,
          (() => {
            var A = oe(() => !!e.title);
            return () =>
              A() &&
              (() => {
                var y = iu();
                return (
                  a(y, () => e.title, null),
                  a(
                    y,
                    (() => {
                      var g = oe(() => !!e.toolTipText);
                      return () =>
                        g() &&
                        (() => {
                          var N = au();
                          return (
                            a(
                              N,
                              d(Re, {
                                get content() {
                                  return e.toolTipText;
                                },
                              })
                            ),
                            N
                          );
                        })();
                    })(),
                    null
                  ),
                  W(() => le(y, "for", e.name)),
                  y
                );
              })();
          })(),
          D
        ),
        a(
          w,
          (() => {
            var A = oe(() => !!l());
            return () =>
              A() &&
              (() => {
                var y = su(),
                  g = y.firstChild,
                  N = g.firstChild,
                  C = N.nextSibling;
                return (
                  C.nextSibling,
                  g.nextSibling,
                  a(g, () => l()?.line, C),
                  a(y, () => l()?.message, null),
                  y
                );
              })();
          })(),
          D
        );
      var x = r;
      typeof x == "function" ? ye(x, T) : (r = T),
        T.style.setProperty(
          "font-family",
          "Monaco, Menlo, 'Ubuntu Mono', monospace"
        ),
        T.style.setProperty("white-space", "pre-line"),
        T.style.setProperty("pointer-events", "none"),
        (h.$$keydown = E),
        h.addEventListener("focus", _),
        h.addEventListener("scroll", v),
        h.addEventListener("paste", m),
        (h.$$input = u);
      var I = n;
      return (
        typeof I == "function" ? ye(I, h) : (n = h),
        a(
          S,
          (() => {
            var A = oe(() => !!e.isArrow);
            return () =>
              A() &&
              (() => {
                var y = du();
                return (
                  (y.$$click = () => t(!0)),
                  a(y, d(Kl, {})),
                  W(
                    (g) => {
                      var N = e.disabled,
                        C = `absolute right-0 bottom-0 text-gray-400 text-[10px] bg-[#2c2e2f] hover:text-white opacity-0 group-hover:opacity-100 transition-colors rounded-br-[3px] rounded-bl-none rounded-tr-none rounded-tl-[6px] border border-[#4b4747] p-1 ${
                          e.disabled
                            ? "cursor-not-allowed opacity-50"
                            : "cursor-pointer"
                        }`;
                      return (
                        N !== g.e && (y.disabled = g.e = N),
                        C !== g.t && L(y, (g.t = C)),
                        g
                      );
                    },
                    { e: void 0, t: void 0 }
                  ),
                  y
                );
              })();
          })(),
          null
        ),
        a(
          w,
          (() => {
            var A = oe(() => !!e.footNote);
            return () =>
              A() &&
              (() => {
                var y = cu();
                return a(y, () => e.footNote), y;
              })();
          })(),
          null
        ),
        W(
          (A) => {
            var y = `relative h-full w-full group ${e.class || ""}`,
              g = e.name,
              N = e.disabled,
              C = e.placeholder || "",
              $ = `${
                e.disabled ? "opacity-50 cursor-not-allowed" : ""
              } w-full h-full min-h-[200px] max-h-[220px] bg-transparent jsonMain text-white placeholder-gray-500 outline-none transition-colors resize-none px-4 py-4 leading-6`;
            return (
              y !== A.e && L(w, (A.e = y)),
              g !== A.t && le(h, "name", (A.t = g)),
              N !== A.a && (h.disabled = A.a = N),
              C !== A.o && le(h, "placeholder", (A.o = C)),
              $ !== A.i && L(h, (A.i = $)),
              A
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
        ),
        W(() => (h.value = e.value || "")),
        w
      );
    })()
  );
};
ge(["input", "keydown", "click"]);
const uu = (e, t) => ({
  id: "sendEmail1",
  name: "Send Email",
  description: "Send an SMTP protocol email",
  type: "SendEmail",
  disabled: !0,
  parameters: {
    credentials: {
      id: "d0esgqltcbthv6156tjg",
      name: "SMTP account",
      provider: "email",
      ctype: "smtp",
    },
    fromEmail: e?.fromEmail,
    toEmail: e?.toEmail,
    subject: e?.subject,
    emailFormat: e?.emailFormat,
    text: e?.emailFormat,
    options: {
      appendAttribution: e?.appendAttribution,
      attachments: e?.attachments,
      ccEmail: e?.ccEmail,
      bccEmail: e?.bccEmail,
      allowUnauthorizedCerts: !0,
      replyTo: e?.replyTo,
    },
  },
  position: { x: -14960, y: -240 },
  inputs: [
    {
      id: "input",
      name: "Input",
      description: "SendEmail input port",
      type: "object",
    },
  ],
  outputs: [],
});
var zo = O('<div class="mt-5 space-y-5">'),
  pu = O(
    '<div><div class="label hr-solid-line">Options</div><div class="mt-5 space-y-5"></div><div class=mt-5>'
  ),
  Wo = O(
    '<div class="group flex items-start gap-1.5 w-full mt-5"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"></div><div class="flex-1 space-y-5">'
  ),
  mu = O(
    '<div><div class="label hr-solid-line">Approval Options</div><div></div><div class=space-y-5>'
  ),
  Ko = O(
    '<div class="group flex items-start gap-1.5 w-full mt-5"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"></div><div class="flex-1 space-y-5"><div class=space-y-5>'
  ),
  gu = O(
    '<div><div class="label hr-solid-line">Options</div><div></div><div class=space-y-5>'
  ),
  An = O('<div class="space-y-5 mt-5">'),
  hu = O('<div class="label hr-solid-line">Form Elements'),
  fu = O("<div class=space-y-5>"),
  vu = O('<div><div class="label hr-solid-line">Options'),
  bu = O("<form id=send-emailForm><div class=space-y-5><div class=space-y-5>"),
  Ct = O(
    '<div class="mt-5 text-[#9c9c9e] text-center text-sm border border-[#9c9c9e] p-4 rounded-md border-dashed">Currently no items exist'
  ),
  Uo = O(
    '<div class="group flex items-start gap-1.5 w-full"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"></div><div class=flex-1>'
  ),
  xu = O('<div class="space-y-4 mt-5">'),
  yu = O(
    '<div><div class="flex flex-col items-center gap-1 mt-7"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-grab active:cursor-grabbing bg-[#36373d] p-1 rounded-md"title="Drag to move"></div><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] p-1 rounded-md"></div><div class="w-0.5 h-full bg-[#36373d] rounded-md"></div></div><div class="flex flex-col gap-1.5 w-full">'
  ),
  wu = O(
    '<div class=space-y-4><div class="label hr-solid-line">Field Options</div><div class="space-y-4 mt-4 w-full">'
  ),
  $u = O(
    '<div><div class="flex flex-col items-center gap-1 mt-7"><div class="text-xs text-[#6f6f70] hover:text-[#ff6f5c] cursor-grab active:cursor-grabbing bg-[#36373d] p-0.5 rounded-sm"title="Drag to move"></div><div class="text-xs text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] p-0.5 rounded-sm"></div></div><div class="flex flex-col gap-1.5 w-full">'
  );
const _u = (e) => {
  const { currentFormConfig: t, formData: n, setFormData: s } = ie(),
    [r, l] = k(Pn[0]),
    [o, i] = k(Dn[0]),
    [c, p] = k(Nn[0]),
    [u, m] = k(!1),
    [v, _] = k($t[0]),
    [E, w] = k(!1),
    [D, T] = k(_t[0]),
    [S, h] = k([]),
    [b, x] = k([]),
    [I, A] = k(kn[0]),
    [y, g] = k([]),
    [N, C] = k({}),
    [$, f] = k({});
  Ie(() => {
    h(Ho);
  }),
    be(() => {
      r().value === "Send"
        ? (h(Ho), x([]))
        : r().value === "sendAndWaitForResponse" &&
          (c().value === "Approval"
            ? (h([
                {
                  value: "limitWaitTime",
                  label: "Limit Wait Time",
                  content: {
                    type: "reproductiveDropDown",
                    name: "limitWaitTime",
                    title: "Limit Wait Time",
                    toolTipText: "Time at which polling should occur",
                  },
                },
              ]),
              x([]))
            : (c().value === "freeText" || c().value === "customForm") &&
              (h(nu), x([])));
    });
  const P = (V) => {
    V.preventDefault();
    const R = new FormData(V.target);
    let H = Object.fromEntries(R.entries());
    const J = uu(H, t().id);
    s({ ...n(), sendEmail: J });
  };
  return (() => {
    var V = bu(),
      R = V.firstChild,
      H = R.firstChild;
    return (
      V.addEventListener("submit", P),
      a(
        R,
        d(et, {
          name: "credential",
          title: "Credential to connect with",
          placeholder: "Create credential...",
        }),
        H
      ),
      a(
        R,
        d(Te, {
          name: "Operation",
          title: "Operation",
          options: Pn,
          get defaultValue() {
            return Pn[0].value;
          },
          onChange: (J) => {
            l(J);
          },
        }),
        H
      ),
      a(
        R,
        d(se, {
          name: "fromEmail",
          title: "From Email",
          placeholder: "admin@example.com",
          toolTipText:
            "Email address of the sender. You can also specify a name: Nathan Doe <nate@n8n.io>.",
          get type() {
            return Un.Email;
          },
          isArrow: !0,
        }),
        H
      ),
      a(
        R,
        d(se, {
          name: "toEmail",
          title: "To Email",
          placeholder: "info@example.com",
          toolTipText:
            "Email address of the recipient. You can also specify a name: Nathan Doe <nate@n8n.io>.",
          get type() {
            return Un.Email;
          },
          isArrow: !0,
        }),
        H
      ),
      a(
        R,
        d(se, {
          name: "subject",
          title: "Subject",
          placeholder: "e.g. Approval required",
          isArrow: !0,
        }),
        H
      ),
      a(
        H,
        d(te, {
          get when() {
            return r().value === "Send";
          },
          get children() {
            return [
              d(Te, {
                name: "emailFormat",
                title: "Email Format",
                options: Dn,
                get defaultValue() {
                  return Dn[0].value;
                },
                toolTipText: "Select the format for the email",
                onChange: (J) => {
                  i(J);
                },
              }),
              (() => {
                var J = zo();
                return (
                  a(
                    J,
                    d(ae, {
                      get each() {
                        return o()?.children;
                      },
                      children: (j) =>
                        d(We, {
                          get name() {
                            return `emailFormat${j.title}`;
                          },
                          get title() {
                            return j.title ?? "";
                          },
                          get toolTipText() {
                            return j.toolTipText;
                          },
                        }),
                    })
                  ),
                  J
                );
              })(),
              (() => {
                var J = pu(),
                  j = J.firstChild,
                  K = j.nextSibling,
                  B = K.nextSibling;
                return (
                  a(
                    J,
                    (() => {
                      var F = oe(() => b().length <= 0);
                      return () => F() && Ct();
                    })(),
                    K
                  ),
                  a(
                    K,
                    d(ae, {
                      get each() {
                        return b();
                      },
                      children: (F) => {
                        if (F.content.type === "dynamicInput")
                          return (() => {
                            var q = Uo(),
                              M = q.firstChild,
                              G = M.nextSibling;
                            return (
                              (M.$$click = () => {
                                const X = b().filter(
                                  (Y) => Y.value !== F.value
                                );
                                x(X), h([...S(), F]);
                              }),
                              a(M, d(pe, {})),
                              a(
                                G,
                                d(se, {
                                  get name() {
                                    return F.content.name;
                                  },
                                  get title() {
                                    return F.content.title;
                                  },
                                  get placeholder() {
                                    return F.content.placeholder;
                                  },
                                  get toolTipText() {
                                    return F.content.toolTipText;
                                  },
                                  isArrow: !0,
                                })
                              ),
                              q
                            );
                          })();
                        if (F.content.type === "switch")
                          return (() => {
                            var q = Uo(),
                              M = q.firstChild,
                              G = M.nextSibling;
                            return (
                              (M.$$click = () => {
                                const X = b().filter(
                                  (Y) => Y.value !== F.value
                                );
                                x(X), h([...S(), F]);
                              }),
                              a(M, d(pe, {})),
                              a(
                                G,
                                d(_e, {
                                  get title() {
                                    return F.content.title ?? "";
                                  },
                                  get toolTipText() {
                                    return F.content.toolTipText;
                                  },
                                  get name() {
                                    return F.content.name;
                                  },
                                })
                              ),
                              q
                            );
                          })();
                      },
                    })
                  ),
                  a(
                    B,
                    d(Me, {
                      name: "optionsForSendOperation",
                      placeholder: "Add option",
                      dropdownOptions: S,
                      setDropdownOptions: h,
                      selectedOptions: b,
                      setSelectedOptions: x,
                      onChange: (F) => {
                        x(F);
                      },
                    })
                  ),
                  J
                );
              })(),
            ];
          },
        }),
        null
      ),
      a(
        H,
        d(te, {
          get when() {
            return r().value === "sendAndWaitForResponse";
          },
          get children() {
            return [
              d(We, { name: "message", title: "Message" }),
              d(Te, {
                name: "responseType",
                title: "Response Type",
                options: Nn,
                get defaultValue() {
                  return Nn[0].value;
                },
                onChange: (J) => {
                  p(J);
                },
              }),
              (() => {
                var J = An();
                return (
                  a(
                    J,
                    d(te, {
                      get when() {
                        return c().value === "Approval";
                      },
                      get children() {
                        return [
                          (() => {
                            var j = mu(),
                              K = j.firstChild,
                              B = K.nextSibling,
                              F = B.nextSibling;
                            return (
                              a(
                                j,
                                (() => {
                                  var q = oe(() => !u());
                                  return () => q() && Ct();
                                })(),
                                B
                              ),
                              a(
                                B,
                                d(hn, {
                                  onClick: () => m(!0),
                                  title: "Add Option",
                                  width: "w-full",
                                })
                              ),
                              a(
                                F,
                                d(te, {
                                  get when() {
                                    return u();
                                  },
                                  get children() {
                                    var q = Wo(),
                                      M = q.firstChild,
                                      G = M.nextSibling;
                                    return (
                                      (M.$$click = () => {
                                        m(!1), _($t[0]);
                                      }),
                                      a(M, d(pe, {})),
                                      a(
                                        G,
                                        d(Te, {
                                          name: "typeOfApproval",
                                          title: "Type of Approval",
                                          options: $t,
                                          get defaultValue() {
                                            return $t[0].value;
                                          },
                                          onChange: (X) => {
                                            _(X);
                                          },
                                        }),
                                        null
                                      ),
                                      a(
                                        G,
                                        d(se, {
                                          name: "approveButtonLabel",
                                          title: "Approve Button Label",
                                          value: "Approve",
                                        }),
                                        null
                                      ),
                                      a(
                                        G,
                                        d(we, {
                                          name: "approveButtonStyle",
                                          title: "Approve Button Style",
                                          options: [
                                            {
                                              value: "primary",
                                              label: "Primary",
                                            },
                                            {
                                              value: "secondary",
                                              label: "Secondary",
                                            },
                                          ],
                                          defaultValue: "primary",
                                        }),
                                        null
                                      ),
                                      a(
                                        G,
                                        d(te, {
                                          get when() {
                                            return (
                                              v().value ===
                                              "approvedAndDisapproved"
                                            );
                                          },
                                          get children() {
                                            return [
                                              d(se, {
                                                name: "disapproveButtonLabel",
                                                title:
                                                  "Disapprove Button Label",
                                                value: "Disapprove",
                                              }),
                                              d(we, {
                                                name: "disapproveButtonStyle",
                                                title:
                                                  "Disapprove Button Style",
                                                options: [
                                                  {
                                                    value: "primary",
                                                    label: "Primary",
                                                  },
                                                  {
                                                    value: "secondary",
                                                    label: "Secondary",
                                                  },
                                                ],
                                                defaultValue: "primary",
                                              }),
                                            ];
                                          },
                                        }),
                                        null
                                      ),
                                      q
                                    );
                                  },
                                })
                              ),
                              W(() => L(B, `${u() ? "hidden" : "mt-5"}`)),
                              j
                            );
                          })(),
                          (() => {
                            var j = gu(),
                              K = j.firstChild,
                              B = K.nextSibling,
                              F = B.nextSibling;
                            return (
                              a(
                                j,
                                (() => {
                                  var q = oe(() => !E());
                                  return () => q() && Ct();
                                })(),
                                B
                              ),
                              a(
                                B,
                                d(hn, {
                                  onClick: () => w(!0),
                                  title: "Add Option",
                                  width: "w-full",
                                })
                              ),
                              a(
                                F,
                                d(te, {
                                  get when() {
                                    return E();
                                  },
                                  get children() {
                                    var q = Ko(),
                                      M = q.firstChild,
                                      G = M.nextSibling,
                                      X = G.firstChild;
                                    return (
                                      (M.$$click = () => {
                                        w(!1), T($t[0]);
                                      }),
                                      a(M, d(pe, {})),
                                      a(
                                        G,
                                        d(Te, {
                                          name: "limitType",
                                          title: "Limit Type",
                                          options: _t,
                                          get defaultValue() {
                                            return _t[0].value;
                                          },
                                          toolTipText:
                                            "Sets the condition for the execution to resume. Can be a specified date or after some time.",
                                          onChange: (Y) => {
                                            T(Y);
                                          },
                                        }),
                                        X
                                      ),
                                      a(
                                        X,
                                        d(te, {
                                          get when() {
                                            return (
                                              D().value === "afterTimeInterval"
                                            );
                                          },
                                          get children() {
                                            return [
                                              d(se, {
                                                name: "amount",
                                                title: "Amount",
                                                value: 45,
                                                toolTipText:
                                                  "The time to wait.",
                                              }),
                                              d(we, {
                                                name: "unit",
                                                title: "Unit",
                                                toolTipText:
                                                  "Unit of the interval value",
                                                options: [
                                                  {
                                                    value: "minutes",
                                                    label: "Minutes",
                                                  },
                                                  {
                                                    value: "hours",
                                                    label: "Hours",
                                                  },
                                                  {
                                                    value: "days",
                                                    label: "Days",
                                                  },
                                                ],
                                                defaultValue: "minutes",
                                              }),
                                            ];
                                          },
                                        }),
                                        null
                                      ),
                                      a(
                                        X,
                                        d(te, {
                                          get when() {
                                            return (
                                              D().value === "atSpecifiedTime"
                                            );
                                          },
                                          get children() {
                                            return d(se, {
                                              title: "Max Date and Time",
                                              name: "maxDateAndTime",
                                              toolTipText:
                                                "Continue execution after the specified date and time",
                                            });
                                          },
                                        }),
                                        null
                                      ),
                                      q
                                    );
                                  },
                                })
                              ),
                              W(() => L(B, `${E() ? "hidden" : "mt-5"}`)),
                              j
                            );
                          })(),
                        ];
                      },
                    })
                  ),
                  J
                );
              })(),
              (() => {
                var J = An();
                return (
                  a(
                    J,
                    d(te, {
                      get when() {
                        return c().value === "customForm";
                      },
                      get children() {
                        return [
                          d(Te, {
                            name: "defineForm",
                            title: "Define Form",
                            options: kn,
                            get defaultValue() {
                              return kn[0].value;
                            },
                            onChange: (j) => {
                              A(j);
                            },
                          }),
                          d(te, {
                            get when() {
                              return I().value === "usingJSON";
                            },
                            get children() {
                              return d(Bt, {
                                name: "formFieldsJson",
                                title: "Form Fields",
                                footNote: "See docs for file syntax.",
                                get value() {
                                  return JSON.stringify(
                                    [
                                      {
                                        fieldLabel: "Name",
                                        placeholder: "enter you name",
                                        requiredField: !0,
                                      },
                                    ],
                                    null,
                                    2
                                  );
                                },
                              });
                            },
                          }),
                          (() => {
                            var j = fu();
                            return (
                              a(
                                j,
                                d(te, {
                                  get when() {
                                    return I().value === "usingFieldBelow";
                                  },
                                  get children() {
                                    return [
                                      hu(),
                                      oe(
                                        () =>
                                          oe(() => y().length <= 0)() && Ct()
                                      ),
                                      (() => {
                                        var K = zo();
                                        return (
                                          a(
                                            K,
                                            d(ae, {
                                              get each() {
                                                return y();
                                              },
                                              children: (B, F) =>
                                                (() => {
                                                  var q = yu(),
                                                    M = q.firstChild,
                                                    G = M.firstChild,
                                                    X = G.nextSibling,
                                                    Y = M.nextSibling;
                                                  return (
                                                    a(G, d(xt, {})),
                                                    (X.$$click = () => {
                                                      g(
                                                        y().filter(
                                                          (re, U) => re !== B
                                                        )
                                                      );
                                                    }),
                                                    a(X, d(pe, {})),
                                                    a(
                                                      Y,
                                                      d(Te, {
                                                        name: "elementType",
                                                        title: "Element Type",
                                                        toolTipText:
                                                          "The type of field to add to the form",
                                                        options: jo,
                                                        get defaultValue() {
                                                          return jo[0].value;
                                                        },
                                                        onChange: (re) => {
                                                          C((U) => ({
                                                            ...U,
                                                            [B]:
                                                              re.children || [],
                                                          }));
                                                        },
                                                      }),
                                                      null
                                                    ),
                                                    a(
                                                      Y,
                                                      d(te, {
                                                        get when() {
                                                          return N()[B];
                                                        },
                                                        get children() {
                                                          var re = xu();
                                                          return (
                                                            a(
                                                              re,
                                                              d(ae, {
                                                                get each() {
                                                                  return N()[B];
                                                                },
                                                                children: (
                                                                  U
                                                                ) => {
                                                                  if (
                                                                    U.type ===
                                                                    "dynamicInput"
                                                                  )
                                                                    return d(
                                                                      se,
                                                                      {
                                                                        get name() {
                                                                          return `${B}_${U.title}`;
                                                                        },
                                                                        get title() {
                                                                          return U.title;
                                                                        },
                                                                        get toolTipText() {
                                                                          return U.toolTipText;
                                                                        },
                                                                        get value() {
                                                                          return U.value;
                                                                        },
                                                                        get placeholder() {
                                                                          return U.placeholder;
                                                                        },
                                                                      }
                                                                    );
                                                                  if (
                                                                    U.type ===
                                                                    "switch"
                                                                  )
                                                                    return d(
                                                                      _e,
                                                                      {
                                                                        get name() {
                                                                          return `${B}_${U.title}`;
                                                                        },
                                                                        get title() {
                                                                          return (
                                                                            U.title ??
                                                                            ""
                                                                          );
                                                                        },
                                                                        get toolTipText() {
                                                                          return U.toolTipText;
                                                                        },
                                                                      }
                                                                    );
                                                                  if (
                                                                    U.type ===
                                                                    "textBlock"
                                                                  )
                                                                    return d(
                                                                      qt,
                                                                      {
                                                                        get children() {
                                                                          return U.placeholder;
                                                                        },
                                                                      }
                                                                    );
                                                                  if (
                                                                    U.type ===
                                                                    "jsonEditor"
                                                                  )
                                                                    return d(
                                                                      Bt,
                                                                      {
                                                                        get name() {
                                                                          return `${B}_${U.title}`;
                                                                        },
                                                                        get title() {
                                                                          return U.title;
                                                                        },
                                                                        get footNote() {
                                                                          return U.footNote;
                                                                        },
                                                                        get value() {
                                                                          return JSON.stringify(
                                                                            {
                                                                              street:
                                                                                "1234 Elm Street",
                                                                              city: "Springfield",
                                                                            },
                                                                            null,
                                                                            2
                                                                          );
                                                                        },
                                                                      }
                                                                    );
                                                                  if (
                                                                    U.type ===
                                                                    "inputBlock"
                                                                  )
                                                                    return (() => {
                                                                      var Q =
                                                                          wu(),
                                                                        z =
                                                                          Q.firstChild,
                                                                        ne =
                                                                          z.nextSibling;
                                                                      return (
                                                                        a(
                                                                          ne,
                                                                          d(
                                                                            ae,
                                                                            {
                                                                              get each() {
                                                                                return $()[
                                                                                  B
                                                                                ];
                                                                              },
                                                                              children:
                                                                                (
                                                                                  ee,
                                                                                  me
                                                                                ) =>
                                                                                  (() => {
                                                                                    var Z =
                                                                                        $u(),
                                                                                      de =
                                                                                        Z.firstChild,
                                                                                      ue =
                                                                                        de.firstChild,
                                                                                      ce =
                                                                                        ue.nextSibling,
                                                                                      fe =
                                                                                        de.nextSibling;
                                                                                    return (
                                                                                      a(
                                                                                        ue,
                                                                                        d(
                                                                                          xt,
                                                                                          {}
                                                                                        )
                                                                                      ),
                                                                                      (ce.$$click =
                                                                                        () => {
                                                                                          f(
                                                                                            (
                                                                                              Ne
                                                                                            ) => ({
                                                                                              ...Ne,
                                                                                              [B]: Ne[
                                                                                                B
                                                                                              ].filter(
                                                                                                (
                                                                                                  xe
                                                                                                ) =>
                                                                                                  xe !==
                                                                                                  ee
                                                                                              ),
                                                                                            })
                                                                                          );
                                                                                        }),
                                                                                      a(
                                                                                        ce,
                                                                                        d(
                                                                                          pe,
                                                                                          {}
                                                                                        )
                                                                                      ),
                                                                                      a(
                                                                                        fe,
                                                                                        d(
                                                                                          se,
                                                                                          {
                                                                                            get name() {
                                                                                              return `${B}_${U.name}_${ee}`;
                                                                                            },
                                                                                            title:
                                                                                              "Option",
                                                                                          }
                                                                                        )
                                                                                      ),
                                                                                      W(
                                                                                        () =>
                                                                                          L(
                                                                                            Z,
                                                                                            `flex gap-1.5 ${
                                                                                              me() !==
                                                                                              0
                                                                                                ? "border-t pt-6 border-dashed border-[#575555]"
                                                                                                : ""
                                                                                            }`
                                                                                          )
                                                                                      ),
                                                                                      Z
                                                                                    );
                                                                                  })(),
                                                                            }
                                                                          )
                                                                        ),
                                                                        a(
                                                                          Q,
                                                                          d(
                                                                            lt,
                                                                            {
                                                                              label:
                                                                                "Add Field Option",
                                                                              onClick:
                                                                                () => {
                                                                                  f(
                                                                                    (
                                                                                      ee
                                                                                    ) => ({
                                                                                      ...ee,
                                                                                      [B]: [
                                                                                        ...(ee[
                                                                                          B
                                                                                        ] ||
                                                                                          []),
                                                                                        `${Math.random()
                                                                                          .toString(
                                                                                            36
                                                                                          )
                                                                                          .substring(
                                                                                            2,
                                                                                            8
                                                                                          )}`,
                                                                                      ],
                                                                                    })
                                                                                  );
                                                                                },
                                                                            }
                                                                          ),
                                                                          null
                                                                        ),
                                                                        Q
                                                                      );
                                                                    })();
                                                                },
                                                              })
                                                            ),
                                                            re
                                                          );
                                                        },
                                                      }),
                                                      null
                                                    ),
                                                    W(() =>
                                                      L(
                                                        q,
                                                        `flex gap-1.5 ${
                                                          F() !== 0
                                                            ? "border-t pt-6 border-dashed border-[#575555]"
                                                            : ""
                                                        }`
                                                      )
                                                    ),
                                                    q
                                                  );
                                                })(),
                                            })
                                          ),
                                          K
                                        );
                                      })(),
                                      d(lt, {
                                        label: "Add Form Element",
                                        onClick: () => {
                                          g([
                                            ...y(),
                                            `form_elements_${Math.random()
                                              .toString(36)
                                              .substring(2, 8)}`,
                                          ]);
                                        },
                                      }),
                                    ];
                                  },
                                })
                              ),
                              j
                            );
                          })(),
                        ];
                      },
                    })
                  ),
                  J
                );
              })(),
              (() => {
                var J = An();
                return (
                  a(
                    J,
                    d(te, {
                      get when() {
                        return (
                          c().value === "freeText" || c().value === "customForm"
                        );
                      },
                      get children() {
                        return [
                          (() => {
                            var j = vu();
                            return (
                              j.firstChild,
                              a(
                                j,
                                (() => {
                                  var K = oe(() => b().length <= 0);
                                  return () => K() && Ct();
                                })(),
                                null
                              ),
                              j
                            );
                          })(),
                          d(ae, {
                            get each() {
                              return b();
                            },
                            children: (j) => {
                              if (j.content.type === "dynamicInput")
                                return (() => {
                                  var K = Wo(),
                                    B = K.firstChild,
                                    F = B.nextSibling;
                                  return (
                                    (B.$$click = () => {
                                      const q = b().filter(
                                        (M) => M.value !== j.value
                                      );
                                      x(q), h([...S(), j]);
                                    }),
                                    a(B, d(pe, {})),
                                    a(
                                      F,
                                      d(se, {
                                        get name() {
                                          return j.content.name;
                                        },
                                        get title() {
                                          return j.content.title;
                                        },
                                        get toolTipText() {
                                          return j.content.toolTipText;
                                        },
                                      })
                                    ),
                                    K
                                  );
                                })();
                              if (j.content.type === "reproductiveDropDown")
                                return (() => {
                                  var K = Ko(),
                                    B = K.firstChild,
                                    F = B.nextSibling,
                                    q = F.firstChild;
                                  return (
                                    (B.$$click = () => {
                                      const M = b().filter(
                                        (G) => G.value !== j.value
                                      );
                                      x(M), h([...S(), j]);
                                    }),
                                    a(B, d(pe, {})),
                                    a(
                                      F,
                                      d(Te, {
                                        name: "limitType",
                                        title: "Limit Type",
                                        options: _t,
                                        get defaultValue() {
                                          return _t[0].value;
                                        },
                                        toolTipText:
                                          "Sets the condition for the execution to resume. Can be a specified date or after some time.",
                                        onChange: (M) => {
                                          T(M);
                                        },
                                      }),
                                      q
                                    ),
                                    a(
                                      q,
                                      d(te, {
                                        get when() {
                                          return (
                                            D().value === "afterTimeInterval"
                                          );
                                        },
                                        get children() {
                                          return [
                                            d(se, {
                                              name: "amount",
                                              title: "Amount",
                                              value: 45,
                                              toolTipText: "The time to wait.",
                                            }),
                                            d(we, {
                                              name: "unit",
                                              title: "Unit",
                                              toolTipText:
                                                "Unit of the interval value",
                                              options: [
                                                {
                                                  value: "minutes",
                                                  label: "Minutes",
                                                },
                                                {
                                                  value: "hours",
                                                  label: "Hours",
                                                },
                                                {
                                                  value: "days",
                                                  label: "Days",
                                                },
                                              ],
                                              defaultValue: "minutes",
                                            }),
                                          ];
                                        },
                                      }),
                                      null
                                    ),
                                    a(
                                      q,
                                      d(te, {
                                        get when() {
                                          return (
                                            D().value === "atSpecifiedTime"
                                          );
                                        },
                                        get children() {
                                          return d(se, {
                                            title: "Max Date and Time",
                                            name: "maxDateAndTime",
                                            toolTipText:
                                              "Continue execution after the specified date and time",
                                          });
                                        },
                                      }),
                                      null
                                    ),
                                    K
                                  );
                                })();
                            },
                          }),
                          d(Me, {
                            name: "Option",
                            dropdownOptions: S,
                            setDropdownOptions: h,
                            selectedOptions: b,
                            setSelectedOptions: x,
                            placeholder: "Add Options",
                            onChange: (j) => {
                              x(j);
                            },
                          }),
                        ];
                      },
                    })
                  ),
                  J
                );
              })(),
            ];
          },
        }),
        null
      ),
      V
    );
  })();
};
ge(["click"]);
const Ul = [
    {
      label: "Support Dot Notation",
      value: "supportDotNotation",
      content: {
        type: "switch",
        name: "supportDotNotation",
        title: "Support Dot Notation",
        toolTipText:
          'By default, dot-notation is used in property names. This means that "a.b" will set the property "b" underneath "a" so { "a": { "b": value} }. If that is not intended this can be deactivated, it will then set { "a.b": value } instead.',
      },
    },
  ],
  Gn = [
    {
      label: "Ignore Type Conversion Errors",
      value: "ignoreTypeConversionErrors",
      content: {
        type: "switch",
        name: "ignoreTypeConversionErrors",
        title: "Ignore Type Conversion Errors",
        toolTipText:
          "Whether to ignore field type errors and apply a less strict type conversion",
      },
    },
    ...Ul,
  ],
  fn = [
    {
      label: "Manual Mapping",
      value: "Manual Mapping",
      description: "Edit itemFields one by one.",
    },
    {
      label: "JSON",
      value: "JSON",
      description: "Customize item output with JSON.",
    },
  ],
  Go = [
    { label: "𝔸  String", value: "String" },
    { label: "#  Number", value: "Number" },
    { label: "🗹  Boolean", value: "Boolean" },
    { label: "⊞  Array", value: "Array" },
    { label: "{.}  Object", value: "Object" },
  ],
  on = (e, t) => {
    const { nodes: n } = ie(),
      s = (l) => {
        const [o, i] = k(1);
        return Object.values(
          Object.entries(l)
            .filter(([c, p]) => c.startsWith("field_"))
            .reduce((c, p) => {
              const [u, m] = p,
                v = u.split("_"),
                _ = `${v[0]}_${v[1]}`,
                E = v[2];
              return (
                (c[_] ??= {}),
                c[_].id || ((c[_].id = o()), i((w) => w + 1)),
                E === "name"
                  ? (c[_].name = m)
                  : E === "value"
                  ? (c[_].value = m)
                  : E === "type" && (c[_].type = m),
                c
              );
            }, {})
        );
      },
      r = () => {
        const l = n().find((o) => o.id === t);
        if (l) return l.currPosition.get();
      };
    return {
      id: t,
      name: "Edit Fields",
      description: "Modify,add,or remove item fields.",
      type: "EditNode",
      parameters: {
        mode: e?.mode,
        assignment: s(e),
        inputs: [
          {
            id: "input",
            name: "Input",
            description: "Data to filter",
            type: "object",
          },
        ],
        outputs: [
          {
            id: "output",
            name: "Output",
            description: "Outcode of the node after process",
            type: "object",
          },
        ],
      },
      position: r(),
    };
  },
  Tu = (e) => {
    if (e) {
      const { parameters: t } = e,
        n = t?.assignment,
        s = [],
        r = {};
      return (
        n &&
          n.forEach((l) => {
            const o = `field_${Math.random().toString(36).substring(2, 8)}`;
            s.push(o),
              console.log(l),
              "name" in l && (r[`${o}_name`] = l.name),
              "value" in l && (r[`${o}_value`] = l.value),
              "type" in l && (r[`${o}_type`] = l.type);
          }),
        { mode: e?.parameters?.mode, field: s, fieldData: r }
      );
    }
  };
function Cu() {
  const { formData: e, setFormData: t, currentFormConfig: n } = ie(),
    [s, r] = k(fn[0].value),
    [l, o] = k([]),
    [i, c] = k([]),
    [p, u] = k([]),
    [m, v] = k({}),
    [_, E] = k({}),
    [w, D] = k(""),
    T = new Set(),
    S = () => {
      u(Gn), c([]), o([]), r(fn[0].value), v({}), E({});
    },
    h = (x, I) => {
      if (
        (console.log("from data handler raw >>>> ", x, " >>>>> ", I),
        console.log("before check: previous data from dataHandler", _()),
        x in _())
      ) {
        if (_()[x] === I) {
          console.log(
            "from data handler:::: >> previous Data,>>> data unchanged, key unchanged",
            m()
          ),
            v((A) => ({ ...A, [x]: I })),
            console.log(
              "from data handler:::: >> submitted data from previous data >>> data unchanged, key unchanged",
              m()
            );
          return;
        } else if (_()[x] !== I) {
          console.log(
            "from data handler, 2,>>> key unchanged but data changed",
            _()
          ),
            console.log(
              "from data handler:::: >> submitted data 1 >>> key unchanged but data changed",
              m()
            ),
            v((y) => ({ ...y, [x]: I })),
            console.log(
              "from data handler:::: >> submitted data 2 >>> key unchanged but data changed",
              m()
            );
          const A = on(m(), n().id);
          console.log(
            "from data handler:::: >> formatted key >>>  unchanged but data changed",
            A
          ),
            t({ ...e(), [n().id]: A }),
            console.log(
              "from data handler:::: >> formData() >>> key unchanged but data changed",
              e()
            );
        }
      } else {
        console.log("from data handler, 2 >>> both key and data changed", _()),
          console.log(
            "from data handler:::: >> submitted data 1  >>> both key and data changed",
            m()
          ),
          v((y) => ({ ...y, [x]: I })),
          console.log(
            "from data handler:::: >> submitted data 2 >>> both key and data changed",
            m()
          );
        const A = on(m(), n().id);
        console.log(
          "from data handler:::: >> formatted >>> both key and data changed",
          A
        ),
          t({ ...e(), [n().id]: A }),
          console.log(
            "from data handler:::: >> formData() >>> both key and data changed",
            e()
          );
      }
    },
    b = (x) => {
      console.log("from data remover raw >>>> ", x, " >>>>>> "),
        v((A) =>
          Object.entries(A).reduce(
            (y, [g, N]) => (g.includes(x) || (y[g] = N), y),
            {}
          )
        ),
        console.log(" from data remover >>>> previous data", m());
      const I = on(m(), n().id);
      console.log("from data remover >>>>> formattedPrev", I),
        t({ ...e(), [n().id]: I }),
        console.log("from data remover >>> form data", e());
    };
  return (
    be(() => {
      if (
        (console.log(
          n().id,
          "  >  node data  >  ",
          `
`,
          i()
        ),
        console.log(">>>>>>.>>>>>>>>>>>>>>>>>.>>>>>>>>>>>>>>>>>>>>>>>>>"),
        console.log(_(), "from outside"),
        !T.has(n().id))
      ) {
        T.clear(), T.add(n().id), D(n().id);
        const x = e()[n().id];
        if ((console.log("data1", x), S(), !x)) return;
        console.log("data2", x);
        const I = Tu(x);
        I &&
          (console.log(
            "decoded from observer, >>>>>> ",
            n().id,
            I.field,
            I.fieldData
          ),
          E((A) => ({ ...A, mode: I.mode, ...I.fieldData })),
          console.log(_(), "from inside"),
          console.log(I.fieldData, "from inside createEffect"),
          o(I.field ?? []),
          r(I.mode ?? ""));
      }
    }),
    {
      selectedOptions: i,
      setSelectedOptions: c,
      submittedData: m,
      dataInsertHandler: h,
      options: p,
      setOptions: u,
      previousData: _,
      setPreviousData: E,
      setSubmittedData: v,
      dataRemoveHandler: b,
      currentMode: s,
      setCurrentMode: r,
      field: l,
      setField: o,
      reset: S,
      uniqueKey: w,
    }
  );
}
var Iu = O('<div class="label hr-solid-line">Fields to Set'),
  Su = O('<div class="flex flex-col gap-6 mt-5">'),
  Eu = O(
    "<div><p class=text-[#ddd5d5]>Drag input fields here </p><p class=text-[#9b9494]>or</p><p class=text-[#df4c38]>Add Field"
  ),
  Ou = O(
    '<form class=form id=editForm><div><div class=mt-5><div class=mt-5></div><div class=mt-5></div><div class=mt-5><div class="label hr-solid-line">Options</div><div class="mt-5 flex flex-col gap-6"></div><div>'
  ),
  Du = O(
    '<div><div class="flex flex-col items-center gap-1"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-grab active:cursor-grabbing bg-[#36373d] p-1 rounded-md"title="Drag to move"></div><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] p-1 rounded-md"></div><div class="w-0.5 h-full bg-[#36373d] rounded-md"></div></div><div class="flex flex-col gap-1.5 w-full"><div class="flex gap-1.5"><div class=flex-1></div><div class=min-w-[130px]></div></div><div>'
  ),
  Nu = O(
    '<div class="flex gap-1.5"><div class="text-[#6f6f70] h-fit hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] p-1 rounded-md"></div><div class=flex-1>'
  );
const ku = (e) => {
  const {
      formData: t,
      setFormData: n,
      currentFormConfig: s,
      isModalOpen: r,
    } = ie(),
    {
      setOptions: l,
      currentMode: o,
      setSelectedOptions: i,
      setCurrentMode: c,
      field: p,
      setField: u,
      previousData: m,
      selectedOptions: v,
      options: _,
      dataInsertHandler: E,
      uniqueKey: w,
      dataRemoveHandler: D,
    } = Cu();
  Ie(() => {
    l(Gn);
  }),
    be(() => {
      o() === "Manual Mapping" ? (i([]), l(Gn)) : (i([]), l(Ul));
    });
  const T = (h) => {
      h.preventDefault();
      const b = new FormData(h.target);
      let x = Object.fromEntries(b.entries());
      console.log("unformatted data", x);
      const I = on(x, s().id);
      console.log("formatted data", I), n({ ...t(), [s().id]: x });
      const A = new CustomEvent("formSubmitEvent", { detail: x, bubbles: !0 }),
        y = document.getElementById("submitBtn");
      y && y.dispatchEvent(A);
    },
    S = (h) => m()[h];
  return (() => {
    var h = Ou(),
      b = h.firstChild,
      x = b.firstChild,
      I = x.firstChild,
      A = I.nextSibling,
      y = A.nextSibling,
      g = y.firstChild,
      N = g.nextSibling,
      C = N.nextSibling;
    return (
      h.addEventListener("submit", T),
      a(
        b,
        d(we, {
          name: "mode",
          title: "Mode",
          get uniqueKey() {
            return w();
          },
          options: fn,
          get defaultValue() {
            return S("mode") || fn[0].value;
          },
          onChange: ($) => {
            c($.value), E("mode", $.value), console.log("mode setting done");
          },
        }),
        x
      ),
      a(
        x,
        d(te, {
          get when() {
            return o() === "Manual Mapping";
          },
          get children() {
            return [
              Iu(),
              (() => {
                var $ = Su();
                return (
                  a(
                    $,
                    d(ae, {
                      get each() {
                        return p();
                      },
                      children: (f, P) =>
                        (() => {
                          var V = Du(),
                            R = V.firstChild,
                            H = R.firstChild,
                            J = H.nextSibling,
                            j = R.nextSibling,
                            K = j.firstChild,
                            B = K.firstChild,
                            F = B.nextSibling,
                            q = K.nextSibling;
                          return (
                            a(H, d(xt, {})),
                            (J.$$click = () => {
                              u(p().filter((M, G) => M !== f)), D(f);
                            }),
                            a(J, d(pe, {})),
                            a(
                              B,
                              d(se, {
                                placeholder: "name",
                                name: `${f}_name`,
                                get value() {
                                  return S(`${f}_name`) || "";
                                },
                                isArrow: !0,
                                onInput: (M) => {
                                  E(`${f}_name`, M);
                                },
                              })
                            ),
                            a(
                              F,
                              d(we, {
                                name: `${f}_type`,
                                uniqueKey: `${f}_type`,
                                options: Go,
                                get defaultValue() {
                                  return S(`${f}_type`) || Go[0].value;
                                },
                                onChange: (M) => {
                                  E(`${f}_type`, M.value);
                                },
                              })
                            ),
                            a(
                              q,
                              d(se, {
                                placeholder: "value",
                                name: `${f}_value`,
                                get value() {
                                  return S(`${f}_value`) || "";
                                },
                                isArrow: !0,
                                onInput: (M) => {
                                  E(`${f}_value`, M);
                                },
                              })
                            ),
                            W(() =>
                              L(
                                V,
                                `flex gap-1.5 ${
                                  P() !== 0
                                    ? "border-t pt-6 border-dashed border-[#575555]"
                                    : ""
                                }`
                              )
                            ),
                            V
                          );
                        })(),
                    })
                  ),
                  $
                );
              })(),
              (() => {
                var $ = Eu();
                return (
                  ($.$$click = () => {
                    u([
                      ...p(),
                      `field_${Math.random().toString(36).substring(2, 8)}`,
                    ]);
                  }),
                  W(() =>
                    L(
                      $,
                      `${
                        p().length <= 0 ? "h-44" : "h-14 mt-5 "
                      } p-4 flex text-center border border-dashed border-[#9c9c9e] rounded-md bg-[#252434] hover:border-[#ffa89d] hover:bg-[#fc7c6b13] cursor-pointer ${
                        p().length <= 0 ? "flex-col" : "flex col"
                      } items-center justify-center gap-1`
                    )
                  ),
                  $
                );
              })(),
            ];
          },
        }),
        I
      ),
      a(
        I,
        d(te, {
          get when() {
            return o() === "JSON";
          },
          get children() {
            return d(Bt, {
              name: "json_editor",
              placeholder: "Enter JSON here",
              get value() {
                return JSON.stringify(
                  {
                    field_xmynu3: "value1",
                    field_4g2j3k: "value2",
                    field_123456: "value3",
                  },
                  null,
                  2
                );
              },
              isArrow: !0,
              onInput: ($) => {
                E("json_editor", $);
              },
            });
          },
        })
      ),
      a(
        A,
        d(_e, {
          get uniqueKey() {
            return w();
          },
          get checked() {
            return m().includeOtherInputFields;
          },
          name: "includeOtherInputFields",
          title: "Include Other Input Fields",
          toolTipText:
            "Whether to pass to the output all the input fields (along with the fields set in 'Fields to Set')",
          onChange: ($) => {},
        })
      ),
      a(
        N,
        d(ae, {
          get each() {
            return v();
          },
          children: ($, f) =>
            (() => {
              var P = Nu(),
                V = P.firstChild,
                R = V.nextSibling;
              return (
                (V.$$click = () => {
                  i(v().filter((H) => H !== $)), l([..._(), $]);
                }),
                a(V, d(pe, {})),
                a(
                  R,
                  d(_e, {
                    get uniqueKey() {
                      return `${s().id}_${$.content.name}`;
                    },
                    get checked() {
                      return m()[$.content.name];
                    },
                    get title() {
                      return $.content.title ?? "";
                    },
                    get toolTipText() {
                      return $.content.toolTipText ?? "";
                    },
                    get name() {
                      return $.content.name;
                    },
                    onChange: (H) => {
                      E("includeOtherInputFields", H);
                    },
                  })
                ),
                P
              );
            })(),
        })
      ),
      a(
        C,
        d(Me, {
          name: "options_edit_node",
          selectedOptions: v,
          setSelectedOptions: i,
          dropdownOptions: _,
          setDropdownOptions: l,
          placeholder: "Add options",
          onChange: ($) => {},
        })
      ),
      W(() => L(C, `${v().length <= 0 ? "" : "mt-5"}`)),
      h
    );
  })();
};
ge(["click"]);
const Gl = [
    {
      label: "Fallback Output",
      value: "fallbackOutput",
      content: {
        type: "DropDownN",
        name: "fallbackOutput",
        title: "Fallback Output",
        toolTipText:
          "If no rule matches the item will be sent to this output, by default they will be ignored.",
        options: [
          {
            label: "None (Default)",
            value: "noneDefault",
            description: "Items will be ignored.",
          },
          {
            label: "Extra Output",
            value: "extraOutput",
            description: "Items will be sent to the extra, separate, output.",
          },
          {
            label: "Output 0",
            value: "output0",
            description:
              "Items will be sent to the same output as when matched rule 1.",
          },
        ],
      },
    },
    {
      label: "Ignore Case",
      value: "ignoreCase",
      content: {
        type: "switch",
        name: "ignoreCase",
        title: "Ignore Case",
        toolTipText:
          "Whether to ignore letter case when evaluating conditions.",
      },
    },
    {
      label: "Send data to all matching outputs",
      value: "sendDataToAllMatchingOutputs",
      content: {
        type: "switch",
        name: "sendDataToAllMatchingOutputs",
        title: "Send data to all matching outputs",
        toolTipText:
          "Whether to send data to all outputs meeting conditions (and not just the first one).",
      },
    },
  ],
  Xn = [
    {
      label: "Rules",
      value: "Rules",
      description: "Build a matching rule for each output.",
    },
    {
      label: "Expression",
      value: "Expression",
      description: "write an expression to return the output index.",
    },
  ],
  Mn = [
    {
      label: "𝔸  String",
      value: "String",
      children: [
        { label: "Exists", value: "exists" },
        { label: "Does not exist", value: "doesNotExist" },
        { label: "Is empty", value: "isEmpty" },
        { label: "Is not empty", value: "isNotEmpty" },
        { label: "Is equal to", value: "isEqualTo" },
        { label: "Is not equal to", value: "isNotEqualTo" },
        { label: "Contains", value: "contains" },
        { label: "Does not contain", value: "doesNotContain" },
        { label: "Starts with", value: "startsWith" },
        { label: "Does not start with", value: "doesNotStartWith" },
        { label: "Ends with", value: "endsWith" },
        { label: "Does not end with", value: "doesNotEndWith" },
        { label: "Matches regex", value: "matchesRegex" },
        { label: "Does not match regex", value: "doesNotMatchRegex" },
      ],
    },
    {
      label: "#  Number",
      value: "Number",
      children: [
        { label: "Exists", value: "exists" },
        { label: "Does not exist", value: "doesNotExist" },
        { label: "Is empty", value: "isEmpty" },
        { label: "Is not empty", value: "isNotEmpty" },
        { label: "Is equal to", value: "isEqualTo" },
        { label: "Is not equal to", value: "isNotEqualTo" },
        { label: "Is greater than", value: "isGreaterThan" },
        { label: "Is less than", value: "isLessThan" },
        {
          label: "Is greater than or equal to",
          value: "isGreaterThanOrEqualTo",
        },
        { label: "Is less than or equal to", value: "isLessThanOrEqualTo" },
      ],
    },
    {
      label: "🗓  Date & Time",
      value: "dateAndTime",
      children: [
        { label: "Exists", value: "exists" },
        { label: "Does not exist", value: "doesNotExist" },
        { label: "Is empty", value: "isEmpty" },
        { label: "Is not empty", value: "isNotEmpty" },
        { label: "Is equal to", value: "isEqualTo" },
        { label: "Is not equal to", value: "isNotEqualTo" },
        { label: "Is after", value: "isAfter" },
        { label: "Is before", value: "isBefore" },
        { label: "Is after or equal to", value: "isAfterOrEqualTo" },
        { label: "Is before or equal to", value: "isBeforeOrEqualTo" },
      ],
    },
    {
      label: "🗹  Boolean",
      value: "Boolean",
      children: [
        { label: "exists", value: "exists" },
        { label: "does not exist", value: "doesNotExist" },
        { label: "is empty", value: "isEmpty" },
        { label: "is not empty", value: "isNotEmpty" },
        { label: "is true", value: "isTrue" },
        { label: "is false", value: "isFalse" },
        { label: "is equal to", value: "isEqualTo" },
        { label: "is not equal to", value: "isNotEqualTo" },
      ],
    },
    {
      label: "⊞  Array",
      value: "Array",
      children: [
        { label: "exists", value: "exists" },
        { label: "does not exist", value: "doesNotExist" },
        { label: "is empty", value: "isEmpty" },
        { label: "is not empty", value: "isNotEmpty" },
        { label: "contains", value: "contains" },
        { label: "does not contain", value: "doesNotContain" },
        { label: "length equal to", value: "lengthEqualTo" },
        { label: "length not equal to", value: "lengthNotEqualTo" },
        { label: "length greater than", value: "lengthGreaterThan" },
        { label: "length less than", value: "lengthLessThan" },
        {
          label: "length greater than or equal to",
          value: "lengthGreaterThanOrEqualTo",
        },
        {
          label: "length less than or equal to",
          value: "lengthLessThanOrEqualTo",
        },
      ],
    },
    {
      label: "{.}  Object",
      value: "Object",
      children: [
        { label: "exists", value: "exists" },
        { label: "does not exist", value: "doesNotExist" },
        { label: "is empty", value: "isEmpty" },
        { label: "is not empty", value: "isNotEmpty" },
      ],
    },
  ];
var Pu = O("<div class=nested-header><span class=chevron-left>❮"),
  Au = O(
    '<div class=custom-select><select title="native select for multi-steps dropdown"class=hidden-select></select><div title="custom select button"class=select-selected aria-haspopup=listbox aria-expanded=false role=combobox></div><div title="dropdown items"role=listbox>'
  ),
  Xo = O("<option>"),
  Mu = O("<div class=parent-option role=option aria-selected=false>"),
  Vu = O("<span class=chevron-right>❯"),
  Lu = O("<div class=child-option role=option aria-selected=false>");
const Fu = (e) => {
  const [t, n] = k(!1),
    [s, r] = k(null),
    [l, o] = k("Select an option"),
    [i, c] = k("main"),
    [p, u] = k(null),
    [m, v] = k("");
  let _, E;
  const w = () => {
    if (e.defaultValue) {
      const I = e.options.find((y) => y.value === e.defaultValue?.parentOption);
      let A;
      I &&
        I.children &&
        (u(I),
        (A = I.children.find((y) => y.value === e.defaultValue?.childOption)),
        A
          ? (r(A),
            o(A.label),
            e.onChange?.({ parentOption: I.value, childOption: A }))
          : e.placeholder && o(e.placeholder));
    }
  };
  be(() => {
    const I = `${e.uniqueKey}-${e.name}`;
    console.log("from outside", e.defaultValue), I !== m() && (v(I), w());
  });
  const D = (I) => {
      _ && !_.contains(I.target) && (n(!1), c("main"));
    },
    T = () => {
      n(!1), c("main");
    };
  Ie(() => {
    document.addEventListener("mousedown", D),
      document.addEventListener("touchstart", D, { passive: !0 }),
      window.addEventListener("resize", T),
      window.addEventListener("blur", T);
  }),
    De(() => {
      document.removeEventListener("mousedown", D),
        document.removeEventListener("touchstart", D),
        window.removeEventListener("resize", T),
        window.removeEventListener("blur", T);
    });
  const S = (I) => {
      I.stopPropagation(), n(!t()), t() || c("main");
    },
    h = (I) => {
      u(I), c(I.value);
    },
    b = (I) => {
      r(I),
        o(I.label),
        e.onChange?.({ parentOption: p().value, childOption: I }),
        n(!1),
        c("main"),
        _ && _.focus();
    },
    x = () => {
      c("main");
    };
  return (() => {
    var I = Au(),
      A = I.firstChild,
      y = A.nextSibling,
      g = y.nextSibling,
      N = _;
    typeof N == "function" ? ye(N, I) : (_ = I),
      a(
        A,
        d(ae, {
          get each() {
            return e.options;
          },
          children: ($) => [
            (() => {
              var f = Xo();
              return (
                a(f, () => $.label),
                W(() => (f.selected = $.value === p()?.value)),
                W(() => (f.value = $.value)),
                f
              );
            })(),
            oe(
              () =>
                oe(() => !!$.children)() &&
                d(ae, {
                  get each() {
                    return $.children;
                  },
                  children: (f) =>
                    (() => {
                      var P = Xo();
                      return (
                        a(P, () => f.label),
                        W(() => (P.selected = f.value === s()?.value)),
                        W(() => (P.value = f.value)),
                        P
                      );
                    })(),
                })
            ),
          ],
        })
      ),
      Ae(y, "click", e.disabled ? void 0 : S),
      a(y, l);
    var C = E;
    return (
      typeof C == "function" ? ye(C, g) : (E = g),
      a(
        g,
        d(te, {
          get when() {
            return i() === "main";
          },
          get children() {
            return d(ae, {
              get each() {
                return e.options;
              },
              children: ($) =>
                (() => {
                  var f = Mu();
                  return (
                    (f.$$click = () => ($.children ? h($) : b($))),
                    a(f, () => $.label, null),
                    a(
                      f,
                      (() => {
                        var P = oe(() => !!$.children);
                        return () => P() && Vu();
                      })(),
                      null
                    ),
                    W(
                      (P) => {
                        var V = $.value === p()?.value,
                          R = $.value === p()?.value,
                          H = t() ? 0 : -1;
                        return (
                          V !== P.e &&
                            f.classList.toggle("selected", (P.e = V)),
                          R !== P.t &&
                            f.classList.toggle("aria-selected-true", (P.t = R)),
                          H !== P.a && le(f, "tabindex", (P.a = H)),
                          P
                        );
                      },
                      { e: void 0, t: void 0, a: void 0 }
                    ),
                    f
                  );
                })(),
            });
          },
        }),
        null
      ),
      a(
        g,
        d(te, {
          get when() {
            return i() !== "main";
          },
          get children() {
            return [
              (() => {
                var $ = Pu();
                return (
                  $.firstChild,
                  ($.$$click = x),
                  a($, () => e.categoryLabel || "", null),
                  $
                );
              })(),
              d(ae, {
                get each() {
                  return p()?.children || [];
                },
                children: ($) =>
                  (() => {
                    var f = Lu();
                    return (
                      (f.$$click = () => b($)),
                      a(f, () => $.label),
                      W(
                        (P) => {
                          var V = $.value === s()?.value,
                            R = $.value === s()?.value,
                            H = t() ? 0 : -1;
                          return (
                            V !== P.e &&
                              f.classList.toggle("selected", (P.e = V)),
                            R !== P.t &&
                              f.classList.toggle(
                                "aria-selected-true",
                                (P.t = R)
                              ),
                            H !== P.a && le(f, "tabindex", (P.a = H)),
                            P
                          );
                        },
                        { e: void 0, t: void 0, a: void 0 }
                      ),
                      f
                    );
                  })(),
              }),
            ];
          },
        }),
        null
      ),
      W(
        ($) => {
          var f = e.name,
            P = e.required,
            V = e.disabled,
            R = !!t(),
            H = !!e.disabled,
            J = !!t(),
            j = e.disabled ? -1 : 0,
            K = `select-items ${t() ? "select-show" : "select-hide"}`;
          return (
            f !== $.e && le(A, "name", ($.e = f)),
            P !== $.t && (A.required = $.t = P),
            V !== $.a && (A.disabled = $.a = V),
            R !== $.o && y.classList.toggle("active", ($.o = R)),
            H !== $.i && y.classList.toggle("disabled", ($.i = H)),
            J !== $.n && y.classList.toggle("aria-expanded-true", ($.n = J)),
            j !== $.s && le(y, "tabindex", ($.s = j)),
            K !== $.h && L(g, ($.h = K)),
            $
          );
        },
        {
          e: void 0,
          t: void 0,
          a: void 0,
          o: void 0,
          i: void 0,
          n: void 0,
          s: void 0,
          h: void 0,
        }
      ),
      I
    );
  })();
};
ge(["click"]);
const rn = (e, t) => {
    const n = (l) => {
        const [o, i] = k(1);
        return Object.values(
          Object.entries(l)
            .filter(([c, p]) => c.startsWith("rule_"))
            .reduce((c, p) => {
              const [u, m] = p,
                v = u.split("_"),
                _ = `${v[0]}_${v[1]}`,
                E = v[2];
              return (
                (c[_] ??= {}),
                c[_].id || ((c[_].id = o()), i((w) => w + 1)),
                E === "name"
                  ? (c[_].leftValue = m)
                  : E === "value"
                  ? (c[_].rightValue = m)
                  : E === "operator"
                  ? (c[_].operator = {
                      type: m.type,
                      operation: m.operation,
                      singleValue: !0,
                    })
                  : E === "isRename"
                  ? (c[_].renameOutput = m)
                  : E === "renameOutput" && (c[_].outputKey = m),
                c
              );
            }, {})
        );
      },
      { nodes: s } = ie(),
      r = () => {
        const l = s().find((o) => o.id === t);
        if (l) return l.currPosition.get();
      };
    return {
      id: t,
      name: "Switch",
      description: "Route items depending on defined expression or rules.",
      type: "SwitchNode",
      parameters: { mode: e?.mode, rules: n(e) },
      position: r(),
      inputs: [
        {
          id: "input",
          name: "Input",
          description: "Data to filter",
          type: "object",
        },
      ],
      outputs: [
        {
          id: "Yes",
          name: "rule 0",
          description: "langchainAgent2.input",
          type: "object",
        },
        {
          id: "No",
          name: "rule 1",
          description: "sendEmail1.input",
          type: "object",
        },
      ],
    };
  },
  Bu = (e) => {
    if (e) {
      const { parameters: t } = e,
        n = t?.rules,
        s = [],
        r = {},
        l = {},
        o = {};
      return (
        n &&
          n.forEach((i) => {
            const c = `rule_${Math.random().toString(36).substring(2, 8)}`;
            s.push(c),
              console.log(i),
              (l[c] = []),
              "leftValue" in i &&
                (l[c].push(i.leftValue), (r[`${c}_name`] = i.leftValue)),
              "rightValue" in i &&
                (l[c].push(i.rightValue), (r[`${c}_value`] = i.rightValue)),
              "operator" in i &&
                (r[`${c}_operator`] = {
                  type: i.operator.type,
                  operation: i.operator.operation,
                  singleValue: !0,
                }),
              "renameOutput" in i &&
                ((r[`${c}_isRename`] = i.renameOutput),
                (o[c] = i.renameOutput)),
              "outputKey" in i && (r[`${c}_renameOutput`] = i.outputKey);
          }),
        {
          mode: e?.parameters?.mode,
          rulesIds: s,
          rulesData: r,
          onlyNameAndValueForMatching: l,
          renameOutput: o,
        }
      );
    }
  };
function Ru() {
  const {
      formData: e,
      setFormData: t,
      currentFormConfig: n,
      nodes: s,
      setNodes: r,
      edges: l,
      setEdges: o,
    } = ie(),
    [i, c] = k(Xn[0].value),
    [p, u] = k([]),
    [m, v] = k({}),
    [_, E] = k([]),
    [w, D] = k([]),
    [T, S] = k({}),
    [h, b] = k({}),
    [x, I] = k({}),
    [A, y] = k({}),
    [g, N] = k(""),
    C = new Set(),
    $ = () => {
      D(Gl), E([]), u([]), c(Xn[0].value), I({}), y({}), S({}), b({}), v({});
    },
    f = () => {
      const B = `rule_${Math.random().toString(36).substring(2, 8)}`;
      u((F) => [
        ...F,
        {
          fieldId: B,
          vertexId: s().find((q) => q.id === n().id)?.outputVertexIds[0] || "",
        },
      ]),
        S({ ...T(), [B]: !1 }),
        v({ ...m(), [B]: !0 });
    },
    P = (B, F, q) => {
      b((M) => ({ ...M, [B]: { ...M[B], [F]: q } })),
        h()[B] &&
          (h()[B].name === h()[B].value
            ? v({ ...m(), [B]: !0 })
            : v({ ...m(), [B]: !1 }));
    },
    V = (B) => {
      r(
        s().map((q) =>
          q.id === n().id
            ? {
                ...q,
                outputVertexIds: [...q.outputVertexIds, B],
                numberOutputs: p().length,
              }
            : q
        )
      );
      const F = s().find((q) => q.id === n().id);
      F &&
        F.outputVertexIds.forEach((q) => {
          console.log("from increase vertex ids", q);
          const M = document.getElementById(q);
          console.log("from vertex Ref", M);
          const {
              left: G,
              right: X,
              top: Y,
              bottom: re,
            } = M.getBoundingClientRect(),
            U = G + Math.abs(G - X) / 2,
            Q = Y + Math.abs(Y - re) / 2;
          console.log("from center", { x: U, y: Q }),
            l()
              .filter((z) => z.outputVertexId === q)
              .forEach((z) => {
                z.currStartPosition.set({ x: U, y: Q });
              }),
            o([...l()]);
        });
    },
    R = (B) => {
      r(
        s().map((F) =>
          F.id === n().id
            ? {
                ...F,
                outputVertexIds: [...F.outputVertexIds.filter((q) => q !== B)],
                numberOutputs: p().length,
              }
            : F
        )
      );
    },
    H = (B, F) => {
      if (B === F) return !0;
      if (typeof B != typeof F || B === null || F === null) return !1;
      if (
        typeof B == "object" &&
        typeof F == "object" &&
        JSON.stringify(B) === JSON.stringify(F)
      )
        return !0;
      if (Array.isArray(B) && Array.isArray(F)) {
        if (B.length !== F.length) return !1;
        for (let q = 0; q < B.length; q++) if (!H(B[q], F[q])) return !1;
        return !0;
      }
      if (Array.isArray(B) || Array.isArray(F)) return !1;
      if (typeof B == "object" && typeof F == "object") {
        const q = Object.keys(B),
          M = Object.keys(F);
        if (q.length !== M.length) return !1;
        for (let G of q) if (!F.hasOwnProperty(G) || !H(B[G], F[G])) return !1;
        return !0;
      }
      return !1;
    },
    J = (B) => A()[B],
    j = (B, F) => {
      if (
        (console.log("from data handler raw >>>> ", B, " >>>>> ", F),
        console.log("before check: previous data from dataHandler", A()),
        B in A())
      ) {
        if (H(A()[B], F)) {
          console.log(
            "from data handler:::: >> previous Data,>>> data unchanged, key unchanged",
            x()
          ),
            I((q) => ({ ...q, [B]: F })),
            console.log(
              "from data handler:::: >> submitted data from previous data >>> data unchanged, key unchanged",
              x()
            ),
            console.log(
              "from data handler:::: >> forms data  >>> data unchanged, key unchanged",
              e()
            );
          return;
        } else if (!H(J(B), F)) {
          console.log(
            "from data handler, 2,>>> key unchanged but data changed",
            A()
          ),
            console.log(
              "from data handler:::: >> submitted data 1 >>> key unchanged but data changed",
              x()
            ),
            I((M) => ({ ...M, [B]: F })),
            console.log(
              "from data handler:::: >> submitted data 2 >>> key unchanged but data changed",
              x()
            );
          const q = rn(x(), n().id);
          console.log(
            "from data handler:::: >> formatted key >>>  unchanged but data changed",
            q
          ),
            t({ ...e(), [n().id]: q }),
            console.log(
              "from data handler:::: >> formData() >>> key unchanged but data changed",
              e()
            );
        }
      } else {
        console.log("from data handler, 2 >>> both key and data changed", A()),
          console.log(
            "from data handler:::: >> submitted data 1  >>> both key and data changed",
            x()
          ),
          I((M) => ({ ...M, [B]: F })),
          console.log(
            "from data handler:::: >> submitted data 2 >>> both key and data changed",
            x()
          );
        const q = rn(x(), n().id);
        console.log(
          "from data handler:::: >> formatted >>> both key and data changed",
          q
        ),
          t({ ...e(), [n().id]: q }),
          console.log(
            "from data handler:::: >> formData() >>> both key and data changed",
            e()
          );
      }
    },
    K = (B) => {
      console.log("from data remover raw >>>> ", B, " >>>>>> "),
        I((q) =>
          Object.entries(q).reduce(
            (M, [G, X]) => (G.includes(B) || (M[G] = X), M),
            {}
          )
        ),
        console.log(" from data remover >>>> previous data", x());
      const F = rn(x(), n().id);
      console.log("from data remover >>>>> formattedPrev", F),
        t({ ...e(), [n().id]: F }),
        console.log("from data remover >>> form data", e());
    };
  return (
    be(() => {
      if (
        (console.log(
          n().id,
          "  >  node data  >  ",
          `
`,
          _()
        ),
        console.log(">>>>>>.>>>>>>>>>>>>>>>>>.>>>>>>>>>>>>>>>>>>>>>>>>>"),
        console.log(A(), "from outside"),
        !C.has(n().id))
      ) {
        C.clear(), C.add(n().id), N(n().id);
        const B = e()[n().id];
        if ((console.log("data1", B), $(), !B)) {
          f();
          return;
        }
        console.log("data2", B);
        const F = Bu(B);
        F &&
          (console.log(
            "decoded from observer, >>>>>> ",
            n().id,
            F.rulesIds,
            F.rulesData
          ),
          c(F.mode ?? ""),
          y((q) => ({ ...q, mode: F.mode, ...F.rulesData })),
          console.log(A(), "from inside"),
          console.log(F.rulesData, "from inside createEffect"),
          S(F.renameOutput),
          console.log("previous setField in effect"),
          u((q) => {
            const M = s().find((G) => G.id === n().id)?.outputVertexIds;
            return (
              console.log("from setField and into createEffect", M),
              F.rulesIds.length === M?.length
                ? F.rulesIds.map((G, X) => ({ fieldId: G, vertexId: M[X] }))
                : (M ?? []).map((G, X) => ({
                    fieldId: F.rulesIds[X],
                    vertexId: G,
                  }))
            );
          }),
          console.log("after setField in effect", p()));
      }
    }),
    {
      selectedOptions: _,
      setSelectedOptions: E,
      dataInsertHandler: j,
      previousData: A,
      dataRemoveHandler: K,
      currentMode: i,
      setCurrentMode: c,
      field: p,
      setField: u,
      uniqueKey: g,
      renameOutput: T,
      setRenameOutput: S,
      inputStore: h,
      setInputStore: b,
      switchOptions: w,
      setSwitchOptions: D,
      matchInput: m,
      setMatchInput: v,
      handleRoutingRulesNameValueMatch: P,
      handleIncreaseSwitchNodeVertex: V,
      handleDecreaseSwitchNodeVertex: R,
      addInitialField: f,
      getValue: J,
    }
  );
}
var qu = O("<div class=mt-5>"),
  Hu = O('<div class="label hr-solid-line">Routing Rules'),
  ju = O('<div class=mt-5><div class="flex flex-col gap-8">'),
  zu = O(
    '<div class=mt-5><div class="label hr-solid-line">Options</div><div class="mt-5 flex flex-col gap-6"></div><div>'
  ),
  Wu = O("<div class=space-y-5><div></div><div>"),
  Ku = O("<form id=switchForm><div><div class=mt-5>"),
  Uu = O(
    '<div class="text-[#9c9c9e] text-center text-sm border border-[#9c9c9e] p-4 rounded-md border-dashed">Currently no items exist'
  ),
  Gu = O(
    '<div class="text-[#7c81ca] text-xs bg-[#504f7e] p-1 w-4 h-4 font-[900] rounded-full flex items-center justify-center">'
  ),
  Xu = O("<div class=mt-4>"),
  Yu = O(
    '<div><div class="flex flex-col items-center gap-1"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-grab active:cursor-grabbing bg-[#36373d] p-1 rounded-md"title="Drag to move"></div><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] p-1 rounded-md"></div><div class="w-0.5 h-full bg-[#36373d] rounded-md"></div></div><div class="flex flex-col gap-1.5 w-full"><div class="flex gap-1.5 items-start"><div class="flex flex-col gap-1.5 w-full"><div class="flex gap-1.5"><div class=flex-1></div><div class=min-w-[170px]></div></div><div></div></div><div class="mt-3 select-none"></div></div><div class=mt-5>'
  ),
  Yo = O(
    '<div class="flex gap-1.5"><div class="text-[#6f6f70] h-fit hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] p-1 rounded-md"></div><div class=flex-1>'
  );
const Ju = (e) => {
  const { currentFormConfig: t, formData: n, setFormData: s } = ie(),
    {
      selectedOptions: r,
      setSelectedOptions: l,
      dataInsertHandler: o,
      dataRemoveHandler: i,
      currentMode: c,
      setCurrentMode: p,
      field: u,
      setField: m,
      uniqueKey: v,
      renameOutput: _,
      setRenameOutput: E,
      switchOptions: w,
      setSwitchOptions: D,
      matchInput: T,
      setMatchInput: S,
      handleRoutingRulesNameValueMatch: h,
      handleDecreaseSwitchNodeVertex: b,
      handleIncreaseSwitchNodeVertex: x,
      getValue: I,
      previousData: A,
    } = Ru();
  Ie(() => {
    D(Gl), u().length <= 0;
  });
  const y = (g) => {
    g.preventDefault();
    const N = new FormData(g.target);
    let C = Object.fromEntries(N.entries());
    const $ = rn(C, t().id);
    s({ ...n(), switchNode: $ });
    const f = new CustomEvent("formSubmitEvent", { detail: C, bubbles: !0 }),
      P = document.getElementById("submitBtn");
    P && P.dispatchEvent(f);
  };
  return (() => {
    var g = Ku(),
      N = g.firstChild,
      C = N.firstChild;
    return (
      g.addEventListener("submit", y),
      a(
        N,
        d(we, {
          get name() {
            return `${v()}_mode`;
          },
          title: "Mode",
          get uniqueKey() {
            return v();
          },
          options: Xn,
          get defaultValue() {
            return A().mode;
          },
          onChange: ($) => {
            p($.value), o("mode", $.value);
          },
        }),
        C
      ),
      a(
        C,
        d(te, {
          get when() {
            return c() === "Rules";
          },
          get children() {
            return [
              Hu(),
              (() => {
                var $ = ju(),
                  f = $.firstChild;
                return (
                  a(
                    $,
                    (() => {
                      var P = oe(() => u().length <= 0);
                      return () => P() && Uu();
                    })(),
                    f
                  ),
                  a(
                    f,
                    d(ae, {
                      get each() {
                        return u();
                      },
                      children: (P, V) =>
                        (() => {
                          var R = Yu(),
                            H = R.firstChild,
                            J = H.firstChild,
                            j = J.nextSibling,
                            K = H.nextSibling,
                            B = K.firstChild,
                            F = B.firstChild,
                            q = F.firstChild,
                            M = q.firstChild,
                            G = M.nextSibling,
                            X = q.nextSibling,
                            Y = F.nextSibling,
                            re = B.nextSibling;
                          return (
                            a(J, d(xt, {})),
                            (j.$$click = () => {
                              m(u().filter((U, Q) => U.fieldId !== P.fieldId)),
                                b(P.vertexId),
                                i(P.fieldId);
                            }),
                            a(j, d(pe, {})),
                            a(
                              M,
                              d(se, {
                                placeholder: "name",
                                get name() {
                                  return `${P.fieldId}_name`;
                                },
                                get value() {
                                  return I(`${P.fieldId}_name`) || "";
                                },
                                get uniqueKey() {
                                  return v();
                                },
                                isArrow: !0,
                                onInput: (U) => {
                                  h(P.fieldId, "name", U),
                                    o(`${P.fieldId}_name`, U);
                                },
                              })
                            ),
                            a(
                              G,
                              d(Fu, {
                                get name() {
                                  return `${P.fieldId}_type`;
                                },
                                options: Mn,
                                get uniqueKey() {
                                  return v();
                                },
                                get defaultValue() {
                                  return oe(
                                    () => !!I(`${P.fieldId}_operator`)
                                  )()
                                    ? {
                                        parentOption: I(`${P.fieldId}_operator`)
                                          .type,
                                        childOption: I(`${P.fieldId}_operator`)
                                          .operation,
                                      }
                                    : {
                                        parentOption: Mn[0].value || "",
                                        childOption:
                                          Mn[0].children?.[3].value || "",
                                      };
                                },
                                categoryLabel: "Back to main",
                                onChange: (U) => {
                                  console.log(U),
                                    o(`${P.fieldId}_operator`, {
                                      type: U.parentOption,
                                      operation: U.childOption.value,
                                      singleValue: !0,
                                    });
                                },
                              })
                            ),
                            a(
                              X,
                              d(se, {
                                placeholder: "value",
                                get name() {
                                  return `${P.fieldId}_value`;
                                },
                                get value() {
                                  return I(`${P.fieldId}_value`) || "";
                                },
                                get uniqueKey() {
                                  return v();
                                },
                                isArrow: !0,
                                onInput: (U) => {
                                  h(P.fieldId, "value", U),
                                    o(`${P.fieldId}_value`, U);
                                },
                              })
                            ),
                            a(
                              Y,
                              d(Re, {
                                get content() {
                                  return `This condition is ${
                                    T()[P.fieldId]
                                  } for the first input item`;
                                },
                                get children() {
                                  var U = Gu();
                                  return (
                                    a(
                                      U,
                                      d(te, {
                                        get when() {
                                          return T()[P.fieldId] === !0;
                                        },
                                        children: "✔",
                                      }),
                                      null
                                    ),
                                    a(
                                      U,
                                      d(te, {
                                        get when() {
                                          return T()[P.fieldId] === !1;
                                        },
                                        children: "✘",
                                      }),
                                      null
                                    ),
                                    U
                                  );
                                },
                              })
                            ),
                            a(
                              re,
                              d(_e, {
                                get checked() {
                                  return I(`${P.fieldId}_isRename`);
                                },
                                get uniqueKey() {
                                  return v();
                                },
                                title: "Rename Output",
                                get name() {
                                  return `${P.fieldId}_isRename`;
                                },
                                onChange: (U) => {
                                  E({ ..._(), [P.fieldId]: U }),
                                    o(`${P.fieldId}_isRename`, U);
                                },
                              })
                            ),
                            a(
                              K,
                              d(te, {
                                get when() {
                                  return _()[P.fieldId];
                                },
                                get children() {
                                  var U = Xu();
                                  return (
                                    a(
                                      U,
                                      d(se, {
                                        get name() {
                                          return `${P.fieldId}_renameOutput`;
                                        },
                                        get value() {
                                          return (
                                            I(`${P.fieldId}_renameOutput`) || ""
                                          );
                                        },
                                        get uniqueKey() {
                                          return v();
                                        },
                                        title: "Output Name",
                                        toolTipText:
                                          "The label of output to which to send data to if rule matches.",
                                        isArrow: !0,
                                        onInput: (Q) => {
                                          o(`${P.fieldId}_renameOutput`, Q);
                                        },
                                      })
                                    ),
                                    U
                                  );
                                },
                              }),
                              null
                            ),
                            W(() =>
                              L(
                                R,
                                `flex gap-1.5 ${
                                  V() !== 0
                                    ? "border-t pt-8 border-dashed border-[#575555]"
                                    : ""
                                }`
                              )
                            ),
                            R
                          );
                        })(),
                    })
                  ),
                  a(
                    $,
                    d(lt, {
                      onClick: () => {
                        const P = `rule_${Math.random()
                            .toString(36)
                            .substring(2, 8)}`,
                          V = `vertex_${Math.random()
                            .toString(36)
                            .substring(2, 8)}`;
                        m((R) => [...R, { fieldId: P, vertexId: V }]),
                          E({ ..._(), [P]: !1 }),
                          S({ ...T(), [P]: !0 }),
                          x(V);
                      },
                      label: "Add Pool Time",
                    }),
                    null
                  ),
                  $
                );
              })(),
              (() => {
                var $ = qu();
                return (
                  a(
                    $,
                    d(_e, {
                      get checked() {
                        return I("convertTypeWhereRequired");
                      },
                      name: "convertTypeWhereRequired",
                      title: "Convert Type Where Required",
                      toolTipText: `If the type of an expression doesn't match the type of the comparison, n8n will try to cast the expression to the required type. E.g. for booleans "false" or 0 will be cast to false.`,
                      onChange: (f) => {},
                    })
                  ),
                  $
                );
              })(),
              (() => {
                var $ = zu(),
                  f = $.firstChild,
                  P = f.nextSibling,
                  V = P.nextSibling;
                return (
                  a(
                    P,
                    d(ae, {
                      get each() {
                        return r();
                      },
                      children: (R, H) => {
                        if (R.content.type === "switch")
                          return (() => {
                            var J = Yo(),
                              j = J.firstChild,
                              K = j.nextSibling;
                            return (
                              (j.$$click = () => {
                                l(r().filter((B) => B.value !== R.value)),
                                  D([...w(), R]),
                                  i(R.value);
                              }),
                              a(j, d(pe, {})),
                              a(
                                K,
                                d(_e, {
                                  get checked() {
                                    return I(R.content.name);
                                  },
                                  get uniqueKey() {
                                    return v();
                                  },
                                  get title() {
                                    return R.content.title ?? "";
                                  },
                                  get toolTipText() {
                                    return R.content.toolTipText ?? "";
                                  },
                                  get name() {
                                    return R.content.name;
                                  },
                                  onChange: (B) => {
                                    o(R.content.name, B);
                                  },
                                })
                              ),
                              J
                            );
                          })();
                        if (R.content.type === "DropDownN")
                          return (() => {
                            var J = Yo(),
                              j = J.firstChild,
                              K = j.nextSibling;
                            return (
                              (j.$$click = () => {
                                l(r().filter((B) => B.value !== R.value)),
                                  D([...w(), R]),
                                  i(R.value);
                              }),
                              a(j, d(pe, {})),
                              a(
                                K,
                                d(we, {
                                  get name() {
                                    return R.content.name;
                                  },
                                  get title() {
                                    return R.content.title;
                                  },
                                  get toolTipText() {
                                    return R.content.toolTipText;
                                  },
                                  get options() {
                                    return R.content.options ?? [];
                                  },
                                  get uniqueKey() {
                                    return v();
                                  },
                                  get defaultValue() {
                                    return (
                                      I(R.content.name) ||
                                      R.content.options?.[0]?.value
                                    );
                                  },
                                  onChange: (B) => {
                                    o(R.content.name, B.value);
                                  },
                                })
                              ),
                              J
                            );
                          })();
                      },
                    })
                  ),
                  a(
                    V,
                    d(Me, {
                      name: "options_switch_node",
                      selectedOptions: r,
                      setSelectedOptions: l,
                      dropdownOptions: w,
                      setDropdownOptions: D,
                      placeholder: "Add options",
                      onChange: (R) => {},
                    })
                  ),
                  W(() => L(V, `${r().length <= 0 ? "" : "mt-5"}`)),
                  $
                );
              })(),
            ];
          },
        }),
        null
      ),
      a(
        C,
        d(te, {
          get when() {
            return c() === "Expression";
          },
          get children() {
            var $ = Wu(),
              f = $.firstChild,
              P = f.nextSibling;
            return (
              a(
                f,
                d(se, {
                  name: "numberOfOutputs",
                  title: "Number of Outputs",
                  toolTipText: "How many outputs to create",
                  get uniqueKey() {
                    return v();
                  },
                  get value() {
                    return I("numberOfOutputs") || "";
                  },
                  onInput: (V) => {
                    o("numberOfOutputs", V);
                  },
                })
              ),
              a(
                P,
                d(se, {
                  name: "outputIndex",
                  title: "Output Index",
                  placeholder: "{{}}",
                  get value() {
                    return I("outputIndex") || "";
                  },
                  get uniqueKey() {
                    return v();
                  },
                  footNote: "[ERROR: invalid syntax]",
                  toolTipText:
                    "The output index to send the input item to. Use an expression to calculate which input item should be routed to which output. The expression must return a number.",
                  isExpand: !0,
                  isArrow: !0,
                  onInput: (V) => {
                    o("outputIndex", V);
                  },
                })
              ),
              a(
                $,
                d(_e, {
                  get checked() {
                    return I("convertTypeWhereRequired");
                  },
                  name: "convertTypeWhereRequired",
                  title: "Convert Type Where Required",
                  toolTipText: `If the type of an expression doesn't match the type of the comparison, n8n will try to cast the expression to the required type. E.g. for booleans "false" or 0 will be cast to false.`,
                  onChange: (V) => {
                    o("convertTypeWhereRequired", V);
                  },
                }),
                null
              ),
              $
            );
          },
        }),
        null
      ),
      g
    );
  })();
};
ge(["click"]);
const Yn = (e, t) => {
    const { nodes: n } = ie(),
      s = () => {
        const r = n().find((l) => l.id === t);
        if (r) return r.currPosition.get();
      };
    return {
      id: t,
      name: "Vector Store Tool",
      description: "vectore store tool customerSuppertDocs",
      type: "VectoreStoreTool",
      parameters: {
        name: e?.dataName,
        description: e?.dataDescription,
        limit: e?.limit,
      },
      position: s(),
      inputs: [
        {
          id: "input",
          name: "Input",
          description: "data coming from pg vector store node",
          type: "tool",
        },
      ],
      outputs: [
        {
          id: "chatModel",
          name: "toChatModel3",
          description: "data sending to ollama model 3",
          type: "object",
        },
        {
          id: "vectorStore",
          name: "toPgVectorStore",
          description: "data sending to pgvector",
          type: "object",
        },
      ],
    };
  },
  Qu = (e) => {
    if (e) {
      const { parameters: t } = e;
      return {
        dataName: t?.name,
        dataDescription: t?.description,
        limit: t?.limit,
      };
    }
  };
function Zu() {
  const { formData: e, setFormData: t, currentFormConfig: n } = ie(),
    [s, r] = k({}),
    [l, o] = k({}),
    [i, c] = k(""),
    p = new Set(),
    u = () => {
      r({}), o({});
    },
    m = (v, _) => {
      if (
        (console.log("from data handler raw >>>> ", v, " >>>>> ", _),
        console.log("before check: previous data from dataHandler", l()),
        v in l())
      ) {
        if (l()[v] === _) {
          console.log(
            "from data handler:::: >> previous Data,>>> data unchanged, key unchanged",
            s()
          ),
            r((E) => ({ ...E, [v]: _ })),
            console.log(
              "from data handler:::: >> submitted data from previous data >>> data unchanged, key unchanged",
              s()
            );
          return;
        } else if (l()[v] !== _) {
          console.log(
            "from data handler, 2,>>> key unchanged but data changed",
            l()
          ),
            console.log(
              "from data handler:::: >> submitted data 1 >>> key unchanged but data changed",
              s()
            ),
            r((w) => ({ ...w, [v]: _ })),
            console.log(
              "from data handler:::: >> submitted data 2 >>> key unchanged but data changed",
              s()
            );
          const E = Yn(s(), n().id);
          console.log(
            "from data handler:::: >> formatted key >>>  unchanged but data changed",
            E
          ),
            t({ ...e(), [n().id]: E }),
            console.log(
              "from data handler:::: >> formData() >>> key unchanged but data changed",
              e()
            );
        }
      } else {
        console.log("from data handler, 2 >>> both key and data changed", l()),
          console.log(
            "from data handler:::: >> submitted data 1  >>> both key and data changed",
            s()
          ),
          r((w) => ({ ...w, [v]: _ })),
          console.log(
            "from data handler:::: >> submitted data 2 >>> both key and data changed",
            s()
          );
        const E = Yn(s(), n().id);
        console.log(
          "from data handler:::: >> formatted >>> both key and data changed",
          E
        ),
          t({ ...e(), [n().id]: E }),
          console.log(
            "from data handler:::: >> formData() >>> both key and data changed",
            e()
          );
      }
    };
  return (
    be(() => {
      if (
        (console.log(
          n().id,
          "  >  node data  >  ",
          `
`
        ),
        console.log(">>>>>>.>>>>>>>>>>>>>>>>>.>>>>>>>>>>>>>>>>>>>>>>>>>"),
        console.log(l(), "from outside"),
        !p.has(n().id))
      ) {
        p.clear(), p.add(n().id), c(n().id);
        const v = e()[n().id];
        if ((console.log("data1", v), u(), !v)) return;
        console.log("data2", v);
        const _ = Qu(v);
        _ &&
          (console.log("decoded from observer, >>>>>> ", n().id),
          o((E) => ({ ...E, ..._ })),
          console.log(l(), "from inside"));
      }
    }),
    { dataInsertHandler: m, previousData: l, uniqueKey: i }
  );
}
var ep = O("<form id=vector-storeForm><div class=space-y-6>");
const tp = (e) => {
    const { currentFormConfig: t, setFormData: n, formData: s } = ie(),
      { dataInsertHandler: r, previousData: l, uniqueKey: o } = Zu(),
      i = (c) => {
        c.preventDefault();
        const p = new FormData(c.target);
        let u = Object.fromEntries(p.entries());
        const m = Yn(u, t().id);
        n({ ...s(), [t().id]: m });
      };
    return (() => {
      var c = ep(),
        p = c.firstChild;
      return (
        c.addEventListener("submit", i),
        a(
          p,
          d(se, {
            name: "dataName",
            title: "Data Name",
            placeholder: "e.g. user_info",
            get value() {
              return l().dataName;
            },
            get uniqueKey() {
              return o();
            },
            toolTipText:
              "Name of the data in vector store. This will be used to fill this tool description: Useful for when you need to answer questions about [name]. Whenever you need information about [data description], you should ALWAYS use this. Input should be a fully formed question.",
            isArrow: !0,
            onInput: (u) => {
              r("dataName", u);
            },
          }),
          null
        ),
        a(
          p,
          d(We, {
            name: "dataDescription",
            title: "Description of Data",
            get uniqueKey() {
              return o();
            },
            get value() {
              return l().dataDescription;
            },
            placeholder:
              "[describe your data here, e.g. a user's name, email e.t.c]",
            toolTipText:
              "Describe the data in vector store. This will be used to fill this tool description: Useful for when you need to answer questions about [name]. Whenever you need information about [data description], you should ALWAYS use this. Input should be a fully formed question.",
            onInput: (u) => {
              r("dataDescription", u);
            },
          }),
          null
        ),
        a(
          p,
          d(se, {
            name: "limit",
            title: "Limit",
            toolTipText: "The maximum number of results to return",
            get uniqueKey() {
              return o();
            },
            get value() {
              return l().limit;
            },
            isArrow: !0,
            isExpand: !0,
            onInput: (u) => {
              r("limit", u);
            },
          }),
          null
        ),
        c
      );
    })();
  },
  Jn = [
    {
      label: "Get Many",
      value: "getMany",
      description: "Get many ranked documents from vector store for query.",
      children: [
        {
          type: "dynamicInput",
          title: "TableName",
          toolTipText:
            "The table name to store the vectors in. If table does not exist, it will be created.",
        },
        {
          type: "dynamicInput",
          title: "Prompt",
          toolTipText:
            "Search prompt to retrieve matching documents from the vector store using similarity-based ranking.",
        },
        {
          type: "dynamicInput",
          title: "Limit",
          value: "10",
          toolTipText: "Number of top results to fetch from vector store.",
        },
        {
          type: "switch",
          title: "Include Metadata",
          toolTipText: "Whether or not to include document metadata.",
        },
      ],
    },
    {
      label: "Insert Documents",
      value: "insertDocuments",
      description: "Insert documents into vector store.",
      children: [
        {
          type: "dynamicInput",
          title: "TableName",
          toolTipText:
            "The table name to store the vectors in. If table does not exist, it will be created.",
        },
      ],
    },
    {
      label: "Retrieve Documents (As Vector Store for Chain/Tool)",
      value: "retrieveDocumentsAsVectorStore",
      description:
        "Retrieve documents from vector store to be used as vector store with AI nodes.",
      children: [
        {
          type: "textBlock",
          placeholder:
            "This node must be connected to a vector store retriever. Insert one",
        },
        {
          type: "dynamicInput",
          title: "TableName",
          toolTipText:
            "The table name to store the vectors in. If table does not exist, it will be created.",
        },
      ],
    },
    {
      label: "Retrieve Documents (As Tool for AI Agent)",
      value: "retrieveDocumentsAsTool",
      description:
        "Retrieve documents from vector store to be used as tool with AI nodes.",
      children: [
        {
          type: "dynamicInput",
          title: "Name",
          toolTipText: "name of the vector store.",
          placeholder: "e.g. company_knowledge_base",
        },
        {
          type: "textArea",
          title: "Description",
          toolTipText:
            "Explain to the LLM what this tool does, a good, specific description would allow LLMs to produce expected results much more often.",
          placeholder:
            "e.g. work with your data in postgresql with the PgVector extension.",
        },
        {
          type: "dynamicInput",
          title: "Limit",
          value: "10",
          toolTipText: "Number of top results to fetch from vector store.",
        },
        {
          type: "dynamicInput",
          title: "TableName",
          toolTipText:
            "The table name to store the vectors in. If table does not exist, it will be created.",
        },
      ],
    },
  ],
  np = [
    { title: "ID Column name", value: "idColumnName", name: "idColumnName" },
    {
      title: "Vector Column Name",
      value: "embedding",
      name: "vectorColumnName",
    },
    { title: "Content Column name", value: "text", name: "contentColumnName" },
    {
      title: "Metadata Column name",
      value: "metadata",
      name: "metadataColumnName",
    },
  ],
  op = [
    {
      title: "Collection Name",
      value: "collectionName",
      name: "collectionName",
    },
    {
      title: "Collection Table Name",
      value: "collectionTableName",
      name: "collectionTableName",
    },
  ],
  Mt = [
    {
      label: "Distance Strategy",
      value: "distanceStrategy",
      content: {
        type: "DropDown",
        name: "distanceStrategy",
        title: "Distance Strategy",
        toolTipText: "The method to calculate the distance between two vectors",
        options: [
          { label: "Cosine", value: "cosine" },
          { label: "Euclidean", value: "euclidean" },
          { label: "Inner Product", value: "innerProduct" },
        ],
      },
    },
    {
      label: "Collection",
      value: "collection",
      content: {
        type: "switch",
        name: "useCollection",
        title: "Use Collection",
        toolTipText: "Collection of vector",
      },
    },
    {
      label: "Column Names",
      value: "columnNames",
      content: {
        type: "plainBlock",
        name: "columnNames",
        toolTipText: "The names of the columns in the PGVector table.",
        title: "Column Names",
      },
    },
    {
      label: "Metadata Filter",
      value: "metadataFilter",
      content: {
        type: "incrementBlock",
        name: "metadataFilter",
        title: "Metadata Filter",
        toolTipText: "Metadata to filter the document by.",
      },
    },
  ],
  ln = (e, t) => {
    console.log("from encoder", e), k([]);
    const s = ((i) => {
        const [c, p] = k(1);
        return Object.values(
          Object.entries(i)
            .filter(([u, m]) => u.startsWith("metadata_"))
            .reduce((u, m) => {
              const [v, _] = m,
                E = v.split("_"),
                w = `${E[0]}_${E[1]}`,
                D = E[2];
              return (
                (u[w] ??= {}),
                u[w].id || ((u[w].id = c()), p((T) => T + 1)),
                D === "name"
                  ? (u[w].name = _)
                  : D === "value" && (u[w].value = _),
                u
              );
            }, {})
        );
      })(e),
      r = {
        ...(s?.length > 0 && { metadataFilter: s }),
        ...(e?.useCollection && {
          collection: {
            values: {
              useCollection: e?.useCollection,
              collectionName: e?.collectionName,
              collectionTableName: e?.collectionTableName,
            },
          },
        }),
        ...(e?.idColumnName && {
          columnNames: {
            values: {
              idColumnName: e?.idColumnName,
              vectorColumnName: e?.vectorColumnName,
              contentColumnName: e?.contentColumnName,
              metadataColumnName: e?.metadataColumnName,
            },
          },
        }),
        ...(e?.distanceStrategy && { distanceStrategy: e?.distanceStrategy }),
      },
      { nodes: l } = ie(),
      o = () => {
        const i = l().find((c) => c.id === t);
        if (i) return i.currPosition.get();
      };
    return {
      id: t,
      name: "PGVector Store",
      description: "pgvectore store",
      type: "PGVectorStore",
      parameters: {
        credentials: {
          id: "a",
          name: "Postgres account",
          provider: "postgres",
          ctype: "db",
        },
        operationMode: e?.operationMode,
        tableName: e?.tableName,
        limit: e?.limit,
        prompt: e?.prompt,
        includeMetadata: e?.includeMetadata,
        options: r,
      },
      position: o(),
      inputs: [
        {
          id: "input",
          name: "Input",
          description: "data coming from Vector Store Tool",
          type: "object",
        },
      ],
      outputs: [
        {
          id: "chatModel",
          name: "Output",
          description: "pgVector chat model for embeddings",
          type: "object",
        },
      ],
    };
  },
  rp = (e) => {
    if (e) {
      const { parameters: t } = e,
        n = [],
        s = {};
      if (t) {
        const r = t?.options?.metadataFilter;
        r &&
          r.forEach((l) => {
            console.log("inside metadata Item loop", l);
            const o = `metadata_${Math.random().toString(36).substring(2, 8)}`;
            n.push(o),
              "name" in l && (s[`${o}_name`] = l.name),
              "value" in l && (s[`${o}_value`] = l.value);
          });
      }
      return (
        console.log(
          "from decoder",
          s,
          `
 metadata ids`,
          n
        ),
        {
          operationMode: t.operationMode,
          tableName: t.tableName,
          limit: t.limit,
          prompt: t.prompt,
          includeMetadata: t.includeMetadata,
          metadataIds: n,
          metadataFilter: s || {},
          options: t.options,
        }
      );
    }
  };
function lp() {
  const { formData: e, setFormData: t, currentFormConfig: n } = ie(),
    [s, r] = k(Jn[0].value),
    [l, o] = k([]),
    [i, c] = k([]),
    [p, u] = k([]),
    [m, v] = k(!1),
    [_, E] = k({}),
    [w, D] = k({}),
    [T, S] = k(""),
    h = new Set(),
    b = () => {
      u(Mt), c([]), E({}), D({}), o([]), r(""), v(!1);
    },
    x = (y, g) => {
      if (
        (console.log("from data handler raw >>>> ", y, " >>>>> ", g),
        console.log("before check: previous data from dataHandler", w()),
        y in w())
      ) {
        if (w()[y] === g) {
          console.log(
            "from data handler:::: >> previous Data,>>> data unchanged, key unchanged",
            _()
          ),
            E((N) => ({ ...N, [y]: g })),
            console.log(
              "from data handler:::: >> submitted data from previous data >>> data unchanged, key unchanged",
              _()
            );
          return;
        } else if (w()[y] !== g) {
          console.log(
            "from data handler, 2,>>> key unchanged but data changed",
            w()
          ),
            console.log(
              "from data handler:::: >> submitted data 1 >>> key unchanged but data changed",
              _()
            ),
            E((C) => ({ ...C, [y]: g })),
            console.log(
              "from data handler:::: >> submitted data 2 >>> key unchanged but data changed",
              _()
            );
          const N = ln(_(), n().id);
          console.log(
            "from data handler:::: >> formatted key >>>  unchanged but data changed",
            N
          ),
            t({ ...e(), [n().id]: N }),
            console.log(
              "from data handler:::: >> formData() >>> key unchanged but data changed",
              e()
            );
        }
      } else {
        console.log("from data handler, 2 >>> both key and data changed", w()),
          console.log(
            "from data handler:::: >> submitted data 1  >>> both key and data changed",
            _()
          ),
          E((C) => ({ ...C, [y]: g })),
          console.log(
            "from data handler:::: >> submitted data 2 >>> both key and data changed",
            _()
          );
        const N = ln(_(), n().id);
        console.log(
          "from data handler:::: >> formatted >>> both key and data changed",
          N
        ),
          t({ ...e(), [n().id]: N }),
          console.log(
            "from data handler:::: >> formData() >>> both key and data changed",
            e()
          );
      }
    },
    I = (y) => {
      console.log("from data remover raw >>>> ", y, " >>>>>> "),
        E((N) =>
          Object.entries(N).reduce(
            (C, [$, f]) => (
              $.toLowerCase().includes(y.toLowerCase()) || (C[$] = f), C
            ),
            {}
          )
        ),
        console.log(" from data remover >>>> previous data", _());
      const g = ln(_(), n().id);
      console.log("from data remover >>>>> formattedPrev", g),
        t({ ...e(), [n().id]: g }),
        console.log("from data remover >>> form data", e());
    },
    A = (y, g, N) => {
      console.log(y, "not ok");
      const C = y.flatMap(($) => g.filter((f) => f.value === $));
      console.log(C, "ok"), N(($) => [...$, ...C]);
    };
  return (
    be(() => {
      if (
        (console.log(
          n().id,
          "  >  node data  >  ",
          `
`,
          i()
        ),
        console.log(">>>>>>.>>>>>>>>>>>>>>>>>.>>>>>>>>>>>>>>>>>>>>>>>>>"),
        console.log(w(), "from outside"),
        !h.has(n().id))
      ) {
        h.clear(), h.add(n().id), S(n().id);
        const y = e()[n().id];
        if ((console.log("data1", y), b(), !y)) return;
        console.log("data2", y);
        const g = rp(y);
        g &&
          (console.log(
            "decoded from observer, >>>>>> ",
            n().id,
            g.options,
            g.metadataFilter
          ),
          console.log("from effect test ", {
            ...(g.options.useCollection && {
              ...g.options.useCollection.values,
            }),
          }),
          D((N) => ({
            operationMode: g.operationMode,
            tableName: g.tableName,
            limit: g.limit,
            prompt: g.prompt,
            includeMetadata: g.includeMetadata,
            ...(g.options.distanceStrategy && {
              distanceStrategy: g.options.distanceStrategy,
            }),
            ...(g.options.collection && { ...g.options.collection.values }),
            ...(g.options.columnNames && { ...g.options.columnNames.values }),
            ...g.metadataFilter,
          })),
          console.log(w(), "from inside"),
          console.log(g.metadataFilter, "from inside createEffect"),
          r(g.operationMode),
          o(g.metadataIds),
          A(Object.keys(g.options), Mt, c),
          u(() => Mt.filter((N) => i().every((C) => C.value !== N.value))));
      }
    }),
    {
      selectedOptions: i,
      setSelectedOptions: c,
      dataInsertHandler: x,
      options: p,
      setOptions: u,
      previousData: w,
      dataRemoveHandler: I,
      uniqueKey: T,
      currentOperation: s,
      setCurrentOperation: r,
      metadataFilter: l,
      setMetadataFilter: o,
      isCollection: m,
      setIsCollection: v,
    }
  );
}
var ip = O(
    '<div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100">'
  ),
  ap = O('<a href=# class="font-semibold text-[#fe705a]">Insert one'),
  sp = O(
    '<form id=pg-vectorForm><div class=space-y-5><div class=space-y-5></div><div class=mt-5><div class="label hr-solid-line">Options</div><div class=mt-5><div class=space-y-10></div><div class=mt-5>'
  ),
  dp = O(
    '<div class="group flex items-start gap-1.5 w-full"><div class=flex-1>'
  ),
  cp = O(
    '<div><div class="group flex items-start gap-1.5 w-full"><div class=flex-1><div class="text-[#dbdbdd] border-b-[.4px] border-[#4e4d4d] pb-1">Collection</div><div class="group flex items-start gap-1.5 w-full mt-5"><div class="flex-1 space-y-5">'
  ),
  up = O(
    '<div><div class="group flex items-start gap-1.5 w-full"><div class=flex-1><div class="text-[#dbdbdd] border-b-[.4px] border-[#4e4d4d] pb-1">Column Names</div><div class="group flex items-start gap-1.5 w-full mt-5"><div class="flex-1 space-y-5">'
  ),
  pp = O(
    '<div><div class="group flex items-start gap-1.5 w-full"><div class=flex-1><div class="text-[#dbdbdd] border-b-[.4px] border-[#4e4d4d] pb-1">Metadata Filter</div><div class="group flex items-start gap-1.5 w-full mt-5"><div class="flex-1 space-y-10"><div class></div><div class>'
  ),
  mp = O(
    '<div class="text-[#9c9c9e] text-center text-sm border border-[#9c9c9e] p-4 rounded-md border-dashed">Currently no items exist'
  ),
  gp = O('<div><div class="flex flex-col gap-5 w-full">');
const tt = ({ onClick: e }) =>
    (() => {
      var t = ip();
      return Ae(t, "click", e), a(t, d(pe, {})), t;
    })(),
  hp = (e) => {
    const { currentFormConfig: t, formData: n, setFormData: s } = ie(),
      {
        selectedOptions: r,
        setSelectedOptions: l,
        dataInsertHandler: o,
        options: i,
        setOptions: c,
        previousData: p,
        dataRemoveHandler: u,
        uniqueKey: m,
        currentOperation: v,
        setCurrentOperation: _,
        metadataFilter: E,
        setMetadataFilter: w,
        isCollection: D,
        setIsCollection: T,
      } = lp();
    be(() => {
      v() === "insertDocuments" ? c(Mt.slice(1, 3)) : c(Mt);
    });
    const S = (h) => {
      h.preventDefault();
      const b = new FormData(h.target);
      let x = Object.fromEntries(b.entries());
      const I = ln(x, t().id);
      s({ ...n(), [t().id]: I });
    };
    return (() => {
      var h = sp(),
        b = h.firstChild,
        x = b.firstChild,
        I = x.nextSibling,
        A = I.firstChild,
        y = A.nextSibling,
        g = y.firstChild,
        N = g.nextSibling;
      return (
        h.addEventListener("submit", S),
        a(
          b,
          d(et, {
            name: "credential",
            placeholder: "Select Credential",
            title: "Credential to connect with",
          }),
          x
        ),
        a(
          x,
          d(Te, {
            name: "operationMode",
            title: "Operation Mode",
            get uniqueKey() {
              return m();
            },
            options: Jn,
            get defaultValue() {
              return p().operationMode || Jn[0].value;
            },
            onChange: (C) => {
              _(C.value), o("operationMode", C.value);
            },
          }),
          null
        ),
        a(
          x,
          d(te, {
            get when() {
              return v() === "retrieveDocumentsAsVectorStore";
            },
            get children() {
              return d(qt, {
                get children() {
                  return [
                    "This node must be connected to a vector store retriever.",
                    " ",
                    ap(),
                  ];
                },
              });
            },
          }),
          null
        ),
        a(
          x,
          d(te, {
            get when() {
              return v() === "retrieveDocumentsAsTool";
            },
            get children() {
              return [
                d(se, {
                  name: "name",
                  title: "Name",
                  get uniqueKey() {
                    return m();
                  },
                  get value() {
                    return p().name;
                  },
                  toolTipText: "Name of the vector store.",
                  placeholder: "e.g. company_knowledge_base",
                  isArrow: !0,
                  onInput: (C) => {
                    o("name", C);
                  },
                }),
                d(We, {
                  name: "description",
                  title: "Description",
                  get uniqueKey() {
                    return m();
                  },
                  get value() {
                    return p().name;
                  },
                  toolTipText:
                    "Explain to the LLM what this tool does, a good, specific description would allow LLMs to produce expected results much more often.",
                  placeholder:
                    "e.g. work with your data in postgresql with the PgVector extension.",
                  onInput: (C) => {
                    o("description", C);
                  },
                }),
              ];
            },
          }),
          null
        ),
        a(
          x,
          d(se, {
            name: "tableName",
            title: "Table Name",
            get uniqueKey() {
              return m();
            },
            toolTipText:
              "The table name to store the vectors in. If table does not exist, it will be created.",
            get value() {
              return p().tableName || "repoRunner_vectors";
            },
            isArrow: !0,
            onInput: (C) => {
              o("tableName", C);
            },
          }),
          null
        ),
        a(
          x,
          d(te, {
            get when() {
              return v() === "getMany";
            },
            get children() {
              return d(se, {
                name: "limit",
                title: "Limit",
                get uniqueKey() {
                  return m();
                },
                toolTipText:
                  "Number of top results to fetch from vector store.",
                get value() {
                  return p().limit || "4";
                },
                onInput: (C) => {
                  o("limit", C);
                },
              });
            },
          }),
          null
        ),
        a(
          x,
          d(te, {
            get when() {
              return v() === "getMany";
            },
            get children() {
              return d(se, {
                name: "prompt",
                title: "Prompt",
                get uniqueKey() {
                  return m();
                },
                get value() {
                  return p().prompt || "How Are you?";
                },
                toolTipText:
                  "Search prompt to retrieve matching documents from the vector store using similarity-based ranking.",
                onInput: (C) => {
                  o("prompt", C);
                },
              });
            },
          }),
          null
        ),
        a(
          x,
          d(te, {
            get when() {
              return v() === "getMany" || v() === "retrieveDocumentsAsTool";
            },
            get children() {
              return d(_e, {
                name: "includeMetadata",
                title: "Include Metadata",
                get uniqueKey() {
                  return m();
                },
                get checked() {
                  return p().includeMetadata;
                },
                toolTipText: "Whether or not to include document metadata.",
                onChange: (C) => {
                  o("includeMetadata", C);
                },
              });
            },
          }),
          null
        ),
        a(
          g,
          d(ae, {
            get each() {
              return r();
            },
            children: (C, $) => {
              if (C.value === "distanceStrategy")
                return (() => {
                  var f = dp(),
                    P = f.firstChild;
                  return (
                    a(
                      f,
                      d(tt, {
                        onClick: () => {
                          const V = r().filter((R) => R.value !== C.value);
                          l(V), c([...i(), C]), u(C.value);
                        },
                      }),
                      P
                    ),
                    a(
                      P,
                      d(we, {
                        get name() {
                          return C.content.name;
                        },
                        get options() {
                          return C.content.options ?? [];
                        },
                        get defaultValue() {
                          return (
                            p()[C.content.name] || C.content.options?.[0]?.value
                          );
                        },
                        get uniqueKey() {
                          return m();
                        },
                        get toolTipText() {
                          return C.content.toolTipText;
                        },
                        get title() {
                          return C.content.title;
                        },
                        onChange: (V) => {
                          o(C.content.name, V.value);
                        },
                      })
                    ),
                    f
                  );
                })();
              if (C.value === "collection")
                return (() => {
                  var f = cp(),
                    P = f.firstChild,
                    V = P.firstChild,
                    R = V.firstChild,
                    H = R.nextSibling,
                    J = H.firstChild;
                  return (
                    a(
                      P,
                      d(tt, {
                        onClick: () => {
                          const j = r().filter((K) => K.value !== C.value);
                          l(j), c([...i(), C]), u(C.value);
                        },
                      }),
                      V
                    ),
                    a(
                      H,
                      d(tt, {
                        onClick: () => {
                          const j = r().filter((K) => K.value !== C.value);
                          l(j), c([...i(), C]), u(C.value);
                        },
                      }),
                      J
                    ),
                    a(
                      J,
                      d(_e, {
                        get uniqueKey() {
                          return m();
                        },
                        get checked() {
                          return p()[C.content.name];
                        },
                        get name() {
                          return C.content.name;
                        },
                        get title() {
                          return C.content.title ?? "";
                        },
                        onChange: (j) => {
                          T(j), o(C.content.name, j);
                        },
                      }),
                      null
                    ),
                    a(
                      J,
                      d(te, {
                        get when() {
                          return D();
                        },
                        get children() {
                          return d(ae, {
                            each: op,
                            children: (j, K) =>
                              d(se, {
                                get name() {
                                  return j.name;
                                },
                                get value() {
                                  return p()[j.name] || "---";
                                },
                                get title() {
                                  return j.title;
                                },
                                get uniqueKey() {
                                  return m();
                                },
                                isArrow: !0,
                                onInput: (B) => {
                                  o(j.name, B);
                                },
                              }),
                          });
                        },
                      }),
                      null
                    ),
                    f
                  );
                })();
              if (C.value === "columnNames")
                return (() => {
                  var f = up(),
                    P = f.firstChild,
                    V = P.firstChild,
                    R = V.firstChild,
                    H = R.nextSibling,
                    J = H.firstChild;
                  return (
                    a(
                      P,
                      d(tt, {
                        onClick: () => {
                          const j = r().filter((K) => K.value !== C.value);
                          l(j), c([...i(), C]), u(C.value);
                        },
                      }),
                      V
                    ),
                    a(
                      H,
                      d(tt, {
                        onClick: () => {
                          const j = r().filter((K) => K.value !== C.value);
                          l(j), c([...i(), C]), u(C.value);
                        },
                      }),
                      J
                    ),
                    a(
                      J,
                      d(ae, {
                        each: np,
                        children: (j, K) =>
                          d(se, {
                            get name() {
                              return j.name;
                            },
                            get value() {
                              return p()[j.name] || "---";
                            },
                            get title() {
                              return j.title;
                            },
                            get uniqueKey() {
                              return m();
                            },
                            isArrow: !0,
                            onInput: (B) => {
                              o(j.name, B);
                            },
                          }),
                      })
                    ),
                    f
                  );
                })();
              if (C.value === "metadataFilter")
                return (() => {
                  var f = pp(),
                    P = f.firstChild,
                    V = P.firstChild,
                    R = V.firstChild,
                    H = R.nextSibling,
                    J = H.firstChild,
                    j = J.firstChild,
                    K = j.nextSibling;
                  return (
                    a(
                      P,
                      d(tt, {
                        onClick: () => {
                          const B = r().filter((F) => F.value !== C.value);
                          l(B), c([...i(), C]), u("metadata");
                        },
                      }),
                      V
                    ),
                    a(
                      J,
                      (() => {
                        var B = oe(() => E().length <= 0);
                        return () => B() && mp();
                      })(),
                      j
                    ),
                    a(
                      j,
                      d(ae, {
                        get each() {
                          return E();
                        },
                        children: (B, F) =>
                          (() => {
                            var q = gp(),
                              M = q.firstChild;
                            return (
                              a(
                                q,
                                d(tt, {
                                  onClick: () => {
                                    w((G) => G.filter((X) => X !== B)), u(B);
                                  },
                                }),
                                M
                              ),
                              a(
                                M,
                                d(se, {
                                  name: `${B}_name`,
                                  get value() {
                                    return p()[`${B}_name`];
                                  },
                                  title: "Name",
                                  isArrow: !0,
                                  onInput: (G) => {
                                    o(`${B}_name`, G);
                                  },
                                }),
                                null
                              ),
                              a(
                                M,
                                d(se, {
                                  name: `${B}value`,
                                  title: "Value",
                                  get value() {
                                    return p()[`${B}_value`];
                                  },
                                  isArrow: !0,
                                  onInput: (G) => {
                                    o(`${B}_value`, G);
                                  },
                                }),
                                null
                              ),
                              W(() =>
                                L(
                                  q,
                                  `group flex items-start gap-1.5 w-full ${
                                    F() !== 0
                                      ? "border-t border-dashed border-[#727171] pt-8 mt-8"
                                      : ""
                                  }`
                                )
                              ),
                              q
                            );
                          })(),
                      })
                    ),
                    a(
                      K,
                      d(lt, {
                        onClick: () => {
                          w([
                            ...E(),
                            `metadata_${Math.random()
                              .toString(36)
                              .substring(2, 8)}`,
                          ]);
                        },
                        label: "Add Filter Field",
                      })
                    ),
                    f
                  );
                })();
            },
          })
        ),
        a(
          N,
          d(Me, {
            name: "options_edit_node",
            selectedOptions: r,
            setSelectedOptions: l,
            dropdownOptions: i,
            setDropdownOptions: c,
            placeholder: "Add options",
            onChange: (C) => {
              l(C);
            },
          })
        ),
        h
      );
    })();
  };
ge(["click"]);
const Jo = [
    { label: "deepseek-r1:r1.5b", value: "deepseek-r1:r1.5b" },
    { label: "llma 3.2:1b", value: "llma 3.2:1b" },
    { label: "llma 3.2:1b", value: "llma 3.2:1b" },
    { label: "phi4:latest", value: "phi4:latest" },
  ],
  Qn = (e, t) => {
    const { nodes: n } = ie(),
      s = () => {
        const r = n().find((l) => l.id === t);
        if (r) return r.currPosition.get();
      };
    return {
      id: t,
      name: "Embeddings",
      description: "embeddings for PGVectore Store",
      type: "Ollama",
      parameters: {
        credentials: {
          id: "d0rvblltcbtlha4jl3n0",
          name: "Ollama account",
          provider: "ollama",
          ctype: "url",
        },
        model: e?.model,
      },
      position: s(),
      inputs: [],
      outputs: [
        {
          id: "output",
          name: "embeddings vector as output",
          description: "turn text into vectors",
          type: "object",
        },
      ],
    };
  },
  fp = (e) => {
    if (e) {
      const { parameters: t } = e;
      return { model: t?.model };
    }
  };
function vp() {
  const { formData: e, setFormData: t, currentFormConfig: n } = ie(),
    [s, r] = k({}),
    [l, o] = k({}),
    [i, c] = k(""),
    p = new Set(),
    u = () => {
      r({}), o({});
    },
    m = (v, _) => {
      if (
        (console.log("from data handler raw >>>> ", v, " >>>>> ", _),
        console.log("before check: previous data from dataHandler", l()),
        v in l())
      ) {
        if (l()[v] === _) {
          console.log(
            "from data handler:::: >> previous Data,>>> data unchanged, key unchanged",
            s()
          ),
            r((E) => ({ ...E, [v]: _ })),
            console.log(
              "from data handler:::: >> submitted data from previous data >>> data unchanged, key unchanged",
              s()
            );
          return;
        } else if (l()[v] !== _) {
          console.log(
            "from data handler, 2,>>> key unchanged but data changed",
            l()
          ),
            console.log(
              "from data handler:::: >> submitted data 1 >>> key unchanged but data changed",
              s()
            ),
            r((w) => ({ ...w, [v]: _ })),
            console.log(
              "from data handler:::: >> submitted data 2 >>> key unchanged but data changed",
              s()
            );
          const E = Qn(s(), n().id);
          console.log(
            "from data handler:::: >> formatted key >>>  unchanged but data changed",
            E
          ),
            t({ ...e(), [n().id]: E }),
            console.log(
              "from data handler:::: >> formData() >>> key unchanged but data changed",
              e()
            );
        }
      } else {
        console.log("from data handler, 2 >>> both key and data changed", l()),
          console.log(
            "from data handler:::: >> submitted data 1  >>> both key and data changed",
            s()
          ),
          r((w) => ({ ...w, [v]: _ })),
          console.log(
            "from data handler:::: >> submitted data 2 >>> both key and data changed",
            s()
          );
        const E = Qn(s(), n().id);
        console.log(
          "from data handler:::: >> formatted >>> both key and data changed",
          E
        ),
          t({ ...e(), [n().id]: E }),
          console.log(
            "from data handler:::: >> formData() >>> both key and data changed",
            e()
          );
      }
    };
  return (
    be(() => {
      if (
        (console.log(
          n().id,
          "  >  node data  >  ",
          `
`
        ),
        console.log(">>>>>>.>>>>>>>>>>>>>>>>>.>>>>>>>>>>>>>>>>>>>>>>>>>"),
        console.log(l(), "from outside"),
        !p.has(n().id))
      ) {
        p.clear(), p.add(n().id), c(n().id);
        const v = e()[n().id];
        if ((console.log("data1", v), u(), !v)) return;
        console.log("data2", v);
        const _ = fp(v);
        _ &&
          (console.log("decoded from observer, >>>>>> ", n().id),
          o((E) => ({ ...E, model: _.model })),
          console.log(l(), "from inside"));
      }
    }),
    { dataInsertHandler: m, previousData: l, uniqueKey: i }
  );
}
var bp = O("<form id=embeddingForm><div class=space-y-5>");
const xp = (e) => {
    const { currentFormConfig: t, formData: n, setFormData: s } = ie(),
      { dataInsertHandler: r, previousData: l, uniqueKey: o } = vp(),
      i = (c) => {
        c.preventDefault();
        const p = new FormData(c.target);
        let u = Object.fromEntries(p.entries());
        const m = Qn(u, t().id);
        s({ ...n(), [t().id]: m });
      };
    return (() => {
      var c = bp(),
        p = c.firstChild;
      return (
        c.addEventListener("submit", i),
        a(
          p,
          d(et, {
            name: "credential",
            placeholder: "Select Credential",
            title: "Credential to connect with",
          }),
          null
        ),
        a(
          p,
          d(we, {
            name: "model",
            title: "Model",
            get uniqueKey() {
              return o();
            },
            options: Jo,
            get defaultValue() {
              return l().model || Jo[0].value;
            },
            onChange: (u) => {
              r("model", u.value);
            },
          }),
          null
        ),
        c
      );
    })();
  },
  Zn = [
    {
      label: "Set Automatically",
      value: "setAutomatically",
      description: "Automatically set based on resource and option.",
    },
    {
      label: "Set Manually",
      value: "setManually",
      description: "Manually set description.",
    },
  ],
  eo = [
    { label: "Message", value: "message" },
    { label: "Label", value: "label" },
    { label: "Draft", value: "draft" },
    { label: "Thread", value: "thread" },
  ],
  to = {
    type: "switch",
    title: "Simplify",
    name: "simplify",
    toolTipText:
      "Whether to return a simplified version of the response instead of the raw data.",
  },
  Vt = {
    type: "DropDownN",
    title: "Email Type",
    name: "emailType",
    options: [
      { label: "HTML", value: "html" },
      { label: "Text", value: "text" },
    ],
  },
  Qo = {
    type: "dynamicInput",
    title: "To",
    name: "to",
    placeholder: "info@example.com",
    toolTipText:
      "The email addresses of the recipients. Multiple addresses can be separated by a comma. e.g. jay@getsby.com, jon@smith.com.",
  },
  no = {
    type: "dynamicInput",
    title: "Subject",
    name: "subject",
    placeholder: "Hello World!",
  },
  Lt = { type: "dynamicInput", title: "Message", name: "message" },
  Xl = {
    type: "switch",
    name: "returnAll",
    title: "Return All",
    toolTipText: "Whether to return all results or only up to a given limit",
  },
  Yl = {
    type: "dynamicInput",
    name: "limit",
    title: "Limit",
    toolTipText: "Maximum number of results to return",
    value: 10,
  },
  Jl = {
    type: "dynamicInput",
    title: "Label Names or Ids",
    name: "labelNamesOrIds",
  },
  nt = { type: "dynamicInput", name: "messageId", title: "Message ID" },
  yp = [
    {
      label: "Include Spam and Trash",
      value: "includeSpamTrash",
      content: {
        type: "switch",
        name: "includeSpamTrash",
        title: "Include Spam and Trash",
        toolTipText:
          "Whether to include messages from SPAM and TRASH in the results.",
        footNote: "",
        options: [],
        placeholder: "",
      },
    },
    {
      label: "Include Drafts",
      value: "includeDrafts",
      content: {
        type: "switch",
        name: "includeDrafts",
        title: "Include Drafts",
        toolTipText: "Whether to include email drafts in the results.",
        footNote: "",
        options: [],
        placeholder: "",
      },
    },
    {
      label: "Label Names or IDs",
      value: "labelNamesOrIds",
      content: {
        type: "dropdownMultiple",
        name: "labelNamesOrIds",
        title: "Label Names or IDs",
        toolTipText:
          "Only return messages with labels that match all of the specified label IDs. Choose from the list, or specify IDs using an expression.",
        footNote: "",
        options: [
          { label: "INBOX", value: "INBOX" },
          { label: "UNREAD", value: "UNREAD" },
          { label: "STARRED", value: "STARRED" },
          { label: "IMPORTANT", value: "IMPORTANT" },
        ],
        placeholder: "",
      },
    },
    {
      label: "Search",
      value: "search",
      content: {
        type: "dynamicInput",
        name: "Search",
        title: "search",
        toolTipText: "Only return messages matching the specified query",
        footNote: "Use the same format as in the Gmail search box. More info.",
        options: [],
        placeholder: "has:attachment",
      },
    },
    {
      label: "Read Status",
      value: "readStatus",
      content: {
        type: "dropdownN",
        name: "readStatus",
        title: "Read Status",
        toolTipText: "",
        footNote: "Filter emails by whether they have been read or not.",
        options: [
          { label: "unread and read email", value: "unread and read email" },
          { label: "read email only", value: "read email only" },
          { label: "read emails only", value: "read emails only" },
        ],
        placeholder: "",
      },
    },
    {
      label: "Sender",
      value: "sender",
      content: {
        type: "dynamicInput",
        name: "sender",
        title: "Sender",
        toolTipText: "Sender name or email to filter by.",
        footNote: "",
        options: [],
        placeholder: "",
      },
    },
  ],
  oo = [
    {
      value: "Approval",
      label: "Approval",
      description: "User can approve/disapprove from within the message",
    },
    {
      value: "freeText",
      label: "Free Text",
      description: "User can submit a response via a form.",
    },
    {
      label: "Custom Form",
      value: "customForm",
      description: "User can submit a response via a form.",
    },
  ],
  ro = [
    {
      label: "Add Label",
      value: "addLabel",
      children: [
        nt,
        {
          type: "dynamicInput",
          name: "labelNamesOrIds",
          title: "Label Names or IDs",
          toolTipText:
            "Choose from the list, or specify IDs using an expression.",
        },
      ],
    },
    { label: "Delete", value: "delete", children: [nt] },
    { label: "Get", value: "get", children: [nt, to] },
    {
      label: "Get Many",
      value: "getMany",
      children: [
        Xl,
        Yl,
        to,
        { type: "DropDownFilter", name: "Add Filter", title: "Add Filter" },
      ],
    },
    { label: "Mark as Read", value: "markAsRead", children: [nt] },
    { label: "Mark as Unread", value: "markAsUnread", children: [nt] },
    { label: "Remove Label", value: "removeLabel", children: [nt, Jl] },
    { label: "Reply", value: "reply", children: [nt, Vt, Lt] },
    { label: "Send", value: "send", children: [Qo, no, Vt, Lt] },
    {
      label: "Send and Wait for Response",
      value: "sendAndWaitForResponse",
      children: [Qo, no, Vt, Lt],
    },
  ],
  Zo = {
    type: "dynamicInput",
    title: "Label Id",
    name: "labelId",
    toolTipText: "The ID of the label",
  },
  er = {
    type: "dynamicInput",
    title: "Draft ID",
    name: "draftId",
    toolTipText: "The ID of the draft",
    placeholder: "r-52df502d5df55",
  },
  po = { label: "Get Many", value: "getMany", children: [Xl, Yl] },
  wp = [
    {
      label: "Create",
      value: "create",
      children: [
        {
          type: "dynamicInput",
          title: "Name",
          name: "name",
          toolTipText: "Label Name",
          placeholder: "invoice",
        },
      ],
    },
    { label: "Delete", value: "delete", children: [Zo] },
    { label: "Get", value: "get", children: [Zo] },
    po,
  ],
  $p = [
    { label: "Create", value: "create", children: [no, Vt, Lt] },
    { label: "Delete", value: "delete", children: [er] },
    { label: "Get", value: "get", children: [er] },
    po,
  ],
  ot = {
    type: "dynamicInput",
    name: "threadId",
    title: "Thread ID",
    placeholder: "sdf5d7521df78csd",
  },
  _p = [
    {
      label: "Add Label",
      value: "addLabel",
      children: [
        ot,
        {
          type: "dynamicInput",
          name: "labelNamesOrIds",
          title: "Label Names or IDs",
        },
      ],
    },
    { label: "Delete", value: "delete", children: [ot] },
    { label: "Get", value: "get", children: [ot, to] },
    po,
    { label: "Remove Label", value: "removeLabel", children: [ot, Jl] },
    {
      label: "Reply",
      value: "reply",
      children: [
        ot,
        Vt,
        Lt,
        {
          type: "dynamicInput",
          name: "messageSnippetOrId",
          title: "Message Snippet Or ID",
          toolTipText:
            "Choose from the list, or specify an ID using an expression.",
        },
      ],
    },
    { label: "Trash", value: "trash", children: [ot] },
    { label: "Untrash", value: "untrash", children: [ot] },
  ],
  Ql = {
    label: "Attachments",
    value: "attachments",
    content: {
      type: "dynamicInput",
      name: "attachments",
      title: "Attachments",
      toolTipText:
        'Name of the binary properties that contain data to add to email as attachment. Multiple ones can be comma-separated. Reference embedded images or other content within the body of an email message, e.g. <img src="cid:image_1">',
    },
  },
  Zl = {
    label: "BCC Email",
    value: "bccEmail",
    content: {
      type: "dynamicInput",
      name: "bccEmail",
      title: "BCC Email",
      value: "cc@example.com",
      toolTipText: "Email address of BCC recipient",
    },
  },
  ei = {
    label: "CC Email",
    value: "ccEmail",
    content: {
      type: "dynamicInput",
      name: "ccEmail",
      title: "CC Email",
      value: "cc@example.com",
      toolTipText: "Email address of CC recipient",
    },
  },
  ti = {
    label: "Send Replies To",
    value: "sendRepliesTo",
    content: {
      type: "dynamicInput",
      name: "sendRepliesTo",
      title: "Send Replies To",
      toolTipText: "The email address that the reply message is sent to.",
      value: "reply@example.com",
    },
  },
  ni = {
    label: "Attachment Prefix",
    value: "attachmentPrefix",
    content: {
      type: "dynamicInput",
      name: "attachmentPrefix",
      title: "Attachment Prefix",
      toolTipText:
        "Prefix for name of the binary property to which to write the attachment. An index starting with 0 will be added. So if name is 'attachment_' the first attachment is saved to 'attachment_0'.",
      footNote: "",
      options: [],
      placeholder: "attachment_",
      value: "attachment_",
    },
  },
  oi = {
    label: "Download Attachments",
    value: "downloadAttachments",
    content: {
      type: "switch",
      name: "downloadAttachments",
      title: "Download Attachments",
      toolTipText: "Whether the email's attachments will be downloaded",
      footNote: "",
      options: [],
      placeholder: "",
      value: "",
    },
  },
  Tp = [ni, oi],
  Cp = [
    ni,
    oi,
    {
      label: "Include Spam and Trash",
      value: "includeSpamTrash",
      content: {
        type: "switch",
        name: "includeSpamTrash",
        title: "Include Spam and Trash",
        toolTipText:
          "Whether to include messages from SPAM and TRASH in the results.",
        footNote: "",
        options: [],
        placeholder: "",
      },
    },
  ],
  Ip = [
    Ql,
    Zl,
    ei,
    ti,
    {
      label: "From Alias Name or ID",
      value: "fromAliasNameOrId",
      content: {
        type: "dynamicInput",
        name: "fromAliasNameOrId",
        title: "From Alias Name or ID",
        toolTipText:
          "Select the alias to send the email from. Choose from the list, or specify an ID using an expression.",
      },
    },
    {
      label: "Thread ID",
      value: "threadId",
      content: {
        type: "dynamicInput",
        name: "threadId",
        title: "Thread ID",
        toolTipText: "The identifier of the thread to attach the draft",
      },
    },
    {
      label: "To Email",
      value: "toEmail",
      content: {
        type: "dynamicInput",
        name: "toEmail",
        title: "To Email",
        toolTipText:
          "The email addresses of the recipients. Multiple addresses can be separated by a comma. e.g. jay@getsby.com, jon@smith.com.",
        placeholder: "info@example.com",
      },
    },
  ],
  ri = [
    {
      label: "Append n8n Attribution",
      value: "appendAttribution",
      content: {
        type: "switch",
        name: "appendAttribution",
        title: "Append n8n Attribution",
        toolTipText:
          "Whether to include the phrase “This email was sent automatically with n8n” to the end of the email",
      },
    },
    Ql,
    ei,
    Zl,
    {
      label: "Sender Name",
      value: "senderName",
      content: {
        type: "switch",
        name: "senderName",
        title: "Sender Name",
        toolTipText: "The name that will be shown in recipients' inboxes.",
      },
    },
    {
      label: "Reply To Sender Only",
      value: "replyToSenderOnly",
      content: {
        type: "dynamicInput",
        name: "replyToSenderOnly",
        title: "Reply To Sender Only",
        toolTipText:
          "Whether to reply to the sender only or to the entire list of recipients.",
      },
    },
  ],
  Sp = [...ri, ti],
  Pt = [
    { value: "approvedOnly", label: "Approved Only" },
    { value: "approvedAndDisapproved", label: "Approved and Disapproved" },
  ],
  At = [
    {
      label: "After Time Interval",
      value: "afterTimeInterval",
      description: "Waits for a certain amount of time.",
    },
    {
      label: "At Specified Time",
      value: "atSpecifiedTime",
      description: "Waits until the set date and time to continue",
    },
  ],
  lo = [
    { label: "Using Field Below", value: "usingFieldBelow" },
    { label: "Using JSON", value: "usingJSON" },
  ],
  Je = {
    type: "dynamicInput",
    title: "Field Name",
    toolTipText: "Label that appears above the input field.",
    placeholder: "e.g. What is your name?",
  },
  Qe = {
    type: "switch",
    title: "Required Field",
    toolTipText:
      "Whether to require the user to enter a value for this field before submitting the form",
  },
  It = {
    type: "dynamicInput",
    title: "Placeholder",
    toolTipText: "Sample text to display inside the field.",
  },
  tr = [
    { value: "text", label: "Text", children: [Je, Qe, It] },
    {
      value: "customHTML",
      label: "Custom HTML",
      children: [
        {
          type: "dynamicInput",
          title: "Element Name",
          toolTipText:
            "Optional field. It can be used to include the html in the output.",
          placeholder: "e.g. content section",
        },
        {
          type: "jsonEditor",
          title: "HTML",
          toolTipText: "HTML elements to display on the form page",
          footNote: "Does not accept <script>, <style> or <input> tags",
        },
      ],
    },
    {
      value: "date",
      label: "Date",
      children: [
        Je,
        {
          type: "textBlock",
          placeholder:
            "The displayed date is formatted based on the locale of the user's browser",
        },
        Qe,
      ],
    },
    {
      value: "dropDownList",
      label: "DropDown List",
      children: [
        {
          type: "inputBlock",
          title: "Field Options",
          name: "fieldOption",
          placeholder: "Add Field Option",
        },
        {
          type: "switch",
          title: "Multiple Choice",
          toolTipText:
            "Whether to allow the user to select multiple options from the dropdown list.",
        },
        Qe,
        Je,
      ],
    },
    { value: "email", label: "Email", children: [Je, Qe, It] },
    {
      value: "file",
      label: "File",
      children: [
        Je,
        Qe,
        {
          type: "switch",
          title: "Multiple Files",
          toolTipText:
            "Whether to allow the user to select multiple files from the file input or just one",
        },
        {
          type: "dynamicInput",
          title: "Accepted File Types",
          toolTipText: "Comma-separated list of allowed file extensions",
          footNote: "Leave empty to allow all file types",
        },
      ],
    },
    {
      value: "hiddenField",
      label: "Hidden Field",
      children: [
        {
          type: "dynamicInput",
          title: "Field Name",
          toolTipText:
            "The name of the field, used in input attributes and referenced by the workflow",
        },
        {
          type: "dynamicInput",
          title: "Field Value",
          toolTipText:
            "Input value can be set here or will be passed as a query parameter via Field Name if no value is set",
        },
      ],
    },
    { value: "number", label: "Number", children: [Je, Qe, It] },
    { value: "password", label: "Password", children: [Je, Qe, It] },
    { value: "textArea", label: "Textarea", children: [Je, Qe, It] },
  ],
  Ep = [
    {
      label: "Message Button Label",
      value: "messageButtonLabel",
      content: {
        type: "dynamicInput",
        name: "messageButtonLabel",
        title: "Message Button Label",
        value: "Respond",
      },
    },
    {
      label: "Response From Title",
      value: "responseFromTitle",
      content: {
        type: "dynamicInput",
        name: "responseFromTitle",
        title: "Response From Title",
        toolTipText:
          "Title of the form that the user can access to provide their response.",
      },
    },
    {
      label: "Response From Description",
      value: "responseFromDescription",
      content: {
        type: "dynamicInput",
        name: "responseFromDescription",
        title: "Response From Description",
        toolTipText:
          "Description of the form that the user can access to provide their response",
      },
    },
    {
      label: "Response Form Button Label",
      value: "responseFormButtonLabel",
      content: {
        type: "dynamicInput",
        name: "responseFormButtonLabel",
        title: "Response Form Button Label",
        value: "Submit",
      },
    },
    {
      label: "Limit Wait Time",
      value: "limitWaitTime",
      content: {
        type: "reproductiveDropDown",
        name: "limitWaitTime",
        title: "Limit Wait Time",
        options: [
          {
            label: "After Time Interval",
            value: "afterTimeInterval",
            description: "Waits for a certain amount of time.",
          },
          {
            label: "At Specified Time",
            value: "atSpecifiedTime",
            description: "Waits until the set date and time to continue",
          },
        ],
        toolTipText:
          "Sets the condition for the execution to resume. Can be a specified date or after some time.",
      },
    },
  ],
  an = (e, t) => {
    const { nodes: n } = ie(),
      s = () => {
        const r = n().find((l) => l.id === t);
        if (r) return r.currPosition.get();
      };
    return {
      id: t,
      name: "createDraft",
      description: "create gmail Draft",
      type: "GmailTool",
      parameters: {
        credentials: {
          id: "d0esgqltcbthv6156tjg",
          name: "Gmail Account",
          provider: "gmail",
          ctype: "oauth2",
        },
        descriptionType: e?.toolDescription,
        toolDescription: e?.description,
        resource: e?.resource,
        operation: e?.operation,
        subject: e?.subject,
        emailType: e?.emailType,
        message: e?.message,
        options: { threadId: e?.threadId, sendTo: e?.sendRepliesTo },
      },
      position: s(),
      inputs: [],
      outputs: [
        {
          id: "output",
          name: "createDraft",
          description: "gmail tool output",
          type: "tool",
        },
      ],
    };
  },
  Op = (e) => {
    if (e) {
      const { parameter: t } = e,
        n = t?.assignment,
        s = [],
        r = {};
      return (
        n &&
          n.forEach((l) => {
            const o = `field_${Math.random().toString(36).substring(2, 8)}`;
            s.push(o),
              console.log(l),
              "name" in l && (r[`${o}_name`] = l.name),
              "value" in l && (r[`${o}_value`] = l.value),
              "type" in l && (r[`${o}_type`] = l.type);
          }),
        { mode: e?.parameter?.mode, field: s, fieldData: r }
      );
    }
  };
function Dp() {
  const { formData: e, setFormData: t, currentFormConfig: n } = ie(),
    [s, r] = k(Zn[0]),
    [l, o] = k(eo[0].value),
    [i, c] = k([]),
    [p, u] = k(ro[0]),
    [m, v] = k([]),
    [_, E] = k([]),
    [w, D] = k([]),
    [T, S] = k([]),
    [h, b] = k(oo[0]),
    [x, I] = k(!1),
    [A, y] = k(Pt[0]),
    [g, N] = k(!1),
    [C, $] = k(At[0]),
    [f, P] = k(lo[0]),
    [V, R] = k([]),
    [H, J] = k({}),
    [j, K] = k({}),
    [B, F] = k({}),
    [q, M] = k({}),
    [G, X] = k(""),
    Y = new Set(),
    re = () => {
      F({}), M({});
    },
    U = (z, ne) => {
      if (
        (console.log("from data handler raw >>>> ", z, " >>>>> ", ne),
        console.log("before check: previous data from dataHandler", q()),
        z in q())
      ) {
        if (q()[z] === ne) {
          console.log(
            "from data handler:::: >> previous Data,>>> data unchanged, key unchanged",
            B()
          ),
            F((ee) => ({ ...ee, [z]: ne })),
            console.log(
              "from data handler:::: >> submitted data from previous data >>> data unchanged, key unchanged",
              B()
            );
          return;
        } else if (q()[z] !== ne) {
          console.log(
            "from data handler, 2,>>> key unchanged but data changed",
            q()
          ),
            console.log(
              "from data handler:::: >> submitted data 1 >>> key unchanged but data changed",
              B()
            ),
            F((me) => ({ ...me, [z]: ne })),
            console.log(
              "from data handler:::: >> submitted data 2 >>> key unchanged but data changed",
              B()
            );
          const ee = an(B(), n().id);
          console.log(
            "from data handler:::: >> formatted key >>>  unchanged but data changed",
            ee
          ),
            t({ ...e(), [n().id]: ee }),
            console.log(
              "from data handler:::: >> formData() >>> key unchanged but data changed",
              e()
            );
        }
      } else {
        console.log("from data handler, 2 >>> both key and data changed", q()),
          console.log(
            "from data handler:::: >> submitted data 1  >>> both key and data changed",
            B()
          ),
          F((me) => ({ ...me, [z]: ne })),
          console.log(
            "from data handler:::: >> submitted data 2 >>> both key and data changed",
            B()
          );
        const ee = an(B(), n().id);
        console.log(
          "from data handler:::: >> formatted >>> both key and data changed",
          ee
        ),
          t({ ...e(), [n().id]: ee }),
          console.log(
            "from data handler:::: >> formData() >>> both key and data changed",
            e()
          );
      }
    },
    Q = (z) => {
      console.log("from data remover raw >>>> ", z, " >>>>>> "),
        F((ee) =>
          Object.entries(ee).reduce(
            (me, [Z, de]) => (Z.includes(z) || (me[Z] = de), me),
            {}
          )
        ),
        console.log(" from data remover >>>> previous data", B());
      const ne = an(B(), n().id);
      console.log("from data remover >>>>> formattedPrev", ne),
        t({ ...e(), [n().id]: ne }),
        console.log("from data remover >>> form data", e());
    };
  return (
    be(() => {
      if (
        (console.log(
          n().id,
          "  >  node data  >  ",
          `
`
        ),
        console.log(">>>>>>.>>>>>>>>>>>>>>>>>.>>>>>>>>>>>>>>>>>>>>>>>>>"),
        console.log(q(), "from outside"),
        !Y.has(n().id))
      ) {
        Y.clear(), Y.add(n().id), X(n().id);
        const z = e()[n().id];
        if ((console.log("data1", z), re(), !z)) return;
        console.log("data2", z);
        const ne = Op(z);
        ne &&
          (console.log(
            "decoded from observer, >>>>>> ",
            n().id,
            ne.field,
            ne.fieldData
          ),
          M((ee) => ({ ...ee, mode: ne.mode, ...ne.fieldData })),
          console.log(q(), "from inside"),
          console.log(ne.fieldData, "from inside createEffect"));
      }
    }),
    {
      dataInsertHandler: U,
      previousData: q,
      dataRemoveHandler: Q,
      uniqueKey: G,
      currentToolDescription: s,
      setCurrentToolDescription: r,
      resource: l,
      setResource: o,
      operation: i,
      setOperation: c,
      selectedOperation: p,
      setSelectedOperation: u,
      selectedFilter: m,
      setSelectedFilter: v,
      filters: _,
      setFilters: E,
      option: w,
      setOption: D,
      selectedOption: T,
      setSelectedOption: S,
      responseType: h,
      setResponseType: b,
      isAddApprovalOption: x,
      setIsAddApprovalOption: I,
      approval: A,
      setApproval: y,
      isOption: g,
      setIsOption: N,
      limitType: C,
      setLimitType: $,
      defineForm: f,
      setDefineForm: P,
      formElementId: V,
      setFormElementId: R,
      formElements: H,
      setFormElements: J,
      fieldOption: j,
      setFieldOption: K,
    }
  );
}
var Np = O(
    '<div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100">'
  ),
  kp = O('<div class="label hr-solid-line">Options'),
  nr = O('<div class="mt-5 space-y-5">'),
  or = O(
    '<div class="group flex items-start gap-1.5 w-full mt-5"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"></div><div class="flex-1 space-y-5">'
  ),
  Pp = O(
    '<div><div class="label hr-solid-line">Approval Options</div><div></div><div class=space-y-5>'
  ),
  rr = O(
    '<div class="group flex items-start gap-1.5 w-full mt-5"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"></div><div class="flex-1 space-y-5"><div class=space-y-5>'
  ),
  Ap = O(
    '<div><div class="label hr-solid-line">Options</div><div></div><div class=space-y-5>'
  ),
  Vn = O('<div class="space-y-5 mt-5">'),
  Mp = O('<div class="label hr-solid-line">Form Elements'),
  Vp = O("<div class=space-y-5>"),
  Lp = O('<div><div class="label hr-solid-line">Options'),
  Fp = O(
    '<form id=create-draftForm><div class=space-y-5><div class=space-y-5></div><div class="space-y-5 mt-5"></div><div class="space-y-5 mt-5">'
  ),
  Ln = O("<div>"),
  Bp = O(
    '<div class=space-y-5><div class="text-[#dbdbdd] border-b-[.4px] border-[#4e4d4d] pb-1">Filter</div><div class=space-y-5>'
  ),
  Rp = O(
    '<div class="text-[#9c9c9e] text-center text-sm border border-[#9c9c9e] p-4 rounded-md border-dashed">Currently no items exist'
  ),
  Jt = O('<div class="group flex items-start gap-1.5 w-full">'),
  St = O(
    '<div class="mt-5 text-[#9c9c9e] text-center text-sm border border-[#9c9c9e] p-4 rounded-md border-dashed">Currently no items exist'
  ),
  lr = O(
    '<div class="group flex items-start gap-1.5 w-full"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"></div><div class=flex-1>'
  ),
  qp = O('<div class="space-y-4 mt-5">'),
  Hp = O(
    '<div><div class="flex flex-col items-center gap-1 mt-7"><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-grab active:cursor-grabbing bg-[#36373d] p-1 rounded-md"title="Drag to move"></div><div class="text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] p-1 rounded-md"></div><div class="w-0.5 h-full bg-[#36373d] rounded-md"></div></div><div class="flex flex-col gap-1.5 w-full">'
  ),
  jp = O(
    '<div class=space-y-4><div class="label hr-solid-line">Field Options</div><div class="space-y-4 mt-4 w-full">'
  ),
  zp = O(
    '<div><div class="flex flex-col items-center gap-1 mt-7"><div class="text-xs text-[#6f6f70] hover:text-[#ff6f5c] cursor-grab active:cursor-grabbing bg-[#36373d] p-0.5 rounded-sm"title="Drag to move"></div><div class="text-xs text-[#6f6f70] hover:text-[#ff6f5c] cursor-pointer bg-[#36373d] p-0.5 rounded-sm"></div></div><div class="flex flex-col gap-1.5 w-full">'
  );
const Qt = ({ onClick: e }) =>
    (() => {
      var t = Np();
      return Ae(t, "click", e), a(t, d(pe, {})), t;
    })(),
  Wp = (e) => {
    const { currentFormConfig: t, formData: n, setFormData: s } = ie(),
      {
        dataInsertHandler: r,
        previousData: l,
        currentToolDescription: o,
        setCurrentToolDescription: i,
        resource: c,
        setResource: p,
        operation: u,
        setOperation: m,
        selectedOperation: v,
        setSelectedOperation: _,
        selectedFilter: E,
        setSelectedFilter: w,
        filters: D,
        setFilters: T,
        option: S,
        setOption: h,
        selectedOption: b,
        setSelectedOption: x,
        responseType: I,
        setResponseType: A,
        isAddApprovalOption: y,
        setIsAddApprovalOption: g,
        approval: N,
        setApproval: C,
        isOption: $,
        setIsOption: f,
        limitType: P,
        setLimitType: V,
        defineForm: R,
        setDefineForm: H,
        formElementId: J,
        setFormElementId: j,
        formElements: K,
        setFormElements: B,
        fieldOption: F,
        setFieldOption: q,
      } = Dp();
    be(() => {
      x([]),
        c() === "message"
          ? m(ro)
          : c() === "label"
          ? m(wp)
          : c() === "draft"
          ? m($p)
          : c() === "thread" && m(_p);
    }),
      be(() => {
        x([]),
          v()?.value === "reply"
            ? h(ri)
            : v()?.value === "send"
            ? h(Sp)
            : v()?.value === "create"
            ? h(Ip)
            : v()?.value === "get"
            ? h(Tp)
            : v()?.value === "getMany"
            ? h(Cp)
            : v().value === "sendAndWaitForResponse" &&
              (I().value === "Approval"
                ? (h([
                    {
                      value: "limitWaitTime",
                      label: "Limit Wait Time",
                      content: {
                        type: "reproductiveDropDown",
                        name: "limitWaitTime",
                        title: "Limit Wait Time",
                        toolTipText: "Time at which polling should occur",
                      },
                    },
                  ]),
                  x([]))
                : (I().value === "freeText" || I().value === "customForm") &&
                  (h(Ep), x([])));
      }),
      Ie(() => {
        m(ro), T(yp);
      });
    const M = (G) => {
      G.preventDefault();
      const X = new FormData(G.target);
      let Y = Object.fromEntries(X.entries());
      const re = an(Y, t().id);
      s({ ...n(), [t().id]: re });
    };
    return (() => {
      var G = Fp(),
        X = G.firstChild,
        Y = X.firstChild,
        re = Y.nextSibling,
        U = re.nextSibling;
      return (
        G.addEventListener("submit", M),
        a(
          X,
          d(et, {
            name: "credential",
            placeholder: "Select Credential",
            title: "Credential to connect with",
          }),
          Y
        ),
        a(
          X,
          d(Te, {
            name: "toolDescription",
            title: "Tool Description",
            options: Zn,
            get defaultValue() {
              return l().toolDescription || Zn[0].value;
            },
            onChange: (Q) => {
              i(Q), r("toolDescription", Q);
            },
          }),
          Y
        ),
        a(
          X,
          d(te, {
            get when() {
              return o().value === "setManually";
            },
            get children() {
              return d(We, {
                name: "description",
                title: "Description",
                toolTipText:
                  "Explain to the LLM what this tool does, a good, specific description would allow LLMs to produce expected results much more often.",
                get value() {
                  return l().description || "Consume the Gmail API";
                },
                placeholder: "e.g. Consume the Gmail API",
                onInput: (Q) => {
                  r("description", Q);
                },
              });
            },
          }),
          Y
        ),
        a(
          X,
          d(we, {
            name: "resource",
            title: "Resource",
            options: eo,
            get defaultValue() {
              return l().resource || eo[0].value;
            },
            onChange: (Q) => {
              p(Q.value), r("resource", Q);
            },
          }),
          Y
        ),
        a(
          X,
          d(Te, {
            name: "operation",
            title: "Operation",
            get options() {
              return u();
            },
            get defaultValue() {
              return l().operation || u()[0].value;
            },
            onChange: (Q) => {
              _(Q), r("operation", Q);
            },
          }),
          Y
        ),
        a(
          Y,
          d(ae, {
            get each() {
              return v()?.children;
            },
            children: (Q, z) => {
              if (Q.type === "dynamicInput")
                return (() => {
                  var ne = Ln();
                  return (
                    a(
                      ne,
                      d(se, {
                        get name() {
                          return Q.name ?? "";
                        },
                        get title() {
                          return Q.title;
                        },
                        get toolTipText() {
                          return Q.toolTipText;
                        },
                        get placeholder() {
                          return Q.placeholder;
                        },
                        get value() {
                          return l()[Q.name] || Q.value;
                        },
                        onInput: (ee) => {
                          r(Q.name ?? "", ee);
                        },
                      })
                    ),
                    ne
                  );
                })();
              if (Q.type === "switch")
                return (() => {
                  var ne = Ln();
                  return (
                    a(
                      ne,
                      d(_e, {
                        get checked() {
                          return l()[Q.name];
                        },
                        get name() {
                          return Q.name ?? "";
                        },
                        get title() {
                          return Q.title ?? "";
                        },
                        get toolTipText() {
                          return Q.toolTipText;
                        },
                        onChange: (ee) => {
                          r(Q.name ?? "", ee);
                        },
                      })
                    ),
                    ne
                  );
                })();
              if (Q.type === "DropDownFilter")
                return (() => {
                  var ne = Bp(),
                    ee = ne.firstChild,
                    me = ee.nextSibling;
                  return (
                    a(
                      ne,
                      (() => {
                        var Z = oe(() => E().length <= 0);
                        return () => Z() && Rp();
                      })(),
                      me
                    ),
                    a(
                      me,
                      d(ae, {
                        get each() {
                          return E();
                        },
                        children: (Z, de) => {
                          if (Z.content.type === "switch")
                            return (() => {
                              var ue = Jt();
                              return (
                                a(
                                  ue,
                                  d(Qt, {
                                    onClick: () => {
                                      const ce = E().filter(
                                        (fe) => fe.value !== Z.value
                                      );
                                      w(ce), T([...D(), Z]);
                                    },
                                  }),
                                  null
                                ),
                                a(
                                  ue,
                                  d(_e, {
                                    get checked() {
                                      return l()[Z.content.name];
                                    },
                                    get name() {
                                      return Z.content.name;
                                    },
                                    get title() {
                                      return Z.content.title ?? "";
                                    },
                                    get toolTipText() {
                                      return Z.content.toolTipText;
                                    },
                                    onChange: (ce) => {
                                      r(Z.content.name, ce);
                                    },
                                  }),
                                  null
                                ),
                                ue
                              );
                            })();
                          if (Z.content.type === "dynamicInput")
                            return (() => {
                              var ue = Jt();
                              return (
                                a(
                                  ue,
                                  d(Qt, {
                                    onClick: () => {
                                      const ce = E().filter(
                                        (fe) => fe.value !== Z.value
                                      );
                                      w(ce), T([...D(), Z]);
                                    },
                                  }),
                                  null
                                ),
                                a(
                                  ue,
                                  d(se, {
                                    get name() {
                                      return Z.content.name;
                                    },
                                    get value() {
                                      return l()[Z.content.name] || "";
                                    },
                                    get title() {
                                      return Z.content.title;
                                    },
                                    get toolTipText() {
                                      return Z.content.toolTipText;
                                    },
                                    isArrow: !0,
                                    get footNote() {
                                      return Z.content.footNote;
                                    },
                                    get placeholder() {
                                      return Z.content.placeholder ?? "";
                                    },
                                    onInput: (ce) => {
                                      r(Z.content.name, ce);
                                    },
                                  }),
                                  null
                                ),
                                ue
                              );
                            })();
                          if (Z.content.type === "dropdownMultiple")
                            return (() => {
                              var ue = Jt();
                              return (
                                a(
                                  ue,
                                  d(Qt, {
                                    onClick: () => {
                                      const ce = E().filter(
                                        (fe) => fe.value !== Z.value
                                      );
                                      w(ce), T([...D(), Z]);
                                    },
                                  }),
                                  null
                                ),
                                a(
                                  ue,
                                  d(Wl, {
                                    get name() {
                                      return Z.content.name;
                                    },
                                    get title() {
                                      return Z.content.title;
                                    },
                                    get defaultSelectedOptions() {
                                      return l()[Z.content.name] || [];
                                    },
                                    get options() {
                                      return Z.content.options ?? [];
                                    },
                                    get toolTipText() {
                                      return Z.content.toolTipText;
                                    },
                                    get footNote() {
                                      return Z.content.footNote;
                                    },
                                    onChange: (ce) => {
                                      r(Z.content.name, ce);
                                    },
                                  }),
                                  null
                                ),
                                ue
                              );
                            })();
                          if (Z.content.type === "dropdownN")
                            return (() => {
                              var ue = Jt();
                              return (
                                a(
                                  ue,
                                  d(Qt, {
                                    onClick: () => {
                                      const ce = E().filter(
                                        (fe) => fe.value !== Z.value
                                      );
                                      w(ce), T([...D(), Z]);
                                    },
                                  }),
                                  null
                                ),
                                a(
                                  ue,
                                  d(we, {
                                    get placeholder() {
                                      return (
                                        Z.content?.options?.[0].label ?? ""
                                      );
                                    },
                                    get name() {
                                      return Z.content.name;
                                    },
                                    get title() {
                                      return Z.content.title;
                                    },
                                    get defaultValue() {
                                      return l()[Z.content.name];
                                    },
                                    get options() {
                                      return Z.content.options ?? [];
                                    },
                                    get toolTipText() {
                                      return Z.content.toolTipText;
                                    },
                                    get footNote() {
                                      return Z.content.footNote;
                                    },
                                    onChange: (ce) => {
                                      r(Z.content.name, ce);
                                    },
                                  }),
                                  null
                                ),
                                ue
                              );
                            })();
                        },
                      })
                    ),
                    a(
                      ne,
                      d(Me, {
                        get name() {
                          return Q.name ?? "";
                        },
                        placeholder: "Add Filter",
                        selectedOptions: E,
                        setSelectedOptions: w,
                        dropdownOptions: D,
                        setDropdownOptions: T,
                        onChange: (Z) => {},
                      }),
                      null
                    ),
                    ne
                  );
                })();
              if (Q.type === "DropDownN")
                return (() => {
                  var ne = Ln();
                  return (
                    a(
                      ne,
                      d(we, {
                        get name() {
                          return Q.name ?? "";
                        },
                        get title() {
                          return Q.title;
                        },
                        get options() {
                          return Q.options ?? [];
                        },
                        get defaultValue() {
                          return l()[Q.name] || Q.options?.[0].value;
                        },
                        get toolTipText() {
                          return Q.toolTipText;
                        },
                        onChange: (ee) => {
                          r(Q.name ?? "", ee);
                        },
                      })
                    ),
                    ne
                  );
                })();
            },
          })
        ),
        a(
          re,
          d(te, {
            get when() {
              return (
                v().value === "reply" ||
                v().value === "create" ||
                v().value === "get" ||
                v().value === "getMany" ||
                v().value === "send"
              );
            },
            get children() {
              return [
                kp(),
                oe(() => oe(() => b().length <= 0)() && St()),
                (() => {
                  var Q = nr();
                  return (
                    a(
                      Q,
                      d(ae, {
                        get each() {
                          return b();
                        },
                        children: (z) => {
                          if (z.content.type === "dynamicInput")
                            return (() => {
                              var ne = lr(),
                                ee = ne.firstChild,
                                me = ee.nextSibling;
                              return (
                                (ee.$$click = () => {
                                  const Z = b().filter(
                                    (de) => de.value !== z.value
                                  );
                                  x(Z), h([...S(), z]);
                                }),
                                a(ee, d(pe, {})),
                                a(
                                  me,
                                  d(se, {
                                    get name() {
                                      return z.content.name;
                                    },
                                    get title() {
                                      return z.content.title;
                                    },
                                    get placeholder() {
                                      return z.content.placeholder;
                                    },
                                    get toolTipText() {
                                      return z.content.toolTipText;
                                    },
                                    isArrow: !0,
                                    get value() {
                                      return l()[z.content.name];
                                    },
                                    onInput: (Z) => {
                                      r(z.content.name, Z);
                                    },
                                  })
                                ),
                                ne
                              );
                            })();
                          if (z.content.type === "switch")
                            return (() => {
                              var ne = lr(),
                                ee = ne.firstChild,
                                me = ee.nextSibling;
                              return (
                                (ee.$$click = () => {
                                  const Z = b().filter(
                                    (de) => de.value !== z.value
                                  );
                                  x(Z), h([...S(), z]);
                                }),
                                a(ee, d(pe, {})),
                                a(
                                  me,
                                  d(_e, {
                                    get checked() {
                                      return l()[z.content.name];
                                    },
                                    get title() {
                                      return z.content.title ?? "";
                                    },
                                    get toolTipText() {
                                      return z.content.toolTipText;
                                    },
                                    get name() {
                                      return z.content.name;
                                    },
                                    onChange: (Z) => {
                                      r(z.content.name, Z);
                                    },
                                  })
                                ),
                                ne
                              );
                            })();
                        },
                      })
                    ),
                    Q
                  );
                })(),
                d(Me, {
                  get name() {
                    return `optionsFor${v()?.label}Operation`;
                  },
                  placeholder: "Add option",
                  dropdownOptions: S,
                  setDropdownOptions: h,
                  selectedOptions: b,
                  setSelectedOptions: x,
                  onChange: (Q) => {
                    x(Q);
                  },
                }),
              ];
            },
          })
        ),
        a(
          U,
          d(te, {
            get when() {
              return v().value === "sendAndWaitForResponse";
            },
            get children() {
              return [
                d(Te, {
                  name: "responseType",
                  title: "Response Type",
                  options: oo,
                  get defaultValue() {
                    return l().responseType || oo[0].value;
                  },
                  onChange: (Q) => {
                    A(Q), r("responseType", Q);
                  },
                }),
                (() => {
                  var Q = Vn();
                  return (
                    a(
                      Q,
                      d(te, {
                        get when() {
                          return I().value === "Approval";
                        },
                        get children() {
                          return [
                            (() => {
                              var z = Pp(),
                                ne = z.firstChild,
                                ee = ne.nextSibling,
                                me = ee.nextSibling;
                              return (
                                a(
                                  z,
                                  (() => {
                                    var Z = oe(() => !y());
                                    return () => Z() && St();
                                  })(),
                                  ee
                                ),
                                a(
                                  ee,
                                  d(hn, {
                                    onClick: () => g(!0),
                                    title: "Add Option",
                                    width: "w-full",
                                  })
                                ),
                                a(
                                  me,
                                  d(te, {
                                    get when() {
                                      return y();
                                    },
                                    get children() {
                                      var Z = or(),
                                        de = Z.firstChild,
                                        ue = de.nextSibling;
                                      return (
                                        (de.$$click = () => {
                                          g(!1), C(Pt[0]);
                                        }),
                                        a(de, d(pe, {})),
                                        a(
                                          ue,
                                          d(Te, {
                                            name: "typeOfApproval",
                                            title: "Type of Approval",
                                            options: Pt,
                                            get defaultValue() {
                                              return Pt[0].value;
                                            },
                                            onChange: (ce) => {
                                              C(ce), r("typeOfApproval", ce);
                                            },
                                          }),
                                          null
                                        ),
                                        a(
                                          ue,
                                          d(se, {
                                            name: "approveButtonLabel",
                                            title: "Approve Button Label",
                                            value: "Approve",
                                          }),
                                          null
                                        ),
                                        a(
                                          ue,
                                          d(we, {
                                            name: "approveButtonStyle",
                                            title: "Approve Button Style",
                                            options: [
                                              {
                                                value: "primary",
                                                label: "Primary",
                                              },
                                              {
                                                value: "secondary",
                                                label: "Secondary",
                                              },
                                            ],
                                            defaultValue: "primary",
                                            onChange: (ce) => {
                                              r("approveButtonStyle", ce);
                                            },
                                          }),
                                          null
                                        ),
                                        a(
                                          ue,
                                          d(te, {
                                            get when() {
                                              return (
                                                N().value ===
                                                "approvedAndDisapproved"
                                              );
                                            },
                                            get children() {
                                              return [
                                                d(se, {
                                                  name: "disapproveButtonLabel",
                                                  title:
                                                    "Disapprove Button Label",
                                                  value: "Disapprove",
                                                  onInput: (ce) => {
                                                    r(
                                                      "disapproveButtonLabel",
                                                      ce
                                                    );
                                                  },
                                                }),
                                                d(we, {
                                                  name: "disapproveButtonStyle",
                                                  title:
                                                    "Disapprove Button Style",
                                                  options: [
                                                    {
                                                      value: "primary",
                                                      label: "Primary",
                                                    },
                                                    {
                                                      value: "secondary",
                                                      label: "Secondary",
                                                    },
                                                  ],
                                                  defaultValue: "primary",
                                                  onChange: (ce) => {
                                                    r(
                                                      "disapproveButtonStyle",
                                                      ce
                                                    );
                                                  },
                                                }),
                                              ];
                                            },
                                          }),
                                          null
                                        ),
                                        Z
                                      );
                                    },
                                  })
                                ),
                                W(() => L(ee, `${y() ? "hidden" : "mt-5"}`)),
                                z
                              );
                            })(),
                            (() => {
                              var z = Ap(),
                                ne = z.firstChild,
                                ee = ne.nextSibling,
                                me = ee.nextSibling;
                              return (
                                a(
                                  z,
                                  (() => {
                                    var Z = oe(() => !$());
                                    return () => Z() && St();
                                  })(),
                                  ee
                                ),
                                a(
                                  ee,
                                  d(hn, {
                                    onClick: () => f(!0),
                                    title: "Add Option",
                                    width: "w-full",
                                  })
                                ),
                                a(
                                  me,
                                  d(te, {
                                    get when() {
                                      return $();
                                    },
                                    get children() {
                                      var Z = rr(),
                                        de = Z.firstChild,
                                        ue = de.nextSibling,
                                        ce = ue.firstChild;
                                      return (
                                        (de.$$click = () => {
                                          f(!1), V(Pt[0]);
                                        }),
                                        a(de, d(pe, {})),
                                        a(
                                          ue,
                                          d(Te, {
                                            name: "limitType",
                                            title: "Limit Type",
                                            options: At,
                                            get defaultValue() {
                                              return At[0].value;
                                            },
                                            toolTipText:
                                              "Sets the condition for the execution to resume. Can be a specified date or after some time.",
                                            onChange: (fe) => {
                                              V(fe), r("limitType", fe);
                                            },
                                          }),
                                          ce
                                        ),
                                        a(
                                          ce,
                                          d(te, {
                                            get when() {
                                              return (
                                                P().value ===
                                                "afterTimeInterval"
                                              );
                                            },
                                            get children() {
                                              return [
                                                d(se, {
                                                  name: "amount",
                                                  title: "Amount",
                                                  value: "45",
                                                  toolTipText:
                                                    "The time to wait.",
                                                  onInput: (fe) => {
                                                    r("amount", fe);
                                                  },
                                                }),
                                                d(we, {
                                                  name: "unit",
                                                  title: "Unit",
                                                  toolTipText:
                                                    "Unit of the interval value",
                                                  options: [
                                                    {
                                                      value: "minutes",
                                                      label: "Minutes",
                                                    },
                                                    {
                                                      value: "hours",
                                                      label: "Hours",
                                                    },
                                                    {
                                                      value: "days",
                                                      label: "Days",
                                                    },
                                                  ],
                                                  defaultValue: "minutes",
                                                  onChange: (fe) => {
                                                    r("unit", fe);
                                                  },
                                                }),
                                              ];
                                            },
                                          }),
                                          null
                                        ),
                                        a(
                                          ce,
                                          d(te, {
                                            get when() {
                                              return (
                                                P().value === "atSpecifiedTime"
                                              );
                                            },
                                            get children() {
                                              return d(se, {
                                                title: "Max Date and Time",
                                                name: "maxDateAndTime",
                                                toolTipText:
                                                  "Continue execution after the specified date and time",
                                                onInput: (fe) => {
                                                  r("maxDateAndTime", fe);
                                                },
                                              });
                                            },
                                          }),
                                          null
                                        ),
                                        Z
                                      );
                                    },
                                  })
                                ),
                                W(() => L(ee, `${$() ? "hidden" : "mt-5"}`)),
                                z
                              );
                            })(),
                          ];
                        },
                      })
                    ),
                    Q
                  );
                })(),
                (() => {
                  var Q = Vn();
                  return (
                    a(
                      Q,
                      d(te, {
                        get when() {
                          return I().value === "customForm";
                        },
                        get children() {
                          return [
                            d(Te, {
                              name: "defineForm",
                              title: "Define Form",
                              options: lo,
                              get defaultValue() {
                                return lo[0].value;
                              },
                              onChange: (z) => {
                                H(z), r("defineForm", z);
                              },
                            }),
                            d(te, {
                              get when() {
                                return R().value === "usingJSON";
                              },
                              get children() {
                                return d(Bt, {
                                  name: "formFieldsJson",
                                  title: "Form Fields",
                                  footNote: "See docs for file syntax.",
                                  get value() {
                                    return JSON.stringify(
                                      [
                                        {
                                          fieldLabel: "Name",
                                          placeholder: "enter you name",
                                          requiredField: !0,
                                        },
                                      ],
                                      null,
                                      2
                                    );
                                  },
                                  onInput: (z) => {
                                    r("formFieldsJson", z);
                                  },
                                });
                              },
                            }),
                            (() => {
                              var z = Vp();
                              return (
                                a(
                                  z,
                                  d(te, {
                                    get when() {
                                      return R().value === "usingFieldBelow";
                                    },
                                    get children() {
                                      return [
                                        Mp(),
                                        oe(
                                          () =>
                                            oe(() => J().length <= 0)() && St()
                                        ),
                                        (() => {
                                          var ne = nr();
                                          return (
                                            a(
                                              ne,
                                              d(ae, {
                                                get each() {
                                                  return J();
                                                },
                                                children: (ee, me) =>
                                                  (() => {
                                                    var Z = Hp(),
                                                      de = Z.firstChild,
                                                      ue = de.firstChild,
                                                      ce = ue.nextSibling,
                                                      fe = de.nextSibling;
                                                    return (
                                                      a(ue, d(xt, {})),
                                                      (ce.$$click = () => {
                                                        j(
                                                          J().filter(
                                                            (Ne, xe) =>
                                                              Ne !== ee
                                                          )
                                                        );
                                                      }),
                                                      a(ce, d(pe, {})),
                                                      a(
                                                        fe,
                                                        d(Te, {
                                                          name: "elementType",
                                                          title: "Element Type",
                                                          toolTipText:
                                                            "The type of field to add to the form",
                                                          options: tr,
                                                          get defaultValue() {
                                                            return tr[0].value;
                                                          },
                                                          onChange: (Ne) => {
                                                            B((xe) => ({
                                                              ...xe,
                                                              [ee]:
                                                                Ne.children ||
                                                                [],
                                                            })),
                                                              r(
                                                                "elementType",
                                                                Ne
                                                              );
                                                          },
                                                        }),
                                                        null
                                                      ),
                                                      a(
                                                        fe,
                                                        d(te, {
                                                          get when() {
                                                            return K()[ee];
                                                          },
                                                          get children() {
                                                            var Ne = qp();
                                                            return (
                                                              a(
                                                                Ne,
                                                                d(ae, {
                                                                  get each() {
                                                                    return K()[
                                                                      ee
                                                                    ];
                                                                  },
                                                                  children: (
                                                                    xe
                                                                  ) => {
                                                                    if (
                                                                      xe.type ===
                                                                      "dynamicInput"
                                                                    )
                                                                      return d(
                                                                        se,
                                                                        {
                                                                          get name() {
                                                                            return `${ee}_${xe.title}`;
                                                                          },
                                                                          get title() {
                                                                            return xe.title;
                                                                          },
                                                                          get toolTipText() {
                                                                            return xe.toolTipText;
                                                                          },
                                                                          get value() {
                                                                            return xe.value;
                                                                          },
                                                                          get placeholder() {
                                                                            return xe.placeholder;
                                                                          },
                                                                          onInput:
                                                                            (
                                                                              qe
                                                                            ) => {
                                                                              r(
                                                                                `${ee}_${xe.title}`,
                                                                                qe
                                                                              );
                                                                            },
                                                                        }
                                                                      );
                                                                    if (
                                                                      xe.type ===
                                                                      "switch"
                                                                    )
                                                                      return d(
                                                                        _e,
                                                                        {
                                                                          get name() {
                                                                            return `${ee}_${xe.title}`;
                                                                          },
                                                                          get title() {
                                                                            return (
                                                                              xe.title ??
                                                                              ""
                                                                            );
                                                                          },
                                                                          get toolTipText() {
                                                                            return xe.toolTipText;
                                                                          },
                                                                          onChange:
                                                                            (
                                                                              qe
                                                                            ) => {
                                                                              r(
                                                                                `${ee}_${xe.title}`,
                                                                                qe
                                                                              );
                                                                            },
                                                                        }
                                                                      );
                                                                    if (
                                                                      xe.type ===
                                                                      "textBlock"
                                                                    )
                                                                      return d(
                                                                        qt,
                                                                        {
                                                                          get children() {
                                                                            return xe.placeholder;
                                                                          },
                                                                        }
                                                                      );
                                                                    if (
                                                                      xe.type ===
                                                                      "jsonEditor"
                                                                    )
                                                                      return d(
                                                                        Bt,
                                                                        {
                                                                          get name() {
                                                                            return `${ee}_${xe.title}`;
                                                                          },
                                                                          get title() {
                                                                            return xe.title;
                                                                          },
                                                                          get footNote() {
                                                                            return xe.footNote;
                                                                          },
                                                                          get value() {
                                                                            return JSON.stringify(
                                                                              {
                                                                                street:
                                                                                  "1234 Elm Street",
                                                                                city: "Springfield",
                                                                              },
                                                                              null,
                                                                              2
                                                                            );
                                                                          },
                                                                          onInput:
                                                                            (
                                                                              qe
                                                                            ) => {
                                                                              r(
                                                                                `${ee}_${xe.title}`,
                                                                                qe
                                                                              );
                                                                            },
                                                                        }
                                                                      );
                                                                    if (
                                                                      xe.type ===
                                                                      "inputBlock"
                                                                    )
                                                                      return (() => {
                                                                        var qe =
                                                                            jp(),
                                                                          ii =
                                                                            qe.firstChild,
                                                                          ai =
                                                                            ii.nextSibling;
                                                                        return (
                                                                          a(
                                                                            ai,
                                                                            d(
                                                                              ae,
                                                                              {
                                                                                get each() {
                                                                                  return F()[
                                                                                    ee
                                                                                  ];
                                                                                },
                                                                                children:
                                                                                  (
                                                                                    it,
                                                                                    si
                                                                                  ) =>
                                                                                    (() => {
                                                                                      var bn =
                                                                                          zp(),
                                                                                        mo =
                                                                                          bn.firstChild,
                                                                                        go =
                                                                                          mo.firstChild,
                                                                                        ho =
                                                                                          go.nextSibling,
                                                                                        di =
                                                                                          mo.nextSibling;
                                                                                      return (
                                                                                        a(
                                                                                          go,
                                                                                          d(
                                                                                            xt,
                                                                                            {}
                                                                                          )
                                                                                        ),
                                                                                        (ho.$$click =
                                                                                          () => {
                                                                                            q(
                                                                                              (
                                                                                                Ht
                                                                                              ) => ({
                                                                                                ...Ht,
                                                                                                [ee]: Ht[
                                                                                                  ee
                                                                                                ].filter(
                                                                                                  (
                                                                                                    ci
                                                                                                  ) =>
                                                                                                    ci !==
                                                                                                    it
                                                                                                ),
                                                                                              })
                                                                                            );
                                                                                          }),
                                                                                        a(
                                                                                          ho,
                                                                                          d(
                                                                                            pe,
                                                                                            {}
                                                                                          )
                                                                                        ),
                                                                                        a(
                                                                                          di,
                                                                                          d(
                                                                                            se,
                                                                                            {
                                                                                              get name() {
                                                                                                return `${ee}_${xe.name}_${it}`;
                                                                                              },
                                                                                              title:
                                                                                                "Option",
                                                                                              onInput:
                                                                                                (
                                                                                                  Ht
                                                                                                ) => {
                                                                                                  r(
                                                                                                    `${ee}_${xe.name}_${it}`,
                                                                                                    Ht
                                                                                                  );
                                                                                                },
                                                                                            }
                                                                                          )
                                                                                        ),
                                                                                        W(
                                                                                          () =>
                                                                                            L(
                                                                                              bn,
                                                                                              `flex gap-1.5 ${
                                                                                                si() !==
                                                                                                0
                                                                                                  ? "border-t pt-6 border-dashed border-[#575555]"
                                                                                                  : ""
                                                                                              }`
                                                                                            )
                                                                                        ),
                                                                                        bn
                                                                                      );
                                                                                    })(),
                                                                              }
                                                                            )
                                                                          ),
                                                                          a(
                                                                            qe,
                                                                            d(
                                                                              lt,
                                                                              {
                                                                                label:
                                                                                  "Add Field Option",
                                                                                onClick:
                                                                                  () => {
                                                                                    q(
                                                                                      (
                                                                                        it
                                                                                      ) => ({
                                                                                        ...it,
                                                                                        [ee]: [
                                                                                          ...(it[
                                                                                            ee
                                                                                          ] ||
                                                                                            []),
                                                                                          `${Math.random()
                                                                                            .toString(
                                                                                              36
                                                                                            )
                                                                                            .substring(
                                                                                              2,
                                                                                              8
                                                                                            )}`,
                                                                                        ],
                                                                                      })
                                                                                    );
                                                                                  },
                                                                              }
                                                                            ),
                                                                            null
                                                                          ),
                                                                          qe
                                                                        );
                                                                      })();
                                                                  },
                                                                })
                                                              ),
                                                              Ne
                                                            );
                                                          },
                                                        }),
                                                        null
                                                      ),
                                                      W(() =>
                                                        L(
                                                          Z,
                                                          `flex gap-1.5 ${
                                                            me() !== 0
                                                              ? "border-t pt-6 border-dashed border-[#575555]"
                                                              : ""
                                                          }`
                                                        )
                                                      ),
                                                      Z
                                                    );
                                                  })(),
                                              })
                                            ),
                                            ne
                                          );
                                        })(),
                                        d(lt, {
                                          label: "Add Form Element",
                                          onClick: () => {
                                            j([
                                              ...J(),
                                              `form_elements_${Math.random()
                                                .toString(36)
                                                .substring(2, 8)}`,
                                            ]);
                                          },
                                        }),
                                      ];
                                    },
                                  })
                                ),
                                z
                              );
                            })(),
                          ];
                        },
                      })
                    ),
                    Q
                  );
                })(),
                (() => {
                  var Q = Vn();
                  return (
                    a(
                      Q,
                      d(te, {
                        get when() {
                          return (
                            I().value === "freeText" ||
                            I().value === "customForm"
                          );
                        },
                        get children() {
                          return [
                            (() => {
                              var z = Lp();
                              return (
                                z.firstChild,
                                a(
                                  z,
                                  (() => {
                                    var ne = oe(() => b().length <= 0);
                                    return () => ne() && St();
                                  })(),
                                  null
                                ),
                                z
                              );
                            })(),
                            d(ae, {
                              get each() {
                                return b();
                              },
                              children: (z) => {
                                if (z.content.type === "dynamicInput")
                                  return (() => {
                                    var ne = or(),
                                      ee = ne.firstChild,
                                      me = ee.nextSibling;
                                    return (
                                      (ee.$$click = () => {
                                        const Z = b().filter(
                                          (de) => de.value !== z.value
                                        );
                                        x(Z), h([...S(), z]);
                                      }),
                                      a(ee, d(pe, {})),
                                      a(
                                        me,
                                        d(se, {
                                          get name() {
                                            return z.content.name;
                                          },
                                          get title() {
                                            return z.content.title;
                                          },
                                          get toolTipText() {
                                            return z.content.toolTipText;
                                          },
                                          onInput: (Z) => {
                                            r(z.content.name, Z);
                                          },
                                        })
                                      ),
                                      ne
                                    );
                                  })();
                                if (z.content.type === "reproductiveDropDown")
                                  return (() => {
                                    var ne = rr(),
                                      ee = ne.firstChild,
                                      me = ee.nextSibling,
                                      Z = me.firstChild;
                                    return (
                                      (ee.$$click = () => {
                                        const de = b().filter(
                                          (ue) => ue.value !== z.value
                                        );
                                        x(de), h([...S(), z]);
                                      }),
                                      a(ee, d(pe, {})),
                                      a(
                                        me,
                                        d(Te, {
                                          name: "limitType",
                                          title: "Limit Type",
                                          options: At,
                                          get defaultValue() {
                                            return At[0].value;
                                          },
                                          toolTipText:
                                            "Sets the condition for the execution to resume. Can be a specified date or after some time.",
                                          onChange: (de) => {
                                            V(de), r("limitType", de);
                                          },
                                        }),
                                        Z
                                      ),
                                      a(
                                        Z,
                                        d(te, {
                                          get when() {
                                            return (
                                              P().value === "afterTimeInterval"
                                            );
                                          },
                                          get children() {
                                            return [
                                              d(se, {
                                                name: "amount",
                                                title: "Amount",
                                                value: "45",
                                                toolTipText:
                                                  "The time to wait.",
                                                onInput: (de) => {
                                                  r("amount", de);
                                                },
                                              }),
                                              d(we, {
                                                name: "unit",
                                                title: "Unit",
                                                toolTipText:
                                                  "Unit of the interval value",
                                                options: [
                                                  {
                                                    value: "minutes",
                                                    label: "Minutes",
                                                  },
                                                  {
                                                    value: "hours",
                                                    label: "Hours",
                                                  },
                                                  {
                                                    value: "days",
                                                    label: "Days",
                                                  },
                                                ],
                                                defaultValue: "minutes",
                                                onChange: (de) => {
                                                  r("unit", de);
                                                },
                                              }),
                                            ];
                                          },
                                        }),
                                        null
                                      ),
                                      a(
                                        Z,
                                        d(te, {
                                          get when() {
                                            return (
                                              P().value === "atSpecifiedTime"
                                            );
                                          },
                                          get children() {
                                            return d(se, {
                                              title: "Max Date and Time",
                                              name: "maxDateAndTime",
                                              toolTipText:
                                                "Continue execution after the specified date and time",
                                              onInput: (de) => {
                                                r("maxDateAndTime", de);
                                              },
                                            });
                                          },
                                        }),
                                        null
                                      ),
                                      ne
                                    );
                                  })();
                              },
                            }),
                            d(Me, {
                              name: "Option",
                              dropdownOptions: S,
                              setDropdownOptions: h,
                              selectedOptions: b,
                              setSelectedOptions: x,
                              placeholder: "Add Options",
                              onChange: (z) => {
                                x(z);
                              },
                            }),
                          ];
                        },
                      })
                    ),
                    Q
                  );
                })(),
              ];
            },
          })
        ),
        G
      );
    })();
  };
ge(["click"]);
const io = [
    {
      value: "Tools Agent",
      label: "Tools Agent",
      description: `
        Utilizes structured tool schemas for precise and reliable tool selection and execution. Recommended for complex tasks requiring accurate and consistent tool usage, but only usable with models that support tool calling.`,
    },
    {
      value: "Conversational Agent",
      label: "Conversational Agent",
      description: `
        Describes tools in the system prompt and parses JSON responses for tool calls. More flexible but potentially less reliable than the Tools Agent. Suitable for simpler interactions or with models not supporting structured schemas.`,
    },
    {
      value: "OpenAI Functions Agent",
      label: "OpenAI Functions Agent",
      description: `
        Leverages OpenAI's function calling capabilities to precisely select and execute tools. Excellent for tasks requiring structured outputs when working with OpenAI models.`,
    },
    {
      value: "Plan and Execute Agent",
      label: "Plan and Execute Agent",
      description:
        "Creates a high-level plan for complex tasks and then executes each step. Suitable for multi-stage problems or when a strategic approach is needed.",
    },
    {
      value: "ReAct Agent",
      label: "ReAct Agent",
      description:
        "Combines reasoning and action in an iterative process. Effective for tasks that require careful analysis and step-by-step problem-solving.",
    },
    {
      value: "SQL Agent",
      label: "SQL Agent",
      description:
        "Specializes in interacting with SQL databases. Ideal for data analysis tasks, generating queries, or extracting insights from structured data.",
    },
  ],
  ao = [
    {
      value: "ConnectedChatTriggerNode",
      label: "Connected Chat Trigger Node",
      description:
        "Looks for an input field called 'chatInput' that is coming from a directly connected Chat Trigger.",
      children: [],
    },
    {
      value: "Define below",
      label: "DefineBelow",
      description:
        "Use an expression to reference data in previous nodes or enter static text.",
      children: [],
    },
  ],
  Fn = [
    {
      label: "System Message",
      value: "systemMessage",
      content: {
        type: "textArea",
        title: "System Message",
        value: "You are a helpful assistant.",
        name: "systemMessage",
        toolTipText:
          "The message that will be sent to the agent before the conversation starts.",
      },
    },
    {
      label: "Max Iterations",
      value: "maxIterations",
      content: {
        type: "input",
        title: "Max Iterations",
        value: "10",
        name: "maxIterations",
        toolTipText:
          "The maximum number of iterations the agent will run before stopping.",
      },
    },
    {
      label: "Return Intermediate Steps",
      value: "returnIntermediateSteps",
      content: {
        type: "switch",
        title: "Return Intermediate Steps",
        name: "returnIntermediateSteps",
        toolTipText:
          "Whether or not the output should include intermediate steps the agent took",
      },
    },
    {
      label: "Automatically Passthrough Binary Images",
      value: "passthroughBinaryImages",
      content: {
        type: "switch",
        title: "Automatically Passthrough Binary Images",
        name: "passthroughBinaryImages",
        toolTipText:
          "Whether or not binary images should be automatically passed through to the agent as image type messages.",
      },
    },
  ],
  so = [
    {
      label: "MySQL",
      value: "mysql",
      description: "Connected to a MySQL Database",
    },
    {
      label: "Postgres",
      value: "postgres",
      description: "Connected to a Postgres Database",
    },
    {
      label: "SQLite",
      value: "sqlite",
      description: "Use SQLite by connecting a database file as binary input.",
    },
  ],
  sn = (e, t) => {
    const { nodes: n } = ie(),
      s = (o, i) =>
        o.reduce(
          (c, p) => (
            p in e && (i.includes(p) ? (c[p] = !!e[p]) : (c[p] = e[p])), c
          ),
          {}
        ),
      r = () =>
        s(
          [
            "systemMessage",
            "maxIterations",
            "returnIntermediateSteps",
            "passthroughBinaryImages",
          ],
          ["returnIntermediateSteps", "passthroughBinaryImages"]
        ),
      l = () => {
        const o = n().find((i) => i.id === t);
        if (o)
          return {
            x: Math.trunc(o.currPosition.get().x),
            y: Math.trunc(o.currPosition.get().y),
          };
      };
    return {
      id: t,
      name: "Customer Support Agent",
      description: "Customer Support Agent",
      type: "LangChainAgent",
      parameters: {
        agent: e?.agent,
        promptType: e?.sourceForPrompt,
        text: e?.promptDefineBelow || e?.promptConnectedChatTriggerNode || "",
        options: r(),
      },
      position: l(),
      inputs: [
        {
          id: "input",
          name: "fromSwitch",
          description: "data coming from previous node",
          type: "object",
        },
      ],
      outputs: [
        {
          id: "output",
          name: "agent output",
          description: "tools agent",
          type: "object",
        },
        {
          id: "chatModel",
          name: "toOllama",
          description: "data sending to LangchainAgent chatModel",
          type: "object",
        },
        {
          id: "tool1",
          name: "toTool1",
          description: "data sending to customerSuppertDocs tool",
          type: "tool",
        },
        {
          id: "tool2",
          name: "toTool2",
          description: "data sending to createDraft tool",
          type: "tool",
        },
      ],
    };
  },
  Kp = (e) => {
    if (e) {
      const { parameters: t } = e;
      return {
        agent: t?.agent,
        sourceForPrompt: t?.promptType,
        promptDefineBelow: t?.text,
        promptConnectedChatTriggerNode: t?.text,
        options: t?.options,
      };
    }
  };
function Up() {
  const { formData: e, setFormData: t, currentFormConfig: n } = ie(),
    [s, r] = k(io[0].value),
    [l, o] = k(ao[0].value),
    [i, c] = k(so[0].value),
    [p, u] = k([]),
    [m, v] = k([]),
    [_, E] = k({}),
    [w, D] = k({}),
    [T, S] = k(""),
    h = new Set(),
    b = () => {
      v(Fn), u([]), E({}), D({});
    },
    x = (y, g) => {
      if (
        (console.log("from data handler raw >>>> ", y, " >>>>> ", g),
        console.log("before check: previous data from dataHandler", w()),
        y in w())
      ) {
        if (w()[y] === g) {
          console.log(
            "from data handler:::: >> previous Data,>>> data unchanged, key unchanged",
            _()
          ),
            E((N) => ({ ...N, [y]: g })),
            console.log(
              "from data handler:::: >> submitted data from previous data >>> data unchanged, key unchanged",
              _()
            );
          return;
        } else if (w()[y] !== g) {
          console.log(
            "from data handler, 2,>>> key unchanged but data changed",
            w()
          ),
            console.log(
              "from data handler:::: >> submitted data 1 >>> key unchanged but data changed",
              _()
            ),
            E((C) => ({ ...C, [y]: g })),
            console.log(
              "from data handler:::: >> submitted data 2 >>> key unchanged but data changed",
              _()
            );
          const N = sn(_(), n().id);
          console.log(
            "from data handler:::: >> formatted key >>>  unchanged but data changed",
            N
          ),
            t({ ...e(), [n().id]: N }),
            console.log(
              "from data handler:::: >> formData() >>> key unchanged but data changed",
              e()
            );
        }
      } else {
        console.log("from data handler, 2 >>> both key and data changed", w()),
          console.log(
            "from data handler:::: >> submitted data 1  >>> both key and data changed",
            _()
          ),
          E((C) => ({ ...C, [y]: g })),
          console.log(
            "from data handler:::: >> submitted data 2 >>> both key and data changed",
            _()
          );
        const N = sn(_(), n().id);
        console.log(
          "from data handler:::: >> formatted >>> both key and data changed",
          N
        ),
          t({ ...e(), [n().id]: N }),
          console.log(
            "from data handler:::: >> formData() >>> both key and data changed",
            e()
          );
      }
    },
    I = (y) => {
      console.log("from data remover raw >>>> ", y, " >>>>>> "),
        E((N) =>
          Object.entries(N).reduce(
            (C, [$, f]) => ($.includes(y) || (C[$] = f), C),
            {}
          )
        ),
        console.log(" from data remover >>>> previous data", _());
      const g = sn(_(), n().id);
      console.log("from data remover >>>>> formattedPrev", g),
        t({ ...e(), [n().id]: g }),
        console.log("from data remover >>> form data", e());
    },
    A = (y, g, N) => {
      console.log(y, "not ok");
      const C = y.flatMap(($) => g.filter((f) => f.value === $));
      console.log(C, "ok"), N(($) => [...$, ...C]);
    };
  return (
    be(() => {
      if (
        (console.log(
          n().id,
          "  >  node data  >  ",
          `
`,
          p()
        ),
        console.log(">>>>>>.>>>>>>>>>>>>>>>>>.>>>>>>>>>>>>>>>>>>>>>>>>>"),
        console.log(w(), "from outside"),
        !h.has(n().id))
      ) {
        h.clear(), h.add(n().id), S(n().id);
        const y = e()[n().id];
        if ((console.log("data1", y), b(), !y)) return;
        console.log("data2", y);
        const g = Kp(y);
        g &&
          (console.log(
            "decoded from observer, >>>>>> ",
            n().id,
            g.agent,
            g.sourceForPrompt
          ),
          D((N) => ({
            ...N,
            agent: g.agent,
            sourceForPrompt: g.sourceForPrompt,
            promptDefineBelow: g.promptDefineBelow,
            promptConnectedChatTriggerNode: g.promptConnectedChatTriggerNode,
            ...g.options,
          })),
          console.log(w(), "from inside"),
          console.log(g.sourceForPrompt, "from inside createEffect"),
          r(g.agent),
          o(g.sourceForPrompt),
          A(Object.keys(g.options), Fn, u),
          v(() => Fn.filter((N) => p().every((C) => C.value !== N.value))));
      }
    }),
    {
      selectedOptions: p,
      setSelectedOptions: u,
      submittedData: _,
      dataInsertHandler: x,
      options: m,
      setOptions: v,
      previousData: w,
      setPreviousData: D,
      setSubmittedData: E,
      dataRemoveHandler: I,
      reset: b,
      uniqueKey: T,
      currentAgent: s,
      setCurrentAgent: r,
      currentSourceForPrompt: l,
      setCurrentSourceForPrompt: o,
      dataSource: i,
      setDataSource: c,
    }
  );
}
var Gp = O('<a href=# class="font-semibold text-[#fe705a]">tutorial'),
  Xp = O('<a href=# class="font-semibold text-[#fe705a]">example'),
  Yp = O(
    `<div class="mt-5 space-y-5"><div class="bg-[#584d38] border-[#f2dbb0] border-l-8 border font-extralight text-[#e7e1e1] py-2 px-3 leading-6 rounded-sm">Pass the SQLite database into this node as binary data, e.g. by inserting a 'Read/Write Files from Disk' node beforehand</div><div>`
  ),
  Jp = O('<div class="mt-5 space-y-5"><div></div><div>'),
  Qp = O("<div class=mt-5>"),
  Zp = O(
    '<form class=form id=ai-agentForm><div><div></div><div class=mt-5><div class=mt-4></div></div><div class=mt-5><div class="label hr-solid-line">Options</div><div class="mt-5 space-y-5"></div><div class=mt-5>'
  ),
  ir = O(
    '<div class="group flex items-start gap-1.5 w-full"><div class="text-[#6f6f70] hover:text-[#ff6f5c] mt-1 cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"></div><div class=flex-1>'
  ),
  em = O(
    '<div class="group flex items-start gap-1.5 w-full"><div class="text-[#6f6f70] hover:text-[#ff6f5c] mt-1 cursor-pointer bg-[#36373d] h-fit p-1 rounded-md opacity-0 group-hover:opacity-100"></div><div class=flex-1></div>;'
  );
const tm = (e) => {
  const { currentFormConfig: t } = ie(),
    { formData: n, setFormData: s } = ie(),
    {
      selectedOptions: r,
      setSelectedOptions: l,
      dataInsertHandler: o,
      options: i,
      setOptions: c,
      previousData: p,
      dataRemoveHandler: u,
      uniqueKey: m,
      currentAgent: v,
      setCurrentAgent: _,
      currentSourceForPrompt: E,
      setCurrentSourceForPrompt: w,
      dataSource: D,
      setDataSource: T,
    } = Up(),
    S = () => v() === "Tools Agent" || v() === "Conversational Agent",
    h = (b) => {
      b.preventDefault();
      const x = new FormData(b.target);
      let I = Object.fromEntries(x.entries());
      const A = sn(I, t().id);
      s({ ...n(), [t().id]: A }), console.log(A);
      const y = new CustomEvent("formSubmitEvent", { detail: I, bubbles: !0 }),
        g = document.getElementById("submitBtn");
      g && g.dispatchEvent(y);
    };
  return (() => {
    var b = Zp(),
      x = b.firstChild,
      I = x.firstChild,
      A = I.nextSibling,
      y = A.firstChild,
      g = A.nextSibling,
      N = g.firstChild,
      C = N.nextSibling,
      $ = C.nextSibling;
    return (
      b.addEventListener("submit", h),
      a(
        x,
        d(te, {
          get when() {
            return S();
          },
          get children() {
            return d(qt, {
              get children() {
                return [
                  "Tip: Get a feel for agents with our quick",
                  " ",
                  Gp(),
                  " ",
                  "or see an",
                  " ",
                  Xp(),
                  " ",
                  "of how this node works",
                ];
              },
            });
          },
        }),
        I
      ),
      a(
        I,
        d(Te, {
          name: "agent",
          title: "Agent",
          get uniqueKey() {
            return m();
          },
          get defaultValue() {
            return io[0].value;
          },
          options: io,
          onChange: (f) => {
            _(f.value), o("agent", f.value);
          },
        })
      ),
      a(
        x,
        d(te, {
          get when() {
            return v() === "SQL Agent";
          },
          get children() {
            var f = Jp(),
              P = f.firstChild,
              V = P.nextSibling;
            return (
              a(
                P,
                d(we, {
                  name: "dataSource",
                  options: so,
                  title: "Data Source",
                  get uniqueKey() {
                    return m();
                  },
                  get defaultValue() {
                    return so[0].value;
                  },
                  onChange: (R) => {
                    T(R.value), o("dataSource", R);
                  },
                })
              ),
              a(
                f,
                d(te, {
                  get when() {
                    return D() === "sqlite";
                  },
                  get children() {
                    var R = Yp(),
                      H = R.firstChild,
                      J = H.nextSibling;
                    return (
                      a(
                        J,
                        d(se, {
                          name: "inputBinaryField",
                          title: "Input Binary Field",
                          get uniqueKey() {
                            return m();
                          },
                          placeholder: "e.g. Data",
                          value: "",
                          footNote:
                            "The name of the input binary field containing the file to be extracted",
                          isArrow: !0,
                          onInput: (j) => {
                            o("inputBinaryField", j);
                          },
                        })
                      ),
                      R
                    );
                  },
                }),
                V
              ),
              a(
                V,
                d(te, {
                  get when() {
                    return D() !== "sqlite";
                  },
                  get children() {
                    return d(et, {
                      get name() {
                        return `credential_for_${D()}`;
                      },
                      get title() {
                        return `Credential for ${D()}`;
                      },
                      placeholder: "Select Credential",
                    });
                  },
                })
              ),
              f
            );
          },
        }),
        A
      ),
      a(
        A,
        d(Te, {
          name: "sourceForPrompt",
          title: "Source for Prompt (User message)",
          get uniqueKey() {
            return m();
          },
          options: ao,
          get defaultValue() {
            return ao[0].value;
          },
          onChange: (f) => {
            w(f.value), o("sourceForPrompt", f.value);
          },
        }),
        y
      ),
      a(
        y,
        d(te, {
          get when() {
            return E() === "DefineBelow";
          },
          get children() {
            return d(We, {
              name: "promptDefineBelow",
              title: "Prompt (User message)",
              get value() {
                return p().promptDefineBelow;
              },
              get uniqueKey() {
                return m();
              },
              placeholder: "e.g. Hello, how can you help me?",
              onInput: (f) => {
                o(`prompt${E()}`, f);
              },
            });
          },
        }),
        null
      ),
      a(
        y,
        d(te, {
          get when() {
            return E() === "ConnectedChatTriggerNode";
          },
          get children() {
            return d(se, {
              name: "promptConnectedChatTriggerNode",
              title: "Prompt (User message)",
              placeholder: "{{ $json.chatInput }}",
              get uniqueKey() {
                return m();
              },
              isArrow: !0,
              isExpand: !0,
              get value() {
                return p().promptConnectedChatTriggerNode;
              },
              onInput: (f) => {
                o(`prompt${E()}`, f);
              },
            });
          },
        }),
        null
      ),
      a(
        x,
        d(te, {
          get when() {
            return v() !== "SQL Agent";
          },
          get children() {
            var f = Qp();
            return (
              a(
                f,
                d(_e, {
                  checked: !0,
                  get uniqueKey() {
                    return m();
                  },
                  title: "Require Specific Output Format",
                  name: "requireSpecificOutputFormat",
                })
              ),
              f
            );
          },
        }),
        g
      ),
      a(
        C,
        d(ae, {
          get each() {
            return r();
          },
          children: (f) => {
            if (f.content.type === "textArea")
              return (() => {
                var P = ir(),
                  V = P.firstChild,
                  R = V.nextSibling;
                return (
                  (V.$$click = () => {
                    const H = r().filter((J) => J.value !== f.value);
                    l(H), c([...i(), f]), u(f.value);
                  }),
                  a(V, d(pe, {})),
                  a(
                    R,
                    d(We, {
                      get name() {
                        return f.content.name;
                      },
                      get value() {
                        return f.content.value;
                      },
                      get title() {
                        return f.content.title ?? "";
                      },
                      get toolTipText() {
                        return f.content.toolTipText;
                      },
                      onInput: (H) => {
                        o(f.content.name, H);
                      },
                    })
                  ),
                  P
                );
              })();
            if (f.content.type === "input")
              return (() => {
                var P = em(),
                  V = P.firstChild,
                  R = V.nextSibling;
                return (
                  (V.$$click = () => {
                    const H = r().filter((J) => J.value !== f.value);
                    l(H), c([...i(), f]), u(f.value);
                  }),
                  a(V, d(pe, {})),
                  a(
                    R,
                    d(se, {
                      get name() {
                        return f.content.name;
                      },
                      get uniqueKey() {
                        return m();
                      },
                      get value() {
                        return f.content.value;
                      },
                      get title() {
                        return f.content.title ?? "";
                      },
                      get toolTipText() {
                        return f.content.toolTipText;
                      },
                      onInput: (H) => {
                        o(f.content.name, H);
                      },
                    })
                  ),
                  P
                );
              })();
            if (f.content.type === "switch")
              return (() => {
                var P = ir(),
                  V = P.firstChild,
                  R = V.nextSibling;
                return (
                  (V.$$click = () => {
                    const H = r().filter((J) => J.value !== f.value);
                    l(H), c([...i(), f]), u(f.value);
                  }),
                  a(V, d(pe, {})),
                  a(
                    R,
                    d(_e, {
                      get uniqueKey() {
                        return m();
                      },
                      get checked() {
                        return p()[f.content.name];
                      },
                      get name() {
                        return f.content.name;
                      },
                      get title() {
                        return f.content.title ?? "";
                      },
                      get toolTipText() {
                        return f.content.toolTipText;
                      },
                      onChange: (H) => {
                        o(f.content.name, H);
                      },
                    })
                  ),
                  P
                );
              })();
          },
        })
      ),
      a(
        $,
        d(Me, {
          name: "Ai Agent Options",
          placeholder: "Add Option",
          dropdownOptions: i,
          selectedOptions: r,
          setSelectedOptions: l,
          setDropdownOptions: c,
          onChange: (f) => {
            l(f);
          },
        })
      ),
      W(() => L(I, `${S() ? "mt-5" : "mt-1"}`)),
      b
    );
  })();
};
ge(["click"]);
var nm = O('<div id=parameter class="mt-0 px-5 py-4 ">');
const om = () => {
  const { currentFormConfig: e } = ie();
  return (
    k(),
    (() => {
      var t = nm();
      return (
        a(
          t,
          d(te, {
            get when() {
              return e().name === "switch";
            },
            get children() {
              return d(Ju, {});
            },
          }),
          null
        ),
        a(
          t,
          d(te, {
            get when() {
              return e().name === "edit";
            },
            get children() {
              return d(ku, {});
            },
          }),
          null
        ),
        a(
          t,
          d(te, {
            get when() {
              return e().name === "gmail-trigger";
            },
            get children() {
              return d(Mc, {});
            },
          }),
          null
        ),
        a(
          t,
          d(te, {
            get when() {
              return e().name === "ai-agent";
            },
            get children() {
              return d(Yc, {});
            },
          }),
          null
        ),
        a(
          t,
          d(te, {
            get when() {
              return e().name === "customer-support-agent";
            },
            get children() {
              return d(tm, {});
            },
          }),
          null
        ),
        a(
          t,
          d(te, {
            get when() {
              return e().name === "ollama-chat";
            },
            get children() {
              return d(tu, {});
            },
          }),
          null
        ),
        a(
          t,
          d(te, {
            get when() {
              return e().name === "send-email";
            },
            get children() {
              return d(_u, {});
            },
          }),
          null
        ),
        a(
          t,
          d(te, {
            get when() {
              return e().name === "vector-store";
            },
            get children() {
              return d(tp, {});
            },
          }),
          null
        ),
        a(
          t,
          d(te, {
            get when() {
              return e().name === "pg-vector";
            },
            get children() {
              return d(hp, {});
            },
          }),
          null
        ),
        a(
          t,
          d(te, {
            get when() {
              return e().name === "embedding";
            },
            get children() {
              return d(xp, {});
            },
          }),
          null
        ),
        a(
          t,
          d(te, {
            get when() {
              return e().name === "create-draft";
            },
            get children() {
              return d(Wp, {});
            },
          }),
          null
        ),
        W((n) => Be(t, { [zl.param]: !0 }, n)),
        t
      );
    })()
  );
};
var rm = O(
    '<div class="relative w-full"><select multiple title=select class="w-full appearance-none bg-[#1e1f2b] text-white text-sm px-4 py-2 rounded-md border border-neutral-700 shadow-sm hover:border-[#dad7d742] focus:outline-none focus:ring-2 focus:ring-[#dad7d742] transition"></select><div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400"><svg class="w-4 h-4"fill=none stroke=currentColor stroke-width=2 viewBox="0 0 24 24"><path stroke-linecap=round stroke-linejoin=round d="M19 9l-7 7-7-7">'
  ),
  lm = O("<option>");
const im = ({ options: e, onOption: t, name: n }) => {
  const [s, r] = k(0),
    l = (o) => {
      const i = o.target.selectedIndex;
      r(i), t?.(e[i]);
    };
  return (
    Ie(() => {
      t?.(e[0]);
    }),
    (() => {
      var o = rm(),
        i = o.firstChild;
      return (
        i.addEventListener("change", l),
        le(i, "name", n),
        a(i, () =>
          e.map((c) =>
            (() => {
              var p = lm();
              return a(p, () => c.label), W(() => (p.value = c.value)), p;
            })()
          )
        ),
        o
      );
    })()
  );
};
var am = O(
  '<div class="flex flex-col text-sm text-gray-300 font-sans"><div class="text-sm flex items-center gap-1 group mb-1"><div>Notes</div><div class="relative w-3 select-none h-3 text-xs rounded-full bg-white text-black flex items-center justify-center font-semibold group-hover:opacity-100 opacity-0 cursor-auto">?</div></div><textarea title=notes id=notes class="text-gray-200 border focus:outline-none focus:ring-2 focus:ring-[#dad7d742] focus:border-[#dad7d742] focus:bg-[#282a39] border-neutral-700 bg-[#282a39] outline-none p-2 rounded resize-y min-h-[100px] font-mono">'
);
const sm = ({ toolTipContent: e }) => {
  const [t, n] = k(""),
    [s, r] = k(!1);
  return (() => {
    var l = am(),
      o = l.firstChild,
      i = o.firstChild,
      c = i.nextSibling;
    c.firstChild;
    var p = o.nextSibling;
    return (
      c.addEventListener("mouseleave", () => r(!1)),
      c.addEventListener("mouseenter", () => r(!0)),
      a(c, d(Re, { showTooltip: s, toolTipContent: e }), null),
      (p.$$input = (u) => n(u.target.value)),
      W(() => (p.value = t())),
      l
    );
  })();
};
ge(["input"]);
var dm = O(
  '<div class="mt-0 px-5 py-4 overflow-visible"><div class=text-white><div class="mt-3 space-y-3"><div class=mt-6><hr class=border-[#373749]><p class="mt-1 text-[#737475] text-sm">Switch node version 2.3.2(latest)'
);
const cm = (e) => {
  k(!1);
  const { currentFormConfig: t, settingConfig: n } = ie(),
    s = [
      {
        value: "Stop workflow",
        label: "Stop workflow",
        description: "Halt execution and fail workflow.",
      },
      {
        value: "Continue",
        label: "Continue",
        description: "Press Error message as item in regular output.",
      },
      {
        value: "Continue(using error output)",
        label: "Continue(using error output)",
        description: "Pass item to an extra `error` output.",
      },
    ];
  return (() => {
    var r = dm(),
      l = r.firstChild,
      o = l.firstChild,
      i = o.firstChild;
    return (
      a(
        o,
        () =>
          n()?.settings.map((c, p) => {
            if (c.type === "dropdown") return d(im, { options: s });
            c.type;
          }),
        i
      ),
      a(
        o,
        d(sm, {
          toolTipContent: {
            label: "",
            text: "Optional note to save with the node",
          },
        }),
        i
      ),
      a(
        o,
        d(_e, { switchText: "", toolTipContent: { label: "", text: "" } }),
        i
      ),
      r
    );
  })();
};
var um = O(
  '<div id=mid-panel class="flex flex-col h-full bg-gradient-to-b from-[#2A2A3A] to-[#232333] w-2/4 overflow-auto"><div class="flex justify-between items-center p-4 bg-gradient-to-r from-[#2A2A40] via-[#323248] to-[#2A2A40] border-b border-gray-700/50"><div class="flex items-center"><div class="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center mr-2"><svg class=text-white xmlns=http://www.w3.org/2000/svg width=12 height=12 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><path d="M2 12h10M9 6l6 6-6 6"></path></svg></div><span class="text-white font-medium"></span></div><button id=submitBtn type=submit class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all cursor-pointer px-5 py-2 rounded-md">Test step</button></div><div class="h-full flex-1 overflow-visible"><div class=w-full><div class="border-b border-gray-700/50 bg-[#232130]"><div class="flex border-b border-gray-700/30 rounded-none w-full justify-start px-4 h-auto pb-1 *:cursor-pointer"><div>Parameters</div><div>Settings</div></div></div><div class=overflow-visible><div></div><div>'
);
const pm = (e) => {
  const { currentFormConfig: t } = ie(),
    [n, s] = k(0);
  return (() => {
    var r = um(),
      l = r.firstChild,
      o = l.firstChild,
      i = o.firstChild,
      c = i.nextSibling,
      p = o.nextSibling,
      u = l.nextSibling,
      m = u.firstChild,
      v = m.firstChild,
      _ = v.firstChild,
      E = _.firstChild,
      w = E.nextSibling,
      D = v.nextSibling,
      T = D.firstChild,
      S = T.nextSibling;
    return (
      a(c, () => t().title),
      (E.$$click = () => s(0)),
      (w.$$click = () => s(1)),
      a(T, d(om, {})),
      a(S, d(cm, {})),
      W(
        (h) => {
          var b = { [zl.midPanel]: !0 },
            x = `${t().name}Form`,
            I = `rounded-none border-b-2 ${
              n() == 0 ? "border-purple-500" : "border-transparent"
            } data-[state=active]:text-white text-gray-400 hover:text-white px-4 py-2`,
            A = `rounded-none border-b-2 ${
              n() == 1 ? "border-purple-500" : "border-transparent"
            } data-[state=active]:text-white text-gray-400 hover:text-white px-4 py-2`,
            y = n() === 0 ? "" : "hidden",
            g = n() === 1 ? "" : "hidden";
          return (
            (h.e = Be(r, b, h.e)),
            x !== h.t && le(p, "form", (h.t = x)),
            I !== h.a && L(E, (h.a = I)),
            A !== h.o && L(w, (h.o = A)),
            y !== h.i && L(T, (h.i = y)),
            g !== h.n && L(S, (h.n = g)),
            h
          );
        },
        { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0, n: void 0 }
      ),
      r
    );
  })();
};
ge(["click"]);
const mm = "_rightPanel_1ew1b_1",
  gm = { rightPanel: mm };
var hm = O(
  '<div class="bg-gradient-to-br from-[#1c1c24] to-[#222230] h-full rounded-br-lg w-1/4 overflow-auto"><div class="p-4 text-white h-full"><h3 class="uppercase text-xs text-blue-300 font-semibold mb-2 tracking-wider">Output'
);
const fm = (e) =>
  (() => {
    var t = hm(),
      n = t.firstChild;
    return (
      n.firstChild,
      a(
        n,
        d(gn, {
          data: {
            user: {
              id: 123456,
              name: "Jane Doe",
              email: "jane.doe@example.com",
              isActive: !0,
              roles: ["admin", "editor", "viewer"],
              profile: {
                age: 29,
                gender: "female",
                address: {
                  street: "1234 Elm Street",
                  city: "Springfield",
                  state: "IL",
                  postalCode: "62704",
                  country: "USA",
                },
                preferences: {
                  newsletter: !0,
                  notifications: { email: !0, sms: !1, push: !0 },
                  theme: "dark",
                },
              },
            },
            projects: [
              {
                id: "p001",
                title: "Redesign Website",
                status: "in-progress",
                tags: ["design", "frontend", "UX"],
                deadline: "2025-08-01T00:00:00Z",
              },
              {
                id: "p002",
                title: "API Migration",
                status: "completed",
                tags: ["backend", "migration", "architecture"],
                deadline: "2024-12-15T00:00:00Z",
              },
              {
                id: "p003",
                title: "Mobile App Launch",
                status: "pending",
                tags: ["mobile", "launch", "iOS", "Android"],
                deadline: null,
              },
            ],
            logs: [
              {
                timestamp: "2025-05-16T10:00:00Z",
                event: "User login",
                success: !0,
              },
              {
                timestamp: "2025-05-16T10:05:32Z",
                event: "Viewed dashboard",
                success: !0,
              },
              {
                timestamp: "2025-05-16T10:15:42Z",
                event: "Attempted API access",
                success: !1,
                error: "403 Forbidden",
              },
            ],
            metadata: {
              requestId: "abc123xyz789",
              environment: "production",
              version: "1.0.5",
              features: { betaAccess: !1, multiTenant: !0, autoSave: !0 },
            },
          },
        }),
        null
      ),
      W((s) => Be(t, { [gm.rightPanel]: !0 }, s)),
      t
    );
  })();
var vm = O('<div class="flex items-start h-full w-full overflow-hidden">');
const bm = (e) =>
  (() => {
    var t = vm();
    return (
      a(t, d(Rd, {}), null), a(t, d(pm, {}), null), a(t, d(fm, {}), null), t
    );
  })();
var xm = O(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 16 16"height=1em width=1em style=overflow:visible;color:currentcolor;><path fill-rule=evenodd d="m7 3.093-5 5V8.8l5 5 .707-.707-4.146-4.147H14v-1H3.56L7.708 3.8 7 3.093z"clip-rule=evenodd>'
);
const ym = (e) => xm();
var wm = O(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=1em width=1em style=overflow:visible;color:currentcolor;><defs><style></style></defs><path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8Z"></path><path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8Z">'
);
const $m = (e) => wm();
var _m = O(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="m563.8 512 262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z">'
);
const Tm = (e) => _m();
var Cm = O(
  '<svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=1em width=1em style=overflow:visible;color:currentcolor;><path d="M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z">'
);
const Im = (e) => Cm();
var Sm = O(
  '<div class="bg-gradient-to-r from-[#292942] via-[#32324F] to-[#292942] h-[60px] w-full flex justify-between items-center p-4 border-b border-gray-700/50 rounded-t-lg"><div class="flex cursor-pointer items-center font-medium text-white gap-x-2.5"><div class="text-xl text-[#a7a4a4] "></div><div class=text-base>Back to canvas</div></div><div class="flex items-center gap-3 *:rounded-full *:p-[1px] *:w-[12px] *:h-[12px] *:text-[10px] *:flex *:justify-center *:items-center text-white text-xs"><div class="bg-[#ee4444] text-[#ee4444] hover:bg-[#c6152d] hover:text-[#8f0618] cursor-pointer"></div><div class="bg-[#eeb903] text-[#eeb903] hover:bg-[#eeb903] hover:text-[#9c7905] cursor-pointer"></div><div class="bg-[#23c55e] text-[#23c55e] hover:bg-[#14a047] hover:text-[#0a7e35] cursor-pointer">'
);
const Em = (e) => {
  const { currentFormConfig: t, setIsModalOpen: n } = ie();
  return (() => {
    var s = Sm(),
      r = s.firstChild,
      l = r.firstChild,
      o = r.nextSibling,
      i = o.firstChild,
      c = i.nextSibling,
      p = c.nextSibling;
    return (
      (r.$$click = () => n(!1)),
      a(l, d(ym, {})),
      a(i, d(Tm, {})),
      a(c, d(Im, {})),
      a(p, d($m, {})),
      s
    );
  })();
};
ge(["click"]);
var Om = O(
    `<div class="flex h-full"><div class="flex-1 pr-4"><div class=mb-4><label class="block text-sm mb-1">Connect using <span class=text-red-500>*</span></label><div class="flex gap-2"><label class="flex items-center gap-1 bg-[#333345] px-2 py-1 rounded cursor-pointer"><input name=connectMethod type=radio value=oauth2><span class=text-sm>OAuth2 (recommended)</span></label><label class="flex items-center gap-1 bg-[#333345] px-2 py-1 rounded cursor-pointer"><input type=radio name=connectMethod value=service><span class=text-sm>Service Account</span></label></div></div><div class=mb-4><label class="block text-sm mb-1">OAuth Redirect URL</label><input type=text name=oauthRedirectUrl class="w-full bg-[#333345] border border-gray-700 rounded p-2 text-sm"value=https://workflow.juwelt.net/rest/oauth2-credentials/callback title="OAuth Redirect URL"placeholder="OAuth Redirect URL"><p class="text-xs text-gray-400 mt-1">In Gmail, use this URL above when prompted to enter an OAuth callback or redirect URL.</p></div><div class=mb-4><input type=text name=clientId class="w-full bg-[#333345] border border-gray-700 rounded p-2 text-sm"title="Client ID"placeholder="Enter your Client ID"></div><div class=mb-4><input autocomplete=off type=password name=clientSecret class="w-full bg-[#333345] border border-gray-700 rounded p-2 text-sm"value title="Client Secret"placeholder="Enter your Client Secret"></div><div class="flex items-center gap-1 text-xs text-gray-400"><span class="w-4 h-4 flex items-center justify-center rounded-full border border-gray-400">i</span><span>Enterprise plan users can pull in credentials from external vaults. <a href=# class=text-blue-400>More info</a></span></div></div><div id=right class="w-[300px] bg-[#252535] rounded p-4 h-full"><div class="flex justify-between items-center mb-4"><h3 class="text-sm font-medium">Setup guide</h3><a href=# class="text-xs text-blue-400 flex items-center gap-1">Docs<svg xmlns=http://www.w3.org/2000/svg width=12 height=12 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1=10 y1=14 x2=21 y2=3></line></svg></a></div><div class="text-xs text-gray-300 overflow-y-auto h-full"><p class=mb-2>Configure this credential:</p><ul class="list-disc pl-5 space-y-2"><li>Log in to your <a href=# class=text-blue-400>Google Cloud console</a>.</li><li>Go to Google Cloud Console / APIs and Services / Credentials. If you don't have a project yet, you'll need to create a new one and select it.</li><li>If you haven't used OAuth in this Google Cloud project before, <a href=# class=text-blue-400>configure the consent screen</a>.</li><li>In Credentials, select + CREATE CREDENTIALS + OAuth client ID.</li><li>In the Application type dropdown, select Web application.</li><li>Under Authorized redirect URLs, select + ADD URI. Paste in the OAuth redirect URL shown on the left.</li><li>Select Create.</li><li>In Enabled APIs and services, select + ENABLE APIS AND SERVICES.</li><li>Select and enable the Gmail API.</li><li>Back to Credentials, click on the credential in OAuth 2.0 Client IDs, and copy the Client ID and Client Secret.</li></ul><p class=mt-2>Click the docs link above for more detailed instructions.`
  ),
  Dm = O("<div class=text-sm>Sharing settings content goes here..."),
  Nm = O("<div class=text-sm>Details content goes here..."),
  km = O(
    '<form><div class="bg-[#2a2a3a] text-white rounded-md shadow-lg w-full h-full"><div class="p-4 flex justify-between items-center border-b border-gray-700 "><div class="flex items-center gap-2"><h2 class="text-base font-medium">Gmail account 4</h2><span class="text-xs text-gray-400">Gmail OAuth2 API</span></div><div class="flex items-center gap-2"><button type=submit form=modal2 class="bg-[#ff5c5c] hover:bg-red-600 text-white text-xs px-3 py-1 rounded">Save</button><button class="text-gray-400 hover:text-white">×</button></div></div><div class="flex w-full h-full"><div class="min-w-[150px] w-[200px] max-w-[250px] bg-[#252535] p-4 flex flex-col gap-3 rounded-bl-md"><button>Connection</button><button>Sharing</button><button>Details</button></div><div class=" p-4 h-full w-full">'
  );
function Pm() {
  const [e, t] = k("connection"),
    [n, s] = k("oauth2"),
    {
      setIsModalOpen2: r,
      setFormData: l,
      currentFormConfig: o,
      formData: i,
    } = ie();
  return (() => {
    var c = km(),
      p = c.firstChild,
      u = p.firstChild,
      m = u.firstChild,
      v = m.nextSibling,
      _ = v.firstChild,
      E = _.nextSibling,
      w = u.nextSibling,
      D = w.firstChild,
      T = D.firstChild,
      S = T.nextSibling,
      h = S.nextSibling,
      b = D.nextSibling;
    return (
      (E.$$click = () => r(!1)),
      (T.$$click = () => t("connection")),
      (S.$$click = () => t("sharing")),
      (h.$$click = () => t("details")),
      a(
        b,
        d(te, {
          get when() {
            return e() === "connection";
          },
          get children() {
            var x = Om(),
              I = x.firstChild,
              A = I.firstChild,
              y = A.firstChild,
              g = y.nextSibling,
              N = g.firstChild,
              C = N.firstChild,
              $ = N.nextSibling,
              f = $.firstChild,
              P = A.nextSibling,
              V = P.firstChild,
              R = V.nextSibling,
              H = P.nextSibling,
              J = H.firstChild,
              j = H.nextSibling,
              K = j.firstChild;
            return (
              R.addEventListener("change", (B) => {
                l({
                  ...i(),
                  [o().id]: {
                    ...i()[o().id],
                    "OAuth Redirect URL": B.target.value,
                  },
                });
              }),
              J.addEventListener("change", (B) => {
                l({
                  ...i(),
                  [o().id]: { ...i()[o().id], "Client ID": B.target.value },
                });
              }),
              K.addEventListener("change", (B) => {
                l({
                  ...i(),
                  [o().id]: { ...i()[o().id], "Client Secret": B.target.value },
                });
              }),
              W(() => (C.checked = n() === "oauth2")),
              W(() => (f.checked = n() === "service")),
              x
            );
          },
        }),
        null
      ),
      a(
        b,
        d(te, {
          get when() {
            return e() === "sharing";
          },
          get children() {
            return Dm();
          },
        }),
        null
      ),
      a(
        b,
        d(te, {
          get when() {
            return e() === "details";
          },
          get children() {
            return Nm();
          },
        }),
        null
      ),
      W(
        (x) => {
          var I = `text-left text-sm ${
              e() === "connection" ? "text-white" : "text-gray-400"
            }`,
            A = `text-left text-sm ${
              e() === "sharing" ? "text-white" : "text-gray-400"
            }`,
            y = `text-left text-sm ${
              e() === "details" ? "text-white" : "text-gray-400"
            }`;
          return (
            I !== x.e && L(T, (x.e = I)),
            A !== x.t && L(S, (x.t = A)),
            y !== x.a && L(h, (x.a = y)),
            x
          );
        },
        { e: void 0, t: void 0, a: void 0 }
      ),
      c
    );
  })();
}
ge(["click"]);
var Am = O(
  '<div class="bg-[#20202c] text-white rounded-lg w-full min-h-[400px] max-h-[800px] flex flex-col"><div class="flex items-center justify-between p-4 border-b border-[#39393b] flex-shrink-0"><h2 class="text-xl font-medium">Edit Sender</h2><div class="text-gray-400 hover:text-white text-xs cursor-pointer bg-[#151520] rounded-md w-6 h-6 flex justify-center items-center">✕</div></div><div class="p-4 flex flex-col flex-1"><label class="text-base text-gray-300 mb-2 font-semibold">Sender</label><textarea placeholder=... class="min-h-[300px] border rounded p-3 border-neutral-700 bg-[#252631] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#dad7d742] focus:border-[#dad7d742] focus:bg-[#282a39] transition-colors resize-y">'
);
const Mm = () => {
  const { setIsModalOpen3: e } = ie();
  return (() => {
    var t = Am(),
      n = t.firstChild,
      s = n.firstChild,
      r = s.nextSibling;
    return (r.$$click = () => e(!1)), t;
  })();
};
ge(["click"]);
function li(e) {
  const t = new Set(["input", "br", "hr", "img", "meta", "link"]);
  if (e.nodeType === Node.TEXT_NODE) {
    const i = e.textContent.trim();
    return i ? { textContent: i } : null;
  }
  if (e.nodeType !== Node.ELEMENT_NODE) return null;
  const n = e.tagName.toLowerCase(),
    s = { startTag: n };
  t.has(n) ? (s.endTag = "/") : (s.endTag = `/${n}`);
  let r = [],
    l = {};
  e.attributes?.length &&
    (Array.from(e.attributes).forEach((i) => {
      const c = i.name,
        p = i.value;
      if (c.startsWith("on")) {
        const u = c.slice(2);
        l[u] = p;
      } else r.push({ key: c, value: c === "required" ? !0 : p });
    }),
    r.length && (s.attr = r),
    Object.keys(l).length > 0 && (s.on = l));
  const o = Array.from(e.childNodes).map(li).filter(Boolean);
  return (
    o.length === 1 && o[0].textContent && !o[0].startTag
      ? (s.textContent = o[0].textContent)
      : o.length && (s.elements = o),
    s
  );
}
var Vm = O(
  "<div><div><span></span>Data processing...</div><button id=allSubmit>Test WorkFlow</button><button id=domJson>DOM to JSON"
);
const Lm = (e) => {
  const { formData: t, nodes: n, edges: s } = ie();
  k("");
  const [r, l] = k(!1);
  function o() {
    const c = s().map((v) => ({
        id: v.id,
        sourceNodeId: v.nodeStartId,
        sourcePortId: v.outputVertexId,
        targetNodeId: v.nodeEndId,
        targetPortId: v.inputVertexId,
      })),
      p = {
        name: "Email Analyzer",
        description:
          "A workflow demonstrating multiple inputs and outputs per node",
        nodes: Object.values(t()),
        connections: c,
      };
    console.log(JSON.stringify(p));
    const u = new CustomEvent("sendAllData", {
        detail: JSON.stringify(p, null, 2),
        bubbles: !0,
      }),
      m = document.getElementById("allSubmit");
    m && m.dispatchEvent(u);
  }
  const i = () => {
    const c = document.getElementById("flow");
    console.log(c);
    const p = li(c);
    console.log(p), console.log(JSON.stringify(p));
  };
  return (() => {
    var c = Vm(),
      p = c.firstChild,
      u = p.firstChild,
      m = p.nextSibling,
      v = m.nextSibling;
    return (
      (m.$$click = o),
      (v.$$click = i),
      W(
        (_) => {
          var E = Ee.testWorkFlow,
            w = `fixed ${
              r() ? "top-2" : "-top-20"
            } px-5 py-3 bg-white rounded-md text-black flex items-center gap-2`,
            D = Ee.loader,
            T = Ee.testButton,
            S = Ee.testButton;
          return (
            E !== _.e && L(c, (_.e = E)),
            w !== _.t && L(p, (_.t = w)),
            D !== _.a && L(u, (_.a = D)),
            T !== _.o && L(m, (_.o = T)),
            S !== _.i && L(v, (_.i = S)),
            _
          );
        },
        { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
      ),
      c
    );
  })();
};
ge(["click"]);
var Fm = O(
  '<div id=boardWrapper class="w-screen h-screen overflow-hidden relative z-0"tabindex=0>'
);
const Bm = ({ node: e }) => {
    const [t, n] = k(),
      {
        nodes: s,
        setNodes: r,
        selectedNode: l,
        setSelectedNode: o,
        pendingOutput: i,
        lastClickPosition: c,
        setEdges: p,
        edges: u,
        transform: m,
        scale: v,
        setIsModalOpen: _,
        isModalOpen: E,
        isModalOpen2: w,
        setIsModalOpen2: D,
        isModalOpen3: T,
        setIsModalOpen3: S,
        currentFormConfig: h,
        setPreviousFormConfig: b,
        setFormData: x,
        formData: I,
      } = ie(),
      A = ($, f, P, V, R, H, J) => {
        let j = window.innerWidth / 2,
          K = window.innerHeight / 2;
        const B = l(),
          F = i(),
          q = c();
        function M(Z, de = 200, ue = 0) {
          const ce = s().find((Ne) => Ne.id === Z);
          if ((n(ce), !ce)) return null;
          const fe = ce.currPosition.get();
          return { x: fe.x + de, y: fe.y + ue };
        }
        if (B) {
          let Z = M(B);
          Z && ((j = Z.x), (K = Z.y));
        } else if (F) {
          let Z = M(F.nodeId);
          Z && ((j = Z.x), (K = Z.y));
        } else q && ((j = (q.x - m().x) / v()), (K = (q.y - m().y) / v()));
        const [G, X] = k([]),
          [Y, re] = k([]),
          [U, Q] = k([]),
          [z, ne] = k({ x: j, y: K }),
          [ee, me] = k({ x: j, y: K });
        rt(() =>
          r([
            ...s(),
            {
              id: $,
              name: f,
              title: e[f].title,
              numberInputs: e[f].numberInputs,
              numberOutputs: e[f].numberOutputs,
              isInputVertex: e[f].isInputVertex,
              isOutputVertex: e[f].isOutputVertex,
              inputVertexIds: P,
              outputVertexIds: V,
              isDownVertex: e[f].isDownVertex || !1,
              isUpVertex: e[f].isUpVertex || !1,
              downVertexNumber: e[f].downVertexNumber || 0,
              upVertexNumber: e[f].upVertexNumber || 0,
              downVertexIds: R,
              upVertexIds: H,
              downVertexOrientation: e[f].downVertexOrientation,
              busyIndex: { get: U, set: Q },
              content: e[f].content,
              prevPosition: { get: z, set: ne },
              currPosition: { get: ee, set: me },
              inputEdgeIds: { get: G, set: X },
              outputEdgeIds: { get: Y, set: re },
            },
          ])
        );
      };
    function y($ = 0) {
      console.log(t());
      const f = s()[s().length - 1];
      let P, V, R, H, J;
      if (t()?.isDownVertex && f.isUpVertex) {
        let re = document.getElementById(t().downVertexIds[$]);
        const {
          left: U,
          right: Q,
          top: z,
          bottom: ne,
        } = re.getBoundingClientRect();
        (P = U + Math.abs(U - Q) / 2), (V = z + Math.abs(z - ne) / 2);
        const ee = document.getElementById(f.upVertexIds[0]),
          {
            left: me,
            right: Z,
            top: de,
            bottom: ue,
          } = ee.getBoundingClientRect();
        (R = me + Math.abs(me - Z) / 2),
          (H = de + Math.abs(de - ue) / 2),
          (J = "dash");
      } else {
        let re = document.getElementById(t().outputVertexIds[$]);
        const {
          left: U,
          right: Q,
          top: z,
          bottom: ne,
        } = re.getBoundingClientRect();
        (P = U + Math.abs(U - Q) / 2), (V = z + Math.abs(z - ne) / 2);
        const ee = document.getElementById(f.inputVertexIds[0]),
          {
            left: me,
            right: Z,
            top: de,
            bottom: ue,
          } = ee.getBoundingClientRect();
        (R = me + Math.abs(me - Z) / 2),
          (H = de + Math.abs(de - ue) / 2),
          (J = "solid");
      }
      const [j, K] = k({ x: (P - m().x) / v(), y: (V - m().y) / v() }),
        [B, F] = k({ x: (R - m().x) / v(), y: (H - m().y) / v() }),
        [q, M] = k({ x: (P - m().x) / v(), y: (V - m().y) / v() }),
        [G, X] = k({ x: (R - m().x) / v(), y: (H - m().y) / v() }),
        Y = `edge_${t().id}_${$}_${f.id}_0`;
      t().outputEdgeIds.set([...t().outputEdgeIds.get(), Y]),
        f.inputEdgeIds.set([...f.inputEdgeIds.get(), Y]),
        p([
          ...u(),
          {
            id: Y,
            nodeStartId: t().id,
            nodeEndId: f.id,
            inputIndex: 0,
            typeOfEdge: J,
            outputIndex: $,
            inputVertexId: f.inputVertexIds[0],
            outputVertexId: t().outputVertexIds[$],
            prevStartPosition: { get: j, set: K },
            prevEndPosition: { get: B, set: F },
            currStartPosition: { get: q, set: M },
            currEndPosition: { get: G, set: X },
          },
        ]),
        t().busyIndex.set([...t().busyIndex.get(), t().outputVertexIds[$]]);
    }
    function g($, f, P) {
      const V = [
          ...Array(Number(e[$].numberInputs))
            .keys()
            .map(() => `vertex_${Math.random().toString(36).substring(2, 8)}`),
        ],
        R = [
          ...Array(Number(e[$].numberOutputs))
            .keys()
            .map(() => `vertex_${Math.random().toString(36).substring(2, 8)}`),
        ],
        H = [
          ...Array(Number(e[$].downVertexNumber || 0))
            .keys()
            .map(() => `vertex_${Math.random().toString(36).substring(2, 8)}`),
        ],
        J = [
          ...Array(Number(e[$].upVertexNumber || 0))
            .keys()
            .map(() => `vertex_${Math.random().toString(36).substring(2, 8)}`),
        ],
        j = `node_${Math.random().toString(36).substring(2, 8)}_${$}`;
      A(j, $, V, R, H, J);
      const K = s()[s().length - 1];
      l()
        ? t()?.isOutputVertex && K.isInputVertex && y()
        : i() &&
          t()?.isOutputVertex &&
          K.isInputVertex &&
          y(i().outputVertexIndex),
        s().length <= 1 && s()[0].isOutputVertex
          ? o(s()[0].id)
          : (t()?.isOutputVertex || t()?.isDownVertex) &&
            K.isInputVertex &&
            o(K.id);
    }
    k(null), k(null);
    const N = ($) => {
        let f = $.currentPosition.x,
          P = $.currentPosition.y;
        const V = [
            ...Array(Number($.restNumberInput || 0))
              .keys()
              .map(
                () => `vertex_${Math.random().toString(36).substring(2, 8)}`
              ),
          ],
          R = [
            ...Array(Number($.restNumberOutput || 0))
              .keys()
              .map(
                () => `vertex_${Math.random().toString(36).substring(2, 8)}`
              ),
          ],
          H = [
            ...Array(Number($.restDownVertexNumber || 0))
              .keys()
              .map(
                () => `vertex_${Math.random().toString(36).substring(2, 8)}`
              ),
          ],
          J = [
            ...Array(Number($.restUpVertexNumber || 0))
              .keys()
              .map(
                () => `vertex_${Math.random().toString(36).substring(2, 8)}`
              ),
          ],
          [j, K] = k([]),
          [B, F] = k([]),
          [q, M] = k([]),
          [G, X] = k({ x: f, y: P }),
          [Y, re] = k({ x: f, y: P }),
          U = [...($.inputVertexIds ?? []), ...V],
          Q = [...($.outputVertexIds ?? []), ...R],
          z = [...($.downVertexIds ?? []), ...H],
          ne = [...($.upVertexIds ?? []), ...J];
        rt(() =>
          r([
            ...s(),
            {
              id: $.nodeId,
              name: $.nodeName,
              title: e[$.nodeName].title,
              numberInputs: U.length,
              numberOutputs: Q.length,
              downVertexNumber: z.length || 0,
              upVertexNumber: ne.length || 0,
              isInputVertex: e[$.nodeName].isInputVertex,
              isOutputVertex: e[$.nodeName].isOutputVertex,
              isDownVertex: e[$.nodeName].isDownVertex || !1,
              isUpVertex: e[$.nodeName].isUpVertex || !1,
              inputVertexIds: U,
              outputVertexIds: Q,
              downVertexIds: z,
              upVertexIds: ne,
              downVertexOrientation: e[$.nodeName].downVertexOrientation,
              busyIndex: { get: q, set: M },
              content: e[$.nodeName].content,
              prevPosition: { get: G, set: X },
              currPosition: { get: Y, set: re },
              inputEdgeIds: { get: j, set: K },
              outputEdgeIds: { get: B, set: F },
            },
          ])
        );
      },
      C = ($, f, P, V, R) => {
        s()[s().length - 1];
        const H = document.getElementById(P),
          { left: J, right: j, top: K, bottom: B } = H.getBoundingClientRect();
        let F = J + Math.abs(J - j) / 2,
          q = K + Math.abs(K - B) / 2;
        const M = document.getElementById(V),
          { left: G, right: X, top: Y, bottom: re } = M.getBoundingClientRect();
        let U = G + Math.abs(G - X) / 2,
          Q = Y + Math.abs(Y - re) / 2;
        const [z, ne] = k({ x: (F - m().x) / v(), y: (q - m().y) / v() }),
          [ee, me] = k({ x: (U - m().x) / v(), y: (Q - m().y) / v() }),
          [Z, de] = k({ x: (F - m().x) / v(), y: (q - m().y) / v() }),
          [ue, ce] = k({ x: (U - m().x) / v(), y: (Q - m().y) / v() }),
          fe = `edge_${$.id}_0_${f.id}_0`;
        $.outputEdgeIds.set([...$.outputEdgeIds.get(), fe]),
          f.inputEdgeIds.set([...f.inputEdgeIds.get(), fe]),
          p([
            ...u(),
            {
              id: fe,
              nodeStartId: $.id,
              nodeEndId: f.id,
              inputIndex: 0,
              typeOfEdge: R,
              outputIndex: $?.outputVertexIds.findIndex((Ne) => Ne === P) || 0,
              inputVertexId: V,
              outputVertexId: P,
              prevStartPosition: { get: z, set: ne },
              prevEndPosition: { get: ee, set: me },
              currStartPosition: { get: Z, set: de },
              currEndPosition: { get: ue, set: ce },
            },
          ]),
          $.busyIndex.set([...$.busyIndex.get(), P]);
      };
    return (
      Ie(() => {
        const $ = (f) => {
          const P = f.clipboardData?.getData("text/plain");
          if (P) {
            const V = JSON.parse(P),
              R = {},
              H = {
                Switch: "switch",
                "Edit Fields": "edit",
                "AI Agent": "ai-agent",
                "Customer Support Agent": "customer-support-agent",
                "Vector Store Tool": "vector-store",
                "PGVector Store": "pg-vector",
                "Ollama Chat Model": "ollama-chat",
                "Gmail Trigger": "gmail-trigger",
                Embeddings: "embedding",
              };
            console.log(V);
            const J = V.nodes,
              j = V.connections;
            J.forEach((K) => {
              R[K.id] = K;
            }),
              x(R),
              J.forEach((K, B) => {
                if (e[H[K.name]].isOutputVertex)
                  if (e[H[K.name]].isDownVertex) {
                    const F = {};
                    (F.nodeId = K.id),
                      (F.nodeName = H[K.name]),
                      (F.currentPosition = K.position);
                    const q = [];
                    j.forEach((U) => {
                      if (U.sourceNodeId === K.id) {
                        const Q = J.find((z) => z.id === U.targetNodeId);
                        e[H[Q.name]].isUpVertex || q.includes(U) || q.push(U);
                      }
                    });
                    const M = [];
                    q.forEach((U) => {
                      M.includes(U.sourcePortId) || M.push(U.sourcePortId);
                    }),
                      M.length > 0
                        ? (F.outputVertexIds = M)
                        : (F.restNumberOutput = 1);
                    const G = [];
                    j.forEach((U) => {
                      if (U.sourceNodeId === K.id) {
                        const Q = J.find((z) => z.id === U.targetNodeId);
                        e[H[Q.name]].isUpVertex && (G.includes(U) || G.push(U));
                      }
                    });
                    const X = [];
                    if (
                      (G.forEach((U) => {
                        X.includes(U.sourcePortId) || X.push(U.sourcePortId);
                      }),
                      X.length > 0)
                    ) {
                      const Q = e[H[K.name]].downVertexNumber - X.length;
                      (F.downVertexIds = X), (F.restDownVertexNumber = Q);
                    } else F.restDownVertexNumber = 3;
                    const Y = [];
                    j.forEach((U) => {
                      U.targetNodeId === K.id && (Y.includes(U) || Y.push(U));
                    });
                    const re = [];
                    Y.forEach((U) => {
                      re.includes(U.targetPortId) || re.push(U.targetPortId);
                    }),
                      re.length > 0
                        ? (F.inputVertexIds = re)
                        : (F.restNumberInput = 1),
                      N(F);
                  } else {
                    const F = {};
                    (F.nodeId = K.id),
                      (F.nodeName = H[K.name]),
                      (F.currentPosition = K.position);
                    const q = [];
                    j.forEach((Y) => {
                      Y.sourceNodeId === K.id && (q.includes(Y) || q.push(Y));
                    });
                    const M = [];
                    q.forEach((Y) => {
                      M.includes(Y.sourcePortId) || M.push(Y.sourcePortId);
                    }),
                      M.length > 0
                        ? (F.outputVertexIds = M)
                        : (F.restNumberOutput = 1);
                    const G = [];
                    j.forEach((Y) => {
                      Y.targetNodeId === K.id && (G.includes(Y) || G.push(Y));
                    });
                    const X = [];
                    G.forEach((Y) => {
                      X.includes(Y.targetPortId) || X.push(Y.targetPortId);
                    }),
                      X.length > 0
                        ? (F.inputVertexIds = X)
                        : (F.restNumberInput = 1),
                      N(F);
                  }
                else if (e[H[K.name]].isDownVertex) {
                  const F = {};
                  (F.nodeId = K.id),
                    (F.nodeName = H[K.name]),
                    (F.currentPosition = K.position);
                  const q = [];
                  j.forEach((Y) => {
                    Y.targetNodeId === K.id && (q.includes(Y) || q.push(Y));
                  });
                  const M = [];
                  q.forEach((Y) => {
                    M.includes(Y.targetPortId) || M.push(Y.targetPortId);
                  }),
                    M.length > 0
                      ? (F.upVertexIds = M)
                      : (F.restUpVertexNumber = 1);
                  const G = [];
                  j.forEach((Y) => {
                    Y.sourceNodeId === K.id && (G.includes(Y) || G.push(Y));
                  });
                  const X = [];
                  if (
                    (G.forEach((Y) => {
                      X.includes(Y.sourcePortId) || X.push(Y.sourcePortId);
                    }),
                    X.length > 0)
                  ) {
                    const re = e[H[K.name]].downVertexNumber - X.length;
                    (F.downVertexIds = X), (F.restDownVertexNumber = re);
                  } else F.restDownVertexNumber = e[H[K.name]].downVertexNumber;
                  console.log("from down", F), N(F);
                } else {
                  const F = {};
                  (F.nodeId = K.id),
                    (F.nodeName = H[K.name]),
                    (F.currentPosition = K.position);
                  const q = [];
                  j.forEach((G) => {
                    G.targetNodeId === K.id && (q.includes(G) || q.push(G));
                  });
                  const M = [];
                  q.forEach((G) => {
                    M.includes(G.targetPortId) || M.push(G.targetPortId);
                  }),
                    M.length > 0
                      ? (F.upVertexIds = M)
                      : (F.restUpVertexNumber = 1),
                    N(F);
                }
              }),
              s().forEach((K, B) => {
                if (K.isInputVertex) {
                  const F = [];
                  j.forEach((G) => {
                    G.targetNodeId === K.id && F.push(G);
                  });
                  const q = {},
                    M = {};
                  F.forEach((G) => {
                    q[G.sourcePortId] = G.targetPortId;
                    const X = s().find((re) => re.id === G.sourceNodeId),
                      Y = s().find((re) => re.id === G.targetNodeId);
                    M[G.sourcePortId] = { sourceNode: X, targetNode: Y };
                  }),
                    Object.entries(q).forEach((G) => {
                      const [X, Y] = G;
                      C(M[X].sourceNode, M[X].targetNode, X, Y, "solid");
                    });
                } else if (K.isUpVertex) {
                  const F = [];
                  j.forEach((G) => {
                    G.targetNodeId === K.id && F.push(G);
                  });
                  const q = {},
                    M = {};
                  F.forEach((G) => {
                    q[G.sourcePortId] = G.targetPortId;
                    const X = s().find((re) => re.id === G.sourceNodeId),
                      Y = s().find((re) => re.id === G.targetNodeId);
                    M[G.sourcePortId] = { sourceNode: X, targetNode: Y };
                  }),
                    Object.entries(q).forEach((G) => {
                      const [X, Y] = G;
                      C(M[X].sourceNode, M[X].targetNode, X, Y, "dash");
                    });
                }
              });
          }
        };
        document.addEventListener("paste", $),
          De(() => {
            document.removeEventListener("paste", $);
          });
      }),
      (() => {
        var $ = Fm();
        return (
          a(
            $,
            d(wt, {
              get children() {
                return d(Lm, {});
              },
            }),
            null
          ),
          a(
            $,
            d(wt, {
              get children() {
                return [
                  d(In, {
                    isOpen: () => E(),
                    onClose: () => _(!1),
                    zIndex: 9999,
                    get children() {
                      return [d(Em, {}), d(bm, {})];
                    },
                  }),
                  d(In, {
                    isOpen: () => w(),
                    onClose: () => D(!1),
                    zIndex: 1e5,
                    widthClass:
                      "w-[1100px] min-w-[750px] max-w-[1200px] h-fit max-h-[90vh]",
                    get children() {
                      return d(Pm, {});
                    },
                  }),
                  d(In, {
                    isOpen: () => T(),
                    onClose: () => S(!1),
                    zIndex: 1e5,
                    widthClass: "w-[80vw] max-w-[85vw] h-fit max-h-[90vh]",
                    get children() {
                      return d(Mm, {});
                    },
                  }),
                ];
              },
            }),
            null
          ),
          a(
            $,
            d(wt, {
              get children() {
                return d(pa, { onClickAdd: g, nodeMark: _d });
              },
            }),
            null
          ),
          a(
            $,
            d(wt, {
              get children() {
                return d(Ki, {});
              },
            }),
            null
          ),
          a(
            $,
            d(wt, {
              get children() {
                return d(id, {});
              },
            }),
            null
          ),
          $
        );
      })()
    );
  },
  Rm = "_node_1q1l5_1",
  qm = "_selectedNode_1q1l5_3",
  Hm = "_switchIcon_1q1l5_51",
  jm = "_switchNodeText_1q1l5_59",
  zm = "_switchTitle_1q1l5_75",
  Wm = "_switchDescription_1q1l5_85",
  mt = {
    node: Rm,
    selectedNode: qm,
    switchIcon: Hm,
    switchNodeText: jm,
    switchTitle: zm,
    switchDescription: Wm,
  };
var Km = O(
  '<div><div><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"height=3.5em width=3.5em style=overflow:visible;color:currentcolor;><path d="M19 11h-6V8h6a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H5L2 5l3 3h6v3H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h6v5h2v-5h6l3-3-3-3z"></path></svg></div><div><div>Switch</div><div>mode:Rules'
);
const Um = (e) =>
    (() => {
      var t = Km(),
        n = t.firstChild,
        s = n.nextSibling,
        r = s.firstChild,
        l = r.nextSibling;
      return (
        W(
          (o) => {
            var i = e.selected ? mt.selectedNode : mt.node,
              c = mt.switchIcon,
              p = mt.switchNodeText,
              u = mt.switchTitle,
              m = mt.switchDescription;
            return (
              i !== o.e && L(t, (o.e = i)),
              c !== o.t && L(n, (o.t = c)),
              p !== o.a && L(s, (o.a = p)),
              u !== o.o && L(r, (o.o = u)),
              m !== o.i && L(l, (o.i = m)),
              o
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
        ),
        t
      );
    })(),
  Gm = "_testNode_3c9qb_1",
  Xm = "_selectedNode_3c9qb_25",
  Ym = "_testNodeIcon_3c9qb_55",
  Jm = "_testNodeTitle_3c9qb_63",
  Zt = { testNode: Gm, selectedNode: Xm, testNodeIcon: Ym, testNodeTitle: Jm };
var Qm = O(
  '<div><div><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"height=3.5em width=3.5em style=overflow:visible;color:currentcolor;><path d="M690.1 377.4c5.9 0 11.8.2 17.6.5-24.4-128.7-158.3-227.1-319.9-227.1C209 150.8 64 271.4 64 420.2c0 81.1 43.6 154.2 111.9 203.6a21.5 21.5 0 0 1 9.1 17.6c0 2.4-.5 4.6-1.1 6.9-5.5 20.3-14.2 52.8-14.6 54.3-.7 2.6-1.7 5.2-1.7 7.9 0 5.9 4.8 10.8 10.8 10.8 2.3 0 4.2-.9 6.2-2l70.9-40.9c5.3-3.1 11-5 17.2-5 3.2 0 6.4.5 9.5 1.4 33.1 9.5 68.8 14.8 105.7 14.8 6 0 11.9-.1 17.8-.4-7.1-21-10.9-43.1-10.9-66 0-135.8 132.2-245.8 295.3-245.8zm-194.3-86.5c23.8 0 43.2 19.3 43.2 43.1s-19.3 43.1-43.2 43.1c-23.8 0-43.2-19.3-43.2-43.1s19.4-43.1 43.2-43.1zm-215.9 86.2c-23.8 0-43.2-19.3-43.2-43.1s19.3-43.1 43.2-43.1 43.2 19.3 43.2 43.1-19.4 43.1-43.2 43.1zm586.8 415.6c56.9-41.2 93.2-102 93.2-169.7 0-124-120.8-224.5-269.9-224.5-149 0-269.9 100.5-269.9 224.5S540.9 847.5 690 847.5c30.8 0 60.6-4.4 88.1-12.3 2.6-.8 5.2-1.2 7.9-1.2 5.2 0 9.9 1.6 14.3 4.1l59.1 34c1.7 1 3.3 1.7 5.2 1.7a9 9 0 0 0 6.4-2.6 9 9 0 0 0 2.6-6.4c0-2.2-.9-4.4-1.4-6.6-.3-1.2-7.6-28.3-12.2-45.3-.5-1.9-.9-3.8-.9-5.7.1-5.9 3.1-11.2 7.6-14.5zM600.2 587.2c-19.9 0-36-16.1-36-35.9 0-19.8 16.1-35.9 36-35.9s36 16.1 36 35.9c0 19.8-16.2 35.9-36 35.9zm179.9 0c-19.9 0-36-16.1-36-35.9 0-19.8 16.1-35.9 36-35.9s36 16.1 36 35.9a36.08 36.08 0 0 1-36 35.9z"></path></svg></div><div>When Chat Message Received'
);
const Zm = (e) =>
    (() => {
      var t = Qm(),
        n = t.firstChild,
        s = n.nextSibling;
      return (
        W(
          (r) => {
            var l = e.selected ? Zt.selectedNode : Zt.testNode,
              o = Zt.testNodeIcon,
              i = Zt.testNodeTitle;
            return (
              l !== r.e && L(t, (r.e = l)),
              o !== r.t && L(n, (r.t = o)),
              i !== r.a && L(s, (r.a = i)),
              r
            );
          },
          { e: void 0, t: void 0, a: void 0 }
        ),
        t
      );
    })(),
  eg = "_node_160z5_1",
  tg = "_selectedNode_160z5_23",
  ng = "_switchIcon_160z5_59",
  og = "_switchNodeText_160z5_67",
  rg = "_switchTitle_160z5_83",
  lg = "_switchDescription_160z5_93",
  gt = {
    node: eg,
    selectedNode: tg,
    switchIcon: ng,
    switchNodeText: og,
    switchTitle: rg,
    switchDescription: lg,
  };
var ig = O(
  '<div><div><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"height=3.5em width=3.5em style=overflow:visible;color:currentcolor;><path d="m362.7 19.3-48.4 48.4 130 130 48.4-48.4c25-25 25-65.5 0-90.5l-39.4-39.5c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2c-2.5 8.5-.2 17.6 6 23.8s15.3 8.5 23.7 6.1L151 475.7c14.1-4.2 27-11.8 37.4-22.2l233.3-233.2-130-130z"></path></svg></div><div><div>Edit Fields</div><div>manual'
);
const ag = (e) =>
    (() => {
      var t = ig(),
        n = t.firstChild,
        s = n.nextSibling,
        r = s.firstChild,
        l = r.nextSibling;
      return (
        W(
          (o) => {
            var i = e.selected ? gt.selectedNode : gt.node,
              c = gt.switchIcon,
              p = gt.switchNodeText,
              u = gt.switchTitle,
              m = gt.switchDescription;
            return (
              i !== o.e && L(t, (o.e = i)),
              c !== o.t && L(n, (o.t = c)),
              p !== o.a && L(s, (o.a = p)),
              u !== o.o && L(r, (o.o = u)),
              m !== o.i && L(l, (o.i = m)),
              o
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
        ),
        t
      );
    })(),
  sg = "_node_13uy5_1",
  dg = "_selectedNode_13uy5_25",
  cg = "_switchIcon_13uy5_59",
  ug = "_switchNodeText_13uy5_67",
  pg = "_switchTitle_13uy5_83",
  Et = {
    node: sg,
    selectedNode: dg,
    switchIcon: cg,
    switchNodeText: ug,
    switchTitle: pg,
  };
var mg = O(
  '<div><div><svg fill=currentColor stroke-width=0 xmlns=http://www.w3.org/2000/svg viewBox="0 0 512 512"height=3.5em width=3.5em style=overflow:visible;color:#58ABFF;><path d="M3.9 54.9C10.5 40.9 24.5 32 40 32h432c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6v-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"></path></svg></div><div><div>Filter'
);
const gg = (e) =>
    (() => {
      var t = mg(),
        n = t.firstChild,
        s = n.nextSibling,
        r = s.firstChild;
      return (
        W(
          (l) => {
            var o = e.selected ? Et.selectedNode : Et.node,
              i = Et.switchIcon,
              c = Et.switchNodeText,
              p = Et.switchTitle;
            return (
              o !== l.e && L(t, (l.e = o)),
              i !== l.t && L(n, (l.t = i)),
              c !== l.a && L(s, (l.a = c)),
              p !== l.o && L(r, (l.o = p)),
              l
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0 }
        ),
        t
      );
    })(),
  hg = "_AiAgentNode_4heyh_1",
  fg = "_selectedNode_4heyh_33",
  vg = "_AiAgentNodeIcon_4heyh_71",
  bg = "_AiAgentNodeTitle_4heyh_81",
  xg = "_AiAgentNodeDescription_4heyh_97",
  ht = {
    AiAgentNode: hg,
    selectedNode: fg,
    AiAgentNodeIcon: vg,
    AiAgentNodeTitle: bg,
    AiAgentNodeDescription: xg,
  };
var yg = O("<div><div></div><div><div></div><div>Tools Agent");
const ar = (e) =>
    (() => {
      var t = yg(),
        n = t.firstChild,
        s = n.nextSibling,
        r = s.firstChild,
        l = r.nextSibling;
      return (
        a(n, d(jn, {})),
        a(r, () => e.title),
        W(
          (o) => {
            var i = e.selected ? ht.selectedNode : ht.AiAgentNode,
              c = ht.AiAgentNodeIcon,
              p = ht.AiAgentNodeText,
              u = ht.AiAgentNodeTitle,
              m = ht.AiAgentNodeDescription;
            return (
              i !== o.e && L(t, (o.e = i)),
              c !== o.t && L(n, (o.t = c)),
              p !== o.a && L(s, (o.a = p)),
              u !== o.o && L(r, (o.o = u)),
              m !== o.i && L(l, (o.i = m)),
              o
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
        ),
        t
      );
    })(),
  wg = "_EmailNode_imw2c_1",
  $g = "_selectedNode_imw2c_23",
  _g = "_mailIcon_imw2c_49",
  Tg = "_mailNodeText_imw2c_61",
  Cg = "_mailTitle_imw2c_77",
  Ig = "_mailDescription_imw2c_87",
  ft = {
    EmailNode: wg,
    selectedNode: $g,
    mailIcon: _g,
    mailNodeText: Tg,
    mailTitle: Cg,
    mailDescription: Ig,
  };
var Sg = O("<div><div></div><div><div>Send Email</div><div>send");
const Eg = (e) =>
    (() => {
      var t = Sg(),
        n = t.firstChild,
        s = n.nextSibling,
        r = s.firstChild,
        l = r.nextSibling;
      return (
        a(n, d(Ll, {})),
        W(
          (o) => {
            var i = e.selected ? ft.selectedNode : ft.EmailNode,
              c = ft.mailIcon,
              p = ft.mailNodeText,
              u = ft.mailTitle,
              m = ft.mailDescription;
            return (
              i !== o.e && L(t, (o.e = i)),
              c !== o.t && L(n, (o.t = c)),
              p !== o.a && L(s, (o.a = p)),
              u !== o.o && L(r, (o.o = u)),
              m !== o.i && L(l, (o.i = m)),
              o
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
        ),
        t
      );
    })(),
  Og = "_VectorStoreNode_omif4_1",
  Dg = "_selectedNode_omif4_31",
  Ng = "_VectorStoreNodeIcon_omif4_67",
  kg = "_VectorStoreNodeTitle_omif4_77",
  Pg = "_VectorStoreNodeText_omif4_97",
  Ot = {
    VectorStoreNode: Og,
    selectedNode: Dg,
    VectorStoreNodeIcon: Ng,
    VectorStoreNodeTitle: kg,
    VectorStoreNodeText: Pg,
  };
var Ag = O(
  '<div><div class=" flex flex-row justify-center items-center gap-2 px-6"><div></div><div><div>Answer questions with a vector store'
);
const Mg = (e) =>
    (() => {
      var t = Ag(),
        n = t.firstChild,
        s = n.firstChild,
        r = s.nextSibling,
        l = r.firstChild;
      return (
        a(s, d(Fl, {})),
        W(
          (o) => {
            var i = e.selected ? Ot.selectedNode : Ot.VectorStoreNode,
              c = Ot.VectorStoreNodeIcon,
              p = Ot.VectorStoreNodeText,
              u = Ot.VectorStoreNodeTitle;
            return (
              i !== o.e && L(t, (o.e = i)),
              c !== o.t && L(s, (o.t = c)),
              p !== o.a && L(r, (o.a = p)),
              u !== o.o && L(l, (o.o = u)),
              o
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0 }
        ),
        t
      );
    })(),
  Vg = "_pgVectorNode_4ee5v_1",
  Lg = "_selectedNode_4ee5v_31",
  Fg = "_pgVectorNodeIcon_4ee5v_67",
  Bg = "_pgVectorNodeTitle_4ee5v_77",
  Rg = "_pgVectorNodeText_4ee5v_95",
  Dt = {
    pgVectorNode: Vg,
    selectedNode: Lg,
    pgVectorNodeIcon: Fg,
    pgVectorNodeTitle: Bg,
    pgVectorNodeText: Rg,
  };
var qg = O(
  '<div><div class=" flex flex-row justify-center items-center gap-2 px-6"><div></div><div><div>Postgres PgVector Store'
);
const Hg = (e) =>
    (() => {
      var t = qg(),
        n = t.firstChild,
        s = n.firstChild,
        r = s.nextSibling,
        l = r.firstChild;
      return (
        a(s, d(Bl, {})),
        W(
          (o) => {
            var i = e.selected ? Dt.selectedNode : Dt.pgVectorNode,
              c = Dt.pgVectorNodeIcon,
              p = Dt.pgVectorNodeText,
              u = Dt.pgVectorNodeTitle;
            return (
              i !== o.e && L(t, (o.e = i)),
              c !== o.t && L(s, (o.t = c)),
              p !== o.a && L(r, (o.a = p)),
              u !== o.o && L(l, (o.o = u)),
              o
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0 }
        ),
        t
      );
    })(),
  jg = "_ollamaChatNode_24diw_1",
  zg = "_selectedNode_24diw_31",
  Wg = "_ollamaChatNodeIcon_24diw_67",
  Kg = "_ollamaChatNodeTitle_24diw_77",
  Ug = "_ollamaChatNodeText_24diw_95",
  Nt = {
    ollamaChatNode: jg,
    selectedNode: zg,
    ollamaChatNodeIcon: Wg,
    ollamaChatNodeTitle: Kg,
    ollamaChatNodeText: Ug,
  };
var Gg = O(
  '<div><div class=" flex flex-row justify-center items-center gap-2 px-6"><div></div><div><div>Ollama Chat Model'
);
const Xg = (e) =>
    (() => {
      var t = Gg(),
        n = t.firstChild,
        s = n.firstChild,
        r = s.nextSibling,
        l = r.firstChild;
      return (
        a(s, d(Rl, {})),
        W(
          (o) => {
            var i = e.selected ? Nt.selectedNode : Nt.ollamaChatNode,
              c = Nt.ollamaChatNodeIcon,
              p = Nt.ollamaChatNodeText,
              u = `${Nt.ollamaChatNodeTitle} text-nowrap`;
            return (
              i !== o.e && L(t, (o.e = i)),
              c !== o.t && L(s, (o.t = c)),
              p !== o.a && L(r, (o.a = p)),
              u !== o.o && L(l, (o.o = u)),
              o
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0 }
        ),
        t
      );
    })(),
  Yg = "_gmailTriggerNode_1hu5j_1",
  Jg = "_selectedNode_1hu5j_25",
  Qg = "_gmailTriggerNodeIcon_1hu5j_55",
  Zg = "_gmailTriggerNodeText_1hu5j_65",
  eh = "_gmailTriggerNodeTitle_1hu5j_83",
  th = "_gmailTriggerNodeDescription_1hu5j_93",
  vt = {
    gmailTriggerNode: Yg,
    selectedNode: Jg,
    gmailTriggerNodeIcon: Qg,
    gmailTriggerNodeText: Zg,
    gmailTriggerNodeTitle: eh,
    gmailTriggerNodeDescription: th,
  };
var nh = O("<div><div></div><div><div>Gmail Trigger</div><div>Gmail Trigger");
const oh = (e) =>
    (() => {
      var t = nh(),
        n = t.firstChild,
        s = n.nextSibling,
        r = s.firstChild,
        l = r.nextSibling;
      return (
        a(n, d(ql, {})),
        W(
          (o) => {
            var i = e.selected ? vt.selectedNode : vt.gmailTriggerNode,
              c = vt.gmailTriggerNodeIcon,
              p = vt.gmailTriggerNodeText,
              u = vt.gmailTriggerNodeTitle,
              m = vt.gmailTriggerNodeDescription;
            return (
              i !== o.e && L(t, (o.e = i)),
              c !== o.t && L(n, (o.t = c)),
              p !== o.a && L(s, (o.a = p)),
              u !== o.o && L(r, (o.o = u)),
              m !== o.i && L(l, (o.i = m)),
              o
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
        ),
        t
      );
    })(),
  rh = "_createDraftNode_gxi0p_1",
  lh = "_selectedNode_gxi0p_31",
  ih = "_createDraftNodeIcon_gxi0p_67",
  ah = "_createDraftNodeTitle_gxi0p_77",
  sh = "_createDraftNodeText_gxi0p_95",
  dh = "_createDraftNodeDescription_gxi0p_115",
  bt = {
    createDraftNode: rh,
    selectedNode: lh,
    createDraftNodeIcon: ih,
    createDraftNodeTitle: ah,
    createDraftNodeText: sh,
    createDraftNodeDescription: dh,
  };
var ch = O(
  '<div><div class=" flex flex-row justify-center items-center gap-2 px-6"><div></div><div><div>Create Draft</div><div>Create Draft'
);
const uh = (e) =>
    (() => {
      var t = ch(),
        n = t.firstChild,
        s = n.firstChild,
        r = s.nextSibling,
        l = r.firstChild,
        o = l.nextSibling;
      return (
        a(s, d(Hl, {})),
        W(
          (i) => {
            var c = e.selected ? bt.selectedNode : bt.createDraftNode,
              p = bt.createDraftNodeIcon,
              u = bt.createDraftNodeText,
              m = `${bt.createDraftNodeTitle} text-nowrap`,
              v = bt.createDraftNodeDescription;
            return (
              c !== i.e && L(t, (i.e = c)),
              p !== i.t && L(s, (i.t = p)),
              u !== i.a && L(r, (i.a = u)),
              m !== i.o && L(l, (i.o = m)),
              v !== i.i && L(o, (i.i = v)),
              i
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
        ),
        t
      );
    })(),
  ph = "_embeddingNode_19nxp_1",
  mh = "_selectedNode_19nxp_31",
  gh = "_embeddingNodeIcon_19nxp_67",
  hh = "_embeddingNodeTitle_19nxp_77",
  fh = "_embeddingNodeText_19nxp_95",
  kt = {
    embeddingNode: ph,
    selectedNode: mh,
    embeddingNodeIcon: gh,
    embeddingNodeTitle: hh,
    embeddingNodeText: fh,
  };
var vh = O(
  '<div><div class=" flex flex-row justify-center items-center gap-2 px-6"><div></div><div><div>Embedding'
);
const bh = (e) =>
    (() => {
      var t = vh(),
        n = t.firstChild,
        s = n.firstChild,
        r = s.nextSibling,
        l = r.firstChild;
      return (
        a(s, d(jl, {})),
        W(
          (o) => {
            var i = e.selected ? kt.selectedNode : kt.embeddingNode,
              c = kt.embeddingNodeIcon,
              p = kt.embeddingNodeText,
              u = `${kt.embeddingNodeTitle} text-nowrap`;
            return (
              i !== o.e && L(t, (o.e = i)),
              c !== o.t && L(s, (o.t = c)),
              p !== o.a && L(r, (o.a = p)),
              u !== o.o && L(l, (o.o = u)),
              o
            );
          },
          { e: void 0, t: void 0, a: void 0, o: void 0 }
        ),
        t
      );
    })(),
  xh = {
    chat: {
      name: "chat",
      title: "Chat",
      numberInputs: 0,
      numberOutputs: 1,
      isInputVertex: !1,
      isOutputVertex: !0,
      content: Zm,
    },
    switch: {
      name: "switch",
      title: "Switch",
      isInputVertex: !0,
      numberInputs: 1,
      isOutputVertex: !0,
      numberOutputs: 1,
      content: Um,
    },
    edit: {
      name: "edit",
      title: "EditNode",
      isInputVertex: !0,
      numberInputs: 1,
      isOutputVertex: !0,
      numberOutputs: 1,
      content: ag,
    },
    filter: {
      name: "filter",
      title: "Filter",
      isInputVertex: !0,
      numberInputs: 1,
      isOutputVertex: !0,
      numberOutputs: 1,
      content: gg,
    },
    "ai-agent": {
      name: "ai-agent",
      title: "AI Agent",
      isInputVertex: !0,
      numberInputs: 1,
      isOutputVertex: !0,
      numberOutputs: 1,
      isDownVertex: !0,
      downVertexNumber: 3,
      downVertexOrientation: "1 1 2",
      content: ar,
    },
    "customer-support-agent": {
      name: "customer-support-agent",
      title: "Customer Support Agent",
      isInputVertex: !0,
      numberInputs: 1,
      isOutputVertex: !0,
      numberOutputs: 1,
      isDownVertex: !0,
      downVertexNumber: 3,
      downVertexOrientation: "1 1 2",
      content: ar,
    },
    "send-email": {
      name: "send-email",
      title: "Send Email",
      isInputVertex: !0,
      numberInputs: 1,
      isOutputVertex: !0,
      numberOutputs: 1,
      content: Eg,
    },
    "vector-store": {
      name: "vector-store",
      title: "Vector Store",
      isInputVertex: !1,
      numberInputs: 0,
      isOutputVertex: !1,
      numberOutputs: 0,
      isDownVertex: !0,
      isUpVertex: !0,
      upVertexNumber: 1,
      downVertexNumber: 2,
      downVertexOrientation: "1 1",
      content: Mg,
    },
    "pg-vector": {
      name: "pg-vector",
      title: "PgVector Store",
      isInputVertex: !1,
      numberInputs: 0,
      isOutputVertex: !1,
      numberOutputs: 0,
      isDownVertex: !0,
      isUpVertex: !0,
      upVertexNumber: 1,
      downVertexNumber: 1,
      downVertexOrientation: "1",
      content: Hg,
    },
    "ollama-chat": {
      name: "ollama-chat",
      title: "Ollama Chat",
      isInputVertex: !1,
      numberInputs: 0,
      isOutputVertex: !1,
      numberOutputs: 0,
      isUpVertex: !0,
      upVertexNumber: 1,
      content: Xg,
    },
    "gmail-trigger": {
      name: "gmail-trigger",
      title: "GmailReader",
      numberInputs: 0,
      numberOutputs: 1,
      isInputVertex: !1,
      isOutputVertex: !0,
      content: oh,
    },
    "create-draft": {
      name: "create-draft",
      title: "Create Draft",
      isInputVertex: !1,
      numberInputs: 0,
      isOutputVertex: !1,
      numberOutputs: 0,
      isUpVertex: !0,
      upVertexNumber: 1,
      content: uh,
    },
    embedding: {
      name: "embeddings",
      title: "Embeddings",
      isInputVertex: !1,
      numberInputs: 0,
      isOutputVertex: !1,
      numberOutputs: 0,
      isUpVertex: !0,
      upVertexNumber: 1,
      content: bh,
    },
  },
  yh = (e) => d(Bm, { node: xh }),
  wh = document.getElementById("root");
Ei(() => d(yh, {}), wh);
