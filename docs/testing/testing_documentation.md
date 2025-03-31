
# Documentación de Pruebas - Nexo Learning Platform

## Estrategia General de Pruebas

La estrategia de pruebas de Nexo Learning implementa un enfoque piramidal que balancean velocidad, cobertura y confiabilidad:

```
    ▲
   ╱ ╲    E2E Tests
  ╱___╲   (Cypress)
 ╱     ╲  Integration Tests
╱_______╲ (React Testing Library)
╱         ╲
╱___________╲ Unit Tests
             (Jest/Vitest)
```

### Principios Fundamentales

1. **Enfoque en Comportamiento**: Pruebas centradas en funcionalidad, no implementación
2. **Automatización**: Maximizar la cobertura de pruebas automatizadas
3. **Integración Continua**: Ejecución de pruebas en cada cambio de código
4. **Shift Left**: Detección temprana de problemas en el ciclo de desarrollo
5. **Mantenibilidad**: Pruebas legibles, mantenibles y resistentes a refactorizaciones

### Tipos de Pruebas

| Tipo | Objetivo | Herramientas | Frecuencia |
|------|----------|--------------|------------|
| Unitarias | Validar componentes y funciones aisladas | Vitest, Jest | En cada commit |
| Integración | Validar interacción entre componentes | React Testing Library | En cada PR |
| E2E | Validar flujos completos de usuario | Cypress | Diariamente, en releases |
| Accesibilidad | Verificar cumplimiento A11y | axe-core, jest-axe | En cada PR |
| Rendimiento | Medir y optimizar tiempos de carga | Lighthouse CI | En cada release |
| Seguridad | Identificar vulnerabilidades | OWASP ZAP, npm audit | Semanal |

## Pruebas Unitarias

### Configuración

Nexo Learning utiliza Vitest como framework principal de pruebas unitarias:

```javascript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'c8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'src/types/**',
        '**/*.d.ts',
        'src/test/**',
        'src/mocks/**',
      ],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
```

### Estructura de Pruebas Unitarias

Seguimos una estructura consistente para las pruebas unitarias:

```
src/
├── components/
│   └── Button/
│       ├── Button.tsx
│       └── Button.test.tsx
├── hooks/
│   └── useAuth/
│       ├── useAuth.ts
│       └── useAuth.test.ts
└── utils/
    └── formatters/
        ├── formatCurrency.ts
        └── formatCurrency.test.ts
```

### Ejemplos de Pruebas Unitarias

#### Componentes React

```tsx
// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';
import { describe, it, expect, vi } from 'vitest';

describe('Button Component', () => {
  it('renders correctly with default props', () => {
    render(<Button>Click me</Button>);
    
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-primary');
  });

  it('applies the correct variant class', () => {
    render(<Button variant="secondary">Secondary</Button>);
    
    const button = screen.getByRole('button', { name: /secondary/i });
    expect(button).toHaveClass('bg-secondary');
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button', { name: /click me/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    
    const button = screen.getByRole('button', { name: /disabled/i });
    expect(button).toBeDisabled();
  });
});
```

#### Hooks Personalizados

```tsx
// useAuth.test.ts
import { renderHook, act } from '@testing-library/react-hooks';
import { useAuth } from './useAuth';
import { AuthProvider } from '@/contexts/AuthContext';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { supabase } from '@/lib/supabase';

// Mock Supabase
vi.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      signInWithPassword: vi.fn(),
      signOut: vi.fn(),
      getSession: vi.fn(),
      onAuthStateChange: vi.fn(() => ({
        data: { subscription: { unsubscribe: vi.fn() } }
      }))
    }
  }
}));

describe('useAuth Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Default mock implementation
    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: null },
      error: null,
    });
  });

  it('provides null user when not authenticated', async () => {
    const wrapper = ({ children }) => (
      <AuthProvider>{children}</AuthProvider>
    );
    
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), { wrapper });
    await waitForNextUpdate();
    
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.loading).toBe(false);
  });

  it('logs in user successfully', async () => {
    const mockUser = { id: '123', email: 'test@example.com' };
    vi.mocked(supabase.auth.signInWithPassword).mockResolvedValue({
      data: { 
        session: { 
          user: mockUser,
          access_token: 'token',
          refresh_token: 'refresh'
        } 
      },
      error: null,
    });
    
    const wrapper = ({ children }) => (
      <AuthProvider>{children}</AuthProvider>
    );
    
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), { wrapper });
    await waitForNextUpdate();
    
    await act(async () => {
      await result.current.login('test@example.com', 'password');
    });
    
    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isAuthenticated).toBe(true);
    expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password'
    });
  });

  // Additional tests for logout, error handling, etc.
});
```

#### Utilidades

```typescript
// formatCurrency.test.ts
import { formatCurrency } from './formatCurrency';
import { describe, it, expect } from 'vitest';

describe('formatCurrency utility', () => {
  it('formats USD correctly', () => {
    expect(formatCurrency(1234.56, 'USD')).toBe('$1,234.56');
    expect(formatCurrency(0, 'USD')).toBe('$0.00');
    expect(formatCurrency(1000000, 'USD')).toBe('$1,000,000.00');
  });

  it('formats EUR correctly', () => {
    expect(formatCurrency(1234.56, 'EUR')).toBe('€1,234.56');
    expect(formatCurrency(0, 'EUR')).toBe('€0.00');
    expect(formatCurrency(1000000, 'EUR')).toBe('€1,000,000.00');
  });

  it('handles negative numbers correctly', () => {
    expect(formatCurrency(-1234.56, 'USD')).toBe('-$1,234.56');
    expect(formatCurrency(-1234.56, 'EUR')).toBe('-€1,234.56');
  });

  it('uses default currency (USD) when not specified', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
  });
});
```

### Mocking

Utilizamos diferentes estrategias de mocking según el contexto:

1. **Mocks de Contextos React**:
   ```tsx
   // AuthContext mock
   vi.mock('@/contexts/AuthContext', () => ({
     useAuth: () => ({
       user: { id: 'test-id', email: 'test@example.com' },
       isAuthenticated: true,
       login: vi.fn(),
       logout: vi.fn()
     })
   }));
   ```

2. **Mocks de Servicios**:
   ```tsx
   // Supabase service mock
   vi.mock('@/lib/supabase', () => ({
     supabase: {
       from: vi.fn().mockReturnThis(),
       select: vi.fn().mockReturnThis(),
       eq: vi.fn().mockReturnThis(),
       single: vi.fn().mockResolvedValue({
         data: { id: 'test-id', title: 'Test Course' },
         error: null
       })
     }
   }));
   ```

3. **Mocks de React Query**:
   ```tsx
   // React Query mock
   vi.mock('@tanstack/react-query', async () => {
     const actual = await vi.importActual('@tanstack/react-query');
     return {
       ...actual,
       useQuery: vi.fn().mockReturnValue({
         data: mockData,
         isLoading: false,
         error: null
       })
     };
   });
   ```

## Pruebas de Integración

Las pruebas de integración validan la interacción entre múltiples componentes y servicios.

### Configuración

Utilizamos React Testing Library para pruebas de integración:

```typescript
// src/test/test-utils.tsx
import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: 0
    },
  },
});

interface AllProvidersProps {
  children: React.ReactNode;
}

const AllProviders = ({ children }: AllProvidersProps) => {
  const testQueryClient = createTestQueryClient();
  
  return (
    <BrowserRouter>
      <QueryClientProvider client={testQueryClient}>
        <AuthProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllProviders, ...options });

// Re-export everything from testing-library
export * from '@testing-library/react';
export { customRender as render };
```

### Ejemplos de Pruebas de Integración

```tsx
// CourseEnrollment.test.tsx
import { render, screen, waitFor, fireEvent } from '../test/test-utils';
import CourseEnrollment from './CourseEnrollment';
import { useCourse } from '@/hooks/useCourse';
import { useEnrollment } from '@/hooks/useEnrollment';
import { vi } from 'vitest';

// Mock custom hooks
vi.mock('@/hooks/useCourse', () => ({
  useCourse: vi.fn()
}));

vi.mock('@/hooks/useEnrollment', () => ({
  useEnrollment: vi.fn()
}));

describe('CourseEnrollment Integration', () => {
  beforeEach(() => {
    vi.mocked(useCourse).mockReturnValue({
      course: {
        id: 'course-1',
        title: 'React Masterclass',
        price: 49.99,
        instructor: {
          id: 'instructor-1',
          name: 'Jane Doe'
        }
      },
      isLoading: false,
      error: null
    });
    
    vi.mocked(useEnrollment).mockReturnValue({
      enroll: vi.fn().mockResolvedValue({ success: true }),
      isEnrolled: false,
      isEnrolling: false,
      error: null
    });
  });

  it('displays course information and enrollment button', () => {
    render(<CourseEnrollment courseId="course-1" />);
    
    expect(screen.getByText('React Masterclass')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('$49.99')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enroll now/i })).toBeInTheDocument();
  });

  it('handles enrollment process', async () => {
    const enrollMock = vi.fn().mockResolvedValue({ success: true });
    vi.mocked(useEnrollment).mockReturnValue({
      enroll: enrollMock,
      isEnrolled: false,
      isEnrolling: false,
      error: null
    });
    
    render(<CourseEnrollment courseId="course-1" />);
    
    const enrollButton = screen.getByRole('button', { name: /enroll now/i });
    fireEvent.click(enrollButton);
    
    expect(enrollMock).toHaveBeenCalledWith('course-1');
    
    await waitFor(() => {
      expect(screen.getByText(/enrollment successful/i)).toBeInTheDocument();
    });
  });

  it('shows loading state during enrollment', async () => {
    let resolveEnroll;
    const enrollPromise = new Promise(resolve => {
      resolveEnroll = resolve;
    });
    
    const enrollMock = vi.fn().mockReturnValue(enrollPromise);
    
    vi.mocked(useEnrollment).mockReturnValue({
      enroll: enrollMock,
      isEnrolled: false,
      isEnrolling: true,
      error: null
    });
    
    render(<CourseEnrollment courseId="course-1" />);
    
    expect(screen.getByRole('button', { name: /enrolling.../i })).toBeDisabled();
    
    // Resolve the enrollment process
    resolveEnroll({ success: true });
    
    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /enrolling.../i })).not.toBeInTheDocument();
    });
  });

  it('displays error message when enrollment fails', async () => {
    vi.mocked(useEnrollment).mockReturnValue({
      enroll: vi.fn().mockRejectedValue(new Error('Enrollment failed')),
      isEnrolled: false,
      isEnrolling: false,
      error: new Error('Enrollment failed')
    });
    
    render(<CourseEnrollment courseId="course-1" />);
    
    const enrollButton = screen.getByRole('button', { name: /enroll now/i });
    fireEvent.click(enrollButton);
    
    await waitFor(() => {
      expect(screen.getByText(/enrollment failed/i)).toBeInTheDocument();
    });
  });

  it('shows already enrolled state for enrolled users', () => {
    vi.mocked(useEnrollment).mockReturnValue({
      enroll: vi.fn(),
      isEnrolled: true,
      isEnrolling: false,
      error: null
    });
    
    render(<CourseEnrollment courseId="course-1" />);
    
    expect(screen.getByText(/already enrolled/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /go to course/i })).toBeInTheDocument();
  });
});
```

## Pruebas End-to-End (E2E)

### Configuración de Cypress

```javascript
// cypress.config.ts
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
  },
  
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
});
```

### Estructura de Pruebas E2E

```
cypress/
├── e2e/
│   ├── auth/
│   │   ├── login.cy.ts
│   │   └── signup.cy.ts
│   ├── courses/
│   │   ├── browse.cy.ts
│   │   └── enrollment.cy.ts
│   └── learning/
│       └── lesson-progress.cy.ts
├── fixtures/
│   ├── courses.json
│   └── users.json
└── support/
    ├── commands.ts
    └── e2e.ts
```

### Comandos Personalizados

```typescript
// cypress/support/commands.ts
import 'cypress-localstorage-commands';

// Login command
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.session([email, password], () => {
    cy.visit('/auth/login');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/home');
    cy.get('[data-testid="user-menu"]').should('exist');
  });
});

// Supabase direct auth
Cypress.Commands.add('supabaseLogin', (email: string, password: string) => {
  cy.request({
    method: 'POST',
    url: Cypress.env('SUPABASE_URL') + '/auth/v1/token?grant_type=password',
    headers: {
      'Content-Type': 'application/json',
      'apikey': Cypress.env('SUPABASE_ANON_KEY'),
    },
    body: { email, password },
  }).then((response) => {
    cy.setLocalStorage('supabase.auth.token', JSON.stringify(response.body));
    cy.setLocalStorage('authToken', response.body.access_token);
  });
});

// Reset database state
Cypress.Commands.add('resetDb', () => {
  if (Cypress.env('ENVIRONMENT') === 'testing') {
    cy.request({
      method: 'POST',
      url: '/api/testing/reset-db',
      headers: {
        'Content-Type': 'application/json',
        'x-test-api-key': Cypress.env('TEST_API_KEY'),
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  }
});
```

### Ejemplos de Pruebas E2E

```typescript
// cypress/e2e/courses/enrollment.cy.ts
describe('Course Enrollment Flow', () => {
  beforeEach(() => {
    cy.resetDb();
    cy.supabaseLogin('student@example.com', 'password123');
  });

  it('allows user to enroll in a free course', () => {
    // Navigate to a specific free course
    cy.visit('/courses/introduction-to-react');
    
    // Check course details are displayed
    cy.get('h1').should('contain', 'Introduction to React');
    cy.get('[data-testid="instructor-name"]').should('contain', 'Jane Doe');
    cy.get('[data-testid="course-price"]').should('contain', 'Free');
    
    // Click the enroll button
    cy.get('[data-testid="enroll-button"]').click();
    
    // Verify successful enrollment
    cy.get('[data-testid="success-message"]').should('be.visible');
    cy.get('[data-testid="success-message"]').should('contain', 'Successfully enrolled');
    
    // Verify redirected to learning area
    cy.url().should('include', '/courses/introduction-to-react/learn');
    
    // Verify course is now in user's courses
    cy.visit('/my-courses');
    cy.get('[data-testid="course-card"]').should('contain', 'Introduction to React');
  });

  it('handles paid course enrollment through checkout', () => {
    // Navigate to a specific paid course
    cy.visit('/courses/advanced-react-patterns');
    
    // Check course details are displayed
    cy.get('h1').should('contain', 'Advanced React Patterns');
    cy.get('[data-testid="course-price"]').should('contain', '$49.99');
    
    // Click the enroll button
    cy.get('[data-testid="enroll-button"]').click();
    
    // Verify redirected to checkout
    cy.url().should('include', '/checkout');
    
    // Fill payment details (mock Stripe in test env)
    cy.get('[data-testid="card-element"]').should('be.visible');
    cy.get('[data-testid="card-number"]').type('4242424242424242');
    cy.get('[data-testid="card-expiry"]').type('1230');
    cy.get('[data-testid="card-cvc"]').type('123');
    
    // Complete purchase
    cy.get('[data-testid="complete-purchase-button"]').click();
    
    // Verify successful purchase
    cy.get('[data-testid="purchase-success"]', { timeout: 10000 }).should('be.visible');
    
    // Verify course added to user's courses
    cy.visit('/my-courses');
    cy.get('[data-testid="course-card"]').should('contain', 'Advanced React Patterns');
  });
  
  it('prevents enrollment in a course user is already enrolled in', () => {
    // Pre-enroll user in a course via API call
    cy.request({
      method: 'POST',
      url: '/api/testing/pre-enroll',
      headers: {
        'Content-Type': 'application/json',
        'x-test-api-key': Cypress.env('TEST_API_KEY'),
      },
      body: {
        courseId: 'introduction-to-react',
        userId: 'test-student-id'
      }
    });
    
    // Visit the course page
    cy.visit('/courses/introduction-to-react');
    
    // Verify user is shown as already enrolled
    cy.get('[data-testid="already-enrolled-message"]').should('be.visible');
    cy.get('[data-testid="go-to-course-button"]').should('be.visible').click();
    
    // Verify redirected to learning area
    cy.url().should('include', '/courses/introduction-to-react/learn');
  });
});
```

## Pruebas de Accesibilidad

### Configuración con axe-core

```typescript
// src/test/a11y-setup.ts
import { configureAxe } from 'jest-axe';

// Configure axe for our needs
export const axe = configureAxe({
  rules: {
    // Custom rule configurations
    'color-contrast': { enabled: true },
    'landmark-one-main': { enabled: true },
    'region': { enabled: false } // Disable specific rules if needed
  }
});
```

### Ejemplo de Prueba de Accesibilidad

```tsx
// Button.a11y.test.tsx
import { render } from '@testing-library/react';
import { axe } from '../test/a11y-setup';
import { Button } from './Button';

describe('Button Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should be keyboard navigable', () => {
    const { getByRole } = render(<Button>Click me</Button>);
    const button = getByRole('button');
    
    // Ensure button is in the tab order
    expect(button).not.toHaveAttribute('tabindex', '-1');
    
    // Ensure button is properly labeled
    expect(button).toHaveAccessibleName('Click me');
  });

  it('should provide accessible name when icon-only', () => {
    const { getByRole } = render(
      <Button aria-label="Close dialog">
        <span aria-hidden="true">×</span>
      </Button>
    );
    
    const button = getByRole('button');
    expect(button).toHaveAccessibleName('Close dialog');
  });
  
  it('should maintain accessible contrast in different states', () => {
    const { getByRole } = render(<Button variant="ghost">Low Contrast</Button>);
    const button = getByRole('button');
    
    // This assumes your design system maintains proper contrast in all variants
    // You would need visual regression or specific contrast calculation tools
    // for truly comprehensive contrast testing
  });
});
```

## Pruebas de Rendimiento

### Lighthouse CI

Configuración de Lighthouse CI para pruebas automatizadas de rendimiento:

```javascript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      url: [
        'http://localhost:5173/',
        'http://localhost:5173/courses',
        'http://localhost:5173/courses/sample-course'
      ],
      settings: {
        preset: 'desktop'
      }
    },
    upload: {
      target: 'temporary-public-storage',
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'interactive': ['error', { maxNumericValue: 3500 }],
        'resource-summary:document:size': ['error', { maxNumericValue: 400000 }],
        'resource-summary:script:size': ['error', { maxNumericValue: 500000 }]
      }
    }
  }
};
```

### React Profiler

Utilizamos React Profiler para identificar problemas de rendimiento en componentes:

```typescript
// src/test/performance-utils.tsx
import React, { Profiler, ProfilerOnRenderCallback } from 'react';

interface PerformanceTrackerProps {
  id: string;
  children: React.ReactNode;
  onRender?: ProfilerOnRenderCallback;
}

const defaultOnRender: ProfilerOnRenderCallback = (
  id, phase, actualDuration, baseDuration, startTime, commitTime
) => {
  console.log(`Component ${id} rendered in ${actualDuration.toFixed(2)}ms`);
  
  // Log longer renders to help identify performance issues
  if (actualDuration > 16) {
    console.warn(`Slow render detected in ${id}: ${actualDuration.toFixed(2)}ms`);
  }
};

export const PerformanceTracker: React.FC<PerformanceTrackerProps> = ({
  id,
  children,
  onRender = defaultOnRender
}) => {
  return (
    <Profiler id={id} onRender={onRender}>
      {children}
    </Profiler>
  );
};
```

### Pruebas de Carga

Para secciones críticas, utilizamos pruebas de carga con react-window y similares:

```tsx
// LargeDataTable.performance.test.tsx
import { render, screen } from '@testing-library/react';
import { CourseList } from './CourseList';
import { vi, beforeEach, describe, it, expect } from 'vitest';
import { generateMockCourses } from '../test/mocks/courseData';

describe('CourseList Performance', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders 1000 courses efficiently', () => {
    const mockCourses = generateMockCourses(1000);
    
    const start = performance.now();
    render(<CourseList courses={mockCourses} />);
    const end = performance.now();
    
    // Should render in under 100ms
    expect(end - start).toBeLessThan(100);
    
    // Should use virtualization for large lists
    expect(document.querySelectorAll('[data-testid="course-item"]').length).toBeLessThan(50);
    
    // Initial rendering should show first page items
    expect(screen.getByText(mockCourses[0].title)).toBeInTheDocument();
  });

  it('efficiently updates when filtering large dataset', () => {
    const mockCourses = generateMockCourses(1000);
    
    const { getByPlaceholderText } = render(<CourseList courses={mockCourses} />);
    
    const filterInput = getByPlaceholderText('Search courses...');
    
    const start = performance.now();
    fireEvent.change(filterInput, { target: { value: 'React' } });
    
    // Allow for debounced search to complete
    vi.runAllTimers();
    
    const end = performance.now();
    
    // Filtering should be quick
    expect(end - start).toBeLessThan(50);
    
    // Should still use virtualization after filtering
    expect(document.querySelectorAll('[data-testid="course-item"]').length).toBeLessThan(50);
  });
});
```

## Métricas de Cobertura

### Configuración de Cobertura

```javascript
// vitest.config.ts (extract of coverage config)
coverage: {
  provider: 'c8',
  reporter: ['text', 'json', 'html', 'lcov'],
  exclude: [
    'src/types/**',
    '**/*.d.ts',
    'src/test/**',
    'src/mocks/**',
    '**/index.ts',
    'src/main.tsx',
    'src/vite-env.d.ts',
  ],
  branches: 80,
  functions: 85,
  lines: 85,
  statements: 85
}
```

### Objetivos de Cobertura

| Tipo de Código | Cobertura Mínima |
|----------------|------------------|
| Componentes UI | 90% |
| Hooks | 95% |
| Utilidades | 100% |
| Páginas | 80% |
| Global | 85% |

### Informes de Cobertura

Los informes de cobertura se generan automáticamente en cada build y están disponibles en:

- `/coverage/index.html` - Informe HTML detallado
- CI/CD Dashboard - Tendencias de cobertura
- Pull Requests - Cambios de cobertura

## Integración Continua

### Configuración de CI para Testing

```yaml
# .github/workflows/test.yml
name: Test

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Lint
        run: npm run lint
        
      - name: Type check
        run: npm run type-check
        
      - name: Unit & Integration tests
        run: npm run test:coverage
        
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          token: ${{ secrets.CODECOV_TOKEN }}
          
      - name: Build
        run: npm run build
        
      - name: Start app for E2E tests
        run: npm run preview &
        
      - name: Run E2E tests
        run: npm run test:e2e
        
      - name: Lighthouse CI
        run: npm run test:lighthouse
```

## Gestión de Bugs y Regresiones

### Proceso para Corregir un Bug

1. **Reproducir**:
   - Crear una prueba que reproduzca el bug
   - Documentar las condiciones exactas del fallo

2. **Corregir**:
   - Implementar la solución
   - Verificar que la prueba ahora pasa

3. **Prevenir Regresiones**:
   - Añadir pruebas adicionales para casos límite
   - Documentar la corrección para referencia futura

### Ejemplo de Prueba de Regresión

```tsx
// EnrollButton.regression.test.tsx - Ejemplo de prueba tras un bug
import { render, fireEvent, screen } from '@testing-library/react';
import { EnrollButton } from './EnrollButton';
import { describe, it, expect, vi } from 'vitest';

describe('EnrollButton - Regression Tests', () => {
  // This test was added after bug #123
  // The button was allowing multiple clicks during enrollment process
  it('prevents multiple clicks during enrollment process', async () => {
    const mockEnroll = vi.fn().mockImplementation(() => {
      return new Promise(resolve => setTimeout(() => resolve({ success: true }), 500));
    });
    
    render(<EnrollButton courseId="test-id" onEnroll={mockEnroll} />);
    
    const button = screen.getByRole('button', { name: /enroll now/i });
    
    // First click should trigger enrollment
    fireEvent.click(button);
    expect(mockEnroll).toHaveBeenCalledTimes(1);
    expect(button).toBeDisabled();
    
    // Second click should not trigger another enrollment
    fireEvent.click(button);
    expect(mockEnroll).toHaveBeenCalledTimes(1);
    
    // After enrollment completes, button should show success
    await screen.findByText(/enrolled/i);
    expect(button).toBeDisabled();
  });

  // This test was added after bug #157
  // The button was not showing error state when enrollment failed
  it('shows error state when enrollment fails', async () => {
    const mockEnroll = vi.fn().mockRejectedValue(new Error('Network error'));
    
    render(<EnrollButton courseId="test-id" onEnroll={mockEnroll} />);
    
    const button = screen.getByRole('button', { name: /enroll now/i });
    fireEvent.click(button);
    
    // Should show error message
    const errorMessage = await screen.findByText(/failed to enroll/i);
    expect(errorMessage).toBeInTheDocument();
    
    // Button should be re-enabled to allow retry
    expect(button).not.toBeDisabled();
    expect(button).toHaveTextContent(/try again/i);
  });
});
```

## Resumen de Herramientas de Testing

| Categoría | Herramientas Principales | Propósito |
|-----------|--------------------------|-----------|
| Test Runner | Vitest | Ejecución de pruebas unitarias y de integración |
| Testing Library | React Testing Library | Pruebas centradas en el usuario |
| Mocking | Vitest, MSW | Simular dependencias externas |
| E2E | Cypress | Pruebas de flujos completos de usuario |
| Accesibilidad | axe-core, jest-axe | Pruebas de accesibilidad |
| Rendimiento | Lighthouse CI, React Profiler | Métricas de rendimiento |
| Cobertura | c8 | Informes de cobertura de código |
| CI/CD | GitHub Actions | Automatización de pruebas |

## Mejores Prácticas

### Recomendaciones Generales

1. **Escribir pruebas primero** (TDD) cuando sea posible
2. **Probar comportamiento, no implementación**
3. **Usar fixtures y factories** para datos de prueba
4. **Minimizar dependencias externas** en pruebas unitarias
5. **Mantener pruebas rápidas** para feedback inmediato
6. **Crear pruebas significativas** que aporten valor
7. **Adoptar herramientas de calidad** como ESLint y TypeScript
8. **Automatizar todo** en la pipeline de CI/CD
