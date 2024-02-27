<script lang="ts">
	import { app_state, rep } from '$lib/all_stores.svelte';

	let connected = $state(false);

	$effect(() => {
		connected = rep.online;
	});

	// Tells YJS to update the counter
	// This then updates the svelte state and updates the UI
	function onclick() {
		rep.mutate.increment(1);
	}
</script>

<h1>Layout {app_state.counter}</h1>

<button {onclick}>Click</button>

<p>
	Replicache connection status: {connected ? '🟢' : '🔴'}
</p>
