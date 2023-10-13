import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {shareReplay, tap} from 'rxjs/operators';

//import { ApiService } from './api.service';
import moment from 'moment';
import { ConditionalExpr } from '@angular/compiler';


@Injectable({
    providedIn: 'root'
})
export class AppService {
    public user: any = null;
    backEndURL: string;

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

    constructor(
        private router: Router, 
        //private apiservice: ApiService,
        private http: HttpClient,
        private toastr: ToastrService
    ) {
        this.backEndURL = this.getBackEndUrl();
    }

    async loginByAuth({username, password}): Promise<any> {
        const body = {username: username, password: password};
        console.log(body);
        return this.http.post<any>(`${this.backEndURL}/dj-rest-auth/login/`, body, this.httpOptions)
            .subscribe(res => this.setSession);           
    }

    private setSession(authResult) {
        const expiresAt = moment().add(authResult.expiresIn,'second');

        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    }   

/*     async loginByAuth({username, password}) {
        try {
            console.log({username, password});
            let response = await this.apiservice.loginByAuth(username, password); //await Gatekeeper.loginByAuth(email, password); //await Gatekeeper.loginByAuth(email, password);            
            console.log(response);
            //let token = await response.json();
            //localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
        } catch (error) {
            //this.toastr.error(error.response.data.message);
            console.log(error);
        }
    } */

    /* async loginByAuth({email, password}) {
        try {
            const token = null //await Gatekeeper.loginByAuth(email, password);
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
        } catch (error) {
            this.toastr.error(error.response.data.message);
        }
    } */

    async registerByAuth({email, password}) {
        try {
            const token = null //await Gatekeeper.registerByAuth(email, password);
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
        } catch (error) {
            this.toastr.error(error.response.data.message);
        }
    }

    async getProfile() {
        try {
            //this.user = //await Gatekeeper.getProfile();
            //let response = await this.apiservice.getProfile(); 
            console.log("response");
        } catch (error) {
            //this.toastr.error(error.response.data.message);
            this.toastr.error(error.message);
            this.logout();
            console.log(error);
            throw error;
        }
    }

    logout() {
        localStorage.removeItem('token');
        //localStorage.removeItem('gatekeeper_token');
        this.user = null;
        this.router.navigate(['/login']);
    }

    getBackEndUrl(): string {
        const segements = document.URL.split('/');
        const reggie = new RegExp(/localhost/);
        return reggie.test(segements[2]) ? 'http://localhost:8000' : 'http://localhost:8000';
      }
}
