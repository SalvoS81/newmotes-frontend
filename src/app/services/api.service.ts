import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient) {
        this.backEndURL = this.getBackEndUrl();
    }

    backEndURL: string;

    /* loginByAuth(username: string, password: string){
        let data = new Promise((res, rej)=>{
            this.http.post(
                `${this.backEndURL}/dj-rest-auth/login/`, 
                {username, password}
            ).subscribe(
                success => res(success), 
                error => rej(error)
            );
        });
        return data;
    } */

    async loginByAuth (username, password) {
        try {
            console.log(username, password);
            const resp = await this.http.post(`${this.backEndURL}/dj-rest-auth/login/`, {username, password}).toPromise();
            console.log(resp);
            return resp;          
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

/*     loginByAuth = async (username, password) => {
        const {data} = this.http.post(`${this.backEndURL}/dj-rest-auth/login/`, {
            username, 
            password
        });
        const {token} = data;        
        return token;
    }; */

    async getProfile() {
        //const token = localStorage.getItem('token');
        //axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        try {
            const resp = await (this.http.get(`${this.backEndURL}/dj-rest-auth/user/`).toPromise());
            console.log(resp);
            return resp;       
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    getBackEndUrl(): string {
        const segements = document.URL.split('/');
        const reggie = new RegExp(/localhost/);
        return reggie.test(segements[2]) ? 'http://localhost:8000' : 'https://localhost:8000';
      }
}
