import { Chat, Store, UserId } from "./Store";

export interface Room {
    roomId: string;
    chats: Chat[]
}

let globalChatId = 0;

export class InMemoryStore implements Store {
    private store: Map<string, Room>;
    constructor() {
        this.store = new Map<string, Room>();
    }
    initRoom(roomId: string) {
        this.store.set(roomId, {
            roomId,
            chats: []
        });
    }
    getChats(roomId: string, limit: number, offset: number){
        const room = this.store.get(roomId);
        if(!room) {
            return []
        }
        return room.chats.reverse().slice(0, offset).slice(-1*limit);
    }
    addChat(userId: UserId, name:string, message:string, roomId: string ){
        const room = this.store.get(roomId);
        if(!room) {
            return;
        }
        room.chats.push({
            id: (globalChatId++).toString(),
            userId,
            name,
            message,
            upvotes: []
        })
    }
    upvote(userId: UserId, roomId: string, chatId: string){
        const room = this.store.get(roomId);
        if(!room) {
            return;
        }
        //Todo: Make this faster
        const chat = room.chats.find(chat => chat.id===chatId);
        if(chat){
            chat.upvotes.push(userId);
        }
    }
}