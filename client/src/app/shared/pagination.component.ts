import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";

@Component({
  selector: 'app-pagination',
  templateUrl: '././pagination.component.html',
  styleUrl: '././pagination.component.css'
})
export class PaginationComponent implements OnChanges {
    @Input('total-items') totalItems: any;
    @Input('page-size') pageSize = 2;
    @Output('page-changed') pageChanged = new EventEmitter();
    pages: any[] = [];
    currentPage = 1;
    
    ngOnChanges() {
        this.currentPage = 1;

        var pageCount = Math.ceil(this.totalItems / this.pageSize);
        this.pages = [];
        for (var i=1; i<=pageCount; i++){
            this.pages.push(i)
        }
    }

    changePage(page: any) {
        this.currentPage = page;
        this.pageChanged.emit(page);
    }

    previous() {
        if (this.currentPage == 1)
            return;

        this.currentPage--;
        this.pageChanged.emit(this.currentPage);
    }

    next() {
        if (this.currentPage == this.pages.length)
            return;

        this.currentPage++;
        this.pageChanged.emit(this.currentPage);
    }

}