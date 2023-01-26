<script>
	import { activeLevels } from "./stores";
</script>

<div class="bookmarks panel">
	<a href="#top" class="bookmark"><div><i class="ri-bookmark-fill" /></div></a>
	{#each $activeLevels as level}
		<a href="#{level}" class="bookmark"><div>{level}</div></a>
	{/each}
</div>

<style lang="scss">
    .bookmarks {
        background-color: transparent;
        position: sticky;
        top: 1rem;
        width: 60px;
        padding: 0;
        height: auto;
        background-color: var(--translucentdark);
        border-radius: 6px;
        overflow-x: hidden;
        .bookmark {
            display: inline-block;
            text-decoration: none;
            width: 100%;
            height: 60px;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.2rem;
            border-radius: 6px;
            i {
                font-size: 1.5rem;
            }
        }
        a {
            &:hover {
                background-color: var(--primary);
            }
        }
    }
</style>
