import { supabase } from '@/lib/supabase'

export class ChatService {
    /**
     * Subscribe to a chat room (Order ID or Global)
     */
    static subscribeToRoom(roomId: string, onMessage: (msg: any) => void) {
        return supabase
            .channel(`chat:${roomId}`)
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'messages',
                filter: `room_id=eq.${roomId}`
            }, (payload) => {
                onMessage(payload.new)
            })
            .subscribe()
    }

    /**
     * Send a message to a room
     */
    static async sendMessage(roomId: string, senderId: string, content: string) {
        const { error } = await supabase
            .from('messages')
            .insert({
                room_id: roomId,
                sender_id: senderId,
                content: content,
                created_at: new Date().toISOString()
            })

        return { success: !error, error }
    }
}
