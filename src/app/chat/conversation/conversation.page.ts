import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { IonContent, IonList } from '@ionic/angular';
import { RouterStoreDispatcher } from 'src/app/core/state/router/router.dispatcher';
import { first } from 'rxjs/operators';
import { ChatStoreDispatcher } from 'src/app/core/state/chat/chat.dispatcher';
import { Message, Conversation } from 'src/app/core/state/chat/chat.state';
import { ProfileStoreDispatcher } from 'src/app/core/state/profile/profiles.dispatcher';
import { sortByTimestamp } from 'src/app/core/state/chat/chat.reducer';

@Component({
    'selector': 'app-conversation',
    'templateUrl': './conversation.page.html',
    'styleUrls': ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit, AfterViewInit {

    @ViewChild(IonContent) contentArea: IonContent;
    @ViewChild(IonList, {'read': ElementRef}) chatList: ElementRef;
    mutationObserver: MutationObserver;

    messages: Message[] = [];
    messageInput: string;

    friendID: string;
    friend: any;

    conversationID: string;
    conversation: Conversation;

    myID: string;

    constructor(
        private profileService: ProfileStoreDispatcher,
        private routerService: RouterStoreDispatcher,
        private chatService: ChatStoreDispatcher,
    ) {}

    ngOnInit() {
        this.fetchMessages();
    }

    ngAfterViewInit() {
        // Always scroll to bottom of chat list
        this.mutationObserver = new MutationObserver((mutations) => {
            this.contentArea.scrollToBottom();
        });
        this.mutationObserver.observe(this.chatList.nativeElement, {
            'childList': true
        });
    }

    async fetchMessages() {
        const router = await this.routerService.selectState().pipe(first()).toPromise();
        const routeID = router.state.params.id;
        this.conversationID = routeID;
        this.chatService.loadMessages(this.conversationID);
        // this.messages$ = this.chatService.selectMessages();
        this.chatService.selectScuffedMessages(this.conversationID).subscribe(messages => {
            this.messages = messages.sort(sortByTimestamp);
        });
        this.myID = (await this.profileService.selectUserProfile().pipe(first(profile => profile != null)).toPromise()).id;
        this.friendID = this.chatService.getOtherIDFromConversationID(this.myID, this.conversationID);
    }

    sendMessage() {
        this.messageInput = this.messageInput.trim();
        const message = this.messageInput;
        if (message.length > 0) {
            // Send Messages
            this.chatService.sendMessage(this.conversationID, message);
            this.messageInput = '';
        }
    }

    // Check if 'return' button is pressed and send the message.
    onType(keyCode) {
        if (keyCode === 13) {
            this.sendMessage();
        }
    }
}
