<script>
	import Button from "../button.svelte";
	import { modalCall, notification, shareBookId } from "../stores/stores";
    $notification = 'Link copied to clipboard!#info'
    let shareUrl = 'https://spellbook.pro/?book=' + $shareBookId
    function handleClick() {
         navigator.clipboard.writeText(shareUrl);
         $notification = 'Link copied to clipboard!#info'
    }
</script>
<h3>Share spellsheet</h3>
<input type="text" value={shareUrl} disabled>
<Button type="accent fill" on:click={handleClick} icon="ri-clipboard-line" text="copy link"></Button>
<p>A shared (but unpublished) spellbook will be reachable through this link for 30 days until it becomes private again.</p>
<p>Did you know you can also publish your spellbook? That way people from all over the world can find your books! You can do this from your <a on:click={() => $modalCall = ''} href="/account">account page</a>.</p>
<style lang="scss">
    h3 {
        margin-bottom: .2rem;
    }
    p {
        margin-top: 1rem;
        opacity: .7;
        font-size: .95rem;
    }
</style>