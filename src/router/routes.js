
const routes = [
  {
    path: '/',
    component: () => import('layouts/MenuPrincipalLayout.vue'),
    children: [
      { path: '', component: () => import('pages/MenuPrincipal/MenuPrincipal.vue') },
    ],
  },
  {
    path: '/configuracoes',
    component: () => import('layouts/MenuPrincipalLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Configuracoes/Configuracoes.vue') },
      { path: '/alterarEmail', component: () => import('pages/Configuracoes/Opcoes/AlterarEmail.vue') },
      { path: '/alterarSenha', component: () => import('pages/Configuracoes/Opcoes/AlterarSenha.vue') },
      { path: '/alterarImagemPerfil', component: () => import('pages/Configuracoes/Opcoes/AlterarImagemPerfil.vue') },
      { path: '/acessarSuporte', component: () => import('pages/Configuracoes/Opcoes/AcessarSuporte.vue') },
    ],
  },
  {
    path: '/entrar',
    component: () => import('layouts/MenuPrincipalLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Entrar.vue') },
    ],
  },
  {
    path: '/meuperfil',
    component: () => import('layouts/MenuPrincipalLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Informacoes/Perfil.vue') },
    ],
  },
  {
    path: '/perfil/:id',
    component: () => import('layouts/MenuPrincipalLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Informacoes/PerfilVisitado.vue') },
    ],
  },
  {
    path: '/pesquisa',
    component: () => import('layouts/MenuPrincipalLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Pesquisa/PesquisaPrincipal.vue') },
    ],
  },
  {
    path: '/menuprincipal',
    component: () => import('layouts/MenuPrincipalLayout.vue'),
    children: [
      { path: '', component: () => import('pages/MenuPrincipal/MenuPrincipal.vue') },
    ],
  },
  {
    path: '/anuncio/:id',
    component: () => import('layouts/MenuPrincipalLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Informacoes/Anuncio.vue') },
    ],
  },
  {
    path: '/meusanuncios',
    component: () => import('layouts/MenuPrincipalLayout.vue'),
    children: [
      { path: '', component: () => import('pages/MenuPrincipal/MeusAnuncios.vue') },
    ],
  },
  {
    path: '/cadastrarpessoa',
    component: () => import('layouts/MenuPrincipalLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Cadastro/CadastrarPessoa.vue') },
    ],
  },
  {
    path: '/cadastraranuncio',
    component: () => import('layouts/MenuPrincipalLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Cadastro/CadastrarAnuncio.vue') },
    ],
  },
  {
    path: '/termos',
    component: () => import('layouts/MenuPrincipalLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Termos/TermosUso.vue') },
    ],
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
