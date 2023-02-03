import { c as create_ssr_component } from "./index2.js";
const loading_svelte_svelte_type_style_lang = "";
const css = {
  code: ".loading_wrapper.svelte-88eib8.svelte-88eib8{width:100%;text-align:center;padding:4rem 0}.loading_wrapper.svelte-88eib8 .loading.svelte-88eib8{display:inline-block;animation-name:svelte-88eib8-rotate;animation-timing-function:linear;animation-duration:2s;animation-iteration-count:infinite}@keyframes svelte-88eib8-rotate{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}.loading_wrapper.svelte-88eib8 .loading i.svelte-88eib8{color:white;font-size:3rem}",
  map: null
};
const Loading = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="${"loading_wrapper svelte-88eib8"}"><div class="${"loading svelte-88eib8"}"><i class="${"ri-loader-line svelte-88eib8"}"></i></div>
</div>`;
});
export {
  Loading as L
};
