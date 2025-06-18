import { ZodError } from "zod";
import { UserSchema } from "../../../src/models/entities-zod/UserZod";
import { User } from "../../../src/models/entities/User";

class UserRequestAPI {
    full_name: string;
    date_birth: Date | string;
    email: string;
    password: string;
    phone?: string;
};

describe("User Zod Tests", () => {
    const user = new UserRequestAPI();
    user.full_name = "Jhon Doe"
    user.date_birth = "19/07/2007";
    user.email = "jhondoe@gmail.com";
    user.password = "JhonDoe_123";
    
    test("Should validate if full_name is not null", () => {
        const validate1 = UserSchema.safeParse(user);
        
        expect(validate1.data).not.toBeNull();
        expect(validate1.success).toBe(true);
        expect(validate1.error).toBeUndefined();
        
        user.full_name = "";
        const validate2 = UserSchema.safeParse(user);
        
        expect(validate2.data).not.toBeNull();
        expect(validate2.success).toBe(false);
        expect(validate2.error).toBeInstanceOf(ZodError);

        user.full_name = "Jhon Doe"
    });
    
    test("Should validate if date_birth is valide", () => {
        const validate1 = UserSchema.safeParse(user);
        
        expect(validate1.data).not.toBeNull();
        expect(validate1.success).toBe(true);
        expect(validate1.error).toBeUndefined();
        
        user.date_birth = "";
        const validate2 = UserSchema.safeParse(user);
        
        expect(validate2.data).not.toBeNull();
        expect(validate2.success).toBe(false);
        expect(validate2.error).toBeInstanceOf(ZodError);
        
        user.date_birth = "19/07/2007";
    });
    
    test("Should validate if password is valide", () => {
        const validate1 = UserSchema.safeParse(user);
        
        expect(validate1.data).not.toBeNull();
        expect(validate1.success).toBe(true);
        expect(validate1.error).toBeUndefined();
        
        user.password = "";
        const validate2 = UserSchema.safeParse(user);
        
        expect(validate2.data).not.toBeNull();
        expect(validate2.success).toBe(false);
        expect(validate2.error).toBeInstanceOf(ZodError);
        
        user.password = "jhondoe";
        const validate3 = UserSchema.safeParse(user);
        
        expect(validate3.data).not.toBeNull();
        expect(validate3.success).toBe(false);
        expect(validate3.error).toBeInstanceOf(ZodError);
        
        user.password = "JhonDoe";
        const validate4 = UserSchema.safeParse(user);
        
        expect(validate4.data).not.toBeNull();
        expect(validate4.success).toBe(false);
        expect(validate4.error).toBeInstanceOf(ZodError);
        
        user.password = "JhonDoe123";
        const validate5 = UserSchema.safeParse(user);
        
        expect(validate5.data).not.toBeNull();
        expect(validate5.success).toBe(false);
        expect(validate5.error).toBeInstanceOf(ZodError);
        
        user.password = "JhonDoe_123";
    });
    
    test("Should validate all atributes of the User", () => {
        const validate1 = UserSchema.safeParse(user);
        
        expect(validate1.data).not.toBeNull();
        expect(validate1.success).toBe(true);
        expect(validate1.error).toBeUndefined();
    });
});