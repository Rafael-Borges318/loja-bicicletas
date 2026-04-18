
import { AppRoutes } from './routes/AppRoutes';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
