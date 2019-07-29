import { LightningElement, wire, track } from 'lwc';
//import { getListUi } from 'lightning/uiListApi';
//import ResourcePool_obj from '@salesforce/schema/Resource_Pool__c';
import getAllResources from '@salesforce/apex/getResourceList.getAllResources'

const actions = [
    { label: 'Show details', name: 'show_details' },
    { label: 'Assign to this Opportunity', name: 'assign' },
    { label: 'Delete', name: 'delete' },
];

const columns = [
    { label: 'Name', fieldName: 'Name', type: 'text' },
    { label: 'Type', fieldName: 'Type__c', type: 'text' },
    { label: 'Prospective Account', fieldName: 'Account__r.Name', type: 'text' },
    { label: 'Opprtunity', fieldName: 'Opportunity__r.Name', type: 'text' },
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
    },
];

export default class Example extends LightningElement {
    @track columns = columns;

    @wire(getAllResources)
    resources;
}