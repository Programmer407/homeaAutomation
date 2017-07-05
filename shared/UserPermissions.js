// At the backend, this information is computed at business layer
// and doesn't come directly from the DB.
export const CAN_BROADCAST_MESSAGE = 'CAN_BROADCAST_MESSAGE'
export const CAN_MANAGE_EVENT_LEADS = 'CAN_MANAGE_EVENT_LEADS'
export const CAN_EDIT_EVENT = 'CAN_EDIT_EVENT'
export const CAN_MANAGE_USERS = 'CAN_MANAGER_USERS'

export const hasPermission = (user, permission) => user.permissions && user.permissions[permission]
