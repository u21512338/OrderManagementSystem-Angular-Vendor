import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Product } from '../../../shared/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  products: Product[] = []


  constructor(private dataService: DataService, private router:Router) { }


  ngOnInit(): void {
    this.GetProducts()
    
  }


  GetProducts()
  {
    this.dataService.GetProducts().subscribe(res => {
        this.products = res as Product[];
        console.log(res)
    });
  }

  EditProduct(ProductId:Number)
  {
    this.router.navigate(['edit-product', ProductId]);
  }

  DeleteProduct(ProductId:Number)
  {
    this.dataService.DeleteProduct(ProductId).subscribe((response:any) => {
      if(response.statusCode == 200)
      {
        this.GetProducts();
      }
      else
      {
        alert(response.message)
      }
    })
  }

}
