public with sharing class getResourceList {
    @AuraEnabled(cacheable=true)
    public static List<Resource_Pool__c> getAllResources() {
        return [SELECT Id, Name, isAvailable__c, Opportunity__r.Name, Account__r.Name FROM Resource_Pool__c where isAvailable__c = False];
    }
}