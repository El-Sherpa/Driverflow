import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonContent } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { AuthService } from '../../services/auth.service';
import { ChatService, ChatMessage } from '../../services/chat.service';

@Component({
  selector: 'app-chat-conversation',
  templateUrl: './chat-conversation.page.html',
  styleUrls: ['./chat-conversation.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
})
export class ChatConversationPage implements OnInit, OnDestroy {
  @ViewChild(IonContent) private content!: IonContent;

  participantName: string = '';
  conversationId: string = '';
  newMessage: string = '';
  messages: ChatMessage[] = [];
  sender: { username: string; name: string; role: string } = { username: '', name: '', role: '' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private translationService: TranslationService,
    private authService: AuthService,
    private chatService: ChatService
  ) {}

  ngOnInit() {
    this.conversationId = this.route.snapshot.queryParamMap.get('conversationId') || '';
    this.participantName = this.route.snapshot.queryParamMap.get('participantName') || '';

    const user = this.authService.currentUserValue;
    if (user) {
      this.sender = { username: user.username, name: user.name, role: user.role || '' };
    }

    this.loadMessages();
  }

  ngOnDestroy() {
    this.chatService.markAsRead(this.conversationId);
  }

  loadMessages() {
    this.messages = this.chatService.getMessages(this.conversationId);
    this.chatService.markAsRead(this.conversationId);
    setTimeout(() => this.scrollToBottom(), 100);
  }

  canSend(): boolean {
    return this.newMessage.trim().length > 0;
  }

  sendMessage() {
    if (!this.canSend()) return;
    this.chatService.sendMessage(this.conversationId, this.newMessage.trim(), this.sender);
    this.newMessage = '';
    this.loadMessages();
  }

  goBack() {
    this.router.navigate(['/chat-list']);
  }

  private scrollToBottom() {
    this.content?.scrollToBottom(200);
  }

  t(key: string): string {
    return this.translationService.translate(key);
  }
}
