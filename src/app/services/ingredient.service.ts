import { map } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  apikey = '6906fbdd2c874986bbaa98123c7f3e5a';

  constructor(private http: HttpClient) {

   }

   getQuery(query: string) {
    const URL = `https://api.spoonacular.com/recipes/${query}`;

    // const headers = new HttpHeaders({
    //   // eslint-disable-next-line @typescript-eslint/naming-convention
    //   Authorization: this.apikey,
    // });

    return this.http.get(URL);
  }


   getIngredientId(id: number){
    return this.getQuery(`${id}/ingredientWidget.json?apiKey=${this.apikey}`).pipe(
      map((data: any) => data.ingredients) 
    );
  }
}
