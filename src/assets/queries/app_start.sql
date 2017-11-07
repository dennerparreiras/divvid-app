CREATE TABLE IF NOT EXISTS DIV_Bill(BillID INTEGER PRIMARY KEY AUTOINCREMENT, Title TEXT, Description TEXT, BillDate TEXT, Deleted BOOLEAN);
CREATE TABLE IF NOT EXISTS DIV_Friend(FriendID INTEGER PRIMARY KEY AUTOINCREMENT, Title TEXT, Description TEXT, PicturePath TEXT, Deleted BOOLEAN);
CREATE TABLE IF NOT EXISTS DIV_Product(ProductID INTEGER PRIMARY KEY AUTOINCREMENT, Description TEXT, Quantity INTEGER, UnityPrice REAL, Deleted BOOLEAN);
CREATE TABLE IF NOT EXISTS DIV_Bill_Friend(BillFriendID INTEGER PRIMARY KEY AUTOINCREMENT, FriendID INTEGER, BillID INTEGER, Deleted BOOLEAN, FOREIGN KEY(FriendID) REFERENCES DIV_Friend(FriendID), FOREIGN KEY(BillID) REFERENCES DIV_Bill(BillID));
CREATE TABLE IF NOT EXISTS DIV_Bill_Product(BillProductID INTEGER PRIMARY KEY AUTOINCREMENT, ProductID INTEGER, BillID INTEGER, Deleted BOOLEAN, FOREIGN KEY(ProductID) REFERENCES DIV_Product(ProductID), FOREIGN KEY(BillID) REFERENCES DIV_Bill(BillID));