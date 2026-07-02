import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ChatMessage {
  id: number;
  text: string;
  senderId: string;
  senderName: string;
  isAdmin: boolean;
  time: string;
  timestamp: number;
}

export interface ChatConversation {
  id: string;
  name: string;
  lastMessage: string;
  lastTime: string;
  unread: number;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private storageKey = 'driveflow_chats';
  private conversations: ChatConversation[] = [];
  private messagesMap: { [key: string]: ChatMessage[] } = {};

  private conversationsSubject = new BehaviorSubject<ChatConversation[]>([]);
  conversations$ = this.conversationsSubject.asObservable();

  constructor() {
    this.loadFromStorage();
  }

  loadConversations(userRole: string, username: string): ChatConversation[] {
    if (userRole === 'admin') {
      return this.conversations.filter(c => c.id !== 'admin');
    }
    const adminConv = this.conversations.find(c => c.id === 'admin');
    return adminConv ? [adminConv] : [];
  }

  getAdminConversationId(userRole: string, username: string): string {
    if (userRole === 'cliente') return `cliente_${username}`;
    return username;
  }

  getMessages(conversationId: string): ChatMessage[] {
    return this.messagesMap[conversationId] || [];
  }

  sendMessage(
    conversationId: string,
    text: string,
    sender: { username: string; name: string; role: string }
  ) {
    const message: ChatMessage = {
      id: Date.now(),
      text: text.trim(),
      senderId: sender.username,
      senderName: sender.name,
      isAdmin: sender.role === 'admin',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: Date.now()
    };

    if (!this.messagesMap[conversationId]) {
      this.messagesMap[conversationId] = [];
    }
    this.messagesMap[conversationId].push(message);

    if (sender.role === 'empresa' || sender.role === 'cliente') {
      const userConvId = sender.role === 'cliente' ? `cliente_${sender.username}` : sender.username;

      if (!this.messagesMap[userConvId]) {
        this.messagesMap[userConvId] = [];
      }
      this.messagesMap[userConvId].push({ ...message });

      this.upsertConversation({
        id: userConvId,
        name: sender.name,
        lastMessage: message.text,
        lastTime: message.time,
        unread: 0
      });
      this.upsertConversation({
        id: 'admin',
        name: 'Administrador',
        lastMessage: message.text,
        lastTime: message.time,
        unread: 0
      });
    } else {
      const userConv = this.conversations.find(c => c.id === conversationId);
      if (userConv) {
        this.messagesMap['admin'].push({ ...message });
        this.upsertConversation({
          id: 'admin',
          name: 'Administrador',
          lastMessage: message.text,
          lastTime: message.time,
          unread: 0
        });
      }
      this.upsertConversation({
        id: conversationId,
        name: userConv ? userConv.name : conversationId,
        lastMessage: message.text,
        lastTime: message.time,
        unread: 0
      });
    }

    this.saveToStorage();
    this.conversationsSubject.next([...this.conversations]);
  }

  markAsRead(conversationId: string) {
    const conv = this.conversations.find(c => c.id === conversationId);
    if (conv) {
      conv.unread = 0;
      this.saveToStorage();
      this.conversationsSubject.next([...this.conversations]);
    }
  }

  private upsertConversation(conv: ChatConversation) {
    const index = this.conversations.findIndex(c => c.id === conv.id);
    if (index >= 0) {
      this.conversations[index] = { ...this.conversations[index], ...conv };
    } else {
      this.conversations.push(conv);
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify({
        conversations: this.conversations,
        messages: this.messagesMap
      }));
    } catch (e) {
    }
  }

  private loadFromStorage() {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (data) {
        const parsed = JSON.parse(data);
        this.conversations = parsed.conversations || [];
        this.messagesMap = parsed.messages || {};
        this.conversationsSubject.next([...this.conversations]);
      }
    } catch (e) {
    }
  }
}
