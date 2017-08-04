import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {QuotesDetailPage} from '../quotes-detail/quotes-detail';

@IonicPage()
@Component({
  selector: 'page-quotes-list',
  templateUrl: 'quotes-list.html',
})
export class QuotesListPage {

  quotesList = [];
  filteredQuotes = [];
  isFiltered: boolean;

  constructor(private http: Http, public navCtrl: NavController, public navParams: NavParams) {
    this.isFiltered = false;
    this.http.get('quotes.json')
    .map(res => res.json())
    .subscribe(
      data => {
        this.quotesList = data.quotes;
      },
      err => {
        console.log("Error is " + err);
      },
      () =>{
        console.log("Read quotes complete!" + this.quotesList);
      }
    )
  }

  searchQuotes(event){
    if(event.target.value.length > 2){
      let filteredJson = this.quotesList.filter( function (row) {
        if(row.author.indexOf(event.target.value) != -1 ){
          return true;
        } else {
          return false;
        }
      });

      this.isFiltered = true;
      this.filteredQuotes = filteredJson;

    }
  }

}
