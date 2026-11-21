import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  emoji: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Superadmin',
    emoji: '🗂️',
    description: (
      <>
        Catálogo de procedimientos y premios, pacientes, ventas, configuración
        general y banners. Acceso vía SSO con el WordPress headless de
        Harker Lloreda — sin password propio.
      </>
    ),
  },
  {
    title: 'Portal de pacientes',
    emoji: '🎁',
    description: (
      <>
        Catálogo de premios con filtros, saldo de puntos, historial y
        checkout 100% puntos o mixto (puntos + dinero). Cuentas propias,
        independientes de WordPress y de Oreka.
      </>
    ),
  },
  {
    title: 'Motor de puntos FIFO',
    emoji: '⏳',
    description: (
      <>
        Lotes de puntos con vencimiento a un año, consumidos siempre en el
        orden en que vencen, con reversa transaccional si un pago mixto es
        rechazado.
      </>
    ),
  },
];

function Feature({title, emoji, description}: FeatureItem) {
  return (
    <div className="col col--4">
      <div className="text--center">
        <span className={styles.featureEmoji} role="img" aria-hidden="true">
          {emoji}
        </span>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
