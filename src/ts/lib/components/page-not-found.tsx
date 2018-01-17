import * as React from 'react';

export interface Props {
	isAuthenticated?: string
	test?: any
}

export interface State {

}

export class PageNotFoundComponent extends React.Component<Props, State> {
	render() {
		return (
			<div className="container page-not-found">
				<div className="page-404">
					404
				</div>
				<div className="description">
					Страница не найдена. <br/>
					Похоже, что-то пошло не так. Если эта страница не продает, пожалуйста сообщите нам.<br/>
					<b>
						Мы только что запустили новый Интермаг и возможно данная страница более не доступна <br/>
						по этому адресу. Пожулуйста воспользуйтесь навигацией по сайту.
					</b>

				</div>

			</div>
		);
	}
}