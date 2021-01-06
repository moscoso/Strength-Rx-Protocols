import { Component, OnInit, Input } from '@angular/core';
import { ProfileStoreDispatcher } from 'src/app/core/state/profile/profiles.dispatcher';
import { ChatStoreDispatcher } from 'src/app/core/state/chat/chat.dispatcher';
import { first } from 'rxjs/operators';

@Component({
    'selector': 'go-to-chat-button',
    'templateUrl': './go-to-conversation-button.component.html',
    'styleUrls': ['./go-to-conversation-button.component.scss'],
})
export class GoToConversationButtonComponent implements OnInit {

    @Input() userID: string;

    public conversationLink: string;

    constructor(
        private profileService: ProfileStoreDispatcher,
        private chatService: ChatStoreDispatcher,
    ) {}

    ngOnInit() {
        this.setConversationLink();
    }

    async setConversationLink() {
        const errorMessage = `GoToConversationButtonComponent expected ${this.userID}`;
        if (!this.userID) { throw new Error(errorMessage); }
        const myProfile = await this.profileService.selectUserAsProfile().pipe(first(profile => profile != null)).toPromise();
        const conversationID = this.chatService.calculateConversationID(this.userID, myProfile.id);
        this.conversationLink = `/chat/${conversationID}`;
    }

}
