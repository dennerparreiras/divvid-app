// import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Bill } from '../models/bill';
import { Bills } from '../providers/providers';
import { DatabaseProvider } from '../providers/database/database';

export class BillDAO{
    constructor(private databaseprovider: DatabaseProvider){}

    public getList(): Promise<Bills[]>{
        let bills: any[] = [];
        return new Promise((resolve,reject) => {
            this.databaseprovider.getAll('DIV_Bill').then((data) => {
            if(data){
                console.log(data);
                    if (data.rows.length > 0) {
                    for (var i = 0; i < data.rows.length; i++) {
                        let aux = { 
                            title: data.rows.item(i).Title, 
                            description: data.rows.item(i).Description, 
                            dateBill: new Date(data.rows.item(i).BillDate).toISOString()
                        }
                        console.log(aux);
                        bills.push(aux);
                        }
                    }
                }
                return bills;
            })
            .then((data) =>{

                resolve(data);
            })
            .catch((err)=>{
                    console.error(err);
                    return [];
                }
            )
        })
    }

    insert(bill: any){
        let table: String = 'DIV_Bill';
        let fields: String[] = ['Title', 'Description', 'BillDate', 'Deleted'];
        let values: String[] = [bill.title, bill.description, bill.billDate, '0'];

        this.databaseprovider.add(table, fields, values).then(() => {
            console.log('Pedido adicionado com sucesso!');
        })
        .catch((err)=>{
            console.log(':::::::::::::::::::::::::::::::');
            console.error(err);
        })
    }

    edit(){

    }

    delete(){

    }
}