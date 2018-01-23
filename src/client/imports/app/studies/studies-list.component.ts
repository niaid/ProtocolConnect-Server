import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import { Studies }     from '../../../../both/collections/studies.collection';
import { Study }       from '../../../../both/models/study.model';

import { StudiesFormComponent } from './studies-form.component';

//import { Mongo }       from 'meteor/mongo';
import { InjectUser } from 'angular2-meteor-accounts-ui';
//import { MeteorComponent } from 'angular2-meteor';
import { ReactiveVar } from 'meteor/reactive-var';
//import { Counts } from 'meteor/tmeasday:publish-counts';
//import { PaginationService, PaginatePipe, PaginationControlsCmp } from 'angular2-pagination';
/* import { RsvpPipe } from '../pipes/pipes.ts'; */
import { Meteor } from 'meteor/meteor';

import template from './studies-list.component.html';
 
@Component({
  selector: 'studies-list',
  //viewProviders: [PaginationService],
  /* directives: [StudiesForm, PaginationControlsCmp], */
  /* pipes: [PaginatePipe, RsvpPipe] */
  /* pipes: [PaginatePipe], */
  template
})
@InjectUser()
//export class StudiesListComponent extends MeteorComponent{
export class StudiesListComponent {
  studies: Observable<Study[]>;
  studiesSub: Subscription;
//  pageSize: number = 10;
//  curPage: ReactiveVar<number> = new ReactiveVar<number>(1);
//  nameOrder: ReactiveVar<number> = new ReactiveVar<number>(1);
//  studiesSize: number = 0;
//  location: ReactiveVar<string> = new ReactiveVar<string>(null);
  user: Meteor.User;
  //user_email: string;

  constructor() {
//    super();
// 
//    this.autorun(() => {
//      let options = {
//        //limit: this.pageSize,
//        //skip: (this.curPage.get() - 1) * this.pageSize,
//        //sort: { name: this.nameOrder.get() }
//      };
// 
//      //this.subscribe('studies', options, this.location.get(), () => {
//      this.subscribe('studies', () => {
//        //this.studies = Studies.find({}, { sort: { name: this.nameOrder.get() } });
//        this.studies = Studies.find();
//      }, true);
//    });
// 
//    this.autorun(() => {
//      console.log("autorun");
//      this.studiesSize = Counts.get('numberOfStudies');
//    }, true);
  }

  ngOnInit() {
    //this.user_email = Meteor.user().emails[0].address;
    this.studies = Studies.find({}).zone();
    this.studiesSub = MeteorObservable.subscribe('studies').subscribe();
  }

  removeStudy(study) {
    if(confirm('Click OK to confirm deletion of this study')) {
      Studies.remove(study._id);
    } else {
    }
  }

  search(value: string) {
    //this.curPage.set(1);
    //this.location.set(value); //debug
    this.studies = Studies.find(value ? { location: value } : {}).zone();
  }
 
  //changeSortOrder(nameOrder: string) {
  //  this.nameOrder.set(parseInt(nameOrder));
  //}
 
  //onPageChanged(page: number) {
  //  this.curPage.set(page);
  //}
 
  isOwner(study: Study): boolean {
    if (this.user) {
      return this.user._id === study.owner;
      //return this.user_email === study.owner_email; // do not work
    }
 
    return false;
  }
}
