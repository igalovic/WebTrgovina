import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  /* access particular input from our shop component with @ViewChild */
  @ViewChild('search', {static:false}) searchTerm: ElementRef;
  products:IProduct[];
  brands: IBrand[];
  types: IType[];
  totalCount: number;
  shopParams : ShopParams;
  sortOptions = [
    {name: 'Aplhabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'}
  ];

  constructor(private shopService:ShopService) { 
    this.shopParams = this.shopService.getShopParams();
  }

  ngOnInit(): void {
    this.getProducts(true);
    this.getBrands();
    this.getTypes();
  }

  getProducts(useCache = false){
     /*observable and we need to subscribe to it */
    /*subscribe - execute core to the api*/
    this.shopService.getProducts(useCache).subscribe(response=>{
      this.products = response.data;
      this.totalCount = response.count;
    }, error=>{
      console.log(error)
    });
  }

  getBrands(){
    this.shopService.getBrands().subscribe(response=>{
      /* ... spread operator - spreads all objects from that array and is adding another object at front  */
      this.brands = [{id: 0, name:"All"}, ...response];
    }, error=>{
      console.log(error);
    });
  }

  getTypes(){
    this.shopService.getTypes().subscribe(response=>{
      this.types = [{id: 0, name:"All"}, ...response];
    }, error=>{
      console.log(error);
    });
  }

  onBrandSelected(brandId: number){
    const params = this.shopService.getShopParams();
    params.brandId = brandId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onTypeSelected(typeId: number){
    const params = this.shopService.getShopParams();
    params.typeId = typeId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onSortSelected(sort:string){
    const params = this.shopService.getShopParams();
    params.sort = sort;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onPageChanged(event:any){
    const params = this.shopService.getShopParams();
    if(params.pageNumber !== event)
    {
      params.pageNumber = event;
      this.shopService.setShopParams(params);
      this.getProducts(true);
    }
  }

  onSearch(){
    const params = this.shopService.getShopParams();
    params.search = this.searchTerm.nativeElement.value
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onReset(){
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.shopService.setShopParams(this.shopParams);
    this.getProducts();
  }
}
