
export class UtilsService {
	static scrollToTop() {
		if (typeof window === 'object') {
			window.scrollTo(0, 0);
		}
	}

	// static isMobile() {
	// 	let userAgent = InitialStateUtils.getDataByName('serverUserAgent');
	//
	// 	if (typeof window !== 'undefined') {
	// 		userAgent = userAgent || navigator.userAgent;
	// 	}
	//
	// 	if (userAgent) {
	// 		return !!userAgent.match(/Android/i)
	// 			|| !!userAgent.match(/webOS/i)
	// 			|| !!userAgent.match(/iPhone/i)
	// 			|| !!userAgent.match(/iPad/i)
	// 			|| !!userAgent.match(/iPod/i)
	// 			|| !!userAgent.match(/BlackBerry/i)
	// 			|| !!userAgent.match(/Windows Phone/i);
	// 	}
	// }
}