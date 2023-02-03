import { c as create_ssr_component, b as subscribe, h as set_store_value, v as validate_component, e as escape, d as add_attribute } from "../../../../chunks/index2.js";
import { p as page } from "../../../../chunks/stores.js";
import { n as notification, s as session, w as userEmail, e as userNickname, u as userId, p as pagetitle, m as modalCall, S as Section } from "../../../../chunks/stores2.js";
import { B as Button } from "../../../../chunks/button.js";
import "../../../../chunks/supabaseClient.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".grid.svelte-1q27tjm.svelte-1q27tjm{width:100%;display:grid;grid-template-columns:1fr minmax(auto, 600px);grid-template-rows:1fr;min-height:100vh;align-items:center}@media only screen and (max-width: 1024px){.grid.svelte-1q27tjm.svelte-1q27tjm{display:flex;flex-wrap:wrap;flex-direction:column-reverse}}.grid.svelte-1q27tjm .section.svelte-1q27tjm{width:100%;display:flex;justify-content:center;align-items:center;height:600px;margin-top:2rem;height:100vh}.grid.svelte-1q27tjm .section .panel_inner.svelte-1q27tjm{padding:2rem;max-width:450px;width:100%}@media only screen and (max-width: 1024px){.grid.svelte-1q27tjm .section .panel_inner.svelte-1q27tjm{max-width:none;padding:2rem 2vw}}.grid.svelte-1q27tjm .section .panel_inner h2.svelte-1q27tjm{margin-bottom:0.5rem}.grid.svelte-1q27tjm .section.register.svelte-1q27tjm{justify-content:flex-end;padding-right:4rem}@media only screen and (max-width: 1024px){.grid.svelte-1q27tjm .section.register.svelte-1q27tjm{padding:4rem 0 0;display:none}.grid.svelte-1q27tjm .section.register.show.svelte-1q27tjm{display:block}}.grid.svelte-1q27tjm .section.register .panel_inner .register_form.svelte-1q27tjm{opacity:0;transform:translateX(40px);transition:0.3s}.grid.svelte-1q27tjm .section.register .panel_inner .register_form button.inline.svelte-1q27tjm{all:unset;display:inline-block;cursor:pointer;text-decoration:underline}.grid.svelte-1q27tjm .section.register.show .panel_inner .register_form.svelte-1q27tjm{opacity:1;transform:translateX(0)}.grid.svelte-1q27tjm .section.login.svelte-1q27tjm{border-left:1px solid var(--moretranslucent)}@media only screen and (max-width: 1024px){.grid.svelte-1q27tjm .section.login.svelte-1q27tjm{border:none;display:none}.grid.svelte-1q27tjm .section.login.show.svelte-1q27tjm{display:block}}.grid.svelte-1q27tjm .section.login .panel_inner.svelte-1q27tjm{max-width:450px}.grid.svelte-1q27tjm .section.login .panel_inner .login_form.svelte-1q27tjm{margin-top:2rem;opacity:0.4;pointer-events:none;transition:0.2s}.grid.svelte-1q27tjm .section.login.show .login_form.svelte-1q27tjm{opacity:1;pointer-events:all}form.svelte-1q27tjm input#termsconditions.svelte-1q27tjm{display:inline-block;margin-right:0.3rem;width:auto}form.svelte-1q27tjm label.svelte-1q27tjm{color:var(--white);display:inline-block}form.svelte-1q27tjm button[type=submit] div.svelte-1q27tjm{position:absolute;display:none;animation-name:svelte-1q27tjm-rotate;animation-iteration-count:infinite;animation-timing-function:linear;animation-duration:0.6s;top:-3px;width:100%;text-align:center;left:0}form.svelte-1q27tjm button[type=submit] div i.svelte-1q27tjm{font-size:2rem;color:var(--bg)}@keyframes svelte-1q27tjm-rotate{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}form.svelte-1q27tjm button[type=submit].loading.svelte-1q27tjm{color:var(--accent)}form.svelte-1q27tjm button[type=submit].loading div.svelte-1q27tjm{display:block}p.svelte-1q27tjm.svelte-1q27tjm{margin-top:0.5rem;font-size:0.95rem}p.svelte-1q27tjm button.svelte-1q27tjm{all:unset;cursor:pointer;text-decoration:underline}ul.svelte-1q27tjm.svelte-1q27tjm{font-size:0.95rem;margin-top:0.5rem;list-style:disc;color:var(--white);font-weight:400;padding-left:1rem;margin-bottom:1rem}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_notification;
  let $$unsubscribe_session;
  let $$unsubscribe_userEmail;
  let $$unsubscribe_userNickname;
  let $$unsubscribe_userId;
  let $$unsubscribe_page;
  let $pagetitle, $$unsubscribe_pagetitle;
  let $$unsubscribe_modalCall;
  $$unsubscribe_notification = subscribe(notification, (value) => value);
  $$unsubscribe_session = subscribe(session, (value) => value);
  $$unsubscribe_userEmail = subscribe(userEmail, (value) => value);
  $$unsubscribe_userNickname = subscribe(userNickname, (value) => value);
  $$unsubscribe_userId = subscribe(userId, (value) => value);
  $$unsubscribe_page = subscribe(page, (value) => value);
  $$unsubscribe_pagetitle = subscribe(pagetitle, (value) => $pagetitle = value);
  $$unsubscribe_modalCall = subscribe(modalCall, (value) => value);
  let showRegister;
  let showLogin;
  let registerForm;
  let registerNickname;
  let registerEmail;
  let registerPassword;
  let registerPasswordConfirm;
  let loginEmail;
  let loginPassword;
  let registerPanel;
  let loginPanel;
  set_store_value(pagetitle, $pagetitle = "Login", $pagetitle);
  $$result.css.add(css);
  $$unsubscribe_notification();
  $$unsubscribe_session();
  $$unsubscribe_userEmail();
  $$unsubscribe_userNickname();
  $$unsubscribe_userId();
  $$unsubscribe_page();
  $$unsubscribe_pagetitle();
  $$unsubscribe_modalCall();
  return `${validate_component(Section, "Section").$$render($$result, { name: "login" }, {}, {
    default: () => {
      return `<div class="${"grid svelte-1q27tjm"}"><div class="${"register section " + escape(showRegister, true) + " svelte-1q27tjm"}"${add_attribute("this", registerPanel, 0)}><div class="${"panel_inner svelte-1q27tjm"}"><div class="${"register_form svelte-1q27tjm"}"><h2 class="${"svelte-1q27tjm"}">Register</h2>
					<form class="${"svelte-1q27tjm"}"${add_attribute("this", registerForm, 0)}><input type="${"text"}" placeholder="${"Nickname"}" required${add_attribute("value", registerNickname, 0)}>
						<input type="${"email"}" placeholder="${"E-Mail"}" required${add_attribute("value", registerEmail, 0)}>
						<input type="${"password"}" autocomplete="${"new-password"}" placeholder="${"Password"}" required${add_attribute("value", registerPassword, 0)}>
						<input type="${"password"}" placeholder="${"Password (again)"}" required${add_attribute("value", registerPasswordConfirm, 0)}>
						<input type="${"checkbox"}" name="${"termsconditions"}" id="${"termsconditions"}" required class="${"svelte-1q27tjm"}">
						<label for="${"termsconditions"}" class="${"svelte-1q27tjm"}">I agree to the <button class="${"inline svelte-1q27tjm"}">terms and conditions</button>.</label><br>
						<button class="${escape("", true) + " button fill accent svelte-1q27tjm"}" type="${"submit"}">Register
							<div class="${"svelte-1q27tjm"}"><i class="${"ri-loader-5-line svelte-1q27tjm"}"></i></div></button>
						<p class="${"svelte-1q27tjm"}">Already have an account? <button class="${"svelte-1q27tjm"}">Click here</button> to log in.
						</p></form></div></div></div>
		<div id="${"login"}" class="${"login section " + escape(showLogin, true) + " svelte-1q27tjm"}"${add_attribute("this", loginPanel, 0)}><div class="${"panel_inner svelte-1q27tjm"}">${validate_component(Button, "Button").$$render(
        $$result,
        {
          text: "back",
          href: "/",
          type: "outline",
          icon: "ri-arrow-left-s-line"
        },
        {},
        {}
      )}
				<div class="${"login_form svelte-1q27tjm"}"><h2 class="${"svelte-1q27tjm"}">Login</h2>
					<form action="${"login"}" class="${"svelte-1q27tjm"}"><input type="${"email"}" placeholder="${"E-Mail"}" required${add_attribute("value", loginEmail, 0)}>
						<input type="${"password"}" placeholder="${"Password"}" required${add_attribute("value", loginPassword, 0)}>
						<button class="${escape("", true) + " button fill accent svelte-1q27tjm"}" type="${"submit"}">Login
							<div class="${"svelte-1q27tjm"}"><i class="${"ri-loader-5-line svelte-1q27tjm"}"></i></div></button></form>
					<p class="${"svelte-1q27tjm"}">No account yet? Create one to:</p>
					<ul class="${"svelte-1q27tjm"}"><li>Manage your spellsheets from anywhere</li>
						<li>Save and sync your spellsheets across devices</li>
						<li>Save multiple spellsheets</li>
						<li>Manage your spellsheets in your account</li></ul>
					${validate_component(Button, "Button").$$render(
        $$result,
        {
          href: "",
          type: "fill",
          icon: "",
          text: "Register"
        },
        {},
        {}
      )}</div></div></div></div>`;
    }
  })}

`;
});
export {
  Page as default
};
