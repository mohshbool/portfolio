# Next.js Portfolio 🎯

> Converted to Next.js with full Server-Side Rendering support

[![Next.js](https://img.shields.io/badge/Next.js-14.x-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.x-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Modern portfolio with Next.js SSR, TypeScript, and multi-language support 🚀

## ✨ Features

- **Server-Side Rendering (SSR)**: Full SSR support for better SEO and initial load performance
- **Multi-language Support**: English and German localization with automatic language detection
- **Dark/Light Theme**: Theme toggle with system preference detection
- **Responsive Design**: Mobile-first responsive design using Bootstrap
- **TypeScript**: Full type safety throughout the application
- **Modern Stack**: Next.js 14, React 18, SCSS modules

## 🛠 Stack

- Next.js 14
- React 18
- TypeScript 5
- Bootstrap 5
- SCSS
- React Bootstrap
- React Vertical Timeline
- Iconify

## 📦 Quick Start

### Make your own

Edit `src/data/en.json`, `src/data/de.json` and `public/images` for your data

### Install and run

```bash
# Install dependencies
yarn install
# or
npm install

# Start dev server
yarn dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Build for production

```bash
# Build
yarn build
# or
npm run build

# Start production server
yarn start
# or
npm start
```

## 📁 Project Structure

```
portfolio/
├── pages/              # Next.js pages
│   ├── _app.tsx       # App wrapper
│   ├── _document.tsx  # Document wrapper
│   └── index.tsx      # Home page (SSR)
├── src/
│   ├── components/    # React components
│   ├── data/          # Portfolio data (en.json, de.json)
│   ├── scss/          # SCSS styles
│   └── utils/         # Utility functions
├── public/            # Static assets
└── next.config.js     # Next.js configuration
```

## 🌐 SSR Features

- **Language Detection**: Server-side language detection from browser headers
- **SEO Optimization**: Meta tags and proper HTML structure for search engines
- **Performance**: Optimized initial page load with SSR
- **i18n Support**: Built-in internationalization with Next.js i18n

## 🎨 Configuration

### Language Files

Update language content in:
- `src/data/en.json` - English content
- `src/data/de.json` - German content

### Theme Customization

Theme variables are in:
- `src/scss/themes/theme-dark.scss`
- `src/scss/themes/theme-light.scss`

## 🚀 Deploy

### Vercel (Recommended)

```bash
# Deploy to Vercel
vercel
# or
vercel --prod
```

### Other Platforms

Build the project and deploy the `.next` folder along with `public`, `package.json`, and `next.config.js`.

## 🤝 Contributing

Pull requests are welcome! Feel free to improve the portfolio.

## 📄 License

See LICENSE file for details.

## 👤 Author

Mohammad Shbool - Senior Software Engineer & Mobile Engineer

- LinkedIn: [mohammad-shbool](https://www.linkedin.com/in/mohammad-shbool)
- GitHub: [@mohshbool](https://github.com/mohshbool)
