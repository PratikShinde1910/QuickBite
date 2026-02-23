import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './src/navigation';
import { FavoritesProvider } from './src/data/FavoritesContext';
import { AuthProvider } from './src/context/AuthContext';
import { CartProvider } from './src/context/CartContext';

export default function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <CartProvider>
          <SafeAreaProvider>
            <RootNavigator />
          </SafeAreaProvider>
        </CartProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}
