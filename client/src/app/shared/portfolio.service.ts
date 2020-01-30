import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, tap} from 'rxjs/operators';

import { User } from './user';
import { Project } from './project';
import { ProExperience } from './proExperience';
import { Trainings } from './trainings';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private baseUrl = 'http://localhost:3000'

  users : User[];
  user : User;
  projects: Project[];
  proExperience: ProExperience[];
  trainings: Trainings[];
  techskills: { name : string }[] = [];
  languages: { name : string }[] = [];
  softSkills: { name : string }[] = [];

  constructor( private http : HttpClient) { this.initAPI() }

  // User
  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  };

  // Projects
  getProjects(): Observable<any> {
    return this.http.get(`${this.baseUrl}/projects`);
  };

  // proExperience
  getProExperience(): Observable<any> {
    return this.http.get(`${this.baseUrl}/proExperiences`);
  };

  // trainings
  getTrainings(): Observable<any> {
    return this.http.get(`${this.baseUrl}/trainings`);
  };

  // synchronisation des méthodes get
  getAPIForkJoin() : Observable<any[]> {
    return forkJoin(
      this.getUsers(),
      this.getProjects(),
      this.getProExperience(),
      this.getTrainings()
    ).pipe(
      map(([users, projects, proExperience, trainings]) => 
      [
        users,
        projects,
        proExperience,
        trainings
      ])
    )
  }

  initAPI(){
    this.getAPIForkJoin().subscribe((response : any) => {
      this.users = response[0];
      this.user = this.users[0]
      this.projects = response[1];
      this.proExperience = response[2];
      this.trainings = response[3];
      console.log(this.projects)
      this.getTechSkills(this.user.techskill)
      this.getLanguages(this.user.language)
      this.getSoftSkills(this.user.softskill)
    })
  };


  getTechSkills(techskills){
    let techSkills = techskills.split(", ");
    for (let t of techSkills){
      this.techskills.push({
        name : t
      })
    }
  };

  getLanguages(langagues){
    let lang = langagues.split(", ");
    for (let l of lang){
      this.languages.push({
        name : l
      })
    }
  };

  getSoftSkills(softSkills){
    let softSk = softSkills.split(", ");
    for (let s of softSk){
      this.softSkills.push({
        name : s
      })
    }
  };


}
