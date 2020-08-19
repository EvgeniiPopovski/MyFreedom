async function getItemsAPI   (pass)  {
	let response = await fetch(`http://jsonplaceholder.typicode.com/${pass}`);
    let payload = await response.json();
	return payload;
};

export {getItemsAPI}