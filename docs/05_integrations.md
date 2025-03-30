
# Integraciones Externas

Este documento describe las integraciones con servicios externos utilizadas en Nexo Learning Platform, sus configuraciones y patrones de uso.

## Supabase

[Supabase](https://supabase.io/) es la plataforma backend principal que proporciona base de datos, autenticación, almacenamiento y funciones serverless.

### Cliente JavaScript

El cliente de Supabase se inicializa en `src/lib/supabase.ts` y se exporta para su uso en toda la aplicación:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

Uso típico:

```typescript
import { supabase } from '@/lib/supabase';

// Ejemplo: Consulta a la base de datos
const { data, error } = await supabase
  .from('courses')
  .select('*')
  .eq('is_published', true);
```

### Autenticación

Supabase Auth se utiliza para toda la gestión de usuarios y sesiones:

- **Registro**: `supabase.auth.signUp()`
- **Login**: `supabase.auth.signInWithPassword()`
- **Logout**: `supabase.auth.signOut()`
- **Recuperación de contraseña**: `supabase.auth.resetPasswordForEmail()`
- **Estado de sesión**: `supabase.auth.getSession()`

El contexto `AuthContext` encapsula esta funcionalidad para toda la aplicación.

### Base de Datos

PostgreSQL es accesible a través del cliente Supabase:

- **Consultas**: `supabase.from('table').select()`
- **Inserciones**: `supabase.from('table').insert()`
- **Actualizaciones**: `supabase.from('table').update().eq()`
- **Eliminaciones**: `supabase.from('table').delete().eq()`
- **RPC**: `supabase.rpc('function_name', params)`

### Storage

Para almacenamiento de archivos como imágenes de perfil, contenido de cursos, etc.:

- **Upload**: `supabase.storage.from('bucket').upload()`
- **Download**: `supabase.storage.from('bucket').download()`
- **Obtener URL pública**: `supabase.storage.from('bucket').getPublicUrl()`

### Edge Functions

Funciones serverless para lógica de backend compleja:

- **Invocación**: `supabase.functions.invoke('function_name', { data })`
- **Ubicación**: `/supabase/functions/[function_name]/index.ts`

## Stripe

[Stripe](https://stripe.com/) se utiliza para procesamiento de pagos de cursos y suscripciones.

### Configuración

```typescript
import Stripe from 'stripe';

const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});
```

### Flujo de Pago

1. **Cliente**: Crea sesión de checkout
   ```typescript
   const { data } = await supabase.functions.invoke('create-checkout-session', {
     body: { courseId, priceId, successUrl, cancelUrl }
   });
   ```

2. **Edge Function**: Procesa la solicitud con Stripe
   ```typescript
   // En supabase/functions/create-checkout-session/index.ts
   const session = await stripe.checkout.sessions.create({
     payment_method_types: ['card'],
     line_items: [{ price: priceId, quantity: 1 }],
     mode: 'payment',
     success_url: successUrl,
     cancel_url: cancelUrl,
   });
   ```

3. **Webhook**: Maneja eventos de pago
   ```typescript
   // En supabase/functions/stripe-webhook/index.ts
   const event = stripe.webhooks.constructEvent(
     request.body,
     signature,
     webhookSecret
   );
   
   if (event.type === 'checkout.session.completed') {
     // Procesar pago exitoso
   }
   ```

### Productos y Precios

La sincronización de productos y precios se realiza mediante:
- Stripe Dashboard para configuración inicial
- Webhooks para actualización automática
- Edge Functions para operaciones específicas

## SendGrid

[SendGrid](https://sendgrid.com/) se utiliza para envío de emails transaccionales y marketing.

### Configuración

```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(Deno.env.get('SENDGRID_API_KEY'));
```

### Tipos de Emails

1. **Transaccionales**:
   - Confirmación de registro
   - Recuperación de contraseña
   - Recibos de compra
   - Notificaciones de sistema

2. **Marketing/Educacionales**:
   - Bienvenida a nuevos usuarios
   - Anuncios de nuevos cursos
   - Recordatorios de progreso
   - Boletines informativos

### Plantillas de Email

Las plantillas se definen en `/supabase/functions/send-email/templates/` y utilizan React Email para la generación de HTML.

## Otras APIs

### Unsplash

Integración para obtener imágenes de stock para cursos:

```typescript
const getRandomImage = async (query) => {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?query=${query}&client_id=${unsplashKey}`
  );
  return response.json();
};
```

### OpenAI

Integración para generación de contenido y asistencia:

```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: Deno.env.get('OPENAI_API_KEY'),
});

const generateDescription = async (courseTitle) => {
  const completion = await openai.chat.completions.create({
    messages: [
      { 
        role: 'system', 
        content: 'Generate a compelling course description.' 
      },
      { 
        role: 'user', 
        content: `Course title: ${courseTitle}` 
      }
    ],
    model: 'gpt-3.5-turbo',
  });
  
  return completion.choices[0].message.content;
};
```

## Buenas Prácticas

### Gestión de Claves API
- Todas las claves API se almacenan como variables de entorno
- Se utilizan clientes restricted-key cuando es posible
- Las claves secretas nunca se exponen al frontend

### Manejo de Errores
- Todas las llamadas a APIs externas incluyen manejo de errores
- Se implementan reintentos para fallos temporales
- Se registran errores de integración para diagnóstico

### Cacheo y Rendimiento
- Se implementa caché para respuestas frecuentes
- Las operaciones costosas se ejecutan en segundo plano
- Se optimizan payloads para minimizar transferencia de datos
