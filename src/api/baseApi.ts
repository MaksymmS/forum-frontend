import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  Post,
  Category,
  CreatePostRequest,
  CreateCategoryRequest,
  User,
} from '../types/post';

export const baseApi = createApi({
  reducerPath: 'forumApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || '/api',
    credentials: 'include',
  }),
  tagTypes: ['Post', 'Category', 'User'],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], { category?: string; take?: number } | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.category) {
          queryParams.set('category', params.category);
        }
        if (params?.take) {
          queryParams.set('take', String(params.take));
        }
        const qs = queryParams.toString();
        return `/posts${qs ? `?${qs}` : ''}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Post' as const, id })),
              { type: 'Post', id: 'LIST' },
            ]
          : [{ type: 'Post', id: 'LIST' }],
    }),

    getPostById: builder.query<Post, string>({
      query: (id) => `/posts/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Post', id }],
    }),

    createPost: builder.mutation<Post, CreatePostRequest>({
      query: (body) => ({
        url: '/posts',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),

    getCategories: builder.query<Category[], void>({
      query: () => '/categories',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Category' as const, id })),
              { type: 'Category', id: 'LIST' },
            ]
          : [{ type: 'Category', id: 'LIST' }],
    }),

    createCategory: builder.mutation<Category, CreateCategoryRequest>({
      query: (body) => ({
        url: '/categories',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    }),

    getCurrentUser: builder.query<User, void>({
      query: () => '/auth/me',
      providesTags: ['User'],
    }),

    login: builder.mutation<{ message: string }, { email: string; password: string }>({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User', { type: 'Post', id: 'LIST' }],
    }),

    register: builder.mutation<User, { email: string; password: string }>({
      query: (body) => ({
        url: '/register',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const forumApi = baseApi;

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useGetCurrentUserQuery,
  useLoginMutation,
  useRegisterMutation,
} = baseApi;
