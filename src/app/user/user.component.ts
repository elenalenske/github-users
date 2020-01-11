import { Component, OnInit } from '@angular/core';
import axios from "axios";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  BASE_URL = "https://api.github.com";
  userStatus = 'No user has been selected';
  userName = '';
  userChecked = false;
  user = '';
  repos = [];
  orgs = [];

  constructor() { }

  ngOnInit() {
  }

  onCheckUser() {
    this.userChecked = true;
    this.userStatus = "The search results for " + this.userName + ":";
    this.getUserData();
    this.getRepos();
  }

  getRepos() {
    const url = `${this.BASE_URL}/users/${this.userName}/repos?per_page=250`;
    axios.get(url).then(repos => {
      this.repos = repos.data;
      // console.log('Repos:', repos);
    });
  }

  getUserData() {
    axios.all([
      axios.get(`${this.BASE_URL}/users/${this.userName}`),
      axios.get(`${this.BASE_URL}/users/${this.userName}/orgs`)
    ])
    .then(([user, orgs]) => {
      this.user = user.data;
      this.orgs =  orgs.data;
      // console.log('User:', this.user, 'Orgs:', this.orgs);
    });
  }
}
