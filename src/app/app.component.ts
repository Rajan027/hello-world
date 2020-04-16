import { Component, Output } from '@angular/core';
import { FavoriteChangedEventArgs } from './favorite/favorite.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hello-world';

  post = {
    title: 'Title',
    isFavorite: true
  };

  courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
  ];

  courseList;

  viewMode = 'map';

  task = {
    title: 'Review Application',
    assignee: {
      name: 'John Smith'
    }
  };

  onFavoriteChange(eventArgs: FavoriteChangedEventArgs) {
    console.log('Favorite changed: ', eventArgs);
  }

  IsCoursesAvailable() {
    return this.courses.length > 0;
  }

  onAdd() {
    this.courses.push({id: 4, name: 'course4'});
  }

  onChange(course) {
    course.name = 'UPDATED';
  }

  loadCourses() {
    this.courseList = [
      {id: 1, name: 'course1'},
      {id: 2, name: 'course2'},
      {id: 3, name: 'course3'}
    ];
  }

  trackCourse(index, course) {
      return course ? course.id : undefined;
  }
}
