export interface ItemInterface {
  key: string;
  title?: string;
  url: string;
}

export interface TabInterface {
  key: string;
  title: string;
  items?: Array<ItemInterface>;
}

export interface PropsInterface {
  id?: string;
  name?: string;
  value?: string;
  dataSource?: Array<TabInterface>;
  onChange?: any;
  onBlur?: any;
  onUpload?: any;
  onGrabUrl?: any;
}

export interface StateInterface {
  isModalVisible: boolean;
  tabKeyActive: string;
  itemKeyActive: string;
  itemActive: ItemInterface;
}