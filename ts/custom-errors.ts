export function customErrors(errorStatus) {
	switch (errorStatus) {
		case 500:
			throw new Error('Что-то не так с никнеймом.')
		case 400:
			throw new Error('Убедитесь в правильности указанной почты.')
		case 401:
			throw new Error('Убедитесь в правильности токена.')
	}
}
