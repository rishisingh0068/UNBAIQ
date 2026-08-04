# UNBAIQ Website

UNBAIQ is a modern, responsive corporate website for presenting the company's
software services, working approach, portfolio, case studies, and contact
information. The interface is built as a React single-page application with
responsive layouts and motion-based interactions.

## What I Built

- A responsive landing page with a full-screen hero slider
- Desktop and mobile navigation with an animated mobile menu
- Dedicated pages for:
  - Home
  - What We Do
  - Our Approach
  - Services
  - About
  - Let's Talk 
  - Case Study
  - Custom 404 page
- Reusable sections for services, business solutions, work samples, client
  testimonials, partner logos, blogs, FAQs, and the footer
- A responsive contact form with client-side validation
- Dynamic browser page titles
- Automatic scroll-to-top when navigating between routes
- Responsive designs for mobile, tablet, laptop, and large desktop screens

## Tech Stack

| Technology | Purpose |
| --- | --- |
| React 19 | Component-based user interface |
| Vite 8 | Development server and production bundling |
| React Router DOM 7 | Client-side routing |
| Tailwind CSS 4 | Responsive layouts, spacing, colors, and utility styling |
| Framer Motion 12 | Scroll reveals, stagger animations, transitions, and interactive motion |
| Swiper 14 | Hero image slider with autoplay, fade effect, looping, and pagination |
| Lucide React | Interface icons |
| React Icons | Additional social and interface icons |
| CSS | Global styling, custom transitions, responsive behavior, and Swiper overrides |
| ESLint | Code-quality checks |

The project uses the **Lexend** typeface, loaded from Google Fonts.

## Animation Implementation

Animations are implemented with a combination of Framer Motion, Swiper, and CSS
transitions.

Framer Motion is used in sections such as:

- Navbar and mobile menu
- Why Choose Us
- Solutions
- Our Work
- Business Growth
- Testimonials
- Partner logo marquee
- Latest Blogs
- FAQs
- Right Solutions



## Project Structure

UNBAIQ/
├── README.md
├── backend/                  # Reserved for a future backend
└── frontend/
    ├── public/               # Public assets
    ├── src/
    │   ├── assets/           # Logos, illustrations, and page images
    │   ├── components/
    │   │   ├── about/
    │   │   ├── caseStudy/
    │   │   ├── common/
    │   │   ├── home/
    │   │   ├── layout/
    │   │   ├── letsTalk/
    │   │   ├── ourServices/
    │   │   ├── OurApproch/
    │   │   └── whatwedo/
    │   ├── data/             # Navigation and hero-slide content
    │   ├── pages/            # Route-level page components
    │   ├── styles/           # Shared theme values
    │   ├── App.jsx           # Application routes
    │   ├── index.css         # Global and custom styles
    │   └── main.jsx          # React application entry point
    ├── package.json
    └── vite.config.js
```

## Routes

| Route | Page |
| --- | --- |
| `/` | Home |
| `/what-we-do` | What We Do |
| `/our-approach` | Our Approach |
| `/services` | Services |
| `/about` | About |
| `/lets-talk` | Contact / Let's Talk |
| `/case-study` | Case Study |
| Any unknown route | 404 page |

## Getting Started

cd frontend
npm install

### Start the Development Server

npm run dev

Open the local URL displayed by Vite in the terminal.

## File Tree

UNBAIQ/
├── README.md
└── frontend/
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── vite.config.js
    ├── eslint.config.js
    │
    ├── public/
    │   └── MainLogo.svg
    │
    └── src/
        ├── App.jsx
        ├── App.css
        ├── index.css
        ├── main.jsx
        │
        ├── assets/
        │   ├── logo/
        │   │   ├── logo.svg
        │   │   └── logoWhite.svg
        │   │
        │   └── images/
        │       ├── about/
        │       ├── caseStudy/
        │       │   ├── case-study-hero.svg
        │       │   ├── dashboard-1.svg
        │       │   ├── dashboard-2.svg
        │       │   └── dashboard-3.svg
        │       │
        │       ├── home/
        │       │   ├── blog/
        │       │   ├── businessGrowth/
        │       │   ├── hero/
        │       │   ├── ourwork/
        │       │   ├── partners/
        │       │   ├── testimonials/
        │       │   └── whychoose/
        │       │
        │       ├── letsTalk/
        │       ├── ourApproch/
        │       │   ├── strategicFocus/
        │       │   └── whatMakesDifferent/
        │       │
        │       ├── ourServices/
        │       ├── UnbaiqDubai/
        │       │   ├── dubai.png
        │       │   └── dubai.svg
        │       │
        │       └── whatWeDo/
        │           ├── bringIdeas/
        │           ├── ourWork/
        │           └── rightSolutions/
        │
        ├── components/
        │   ├── about/
        │   │   └── AboutHero.jsx
        │   ├── caseStudy/
        │   │   └── SchoolSecurityCaseStudy.jsx
        │   ├── common/
        │   │   └── PageTitle.jsx
        │   ├── home/
        │   │   ├── BusinessGrowthSection.jsx
        │   │   ├── FaqSection.jsx
        │   │   ├── HeroSlider.jsx
        │   │   ├── LatestBlog.jsx
        │   │   ├── LogoMarquee.jsx
        │   │   ├── OurWorkSection.jsx
        │   │   ├── SolutionsSection.jsx
        │   │   ├── Testimonials.jsx
        │   │   └── WhyChooseUs.jsx
        │   ├── layout/
        │   │   ├── Footer.jsx
        │   │   ├── Layout.jsx
        │   │   └── Navbar.jsx
        │   ├── letsTalk/
        │   │   ├── ContactSection.jsx
        │   │   └── LetsTalkHero.jsx
        │   ├── OurApproch/
        │   │   ├── StrategicFocus.jsx
        │   │   └── WhatMakesUsDifferent.jsx
        │   ├── ourServices/
        │   │   └── OurServices.jsx
        │   ├── UnbaiqDubai/
        │   │   ├── DubaiHero.jsx
        │   │   └── DubaiOffice.jsx
        │   └── whatwedo/
        │       ├── BringIdeas.jsx
        │       ├── OurWorkShowcase.jsx
        │       ├── RightSolutions.jsx
        │       └── SolutionsShaped.jsx
        │
        ├── data/
        │   ├── heroSlides.js
        │   └── navigation.js
        │
        ├── pages/
        │   ├── About.jsx
        │   ├── BlogDetail.jsx
        │   ├── CaseStudy.jsx
        │   ├── Home.jsx
        │   ├── LetsTalk.jsx
        │   ├── NotFound.jsx
        │   ├── OurApproach.jsx
        │   ├── Services.jsx
        │   ├── SuccessStories.jsx
        │   ├── UnbaiqDubai.jsx
        │   └── WhatWeDo.jsx
        │
        └── styles/
            └── theme.js



backend/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   ├── middlewares/
│   │   ├── errorHandler.js
│   │   └── notFound.js
│   ├── models/
│   ├── routes/
│   │   └── health.routes.js
│   ├── app.js
│   └── server.js
├── .env.example
├── .gitignore
└── package.json

/admin
   ↓ redirect
/admin/login

frontend/src/pages/admin/AdminLogin.jsx
frontend/src/components/admin/AdminRoute.jsx