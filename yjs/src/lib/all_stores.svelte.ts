// This is where most of the interesting stuff lives

import { IndexeddbPersistence } from 'y-indexeddb';
import { WebsocketProvider } from 'y-websocket';

import * as Y from 'yjs';

const DB_NAME = 'myDB';
const ydoc = new Y.Doc();
const roomName = DB_NAME;
const indexeddbProvider = new IndexeddbPersistence(roomName, ydoc);
// Connect to the WebSocket server
const provider = new WebsocketProvider(
	'ws://localhost:1234', // WebSocket server URL
	'my-yjs-room', // Room name or document ID
	ydoc
);

// Initialize counter
export const yCounter = ydoc.getMap('counter');

async function create_app_state() {
	// On create get the value from yCounter or create one
	let counter: number = $state((yCounter.get('value') as number) || 0);

	//
	yCounter.observeDeep(() => {
		counter = (yCounter.get('value') as number) || 0;
	});

	indexeddbProvider.whenSynced.then(() => {
		counter = (yCounter.get('value') as number) || 0;
	});

	return {
		get counter() {
			return counter;
		}
	};
}

export const app_state = await create_app_state();
