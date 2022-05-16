import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

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

  fileRoute = `${environment.apiUrl}files`

  listMyFiles(): Observable<any> {
    return this.http.get<any>(this.fileRoute + '/my');
  }

  uploadFile(file: FormData, publicType: boolean = false): Observable<any> {
    file.append("public", String(publicType))
    return this.http.post<any>(this.fileRoute + '/upload', file, {
      reportProgress: true,
      observe: 'events'
    });
  }

  deleteFile(file_id: string) {
    return this.http.delete<any>(this.fileRoute + '/' + file_id);
  }
}
