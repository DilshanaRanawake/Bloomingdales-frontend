import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {debounceTime} from "rxjs";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchText:string;
  myControl = new FormControl();

  @Output()
  searchTextChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(private router:Router,private productService: ProductService) { }

  ngOnInit(): void {
    this.myControl.valueChanges.pipe(
      debounceTime(1000),
    ).subscribe(() => {
      this.searchTextChanged.emit(this.searchText)
      this.doSearch(this.searchText)
      this.productService.setSearchText(this.searchText);
    });
  }

  doSearch(value: string) {
    if (value !== undefined){
      this.router.navigateByUrl(`/search/${value}`);
    }
  }
}
