import pino from 'pino';

const stream = require('./logflareStream').default

export default pino(
    {
        level: 'debug',
        base: {
            env: process.env.ENV || "ENV not set",
            revision: process.env.VERCEL_GITHUB_COMMIT_SHA,
        },
        browser: {
            asObject: true,
            write: (o) => {
                const body = toLogEntry(o)
                postRequest(body)
            }
        },
        prettyPrint: typeof window === 'undefined' && process.env.ENV === 'development',
        // ^ only works in node env
    },
    stream,
);

const postRequest = async (lfRequestBody) => {
    const ingestApiKey = "S85LoAXJUB8U"
    const source_id = "6a33ed2e-6e25-42f3-b052-283883d9663a"
    const logflareApiURL = `https://api.logflare.app/logs?api_key=${ingestApiKey}&source=${source_id}`


    const body = JSON.stringify(lfRequestBody)
    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body,
    }

    await fetch(logflareApiURL, request)
}

function toLogEntry(item) {
    const timestamp = item.time || new Date().getTime()
    const message = item.msg
    const level = levelToStatus(item.level)

    const metadata = _.omit(item, ["time", "msg", "level"])

    return {
        metadata: {
            ...metadata,
            level: level
        },
        log_entry: message,
        timestamp: timestamp,
    }
}

function levelToStatus(level) {
    if (level === 10 || level === 20) {
        return "debug"
    }
    if (level === 40) {
        return "warning"
    }
    if (level === 50) {
        return "error"
    }
    if (level >= 60) {
        return "critical"
    }
    return "info"
}
