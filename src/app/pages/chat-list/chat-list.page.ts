import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslationService } from '../../services/translation.service';
import { AuthService } from '../../services/auth.service';
import { ChatService, ChatConversation } from '../../services/chat.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.page.html',
  styleUrls: ['./chat-list.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class ChatListPage implements OnInit, OnDestroy {
  chats: ChatConversation[] = [];
  userRole: string | null = null;
  currentUsername: string = '';
  currentUserName: string = '';
  private sub = new Subscription();

  constructor(
    private router: Router,
    private translationService: TranslationService,
    private authService: AuthService,
    private chatService: ChatService
  ) {}

  ngOnInit() {
    const user = this.authService.currentUserValue;
    if (user) {
      this.userRole = user.role;
      this.currentUsername = user.username;
      this.currentUserName = user.name;
      this.loadChats();
    }

    this.sub.add(
      this.chatService.conversations$.subscribe(() => {
        this.loadChats();
      })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  loadChats() {
    this.chats = this.chatService.loadConversations(this.userRole!, this.currentUsername);
  }

  startChatWithAdmin() {
    const conversationId = this.userRole === 'cliente' ? `cliente_${this.currentUsername}` : 'admin';
    this.router.navigate(['/chat-conversation'], {
      queryParams: { conversationId, participantName: 'Administrador' }
    });
  }

  openChat(chat: ChatConversation) {
    this.router.navigate(['/chat-conversation'], {
      queryParams: { conversationId: chat.id, participantName: chat.name }
    });
  }

  t(key: string): string {
    return this.translationService.translate(key);
  }
}
