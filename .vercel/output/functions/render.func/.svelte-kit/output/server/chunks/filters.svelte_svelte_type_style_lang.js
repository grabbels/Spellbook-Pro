import { c as create_ssr_component } from "./index2.js";
const grid_svelte_svelte_type_style_lang = "";
const css = {
  code: ".grid.svelte-166j0j{width:100%;display:grid;grid-template-columns:1fr 1fr 1fr 1fr;grid-auto-rows:325px;grid-gap:1rem;position:relative}@media only screen and (max-width: 1500px){.grid.svelte-166j0j{grid-template-columns:1fr 1fr 1fr}}@media only screen and (max-width: 1170px){.grid.svelte-166j0j{grid-template-columns:1fr 1fr}}@media only screen and (max-width: 820px){.grid.svelte-166j0j{grid-template-columns:1fr}}",
  map: null
};
const Grid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="${"grid svelte-166j0j"}">${slots.default ? slots.default({}) : ``}</div>`;
});
const filters_svelte_svelte_type_style_lang = "";
export {
  Grid as G
};
