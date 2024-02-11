import { format } from 'date-fns'
import { messageTemplate } from './dom-elements'
import { email } from './requests.js'

export interface User {
	name: string
}

export interface IMessage {
	user: User
	text: string
	createdAt: Date
}

export function renderMessage(name: string, description: string, date: Date) {
	const cloneContent: HTMLElement = messageTemplate.content.cloneNode(
		true
	) as HTMLElement

	const data: IMessage = {
		user: { name },
		text: description,
		createdAt: date
	}

	const message = cloneContent.querySelector<HTMLDivElement>('.message')
	if (data.user.name === email) {
		message.className = 'my-message'
	}
	const userName = cloneContent.querySelector<HTMLSpanElement>('#name')
	const messageTitle =
		cloneContent.querySelector<HTMLSpanElement>('#message-title')
	const messageCreatedTime =
		cloneContent.querySelector<HTMLSpanElement>('#createdAt')

	userName.textContent = data.user.name
	messageTitle.textContent = data.text
	messageCreatedTime.textContent = format(data.createdAt, 'hh:mm')

	message.append(userName, messageTitle, messageCreatedTime)
	return message
}
