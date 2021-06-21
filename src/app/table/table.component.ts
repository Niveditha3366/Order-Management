import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { Input } from '@angular/core';

export interface UsersData {
  name: string;
  id: number;
  dueDate: string;
  address: string;
  phone: number;
  orderTotal: number;
}

const ELEMENT_DATA: UsersData[] = [
  {id: 1560608769632, name: 'Charan', dueDate:'25-06-20021',address:'Hyderabad',phone: 6589245, orderTotal:9},
  {id: 1560608796014, name: 'Bunny', dueDate:'29-06-20021',address:'Bangalore',phone: 58969245, orderTotal:7},
  {id: 1560608787815, name: 'Arjun', dueDate:'27-06-20021',address:'Chennai',phone: 5486515, orderTotal:8},
  {id: 1560608805101, name: 'Cherry', dueDate:'28-06-20021',address:'Delhi',phone: 3215646, orderTotal:5}
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name','dueDate','address','phone','orderTotal', 'action'];
  dataSource = ELEMENT_DATA;

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  @Input() login: boolean = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj){
    var d = new Date();
    this.dataSource.push({
      id:d.getTime(),
      name:row_obj.name,
      orderTotal:row_obj.orderTotal,
      dueDate:row_obj.dueDate,
      address:row_obj.address,
      phone:row_obj.phone
    });
    this.table.renderRows();
    
  }
  updateRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.name = row_obj.name;
        value.address = row_obj.address,
        value.phone = row_obj.phone,
        value.dueDate = row_obj.dueDate,
        value.orderTotal = row_obj.orderTotal
      }
      return true;
    });
  }

  deleteRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      return value.id != row_obj.id;
    });
  }
}
