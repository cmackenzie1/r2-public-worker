/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

interface AppEnv {
    PUBLIC: R2Bucket;
}

export default {
    async fetch(request: Request, env: AppEnv): Promise<Response> {
        const {pathname} = new URL(request.url);
        const obj = await env.PUBLIC.get(decodeURIComponent(pathname.slice(1, undefined)))
        if (obj === null) return new Response("Not found.", {status: 404})

        const headers: Record<string, string> = {}
        if (obj?.httpMetadata.contentType) headers['content-type'] = obj?.httpMetadata.contentType;
        if (obj?.httpMetadata.contentEncoding) headers['content-encoding'] = obj?.httpMetadata.contentEncoding;
        if (obj?.httpMetadata.contentDisposition) headers['content-disposition'] = obj?.httpMetadata.contentDisposition;
        if (obj?.httpMetadata.contentLanguage) headers['content-language'] = obj?.httpMetadata.contentLanguage;
        if (obj?.httpMetadata.cacheControl) headers['cache-control'] = obj?.httpMetadata.cacheControl;
        if (obj?.httpMetadata.cacheExpiry) headers['expires'] = obj?.httpMetadata.cacheExpiry.toUTCString();
        return new Response(obj?.body, {
            headers
        });
    },
};
