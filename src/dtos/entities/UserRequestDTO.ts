import { User } from "../../models/entities/User";

export interface SignUpUserRequestBodyDTO extends Partial<Omit<User, "id" | "date_birth" | "created_at" | "updated_at">> {
    full_name: string;
    date_birth: string;
    email: string;
    password: string;
    phone: string;
};

export interface SignInUserRequesBodytDTO extends User {
    email: string;
    password: string;
};

export interface SignOutUserRequestBodyDTO {
    refreshTokenHash: string;
};

export interface SignOutUserRequestHeadersDTO {
    accessToken: string | undefined;
};

export interface AuthMiddlewareUserRequestHeadersDTO {
    accessToken: string | undefined;
};