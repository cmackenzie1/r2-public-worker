# r2-public-worker

A Cloudflare Worker to make your R2 bucket public!

## Minimum Requirements

1. Cloudflare Account
2. `wrangler >= 2.0.2`

**Note:** Ensure you are using at the minimum specified version of wrangler.

## Setup

1. Fork this repo

2. Install dependencies (including Wrangler 2)

```bash
npm install
```

4. Create a bucket to be made public

```bash
wrangler r2 bucket create public
```

3. Update the `wrangler.toml` to bind the R2 bucket

```toml
[[r2_buckets]]
binding = 'PUBLIC' # <~ valid JavaScript variable name
bucket_name = 'public'
```

4. Deploy the worker!

```bash
wrangler publish
```

5. 🎉 You've got a public bucket

Give it a try: https://r2-public-worker.cdmacken.workers.dev/duck.png

URL's even support spaces! https://r2-public-worker.cdmacken.workers.dev/space%20duck.webp