import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Default configuration fallback
const defaultConfig = {
  site: {
    title: "Orbit",
    subtitle: "Your self-hosted services dashboard",
    footer: "Powered by Next.js",
    logo: ""
  },
  quickLinks: [],
  groups: [],
  favorites: []
};

// Configuration path
const CONFIG_PATH = path.join(process.cwd(), 'config', 'services.json');

// Read and parse configuration file
function getConfig() {
  try {
    // Check if config file exists
    if (!fs.existsSync(CONFIG_PATH)) {
      console.warn(`Config file not found at ${CONFIG_PATH}, using default config`);
      return defaultConfig;
    }

    // Read and parse the file
    const fileContent = fs.readFileSync(CONFIG_PATH, 'utf-8');
    const config = JSON.parse(fileContent);
    
    // Validate and merge with defaults
    return {
      site: {
        ...defaultConfig.site,
        ...config.site
      },
      quickLinks: config.quickLinks || [],
      groups: config.groups || [],
      favorites: config.favorites || []
    };
  } catch (error) {
    console.error('Error reading config file:', error);
    
    // Return default config on error
    return defaultConfig;
  }
}

// Validate configuration structure
function validateConfig(config: unknown): { valid: boolean; error?: string } {
  if (!config || typeof config !== 'object') {
    return { valid: false, error: 'Configuration must be an object' };
  }

  const cfg = config as Record<string, unknown>;

  // Validate site
  if (!cfg.site || typeof cfg.site !== 'object') {
    return { valid: false, error: 'site configuration is required' };
  }

  // Validate groups
  if (!Array.isArray(cfg.groups)) {
    return { valid: false, error: 'groups must be an array' };
  }

  // Validate each group
  for (let i = 0; i < cfg.groups.length; i++) {
    const group = cfg.groups[i];
    if (!group.name || typeof group.name !== 'string') {
      return { valid: false, error: `Group ${i + 1}: name is required` };
    }
    if (!Array.isArray(group.services)) {
      return { valid: false, error: `Group "${group.name}": services must be an array` };
    }
    
    // Validate each service
    for (let j = 0; j < group.services.length; j++) {
      const service = group.services[j];
      if (!service.id || typeof service.id !== 'string') {
        return { valid: false, error: `Group "${group.name}", Service ${j + 1}: id is required` };
      }
      if (!service.name || typeof service.name !== 'string') {
        return { valid: false, error: `Group "${group.name}", Service "${service.id}": name is required` };
      }
      if (!service.url || typeof service.url !== 'string') {
        return { valid: false, error: `Group "${group.name}", Service "${service.id}": url is required` };
      }
    }
  }

  // Validate quickLinks if present
  if (cfg.quickLinks && !Array.isArray(cfg.quickLinks)) {
    return { valid: false, error: 'quickLinks must be an array' };
  }

  // Validate favorites if present
  if (cfg.favorites && !Array.isArray(cfg.favorites)) {
    return { valid: false, error: 'favorites must be an array' };
  }

  return { valid: true };
}

// GET - Retrieve configuration
export async function GET() {
  try {
    const config = getConfig();
    return NextResponse.json(config, {
      headers: {
        'Cache-Control': 'public, max-age=5, stale-while-revalidate=10'
      }
    });
  } catch (error) {
    console.error('Error in config API:', error);
    return NextResponse.json(
      { error: 'Failed to load configuration', config: defaultConfig },
      { status: 500 }
    );
  }
}

// PUT - Save configuration
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    // Validate configuration
    const validation = validateConfig(body);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // Ensure config directory exists
    const configDir = path.dirname(CONFIG_PATH);
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }

    // Write configuration to file with pretty formatting
    const configString = JSON.stringify(body, null, 2);
    fs.writeFileSync(CONFIG_PATH, configString, 'utf-8');

    return NextResponse.json({ 
      success: true, 
      message: 'Configuration saved successfully',
      config: body
    });
  } catch (error) {
    console.error('Error saving config file:', error);
    return NextResponse.json(
      { error: 'Failed to save configuration' },
      { status: 500 }
    );
  }
}

// POST - Validate configuration (without saving)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const validation = validateConfig(body);
    if (!validation.valid) {
      return NextResponse.json(
        { valid: false, error: validation.error },
        { status: 400 }
      );
    }

    return NextResponse.json({ 
      valid: true, 
      message: 'Configuration structure is valid' 
    });
  } catch {
    return NextResponse.json(
      { valid: false, error: 'Invalid JSON' },
      { status: 400 }
    );
  }
}
