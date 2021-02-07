import { Component, OnInit, Input } from '@angular/core';
import { ProfileFacade } from 'src/app/core/state/profile/profile.facade';
import { ChatFacade } from 'src/app/core/state/chat/chat.facade';
import { whenNonNull } from 'src/util/operator/Operators';

@Component({
    'selector': 'go-to-chat-button',
    'templateUrl': './go-to-conversation-button.component.html',
    'styleUrls': ['./go-to-conversation-button.component.scss'],
})
export class GoToConversationButtonComponent implements OnInit {

    @Input() userID: string;

    public conversationLink: string;

    constructor(
        private profileService: ProfileFacade,
        private chatService: ChatFacade,
    ) {}

    ngOnInit() {
        this.setConversationLink();
    }

    async setConversationLink() {
        const errorMessage = `GoToConversationButtonComponent expected ${this.userID}`;
        if (!this.userID) { throw new Error(errorMessage); }
        const myProfile = await whenNonNull(this.profileService.selectUserAsProfile());
        const conversationID = this.chatService.calculateConversationID(this.userID, myProfile.id);
        this.conversationLink = `/chat/${conversationID}`;
    }

}
