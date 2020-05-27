import pino from 'pino';

const stream = require('./logflareStream').default

export default pino(
    {
        level: 'debug',
        base: {
            env: process.env.ENV || "ENV not set",
            revision: process.env.VERCEL_GITHUB_COMMIT_SHA,
        },
        prettyPrint: typeof window === 'undefined' && process.env.ENV === 'development',
        // ^ only works in node env
    },
    stream,
);