# Catálogo y premios

## Procedimientos (`/admin/procedures`)

CRUD simple: nombre, descripción, `points_price`, `is_active`. Es el catálogo de servicios de la clínica — no interviene directamente en el cálculo de puntos de una venta (eso usa `cop_per_point` sobre el monto, no el `points_price` del procedimiento), pero sirve de referencia al registrar la venta.

## Premios (`/admin/rewards`) y categorías (`/admin/reward-categories`)

`price_cop` es la **única fuente de verdad** del precio de un premio. El equivalente en puntos nunca se guarda ni se duplica — se deriva en caliente:

```php
// App\Models\Reward::pointsEquivalent()
public function pointsEquivalent(): int
{
    $copPerPoint = (float) setting('cop_per_point', 100);

    return (int) ceil($this->price_cop / max($copPerPoint, 0.01));
}
```

Esto significa que si **Configuración** cambia la tasa `cop_per_point`, el precio en puntos de todo el catálogo se actualiza automáticamente en la siguiente carga — sin migraciones ni recálculos masivos.

Estructura del premio:

- `reward_categories` — jerárquica (categoría → subcategoría).
- `reward_tags` (pivot `reward_reward_tag`) — etiquetas transversales (Nuevo, Popular, Destacado), independientes de la categoría.
- `body_html` — contenido enriquecido, saneado con `mews/purifier` (helper `clean()`) antes de guardarse, para evitar XSS vía contenido editado en un rich text editor.
- `reward_images` — las imágenes subidas se reencodean a WebP (`Intervention Image` v4: `decodePath()` + `.save($path, quality: ...)`) para no servir el formato original del upload tal cual.

## Banners y Términos y Condiciones

- `/admin/banners` — imagen desktop/mobile, link, orden, vigencia (`valid_from`/`valid_until`). El home del portal solo pinta los banners cuya vigencia cubre "ahora".
- `/admin/legal` — editor de la página de términos y condiciones (`legal_pages`, slug `terminos-y-condiciones`), visible públicamente en el portal sin necesidad de login.

![Listado de premios del admin](/img/screens/admin-rewards-index.png)

![Formulario de creación/edición de un premio](/img/screens/admin-reward-form.png)
