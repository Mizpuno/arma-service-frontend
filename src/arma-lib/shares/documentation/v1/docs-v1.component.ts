import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DropdownGroupInterface, DropdownOptionInterface } from "../../../interfaces/dropdown.interface";

@Component({
    selector: 'as-doc-v1',
    templateUrl: './docs-v1.component.html',
    styleUrls: ['./docs-v1.component.scss'],
    standalone: false,
})

export class DocsV1Component implements OnInit {
    sampleForm: FormGroup;
    public colors: string[] = ['primary', 'secondary', 'success', 'warning', 'danger', 'base'];

    constructor(private fb: FormBuilder) {
        this.sampleForm = this.fb.group({
            name: [null, Validators.required],
            email: [null, Validators.email],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required],
            tel: [null]
        }, {
            Validators: this.passwordMatchValidator
        })
    }
    ngOnInit(): void {}

    passwordMatchValidator(form: FormGroup) {
        form.get('password')?.value === form.get('comfirmPassword')?.value 
            ? null
            : {passwordMismatch : true}
    }

    onFormSubmit() {
        console.log('submitting.....')
        if (this.sampleForm.valid) {
            console.log("VALID")
        } else {
            this.sampleForm.markAllAsTouched();
        }
    }

    get getSampleDropdown() {
        return [
            {label:"บริษัท A Corporation", value: "0140"},
            {label:"ชุ่ยการช่าง นวัตกรรม", value: "3000241"},
            {label:"นายสมมติ สุดโต่ง", value: "6000012"}
        ] as DropdownOptionInterface<any>[]
    }

    get getSampleDropdownGroup() {
        return [
            {
                groupId: 'pig-product',
                seq: 1,
                position: 'start',
                name: 'สินค้าประเภทผลิตจากหมู',
                children: [
                    {label:"หมูฝอยกล่อง เล็ก", value: "PR000101"},
                    {label:"หมูฝอยกล่อง ใหญ่", value: "PR000102"},
                    {label:"หมูทุมซอง เล็ก", value: "PR000201"},
                    {label:"หมูทุบซอง ใหญ่", value: "PR000202"},
                    {label:"หมูอื่นๆ", value: "PR001002"},
                ]
            },
            {
                groupId: 'etc-product',
                seq: 2,
                position: 'start',
                name: 'สินค้าประเภทอื่นๆ',
                children: [
                    {label:"หอมเจียว ใหญ่", value: "ET000301"},
                    {label:"หอมเจียว เล็ก", value: "ET000302"},
                ]
            }
        ] as DropdownGroupInterface[]
    }
}