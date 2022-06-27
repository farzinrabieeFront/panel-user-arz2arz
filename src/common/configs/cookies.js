import { Cookies as ReactCookies } from 'react-cookie'

const warning = () => {
    return false
}

class Cookies {
    _cookies

    constructor() {
        if (typeof window !== 'undefined') {
            this._cookies = new ReactCookies()
        } else {
            this._cookies = {
                get: warning,
                set: warning,
                remove: warning,
            }
        }
    }

    setCookies(name, data, opt) {
        this._cookies.set(name, data, opt)
    }

    removeCookie(name, opt) {
        this._cookies.remove(name, opt)
    }

    get cookies() {
        return this._cookies
    }
}

export const cookies = new Cookies()
export const getUniversalCookies = () => cookies.cookies
