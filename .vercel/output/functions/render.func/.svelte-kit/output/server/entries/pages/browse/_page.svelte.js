import { c as create_ssr_component, b as subscribe, h as set_store_value, v as validate_component, f as each, e as escape, d as add_attribute } from "../../../chunks/index2.js";
import { n as notification, p as pagetitle, m as modalCall, g as lookupBook, S as Section } from "../../../chunks/stores2.js";
import { P as Pill } from "../../../chunks/pill.js";
import "../../../chunks/supabaseClient.js";
import { C as Close } from "../../../chunks/close.js";
import { G as Grid } from "../../../chunks/filters.svelte_svelte_type_style_lang.js";
import { L as Loading } from "../../../chunks/loading.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".panel.svelte-10mcldn .card .card_inner.svelte-10mcldn{transform-origin:bottom;border:2px solid var(--primary);padding-top:1.5rem}.panel.svelte-10mcldn .card .card_inner .block.title h2.svelte-10mcldn{opacity:1;text-transform:none;margin:0;font-size:1.6rem;line-height:1.2;margin-bottom:0.5rem}.panel.svelte-10mcldn .card .card_inner .block.title h2 i.svelte-10mcldn{vertical-align:bottom}.panel.svelte-10mcldn .card .card_inner .block.title p.svelte-10mcldn{width:100%}.panel.svelte-10mcldn .card .card_inner .block.description.svelte-10mcldn{margin-top:1rem}.panel.svelte-10mcldn .card .card_inner .block.description p.svelte-10mcldn{font-size:0.95rem}.panel.svelte-10mcldn .card i.fold.svelte-10mcldn{font-size:2.5rem;color:var(--moretranslucent);margin:0;transition:0.1s}.panel.svelte-10mcldn .card button.fold.svelte-10mcldn{all:unset;position:absolute;left:50%;transform:translateX(-50%);bottom:-0.2rem;cursor:pointer}.panel.svelte-10mcldn .card:hover i.fold.svelte-10mcldn{color:var(--accent)}.panel.svelte-10mcldn .card.svelte-10mcldn.open{z-index:2}.panel.svelte-10mcldn .card:global(.open) .card_inner.svelte-10mcldn{pointer-events:all;position:absolute;top:0;left:0;display:table;z-index:1;padding-bottom:3rem;border-color:transparent !important;transform:scale(1.02);cursor:auto}.panel.svelte-10mcldn .card:global(.open) .card_inner .block.description.svelte-10mcldn{opacity:1}.panel.svelte-10mcldn .card:global(.open) .card_inner .block.description.svelte-10mcldn:after{opacity:0}.panel.svelte-10mcldn .card:global(.open) button.fold.svelte-10mcldn{transform:translateX(-50%) rotate(180deg)}.panel.svelte-10mcldn .card:global(.open) button.fold i.svelte-10mcldn{color:var(--moretranslucent) !important}.panel.svelte-10mcldn .card.not-open.svelte-10mcldn{opacity:0.7}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_notification;
  let $pagetitle, $$unsubscribe_pagetitle;
  let $$unsubscribe_modalCall;
  let $$unsubscribe_lookupBook;
  $$unsubscribe_notification = subscribe(notification, (value) => value);
  $$unsubscribe_pagetitle = subscribe(pagetitle, (value) => $pagetitle = value);
  $$unsubscribe_modalCall = subscribe(modalCall, (value) => value);
  $$unsubscribe_lookupBook = subscribe(lookupBook, (value) => value);
  set_store_value(pagetitle, $pagetitle = "Premade spellbooks", $pagetitle);
  let openBook = null;
  let publishedBooks = [];
  $$result.css.add(css);
  $$unsubscribe_notification();
  $$unsubscribe_pagetitle();
  $$unsubscribe_modalCall();
  $$unsubscribe_lookupBook();
  return `
${validate_component(Section, "Section").$$render($$result, { name: "premades" }, {}, {
    default: () => {
      return `<div class="${"panel svelte-10mcldn"}">${publishedBooks.length ? `${validate_component(Grid, "Grid").$$render($$result, {}, {}, {
        default: () => {
          return `${each(publishedBooks, (book) => {
            book.description.toLowerCase();
            return `
					
					
					<div class="${"card item " + escape(
              "",
              true
            ) + " svelte-10mcldn"}" role="${"button"}"${add_attribute("data-class", book.class, 0)}${add_attribute("data-level", book.level, 0)}${add_attribute("data-name", book.name, 0)}${add_attribute("data-id", book.id, 0)}><div class="${"card_inner svelte-10mcldn"}" style="${"border-color: " + escape(book.color, true)}">${openBook === book ? `${validate_component(Close, "Close").$$render($$result, {}, {}, {})}` : ``}
							<div class="${"block title"}"><h2 class="${"svelte-10mcldn"}">
									<i style="${"color: " + escape(book.color, true)}" class="${"ri-book-mark-line svelte-10mcldn"}"></i>
									${escape(book.name)}</h2>
								<br>
								<p style="${"color: " + escape(book.color, true)}" class="${"svelte-10mcldn"}">created by <strong>${escape(book.creator)}</strong></p></div>
							<div class="${"block pills"}">${validate_component(Pill, "Pill").$$render(
              $$result,
              {
                label: "Character level",
                text: "Level " + book.level,
                size: "large",
                icon: "ri-numbers-line"
              },
              {},
              {}
            )}
								${validate_component(Pill, "Pill").$$render(
              $$result,
              {
                label: "Character class",
                text: book.class,
                size: "large",
                icon: "ri-sword-line"
              },
              {},
              {}
            )}</div>
							<div class="${"block description svelte-10mcldn"}"><p class="${"svelte-10mcldn"}"><!-- HTML_TAG_START -->${book.description}<!-- HTML_TAG_END --></p></div>
							<button class="${"fold svelte-10mcldn"}"><i class="${"ri-arrow-down-s-line fold svelte-10mcldn"}"></i></button></div>
						<div class="${"close_veil"}"></div></div>
					`;
          })}`;
        }
      })}` : `${validate_component(Loading, "Loading").$$render($$result, {}, {}, {})}`}</div>`;
    }
  })}`;
});
export {
  Page as default
};
