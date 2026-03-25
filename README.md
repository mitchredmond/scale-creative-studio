# Portfolio — Sanity + Astro

A minimal, clean portfolio for Creative Directors. Content is managed through Sanity's web-based admin — no code knowledge required for updates.

---

## For the Developer (You)

### Initial Setup (One-time, ~30 minutes)

#### Step 1: Create Sanity Project

1. Go to [sanity.io/get-started](https://www.sanity.io/get-started)
2. Sign up / log in (Google or GitHub works)
3. Click "Create new project"
4. Name it (e.g., "johns-portfolio")
5. Choose "Create empty project"
6. Note your **Project ID** (you'll need this)

#### Step 2: Set Up Sanity Studio

```bash
# In a separate folder, create the Sanity Studio
npm create sanity@latest -- --project YOUR_PROJECT_ID --dataset production

# When prompted:
# - Project name: portfolio-studio
# - Use default dataset configuration: Yes
# - Project output path: ./studio
# - Select template: Clean project

cd studio
```

Now copy the schemas from this project:

```bash
# Copy schema files to your studio
cp -r ../portfolio-sanity/sanity/schemas/* ./schemaTypes/
```

Replace the content of `sanity.config.ts` in your studio folder:

```typescript
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Portfolio',
  projectId: 'YOUR_PROJECT_ID',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),
            S.documentTypeListItem('project').title('Projects'),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
})
```

Deploy the studio:

```bash
npx sanity deploy
# Choose a hostname: johns-portfolio
# Studio will be live at: johns-portfolio.sanity.studio
```

#### Step 3: Configure the Frontend

Update `src/lib/sanity.js` with your Project ID:

```javascript
export const client = createClient({
  projectId: 'YOUR_PROJECT_ID', // ← Replace this
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});
```

#### Step 4: Deploy to Vercel

1. Push this frontend code to a GitHub repo
2. Go to [vercel.com](https://vercel.com)
3. Import the repo
4. Deploy (defaults work fine)
5. Your site is live at `your-project.vercel.app`

#### Step 5: Set Up Auto-Rebuild (Optional but Recommended)

When your friend publishes content, the site should rebuild automatically.

1. In Vercel, go to Settings → Git → Deploy Hooks
2. Create a hook named "Sanity"
3. Copy the URL
4. In Sanity, go to sanity.io/manage → Your Project → API → Webhooks
5. Add webhook with the Vercel URL
6. Trigger on: Create, Update, Delete

Now when content is published, the site rebuilds in ~30 seconds.

---

## For Your Friend (Content Editor)

### Getting Started

Your portfolio admin is at: `your-project.sanity.studio`

Log in with the account that was set up for you.

### Adding a Project

1. Click **Projects** in the sidebar
2. Click the **+** button
3. Fill in:
   - **Title**: Project name
   - **Slug**: Click "Generate" (this creates the URL)
   - **Client**: Who the project was for
   - **Your Role**: e.g., "Creative Director"
   - **Short Description**: 1-2 sentences for the card
   - **Thumbnail**: Main image for the grid
   - **Tags**: Categories like "Branding", "Campaign"
   - **Project Images**: Add images in display order
4. Click **Publish** (green button, top right)

The site updates automatically in about 30 seconds.

### Editing Site Settings

Click **Site Settings** in the sidebar to update:

- Your name and title
- Bio
- Profile photo
- Contact email
- Social links
- Availability status

### Tips

- **Images**: Use high-quality images. Sanity automatically optimizes them.
- **Featured**: Check "Featured Project" to make a project larger on the homepage.
- **Full Width**: When adding project images, check "Full Width" for hero shots.
- **Order**: Projects display newest first (by date).

---

## Custom Domain (When Ready)

### Buy a Domain

Recommended registrars:
- [Cloudflare](https://cloudflare.com) — Cheapest, ~$9/year
- [Namecheap](https://namecheap.com) — ~$12/year
- [Porkbun](https://porkbun.com) — ~$10/year

### Connect to Vercel

1. In Vercel, go to your project → Settings → Domains
2. Add your domain (e.g., `johnsmith.com`)
3. Vercel will show DNS records to add
4. Add those records at your domain registrar
5. Wait 5-30 minutes for DNS propagation

### Connect to Sanity (Optional)

By default, the studio is at `your-project.sanity.studio`. You can optionally use a custom subdomain like `admin.johnsmith.com`:

1. In your domain's DNS, add a CNAME record:
   - Name: `admin`
   - Target: `your-project.sanity.studio`
2. In Sanity dashboard, add the custom domain

---

## Project Structure

```
portfolio-sanity/
├── src/
│   ├── components/
│   │   └── ProjectCard.astro    # Project grid card
│   ├── layouts/
│   │   └── BaseLayout.astro     # Nav, footer, animation init
│   ├── lib/
│   │   └── sanity.js            # Sanity client + queries
│   ├── pages/
│   │   ├── index.astro          # Homepage
│   │   ├── about.astro          # About page
│   │   └── projects/
│   │       └── [slug].astro     # Dynamic project pages
│   ├── scripts/
│   │   └── animations.js        # GSAP animations
│   └── styles/
│       └── global.css           # All styles
├── sanity/
│   └── schemas/                 # Content schemas (copy to studio)
│       ├── project.js
│       └── siteSettings.js
└── package.json
```

---

## Customization

### Colors

Edit `src/styles/global.css`:

```css
:root {
  --color-bg: #ffffff;
  --color-text: #111111;
  --color-text-muted: #888888;
  --color-border: #e5e5e5;
}
```

### Typography

The site uses DM Sans. To change it, update the Google Fonts import in `global.css` and the `--font-sans` variable.

### Animations

Animations are subtle by design. To adjust timing, edit `src/scripts/animations.js`.

---

## Costs

| Item | Cost |
|------|------|
| Sanity | Free (generous free tier) |
| Vercel | Free (for personal sites) |
| Domain | ~$12/year |

**Total: ~$12/year**

---

## Support

If something breaks:
1. Check Sanity status: status.sanity.io
2. Check Vercel status: vercel.com/status
3. Rebuild manually: Vercel dashboard → Deployments → Redeploy
