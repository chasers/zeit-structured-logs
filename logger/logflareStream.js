import { createWriteStream } from 'pino-logflare';

export default createWriteStream({
    apiKey: "S85LoAXJUB8U",
    source: "d90cce76-de32-41cd-91a7-c1a74fc1eae0",
    sourceToken: "d90cce76-de32-41cd-91a7-c1a74fc1eae0",
    batchMaxSize: 1,
});