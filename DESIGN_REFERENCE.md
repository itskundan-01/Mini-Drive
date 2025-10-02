# 🎨 Mini Drive - Quick Visual Reference

## Color Gradients Guide

### Primary Actions
```
from-indigo-600 to-purple-600
Example: Main buttons, headers, primary CTAs
```

### Success Actions (View/Download)
```
from-green-500 to-emerald-600
Example: View file button, success states
```

### Danger Actions (Delete)
```
from-red-500 to-rose-600
Example: Delete buttons, warning states
```

### File Type Colors
```
Images:    from-blue-500 to-cyan-500
PDFs:      from-red-500 to-rose-500
Documents: from-yellow-500 to-orange-500
Videos:    from-purple-500 to-pink-500
Audio:     from-green-500 to-emerald-500
Other:     from-gray-500 to-slate-500
```

### Stat Card Colors
```
indigo:  Primary statistics
green:   Storage/success metrics
purple:  User engagement metrics
orange:  Admin-specific metrics
blue:    Activity metrics
pink:    Special features
```

---

## Component Class Patterns

### Hover Scale Effect
```jsx
className="transform hover:scale-105 transition duration-200"
```

### Hover Lift Effect
```jsx
className="transform hover:-translate-y-1 hover:shadow-2xl transition duration-300"
```

### Gradient Button
```jsx
className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition duration-200"
```

### Card Container
```jsx
className="bg-white rounded-xl shadow-lg p-6"
```

### Gradient Text
```jsx
className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
```

---

## Emoji Icon Reference

### Navigation & Actions
- ⚙️ Admin Panel / Settings
- 📊 Dashboard / My Files
- ⬆️ Upload
- 📤 Upload Zone
- 📥 Download / View
- 🗑️ Delete
- 🔄 Refresh

### Statistics & Metrics
- 👥 Users
- 📁 Files
- 💾 Storage
- 👑 Admins
- 📈 Growth / Activity
- 💡 Insights
- ✅ Success / Health

### File Types
- 🖼️ Images
- 📕 PDFs
- 📄 Documents
- 🎥 Videos
- 🎵 Audio
- 📦 Other/Unknown

### States
- 👋 Welcome
- 📂 Empty State
- ⏳ Loading (spinning)
- ✓ Success
- ✕ Error / Close

### Features
- 🔒 Security
- ⚡ Speed
- ☁️ Cloud

---

## Responsive Breakpoints

```
sm:  640px  (Small devices)
md:  768px  (Medium devices - tablets)
lg:  1024px (Large devices - desktops)
xl:  1280px (Extra large devices)
2xl: 1536px (Extra extra large devices)
```

### Common Patterns
```jsx
// Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"

// Mobile: 1 column, Tablet: 2 columns, Desktop: 4 columns
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"

// Mobile: Stack, Desktop: Flex row
className="flex flex-col sm:flex-row gap-4"
```

---

## Animation Timing

```
Fast:     transition duration-200
Normal:   transition duration-300
Slow:     transition duration-500

Hover:    Use duration-200 for immediate feedback
Complex:  Use duration-300 for multi-property transitions
Smooth:   Use duration-500 for entrance/exit animations
```

---

## Common Spacing

```
Tight:   gap-2, space-y-2, p-2
Normal:  gap-4, space-y-4, p-4
Loose:   gap-6, space-y-6, p-6
Wide:    gap-8, space-y-8, p-8

Sections:    mb-8, mt-16, py-20
Cards:       p-6 or p-8
Buttons:     py-3 px-6 or py-4 px-8
Small items: p-2 or p-4
```

---

## Typography Scale

```
Hero:        text-6xl or text-7xl (font-bold)
H1:          text-4xl (font-bold)
H2:          text-3xl (font-bold)
H3:          text-2xl (font-bold)
Body Large:  text-xl (font-normal)
Body:        text-base (font-normal)
Small:       text-sm
Extra Small: text-xs
```

---

## Shadow Levels

```
sm:   shadow-sm   (Subtle shadow)
md:   shadow-md   (Default card shadow)
lg:   shadow-lg   (Prominent shadow)
xl:   shadow-xl   (Large shadow)
2xl:  shadow-2xl  (Extra large shadow - hover states)
```

---

## Border Radius

```
sm:   rounded-sm   (2px)
md:   rounded-md   (6px)
lg:   rounded-lg   (8px)
xl:   rounded-xl   (12px)
2xl:  rounded-2xl  (16px)
full: rounded-full (9999px - circles)
```

---

## Common Component Patterns

### Stat Card
```jsx
<div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300">
  <div className="bg-gradient-to-br from-indigo-500 to-purple-500 w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-4">
    {icon}
  </div>
  <h3 className="text-2xl font-bold mb-2">{title}</h3>
  <p className="text-gray-600">{description}</p>
</div>
```

### Action Button
```jsx
<button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transform hover:scale-105 transition duration-200">
  {label}
</button>
```

### File Card
```jsx
<div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition duration-300">
  <div className="h-32 bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
    {icon}
  </div>
  <div className="p-5">
    {/* Content */}
  </div>
</div>
```

### Badge
```jsx
<span className="px-3 py-1 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 font-semibold text-xs">
  {label}
</span>
```

---

## Loading States

### Spinner
```jsx
<div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600"></div>
```

### Progress Bar
```jsx
<div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
  <div 
    className="bg-gradient-to-r from-indigo-600 to-purple-600 h-full rounded-full transition-all duration-300"
    style={{ width: `${progress}%` }}
  ></div>
</div>
```

---

## User Avatar (Initials)
```jsx
<div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
  {initials}
</div>
```

---

## Empty State
```jsx
<div className="bg-white rounded-xl shadow-lg p-12 text-center">
  <div className="text-6xl mb-4">{emoji}</div>
  <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
  <p className="text-gray-600">{description}</p>
</div>
```

---

## Tab Navigation
```jsx
<button className={`flex-1 py-3 px-6 rounded-lg font-semibold transition duration-200 ${
  isActive
    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
    : 'text-gray-600 hover:bg-gray-100'
}`}>
  {label}
</button>
```

---

## Quick Tips

### DO ✅
- Use gradients for primary actions
- Add hover effects to interactive elements
- Show loading states for async operations
- Use emojis for visual interest
- Maintain consistent spacing
- Make buttons large and easy to tap

### DON'T ❌
- Mix too many gradient colors
- Forget mobile responsiveness
- Skip loading/error states
- Use inconsistent spacing
- Make text too small
- Forget accessibility (color contrast)

---

## Accessibility Notes

- All buttons have clear labels
- Interactive elements have hover states
- Color contrast meets WCAG standards
- Loading states are indicated
- Error messages are descriptive
- Forms have proper validation

---

*Quick Reference Card for Mini Drive Design System*
*Version 2.0.0*
