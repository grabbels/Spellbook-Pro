<script>
	import { onMount } from 'svelte';
	import { userPrefs } from '../stores/stores-persist';
	let filters,
		bookmarks,
		tabs,
		quicksearch,
		theme,
		castingTime,
		range,
		duration,
		school,
		icon,
		save,
		attack,
		description;
	onMount(() => {
		filters = $userPrefs.filters;
		bookmarks = $userPrefs.bookmarks;
		tabs = $userPrefs.tabs;
		quicksearch = $userPrefs.quicksearch;
		theme = $userPrefs.theme;
		castingTime = $userPrefs.casting_time;
		range = $userPrefs.range;
		duration = $userPrefs.duration;
		school = $userPrefs.school;
		icon = $userPrefs.icon;
		save = $userPrefs.save;
		attack = $userPrefs.attack;
		description = $userPrefs.description;
	});
	function savePrefs() {
		$userPrefs = {
			filters: filters,
			bookmarks: bookmarks,
			tabs: tabs,
			quicksearch: quicksearch,
			theme: theme,
			casting_time: castingTime,
			range: range,
			duration: duration,
			school: school,
			icon: icon,
			save: save,
			attack: attack,
			description: description
		};
		console.log($userPrefs);
	}
</script>

<h2 style="margin-bottom: 1rem"><i class="ri-settings-line" /> Options</h2>
<form on:change={() => savePrefs()} class="grid">
	<div class="panel">
		<h2>Interface</h2>
		<div class="option_cat">
			<p>Show:</p>
			<label class="grid" for="filters"
				><input bind:checked={filters} id="filters" name="filters" type="checkbox" /><i
					class="ri-checkbox-blank-circle-fill"
				/><i class="ri-checkbox-circle-fill" /><span>Filters bar</span></label
			>
			<label class="grid" for="bookmarks"
				><input bind:checked={bookmarks} id="bookmarks" name="bookmarks" type="checkbox" /><i
					class="ri-checkbox-blank-circle-fill"
				/><i class="ri-checkbox-circle-fill" /><span>Bookmarks bar</span></label
			>
			<label class="grid" for="tab-bar"
				><input bind:checked={tabs} id="tab-bar" name="tab-bar" type="checkbox" /><i
					class="ri-checkbox-blank-circle-fill"
				/><i class="ri-checkbox-circle-fill" /><span>Tabs bar</span></label
			>
			<label class="grid" for="quicksearch"
				><input bind:checked={quicksearch} id="quicksearch" name="quicksearch" type="checkbox" /><i
					class="ri-checkbox-blank-circle-fill"
				/><i class="ri-checkbox-circle-fill" /><span>Quicksearch bar</span></label
			>
		</div>
		<div class="option_cat">
			<p>Theme</p>
			<label for="theme"
				><select bind:value={theme} id="theme" name="theme">
					<option value="abyss">Abyss</option>
					<option value="void">Void</option>
					<option value="astral-plane">Astral Plane</option>
					<option value="ombre">Ombre</option>
					<option value="xp">XP</option>
				</select></label
			>
		</div>
	</div>
	<div class="panel">
		<h2>Spells</h2>
		<div class="option_cat">
			<p>Show:</p>
			<label class="grid" for="casting-time"
				><input
					bind:checked={castingTime}
					id="casting-time"
					name="casting-time"
					type="checkbox"
				/><i class="ri-checkbox-blank-circle-fill" /><i class="ri-checkbox-circle-fill" /><span
					>Casting time</span
				></label
			>
			<label class="grid" for="range"
				><input bind:checked={range} id="range" name="range" type="checkbox" /><i
					class="ri-checkbox-blank-circle-fill"
				/><i class="ri-checkbox-circle-fill" /><span>Range or target</span></label
			>
			<label class="grid" for="duration"
				><input bind:checked={duration} id="duration" name="duration" type="checkbox" /><i
					class="ri-checkbox-blank-circle-fill"
				/><i class="ri-checkbox-circle-fill" /><span>Duration</span></label
			>
			<label class="grid" for="school"
				><input bind:checked={school} id="school" name="school" type="checkbox" /><i
					class="ri-checkbox-blank-circle-fill"
				/><i class="ri-checkbox-circle-fill" /><span>School of magic</span></label
			>
			<label class="grid" for="icon"
				><input bind:checked={icon} id="icon" name="icon" type="checkbox" /><i
					class="ri-checkbox-blank-circle-fill"
				/><i class="ri-checkbox-circle-fill" /><span>School icon</span></label
			>
			<label class="grid" for="save"
				><input bind:checked={save} id="save" name="save" type="checkbox" /><i
					class="ri-checkbox-blank-circle-fill"
				/><i class="ri-checkbox-circle-fill" /><span>Saving throw</span></label
			>
			<label class="grid" for="attack"
				><input bind:checked={attack} id="attack" name="attack" type="checkbox" /><i
					class="ri-checkbox-blank-circle-fill"
				/><i class="ri-checkbox-circle-fill" /><span>Spell attack</span></label
			>
			<label class="grid" for="description"
				><input bind:checked={description} id="description" name="description" type="checkbox" /><i
					class="ri-checkbox-blank-circle-fill"
				/><i class="ri-checkbox-circle-fill" /><span>Description</span></label
			>
		</div>
	</div>
</form>

<style lang="scss">
	h2 {
		i {
			vertical-align: -5.5px;
		}
	}
	.grid {
		grid-template-columns: 1fr 1fr;
		display: grid;
		grid-gap: 0.5rem;
		@media only screen and (max-width: 1023px) {
			grid-template-columns: 1fr;
		}
		.panel {
			background-color: var(--moretranslucent);
			border-radius: 6px;
			padding: 1rem;
			.option_cat {
				margin-bottom: 1rem;
			}
			h2 {
				margin-left: 0;
			}
			input[type='checkbox'] {
				display: none;
			}
			select {
				cursor: pointer;
			}
			label.grid {
				display: inline-block;
				display: grid;
				grid-template-columns: 25px 1fr;
				gap: 0.7rem;
				margin-bottom: 0.5rem;
				height: auto;
				line-height: 1;
				align-items: center;
				cursor: pointer;
				span {
					display: inline-block;
					margin-top: -1px;
				}
				i {
					color: var(--translucent);
					font-size: 2rem;
					transition: 0.1s;
					&.ri-checkbox-blank-circle-fill {
						display: block;
					}
					&.ri-checkbox-circle-fill {
						display: none;
					}
				}
				&:hover {
					i {
						color: var(--lesstranslucent);
					}
				}
				input:checked ~ .ri-checkbox-blank-circle-fill {
					display: none;
				}
				input:checked ~ .ri-checkbox-circle-fill {
					display: block;
					color: var(--accent);
				}
				&:active {
					i {
						transform: scale(0.85);
					}
				}
			}
		}
	}
</style>
