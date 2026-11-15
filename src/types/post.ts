export type Post = {
  id: string;
  title: string;
  content: string;
  authorId?: number | null;
  categoryId?: number | null;
  author?: string;
  category?: string;
  createdAt: string;
};

export type Category = {
  id: number;
  name: string;
};

export type CreatePostRequest = {
  title: string;
  content: string;
  categoryId?: number | null;
};

export type CreateCategoryRequest = {
  name: string;
};

export type User = {
  id: number;
  email: string;
};
