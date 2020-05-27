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
            transmit: {
                level: 'debug',
                send(level, logEvent) {
                    const body = toLogEntry(logEvent)
                    postRequest(body)
                }
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
    const timestamp = item.ts || new Date().getTime()
    const message = getMessage(item)
    const level = item.level.label

    return {
        metadata: {
            ...getMetadata(item),
            level: level
        },
        log_entry: message,
        timestamp: timestamp,
    }
}

function getMessage(item) {
    if (item.messages.length == 2) {
        return item.messages[1]
    }
    if (item.messages.length == 1) {
        return item.messages[0]
    }
    return "no message"
}

function getMetadata(item) {
    if (item.messages.length == 2) {
        return item.messages[0]
    }
    return
}