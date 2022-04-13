import { HttpBackend, HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouterLoggerService {

  private httpClient:HttpClient|null=null;
  currentUserName:string|any=null;

  constructor(private httpBackend:HttpBackend) 
  { 

  }

  public log(logMsg:string):Observable<any>
  {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    var body = {
      log: logMsg
    }
    
      this.httpClient = new HttpClient(this.httpBackend);
      //alert("Log333: "+logMsg);
      //return this.httpClient.post("/api/routerlogger",["logMsg"],{headers:new HttpHeaders().set("content-type","text/plain")});
      //return this.httpClient.post("/api/routerlogger",["dfgfdgdf"]);
     return this.httpClient.post("/api/routerlogger",body,{headers});

     //return this.httpClient.post("/api/routerlogger",body,{headers});

     
  }

}
