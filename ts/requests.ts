import * as Cookies from 'js-cookie'
import { customErrors } from './custom-errors.js'
import {
	authContent,
	authInput,
	chatContainer,
	confirmContent,
	nicknameInput
} from './dom-elements.js'
import { IMessage, renderMessage } from './renderMessage.js'

type ResponseData = IMessage[] | string

export const token = Cookies.get('token')
export const email = Cookies.get('email')

const responseHeaders = {
	'Content-Type': 'application/json;charset=utf-8'
}

async function genericRequest<ResponseDetails>(
	apiURL: string,
	method: string,
	headers: HeadersInit,
	body?: string
): Promise<ResponseDetails> {
	const request = await fetch(apiURL, {
		method: method,
		headers: headers,
		body: body
	})

	if (!request.ok) {
		customErrors(request.status)
	}
	return request.json()
}

export async function authorizeUser() {
	try {
		const authorizationApiURL = 'https://edu.strada.one/api/user'
		const authorizationBody = {
			email: authInput.value
		}
		const response = await genericRequest<{ email: string; name: string }>(
			authorizationApiURL,
			'POST',
			responseHeaders,
			JSON.stringify(authorizationBody)
		)

		Cookies.set('email', response.email)

		confirmContent.showModal()
		authContent.close()
	} catch (err: unknown) {
		console.error(err)
	}
}

export async function confirmUser(token: string) {
	try {
		const authenticationHeaders = {
			...responseHeaders,
			'Authorization': `Bearer ${token}`
		}

		const response = await genericRequest<{
			id: string
			name: string
			email: string
			token: string
		}>('https://edu.strada.one/api/user/me', 'GET', authenticationHeaders)

		if (response) {
			Cookies.set('token', response.token)
			Cookies.set('email', response.email)
			location.reload()
		} else {
			customErrors(response)
		}
	} catch (err: unknown) {
		console.error(err)
	}
}

export async function showMessages() {
	try {
		const messageHeaders = {
			...responseHeaders,
			'Authorization': `Bearer ${token}`
		}

		const response = await genericRequest<{ messages: ResponseData }>(
			'https://edu.strada.one/api/messages/',
			'GET',
			messageHeaders
		)

		const data = response.messages

		if (Array.isArray(data)) {
			data.forEach((item: IMessage) => {
				const messageItem = renderMessage(
					item.user.name,
					item.text,
					new Date(item.createdAt)
				)
				chatContainer.append(messageItem)
			})
		} else {
			console.error('Data is not an array:', data)
		}
	} catch (err: unknown) {
		console.error(err)
	}
}

export async function changeNickname(nickname) {
	try {
		const patchRequestHeaders = {
			...responseHeaders,
			'Authorization': `Bearer ${token}`
		}

		if (nickname.value !== '') {
			const dataToSend = {
				name: nickname.value
			}
			const response = await genericRequest(
				'https://edu.strada.one/api/user',
				'PATCH',
				patchRequestHeaders,
				JSON.stringify(dataToSend)
			)
			if (response) {
				customErrors(response)
			}
			alert(`Nickname successfully changed 🎉`)
			location.reload()
		} else {
			nicknameInput.placeholder = 'Nickname cannot be empty'
		}
	} catch (err) {
		console.error(err)
	}
}
