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
