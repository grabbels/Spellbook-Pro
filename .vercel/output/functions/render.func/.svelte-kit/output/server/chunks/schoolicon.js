import { c as create_ssr_component, e as escape } from "./index2.js";
const schoolicon_svelte_svelte_type_style_lang = "";
const css = {
  code: "i.svelte-ancs4i{color:white;font-size:1.7rem;vertical-align:-6px}i.evocation.svelte-ancs4i{color:#fe5a51}i.divination.svelte-ancs4i{color:#834eb9}i.abjuration.svelte-ancs4i{color:#00cc9d}i.conjuration.svelte-ancs4i{color:#00aacc}i.enchantment.svelte-ancs4i{color:#e9ab00}i.illusion.svelte-ancs4i{color:#434be4}i.necromancy.svelte-ancs4i{color:#008a45}i.transmutation.svelte-ancs4i{color:#ca3cc7}i.small.svelte-ancs4i{font-size:1.3rem;margin-right:0.2rem;vertical-align:-5px}",
  map: null
};
const Schoolicon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { school } = $$props;
  let { type = "" } = $$props;
  if ($$props.school === void 0 && $$bindings.school && school !== void 0)
    $$bindings.school(school);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  $$result.css.add(css);
  {
    switch (school.toLowerCase()) {
    }
  }
  return `${school.toLowerCase() === "evocation" ? `<i class="${escape(school.toLowerCase(), true) + " " + escape(type, true) + " ri-fire-line svelte-ancs4i"}"></i>` : `${school.toLowerCase() === "abjuration" ? `<i class="${escape(school.toLowerCase(), true) + " " + escape(type, true) + " ri-shield-line svelte-ancs4i"}"></i>` : `${school.toLowerCase() === "conjuration" ? `<i class="${escape(school.toLowerCase(), true) + " " + escape(type, true) + " ri-loader-line svelte-ancs4i"}"></i>` : `${school.toLowerCase() === "divination" ? `<i class="${escape(school.toLowerCase(), true) + " " + escape(type, true) + " ri-open-arm-line svelte-ancs4i"}"></i>` : `${school.toLowerCase() === "enchantment" ? `<i class="${escape(school.toLowerCase(), true) + " " + escape(type, true) + " ri-magic-line svelte-ancs4i"}"></i>` : `${school.toLowerCase() === "illusion" ? `<i class="${escape(school.toLowerCase(), true) + " " + escape(type, true) + " ri-spy-line svelte-ancs4i"}"></i>` : `${school.toLowerCase() === "necromancy" ? `<i class="${escape(school.toLowerCase(), true) + " " + escape(type, true) + " ri-skull-line svelte-ancs4i"}"></i>` : `${school.toLowerCase() === "transmutation" ? `<i class="${escape(school.toLowerCase(), true) + " " + escape(type, true) + " ri-contrast-line svelte-ancs4i"}"></i>` : ``}`}`}`}`}`}`}`}`;
});
export {
  Schoolicon as S
};
