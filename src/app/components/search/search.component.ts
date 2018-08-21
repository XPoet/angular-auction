import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../services/product.service';
import {Http, Headers} from '@angular/http';
import 'rxjs';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  formModel: FormGroup;

  categories: string[];

  dataSource: Observable<any>;
  // products: any[] = [];
  products: Observable<any>;


  constructor(
    private productService: ProductService,
    private http: Http
  ) {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Basic 123456');


    // this.dataSource = this.http.get(`/api/products`).map(res => res.json());
    this.products = this.http.get(`/api/products`, {headers: myHeaders}).map(res => res.json());

  }

  ngOnInit() {
    const formBuilder = new FormBuilder();
    this.formModel = formBuilder.group({
      title: ['', Validators.minLength(2)],
      price: [null, this.positiveNumberValidator],
      category: ['-1']
    });

    this.categories = this.productService.getAllCategories();

    this.onSearch();
  }

  positiveNumberValidator(control: FormControl): any {
    if (!control.value) {
      return null;
    }

    let price = Number(control.value);

    if (price > 0) {
      return null;
    } else {
      return {positiveNumber: true};
    }

  }

  onSearch() {
    if (this.formModel.valid) {
      this.productService.searchEvent.emit(this.formModel.value);
    }
  }


  searchProduct() {
    // this.http.get(`/api/products`)
    //   .subscribe(data => {
    //    console.log('data', data.json());
    //     this.products = data.json();
    //   }, error => {
    //     console.error(error);
    //   });

    // this.dataSource.subscribe(data => {
    //   this.products = data;
    //   console.log('products', this.products);
    // });
  }
}


