export type UserId = string;

export interface Chat {
    id: string;
    userId: UserId;
    name: string;
    message: string;
    upvotes: UserId[];
}
export abstract class Store {
    constructor() {

    }
    initRoom(roomId: string) {
    }
    getChats(roomId: string, limit: number, offset: number){

    }
    addChat(userId: UserId, name:string, message:string, roomId: string){

    }
    upvote(userId: UserId, roomId: string, chatId: string){

    }
}