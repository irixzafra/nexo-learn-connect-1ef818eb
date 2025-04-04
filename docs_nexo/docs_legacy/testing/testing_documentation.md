
# Estrategia de Pruebas - Nexo Learning Platform

## Resumen Ejecutivo

Este documento detalla la estrategia de pruebas implementada en la plataforma Nexo Learning, abarcando todos los niveles de pruebas, herramientas utilizadas y procesos para garantizar la calidad del software.

## Niveles de Pruebas

### 1. Pruebas Unitarias

#### Herramientas
- **Jest**: Framework principal para pruebas unitarias en JavaScript/TypeScript
- **React Testing Library**: Para probar componentes React de forma aislada
- **Vitest**: Utilizado para pruebas unitarias rápidas en el entorno de Vite

#### Cobertura Objetivo
- **Componentes UI**: 85% de cobertura
- **Utilidades y Helpers**: 90% de cobertura
- **Hooks Personalizados**: 90% de cobertura

#### Enfoque
- Pruebas de funciones puras (entrada → salida)
- Pruebas de renderizado de componentes
- Pruebas de hooks personalizados
- Mocking de dependencias externas

#### Ejemplos
```typescript
// Ejemplo de prueba unitaria para un componente
describe('Button Component', () => {
  it('renders correctly with default props', () => {
    const { getByRole } = render(<Button>Click me</Button>);
    const button = getByRole('button');
    
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click me');
  });
  
  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(
      <Button onClick={handleClick}>Click me</Button>
    );
    
    fireEvent.click(getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### 2. Pruebas de Integración

#### Herramientas
- **Jest**: Como runner de pruebas
- **React Testing Library**: Para pruebas de componentes integrados
- **MSW (Mock Service Worker)**: Para simular API endpoints

#### Enfoque
- Pruebas de interacción entre componentes
- Pruebas de flujos de datos a través de múltiples componentes
- Pruebas de integración con contextos y proveedores
- Simulación de respuestas de API

#### Cobertura Objetivo
- 75% de cobertura para flujos críticos (autenticación, inscripción, compras)

#### Ejemplos
```typescript
// Ejemplo de prueba de integración para un formulario de login
describe('Login Flow', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  
  it('allows a user to login successfully', async () => {
    server.use(
      rest.post('/api/login', (req, res, ctx) => {
        return res(
          ctx.json({
            user: { id: 1, name: 'Test User' },
            token: 'fake-token'
          })
        );
      })
    );
    
    const { getByLabelText, getByRole, findByText } = render(
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    );
    
    fireEvent.change(getByLabelText(/email/i), {
      target: { value: 'user@example.com' }
    });
    
    fireEvent.change(getByLabelText(/password/i), {
      target: { value: 'password123' }
    });
    
    fireEvent.click(getByRole('button', { name: /login/i }));
    
    expect(await findByText(/welcome/i)).toBeInTheDocument();
  });
});
```

### 3. Pruebas End-to-End (E2E)

#### Herramientas
- **Cypress**: Herramienta principal para pruebas E2E
- **Playwright**: Para pruebas en múltiples navegadores

#### Enfoque
- Pruebas de flujos completos de usuario (registro, compra, completar curso)
- Pruebas en múltiples navegadores
- Pruebas de experiencia de usuario (UX)
- Pruebas de rendimiento de carga de página

#### Cobertura
- 100% de cobertura para flujos críticos de negocio
- 80% para flujos secundarios

#### Ejemplos
```javascript
// Ejemplo de prueba E2E en Cypress
describe('Course Enrollment Flow', () => {
  beforeEach(() => {
    cy.login('student@example.com', 'password123');
  });
  
  it('allows a student to enroll in a free course', () => {
    // Navegar al catálogo de cursos
    cy.visit('/courses');
    
    // Seleccionar un curso gratuito
    cy.get('[data-testid="course-card"]')
      .contains('Free Course')
      .click();
    
    // Verificar página de detalles del curso
    cy.url().should('include', '/courses/');
    
    // Hacer clic en el botón de inscripción
    cy.get('[data-testid="enroll-button"]').click();
    
    // Verificar inscripción exitosa
    cy.get('[data-testid="success-message"]')
      .should('be.visible')
      .and('contain', 'enrolled successfully');
    
    // Verificar que el curso aparece en "Mis Cursos"
    cy.visit('/my-courses');
    cy.get('[data-testid="my-course-list"]')
      .should('contain', 'Free Course');
  });
});
```

## Automatización y CI/CD

### Integración con Pipeline CI/CD
- **Pruebas Unitarias y de Integración**: Ejecutadas en cada Pull Request
- **Pruebas E2E**: Ejecutadas diariamente y antes de cada despliegue a producción
- **Análisis de Cobertura**: Generado automáticamente y publicado en cada build

### Configuración
```yaml
# Ejemplo de configuración en GitHub Actions
name: Test Suite

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  unit-integration:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Run unit tests
        run: npm run test:unit
      - name: Run integration tests
        run: npm run test:integration
      - name: Upload coverage
        uses: codecov/codecov-action@v3

  e2e:
    runs-on: ubuntu-latest
    needs: unit-integration
    if: github.event_name == 'push' || github.event.pull_request.base.ref == 'main'
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Run E2E tests
        run: npm run test:e2e
```

## Informes y Monitoreo de Calidad

### Herramientas
- **CodeCov**: Para análisis de cobertura de código
- **SonarQube**: Para análisis estático y calidad de código
- **Allure**: Para reportes visuales de resultados de pruebas

### Métricas Clave
- Cobertura de código (% total, por módulo)
- Tasa de éxito de pruebas (% pruebas que pasan)
- Tiempo de ejecución del suite de pruebas
- Defectos encontrados por severidad
- Deuda técnica

## Estrategia de Datos de Prueba

### Enfoques
- **Datos Generados**: Generación aleatoria pero consistente de datos para pruebas
- **Fixtures**: Datos estáticos predefinidos para escenarios comunes
- **Factories**: Generadores de datos personalizables para diferentes escenarios
- **Datos de Producción Anonimizados**: Para pruebas de rendimiento

### Ejemplo de Factory de Datos
```typescript
// Ejemplo de factory para generar usuarios de prueba
const createTestUser = (overrides = {}) => ({
  id: faker.string.uuid(),
  email: faker.internet.email(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  role: 'student',
  createdAt: faker.date.recent(),
  ...overrides
});

// Uso
const adminUser = createTestUser({ role: 'admin' });
const premiumStudent = createTestUser({ 
  role: 'student',
  subscription: 'premium'
});
```

## Mejores Prácticas

1. **Mantenibilidad**: Uso de Page Object Pattern en pruebas E2E
2. **Rendimiento**: Paralelización de ejecución de pruebas
3. **Determinismo**: Aislamiento de pruebas (sin dependencias entre pruebas)
4. **Claridad**: Nomenclatura descriptiva de pruebas (Given-When-Then)
5. **Localidad**: Mantener los datos de prueba cerca del código de prueba

## Proceso de Desarrollo Basado en Pruebas

1. **TDD (Test-Driven Development)**: Para desarrollo de lógica de negocio compleja
2. **BDD (Behavior-Driven Development)**: Para flujos de usuario y requerimientos funcionales
3. **Shift-Left Testing**: Incorporación temprana de pruebas en el ciclo de desarrollo

## Anexos
- Estructura de directorios de pruebas
- Guía para escribir pruebas efectivas
- Plantillas para casos de prueba
