import jwtDecode from 'jwt-decode';

export const TOKEN_KEY = "@central-pedidos/token";
export const REFRESH_TOKEN_KEY = "@central-pedidos/refresh-token";
export const isAuthenticated = () => (localStorage.getItem(TOKEN_KEY) !== null) ? true : false;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);
export const setToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
export const setRefreshToken = (token: string) => localStorage.setItem(REFRESH_TOKEN_KEY, token);
export const clearToken = () => localStorage.clear();
export const getRoles = (role: string, app?: string) => {
    const token: any = getToken();
    const decoded: any = token && jwtDecode(token);
    let UserRoles: any
    !app && (app = process.env.REACT_APP_IDENTITY_APP)
    try { true 
    //token && decoded.app === app && (decoded.role && decoded.role.find((i: string) => i === role))
        ? UserRoles = {
            status: "Authorized:",
            message: `Permission Ok!, User ${decoded.sub}, App: ${app}, Role: ${role}.`,
            app: decoded.app,
            roles: decoded.role,
            access: true
        }

        : UserRoles = {
            status: "Unauthorized:",
            message: `User ${decoded && decoded.sub} don´t have permission to access app: ${app} with role: ${role}.`,
            app: app,
            roles: [],
            access: false
        }
    } catch (error) {
        
             token && decoded.app === app && (decoded.role === role)
             ? UserRoles = {
                 status: "Authorized:",
                 message: `Permission Ok!, User ${decoded.sub}, App: ${app}, Role: ${role}.`,
                 app: decoded.app,
                 roles: decoded.role,
                 access: true
             }

             : UserRoles = {
                 status: "Unauthorized:",
                 message: `User ${decoded && decoded.sub} don´t have permission to access app: ${app} with role: ${role}.`,
                 app: app,
                 roles: [],
                 access: false
             }

      }
    // ## DEBUG
    // console.log(UserRoles.status, UserRoles.message); 
    return UserRoles.access;
}

export const getUser = () => {
    const token: any = getToken();
    const decoded: any = token && jwtDecode(token);
    
    return decoded.sub
}

