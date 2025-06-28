export class APIHeaders {
    static json(contentType = "application/json") {
        return { "Content-Type": contentType };
    };

    static withAuth(token: string) {
        return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        };
    };

    static fullHeaders(token?: string, origin = '*') {
        const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        };

        if (token) {
            headers["Authorization"] =  `Bearer ${token}`;
        }

        return headers;
    };
};