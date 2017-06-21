export interface PHPBBNotification {
  AVATAR: string
  FORMATTED_TITLE: string
  FORUM: string
  NOTIFICATION_ID: string
  REASON: string
  REFERENCE: string
  STYLING: string
  /** notification type (defaults: notifications) */
  S_BLOCK_NAME: string
  S_ROW_COUNT: number
  S_ROW_NUM: number
  /** time of the notification */
  TIME: string
  /** if we're unread or seen */
  UNREAD: boolean
  /** target url of the notification */
  URL: string
  /** Legacy URL to marks this as read */
  U_MARK_READ: string
}