
# Guía de Testing

## Visión General

Esta guía establece las directrices y mejores prácticas para testing en el proyecto Nexo Learning. Su objetivo es asegurar una cobertura adecuada de pruebas y mantener la calidad del código a medida que la aplicación crece.

## Tipos de Pruebas

### 1. Pruebas Unitarias

Prueban componentes individuales o funciones aisladas.

**Herramientas**:
- Vitest
- React Testing Library

**Convenciones**:
- Archivos: `*.test.ts` o `*.test.tsx`
- Ubicación: Junto al archivo a probar o en carpeta `__tests__`

**Ejemplo**:

```typescript
// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### 2. Pruebas de Integración

Prueban la interacción entre múltiples componentes o funciones.

**Herramientas**:
- Vitest
- React Testing Library
- MSW (para mocking de API)

**Ejemplo**:

```typescript
// CourseCard.integration.test.tsx
import { render, screen } from '@testing-library/react';
import { CourseCard } from './CourseCard';
import { CourseProvider } from '../context/CourseContext';

describe('CourseCard integration', () => {
  it('displays course information correctly within context', () => {
    const course = {
      id: '123',
      title: 'React Basics',
      description: 'Learn React fundamentals',
      price: 49.99
    };

    render(
      <CourseProvider>
        <CourseCard course={course} />
      </CourseProvider>
    );

    expect(screen.getByText('React Basics')).toBeInTheDocument();
    expect(screen.getByText('Learn React fundamentals')).toBeInTheDocument();
    expect(screen.getByText('$49.99')).toBeInTheDocument();
  });
});
```

### 3. Pruebas End-to-End (E2E)

Prueban flujos completos de usuario en la aplicación.

**Herramientas**:
- Playwright

**Ubicación**:
- `/e2e-tests/`

**Ejemplo**:

```typescript
// login.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Login flow', () => {
  test('successful login redirects to dashboard', async ({ page }) => {
    await page.goto('/auth/login');
    
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    
    // Verify redirect to dashboard
    await expect(page).toHaveURL('/app/dashboard');
    
    // Verify user is logged in
    await expect(page.locator('.user-avatar')).toBeVisible();
  });
});
```

## Estructura de Pruebas

### Organización por Características

Las pruebas se organizan siguiendo la estructura de características del proyecto:

```
/src
  /features
    /courses
      /components
        CourseCard.tsx
        CourseCard.test.tsx
      /hooks
        useCourses.ts
        useCourses.test.ts
```

### Mocks y Fixtures

- Mocks de servicios en `/src/mocks/`
- Datos de prueba (fixtures) en `/src/__fixtures__/`
- Utilidades para testing en `/src/testing-utils/`

## Mejores Prácticas

### Pruebas Unitarias

1. **Principio AAA**: Arrange (preparar), Act (actuar), Assert (verificar)
2. **Aislar dependencias**: Usar mocks para APIs, servicios, etc.
3. **Probar comportamiento, no implementación**: Enfocarse en lo que hace, no en cómo lo hace
4. **Tests legibles**: Nombres descriptivos, setup claro, assertions específicas

### Componentes React

1. **Render Testing**: Verificar que renderiza correctamente
2. **Comportamiento de Usuario**: Probar respuesta a interacciones (click, input, etc.)
3. **Props y Estados**: Verificar cambios según props y estados
4. **Errores/Casos Borde**: Probar casos de error, datos ausentes, etc.

### Hooks Personalizados

1. **Usar renderHook**: Para probar hooks fuera de componentes
2. **Verificar Estado Inicial**: Comprobar valores iniciales
3. **Probar Actualizaciones**: Verificar cambios al llamar funciones
4. **Mock de Contextos**: Para hooks que usan contextos

### Pruebas de API

1. **Mock de Respuestas**: Usar MSW para simular respuestas del servidor
2. **Casos Exitosos y Errores**: Probar respuestas exitosas y errores
3. **Verificar Cache**: Para hooks que utilizan React Query

## Cobertura de Pruebas

### Objetivos de Cobertura

- **Componentes UI críticos**: >90%
- **Hooks y lógica de negocio**: >85% 
- **Utilidades**: >80%
- **Cobertura global**: >75%

### Ejecutar Informe de Cobertura

```bash
pnpm test:coverage
```

## Pruebas en CI/CD

Las pruebas se ejecutan automáticamente en nuestro pipeline de CI/CD:

1. **Pull Request**: 
   - Pruebas unitarias y de integración
   - Verificación de cobertura

2. **Merge a `develop`**:
   - Pruebas unitarias y de integración
   - Pruebas E2E básicas en staging

3. **Merge a `main`** (producción):
   - Suite completa de pruebas E2E

## Mocking Supabase

### Ejemplo Básico

```typescript
import { render, screen } from '@testing-library/react';
import { supabase } from '@/lib/supabase';
import { CoursesList } from './CoursesList';

// Mock Supabase
vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    data: [
      { id: '1', title: 'Course 1' },
      { id: '2', title: 'Course 2' }
    ],
    error: null
  }
}));

test('renders courses from Supabase', async () => {
  render(<CoursesList />);
  
  // Verify courses are rendered
  expect(await screen.findByText('Course 1')).toBeInTheDocument();
  expect(screen.getByText('Course 2')).toBeInTheDocument();
});
```

## Resolución de Problemas Comunes

### Tests Inconsistentes

- **Problema**: Tests que fallan intermitentemente
- **Solución**: 
  - Evitar dependencias entre tests
  - Limpiar estado entre tests
  - Aumentar timeouts para operaciones asíncronas

### Mocks que No Funcionan

- **Problema**: Mocks no son utilizados
- **Solución**:
  - Verificar import path exacto
  - Usar `vi.mock()` antes de imports
  - Comprobar hoisting de mocks

## Recursos Adicionales

- [Documentación de Vitest](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright](https://playwright.dev/)
- [MSW - Mock Service Worker](https://mswjs.io/)
