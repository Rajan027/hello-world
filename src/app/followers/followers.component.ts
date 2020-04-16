import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {

  followers;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    combineLatest([this.route.paramMap, this.route.queryParamMap])
      .pipe(switchMap(combined => {
        console.log(combined[1].get('page'));
        console.log(combined[1].get('order'));
        // call the service to get follower(s)
        // this.service.getAll();
        return new Array([
          {id: 1, name: 'Rajan', avatar: 'https://api.adorable.io/avatars/68/abott@adorable.png'},
          {id: 2, name: 'Sagar', avatar: 'https://api.adorable.io/avatars/68/abott@adorable.png'},
          {id: 3, name: 'Mayank', avatar: 'https://api.adorable.io/avatars/68/abott@adorable.png'},
          {id: 4, name: 'Gaurav', avatar: 'https://api.adorable.io/avatars/68/abott@adorable.png'}
        ]);
      }))
      .subscribe(result => {
        this.followers = result;
      });
  }
}
