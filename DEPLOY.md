# 🚀 Deployment Guide — Now & Always Construction

> **Scope:** This guide helps you (or your hosting provider) deploy this website. The developer is NOT responsible for hosting, DNS, SSL, or ongoing maintenance.

---

## 📋 Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** or **bun** package manager
- A **domain name** (e.g. `nowandalways.co.za`) registered with a registrar
- A **hosting platform** (see options below)

---

## 🔧 Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Copy environment config
cp .env.example .env.local

# 3. Edit .env.local with your domain URL
# NEXT_PUBLIC_SITE_URL=https://nowandalways.co.za

# 4. Run development server
npm run dev

# 5. Build for production
npm run build

# 6. Start production server
npm start
```

---

## 🌐 Deployment Options

### Option A: Vercel (Recommended — Easiest)

Vercel is the company behind Next.js and offers the simplest deployment experience.

1. **Push** your code to GitHub
2. Go to [vercel.com](https://vercel.com) → **Import Project** → select your GitHub repo
3. **Framework**: Next.js (auto-detected)
4. **Environment Variables**: Add from `.env.example`
5. Click **Deploy**
6. **Custom Domain**: Settings → Domains → Add `nowandalways.co.za`
7. Update your domain's DNS at your registrar:
   - Add a **CNAME** record: `www` → `cname.vercel-dns.com`
   - Add an **A** record: `@` → `76.76.21.21`

**Cost:** Free tier available (100GB bandwidth/month)

---

### Option B: Netlify

1. Go to [netlify.com](https://netlify.com) → **Add new site** → Import from GitHub
2. **Build command:** `npm run build`
3. **Publish directory:** `.next`
4. Add environment variables from `.env.example`
5. **Custom Domain:** Site settings → Domain management → Add custom domain
6. Update DNS: Netlify will provide DNS instructions

**Cost:** Free tier available (100GB bandwidth/month)

---

### Option C: Docker (Any VPS / On-Premises)

```bash
# Build the Docker image
docker build -t now-always-construction .

# Run the container
docker run -d \
  --name now-always \
  -p 3000:3000 \
  -e NEXT_PUBLIC_SITE_URL=https://nowandalways.co.za \
  now-always-construction
```

The site will be available at `http://your-server:3000`.

For production, use a reverse proxy (Nginx/Caddy) with SSL:

**Nginx example:**
```nginx
server {
    listen 443 ssl http2;
    server_name nowandalways.co.za www.nowandalways.co.za;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

### Option D: Kubernetes

K8s manifests are included in the `k8s/` directory:

```bash
# Apply all resources
kubectl apply -f k8s/

# Check deployment status
kubectl get pods -l app=now-always-construction

# Get the external IP
kubectl get svc now-always-construction
```

**Important:** Edit `k8s/config.yaml` and `k8s/ingress.yaml` to match your domain and SSL certificate.

---

### Option E: cPanel / Shared Hosting

Most shared hosting doesn't support Node.js natively. Options:

1. **Use a VPS** instead (Hetzner, DigitalOcean — from R50/month)
2. **Use Vercel/Netlify** (free, no server management needed)
3. If your cPanel supports Node.js:
   - Upload the project files
   - Run `npm install && npm run build` via SSH
   - Configure the Node.js app in cPanel to run `npm start`
   - Set the port to 3000

---

## 🔒 SSL Certificate

**Free SSL options:**
- **Vercel/Netlify**: Automatic SSL — no configuration needed
- **Let's Encrypt** (for VPS): `sudo certbot --nginx -d nowandalways.co.za -d www.nowandalways.co.za`
- **Cloudflare**: Free SSL with DNS proxy (set DNS to Cloudflare nameservers)

---

## 🌍 DNS Configuration

At your domain registrar (e.g. Domains.co.za, Afrihost), set:

| Type  | Name | Value |
|-------|------|-------|
| A     | @    | Your server IP (or Vercel: 76.76.21.21) |
| CNAME | www  | nowandalways.co.za (or cname.vercel-dns.com) |
| MX    | @    | Your email provider's MX records |
| TXT   | @    | Google verification (if using Search Console) |

---

## 📱 WhatsApp Integration

The contact form submits via WhatsApp — no backend required. The WhatsApp number (`+27670318635`) is configured in `src/lib/config.ts`.

To change it, update `SITE.phoneRaw` and `SITE.phoneInternational` in that file.

---

## 🛡️ POPIA Compliance

This site includes POPIA compliance features:
- **Consent checkbox** on the quote form (required before submission)
- **Privacy Policy page** at `/privacy`
- **Consent timestamp** recorded on every form submission
- **Privacy Policy link** in the footer

**Important for the client:** If you later add server-side form processing (storing data in a database), you MUST:
1. Log the consent timestamp server-side
2. Store form submissions securely
3. Provide a way for users to request data deletion
4. Register as an Information Officer with the Information Regulator (if required)

---

## 🔄 Updating the Site

```bash
# Pull latest changes
git pull origin main

# Install any new dependencies
npm install

# Rebuild
npm run build

# Restart (if using Docker/pm2)
pm2 restart now-always
# OR
docker restart now-always
```

---

## 🗂️ Project Structure

```
├── src/
│   ├── app/
│   │   ├── page.tsx          # Home page
│   │   ├── layout.tsx        # Root layout (SEO, JSON-LD)
│   │   ├── globals.css       # Global styles + animations
│   │   ├── privacy/page.tsx  # POPIA Privacy Policy
│   │   ├── gallery/page.tsx  # Portfolio gallery
│   │   ├── robots.ts         # SEO robots.txt
│   │   └── sitemap.ts        # SEO sitemap.xml
│   ├── components/
│   │   ├── Header.tsx        # Shared navigation header
│   │   ├── Footer.tsx        # Shared footer
│   │   ├── QuoteForm.tsx     # POPIA-compliant contact form
│   │   └── ui/               # shadcn/ui components
│   ├── lib/
│   │   ├── config.ts         # Site-wide constants (phone, email, etc.)
│   │   └── utils.ts          # Utility functions
│   └── hooks/                # Custom React hooks
├── public/                   # Static assets (images, logos, PDFs)
├── k8s/                      # Kubernetes deployment configs
├── Dockerfile                # Docker build configuration
├── .env.example              # Environment variable template
└── package.json              # Dependencies & scripts
```

---

## ⚙️ Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Yes | `https://nowandalways.co.za` | Your production domain URL |
| `NEXT_PUBLIC_SOCIAL_FACEBOOK` | No | `#` | Facebook page URL |
| `NEXT_PUBLIC_SOCIAL_INSTAGRAM` | No | `#` | Instagram profile URL |
| `NEXT_PUBLIC_SOCIAL_LINKEDIN` | No | `#` | LinkedIn page URL |

---

## 🩺 Health Check

After deployment, verify:

- [ ] Site loads at your domain
- [ ] Gallery page works (`/gallery`)
- [ ] Privacy Policy page works (`/privacy`)
- [ ] Quote form validates and submits via WhatsApp
- [ ] Quote form validates and submits via Email
- [ ] Mobile responsive (test on phone)
- [ ] Map loads on the contact section
- [ ] All images load (gallery + logos)
- [ ] Mediclinic reference letter PDF opens
- [ ] SEO: view page source — check meta tags and JSON-LD
- [ ] SSL: site loads with `https://`
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Robots accessible at `/robots.txt`

---

## 📞 Support Contacts

- **Domain Registrar**: Update DNS records and renew domain
- **SSL Provider**: Renew SSL certificates (if not auto-renewed)
- **Hosting Provider**: Server uptime, scaling, backups
- **Email Provider**: Configure MX records for `nowandalways.co.za`

---

## 📝 Notes for the Client

1. **Social media links** are currently placeholder (`#`). Update them in `.env.local` when your Facebook/Instagram/LinkedIn pages are ready.
2. **Gallery images** are from WhatsApp. For best results, replace with professionally photographed images (rename them cleanly).
3. **Email hosting** is separate from web hosting. Ensure your email (`projects@nowandalways.co.za`) is set up with your email provider.
4. **Backups**: If using a VPS, set up automated backups. Vercel/Netlify handle this automatically.
5. **Google Business Profile**: Register at [business.google.com](https://business.google.com) to appear in local search results.
