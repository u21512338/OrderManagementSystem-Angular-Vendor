import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../../../shared/product';
import { DataService } from '../../../../services/data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  constructor(private data:DataService, private router : Router , private activated:ActivatedRoute) { }

  //Creating the form 
  editProduct: Product = new Product();

  updateModuleForm: FormGroup = new FormGroup({
    ProductName: new FormControl('',[Validators.required]),
    Description: new FormControl('',[Validators.required]),
    Price: new FormControl('',[Validators.required]),
    Quantity: new FormControl('',[Validators.required])
  })

  ngOnInit(): void {

     // GET THE ID FROM THE URL 
    this.activated.params.subscribe(params => { 


     //SEND OFF REQUEST TO DB TO FIND OBJECT DATA 
     this.data.GetProduct(params['id']).subscribe(response => { //SUBSCRIBE TO THE RESPONSE

      //MAP THE RESPONSE TP THE CURRENT EDITCOURSE OBJECT
      this.editProduct = response as Product;
      console.log(response)

      //MAP THE RESPONSE VALUES TO THE FORM 
      this.updateModuleForm.controls['ProductName'].setValue(this.editProduct.ProductName);
      this.updateModuleForm.controls['Description'].setValue(this.editProduct.Description);
      this.updateModuleForm.controls['Price'].setValue(this.editProduct.Price);
      this.updateModuleForm.controls['Quantity'].setValue(this.editProduct.Quantity);
     })

    })
 }

  editModule()
  {
    let product = new Product();
    product.ProductName = this.updateModuleForm.value.ProductName;
    product.Description = this.updateModuleForm.value.Description;
    product.Price= this.updateModuleForm.value.Price;
    product.Quantity= this.updateModuleForm.value.Quantity;

   this.data.UpdateProduct(this.editProduct.ProductID,product).subscribe((response:any) => {

    if(response.statusCode == 200)
    {
      this.router.navigate(['/product'])
    }
    else
    {
      alert(response.message);
    }
   });

  }

}
