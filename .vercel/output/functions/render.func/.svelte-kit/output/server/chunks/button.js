import { c as create_ssr_component, b as subscribe, e as escape, d as add_attribute } from "./index2.js";
import { a as sidemenuopen, b as spellListEmpty, t as topmenuopen } from "./stores2.js";
/* empty css                                      */const css = {
  code: "button,.button,label.button{text-align:center;text-decoration:none;display:inline-block;-webkit-user-select:none;-moz-user-select:none;user-select:none;cursor:pointer;padding:0.35rem 1rem;margin:0 0 0.4rem;font-size:1rem;border-radius:6px;font-weight:500;transition:0.1s;min-height:46.4px;position:relative}button:first-child,.button:first-child,label.button:first-child{margin-left:0}button:last-child,.button:last-child,label.button:last-child{margin-right:0}button.mobile,.button.mobile,label.button.mobile{display:none}@media only screen and (max-width: 1024px){button.desktop,.button.desktop,label.button.desktop{display:none}button.mobile,.button.mobile,label.button.mobile{display:inline-block}}button.fill,.button.fill,label.button.fill{color:var(--white);background-color:var(--translucent);border:2px solid transparent}button.fill.alt,.button.fill.alt,label.button.fill.alt{background-color:var(--secondary);border-color:var(--secondary)}button.fill.alt:hover,.button.fill.alt:hover,label.button.fill.alt:hover{filter:brightness(0.9) contrast(1.5) saturate(0.8);background-color:var(--secondary);border-color:var(--secondary);color:var(--white)}button.fill.accent,.button.fill.accent,label.button.fill.accent{background-color:var(--accent);border-color:var(--accent);color:var(--bg)}button.fill.accent.spellListEmpty,.button.fill.accent.spellListEmpty,label.button.fill.accent.spellListEmpty{animation-name:glowing;animation-iteration-count:infinite;animation-duration:2s}@keyframes glowing{0%{filter:drop-shadow(0 0 15px rgba(0, 204, 157, 0))}50%{filter:drop-shadow(0 0 15px rgb(0, 204, 157))}100%{filter:drop-shadow(0 0 15px rgba(0, 204, 157, 0))}}button.fill.accent.spellListEmpty:hover,.button.fill.accent.spellListEmpty:hover,label.button.fill.accent.spellListEmpty:hover{animation-name:none}button.fill.accent:hover,.button.fill.accent:hover,label.button.fill.accent:hover{background-color:var(--accent);border-color:var(--accent);filter:drop-shadow(0 0 5px rgba(0, 204, 157, 0.8))}button.fill.blue,.button.fill.blue,label.button.fill.blue{background-color:var(--lightblue);border-color:var(--lightblue)}button.fill.blue:hover,.button.fill.blue:hover,label.button.fill.blue:hover{filter:drop-shadow(0 0 5px rgba(0, 170, 204, 0.8));border-color:var(--lightblue);background-color:var(--lightblue)}button.fill:hover,.button.fill:hover,label.button.fill:hover{background-color:var(--primary);border-color:var(--primary)}button.fill.menuopen,.button.fill.menuopen,label.button.fill.menuopen{background-color:var(--secondary);border-color:var(--secondary);color:var(--white);z-index:11;animation:none}button.fill.menuopen:hover,.button.fill.menuopen:hover,label.button.fill.menuopen:hover{filter:brightness(0.9) contrast(1.5) saturate(0.8);background-color:var(--secondary);border-color:var(--secondary);color:var(--white)}button.fill.menuopen div,.button.fill.menuopen div,label.button.fill.menuopen div{transform:translateY(1px) rotate(45deg)}button.fill.topmenuopen,.button.fill.topmenuopen,label.button.fill.topmenuopen{background-color:var(--secondary);border-color:var(--secondary);color:var(--white);z-index:11}button.fill.topmenuopen:hover,.button.fill.topmenuopen:hover,label.button.fill.topmenuopen:hover{filter:brightness(0.9) contrast(1.5) saturate(0.8);background-color:var(--secondary);border-color:var(--secondary);color:var(--white)}button.fill.topmenuopen div,.button.fill.topmenuopen div,label.button.fill.topmenuopen div{transform:translateY(1px)}button.subtle,.button.subtle,label.button.subtle{background-color:var(--moretranslucent);border-color:var(--moretranslucent);color:white}button.subtle:hover,.button.subtle:hover,label.button.subtle:hover{background-color:var(--purple)}button.outline,.button.outline,label.button.outline{background-color:transparent;color:var(--white);border:2px solid var(--white)}button.outline:hover,.button.outline:hover,label.button.outline:hover{background-color:var(--primary);color:var(--white)}button.outline.alt,.button.outline.alt,label.button.outline.alt{border-color:var(--secondary);color:white}button.outline.alt:hover,.button.outline.alt:hover,label.button.outline.alt:hover{background-color:var(--secondary);color:var(--white)}button.outline.accent,.button.outline.accent,label.button.outline.accent{border-color:var(--accent);color:var(--accent)}button.outline.accent:hover,.button.outline.accent:hover,label.button.outline.accent:hover{background-color:var(--accent);color:var(--white)}button.naked,.button.naked,label.button.naked{color:var(--white);border:2px solid transparent;margin:0}button.naked.alt,.button.naked.alt,label.button.naked.alt{color:var(--secondary)}button.naked.alt:hover,.button.naked.alt:hover,label.button.naked.alt:hover{background-color:var(--secondary)}button.naked:hover,.button.naked:hover,label.button.naked:hover{color:var(--white);background-color:var(--primary);filter:brightness(0.9) contrast(1.5) saturate(0.8)}button.dark-mode,.button.dark-mode,label.button.dark-mode{background-color:var(--black);border-color:var(--black)}button div,.button div,label.button div{display:inline-block}button i,.button i,label.button i{font-size:1.3rem;font-weight:500;vertical-align:-5px;margin-right:0.3rem;pointer-events:none}button.disabled,.button.disabled,label.button.disabled{opacity:0.3;pointer-events:none}",
  map: null
};
const Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $sidemenuopen, $$unsubscribe_sidemenuopen;
  let $spellListEmpty, $$unsubscribe_spellListEmpty;
  let $topmenuopen, $$unsubscribe_topmenuopen;
  $$unsubscribe_sidemenuopen = subscribe(sidemenuopen, (value) => $sidemenuopen = value);
  $$unsubscribe_spellListEmpty = subscribe(spellListEmpty, (value) => $spellListEmpty = value);
  $$unsubscribe_topmenuopen = subscribe(topmenuopen, (value) => $topmenuopen = value);
  let { text } = $$props;
  let { icon = "" } = $$props;
  let { type } = $$props;
  let { href = "" } = $$props;
  let { disabled = false } = $$props;
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  $$result.css.add(css);
  $$unsubscribe_sidemenuopen();
  $$unsubscribe_spellListEmpty();
  $$unsubscribe_topmenuopen();
  return `${text === "Add spells" ? `<button class="${[
    escape(type, true),
    ($sidemenuopen ? "menuopen" : "") + " " + ($spellListEmpty ? "spellListEmpty" : "") + " " + (disabled ? "disabled" : "")
  ].join(" ").trim()}"><div>${icon ? `<i${add_attribute("class", icon, 0)}></i>` : ``}</div>
		${$sidemenuopen === false ? `Add spells` : `Close panel`}</button>` : `${text === "menu" ? `<button class="${[
    escape(type, true),
    ($topmenuopen ? "topmenuopen" : "") + " " + (disabled ? "disabled" : "")
  ].join(" ").trim()}"><div>${icon ? `<i${add_attribute("class", $topmenuopen ? "ri-close-line" : "ri-menu-2-line", 0)}></i>` : ``}</div>
		${$topmenuopen === false ? `menu` : `close`}</button>
` : `${href ? `<a${add_attribute("href", href, 0)} class="${["button " + escape(type, true), disabled ? "disabled" : ""].join(" ").trim()}">${icon ? `<i${add_attribute("class", icon, 0)}></i>` : ``}${escape(text)}</a>` : `<button type="${"button"}" class="${[escape(type, true), disabled ? "disabled" : ""].join(" ").trim()}">${icon ? `<i${add_attribute("class", icon, 0)}></i>` : ``}${escape(text)}</button>`}`}`}`;
});
export {
  Button as B
};
