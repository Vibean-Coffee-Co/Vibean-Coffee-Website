```bash
git clone https://github.com/Vibean-Coffee-Co/Vibean-Coffee-Website.git
cd Vibean-Coffee-Website
npm i
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the Frontend.

```bash
cd sanity
npm i
npx sanity start
```

Open [http://localhost:3333](http://localhost:3333) with your browser to see the Sanity Dashboard

Create .env file in root folder 
```
SANITY_AUTH_TOKEN=generate API token with EDITOR permissions from sanity.io dashboard
JWT_SECRET=somethingsecret
PAYPAL_CLIENT_ID=create app sandbox from https://developer.paypal.com/developer/applications
```