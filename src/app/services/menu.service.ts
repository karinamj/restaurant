import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  apikey = '6906fbdd2c874986bbaa98123c7f3e5a';
  constructor(private http: HttpClient) { }

  getQuery(query: string) {
    const URL = `https://api.spoonacular.com/recipes/${query}`;

    // const headers = new HttpHeaders({
    //   // eslint-disable-next-line @typescript-eslint/naming-convention
    //   Authorization: this.apikey,
    // });

    return this.http.get(URL);
  }


  getMenuVegano(){
    return this.getQuery(`complexSearch?apiKey=${this.apikey}&diet=Vegan`).pipe(
      map((data: any) => data.results) 
    );
  }

  getMenu(){
      return this.getQuery(`complexSearch?apiKey=${this.apikey}&addRecipeInformation=true`).pipe(
      map((data: any) => data.results) 
    );
  }

  getPlateInformation(id: number){
    return this.getQuery(`${id}/information?apiKey=${this.apikey}`).pipe(
      map((data: any) => data) 
    );
  }
}
