export function querySelector<T extends HTMLElement>(name: string): T | null {
	return document.querySelector<T>(name)
}

export const headers = document.querySelectorAll('dialog .header')

export const messageTemplate =
	querySelector<HTMLTemplateElement>('#message-template')
export const chatContainer = querySelector<HTMLDivElement>('#chat-container')
export const messageForm = querySelector<HTMLFormElement>('#message-form')
export const messageInput = querySelector<HTMLInputElement>('#message-input')
export const settingsBtn = querySelector<HTMLButtonElement>('#settings-btn')
export const logOutBtn = querySelector<HTMLButtonElement>('#log-out')
export const authContent = querySelector<HTMLDialogElement>(
	'#authorization-content'
)
export const authForm = querySelector<HTMLFormElement>('#authorization-form')
export const authInput = querySelector<HTMLInputElement>('#authorization-input')
export const getCodeBtn = querySelector<HTMLButtonElement>('#get-code')
export const sendCodeBtn = querySelector<HTMLButtonElement>('#send-code')
export const confirmContent = querySelector<HTMLDialogElement>(
	'#confirmation-content'
)
export const confirmForm = querySelector<HTMLFormElement>('#confirmation-form')
export const confirmInput = querySelector<HTMLInputElement>(
	'#confirmation-input'
)
export const settingsContent =
	querySelector<HTMLDialogElement>('#settings-content')
export const nicknameForm = querySelector<HTMLFormElement>('#nickname-form')
export const nicknameInput = querySelector<HTMLInputElement>('#nickname-input')
