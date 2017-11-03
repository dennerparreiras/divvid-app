import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';
 
@Injectable()
export class DatabaseProvider {
  database: SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>;
 
  constructor(public sqlitePorter: SQLitePorter, private storage: Storage, private sqlite: SQLite, private platform: Platform, private http: Http) {
    this.databaseReady = new BehaviorSubject(false);
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'developers.db',
        location: '2'
      })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.storage.get('database_filled').then(val => {
            if (val) {
              this.databaseReady.next(true);
            } else {
              this.fillDatabase();
            }
          });
        });
    });
  }
 
  getDatabaseState() {
    return this.databaseReady.asObservable();
  }

  private messageReturn(error, obj, message){
    if(error){
      console.log('>==========================================================================');
      console.log('messageReturn() ==> Um erro foi detectado no Database: ' + message);
      console.log(obj);
      console.error(obj);
      console.log('<==========================================================================');
    }
    else{
      console.log('>==========================================================================');
      console.log('messageReturn() ==> Operação realizada com sucesso:' + message);
      console.log(obj);
      console.log('<==========================================================================');
    }

  }

  fillDatabase() {
    this.http.get('./assets/queries/app_start.sql')
      .map(res => res.text())
      .subscribe(sql => {
        this.sqlitePorter.importSqlToDb(this.database, sql)
          .then(data => {
            this.databaseReady.next(true);
            this.storage.set('database_filled', true);
            this.messageReturn(false, data, 'fillDatabase()')
          })
          .catch(e => this.messageReturn(true, e, 'fillDatabase()'));
      });
  }

  private printQuery(value){
    console.log('Executed Query ==> "' + value + '"');
  }

  private getNewSQLObject(){
    return {
      table: '',
      stringFields: '',
      stringValues: '',
      query: '',
      fields: [],
      values: []
    };
  }

  private fillSQLObject(SQL, data){
    let t1:Boolean = true, t2:Boolean = true;
    data.fields.forEach(field => {
      if(t1){
        t1 = false;
        SQL.stringFields += field;
      }
      else{
        SQL.stringFields += ', ' + field;
      }
    });
    data.values.forEach(value => {
      if(t2){
        t2 = false;
        SQL.stringValues += " '" + value + "'";
      }
      else{
        SQL.stringValues += ", '" + value + "'";
      }
    });

    SQL.table = data.table;
    SQL.fields = data.fields;
    SQL.values = data.values;

    return SQL;
  }

  insert(table: String, fields: String[], values: String[]){
    let SQL = this.fillSQLObject(
      this.getNewSQLObject(),
      {
        table,
        fields,
        values
      }
    );

    SQL.query = "INSERT INTO " + SQL.table + " (" + SQL.stringFields + ") VALUES (" + SQL.stringValues + ")";
    this.printQuery(SQL.query);

    return this.database.executeSql(SQL.query, {}).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }

  getAll(table) {
    let SQL = this.getNewSQLObject();
    SQL.table = table;
    SQL.query = "SELECT * FROM " + SQL.table;

    this.printQuery(SQL.query);

    return this.database.executeSql(SQL.query, []).then((data) => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }

  update(table:string, ItemID_Field:string, ItemID_Value:string, Item_Fields:string[], Item_Values:string[]){
    let SQL = this.fillSQLObject(
      this.getNewSQLObject(),
      {
        table,
        Item_Fields,
        Item_Values
      }
    );

    SQL.query  = "UPDATE " + SQL.table;
    SQL.query += "SET ";
    for(let i=0; i < SQL.stringFields.length; i++ ){
      if(i == 0) {
        SQL.query += " " + SQL.stringFields[i] + " = " + SQL.stringValues[i] + " ";        
      }
      else{
        SQL.query += ", " + SQL.stringFields[i] + " = " + SQL.stringValues[i] + " ";    
      }
    }
    SQL.query += " WHERE " + ItemID_Field + " = " + ItemID_Value;
    this.printQuery(SQL.query);

    return this.database.executeSql(SQL.query, {}).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }

  delete(table, ItemID_Field, ItemID_Value){
    let SQL = this.getNewSQLObject();
    SQL.table = table;
    SQL.stringFields = ItemID_Field;
    SQL.stringValues = ItemID_Value;
    SQL.query = "DELETE FROM " + SQL.table + " WHERE " + SQL.stringFields + " = " + SQL.stringValues;

    this.printQuery(SQL.query);

    return this.database.executeSql(SQL.query, []).then(() => {
      return true;
    }, (err) => {
      console.log('Error: ', err);
      return false;
    });
  }
  
 
  // addDeveloper(name, skill, years) {
  //   let data = [name, skill, years]
  //   return this.database.executeSql("INSERT INTO developer (name, skill, yearsOfExperience) VALUES (?, ?, ?)", data).then(data => {
  //     return data;
  //   }, err => {
  //     console.log('Error: ', err);
  //     return err;
  //   });
  // }
 
  // getAllDevelopers() {
  //   return this.database.executeSql("SELECT * FROM developer", []).then((data) => {
  //     let developers = [];
  //     if (data.rows.length > 0) {
  //       for (var i = 0; i < data.rows.length; i++) {
  //         developers.push({ name: data.rows.item(i).name, skill: data.rows.item(i).skill, yearsOfExperience: data.rows.item(i).yearsOfExperience });
  //       }
  //     }
  //     return developers;
  //   }, err => {
  //     console.log('Error: ', err);
  //     return [];
  //   });
  // }
 
}