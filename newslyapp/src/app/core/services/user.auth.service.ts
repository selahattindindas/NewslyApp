import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-ts';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClientService } from './http-client.service';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class UserAuthService {
    apiUrl = environment.baseUrl;
    secretKey = 'v3I6J9n2b8e+Z1y2kU1B2Q==A3n4R5q+2L6H0P8s9K1Z0D1N0';

    constructor(private httpClientService: HttpClientService, private authService: AuthService) { }

    async login(email: string, password: string): Promise<any> {
        const observable = this.httpClientService.get<any>({
            controller: 'users'
        });
    
        const users = await firstValueFrom(observable);
        const user = users.find((u: any) => u.email === email);
      
        if (user) {
            const isPasswordValid = this.isPasswordValid(user.password, password);
            if (isPasswordValid) {
                const token = this.authService.generateToken(user.email);
                this.authService.setToken(token);
                return { success: true, user, token};
            }
        }
        return { success: false};
    }

    async register(email: string, password: string): Promise<any> {
        const encryptedPassword = this.encryptPassword(password);
        const newUser = { email, password: encryptedPassword };

        const observable = this.httpClientService.post<any>({
            controller: 'users'
        },newUser);
        
        return firstValueFrom(observable);
    }

    private isPasswordValid(encryptedPassword: string, inputPassword: string): boolean {
        const decryptedPassword = this.decryptPassword(encryptedPassword);
        return decryptedPassword === inputPassword;
    }

    private encryptPassword(password: string): string {
        const encrypted = AES.encrypt(password, this.secretKey).toString();
        return encrypted;
    }

    private decryptPassword(encryptedPassword: string): string {
        const bytes = AES.decrypt(encryptedPassword, this.secretKey);
        return bytes.toString(enc.Utf8);
    }
}
