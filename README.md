# 🌌 Orbit

![Orbit Dashboard](public/Screenshot.png)

A beautiful, configurable self-hosted services dashboard with a glass design. Built with Next.js 15, TypeScript, and Tailwind CSS.

## ✨ Features

- **🪟 Glass Design** - Frosted glassmorphism with blur effects and smooth animations
- **🌙 Dark/Light Mode** - Toggle with persistent preference (saved to localStorage)
- **⚙️ Fully Configurable** - All services and settings defined in a simple JSON file
- **🔍 Search & Filter** - Quickly find services by name or description
- ⭐ **Favorites Section** - Pin your most-used services to the top
- **📱 Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **🐳 Docker Ready** - Easy deployment with Docker and Docker Compose
- **🔄 Hot Reload** - Changes to configuration reflect immediately (after page refresh)
- **🏷️ Service Groups** - Organize services into logical categories
- **🔗 Quick Links** - Fast access to external resources

## 🚀 Quick Start

### Docker Deployment (Recommended)

#### Using Docker Compose

1. Edit [`config/services.json`](config/services.json) with your services
2. Run `docker-compose up -d`
3. Access your dashboard at `http://localhost:3000`

#### Pulling from Registry

To pull the Docker image from GitHub Container Registry:

```bash
# Pull the latest version
docker pull ghcr.io/waldokilian2/orbit:latest

# Pull a specific version (e.g., 0.3.0)
docker pull ghcr.io/waldokilian2/orbit:0.3.0
```

**Package Information:**
- **Name**: `orbit`
- **Version**: `0.3.0`
- **Registry**: `ghcr.io/waldokilian2/orbit`

After pulling, run the container:

```bash
docker run -d \
  --name orbit-dashboard \
  -p 3000:3000 \
  ghcr.io/waldokilian2/orbit:0.3.0
```

### Development Mode

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your dashboard.

## ⚙️ Configuration

You can configure your dashboard in two ways:

### UI Editor (Recommended)

Click the **Settings** button (⚙️) in the header to open the configuration editor. This allows you to:

- Edit the configuration directly in the browser
- See real-time JSON validation
- Access built-in help documentation
- Save changes instantly with Ctrl+S

### Manual Configuration

Alternatively, edit the [`config/services.json`](config/services.json) file directly. Here's the structure:

```json
{
  "site": {
    "title": "My Server Hub",
    "subtitle": "Welcome to my self-hosted services",
    "footer": "Powered by Docker",
    "logo": ""
  },
  "quickLinks": [
    { "name": "GitHub", "url": "https://github.com" },
    { "name": "Docs", "url": "https://docs.example.com" }
  ],
  "groups": [
    {
      "name": "Media",
      "icon": "🎬",
      "services": [
        {
          "id": "plex",
          "name": "Plex",
          "description": "Media server for movies and TV shows",
          "url": "http://localhost:32400",
          "icon": "🎬",
          "color": "#E5A00D"
        }
      ]
    }
  ],
  "favorites": ["plex", "nextcloud"]
}
```

### Configuration Fields Explained

#### Site Settings
| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Main heading displayed in the header |
| `subtitle` | string | Subheading below the title |
| `footer` | string | Text displayed in the footer |
| `logo` | string | Optional URL to a logo image |

#### Quick Links
| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Display name for the link |
| `url` | string | URL the link points to |
| `icon` | string | Optional emoji icon |

#### Service Groups
| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Group name (displayed as section heading) |
| `icon` | string | Optional emoji icon for the group |
| `services` | array | List of services in this group |

#### Services
| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier (used for favorites) |
| `name` | string | Service name |
| `description` | string | Short description of the service |
| `url` | string | URL to access the service |
| `icon` | string | Emoji icon for the service card |
| `color` | string | Optional hex color (e.g., "#E5A00D") |

#### Favorites
Array of service IDs to display in the favorites section at the top.

## 🎨 Customization

### Logo Configuration

The `logo` field in the `site` section allows you to add a custom logo to your dashboard header.

#### How It Works

- **Empty string** (`""`): Shows a default gradient icon with a house emoji (🏠)
- **Custom URL**: Displays your custom logo image in the header

### Adding Custom Icons

Use emoji icons for services, or use image URLs:

```json
{
  "icon": "https://example.com/icon.png"
}
```

### Custom Colors

Each service can have a custom accent color that affects the card styling:

```json
{
  "color": "#E5A00D"
}
```

## 🌙 Dark/Light Mode

- Click the toggle in the header to switch between dark and light themes
- Your preference is automatically saved to localStorage
- Theme persists across sessions and page refreshes
- Respects system preference by default (falls back to dark mode)

## 📁 Project Structure

```
├── config/
│   └── services.json      # Main configuration file
├── public/
│   └── Screenshot.png     # Dashboard screenshot
├── src/
│   ├── app/
│   │   ├── page.tsx       # Main dashboard page
│   │   ├── layout.tsx     # Root layout
│   │   └── api/
│   │       └── config/
│   │           └── route.ts  # Config API endpoint
│   ├── components/
│   │   ├── Header.tsx     # Site header with theme toggle
│   │   ├── SearchBar.tsx  # Search functionality
│   │   ├── ServiceCard.tsx # Individual service card
│   │   ├── ServiceGroup.tsx # Grouped services section
│   │   ├── QuickLinks.tsx # Quick links bar
│   │   └── Favorites.tsx  # Favorites section
│   ├── hooks/
│   │   └── useTheme.ts    # Dark/light mode hook
│   └── types/
│       └── config.ts      # TypeScript definitions
├── Dockerfile             # Docker build file
└── docker-compose.yml     # Docker Compose configuration
```

## 🔧 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run linter
npm run lint

# Build for production
npm run build
```

## 📝 Tips

1. **Service IDs**: Use lowercase, unique IDs for each service (used for favorites)
2. **Group Organization**: Create logical groups like "Media", "Development", "Monitoring"
3. **Color Coding**: Use brand colors for visual consistency (e.g., Plex orange, Nextcloud blue)
4. **Quick Links**: Add frequently used external links for quick access
5. **Favorites**: Pin your most-used 4-6 services to the favorites section

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

---

Built with ❤️ using Next.js 15, TypeScript, and Tailwind CSS.
