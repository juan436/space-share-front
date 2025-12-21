# Features

Esta carpeta contiene los módulos de negocio de la UI, organizados por funcionalidad.

## Estructura

```
features/
  auth/                    # Autenticación (login, registro)
    LoginForm.tsx
    RegisterForm.tsx
    hooks/
      useLoginForm.ts
      useRegisterForm.ts
  
  dashboard/               # Dashboards por rol
    host/                  # Dashboard de anfitrión
      HostDashboard.tsx
      components/
        SpacesTable.tsx
        AddSpaceDialog.tsx
      hooks/
        useHostDashboard.ts
    
    user/                  # Dashboard de cliente
      UserDashboard.tsx
      components/
      hooks/
```

## Patrones

- **Componentes raíz**: Componente principal del módulo (ej: `HostDashboard.tsx`)
- **components/**: Piezas reutilizables de UI específicas del módulo
- **hooks/**: Lógica de presentación específica del módulo
- **types/**: Tipos específicos del módulo (si aplica)

## Reglas

1. Los componentes en `features/` pueden importar de:
   - `@/presentation/components/ui/*` (componentes base)
   - `@/presentation/hooks/*` (hooks globales)
   - `@/presentation/providers/*` (contextos)
   - `@/core/domain/entities/*` (tipos de dominio)

2. Las páginas en `app/` solo importan y renderizan componentes de `features/`

3. La lógica de negocio compleja va en hooks dentro de cada feature
