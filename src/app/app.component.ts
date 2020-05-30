import {Component, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Sort} from '@angular/material/sort';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

export interface IPhoneContact {
  firstName: string;
  secondName: string;
  number: string;
}
class PhoneContact implements IPhoneContact{
  constructor(public firstName: string,
              public secondName: string,
              // tslint:disable-next-line:variable-name
              public number: string) {}
}
const phoneContacts: IPhoneContact[] = [
  {firstName: 'Ira', secondName: 'Tytar', number: '041414113424' },
  {firstName: 'Vasylyna', secondName: 'Vrublevska', number: '3805113' },
  {firstName: 'Alejandro', secondName: 'Del Rio Albrechet', number: '065131313' },
  {firstName: 'Petro', secondName: 'Petriv', number: '089933144' },
  {firstName: 'Petya', secondName: 'Zhuk', number: '0631111111' },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  newContactFirstName: string;
  newContactLastName: string;
  newContactNumber: string;
  closeResult = '';
  displayedColumns: string[] = ['firstName', 'secondName', 'number','edit','delete'];
  dataSource = new MatTableDataSource(phoneContacts);
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private modalService: NgbModal) {}
  ngOnInit() {
    this.dataSource.sort = this.sort;
  }
  addElement(){
    const newElement = new PhoneContact(this.newContactFirstName, this.newContactFirstName , this.newContactNumber);
    phoneContacts.push(newElement);
    this.dataSource = new MatTableDataSource(phoneContacts);
    this.dataSource.sort = this.sort;
  }
  saveBtnEventHandler(modal){
    if (this.newContactFirstName && this.newContactLastName && this.newContactNumber){
      this.addElement();
      this.resetForm();
      modal.close('Save click');
    }
  }
  resetForm(){
    this.newContactNumber = '';
    this.newContactFirstName = '';
    this.newContactLastName = '';
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
