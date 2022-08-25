import IRoute from '../interfaces/routes';
import HomePage from '../pages/home';
import LoginPage from '../pages/login';
import EditPage from '../pages/edit';
import BlogPage from '../pages/blog';

const authRoutes: IRoute[] = [
  {
    path: '/login',
    exact: true,
    auth: false,
    component: LoginPage,
    name: 'Login'
  },
  {
    path: '/register',
    exact: true,
    auth: false,
    component: LoginPage,
    name: 'register'
  }
];

const blogRoutes: IRoute[] = [
  {
    path: '/edit',
    exact: true,
    auth: true,
    component: EditPage,
    name: 'Create'
  },
  {
    path: '/edit/:blogID',
    exact: true,
    auth: true,
    component: EditPage,
    name: 'Edit'
  },
  {
    path: '/blogs/:blogID',
    exact: true,
    auth: false,
    component: BlogPage,
    name: 'Blog'
  },
];

const mainRoutes: IRoute[] = [
  {
    name: 'Home',
    path: '/',
    exact: true,
    component: HomePage,
    auth: false
}
];

const routes: IRoute[] = [...authRoutes, ...blogRoutes, ...mainRoutes];;

export default routes;