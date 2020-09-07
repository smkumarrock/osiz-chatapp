import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChatInterfaceComponent } from './chat-interface/chat-interface.component';
import { ChatLoginComponent } from './chat-login/chat-login.component';
import { MessageComponent } from './message/message.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { ChatService } from './chat.service';

const routes: Routes = [
  {path:'', component: ChatLoginComponent},
  {path:'openchat/:roomId', component: MessageComponent},
  {path:'chat-users/:cuser_id', component: ChatInterfaceComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    ChatInterfaceComponent,
    ChatLoginComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
