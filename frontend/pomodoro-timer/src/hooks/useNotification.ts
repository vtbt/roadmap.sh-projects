import { useCallback, useEffect, useState } from 'react'

interface NotificationOptions {
  title: string
  body: string
  icon?: string
}

// Custom hook for managing notification permission and sending notification
export const useNotification = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default')

  // Good - safe for both server and client
  const isSupported = typeof window !== 'undefined' && 'Notification' in window // ✅ Safe

  const requestPermission = useCallback(async () => {
    if (!isSupported || permission !== 'default') return

    // Automatically request permission if not already granted
    try {
      const result = await Notification.requestPermission()
      setPermission(result)
    } catch (error) {
      console.error('Permission request failed:', error)
    }
  }, [permission, isSupported])

  useEffect(() => {
    // Check if notifications are supported
    if (!isSupported) {
      console.warn('This browser does not support desktop notifications')
      return
    }

    // Check current permission status
    setPermission(Notification.permission)
    requestPermission()
  }, [isSupported, requestPermission])

  // Function to send a notification
  const sendNotification = useCallback(
    ({ title, body, icon }: NotificationOptions) => {
      if (!isSupported || permission !== 'granted') {
        console.warn('Cannot send notification. Permission not granted.')
        return
      }

      try {
        new Notification(title, {
          body,
          icon,
        })
      } catch (error) {
        console.error('Failed to send notification:', error)
      }
    },
    [isSupported, permission]
  )

  return {
    permission,
    sendNotification,
  }
}
