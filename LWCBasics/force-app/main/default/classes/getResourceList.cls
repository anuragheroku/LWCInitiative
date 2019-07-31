public with sharing class getResourceList {
    @AuraEnabled(cacheable=true)
    public static List<Resource_Pool__c> getAllResources() {
        return [SELECT Id, Name, Type__c, isAvailable__c FROM Resource_Pool__c where Opportunity__c ='' AND isAvailable__c = False];
    }
}