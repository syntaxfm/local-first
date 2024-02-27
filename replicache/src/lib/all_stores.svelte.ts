// This is where most of the interesting stuff lives

import { Replicache } from 'replicache';
import { PUBLIC_REPLICACHE_LICENSE } from '$env/static/public';

export const rep = new Replicache({
	name: 'user42',
	licenseKey: PUBLIC_REPLICACHE_LICENSE,
	mutators: {
		increment: async (tx, delta) => {
			const prev = (await tx.get('count', 'value')) ?? 0;
			const next = prev + delta;
			await tx.set('count', next);
			return next;
		}
	}
});

async function create_app_state() {
	let counter: number = $state(0);

	rep.subscribe(
		async (tx) => (await tx.get('count')) ?? 0,
		(count) => {
			counter = count;
		}
	);

	return {
		get counter() {
			return counter;
		}
	};
}

export const app_state = await create_app_state();
