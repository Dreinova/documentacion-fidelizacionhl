# Configuración general

`/admin/settings` (solo rol `admin`) edita la tabla `settings` (key/value, cacheada — el helper global `setting('clave', $default)` lee de ahí). Claves que el sistema realmente usa hoy:

| Clave | Para qué | Default |
|---|---|---|
| `cop_per_point` | Tasa COP ↔ puntos. Define tanto los puntos otorgados por una venta como el precio en puntos de cada premio. | `100` |
| `min_points_percentage` | % mínimo del total que debe pagarse en puntos en un pago mixto (ver [Catálogo de premios](/docs/portal-pacientes/catalogo-de-premios)). | `10` |
| `points_expiration_months` | Meses de vigencia de un lote de puntos antes de vencer. | `12` |
| `abandoned_checkout_timeout_minutes` | Minutos tras los cuales un checkout mixto sin confirmar se cancela y libera los puntos reservados. | — |
| `management_notification_email` | Correo de gerencia que recibe copia de cada canje aprobado. | `gerencia@harkerlloreda.com` |

Cambiar `cop_per_point` o `min_points_percentage` tiene efecto inmediato sobre todo el catálogo y sobre cualquier checkout en curso (el servidor siempre recalcula los límites al momento del canje, nunca confía en un valor que llega del navegador), así que son los valores más sensibles de toda la configuración.

![Pantalla de Configuración general](/img/screens/admin-settings.png)
