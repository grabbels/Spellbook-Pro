import { c as create_ssr_component, b as subscribe, e as escape, d as add_attribute, v as validate_component } from "./index2.js";
import { B as Button } from "./button.js";
import { P as Pill } from "./pill.js";
import { p as pagetitle, m as modalCall } from "./stores2.js";
const saveslot_svelte_svelte_type_style_lang = "";
const css = {
  code: ".slot.svelte-1pboqvo.svelte-1pboqvo{background-color:var(--moretranslucent);border-radius:6px;aspect-ratio:1/1.15;position:relative;margin:0;transition:0.1s;border:2px solid transparent;min-height:200px;padding:0.5rem}@media only screen and (max-width: 1024px){.slot.svelte-1pboqvo.svelte-1pboqvo{aspect-ratio:unset}}.slot.large.svelte-1pboqvo.svelte-1pboqvo{aspect-ratio:unset;min-height:250px;border-width:0;padding:2rem 1rem}.slot.large.svelte-1pboqvo.svelte-1pboqvo:hover{cursor:auto}.slot.large.svelte-1pboqvo:hover .controls.svelte-1pboqvo{opacity:1;pointer-events:all}.slot.placeholder.svelte-1pboqvo.svelte-1pboqvo{pointer-events:none}.slot.svelte-1pboqvo h3.svelte-1pboqvo{line-height:1.3;margin-bottom:0.5rem}.slot.svelte-1pboqvo i.svelte-1pboqvo{position:absolute;left:50%;top:50%;transform:translate(-50%, -50%);font-size:3rem;color:var(--moretranslucent);transition:0.1s}.slot.svelte-1pboqvo .controls.svelte-1pboqvo{opacity:0;pointer-events:none;position:absolute;z-index:2;top:0;left:0;width:100%;height:100%;padding:2rem 1rem;border-radius:6px;background-color:var(--spellbg);border-color:var(--spellbg);transition:0.1s;display:flex;align-items:center;justify-content:center}.slot.svelte-1pboqvo .controls div.svelte-1pboqvo{display:flex;flex-wrap:wrap;flex-direction:column;max-width:200px;margin-top:0.4rem}.slot.svelte-1pboqvo .description.svelte-1pboqvo{color:white;margin-top:1rem;font-size:0.95rem}.slot.svelte-1pboqvo.svelte-1pboqvo:hover{background-color:rgba(255, 255, 255, 0.2);border-color:var(--accent)}.slot.svelte-1pboqvo:hover i.svelte-1pboqvo{color:var(--translucent)}.slot.shadow.svelte-1pboqvo.svelte-1pboqvo{box-shadow:0 3px 10px rgba(20, 20, 20, 0.3)}",
  map: null
};
const Saveslot = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $pagetitle, $$unsubscribe_pagetitle;
  let $modalCall, $$unsubscribe_modalCall;
  $$unsubscribe_pagetitle = subscribe(pagetitle, (value) => $pagetitle = value);
  $$unsubscribe_modalCall = subscribe(modalCall, (value) => $modalCall = value);
  let { data = null } = $$props;
  let { type = "" } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  $$result.css.add(css);
  $$unsubscribe_pagetitle();
  $$unsubscribe_modalCall();
  return `${data.name ? `<button style="${"background-color: " + escape(data ? data.color : "", true)}"${add_attribute("data-id", data ? data.id : "", 0)} class="${"slot " + escape(data.name ? "taken" : "", true) + " " + escape($pagetitle == "My account" ? "shadow" : "", true) + " " + escape(type, true) + " svelte-1pboqvo"}"><h3 class="${"svelte-1pboqvo"}">${escape(data.name)}</h3>

		<div style="${"width: 100%"}" class="${"svelte-1pboqvo"}">${validate_component(Pill, "Pill").$$render(
    $$result,
    {
      text: data.class,
      size: "small",
      icon: "ri-contacts-line"
    },
    {},
    {}
  )}
			${validate_component(Pill, "Pill").$$render(
    $$result,
    {
      text: "Level " + data.level,
      size: "small",
      icon: "ri-user-star-line"
    },
    {},
    {}
  )}</div>
		${type === "large" ? `<div class="${"controls svelte-1pboqvo"}"><div class="${"svelte-1pboqvo"}">${validate_component(Button, "Button").$$render(
    $$result,
    {
      icon: "ri-edit-line",
      type: "fill",
      text: "Edit details"
    },
    {},
    {}
  )}
					${validate_component(Button, "Button").$$render(
    $$result,
    {
      icon: "ri-folder-open-line",
      type: "fill blue",
      text: "Open spellbook"
    },
    {},
    {}
  )}
					${data.published === false ? `${validate_component(Button, "Button").$$render(
    $$result,
    {
      icon: "ri-upload-cloud-2-line",
      type: "fill accent",
      text: "Publish spellbook"
    },
    {},
    {}
  )}` : `${data.published === true ? `${validate_component(Button, "Button").$$render(
    $$result,
    {
      icon: "ri-lock-line",
      type: "outline accent",
      text: "Make private"
    },
    {},
    {}
  )}` : ``}`}
					${validate_component(Button, "Button").$$render(
    $$result,
    {
      icon: "ri-delete-bin-line",
      type: "fill alt",
      text: "Delete spellbook"
    },
    {},
    {}
  )}
					</div>
				</div>
			<div class="${"description svelte-1pboqvo"}">${escape(data.description)}</div>` : ``}</button>` : `${data.id === "add" && $modalCall === "save" ? `<button class="${"slot svelte-1pboqvo"}"><i class="${"ri-add-line svelte-1pboqvo"}"></i></button>` : `${$modalCall === "save" ? `<button class="${"slot placeholder svelte-1pboqvo"}"></button>` : ``}`}`}`;
});
export {
  Saveslot as S
};
