# Granth Rawtani - Retro + Apple Portfolio

A personal portfolio website combining **retro spreadsheet/terminal** aesthetics with **modern Apple smoothness**.

## Design Philosophy

**Retro + Apple = Finance + AI student who loves Excel and Apple design**

- Excel-inspired sidebar with grid lines and mono fonts
- Apple-like smooth animations and rounded corners
- Physics-based spring animations
- Calm, minimal, thoughtful
- NOT flashy, trendy, or AI-template-like

## Key Features

### 🎯 Bottom Sheet Animation (CRITICAL)
Experience and Projects pages use an **iOS-style bottom sheet** that slides up from the bottom:
- Slides UP from bottom (translateY: 100% → 0%)
- Covers 88% of viewport height
- Rounded top corners (24px) only
- Spring animation: stiffness 140, damping 22
- Drag to close
- ESC to close
- Click outside to close
- Light backdrop blur

**NOT** a modal, popup, or accordion. Feels like Apple Maps sheet.

### 📊 Excel-Inspired Sidebar
- Narrow (230px)
- Background: #f3f3f3
- Grid lines between items
- Mono font (IBM Plex Mono)
- Spreadsheet "row cell" aesthetic
- Soft pill hover (rounded-full)
- Green accent on active (#22c55e)

### 🎨 Color System (Strict)
- Background: #fafafa
- Sidebar: #f3f3f3
- Text: #111
- Borders: #e5e5e5
- Accent: #22c55e (green)

NO gradients, bright colors, or heavy shadows.

### ✨ Typography
- **Sidebar**: IBM Plex Mono (retro)
- **Headings**: Inter (modern)
- **Body**: System sans-serif

This contrast creates the "finance nerd + Apple design" personality.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: IBM Plex Mono + Inter

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Pages

### Home (`/`)
- Minimal centered hero
- Large "Granth Rawtani" heading
- Subtext: "Finance • AI • Entrepreneurship"
- Huge whitespace

### About (`/about`)
- Two-column layout
- Left: Square photo placeholder
- Right: "paragraph here" text
- Clean and simple

### Experience (`/experience`)
- Grid of 7 company cards
- Click card → **Bottom sheet slides up**
- Layout with hero image, title, paragraphs (all placeholders)
- Smooth spring animation

### Projects (`/projects`)
- 2 project cards (AI Stock Predictor, Kuzo)
- Same bottom sheet behavior
- Layout placeholders ready to fill

### Skills (`/skills`)
- Clean tag grid
- Subtle hover scale (1.02)
- Skills: Excel, Python, Data Analysis, Finance Modeling, Strategy, Entrepreneurship

### Contact (`/contact`)
- Minimal list
- Email + LinkedIn
- Hover underline effect

## Animation Guidelines

### Allowed ✅
- Subtle fades
- Hover lifts
- Spring motion (stiffness 140, damping 22)
- Smooth panel slides
- Scale hover (max 1.02)

### Forbidden ❌
- Parallax
- Cursor trails
- Flashy effects
- Bouncy cartoon animations
- Heavy 3D transforms

Everything feels **smooth, mature, premium**.

## Project Structure

```
app/
  page.tsx              # Home
  about/page.tsx        # About
  experience/page.tsx   # Experience with bottom sheet
  projects/page.tsx     # Projects with bottom sheet
  skills/page.tsx       # Skills
  contact/page.tsx      # Contact
  layout.tsx            # Root layout
  globals.css           # Global styles

components/
  Sidebar.tsx           # Excel-inspired sidebar
  BottomSheet.tsx       # Apple-style bottom sheet panel

public/
  logos/                # Company logos
```

## Customization

### Add Company Logos

Place logo files in `public/logos/`:
- `lmu.png`
- `krc.png`
- `kompass.png`
- `un.png`
- `rawbank.png`
- `strava.png`
- `twix.png`

### Update About Text

Edit `app/about/page.tsx` - replace "paragraph here"

### Fill Bottom Sheet Content

Edit `app/experience/page.tsx` or `app/projects/page.tsx` - replace placeholder divs with real content

### Modify Colors

Edit `tailwind.config.ts` - change retro color tokens

## Bottom Sheet Component

Located at `components/BottomSheet.tsx`

**Props**:
- `isOpen`: boolean
- `onClose`: () => void
- `children`: ReactNode

**Features**:
- Spring animation (exact specs)
- Drag to close
- ESC key closes
- Outside click closes
- Rounded top corners only
- 88vh height
- Backdrop blur

**Usage**:
```tsx
<BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
  {/* Your content */}
</BottomSheet>
```

## Design Inspirations

- **Notion** - Clean, minimal interface
- **Linear** - Smooth animations
- **Excel** - Grid lines, structured layout
- **Apple** - Spring physics, rounded corners

## Deployment

### Vercel (Recommended)

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_REPO_URL
git push -u origin main
```

Import on [vercel.com](https://vercel.com) and deploy.

### Other Platforms
- Netlify
- Railway
- Render
- Any Next.js host

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Performance

- All pages statically generated
- Fast initial load
- Smooth 60fps animations
- Optimized fonts

---

**Design Goal Achieved**: Feels like a finance + AI student who loves Excel and Apple design coded this himself. Not flashy. Not AI-template. Just calm, thoughtful, and quietly confident.
