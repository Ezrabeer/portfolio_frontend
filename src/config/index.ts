import axios from 'axios';

/*
|--------------------------------------------------------------------------
| Axios defaults
|--------------------------------------------------------------------------
|
| The default config for axios. "withCredentials" is necessary in order to
| get access to the laravel backend. The "baseURL" should match the domain
| and port of your laravel api.
|
*/
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_HOST_URL;

/*
|--------------------------------------------------------------------------
| Protected Routes
|--------------------------------------------------------------------------
|
| A list of routes that is only accessible for authenticated user. If an
| unauthenticated user tries to access on of the listed routes, she will be
| redirected to /user/login. The list also respects sub-routes.
| This means, if you include /dashboard, /dashboard/analytics or /dashboard/1
| will lead to a redirect if the user is not authenticated.
|
*/
export const protectedRoutes = ['/dashboard'];
