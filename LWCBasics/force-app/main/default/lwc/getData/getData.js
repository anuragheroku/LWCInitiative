/* eslint-disable vars-on-top */
/* eslint-disable no-console */
import { LightningElement, wire, track, api } from 'lwc';
//import { getListUi } from 'lightning/uiListApi';
//import ResourcePool_obj from '@salesforce/schema/Resource_Pool__c';
import { updateRecord } from 'lightning/uiRecordApi';
import getAllResources from '@salesforce/apex/getResourceList.getAllResources';
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

export default class Example extends LightningElement {
    @track columns = columns;
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
        this.updateMe(row);
        break;
        default:
    }
}

updateMe(row)
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
    
    console.log('Below is prepared fields object');
    console.log(JSON.stringify(fields));
    const recordInput = {fields};
    updateRecord(recordInput)
                .then(() => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Record updated',
                            variant: 'success'
                        })
                    );
                    
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