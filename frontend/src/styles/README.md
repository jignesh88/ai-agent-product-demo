# Frontend Stylesheet Structure

This directory contains all the stylesheets for the frontend application. The stylesheets are organized in a modular way to make them easier to maintain and extend.

## File Structure

- `index.css`: The main entry point for all stylesheets. It imports all other stylesheets in the correct order.
- `variables.css`: Contains CSS variables for colors, typography, spacing, etc.
- `base.css`: Contains base styles and CSS resets.
- `components.css`: Contains styles for UI components like buttons, cards, forms, etc.
- `layout.css`: Contains styles for layout components like containers, grids, headers, footers, etc.
- `theme.css`: Contains theme-specific styles like typography, colors, etc.
- `utilities.css`: Contains utility classes for common styling needs.
- `animations.css`: Contains animation styles and keyframes.
- `responsive.css`: Contains responsive styles and media queries.
- `print.css`: Contains print-specific styles.
- `tailwind.config.js`: Configuration file for Tailwind CSS.

## Usage

### Importing Stylesheets

All stylesheets are imported in the `index.css` file in the correct order. You should import `index.css` in your application's entry point:

```jsx
// In your _app.js or similar
import '../styles/index.css';
```

### CSS Variables

CSS variables are defined in `variables.css` and can be used throughout the application:

```css
.my-element {
  color: rgb(var(--color-primary-500));
  font-size: var(--font-size-lg);
  margin: var(--spacing-4);
}
```

### Tailwind CSS

The application uses Tailwind CSS for utility classes. The configuration is in `tailwind.config.js`. You can use Tailwind's utility classes directly in your HTML/JSX:

```jsx
<div className="flex items-center justify-between p-4 bg-primary-500 text-white">
  <h1 className="text-2xl font-bold">Hello World</h1>
  <button className="btn-primary">Click Me</button>
</div>
```

### Custom Components

Custom component styles are defined in `components.css`. You can use these classes in your HTML/JSX:

```jsx
<button className="btn btn-primary">Primary Button</button>
<div className="card">
  <div className="card-header">
    <h2 className="card-title">Card Title</h2>
  </div>
  <div className="card-body">
    <p>Card content goes here.</p>
  </div>
  <div className="card-footer">
    <button className="btn btn-secondary">Cancel</button>
    <button className="btn btn-primary">Save</button>
  </div>
</div>
```

### Layout Components

Layout styles are defined in `layout.css`. You can use these classes in your HTML/JSX:

```jsx
<div className="container">
  <div className="header">
    <div className="header-inner container">
      <div className="header-logo">Logo</div>
      <nav className="header-nav">
        <a href="#" className="header-nav-item">Home</a>
        <a href="#" className="header-nav-item">About</a>
        <a href="#" className="header-nav-item">Contact</a>
      </nav>
    </div>
  </div>
  <main className="main">
    <div className="container">
      <h1>Page Title</h1>
      <p>Page content goes here.</p>
    </div>
  </main>
  <div className="footer">
    <div className="footer-inner container">
      <p>&copy; 2025 Company Name</p>
    </div>
  </div>
</div>
```

### Responsive Design

Responsive styles are defined in `responsive.css`. The application follows a mobile-first approach:

```jsx
<div className="responsive-container">
  <div className="responsive-grid">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  </div>
</div>
```

### Animations

Animation styles are defined in `animations.css`. You can use these classes in your HTML/JSX:

```jsx
<div className="animate-fade-in">This will fade in.</div>
<div className="animate-slide-in-up">This will slide up.</div>
<div className="animate-pulse">This will pulse.</div>
```

### Print Styles

Print styles are defined in `print.css`. These styles will be applied when the user prints the page:

```jsx
<div className="print-only">This will only show when printing.</div>
<div className="no-print">This will not show when printing.</div>
```

## Best Practices

1. **Use CSS Variables**: Always use CSS variables for colors, typography, spacing, etc. This makes it easier to maintain a consistent design system.

2. **Mobile-First Approach**: Start with styles for mobile devices and then add styles for larger screens using media queries.

3. **Component-Based Design**: Create reusable components with consistent styling.

4. **Avoid Inline Styles**: Use CSS classes instead of inline styles whenever possible.

5. **Use Tailwind Utilities**: Use Tailwind's utility classes for common styling needs.

6. **Custom Classes for Complex Components**: Create custom classes for complex components that require multiple styles.

7. **Keep Stylesheets Modular**: Each stylesheet should have a specific purpose and should not contain styles that belong in another stylesheet.

8. **Document Your Styles**: Add comments to explain complex styles or to provide usage examples.

## Memory Bank Specific Styles

The Memory Bank component has specific styles defined in `components.css` and `theme.css`:

```jsx
<div className="memory-bank">
  <div className="memory-bank-header">
    <div className="memory-bank-search">
      <input type="text" className="memory-bank-search-input" placeholder="Search documents..." />
    </div>
  </div>
  <div className="memory-bank-content">
    <div className="memory-bank-grid">
      <div className="document-card">
        <div className="document-card-header">
          <h3>Document Title</h3>
        </div>
        <div className="document-card-body">
          <p>Document content preview...</p>
        </div>
        <div className="document-card-footer">
          <span className="memory-bank-tag">PDF</span>
          <button className="btn btn-sm btn-primary">View</button>
        </div>
      </div>
      {/* More document cards */}
    </div>
  </div>
</div>
```

## Workflow Specific Styles

The Workflow component has specific styles defined in `components.css` and `theme.css`:

```jsx
<div className="workflow">
  <div className="workflow-header">
    <h2>Workflow Editor</h2>
    <div className="workflow-controls">
      <button className="btn btn-sm btn-primary">Add Node</button>
      <button className="btn btn-sm btn-secondary">Save</button>
    </div>
  </div>
  <div className="workflow-content">
    <div className="workflow-canvas">
      {/* Workflow nodes and edges */}
    </div>
    <div className="workflow-sidebar">
      <h3>Properties</h3>
      {/* Node properties */}
    </div>
  </div>
</div>
```

## Dashboard Specific Styles

The Dashboard component has specific styles defined in `components.css` and `theme.css`:

```jsx
<div className="dashboard">
  <div className="dashboard-header">
    <h2 className="dashboard-title">Dashboard</h2>
  </div>
  <div className="dashboard-content">
    <div className="dashboard-grid">
      <div className="dashboard-stat-card">
        <div className="dashboard-stat-label">Total Documents</div>
        <div className="dashboard-stat-value">1,234</div>
        <div className="dashboard-stat-change-positive">+5% from last month</div>
      </div>
      {/* More stat cards */}
      <div className="dashboard-chart-container">
        <div className="dashboard-chart-title">Usage Over Time</div>
        {/* Chart component */}
      </div>
      {/* More charts */}
    </div>
  </div>
</div>
