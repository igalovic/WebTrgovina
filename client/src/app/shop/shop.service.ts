import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IBrand } from '../shared/models/brand';
import { IPagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';

/* services must be declared with @Injectable decorator (use it for http client module )
services - singleton objects(initialized when our application starts, always available when our app is available)
*/
@Injectable({
  /*Provided in app.module.ts(root) */
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http:HttpClient) { }

  getProducts(shopParams: ShopParams){
    let params = new HttpParams();

    if(shopParams.brandId !== 0){
      params = params.append('brandId', shopParams.brandId.toString());
    }

    if(shopParams.typeId !== 0){
      params = params.append('typeId', shopParams.typeId.toString());
    }

    if(shopParams.search)
    {
      params = params.append('search',shopParams.search);
    }
      params = params.append('sort', shopParams.sort);
      params = params.append('pageIndex', shopParams.pageNumber.toString());
      params = params.append('pageIndex', shopParams.pageSize.toString());

    /* get httpResponse(observe parametar) not only body so we need to project it into body with .pipe(map...)!!!!*/
    return this.http.get<IPagination>(this.baseUrl + 'products', {observe: 'response', params})
      .pipe( /* wrapper of rxjs operators that we want to use  */
        map(response=>{
          return response.body;
        })
      );
  }

  getProduct(id:number){
    return this.http.get<IProduct>(this.baseUrl + 'products/' + id);
  }

  getBrands(){
    /* get body of response */
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }

  getTypes(){
    return this.http.get<IType[]>(this.baseUrl + 'products/types');
  }
}
