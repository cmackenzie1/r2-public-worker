# r2-public-worker

A Cloudflare Worker to make your R2 bucket public!

## Setup

1. Fork this repo

2. Create a bucket to be made public

```bash
npx wrangler@latest r2 bucket create public
```

3. Update the `wrangler.toml` to bind the R2 bucket

```toml
[[r2_buckets]]
binding = 'PUBLIC_BUCKET' # <~ valid JavaScript variable name
bucket_name = 'public'
```

4. Deploy the worker!

```bash
npx wrangler@latest publish
```