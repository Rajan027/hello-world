import {Component} from '@angular/core';
import { CoursesService } from './courses.service';

@Component({
    selector: 'app-courses',
    template: `
    <h2 [textContent] = "title"></h2>
    <img [src]="imageUrl" />
    <table>
        <tr>
            <td [attr.colSpan] = "colSpan"></td>
        </tr>
    </table>
    <div (click) = "onDivClick()">
        <button [style.backgroundColor] = "isActive ? 'blue':'white'" (click) = "onSave($event)">Save</button>
    </div>
    <input [(ngModel)] = "email" (keyup.enter) = "onKeyUp()" />
    <hr/>
    {{course.title | uppercase | lowercase}} <br/>
    {{course.students | number}} <br/>
    {{course.rating | number: '2.1-1'}} <br/>
    {{course.price | currency: 'INR': true: '3.2-2'}} <br/>
    {{course.releaseDate | date: 'shortDate'}}
    <hr/>
    <p>{{text | summary: 10}}</p>
    `
})

export class CoursesComponent {
    title = 'List of Courses';
    imageUrl = 'http://lorempixel.com/400/200';
    colSpan = 2;
    isActive = true;
    email = 'me@example.com';
    courses;
    course = {
        title: 'The Complete Angular Course',
        rating: 4.9745,
        students: 30123,
        price: 190.95,
        releaseDate: new Date(2016, 3, 1)
    };
    text = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.';

    constructor(service: CoursesService) {
        this.courses = service.getCourses();
    }

    onDivClick() {
        console.log('Div was clicked!');
    }

    onSave($event) {
        $event.stopPropagation();
        console.log('Button was clicked!', $event);
    }

    onKeyUp() {
        console.log(this.email);
    }
}
