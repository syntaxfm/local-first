export async function initSpace(serverURL) {
	const { pathname } = window.location;
	const paths = pathname.split('/');
	const [, spaceDir, spaceID] = paths;

	if (spaceDir === 'space' && spaceID) {
		if (await spaceExists(serverURL, spaceID)) {
			return spaceID;
		}
	}

	const newSpaceID = await createSpace(serverURL);
	window.history.pushState(null, '', `/space/${newSpaceID}`);
	return newSpaceID;
}

async function spaceExists(serverURL, spaceID) {
	const spaceExistRes = await fetchJSON(serverURL, 'spaceExists', spaceID);
	return spaceExistRes.spaceExists;
}

async function createSpace(serverURL) {
	const createSpaceRes = await fetchJSON(serverURL, 'createSpace');
	return createSpaceRes.spaceID;
}

async function fetchJSON(serverURL, apiName, spaceID) {
	const res = await fetch(`${serverURL}/api/replicache/${apiName}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			spaceID
		})
	});
	return await res.json();
}
