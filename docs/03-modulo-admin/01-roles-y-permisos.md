# Roles y permisos

`admin_users` solo tiene dos roles, reflejo cacheado del rol de WordPress en cada login (vía el inicio de sesión único con el WordPress de la clínica):

| Rol interno | Rol en WordPress | Acceso |
|---|---|---|
| `admin` | `administrator` | Total: catálogo, premios, config, banners, T&C, pacientes, ventas |
| `asesor` | `asesor_fidelizacion` (rol creado por el plugin SSO) | Solo pacientes y ventas |

La restricción se aplica con el middleware `admin.role:...` (`App\Http\Middleware\EnsureAdminRole`), declarativamente en `routes/admin.php`:

```php
// Pacientes y ventas: admin y asesor.
Route::middleware('admin.role:admin,asesor')->group(function () {
    Route::view('/patients', 'admin.patients.index')->name('patients.index');
    Route::view('/sales', 'admin.sales.index')->name('sales.index');
});

// Solo admin: catálogo, premios, config, banners, T&C.
Route::middleware('admin.role:admin')->group(function () {
    Route::view('/procedures', 'admin.procedures.index')->name('procedures.index');
    Route::view('/settings', 'admin.settings.edit')->name('settings.edit');
    // ...
});
```

Si el `admin_user` no existe, no está activo (`is_active = false`), o no tiene sesión, el middleware redirige a `/admin/sso/start` en vez de dar un 403 — solo da 403 cuando sí hay sesión pero el rol no alcanza.

Un `admin_user` se marca `is_active = false` de inmediato cuando cambia de rol o se borra en WordPress, en vez de esperar a que expire el TTL de la sesión (240 minutos por defecto).

![Error 403 al entrar como asesor a una sección solo-admin](/img/screens/admin-403-asesor.png)

Nótese que es la página de error 403 nativa de Laravel, sin estilo propio — pendiente de una vista `resources/views/errors/403.blade.php` con el branding del proyecto si se quiere una experiencia más cuidada para el staff.
