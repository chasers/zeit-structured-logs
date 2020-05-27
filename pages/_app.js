const logger = require('../logger/logger').default

export function reportWebVitals(metric) {
    logger.info(metric, "Web vitals!")
}

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}

export default MyApp