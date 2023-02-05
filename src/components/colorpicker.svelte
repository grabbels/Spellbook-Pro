<script>
	export let selectedColor;
	if (!selectedColor && $bookToEdit) {
		console.log('edit')
		selectedColor = $bookToEdit.color
	}
	import { colors } from './data/colors';
	import { bookToEdit } from './stores/stores';
</script>

<div class="color_picker">
	<form>
		{#each colors as color}
			<input
				bind:group={selectedColor}
				type="radio"
				id={color}
				name={color}
				value={color}
			/>
			<label for={color} style="background-color: {color}" />
		{/each}
	</form>
</div>

<style lang="scss">
	div {
		position: absolute;
		right: -.5rem;
		top: calc(-41.4px - .5rem);
		width: calc(41.4px * 4 + 2.5rem);
		background-color: var(--translucentdarker);
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.4);
		border-radius: 6px;
		backdrop-filter: blur(3px);
		form {
			display: flex;
			gap: .5rem;
            flex-wrap: wrap;
            padding: .5rem;
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
