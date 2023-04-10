namespace $.$$ {

	export type $my_app_email = {
		title: string
		value: string
	}

	export class $my_app extends $.$my_app {

		emails(next?: $my_app_email[]) {
			return this.$.$mol_state_local.value('emails', next) ?? [{ title: '$mol', value: 'mol@hyoo.ru' }]
		}

		@ $mol_mem
		email_rows() {
			return this.emails().map( obj => this.Email(obj) )
		}

		email_title(obj: $my_app_email) {
			return obj.title
		}

		email_value(obj: $my_app_email) {
			return obj.value
		}

		title_bid() {
			return this.title_new().trim().length > 0 ? '' : this.message().required
		}

		email_bid() {
			if ( this.emails().findIndex(obj => obj.value === this.email_new().trim()) !== -1 ) return this.message().duplicate
			return this.email_new().trim().length > 0 ? '' : this.message().required
		}

		@ $mol_action
		email_add() {
			this.emails([...this.emails(), { title: this.title_new().trim(), value: this.email_new().trim() }])
			this.title_new('')
			this.email_new('')
		}

		@ $mol_mem
		pages() {
			return [
				this.Email_list_page(),
				... this.$.$mol_state_arg.value('add') === '' ? [this.Email_add_page()] : [],
			]
		}

	}

}
