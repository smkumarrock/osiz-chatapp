import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ChatService } from "./../chat.service";

@Component({
  selector: 'app-chat-login',
  templateUrl: './chat-login.component.html',
  styleUrls: ['./chat-login.component.css']
})
export class ChatLoginComponent implements OnInit {

  constructor(private chatService: ChatService, private router: Router) { }

  ngOnInit() {
  }
  chatLogin(uname: string){
    console.log(uname);
    this.chatService.saveUser({name: uname});
    this.chatService.getCurrentUser().subscribe(data=>{
      console.log(data.ops[0]._id);
      this.router.navigate(['/chat-users/'+data.ops[0].room]);
    });
  }

}
