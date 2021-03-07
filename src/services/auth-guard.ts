import axios, { AxiosError } from 'axios';
import { IncomingMessage, ServerResponse } from 'http';
import { HttpResponseStatusCodes } from '@/utils/http-response-status-codes';
import { protectedRoutes } from '@/config';

export class AuthGuard {
  private protectedRoutes: string[];

  constructor() {
    this.protectedRoutes = protectedRoutes;
  }

  /**
   * Get the current user from the database and redirect to dashboard if successful.
   *
   * @param {IncomingMessage} req
   *   The request object.
   * @param {ServerResponse} res
   *   The response object.
   * @param {string} destination
   *   The destination URL the user will be redirected to if he's authenticated.
   *
   * @return {object}
   *  An empty object. It is still necessary to return obj as getServerSideProps() requires it.
   */
  public async redirectOnAuthentication(
    req: IncomingMessage,
    res: ServerResponse,
    destination: string
  ) {
    try {
      await AuthGuard.getCsrfCookie();

      const response = await AuthGuard.getUser(req);

      if (response.status === HttpResponseStatusCodes.OK) {
        AuthGuard.redirectToDestination(res, destination);
        return { props: {} };
      }
    } catch (error) {
      return { props: {} };
    }
  }

  public async authenticateUser(
    req: IncomingMessage,
    res: ServerResponse,
    pathname: string
  ) {
    const isProtectedRoute = this.isProtectedRoute(pathname);
    try {
      await AuthGuard.getCsrfCookie();

      // If there are no cookies and the route is protected, redirect to login.
      if (!req.headers.cookie && isProtectedRoute) {
        /**
         * No further redirect if we're already on the login
         * path, as we otherwise would be caught in an
         * infinite loop of redirections to /login.
         */
        if (pathname === '/login') {
          res.end();
          return { user: null };
        }

        AuthGuard.redirectToDestination(res, '/login');
        return { user: null };
      }

      /**
       * As the API call is executed on the server it by
       * default does not have the cookies set in the browser.
       * Fortunately, we can extract these cookies from the req object
       * and attach them to the api call.
       */
      const response = await AuthGuard.getUser(req);

      if (response.status !== HttpResponseStatusCodes.OK) {
        res.end();
        return { user: null };
      }

      const user = response.data;

      // If user is authenticated and he requests login or register, redirect to dashboard.
      if (user && pathname === '/login') {
        AuthGuard.redirectToDestination(res, '/');
      } else if (!user && isProtectedRoute) {
        AuthGuard.redirectToDestination(res, '/login');
        return { user: null };
      }

      // Return the currently authenticated user.
      return { user };
    } catch (e) {
      // Typescript hack to get intellisense for AxiosError since typing catch params is unavailable.
      const error = e as AxiosError;
      if (
        error.response &&
        error.response.status === HttpResponseStatusCodes.UNAUTHORIZED &&
        isProtectedRoute
      ) {
        if (pathname === '/login') {
          return { user: null };
        }
        AuthGuard.redirectToDestination(res, '/login');
      }
    }
  }

  private static redirectToDestination(
    res: ServerResponse,
    destination: string
  ) {
    res.writeHead(HttpResponseStatusCodes.MOVED_PERMANENTLY, {
      Location: destination,
    });
    res.end();
  }

  public static async getCsrfCookie() {
    return axios.get('/sanctum/csrf-cookie');
  }

  private static async getUser(req: IncomingMessage) {
    return axios.get('/api/user', {
      headers: { Cookie: req.headers.cookie },
    });
  }

  private isProtectedRoute(pathname: string) {
    return this.protectedRoutes.every((route) => pathname.startsWith(route));
  }
}
