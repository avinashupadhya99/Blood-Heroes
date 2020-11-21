const { Client } = require("cassandra-driver");

const client = new Client({
	cloud: {
	  secureConnectBundle: "secure-connect-bloodheroes.zip",
	},
	credentials: { username: "bhuser", password: "bheroes@123" },
	keyspace: "bloodheroes"
});

module.exports=client;