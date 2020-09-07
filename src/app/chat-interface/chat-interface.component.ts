import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ChatService } from "./../chat.service";

@Component({
  selector: 'app-chat-interface',
  templateUrl: './chat-interface.component.html',
  styleUrls: ['./chat-interface.component.css']
})
export class ChatInterfaceComponent implements OnInit {

  User_Arr:Array<{_id: String, name: String, room: String, message: String}> = [];
  Arr = [];
  selectedRoom: String;
  newMessage: string;
  currentUserRoomId: string;
  currentUser: string;
  currentUserDetails: {room: String, message: String, _id: String, name: String};
  currentUserDetails_2: any;

  messageList:Array<{room: String, message: String}>=[];
  constructor(private router: Router, private chatService: ChatService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(currentuser=>{
      this.currentUserRoomId = currentuser.cuser_id;
    })
    
    this.chatService.UserList();
    console.log(this.currentUserRoomId);
    this.chatService.SingleUserDetails(this.currentUserRoomId);
    this.chatService.getCurrentUserDetails().subscribe(user=>{
      console.log(user);
      this.currentUserDetails = user[0];
    })

    this.chatService.getUsers().subscribe(users=>{
      console.log('response');
      console.log(users, typeof(users));
      for(var i=0; i<users.length; i++){
        if(users[i].room == this.currentUserRoomId){
          users.splice(i, 1);
        }
      }
      this.User_Arr = users;
      if(this.User_Arr.length > 0 && this.User_Arr[0].name != 'Group'){
        this.User_Arr.splice(0, 0, {'room': 'room', 'name': 'Group', '_id': '', 'message': ''});
      }
      console.log('this.currentUserDetails', this.currentUserDetails);
      console.log(this.User_Arr);
      
    });
  }
  
  joinRoom(req_user){
    console.log(this.currentUserRoomId);
    console.log(this.currentUserDetails);
    console.log(req_user);
    this.selectedRoom = req_user.room;
    if(req_user.room == 'room'){
      var roomJoinObj_1 = {'curUserRoom': 'room', 'targtUserRoom': req_user.room}
      this.chatService.joinroom(roomJoinObj_1);
      this.router.navigate(['/openchat/'+this.currentUserDetails.room+'-'+req_user.room]);
      this.User_Arr = [];
    } else {
      var roomJoinObj = {'curUserRoom': this.currentUserDetails.room, 'targtUserRoom': req_user.room}
      console.log(roomJoinObj);
      this.chatService.joinroom(roomJoinObj);
      this.router.navigate(['/openchat/'+this.currentUserDetails.room+'-'+req_user.room]);
      this.User_Arr = [];
    }
  }

}
