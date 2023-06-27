module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	roots: ["<rootDir>/src"],
	transform: {
		"^.+\\.tsx?$": "ts-jest",
	},
	moduleNameMapper: {
		"^@utils/(.*)$": "<rootDir>/src/utils/$1",
		"^@controllers/(.*)$": "<rootDir>/src/controllers/$1",
		"^@database/(.*)$": "<rootDir>/src/database/$1",
		"^@models/(.*)$": "<rootDir>/src/models/$1",
		"^@routes/(.*)$": "<rootDir>/src/routes/$1",
		"^@services/(.*)$": "<rootDir>/src/services/$1",
		"^@test/(.*)$": "<rootDir>/src/test/$1",
		"^@util/(.*)$": "<rootDir>/src/util/$1",
		"^@uploads/(.*)$": "<rootDir>/src/uploads/$1",
	},
};
