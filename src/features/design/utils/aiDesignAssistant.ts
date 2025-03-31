
import { ThemeConfig } from '@/contexts/DesignSystemContext';
import { toast } from 'sonner';

const API_URL = 'https://api.openai.com/v1/chat/completions';

export interface AIDesignInput {
  prompt: string;
  currentTheme?: ThemeConfig;
  focus?: 'colors' | 'typography' | 'spacing' | 'overall';
}

export const generateDesignSuggestions = async (
  input: AIDesignInput,
  apiKey: string
): Promise<Partial<ThemeConfig> | null> => {
  try {
    const { prompt, currentTheme, focus = 'overall' } = input;
    
    let systemPrompt = `
      You are an expert UI/UX designer and front-end developer specializing in design systems. 
      Your task is to generate a cohesive design theme based on the user's request.
      
      Return ONLY valid JSON that matches the TypeScript interface for ThemeConfig, without any additional text:
      
      \`\`\`typescript
      interface ThemeColors {
        primary: string; // HEX color code
        secondary: string; // HEX color code
        accent: string; // HEX color code
        background: string; // HEX color code
        foreground: string; // HEX color code
        muted: string; // HEX color code
        border: string; // HEX color code
      }

      interface ThemeFonts {
        heading: string; // Font family names with fallbacks
        body: string; // Font family names with fallbacks
        mono: string; // Font family names with fallbacks
        sizes: {
          base: string; // CSS size value with units (px, rem)
          sm: string; // CSS size value with units
          md: string; // CSS size value with units
          lg: string; // CSS size value with units
          xl: string; // CSS size value with units
          '2xl': string; // CSS size value with units
        };
      }

      interface ThemeSpacing {
        unit: number; // Base unit in pixels
        scale: {
          xs: number; // Multiplier of unit
          sm: number; // Multiplier of unit
          md: number; // Multiplier of unit
          lg: number; // Multiplier of unit
          xl: number; // Multiplier of unit
          '2xl': number; // Multiplier of unit
        };
      }

      interface ThemeConfig {
        mode: 'light' | 'dark' | 'system';
        colors: ThemeColors;
        fonts: ThemeFonts;
        spacing: ThemeSpacing;
        borderRadius: string; // CSS size value with units
        customCSS: string; // Additional CSS rules
      }
      \`\`\`
      
      Based on the focus area requested, you may return a partial ThemeConfig object with only the relevant properties.
    `;

    // Adjust system prompt based on focus area
    if (focus === 'colors') {
      systemPrompt += `
        Since the user is focused on colors, provide only the 'colors' property in your response.
        Ensure the color palette is harmonious, accessible, and follows color theory principles.
      `;
    } else if (focus === 'typography') {
      systemPrompt += `
        Since the user is focused on typography, provide only the 'fonts' property in your response.
        Recommend popular, readable web fonts with appropriate fallbacks.
      `;
    } else if (focus === 'spacing') {
      systemPrompt += `
        Since the user is focused on spacing, provide only the 'spacing' and 'borderRadius' properties in your response.
        Follow principles of consistent spacing using a modular scale.
      `;
    }

    // Add context about the current theme if available
    if (currentTheme) {
      systemPrompt += `
        Here is the current theme configuration to reference or improve upon:
        ${JSON.stringify(currentTheme, null, 2)}
      `;
    }

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: prompt }
    ];

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages,
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const suggestion = data.choices[0]?.message?.content;

    if (!suggestion) {
      throw new Error('No suggestion generated');
    }

    // Extract JSON from the response
    const jsonMatch = suggestion.match(/```json\n([\s\S]*?)\n```/) || 
                      suggestion.match(/```([\s\S]*?)```/) ||
                      [null, suggestion];
                      
    const jsonString = jsonMatch[1] || suggestion;
    
    try {
      return JSON.parse(jsonString.trim());
    } catch (parseError) {
      console.error('Error parsing JSON from AI suggestion:', parseError);
      throw new Error('Could not parse design suggestion into valid JSON');
    }
  } catch (error) {
    console.error('AI design assistant error:', error);
    toast.error(`Error generando sugerencias de diseño: ${error.message}`);
    return null;
  }
};
