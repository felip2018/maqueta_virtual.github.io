import { Injectable } from '@angular/core';
import IDataFile from '../models/data.inteface';
import IEvaluation from '../models/evaluation.interface';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  private fields: string[];
  private conditions: string[];

  constructor() {
    this.fields = ['id', 'apellido', 'nombre',	'grupo', 'socializacion', 'autoevaluacion', 'notacorte'];
    this.conditions = ['mayor', 'menor', 'igual'];
  }

  public makeValidation(data: IDataFile[], evaluation: IEvaluation) {
    if (!this.fields.includes(evaluation.field)) {
      return undefined;
    }

    if (!this.conditions.includes(evaluation.condition)) {
      return undefined;
    }

    if (evaluation.condition === 'mayor') {
      return this.validateMajor(data, evaluation);
    }

    if (evaluation.condition === 'menor') {
      return this.validateMinor(data, evaluation);
    }

    if (evaluation.condition === 'igual') {
      return this.validateEqual(data, evaluation);
    }

    return 0;
  }

  public validateMajor(data: IDataFile[], evaluation: IEvaluation) {
    return data.filter((element: any)=>{
      return Number(element[evaluation.field]) > Number(evaluation.valor);
    }).length;
  }

  public validateMinor(data: IDataFile[], evaluation: IEvaluation) {
    return data.filter((element: any)=>{
      return Number(element[evaluation.field]) < Number(evaluation.valor);
    }).length;
  }

  public validateEqual(data: IDataFile[], evaluation: IEvaluation) {
    return data.filter((element: any)=>{
      return Number(element[evaluation.field]) === Number(evaluation.valor);
    }).length;
  }
}
