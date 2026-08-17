# A Digital Encounter - Poem Website

A beautifully designed website for the poem "A Digital Encounter" — a romantic poem about finding connection through Instagram.

## 📋 Project Structure

```
├── index.html       # Main HTML file with poem content
├── styles.css       # Styling with gradient background and animations
├── script.js        # Interactive features and animations
└── README.md        # This file
```

## 🎨 Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Beautiful Styling**: Gradient background with purple and blue tones
- **Smooth Animations**: Poems fade in as you scroll, hover effects on sections
- **Interactive Elements**: Click the heart to create floating heart animations
- **Optimized for Print**: Looks great when printed

## 🚀 How to Use

1. **Open in Browser**: Simply open `index.html` in your web browser
2. **Local Development**: Use a local server (optional but recommended):
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (with http-server)
   npx http-server
   ```
   Then visit `http://localhost:8000`

## 🛠️ Customization

### Change Colors
Edit the gradient colors in `styles.css`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Modify Typography
Update font-family or font-sizes in `styles.css`:
```css
font-family: 'Georgia', 'Garamond', serif;
```

### Add More Content
Add new poem sections in `index.html` using the `.poem-section` class:
```html
<section class="poem-section">
    <p>Your new verse here...</p>
</section>
```

## 🌐 Deployment Options

### GitHub Pages
1. Create a GitHub repository
2. Push this project to the repo
3. Go to Settings → Pages
4. Set source to `main` branch
5. Your site will be live at `https://username.github.io/repo-name`

### Netlify
1. Connect your GitHub repo to Netlify
2. Deploy with one click
3. Get a live URL automatically

### Vercel
1. Import your GitHub project
2. Deploy instantly
3. Get automatic previews for each commit

### Static Hosting
Upload the files to any web host that supports static files (AWS S3, Cloudflare Pages, Firebase Hosting, etc.)

## 💝 Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## 📝 Notes

- The poem is fully responsive and will adapt to any screen size
- All animations are GPU-accelerated for smooth performance
- The site uses semantic HTML5 and modern CSS
- No external dependencies required — fully self-contained

---

*A poem about finding connection in the digital age* ❤️
