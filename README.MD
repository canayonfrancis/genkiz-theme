# PACE WordPress Theme with Gutenberg Blocks

This is a custom WordPress theme designed to leverage Gutenberg blocks powered by npm. Follow the instructions below to clone the theme, set it up, and activate it.

## Features

- Custom Gutenberg blocks
- Responsive design
- Easy customization options

## Prerequisites

- WordPress installed on your local server or hosting environment
- Node.js and npm installed on your machine

## Installation Instructions

### Step 1: Clone the Theme

1. Navigate to your WordPress themes directory. This is typically located at:
   ```bash
    cd /path/to/your/wordpress/wp-content/themes/
   ```
2. Clone the theme repository using git:
   ```bash
    git clone https://github.com/flyingcoder/PACE-theme.git
   ```

### Step 2: Install Dependencies

1. Navigate into the theme directory:
   ```bash
    cd PACE
   ```
2. Install the npm packages:
   ```bash
    npm install
   ```

### Step 3: Build the Theme

1. Run the build process to compile the JavaScript and CSS files:
   ```bash
    npm run build
   ```

### Step 4: Activate the Theme

1. Log in to your WordPress admin dashboard.
2. Go to Appearance > Themes.
3. Find PACE theme in the list and click on the Activate button.
