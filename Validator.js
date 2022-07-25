class Validator {
	constructor(config, formID) {
		this.elementsConfig = config;
		this.formID = formID;
		this.errors = {};
		
		this.generateErrorsObject();
		this.inputListener();
	}

	generateErrorsObject() {
		for(let field in this.elementsConfig) {
			this.errors[field] = [];
		}
	}

	inputListener() {
		let inputSelector = this.elementsConfig;

		for(let field in inputSelector) {
			let el = document.querySelector(`${this.formID} input[name="${field}"]`);

			el.addEventListener('input', this.validate.bind(this));
		}
	}

	validate(e) {
		let elFields = this.elementsConfig;

		let field = e.target;
		let fieldName = field.getAttribute('name');
		let fieldValue = field.value;

		this.errors[fieldName] = [];

		if(elFields[fieldName].required) {
			if(fieldValue === '') {
				this.errors[fieldName].push('Field is empty');
			}
		}

		if(elFields[fieldName].email) {
			if(!this.validateEmail(fieldValue)) {
				this.errors[fieldName].push('Email adress is not correct');
			}
		}

		if(fieldValue.length < elFields[fieldName].minlength || fieldValue.length > elFields[fieldName].maxlength) {
			this.errors[fieldName].push(`Feild need to have at least ${elFields[fieldName].minlength} and max ${elFields[fieldName].maxlength} carracters`);
		}

		if(elFields[fieldName].matching) {
			let matchingEl = document.querySelector(`${this.formID} input[name="${elFields[fieldName].matching}"]`);

			if(fieldValue !== matchingEl.value) {
				this.errors[fieldName].push('Passwords dont match');
			}

			if(this.errors[fieldName].length === 0) {
				this.errors[fieldName] = [];
				this.errors[elFields[fieldName].matching] = [];
			}
		}

		this.populateErrors(this.errors);
	}

	validationPassed() {
		for(let key of Object.keys(this.errors)) {
			if(this.errors[key].length > 0) {
				return false;
			}
		}

		return true;
	}

	populateErrors(errors) {
		for(const elem of document.querySelectorAll('ul')) {
			elem.remove();
		}

		for(let key of Object.keys(errors)) {
			let parentElement = document.querySelector(`${this.formID} input[name="${key}"]`).parentElement;
			let errorsElement = document.createElement('ul');
			parentElement.appendChild(errorsElement);

			errors[key].forEach(error => {
				let li = document.createElement('li');
				li.innerText = error;

				errorsElement.appendChild(li);
			});
		}
	}

	validateEmail(email) {
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
	    	return true;
		}
	    
	    return false;
	}
}