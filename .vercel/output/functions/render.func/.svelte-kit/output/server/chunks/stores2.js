import { c as create_ssr_component, e as escape, g as null_to_empty } from "./index2.js";
import { w as writable } from "./index.js";
const section_svelte_svelte_type_style_lang = "";
const css = {
  code: "section.svelte-18c1q63.svelte-18c1q63{width:100%;display:flex;justify-content:center;padding-bottom:1rem;position:relative}section.svelte-18c1q63 .section_inner.svelte-18c1q63{width:100%;padding:0 40px;max-width:1800px;position:relative}@media screen and (max-width: 1500px){section.svelte-18c1q63 .section_inner.svelte-18c1q63{max-width:1500px}}@media screen and (max-width: 1170px){section.svelte-18c1q63 .section_inner.svelte-18c1q63{max-width:1050px}}@media screen and (max-width: 1024px){section.svelte-18c1q63 .section_inner.svelte-18c1q63{padding:0 2vw}}@media screen and (max-width: 820px){section.svelte-18c1q63 .section_inner.svelte-18c1q63{max-width:650px}}",
  map: null
};
const Section = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { name } = $$props;
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  $$result.css.add(css);
  return `<section class="${escape(null_to_empty(name), true) + " svelte-18c1q63"}"><div class="${"section_inner svelte-18c1q63"}">${slots.default ? slots.default({}) : ``}</div>
</section>`;
});
const notification = writable("");
const pagetitle = writable("");
const sidemenuopen = writable(false);
const topmenuopen = writable(false);
const spellListEmpty = writable(false);
const userId = writable("");
const userNickname = writable("");
const userEmail = writable("");
const session = writable("");
const modalCall = writable("");
const savedSpellSheets = writable([]);
const filters = writable(false);
const actionFilter = writable("");
const rangeFilter = writable("");
const searchFilter = writable("");
const saveFilter = writable("");
const activeLevels = writable("");
const quickQuery = writable("");
const lookupSpell = writable("");
const bookToEdit = writable("");
const savePrompt = writable(false);
const bookmarksOpen = writable(false);
const lookupBook = writable("");
export {
  Section as S,
  sidemenuopen as a,
  spellListEmpty as b,
  bookToEdit as c,
  savePrompt as d,
  userNickname as e,
  savedSpellSheets as f,
  lookupBook as g,
  bookmarksOpen as h,
  activeLevels as i,
  filters as j,
  searchFilter as k,
  lookupSpell as l,
  modalCall as m,
  notification as n,
  saveFilter as o,
  pagetitle as p,
  quickQuery as q,
  rangeFilter as r,
  session as s,
  topmenuopen as t,
  userId as u,
  actionFilter as v,
  userEmail as w
};
