import {
    Injectable
} from '@angular/core';
import {
    Observable
} from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';


/**
 * This service is responsible for user authentication with Firebase.
 */
@Injectable({ 'providedIn': 'root' })
export class AuthService {

    constructor(
        private firebaseAuth: AngularFireAuth,
    ) {}

    /**
     * Observable of the currently signed-in user (or null if no user is signed in).
     */
    getUser(): Observable < firebase.User > {
        return this.firebaseAuth.user;
    }

    /**
     * Initiates an account creation with Firebase using email and password credentials
     * @param email the email address to register the account with
     * @param password the password to regsiter the account with
     */
    async createUserWithEmailAndPassword(email: string, password: string): Promise < void > {
        await this.firebaseAuth.createUserWithEmailAndPassword(email, password);
    }

    /**
     * Initiates a sign in to Firebase with email and password credentials
     * @param email the email address of the user
     * @param password the password of the user
     */
    async signInWithEmailAndPassword(email: string, password: string): Promise < void > {
        await this.firebaseAuth.signInWithEmailAndPassword(email, password);
    }

    /**
     * Initiates a sign in to Firebase anonymously
     */
    async signInAsGuest(): Promise < void > {
        await this.firebaseAuth.signInAnonymously();
    }

    /**
     * Initiates a password reset with Firebase
     * @param email the address associated with the account to initiate the password reset
     */
    async sendPasswordResetEmail(email: string): Promise < void > {
        await this.firebaseAuth.sendPasswordResetEmail(email);
    }

    /**
     * Initiates a sign out with Firebase. The authenticated user will be set to null.
     */
    async signOut(): Promise < void > {
        await this.firebaseAuth.signOut();
    }

}
