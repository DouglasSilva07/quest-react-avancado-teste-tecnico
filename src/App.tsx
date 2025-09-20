import { useContext } from 'react';
import { Header } from './components/header';
import { themeConfig } from './contexts/theme';
import { AppRoutes } from './pages/routes';
import { ThemeContext } from './contexts/ThemeContext';

function App() {
const { theme } = useContext(ThemeContext);

  return (
    <div className={`${themeConfig[theme].layout.heroClass} 
    flex flex-col 
    min-lg:justify-center
    min-2xl:gap-20
    `}>
      
      <Header></Header>
      <main className="w-full flex justify-center">
       <AppRoutes />
      </main>
    
    </div>
  );
}

export default App
