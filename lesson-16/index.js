const fs = require("fs");
const path = require("path");
const express = require("express");
const { promisify } = require("util");
const bodyParser = require("body-parser");
const uid = require("uid");

const app = express();
app.use(bodyParser.json());

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const dbPath = path.resolve(__dirname, "./db.json");

const asyncReadFile = async (fileName) => {
	try {
		let text = await readFile(path.resolve(__dirname, fileName), "utf-8");
		return JSON.parse(text);
	} catch (e) {
		console.log(`Error : ${e.message}`);
	}
};

const asyncWriteFile = async (fileName, text) => {
	try {
		await writeFile(path.resolve(__dirname, fileName), text);
		console.log("success");
	} catch (e) {
		console.log("error :" + e.message);
	}
};

app.get("/films", async (request, response) => {
	const dbContent = await asyncReadFile(dbPath);
	response.header("Access-Control-Allow-Origin: *");
	return response.json(dbContent);
});

app.get("/films/:filmId", async (request, response) => {
	const filmId = request.params.filmId;
	const dbContent = await asyncReadFile(dbPath);
	const film = dbContent.films.find((f) => f.id === Number(filmId));

	if (!film) {
		response.status(404);
		response.end();
		return;
	}
	console.log(film);
	return response.json(film);
});

app.delete("/films/:filmId", async (request, response) => {
	const filmId = request.params.filmId;
	const dbContent = await asyncReadFile(dbPath);
	const film = dbContent.films.find((film) => film.id === Number(filmId));

	if (!film) {
		response.status(404);
		response.end();
		return;
	}

	dbContent.films = dbContent.films.filter((f) => f.id !== Number(filmId));

	console.log(dbContent);

	await asyncWriteFile("./db.json", JSON.stringify(dbContent));

	response.status(204);
	response.end();
});

app.post("/films", async (request, response) => {
	const film = request.body;
	if (!film) {
		response.status(400);
		response.end();
		return;
	}
	const dbContent = await asyncReadFile(dbPath);
	const filmToAdd = { id: uid(), ...film };
	dbContent.films.push(filmToAdd);
	await asyncWriteFile("./db.json", JSON.stringify(dbContent));
	response.json(filmToAdd);
});

app.patch("/films/:filmId", async (request, response) => {
	const filmId = request.params.filmId;
	const film = request.body;

	const dbContent = await asyncReadFile(dbPath);

	const filmToChange = dbContent.films.find((f) => f.id === Number(filmId));

	if (!filmToChange || !film || !filmId) {
		response.status(400);
		response.end();
		return;
	}

	const filmToAdd = { id: filmId, ...film };

	dbContent.films[dbContent.films.indexOf(filmToChange)] = filmToAdd;

	await asyncWriteFile("./db.json", JSON.stringify(dbContent));

	return response.json(filmToAdd);
});

app.listen(3000, () => console.log("listen 3000 start"));
