import {
	authorizeUser,
	changeNickname,
	confirmUser,
	showMessages,
	token
} from './requests.js'
import {
	authContent,
	authForm,
	confirmContent,
	confirmForm,
	confirmInput,
	headers,
	logOutBtn,
	messageForm,
	messageInput,
	nicknameForm,
	nicknameInput,
	sendCodeBtn,
	settingsBtn,
	settingsContent
} from './dom-elements.js'
import { realTimeMessages, sendMessage, socket } from './websocket.js'
import * as Cookies from 'js-cookie'

window.addEventListener('DOMContentLoaded', async () => {
	if (!token) {
		authContent.showModal()
	} else {
		await showMessages()
		realTimeMessages()
	}
})

headers.forEach(header => {
	header.addEventListener('click', (e: MouseEvent) => {
		const target = e.target as HTMLElement

		if (target.matches('#close-btn')) {
			const dialog = target.closest('dialog')
			const confirmDialog = target.closest('dialog#confirmation-container')
			if (dialog) {
				dialog.close()
			}
		}
	})
})

authForm.addEventListener('submit', (e: Event) => {
	e.preventDefault()

	authorizeUser()
})

confirmForm.addEventListener('submit', (e: Event) => {
	confirmUser(confirmInput.value)
})

sendCodeBtn.addEventListener('click', (e: Event) => {
	e.preventDefault()

	confirmContent.showModal()
	authContent.close()
})

settingsBtn.addEventListener('click', (e: Event) => {
	e.preventDefault()

	settingsContent.showModal()
})

logOutBtn.addEventListener('click', (e: Event) => {
	Cookies.remove('token')
	Cookies.remove('email')
	location.reload()
})

messageForm.addEventListener('submit', (e: Event) => {
	sendMessage(messageInput)
	messageInput.value = ''
})

nicknameForm.addEventListener('submit', (e: Event) => {
	e.preventDefault()

	changeNickname(nicknameInput)
	nicknameInput.value = ''
})
