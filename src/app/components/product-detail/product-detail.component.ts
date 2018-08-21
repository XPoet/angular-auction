import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product, Comment, ProductService} from '../../services/product.service';
import {WebSocketService} from '../../services/web-socket.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product;
  comments: Comment[];
  newRating: number = 5;
  newComment: string = '';

  isCommentHidden: boolean = true;

  isWatched: boolean = false;
  currentBid: number;

  subscription: Subscription;

  constructor(
    private routeInfo: ActivatedRoute,
    private productService: ProductService,
    private webSocketService: WebSocketService
  ) {
  }

  ngOnInit() {
    let productId: number = Number(this.routeInfo.snapshot.params['productId']);

    this.productService.getProduct(productId).subscribe(
      product => {
        this.product = product;
        this.currentBid = product.price;
      }
    );

    this.productService.getCommentsForProductId(productId).subscribe(
      comments => this.comments = comments
    );
  }

  addComment() {
    let comment = new Comment(0, this.product.id, new Date().toLocaleString(), 'itPoet', this.newRating, this.newComment);
    this.comments.unshift(comment);

    this.newRating = 5;
    this.newComment = null;
    this.isCommentHidden = true;
    let starSum = this.comments.reduce((sum, comment) => sum + comment.rating, 0);
    this.product.rating = starSum / this.comments.length;

  }

  watchProduct() {

    if (this.subscription) {
      this.subscription.unsubscribe();
      this.isWatched = false;
      this.subscription = null;

    } else {
      this.isWatched = true;
      this.subscription = this.webSocketService.createObservableSocket('ws://localhost:8085', this.product.id)
        .subscribe(
          products => {
            this.currentBid = products.find(p => p.productId === this.product.id).bid;
          }
        );
    }
  }

}
