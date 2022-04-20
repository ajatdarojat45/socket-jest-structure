const io = require("socket.io-client");
const server = require("../socketConfig");
const Client = require("socket.io-client");

describe("Suite of unit tests", function() {
	//ngejalain servernya
	// server.attach(3010)
	// let sender;
	// let receiver;
	let socket;
	let port = 3000;

	beforeEach(function(done) {
		// Setup
		socket = new Client(`http://localhost:${port}`);

		io.on("connection", (socket2) => {
			serverSocket = socket2;
		});
		clientSocket.on("connect", done);
	});

	afterAll(() => {
		// io.close();
		socket.close();
	});

	describe("Chat tests", function() {
		test("Sending message to the chat", (done) => {
			const data = {
				roomName: "Teknologi Informasi",
				sender: "Budi",
				message: "test message",
			};

			socket.emit("send-message", data);

			socket.on("room-detail", (dataRes) => {
				expect(dataRes).toBeInstanceOf(Object);
				expect(dataRes).toHaveProperty("name");
				expect(dataRes).toHaveProperty("admin");
				expect(dataRes).toHaveProperty("users");
				expect(dataRes).toHaveProperty("messages");
				expect(dataRes.messages).not.toHaveLength(0);
				expect(dataRes.messages).toBeInstanceOf(Array);
				expect(dataRes.messages[0]).toBeInstanceOf(Object);
				expect(dataRes.messages[0]).toEqual(
					expect.objectContaining({
						sender: data.sender,
						message: data.message,
					})
				);
				done();
			});
		});

		test("Show typing message", (done) => {
			let payload = {
				room: "Teknologi Informasi",
				name: "Budi",
			};
			socket.emit("typing-start", payload);

			socket.on("typing-start", (data) => {
				expect(data).toBe(payload.name);
				done();
			});
		});
	});
});
