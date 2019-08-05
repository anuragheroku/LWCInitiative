import { LightningElement, wire, track, api } from 'lwc';
//import { getListUi } from 'lightning/uiListApi';
//import ResourcePool_obj from '@salesforce/schema/Resource_Pool__c';
import { updateRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import getAllResources from '@salesforce/apex/getResourceList.getAllResources';
import { NavigationMixin } from 'lightning/navigation';
//import CONTACT_OBJECT from '@salesforce/schema/Contact';
//import { createRecord } from 'lightning/uiRecordApi';
//import NAME_FIELD from '@salesforce/schema/Contact.LastName';
//import NAME_FIELD from '@salesforce/schema/Contact.LastName';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


const actions = [
    { label: 'Show details', name: 'show_details' },
    { label: 'Assign to this Opportunity', name: 'assign' },
    { label: 'Delete', name: 'delete' },
];

const columns = [
    { label: 'Name', fieldName: 'Name', type: 'text' },
    { label: 'Type', fieldName: 'Type__c', type: 'text' },
    { label: 'isAvailable', fieldName: 'isAvailable__c', type: 'checkbox' },
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
    },
];

export default class Example extends NavigationMixin(LightningElement) {
    @track columns = columns;
    @track resources;
    @wire(getAllResources)
    resources;
    @api recordId;
    @api objectApiName;

handleRowAction(event) {
    const actionName = event.detail.action.name; 
    const row = event.detail.row;
    // eslint-disable-next-line no-console
    console.log('GGUUMyHHHHey its the event detail row'+row);
    switch (actionName) {
        case 'delete':
            this.deleteRow(row);
            break;
        case 'show_details':
            this.showRowDetails(row);
            break;
        case 'assign':
        this.updateResource(row);
        break;
        default:
    }
}
showRowDetails(row){
    console.log('rahul:'+row.Id);
    this[NavigationMixin.Navigate]({
        type: 'standard__recordPage',
        attributes: {
            recordId: row.Id,
            objectApiName: 'Resource_Pool__c',
            actionName: 'view'
        }
    });
}
/*contact insert
createContact(row){
    const fields = {};
    for(var property in row) {
        if(property == 'Name'){
            fields[NAME_FIELD.fieldApiName]=row[property];
        }
  }    
    const recordInput1 = { apiName: CONTACT_OBJECT.objectApiName, fields };
    createRecord(recordInput1)
        .then ( contact =>{
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Contact created',
                    variant: 'success',
                }),                
            );
            this.updateMe(row);
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: error.body.message,
                    variant: 'error',
                }),
            );            
        });
}*/

//update resource
updateResource(row)
{

    console.log('Getting ROW 8');
    console.log(JSON.stringify(row));

    const fields= {} ;
    // eslint-disable-next-line guard-for-in
    for(var property in row) {
         fields[property]=row[property];
       // alert(property + "=" + row[property]);

   }

    fields.Opportunity__c=this.recordId;
    fields.isAvailable__c = true;
    
    console.log('Below is prepared fields object');
    console.log(JSON.stringify(fields));
    const recordInput = {fields};
    updateRecord(recordInput)
                .then(() => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Resource updated',
                            variant: 'success'
                        })                        
                    );
                   return refreshApex(this.resources);
                    
                })
                .catch(error => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error creating record',
                            message: error.body.message,
                            variant: 'error'
                        })
                    );
                });

    }
}