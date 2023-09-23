import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IPersonalInformation } from './app.interface';
import { LangType } from 'src/shared/services/lang/lang.interface';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  getInfo(lang: LangType): Observable<IPersonalInformation> {
    switch (lang) {
      case 'pl':
        return of({
          info: {
            person: 'Izabela Wlazło',
            avatar: 'assets/img/avatar.png',
            phone: '(+48) 733 *** 028',
            email: 'izabelawlazlo9@gmail.com',
            linkedIn: '@izabelawl',
          },
          experience: [
            {
              title: 'ANGULAR FRONTEND DEVELOPER (10.2021 - OBECNIE)',
              company: 'Transition Technologies-Software',
              description: [
                'Odpowiedzialność za tworzenie i rozwój aplikacji w technologii Angular',
                'Opracowywanie architektury',
                'Wsparcie w procesie diagnozy i naprawy błędów oprogramowania',
                'Wykonywanie code review',
                'Wytwarzanie oprogramowania z wykorzystaniem metodyki SCRUM',
              ],
            },
            {
              title: 'PRAKTYKANT (07-09.2021)',
              company: 'Transition Technologies-Software',
              description: [
                'Projektowanie, implementacja, utrzymanie funkcjonalności frontendowych opartych o Angular',
                'Dokonywanie naprawy błędów aplikacji',
                'Praca z zespołem programistycznym z wykorzystaniem metodyki SCRUM',
              ],
            },
            {
              title: 'PRAKTYKANT (12.2020 - 01.2021)',
              company: 'ZETO RZESZÓW',
              description: [
                'Projektowanie, implementacja, utrzymanie funkcjonalności frontendowych opartych o Vue.js',
                'Dokonywanie naprawy błędów aplikacji',
              ],
            },
          ],
          education: [
            {
              title: 'INFORMATYKA I EKONOMETRIA (2017- 2021)',
              company: 'Uniwersytet Rzeszowski',
              description: [
                'Specjalizacja: Systemy informatyczne w zarządzaniu',
                'Uzyskany tytuł: Inżynier',
              ],
            },
          ],
          skills: [
            { name: 'html5/css3', level: 4 },
            { name: 'JavaScript', level: 3 },
            { name: 'TypeScript', level: 3 },
            { name: 'Angular', level: 3 },
            { name: 'React JS', level: 2 },
            { name: 'Sass', level: 2 },
            { name: 'Bootstrap', level: 3 },
            { name: 'Git', level: 3 },
          ],
        });
      case 'en':
        return of({
          info: {
            person: 'Izabela Wlazło',
            avatar: 'assets/img/avatar.png',
            phone: '(+48) 733 *** 028',
            email: 'izabelawlazlo9@gmail.com',
            linkedIn: '@izabelawl',
          },
          experience: [
            {
              title: 'ANGULAR FRONTEND DEVELOPER (10.2021 - CURRENTLY)',
              company: 'Transition Technologies-Software',
              description: [
                'Responsible for creating and developing applications in Angular technology',
                'Architectural design',
                'Assisting in software debugging and troubleshooting',
                'Conducting code reviews',
                'Software development using SCRUM methodology',
              ],
            },
            {
              title: 'INTERN (07-09.2021)',
              company: 'Transition Technologies-Software',
              description: [
                'Design, implementation, and maintenance of Angular-based frontend functionalities',
                'Application bug fixes',
                'Collaboration with a development team using SCRUM methodology',
              ],
            },
            {
              title: 'INTERN (12.2020 - 01.2021)',
              company: 'ZETO RZESZÓW',
              description: [
                'Design, implementation, and maintenance of Vue.js-based frontend functionalities',
                'Application bug fixes',
              ],
            },
          ],
          education: [
            {
              title: 'COMPUTER SCIENCE AND ECONOMETRICS (2017- 2021)',
              company: 'University of Rzeszów',
              description: [
                'Specialization: Information Systems in Management',
                'Degree obtained: Engineer',
              ],
            },
          ],
          skills: [
            { name: 'html5/css3', level: 4 },
            { name: 'JavaScript', level: 3 },
            { name: 'TypeScript', level: 3 },
            { name: 'Angular', level: 3 },
            { name: 'React JS', level: 2 },
            { name: 'Sass', level: 2 },
            { name: 'Bootstrap', level: 3 },
            { name: 'Git', level: 3 },
          ],
        });
      default:
        return of();
    }
  }
}