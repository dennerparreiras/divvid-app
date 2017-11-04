export class SQL_Object {
  table: string;
  stringFields: string;
  stringValues: string;
  ItemID_Field: string;
  ItemID_Value: string;
  query: string;
  fields: string[];
  values: string[];

  constructor() {
    this.table = '';
    this.stringFields = '';
    this.stringValues = '';
    this.ItemID_Field = '';
    this.ItemID_Value = '';
    this.query = '';
    this.fields = [];
    this.values = [];
  }
}

export class SQL_Data {
  table: string;
  stringFields: string;
  stringValues: string;
  ItemID_Field: string;
  ItemID_Value: string;
  query: string;
  fields: string[];
  values: string[];

  constructor(table: string, fields: string[], values: string[], query: string = '', stringFields: string = '', stringValues: string = '', ItemID_Field: string = '', ItemID_Value: string = '') {
    this.table = table;
    this.stringFields = stringFields;
    this.stringValues = stringValues;
    this.ItemID_Field = ItemID_Field;
    this.ItemID_Value = ItemID_Value;
    this.query = query;
    this.fields = fields;
    this.values = values;
  }
  
}