import { LightningElement, track } from 'lwc';
import getAccountRecords from '@salesforce/apex/AccountConsultScreenController.getAccountRecords';

const SEARCH_INPUT_COOLDOWN = 1000 // 1 second

export default class AccountConsultScreen extends LightningElement {
    @track accounts = [];
    @track selectedAccounts;
    @track searchTerm = '';
    @track searchTimeout;
    @track column = [
        { label: 'Account Name', fieldName: 'name', type: 'url', 
            typeAttributes:{
                label:{
                    fieldName:'FullName'
                }
            } 
        },
        { label: 'CNPJ', fieldName: 'cnpj', type: 'text' },
        { label: 'External Code', fieldName: 'externalId', type: 'text' },
        { label: 'E-mail', fieldName: 'email', type: 'text' },
        { label: 'Phone', fieldName: 'Phone', type: 'phone' }
    ];

    get columns(){
        return this.column;
    }

    handleTransferCustomerButton(){
        console.log("Button triggered!");
    }

    handleSearchAccounts(event){
        clearTimeout(this.searchTimeout);
        console.log('Search term: ', event.target.value);
        const searchValue = event.target.value;

        this.searchTimeout = setTimeout(() => { 
            this.searchTerm = searchValue;
        }, SEARCH_INPUT_COOLDOWN);
    }

    fetchAccountsData(){
        getAccountRecords({searchTerm: this.searchTerm})
        .then(result =>{
            if(this.isFilled(result)){
                this.accounts = result;
            }
        })
        .catch(error => {
            console.error(error);
        })
    }

    isFilled(field) {
        return ((field !== undefined && field != null && field != '') || field == 0);
    }
}