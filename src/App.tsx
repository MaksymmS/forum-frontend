import { Header } from './components/Header';
import { PostList } from './components/PostList';
import { MOCK_POSTS } from './data/posts';
import './App.css';

function App() {
  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">
        <PostList posts={MOCK_POSTS} />
      </main>
    </div>
  );
}

export default App;