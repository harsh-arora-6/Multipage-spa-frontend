export interface ActionData {
    message:string;
    errors:object;
  }
export interface EventObj {
    id:string;
    title:string;
    image:string;
    date:string;
    description:string;
}
export interface ErrorObj {
    data:{
        message:string;
    }
    status:number;
}