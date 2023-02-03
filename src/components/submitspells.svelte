<script>
	import { supabaseClient } from '$lib/supabaseClient';
	import { modalCall, notification, userId } from './stores';
	let name;
	let level;
	let school;
	let casting_time;
	let duration;
	let range;
	let description;
	let higher_levels;
	let save;
	let attack;
	let ritual;
	let classes;
	let verbal;
	let somatic;
	let materials;
	let material;
	let sources;
	let email;
	let loading = false;
	async function submitSpell() {
		loading = true;
		let selectedClassesNodes = classes.querySelectorAll('input:checked');
		let selectedClasses = [];
		for (let i = 0; i < selectedClassesNodes.length; i++) {
			selectedClasses.push(selectedClassesNodes[i].value);
		}
		let spell = {};
		spell.casting_time = casting_time;
		spell.name = name;
		spell.classes = selectedClasses;
		spell.components = {
			material: material,
			materials_needed: materials,
			somatic: somatic,
			verbal: verbal
		};
		spell.description = description;
		spell.duration = duration;
		spell.level = level;
		spell.name = name;
		spell.range = range;
		spell.ritual = ritual;
		spell.school = school;
		let levelth =
			level === 0
				? ''
				: level === 1
				? '1st'
				: level === 2
				? '2nd'
				: level === 3
				? '3rd'
				: level === 4
				? '4th'
				: level === 5
				? '5th'
				: level === 6
				? '6th'
				: level === 7
				? '7th'
				: level === 8
				? '8th'
				: level === 9
				? '9th'
				: '';
		switch (level) {
			case 1:
				levelth = '1st';
				break;
			case 2:
				levelth = '2nd';
				break;
			case 3:
				levelth = '3rd';
				break;
			case 4:
				levelth = '4th';
				break;
			case 5:
				levelth = '5th';
				break;
			case 6:
				levelth = '6th';
				break;
			case 7:
				levelth = '7th';
				break;
			case 8:
				levelth = '8th';
				break;
			case 9:
				levelth = '9th';
				break;
			default:
				levelth = '';
				break;
		}
		if (level == 0) {
			spell.type = school + ' cantrip';
		} else {
			spell.type = levelth + '-level ' + school;
		}

		console.log(spell);
		const { data, error } = await supabaseClient
			.from('submittedspells')
			.insert({
				spell: { spell },
				user_id: $userId,
				user_email: email,
				sources: sources
			})
			.select();
		if (error) {
			console.log(error);
			$notification = 'Oops, an error occurred. Error code: ' + error.code + '#error';
		} else if (data) {
			$notification = 'Spell succesfully submitted. Thank you!#positive';
			loading = false;
			$modalCall = '';
			$modalCall = $modalCall;
		}
	}
</script>

<h1>Submit spell</h1>
<p>
	Thank you for taking the time to make Inky's Spellbook more complete! It's quite some information
	to fill in, but if you do so from a credible source you'll be done in no-time.
</p>
<p>
	Every spell submission is subject to screening and a submission is no guarantee a spell will make
	it into the database, this all depends on the spell's credibility and/or community support.
</p>
<form on:submit|preventDefault={submitSpell}>
	<div>
		<label for="name">Spell name</label>
		<p>Message, Green-Flame Blade, etc.</p>
		<input
			bind:value={name}
			id="name"
			type="text"
			name="name"
			required
			placeholder="Arcane Missile"
		/>
	</div>

	<div>
		<label for="level">Spell level</label>
		<select bind:value={level} id="level" name="level" required>
			<option value="null">Select level</option>
			<option value="cantrip">cantrip</option>
			<option value="1">level 1</option>
			<option value="2">level 2</option>
			<option value="3">level 3</option>
			<option value="4">level 4</option>
			<option value="5">level 5</option>
			<option value="6">level 6</option>
			<option value="7">level 7</option>
			<option value="8">level 8</option>
			<option value="9">level 9</option>
		</select>
	</div>

	<div>
		<label for="school">School of magic</label>
		<select bind:value={school} id="school" name="school" required>
			<option value="select" disabled>Select school</option>
			<option value="conjuration">conjuration</option>
			<option value="necromancy">necromancy</option>
			<option value="evocation">evocation</option>
			<option value="abjuration">abjuration</option>
			<option value="transmutation">transmutation</option>
			<option value="divination">divination</option>
			<option value="enchantment">enchantment</option>
			<option value="illusion">illusion</option>
		</select>
	</div>

	<div>
		<label for="casting_time">Casting time</label>
		<p>1 action, 1 bonus action, 1 reaction, etc.</p>
		<input
			bind:value={casting_time}
			type="text"
			id="casting_time"
			name="casting_time"
			required
			placeholder="1 action"
		/>
	</div>
	<div>
		<label for="duration">Duration</label>
		<p>
			1 round, instantaneous, etc.<br />If concentration is required, notate it like "Concentration,
			up to 1 round" or similar.
		</p>
		<input
			bind:value={duration}
			type="text"
			id="duration"
			name="duration"
			required
			placeholder="1 hour"
		/>
	</div>
	<div>
		<label for="range">Range</label>
		<p>30 feet, Touch, Touch (5-foot radius), etc.</p>
		<input bind:value={range} type="text" id="range" name="range" required placeholder="30 feet" />
	</div>

	<div>
		<label for="description" required>Spell description</label>
		<p>Use the official spell description or one from a credible source.</p>
		<textarea
			bind:value={description}
			name="description"
			id="description"
			required
			placeholder="You create a healing elixir in a simple vial that appears in your hand."
		/>
	</div>
	<div>
		<label for="higher_levels">At higher levels</label>
		<p>
			If the spell changes when upcast or at higher character levels, mention the description here.
		</p>
		<textarea
			bind:value={higher_levels}
			name="higher_levels"
			id="higher_levels"
			required
			placeholder="This spell's damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8)..."
		/>
	</div>

	<div>
		<label for="save">Defender saving throw</label>
		<select bind:value={save} name="save" id="save" required>
			<option value="null">No saving throw</option>
			<option value="str">Strength</option>
			<option value="dex">Dexterity</option>
			<option value="con">Constitution</option>
			<option value="wis">Wisdom</option>
			<option value="int">Intelligence</option>
			<option value="cha">Charisma</option>
		</select>
	</div>
	<div>
		<label for="attack">Attack</label>
		<select bind:value={attack} name="attack" id="attack" required>
			<option value="null">No spell/melee attack</option>
			<option value="Ranged spell attack">Ranged spell attack</option>
			<option value="Melee spell attack">Melee spell attack</option>
			<option value="Ranged weapon attack">Ranged weapon attack</option>
			<option value="Melee weapon attack">Melee weapon attack</option>
		</select>
	</div>

	<div>
		<input bind:checked={ritual} name="ritual" id="ritual" type="checkbox" />
		<label for="ritual">Ritual?</label>
	</div>

	<div bind:this={classes} id="classes">
		<label style="width: 100%" for="classes">Spell classes</label>
		<p style="width: 100%">Which classes can use this spell?</p>
		<div>
			<input type="checkbox" id="wizard" value="wizard" /><label for="wizard">wizard</label>
		</div>
		<div>
			<input type="checkbox" id="sorcerer" value="sorcerer" /><label for="sorcerer">sorcerer</label>
		</div>
		<div>
			<input type="checkbox" id="warlock" value="warlock" /><label for="warlock">warlock</label>
		</div>
		<div><input type="checkbox" id="bard" value="bard" /><label for="bard">bard</label></div>
		<div>
			<input type="checkbox" id="cleric" value="cleric" /><label for="cleric">cleric</label>
		</div>
		<div><input type="checkbox" id="druid" value="druid" /><label for="druid">druid</label></div>
		<div>
			<input type="checkbox" id="fighter" value="fighter" /><label for="fighter">fighter</label>
		</div>
		<div><input type="checkbox" id="monk" value="monk" /><label for="monk">monk</label></div>
		<div>
			<input type="checkbox" id="paladin" value="paladin" /><label for="paladin">paladin</label>
		</div>
		<div>
			<input type="checkbox" id="ranger" value="ranger" /><label for="ranger">ranger</label>
		</div>
		<div><input type="checkbox" id="rogue" value="rogue" /><label for="rogue">rogue</label></div>
	</div>

	<h3>Components</h3>
	<div>
		<input bind:checked={verbal} name="verbal" id="verbal" type="checkbox" />
		<label for="verbal">Verbal</label>
	</div>
	<div>
		<input bind:checked={somatic} name="Somatic" id="somatic" type="checkbox" />
		<label for="somatic">Somatic</label>
	</div>
	<div>
		<input bind:checked={material} name="material" id="material" type="checkbox" />
		<label for="material">Materials</label>
		<textarea
			bind:value={materials}
			id="materials"
			style="display: {material ? 'block' : 'none'}"
			name="materials"
			placeholder="a diamond worth at least 50gp"
		/>
	</div>

	<div>
		<label for="source">Source(s)</label>
		<p>
			Please mention the book (including page number) or URL you sourced this spell from. This is
			essential for deciding if the spell will be included in Inky's Spellbook. The spell will be
			evaluated based on the credibility of the source, as well as on community support in case of
			homebrew.
		</p>
		<textarea bind:value={sources} name="source" id="source" required />
	</div>

	<div>
		<label for="email">Email address</label>
		<p>Leave your email address if you'd like to be informed if and when the spell is included.</p>
		<input bind:value={email} type="email" name="email" id="email" />
	</div>

	<button class="{loading ? 'loading' : ''} fill accent" type="submit"
		><i class="ri-checkbox-circle-line" />Submit spell
		<div><i class="ri-loader-5-line" /></div></button
	>
</form>

<style lang="scss">
	label {
		font-weight: 700;
		display: inline-block;
		margin-bottom: 0.2rem;
	}
	p {
		opacity: 0.7;
		margin-top: 0;
	}

	input[type='checkbox'] {
		display: inline;
		width: auto;
	}

	#classes {
		display: flex;
		flex-wrap: wrap;
		div {
			margin-right: 1rem;
			input {
				margin-right: 0.2rem;
			}
		}
	}
	button {
		div {
			position: absolute;
			display: none;
			animation-name: rotate;
			animation-iteration-count: infinite;
			animation-timing-function: linear;
			animation-duration: 0.6s;
			top: -3px;
			width: 100%;
			text-align: center;
			left: 0;
			&.loading {
				color: var(--accent);
				div {
					display: block;
				}
			}
		}
	}
</style>
