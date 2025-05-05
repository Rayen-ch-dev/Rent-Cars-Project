export interface IOption{
    label:string;
    value:string;
}
export interface IFormField{
    name:string;
    label?:string;
    type:
      |"text"
      |"email"
      |"password"
      |"number"
      |"date"
      |"time"
      |"datetime-local"
      |"month"
      |"week"
      |"url"
      |"search"
      |"tel"
      |"color"
      |"file"
      |"datetime"
      |"range"
      |"checkbox"
      |"radio"
      |"select"
      |"submit"
      |"image"
      |"reset";

    placeholder:string;
    required:boolean;
    options?:IOption[];
    value?:string;
    error?:string;
    disabled?:boolean;
    readonly?:boolean;
    autoFocus?:boolean;
    defaultValue?:string;
}
export interface IFormFieldsVariables{
    slug:string;
};