export const APP_NAME = "L'Amour Inconnu";

export const SUBSCRIPTION_PRICE = 14;

export const MAX_FREE_MATCHES = 3;

export const ROUTES = {
  HOME: '/',
  HOW_IT_WORKS: '/comment-ca-marche',
  COMMENT_CA_MARCHE: '/comment-ca-marche',
  PRICING: '/tarifs',
  BLOG: '/blog',
  BLOG_ARTICLE: '/blog/:slug',
  CITIES: '/villes',
  CITY: '/villes/:slug',
  CGU: '/cgu',
  PRIVACY: '/confidentialite',
  CONFIDENTIALITE: '/confidentialite',
  LEGAL: '/mentions-legales',
  LOGIN: '/connexion',
  REGISTER: '/inscription',
  INSCRIPTION: '/inscription',
  FORGOT_PASSWORD: '/mot-de-passe-oublie',
  THANK_YOU_SUBSCRIPTION: '/merci-abonnement',
  DASHBOARD: '/dashboard',
  PROFILE: '/profil',
  MATCHES: '/matches',
  DATES: '/rendez-vous',
  SETTINGS: '/parametres',
  ADMIN: '/admin',
  ADMIN_USERS: '/admin/users',
  ADMIN_REPORTS: '/admin/reports',
  ADMIN_SETTINGS: '/admin/settings',
} as const;

export const USER_ROLES = {
  VISITOR: 'visitor',
  MEMBER: 'member',
  SUBSCRIBER: 'subscriber',
  ADMIN: 'admin',
} as const;

export const MATCH_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
} as const;

export const DATE_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  COMPLETED: 'completed',
} as const;

export const REPORT_STATUS = {
  PENDING: 'pending',
  REVIEWED: 'reviewed',
  RESOLVED: 'resolved',
  DISMISSED: 'dismissed',
} as const;
