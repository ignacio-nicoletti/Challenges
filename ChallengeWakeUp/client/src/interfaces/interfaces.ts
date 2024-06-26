export interface Restaurant {
  price: number;
  _id: any;
  title : string;
  adress: string;
  products:[]
}

export interface Sells {
  totalPrice: number;
  _id: string;
  title: string;
  id:number,
  commerce:{
    title:string
  }
  date:string,
  products:[]
}


