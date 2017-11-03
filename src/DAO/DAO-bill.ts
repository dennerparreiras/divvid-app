// import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Bill } from '../models/bill';
import { Bills } from '../providers/providers';
import { DatabaseProvider } from '../providers/database/database';

export class BillDAO{
    constructor(private databaseprovider: DatabaseProvider){}

    public getList(): Promise<Bills[]>{
        let bills: any[] = [];
        return new Promise((resolve,reject) => {
            this.databaseprovider.getAll('DIV_Bill')
                .then((data) => {
                    if(data){
                        console.log(data);
                        if (data.rows.length > 0) {
                            for (var i = 0; i < data.rows.length; i++) {
                                let aux = {
                                    BillID: data.rows.item(i).BillID,
                                    title: data.rows.item(i).Title, 
                                    description: data.rows.item(i).Description, 
                                    dateBill: data.rows.item(i).BillDate
                                }
                                console.log('aux obj pushed');
                                console.log(aux);
                                bills.push(aux);
                            }
                        }
                    }
                    resolve(bills);
                })
                .catch((err)=>{
                        console.error(err);
                        return [];
                });
        })
    }

    insert(bill: any){
        let table: String = 'DIV_Bill';
        let fields: String[] = ['Title', 'Description', 'BillDate', 'Deleted'];
        let values: String[] = [bill.title, bill.description, bill.billDate, '0'];

        this.databaseprovider.insert(table, fields, values).then(() => {
            console.log('Pedido adicionado com sucesso!');
        })
        .catch((err)=>{
            console.log(':::::::::::::::::::::::::::::::');
            console.error(err);
        })
    }

    edit(){

    }

    delete(bill: any): Promise<Boolean>{
        return new Promise((resolve,reject) => {
            this.databaseprovider.delete('DIV_Bill', 'BillID', bill.BillID)
                .then((data) => {
                    resolve(true);
                })
                .catch((err)=>{
                        console.error(err);
                        return false;
                });
        })
    }
}