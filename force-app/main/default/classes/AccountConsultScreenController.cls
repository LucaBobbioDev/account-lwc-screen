public with sharing class AccountConsultScreenController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountRecords(String searchTerm){
        return [
            SELECT Id, Name, ExternalId__c, CNPJ__c, Email__c, Phone
            FROM Account
            LIMIT 50
        ];
    }
}