import { CssBaseline, ThemeProvider } from '@mui/material';
import getTheme from './shared/utils/theme';
import { useAtom } from 'jotai';
import { colorModeAtom } from './shared/store/themeAtom';
import './App.css';
import AuthRoute from './router/AuthRoute';
import { Provider as JotaiProvider } from 'jotai';

function App() {
    const [mode] = useAtom(colorModeAtom);
    const theme = getTheme(mode);
    

    return (
        <div className="main-center-container">
            <JotaiProvider>
                <ThemeProvider theme={theme}>
                    <CssBaseline />  
                    <AuthRoute />
                </ThemeProvider>
            </JotaiProvider>
        </div>
    );
}

export default App;
