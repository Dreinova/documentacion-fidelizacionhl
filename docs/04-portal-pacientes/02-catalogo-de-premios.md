# Catálogo de premios

`/premios` — inspirado en catálogos de e-commerce de puntos (Puntos Colombia, programas de aerolíneas), con:

- **Categoría** (jerárquica, `reward_categories`).
- **Rango de precio en puntos** — derivado dinámicamente de `price_cop` vía `Reward::pointsEquivalent()`, nunca almacenado (ver [Catálogo y premios](/docs/modulo-admin/catalogo-y-premios)).
- **Toggle "solo con mis puntos"** — filtra a lo que el paciente puede pagar 100% con su saldo actual (`$reward->pointsEquivalent() <= $patient->pointsBalance()`).
- **Tags transversales** (Nuevo, Popular, Destacado), independientes de la categoría.
- **Buscador** por título/descripción.
- **Ordenamiento**: relevancia, menor/mayor puntos, más nuevos, destacados.

`/premios/{reward:slug}` muestra el detalle: descripción enriquecida, imágenes, y el slider de puntos/dinero si el paciente puede costear al menos el mínimo.

![Catálogo de premios del portal](/img/screens/portal-rewards-index.png)

![Vista de detalle de un premio](/img/screens/portal-reward-show.png)
