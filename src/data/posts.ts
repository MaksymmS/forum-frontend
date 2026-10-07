import type { Post } from '../types/post';

export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    title: 'Prisma ORM 8',
    content: '.',
    author: 'Анна',
    category: 'Backend',
    createdAt: '2026-10-05T12:00:00Z',
  },
  {
    id: '2',
    title: 'Clean Architecture',
    content: 'Разделение на Controller, Service и Repository',
    author: 'Алексей',
    category: 'Architecture',
    createdAt: '2026-10-06T09:30:00Z',
  },
  {
    id: '3',
    title: 'React + TypeScript в Vite',
    content: 'Vite обеспечивает мгновенную сборку и HMR',
    author: 'Максим',
    category: 'Frontend',
    createdAt: '2026-10-06T14:15:00Z',
  },
  {
    id: '4',
    title: 'Типизация props в React компонентах',
    content: 'Используйте интерфейсы TypeScript для описания props',
    author: 'Дмитрий',
    category: 'TypeScript',
    createdAt: '2026-10-07T08:00:00Z',
  },
  {
    id: '5',
    title: 'Адаптивный верстка без сложных библиотек',
    content: 'Обычный CSS Flexbox и CSS Grid в сочетании с Media Queries позволяют легко сделать красивую мобильную версию веб-сайта.',
    author: 'Елена',
    category: 'CSS',
    createdAt: '2026-10-07T11:45:00Z',
  },
];