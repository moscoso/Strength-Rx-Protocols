import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { IonContent, IonList } from '@ionic/angular';
import { RouterStoreDispatcher } from 'src/app/core/state/router/router.dispatcher';
import { filter, first } from 'rxjs/operators';
import { Message, Conversation } from 'src/app/core/state/chat/chat.model';
import { ProfileFacade } from 'src/app/core/state/profile/profile.facade';
import { sortByTimestamp } from 'src/app/core/state/chat/chat.state';
import { AngularFirestore } from '@angular/fire/firestore';
import { getIDListFromConversationID, getOtherIDFromConversationID } from 'functions/src/strengthrx/ConversationHelpers';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
    'selector': 'app-conversation',
    'templateUrl': './conversation.page.html',
    'styleUrls': ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit, AfterViewInit {

    @ViewChild(IonContent) contentArea: IonContent;
    @ViewChild(IonList, { 'read': ElementRef }) chatList: ElementRef;
    mutationObserver: MutationObserver;

    messages: Message[] = [];
    messageInput: string;

    friendID: string;
    friend: any;

    conversationID: string;
    conversation: Conversation;

    myID: string;

    constructor(
        private profileService: ProfileFacade,
        private routerService: RouterStoreDispatcher,
        private firestore: AngularFirestore

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

        const list = getIDListFromConversationID(this.conversationID);

        const ID1 = list[0] + '-' + list[1];
        const ID2 = list[1] + '-' + list[0];

        this.firestore.collection(`conversations/${ID1}/messages`)
            .valueChanges().pipe(filter((messages: any) => messages != null && messages.length > 0)).subscribe(messages => {
                this.messages = messages.sort(sortByTimestamp) as Message[];
            });

        this.firestore.collection(`conversations/${ID2}/messages`)
            .valueChanges().pipe(filter((messages: any) => messages != null && messages.length > 0)).subscribe(messages => {
                this.messages = messages.sort(sortByTimestamp) as Message[];
            });

        this.firestore.collection(`conversations/${this.conversationID}/messages`)
            .valueChanges().pipe(filter((messages: any) => messages != null && messages.length > 0)).subscribe(messages => {
                this.messages = messages.sort(sortByTimestamp) as Message[];
            });
        this.myID = (await this.profileService.selectUserAsProfile().pipe(first(profile => profile != null)).toPromise()).id;
        this.friendID = getOtherIDFromConversationID(this.myID, this.conversationID);
    }

    sendMessage() {
        this.messageInput = this.messageInput.trim();
        const message = this.messageInput;
        if (message.length > 0) {
            // Send Messages
            this.sendMessageToFirebase(this.conversationID, message).then(messageSent => {
                this.messageInput = '';
            });
        }
    }

    // Check if 'return' button is pressed and send the message.
    onType(keyCode) {
        const RETURN_KEY = 13;
        const returnKeyPressed = keyCode === RETURN_KEY;
        if (returnKeyPressed) {
            this.sendMessage();
        }
    }

    public async sendMessageToFirebase(conversationID: string, text: string) {
        const profile = await this.profileService.selectUserAsProfile().pipe(first()).toPromise();
        const message: Message = {
            'id': null,
            conversationID,
            'senderID': profile.id,
            'senderName': `${profile.firstName} ${profile.lastName}`,
            text,
            'timestamp': new Date(),
        };

        const doc = this.firestore.collection(`conversations/${message.conversationID}/messages`);
        return doc.add(message).then((x) => {
            x.update({ 'id': x.id });
            return { ...message, 'id': x.id };
        });
    }

    // async getAvatar(profileID: string): Promise<string> {
    //     const profile = await this.profileService.selectProfile(profileID).pipe(first(profile => profile != null)).toPromise();
    //     return this.profileService.getAvatar(profile);
    // }
}
