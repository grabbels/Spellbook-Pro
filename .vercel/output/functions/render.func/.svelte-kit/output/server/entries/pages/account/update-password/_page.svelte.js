import { c as create_ssr_component, b as subscribe, h as set_store_value, v as validate_component, d as add_attribute, e as escape } from "../../../../chunks/index2.js";
import { n as notification, p as pagetitle, S as Section } from "../../../../chunks/stores2.js";
/* empty css                                                       */import "../../../../chunks/supabaseClient.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".grid.svelte-k58xsa.svelte-k58xsa{margin-top:4rem;width:100%;display:flex;justify-content:center;align-items:center;height:60vh}form.svelte-k58xsa.svelte-k58xsa{max-width:400px}form.svelte-k58xsa button[type=submit] div.svelte-k58xsa{position:absolute;display:none;animation-name:svelte-k58xsa-rotate;animation-iteration-count:infinite;animation-timing-function:linear;animation-duration:0.6s;top:-3px;width:100%;text-align:center;left:0}form.svelte-k58xsa button[type=submit] div i.svelte-k58xsa{font-size:2rem;color:var(--bg)}@keyframes svelte-k58xsa-rotate{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}form.svelte-k58xsa button[type=submit].loading.svelte-k58xsa{color:var(--accent)}form.svelte-k58xsa button[type=submit].loading div.svelte-k58xsa{display:block}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_notification;
  let $pagetitle, $$unsubscribe_pagetitle;
  $$unsubscribe_notification = subscribe(notification, (value) => value);
  $$unsubscribe_pagetitle = subscribe(pagetitle, (value) => $pagetitle = value);
  set_store_value(pagetitle, $pagetitle = "Password reset", $pagetitle);
  let registerPassword;
  let registerPasswordConfirm;
  $$result.css.add(css);
  $$unsubscribe_notification();
  $$unsubscribe_pagetitle();
  return `${validate_component(Section, "Section").$$render($$result, { name: "login" }, {}, {
    default: () => {
      return `<div class="${"grid svelte-k58xsa"}"><div class="${"register section"}"><div class="${"panel_inner"}"><div class="${"register_form"}"><h2 style="${"margin-bottom: 1rem"}">Update password</h2>
					<form class="${"svelte-k58xsa"}"><input type="${"password"}" autocomplete="${"new-password"}" placeholder="${"Password"}" required${add_attribute("value", registerPassword, 0)}>
						<input type="${"password"}" placeholder="${"Password (again)"}" required${add_attribute("value", registerPasswordConfirm, 0)}>
						<button class="${escape("", true) + " button fill accent svelte-k58xsa"}" type="${"submit"}">Change password
							<div class="${"svelte-k58xsa"}"><i class="${"ri-loader-5-line svelte-k58xsa"}"></i></div></button></form></div></div></div></div>`;
    }
  })}`;
});
export {
  Page as default
};
