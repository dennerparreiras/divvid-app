import { Friend } from '../models/friend';
import { Friends } from '../providers/providers';
import { DatabaseProvider } from '../providers/database/database';

export class FriendDAO{
    table_fields:string[] = ["FriendID", "Name", "Deleted"];

    constructor(private databaseprovider: DatabaseProvider){}

    public getList(): Promise<Friends[]>{
        let friends: any[] = [];
        return new Promise((resolve,reject) => {
            this.databaseprovider.select('DIV_Friend', this.table_fields)
                .then((data) => {
                    if(data){
                        console.log(data);
                        if (data.rows.length > 0) {
                            for (var i = 0; i < data.rows.length; i++) {
                                let aux:Friend = {
                                    FriendID: data.rows.item(i).FriendID,
                                    Name: data.rows.item(i).Name, 
                                    About: data.rows.item(i).About, 
                                }
                                console.log('aux Friend pushed into FriendsList');
                                console.log(aux);
                                friends.push(aux);
                            }
                        }
                    }
                    resolve(friends);
                })
                .catch((err)=>{
                        console.error(err);
                        return [];
                });
        })
    }

    insert(friend: any): Promise<Boolean>{
        return new Promise((resolve,reject) => {
            let table: string = 'DIV_Friend';
            let fields: string[] = ['Name', 'About', 'Deleted'];
            let values: string[] = [friend.Name, friend.About, '0'];

            this.databaseprovider.insert(table, fields, values)
                .then((data) => {
                    console.log('Amigo adicionado com sucesso!');
                    resolve(true);
                })
                .catch((err)=>{
                        console.error(err);
                        resolve(false);
                });
        })
    }

    edit(){

    }

    delete(friend: any): Promise<Boolean>{
        return new Promise((resolve,reject) => {
            this.databaseprovider.delete('DIV_Friend', 'FriendID', friend.FriendID)
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