
# Routes Documentation

This document provides a comprehensive overview of the application's routing structure, organization principles, and best practices for route management.

## Route Organization

The application uses a hierarchical routing structure:

- **Public Routes**: Accessible to all users without authentication
- **User Routes**: Require user authentication
- **Instructor Routes**: Limited to users with instructor privileges
- **Admin Routes**: Limited to administrators

## Route Definitions

Routes are centrally defined in `src/utils/routeUtils.ts` to ensure consistency across the application. Always reference routes using the `routeMap` object rather than hardcoding paths.

Example:
```typescript
import { routeMap } from '@/utils/routeUtils';

// Correct way to reference routes
navigateTo(routeMap.dashboard);

// For dynamic routes
navigateTo(routeMap.courseDetail('course-123'));
```

## Route Validation

The application includes route validation tools to identify potential issues:

1. **Broken Links**: Routes that don't correspond to any defined page
2. **Duplicate Routes**: Multiple route definitions pointing to the same path
3. **Missing Role Checks**: Admin routes without proper role verification
4. **Deprecated Routes**: Routes marked for removal in future versions

Run route validation using the admin tools at `/admin/route-validator`.

## Redirects

For URL shortening or handling legacy routes, use the redirect system:

- `/r/:path` - General purpose redirector
- `/redirect/:path` - Verbose redirector with tracking

Example: `/r/dashboard` will redirect to the actual dashboard path.

## Not Found Handling

When a user navigates to a non-existent route:

1. The 404 page is displayed with navigation options
2. The error is logged (and optionally reported to analytics)
3. The user is given options to return to a valid page

## Best Practices

1. **Use Route Constants**: Always use `routeMap` instead of hardcoded paths
2. **Component Linking**: Use `<SafeLink>` component for validated links
3. **Route Naming**: Follow consistent naming conventions
4. **Dynamic Routes**: Use parameters with type constraints
5. **Route Documentation**: Document complex route structures

## Route Testing

Routes should be tested to ensure they:

1. Render the correct component
2. Apply appropriate layouts
3. Enforce authentication and authorization
4. Handle parameters correctly
5. Redirect as expected when needed

## Navigation Structure

See `MAPA_DE_RUTAS.md` for a visual representation of the application's navigation structure and route status.
