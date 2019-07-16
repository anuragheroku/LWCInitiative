
import { LightningElement, track, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import Id from '@salesforce/user/Id';
import NAME_FIELD from '@salesforce/schema/User.Name';
const fields = [NAME_FIELD];


export default class HelloWorld extends LightningElement {
    @track greeting = 'World';
    changeHandler(event) {
        this.greeting = event.target.value;

    }
    userId = Id;
    @wire(getRecord, { recordId: '$userId', fields }) 
    user;
    get name() {
        return getFieldValue(this.user.data, NAME_FIELD);
    }

}

