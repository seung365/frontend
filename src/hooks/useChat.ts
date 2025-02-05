// hooks/useChat.ts
import { Client, StompSubscription } from '@stomp/stompjs'
import { useEffect, useRef, useState } from 'react'

interface ChatMessage {
  type: 'ENTER' | 'TALK'
  roomId: string
  message: string
  sender?: string
  nickname?: string
}

const useChat = (roomId: string) => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [error, setError] = useState<boolean>(false)
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const clientRef = useRef<Client | null>(null)
  const subscriptionRef = useRef<StompSubscription | null>(null)
  const token = localStorage.getItem('accessToken')

  useEffect(() => {
    if (!token || !roomId) {
      console.log('token 또는 roomId가 없습니다')
      setError(true)
      return
    }

    if (clientRef.current?.active) {
      console.log('⚠️ 이미 활성화된 WebSocket 연결이 있습니다.')
      return
    }

    const client = new Client({
      brokerURL: 'ws://34.64.72.48:8080/ws-stomp',
      connectHeaders: { access: token },
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('✅ STOMP 연결 완료')
        setIsConnected(true)
        clientRef.current = client

        if (!subscriptionRef.current) {
          subscriptionRef.current = client.subscribe(
            `/sub/chat/room/${roomId}`,
            (message) => {
              setMessages((prev) => [...prev, JSON.parse(message.body)])
            },
          )
        }

        client.publish({
          destination: '/pub/chat/message',
          headers: { access: token },
          body: JSON.stringify({ type: 'ENTER', roomId, message: '' }),
        })
      },
      onDisconnect: () => {
        console.log('❌ STOMP 연결 끊김')
        setIsConnected(false)
      },
      onWebSocketError: () => {
        console.log('❌ WebSocket 연결 에러')
        setError(true)
      },
    })

    client.activate()

    return () => {
      setIsConnected(false)

      if (clientRef.current) {
        subscriptionRef.current?.unsubscribe()
        subscriptionRef.current = null
        clientRef.current.deactivate()
        clientRef.current = null
      }
    }
  }, [roomId, token])

  const sendMessage = (text: string) => {
    if (!text.trim() || !clientRef.current) return

    clientRef.current.publish({
      destination: '/pub/chat/message',
      headers: { access: token! },
      body: JSON.stringify({ type: 'TALK', roomId, message: text }),
    })
  }

  return {
    messages,
    sendMessage,
    error,
    isConnected,
  }
}

export default useChat
