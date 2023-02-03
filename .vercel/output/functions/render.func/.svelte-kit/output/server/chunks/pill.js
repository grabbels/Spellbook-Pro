import { j as get_store_value, c as create_ssr_component, e as escape, g as null_to_empty } from "./index2.js";
import { w as writable$1 } from "./index.js";
import { b as spellListEmpty, f as savedSpellSheets, n as notification } from "./stores2.js";
import { s as supabaseClient } from "./supabaseClient.js";
var stores = {};
function getStorage(type) {
  return type === "local" ? localStorage : sessionStorage;
}
function writable(key, initialValue, options) {
  const serializer = (options == null ? void 0 : options.serializer) ?? JSON;
  const storageType = (options == null ? void 0 : options.storage) ?? "local";
  const browser = typeof window !== "undefined" && typeof document !== "undefined";
  function updateStorage(key2, value) {
    if (!browser)
      return;
    getStorage(storageType).setItem(key2, serializer.stringify(value));
  }
  if (!stores[key]) {
    const store = writable$1(initialValue, (set2) => {
      const json = browser ? getStorage(storageType).getItem(key) : null;
      if (json) {
        set2(serializer.parse(json));
      }
      if (browser) {
        const handleStorage = (event) => {
          if (event.key === key)
            set2(event.newValue ? serializer.parse(event.newValue) : null);
        };
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
      }
    });
    const { subscribe, set } = store;
    stores[key] = {
      set(value) {
        updateStorage(key, value);
        set(value);
      },
      update(updater) {
        const value = updater(get_store_value(store));
        updateStorage(key, value);
        set(value);
      },
      subscribe
    };
  }
  return stores[key];
}
const activeSpells = writable("activeSpells", []);
const loggedIn = writable("loggedIn", false);
writable("userNickname", null);
const firstVisit = writable("firstVisit", true);
let classes = [
  "Artificer",
  "Barbarian",
  "Bard",
  "Cleric",
  "Druid",
  "Fighter",
  "Monk",
  "Paladin",
  "Ranger",
  "Rogue",
  "Sorcerer",
  "Warlock",
  "Wizard"
];
activeSpells.subscribe((data) => {
  if (data.length === 0) {
    spellListEmpty.set(true);
  } else {
    spellListEmpty.set(false);
  }
});
async function retrieveSession() {
  const { data: { session } } = await supabaseClient.auth.getSession();
  return session;
}
async function loadSpellsheetsByUserId(id) {
  if (!id) {
    const { data: { user } } = await supabaseClient.auth.getUser();
    if (user) {
      id = user.id;
      handleLoad();
    }
  } else {
    handleLoad();
  }
  async function handleLoad() {
    const { data, error } = await supabaseClient.from("spellbooks").select().eq("user_id", id).order("created", { ascending: false });
    if (data) {
      let placeholderSlots = 7 - data.length;
      let retrievedSaves = data;
      retrievedSaves.push({ id: "add" });
      for (let i = 0; i < placeholderSlots; i++) {
        retrievedSaves.push({});
      }
      if (retrievedSaves.length > 0) {
        savedSpellSheets.set(retrievedSaves);
      } else {
        savedSpellSheets.set("none");
      }
      console.log("getting saved books");
    } else if (error) {
      notification.set("Oops, an error occurred. Error code: " + error.code + "#error");
    }
  }
}
const pill_svelte_svelte_type_style_lang = "";
const css = {
  code: "div.svelte-1a3z35.svelte-1a3z35{border-radius:50vh;display:inline-block;margin:0.5rem 0.4rem 0 0;padding:0.2rem 0.8rem 0.2rem 0.6rem;font-size:1rem;font-weight:400;-webkit-user-select:none;-moz-user-select:none;user-select:none;position:relative}div.svelte-1a3z35 i.svelte-1a3z35{font-size:1.2rem;vertical-align:-4.5px;margin-right:0.3rem}div.small.svelte-1a3z35.svelte-1a3z35{color:var(--white);background-color:var(--translucent);font-size:0.9rem;margin:0.5rem 0.4rem 0 0;border-radius:50vh}div.small.svelte-1a3z35.svelte-1a3z35:last-child{margin-right:0}div.small.svelte-1a3z35 .label.svelte-1a3z35{background-color:#5c5375}div.small.svelte-1a3z35 i.svelte-1a3z35{font-size:1rem;vertical-align:-4px}div.large.svelte-1a3z35.svelte-1a3z35{background-color:var(--accent);color:var(--bg)}div.large.svelte-1a3z35.svelte-1a3z35:nth-of-type(2){background-color:var(--lightblue)}div.large.svelte-1a3z35.svelte-1a3z35:nth-of-type(3){background-color:var(--yellow)}div.svelte-1a3z35 .label.svelte-1a3z35{all:inherit;position:absolute;left:0;top:0;margin:0;min-width:100%;width:-moz-max-content;width:max-content;z-index:2;display:none;box-shadow:0 3px 10px rgba(19, 19, 19, 0.4)}div.svelte-1a3z35:hover .label.svelte-1a3z35{display:block}div.placeholder.svelte-1a3z35.svelte-1a3z35{background-color:var(--white) !important;color:transparent}div.print.svelte-1a3z35.svelte-1a3z35{background-color:black !important;color:white !important}div.print.svelte-1a3z35 i.svelte-1a3z35{color:white !important}",
  map: null
};
const Pill = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { icon } = $$props;
  let { text } = $$props;
  let { size } = $$props;
  let { label = "" } = $$props;
  let { print = false } = $$props;
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.print === void 0 && $$bindings.print && print !== void 0)
    $$bindings.print(print);
  $$result.css.add(css);
  return `<div class="${"pill " + escape(size, true) + " " + escape(print ? "print" : "", true) + " " + escape(
    icon === "ri-checkbox-blank-circle-fill" ? "placeholder" : "",
    true
  ) + " svelte-1a3z35"}"><i class="${escape(null_to_empty(icon), true) + " svelte-1a3z35"}"></i><span>${escape(text)}</span>
	${label ? `<div class="${"pill " + escape(size, true) + " label svelte-1a3z35"}"><i class="${escape(null_to_empty(icon), true) + " svelte-1a3z35"}"></i>${escape(label)}</div>` : ``}
</div>`;
});
export {
  Pill as P,
  activeSpells as a,
  loggedIn as b,
  classes as c,
  firstVisit as f,
  loadSpellsheetsByUserId as l,
  retrieveSession as r
};
