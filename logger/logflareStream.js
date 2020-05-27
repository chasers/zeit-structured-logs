import { createWriteStream } from 'pino-logflare';

export default createWriteStream({
    apiKey: process.env.LOGFLARE_INGEST_API_KEY || "S85LoAXJUB8U",
    source: process.env.LOGFLARE_SOURCE_ID || "d90cce76-de32-41cd-91a7-c1a74fc1eae0",
    sourceToken: process.env.LOGFLARE_SOURCE_ID || "d90cce76-de32-41cd-91a7-c1a74fc1eae0",
    batchMaxSize: 1,
});