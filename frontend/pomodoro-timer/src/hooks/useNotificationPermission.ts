import { useEffect, useState } from 'react'

// Custom hook for managing notification permission
export const useNotificationPermission = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default')

  useEffect(() => {
    // Check if notifications are supported
    if (!('Notification' in window)) {
      console.warn('This browser does not support desktop notifications')
      return
    }

    // Check current permission status
    const currentPermission = Notification.permission
    setPermission(currentPermission)

    // Automatically request permission if not already granted
    const requestPermission = async () => {
      try {
        if (currentPermission === 'default') {
          const result = await Notification.requestPermission()
          setPermission(result)

          // Log the result for debugging
          if (result === 'granted') {
            console.log('Notification permission granted')
          } else if (result === 'denied') {
            console.warn('Notification permission denied')
          }
        }
      } catch (error) {
        console.error('Error requesting notification permission:', error)
      }
    }

    // Call the permission request
    requestPermission()
  }, []) // Empty dependency array means this runs once on mount

  // Function to send a notification
  const sendNotification = (options: { title: string; body: string; icon?: string }) => {
    if (permission !== 'granted') {
      console.warn('Cannot send notification. Permission not granted.')
      return
    }

    try {
      new Notification(options.title, {
        body: options.body,
        icon: options.icon || undefined,
        // Optional additional configuration
        requireInteraction: false,
        silent: false,
      })
    } catch (error) {
      console.error('Failed to send notification:', error)
    }
  }

  return {
    permission,
    sendNotification,
  }
}
