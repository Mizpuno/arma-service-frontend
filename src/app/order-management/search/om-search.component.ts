import { Component, OnInit } from "@angular/core";
import { OrderManagementService } from "../order-management.service";
import { SearchOrderInterface } from "../order-management.interface";

@Component({
    selector: 'om-search-app',
    templateUrl: 'om-search.component.html',
    styleUrls: ['om-search.component.scss'],
    standalone: false,
})

export class OmSearchComponent implements OnInit {
    public searchOrderList: SearchOrderInterface[] = [];
    public DEFAULT_SEARCH_ORDER_TEXTS: {name:string, unit: string}[] = [
        {name: 'รายการรับสินค้ารวม', unit: 'รายการ'},
        {name: 'จำนวนวันที่รับสินค้ารวม', unit: 'วัน'},
        {name: 'จำนวนสินค้าที่ได้รับรวม', unit: 'หน่วย'},
        {name: 'ราคาส่งรวม', unit: 'บาท'}
    ]

    constructor(
        private orderManagementService: OrderManagementService
    ) {}

    ngOnInit(): void {
        this.getSearchOrderList();
    }

    getSearchOrderList() {
        this.orderManagementService.getOrderList().subscribe({
            next: (res) => {
                if (res.response.code === 200) {
                    this.searchOrderList = res.content;
            
                }
            },
            error: (err) => {
                console.error('Error fetching search order list:', err);
            }
        })
    }
}