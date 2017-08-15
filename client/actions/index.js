export * from './entities'

// src
import { CALL_API } from '../middleware/api'


export const META_LOGO_LINK_SET = 'META_LOGO_LINK_SET'
export function setLogoLink(link) {
    return {
        type: META_LOGO_LINK_SET,
        payload: link
    }
}

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'
export function resetErrorMessages() {
    return {
        type: RESET_ERROR_MESSAGE
    }
}

export const OPEN_FORM_DIALOG = 'OPEN_FORM_DIALOG'
export function openFormDialog() {
    return {
        type: OPEN_FORM_DIALOG
    }
}

export const CLOSE_FORM_DIALOG = 'CLOSE_FORM_DIALOG'
export function closeFormDialog() {
    return {
        type: CLOSE_FORM_DIALOG
    }
}

export const OPEN_NICKNAME_DIALOG = 'OPEN_NICKNAME_DIALOG'
export function openNicknameDialog() {
    return {
        type: OPEN_NICKNAME_DIALOG
    }
}

export const CLOSE_NICKNAME_DIALOG = 'CLOSE_NICKNAME_DIALOG'
export function closeNicknameDialog() {
    return {
        type: CLOSE_NICKNAME_DIALOG
    }
}
