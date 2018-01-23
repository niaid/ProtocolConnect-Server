import 'reflect-metadata';
import { Component, OnInit } from '@angular/core';
//import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'; 
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Meteor } from 'meteor/meteor';

import { Studies } from '../../../../both/collections/studies.collection';

import { Study } from '../../../../both/models/study.model';

import { InjectUser } from 'angular2-meteor-accounts-ui';
 
import template from './studies-form.component.html';
 
@Component({
  selector: 'studies-form',
  template
})
@InjectUser('user')
export class StudiesFormComponent implements OnInit {
  user: Meteor.User;
  studiesForm: FormGroup;
 
  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.studiesForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      location: ['', Validators.required],
      'public': [false]
    });
  }

  addStudy(): void {
    if (!Meteor.userId()) {
      alert('Please log in to add a party');
      return;
    }
    if (this.studiesForm.valid) {
      Studies.insert(Object.assign({}, this.studiesForm.value, {
        owner: Meteor.userId(),
        owner_email: Meteor.user().emails[0].address
      }));

      this.studiesForm.reset();
    } else {
      alert("Please check and make sure the required fields (Name and Location) are provided")
    }
  }
}
