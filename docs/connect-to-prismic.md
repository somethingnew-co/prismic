# Connecting to Prismic

Install necessary dependencies.

```sh
npm install prismic-javascript prismic-reactjs
```

If you haven't already created a Prismic repo, [do that now](https://prismic.io). We're gonna do some basic setup.

Create a folder in the source folder of your app under `lib/prismic`. Here's where we're going to put all of our Prismic tools.

Create a file called `config.js` and add your API endpoint and your access token (if applicable).

```javascript
// lib/prismic/config.js
export const apiEndpoint = 'https://<REPO>.cdn.prismic.io/api/v2'
export const accessToken = 'a1b2c3d4e5f6g7h8i90j'
```

Next we'll create file called `client.js` and export our Prismic API client from there:

```javascript
// lib/prismic/client.js
import Prismic from 'prismic-javascript'
import { apiEndpoint, accessToken } from './config'

export const prismicClient = Prismic.client(apiEndpoint, { accessToken })
```

That's it for setting up the Prismic client. You can now query documents and pages using their API. You can set up Prismic however you like, the [documentation](https://prismic.io/docs) will help you further.

The next thing you'll want to do is set up a link resolver. If you're using Next.js, you'll want to set up an href resolver as well. Read up on the [`urlResolver`](../packages/prismic) function on how to set that up.
