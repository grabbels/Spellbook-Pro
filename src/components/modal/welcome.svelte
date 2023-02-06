<script>
	import Button from '../button.svelte';
</script>

<h1>Welcome!</h1>
<p>
	I'm so glad you're here. Inky's Spellbook is a project I've been working on on and off now for
	quite some time, and like any "let's see where it goes" project it got completely out of hand and
	it turned into an ambitious plan for a web-app (the one you're on now) and an app for mobile
	devices (next phase).
</p>
<p style="color:var(--red)">DANGER: bugs up ahead</p>
<p>
	Have a look around, but be warned that there might be scary and dangerous bugs lurking around!
	They bite. This app is currently very much in beta, and I would be very thankful if you could
	report any issues or bugs you may encounter. Features requests or ideas are also very welcome!
	You'll find buttons to report bugs and submit spells in the menu. I'd love to hear from you!
</p>
<p>Have fun!</p>

<p><strong>– Sem (a.k.a. Grabbels)</strong></p>

<div class="panel" style="padding: 1rem; margin-top: 2rem; margin-bottom: 1rem">
	<h2>Features</h2>
	<ul style="list-style:disc; padding-left: 1rem">
		<li>
			<h3>Create and manage spellbooks</h3>
			<p>
				Create your own spellbooks and save them to and load them from your account, making it
				possible to keep track of multiple spellbooks at a time
			</p>
		</li>
	
		<li>
			<h3>How did that spell work again?</h3>
			<p>
				Just start typing! If you're on the spellbook page (home), just start typing (or type in the
				"Quick spell lookup" field) to look up a spell by name and immediately retrieve all
				information on the spell you're looking for.
			</p>
		</li>
	
		<li>
			<h3>Share your spellbooks</h3>
			<p>
				When saving or editing a spellbook, you can choose to publish your spellbooks making them
				available to everyone in the community.
			</p>
		</li>
	
		<li>
			<h3>Filter your spellbook</h3>
			<p>
				When on the spellbook page use the filters bar to quickly filter through your spellbook by
				duration, range, etc.
			</p>
		</li>
	</ul>
</div>

<div class="panel" style="padding: 1rem; margin-top: 0rem">
	<h2>Upcoming</h2>
	<ul style="list-style:disc; padding-left: 1rem">
		<li>
			<h3>Bugfixes</h3>
			<p>Let me know when you find them, and they'll be fixed asap!</p>
		</li>

		<li>
			<h3>Complete spell database</h3>
			<p>
				Currently only spells from the 5E base-books are included (with some spells added manually
				during development). In the menu you can submit additional spells from other sources for me
				to review.
			</p>
		</li>

		<li>
			<h3>PDF export</h3>
			<p>
				Export your spellbooks as printer-friendly PDF's, making your spellbooks available to you
				even if you're not connected to the internet.
			</p>
		</li>

		<li>
			<h3>Offline functionality</h3>
			<p>
				Use the (web)app even when you're not connected to the internet, saving you valuable battery
				life and ensuring you have your spellbooks available everywhere, anytime.
			</p>
		</li>

		<li>
			<h3>Published spellbook filters</h3>
			<p>
				Look for specific published spellbooks by creator nickname, character class or character
				level.
			</p>
		</li>
	</ul>
</div>

<div style="margin-top: 2rem"><Button text="Let's go!" icon="ri-heart-line" type="fill accent" /></div>

<style lang="scss">
	h3 {
		font-weight: 700;
		font-size: 1.1rem;
		text-transform: uppercase;
	}
	h1 {
		font-size: 2.5rem;
	}
	button.close {
		all: unset;
		cursor: pointer;
		position: absolute;
		top: 18px;
		right: 26px;
		// display: none;
		pointer-events: all;
		z-index: 10;
		right: -40px;
		background-color: var(--red);
		height: 40px;
		width: 40px;
		z-index: -1;
		border-radius: 0 6px 6px 0;
		top: 39px;
		text-align: center;
		i {
			font-size: 2rem;
			color: var(--translucent);
			transition: 0.1s;
			margin: 0;
			text-align: center;
			vertical-align: middle;
			line-height: 40px;
		}

		&:hover {
			i {
				color: var(--white);
			}
		}
	}
</style>
