# 🚀 Live Development Setup Guide

## Quick Start Options

Choose one of these methods to run your handbook locally with live editing:

---

## Option 1: VS Code with Live Server (RECOMMENDED) ⭐

### Setup:
1. Install [Visual Studio Code](https://code.visualstudio.com/)
2. Install the "Live Server" extension by Ritwick Dey
3. Open your project folder in VS Code
4. Right-click on `handbook.html`
5. Select "Open with Live Server"

### Features:
- ✅ Auto-reload on file save
- ✅ No command line needed
- ✅ Works on all operating systems
- ✅ Built-in editor

---

## Option 2: Python Simple Server (Already Installed on Most Systems)

### Run:
```bash
# Navigate to your project folder
cd /path/to/your/handbook

# Python 3
python3 -m http.server 8000

# Or Python 2
python -m SimpleHTTPServer 8000
```

### Access:
Open browser: http://localhost:8000/handbook.html

### Note:
- ⚠️ Requires manual page refresh after edits
- ✅ No installation needed (Python comes pre-installed)

---

## Option 3: Node.js with Live Server

### Setup:
```bash
# Install Node.js from https://nodejs.org first

# Navigate to your project folder
cd /path/to/your/handbook

# Install live-server globally
npm install -g live-server

# Run the server
live-server --port=8080 --open=handbook.html
```

### Features:
- ✅ Auto-reload on save
- ✅ Opens browser automatically
- ✅ Shows console logs

---

## Option 4: Browser-Sync (Advanced)

### Setup:
```bash
# Install Node.js first, then:
npm install -g browser-sync

# Run with:
browser-sync start --server --files "*.html, *.css, *.js" --no-notify
```

### Features:
- ✅ Syncs across multiple devices
- ✅ Live reload
- ✅ CSS injection without page refresh

---

## Option 5: Online Editors (No Installation)

### CodePen:
1. Go to https://codepen.io/pen/
2. Paste HTML in HTML section
3. Extract CSS to CSS section
4. Extract JS to JS section
5. See live preview instantly

### JSFiddle:
1. Go to https://jsfiddle.net/
2. Similar to CodePen setup

### CodeSandbox:
1. Go to https://codesandbox.io/
2. Create new "Vanilla" sandbox
3. Replace index.html with your code

---

## 🛠️ Best Development Workflow

### Recommended Setup:
1. **Editor**: VS Code with Live Server
2. **Browser**: Chrome with DevTools open (F12)
3. **File Structure**:
   ```
   project-folder/
   ├── handbook.html
   ├── style.css (optional - extract styles)
   ├── script.js (optional - extract scripts)
   └── images/ (for any images)
   ```

### To Extract CSS and JS:
1. Create `style.css` file
2. Move all CSS from `<style>` tags to style.css
3. Link in HTML: `<link rel="stylesheet" href="style.css">`
4. Create `script.js` file
5. Move all JS from `<script>` tags to script.js
6. Link in HTML: `<script src="script.js"></script>`

---

## 📱 Testing on Mobile

### Using Browser-Sync:
```bash
browser-sync start --server --files "*.html" --tunnel
```
This gives you a public URL to test on any device!

### Using Local Network:
1. Find your computer's IP: 
   - Windows: `ipconfig`
   - Mac/Linux: `ifconfig` or `ip addr`
2. Access from mobile: `http://YOUR-IP:8000/handbook.html`

---

## 🔥 Hot Tips

1. **Chrome DevTools**: 
   - Press F12 to open
   - Use "Device Mode" to test mobile views
   - Check Console for errors

2. **Auto-Save in VS Code**:
   - File > Auto Save (enable for instant updates)

3. **Format Code**:
   - VS Code: Shift+Alt+F (Windows) or Shift+Option+F (Mac)

4. **Version Control**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

---

## 🎨 Customization Tips

### Change Colors:
- Main color: Search for `#e74c3c` and replace
- Background: Search for `#f5f5f5`

### Change Company Name:
- Replace "COMPANY" with your company name
- Update the title tag in `<head>`

### Add Logo:
- Add logo file to project folder
- Replace emoji icons with: `<img src="logo.png" alt="Logo" style="height: 24px;">`

### Custom Fonts:
Add to `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont&display=swap" rel="stylesheet">
```

---

## 📚 Resources

- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Tricks](https://css-tricks.com/)
- [JavaScript Info](https://javascript.info/)
- [Can I Use](https://caniuse.com/) - Browser compatibility

---

## Need Help?

1. Check browser console for errors (F12)
2. Validate HTML: https://validator.w3.org/
3. Validate CSS: https://jigsaw.w3.org/css-validator/

Happy coding! 🎉
