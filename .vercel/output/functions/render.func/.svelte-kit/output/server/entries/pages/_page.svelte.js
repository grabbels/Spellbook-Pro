import { c as create_ssr_component, v as validate_component, e as escape, b as subscribe, f as each, d as add_attribute, h as set_store_value, g as null_to_empty } from "../../chunks/index2.js";
import { h as bookmarksOpen, i as activeLevels, m as modalCall, l as lookupSpell, j as filters, k as searchFilter, o as saveFilter, r as rangeFilter, v as actionFilter, p as pagetitle, S as Section } from "../../chunks/stores2.js";
import { P as Pill, a as activeSpells } from "../../chunks/pill.js";
import { S as Schoolicon } from "../../chunks/schoolicon.js";
import { C as Close } from "../../chunks/close.js";
import { B as Button } from "../../chunks/button.js";
import { G as Grid } from "../../chunks/filters.svelte_svelte_type_style_lang.js";
const placeholdercard_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: ".placeholder.svelte-1so34af.svelte-1so34af{opacity:0.2;pointer-events:none !important;width:100%}.placeholder.svelte-1so34af .card_inner.svelte-1so34af{pointer-events:none !important}.placeholder.svelte-1so34af .card_inner .svelte-1so34af{letter-spacing:-4px;opacity:0.2;pointer-events:none !important}.placeholder.svelte-1so34af .card_inner h3.svelte-1so34af{opacity:1;font-size:2rem}.placeholder.svelte-1so34af .card_inner h3 span.svelte-1so34af{opacity:1;letter-spacing:-2.9px}.placeholder.svelte-1so34af .card_inner p.svelte-1so34af{line-height:1.3;font-size:1.8rem}.placeholder.svelte-1so34af .card_inner .block.description.svelte-1so34af:after{display:none}",
  map: null
};
const Placeholdercard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$3);
  return `<div class="${"card placeholder svelte-1so34af"}"><div class="${"card_inner svelte-1so34af"}"><div class="${"block svelte-1so34af"}"><h3 class="${"svelte-1so34af"}">${validate_component(Schoolicon, "SchoolIcon").$$render($$result, { school: "blank" }, {}, {})}
				<span style="${"margin-left: .3rem"}" class="${"svelte-1so34af"}">${escape("◼".repeat(Math.floor(Math.random() * 6) + 4))}</span></h3></div>
		<div class="${"block pills svelte-1so34af"}">${validate_component(Pill, "Pill").$$render(
    $$result,
    {
      label: "Casting time",
      text: "◼".repeat(Math.floor(Math.random() * 8) + 6),
      size: "large",
      icon: "ri-checkbox-blank-circle-fill"
    },
    {},
    {}
  )}
			${validate_component(Pill, "Pill").$$render(
    $$result,
    {
      label: "Range or target",
      text: "◼".repeat(Math.floor(Math.random() * 8) + 6),
      size: "large",
      icon: "ri-checkbox-blank-circle-fill"
    },
    {},
    {}
  )}
			${validate_component(Pill, "Pill").$$render(
    $$result,
    {
      label: "Duration",
      text: "◼".repeat(Math.floor(Math.random() * 8) + 6),
      size: "large",
      icon: "ri-checkbox-blank-circle-fill"
    },
    {},
    {}
  )}</div>
		<div class="${"block pills svelte-1so34af"}">${validate_component(Pill, "Pill").$$render(
    $$result,
    {
      label: "School of magic",
      text: "◼".repeat(Math.floor(Math.random() * 8) + 6),
      size: "small",
      icon: "ri-checkbox-blank-circle-fill"
    },
    {},
    {}
  )}</div>
		<div class="${"block description svelte-1so34af"}"><p style="${"word-break: break-all;"}" class="${"svelte-1so34af"}">${escape("◼".repeat(Math.floor(Math.random() * 100) + 100))}</p></div></div>
</div>`;
});
const bookmarks_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".bookmarks.svelte-ed1ogh.svelte-ed1ogh{background-color:transparent;position:sticky;top:1rem;width:60px;padding:0;height:auto;background-color:var(--translucentdark);border-radius:6px;overflow-x:hidden}@media only screen and (max-width: 1024px){.bookmarks.svelte-ed1ogh.svelte-ed1ogh{opacity:0;transition:0.15s}.bookmarks.open.svelte-ed1ogh.svelte-ed1ogh{opacity:1}}.bookmarks.svelte-ed1ogh .bookmark.svelte-ed1ogh{display:inline-block;text-decoration:none;width:100%;height:60px;color:white;display:flex;justify-content:center;align-items:center;font-size:1.2rem;border-radius:6px}.bookmarks.svelte-ed1ogh .bookmark i.svelte-ed1ogh{font-size:1.5rem}.bookmarks.svelte-ed1ogh a.svelte-ed1ogh:hover{background-color:var(--primary)}",
  map: null
};
const Bookmarks = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $bookmarksOpen, $$unsubscribe_bookmarksOpen;
  let $activeLevels, $$unsubscribe_activeLevels;
  $$unsubscribe_bookmarksOpen = subscribe(bookmarksOpen, (value) => $bookmarksOpen = value);
  $$unsubscribe_activeLevels = subscribe(activeLevels, (value) => $activeLevels = value);
  $$result.css.add(css$2);
  $$unsubscribe_bookmarksOpen();
  $$unsubscribe_activeLevels();
  return `<button class="${["bookmarks_handle handle", $bookmarksOpen ? "open" : ""].join(" ").trim()}"><div><i class="${"ri-bookmark-fill"}"></i></div></button>
<div class="${["bookmarks panel svelte-ed1ogh", $bookmarksOpen ? "open" : ""].join(" ").trim()}"><a href="${"#top"}" class="${"bookmark svelte-ed1ogh"}"><div><i class="${"ri-bookmark-fill svelte-ed1ogh"}"></i></div></a>
	${each($activeLevels, (level) => {
    return `<a href="${"#" + escape(level, true)}" class="${"bookmark svelte-ed1ogh"}"><div>${escape(level)}</div></a>`;
  })}
</div>`;
});
const spellsheet_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".spellsheet_wrapper.svelte-f5pol8.svelte-f5pol8{display:grid;grid-template-columns:60px 1fr;grid-gap:1rem;align-items:flex-start}.spellsheet_wrapper.svelte-f5pol8 h2.svelte-f5pol8{position:sticky;top:0;z-index:2}@media only screen and (max-width: 1024px){.spellsheet_wrapper.svelte-f5pol8.svelte-f5pol8{grid-template-columns:0 1fr;grid-gap:0;transition:0.2s}.spellsheet_wrapper.bookmarksopen.svelte-f5pol8.svelte-f5pol8{width:calc(100% + 60px + 5vw);grid-template-columns:60px 1fr;grid-gap:2.5vw}}.grid_wrapper.svelte-f5pol8.svelte-f5pol8:last-child{margin-bottom:8rem}.grid_wrapper.svelte-f5pol8 .grid.svelte-f5pol8{width:100%;display:grid;grid-template-columns:1fr 1fr 1fr 1fr;grid-auto-rows:325px;grid-gap:1rem;position:relative}@media only screen and (max-width: 1500px){.grid_wrapper.svelte-f5pol8 .grid.svelte-f5pol8{grid-template-columns:1fr 1fr 1fr}}@media only screen and (max-width: 1170px){.grid_wrapper.svelte-f5pol8 .grid.svelte-f5pol8{grid-template-columns:1fr 1fr}}@media only screen and (max-width: 820px){.grid_wrapper.svelte-f5pol8 .grid.svelte-f5pol8{grid-template-columns:1fr}}.grid_wrapper.svelte-f5pol8.svelte-f5pol8.one-child{width:calc(33.34% + 2rem)}.grid_wrapper.svelte-f5pol8.one-child .grid.svelte-f5pol8{grid-template-columns:1fr}.grid_wrapper.svelte-f5pol8.svelte-f5pol8.two-children{width:calc(66.67% + 2rem)}.grid_wrapper.svelte-f5pol8.two-children .grid.svelte-f5pol8{grid-template-columns:1fr 1fr}.card.svelte-f5pol8 .card_inner.svelte-f5pol8{transform-origin:bottom}.card.svelte-f5pol8 .card_inner .block.description p.svelte-f5pol8{font-size:0.95rem}.card.svelte-f5pol8 i.fold.svelte-f5pol8{font-size:2.5rem;color:var(--moretranslucent);margin:0;transition:0.1s}.card.svelte-f5pol8 button.fold.svelte-f5pol8{all:unset;position:absolute;left:50%;transform:translateX(-50%);bottom:-0.2rem;cursor:pointer}.card.svelte-f5pol8:hover i.fold.svelte-f5pol8{color:var(--accent)}.card.svelte-f5pol8.svelte-f5pol8.open{z-index:2}.card.svelte-f5pol8.open .card_inner.svelte-f5pol8{pointer-events:all;position:absolute;top:0;left:0;display:table;z-index:1;padding-bottom:3rem;border-color:transparent !important;transform:scale(1.02);cursor:auto}.card.svelte-f5pol8.open .card_inner .block.description.svelte-f5pol8{opacity:1}.card.svelte-f5pol8.open .card_inner .block.description.svelte-f5pol8:after{opacity:0}.card.svelte-f5pol8.open button.fold.svelte-f5pol8{transform:translateX(-50%) rotate(180deg)}.card.svelte-f5pol8.open button.fold i.svelte-f5pol8{color:var(--moretranslucent) !important}.card.not-open.svelte-f5pol8.svelte-f5pol8{opacity:0.7}.card.svelte-f5pol8 .controls.svelte-f5pol8{position:absolute;top:0;right:0;border-radius:6px 6px 0 0;opacity:0;transition:0.1s}.card.svelte-f5pol8 .controls button.svelte-f5pol8{margin:0;padding:0.5rem 0.8rem 0 0;position:relative}.card.svelte-f5pol8 .controls button i.svelte-f5pol8{color:var(--translucent);transform:0.1s}.card.svelte-f5pol8 .controls button .label.svelte-f5pol8{display:none;position:absolute;background-color:var(--spellbg);right:36px;top:11.5px;color:var(--translucent);width:100px;text-align:right;padding:0.2rem 0.6rem;pointer-events:none}.card.svelte-f5pol8 .controls button:hover i.svelte-f5pol8{color:var(--accent)}.card.svelte-f5pol8 .controls button:hover .label.svelte-f5pol8{display:block}.card.svelte-f5pol8:hover .controls.svelte-f5pol8{opacity:1}.card.svelte-f5pol8:last-child .controls .down.svelte-f5pol8{display:none}.card.svelte-f5pol8:first-child .controls .up.svelte-f5pol8{display:none}",
  map: null
};
const Spellsheet = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $activeSpells, $$unsubscribe_activeSpells;
  let $activeLevels, $$unsubscribe_activeLevels;
  let $bookmarksOpen, $$unsubscribe_bookmarksOpen;
  let $$unsubscribe_modalCall;
  let $$unsubscribe_lookupSpell;
  let $filters, $$unsubscribe_filters;
  $$unsubscribe_activeSpells = subscribe(activeSpells, (value) => $activeSpells = value);
  $$unsubscribe_activeLevels = subscribe(activeLevels, (value) => $activeLevels = value);
  $$unsubscribe_bookmarksOpen = subscribe(bookmarksOpen, (value) => $bookmarksOpen = value);
  $$unsubscribe_modalCall = subscribe(modalCall, (value) => value);
  $$unsubscribe_lookupSpell = subscribe(lookupSpell, (value) => value);
  $$unsubscribe_filters = subscribe(filters, (value) => $filters = value);
  let spellsheet;
  let placeholders = ["", "", "", "", "", ""];
  let openSpell = null;
  const levels = [
    "cantrips",
    "level 1",
    "level 2",
    "level 3",
    "level 4",
    "level 5",
    "level 6",
    "level 7",
    "level 8",
    "level 9"
  ];
  function setActiveLevels() {
    set_store_value(activeLevels, $activeLevels = [], $activeLevels);
    for (let spell of $activeSpells) {
      if (spell.display === true && !$activeLevels.includes(parseInt(spell.level))) {
        $activeLevels.push(parseInt(spell.level));
      }
    }
    $activeLevels.sort();
  }
  $$result.css.add(css$1);
  {
    setActiveLevels();
  }
  $$unsubscribe_activeSpells();
  $$unsubscribe_activeLevels();
  $$unsubscribe_bookmarksOpen();
  $$unsubscribe_modalCall();
  $$unsubscribe_lookupSpell();
  $$unsubscribe_filters();
  return `<div class="${["spellsheet_wrapper svelte-f5pol8", $bookmarksOpen ? "bookmarksopen" : ""].join(" ").trim()}"${add_attribute("this", spellsheet, 0)}>${validate_component(Bookmarks, "Bookmarks").$$render($$result, {}, {}, {})}
	<div>${$activeLevels.length ? each($activeLevels, (level) => {
    return `<div class="${"grid_wrapper panel svelte-f5pol8"}"${add_attribute("id", level, 0)}><h2 class="${"svelte-f5pol8"}">${escape(levels[level])}</h2>
				${validate_component(Grid, "Grid").$$render($$result, {}, {}, {
      default: () => {
        return `${each($activeSpells, (spell) => {
          return `${spell.display === true ? (() => {
            let spellDescription = spell.description.toLowerCase();
            return `
							${spell.level == level ? `
								<div${add_attribute("data-name", spell.name, 0)} class="${"card item " + escape(
              "",
              true
            ) + " svelte-f5pol8"}" role="${"button"}"${add_attribute("data-castingtime", spell.casting_time, 0)}${add_attribute("data-range", spell.range, 0)}><div class="${"card_inner svelte-f5pol8"}">${openSpell === spell ? `${validate_component(Close, "Close").$$render($$result, {}, {}, {})}` : ``}
										<div class="${"block"}"><h3>${validate_component(Schoolicon, "SchoolIcon").$$render($$result, { school: spell.school }, {}, {})}
												<span style="${"margin-left: .3rem"}">${escape(spell.name)}</span>
											</h3></div>
										<div class="${"block pills"}">${validate_component(Pill, "Pill").$$render(
              $$result,
              {
                label: "Casting time",
                text: spell.casting_time,
                size: "large",
                icon: "ri-flashlight-line"
              },
              {},
              {}
            )}
											${validate_component(Pill, "Pill").$$render(
              $$result,
              {
                label: "Range or target",
                text: spell.range,
                size: "large",
                icon: "ri-arrow-right-up-line"
              },
              {},
              {}
            )}
											${validate_component(Pill, "Pill").$$render(
              $$result,
              {
                label: "Duration",
                text: spell.duration,
                size: "large",
                icon: "ri-time-line"
              },
              {},
              {}
            )}</div>
										<div class="${"block pills"}">${validate_component(Pill, "Pill").$$render(
              $$result,
              {
                label: "School of magic",
                text: spell.school,
                size: "small",
                icon: "ri-book-2-line"
              },
              {},
              {}
            )}

											${spellDescription.includes("make a ranged spell attack") ? `${validate_component(Pill, "Pill").$$render(
              $$result,
              {
                label: "Spell attack",
                text: "Ranged spell attack",
                size: "small",
                icon: "ri-sword-line"
              },
              {},
              {}
            )}` : `${spellDescription.includes("make a melee spell attack") ? `${validate_component(Pill, "Pill").$$render(
              $$result,
              {
                label: "Spell attack",
                text: "Melee spell attack",
                size: "small",
                icon: "ri-sword-line"
              },
              {},
              {}
            )}` : `${spellDescription.includes("make a spell attack") ? `${validate_component(Pill, "Pill").$$render(
              $$result,
              {
                label: "Spell attack",
                text: "Spell attack",
                size: "small",
                icon: "ri-sword-line"
              },
              {},
              {}
            )}` : `${spell.save ? `${validate_component(Pill, "Pill").$$render(
              $$result,
              {
                label: "Saving throw",
                text: spell.save,
                size: "small",
                icon: "ri-lifebuoy-line"
              },
              {},
              {}
            )}` : ``}`}`}`}</div>
										<div class="${"block description svelte-f5pol8"}"><p class="${"svelte-f5pol8"}"><!-- HTML_TAG_START -->${spell.description}<!-- HTML_TAG_END --></p></div>
										<button class="${"fold svelte-f5pol8"}"><i class="${"ri-arrow-down-s-line fold svelte-f5pol8"}"></i></button></div>
									<div class="${"controls svelte-f5pol8"}"><button class="${"up svelte-f5pol8"}"><i class="${"ri-arrow-up-s-line svelte-f5pol8"}"></i>
											<div class="${"label svelte-f5pol8"}">Move up</div></button>
										<button class="${"down svelte-f5pol8"}"><i class="${"ri-arrow-down-s-line svelte-f5pol8"}"></i>
											<div class="${"label svelte-f5pol8"}">Move down</div></button>
										<button class="${"remove svelte-f5pol8"}"><i class="${"ri-close-line svelte-f5pol8"}"></i>
											<div class="${"label svelte-f5pol8"}">Remove</div></button></div>
									<div class="${"close_veil"}"></div>
								</div>` : ``}`;
          })() : ``}`;
        })}
				`;
      }
    })}
			</div>`;
  }) : `${$filters === true ? `<div class="${"grid_wrapper panel svelte-f5pol8"}"><h2 style="${"opacity: 1; margin-top: 1rem; text-align: center; margin-left: 0; text-transform:none"}" class="${"svelte-f5pol8"}">no results
					</h2>
					<div style="${"width: 100%; text-align: center"}">${validate_component(Button, "Button").$$render(
    $$result,
    {
      text: "Remove filters",
      type: "outline alt"
    },
    {},
    {}
  )}</div>
				</div>` : `<div class="${"grid_wrapper panel svelte-f5pol8"}"><h2 class="${"svelte-f5pol8"}">Add some spells!</h2>
					<div class="${"grid svelte-f5pol8"}">${each(placeholders, (placeholder) => {
    return `${validate_component(Placeholdercard, "PlaceholderCard").$$render($$result, {}, {}, {})}`;
  })}</div>
				</div>`}`}</div>
</div>`;
});
const css = {
  code: ".filters_wrapper.svelte-h0h9mx.svelte-h0h9mx.svelte-h0h9mx{width:100%;margin-bottom:0;padding:1rem 2rem 1rem 1rem;display:flex;flex-wrap:nowrap;position:relative;gap:1rem;background-color:var(--translucentdark)}@media only screen and (max-width: 1024px){.filters_wrapper.svelte-h0h9mx.svelte-h0h9mx.svelte-h0h9mx{position:fixed;left:0;right:0;bottom:0;z-index:20;flex-wrap:wrap;-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);border-radius:12px 12px 0 0;transform:translateY(100%);transition:0.3s}.filters_wrapper.open.svelte-h0h9mx.svelte-h0h9mx.svelte-h0h9mx{transform:translateY(0)}}.filters_wrapper.svelte-h0h9mx .down.svelte-h0h9mx.svelte-h0h9mx{display:none}@media only screen and (max-width: 1024px){.filters_wrapper.svelte-h0h9mx .down.svelte-h0h9mx.svelte-h0h9mx{display:block;position:absolute;top:0.7rem;right:1rem}.filters_wrapper.svelte-h0h9mx .down i.svelte-h0h9mx.svelte-h0h9mx{color:white;font-size:1.7rem}}.filters_wrapper.svelte-h0h9mx h3.svelte-h0h9mx.svelte-h0h9mx{font-size:1.1rem;opacity:0.8;display:inline-block;height:auto;align-self:center;padding-left:0.5rem;margin:0;white-space:nowrap}.filters_wrapper.svelte-h0h9mx .filter.svelte-h0h9mx.svelte-h0h9mx{display:flex;align-items:center;position:relative}@media only screen and (max-width: 1024px){.filters_wrapper.svelte-h0h9mx .filter.svelte-h0h9mx.svelte-h0h9mx{width:100%}}.filters_wrapper.svelte-h0h9mx .filter input.svelte-h0h9mx.svelte-h0h9mx,.filters_wrapper.svelte-h0h9mx .filter button.svelte-h0h9mx.svelte-h0h9mx{margin-bottom:0;height:100%}.filters_wrapper.svelte-h0h9mx .filter input i.svelte-h0h9mx.svelte-h0h9mx,.filters_wrapper.svelte-h0h9mx .filter button.svelte-h0h9mx i.svelte-h0h9mx{transition:0.1s}.filters_wrapper.svelte-h0h9mx .filter input.active i.svelte-h0h9mx.svelte-h0h9mx,.filters_wrapper.svelte-h0h9mx .filter button.active i.svelte-h0h9mx.svelte-h0h9mx{color:var(--lightblue)}.filters_wrapper.svelte-h0h9mx .filter input.svelte-h0h9mx.svelte-h0h9mx{background-color:var(--moretranslucent)}@media only screen and (max-width: 1024px){.filters_wrapper.svelte-h0h9mx .filter input.svelte-h0h9mx.svelte-h0h9mx{width:100%}}.filters_wrapper.svelte-h0h9mx .filter.castingtime button.svelte-h0h9mx.svelte-h0h9mx,.filters_wrapper.svelte-h0h9mx .filter.range button.svelte-h0h9mx.svelte-h0h9mx,.filters_wrapper.svelte-h0h9mx .filter.save button.svelte-h0h9mx.svelte-h0h9mx{margin:0;border-radius:0}.filters_wrapper.svelte-h0h9mx .filter.castingtime button.selected.svelte-h0h9mx.svelte-h0h9mx,.filters_wrapper.svelte-h0h9mx .filter.range button.selected.svelte-h0h9mx.svelte-h0h9mx,.filters_wrapper.svelte-h0h9mx .filter.save button.selected.svelte-h0h9mx.svelte-h0h9mx{background-color:var(--lightblue);border-color:var(--lightblue)}.filters_wrapper.svelte-h0h9mx .filter.castingtime button.svelte-h0h9mx.svelte-h0h9mx:first-child,.filters_wrapper.svelte-h0h9mx .filter.range button.svelte-h0h9mx.svelte-h0h9mx:first-child,.filters_wrapper.svelte-h0h9mx .filter.save button.svelte-h0h9mx.svelte-h0h9mx:first-child{border-radius:6px 0 0 6px;pointer-events:none;padding-right:0.2rem}.filters_wrapper.svelte-h0h9mx .filter.castingtime button.svelte-h0h9mx.svelte-h0h9mx:last-child,.filters_wrapper.svelte-h0h9mx .filter.range button.svelte-h0h9mx.svelte-h0h9mx:last-child,.filters_wrapper.svelte-h0h9mx .filter.save button.svelte-h0h9mx.svelte-h0h9mx:last-child{border-radius:0 6px 6px 0}.filters_wrapper.svelte-h0h9mx .filter.remove button.svelte-h0h9mx.svelte-h0h9mx{padding:0.35rem 0.8rem}.filters_wrapper.svelte-h0h9mx .filter.remove button.svelte-h0h9mx i.svelte-h0h9mx{margin:0}",
  map: null
};
const Filters = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $activeSpells, $$unsubscribe_activeSpells;
  let $searchFilter, $$unsubscribe_searchFilter;
  let $saveFilter, $$unsubscribe_saveFilter;
  let $rangeFilter, $$unsubscribe_rangeFilter;
  let $actionFilter, $$unsubscribe_actionFilter;
  let $filters, $$unsubscribe_filters;
  let $bookmarksOpen, $$unsubscribe_bookmarksOpen;
  $$unsubscribe_activeSpells = subscribe(activeSpells, (value) => $activeSpells = value);
  $$unsubscribe_searchFilter = subscribe(searchFilter, (value) => $searchFilter = value);
  $$unsubscribe_saveFilter = subscribe(saveFilter, (value) => $saveFilter = value);
  $$unsubscribe_rangeFilter = subscribe(rangeFilter, (value) => $rangeFilter = value);
  $$unsubscribe_actionFilter = subscribe(actionFilter, (value) => $actionFilter = value);
  $$unsubscribe_filters = subscribe(filters, (value) => $filters = value);
  $$unsubscribe_bookmarksOpen = subscribe(bookmarksOpen, (value) => $bookmarksOpen = value);
  let actionFilterArray = [];
  let rangeFilterArray = [];
  let saveFilterArray = [];
  function collectFilters() {
    actionFilterArray = [];
    rangeFilterArray = [];
    saveFilterArray = [];
    for (let i = 0; i < $activeSpells.length; i++) {
      $activeSpells[i].description.toLowerCase();
      let range = $activeSpells[i].range.toLowerCase();
      let action = $activeSpells[i].casting_time.toLowerCase();
      let save = $activeSpells[i].save;
      if (range.includes("self") && !rangeFilterArray.includes("self")) {
        rangeFilterArray.push("self");
      }
      if (range.includes("touch") && !rangeFilterArray.includes("touch")) {
        rangeFilterArray.push("touch");
      }
      if (range.includes("feet") && !rangeFilterArray.includes("range")) {
        rangeFilterArray.push("range");
      }
      if (action.toLowerCase().includes("bonus") && !actionFilterArray.includes("bonus")) {
        actionFilterArray.push("bonus");
      }
      if (action.toLowerCase().includes("1 action") && !actionFilterArray.includes("1 action")) {
        actionFilterArray.push("action");
      }
      if (action.toLowerCase().includes("reaction") && !actionFilterArray.includes("reaction")) {
        actionFilterArray.push("re-action");
      }
      if (save && !saveFilterArray.includes(save)) {
        saveFilterArray.push(save);
      }
    }
  }
  function filterSpells() {
    if (!$actionFilter && !$rangeFilter && !$searchFilter && !$saveFilter) {
      set_store_value(filters, $filters = false, $filters);
      for (let i = 0; i < $activeSpells.length; i++) {
        set_store_value(activeSpells, $activeSpells[i].display = true, $activeSpells);
      }
    } else {
      set_store_value(filters, $filters = true, $filters);
    }
    $activeSpells.filter((item) => {
      if ($actionFilter || $rangeFilter || $searchFilter || $saveFilter) {
        ($actionFilter ? item.casting_time.toLowerCase().includes($actionFilter) : true) && ($rangeFilter ? item.range.toLowerCase().includes($rangeFilter) : true) && ($saveFilter ? item.save == $saveFilter : true) && ($searchFilter ? item.name.toLowerCase().includes($searchFilter) : true) ? item.display = true : item.display = false;
      }
    });
    activeSpells.set($activeSpells);
  }
  $$result.css.add(css);
  {
    collectFilters();
  }
  {
    filterSpells();
  }
  {
    filterSpells();
  }
  $$unsubscribe_activeSpells();
  $$unsubscribe_searchFilter();
  $$unsubscribe_saveFilter();
  $$unsubscribe_rangeFilter();
  $$unsubscribe_actionFilter();
  $$unsubscribe_filters();
  $$unsubscribe_bookmarksOpen();
  return `<button class="${[
    "filters_handle handle svelte-h0h9mx",
    ($bookmarksOpen ? true : "") ? "open" : ""
  ].join(" ").trim()}"><div><i class="${"ri-filter-2-fill svelte-h0h9mx"}"></i></div></button>

<div class="${["filters_wrapper panel svelte-h0h9mx", ""].join(" ").trim()}"><button class="${"down svelte-h0h9mx"}"><i class="${"ri-arrow-down-s-line svelte-h0h9mx"}"></i></button>
	<h3 class="${"button svelte-h0h9mx"}"><i class="${"ri-filter-2-line svelte-h0h9mx"}"></i> Filters</h3>
	<div class="${"filter svelte-h0h9mx"}" data-filter="${"search"}"><input type="${"text"}" placeholder="${"Search spellbook..."}" class="${"svelte-h0h9mx"}"${add_attribute("value", $searchFilter, 0)}></div>
	${actionFilterArray.length > 0 ? `<div class="${"filter castingtime svelte-h0h9mx"}" data-filter="${"castingtime"}"><button disabled="${"disabled"}" class="${["subtle svelte-h0h9mx", $actionFilter ? "active" : ""].join(" ").trim()}"><i class="${escape(
    null_to_empty($actionFilter ? "ri-flashlight-fill" : "ri-flashlight-line"),
    true
  ) + " svelte-h0h9mx"}"></i></button>
			${actionFilterArray.includes("action") ? `<button class="${["subtle svelte-h0h9mx", $actionFilter === "action" ? "selected" : ""].join(" ").trim()}">Action</button>` : ``}
			${actionFilterArray.includes("bonus") ? `<button class="${["subtle svelte-h0h9mx", $actionFilter === "bonus" ? "selected" : ""].join(" ").trim()}">Bonus</button>` : ``}

			${actionFilterArray.includes("re-action") ? `<button class="${["subtle svelte-h0h9mx", $actionFilter === "reaction" ? "selected" : ""].join(" ").trim()}">Reaction</button>` : ``}</div>` : ``}
	${rangeFilterArray.length > 0 ? `<div class="${"filter range svelte-h0h9mx"}" data-filter="${"range"}"><button disabled="${"disabled"}" class="${["subtle svelte-h0h9mx", $rangeFilter ? "active" : ""].join(" ").trim()}"><i class="${"ri-arrow-right-up-line svelte-h0h9mx"}"></i></button>
			${rangeFilterArray.includes("self") ? `<button class="${["subtle svelte-h0h9mx", $rangeFilter === "self" ? "selected" : ""].join(" ").trim()}">Self</button>` : ``}
			${rangeFilterArray.includes("touch") ? `<button class="${["subtle svelte-h0h9mx", $rangeFilter === "touch" ? "selected" : ""].join(" ").trim()}">Touch</button>` : ``}

			${rangeFilterArray.includes("range") ? `<button class="${["subtle svelte-h0h9mx", $rangeFilter === "feet" ? "selected" : ""].join(" ").trim()}">Range</button>` : ``}</div>` : ``}
	
	${saveFilterArray.length > 0 ? `<div class="${"filter save svelte-h0h9mx"}" data-filter="${"save"}"><button disabled="${"disabled"}" class="${["subtle svelte-h0h9mx", $saveFilter ? "active" : ""].join(" ").trim()}"><i class="${"ri-lifebuoy-line svelte-h0h9mx"}"></i></button>
			${each(saveFilterArray, (save) => {
    return `<button class="${["subtle svelte-h0h9mx", $saveFilter === save ? "selected" : ""].join(" ").trim()}">${escape(save)}</button>`;
  })}</div>` : ``}
	<div class="${"filter remove svelte-h0h9mx"}">${$filters ? `<button class="${"outline alt svelte-h0h9mx"}"><i class="${"ri-close-line svelte-h0h9mx"}"></i></button>` : ``}</div>
</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $pagetitle, $$unsubscribe_pagetitle;
  let $activeSpells, $$unsubscribe_activeSpells;
  $$unsubscribe_pagetitle = subscribe(pagetitle, (value) => $pagetitle = value);
  $$unsubscribe_activeSpells = subscribe(activeSpells, (value) => $activeSpells = value);
  set_store_value(pagetitle, $pagetitle = "Home", $pagetitle);
  $$unsubscribe_pagetitle();
  $$unsubscribe_activeSpells();
  return `${validate_component(Section, "Section").$$render($$result, { name: "filters" }, {}, {
    default: () => {
      return `${$activeSpells.length > 0 ? `${validate_component(Filters, "Filters").$$render($$result, {}, {}, {})}` : ``}`;
    }
  })}
${validate_component(Section, "Section").$$render($$result, { name: "spellsheet" }, {}, {
    default: () => {
      return `${validate_component(Spellsheet, "Spellsheet").$$render($$result, {}, {}, {})}`;
    }
  })}`;
});
export {
  Page as default
};
