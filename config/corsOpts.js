const corsOptions = {
    origin: [/:\/\/(.+\.)?domain.net/,/:\/\/(.+\.)?domain.com/],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}

module.exports = corsOptions;