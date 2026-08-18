# UNBAIQ Website

UNBAIQ ki official full-stack corporate website. Is project me public marketing website ke saath ek protected admin panel bhi hai, jahan se hero slides, blogs, success stories, FAQs, enquiries aur contact details manage ki ja sakti hain.

## Project me kya bana hai?

### Public website

- Responsive home page aur animated hero slider
- What We Do, Our Approach, Services, About aur Dubai office pages
- Blog listing/detail aur success stories
- Let's Talk form, jo enquiry ko database me save karta hai
- Reusable FAQ, testimonials, portfolio aur contact sections
- Mobile, tablet aur desktop responsive layout
- Route-based lazy loading, animations aur custom 404 page

### Admin panel

- Secure admin login aur JWT-based authentication
- Dashboard aur live enquiry notifications (Server-Sent Events)
- Enquiries ko view aur manage karna
- Blogs, hero slides, success stories aur FAQs ka CRUD
- Public contact information edit karna
- Admin profile aur password management
- Cloudinary par image uploads

Admin panel ka entry URL: `http://localhost:5173/admin`

## Kaise bana hai?

Project do independent applications me divided hai:

```text
UNBAIQ/
|-- frontend/                 React + Vite single-page application
|   |-- public/               Static public files and hosting rules
|   `-- src/
|       |-- assets/           Images, logos and illustrations
|       |-- components/       Reusable UI and admin components
|       |-- data/             Static navigation/slide data
|       |-- pages/            Public and admin route pages
|       |-- services/         Backend API calls
|       |-- styles/           Shared theme values
|       |-- App.jsx           Application routes
|       `-- main.jsx          React entry point
|-- backend/                  Express REST API
|   |-- scripts/              Admin creation, seed and migration scripts
|   |-- src/
|   |   |-- config/           MongoDB and Cloudinary setup
|   |   |-- controllers/      Request/business logic
|   |   |-- middlewares/      Auth, uploads and error handling
|   |   |-- models/           Mongoose database models
|   |   |-- routes/           Public and protected API routes
|   |   |-- utils/            Tokens, slugs, images and live events
|   |   |-- app.js            Express application configuration
|   |   `-- server.js         API entry point
|   `-- uploads/              Legacy/local uploaded assets
`-- README.md
```

Frontend backend ko REST APIs ke through call karta hai. MongoDB me application content store hota hai, Cloudinary uploaded images ko host karta hai, aur SSE open admin/public pages ko saved changes aur enquiries ki live updates deta hai.

## Tech stack

| Layer | Technologies |
| --- | --- |
| Frontend | React 19, Vite 8, React Router 7 |
| UI | Tailwind CSS 4, custom CSS, Lucide/React Icons |
| Motion | Framer Motion, Swiper |
| Backend | Node.js, Express 5 |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcryptjs |
| Media | Multer, Cloudinary |
| Security/utility | Helmet, CORS, Morgan |

## Doosre system par local setup

### 1. Requirements

- Git
- Node.js `20.19+` (Node.js 22 LTS recommended)
- npm
- MongoDB Atlas account ya local MongoDB server
- Cloudinary account (admin image upload ke liye)

### 2. Project clone karein

```bash
git clone <repository-url>
cd UNBAIQ
```

`<repository-url>` ko actual Git repository URL se replace karein.

### 3. Backend configure karein

```bash
cd backend
npm install
```

`backend` folder me `.env` file banayein:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb_connection_string
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Client enquiry acknowledgement emails
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=hello@unbaiq.com
SMTP_PASS=your_smtp_or_app_password
MAIL_FROM=UNBAIQ <hello@unbaiq.com>
MAIL_REPLY_TO=hello@unbaiq.com

# Sirf first admin create karte waqt required:
ADMIN_NAME=Admin Name
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=minimum_8_character_password

# Optional: seed data me absolute image URLs ke liye
PUBLIC_SERVER_URL=http://localhost:5000

# Optional: custom DNS resolution ki zarurat ho tab, comma-separated
# MONGODB_DNS_SERVERS=8.8.8.8,1.1.1.1
```

Secrets ko Git me commit na karein. `JWT_SECRET` ke liye long, unpredictable value use karein.

Backend start karein:

```bash
npm run dev
```

API `http://localhost:5000` par chalegi. Check karne ke liye browser me `http://localhost:5000/api/health` open karein.

### 4. First admin create karein

Backend `.env` me `ADMIN_NAME`, `ADMIN_EMAIL` aur `ADMIN_PASSWORD` fill karne ke baad:

```bash
npm run create-admin
```

Command successful hone ke baad security ke liye `.env` se `ADMIN_PASSWORD` remove kiya ja sakta hai. Same email se command dobara chalane par duplicate admin create nahi hoga.

### 5. Frontend configure karein

Ek naya terminal project root par open karein:

```bash
cd frontend
npm install
```

`frontend` folder me `.env` file banayein:

```env
VITE_API_URL=http://localhost:5000/api
```

Frontend start karein:

```bash
npm run dev
```

Terminal me dikhaya gaya Vite URL open karein—normally `http://localhost:5173`.

Local development me dono terminals running rehne chahiye:

```text
Terminal 1: backend  -> npm run dev -> http://localhost:5000
Terminal 2: frontend -> npm run dev -> http://localhost:5173
```

## Optional seed data

Backend folder se required starter content insert kiya ja sakta hai:

```bash
npm run seed:hero
npm run seed:blogs
npm run seed:success-stories
npm run seed:faqs
```

Seed commands shared database ko modify karte hain. Existing/production database par chalane se pehle scripts aur target `MONGODB_URI` verify karein.

## Useful commands

### Frontend

| Command | Kaam |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production bundle |


### Backend

| Command | Kaam |
| --- | --- |
| `npm run dev` | Watch mode me API server |
| `npm start` | Normal/production API server |
| `npm run create-admin` | First admin account create karna |


## Main routes

### Public

`/`, `/what-we-do`, `/our-approach`, `/services`, `/about`, `/unbaiq-dubai`, `/lets-talk`, `/case-study`, `/blog/:slug`, `/success-stories`, `/success-stories/:slug`

### Admin

`/admin/login`, `/admin/dashboard`, `/admin/notifications`, `/admin/enquiries`, `/admin/contact-content`, `/admin/hero-section`, `/admin/blogs`, `/admin/success-stories`, `/admin/faqs`, `/admin/profile`


## Common problems

- **Backend start nahi ho raha:** `MONGODB_URI` missing/invalid ho sakta hai ya MongoDB Atlas IP access allow nahi hai.
- **Frontend par API error:** `VITE_API_URL` me `/api` included hai ya nahi check karein; value change ke baad Vite restart/rebuild karein.
- **CORS error:** backend ke `CLIENT_URL` ko exact frontend origin par set karein; end me extra slash avoid karein.
- **Admin login fail:** pehle `npm run create-admin` chalayein aur `JWT_SECRET` configured rakhein.
- **Image upload fail:** tino `CLOUDINARY_*` values check karein.
- **Thank-you email nahi aa raha:** backend logs aur `SMTP_*`, `MAIL_FROM`, `MAIL_REPLY_TO` values check karein. Gmail/Google Workspace ke saath normal password ke badle App Password use karein.
- **Port already in use:** backend `PORT` change karein; corresponding frontend API URL bhi update karein.

## Security notes

- `.env`, database credentials, JWT secret aur Cloudinary secret kabhi commit/share na karein.
- Production me strong admin password aur unique JWT secret use karein.
- Database seeding/migration se pehle backup rakhein.
- `uploads/` ka generated content Git me intentionally ignored hai.
