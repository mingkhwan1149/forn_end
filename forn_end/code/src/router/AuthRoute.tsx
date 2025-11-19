// AuthRoute.tsx
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { routesConfig, AppRoutes } from './router';
import { PrivateLayoutRoute, PrivateBareRoute } from './PrivateRoute';
import NotFoundPage from '../shared/NotFoundPage';
import LoginPage from '../modules/auth/page/LoginPage';
import { collectRoutesByModalFlag } from './RoutesByModalFlag';

export default function AuthRoute() {
    const { normal, modal } = collectRoutesByModalFlag(routesConfig.privateRoutes);

    return (
        <Router>
            <Routes>
                {/* public */}
                <Route path={AppRoutes.login} element={<LoginPage />} />
                <Route path="*" element={<NotFoundPage />} />

                {/* private: มี Layout/Sidebar */}
                <Route element={<PrivateLayoutRoute />}>
                    {normal.map(r => (
                        <Route key={String(r.path)} path={r.path as string} element={r.element} />
                    ))}
                </Route>

                {/* private: ไม่มี Layout (modal เต็มหน้า) */}
                <Route element={<PrivateBareRoute />}>
                    {modal.map(r => (
                        <Route key={String(r.path)} path={r.path as string} element={r.element} />
                    ))}
                </Route>
            </Routes>
        </Router>
    );
}