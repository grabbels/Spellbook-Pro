<script>
    import Inky from '$lib/teacher-inky-small.png';
	import Button from '../button.svelte';
	import { modalCall } from '../stores/stores';
    function handleClick() {

    }
</script>

<div class="flex">
    <img src="{Inky}" alt="">
    <div>
        <h2>Meet Sir Inks-a-lot</h2>
        <p>or, Inky for short. Inky will guide you through the nooks and crannies of Spellbook Pro. You can also skip the tutorial, but that would make Inky very sad. He worked very hard on this.</p>
        <p>You can always find the tutorial again using the menu.</p>
        <div style="margin-top: 1.5rem">
            <Button on:click={handleClick} icon="ri-bubble-chart-line" type="accent fill" text="Show me!"/>
            <Button on:click={()=> $modalCall = ''} icon="ri-close-line" type="outline" text="I know everything"/>
        </div>
    </div>
</div>

<style>
    img {
        max-height: 270px;
    }
    h2 {
        margin-bottom: .7rem;
    }
    div.flex {
        display: flex;
        align-items: center;
        gap: 2rem;
    }
    img {
        float: left;
    }
</style>