module.exports = {
    mongoURI: 'mongodb://localhost:27017/csse',
    jwtSecret: 'secret',
    origin: "*",
    headers: "Origin, X-Requested-With, Content-Type, Accept, x-authorize-type, x-authorize-token",
    methods: "POST, PUT, GET, OPTIONS, DELETE"
};