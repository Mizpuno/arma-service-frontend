export interface DropdownGroupInterface {
    groupId: string,
    name?: string,
    icon?: string,
    seq: number,
    position: 'start' | 'end',
    children: DropdownOptionInterface<any>[],
}

export interface DropdownOptionInterface<T> {
    label?: string,
    value: T,
    disable?: boolean,
}

export const DEFAULT_DDL_OPTION: DropdownOptionInterface<null> = {value: null} 