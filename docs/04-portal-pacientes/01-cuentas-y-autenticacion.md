# Cuentas y autenticación

El portal usa el guard **`patient`**, con cuentas propias de Laravel — totalmente independientes de WordPress y de Oreka. Dos orígenes posibles (`patients.registration_source`):

- **`manual_admin`** — el paciente lo crea el staff desde el superadmin (ver [Pacientes y ventas](/docs/modulo-admin/pacientes-y-ventas)). Password inicial = número de documento, `must_change_password = true`.
- **`self_registered`** — el paciente se registra él mismo desde `/registro`.

## Cambio de password obligatorio

`App\Http\Middleware\EnsurePatientPasswordChanged` intercepta cualquier ruta autenticada del portal, salvo `/cambiar-password` y logout, y redirige ahí mientras `must_change_password` siga en `true`:

```php
if ($patient && $patient->must_change_password && ! $request->routeIs('portal.password.*', 'portal.logout')) {
    return redirect()->route('portal.password.edit');
}
```

Esto evita que un paciente use nunca el portal con el password predecible (su propio número de documento) que el staff le asignó al crearlo manualmente.

## Rutas (`routes/portal.php`)

```php
// Invitados únicamente, con throttle.
Route::middleware('guest:patient')->group(function () {
    Route::view('/login', 'portal.login')->middleware('throttle:20,1');
    Route::view('/registro', 'portal.register')->middleware('throttle:20,1');
});

// Autenticado y con password ya cambiada: el resto del portal.
Route::middleware(['auth:patient', 'patient.password_changed'])->group(function () {
    Route::view('/mi-cuenta', 'portal.dashboard');
    Route::view('/premios', 'portal.rewards.index');
    // ...
});
```

Login y registro son componentes Livewire de un solo archivo montados en vistas simples vía `Route::view` — no hay controladores dedicados para ellos. El rate limiting (`RateLimiter` de Laravel, llamado directamente dentro del método del componente) protege el login contra fuerza bruta, porque las llamadas AJAX de Livewire no pasan por el middleware `throttle` de rutas normales.

![Formulario de login del portal](/img/screens/portal-login.png)

:::info Captura pendiente
Pantalla forzada de "Cambiar contraseña" en el primer ingreso (paciente con `must_change_password = true`). Guardar en `static/img/screens/portal-cambiar-password.png`.
:::
