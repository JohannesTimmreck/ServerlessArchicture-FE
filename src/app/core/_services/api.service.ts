import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  bearer: string = "";
  constructor(private http: HttpClient) { }

  //---------------------------ADMIN---------------------------//

  adminRoute = `${environment.apiUrl}admin/users`

  listUser(): Observable<any> {
    return this.http.get<any>(this.adminRoute + '/');
  }

  banUser(userId: string): Observable<any> {
    return this.http.post<any>(this.adminRoute + '/' + userId + '/ban', {});
  }

  unBanUser(userId: string): Observable<any> {
    return this.http.post<any>(this.adminRoute + '/' + userId + '/unban', {});
  }

  opUser(userId: string): Observable<any> {
    return this.http.post<any>(this.adminRoute + '/' + userId + '/op', {});
  }

  deOpUser(userId: string): Observable<any> {
    return this.http.post<any>(this.adminRoute + '/' + userId + '/deop', {});
  }

  //---------------------------FILE---------------------------//

  fileRoute = `${environment.apiUrl}chats/files/messages`

  fileRoute2 = `${environment.apiUrl}chats`

  getChatMessage(name: string): Observable<any> {
    return this.http.get(this.fileRoute2 + '/' + name + '/messages', { headers: { 'Authorization': this.bearer } });
  }

  sendChatMessage(name: string, message: string): Observable<any> {
    return this.http.post(this.fileRoute2 + '/' + name + '/messages', {
      'message': message
    }, {
      headers: { 'Authorization': this.bearer }
    });
  }

  createChat(name: string): Observable<any> {
    return this.http.post(this.fileRoute2, {
      'name': name
    }, {
      headers: { 'Authorization': this.bearer }
    });
  }

  joinChat(name: string): Observable<any> {
    return this.http.put(this.fileRoute2 + '/join/' + name, {}, { headers: { 'Authorization': this.bearer } });
  }

  listChats(): Observable<any> {
    return this.http.get(this.fileRoute2 + '/mine', { headers: { 'Authorization': this.bearer } });
  }

  listMyFiles(): Observable<any> {
    let headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Authorization': this.bearer
    }

    let requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.get(this.fileRoute, requestOptions);
  }

  getSingleFile(fileName: string): any {
    return this.http.get(this.fileRoute + '/file/' + fileName, { responseType: 'blob', headers: { 'Authorization': this.bearer } });
  }


  uploadFile(file: FormData, publicType: boolean = false): Observable<any> {
    return this.http.post<any>(this.fileRoute + '/file', file, {
      reportProgress: true,
      observe: 'events',
      headers: { 'Authorization': this.bearer }
    });
  }

  deleteFile(file_id: string) {
    return this.http.delete<any>(this.fileRoute + '/' + file_id);
  }
}
