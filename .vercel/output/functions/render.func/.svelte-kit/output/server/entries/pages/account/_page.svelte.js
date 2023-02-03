import { c as create_ssr_component, b as subscribe, h as set_store_value, v as validate_component, e as escape, f as each, d as add_attribute } from "../../../chunks/index2.js";
import { f as savedSpellSheets, n as notification, u as userId, p as pagetitle, d as savePrompt, m as modalCall, s as session, e as userNickname, w as userEmail, S as Section } from "../../../chunks/stores2.js";
import { a as activeSpells } from "../../../chunks/pill.js";
import { B as Button } from "../../../chunks/button.js";
import { S as Saveslot } from "../../../chunks/saveslot.js";
import { L as Loading } from "../../../chunks/loading.js";
import "../../../chunks/supabaseClient.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".save_slots.svelte-ll5v87.svelte-ll5v87.svelte-ll5v87{display:grid;grid-template-columns:repeat(auto-fill, minmax(250px, 1fr));grid-gap:0.5rem;margin-top:1rem;position:relative;z-index:1}.grid.svelte-ll5v87.svelte-ll5v87.svelte-ll5v87{display:grid;grid-template-columns:1fr 400px;grid-gap:2rem}@media only screen and (max-width: 1200px){.grid.svelte-ll5v87.svelte-ll5v87.svelte-ll5v87{grid-template-columns:1fr;grid-gap:0}}.grid.svelte-ll5v87 .panel.svelte-ll5v87 h2.svelte-ll5v87{opacity:0.85}.grid.svelte-ll5v87 .panel.details div.svelte-ll5v87.svelte-ll5v87{position:relative}.grid.svelte-ll5v87 .panel.details div label.svelte-ll5v87.svelte-ll5v87{color:white}.grid.svelte-ll5v87 .panel.details div input.svelte-ll5v87.svelte-ll5v87{transition:0.1s;border:2px solid transparent}.grid.svelte-ll5v87 .panel.details div input.svelte-ll5v87.svelte-ll5v87:hover{border:2px solid var(--accent)}.grid.svelte-ll5v87 .panel.details div button.edit.svelte-ll5v87.svelte-ll5v87{position:absolute;right:-3px;top:22px}.grid.svelte-ll5v87 .panel.details div button.edit i.svelte-ll5v87.svelte-ll5v87{color:white}.grid.svelte-ll5v87 .panel.details div button.edit:hover i.svelte-ll5v87.svelte-ll5v87{color:var(--accent)}.grid.svelte-ll5v87 .panel.details div button[type=submit] div.svelte-ll5v87.svelte-ll5v87{position:absolute;display:none;animation-name:svelte-ll5v87-rotate;animation-iteration-count:infinite;animation-timing-function:linear;animation-duration:0.6s;top:-3px;width:100%;text-align:center;left:0}.grid.svelte-ll5v87 .panel.details div button[type=submit] div i.svelte-ll5v87.svelte-ll5v87{font-size:2rem;color:var(--bg)}@keyframes svelte-ll5v87-rotate{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}.grid.svelte-ll5v87 .panel.details div button[type=submit].loading.svelte-ll5v87.svelte-ll5v87{color:var(--accent)}.grid.svelte-ll5v87 .panel.details div button[type=submit].loading div.svelte-ll5v87.svelte-ll5v87{display:block}.grid.svelte-ll5v87 .panel.spellsheets.svelte-ll5v87.svelte-ll5v87{min-height:245px}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $savedSpellSheets, $$unsubscribe_savedSpellSheets;
  let $$unsubscribe_notification;
  let $$unsubscribe_activeSpells;
  let $$unsubscribe_userId;
  let $pagetitle, $$unsubscribe_pagetitle;
  let $$unsubscribe_savePrompt;
  let $$unsubscribe_modalCall;
  let $session, $$unsubscribe_session;
  let $userNickname, $$unsubscribe_userNickname;
  let $userEmail, $$unsubscribe_userEmail;
  $$unsubscribe_savedSpellSheets = subscribe(savedSpellSheets, (value) => $savedSpellSheets = value);
  $$unsubscribe_notification = subscribe(notification, (value) => value);
  $$unsubscribe_activeSpells = subscribe(activeSpells, (value) => value);
  $$unsubscribe_userId = subscribe(userId, (value) => value);
  $$unsubscribe_pagetitle = subscribe(pagetitle, (value) => $pagetitle = value);
  $$unsubscribe_savePrompt = subscribe(savePrompt, (value) => value);
  $$unsubscribe_modalCall = subscribe(modalCall, (value) => value);
  $$unsubscribe_session = subscribe(session, (value) => $session = value);
  $$unsubscribe_userNickname = subscribe(userNickname, (value) => $userNickname = value);
  $$unsubscribe_userEmail = subscribe(userEmail, (value) => $userEmail = value);
  set_store_value(pagetitle, $pagetitle = "My account", $pagetitle);
  $$result.css.add(css);
  $$unsubscribe_savedSpellSheets();
  $$unsubscribe_notification();
  $$unsubscribe_activeSpells();
  $$unsubscribe_userId();
  $$unsubscribe_pagetitle();
  $$unsubscribe_savePrompt();
  $$unsubscribe_modalCall();
  $$unsubscribe_session();
  $$unsubscribe_userNickname();
  $$unsubscribe_userEmail();
  return `${validate_component(Section, "Section").$$render($$result, { name: "my-account" }, {}, {
    default: () => {
      return `${$session ? `<div class="${"panel svelte-ll5v87"}"><h2 class="${"svelte-ll5v87"}">My Account</h2>
			${$userNickname ? `<h1>Hi, ${escape($userNickname)}!</h1>` : ``}</div>
		<div class="${"grid svelte-ll5v87"}"><div class="${"panel spellsheets svelte-ll5v87"}"><h2 class="${"svelte-ll5v87"}">Saved spellbooks</h2>
				
				${$savedSpellSheets.length < 1 ? `${validate_component(Loading, "Loading").$$render($$result, {}, {}, {})}` : `${$savedSpellSheets == "none" ? `<p>You have no saved spellbooks yet!</p>` : `<div class="${"save_slots svelte-ll5v87"}">${each($savedSpellSheets, (spellsheet) => {
        return `${validate_component(Saveslot, "SaveSlot").$$render($$result, { data: spellsheet, type: "large" }, {}, {})}`;
      })}</div>`}`}
				</div>
			<div class="${"panel details svelte-ll5v87"}"><h2 class="${"svelte-ll5v87"}">Acccount information</h2>
				${$userNickname ? `<div class="${"svelte-ll5v87"}"><form><label for="${"nickname"}" class="${"svelte-ll5v87"}">Nickname</label>
							${`<input type="${"text"}" name="${"nickname"}"${add_attribute("value", $userNickname, 0)} disabled class="${"svelte-ll5v87"}">
								<button class="${"edit svelte-ll5v87"}"><i class="${"ri-edit-2-line svelte-ll5v87"}"></i></button>`}</form></div>` : ``}
				${$userEmail ? `<div style="${"margin-bottom: 1rem"}" class="${"svelte-ll5v87"}"><form><label for="${"email"}" class="${"svelte-ll5v87"}">Email address</label>
							${`<input type="${"text"}" name="${"email"}"${add_attribute("value", $userEmail, 0)} disabled class="${"svelte-ll5v87"}">
								<button class="${"edit svelte-ll5v87"}"><i class="${"ri-edit-2-line svelte-ll5v87"}"></i></button>`}</form></div>` : ``}

				${validate_component(Button, "Button").$$render(
        $$result,
        {
          text: "Change password",
          type: "fill",
          icon: "ri-lock-password-line"
        },
        {},
        {}
      )}</div></div>` : `<div class="${"panel"}"><p>You need to be logged in to use this page.</p>
			${validate_component(Button, "Button").$$render(
        $$result,
        {
          href: "/account/login",
          type: "outline",
          text: "Log in",
          icon: "ri-login-circle-line"
        },
        {},
        {}
      )}
			${validate_component(Button, "Button").$$render(
        $$result,
        {
          href: "/account/login?register=true",
          type: "outline",
          text: "Register",
          icon: "ri-user-add-line"
        },
        {},
        {}
      )}</div>`}`;
    }
  })}`;
});
export {
  Page as default
};
