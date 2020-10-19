import { Component, OnInit } from '@angular/core';
import {GithubServiceService} from "../../services/github-service.service";
import {NgxSpinnerModule, NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-github-app',
  templateUrl: './github-app.component.html',
  styleUrls: ['./github-app.component.css']
})
export class GithubAppComponent implements OnInit {

  public githubUserQuery : string ;
  public githubProfile:any;
  public githubRepos:any;
  public errorMessage:string;

  constructor(private githubService:GithubServiceService, private ngxSpinner:NgxSpinnerService) { }

  public searchUser(){
    // display the spinner before the server/service call
    this.ngxSpinner.show();

    // to get the github profile
      this.githubService.getProfile(this.githubUserQuery).subscribe((data) =>{
        this.githubProfile = data;
      } , (error) => {
          this.errorMessage = error;
      });

      // to get the repos
    this.githubService.getRepos(this.githubUserQuery).subscribe((data)=>{
      this.githubRepos = data;
        this.ngxSpinner.hide();
    },(error)=>{
      this.errorMessage = error;
    })

    console.log(this.githubProfile);
  }


  ngOnInit(): void {
  }

}
