import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-ts';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserAuthService {
    apiUrl = environment.baseUrl;
    secretKey = 'v3I6J9n2b8e+Z1y2kU1B2Q==A3n4R5q+2L6H0P8s9K1Z0D1N0';

    constructor(private http: HttpClient) { }

    async login(email: string, password: string): Promise<any> {
        const observable = this.http.post<any>(`${this.apiUrl}/users`, {email, password});
        const user = await firstValueFrom(observable);

        const isPasswordValid = this.isPasswordValid(user.password, password);
        if (isPasswordValid) {
            return { success: true, user, message: 'Başarıyla giriş yapıldı.' };
        } else {
            return { success: false, message: 'Şifre hatalı.' };
        }
    }

    async register(email: string, password: string): Promise<any> {
        const encryptedPassword = this.encryptPassword(password);
        const newUser = { email, password: encryptedPassword };

        const observable = this.http.post<any>(`${this.apiUrl}/users`, newUser);
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
