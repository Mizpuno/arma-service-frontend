export interface UserInterface {
    configuration: UConfigurationInterface,
}

export interface UConfigurationInterface {
    others: {
        dropdown: UObjDDLInterface,
    }
}

export interface UObjDDLInterface {
    /**
     * Description: การกรองค้นหาด้วยกลุ่มใน DDL โดยจะรองรับทั้งหมด 3 กรณีได้แก่
     * 
     * show-all-in              -- หากค้นหาเจอชื่อกลุ่ม จะแสดงรายการทั้งหมดภายในกลุ่มนั้น
     * show-only                -- หากค้นหาเจอชื่อกลุ่ม จะแสดงเฉพาะรายการที่มีส่วนนึงตรงกับ keyword ค้นหา
     * not-show    *default     -- ไม่เปิดใช้งานการค้นหาด้วยชื่อกลุ่ม
     */
    headerSearchAffect: 'show-all-in' | 'show-only' | 'not-show',
}