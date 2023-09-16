import {Component, OnInit} from "@angular/core";
import {Page} from "../../models/Page";
import {PropertyService} from "../../services/PropertyService";
import {MatDialog} from "@angular/material/dialog";
import {DeleteConfirmComponent} from "../delete-confirm-dialog/delete-confirm.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'display-user-properties-app',
  templateUrl: './user-properties.component.html',
  styleUrls: ['./user-properties.component.css', './../../shared-styles/profile-carts.css']
})
export class UserPropertiesComponent implements OnInit{
  page!: Page;

  constructor(private propertyService: PropertyService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.propertyService.getPropertiesForUser().subscribe({
      next: (page) => {
        this.page = page;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  appendQueryParam(pageNumber: number){

  }

  deleteProperty(id: number){
    const dialogRef = this.dialog.open(DeleteConfirmComponent)

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if(confirmed){
        this.propertyService.deleteProperty(id).subscribe({
          next: () => {
            this.page.content = this.page.content.filter(i => i.id !== id);
            this.openSnackBar();
          },
          error: (err) => {
            console.log(err);
          }
        })
      }
    })
  }

  openSnackBar(): void{
    this.snackBar.open('Property deleted successfully!', 'Close', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      duration: 3000
    })
  }
}
