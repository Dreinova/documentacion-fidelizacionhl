import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Plan de Fidelización',
  tagline: 'Manual de uso — Harker Lloreda',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  url: 'https://dreinova.github.io',
  baseUrl: '/documentacion-fidelizacionhl/',

  organizationName: 'Dreinova',
  projectName: 'documentacion-fidelizacionhl',
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'es',
    locales: ['es'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/isotype.svg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Plan de Fidelización',
      logo: {
        alt: 'Harker Lloreda',
        src: 'img/logo.svg',
        srcDark: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentación',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentación',
          items: [
            {label: 'Resumen del proyecto', to: '/docs/intro'},
            {label: 'Módulo admin', to: '/docs/modulo-admin/roles-y-permisos'},
            {label: 'Portal de pacientes', to: '/docs/portal-pacientes/cuentas-y-autenticacion'},
          ],
        },
      ],
      copyright: `Harker Lloreda — Plan de Fidelización. Manual de uso, generado ${new Date().getFullYear()}.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['php', 'bash', 'json', 'nginx'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
