import { Client, StompSubscription } from '@stomp/stompjs'
import { useEffect, useRef, useState } from 'react'
import { useAuthStore } from '../store/AuthStore'

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
  const { accessToken } = useAuthStore()

  useEffect(() => {
    if (!accessToken || !roomId) {
      setError(true)
      return
    }

    if (clientRef.current?.active) {
      return
    }

    const client = new Client({
      brokerURL: 'ws://34.64.72.48:8080/ws-stomp',
      connectHeaders: { access: accessToken },
      reconnectDelay: 5000,
      onConnect: () => {
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
          headers: { access: accessToken },
          body: JSON.stringify({ type: 'ENTER', roomId, message: '' }),
        })
      },
      onDisconnect: () => {
        setIsConnected(false)
      },
      onWebSocketError: () => {
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
  }, [roomId, accessToken])

  const sendMessage = (text: string) => {
    if (!text.trim() || !clientRef.current) return

    clientRef.current.publish({
      destination: '/pub/chat/message',
      headers: { access: accessToken! },
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
