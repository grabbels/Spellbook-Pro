<script>
	export let selectedColor;
	export let prevColor;
	if (!selectedColor && $bookToEdit) {
		console.log('edit');
		selectedColor = $bookToEdit.color;
	}
	import { colors } from './data/colors';
	import { bookToEdit } from './stores/stores';
	import { clickOutside } from './functions/clickOutside';
</script>

<div class="color_picker">
	<form use:clickOutside on:outsideclick={() => {selectedColor = prevColor}}>
		{#each colors as color}
			<input
				type="radio"
				id={color}
				name={color}
				value={color}
				bind:group={selectedColor}
			/>
			<label for={color} style="background-color: {color}" />
		{/each}
	</form>
</div>

<style lang="scss">
	div {
		position: absolute;
		right: -0.5rem;
		top: calc(-41.4px - 0.5rem);
		width: calc(41.4px * 4 + 2.5rem);
		background-color: var(--translucentdarker);
		box-shadow: 0 3px 10px rgba(0, 0, 0, 0.4);
		border-radius: 6px;
		backdrop-filter: blur(3px);
		form {
			display: flex;
			gap: 0.5rem;
			flex-wrap: wrap;
			padding: 0.5rem;
			label {
				display: inline-block;
				width: 41.4px;
				aspect-ratio: 1 / 1;
				border-radius: 6px;
				cursor: pointer;
			}
			input {
				display: none;
			}
		}
	}
</style>
