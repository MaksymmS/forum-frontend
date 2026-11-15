import { useState } from 'react';
import { Header } from './components/Header';
import { PostList } from './components/PostList';
import { AuthSection } from './components/AuthSection';
import { useGetCategoriesQuery, useGetPostsQuery } from './api/baseApi';
import './App.css';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

  const {
    data: posts,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useGetPostsQuery(selectedCategory ? { category: selectedCategory } : undefined);

  const { data: categories } = useGetCategoriesQuery();

  return (
    <div className="app-layout">
      <Header title="Forum" description="Discussion forum for developers" />
      <main className="main-content">
        <AuthSection />

        <div className="controls-bar">
          <div className="category-filters">
            <button
              type="button"
              className={`filter-btn ${selectedCategory === undefined ? 'active' : ''}`}
              onClick={() => setSelectedCategory(undefined)}
            >
              Все категории
            </button>
            {categories?.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`filter-btn ${selectedCategory === cat.name ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.name)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="refresh-btn"
            onClick={() => refetch()}
            disabled={isFetching}
          >
            {isFetching ? 'Обновление...' : 'Обновить'}
          </button>
        </div>

        {isLoading ? (
          <div className="status-message">Загрузка постов с сервера...</div>
        ) : error ? (
          <div className="status-message status-error">
            <p>Не удалось загрузить посты с сервера.</p>
            <p style={{ fontSize: '13px', marginTop: '4px', opacity: 0.85 }}>
              Убедитесь, что backend <code>forum-api</code> запущен на <code>http://localhost:8000</code>.
            </p>
            <button type="button" className="retry-btn" onClick={() => refetch()}>
              Повторить попытку
            </button>
          </div>
        ) : (
          <PostList posts={posts ?? []} categories={categories} />
        )}
      </main>
    </div>
  );
}

export default App;
