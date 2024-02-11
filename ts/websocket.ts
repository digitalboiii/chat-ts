import { chatContainer } from './dom-elements.js'
import { renderMessage } from './renderMessage.js'
import { token } from './requests.js'

export const socket = new WebSocket(`wss://edu.strada.one/websockets?${token}`)

export function realTimeMessages() {
	socket.onopen = event => {
		console.log('Connected')
	}

	socket.onmessage = event => {
		const data = JSON.parse(event.data)
		const messageItem = renderMessage(data.user.name, data.text, data.createdAt)
		chatContainer.prepend(messageItem)
	}

	socket.onclose = event => {
		console.log('Disconnected')
	}
}

export function sendMessage(userMessage: HTMLInputElement) {
	try {
		if (userMessage.value === '') {
			userMessage.placeholder = 'Поле не должно быть пустым.'
		} else {
			const message = {
				text: userMessage.value
			}
			socket.send(JSON.stringify(message))
		}
	} catch (err) {
		console.error(err)
	}
}
