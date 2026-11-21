# Saldo y historial

`/mi-cuenta` muestra el saldo vigente del paciente:

```php
// App\Models\Patient::pointsBalance()
public function pointsBalance(): int
{
    return (int) $this->pointBatches()
        ->where('status', 'active')
        ->where('expires_at', '>', now())
        ->sum('points_remaining');
}
```

Es decir: la suma de `points_remaining` de los lotes (`point_batches`) que siguen `active` y aún no vencieron — nunca un contador aparte que se pueda desincronizar del detalle real por lote. Puntos por vencer pronto (de los lotes con `expires_at` más cercano) se pueden destacar en el dashboard para incentivar el canje antes de perderlos.

El historial completo (ganados, redimidos, vencidos, ajustes) viene de un registro inmutable, nunca editado ni borrado, que es la fuente de verdad auditable de todo lo que le pasó al saldo de un paciente.

![Dashboard del paciente con su saldo](/img/screens/portal-dashboard.png)
