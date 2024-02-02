import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { User } from '../page/Users';
import { navigation } from '../definitions/Routes';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={navigation.root} element={<User />} />
            </Routes>
        </BrowserRouter>
    )
};

export { AppRouter };