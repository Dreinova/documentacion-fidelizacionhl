# Pacientes y ventas

## Registrar un paciente

Desde **Pacientes → Registrar paciente**, cualquier `admin` o `asesor` crea un registro en `patients` con `registration_source = manual_admin`. El password inicial es el número de documento, con `must_change_password = true` — el paciente lo cambia en su primer login al portal (ver [Cuentas y autenticación](/docs/portal-pacientes/cuentas-y-autenticacion)).

Esta tabla es **independiente del maestro de pacientes de Oreka** (el CRM legado que ya guarda documento/teléfono/correo) — decisión deliberada para no acoplar el checkout/puntos a un sistema con autenticación insegura (MD5 sin hash seguro).

![Pacientes: registro inline + listado](/img/screens/admin-patients-index.png)

No hay una vista de "detalle de paciente" separada — `/admin/patients` es una única pantalla con el formulario de alta y el listado/búsqueda, sin una página individual por paciente todavía.

## Registrar una venta → generación de puntos

Desde **Ventas → Registrar venta**, el componente Livewire `⚡sale-manager` toma la tasa vigente `cop_per_point` (configurable, por defecto 100 COP/punto) y calcula:

```php
$exchangeRate = (float) setting('cop_per_point', 100);
$pointsAwarded = (int) floor($amountCop / $exchangeRate);

Sale::create([
    'patient_id' => $patient->id,
    'admin_user_id' => $adminUser->id,
    'amount_cop' => $amountCop,
    'exchange_rate_applied' => $exchangeRate, // snapshot: si la tasa cambia después, esta venta no se recalcula
    'points_awarded' => $pointsAwarded,
    'sale_date' => $saleDate,
]);
```

La tasa se **congela como snapshot** en `sales.exchange_rate_applied` en el momento de la venta — si Configuración cambia la tasa después, las ventas ya registradas no se recalculan, solo las nuevas.

Al guardar la venta, se crea el lote de puntos correspondiente con vencimiento a `points_expiration_months` desde hoy (ver [Configuración general](/docs/modulo-admin/configuracion-general)).

![Formulario de "Registrar venta"](/img/screens/admin-sale-manager.png)
